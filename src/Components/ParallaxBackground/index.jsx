import React, { useEffect, useMemo, useRef } from "react";
import styles from "./parallax.module.css";

import depth1Image from "../../Assets/Background_hero.png";
import logoImage from "../../Assets/logo_hero.png";
import personagensImage from "../../Assets/personagens_hero.png";
import depth3Image from "../../Assets/crystal-isolado.png";

const defaultImages = {
  // agora depth1 pode ter múltiplas imagens (frente) e depth2 é a camada do meio com uma imagem
  depth1: [depth1Image, logoImage],
  depth2: personagensImage,
  depth3: depth3Image,
};

const defaultIntensity = {
  depth1: 0.01,
  depth2: 0.01,
  depth3: 0.02,
};

const defaultSizes = {
  depth1: ["cover", "clamp(180px, 22vw, 320px) auto"],
  depth2: ["clamp(360px, 46vw, 760px) auto"],
  depth3: "clamp(200px, 46vw, 360px) auto",
};

const defaultAnchors = {
  depth1: [
    [50, 52],
    [18, 52],
  ],
  depth2: [78, 60],
  depth3: [71, 70],
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  return value != null ? [value] : [];
};

const ensureAnchorPair = (value, fallbackPair) => {
  if (Array.isArray(value) && value.length === 2) {
    const [x, y] = value;
    const parsedX = Number.isFinite(Number(x)) ? Number(x) : fallbackPair[0];
    const parsedY = Number.isFinite(Number(y)) ? Number(y) : fallbackPair[1];
    return [parsedX, parsedY];
  }
  return fallbackPair;
};

const normalizeAnchorList = (value, fallbackList) => {
  if (Array.isArray(value)) {
    if (Array.isArray(value[0])) {
      return value.map((item, index) =>
        ensureAnchorPair(
          item,
          fallbackList[Math.min(index, fallbackList.length - 1)]
        )
      );
    }

    if (value.length === 2) {
      return [ensureAnchorPair(value, fallbackList[0])];
    }
  }

  return fallbackList;
};

export const ParallaxBackground = ({
  depthImages = defaultImages,
  intensity = defaultIntensity,
  sizes = defaultSizes,
  anchors = defaultAnchors,
  className = "",
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  const layerData = useMemo(() => {
    const resolvedImages = {
      depth1: depthImages.depth1 ?? defaultImages.depth1,
      depth2: depthImages.depth2 ?? defaultImages.depth2,
      depth3: depthImages.depth3 ?? defaultImages.depth3,
    };

    const resolvedIntensity = {
      depth1: intensity?.depth1 ?? defaultIntensity.depth1,
      depth2: intensity?.depth2 ?? defaultIntensity.depth2,
      depth3: intensity?.depth3 ?? defaultIntensity.depth3,
    };

    const resolvedSizes = {
      depth1: sizes?.depth1 ?? defaultSizes.depth1,
      depth2: sizes?.depth2 ?? defaultSizes.depth2,
      depth3: sizes?.depth3 ?? defaultSizes.depth3,
    };

    const resolvedAnchors = {
      // depth1 agora pode ser uma lista de anchors (normalizamos mais abaixo)
      depth1: anchors?.depth1 ?? defaultAnchors.depth1,
      depth2: normalizeAnchorList(
        anchors?.depth2 ?? defaultAnchors.depth2,
        defaultAnchors.depth2
      ),
      depth3: ensureAnchorPair(
        anchors?.depth3 ?? defaultAnchors.depth3,
        defaultAnchors.depth3
      ),
    };

    const middleImages = toArray(resolvedImages.depth2);
    const middleSizes = toArray(resolvedSizes.depth2 ?? defaultSizes.depth2);
    const middleAnchors = normalizeAnchorList(
      resolvedAnchors.depth2,
      defaultAnchors.depth2
    );

    const data = [];

    // front (depth1) deve ficar no topo — colocamos estas imagens primeiro na lista
    const frontImages = toArray(resolvedImages.depth1);
    const frontSizes = toArray(resolvedSizes.depth1 ?? defaultSizes.depth1);
    const frontAnchors = normalizeAnchorList(resolvedAnchors.depth1, [
      defaultAnchors.depth1,
    ]);

    // Construímos as entradas para frontImages preservando índices de size/anchor,
    // depois invertemos a ordem ao inserir em `data` para que a última imagem
    // do array (por exemplo a `logo`) seja colocada primeiro no `background-image`
    // e apareça no topo.
    const frontEntries = frontImages
      .map((src, index) => {
        if (!src) return null;

        const size =
          frontSizes[index] ??
          frontSizes[frontSizes.length - 1] ??
          (Array.isArray(defaultSizes.depth1)
            ? defaultSizes.depth1[
                Math.min(index, defaultSizes.depth1.length - 1)
              ]
            : defaultSizes.depth1);

        const anchor = ensureAnchorPair(
          frontAnchors[index] ??
            frontAnchors[frontAnchors.length - 1] ??
            defaultAnchors.depth1,
          defaultAnchors.depth1
        );

        return {
          src,
          depth: resolvedIntensity.depth1,
          size,
          anchor,
        };
      })
      .filter(Boolean);

    // Separar a entrada de background (assumimos que a primeira imagem do array
    // `depth1` é o background grande) das imagens de topo (logo etc.). Vamos
    // inserir as logos por cima, depois as camadas do meio, depois depth3 e por
    // último o background, garantindo que nada seja coberto indevidamente.
    const bgEntry = frontEntries.length ? frontEntries[0] : null;
    const topFrontEntries =
      frontEntries.length > 1 ? frontEntries.slice(1).reverse() : [];

    // inserir logos/topo
    topFrontEntries.forEach((entry) => data.push(entry));

    // inserir depth3 antes do depth2 para que depth3 fique na frente do depth2
    if (resolvedImages.depth3) {
      data.push({
        src: resolvedImages.depth3,
        depth: resolvedIntensity.depth3,
        size: resolvedSizes.depth3 ?? defaultSizes.depth3,
        anchor: resolvedAnchors.depth3,
      });
    }

    // middle (depth2)
    middleImages.forEach((src, index) => {
      if (!src) return;

      const size =
        middleSizes[index] ??
        middleSizes[middleSizes.length - 1] ??
        (Array.isArray(defaultSizes.depth2)
          ? defaultSizes.depth2[Math.min(index, defaultSizes.depth2.length - 1)]
          : defaultSizes.depth2);

      const anchor = ensureAnchorPair(
        middleAnchors[index] ??
          middleAnchors[middleAnchors.length - 1] ??
          defaultAnchors.depth2[
            Math.min(index, defaultAnchors.depth2.length - 1)
          ],
        defaultAnchors.depth2[0]
      );

      data.push({
        src,
        depth: resolvedIntensity.depth2,
        size,
        anchor,
      });
    });

    // inserir o background (primeira imagem do depth1) por baixo de tudo
    if (bgEntry) {
      data.push(bgEntry);
    }

    return data;
  }, [anchors, depthImages, intensity, sizes]);

  const backgroundImage = useMemo(
    () => layerData.map((layer) => `url(${layer.src})`).join(", "),
    [layerData]
  );

  const backgroundSize = useMemo(
    () => layerData.map((layer) => layer.size || "auto").join(", "),
    [layerData]
  );

  const layerDepths = useMemo(
    () => layerData.map((layer) => layer.depth),
    [layerData]
  );

  const layerAnchors = useMemo(
    () => layerData.map((layer) => layer.anchor),
    [layerData]
  );

  const initialPositions = useMemo(
    () => layerAnchors.map(([x, y]) => `${x}% ${y}%`).join(", "),
    [layerAnchors]
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const container = containerRef.current;
    if (!container || !layerData.length) return undefined;

    container.style.backgroundImage = backgroundImage;
    container.style.backgroundSize = backgroundSize;
    container.style.backgroundPosition = initialPositions;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      coordsRef.current = { x: event.clientX, y: event.clientY };

      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;

          const { x, y } = coordsRef.current;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          const positions = layerDepths.map((factor, index) => {
            const [baseX, baseY] = layerAnchors[index];
            const posX = baseX - (x - centerX) * factor;
            const posY = baseY - (y - centerY) * factor;
            return `${posX}% ${posY}%`;
          });

          container.style.backgroundPosition = positions.join(", ");
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    backgroundImage,
    backgroundSize,
    initialPositions,
    layerAnchors,
    layerData.length,
    layerDepths,
  ]);

  const combinedClassName = className
    ? `${styles.parallax} ${className}`
    : styles.parallax;

  return (
    <div
      ref={containerRef}
      className={combinedClassName}
      aria-hidden="true"
      style={{
        backgroundImage,
        backgroundSize,
        backgroundPosition: initialPositions,
      }}
    />
  );
};

export default ParallaxBackground;
