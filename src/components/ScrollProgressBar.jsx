import { useRef } from "react";
import { useScrollProgressBar } from "../hooks/useSiteMotion.js";

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  useScrollProgressBar(barRef);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        background: "var(--brand-yellow)",
        zIndex: 200,
        width: "0%",
      }}
      ref={barRef}
      aria-hidden="true"
    />
  );
}
