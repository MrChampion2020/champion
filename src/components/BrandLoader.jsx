import React from "react";
import logo from "../assets/logo.png";

const BrandLoader = ({
  label = "Loading",
  fullscreen = false,
  inline = false,
  compact = false,
  className = "",
}) => {
  const TagName = inline ? "span" : "div";
  const shellClassName = [
    inline ? "brand-loader-inline" : "brand-loader-shell",
    fullscreen ? "brand-loader-shell--fullscreen" : "",
    compact ? "brand-loader-shell--compact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const markClassName = [
    "brand-loader-mark",
    inline ? "brand-loader-mark--inline" : "",
    compact ? "brand-loader-mark--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TagName
      className={shellClassName}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
    >
      <span className={markClassName} aria-hidden="true">
        <span className="brand-loader-ring brand-loader-ring--outer" />
        <span className="brand-loader-ring brand-loader-ring--inner" />
        <span className="brand-loader-glow" />
        <img src={logo} alt="" className="brand-loader-logo" />
      </span>
      {label && !inline ? (
        <span className="brand-loader-label">{label}</span>
      ) : null}
    </TagName>
  );
};

export default BrandLoader;
