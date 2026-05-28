import { motion } from "framer-motion";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col items-center justify-center py-20 text-center ${className}`}
    >
      {Icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-terra-50 to-cream-100">
          <Icon className="h-10 w-10 text-terra-300" />
        </div>
      )}
      <h3 className="mt-6 font-serif text-xl font-bold text-sage-700">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-sage-400 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  );
}
