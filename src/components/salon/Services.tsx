import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GoldButton } from "./GoldButton";
import { fadeUp, stagger, viewport } from "./motion";

const menu = {
  "Hair Care": [
    ["Keratin Treatment", "90 mins", "₹3,500"],
    ["Global Hair Colour", "120 mins", "₹4,200"],
    ["Signature Cut & Blow Dry", "45 mins", "₹1,200"],
    ["Balayage / Highlights", "150 mins", "₹5,800"],
    ["Hair Spa Ritual", "60 mins", "₹1,600"],
  ],
  "Skin Care": [
    ["Gold Radiance Facial", "75 mins", "₹2,800"],
    ["HydraGlow Clean-up", "45 mins", "₹1,100"],
    ["Anti-Ageing Collagen Facial", "90 mins", "₹3,900"],
    ["De-Tan & Brightening", "50 mins", "₹1,400"],
  ],
  Bridal: [
    ["HD Bridal Makeup", "180 mins", "₹18,000"],
    ["Engagement Look", "120 mins", "₹9,500"],
    ["Pre-Bridal Package (4 sittings)", "4 weeks", "₹24,000"],
    ["Saree Draping & Hair Styling", "60 mins", "₹3,000"],
  ],
  Spa: [
    ["Aroma Full Body Massage", "90 mins", "₹3,200"],
    ["Deep Tissue Therapy", "60 mins", "₹2,600"],
    ["Foot Reflexology", "45 mins", "₹1,300"],
    ["Couple Spa Ritual", "120 mins", "₹6,500"],
  ],
} as const;

type Tab = keyof typeof menu;
const tabs = Object.keys(menu) as Tab[];

export function Services({ onBook }: { onBook: () => void }) {
  const [tab, setTab] = useState<Tab>("Hair Care");

  return (
    <section id="services" className="section-pad px-5">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Menu"
          title="Curated services, honest pricing"
          subtitle="Every treatment is performed with globally certified products and single-use tools."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${
                tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-gold"
              }`}
            >
              {tab === t ? (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-[image:var(--gradient-gold)]"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="glass-card mt-8 rounded-3xl p-5 sm:p-8"
          >
            {menu[tab].map(([name, time, price]) => (
              <motion.li
                key={name}
                variants={fadeUp}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-gold/10 py-4 last:border-0"
              >
                <span className="font-display text-lg text-champagne transition-colors group-hover:text-gold">
                  {name}
                </span>
                <span className="hairline hidden min-w-8 flex-1 sm:block" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {time}
                </span>
                <span className="hairline hidden min-w-8 flex-1 sm:block" />
                <span className="text-base text-gold">{price}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 text-center"
        >
          <GoldButton onClick={onBook}>Book This Service</GoldButton>
        </motion.div>
      </div>
    </section>
  );
}
