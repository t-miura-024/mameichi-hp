import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

// ----------------------------------------------------------------
// Client
// ----------------------------------------------------------------

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ----------------------------------------------------------------
// Types – microCMS schema (requirements-specification.md §3)
// ----------------------------------------------------------------

export type NewsCategory = "新着商品" | "イベント" | "営業案内" | "その他";

export type RoastLevel = "浅煎り" | "中煎り" | "中深煎り" | "深煎り";

export type News = {
  title: string;
  body: string;
  thumbnail?: MicroCMSImage;
  category?: NewsCategory[];
} & MicroCMSListContent;

export type Product = {
  name: string;
  description: string;
  origin?: string;
  roastLevel?: RoastLevel[];
  priceRange?: string;
  image?: MicroCMSImage;
  isRecommended?: boolean;
  isSeasonal?: boolean;
  sortOrder?: number;
} & MicroCMSListContent;

// ----------------------------------------------------------------
// Fetch helpers
// ----------------------------------------------------------------

export async function getNewsList(limit = 100, offset = 0) {
  return client.getList<News>({
    endpoint: "news",
    queries: { limit, offset, orders: "-publishedAt" },
  });
}

export async function getNewsDetail(contentId: string) {
  return client.getListDetail<News>({
    endpoint: "news",
    contentId,
  });
}

export async function getProductList(limit = 100, offset = 0) {
  return client.getList<Product>({
    endpoint: "products",
    queries: { limit, offset, orders: "sortOrder" },
  });
}

export async function getProductDetail(contentId: string) {
  return client.getListDetail<Product>({
    endpoint: "products",
    contentId,
  });
}

