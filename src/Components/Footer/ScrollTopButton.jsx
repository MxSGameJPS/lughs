import React, { useEffect, useState } from "react";
import styles from "./scrollTopButton.module.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export const ScrollTopButton = ({ threshold = 200 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`${styles.scrollTop} ${visible ? styles.show : ""}`}
      onClick={handleClick}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <MdOutlineKeyboardArrowUp size={24} />
    </button>
  );
};

export default ScrollTopButton;
