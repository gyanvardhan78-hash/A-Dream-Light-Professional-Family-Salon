import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/salon/Navbar";
import { Hero } from "@/components/salon/Hero";
import { Services } from "@/components/salon/Services";
import { Transformations } from "@/components/salon/Transformations";
import { VirtualTour } from "@/components/salon/VirtualTour";
import { Packages } from "@/components/salon/Packages";
import { Reviews } from "@/components/salon/Reviews";
import { InstagramFeed } from "@/components/salon/InstagramFeed";
import { Footer } from "@/components/salon/Footer";
import { BookingModal } from "@/components/salon/BookingModal";

const title = "A Dream Light Professional Family Salon | Jamshedpur";
const description =
  "Luxury hair, skin, bridal and spa services in Dhirajganj, Jamshedpur. Rated 4.9/5 by 67+ guests. Book online with a 30% advance.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "A Dream Light Professional Family Salon",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Opp. Green Heights, Nitai Path, Dhirajganj, Jamalpur",
            addressLocality: "Jamshedpur",
            addressRegion: "Jharkhand",
            postalCode: "832108",
            addressCountry: "IN",
          },
          telephone: "+91 8409630086",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "67",
          },
          openingHours: ["Mo-Fr 10:00-21:00", "Sa 09:00-22:00"],
        }),
      },
    ],
  }),
});

function Index() {
  const [booking, setBooking] = useState(false);
  const open = () => setBooking(true);

  return (
    <main className="overflow-x-hidden">
      <Navbar onBook={open} />
      <Hero onBook={open} />
      <Services onBook={open} />
      <Transformations />
      <VirtualTour />
      <Packages />
      <Reviews />
      <InstagramFeed />
      <Footer onBook={open} />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </main>
  );
}