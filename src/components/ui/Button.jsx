import { forwardRef } from "react";

const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-soft hover:shadow-card",
  secondary:
    "bg-sage-100 text-sage-800 hover:bg-sage-200 active:bg-sage-300",
  outline:
    "border border-sage-300 text-sage-700 hover:border-brand-400 hover:text-brand-600",
  ghost:
    "text-sage-600 hover:bg-sage-100 hover:text-sage-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", className = "", children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-smooth cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
