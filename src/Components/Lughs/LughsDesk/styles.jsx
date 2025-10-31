import styled from "styled-components";

export const Wrapper = styled.div`
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 24px ;
  width: 100%;
  height: 1080px;
  display: none;


@media (min-width: 1200px) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 33px;
}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: 48px;
  align-items: center;
  position: relative;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;

  svg{
    color: var(--branco);
  }
`;

export const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    color: var(--branco);
    text-align: right;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

`;

export const Title = styled.h2`
  overflow: hidden;
  color: var(--branco);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Gokhan;
  font-size: 120px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

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
  
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    color: var(--branco);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
  }
`;

export const Dots = styled.div`
  display: flex;
  gap: 12px;
  z-index: 2;

  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: transform .15s, background .15s, opacity .15s;
    opacity: .9;

    &:hover { transform: scale(1.12); }

    &.active {
      background: var(--laranja-2, #FF8A00);
      opacity: 1;
    }
  }
`;


export const Right = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  img {
    max-height: 520px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 8px 24px rgba(0,0,0,.35));
  }
`;

export const Thumbs = styled.div`
  position: absolute;
  right: 24px;
  bottom: 0px;
  display: flex;
  gap: 16px;

  button {
    width: fit-content;
    &.active {
      opacity: 1;
      /* transform: translateY(-4px); */
    }

    img {
      object-fit: contain;
      pointer-events: none;
    }
  }
`;