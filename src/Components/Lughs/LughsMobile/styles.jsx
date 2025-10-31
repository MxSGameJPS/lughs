import styled from "styled-components";
import bgCard from '../../../Assets/bg_card_lugh.png'

export const Wrapper = styled.div`
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 24px ;
  width: 100%;
  height: 100%;

.embla {
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;              /* permite swipe horizontal + scroll vertical */
  --gap: 24px;
  --gutter: calc(var(--gap) / 2);
  --slide-w: clamp(290px, 85vw, 360px);
  margin: 0 auto;
}

/* REMOVA o justify-content aqui */
.embla__container {
  display: flex;
  align-items: stretch;
  margin-left: calc(-1 * var(--gutter));
  margin-right: calc(-1 * var(--gutter));
  /* sem gap/justify */
}

/* MOBILE: 1 por vez, com overflow garantido p/ deslizar */
.embla__slide {
  flex: 0 0 calc(100% - var(--gap)); /* <- antes era 100% */
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* TABLET+: garante overflow p/ loop funcionar */
@media (min-width: 768px) {
  .embla {
    /* width: 100%; */
    width: fit-content;
        max-width: 1200px;
  }

  .embla__slide { 
    flex: 0 0 390px;
  }
}

@media (min-width: 1200px) {
  display: none;
}
`;

export const Card = styled.div`
  display: flex;
  width: 297px;
  /* height: 426px; */
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
  border-radius:16px;
  background: rgba(212, 235, 239, 0.90);
  margin-top: 100px;
  padding-bottom: 24px;
  flex: 1; 
`;

export const CardNameBox = styled.div`


h3{
  color: var(--White---Branding-Color, #FFF);
text-align: center;
font-family: 'Gokhan', sans-serif;
font-size: 64px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 24px;
}

img{
  margin: 0 auto;
}
`

export const CardImgBox = styled.div`
  border-radius: 16px 16px 0 0;
  background-image: url(${bgCard});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 200px;
  width: 100%;

  img{
    position: absolute;
    bottom: -9px;
  }

`

export const CardInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -24px;

  p{
    color: var(--bg-navy);
    text-align: right;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`

export const CardTextBox = styled.div`
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 100px;

  p{
    color: var(--bg-navy);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`

export const PrismaticBtn = styled.div`
  display: flex;
  width: 250px;
  height: 54px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  border-radius: 14px;
  border: 2px solid transparent; /* espaço da borda */

  /* 👇 Fundo preto + borda gradiente */
  background: 
    linear-gradient(var(--Black-2---Branding-Color, #282828), var(--Black-2---Branding-Color, #282828)) padding-box,
    linear-gradient(90deg, #01FFFF, #7F4BD9 55.29%, #E54AB5) border-box;

  color: var(--White---Branding-Color, #FFF);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
  position: absolute;
  bottom: 24px;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;

  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: #ccc;
    cursor: pointer;
    transition: background 0.3s;

    &.active {
      background: var(--laranja-2); /* cor da bolinha ativa */
    }
  }
`;