import { MenuDesk } from "../MenuDesk";
import { MenuMobile } from "../MenuMobile";
import logo from "../../Assets/logo_hero.png";
import personagens from "../../Assets/personagens_hero.png";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./heroSection.module.css";
import { DownBtn } from "../DownBtn";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className={styles.wrapper}>
      <MenuMobile />
      <div className={styles.menuDeskBox}>
        <MenuDesk />
        <LanguageSwitcher />
      </div>

      <div className={styles.imgBox}>
        <img className={styles.imgLogo} src={logo} alt="logo" />
        <img
          className={styles.imgPersonagens}
          src={personagens}
          alt="personagens"
        />
      </div>
      <div className={styles.wishBtnBox}>
        <button className={styles.wishBtn}>
          <img src={iconBtn} alt="" />
          {t("buttons.wishlist")}
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
      <DownBtn destination="about" />
    </section>
  );
};
