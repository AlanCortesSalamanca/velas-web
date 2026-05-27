import { useMemo, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, SearchX, RotateCcw, ChevronDown } from "lucide-react";
import { getProducts } from "../services/productsService";
import { filterProducts, sortOptions } from "../utils/filterProducts";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import SearchBar from "../components/ui/SearchBar";
import FilterSidebar from "../components/ui/FilterSidebar";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const raw = Object.fromEntries(searchParams.entries());
    return {
      search: raw.search || "",
      categories: raw.categories ? raw.categories.split(",") : [],
      inStock: raw.inStock === "true",
      featured: raw.featured === "true",
      hasFragrance: raw.hasFragrance === "true",
      sortBy: raw.sortBy || "featured",
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (next) => {
      const params = new URLSearchParams();
      if (next.search) params.set("search", next.search);
      if (next.categories.length > 0) params.set("categories", next.categories.join(","));
      if (next.inStock) params.set("inStock", "true");
      if (next.featured) params.set("featured", "true");
      if (next.hasFragrance) params.set("hasFragrance", "true");
      if (next.sortBy && next.sortBy !== "featured") params.set("sortBy", next.sortBy);
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const hasActiveFilters =
    filters.search ||
    filters.categories.length > 0 ||
    filters.inStock ||
    filters.featured ||
    filters.hasFragrance;

  return { filters, setFilters, resetFilters, hasActiveFilters };
}

export default function Catalog() {
  const { filters, setFilters, resetFilters, hasActiveFilters } = useCatalogFilters();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getProducts()
      .then(({ data }) => {
        if (!mounted) return;
        setProducts(data || []);
        console.log("[Catalog] Products loaded:", data?.length);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const result = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  return (
    <>
      <SEO title="Catalog" description="Browse our handcrafted collection of candles, succulents, gift sets, and home accessories." />

      <Container className="py-10 sm:py-14">
      {/* ---- Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl">
          Catalog
        </h1>
        <p className="mt-1.5 text-sage-500">
          Discover handcrafted candles, succulents, and decor.
        </p>
      </motion.div>

      {/* ---- Search + Actions row ---- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-8 flex flex-col gap-4 sm:flex-row"
      >
        <SearchBar
          value={filters.search}
          onChange={(v) => setFilters({ ...filters, search: v })}
          placeholder="Search by name, fragrance, or material..."
          className="flex-1"
        />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                !
              </span>
            )}
          </Button>
        </div>
      </motion.div>

      {/* ---- Sort + Results row ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-4 flex flex-wrap items-center justify-between gap-3"
      >
        <p className="text-sm text-sage-400">
          <span className="font-medium text-sage-600">{result.length}</span>{" "}
          product{result.length !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-3 inline-flex items-center gap-1 text-xs text-brand-500 transition-colors hover:text-brand-600"
            >
              <RotateCcw className="h-3 w-3" />
              Clear all
            </button>
          )}
        </p>

        {/* Desktop sort */}
        <div className="hidden items-center gap-2 sm:flex">
          <label className="text-xs text-sage-400">Sort by</label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="appearance-none rounded-lg border border-sage-200 bg-white py-1.5 pl-3 pr-8 text-sm text-sage-700 transition-smooth focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sage-400" />
          </div>
        </div>
      </motion.div>

      {/* ---- Main layout ---- */}
      <div className="mt-6 flex gap-8">
        {/* Desktop filter sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={resetFilters}
          resultCount={result.length}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Product grid */}
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
          <AnimatePresence mode="wait">
            {result.length > 0 ? (
              <motion.div
                key={JSON.stringify(filters)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <ProductGrid products={result} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-50">
                  <SearchX className="h-10 w-10 text-sage-300" />
                </div>
                <h2 className="mt-6 font-serif text-xl font-bold text-sage-800">
                  No products found
                </h2>
                <p className="mt-2 max-w-xs text-sm text-sage-500">
                  Try adjusting your search or filters to find what you&rsquo;re
                  looking for.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={resetFilters}
                  className="mt-8 gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </div>
      </div>
    </Container>
    </>
  );
}
