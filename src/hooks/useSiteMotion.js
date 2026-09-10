import { useEffect } from "react";

/**
 * Drives the whole page's scroll-triggered motion in one pass, mirroring the
 * source prototype's engine: elements marked [data-anim="rise|wipe|words"]
 * reveal once when they cross into view, [data-anim="count"] count up,
 * [data-parallax] drifts against scroll position. Respects
 * prefers-reduced-motion and force-shows everything after a safety timeout
 * so nothing can get stuck hidden (e.g. a resize race or a slow observer).
 */
export function useSiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animNodes = () => Array.from(document.querySelectorAll("[data-anim]"));

    function countEl(el) {
      const raw = String(el.dataset.to || "").replace(/,/g, "");
      const target = parseInt(raw, 10);
      if (!isFinite(target)) return;
      const suffix = el.dataset.suffix || "";
      if (reduced) {
        el.textContent = target.toLocaleString("en-US") + suffix;
        return;
      }
      const start = performance.now();
      const dur = 1100;
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      el.textContent = "0" + suffix;
      requestAnimationFrame(step);
    }

    function playOne(el) {
      if (el.dataset.played) return;
      const h = window.innerHeight || 800;
      const r = el.getBoundingClientRect();
      if (r.top > h * 0.92 || r.bottom < 0) return;
      el.dataset.played = "1";
      const kind = el.dataset.anim;
      if (kind === "rise" || kind === "wipe") {
        el.classList.add("is-visible");
      } else if (kind === "words") {
        el.querySelectorAll("[data-word]").forEach((w) => w.classList.add("is-visible"));
      } else if (kind === "count") {
        countEl(el);
      }
    }

    function play() {
      animNodes().forEach(playOne);
    }

    function parallax() {
      if (reduced) return;
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const h = window.innerHeight || 800;
        const centred = (r.top + r.height / 2 - h / 2) / h;
        el.style.transform = "translate3d(0," + (centred * -7).toFixed(2) + "%,0)";
      });
    }

    function showAll() {
      animNodes().forEach((el) => {
        el.classList.add("is-visible");
        el.dataset.played = "1";
        el.querySelectorAll("[data-word]").forEach((w) => w.classList.add("is-visible"));
        if (el.dataset.anim === "count" && el.textContent.trim() === "") {
          countEl(el);
        }
      });
    }

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        play();
        parallax();
      });
    };

    if (reduced) {
      showAll();
    } else {
      requestAnimationFrame(() => {
        play();
        parallax();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const safety = setTimeout(showAll, 2600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(safety);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/**
 * Writes scroll progress (0–1) straight to a DOM node's width style,
 * bypassing React state so the yellow top-of-page progress bar can update
 * every frame without re-rendering the tree.
 */
export function useScrollProgressBar(ref) {
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.width = (p * 100).toFixed(2) + "%";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
