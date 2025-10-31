import React, { useEffect, useRef } from "react";
import styles from "./parallax.module.css";

/**
 * ParallaxBackground
 * Props:
 * - layers: array of image URLs ordered from farthest to nearest (if length===1, a single img element will be used)
 * - depthFactors: optional array of numbers controlling movement strength per layer
 */
export const ParallaxBackground = ({
  layers = [],
  depthFactors = [0.01, 0.02, 0.06],
}) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ tx: 0, ty: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !layers || layers.length === 0) return;

    // If only one layer, render an <img> and move it via transform (better control over size)
    if (layers.length === 1) {
      const imgEl = imgRef.current;
      if (!imgEl) return;

      // no-op placeholders removed

      function onMove(e) {
        const _w = window.innerWidth / 2;
        const _h = window.innerHeight / 2;
        const _mouseX = e.clientX;
        const _mouseY = e.clientY;

        // use first depthFactor for single image
        const f = depthFactors[0] || 0.03;
        const x = -(_mouseX - _w) * f;
        const y = -(_mouseY - _h) * f;

        stateRef.current.tx = x;
        stateRef.current.ty = y;

        // rAF loop
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            const { tx, ty } = stateRef.current;
            imgEl.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0)`;
            rafRef.current = null;
          });
        }
      }

      document.addEventListener("mousemove", onMove);
      return () => {
        document.removeEventListener("mousemove", onMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    // fallback for multiple layers: use background-image approach (existing behavior)
    const elem = containerRef.current;
    elem.style.backgroundImage = layers
      .map((l) => `url(${l})`)
      .reverse()
      .join(", ");

    function parallax(e) {
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX;
      const _mouseY = e.clientY;

      const d = depthFactors;
      const _depth1 = `${50 - (_mouseX - _w) * (d[0] || 0.01)}% ${
        50 - (_mouseY - _h) * (d[0] || 0.01)
      }%`;
      const _depth2 = `${50 - (_mouseX - _w) * (d[1] || 0.02)}% ${
        50 - (_mouseY - _h) * (d[1] || 0.02)
      }%`;
      const _depth3 = `${50 - (_mouseX - _w) * (d[2] || 0.06)}% ${
        50 - (_mouseY - _h) * (d[2] || 0.06)
      }%`;

      const x = `${_depth3}, ${_depth2}, ${_depth1}`;
      elem.style.backgroundPosition = x;
    }

    document.addEventListener("mousemove", parallax);
    return () => document.removeEventListener("mousemove", parallax);
  }, [layers, depthFactors]);

  return (
    <div ref={containerRef} className={styles.parallax} aria-hidden="true">
      {layers && layers.length === 1 && (
        <img
          ref={imgRef}
          src={layers[0]}
          className={styles.parallaxImg}
          alt=""
        />
      )}
    </div>
  );
};

export default ParallaxBackground;
