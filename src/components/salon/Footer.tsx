import { motion } from "framer-motion";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Scissors,
} from "lucide-react";
import { GoldButton } from "./GoldButton";
import { fadeUp, stagger, viewport } from "./motion";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("A Dream Light Professional Family Salon, Opp. Green Heights, Nitai Path, Dhirajganj, Jamalpur, Jamshedpur, Jharkhand 832108");
const FACEBOOK_URL: string = "";
const INSTAGRAM_URL = "https://www.instagram.com/a_dream_light/";

export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="border-t border-gold/15 bg-surface/40 px-5 pt-20 pb-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
          className="glass-card mb-16 flex flex-col items-center gap-6 rounded-3xl p-8 text-center sm:p-12"
        >
          <h2 className="max-w-xl text-3xl sm:text-4xl">
            Your chair is <span className="text-gradient-gold italic">waiting</span>
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Reserve in under a minute with a ₹500 refundable advance.
          </p>
          <GoldButton onClick={onBook}>Book Appointment</GoldButton>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-4">
          <motion.div variants={fadeUp} className="md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                <Scissors size={18} />
              </span>
              <span className="font-display text-lg text-champagne">
                A Dream Light
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A Dream Light Professional Family Salon — luxury hair, skin,
              bridal and spa care for the families of Jamshedpur.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
                // Add the salon's Facebook page URL here to show the Facebook icon.
                ...(FACEBOOK_URL ? [{ Icon: Facebook, href: FACEBOOK_URL, label: "Facebook" }] : []),
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm uppercase tracking-[0.25em] text-gold">
              Visit Us
            </h3>
            <address className="mt-5 space-y-3 text-sm not-italic text-muted-foreground">
              <p className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                A Dream Light Professional Family Salon, Opp. Green Heights,
                Nitai Path, Dhirajganj, Jamalpur,
                Jamshedpur, Jharkhand 832108
              </p>
              <p className="flex gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:+919876543210" className="hover:text-gold">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:+919123456780" className="hover:text-gold">
                  +91 91234 56780
                </a>
              </p>
              <p className="flex gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <a
                  href="mailto:hello@adreamlightsalon.in"
                  className="hover:text-gold"
                >
                  hello@adreamlightsalon.in
                </a>
              </p>
            </address>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm uppercase tracking-[0.25em] text-gold">
              Working Hours
            </h3>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {[
                ["Mon – Fri", "10:00 AM – 9:00 PM"],
                ["Saturday", "9:00 AM – 10:00 PM"],
                ["Sunday", "By appointment"],
              ].map(([d, t]) => (
                <li key={d} className="flex items-baseline justify-between gap-3">
                  <span className="shrink-0">{d}</span>
                  <span className="hairline hidden flex-1 sm:block" />
                  <span className="text-champagne">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-xs text-gold">
              <Clock size={14} /> Walk-ins welcome, booking preferred
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-sm uppercase tracking-[0.25em] text-gold">
              Find Us
            </h3>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open A Dream Light salon location in Google Maps"
              className="relative mt-5 grid h-44 place-items-center overflow-hidden rounded-2xl border border-gold/20 bg-surface-2 transition-colors hover:border-gold/50"
            >
              <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--gold)_10%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--gold)_10%,transparent)_1px,transparent_1px)] bg-[size:26px_26px]" />
              <div className="relative text-center">
                <MapPin className="mx-auto text-gold" size={24} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Google Maps · Dhirajganj
                </p>
                <span className="mt-2 inline-block text-xs text-gold underline underline-offset-4">
                  Get Directions
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-muted-foreground sm:flex-row"
        >
          <p>© {new Date().getFullYear()} A Dream Light Professional Family Salon.</p>
          <p>Dhirajganj, Jamshedpur · Hair · Skin · Bridal · Spa</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="mt-4 text-center text-[11px] text-muted-foreground/70"
        >
          <p>
            Demo website for A Dream Light Professional Family Salon, not the official site.
            Powered by <span className="text-gold">Gyan Vardhan</span> · Vedaverse Studio
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
