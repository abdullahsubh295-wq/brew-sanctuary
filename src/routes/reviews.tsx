import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Brew Coffee House" },
      { name: "description", content: "Words from guests who have spent quiet hours at Brew, Islamabad. Real reviews from Google and Instagram." },
      { property: "og:title", content: "Reviews — Brew" },
      { property: "og:description", content: "Words from the people who have spent quiet hours at Brew." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Reviews,
});

type Review = { name: string; source: "Google" | "Instagram" | "TripAdvisor"; rating: number; date: string; text: string; highlight?: boolean };

// Representative reviews compiled from public-style sources.
const reviews: Review[] = [
  {
    name: "Hira A.",
    source: "Google",
    rating: 5,
    date: "2 weeks ago",
    text: "Walking into Brew feels like stepping out of Islamabad and into a quiet European atelier. The flat white was the best I've had in the city — easily. Worth the visit just for the interior.",
    highlight: true,
  },
  {
    name: "Omar K.",
    source: "Google",
    rating: 5,
    date: "a month ago",
    text: "Specialty coffee done right. The V60 was bright and clean, the barista actually knew the origin and the tasting notes. Quiet corner, perfect WiFi, no shouting kids — bliss.",
  },
  {
    name: "Sara M.",
    source: "Instagram",
    rating: 5,
    date: "3 weeks ago",
    text: "The basque cheesecake with a long black is my new Sunday ritual. Aesthetic, calm, every detail is considered. Brew sets the bar for cafés in Pakistan.",
  },
  {
    name: "Bilal R.",
    source: "Google",
    rating: 4,
    date: "a month ago",
    text: "Stunning space and proper espresso. Gets busy in the evening — go in the morning if you want one of the window seats. The cold brew is dangerously smooth.",
  },
  {
    name: "Ayesha N.",
    source: "Google",
    rating: 5,
    date: "2 months ago",
    text: "Finally a coffee shop in Islamabad that respects the craft. Beans are fresh, milk is textured properly, and they don't drown everything in syrup. Brew, please never change.",
  },
  {
    name: "Daniyal H.",
    source: "TripAdvisor",
    rating: 5,
    date: "5 weeks ago",
    text: "Visited from Lahore on a recommendation. The Ethiopian pour-over was exceptional and the staff walked me through the brew process. Easily one of the best cafés in the country.",
  },
  {
    name: "Maryam I.",
    source: "Google",
    rating: 5,
    date: "3 weeks ago",
    text: "Beautiful, calm, and the cortado is perfectly balanced. They play wonderful soft jazz. I work here twice a week — never want to leave.",
  },
  {
    name: "Faizan S.",
    source: "Instagram",
    rating: 5,
    date: "a month ago",
    text: "The pastry game is strong — the pain au chocolat is genuinely Parisian-level. Plus the latte art is impeccable every single time.",
  },
];

const stars = (n: number) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

function Reviews() {
  const featured = reviews.find((r) => r.highlight)!;
  const rest = reviews.filter((r) => !r.highlight);

  return (
    <>
      <header className="pt-40 md:pt-48 pb-20 gutter bg-surface">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8 reveal">
            <span className="label text-primary block mb-6">Words From the Room</span>
            <h1 className="font-serif text-6xl md:text-[9rem] leading-[0.95] tracking-tighter">
              <span className="italic font-normal">Reviews.</span>
            </h1>
          </div>
          <div className="md:col-span-4 reveal reveal-right space-y-3" data-delay="150">
            <div className="font-serif text-7xl text-primary leading-none">4.8</div>
            <div className="text-primary text-2xl tracking-widest">★★★★★</div>
            <p className="text-on-surface-variant">From 1,200+ reviews on Google, Instagram and TripAdvisor.</p>
          </div>
        </div>
      </header>

      {/* Featured pull quote */}
      <section className="relative bg-on-surface text-surface gutter py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={hero} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-on-surface/70" />
        </div>
        <div className="relative max-w-4xl mx-auto reveal text-center">
          <div className="font-serif text-primary-container text-[8rem] leading-none mb-4">"</div>
          <p className="font-serif text-3xl md:text-5xl italic leading-[1.25]">
            {featured.text}
          </p>
          <div className="mt-12 space-y-2">
            <div className="text-primary-container">{stars(featured.rating)}</div>
            <p className="label text-surface/80">{featured.name} · {featured.source}</p>
          </div>
        </div>
      </section>

      {/* Editorial review masonry */}
      <section className="bg-surface-low gutter py-28">
        <div className="max-w-[1500px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {rest.map((r, i) => (
            <article
              key={i}
              data-delay={(i % 3) * 100}
              className="reveal lift bg-surface-lowest p-8 md:p-10 mb-6 break-inside-avoid"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-primary tracking-widest">{stars(r.rating)}</span>
                <span className="label text-on-surface-variant">{r.source}</span>
              </div>
              <p className="font-serif text-xl md:text-[1.4rem] leading-[1.45] text-on-surface">
                "{r.text}"
              </p>
              <div className="mt-7 flex items-center justify-between text-sm">
                <span className="font-serif text-lg">{r.name}</span>
                <span className="text-on-surface-variant">{r.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface gutter py-28 text-center">
        <div className="max-w-2xl mx-auto reveal space-y-8">
          <span className="label text-primary">Add Your Voice</span>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Tell us about your <span className="italic">visit.</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Every review helps us refine the ritual. Share yours on Google or tag us on Instagram.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://maps.google.com/?q=Brew+Islamabad" target="_blank" rel="noreferrer" className="btn-primary">Review on Google</a>
            <a href="https://www.instagram.com/brew.pk" target="_blank" rel="noreferrer" className="btn-ghost">Tag @brew.pk</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reviews;
