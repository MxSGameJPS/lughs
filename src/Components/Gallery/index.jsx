import { WishBtn } from "../WishBtn";
import { DownBtn } from "../DownBtn";
import { SlideDesk } from "./SlideDesk";
import { SlideMobile } from "./SlideMobile";
import { useTranslation } from "react-i18next";
import img1 from "../../Assets/gallery_1.png";
import img2 from "../../Assets/gallery_2.png";
import img3 from "../../Assets/gallery_3.png";
import img4 from "../../Assets/gallery_4.png";
import img5 from "../../Assets/gallery_5.png";
import styles from "./gallery.module.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export const Gallery = () => {
  const { t } = useTranslation();
  const slides = [
    {
      title: t("gallery.carousel.carousel1.title"),
      text: t("gallery.carousel.carousel1.text"),
      img: img1,
    },
    {
      title: t("gallery.carousel.carousel2.title"),
      text: t("gallery.carousel.carousel2.text"),
      img: img2,
    },
    {
      title: t("gallery.carousel.carousel3.title"),
      text: t("gallery.carousel.carousel3.text"),
      img: img3,
    },
    {
      title: t("gallery.carousel.carousel4.title"),
      text: t("gallery.carousel.carousel4.text"),
      img: img4,
    },
    {
      title: t("gallery.carousel.carousel5.title"),
      text: t("gallery.carousel.carousel5.text"),
      img: img5,
    },
  ];

  return (
    <section id="gallery" className={styles.wrapper}>
      <h1 className={styles.title}>{t("gallery.title")}</h1>

      <SlideMobile slides={slides} />
      <SlideDesk slides={slides} />
      <WishBtn />
      <div style={{ position: "absolute", bottom: "80px" }}>
        <DownBtn destination="video" />
      </div>
    </section>
  );
};
