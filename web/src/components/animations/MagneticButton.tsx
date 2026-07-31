"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { useI18n } from "@/lib/i18n/provider";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "light" | "ghost";
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  external = true,
}: Props) {
  const { dir } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.22);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "inline-flex min-h-[48px] items-center justify-center gap-2 px-6 text-[0.72rem] font-medium tracking-[0.14em] uppercase will-change-transform",
        variant === "solid" && "bg-olive text-bone",
        variant === "light" && "border border-white/40 bg-[#fafaf8] text-olive",
        variant === "ghost" && "border-b border-white/55 bg-transparent px-0 text-white",
        className,
      )}
    >
      {children}
      <span aria-hidden className="opacity-70">
        {dir === "rtl" ? "←" : "→"}
      </span>
    </motion.a>
  );
}
