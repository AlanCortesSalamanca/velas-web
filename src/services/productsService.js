import supabase from "../lib/supabase";

/**
 * PRODUCTS SERVICE
 * ================
 *
 * Supabase (PostgreSQL) is the **primary source of truth** for product data.
 *
 * ------------------------------------------------------------------
 *  FALLBACK BEHAVIOR
 * ------------------------------------------------------------------
 * Every function falls back to a minimal local dataset when:
 *
 *   1. Supabase environment variables are not configured.
 *   2. The Supabase client fails to initialize.
 *   3. A database query returns an error (network, permissions, etc.).
 *
 * The fallback dataset (src/data/products.js) contains 3 generic
 * entries and is NOT a substitute for real database content. It
 * exists only to keep the UI functional during outages.
 *
 * See src/data/products.js for the full fallback rationale.
 * ------------------------------------------------------------------
 */

import fallbackProducts from "../data/products";

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

function filterLocalProducts(options = {}) {
  let result = [...fallbackProducts];
  if (options.category) {
    result = result.filter((p) => p.category === options.category);
  }
  if (options.featuredOnly) {
    result = result.filter((p) => p.featured);
  }
  return result;
}

function findLocalById(id) {
  return fallbackProducts.find((p) => p.id === id) || null;
}

function findLocalRelated(category, currentId) {
  return fallbackProducts.filter(
    (p) => p.category === category && p.id !== currentId
  );
}

/* ---- public API ----------------------------------------------- */

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
    return { data: mapped, error: null };
  } catch (err) {
    const data = filterLocalProducts(options);
    console.warn(
      `[productsService] Supabase fetch failed (${err?.message || err}), ` +
      `falling back to ${data.length} local products.`
    );
    return { data, error: null };
  }
}

export async function getProductById(id) {
  if (!supabase) {
    const data = findLocalById(id);
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
    const fallback = findLocalById(id);
    console.warn(
      `[productsService] Supabase fetch failed for "${id}" (${err?.message || err}), ` +
      `falling back to local${fallback ? `: "${fallback.name}"` : " — not found"}.`
    );
    return { data: fallback, error: null };
  }
}

export async function getFeaturedProducts() {
  return getProducts({ featuredOnly: true });
}

export async function getRelatedProducts(category, currentId) {
  if (!supabase) {
    const data = findLocalRelated(category, currentId);
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
    const fallback = findLocalRelated(category, currentId);
    console.warn(
      `[productsService] Supabase related fetch failed (${err?.message || err}), ` +
      `falling back to ${fallback.length} local related products.`
    );
    return { data: fallback, error: null };
  }
}
