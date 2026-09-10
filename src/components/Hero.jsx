import { useEffect, useState } from "react";
import { SLIDES } from "../data/content.js";
import Words from "./Words.jsx";
import Button from "./Button.jsx";

const AUTOPLAY_MS = 7000;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(
    () => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, Math.max(2500, AUTOPLAY_MS));
    return () => clearInterval(id);
  }, [playing]);

  const goTo = (i) => setSlide(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  const goPrev = () => goTo(slide - 1);
  const goNext = () => goTo(slide + 1);

  const d = SLIDES[slide];

  return (
    <section id="top" className="hero" data-screen-label="Hero">
      <div className="hero__frames" data-parallax="1">
        {SLIDES.map((s, i) => (
          <img
            key={s.label}
            data-kb="1"
            src={s.image}
            alt={s.alt}
            className={`hero__frame${i === slide ? " hero__frame--active" : ""}`}
          />
        ))}
      </div>
      <div className="hero__scrim" />

      <div className="hero__content">
        <div>
          <div className="hero__eyebrow" data-anim="rise">
            <span className="hero__eyebrow-rule" aria-hidden="true" />
            <span className="hero__eyebrow-index">
              0{slide + 1} / 0{SLIDES.length}
            </span>
            <span className="hero__eyebrow-label">{d.eyebrow}</span>
          </div>

          <h1 className="hero__headline" data-anim="words">
            <Words text={SLIDES[0].title} />
          </h1>

          <div className="hero__row" data-anim="rise">
            <p className="hero__copy">{d.copy}</p>
            <div className="hero__prices">
              <div>
                <div className="hero__price-label">Price from</div>
                <div className="hero__price-value">AED {d.price}</div>
              </div>
              <div>
                <div className="hero__price-label">Monthly from</div>
                <div className="hero__price-value">AED {d.monthly}</div>
              </div>
            </div>
            <div className="hero__ctas">
              <Button variant="primary" size="lg" href="#lineup">
                Configure &amp; buy
              </Button>
              <Button variant="tertiary" size="lg" href="#tools">
                Book a test drive
              </Button>
            </div>
          </div>
        </div>

        <div className="hero__slides">
          {SLIDES.map((s, i) => (
            <button key={s.label} className="hero__slide-btn" onClick={() => goTo(i)}>
              <span className="hero__slide-track">
                <span
                  className="hero__slide-fill"
                  style={{ transform: `scaleX(${i === slide ? 1 : 0})` }}
                />
              </span>
              <span
                className="hero__slide-label"
                style={{ color: i === slide ? "var(--brand-white)" : "rgba(255,255,255,.6)" }}
              >
                0{i + 1} &nbsp; {s.label}
              </span>
            </button>
          ))}

          <div className="hero__controls" role="group" aria-label="Slideshow controls">
            <button className="hero__control-btn" onClick={goPrev} aria-label="Previous slide">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M10 2L4 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="hero__control-btn"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={playing}
            >
              {playing ? (
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <rect x="3" y="2" width="3.4" height="12" fill="currentColor" />
                  <rect x="9.6" y="2" width="3.4" height="12" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M4 2l10 6-10 6V2z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button className="hero__control-btn" onClick={goNext} aria-label="Next slide">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M6 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
