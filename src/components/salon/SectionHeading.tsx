import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "./motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <motion.p
        variants={fadeUp}
        className="text-xs font-medium uppercase tracking-[0.35em] text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
