import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn the story behind Velas & Succulentas — artisan candles and succulents born from a love for slow living and natural beauty."
      />
      <Container className="py-16" as="section" aria-label="About us">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">Our Story</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-3xl space-y-4 text-sage-600"
        >
          <p>
            Velas & Succulentas was born from a love for slow living, natural beauty, and the
            quiet joy of handcrafted things.
          </p>
          <p>
            We carefully source and create each candle and succulent arrangement to bring a sense of
            calm and intention into your home. Every product is made with sustainable materials and a
            deep respect for the craft.
          </p>
          <p>
            This is a concept store — a celebration of design, nature, and warmth.
          </p>
        </motion.div>
      </Container>
    </>
  );
}
