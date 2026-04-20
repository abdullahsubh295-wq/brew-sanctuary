import { useEffect, useRef } from "react";

/**
 * Mounts the custom dot cursor (desktop only) and a global IntersectionObserver
 * that toggles `.is-visible` on any element with `.reveal`.
 * Uses a MutationObserver so newly-mounted elements (route changes) are also tracked.
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

  // Scroll reveal observer — reused across route changes via MutationObserver
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) =>
        el.classList.add("is-visible"),
      );
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        io.observe(el);
      });
    };

    // Initial pass
    observe(document.body);

    // Watch for new .reveal elements added by route changes / dynamic content
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains("reveal")) io.observe(el);
          if (typeof el.querySelectorAll === "function") observe(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: ensure anything still hidden after 1.2s becomes visible
    const failSafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 1200);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  return null;
}
