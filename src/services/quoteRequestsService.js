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
    console.warn("[quoteRequestsService] Supabase client is null — returning empty list. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars.");
    return { data: [], error: null };
  }

  console.log("[quoteRequestsService] Supabase client OK. Fetching quote_requests...");

  try {
    const response = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = response;

    console.log("[quoteRequestsService] Raw Supabase response:", {
      hasData: !!data,
      dataType: typeof data,
      isArray: Array.isArray(data),
      dataLength: Array.isArray(data) ? data.length : "N/A",
      hasError: !!error,
      errorCode: error?.code ?? null,
      errorMessage: error?.message ?? null,
      errorDetails: error?.details ?? null,
    });

    if (error) {
      console.error("[quoteRequestsService] Supabase select error (code: " + error.code + "):", error.message, error.details);
      return { data: [], error };
    }

    const records = Array.isArray(data) ? data : [];
    console.log("[quoteRequestsService] Successfully fetched", records.length, "quote request(s).");
    if (records.length > 0) {
      console.log("[quoteRequestsService] First record sample:", {
        id: records[0].id,
        status: records[0].status,
        unique_products: records[0].unique_products,
        desired_total_pieces: records[0].desired_total_pieces,
        estimated_subtotal: records[0].estimated_subtotal,
        created_at: records[0].created_at,
      });
    }
    return { data: records, error: null };
  } catch (err) {
    console.error("[quoteRequestsService] Caught exception during fetch:", err);
    if (err?.message) console.error("[quoteRequestsService] Exception message:", err.message);
    if (err?.stack) console.error("[quoteRequestsService] Exception stack:", err.stack);
    return { data: [], error: err };
  }
}
