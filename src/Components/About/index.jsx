import { useTranslation } from "react-i18next";
import monitor from "../../Assets/Monitor.png";
import styles from "./about.module.css";
import { WishBtn } from "../WishBtn";
import { DownBtn } from "../DownBtn";
import iconBtn from "../../Assets/icon_btn.png";

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className={styles.wrapper}>
      <div className={styles.textbox}>
        <h1>{t("about.title")}</h1>

        <p>{t("about.subtitle")}</p>

        <div className={styles.wishBtndesk}>
          <WishBtn />
        </div>
      </div>

      <div className={styles.monitorWrap}>
        <video
          className={styles.screenVideo}
          src="https://video.wixstatic.com/video/896967_cdaca688ffb14cb281dfd0514c2ec6cd/1080p/mp4/file.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <img className={styles.frame} src={monitor} alt="monitor" />
      </div>

      <div className={styles.wishBtnMobile}>
        <WishBtn />
        
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "80px",
        }}
      >
        <DownBtn destination="lughs" />
      </div>
    </section>
  );
};
