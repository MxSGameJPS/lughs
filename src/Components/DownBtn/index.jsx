import arrowDown from "../../Assets/Flechas_baixo.png";
import styles from "./downbtn.module.css";

export const DownBtn = ({ destination }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button className={styles.btn} onClick={() => scrollToSection(destination)}>
      <img src={arrowDown} alt="arrowDown" />
    </button>
  );
};
