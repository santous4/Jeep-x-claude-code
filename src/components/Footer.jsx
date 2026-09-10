import { FOOTER_COLUMNS } from "../data/content.js";

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <p className="site-footer__tagline" data-anim="wipe">
            Go anywhere.
            <br />
            Do anything.&reg;
          </p>
          <button className="site-footer__totop" onClick={backToTop}>
            <img src="/assets/icons/icon-arrow-upward.svg" alt="" width="24" height="24" />
            <span>Back to top</span>
          </button>
        </div>

        <div className="site-footer__cols">
          {FOOTER_COLUMNS.map((c) => (
            <div key={c.title}>
              <div className="site-footer__col-title">{c.title}</div>
              <div className="site-footer__col-links">
                {c.links.map((l) => (
                  <a key={l} href="#top">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__logos">
            <img src="/assets/logo-jeep-white.png" alt="Jeep" />
            <span className="site-footer__rule" aria-hidden="true" />
            <img src="/assets/logo-alfuttaim-te.png" alt="Al-Futtaim Trading Enterprises" />
          </div>
          <div className="site-footer__legal">
            <a href="#top">Privacy policy</a>
            <a href="#top">Terms of use</a>
            <span>&copy; Al-Futtaim 2026. All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
