const variants = {
  default: "bg-sage-100/80 text-sage-600",
  brand: "bg-terra-100/80 text-terra-700",
  rose: "bg-rose-100/80 text-rose-600",
  mint: "bg-mint-100/80 text-mint-600",
  lavender: "bg-lavender-100/80 text-lavender-600",
  cream: "bg-cream-200/80 text-cream-800",
  gold: "bg-gold-100/80 text-gold-700",
  blush: "bg-blush-100/80 text-blush-600",
};

const sizes = {
  sm: "px-2.5 py-0.5 text-[10px] tracking-wider",
  md: "px-3 py-1 text-xs tracking-wider",
  lg: "px-4 py-1.5 text-sm",
};

export default function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full uppercase ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
