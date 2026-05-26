export function filterProducts(products, filters) {
  const { search, categories, inStock, featured, hasFragrance, sortBy } = filters;

  let result = [...products];

  // Search: by name, category, fragrance, materials
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.fragrance && p.fragrance.toLowerCase().includes(q)) ||
        p.materials.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (categories && categories.length > 0) {
    result = result.filter((p) => categories.includes(p.category));
  }

  // In stock
  if (inStock) {
    result = result.filter((p) => p.stock > 0);
  }

  // Featured
  if (featured) {
    result = result.filter((p) => p.featured);
  }

  // Has fragrance
  if (hasFragrance) {
    result = result.filter((p) => p.fragrance != null);
  }

  // Sort
  switch (sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // "featured" — featured first, then by name
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
      break;
  }

  return result;
}

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Alphabetical" },
];

export const categoryOptions = [
  { id: "candles", label: "Candles" },
  { id: "succulents", label: "Succulents" },
  { id: "sets", label: "Gift Sets" },
  { id: "accessories", label: "Accessories" },
];

export const defaultFilters = {
  search: "",
  categories: [],
  inStock: false,
  featured: false,
  hasFragrance: false,
  sortBy: "featured",
};
