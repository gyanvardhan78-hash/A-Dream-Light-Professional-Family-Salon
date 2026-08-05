import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, viewport } from "./motion";

const reviews = [
  {
    name: "Priya Agarwal",
    initials: "PA",
    when: "2 weeks ago",
    text: "Got my keratin done here before my sister's wedding and the results were unreal. The VIP room made it feel like a 5-star spa, not a salon in Jamshedpur. Worth every rupee.",
  },
  {
    name: "Rohit Mahato",
    initials: "RM",
    when: "1 month ago",
    text: "The master barber genuinely understands face shapes. Cleanest fade and beard sculpt I've had in Jharkhand, and the online booking meant zero waiting time.",
  },
  {
    name: "Sneha Kumari",
    initials: "SK",
    when: "3 months ago",
    text: "Booked the pre-bridal package. The team tracked my skin for four weeks and my bridal HD makeup lasted 14 hours through everything. Highly recommend to every bride.",
  },
];

export function Reviews() {
  const [i, setI] = useState(0);
  const r = reviews[i]!;

  return (
    <section id="reviews" className="section-pad px-5">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Google Reviews"
          title="4.9 stars from 67+ guests"
          subtitle="What families across Jamshedpur say after their visit."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="glass-card relative mt-12 overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <Quote className="absolute -top-2 right-6 text-gold/15" size={110} />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-6 font-display text-xl leading-relaxed text-champagne sm:text-2xl">
                “{r.text}”
              </p>
              <footer className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-sm font-semibold text-primary-foreground">
                  {r.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-champagne">
                    {r.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Google Review · {r.when}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((rev, k) => (
                <button
                  key={rev.name}
                  aria-label={`Review ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? "w-8 bg-gold" : "w-3 bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {[
                [ChevronLeft, () => setI((v) => (v - 1 + reviews.length) % reviews.length), "Previous"],
                [ChevronRight, () => setI((v) => (v + 1) % reviews.length), "Next"],
              ].map(([Icon, fn, label]: any) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={fn}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
