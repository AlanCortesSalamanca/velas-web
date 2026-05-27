/**
 * Categories service.
 *
 * ------------------------------------------------------------------
 *  FUTURE DB INTEGRATION
 * ------------------------------------------------------------------
 * Expected Supabase table: "categories"
 * Columns: id, name, slug, description, image, display_order
 *
 * Until the table is created, this service returns static data.
 * When ready, replace the mock with:
 *
 *   const { data, error } = await supabase
 *     .from("categories")
 *     .select("*")
 *     .order("display_order");
 * ------------------------------------------------------------------
 */

import { categories } from "../data/products";

export async function getCategories() {
  return { data: categories, error: null };
}

export async function getCategoryBySlug(slug) {
  const cat = categories.find((c) => c.id === slug) || null;
  return { data: cat, error: null };
}
