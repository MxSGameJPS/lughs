import React, { useEffect, useRef } from "react";
import styles from "./parallax.module.css";

/**
 * ParallaxBackground
 * Props:
 * - layers: array of image URLs (3 images expected) ordered from farthest to nearest
 */
export const ParallaxBackground = ({ layers = [] }) => {
  const ref = useRef(null);

  useEffect(() => {
    const elem = ref.current;
    if (!elem || !layers || layers.length === 0) return;

    // set initial background-image
    elem.style.backgroundImage = layers
      .map((l) => `url(${l})`)
      .reverse()
      .join(", ");

    function parallax(e) {
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX;
      const _mouseY = e.clientY;

      // factors match the example: nearest moves more (0.06), farthest less (0.01)
      const _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${
        50 - (_mouseY - _h) * 0.01
      }%`;
      const _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${
        50 - (_mouseY - _h) * 0.02
      }%`;
      const _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${
        50 - (_mouseY - _h) * 0.06
      }%`;

      // order must match the background-image order (last listed is on top)
      const x = `${_depth3}, ${_depth2}, ${_depth1}`;
      elem.style.backgroundPosition = x;
    }

    document.addEventListener("mousemove", parallax);
    return () => document.removeEventListener("mousemove", parallax);
  }, [layers]);

  return <div ref={ref} className={styles.parallax} aria-hidden="true" />;
};

export default ParallaxBackground;
