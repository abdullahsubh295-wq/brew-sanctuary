import { createFileRoute } from "@tanstack/react-router";
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
  { src: g1, span: "md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto", caption: "The Counter" },
  { src: latte, span: "md:col-span-3 aspect-[4/5]", caption: "Rosetta" },
  { src: g3, span: "md:col-span-4 aspect-[4/5]", caption: "Booth 02" },
  { src: g6, span: "md:col-span-7 aspect-[16/10]", caption: "Dusk Hour" },
  { src: g2, span: "md:col-span-4 row-span-2 md:row-span-1 aspect-[4/5]", caption: "The Pull" },
  { src: g4, span: "md:col-span-3 aspect-[4/5]", caption: "Beans" },
  { src: pourover, span: "md:col-span-5 aspect-[4/5]", caption: "Ceremony" },
  { src: g5, span: "md:col-span-4 aspect-[4/5]", caption: "Window Seat" },
  { src: espresso, span: "md:col-span-4 aspect-[4/5]", caption: "Single Shot" },
];

function Gallery() {
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
            Light, walnut, ceramics and steam. Quiet moments captured between the morning rush
            and the long evening read.
          </p>
        </div>
      </header>

      <section className="bg-surface-low gutter py-16 md:py-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[280px]">
          {tiles.map((t, i) => (
            <figure
              key={i}
              data-delay={(i % 4) * 90}
              className={`reveal reveal-zoom relative zoom-img overflow-hidden bg-surface-high ${t.span}`}
            >
              <img src={t.src} alt={t.caption} className="w-full h-full object-cover" loading="lazy" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-on-surface/70 to-transparent">
                <span className="label text-surface">{t.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

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
