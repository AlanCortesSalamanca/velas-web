import Badge from "../ui/Badge";

const categoryLabels = {
  candles: "Candle",
  succulents: "Succulent",
  sets: "Gift Set",
  accessories: "Accessory",
};

const categoryVariants = {
  candles: "brand",
  succulents: "mint",
  sets: "rose",
  accessories: "lavender",
};

export default function ProductInfo({ name, category, description, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Badge variant={categoryVariants[category] || "default"} size="sm">
        {categoryLabels[category] || category}
      </Badge>
      <h3 className="font-medium text-sage-800 line-clamp-1 group-hover:text-terra-600 transition-colors duration-300">
        {name}
      </h3>
      <p className="text-sm text-sage-400 line-clamp-2 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}
