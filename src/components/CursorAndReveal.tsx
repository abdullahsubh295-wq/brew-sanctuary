import { useEffect, useRef } from "react";

/**
 * Mounts the custom dot cursor (desktop only) and a global IntersectionObserver
 * that toggles `.is-visible` on any element with `.reveal`.
 */
export function CursorAndReveal() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    document.documentElement.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor-dot is-hidden";
    document.body.appendChild(dot);
    dotRef.current = dot;

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dot.classList.remove("is-hidden");
    };
    const onLeave = () => dot.classList.add("is-hidden");

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest("a, button, [data-cursor='hover'], input, textarea")) {
        dot.classList.add("is-hover");
      } else {
        dot.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseover", onOver);
      dot.remove();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return null;
}
