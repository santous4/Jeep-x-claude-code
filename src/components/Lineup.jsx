import { useEffect, useRef, useState } from "react";
import { FILTERS, MODELS } from "../data/content.js";
import Button from "./Button.jsx";

export default function Lineup() {
  const [filter, setFilter] = useState("All");
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const dragRef = useRef(null);

  const visible = MODELS.filter((m) => filter === "All" || m.type === filter);

  const updateFromScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0;
    setProgress(p);
    const idx = Math.round(p * Math.max(0, visible.length - 1));
    setActiveIndex(idx);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        updateFromScroll();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.length]);

  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollTo({ left: 0 });
    setProgress(0);
    setActiveIndex(0);
  }, [filter]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".lineup-card");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { startX: e.clientX, startLeft: el.scrollLeft, dragging: true };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const el = trackRef.current;
    const d = dragRef.current;
    if (!el || !d || !d.dragging) return;
    el.scrollLeft = d.startLeft - (e.clientX - d.startX);
  };
  const endDrag = (e) => {
    const el = trackRef.current;
    if (dragRef.current) dragRef.current.dragging = false;
    if (el && e && e.pointerId != null) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
  };

  const count = visible.length;

  return (
    <section id="lineup" className="lineup" data-screen-label="Lineup">
      <div className="container lineup__head">
        <div>
          <div className="eyebrow" data-anim="rise">
            02 &nbsp;&mdash;&nbsp; Eight ways to go anywhere
          </div>
          <h2 className="heading" data-anim="wipe">
            The lineup
          </h2>
        </div>
        <div className="lineup__controls" data-anim="rise">
          <div className="lineup__filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`lineup__filter${f === filter ? " lineup__filter--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="lineup__nav">
            <button
              className="lineup__nav-btn lineup__nav-btn--prev"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous models"
            >
              <img src="/assets/icons/icon-arrow-ios-forward.svg" alt="" />
            </button>
            <button
              className="lineup__nav-btn lineup__nav-btn--next"
              onClick={() => scrollByCards(1)}
              aria-label="Next models"
            >
              <img src="/assets/icons/icon-arrow-ios-forward.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="lineup__stage" data-anim="rise">
        {count === 0 ? (
          <div className="lineup__empty">No models match this filter yet.</div>
        ) : (
          <div
            className="lineup__track no-scrollbar"
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            {visible.map((m, i) => (
              <article className="lineup-card" key={m.name}>
                <div className="lineup-card__media">
                  <span className="lineup-card__num">0{i + 1}</span>
                  <span className="lineup-card__type">{m.type}</span>
                  <img src={m.image} alt={m.name} draggable="false" />
                </div>
                <div className="lineup-card__body">
                  <h3 className="lineup-card__name">{m.name}</h3>
                  <div className="lineup-card__specs">
                    {m.specs.map((sp) => (
                      <span key={sp.k}>{sp.v}</span>
                    ))}
                  </div>
                  <div className="lineup-card__prices">
                    <div>
                      <div className="lineup-card__price-label">Price from</div>
                      <div className="lineup-card__price-value">AED {m.price}</div>
                    </div>
                    <div>
                      <div className="lineup-card__price-label">Monthly from</div>
                      <div className="lineup-card__price-value">AED {m.monthly}</div>
                    </div>
                  </div>
                  <div className="lineup-card__ctas">
                    <Button variant="primary" size="sm" href="#lineup">
                      Configure &amp; buy
                    </Button>
                    <Button variant="tertiary" size="sm" href="#lineup">
                      View model
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {count > 0 && (
        <div className="container lineup__foot">
          <div className="lineup__index">
            0{Math.min(activeIndex + 1, count)} / 0{count}
          </div>
          <div className="lineup__progress-track">
            <div className="lineup__progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}
    </section>
  );
}
