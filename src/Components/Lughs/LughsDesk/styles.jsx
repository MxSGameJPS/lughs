import styled from "styled-components";

export const Wrapper = styled.div`
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 24px;
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

  svg {
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
    letter-spacing: 4.4px;
  }
`;

export const Title = styled.h2`
  color: var(--branco);
  font-family: "LughFont", sans-serif;
  /* permitir que nomes longos quebrem em múltiplas linhas e sejam responsivos */
  font-size: clamp(38px, 8vw, 106px);
  font-style: normal;  
  font-weight: 400;
  line-height: 0.90;
  text-align: left;
  white-space: normal;
  overflow: visible;
  word-break: break-word;
  letter-spacing: 0.7px;
`;

export const PrismaticBtn = styled.div`
  display: flex;
  width: 350px;
  height: 54px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  font-family: "Sora", sans-serif;

  border-radius: 14px;
  border: 2px solid transparent; /* espaço da borda */

  /* 👇 Fundo preto + borda gradiente */
  background: linear-gradient(
        var(--Black-2---Branding-Color, #282828),
        var(--Black-2---Branding-Color, #282828)
      )
      padding-box,
    linear-gradient(90deg, #01ffff, #7f4bd9 55.29%, #e54ab5) border-box;

  color: var(--White---Branding-Color, #fff);
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
    transition: transform 0.15s, background 0.15s, opacity 0.15s;
    opacity: 0.9;

    &:hover {
      transform: scale(1.12);
    }

    &.active {
      background: var(--laranja-2, #ff8a00);
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
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
  }
`;

export const Thumbs = styled.div`
  position: absolute;
  left: 60%;
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
