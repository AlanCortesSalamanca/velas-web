import supabase from "../lib/supabase";

/**
 * Temporary fallback: local product data.
 *
 * ------------------------------------------------------------------
 *  WHY THIS FALLBACK EXISTS
 * ------------------------------------------------------------------
 * This application was built with static mock data during frontend
 * development. The service layer below wraps Supabase queries and
 * falls back to that local data when:
 *
 *   1. Supabase environment variables are not configured yet.
 *   2. The Supabase client fails to initialize.
 *   3. A database query returns an error (network, permissions, etc.).
 *
 * This pattern lets the frontend remain fully functional during
 * development while the backend is being set up, and also acts as
 * a safety net in production if the database becomes unreachable.
 *
 * ------------------------------------------------------------------
 *  FUTURE DB INTEGRATION
 * ------------------------------------------------------------------
 * When the Supabase tables are created, replace the `fallback` calls
 * below with real Supabase queries. The async function signatures
 * will remain the same, so no UI code needs to change.
 *
 * Expected Supabase table: "products"
 * Columns: id, name, category, price, image, description, featured,
 *          stock, materials, fragrance, dimensions,
 *          handcraftedDetails, galleryImages, created_at
 *
 * The `galleryImages` column should be stored as a JSONB array.
 * ------------------------------------------------------------------
 */

import localProducts, {
  getProductById as getLocalById,
  getRelatedProducts as getLocalRelated,
} from "../data/products";

/* ---- helpers -------------------------------------------------- */

function mapSupabaseProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    image: row.image,
    description: row.description,
    featured: row.featured,
    stock: row.stock,
    materials: row.materials,
    fragrance: row.fragrance,
    dimensions: row.dimensions,
    handcraftedDetails: row.handcrafted_details,
    galleryImages: row.gallery_images || [],
  };
}

/* ---- public API ----------------------------------------------- */

/**
 * Fetch all products from Supabase.
 * Falls back to local mock data if the DB is unavailable.
 *
 * @param {object} [options]
 * @param {string} [options.category] - Filter by category
 * @param {boolean} [options.featuredOnly] - Only featured products
 * @param {string} [options.sortBy] - "price-asc" | "price-desc" | "name"
 * @returns {Promise<{ data: Array, error: Error|null }>}
 */
function filterLocalProducts(options = {}) {
  let result = [...localProducts];
  if (options.category) {
    result = result.filter((p) => p.category === options.category);
  }
  if (options.featuredOnly) {
    result = result.filter((p) => p.featured);
  }
  return result;
}

export async function getProducts(options = {}) {
  if (!supabase) {
    const data = filterLocalProducts(options);
    console.log("[productsService] Supabase client unavailable — using local fallback.");
    return { data, error: null };
  }

  try {
    let query = supabase.from("products").select("*");

    if (options.category) {
      query = query.eq("category", options.category);
    }
    if (options.featuredOnly) {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) throw error;

    const mapped = (data || []).map(mapSupabaseProduct);
    console.log(`[productsService] Supabase returned ${mapped.length} products.`);
    return {
      data: mapped,
      error: null,
    };
  } catch (err) {
    const data = filterLocalProducts(options);
    console.warn(
      `[productsService] Supabase fetch failed (${err?.message || err}), ` +
      `falling back to ${data.length} local products.`
    );
    return { data, error: null };
  }
}

/**
 * Fetch a single product by ID.
 *
 * @param {string} id
 * @returns {Promise<{ data: object|null, error: Error|null }>}
 */
export async function getProductById(id) {
  if (!supabase) {
    const data = getLocalById(id);
    console.log("[productsService] Supabase client unavailable — using local fallback for", id);
    return { data, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (data) {
      console.log("[productsService] Supabase returned product:", data.id);
      return { data: mapSupabaseProduct(data), error: null };
    }
    return { data: null, error: null };
  } catch (err) {
    const fallback = getLocalById(id);
    console.warn(
      `[productsService] Supabase fetch failed for "${id}" (${err?.message || err}), ` +
      `falling back to local${fallback ? `: "${fallback.name}"` : " — not found"}.`
    );
    return { data: fallback, error: null };
  }
}

/**
 * Fetch featured products.
 *
 * @returns {Promise<{ data: Array, error: Error|null }>}
 */
export async function getFeaturedProducts() {
  return getProducts({ featuredOnly: true });
}

/**
 * Fetch related products (same category, excluding current).
 *
 * @param {string} category
 * @param {string} currentId
 * @returns {Promise<{ data: Array, error: Error|null }>}
 */
export async function getRelatedProducts(category, currentId) {
  if (!supabase) {
    const data = getLocalRelated({ id: currentId, category });
    console.log("[productsService] Supabase client unavailable — local related fallback for", currentId);
    return { data, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", currentId)
      .limit(8);

    if (error) throw error;

    const mapped = (data || []).map(mapSupabaseProduct);
    console.log(`[productsService] Supabase returned ${mapped.length} related products for "${category}".`);
    return { data: mapped, error: null };
  } catch (err) {
    const fallback = getLocalRelated({ id: currentId, category });
    console.warn(
      `[productsService] Supabase related fetch failed (${err?.message || err}), ` +
      `falling back to ${fallback.length} local related products.`
    );
    return { data: fallback, error: null };
  }
}
