"use client";

import { useMemo, useState } from "react";
import { formatCount, formatValue } from "@/lib/data";
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
    return { label: "No trade", tone: "neutral", detail: "Add items to compare." };
  }

  if (theirTotal === 0) {
    return {
      label: "Big Loss",
      tone: "loss",
      detail: "Your offer has no return.",
    };
  }

  const difference = theirTotal - myTotal;
  const ratio = difference / theirTotal;
  const percentage = Math.abs(ratio * 100).toFixed(1);
  const amount = formatCount(Math.abs(difference));

  if (Math.abs(ratio) <= 0.05) {
    return {
      label: "Fair",
      tone: "fair",
      detail: `${amount} difference (${percentage}%).`,
    };
  }

  if (difference > 0 && ratio <= 0.2) {
    return {
      label: "Small Win",
      tone: "win",
      detail: `${amount} ahead (${percentage}%).`,
    };
  }

  if (difference > 0) {
    return {
      label: "Big Win",
      tone: "win",
      detail: `${amount} ahead (${percentage}%).`,
    };
  }

  if (Math.abs(ratio) <= 0.2) {
    return {
      label: "Small Loss",
      tone: "loss",
      detail: `${amount} behind (${percentage}%).`,
    };
  }

  return {
    label: "Big Loss",
    tone: "loss",
    detail: `${amount} behind (${percentage}%).`,
  };
}

function totalForOffer(offer: OfferItem[], itemsById: Map<string, BrainrotItem>) {
  return offer.reduce((sum, offerItem) => {
    const item = itemsById.get(offerItem.itemId);
    return sum + (item?.value || 0) * offerItem.quantity;
  }, 0);
}

export function TradeCalculator({ items }: TradeCalculatorProps) {
  const [mine, setMine] = useState<OfferItem[]>([]);
  const [theirs, setTheirs] = useState<OfferItem[]>([]);
  const [mineSelection, setMineSelection] = useState(items[0]?.id || "");
  const [theirSelection, setTheirSelection] = useState(items[0]?.id || "");

  const itemsById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const myTotal = useMemo(() => totalForOffer(mine, itemsById), [itemsById, mine]);
  const theirTotal = useMemo(
    () => totalForOffer(theirs, itemsById),
    [itemsById, theirs],
  );
  const verdict = getVerdict(myTotal, theirTotal);

  if (items.length === 0) {
    return (
      <section className="tool-panel" aria-labelledby="calculator-title">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Official value unavailable</p>
            <h2 id="calculator-title">Steal a Brainrot calculator</h2>
          </div>
        </div>
        <div className="empty-state">
          Official public sources do not currently publish Steal a Brainrot
          trade values, so the calculator is disabled until verified values are
          added.
        </div>
      </section>
    );
  }

  function addItem(side: Side, itemId: string) {
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
        {offer.length === 0 ? (
          <div className="empty-state compact">No items added.</div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="tool-panel" aria-labelledby="calculator-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Trade check</p>
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
              {items.map((item) => (
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
            <strong>{formatCount(myTotal)}</strong>
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
              {items.map((item) => (
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
            <strong>{formatCount(theirTotal)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
