import { TOOLS } from "../data/content.js";

export default function ShoppingTools() {
  return (
    <section id="tools" className="tools" data-screen-label="Shopping tools">
      <div className="tools__inner">
        <div className="eyebrow eyebrow--on-dark" data-anim="rise">
          03 &nbsp;&mdash;&nbsp; Finish it online
        </div>
        <h2 className="heading" data-anim="wipe" style={{ color: "var(--brand-white)", marginBottom: 36 }}>
          Shopping tools
        </h2>
        <div className="tools__grid">
          {TOOLS.map((t) => (
            <a key={t.num} href="#tools" className="tools__item" data-anim="rise">
              <span className="tools__num">{t.num}</span>
              <span className="tools__body">
                <img src={t.icon} alt="" width="28" height="28" className="tools__icon" />
                <span className="tools__title">{t.title}</span>
                <span className="tools__copy">{t.copy}</span>
                <span className="tools__cta">
                  <span>{t.cta}</span>
                  <img src="/assets/icons/icon-arrow-ios-forward-brand.svg" alt="" width="14" height="14" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
