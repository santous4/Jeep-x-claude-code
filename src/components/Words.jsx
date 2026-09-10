// Splits text into words that rise into place one-by-one, staggered by
// index — used for the hero and pre-owned headlines.
export default function Words({ text, tag: Tag = "span" }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <Tag data-word style={{ transitionDelay: `${i * 70}ms` }}>
            {w}&nbsp;
          </Tag>
        </span>
      ))}
    </>
  );
}
