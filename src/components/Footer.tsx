import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-on-surface text-surface mt-32">
      <div className="max-w-[1800px] mx-auto gutter py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 reveal reveal-left">
          <div className="font-serif text-5xl md:text-6xl leading-[1.05]">
            Brew. <br />
            <span className="italic font-normal text-primary-container">A quiet ritual.</span>
          </div>
          <p className="mt-8 max-w-md text-surface/70 leading-relaxed">
            A specialty coffee house tucked in the heart of Islamabad — where every cup is a slow,
            considered moment.
          </p>
        </div>

        <div className="md:col-span-3 reveal" data-delay="120">
          <p className="label text-primary-container mb-4">Visit</p>
          <p className="text-surface/80 leading-relaxed">
            F-7 Markaz<br />
            Islamabad, Pakistan
          </p>
          <p className="label text-primary-container mt-8 mb-4">Hours</p>
          <p className="text-surface/80 leading-relaxed">
            <span className="text-primary-container">Dine-In</span><br />
            8 AM — 10 PM<br />
            <span className="text-primary-container mt-2 inline-block">Take Away</span><br />
            10 PM — 12 AM
          </p>
          <p className="text-surface/50 text-sm mt-3">Every day · Specialty Coffee &amp; Boulangerie</p>
        </div>

        <div className="md:col-span-4 reveal reveal-right" data-delay="200">
          <p className="label text-primary-container mb-4">Wander</p>
          <ul className="space-y-3">
            {[
              { to: "/menu", label: "The Menu" },
              { to: "/gallery", label: "The Gallery" },
              { to: "/reviews", label: "Words From Guests" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-serif text-xl hover:text-primary-container transition-colors">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-6 text-surface/70">
            <a href="https://www.instagram.com/brew.pk" target="_blank" rel="noreferrer" className="hover:text-primary-container transition-colors">Instagram</a>
            <a href="https://maps.google.com/?q=Brew+Islamabad" target="_blank" rel="noreferrer" className="hover:text-primary-container transition-colors">Google Maps</a>
          </div>
        </div>
      </div>
      <div className="gutter py-6 text-xs text-surface/40 flex justify-between max-w-[1800px] mx-auto">
        <span>© {new Date().getFullYear()} Brew Coffee House</span>
        <span className="label">Crafted with intention</span>
      </div>
    </footer>
  );
}
