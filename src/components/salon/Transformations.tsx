import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, viewport } from "./motion";

export function Transformations() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section id="transformations" className="section-pad px-5">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Real Results"
          title="Before & after transformations"
          subtitle="Drag the handle to reveal the difference an expert hand makes."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12"
        >
          <div
            ref={ref}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              update(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && update(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            className="relative aspect-[4/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl border border-gold/20 sm:aspect-[16/9]"
          >
            <img
              src={afterImg}
              alt="After keratin hair transformation"
              loading="lazy"
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={beforeImg}
              alt="Before hair treatment"
              loading="lazy"
              width={1200}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            />

            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-champagne">
              Before
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground">
              After
            </span>

            <div
              className="absolute inset-y-0 w-0.5 bg-[image:var(--gradient-gold)]"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground gold-glow">
                <MoveHorizontal size={18} />
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Keratin Smoothening + Gloss · 90 minutes · Senior Stylist
          </p>
        </motion.div>
      </div>
    </section>
  );
}
