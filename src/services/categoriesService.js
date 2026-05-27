/**
 * CATEGORIES SERVICE
 * ==================
 *
 * ------------------------------------------------------------------
 *  FUTURE DB INTEGRATION
 * ------------------------------------------------------------------
 * Expected Supabase table: "categories"
 * Columns: id, name, slug, description, image, display_order
 *
 * When the table exists, replace the static array with:
 *
 *   const { data, error } = await supabase
 *     .from("categories")
 *     .select("*")
 *     .order("display_order");
 * ------------------------------------------------------------------
 */

const categories = [
  { id: "all", label: "All Products" },
  { id: "candles", label: "Candles" },
  { id: "succulents", label: "Succulents" },
  { id: "sets", label: "Gift Sets" },
  { id: "accessories", label: "Accessories" },
];

export async function getCategories() {
  return { data: categories, error: null };
}

export async function getCategoryBySlug(slug) {
  const cat = categories.find((c) => c.id === slug) || null;
  return { data: cat, error: null };
}
