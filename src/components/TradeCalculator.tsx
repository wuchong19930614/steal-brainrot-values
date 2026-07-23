"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  formatMarketplacePrice,
  formatValue,
  isVerifiedTradeValue,
  minimumVerifiedTradeValues,
} from "@/lib/data";
import type { BrainrotItem } from "@/lib/types";

type TradeCalculatorProps = {
  items: BrainrotItem[];
};

type OfferItem = {
  itemId: string;
  quantity: number;
};

type Side = "mine" | "theirs";

function getVerdict(myTotal: number, theirTotal: number) {
  if (myTotal === 0 && theirTotal === 0) {
    return {
      label: "No comparison",
      tone: "neutral",
      detail: "Add items to compare.",
    };
  }

  if (theirTotal === 0) {
    return {
      label: "Your side only",
      tone: "loss",
      detail: "Add an item to their side.",
    };
  }

  if (myTotal === 0) {
    return {
      label: "Their side only",
      tone: "win",
      detail: "Add an item to your side.",
    };
  }

  const difference = theirTotal - myTotal;
  const ratio = difference / Math.min(myTotal, theirTotal);
  const percentage = Math.abs(ratio * 100).toFixed(1);
  const amount = formatValue(Math.abs(difference));

  if (Math.abs(ratio) <= 0.05) {
    return {
      label: "Near equal",
      tone: "fair",
      detail: `${amount} difference (${percentage}%).`,
    };
  }

  if (difference > 0 && ratio <= 0.2) {
    return {
      label: "Their side higher",
      tone: "win",
      detail: `${amount} higher (${percentage}%).`,
    };
  }

  if (difference > 0) {
    return {
      label: "Their side much higher",
      tone: "win",
      detail: `${amount} higher (${percentage}%).`,
    };
  }

  if (Math.abs(ratio) <= 0.2) {
    return {
      label: "Your side higher",
      tone: "loss",
      detail: `${amount} higher (${percentage}%).`,
    };
  }

  return {
    label: "Your side much higher",
    tone: "loss",
    detail: `${amount} higher (${percentage}%).`,
  };
}

function totalForOffer(offer: OfferItem[], itemsById: Map<string, BrainrotItem>) {
  return offer.reduce((sum, offerItem) => {
    const item = itemsById.get(offerItem.itemId);
    return sum + (item?.value || 0) * offerItem.quantity;
  }, 0);
}

export function TradeCalculator({ items }: TradeCalculatorProps) {
  const verifiedItems = useMemo(
    () => items.filter(isVerifiedTradeValue),
    [items],
  );
  const [mine, setMine] = useState<OfferItem[]>([]);
  const [theirs, setTheirs] = useState<OfferItem[]>([]);
  const [mineSelection, setMineSelection] = useState(
    verifiedItems[0]?.id || "",
  );
  const [theirSelection, setTheirSelection] = useState(
    verifiedItems[0]?.id || "",
  );

  const itemsById = useMemo(
    () => new Map(verifiedItems.map((item) => [item.id, item])),
    [verifiedItems],
  );

  const myTotal = useMemo(() => totalForOffer(mine, itemsById), [itemsById, mine]);
  const theirTotal = useMemo(
    () => totalForOffer(theirs, itemsById),
    [itemsById, theirs],
  );
  const verdict = getVerdict(myTotal, theirTotal);

  if (verifiedItems.length < minimumVerifiedTradeValues) {
    return (
      <section className="tool-panel" aria-labelledby="calculator-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Not enough comparable prices</p>
            <h2 id="calculator-title">Steal a Brainrot calculator</h2>
          </div>
        </div>
        <div className="calculator-empty">
          <div className="empty-state">
            The calculator stays disabled until at least ten independently
            cross-checked, unit-compatible prices are available.
          </div>
          <div className="status-list" aria-label="Calculator status">
            <div>
              <span>Verified comparable prices</span>
              <strong>{verifiedItems.length}</strong>
            </div>
            <div>
              <span>Minimum to enable</span>
              <strong>{minimumVerifiedTradeValues}</strong>
            </div>
            <div>
              <span>Unverified price math</span>
              <strong>Blocked</strong>
            </div>
          </div>
          <p className="calculator-note">
            The calculator will not use guessed or unsourced figures. Accepted
            marketplace prices must match the Default variant and base M/s
            across two independent sources.
          </p>
          <div className="intro-actions compact-actions">
            <Link
              href="/trading-values/"
              className="primary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="trading-values"
              data-analytics-location="calculator_disabled"
            >
              Review value candidates
            </Link>
            <Link
              href="/"
              className="secondary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="values"
              data-analytics-location="calculator_disabled"
            >
              Value list
            </Link>
            <Link
              href="/updates/"
              className="secondary-link"
              data-analytics-event="related_tool_clicked"
              data-analytics-label="updates"
              data-analytics-location="calculator_disabled"
            >
              Latest updates
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function addItem(side: Side, itemId: string) {
    trackEvent("calculator_used", {
      action: "add_item",
      item_id: itemId,
      side,
    });

    const updateOffer = (offer: OfferItem[]) => {
      const existing = offer.find((offerItem) => offerItem.itemId === itemId);

      if (existing) {
        return offer.map((offerItem) =>
          offerItem.itemId === itemId
            ? { ...offerItem, quantity: offerItem.quantity + 1 }
            : offerItem,
        );
      }

      return [...offer, { itemId, quantity: 1 }];
    };

    if (side === "mine") {
      setMine(updateOffer);
    } else {
      setTheirs(updateOffer);
    }
  }

  function updateQuantity(side: Side, itemId: string, quantity: number) {
    const nextQuantity = Math.max(1, Math.min(99, quantity));
    const updateOffer = (offer: OfferItem[]) =>
      offer.map((offerItem) =>
        offerItem.itemId === itemId
          ? { ...offerItem, quantity: nextQuantity }
          : offerItem,
      );

    if (side === "mine") {
      setMine(updateOffer);
    } else {
      setTheirs(updateOffer);
    }
  }

  function removeItem(side: Side, itemId: string) {
    const removeFromOffer = (offer: OfferItem[]) =>
      offer.filter((offerItem) => offerItem.itemId !== itemId);

    if (side === "mine") {
      setMine(removeFromOffer);
    } else {
      setTheirs(removeFromOffer);
    }
  }

  function renderOffer(side: Side, offer: OfferItem[]) {
    const selectedItemId = side === "mine" ? mineSelection : theirSelection;
    const selectedItem = itemsById.get(selectedItemId);

    return (
      <div className="offer-list">
        {offer.map((offerItem) => {
          const item = itemsById.get(offerItem.itemId);

          if (!item) {
            return null;
          }

          return (
            <div className="offer-row" key={offerItem.itemId}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatValue(item.value)} each</span>
              </div>
              <input
                aria-label={`${item.name} quantity`}
                type="number"
                min="1"
                max="99"
                value={offerItem.quantity}
                onChange={(event) =>
                  updateQuantity(side, item.id, Number(event.target.value))
                }
              />
              <button
                type="button"
                className="symbol-button"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeItem(side, item.id)}
              >
                &times;
              </button>
            </div>
          );
        })}
        {offer.length === 0 && selectedItem ? (
          <button
            type="button"
            className="empty-state compact empty-state-action"
            aria-label={`Add ${selectedItem.name} to ${
              side === "mine" ? "your" : "their"
            } offer`}
            onClick={() => addItem(side, selectedItem.id)}
          >
            <span>Add selected item</span>
            <strong>{selectedItem.name}</strong>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <section className="tool-panel" aria-labelledby="calculator-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">USD asking-price comparison</p>
          <h2 id="calculator-title">Steal a Brainrot calculator</h2>
        </div>
        <div className={`verdict verdict-${verdict.tone}`}>
          <strong>{verdict.label}</strong>
          <span>{verdict.detail}</span>
        </div>
      </div>

      <div className="calculator-grid">
        <div className="offer-panel">
          <h3>Your offer</h3>
          <div className="add-row">
            <select
              value={mineSelection}
              onChange={(event) => setMineSelection(event.target.value)}
              aria-label="Select item for your offer"
            >
              {verifiedItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => addItem("mine", mineSelection)}>
              Add
            </button>
          </div>
          {renderOffer("mine", mine)}
          <div className="total-row">
            <span>Total</span>
            <strong>{formatMarketplacePrice(myTotal)}</strong>
          </div>
        </div>

        <div className="offer-panel">
          <h3>Their offer</h3>
          <div className="add-row">
            <select
              value={theirSelection}
              onChange={(event) => setTheirSelection(event.target.value)}
              aria-label="Select item for their offer"
            >
              {verifiedItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => addItem("theirs", theirSelection)}>
              Add
            </button>
          </div>
          {renderOffer("theirs", theirs)}
          <div className="total-row">
            <span>Total</span>
            <strong>{formatMarketplacePrice(theirTotal)}</strong>
          </div>
        </div>
      </div>
      <p className="calculator-note">
        Results compare active Default marketplace asking prices in USD. They
        are not official values, completed-sale prices, or a guarantee that a
        player-to-player trade is fair.
      </p>
    </section>
  );
}
