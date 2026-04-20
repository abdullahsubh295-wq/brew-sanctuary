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
      { name: "description", content: "Single-origin espresso from Guatemala & Brazil, pressed sandwiches, salads and slow brews. Brew's full menu in E-7 Islamabad." },
      { property: "og:title", content: "The Menu — Brew" },
      { property: "og:description", content: "Single-origin espresso, pressed sandwiches, salads and slow brews." },
      { property: "og:image", content: latte },
      { name: "twitter:image", content: latte },
    ],
  }),
  component: Menu,
});

type Item = { name: string; notes?: string; size?: string; price: string };
type Section = { title: string; subtitle: string; image: string; intro?: string; items: Item[] };

const sections: Section[] = [
  {
    title: "Single Origin Coffee",
    subtitle: "Guatemala · La Esperanza · Brazil · Ivan Dos Santos",
    image: espresso,
    intro:
      "Two single origins on the bar — Guatemala La Esperanza (chocolate, fruity) and Brazil Ivan Dos Santos (chocolate, hazelnut). Pulled, poured and steamed to order.",
    items: [
      { name: "Espresso", size: "1.5oz", price: "Rs 550" },
      { name: "Macchiato", size: "2oz", price: "Rs 670" },
      { name: "Piccolo", size: "4oz", price: "Rs 700" },
      { name: "Flat White", size: "6oz", price: "Rs 750" },
      { name: "Cappuccino", size: "6oz", price: "Rs 750" },
      { name: "Latte", size: "10oz", price: "Rs 790" },
      { name: "Americano", size: "10oz", price: "Rs 760" },
      { name: "Iced Americano", size: "12oz", price: "Rs 760" },
      { name: "Iced Latte", size: "12oz", price: "Rs 800" },
      { name: "Affogato", notes: "Espresso over vanilla ice cream", price: "Rs 950" },
    ],
  },
  {
    title: "Other Beverages",
    subtitle: "For the in-between moments",
    image: coldbrew,
    items: [
      { name: "Club Soda", price: "Rs 270" },
      { name: "Sparkling Water", price: "Rs 140" },
      { name: "Seasonal Fruit Juice", notes: "With a dash of club soda", price: "Market" },
    ],
  },
  {
    title: "Small Plates",
    subtitle: "To begin the meal",
    image: painauchocolat,
    items: [
      {
        name: "Lets Dip In",
        notes:
          "Lemon tahini labneh, roasted eggplants, dates, sun-dried tomatoes, dried figs, caramelised walnuts, micro greens, dehydrated bread",
        price: "Rs 1,300",
      },
      {
        name: "Ricotta Be Kiddin Me",
        notes:
          "Whipped ricotta and labneh topped with chimichurri, sun-dried tomatoes, sliced black olives, red bell peppers and dried apricots, drizzled with extra virgin olive oil — pan-seared bread",
        price: "Rs 1,400",
      },
      {
        name: "Crack The Pepper",
        notes: "Linguine, parmesan, black pepper, olive oil",
        price: "Rs 1,300",
      },
    ],
  },
  {
    title: "Salads",
    subtitle: "Greens, with intention",
    image: cruffins,
    items: [
      {
        name: "Fresco",
        notes:
          "Seasonal fruit, caramelised walnuts, greens, corn, feta, crunchy quinoa, tahini emulsion",
        price: "Rs 1,380",
      },
      {
        name: "Brutus",
        notes:
          "Greens, grilled chicken, parmesan, sun-dried tomatoes, apples, crunchy nuts, croutons, not-so-Caesar dressing",
        price: "Rs 1,380",
      },
    ],
  },
  {
    title: "Hot Pressed Sandwiches",
    subtitle: "Built on ciabatta, sourdough & roasted vegetables",
    image: latte,
    items: [
      {
        name: "B.E.C",
        notes:
          "Choice of egg (scrambled / fried / omelette), American cheese, bacon, caramelised onions in a ciabatta bun · side of crisps",
        price: "Rs 840",
      },
      {
        name: "The Stuck Up",
        notes:
          "Ciabatta bread, roasted aubergine, pickled vegetables in a tzatziki and garlic herb vinaigrette · choice of protein — Vegetarian Rs 930 · Chicken Rs 990 · Beef",
        price: "Rs 1,020",
      },
      {
        name: "Chickens On The Run",
        notes:
          "Sourdough, slow-cooked chicken, basil pesto, onion, jalapeño jam, sun-dried tomato and basil aioli · side of crisps or salad",
        price: "Rs 1,240",
      },
      {
        name: "The Beef Is On Fire",
        notes:
          "Sourdough, smoked beef, spicy harissa mayo, caramelised onions, sun-dried tomatoes · side of crisps or salad",
        price: "Rs 1,240",
      },
    ],
  },
  {
    title: "The Outsiders",
    subtitle: "Burgers, buns and the loud crowd",
    image: dessert,
    items: [
      {
        name: "Wildair",
        notes: "Potato bun, fried chicken, pickle, fries",
        price: "Rs 1,190",
      },
      {
        name: "The Copycat",
        notes: "Potato roll, beef patty, cheese, lettuce, tomato, fries",
        price: "Rs 1,340",
      },
      {
        name: "The Big Kid",
        notes: "Potato bun, double beef patty (medium done), cheese, caramelised onions, rocket, fries",
        price: "Rs 1,540",
      },
      {
        name: "Bao Down",
        notes: "Bao bun, Korean fried chicken, ginger hot sauce, tangy slaw · side of crisps",
        price: "Rs 1,350",
      },
    ],
  },
  {
    title: "From the Boulangerie",
    subtitle: "Laminated through the night",
    image: pourover,
    items: [
      { name: "Butter Croissant", notes: "72h laminated · golden", price: "Daily" },
      { name: "Pain au Chocolat", notes: "Belgian dark · flaky", price: "Daily" },
      { name: "Cruffin", notes: "Croissant-muffin hybrid · seasonal", price: "Daily" },
      { name: "Sticky Pecan Bun", notes: "Caramel · slow-baked", price: "Daily" },
    ],
  },
];

const additions = [
  { name: "Side of sourdough bread", price: "Rs 220" },
  { name: "Extra slice of American cheese", price: "Rs 80" },
  { name: "Additional beef patty (100g)", price: "Rs 500" },
  { name: "Extra bacon", price: "Rs 260" },
  { name: "Side of fries", price: "Rs 700" },
  { name: "Side of crisps", price: "Rs 300" },
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
            Single-origin espresso from Guatemala and Brazil. Hot-pressed sandwiches on sourdough
            and ciabatta. Salads, small plates, and viennoiserie laminated overnight. Prices in
            Pakistani Rupees.
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
            <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className={`md:col-span-5 ${reverse ? "md:col-start-8 md:row-start-1" : ""} reveal ${reverse ? "reveal-right" : "reveal-left"} zoom-img aspect-[4/5] overflow-hidden md:sticky md:top-32`}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`md:col-span-6 ${reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7"} reveal`}>
                <span className="label text-primary mb-4 block">{`0${idx + 1} · ${s.subtitle}`}</span>
                <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] mb-6">{s.title}</h2>
                {s.intro && (
                  <p className="text-on-surface-variant leading-relaxed mb-10 max-w-xl">{s.intro}</p>
                )}
                <ul className="space-y-7">
                  {s.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-6">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-4">
                          <span className="font-serif text-2xl">{item.name}</span>
                          {item.size && (
                            <span className="label text-on-surface-variant">{item.size}</span>
                          )}
                          <span className="flex-1 border-b border-dotted border-on-surface-variant/30 translate-y-[-4px]" />
                          <span className="font-serif text-xl text-primary whitespace-nowrap">{item.price}</span>
                        </div>
                        {item.notes && (
                          <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">{item.notes}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* Sides & additions */}
      <section className="bg-surface-low gutter py-24">
        <div className="max-w-[1200px] mx-auto reveal">
          <span className="label text-primary block mb-4">On The Side</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-10">Additions</h2>
          <ul className="grid md:grid-cols-2 gap-x-16 gap-y-5">
            {additions.map((a) => (
              <li key={a.name} className="flex items-baseline gap-4">
                <span className="font-serif text-xl">{a.name}</span>
                <span className="flex-1 border-b border-dotted border-on-surface-variant/30 translate-y-[-4px]" />
                <span className="font-serif text-lg text-primary whitespace-nowrap">{a.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-on-surface-variant max-w-2xl">
            Please inform in-house staff of any food allergies when placing your order. We use fresh
            ingredients sourced daily, due to which we have limited orders of each menu item available.
            All prices are final and exclusive of sales tax.
          </p>
        </div>
      </section>

      <section className="bg-on-surface text-surface gutter py-28 text-center">
        <div className="max-w-3xl mx-auto reveal">
          <p className="label text-primary-container mb-6">A Note</p>
          <p className="font-serif text-3xl md:text-4xl italic leading-[1.3]">
            All beans roasted weekly. We rest them five days before they reach your cup.
          </p>
        </div>
      </section>
    </>
  );
}

export default Menu;
