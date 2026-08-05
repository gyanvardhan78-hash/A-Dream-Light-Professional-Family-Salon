import { motion } from "framer-motion";
import t1 from "@/assets/tour-1.jpg";
import t2 from "@/assets/tour-2.jpg";
import t3 from "@/assets/tour-3.jpg";
import t4 from "@/assets/tour-4.jpg";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, stagger, viewport } from "./motion";

const shots = [
  { src: t3, label: "Reception Lounge", span: "sm:col-span-2 sm:row-span-2" },
  { src: t1, label: "VIP Private Room", span: "" },
  { src: t2, label: "Spa Sanctuary", span: "" },
  { src: t4, label: "Bridal Suite", span: "sm:col-span-2" },
];

export function VirtualTour() {
  return (
    <section id="tour" className="section-pad px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Virtual Tour"
          title="Step inside the experience"
          subtitle="Private VIP rooms, a candle-lit spa wing and a dedicated bridal suite."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-4 sm:auto-rows-[190px]"
        >
          {shots.map((s) => (
            <motion.figure
              key={s.label}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-2xl border border-gold/15 ${s.span}`}
            >
              <img
                src={s.src}
                alt={`${s.label} at A Dream Light Professional Family Salon`}
                loading="lazy"
                width={900}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 font-display text-lg text-champagne">
                {s.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
