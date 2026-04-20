import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/gallery-3.jpg";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Brew/@33.7272512,73.0429065,17z/data=!4m7!3m6!1s0x38dfbf7d4356f4a7:0xb241786c707fd4a2!8m2!3d33.7272513!4d73.0477774!10e9!16s%2Fg%2F11r6q_0_tz";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Brew Coffee House" },
      { name: "description", content: "Real Google reviews from guests of Brew, E-7 Islamabad. Read words from the room and add your own." },
      { property: "og:title", content: "Reviews — Brew" },
      { property: "og:description", content: "Real Google reviews from guests of Brew, E-7 Islamabad." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Reviews,
});

type GoogleReview = { name: string; source: "Google" | "Local Guide" | "Visitor"; rating: number; date: string; text: string; highlight?: boolean };
type DbReview = { id: string; name: string; rating: number; text: string; created_at: string };

const reviews: GoogleReview[] = [
  { name: "Mir Shai Mazar Baloch", source: "Local Guide", rating: 5, date: "4 months ago", text: "Brew in E-7 Shaheen Market is a refreshing addition to Islamabad's breakfast and coffee scene. It's a wonderful place to start your day, whether you're in the mood for a hearty breakfast, a perfectly brewed cup of coffee, or a light bite.", highlight: true },
  { name: "Rameen Maryam", source: "Local Guide", rating: 4, date: "5 months ago", text: "I really loved the ambiance and vibe of the cafe although it's always crowded. The interior is beautifully done and the coffee hits the right notes — perfect spot to settle in for a long morning." },
  { name: "neha fatima", source: "Local Guide", rating: 5, date: "4 months ago", text: "Brew has always been one of my favourite stops — either for breakfast, lunch, or just a coffee hang. It has absolutely amazing sandwiches, try the Chicken on the Run, it's the most in-demand for a reason." },
  { name: "Midhat Waris", source: "Local Guide", rating: 5, date: "2 months ago", text: "Always a pleasure coming here! Their dip 'Ricotta Be Kidding Me' is a great start to any meal. Burgers and sandwiches are fresh and delicious, and the coffee is consistently lovely." },
  { name: "Amna Khan", source: "Google", rating: 5, date: "recent", text: "If I'm ever travelling to ISB, my visit isn't complete without stopping by Brew. Their Chicken on the Run is my go-to order and it never disappoints. It's the only place where I can actually get a salad that tastes amazing." },
  { name: "Sitara Hassan", source: "Google", rating: 5, date: "recent", text: "I love their coffee and desserts. A very popular place for many — rightfully so. Their shelves are filled with books and books, and that's one of my favourite things about the décor." },
  { name: "Muhammad Kamran", source: "Google", rating: 4, date: "recent", text: "Tried their Chicken on the Run sandwich and apple juice. Good quality and taste. Ambiance was good but a bit crowded. Recommend." },
  { name: "Anna", source: "Visitor", rating: 4, date: "recent", text: "Really cool cafe with great views from the roof terrace. Good coffee — and very grateful they offer Oatly as a milk option. Lovely spot." },
  { name: "Tayyaba Ahsan", source: "Local Guide", rating: 4, date: "9 months ago", text: "Visited Brew in E-7 for lunch around 1:30pm. Both outdoor ground-floor seating and a first-floor area, we chose to sit upstairs. The space has a beautiful, quiet energy and the coffee was excellent." },
  { name: "Hira Iqbal", source: "Local Guide", rating: 4, date: "6 months ago", text: "Salad and sandwiches are really really good and a must try. We had Chicken on the Run and Where Are the Eggs, and the Fresco salad — they were 9/10." },
];

const stars = (n: number) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(80, "Name is too long"),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(4, "Tell us a little more").max(1000, "Please keep it under 1000 characters"),
});

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
};

function Reviews() {
  const featured = reviews.find((r) => r.highlight)!;
  const rest = reviews.filter((r) => !r.highlight);

  const [dbReviews, setDbReviews] = useState<DbReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, text, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) setDbReviews(data as DbReview[]);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = reviewSchema.safeParse({ name, rating, text });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your entry");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      rating: parsed.data.rating,
      text: parsed.data.text,
    });
    setSubmitting(false);
    if (insertError) {
      setError("Could not post your review. Please try again.");
      return;
    }
    setName(""); setText(""); setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    loadReviews();
  };

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
            <div className="font-serif text-7xl text-primary leading-none">4.2</div>
            <div className="text-primary text-2xl tracking-widest">★★★★☆</div>
            <p className="text-on-surface-variant">Rated by hundreds of guests on Google Maps for Brew, E-7 Islamabad.</p>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost inline-flex mt-3">
              View more on Google →
            </a>
          </div>
        </div>
      </header>

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

      <section className="bg-surface-low gutter py-28">
        <div className="max-w-[1500px] mx-auto">
          {dbReviews.length > 0 && (
            <div className="mb-10 reveal">
              <span className="label text-primary">From This Site</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-2">Recent visitor notes</h2>
            </div>
          )}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {dbReviews.map((r) => (
              <article key={r.id} className="lift bg-primary-container/40 p-8 md:p-10 mb-6 break-inside-avoid border-l-4 border-primary">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-primary tracking-widest">{stars(r.rating)}</span>
                  <span className="label text-on-surface-variant">Visitor</span>
                </div>
                <p className="font-serif text-xl md:text-[1.4rem] leading-[1.45] text-on-surface">"{r.text}"</p>
                <div className="mt-7 flex items-center justify-between text-sm">
                  <span className="font-serif text-lg">{r.name}</span>
                  <span className="text-on-surface-variant">{formatDate(r.created_at)}</span>
                </div>
              </article>
            ))}
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
          {loading && (
            <p className="mt-6 text-center text-on-surface-variant text-sm">Loading visitor notes…</p>
          )}
          <div className="mt-12 text-center reveal">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-primary inline-flex">
              View more on Google
            </a>
          </div>
        </div>
      </section>

      <section id="write" className="bg-surface gutter py-28">
        <div className="max-w-3xl mx-auto reveal">
          <div className="text-center mb-12 space-y-4">
            <span className="label text-primary">Add Your Voice</span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Tell us about your <span className="italic">visit.</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Leave a note here for everyone to see, or share it directly on Google so other guests can find us.
            </p>
          </div>

          <form onSubmit={submit} className="bg-surface-lowest p-8 md:p-12 lift space-y-7">
            <div className="grid md:grid-cols-2 gap-6">
              <label className="block">
                <span className="label text-on-surface-variant block mb-3">Your name</span>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-on-surface/20 py-3 font-serif text-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Hira A."
                />
              </label>
              <label className="block">
                <span className="label text-on-surface-variant block mb-3">Your rating</span>
                <div className="flex gap-2 py-3 text-2xl">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`transition-transform hover:scale-125 ${n <= rating ? "text-primary" : "text-on-surface/20"}`}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <label className="block">
              <span className="label text-on-surface-variant block mb-3">Your note</span>
              <textarea
                required
                rows={5}
                maxLength={1000}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-transparent border border-on-surface/15 p-4 font-serif text-lg leading-relaxed focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="The flat white, the corner seat, the long Sunday morning…"
              />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-sm text-on-surface-variant">
                {submitted
                  ? "Thank you — your note is now part of the room."
                  : "Notes are saved and visible to everyone who visits this page."}
              </p>
              <div className="flex flex-wrap gap-4">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? "Posting…" : "Post your review"}
                </button>
                <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost">Review on Google</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Reviews;
