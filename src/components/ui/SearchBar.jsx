import { Search, X } from "lucide-react";
import { useRef } from "react";

export default function SearchBar({ value, onChange, placeholder, className = "" }) {
  const inputRef = useRef(null);

  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search products..."}
        className="w-full rounded-xl border border-sage-200 bg-white py-3 pl-10 pr-10 text-sm text-sage-800 placeholder:text-sage-400 transition-smooth focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 transition-colors hover:text-sage-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
