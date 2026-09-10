import { NAV_ITEMS } from "../data/content.js";

export default function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="site-header__logo">
        <img src="/assets/logo-jeep-white.png" alt="Jeep" />
      </a>
      <nav className="site-header__nav no-scrollbar" aria-label="Primary">
        {NAV_ITEMS.map((n) => (
          <a key={n.label} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="site-header__actions">
        <a href="#tools" className="site-header__phone">
          8005119
        </a>
        <img
          src="/assets/icons/icon-person-line.svg"
          alt="My account"
          title="My account"
          width="22"
          height="22"
          className="site-header__icon"
        />
        <img
          src="/assets/icons/icon-heart-line.svg"
          alt="Saved cars"
          title="Saved cars"
          width="22"
          height="22"
          className="site-header__icon"
        />
      </div>
    </header>
  );
}
