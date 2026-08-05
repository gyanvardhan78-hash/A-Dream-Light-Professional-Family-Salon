import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  full?: boolean;
};

export function GoldButton({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  full,
}: Props) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
        full && "w-full",
        variant === "primary"
          ? "bg-[image:var(--gradient-gold)] text-primary-foreground gold-glow"
          : "border border-gold/40 text-champagne hover:border-gold hover:bg-gold/10",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
