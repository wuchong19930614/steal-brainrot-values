"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  formatMarketplacePrice,
  formatMpsPerDollar,
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
  rawQuantity?: string;
};

type Side = "mine" | "theirs";
type AddSource = "add_button" | "empty_state";

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

  const difference = Math.round((theirTotal - myTotal) * 100) / 100;
  const ratio = difference / Math.min(myTotal, theirTotal);
  const percentage = Math.abs(ratio * 100).toFixed(1);
  const amount = formatMarketplacePrice(Math.abs(difference));

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
  const totalCents = offer.reduce((sum, offerItem) => {
    const item = itemsById.get(offerItem.itemId);
    return sum + Math.round((item?.value || 0) * 100) * offerItem.quantity;
  }, 0);
  return totalCents / 100;
}

function getOfferIncomeSummary(
  offer: OfferItem[],
  itemsById: Map<string, BrainrotItem>,
  totalUsd: number,
) {
  const rawMps = offer.reduce((sum, offerItem) => {
    const item = itemsById.get(offerItem.itemId);
    const mps = item?.baseIncomeMps ?? 0;
    return sum + mps * offerItem.quantity;
  }, 0);
  const totalMps = Math.round(rawMps * 10) / 10;

  return {
    totalMps,
    formattedTotalMps: `${totalMps}M/s`,
    formattedMpsPerDollar:
      totalUsd > 0 && totalMps > 0
        ? formatMpsPerDollar(totalMps, totalUsd)
        : "0.0M/s per $1",
  };
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 降级到 textarea 复制
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

function parseOfferParam(
  rawParam: string | null,
  itemsById: Map<string, BrainrotItem>,
): OfferItem[] {
  if (!rawParam) {
    return [];
  }

  const merged = new Map<string, number>();
  for (const part of rawParam.split(",")) {
    const [rawId, rawQty] = part.trim().split(":");
    const itemId = rawId?.trim();
    if (!itemId || !itemsById.has(itemId)) {
      continue;
    }
    const parsedQty = rawQty ? Number.parseInt(rawQty, 10) : 1;
    const validQty = Number.isFinite(parsedQty)
      ? Math.max(1, Math.min(99, parsedQty))
      : 1;
    const prevQty = merged.get(itemId) ?? 0;
    merged.set(itemId, Math.min(99, prevQty + validQty));
  }

  return Array.from(merged.entries()).map(([itemId, quantity]) => ({
    itemId,
    quantity,
    rawQuantity: String(quantity),
  }));
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
  const [copiedType, setCopiedType] = useState<
    "link" | "summary" | "link-error" | "summary-error" | null
  >(null);
  const [isUrlInitialized, setIsUrlInitialized] = useState(false);
  const copyFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemsById = useMemo(
    () => new Map(verifiedItems.map((item) => [item.id, item])),
    [verifiedItems],
  );

  // 初始化及浏览器前进/后退时读取 URL 参数 ?add= 或 ?mine=&theirs= 自动预填词条
  useEffect(() => {
    if (itemsById.size === 0) {
      return;
    }

    const applyUrlParams = (shouldTrack: boolean) => {
      const params = new URLSearchParams(window.location.search);
      const parsedMine = parseOfferParam(params.get("mine"), itemsById);
      const parsedTheirs = parseOfferParam(params.get("theirs"), itemsById);
      const addSlug = params.get("add")?.trim() || "";

      if (parsedMine.length > 0 || parsedTheirs.length > 0) {
        setMine(parsedMine);
        setTheirs(parsedTheirs);
        if (parsedMine[0]) {
          setMineSelection(parsedMine[0].itemId);
        }
        if (parsedTheirs[0]) {
          setTheirSelection(parsedTheirs[0].itemId);
        }
        if (shouldTrack) {
          trackEvent("calculator_prefill_loaded", {
            prefill_source: "shared_offer",
            items_loaded: parsedMine.length + parsedTheirs.length,
          });
        }
        return;
      }

      if (addSlug && itemsById.has(addSlug)) {
        setMine([{ itemId: addSlug, quantity: 1, rawQuantity: "1" }]);
        setTheirs([]);
        setMineSelection(addSlug);
        if (shouldTrack) {
          trackEvent("calculator_prefill_loaded", {
            prefill_source: "add_param",
            items_loaded: 1,
          });
        }
        return;
      }

      setMine([]);
      setTheirs([]);
    };

    applyUrlParams(true);
    setIsUrlInitialized(true);

    const handlePopState = () => {
      applyUrlParams(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [itemsById]);

  // 报价变化时同步到 URL 查询参数，保留非计算器参数与 #hash
  useEffect(() => {
    if (!isUrlInitialized) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.delete("add");

    if (mine.length > 0) {
      params.set(
        "mine",
        mine.map((item) => `${item.itemId}:${item.quantity}`).join(","),
      );
    } else {
      params.delete("mine");
    }

    if (theirs.length > 0) {
      params.set(
        "theirs",
        theirs.map((item) => `${item.itemId}:${item.quantity}`).join(","),
      );
    } else {
      params.delete("theirs");
    }

    const queryString = params.toString();
    const hash = window.location.hash || "";
    const nextUrl = `${window.location.pathname}${
      queryString ? `?${queryString}` : ""
    }${hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${hash}`;

    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [isUrlInitialized, mine, theirs]);

  useEffect(() => {
    return () => {
      if (copyFeedbackTimer.current) {
        clearTimeout(copyFeedbackTimer.current);
      }
    };
  }, []);

  const myTotal = useMemo(() => totalForOffer(mine, itemsById), [itemsById, mine]);
  const theirTotal = useMemo(
    () => totalForOffer(theirs, itemsById),
    [itemsById, theirs],
  );
  const myIncome = useMemo(
    () => getOfferIncomeSummary(mine, itemsById, myTotal),
    [itemsById, mine, myTotal],
  );
  const theirIncome = useMemo(
    () => getOfferIncomeSummary(theirs, itemsById, theirTotal),
    [itemsById, theirs, theirTotal],
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

  function addItem(
    side: Side,
    itemId: string,
    source: AddSource = "add_button",
  ) {
    const item = itemsById.get(itemId);

    if (!item) {
      return;
    }

    const currentOffer = side === "mine" ? mine : theirs;
    const existingItem = currentOffer.find(
      (offerItem) => offerItem.itemId === itemId,
    );
    if (existingItem && existingItem.quantity >= 99) {
      return;
    }

    trackEvent(
      source === "empty_state"
        ? "calculator_add_selected_item"
        : "calculator_add_item",
      {
        item_id: itemId,
        item_name: item.name,
        offer_side: side,
        interaction_source: source,
      },
    );

    const updateOffer = (offer: OfferItem[]) => {
      const existing = offer.find((offerItem) => offerItem.itemId === itemId);

      if (existing) {
        return offer.map((offerItem) => {
          if (offerItem.itemId !== itemId) {
            return offerItem;
          }
          const nextQty = Math.min(99, offerItem.quantity + 1);
          return {
            ...offerItem,
            quantity: nextQty,
            rawQuantity: String(nextQty),
          };
        });
      }

      return [...offer, { itemId, quantity: 1, rawQuantity: "1" }];
    };

    if (side === "mine") {
      setMine(updateOffer);
    } else {
      setTheirs(updateOffer);
    }
  }

  function updateQuantityInput(side: Side, itemId: string, rawValue: string) {
    const trimmed = rawValue.trim();
    const parsed = Number.parseInt(trimmed, 10);
    const nextQuantity =
      trimmed === "" || !Number.isFinite(parsed)
        ? 1
        : Math.max(1, Math.min(99, parsed));
    const nextRaw =
      trimmed === "" ? "" : Number.isFinite(parsed) ? String(nextQuantity) : "1";

    const updateOffer = (offer: OfferItem[]) =>
      offer.map((offerItem) =>
        offerItem.itemId === itemId
          ? { ...offerItem, quantity: nextQuantity, rawQuantity: nextRaw }
          : offerItem,
      );

    if (side === "mine") {
      setMine(updateOffer);
    } else {
      setTheirs(updateOffer);
    }
  }

  function normalizeQuantityOnBlur(side: Side, itemId: string) {
    const updateOffer = (offer: OfferItem[]) =>
      offer.map((offerItem) =>
        offerItem.itemId === itemId
          ? { ...offerItem, rawQuantity: String(offerItem.quantity) }
          : offerItem,
      );

    if (side === "mine") {
      setMine(updateOffer);
    } else {
      setTheirs(updateOffer);
    }
  }

  function removeItem(side: Side, itemId: string) {
    const offer = side === "mine" ? mine : theirs;
    const removedOfferItem = offer.find(
      (offerItem) => offerItem.itemId === itemId,
    );
    const item = itemsById.get(itemId);

    if (!removedOfferItem || !item) {
      return;
    }

    trackEvent("calculator_remove_item", {
      item_id: itemId,
      item_name: item.name,
      offer_side: side,
      quantity: removedOfferItem.quantity,
    });

    const removeFromOffer = (offer: OfferItem[]) =>
      offer.filter((offerItem) => offerItem.itemId !== itemId);

    if (side === "mine") {
      setMine(removeFromOffer);
    } else {
      setTheirs(removeFromOffer);
    }
  }

  function showCopiedFeedback(
    type: "link" | "summary" | "link-error" | "summary-error",
  ) {
    if (copyFeedbackTimer.current) {
      clearTimeout(copyFeedbackTimer.current);
    }
    setCopiedType(type);
    copyFeedbackTimer.current = setTimeout(() => {
      setCopiedType(null);
      copyFeedbackTimer.current = null;
    }, 2000);
  }

  async function copyShareLink() {
    const copied = await copyTextToClipboard(window.location.href);
    if (copied) {
      showCopiedFeedback("link");
      trackEvent("calculator_share_clicked", {
        share_type: "link",
        mine_count: mine.length,
        theirs_count: theirs.length,
        verdict_label: verdict.label,
      });
    } else {
      showCopiedFeedback("link-error");
    }
  }

  async function copyTradeSummary() {
    const formatSideList = (offer: OfferItem[]) =>
      offer.length === 0
        ? "None"
        : offer
            .map((offerItem) => {
              const item = itemsById.get(offerItem.itemId);
              if (!item) return null;
              return `${offerItem.quantity}x ${item.name} (${formatValue(item.value)}${
                item.baseIncomeText ? `, ${item.baseIncomeText}` : ""
              })`;
            })
            .filter(Boolean)
            .join(" + ");

    const summaryText = [
      `Steal a Brainrot Trade Check: ${verdict.label} (${verdict.detail})`,
      `Your offer: ${formatSideList(mine)} = ${formatMarketplacePrice(myTotal)} (${myIncome.formattedTotalMps})`,
      `Their offer: ${formatSideList(theirs)} = ${formatMarketplacePrice(theirTotal)} (${theirIncome.formattedTotalMps})`,
      `Link: ${window.location.href}`,
    ].join("\n");

    const copied = await copyTextToClipboard(summaryText);
    if (copied) {
      showCopiedFeedback("summary");
      trackEvent("calculator_share_clicked", {
        share_type: "summary",
        mine_count: mine.length,
        theirs_count: theirs.length,
        verdict_label: verdict.label,
      });
    } else {
      showCopiedFeedback("summary-error");
    }
  }

  function clearBothOffers() {
    setMine([]);
    setTheirs([]);
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
                <strong>
                  <Link
                    href={`/brainrots/${item.slug}/`}
                    data-analytics-event="related_tool_clicked"
                    data-analytics-label={item.slug}
                    data-analytics-location="calculator_offer_item"
                  >
                    {item.name}
                  </Link>
                </strong>
                <span>
                  {formatValue(item.value)} each
                  {item.baseIncomeText ? ` · ${item.baseIncomeText}` : ""}
                </span>
              </div>
              <input
                aria-label={`${item.name} quantity`}
                type="number"
                min="1"
                max="99"
                value={offerItem.rawQuantity ?? String(offerItem.quantity)}
                onChange={(event) =>
                  updateQuantityInput(side, item.id, event.target.value)
                }
                onBlur={() => normalizeQuantityOnBlur(side, item.id)}
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
            onClick={() => addItem(side, selectedItem.id, "empty_state")}
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
          <p className="eyebrow">USD asking-price & M/s comparison</p>
          <h2 id="calculator-title">Steal a Brainrot calculator</h2>
        </div>
        <div className={`verdict verdict-${verdict.tone}`}>
          <strong>{verdict.label}</strong>
          <span>{verdict.detail}</span>
        </div>
      </div>

      {mine.length > 0 || theirs.length > 0 ? (
        <div className="calculator-actions">
          <button
            type="button"
            className="secondary-link"
            onClick={copyShareLink}
          >
            {copiedType === "link"
              ? "Link copied!"
              : copiedType === "link-error"
                ? "Copy failed"
                : "Copy trade link"}
          </button>
          <button
            type="button"
            className="secondary-link"
            onClick={copyTradeSummary}
          >
            {copiedType === "summary"
              ? "Summary copied!"
              : copiedType === "summary-error"
                ? "Copy failed"
                : "Copy summary"}
          </button>
          <button
            type="button"
            className="secondary-link"
            onClick={clearBothOffers}
          >
            Clear both sides
          </button>
        </div>
      ) : null}

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
                  {item.name} ({formatValue(item.value)}
                  {item.baseIncomeText ? ` · ${item.baseIncomeText}` : ""})
                </option>
              ))}
            </select>
            <button type="button" onClick={() => addItem("mine", mineSelection)}>
              Add
            </button>
          </div>
          {renderOffer("mine", mine)}
          <div className="total-row">
            <span>Total asking price</span>
            <strong>{formatMarketplacePrice(myTotal)}</strong>
          </div>
          <div className="income-row">
            <span>Total base income</span>
            <strong>
              {myIncome.formattedTotalMps}{" "}
              <small>({myIncome.formattedMpsPerDollar})</small>
            </strong>
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
                  {item.name} ({formatValue(item.value)}
                  {item.baseIncomeText ? ` · ${item.baseIncomeText}` : ""})
                </option>
              ))}
            </select>
            <button type="button" onClick={() => addItem("theirs", theirSelection)}>
              Add
            </button>
          </div>
          {renderOffer("theirs", theirs)}
          <div className="total-row">
            <span>Total asking price</span>
            <strong>{formatMarketplacePrice(theirTotal)}</strong>
          </div>
          <div className="income-row">
            <span>Total base income</span>
            <strong>
              {theirIncome.formattedTotalMps}{" "}
              <small>({theirIncome.formattedMpsPerDollar})</small>
            </strong>
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
