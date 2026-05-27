import { forwardRef } from "react";

const variants = {
  solid: "bg-brand-500 text-white hover:bg-brand-600",
  ghost: "text-sage-600 hover:bg-sage-100 hover:text-sage-800",
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
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
      className={`inline-flex items-center justify-center rounded-full transition-smooth cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default IconButton;
