import { useEffect, useState } from "react";
import { SLIDES } from "../data/content.js";
import Words from "./Words.jsx";
import Button from "./Button.jsx";

const AUTOPLAY_MS = 7000;

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, Math.max(2500, AUTOPLAY_MS));
    return () => clearInterval(id);
  }, []);

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
            <button key={s.label} className="hero__slide-btn" onClick={() => setSlide(i)}>
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
        </div>
      </div>
    </section>
  );
}
