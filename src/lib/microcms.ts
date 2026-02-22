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

export type NewsCategory = "新着豆" | "イベント" | "営業案内" | "その他";

export type RoastLevel = "浅煎り" | "中煎り" | "中深煎り" | "深煎り";

export type News = {
  title: string;
  body: string;
  thumbnail?: MicroCMSImage;
  category?: NewsCategory[];
} & MicroCMSListContent;

export type Bean = {
  name: string;
  description: string;
  origin: string;
  roastLevel: RoastLevel[];
  priceRange?: string;
  image?: MicroCMSImage;
  isRecommended?: boolean;
  isSeasonal?: boolean;
  sortOrder?: number;
} & MicroCMSListContent;

export type GalleryItem = {
  image: MicroCMSImage;
  caption?: string;
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

export async function getBeansList(limit = 100, offset = 0) {
  return client.getList<Bean>({
    endpoint: "beans",
    queries: { limit, offset, orders: "sortOrder" },
  });
}

export async function getBeansDetail(contentId: string) {
  return client.getListDetail<Bean>({
    endpoint: "beans",
    contentId,
  });
}

export async function getGalleryList(limit = 100, offset = 0) {
  return client.getList<GalleryItem>({
    endpoint: "gallery",
    queries: { limit, offset, orders: "sortOrder" },
  });
}
