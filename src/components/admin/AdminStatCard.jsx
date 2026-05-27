import { motion } from "framer-motion";

export default function AdminStatCard({
  icon: Icon,
  label,
  value,
  index = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-xl border border-sage-100 bg-white p-5 shadow-soft ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-sage-400">
            {label}
          </p>
          <p className="mt-1.5 font-serif text-2xl font-bold text-sage-800">
            {value}
          </p>
        </div>
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </motion.div>
  );
}
