import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import SEO from "../components/seo/SEO";
import Container from "../components/ui/Container";
import { fadeUp, staggerContainer, viewportOnce } from "../utils/motion";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Velas & Succulentas. We'd love to hear from you about custom orders or questions."
      />
      <Container as="section" aria-label="Contact us" className="py-20 sm:py-28">
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
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-3 font-serif text-4xl font-bold text-sage-800 sm:text-5xl lg:text-6xl leading-tight"
          >
            Let&rsquo;s Connect
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-3 text-base text-sage-400">
            We&rsquo;d love to hear from you.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-14 grid gap-8 sm:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="space-y-7">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-sage-100/40 transition-all duration-300 hover:shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terra-50/80 text-terra-500">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-400">Email</p>
                <p className="text-sm text-sage-600 font-medium">hello@velasysucculentas.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-sage-100/40 transition-all duration-300 hover:shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terra-50/80 text-terra-500">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-400">Location</p>
                <p className="text-sm text-sage-600 font-medium">Buenos Aires, Argentina</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-sage-100/40 transition-all duration-300 hover:shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-terra-50/80 text-terra-500">
                <MessageCircle className="h-5 w-5 text-[#25D366]" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-400">WhatsApp</p>
                <p className="text-sm text-sage-600 font-medium">+52 443 118 1055</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl bg-white/40 backdrop-blur-sm border border-sage-100/40 p-8 transition-all duration-300 hover:shadow-card">
            <h3 className="font-serif text-lg font-bold text-sage-700">Send a Message</h3>
            <p className="mt-2 text-sm text-sage-400 leading-relaxed">
              Our contact form is coming soon. In the meantime, reach us via email or WhatsApp for
              custom orders, questions, or just to say hello.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-sage-400">
              <span className="h-2 w-2 rounded-full bg-terra-400 animate-glow" />
              We typically respond within 24 hours
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
}
