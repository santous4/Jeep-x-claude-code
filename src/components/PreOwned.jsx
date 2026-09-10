import { CPO_COPY, CPO_HEADLINE, CPO_STATS } from "../data/content.js";
import Words from "./Words.jsx";
import Button from "./Button.jsx";

export default function PreOwned() {
  return (
    <section id="pre-owned" className="preowned" data-screen-label="Pre-owned">
      <div className="preowned__frame" data-parallax="1">
        <img
          src="/assets/images/cpo-forecourt.jpg"
          alt="A row of certified pre-owned Jeeps on a sunlit dealership forecourt"
        />
      </div>
      <div className="preowned__scrim" />
      <div className="preowned__content">
        <div className="eyebrow eyebrow--on-dark" data-anim="rise">
          05 &nbsp;&mdash;&nbsp; Certified pre-owned
        </div>
        <h2 className="preowned__headline" data-anim="words">
          <Words text={CPO_HEADLINE} />
        </h2>
        <p className="preowned__copy" data-anim="rise">
          {CPO_COPY}
        </p>
        <div className="preowned__stats" data-anim="rise">
          {CPO_STATS.map((s) => (
            <div className="preowned__stat" key={s.label}>
              <div className="preowned__stat-figure" data-anim="count" data-to={s.to}>
                {s.to}
              </div>
              <div className="preowned__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="preowned__ctas" data-anim="rise">
          <Button variant="primary" size="lg" href="#pre-owned">
            Browse pre-owned
          </Button>
          <Button variant="tertiary" size="lg" href="#pre-owned">
            Value my trade-in
          </Button>
        </div>
      </div>
    </section>
  );
}
