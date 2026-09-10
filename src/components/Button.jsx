import { useState } from "react";

// Ported from the Jeep UAE design system's own components/core/Button.jsx
// (see project/_ds/.../_ds_bundle.js) so CTAs keep the system's exact
// sizes, variants and colour-inversion hover states.

const base = {
  fontFamily: "var(--font-brand)",
  fontWeight: 700,
  textTransform: "uppercase",
  border: 0,
  borderRadius: "var(--radius-none)",
  cursor: "pointer",
  transition: "var(--transition-cta)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  textDecoration: "none",
  lineHeight: "23px",
};

const sizes = {
  sm: { fontSize: "0.875rem", padding: "5px 16px", minHeight: "var(--control-height-sm)" },
  md: { fontSize: "1rem", padding: "7px 16px 8px", minHeight: "var(--control-height)" },
  lg: { fontSize: "1.213rem", padding: "0.375rem 1.3rem", minHeight: "48px", lineHeight: "35px" },
};

const variants = {
  primary: { backgroundColor: "var(--action-primary-bg)", color: "var(--action-primary-fg)" },
  secondary: { backgroundColor: "var(--action-secondary-bg)", color: "var(--action-secondary-fg)" },
  tertiary: { backgroundColor: "var(--action-tertiary-bg)", color: "var(--action-tertiary-fg)" },
};

const hovers = {
  primary: { backgroundColor: "var(--action-primary-bg-hover)", color: "var(--action-primary-fg-hover)" },
  secondary: { backgroundColor: "var(--action-primary-bg)", color: "var(--action-primary-fg)" },
  tertiary: { backgroundColor: "var(--brand-black)", color: "var(--brand-white)" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  fullWidth = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const Tag = href && !disabled ? "a" : "button";
  const composed = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(disabled
      ? { backgroundColor: "var(--action-disabled-bg)", opacity: "var(--action-disabled-opacity)", cursor: "not-allowed" }
      : null),
    ...(fullWidth ? { width: "100%" } : null),
    ...(variant === "tertiary" ? { border: "1px solid var(--brand-black)" } : null),
    ...(hover && !disabled && variant === "tertiary" ? { border: "1px solid var(--brand-black)" } : null),
    ...style,
  };

  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === "button" ? disabled : undefined}
      style={composed}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
