import { GALLERY } from "../data/content.js";

export default function LifeGallery() {
  return (
    <section id="life" className="gallery" data-screen-label="Gallery">
      <div className="gallery__head">
        <div>
          <div className="eyebrow" data-anim="rise">
            04 &nbsp;&mdash;&nbsp; Owner photography
          </div>
          <h2 className="heading" data-anim="wipe">
            Life with a Jeep
          </h2>
        </div>
        <p className="gallery__intro" data-anim="rise">
          School runs, dawn surf, the long way home through the wadis. Where our owners actually go.
        </p>
      </div>
      <div className="gallery__grid-wrap">
        <div className="gallery__grid">
          {GALLERY.map((g) => (
            <figure
              key={g.src}
              className="gallery__item"
              data-anim="rise"
              style={{ gridColumn: `span ${g.cols}`, gridRow: `span ${g.rows}` }}
            >
              <img src={g.src} alt={g.alt} />
              <figcaption className="gallery__caption">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
