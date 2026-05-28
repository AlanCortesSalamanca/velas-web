import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function AnimatedValue({ value, decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isNumeric = typeof value === "number" || (!isNaN(parseFloat(value)) && value !== undefined);

  useEffect(() => {
    if (!isNumeric) return;
    const target = parseFloat(value);
    const duration = 1200;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;

  return <span>{display.toFixed(decimals)}</span>;
}

export default function AdminStatCard({
  icon: Icon,
  label,
  value,
  index = 0,
  className = "",
}) {
  const isCurrency = typeof value === "string" && value.startsWith("$");
  const numValue = isCurrency ? parseFloat(value.replace("$", "")) : value;
  const decimals = isCurrency ? 2 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60 p-6 hover:shadow-elevated hover:bg-white/80 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-terra-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage-400">
              {label}
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-sage-800">
              {isCurrency && <span>$</span>}
              <AnimatedValue value={numValue} decimals={decimals} />
            </p>
          </div>
          {Icon && (
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-terra-50/80 text-terra-500 group-hover:bg-terra-100/80 group-hover:scale-110 transition-all duration-300">
              <Icon className="h-5 w-5" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
