import { useMemo, useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, SearchX, RotateCcw, ChevronDown, Sparkles } from "lucide-react";
import { getProducts } from "../services/productsService";
import { filterProducts, sortOptions } from "../utils/filterProducts";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import SearchBar from "../components/ui/SearchBar";
import FilterSidebar from "../components/ui/FilterSidebar";
import Button from "../components/ui/Button";
import ProductGrid from "../components/product/ProductGrid";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { fadeUp, staggerContainer } from "../utils/motion";

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
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const result = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  return (
    <>
      <SEO title="Catalog" description="Browse our handcrafted collection of candles, succulents, gift sets, and home accessories." />

      <Container className="py-12 sm:py-20">
        {/* ---- Hero Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-terra-500">
            <Sparkles className="h-3 w-3" />
            Our Collection
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold text-sage-800 sm:text-5xl lg:text-6xl leading-tight">
            Catalog
          </h1>
          <p className="mt-3 text-base text-sage-400 leading-relaxed">
            Discover handcrafted candles, succulents, and decor — each piece
            thoughtfully made for mindful living.
          </p>
        </motion.div>

        {/* ---- Search + Actions row ---- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
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
                <span className="ml-1 rounded-full bg-terra-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {hasActiveFilters ? "!" : ""}
                </span>
              )}
            </Button>
          </div>
        </motion.div>

        {/* ---- Sort + Results row ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-5 flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-sm text-sage-400">
            <span className="font-semibold text-sage-600">{result.length}</span>{" "}
            product{result.length !== 1 ? "s" : ""}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-3 inline-flex items-center gap-1 text-xs text-terra-500 transition-colors hover:text-terra-600"
              >
                <RotateCcw className="h-3 w-3" />
                Clear all
              </button>
            )}
          </p>

          {/* Desktop sort */}
          <div className="hidden items-center gap-3 sm:flex">
            <label className="text-xs text-sage-400 font-medium">Sort by</label>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="appearance-none rounded-xl border border-sage-200/60 bg-white/60 backdrop-blur-sm py-2 pl-4 pr-10 text-sm text-sage-600 transition-all duration-300 focus:border-terra-400/60 focus:ring-4 focus:ring-terra-100/30 focus:bg-white focus:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sage-400" />
            </div>
          </div>
        </motion.div>

        {/* ---- Main layout ---- */}
        <div className="mt-8 flex gap-10">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
            resultCount={result.length}
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />

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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ProductGrid products={result} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-terra-50 to-cream-100">
                      <SearchX className="h-12 w-12 text-terra-300" />
                    </div>
                    <h2 className="mt-8 font-serif text-2xl font-bold text-sage-700">
                      No products found
                    </h2>
                    <p className="mt-3 max-w-sm text-sm text-sage-400 leading-relaxed">
                      Try adjusting your search or filters to find what
                      you&rsquo;re looking for.
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={resetFilters}
                      className="mt-10 gap-2"
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
