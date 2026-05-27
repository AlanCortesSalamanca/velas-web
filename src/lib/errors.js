/**
 * Reusable async error wrapper.
 *
 * Wraps a promise in a try/catch and returns a consistent shape:
 *   { data, error }
 *
 * This keeps error handling predictable across all services
 * and prevents uncaught promise rejections from crashing the UI.
 */
export async function asyncHandler(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    console.error("[Service Error]", error?.message || error);
    return { data: null, error };
  }
}
