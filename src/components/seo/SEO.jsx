import { useEffect } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const SITE_NAME = "Velas & Succulentas";
const DEFAULT_DESC =
  "Artisan candles and hand-selected succulents crafted to bring warmth, serenity, and timeless style into your home.";
const DEFAULT_OG =
  "https://picsum.photos/seed/velas-og/1200/630";

export default function SEO({
  title,
  description = DEFAULT_DESC,
  ogImage = DEFAULT_OG,
  ogType = "website",
}) {
  useDocumentTitle(title);

  useEffect(() => {
    const setMeta = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title ? `${title} | ${SITE_NAME}` : SITE_NAME);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);
    setMeta("og:type", ogType);
    setMeta("og:site_name", SITE_NAME);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title ? `${title} | ${SITE_NAME}` : SITE_NAME);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
  }, [title, description, ogImage, ogType]);

  return null;
}
