import { motion } from "framer-motion";
import { Crown, Gift, HeartHandshake } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { GoldButton } from "./GoldButton";
import { fadeUp, stagger, viewport } from "./motion";

const packages = [
  {
    icon: HeartHandshake,
    name: "Bridal Pre-Wedding Package",
    price: "Custom",
    note: "Tailored to your wedding date",
    perks: [
      "4 pre-bridal sittings",
      "HD bridal makeup on the day",
      "Dedicated bridal suite & team",
      "Complimentary trial look",
    ],
    cta: "Get Custom Quote",
    featured: false,
    whatsappMessage: "I am interested in the Bridal Pre-Wedding Package. Can I get a custom quote?",
  },
  {
    icon: Crown,
    name: "Annual VIP Gold Pass",
    price: "₹9,999",
    note: "per year · unlimited use",
    perks: [
      "10% off on all services",
      "Priority booking on weekends",
      "2 complimentary hair spas",
      "Exclusive festive offers",
    ],
    cta: "Become a VIP",
    featured: true,
    whatsappMessage: "I want to purchase the Annual VIP Gold Pass. How can I proceed?",
  },
  {
    icon: Gift,
    name: "Gift Cards",
    price: "₹2,000",
    note: "Spa Day voucher",
    perks: [
      "Valid 12 months",
      "Redeemable on any service",
      "Elegant gift packaging",
      "Instant digital delivery",
    ],
    cta: "Buy Gift Card",
    featured: false,
    whatsappMessage: "I would like to buy a ₹2,000 Spa Day Gift Card.",
  },
];

export function Packages() {
  
  // FIXED: Added function to redirect to WhatsApp directly
  const handlePackageClick = (message: string) => {
    const salonNumber = "918409630086"; 
    const encodedMessage = encodeURIComponent(`Hello A Dream Light Salon, ${message}`);
    window.open(`https://wa.me/${salonNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="packages" className="section-pad px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="VIP & Packages"
          title="Membership worth the mirror"
          subtitle="High-value packages designed for our most loyal Jamshedpur families."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {packages.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={`glass-card relative flex flex-col rounded-3xl p-7 ${
                p.featured ? "gold-glow border-gold/50" : ""
              }`}
            >
              {p.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              ) : null}
              <p.icon className="text-gold" size={26} />
              <h3 className="mt-5 text-2xl leading-snug text-champagne">
                {p.name}
              </h3>
              <p className="mt-4 font-display text-4xl text-gradient-gold">
                {p.price}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {p.note}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {perk}
                  </li>
                ))}
              </ul>
              <GoldButton
                full
                className="mt-7"
                variant={p.featured ? "primary" : "ghost"}
                onClick={() => handlePackageClick(p.whatsappMessage)}
              >
                {p.cta}
              </GoldButton>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}