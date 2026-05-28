import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { categoryOptions, sortOptions } from "../../utils/filterProducts";
import Button from "./Button";

function FilterGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-400">
        {title}
      </p>
      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 group">
      <span
        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300 ${
          checked
            ? "border-terra-400 bg-terra-500 shadow-sm"
            : "border-sage-300/60 bg-white group-hover:border-terra-300/60"
        }`}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-sm text-sage-600 select-none group-hover:text-sage-800 transition-colors duration-200">
        {label}
      </span>
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between group">
      <span className="text-sm text-sage-600 select-none group-hover:text-sage-800 transition-colors duration-200">
        {label}
      </span>
      <span
        className={`relative inline-flex h-5.5 w-10 shrink-0 rounded-full border-2 border-transparent transition-all duration-300 cursor-pointer ${
          checked ? "bg-terra-400" : "bg-sage-200/60"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-all duration-300 ${
            checked ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}

function SortRadio({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 group">
      <span
        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          checked
            ? "border-terra-400"
            : "border-sage-300/60 group-hover:border-terra-300/60"
        }`}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-terra-500 shadow-sm" />}
      </span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-sm text-sage-600 select-none group-hover:text-sage-800 transition-colors duration-200">
        {label}
      </span>
    </label>
  );
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  resultCount,
  isOpen,
  onClose,
}) {
  const activeCount =
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.hasFragrance ? 1 : 0);

  const update = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleCategory = (catId) => {
    const next = filters.categories.includes(catId)
      ? filters.categories.filter((c) => c !== catId)
      : [...filters.categories, catId];
    update("categories", next);
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-sage-100/60 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-sage-400" />
          <span className="text-sm font-semibold text-sage-700">Filters</span>
          {activeCount > 0 && (
            <span className="rounded-full bg-terra-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-sage-300 transition-colors hover:text-sage-500 lg:hidden"
          aria-label="Close filters"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        <FilterGroup title="Category">
          {categoryOptions.map((cat) => (
            <Checkbox
              key={cat.id}
              label={cat.label}
              checked={filters.categories.includes(cat.id)}
              onChange={() => toggleCategory(cat.id)}
            />
          ))}
        </FilterGroup>

        <hr className="border-sage-100/60" />

        <FilterGroup title="Availability">
          <Toggle
            label="In stock only"
            checked={filters.inStock}
            onChange={(e) => update("inStock", e.target.checked)}
          />
        </FilterGroup>

        <hr className="border-sage-100/60" />

        <FilterGroup title="Curated">
          <Toggle
            label="Featured products"
            checked={filters.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          <Toggle
            label="Has fragrance"
            checked={filters.hasFragrance}
            onChange={(e) => update("hasFragrance", e.target.checked)}
          />
        </FilterGroup>

        <hr className="border-sage-100/60" />

        <FilterGroup title="Sort by">
          {sortOptions.map((opt) => (
            <SortRadio
              key={opt.id}
              label={opt.label}
              checked={filters.sortBy === opt.id}
              onChange={() => update("sortBy", opt.id)}
            />
          ))}
        </FilterGroup>
      </div>

      <div className="border-t border-sage-100/60 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-sage-400 font-medium">
            {resultCount} product{resultCount !== 1 ? "s" : ""}
          </p>
          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="gap-1.5"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-28 rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60 shadow-soft">
          {content}
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-sage-900/20 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-cream-50 shadow-elevated lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
