import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SEO from "../components/seo/SEO";
import {
  Sparkles,
  Leaf,
  Palette,
  Gift,
  MessageCircle,
  Star,
  ChevronRight,
  ArrowRight,
  Heart,
} from "lucide-react";

import { getFeaturedProducts } from "../services/productsService";
import Container from "../components/ui/Container";
import Button, { MagneticButton } from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import ProductGrid from "../components/product/ProductGrid";
import { ProductCardSkeleton } from "../components/ui/Skeleton";
import { fadeUp, staggerContainer, scaleIn, slideLeft, slideRight, zoomIn, viewportOnce, viewportEarly } from "../utils/motion";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "candles",
    label: "Candles",
    description: "Hand-poured floral and aromatic soy candles",
    image: "https://picsum.photos/seed/cat-candles/600/700",
    accent: "from-terra-500/20 via-terra-50/40 to-transparent",
    badge: "brand",
  },
  {
    id: "succulents",
    label: "Succulents",
    description: "Curated low-maintenance plants for every space",
    image: "https://picsum.photos/seed/cat-succulents/600/700",
    accent: "from-mint-500/20 via-mint-50/40 to-transparent",
    badge: "mint",
  },
  {
    id: "sets",
    label: "Gift Sets",
    description: "Curated bundles in beautiful gift boxes",
    image: "https://picsum.photos/seed/cat-sets/600/700",
    accent: "from-rose-500/20 via-rose-50/40 to-transparent",
    badge: "rose",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Ceramic planters, trays, and decor pieces",
    image: "https://picsum.photos/seed/cat-accessories/600/700",
    accent: "from-lavender-500/20 via-lavender-50/40 to-transparent",
    badge: "lavender",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Handmade with Love",
    description:
      "Every candle is hand-poured in small batches using natural soy wax and essential oils.",
  },
  {
    icon: Leaf,
    title: "Premium Materials",
    description:
      "We source only the finest sustainable materials — from organic cotton wicks to artisanal ceramics.",
  },
  {
    icon: Palette,
    title: "Aesthetic Design",
    description:
      "Each product is curated to complement modern interiors with timeless elegance.",
  },
  {
    icon: Gift,
    title: "Custom Gifting",
    description:
      "Personalized gift sets with handwritten notes, custom packaging, and curated selections.",
  },
];

const testimonials = [
  {
    name: "Sofia Martinez",
    location: "Buenos Aires",
    rating: 5,
    text: "The rose candle is absolutely stunning. The scent fills my entire apartment and the ceramic vessel is too beautiful to hide.",
    product: "Rosa Floral Candle",
  },
  {
    name: "Carolina Vega",
    location: "Córdoba",
    rating: 5,
    text: "Ordered the Blush Succulent Trio for my desk and it brings me joy every single day. Impeccable packaging and healthy plants.",
    product: "Blush Succulent Trio",
  },
  {
    name: "Martina López",
    location: "Rosario",
    rating: 5,
    text: "The Pastel Dream Candle Set arrived in the most beautiful gift box. I gave them as gifts and everyone thought they were from a high-end boutique.",
    product: "Pastel Dream Candle Set",
  },
];

function Stars({ count = 5 }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb w-[500px] h-[500px] bg-terra-400/5 top-[-10%] right-[-10%] animate-float" style={{ animationDelay: "0s", animationDuration: "8s" }} />
      <div className="orb w-[400px] h-[400px] bg-sage-400/5 bottom-[-5%] left-[-5%] animate-float" style={{ animationDelay: "2s", animationDuration: "10s" }} />
      <div className="orb w-[300px] h-[300px] bg-cream-400/10 top-[40%] left-[30%] animate-float" style={{ animationDelay: "4s", animationDuration: "7s" }} />
    </div>
  );
}

/* ================================================================== */
/*  Home page                                                         */
/* ================================================================== */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setFeaturedLoading(true);
    getFeaturedProducts()
      .then(({ data }) => {
        if (!mounted) return;
        setFeaturedProducts(data || []);
      })
      .finally(() => {
        if (mounted) setFeaturedLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <SEO title="Home" description="Artisan candles and hand-selected succulents crafted to bring warmth, serenity, and timeless style into your home." />

      {/* ================================================================ */}
      {/*  CINEMATIC HERO                                                   */}
      {/* ================================================================ */}
      <section aria-label="Hero" className="relative min-h-screen overflow-hidden hero-gradient">
        <FloatingOrbs />

        <Container className="relative z-10 h-full">
          <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center gap-12 py-24 md:flex-row md:py-0">
            {/* Text block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ opacity: heroOpacity }}
              className="flex-1 text-center md:text-left"
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-terra-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-terra-500 animate-glow" />
                Artisan Collection
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-6 font-serif text-5xl font-bold leading-[1.1] text-sage-800 sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                Light, Life &{" "}
                <span className="text-gradient">Artisan Beauty</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sage-500 md:mx-0 md:text-lg"
              >
                Hand-poured flower candles and hand-selected succulents crafted
                to bring warmth, serenity, and timeless style into your home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
              >
                <Link to="/catalog">
                  <MagneticButton variant="primary" size="lg">
                    Explore Collection
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                  </Button>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-12 flex flex-wrap items-center gap-6 justify-center md:justify-start"
              >
                {["Handcrafted", "Premium Quality", "Sustainable"].map((text) => (
                  <span key={text} className="flex items-center gap-1.5 text-xs text-sage-400 font-medium">
                    <span className="h-1 w-1 rounded-full bg-terra-400" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ y: heroParallax }}
              className="relative flex-1"
            >
              <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl shadow-elevated group">
                <div className="absolute inset-0 bg-gradient-to-b from-sage-900/10 via-transparent to-sage-900/30 z-10" />
                <img
                  src="https://picsum.photos/seed/hero-lifestyle/800/1000"
                  alt="Artisan candles and succulents in a cozy interior"
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Ambient glow border */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating badge - bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 px-5 py-3.5 shadow-card md:-left-8"
              >
                <p className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-sage-700">
                  <span className="flex h-2 w-2 rounded-full bg-terra-500 animate-glow" />
                  Free shipping on orders over $50
                </p>
              </motion.div>

              {/* Floating badge - top */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -right-4 -top-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 px-5 py-3.5 shadow-card md:-right-8"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <span className="text-terra-500">100%</span> Handcrafted
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sage-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-8 rounded-full bg-gradient-to-b from-sage-300 to-transparent"
          />
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/*  FEATURED PRODUCTS                                               */}
      {/* ================================================================ */}
      <section aria-label="Featured products" className="relative py-28 sm:py-36">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle subtitle="Featured Collection">
              Best Sellers
            </SectionTitle>
            <p className="mt-4 max-w-xl text-sage-400 leading-relaxed">
              Our most-loved pieces, chosen for their quality, scent, and
              timeless beauty.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-12"
          >
            {featuredLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ProductGrid products={featuredProducts} columns={4} />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link to="/catalog">
              <Button variant="outline" size="md">
                View Full Catalog
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  CATEGORIES - editorial layout                                   */}
      {/* ================================================================ */}
      <section aria-label="Shop by category" className="relative py-28 sm:py-36 bg-gradient-to-b from-sage-50/50 to-cream-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle subtitle="Shop by Category">
              Explore Our World
            </SectionTitle>
            <p className="mt-4 max-w-xl text-sage-400 leading-relaxed">
              From fragrant candles to living decor, find your perfect piece.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((cat, i) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link
                  to="/catalog"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-sage-100"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-sage-900/10 to-transparent" />

                  {/* Category label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3">
                      {cat.id}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {cat.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/70 line-clamp-1">
                      {cat.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  BRAND BENEFITS                                                  */}
      {/* ================================================================ */}
      <section aria-label="Why choose us" className="relative py-28 sm:py-36">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle subtitle="Why Choose Us">
              The Velas Difference
            </SectionTitle>
            <p className="mt-4 max-w-xl text-sage-400 leading-relaxed">
              We pour care into every detail, from sourcing to packaging.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportEarly}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-sage-100/40 p-7 transition-all duration-500 hover:shadow-elevated hover:bg-white/70 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-terra-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-terra-50 to-cream-100 text-terra-500 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 font-serif text-lg font-bold text-sage-700">
                    {benefit.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-sage-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  TESTIMONIALS -  glass luxury cards                             */}
      {/* ================================================================ */}
      <section aria-label="Customer testimonials" className="relative py-28 sm:py-36 bg-gradient-to-b from-cream-100/30 to-cream-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle subtitle="Customer Love">
              What People Are Saying
            </SectionTitle>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 p-7 transition-all duration-500 hover:shadow-elevated hover:bg-white/60"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-terra-50/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Stars count={t.rating} />
                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-sage-500">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="relative mt-6 flex items-center gap-3 border-t border-sage-100/40 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-terra-100 to-cream-200 text-terra-600 font-serif text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sage-700">
                      {t.name}
                    </p>
                    <p className="text-xs text-sage-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  WHATSAPP CTA - premium conversion                              */}
      {/* ================================================================ */}
      <section aria-label="Custom orders" className="relative overflow-hidden py-28 sm:py-36">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sage-900 via-sage-800 to-sage-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,106,46,0.12)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(122,141,98,0.06)_0%,_transparent_50%)]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-terra-500/5 blur-[100px] animate-float" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cream-400/5 blur-[120px] animate-float" style={{ animationDuration: "10s", animationDelay: "2s" }} />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terra-400 animate-glow" />
              Custom Orders
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight"
            >
              Looking for Something{" "}
              <span className="text-gradient">Unique</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50"
            >
              We love creating bespoke arrangements and personalized gifts.
              Tell us your vision and we&rsquo;ll make it reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <a
                href="https://wa.me/524431181055"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="bg-white text-sage-800 hover:bg-cream-100 shadow-lg shadow-white/10"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Request via WhatsApp
                </MagneticButton>
              </a>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/60 hover:text-white hover:bg-white/5"
                >
                  Send us an email
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
