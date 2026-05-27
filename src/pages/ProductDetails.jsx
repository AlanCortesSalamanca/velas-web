import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  ChevronRight,
  Home,
  Leaf,
  Sparkles,
  Ruler,
  Package,
  Minus,
  Plus,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ProductGrid from "../components/product/ProductGrid";
import ProductImage from "../components/product/ProductImage";

const categoryVariant = {
  candles: "brand",
  succulents: "mint",
  sets: "rose",
  accessories: "lavender",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-50 text-sage-500">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-sage-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-sage-700">{value}</p>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Package className="h-16 w-16 text-sage-200" />
          <h1 className="mt-6 font-serif text-2xl font-bold text-sage-800">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-sage-500">
            The item you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link to="/catalog">
            <Button variant="primary" size="md" className="mt-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Button>
          </Link>
        </motion.div>
      </Container>
    );
  }

  const related = getRelatedProducts(product);
  const favorited = isFavorite(product.id);
  const gallery = [product.image, ...(product.galleryImages || [])];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <SEO
        title={product.name}
        description={`${product.name} — ${product.description.substring(0, 120)}`}
      />

      {/* ================================================================ */}
      {/*  BREADCRUMB                                                       */}
      {/* ================================================================ */}
      <Container className="pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sage-400">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-brand-600"
          >
            <Home className="h-3 w-3" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/catalog"
            className="transition-colors hover:text-brand-600"
          >
            Catalog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-sage-600">{product.name}</span>
        </nav>
      </Container>

      {/* ================================================================ */}
      {/*  PRODUCT DETAILS                                                  */}
      {/* ================================================================ */}
      <Container className="py-6 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ---- Image gallery ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-sage-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProductImage
                    src={gallery[selectedImage]}
                    alt={product.name}
                    className="aspect-[4/5] w-full rounded-none"
                  />
                </motion.div>
              </AnimatePresence>

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage - 1 + gallery.length) % gallery.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-sage-600 shadow-soft backdrop-blur-sm transition-colors hover:bg-white hover:text-sage-800"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage + 1) % gallery.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-sage-600 shadow-soft backdrop-blur-sm transition-colors hover:bg-white hover:text-sage-800"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 transition-smooth ${
                      i === selectedImage
                        ? "border-brand-400 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ---- Product info ---- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col"
          >
            <motion.div variants={fadeUp}>
              <Badge
                variant={categoryVariant[product.category] || "default"}
                size="md"
              >
                {product.category === "candles"
                  ? "Candle"
                  : product.category === "succulents"
                  ? "Succulent"
                  : product.category === "sets"
                  ? "Gift Set"
                  : "Accessory"}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-3 font-serif text-3xl font-bold text-sage-800 sm:text-4xl"
            >
              {product.name}
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-3">
              <span className="text-2xl font-semibold text-sage-800">
                ${product.price.toFixed(2)}
              </span>
            </motion.div>

            <motion.hr variants={fadeUp} className="my-6 border-sage-100" />

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-sage-600"
            >
              {product.description}
            </motion.p>

            {/* ---- Stock status ---- */}
            <motion.div variants={fadeUp} className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  product.stock > 0 ? "text-mint-600" : "text-rose-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.stock > 0 ? "bg-mint-500" : "bg-rose-400"
                  }`}
                />
                {product.stock > 0
                  ? `In stock (${product.stock} available)`
                  : "Out of stock"}
              </span>
            </motion.div>

            {/* ---- Handcrafted details ---- */}
            {product.handcraftedDetails && (
              <motion.div
                variants={fadeUp}
                className="mt-6 rounded-xl border border-sage-100 bg-sage-50/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                      The Making of
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-sage-600">
                      {product.handcraftedDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---- Details grid ---- */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <DetailRow
                icon={Leaf}
                label="Materials"
                value={product.materials}
              />
              {product.fragrance && (
                <DetailRow
                  icon={Sparkles}
                  label="Fragrance"
                  value={product.fragrance}
                />
              )}
              <DetailRow
                icon={Ruler}
                label="Dimensions"
                value={product.dimensions}
              />
              <DetailRow
                icon={Package}
                label="Category"
                value={
                  product.category === "candles"
                    ? "Candle"
                    : product.category === "succulents"
                    ? "Succulent"
                    : product.category === "sets"
                    ? "Gift Set"
                    : "Accessory"
                }
              />
            </motion.div>

            <motion.hr variants={fadeUp} className="my-8 border-sage-100" />

            {/* ---- Actions ---- */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-sage-400">
                  Desired qty
                </span>
                <div className="flex items-center gap-1 rounded-lg border border-sage-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-sage-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                disabled={!product.stock}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4" />
                {added
                  ? "Added to Selection!"
                  : product.stock
                  ? `Add to Selection`
                  : "Out of Stock"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleFavorite(product.id, product.name)}
                className={favorited ? "border-rose-200 text-rose-500 hover:border-rose-300 hover:text-rose-600" : ""}
              >
                <Heart
                  className={`h-4 w-4 transition-smooth ${
                    favorited ? "fill-rose-500" : ""
                  }`}
                />
                {favorited ? "Saved" : "Save"}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-center text-[11px] text-sage-400 sm:text-left"
            >
              Quantity indicates desired pieces for your quote. Price per unit is
              fixed.
            </motion.p>
          </motion.div>
        </div>
      </Container>

      {/* ================================================================ */}
      {/*  RELATED PRODUCTS                                                 */}
      {/* ================================================================ */}
      {related.length > 0 && (
        <section aria-label="Related products" className="border-t border-sage-100 py-16 sm:py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-2xl font-bold text-sage-800">
                You May Also Love
              </h2>
              <p className="mt-1 text-sm text-sage-500">
                More handcrafted pieces from the same collection.
              </p>
            </motion.div>

            <div className="mt-8">
              <ProductGrid products={related} columns={4} />
            </div>
          </Container>
        </section>
      )}

      {/* ================================================================ */}
      {/*  MOBILE STICKY CTA                                                */}
      {/* ================================================================ */}
      <div className="sticky bottom-0 z-40 border-t border-sage-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:hidden" role="toolbar" aria-label="Product actions">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-sage-800">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-[11px] text-sage-400">Per unit</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-sage-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-9 w-9 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-sage-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-9 w-9 items-center justify-center text-sage-500 transition-colors hover:text-sage-800"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleAdd}
              disabled={!product.stock}
              className="whitespace-nowrap"
            >
              <ShoppingCart className="h-4 w-4" />
              {added ? "Added!" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
