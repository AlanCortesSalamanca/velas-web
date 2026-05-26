const variants = {
  default: "bg-sage-100 text-sage-700",
  brand: "bg-brand-100 text-brand-700",
  rose: "bg-rose-100 text-rose-600",
  peach: "bg-peach-100 text-peach-600",
  mint: "bg-mint-100 text-mint-600",
  lavender: "bg-lavender-100 text-lavender-600",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
