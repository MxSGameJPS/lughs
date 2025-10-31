import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import * as S from "./styles";

export const LughsMobile = ({
  bg,
  handlePrismatic,
  lughs,
  prismatic,
  onSelectLugh
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'keepSnaps',
    loop: true,
  });

  // listeners
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    // start no primeiro
    emblaApi.scrollTo(0, true);

    const onResize = () => emblaApi.reInit();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [emblaApi]);

  return (
    <S.Wrapper
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {lughs.map((item) => (
            <div className="embla__slide" key={item.id}>
              <S.CardNameBox>
                <h3>{item.name}</h3>
                <img src={item.stars} alt="" />
              </S.CardNameBox>
              <S.Card>
                <S.CardImgBox>
                  <img src={item.image} alt="" />
                </S.CardImgBox>

                <div
                  style={{
                    width: '100%',
                    padding: '24px'

                  }}
                >
                  <S.CardInfoBox>
                    <p>{item.number}</p>
                    <img src={item.typeIcon} alt="" />
                    <p>{item.type}</p>
                  </S.CardInfoBox>

                  <S.CardTextBox>
                    <p>{t(item.text)}</p>
                    <p>{item.subText}</p>
                  </S.CardTextBox>
                </div>

                <S.PrismaticBtn
                  onClick={() => handlePrismatic(item.name)}
                >
                  {prismatic ? t("buttons.regular") : t("buttons.prismatic")}
                </S.PrismaticBtn>
              </S.Card>
            </div>
          ))}
        </div>
      </div>
      <S.Dots>
        {Array.from({ length: lughs.length }).map((_, index) => (
          <button
            key={index}
            className={index === selectedIndex ? 'active' : ''}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </S.Dots>

    </S.Wrapper>
  );
};
