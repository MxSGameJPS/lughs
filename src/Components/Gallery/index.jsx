import { WishBtn } from "../WishBtn";
import { DownBtn } from "../DownBtn";
import { SlideDesk } from "./SlideDesk";
import { SlideMobile } from "./SlideMobile";
import { useTranslation } from "react-i18next";
import vid1 from "../../Assets/videos/Gifs_batalha PvP.mp4";
import vid2 from "../../Assets/videos/Gifs_card e scan.mp4";
import vid3 from "../../Assets/videos/Gifs_corrida biomas02.mp4";
import vid4 from "../../Assets/videos/Gifs_evolucao tripla.mp4";
import vid5 from "../../Assets/videos/Gifs_inventario.mp4";
import vid6 from "../../Assets/videos/Gifs_lughpad01.mp4";
import vid7 from "../../Assets/videos/Gifs_montaria 3 tipos.mp4";
import vid8 from "../../Assets/videos/Gifs_paraglider em miranda.mp4";
import vid9 from "../../Assets/videos/Gifs_variantes Onthera.mp4";


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
      img: vid9,
    },
    {
      title: t("gallery.carousel.carousel2.title"),
      text: t("gallery.carousel.carousel2.text"),
      img: vid7,
    },
    {
      title: t("gallery.carousel.carousel3.title"),
      text: t("gallery.carousel.carousel3.text"),
      img: vid5,
    },
    {
      title: t("gallery.carousel.carousel4.title"),
      text: t("gallery.carousel.carousel4.text"),
      img: vid1,
    },
    {
      title: t("gallery.carousel.carousel5.title"),
      text: t("gallery.carousel.carousel5.text"),
      img: vid4,
    },
    {
      title: t("gallery.carousel.carousel6.title"),
      text: t("gallery.carousel.carousel6.text"),
      img: vid2,
    },
    {
      title: t("gallery.carousel.carousel7.title"),
      text: t("gallery.carousel.carousel7.text"),
      img: vid3,
    },
    {
      title: t("gallery.carousel.carousel8.title"),
      text: t("gallery.carousel.carousel8.text"),
      img: vid6,
    },
    {
      title: t("gallery.carousel.carousel9.title"),
      text: t("gallery.carousel.carousel9.text"),
      img: vid8,
    },
  ];

  return (
    <section id="gallery" className={styles.wrapper}>
      <h1 className={styles.title}>{t("gallery.title")}</h1>

      <SlideMobile slides={slides} />
      <SlideDesk slides={slides} />
      <WishBtn />
      {/* <div style={{ position: "absolute", bottom: "80px" }}>
        <DownBtn destination="video" />
      </div> */}
    </section>
  );
};
