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
      className={`fixed inset-x-0 z-50 transition-all duration-500 ease-out ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      style={{ top: "1rem" }}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="glass rounded-full border border-on-surface/8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] flex items-center justify-between pl-4 pr-2 md:pl-6 md:pr-3 py-2 md:py-2.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-full bg-on-surface flex items-center justify-center overflow-hidden ring-1 ring-on-surface/20 transition-transform duration-500 group-hover:rotate-[20deg]">
              <img src={logo} alt="Brew" className="w-8 h-8 object-cover" />
            </span>
            <span className="font-serif text-base md:text-lg tracking-[0.28em] uppercase">
              Brew
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-pill"
                activeProps={{ className: "nav-pill is-active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a
            href="#location"
            className="hidden md:inline-flex items-center gap-2 bg-on-surface text-surface px-5 py-2.5 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.18em] hover:bg-primary transition-colors duration-300"
          >
            Visit Us
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          </a>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden w-10 h-10 rounded-full bg-on-surface text-surface inline-flex flex-col items-center justify-center gap-[5px]"
          >
            <span className={`block w-4 h-px bg-surface transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-4 h-px bg-surface transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-px bg-surface transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${open ? "max-h-96" : "max-h-0"}`}
        >
          <div className="glass mt-2 rounded-3xl px-6 pb-8 pt-6 flex flex-col gap-5 border border-on-surface/10">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="font-serif text-2xl">
                {l.label}
              </Link>
            ))}
            <a href="#location" className="btn-primary self-start mt-2">
              Visit Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
