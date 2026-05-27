import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-sage-100 ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-sage-200" />
      )}
      {error ? (
        <div className="flex h-full w-full items-center justify-center bg-sage-100 text-sage-300">
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          className={`h-full w-full object-cover transition-smooth duration-700 hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
