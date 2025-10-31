import { useTranslation } from "react-i18next";
import iconBtn from "../../Assets/icon_btn.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./wishBtn.module.css";

export const WishBtn = () => {
  const { t } = useTranslation();

  return (
    <button className={styles.wishBtn}>
      <img src={iconBtn} alt="" />
      {t("buttons.wishlist")}
      <MdOutlineKeyboardArrowRight />
    </button>
  );
};
