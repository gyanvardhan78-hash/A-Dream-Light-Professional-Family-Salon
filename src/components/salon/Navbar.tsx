import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Scissors, X } from "lucide-react";
import { GoldButton } from "./GoldButton";

const links = [
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#transformations" },
  { label: "Salon Tour", href: "#tour" },
  { label: "VIP & Packages", href: "#packages" },
  { label: "Reviews", href: "#reviews" },
];

export function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
            <Scissors size={18} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight text-champagne">
              A Dream Light
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Family Salon
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm text-champagne/80 hover:text-gold"
          >
            <Phone size={15} /> +91 98765 43210
          </a>
          <GoldButton onClick={onBook} className="px-5 py-2.5 text-xs">
            Book Appointment
          </GoldButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 text-gold lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-gold/10 hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <GoldButton
                full
                className="mt-3"
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
              >
                Book Appointment
              </GoldButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
