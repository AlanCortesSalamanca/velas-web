export default function ProductPrice({ price, originalPrice, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-base font-semibold text-sage-800">
        ${price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-sm text-sage-300 line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
