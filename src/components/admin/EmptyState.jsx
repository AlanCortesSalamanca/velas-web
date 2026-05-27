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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
          <Icon className="h-8 w-8 text-sage-300" />
        </div>
      )}
      <h3 className="mt-5 font-serif text-lg font-bold text-sage-800">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-sage-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
