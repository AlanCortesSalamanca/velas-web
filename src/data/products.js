/**
 * EMERGENCY FALLBACK PRODUCT DATA
 * ===============================
 *
 * This file exists ONLY as a safety net when Supabase is unavailable.
 * It is NOT the primary source of truth — that is the PostgreSQL
 * "products" table accessed through Supabase.
 *
 * When Supabase is reachable and returns valid data, this file is
 * never read. These minimal fallback entries exist solely to keep
 * the UI functional during:
 *
 *   1. Development without Supabase credentials configured.
 *   2. Temporary network outages or Supabase downtime.
 *   3. Database permission or schema issues during deployment.
 *
 * ------------------------------------------------------------------
 *  If you are updating product data:
 *  - Update the Supabase "products" table, NOT this file.
 *  - This file should only change if the product schema changes.
 * ------------------------------------------------------------------
 */

const fallbackProducts = [
  {
    
  },
];

export default fallbackProducts;
