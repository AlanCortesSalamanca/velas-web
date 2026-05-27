import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";

import { getFeaturedProducts } from "../services/productsService";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import ProductGrid from "../components/product/ProductGrid";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "candles",
    label: "Candles",
    description: "Hand-poured floral and aromatic soy candles",
    image: "https://picsum.photos/seed/cat-candles/600/700",
    gradient: "from-brand-100 via-brand-50 to-transparent",
  },
  {
    id: "succulents",
    label: "Succulents",
    description: "Curated low-maintenance plants for every space",
    image: "https://picsum.photos/seed/cat-succulents/600/700",
    gradient: "from-mint-100 via-mint-50 to-transparent",
  },
  {
    id: "sets",
    label: "Gift Sets",
    description: "Curated bundles in beautiful gift boxes",
    image: "https://picsum.photos/seed/cat-sets/600/700",
    gradient: "from-rose-100 via-rose-50 to-transparent",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Ceramic planters, trays, and decor pieces",
    image: "https://picsum.photos/seed/cat-accessories/600/700",
    gradient: "from-lavender-100 via-lavender-50 to-transparent",
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

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Star rating                                                        */
/* ------------------------------------------------------------------ */

function Stars({ count = 5 }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

/* ================================================================== */
/*  Home page                                                          */
/* ================================================================== */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setFeaturedLoading(true);

    getFeaturedProducts()
      .then(({ data }) => {
        if (!mounted) return;
        setFeaturedProducts(data || []);
        console.log("[Home] Featured products loaded:", data?.length);
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
      {/*  HERO                                                             */}
      {/* ================================================================ */}
      <section aria-label="Hero" className="relative overflow-hidden bg-gradient-to-b from-sage-50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-50)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-mint-50)_0%,_transparent_60%)] pointer-events-none" />

        <Container className="relative z-10">
          <div className="flex min-h-[85vh] flex-col items-center gap-12 py-16 md:flex-row md:py-0">
            {/* ---- Text block ---- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 text-center md:text-left"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-brand-500"
              >
                Artisan Collection
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 font-serif text-4xl font-bold leading-tight text-sage-800 sm:text-5xl lg:text-6xl lg:leading-[1.1]"
              >
                Light, Life &{" "}
                <span className="text-brand-500">Artisan Beauty</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-sage-500 md:mx-0 md:text-lg"
              >
                Hand-poured flower candles and hand-selected succulents crafted
                to bring warmth, serenity, and timeless style into your home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
              >
                <Link to="/catalog">
                  <Button variant="primary" size="lg">
                    Explore Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ---- Image block ---- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              style={{ y: heroParallax }}
              className="relative flex-1"
            >
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl shadow-elevated">
                <img
                  src="https://picsum.photos/seed/hero-lifestyle/800/1000"
                  alt="Artisan candles and succulents in a cozy interior"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-3 -left-3 rounded-xl bg-white px-4 py-3 shadow-card md:-left-6"
              >
                <p className="whitespace-nowrap text-sm font-semibold text-sage-800">
                  Free shipping on orders over $50
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-3 -top-3 rounded-xl bg-white px-4 py-3 shadow-card md:-right-6"
              >
                <p className="text-sm font-semibold text-sage-800">
                  <span className="text-brand-500">100%</span> Handcrafted
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  FEATURED PRODUCTS                                                */}
      {/* ================================================================ */}
      <section aria-label="Featured products" className="py-20 sm:py-28">
        <Container>
          <SectionTitle subtitle="Featured Collection">
            Best Sellers
          </SectionTitle>
          <p className="mt-3 max-w-lg text-sage-500">
            Our most-loved pieces, chosen for their quality, scent, and
            timeless beauty.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-10"
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
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
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
      {/*  CATEGORIES                                                       */}
      {/* ================================================================ */}
      <section aria-label="Shop by category" className="bg-sage-50 py-20 sm:py-28">
        <Container>
          <SectionTitle subtitle="Shop by Category">
            Explore Our World
          </SectionTitle>
          <p className="mt-3 max-w-lg text-sage-500">
            From fragrant candles to living decor, find your perfect piece.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp} custom={0}>
                <Link
                  to={`/catalog`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-sage-100"
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-xl font-bold text-sage-800">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-sm text-sage-600">
                      {cat.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-600 opacity-0 transition-all group-hover:opacity-100">
                      Shop now <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  BRAND BENEFITS                                                   */}
      {/* ================================================================ */}
      <section aria-label="Why choose us" className="py-20 sm:py-28">
        <Container>
          <SectionTitle subtitle="Why Choose Us">
            The Velas Difference
          </SectionTitle>
          <p className="mt-3 max-w-lg text-sage-500">
            We pour care into every detail, from sourcing to packaging.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  custom={0}
                  className="group rounded-xl border border-sage-100 bg-white p-6 transition-smooth hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-100">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-bold text-sage-800">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sage-500">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  TESTIMONIALS                                                     */}
      {/* ================================================================ */}
      <section aria-label="Customer testimonials" className="bg-brand-50 py-20 sm:py-28">
        <Container>
          <SectionTitle subtitle="Customer Love">
            What People Are Saying
          </SectionTitle>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={0}
                className="flex flex-col rounded-xl bg-white p-6 shadow-soft"
              >
                <Stars count={t.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-sage-600">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-sage-100 pt-4">
                  <p className="text-sm font-semibold text-sage-800">
                    {t.name}
                  </p>
                  <p className="text-xs text-sage-400">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/*  WHATSAPP CTA                                                     */}
      {/* ================================================================ */}
      <section aria-label="Custom orders" className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-800 via-sage-700 to-sage-900 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-brand-400)_0%,_transparent_50%)] opacity-20 pointer-events-none" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              Custom Orders
            </span>

            <h2 className="mt-6 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Looking for Something Unique?
            </h2>

            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
              We love creating bespoke arrangements and personalized gifts.
              Tell us your vision and we&rsquo;ll make it reality.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/524431181055"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-sage-800 hover:bg-sage-100"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Request via WhatsApp
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Send us an email
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
