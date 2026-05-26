const products = [
  // ========== Decorative Flower Candles ==========
  {
    id: "candle-rosa-floral",
    name: "Rosa Floral Candle",
    category: "candles",
    price: 24.99,
    image: "https://picsum.photos/seed/rosa-floral/600/750",
    description:
      "Hand-poured soy candle infused with rose petals and essential oils. Burns for 45+ hours with a delicate floral scent.",
    featured: true,
    stock: 15,
    materials: "Natural soy wax, cotton wick, dried rose petals, essential oils",
    fragrance: "Rose, geranium, vanilla base",
    dimensions: '8 cm Ø × 10 cm H | 220 g',
    handcraftedDetails:
      "Each candle is hand-poured in small batches in our Buenos Aires studio. Rose petals are ethically sourced and dried naturally.",
    galleryImages: [
      "https://picsum.photos/seed/rosa-gal-1/600/750",
      "https://picsum.photos/seed/rosa-gal-2/600/750",
      "https://picsum.photos/seed/rosa-gal-3/600/750",
    ],
  },
  {
    id: "candle-lavender-bloom",
    name: "Lavender Bloom Candle",
    category: "candles",
    price: 26.99,
    image: "https://picsum.photos/seed/lavender-bloom/600/750",
    description:
      "Calming lavender and chamomile blend in a matte ceramic vessel. Perfect for evening relaxation rituals.",
    featured: true,
    stock: 22,
    materials: "Natural soy wax, cotton wick, lavender buds, ceramic vessel",
    fragrance: "Lavender, chamomile, cedarwood",
    dimensions: '8 cm Ø × 9 cm H | 240 g',
    handcraftedDetails:
      "The ceramic vessel is hand-thrown by local artisans in Córdoba. Each piece has unique glaze variations.",
    galleryImages: [
      "https://picsum.photos/seed/lavender-gal-1/600/750",
      "https://picsum.photos/seed/lavender-gal-2/600/750",
      "https://picsum.photos/seed/lavender-gal-3/600/750",
    ],
  },
  {
    id: "candle-gardenia-petal",
    name: "Gardenia Petal Candle",
    category: "candles",
    price: 28.99,
    image: "https://picsum.photos/seed/gardenia-petal/600/750",
    description:
      "White gardenia and tuberose create an elegant white floral bouquet. Comes in a hand-painted porcelain cup.",
    featured: false,
    stock: 8,
    materials: "Natural soy wax, cotton wick, porcelain cup with hand-painted finish",
    fragrance: "Gardenia, tuberose, white musk",
    dimensions: '7 cm Ø × 8 cm H | 200 g',
    handcraftedDetails:
      "The porcelain cup is hand-painted by a family workshop in the Argentine countryside. No two cups are identical.",
    galleryImages: [
      "https://picsum.photos/seed/gardenia-gal-1/600/750",
      "https://picsum.photos/seed/gardenia-gal-2/600/750",
      "https://picsum.photos/seed/gardenia-gal-3/600/750",
    ],
  },
  {
    id: "candle-jasmine-blossom",
    name: "Jasmine Blossom Candle",
    category: "candles",
    price: 22.99,
    image: "https://picsum.photos/seed/jasmine-blossom/600/750",
    description:
      "Sweet jasmine and vanilla notes wrapped in a warm amber base. A timeless romantic scent.",
    featured: false,
    stock: 30,
    materials: "Natural soy wax, cotton wick, glass vessel with bamboo lid",
    fragrance: "Jasmine, vanilla, amber, sandalwood",
    dimensions: '8 cm Ø × 9 cm H | 230 g',
    handcraftedDetails:
      "Our jasmine essential oil is cold-pressed from flowers grown in the hills of Jujuy. The bamboo lid is hand-carved.",
    galleryImages: [
      "https://picsum.photos/seed/jasmine-gal-1/600/750",
      "https://picsum.photos/seed/jasmine-gal-2/600/750",
      "https://picsum.photos/seed/jasmine-gal-3/600/750",
    ],
  },

  // ========== Succulent Pots ==========
  {
    id: "succulent-echeveria",
    name: "Echeveria Elegans",
    category: "succulents",
    price: 14.99,
    image: "https://picsum.photos/seed/echeveria/600/750",
    description:
      'A stunning rosette succulent with pale blue-green leaves. Arrived in a 4" terracotta pot with drainage.',
    featured: true,
    stock: 20,
    materials: "Live succulent, terracotta pot, succulent soil mix, pebble top dressing",
    fragrance: null,
    dimensions: 'Plant: 8-10 cm rosette | Pot: 10 cm Ø × 9 cm H',
    handcraftedDetails:
      "Each succulent is hand-planted and arranged by our plant stylists. The terracotta pots are sourced from local ceramic workshops.",
    galleryImages: [
      "https://picsum.photos/seed/echeveria-gal-1/600/750",
      "https://picsum.photos/seed/echeveria-gal-2/600/750",
      "https://picsum.photos/seed/echeveria-gal-3/600/750",
    ],
  },
  {
    id: "succulent-string-pearls",
    name: "String of Pearls",
    category: "succulents",
    price: 18.99,
    image: "https://picsum.photos/seed/string-pearls/600/750",
    description:
      "Trailing succulent with bead-like leaves. Perfect for hanging planters and shelf displays.",
    featured: true,
    stock: 12,
    materials: "Live succulent, hanging planter, succulent soil mix, decorative moss",
    fragrance: null,
    dimensions: "Trailing length: 20-30 cm | Planter: 12 cm Ø",
    handcraftedDetails:
      "Grown in our greenhouse from cuttings, each plant takes 4-6 months to reach its full trailing length before shipping.",
    galleryImages: [
      "https://picsum.photos/seed/pearls-gal-1/600/750",
      "https://picsum.photos/seed/pearls-gal-2/600/750",
      "https://picsum.photos/seed/pearls-gal-3/600/750",
    ],
  },
  {
    id: "succulent-moon-cactus",
    name: "Moon Cactus",
    category: "succulents",
    price: 12.99,
    image: "https://picsum.photos/seed/moon-cactus/600/750",
    description:
      "Vibrant pink and green grafted cactus. A cheerful low-maintenance desk companion.",
    featured: false,
    stock: 25,
    materials: "Live grafted cactus, decorative pot, cactus soil mix, pebble top dressing",
    fragrance: null,
    dimensions: "Plant: 6-8 cm H | Pot: 6 cm Ø",
    handcraftedDetails:
      "These whimsical cacti are grafted by hand in our nursery. Each color variation is unique and naturally occurring.",
    galleryImages: [
      "https://picsum.photos/seed/moon-gal-1/600/750",
      "https://picsum.photos/seed/moon-gal-2/600/750",
      "https://picsum.photos/seed/moon-gal-3/600/750",
    ],
  },
  {
    id: "succulent-aloe-mini",
    name: "Aloe Vera Mini",
    category: "succulents",
    price: 16.99,
    image: "https://picsum.photos/seed/aloe-mini/600/750",
    description:
      "Compact aloe vera in a matte white pot. Known for air-purifying properties and easy care.",
    featured: false,
    stock: 18,
    materials: "Live aloe vera plant, matte ceramic pot, succulent soil mix",
    fragrance: null,
    dimensions: "Plant: 10-12 cm H | Pot: 8 cm Ø × 7 cm H",
    handcraftedDetails:
      "Our aloe vera plants are propagated from mature mother plants in our organic nursery. The white ceramic pots are locally sourced.",
    galleryImages: [
      "https://picsum.photos/seed/aloe-gal-1/600/750",
      "https://picsum.photos/seed/aloe-gal-2/600/750",
      "https://picsum.photos/seed/aloe-gal-3/600/750",
    ],
  },

  // ========== Pastel Aesthetic Products ==========
  {
    id: "pastel-candle-set",
    name: "Pastel Dream Candle Set",
    category: "sets",
    price: 44.99,
    image: "https://picsum.photos/seed/pastel-candle-set/600/750",
    description:
      "Set of three mini candles in blush, lavender, and mint. Each burns for 20 hours. Gift box included.",
    featured: true,
    stock: 6,
    materials: "Natural soy wax, cotton wicks, three mini glass vessels, gift box with ribbon",
    fragrance: "Blush: rose & peony | Lavender: lavender & chamomile | Mint: mint & eucalyptus",
    dimensions: 'Each candle: 5 cm Ø × 6 cm H | Box: 20 × 7 × 7 cm',
    handcraftedDetails:
      "Each set is curated and hand-packed in our studio. The gift box features a hand-stamped ribbon and personalized note option.",
    galleryImages: [
      "https://picsum.photos/seed/pastel-set-gal-1/600/750",
      "https://picsum.photos/seed/pastel-set-gal-2/600/750",
      "https://picsum.photos/seed/pastel-set-gal-3/600/750",
    ],
  },
  {
    id: "blush-succulent-trio",
    name: "Blush Succulent Trio",
    category: "sets",
    price: 34.99,
    image: "https://picsum.photos/seed/blush-trio/600/750",
    description:
      "Three pink-hued succulents arranged in a pastel gradient planter. A living work of art.",
    featured: true,
    stock: 10,
    materials: "Three live succulents, gradient ceramic planter, succulent soil, decorative stones",
    fragrance: null,
    dimensions: "Planter: 20 cm L × 6 cm W × 6 cm H",
    handcraftedDetails:
      "Our plant stylist selects and arranges each trio for color harmony. The gradient planter is hand-glazed in small batches.",
    galleryImages: [
      "https://picsum.photos/seed/blush-trio-gal-1/600/750",
      "https://picsum.photos/seed/blush-trio-gal-2/600/750",
      "https://picsum.photos/seed/blush-trio-gal-3/600/750",
    ],
  },
  {
    id: "ombre-wax-melts",
    name: "Ombre Wax Melts Set",
    category: "candles",
    price: 18.99,
    image: "https://picsum.photos/seed/ombre-melts/600/750",
    description:
      "Hand-crafted wax melts in ombre color transitions. Scented with vanilla, cotton, and white tea.",
    featured: false,
    stock: 14,
    materials: "Natural soy wax, fragrance oils, biodegradable clamshell packaging",
    fragrance: "Vanilla, cotton flower, white tea",
    dimensions: "6 melts per pack | Each melt: 3 cm Ø",
    handcraftedDetails:
      "Each melt is individually poured in layered colors to create the ombre effect. Packaging is plastic-free and compostable.",
    galleryImages: [
      "https://picsum.photos/seed/ombre-melts-gal-1/600/750",
      "https://picsum.photos/seed/ombre-melts-gal-2/600/750",
      "https://picsum.photos/seed/ombre-melts-gal-3/600/750",
    ],
  },
  {
    id: "pastel-planter-vase",
    name: "Ribbed Pastel Planter",
    category: "accessories",
    price: 19.99,
    image: "https://picsum.photos/seed/planter-vase/600/750",
    description:
      'Ceramic ribbed planter in soft peach glaze. Fits 4" pots. Drainage hole and bamboo tray included.',
    featured: false,
    stock: 9,
    materials: "Hand-thrown ceramic, peach reactive glaze, bamboo tray",
    fragrance: null,
    dimensions: '12 cm Ø × 10 cm H | Fits 4" nursery pots',
    handcraftedDetails:
      "Each planter is wheel-thrown and hand-glazed, resulting in unique variations in the peach glaze. The bamboo tray is hand-cut and oiled.",
    galleryImages: [
      "https://picsum.photos/seed/planter-gal-1/600/750",
      "https://picsum.photos/seed/planter-gal-2/600/750",
      "https://picsum.photos/seed/planter-gal-3/600/750",
    ],
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "candles", label: "Candles" },
  { id: "succulents", label: "Succulents" },
  { id: "sets", label: "Gift Sets" },
  { id: "accessories", label: "Accessories" },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getRelatedProducts(product) {
  return products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
}

export default products;
