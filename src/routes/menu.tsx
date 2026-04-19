import { createFileRoute } from "@tanstack/react-router";
import latte from "@/assets/real-croissants-latte.jpg";
import espresso from "@/assets/real-grinder.jpg";
import coldbrew from "@/assets/menu-coldbrew.jpg";
import pourover from "@/assets/menu-pourover.jpg";
import dessert from "@/assets/real-pecanbun.jpg";
import painauchocolat from "@/assets/real-painauchocolat.jpg";
import cruffins from "@/assets/real-cruffins.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Brew Coffee House" },
      { name: "description", content: "Single-origin pour-overs, signature espresso, slow cold brews and pastry. Brew's full menu in Islamabad." },
      { property: "og:title", content: "The Menu — Brew" },
      { property: "og:description", content: "Single-origin pour-overs, signature espresso, slow cold brews and pastry." },
      { property: "og:image", content: latte },
      { name: "twitter:image", content: latte },
    ],
  }),
  component: Menu,
});

type Item = { name: string; notes: string; price: string };
type Section = { title: string; subtitle: string; image: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Espresso Bar",
    subtitle: "The classic black canon",
    image: espresso,
    items: [
      { name: "Espresso", notes: "Double shot · house blend", price: "Rs 450" },
      { name: "Macchiato", notes: "Espresso · velvet milk foam", price: "Rs 520" },
      { name: "Cortado", notes: "1:1 milk · Spanish style", price: "Rs 580" },
      { name: "Americano", notes: "Long, lean, contemplative", price: "Rs 500" },
    ],
  },
  {
    title: "With Milk",
    subtitle: "Silk-textured, hand-poured",
    image: latte,
    items: [
      { name: "Flat White", notes: "Microfoam · 6oz · signature", price: "Rs 650" },
      { name: "Cappuccino", notes: "Equal thirds · classical", price: "Rs 620" },
      { name: "Latte", notes: "Long pour · rosetta art", price: "Rs 680" },
      { name: "Spanish Latte", notes: "Condensed milk · sweet finish", price: "Rs 720" },
    ],
  },
  {
    title: "The Slow Brews",
    subtitle: "Single origin, one cup at a time",
    image: pourover,
    items: [
      { name: "V60 Pour-Over", notes: "Bright · floral · clarity", price: "Rs 850" },
      { name: "Chemex", notes: "Clean body · long finish", price: "Rs 900" },
      { name: "Aeropress", notes: "Rich · concentrated", price: "Rs 800" },
      { name: "Syphon", notes: "Theatrical · weekend only", price: "Rs 1,100" },
    ],
  },
  {
    title: "Cold & Iced",
    subtitle: "For the warmer hours",
    image: coldbrew,
    items: [
      { name: "Obsidian Cold Brew", notes: "24h slow extraction", price: "Rs 700" },
      { name: "Iced Latte", notes: "Cold milk · bold espresso", price: "Rs 720" },
      { name: "Tonic Espresso", notes: "Sparkling · citrus zest", price: "Rs 780" },
      { name: "Affogato", notes: "Espresso over vanilla bean", price: "Rs 850" },
    ],
  },
  {
    title: "From the Pastry",
    subtitle: "Baked in-house, daily",
    image: dessert,
    items: [
      { name: "Butter Croissant", notes: "72h laminated · golden", price: "Rs 550" },
      { name: "Pain au Chocolat", notes: "Belgian dark · flaky", price: "Rs 620" },
      { name: "Basque Cheesecake", notes: "Burnt top · creamy centre", price: "Rs 850" },
      { name: "Dark Chocolate Cake", notes: "Gold leaf · single origin cocoa", price: "Rs 950" },
    ],
  },
];

function Menu() {
  return (
    <>
      <header className="pt-40 md:pt-48 pb-20 gutter bg-surface">
        <div className="max-w-[1400px] mx-auto reveal">
          <span className="label text-primary block mb-6">Specialty Coffee · Boulangerie</span>
          <h1 className="font-serif text-6xl md:text-[9rem] leading-[0.95] tracking-tighter">
            The <span className="italic font-normal">Menu</span>
          </h1>
          <p className="mt-10 max-w-xl text-on-surface-variant text-lg leading-relaxed">
            Five quiet chapters. Single-origin beans, milks textured by hand, and viennoiserie
            laminated through the night. Prices in Pakistani Rupees.
          </p>
          <div className="mt-10 inline-flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-b border-on-surface/10 py-5">
            <span className="label text-on-surface-variant">Dine-In <span className="text-primary ml-2">8 AM — 10 PM</span></span>
            <span className="label text-on-surface-variant">Take Away <span className="text-primary ml-2">10 PM — 12 AM</span></span>
          </div>
        </div>
      </header>

      {/* Boulangerie showcase */}
      <section className="bg-surface-low gutter py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <figure className="reveal zoom-img aspect-[4/5] overflow-hidden">
            <img src={painauchocolat} alt="Pain au chocolat with golden flaky layers" className="w-full h-full object-cover" loading="lazy" />
          </figure>
          <figure className="reveal zoom-img aspect-[4/5] overflow-hidden" data-delay="100">
            <img src={cruffins} alt="Cruffins suspended in air" className="w-full h-full object-cover" loading="lazy" />
          </figure>
          <figure className="reveal zoom-img aspect-[4/5] overflow-hidden col-span-2 md:col-span-1" data-delay="200">
            <img src={dessert} alt="Sticky pecan caramel bun" className="w-full h-full object-cover" loading="lazy" />
          </figure>
        </div>
      </section>

      {sections.map((s, idx) => {
        const reverse = idx % 2 === 1;
        const bg = idx % 2 === 0 ? "bg-surface-low" : "bg-surface";
        return (
          <section key={s.title} className={`${bg} gutter py-24 md:py-32`}>
            <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className={`md:col-span-5 ${reverse ? "md:col-start-8 md:row-start-1" : ""} reveal ${reverse ? "reveal-right" : "reveal-left"} zoom-img aspect-[4/5] overflow-hidden`}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`md:col-span-6 ${reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7"} reveal`}>
                <span className="label text-primary mb-4 block">{`0${idx + 1} · ${s.subtitle}`}</span>
                <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-10">{s.title}</h2>
                <ul className="space-y-7">
                  {s.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-6">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-4">
                          <span className="font-serif text-2xl">{item.name}</span>
                          <span className="flex-1 border-b border-dotted border-on-surface-variant/30 translate-y-[-4px]" />
                          <span className="font-serif text-xl text-primary">{item.price}</span>
                        </div>
                        <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">{item.notes}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-on-surface text-surface gutter py-28 text-center">
        <div className="max-w-3xl mx-auto reveal">
          <p className="label text-primary-container mb-6">A Note</p>
          <p className="font-serif text-3xl md:text-4xl italic leading-[1.3]">
            All beans roasted on Tuesdays. We rest them five days before they reach your cup.
          </p>
        </div>
      </section>
    </>
  );
}

export default Menu;
