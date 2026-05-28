import { forwardRef } from "react";

const variants = {
  solid: "bg-terra-500 text-cream-50 hover:bg-terra-600 shadow-soft hover:shadow-glow",
  ghost: "text-sage-400 hover:text-sage-700 hover:bg-sage-100/60",
  glass: "glass text-sage-500 hover:text-sage-800 hover:bg-white/80",
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-12 w-12",
};

const IconButton = forwardRef(function IconButton(
  { variant = "ghost", size = "md", label, className = "", children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default IconButton;
