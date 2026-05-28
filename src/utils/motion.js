export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const letterReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 2px 8px rgba(60, 69, 51, 0.06)" },
  hover: {
    y: -4,
    boxShadow: "0 20px 60px rgba(60, 69, 51, 0.12)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const imageReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const magnetic = (x, y) => ({
  rest: { x: 0, y: 0 },
  hover: { x, y, transition: { type: "spring", stiffness: 300, damping: 15 } },
});

export const glassReveal = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)", background: "rgba(255,255,255,0)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.6)",
    transition: { duration: 0.6 },
  },
};

export const viewportOnce = { once: true, margin: "-60px" };
export const viewportEarly = { once: true, margin: "-120px" };
