import React, { useEffect, useRef, useState, useMemo } from "react";

const DEFAULT_CONFIG = {
  position: "bottom",
  strength: 2,
  height: "6rem",
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: "0.3s",
  easing: "ease-out",
  opacity: 1,
  curve: "linear",
  responsive: false,
  target: "parent",
  className: "",
  style: {},
  hoverIntensity: 1,
};

const PRESETS = {
  top: { position: "top", height: "6rem" },
  bottom: { position: "bottom", height: "6rem" },
  left: { position: "left", height: "6rem" },
  right: { position: "right", height: "6rem" },
  subtle: { strength: 1, opacity: 0.8, divCount: 3 },
  intense: { strength: 4, divCount: 8, exponential: true },
  smooth: { curve: "bezier", divCount: 10 },
  sharp: { curve: "linear", divCount: 4 },
  header: { position: "top", height: "8rem" },
  footer: { position: "bottom", height: "8rem" },
};

const CURVE_FUNCTIONS = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) =>
    p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
};

const mergeConfigs = (...configs) =>
  configs.reduce((acc, c) => ({ ...acc, ...c }), {});

const getGradientDirection = (position) => {
  const map = {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  };
  return map[position] || "to bottom";
};

const GradualBlur = (props) => {
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ================= CONFIG ================= */
  const config = useMemo(() => {
    const preset = props.preset ? PRESETS[props.preset] || {} : {};
    return mergeConfigs(DEFAULT_CONFIG, preset, props);
  }, [props]);

  /* ================= SCROLL LOGIC ================= */
  useEffect(() => {
    if (config.animated !== "scroll") return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - rect.top / windowHeight;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.animated]);

  /* ================= BLUR LAYERS ================= */
  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;

    const baseStrength =
      config.animated === "scroll"
        ? config.strength * (1 - scrollProgress)
        : config.strength;

    const finalStrength =
      isHovered && config.hoverIntensity
        ? baseStrength * config.hoverIntensity
        : baseStrength;

    const curve = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = curve(i / config.divCount);

      let blurValue = config.exponential
        ? Math.pow(2, progress * 4) * 0.0625 * finalStrength
        : 0.0625 * (progress * config.divCount + 1) * finalStrength;

      const p1 = (increment * i - increment).toFixed(1);
      const p2 = (increment * i).toFixed(1);
      const p3 = (increment * i + increment).toFixed(1);
      const p4 = (increment * i + increment * 2).toFixed(1);

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      divs.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(${getGradientDirection(
              config.position,
            )}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${getGradientDirection(
              config.position,
            )}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity:
              config.animated === "scroll"
                ? config.opacity * scrollProgress
                : config.opacity,
          }}
        />,
      );
    }

    return divs;
  }, [config, isHovered, scrollProgress]);

  /* ================= CONTAINER STYLE ================= */
  const containerStyle = useMemo(() => {
    return {
      position: "absolute",
      inset: 0,
      pointerEvents: config.hoverIntensity ? "auto" : "none",
      zIndex: config.zIndex,
      ...config.style,
    };
  }, [config]);

  /* ================= RENDER ================= */
  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.className}`}
      style={containerStyle}
      onMouseEnter={
        config.hoverIntensity ? () => setIsHovered(true) : undefined
      }
      onMouseLeave={
        config.hoverIntensity ? () => setIsHovered(false) : undefined
      }
    >
      <div className="relative w-full h-full">{blurDivs}</div>
    </div>
  );
};

/* ================= EXPORT ================= */
const GradualBlurMemo = React.memo(GradualBlur);

GradualBlurMemo.displayName = "GradualBlur";
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;

export default GradualBlurMemo;