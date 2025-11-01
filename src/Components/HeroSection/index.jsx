import { MenuDesk } from "../MenuDesk";
import { MenuMobile } from "../MenuMobile";
import { ParallaxBackground } from "../ParallaxBackground";
// import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./heroSection.module.css";
import { DownBtn } from "../DownBtn";
import MobileHero from "./MobileHero";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className={styles.wrapper}>
      <MenuMobile />
      <MobileHero />

      <div className={styles.menuDeskBox}>
        <MenuDesk />
        {/* <LanguageSwitcher /> */}
      </div>

      <div className={styles.imgBox}>
        <ParallaxBackground />
      </div>
      <div className={styles.wishBtnBox}>
        <button className={styles.wishBtn}>
          <img src={iconBtn} alt="" />
          {t("buttons.wishlist")}
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
      <div className={styles.downBtnWrapper}>
        <DownBtn destination="about" />
      </div>
    </section>
  );
};
