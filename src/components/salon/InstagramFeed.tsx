import { motion } from "framer-motion";
import { Heart, Instagram } from "lucide-react";
import ig1 from "@/assets/after.jpg"; 
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import { fadeUp, stagger, viewport } from "./motion";

const posts = [
  { src: ig1, likes: 214 },
  { src: ig2, likes: 981 },
  { src: ig3, likes: 432 },
  { src: ig4, likes: 307 },
];

export function InstagramFeed() {
  return (
    <section className="section-pad px-5">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between"
        >
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              @a_dream_light
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Follow the glow-ups</h2>
          </div>
          {/* FIXED: Removed href="#" and added real Instagram link */}
          <a
            href="https://www.instagram.com/a_dream_light/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-xs text-champagne transition-colors hover:bg-gold/10"
          >
            <Instagram size={15} /> Follow
          </a>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/a_dream_light/"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-gold/15"
            >
              <img
                src={p.src}
                alt="Instagram post from A Dream Light Salon"
                loading="lazy"
                width={700}
                height={700}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-sm text-champagne opacity-0 transition-opacity group-hover:opacity-100">
                <Heart size={16} className="text-rose-gold" /> {p.likes}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}