import { useTranslation } from "react-i18next";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./wishBtn.module.css";

export const WishBtn = () => {
  const { t } = useTranslation();

  return (
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
  );
};
