import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">Get in Touch</h1>
        <p className="mt-2 text-sage-600">
          We&apos;d love to hear from you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 grid gap-8 sm:grid-cols-2"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sage-600">
            <Mail className="h-5 w-5 text-brand-500" />
            <span>hello@velasysucculentas.com</span>
          </div>
          <div className="flex items-center gap-3 text-sage-600">
            <MapPin className="h-5 w-5 text-brand-500" />
            <span>Buenos Aires, Argentina</span>
          </div>
        </div>

        <div className="rounded-lg border border-sage-200 bg-sage-50 p-6">
          <p className="text-sm text-sage-500">
            Contact form coming soon.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
