/**
 * Quote requests service.
 *
 * ------------------------------------------------------------------
 *  FUTURE DB INTEGRATION
 * ------------------------------------------------------------------
 * Expected Supabase table: "quote_requests"
 * Columns: id, customer_name, email, phone, message, items (JSONB),
 *          status, created_at
 *
 * When ready, replace the mock with:
 *
 *   const { data, error } = await supabase
 *     .from("quote_requests")
 *     .insert([{ customer_name, email, phone, message, items }])
 *     .select()
 *     .single();
 * ------------------------------------------------------------------
 */

/**
 * Submit a quote request to the database.
 *
 * @param {object} payload
 * @param {string} payload.customerName
 * @param {string} payload.email
 * @param {string} [payload.phone]
 * @param {string} [payload.message]
 * @param {Array}  payload.items - Array of { productId, name, quantity, price }
 * @returns {Promise<{ data: object|null, error: Error|null }>}
 */
export async function submitQuoteRequest(payload) {
  // TODO: Replace with real Supabase insert when the table exists.
  console.log("[quoteRequestsService] Quote request received (not yet persisted):", payload);
  return {
    data: { id: "placeholder", status: "received", ...payload },
    error: null,
  };
}

/**
 * Fetch all quote requests (admin use — future).
 */
export async function getQuoteRequests() {
  // TODO: Replace with Supabase query when admin panel is built.
  return { data: [], error: null };
}
