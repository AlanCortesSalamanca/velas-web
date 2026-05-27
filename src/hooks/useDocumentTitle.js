import { useEffect } from "react";

const BASE = "Velas & Succulentas";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${BASE}` : BASE;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
