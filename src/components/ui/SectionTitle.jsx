import { motion } from "framer-motion";
import { viewportOnce } from "../../utils/motion";

export default function SectionTitle({ subtitle, children, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-terra-500"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-serif text-3xl font-bold text-sage-800 sm:text-4xl lg:text-5xl leading-tight"
      >
        {children}
      </motion.h2>
    </div>
  );
}
