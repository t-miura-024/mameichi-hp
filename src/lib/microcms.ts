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

export type SalesStatus = "販売中" | "売り切れ" | "入荷待ち" | "期間終了";

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
  salesStatus: SalesStatus[];
  sortOrder?: number;
} & MicroCMSListContent;

// ----------------------------------------------------------------
// Sales-status helpers
// ----------------------------------------------------------------

const SALES_STATUS_ORDER: Record<SalesStatus, number> = {
  "販売中": 0,
  "入荷待ち": 1,
  "売り切れ": 2,
  "期間終了": 3,
};

export function getProductSalesStatus(product: Product): SalesStatus {
  return product.salesStatus[0] ?? "販売中";
}

export function sortProductsBySalesStatus(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const statusA = SALES_STATUS_ORDER[getProductSalesStatus(a)];
    const statusB = SALES_STATUS_ORDER[getProductSalesStatus(b)];
    if (statusA !== statusB) return statusA - statusB;
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  });
}

export function isProductAvailable(product: Product): boolean {
  const status = getProductSalesStatus(product);
  return status === "販売中" || status === "入荷待ち";
}

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

