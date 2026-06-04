"use client";

/**
 * Client hook that overlays live inventory from the Apps Script web app
 * (NEXT_PUBLIC_STOCK_URL) on top of the static values in lib/stock.ts.
 *
 * - If no endpoint is configured, it simply returns the static data, so
 *   the site works perfectly with hand-edited stock today.
 * - When the endpoint is set, the bot's JSON (keyed by slug) is merged
 *   over the static map — sold-out colours, units left and social proof
 *   all update automatically without a redeploy.
 */
import { useEffect, useState } from "react";
import { STOCK_ENDPOINT, getStock, stock, type ProductStock } from "./stock";

type StockMap = Record<string, ProductStock>;

let cache: StockMap | null = null;
let inflight: Promise<StockMap> | null = null;

async function fetchLiveStock(): Promise<StockMap> {
  if (!STOCK_ENDPOINT) return {};
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = fetch(STOCK_ENDPOINT, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : {}))
    .then((json: StockMap) => {
      cache = json ?? {};
      return cache;
    })
    .catch(() => ({}))
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Live stock for one product (static fallback merged with bot feed). */
export function useLiveStock(slug: string): ProductStock {
  const [data, setData] = useState<ProductStock>(() => getStock(slug));
  useEffect(() => {
    let cancelled = false;
    void fetchLiveStock().then((map) => {
      const live = map[slug];
      if (live && !cancelled) setData((prev) => ({ ...prev, ...live }));
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return data;
}

/** Live stock for the whole catalogue (used by the chatbot). */
export function useLiveStockMap(): StockMap {
  const [data, setData] = useState<StockMap>(() => ({ ...stock }));
  useEffect(() => {
    let cancelled = false;
    void fetchLiveStock().then((map) => {
      if (!cancelled && Object.keys(map).length > 0) {
        setData((prev) => ({ ...prev, ...map }));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}
