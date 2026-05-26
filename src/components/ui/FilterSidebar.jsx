import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { categoryOptions, sortOptions } from "../../utils/filterProducts";
import Button from "./Button";

function FilterGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-sage-400">
        {title}
      </p>
      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 group">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-smooth ${
          checked
            ? "border-brand-500 bg-brand-500"
            : "border-sage-300 bg-white group-hover:border-brand-300"
        }`}
      >
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
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
      <span className="text-sm text-sage-700 select-none">{label}</span>
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between group">
      <span className="text-sm text-sage-700 select-none">{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-smooth cursor-pointer ${
          checked ? "bg-brand-500" : "bg-sage-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-soft transition-smooth ${
            checked ? "translate-x-4" : "translate-x-0"
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
    <label className="flex cursor-pointer items-center gap-2.5 group">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-smooth ${
          checked
            ? "border-brand-500"
            : "border-sage-300 group-hover:border-brand-300"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-brand-500" />}
      </span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-sm text-sage-700 select-none">{label}</span>
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
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sage-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-sage-600" />
          <span className="text-sm font-semibold text-sage-800">Filters</span>
          {activeCount > 0 && (
            <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-sage-400 transition-colors hover:text-sage-600 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
        {/* Category */}
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

        <hr className="border-sage-100" />

        {/* Availability */}
        <FilterGroup title="Availability">
          <Toggle
            label="In stock only"
            checked={filters.inStock}
            onChange={(e) => update("inStock", e.target.checked)}
          />
        </FilterGroup>

        <hr className="border-sage-100" />

        {/* Featured */}
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

        <hr className="border-sage-100" />

        {/* Sort */}
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

      {/* Footer */}
      <div className="border-t border-sage-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-sage-400">{resultCount} products</p>
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
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-28 rounded-xl border border-sage-100 bg-white shadow-soft">
          {content}
        </div>
      </aside>

      {/* Mobile slide-over */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-sage-900/30 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-elevated lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
