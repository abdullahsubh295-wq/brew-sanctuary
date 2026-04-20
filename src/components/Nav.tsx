import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/brew-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const loc = useLocation();

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Always show near the top
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        // scrolling down
        setHidden(true);
        setOpen(false);
      } else if (delta < -6) {
        // scrolling up
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 glass transition-transform duration-500 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gutter py-5 md:py-6">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-full bg-on-surface flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Brew" className="w-9 h-9 object-cover" />
          </span>
          <span className="font-serif text-xl tracking-[0.32em] uppercase">
            Brew
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-serif text-[0.95rem] tracking-tight text-on-surface hover:text-primary transition-colors duration-300"
              activeProps={{ className: "text-primary border-b border-primary pb-1" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href="https://maps.google.com/?q=Brew+Islamabad"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden md:inline-flex btn-primary"
        >
          Visit Us
        </a>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden w-10 h-10 inline-flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block w-6 h-px bg-on-surface transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-on-surface transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-on-surface transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="gutter pb-8 pt-2 flex flex-col gap-5">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="font-serif text-2xl">
              {l.label}
            </Link>
          ))}
          <a href="https://maps.google.com/?q=Brew+Islamabad" target="_blank" rel="noreferrer" className="btn-primary self-start mt-2">
            Visit Us
          </a>
        </div>
      </div>
    </nav>
  );
}
