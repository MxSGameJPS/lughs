import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

 :root {
  --branco: #ffffff;
  --bg-wish-btn:#008FCC33;
  --bg-navy:#013B51;
  --azul-branding:#278EC9;
  --laranja:#F7931E;
  --laranja-2:#FF9400;

}

  /* ======= FONTES ======= */
  /* Sora pelo Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');

  /* Gokhan — arquivo em public/fonts */
  @font-face {
    font-family: 'Gokhan';
    src: url('/fonts/Gokhan.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  /* ======= RESET CSS ======= */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    background-color: #fff;
    color: #000;
    font-family: 'Sora', sans-serif; /* 👉 Sora é a fonte default */
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, button, textarea, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

