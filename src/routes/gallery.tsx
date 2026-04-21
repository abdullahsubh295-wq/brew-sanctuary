import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import latte from "@/assets/menu-latte.jpg";
import espresso from "@/assets/menu-espresso.jpg";
import pourover from "@/assets/menu-pourover.jpg";
import hero from "@/assets/hero-interior.jpg";
import croissant from "@/assets/real-croissants-latte.jpg";
import cruffin from "@/assets/real-cruffins.jpg";
import grinder from "@/assets/real-grinder.jpg";
import pecan from "@/assets/real-pecanbun.jpg";
import painau from "@/assets/real-painauchocolat.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Brew Coffee House" },
      { name: "description", content: "Inside Brew: the space, the craft, the cup. A visual journal from our Islamabad coffee house." },
      { property: "og:title", content: "Gallery — Brew" },
      { property: "og:description", content: "Inside Brew: the space, the craft, the cup." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Gallery,
});

const tiles = [
  { src: g1, caption: "The Counter" },
  { src: latte, caption: "Rosetta" },
  { src: croissant, caption: "Morning Croissant" },
  { src: g3, caption: "Booth 02" },
  { src: g6, caption: "Dusk Hour" },
  { src: cruffin, caption: "Cruffins" },
  { src: g2, caption: "The Pull" },
  { src: g4, caption: "Beans" },
  { src: pourover, caption: "Ceremony" },
  { src: pecan, caption: "Pecan Bun" },
  { src: g5, caption: "Window Seat" },
  { src: espresso, caption: "Single Shot" },
  { src: grinder, caption: "Grind" },
  { src: painau, caption: "Pain au Chocolat" },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % tiles.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? 0 : (i - 1 + tiles.length) % tiles.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <header className="pt-40 md:pt-48 pb-16 gutter bg-surface">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 reveal">
            <span className="label text-primary block mb-6">A Visual Journal</span>
            <h1 className="font-serif text-6xl md:text-[8.5rem] leading-[0.95] tracking-tighter">
              The <span className="italic font-normal">Gallery</span>
            </h1>
          </div>
          <p className="md:col-span-4 md:col-start-9 reveal reveal-right text-on-surface-variant text-lg leading-relaxed" data-delay="200">
            Light, walnut, ceramics and steam. Tap any image to enlarge.
          </p>
        </div>
      </header>

      <section className="bg-surface-low gutter py-16 md:py-24">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {tiles.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-delay={(i % 4) * 80}
              className="reveal reveal-zoom group relative aspect-[3/4] overflow-hidden bg-surface-high zoom-img lift cursor-pointer text-left"
              aria-label={`Open ${t.caption}`}
            >
              <img src={t.src} alt={t.caption} className="w-full h-full object-cover" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-on-surface/80 via-on-surface/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="label text-surface">{t.caption}</span>
              </figcaption>
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + tiles.length) % tiles.length); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface/15 backdrop-blur text-surface hover:bg-surface/30 transition flex items-center justify-center text-2xl"
            aria-label="Previous"
          >‹</button>

          <figure className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              key={active}
              src={tiles[active].src}
              alt={tiles[active].caption}
              className="lightbox-img rounded-sm"
            />
            <figcaption className="text-surface/80 text-center mt-4 label">
              {tiles[active].caption} · {active + 1} / {tiles.length}
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % tiles.length); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface/15 backdrop-blur text-surface hover:bg-surface/30 transition flex items-center justify-center text-2xl"
            aria-label="Next"
          >›</button>

          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-surface/15 backdrop-blur text-surface hover:bg-surface/30 transition flex items-center justify-center text-xl"
            aria-label="Close"
          >✕</button>
        </div>
      )}

      <section className="bg-on-surface text-surface gutter py-32 text-center">
        <div className="max-w-3xl mx-auto reveal space-y-8">
          <span className="label text-primary-container">Follow Along</span>
          <p className="font-serif text-3xl md:text-5xl italic leading-[1.2]">
            More moments live on Instagram.
          </p>
          <a
            href="https://www.instagram.com/brew.pk"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex"
          >
            @brew.pk
          </a>
        </div>
      </section>
    </>
  );
}

export default Gallery;
