import supabase from "../lib/supabase";

/**
 * QUOTE REQUESTS SERVICE
 * ======================
 *
 * Persists quote requests to the Supabase `quote_requests` table.
 *
 * Expected Supabase table: "quote_requests"
 * Columns:
 *   id             UUID (auto-generated)
 *   items          JSONB    — array of { productId, name, quantity, price }
 *   subtotal       numeric  — sum of item prices x quantities
 *   total_pieces   integer  — sum of all quantities
 *   unique_products integer — number of distinct items
 *   status         text     — default: 'received'
 *   created_at     timestamptz (auto-generated)
 *
 * ------------------------------------------------------------------
 *  FALLBACK BEHAVIOR
 * ------------------------------------------------------------------
 * If Supabase is unavailable, the request is logged to the console
 * and the WhatsApp flow continues uninterrupted. The fallback
 * prevents a DB issue from blocking the customer's order.
 * ------------------------------------------------------------------
 */

export async function createQuoteRequest({ items, subtotal, totalPieces, uniqueProducts }) {
  const payload = {
    items,
    subtotal,
    total_pieces: totalPieces,
    unique_products: uniqueProducts,
    status: "received",
  };

  if (!supabase) {
    console.log(
      "[quoteRequestsService] Supabase client unavailable — quote request NOT persisted:",
      payload
    );
    return { data: { id: "offline", ...payload }, error: null, fallback: true };
  }

  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    console.log("[quoteRequestsService] Quote request saved successfully:", data.id);
    return { data, error: null, fallback: false };
  } catch (err) {
    console.warn(
      "[quoteRequestsService] Failed to persist quote request to Supabase:",
      err?.message || err
    );
    console.log("[quoteRequestsService] WhatsApp flow will continue without persistence.");
    return { data: { id: "unpersisted", ...payload }, error: err, fallback: true };
  }
}

export async function getQuoteRequests() {
  if (!supabase) {
    console.log("[quoteRequestsService] Supabase client unavailable — returning empty list.");
    return { data: [], error: null };
  }

  try {
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data: data || [], error: null };
  } catch (err) {
    console.warn("[quoteRequestsService] Failed to fetch quote requests:", err?.message || err);
    return { data: [], error: err };
  }
}
