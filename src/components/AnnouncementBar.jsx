export default function AnnouncementBar({ text, onDismiss }) {
  return (
    <div className="announcement">
      <span className="announcement__dot" aria-hidden="true" />
      <span className="announcement__text">{text}</span>
      <a href="#pre-owned" className="announcement__link">
        Value my trade-in
      </a>
      <button className="announcement__close" onClick={onDismiss} aria-label="Dismiss announcement">
        &times;
      </button>
    </div>
  );
}
