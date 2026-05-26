import { motion } from "framer-motion";

export default function SectionTitle({ subtitle, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {subtitle && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
          {subtitle}
        </span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="font-serif text-2xl font-bold text-sage-800 sm:text-3xl lg:text-4xl"
      >
        {children}
      </motion.h2>
    </div>
  );
}
