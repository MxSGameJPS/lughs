import { useTranslation } from "react-i18next";
import logo from "../../Assets/logo.png";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./menuDesk.module.css";
import LanguageSwitcher from "../LanguageSwitcher";

export const MenuDesk = () => {
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <img src={logo} alt={t("menu.alt")} />

        <div className={styles.menuBox}>
          <button onClick={() => scrollToSection("home")}>
            {t("menu.home")}
          </button>

          <div className={styles.menuBar} />

          <button onClick={() => scrollToSection("about")}>
            {t("menu.about")}
          </button>

          <div className={styles.menuBar} />

          <button onClick={() => scrollToSection("lughs")}>
            {t("menu.lughs")}
          </button>

          <div className={styles.menuBar} />

          <button onClick={() => scrollToSection("gallery")}>
            {t("menu.gallery")}
          </button>

          <div className={styles.menuBar} />

          <button onClick={() => scrollToSection("video")}>
            {t("menu.video")}
          </button>

          <div className={styles.menuBar} />

          <button onClick={() => scrollToSection("faq")}>
            {t("menu.faq")}
          </button>
        </div>
      </div>
      <a
      className={styles.wishBtn}
      href="https://store.steampowered.com/app/3234720/Lugh_World/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={iconBtn} alt="" />
      {t("buttons.wishlist")}
      <MdOutlineKeyboardArrowRight />
    </a>
      <div>
        <LanguageSwitcher />
      </div>
    </>
  );
};
