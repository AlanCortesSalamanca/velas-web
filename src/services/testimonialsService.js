/**
 * Testimonials service.
 *
 * ------------------------------------------------------------------
 *  FUTURE DB INTEGRATION
 * ------------------------------------------------------------------
 * Expected Supabase table: "testimonials"
 * Columns: id, name, location, rating, text, product_name,
 *          is_visible, created_at
 *
 * When ready, replace the mock data with:
 *
 *   const { data, error } = await supabase
 *     .from("testimonials")
 *     .select("*")
 *     .eq("is_visible", true)
 *     .order("created_at", { ascending: false });
 * ------------------------------------------------------------------
 */

const mockTestimonials = [
  {
    id: "1",
    name: "Sofia Martinez",
    location: "Buenos Aires",
    rating: 5,
    text: "The rose candle is absolutely stunning. The scent fills my entire apartment and the ceramic vessel is too beautiful to hide.",
    product: "Rosa Floral Candle",
  },
  {
    id: "2",
    name: "Carolina Vega",
    location: "Córdoba",
    rating: 5,
    text: "Ordered the Blush Succulent Trio for my desk and it brings me joy every single day. Impeccable packaging and healthy plants.",
    product: "Blush Succulent Trio",
  },
  {
    id: "3",
    name: "Martina López",
    location: "Rosario",
    rating: 5,
    text: "The Pastel Dream Candle Set arrived in the most beautiful gift box. I gave them as gifts and everyone thought they were from a high-end boutique.",
    product: "Pastel Dream Candle Set",
  },
];

export async function getTestimonials() {
  return { data: mockTestimonials, error: null };
}

export async function getTestimonialById(id) {
  const t = mockTestimonials.find((t) => t.id === id) || null;
  return { data: t, error: null };
}
