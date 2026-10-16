import type { Variants, Transition } from "motion/react";

// Silk-smooth easing -- no springs, no bounce
export const silkEase = [0.25, 0.1, 0.25, 1.0] as [
  number,
  number,
  number,
  number,
];

export const silkTransition: Transition = {
  duration: 0.7,
  ease: silkEase,
};

// Fade in from below
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: silkEase },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: silkEase },
  },
};

// Letter-by-letter reveal
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: silkEase,
    },
  }),
};

// Scale in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: silkEase },
  },
};
