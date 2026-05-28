import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ProductImage({ src, alt, className = "", aspectRatio = "aspect-[4/5]", zoom = false }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current || !zoom) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={imgRef}
      onMouseMove={zoom ? handleMouseMove : undefined}
      onMouseLeave={zoom ? handleMouseLeave : undefined}
      className={`relative ${aspectRatio} overflow-hidden rounded-2xl bg-gradient-to-br from-sage-100/80 to-cream-100/60 ${className}`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sage-100 to-cream-100" />
      )}
      {error ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sage-100/50 to-cream-100/50 text-sage-300">
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setError(true); }}
          animate={zoom ? { x: tilt.x, y: tilt.y } : undefined}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "transform" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-sage-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
