import { USPS } from "../data/content.js";

export default function WhyJeep() {
  return (
    <section id="why" className="why" data-screen-label="Why Jeep">
      <div className="container">
        <div className="why__head">
          <div className="eyebrow" data-anim="rise">
            06 &nbsp;&mdash;&nbsp; Four numbers we are held to
          </div>
          <h2 className="heading" data-anim="wipe">
            Why choose a Jeep?
          </h2>
        </div>
        <div className="why__grid">
          {USPS.map((u) => (
            <div className="why-card" data-anim="rise" key={u.title}>
              <img src={u.icon} alt="" width="26" height="26" className="why-card__icon" />
              <div className="why-card__figure" data-anim="count" data-to={u.figure} data-suffix={u.suffix}>
                {u.figure}
                {u.suffix}
              </div>
              <div className="why-card__rule" aria-hidden="true" />
              <div className="why-card__title">{u.title}</div>
              <div className="why-card__copy">{u.copy}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
