import { useState, useEffect, useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import styles from "./slideMobile.module.css";

export const SlideMobile = ({ slides }) => {
  const [idx, setIdx] = useState(0);

  // autoplay: avança o slide automaticamente a cada 7 segundos
  const autoplayRef = useRef(null);
  useEffect(() => {
    if (!slides || !slides.length) return;
    // limpa intervalo anterior
    const start = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setIdx((p) => (p === slides.length - 1 ? 0 : p + 1));
      }, 7000);
    };
    start();

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [slides]);

  if (!slides || !slides.length) return null;

  const resetAutoplay = () => {
    if (!slides || !slides.length) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setIdx((p) => (p === slides.length - 1 ? 0 : p + 1));
    }, 7000);
  };

  const prev = () => {
    setIdx((p) => (p === 0 ? slides.length - 1 : p - 1));
    resetAutoplay();
  };
  const next = () => {
    setIdx((p) => (p === slides.length - 1 ? 0 : p + 1));
    resetAutoplay();
  };

  const current = slides[idx];

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <video
          src={current.img}
          alt={current.title || `slide-${idx}`}
          autoPlay
          loop
          muted
        />
        <button className="nav prev" onClick={prev} aria-label="Anterior">
          <MdArrowBackIosNew size={36} />
        </button>

        <button className="nav next" onClick={next} aria-label="Próximo">
          <MdArrowForwardIos size={36} />
        </button>
      </div>

      {(current.title || current.text) && (
        <div className={styles.caption}>
          {current.title && <h4>{current.title}</h4>}
          {current.text && <p>{current.text}</p>}
        </div>
      )}

      <div className={styles.thumbs}>
        {slides.map((s, i) => (
          <button
            key={i}
            className={i === idx ? "active" : ""}
            onClick={() => {
              setIdx(i);
              resetAutoplay();
            }}
            aria-label={`Ir para slide ${i + 1}`}
          >
            <video
              src={s.img}
              alt={`thumb-${i}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
