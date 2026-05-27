import supabase from "../lib/supabase";

export async function createQuoteRequest({ items, estimatedSubtotal, desiredTotalPieces, uniqueProducts }) {
  const payload = {
    items,
    estimated_subtotal: estimatedSubtotal,
    desired_total_pieces: desiredTotalPieces,
    unique_products: uniqueProducts,
    status: "received",
  };

  if (!supabase) {
    console.log(
      "[quoteRequestsService] Supabase client unavailable — quote request NOT persisted. Payload:",
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

    if (error) {
      console.error("[quoteRequestsService] Supabase insert error:", error);
      throw error;
    }

    console.log("[quoteRequestsService] Quote request saved successfully. ID:", data.id, "Payload:", payload);
    return { data, error: null, fallback: false };
  } catch (err) {
    console.warn(
      "[quoteRequestsService] Failed to persist quote request to Supabase:",
      err?.message || err
    );
    console.log("[quoteRequestsService] WhatsApp flow will continue without persistence. Data:", payload);
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

    if (error) {
      console.error("[quoteRequestsService] Supabase select error:", error);
      throw error;
    }

    console.log("[quoteRequestsService] Fetched", data?.length ?? 0, "quote requests from Supabase.");
    return { data: data || [], error: null };
  } catch (err) {
    console.error("[quoteRequestsService] Failed to fetch quote requests:", err?.message || err);
    return { data: [], error: err };
  }
}
