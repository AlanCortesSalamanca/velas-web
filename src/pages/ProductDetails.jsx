import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
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
  Check,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "../services/productsService";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import Button, { MagneticButton } from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ProductGrid from "../components/product/ProductGrid";
import ProductImage from "../components/product/ProductImage";
import { ProductDetailsSkeleton } from "../components/ui/Skeleton";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

const categoryVariant = {
  candles: "brand",
  succulents: "mint",
  sets: "rose",
  accessories: "lavender",
};

const categoryLabels = {
  candles: "Candle",
  succulents: "Succulent",
  sets: "Gift Set",
  accessories: "Accessory",
};

function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 group">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-terra-50/60 text-terra-500 group-hover:bg-terra-100/60 transition-all duration-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-sage-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-sage-600">{value}</p>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setQuantity(1);
    setSelectedImage(0);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const load = async () => {
      const { data: productData } = await getProductById(id);
      if (!mounted) return;
      setProduct(productData);

      if (productData) {
        const { data: relatedData } = await getRelatedProducts(productData.category, productData.id);
        if (mounted) setRelated(relatedData || []);
      }
      if (mounted) setLoading(false);
    };

    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <>
        <SEO title="Loading..." />
        <Container className="pt-8 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sage-400">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-terra-600">
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/catalog" className="transition-colors hover:text-terra-600">Catalog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-sage-500">...</span>
          </nav>
        </Container>
        <Container className="py-8 sm:py-12">
          <ProductDetailsSkeleton />
        </Container>
      </>
    );
  }

  if (!product) {
    return (
      <Container className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-terra-50 to-cream-100">
            <Package className="h-12 w-12 text-terra-300" />
          </div>
          <h1 className="mt-8 font-serif text-3xl font-bold text-sage-700">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-sage-400">
            The item you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link to="/catalog">
            <Button variant="primary" size="md" className="mt-10">
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Button>
          </Link>
        </motion.div>
      </Container>
    );
  }

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
      {/*  BREADCRUMB                                                      */}
      {/* ================================================================ */}
      <Container className="pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sage-400">
          <Link to="/" className="flex items-center gap-1 transition-colors hover:text-terra-600">
            <Home className="h-3 w-3" /> Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalog" className="transition-colors hover:text-terra-600">Catalog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-sage-600">{product.name}</span>
        </nav>
      </Container>

      {/* ================================================================ */}
      {/*  PRODUCT DETAILS - cinematic layout                             */}
      {/* ================================================================ */}
      <Container className="py-8 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---- Image gallery ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-100/80 to-cream-100/60 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductImage
                    src={gallery[selectedImage]}
                    alt={product.name}
                    className="aspect-[4/5] w-full rounded-none"
                    zoom
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage - 1 + gallery.length) % gallery.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 backdrop-blur-md p-2.5 text-sage-600 shadow-soft transition-all duration-300 hover:bg-white/70 hover:text-sage-800 hover:scale-105"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 backdrop-blur-md p-2.5 text-sage-600 shadow-soft transition-all duration-300 hover:bg-white/70 hover:text-sage-800 hover:scale-105"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      i === selectedImage
                        ? "border-terra-400 opacity-100 shadow-md"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-20 w-20 object-cover sm:h-24 sm:w-24"
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
            variants={staggerContainer}
            className="flex flex-col"
          >
            <motion.div variants={fadeUp}>
              <Badge variant={categoryVariant[product.category] || "default"} size="md">
                {categoryLabels[product.category] || product.category}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-4 font-serif text-4xl font-bold text-sage-800 sm:text-5xl leading-tight"
            >
              {product.name}
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-4">
              <span className="text-3xl font-semibold text-sage-800">
                ${product.price.toFixed(2)}
              </span>
            </motion.div>

            <motion.hr variants={fadeUp} className="my-8 border-sage-100/60" />

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-sage-500"
            >
              {product.description}
            </motion.p>

            {/* ---- Stock status ---- */}
            <motion.div variants={fadeUp} className="mt-5">
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  product.stock > 0 ? "text-mint-600" : "text-rose-400"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
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
                className="mt-8 rounded-2xl bg-gradient-to-br from-terra-50/60 to-cream-100/60 border border-terra-100/40 p-5"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-terra-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-terra-500">
                      The Making of
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-sage-500">
                      {product.handcraftedDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ---- Details grid ---- */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <DetailRow icon={Leaf} label="Materials" value={product.materials} />
              {product.fragrance && (
                <DetailRow icon={Sparkles} label="Fragrance" value={product.fragrance} />
              )}
              <DetailRow icon={Ruler} label="Dimensions" value={product.dimensions} />
              <DetailRow
                icon={Package}
                label="Category"
                value={categoryLabels[product.category] || product.category}
              />
            </motion.div>

            <motion.hr variants={fadeUp} className="my-10 border-sage-100/60" />

            {/* ---- Actions ---- */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-400">
                  Desired qty
                </span>
                <div className="flex items-center gap-0.5 rounded-xl border border-sage-200/60 bg-white/60 backdrop-blur-sm overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-11 w-11 items-center justify-center text-sage-400 transition-all duration-200 hover:text-sage-800 hover:bg-sage-50/60"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-sage-800 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center text-sage-400 transition-all duration-200 hover:text-sage-800 hover:bg-sage-50/60"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton
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
              </MagneticButton>

              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleFavorite(product.id, product.name)}
                className={`transition-all duration-300 ${
                  favorited
                    ? "border-rose-200/80 text-rose-500 hover:border-rose-300 hover:text-rose-600 bg-rose-50/40"
                    : ""
                }`}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-300 ${
                    favorited ? "fill-rose-500" : ""
                  }`}
                />
                {favorited ? "Saved" : "Save"}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-center text-[11px] text-sage-400 sm:text-left"
            >
              Quantity indicates desired pieces for your quote. Price per unit is fixed.
            </motion.p>
          </motion.div>
        </div>
      </Container>

      {/* ================================================================ */}
      {/*  RELATED PRODUCTS                                               */}
      {/* ================================================================ */}
      {related.length > 0 && (
        <section aria-label="Related products" className="border-t border-sage-100/40 py-20 sm:py-28 bg-gradient-to-b from-transparent to-sage-50/20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl font-bold text-sage-700">
                You May Also Love
              </h2>
              <p className="mt-2 text-sm text-sage-400">
                More handcrafted pieces from the same collection.
              </p>
            </motion.div>

            <div className="mt-10">
              <ProductGrid products={related} columns={4} />
            </div>
          </Container>
        </section>
      )}

      {/* ================================================================ */}
      {/*  MOBILE STICKY CTA                                              */}
      {/* ================================================================ */}
      <div className="sticky bottom-0 z-40 border-t border-sage-100/40 bg-cream-50/80 backdrop-blur-xl supports-[backdrop-filter]:bg-cream-50/60 lg:hidden" role="toolbar" aria-label="Product actions">
        <div className="flex items-center gap-3 px-5 py-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-sage-700">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-[11px] text-sage-400">Per unit</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 rounded-xl border border-sage-200/60 bg-white/60 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-9 w-9 items-center justify-center text-sage-400 transition-colors hover:text-sage-800"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-sage-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-9 w-9 items-center justify-center text-sage-400 transition-colors hover:text-sage-800"
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
