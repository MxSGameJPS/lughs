import { useRef, useState, useEffect } from "react";
import styles from "./slideDesk.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const SlideDesk = ({ slides }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const autoplayInterval = useRef(null);

  const count = Array.isArray(slides) ? slides.length : 0;
  // create extended slides array with last at start and first at end to emulate loop visually
  const extendedSlides =
    count > 1 ? [slides[count - 1], ...slides, slides[0]] : [...slides];
  const initial = count ? Math.floor(count / 2) : 0;
  // because we added one cloned slide at the beginning, shift initial by +1
  const initialSlideIndex = count > 1 ? initial + 1 : initial;
  const [active, setActive] = useState(initial);

  // autoplay manual helpers (placed after count so we can use it)
  const startManualAutoplay = () => {
    try {
      if (autoplayInterval.current) clearInterval(autoplayInterval.current);
      autoplayInterval.current = setInterval(() => {
        const s = swiperRef.current;
        if (!s) return;
        try {
          // compute logical next index and slide to its extended index (+1)
          const currentLogical = (s.activeIndex - 1 + count) % count;
          const nextLogical = (currentLogical + 1) % count;
          const target = nextLogical + 1; // because extendedSlides shift by +1
          if (typeof s.slideTo === "function") s.slideTo(target, 600, false);
        } catch (e) {}
      }, 7000);
    } catch (e) {}
  };

  const stopManualAutoplay = () => {
    try {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
        autoplayInterval.current = null;
      }
    } catch (e) {}
  };

  useEffect(() => {
    return () => {
      stopManualAutoplay();
    };
  }, []);

  if (!count) return null;

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.arrow} prev`}
        ref={prevRef}
        aria-label="Anterior"
        onClick={() => {
          try {
            stopManualAutoplay();
            startManualAutoplay();
          } catch (e) {}
        }}
      >
        <svg width="78" height="79" viewBox="0 0 78 79" fill="none">
          <path
            d="M45.5 26.9 32.5 40l13 13.3"
            stroke="#0086FC"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`${styles.arrow} next`}
        ref={nextRef}
        aria-label="Próximo"
        onClick={() => {
          try {
            stopManualAutoplay();
            startManualAutoplay();
          } catch (e) {}
        }}
      >
        <svg width="78" height="79" viewBox="0 0 78 79" fill="none">
          <path
            d="M32.5 26.9 45.5 40 32.5 53.3"
            stroke="#0086FC"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.stage}>
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="mySwiper"
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={2.5}
          /* usamos loop nativo do Swiper desligado para controlar o loop manualmente */
          loop={false}
          /* respiro nas laterais para mostrar vizinhos */
          slidesOffsetBefore={48}
          slidesOffsetAfter={48}
          /* slide inicial desejado (ajustado pelo clone no início) */
          initialSlide={initialSlideIndex}
          onBeforeInit={(swiper) => {
            // marcar slide inicial antes da inicialização
            swiper.params.initialSlide = initial;
            // atribuir refs (serão confirmados/iniciais mais abaixo)
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            // não forçamos loop/clones via params aqui (usaremos loop manual)
            // garantir autoplay configurado já nesta etapa
            swiper.params.autoplay = {
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              waitForTransition: false,
              stopOnLastSlide: false,
            };
          }}
          onSwiper={(swiper) => {
            // guardar instância para controlar depois
            swiperRef.current = swiper;
            // posicionar no slide inicial do loop (considerando slide extendido)
            try {
              swiper.slideTo(initialSlideIndex, 0, false);
            } catch (e) {}
            // set active logical index
            try {
              const logical = (swiper.activeIndex - 1 + count) % count;
              setActive(logical);
            } catch (e) {
              setActive(initial);
            }

            // aguardar um tick para garantir que refs de botão estejam montadas
            setTimeout(() => {
              try {
                if (swiper && prevRef.current && nextRef.current) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  // inicializa/atualiza a navegação caso ainda não esteja ativa
                  if (
                    swiper.navigation &&
                    typeof swiper.navigation.init === "function"
                  ) {
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                }
              } catch (e) {}

              // iniciar autoplay manual como fallback
              try {
                startManualAutoplay();
              } catch (e) {}
              // diagnostic logs to help debugging
              try {
                // eslint-disable-next-line no-console
                console.log("[SlideDesk] swiper params:", {
                  loop: swiper.params.loop,
                  loopedSlides: swiper.params.loopedSlides,
                  slidesPerView: swiper.params.slidesPerView,
                });
                // eslint-disable-next-line no-console
                console.log(
                  "[SlideDesk] slides DOM count:",
                  swiper.slides && swiper.slides.length
                );
              } catch (e) {}
            }, 50);
          }}
          onSlideChange={(swiper) => {
            // map swiper.activeIndex to logical index in original slides
            try {
              const logical = (swiper.activeIndex - 1 + count) % count;
              setActive(logical);
            } catch (e) {
              setActive(0);
            }
            // reinicia autoplay caso tenha sido pausado por interação
            try {
              if (swiper.autoplay && !swiper.autoplay.running)
                swiper.autoplay.start();
            } catch (e) {}
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            // if we moved to the cloned ends, jump (without animation) to the real slide
            try {
              const lastExtendedIndex = count + 1; // index of cloned-first at the end
              if (swiper.activeIndex === 0) {
                // we are on the left cloned-last, jump to real last
                if (typeof swiper.slideTo === "function")
                  swiper.slideTo(count, 0, false);
              } else if (swiper.activeIndex === lastExtendedIndex) {
                // we are on the right cloned-first, jump to real first
                if (typeof swiper.slideTo === "function")
                  swiper.slideTo(1, 0, false);
              }
            } catch (e) {}
          }}
          // pequenos logs de diagnostico (remover/condicionar se preferir)
          onAutoplayStart={() => {
            // console.log('Swiper autoplay start');
          }}
          onAutoplayStop={() => {
            // console.log('Swiper autoplay stop');
          }}
          autoplay={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          style={{ paddingBottom: 32 }}
        >
          {extendedSlides.map((s, i) => (
            <SwiperSlide key={`ext-${i}-${s.img}`} className="slide">
              <img src={s.img} alt={s.title || `slide-${i}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* legenda abaixo */}
        <figcaption className={styles.caption} aria-live="polite">
          <h3 className={styles.captionTitle}>{slides[active]?.title}</h3>
          <p className={styles.captionText}>{slides[active]?.text}</p>
        </figcaption>
      </div>
    </div>
  );
};
