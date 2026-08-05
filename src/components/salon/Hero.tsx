import { motion } from "framer-motion";
import { ArrowDown, MapPin, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { GoldButton } from "./GoldButton";
import { fadeUp, stagger } from "./motion";

const words = ["Experience", "Luxury.", "Redefine", "Your", "Style."];

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt="Interior of A Dream Light Professional Family Salon in Jamshedpur"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold"
          >
            <MapPin size={12} /> Dhirajganj, Jamshedpur
          </motion.p>

          <h1 className="mt-8 flex flex-wrap justify-center gap-x-4 text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w + i}
                variants={fadeUp}
                className={i === 1 || i === 4 ? "text-gradient-gold italic" : ""}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Jamshedpur's premium family salon for hair artistry, advanced skin
            care, bridal glamour and restorative spa rituals.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <GoldButton onClick={onBook}>Book Appointment</GoldButton>
            <a href="#services">
              <GoldButton variant="ghost">Explore Services</GoldButton>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="glass-card mt-14 flex items-center gap-3 rounded-2xl px-5 py-3"
        >
          <div className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <p className="text-xs text-champagne sm:text-sm">
            <span className="font-semibold">4.9/5</span> Average Rating
            <span className="text-muted-foreground"> (67+ Reviews)</span>
          </p>
        </motion.div>

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-gold/60 hover:text-gold"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
