import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn the story behind Velas & Succulentas — artisan candles and succulents born from a love for slow living and natural beauty."
      />
      <Container as="section" aria-label="About us" className="py-20 sm:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-terra-500"
          >
            <Sparkles className="h-3 w-3" />
            Our Story
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-3 font-serif text-4xl font-bold text-sage-800 sm:text-5xl lg:text-6xl leading-tight"
          >
            The Art of Mindful Living
          </motion.h1>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-sage-500"
        >
          <motion.p variants={fadeUp}>
            Velas & Succulentas was born from a love for slow living, natural beauty, and the
            quiet joy of handcrafted things.
          </motion.p>
          <motion.p variants={fadeUp}>
            We carefully source and create each candle and succulent arrangement to bring a sense of
            calm and intention into your home. Every product is made with sustainable materials and a
            deep respect for the craft.
          </motion.p>
          <motion.p variants={fadeUp}>
            This is a concept store — a celebration of design, nature, and warmth.
          </motion.p>
        </motion.div>
      </Container>
    </>
  );
}
