import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";

import styles from "./mobileHero.module.css";

import backgroundImage from "../../../Assets/Background_hero.png";
import charactersImage from "../../../Assets/personagens_hero_modal.png";
import iconBtn from "../../../Assets/icon_btn.png";

export const MobileHero = ({ onWishlist, downDestination }) => {
  const { t } = useTranslation();

  return (
    <section
      className={styles.wrapper}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.imageFrame}>
        <img
          src={charactersImage}
          alt={t("hero.charactersAlt", { defaultValue: "Lughs characters" })}
          className={styles.characters}
        />
      </div>

      <button
        type="button"
        className={styles.wishlistButton}
        onClick={onWishlist}
      >
        <img src={iconBtn} alt="" aria-hidden="true" />
        {t("buttons.wishlist")}
        <MdOutlineKeyboardArrowRight />
      </button>

      {downDestination && (
        <button
          type="button"
          className={styles.scrollHint}
          onClick={() =>
            document
              .getElementById(downDestination)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label={t("hero.scrollDown", { defaultValue: "Scroll down" })}
        />
      )}
    </section>
  );
};

export default MobileHero;
