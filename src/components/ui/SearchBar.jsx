import { Search, X } from "lucide-react";
import { useRef } from "react";

export default function SearchBar({ value, onChange, placeholder, className = "" }) {
  const inputRef = useRef(null);

  return (
    <div className={`relative group ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-300 transition-colors group-focus-within:text-terra-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search products..."}
        className="w-full rounded-2xl border border-sage-200/60 bg-white/80 py-3.5 pl-11 pr-11 text-sm text-sage-800 placeholder:text-sage-400 transition-all duration-300 focus:border-terra-400/60 focus:ring-4 focus:ring-terra-100/40 focus:bg-white focus:outline-none backdrop-blur-sm"
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-300 transition-colors hover:text-sage-500"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
