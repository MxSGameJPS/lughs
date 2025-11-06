import { useRef } from "react";
import styles from "./video.module.css";
import { FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DownBtn } from "../DownBtn";

const videos = [
  { id: "ScTYSp42T6g", title: "Jogo LUGH WORLD encerra Pré-Alpha! 1" },
  { id: "SC4Zz7U5tgw", title: "Jogo LUGH WORLD encerra Pré-Alpha! 2" },
  { id: "SC4Zz7U5tgw", title: "Jogo LUGH WORLD encerra Pré-Alpha! 3" },
  { id: "SC4Zz7U5tgw", title: "Jogo LUGH WORLD encerra Pré-Alpha! 4" },
  { id: "SC4Zz7U5tgw", title: "Jogo LUGH WORLD encerra Pré-Alpha! 5" },
  { id: "SC4Zz7U5tgw", title: "Jogo LUGH WORLD encerra Pré-Alpha! 6" },
];

export const Video = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div id="video" className={styles.wrapper}>
      <div className={styles.carousel}>
        {/* botões custom (fora da área do slide) */}
        <button
          ref={prevRef}
          className={`${styles.navButton} swiper-button-prev`}
          aria-label="Anterior"
        >
          <MdArrowBackIosNew size={22} />
        </button>
        <button
          ref={nextRef}
          className={`${styles.navButton} swiper-button-next`}
          aria-label="Próximo"
        >
          <MdArrowForwardIos size={22} />
        </button>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            0: { slidesPerView: 1.08, spaceBetween: 16, centeredSlides: true },
            768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
            1200: { slidesPerView: 2, spaceBetween: 32 },
          }}
        >
          {videos.map((v) => (
            <SwiperSlide key={`${v.id}-${v.title}`}>
              <article className={styles.card}>
                <iframe
                  className={styles.videoFrame}
                  src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className={styles.caption}>
                  <span>{v.title}</span>
                  <span className={styles.ytBadge}>
                    <FaYoutube size={18} />
                    YouTube
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
