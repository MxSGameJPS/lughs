import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import logo from "../../Assets/logo.png";
import { useTranslation } from "react-i18next";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import LanguageSwitcher from "../LanguageSwitcher";
import styles from "./menuMobile.module.css";

export const MenuMobile = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // bloquear scroll do body enquanto o menu mobile estiver aberto
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [open]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <img src={logo} alt={t("menu.alt")} />

      <div className={styles.rightBox}>
        <button className={styles.wishBtn}>
          <img src={iconBtn} alt="" />
          {t("buttons.wishlist")}
          <MdOutlineKeyboardArrowRight />
        </button>
        <button onClick={() => setOpen(!open)}>
          <TiThMenu size={24} />
        </button>
      </div>

      {open && (
        <div className={styles.modal}>
          <div className={styles.menuBox}>
            <div className={styles.headerNav}>
              <img src={logo} alt={t("menu.alt")} />
              <button onClick={() => setOpen(!open)}>
                <IoCloseSharp size={24} />
              </button>
            </div>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("home")}
            >
              {t("menu.home")}
            </button>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("about")}
            >
              {t("menu.about")}
            </button>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("lughs")}
            >
              {t("menu.lughs")}
            </button>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("gallery")}
            >
              {t("menu.gallery")}
            </button>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("video")}
            >
              {t("menu.video")}
            </button>

            <button
              className={styles.btnMenu}
              onClick={() => scrollToSection("faq")}
            >
              {t("menu.faq")}
            </button>

            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
};
