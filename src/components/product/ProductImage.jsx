import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-sage-100 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-sage-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-smooth duration-700 hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
