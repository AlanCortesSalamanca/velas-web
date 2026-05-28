import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-terra-500 text-cream-50 hover:bg-terra-600 active:bg-terra-700 shadow-soft hover:shadow-glow",
  secondary:
    "bg-cream-100 text-sage-700 hover:bg-cream-200 active:bg-cream-300 border border-cream-200",
  outline:
    "border border-sage-300/60 text-sage-600 hover:border-terra-400 hover:text-terra-600 hover:bg-terra-50/50",
  ghost:
    "text-sage-500 hover:text-sage-800 hover:bg-sage-100/60",
  glass:
    "glass text-sage-700 hover:bg-white/80 hover:shadow-card",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-wider",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
  xl: "px-10 py-4 text-lg",
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", className = "", children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2.5 font-medium rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 uppercase tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export function MagneticButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const ref = useRef(null);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`inline-flex items-center justify-center gap-2.5 font-medium rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 uppercase tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
