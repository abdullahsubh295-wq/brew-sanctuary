import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-interior.jpg";
import latte from "@/assets/real-croissants-latte.jpg";
import coldbrew from "@/assets/menu-coldbrew.jpg";
import grinder from "@/assets/real-grinder.jpg";
import cruffins from "@/assets/real-cruffins.jpg";
import pecanbun from "@/assets/real-pecanbun.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brew — A Quiet Ritual in Islamabad" },
      { name: "description", content: "A curated pause in the heart of Islamabad. Artisanal coffee, architectural space and the slow ritual of brewing." },
      { property: "og:title", content: "Brew — A Quiet Ritual in Islamabad" },
      { property: "og:description", content: "A specialty coffee house in F-7 Islamabad. Single origins, ceremonial pour-overs, serene space." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[100svh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="The interior of Brew, lit by warm pendant lighting"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/30 to-on-surface/40" />
        </div>

        <div className="relative z-10 w-full gutter pb-20 md:pb-28 max-w-[1800px] mx-auto">
          <div className="max-w-3xl text-surface space-y-8">
            <span className="label text-primary-container reveal">Specialty Coffee · Islamabad</span>
            <h1 className="reveal font-serif text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.95] tracking-tighter font-bold">
              Slow <br />
              <span className="italic font-normal">brewed.</span>
            </h1>
            <p className="reveal text-surface/85 text-lg md:text-xl max-w-xl leading-relaxed" data-delay="150">
              A curated pause in the heart of Islamabad. We blend architectural precision
              with the organic ritual of artisanal brewing — one cup, one moment at a time.
            </p>
            <div className="reveal flex flex-wrap items-center gap-4 pt-4" data-delay="300">
              <Link to="/menu" className="btn-primary">View the Menu</Link>
              <Link to="/gallery" className="btn-ghost text-surface">The Space</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 hidden md:block text-surface/60 label">
          ↓ Scroll
        </div>
      </header>

      {/* Manifesto */}
      <section className="bg-surface gutter py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-end">
          <div className="md:col-span-7 reveal reveal-left">
            <span className="label text-primary mb-6 block">Our Philosophy</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.05]">
              Coffee is not a <br />
              <span className="italic">commodity.</span> <br />
              It is a ceremony.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 reveal reveal-right" data-delay="200">
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Every bean is sourced from a story — a hillside in Yirgacheffe, a small estate in Antigua,
              a family farm in Sumatra. We roast in micro-batches and brew with reverence.
            </p>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              The result is not just a drink. It is a few honest minutes of stillness in a city that rarely stops.
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric bento — Signature Brews */}
      <section className="bg-surface-low gutter py-32 md:py-40">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="reveal max-w-2xl">
              <span className="label text-primary mb-4 block">Seasonal Selection</span>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight">Signature Brews</h2>
            </div>
            <p className="reveal max-w-md italic text-on-surface-variant md:text-right leading-relaxed" data-delay="150">
              "Every bean tells a story of its origin — roasted to highlight its architectural soul."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 md:h-[760px]">
            {/* Feature card */}
            <div className="md:col-span-7 relative zoom-img lift overflow-hidden bg-surface-high min-h-[460px]">
              <img src={latte} alt="A perfect latte, art rosetta in matte black cup" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 text-surface">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-4 py-1 bg-surface/15 backdrop-blur-md rounded-full label text-surface">Ethiopian Heirloom</span>
                  <span className="px-4 py-1 bg-surface/15 backdrop-blur-md rounded-full label text-surface">Light Roast</span>
                </div>
                <h3 className="font-serif text-3xl md:text-5xl mb-3">The Velvet Orchid</h3>
                <p className="max-w-md text-surface/85 leading-relaxed">
                  Notes of bergamot, lavender, and a delicate jasmine finish. A tea-like body
                  for the discerning palate.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-5 md:gap-6">
              <div className="flex-1 relative zoom-img lift overflow-hidden bg-surface-high min-h-[260px]">
                <img src={coldbrew} alt="Obsidian cold brew with golden ice" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-on-surface/35" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-surface">
                  <h3 className="font-serif text-2xl md:text-3xl mb-2">Obsidian Cold Press</h3>
                  <span className="label text-primary-container">24h Slow Extraction</span>
                </div>
              </div>
              <div className="flex-1 bg-surface-lowest p-8 md:p-12 flex flex-col justify-center lift">
                <span className="label text-primary mb-4">Artisan Ritual</span>
                <h3 className="font-serif text-2xl md:text-4xl mb-5">Ceremonial Pour-Over</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  The theatre of precision. Hand-poured at 92°C through ceramic filters,
                  one cup at a time.
                </p>
                <Link to="/menu" className="label text-primary inline-flex items-center gap-3 hover:gap-5 transition-all">
                  Explore the menu →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="relative bg-surface py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--primary)_8%,transparent)_0%,transparent_60%)]" />
        <div className="relative gutter max-w-6xl mx-auto text-center">
          <h2 className="reveal font-serif text-5xl md:text-7xl leading-[1.05] mb-20">
            Experience <br /><span className="italic">the serenity</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-left">
            {[
              { t: "Intentional Space", d: "An interior of limestone, walnut and warm light — designed to slow your breath." },
              { t: "Atmospheric Sound", d: "Aural landscapes curated for the time of day, from morning mist to evening dusk." },
              { t: "The Bean Ritual", d: "Our baristas treat every extraction as a singular, repeatable masterpiece." },
            ].map((p, i) => (
              <div key={p.t} className="reveal space-y-5" data-delay={i * 150}>
                <div className="font-serif text-5xl text-primary">0{i + 1}</div>
                <h4 className="font-serif text-2xl">{p.t}</h4>
                <p className="text-on-surface-variant leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + specialty strip */}
      <section className="bg-surface-low gutter py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 reveal reveal-left zoom-img aspect-[4/5] overflow-hidden">
            <img src={grinder} alt="Freshly ground espresso falling into the portafilter" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal reveal-right space-y-8">
            <span className="label text-primary">Specialty Coffee · Boulangerie</span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              The hours of the <span className="italic">house.</span>
            </h2>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-on-surface/10">
              <div className="space-y-2">
                <div className="label text-on-surface-variant">Dine-In</div>
                <div className="font-serif text-3xl text-primary">8 AM — 10 PM</div>
                <p className="text-sm text-on-surface-variant">Every day · full service</p>
              </div>
              <div className="space-y-2">
                <div className="label text-on-surface-variant">Take Away</div>
                <div className="font-serif text-3xl text-primary">10 PM — 12 AM</div>
                <p className="text-sm text-on-surface-variant">Late hours · counter only</p>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Specialty coffee and a working boulangerie under one roof — viennoiserie laminated through the night, espresso pulled from sunrise.
            </p>
          </div>
        </div>
      </section>

      {/* Visual mood + CTA */}
      <section className="bg-on-surface text-surface gutter py-32">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 reveal reveal-left">
            <div className="grid grid-cols-2 gap-5">
              <div className="zoom-img aspect-[4/5] overflow-hidden">
                <img src={cruffins} alt="Cruffins floating against a sage backdrop" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="zoom-img aspect-[4/5] overflow-hidden translate-y-12">
                <img src={pecanbun} alt="Sticky pecan caramel bun" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 reveal reveal-right space-y-8">
            <span className="label text-primary-container">A Visit</span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Step into the <span className="italic">stillness.</span>
            </h2>
            <p className="text-surface/75 leading-relaxed">
              Find us at Shaheen Market, E-7 Islamabad. Open every day from morning light to midnight — for the espresso break, the long read, the slow conversation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://maps.google.com/?q=Brew+E-7+Islamabad" target="_blank" rel="noreferrer" className="btn-primary">Get Directions</a>
              <Link to="/gallery" className="btn-ghost text-surface">See the Space</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface gutter py-32">
        <div className="max-w-[1400px] mx-auto reveal">
          <p className="font-serif italic text-3xl md:text-5xl leading-[1.25] text-on-surface">
            "Brew in E-7 Shaheen Market is a refreshing addition to Islamabad's breakfast and coffee scene — a wonderful place to start your day."
          </p>
          <p className="label text-primary mt-10">— Mir Shai Mazar Baloch · Google Local Guide</p>
        </div>
      </section>
    </>
  );
}

export default Home;
