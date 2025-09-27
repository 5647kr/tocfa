import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #D1D5DC;
    --text-color: #0F172B;
    --error-color: #FB2C36;
    --boxBg-color: #45556C;
    --stroke-color: #99A1AF;
    --errorBg-color: #FFE2E2;
    --black-color: #000000;
    --white-color: #ffffff;
    --font-ssz: clamp(1.2rem, 1.3vw, 2rem);
    --font-rw: 400;
    --font-mw: 500;
    --font-bw: 700;
    --font-sz: 1.2rem;
    --font-smz: 1.4rem;
    --font-mz: 1.6rem;
    --font-mlz: 1.8rem;
    --font-lz: 2rem;
    --font-xlz: 2.2rem;
    --font-2xlz: 2.4rem;
    --font-3xlz: 2.6rem;
    --font-4xlz: 2.8rem;
  }

  html {
    font-family: "Noto Sans KR";
    font-size: 10px;
    background-color: var(--bg-color);
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-weight: var(--ront-rw);
    letter-spacing: -0.3px;
  }

  ul, ol {
    list-style: none;
  }

  button {
    background-color: transparent;
    border: none;
  }

  a, button {
    display: block;
    text-decoration: none;
    cursor: pointer;
  }
  

  h1 {
    font-size: clamp(2.6rem, 3vw, 3.4rem);
  }
  h2 {
    font-size: clamp(2.2rem, 2.5vw, 3rem);
  }
  h3, h4 {
    font-size: clamp(1.8rem, 2vw, 2.6rem);
  }
  p, button, a, input, textarea, label, strong, span, th, pre {
    font-size: clamp(1.4rem, 1.6vw, 2.2rem);
  }

  svg, img {
    width: clamp(1.4rem, 1.6vw, 2.2rem);
  }

  &:where(input, textarea, a, button):focus {
    outline: none;
  }
  
  main {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
    padding-inline: 1.6rem;
  }

  @media screen and (max-width: 480px) {
    main {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.6rem;
      padding-inline: 1.6rem;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    main {
      grid-template-columns: repeat(8, 1fr);
      gap: 2rem;
      padding-inline: 2rem;
    }
  }

  @media screen and (min-width: 769px) {
    main {
      grid-template-columns: repeat(12, 1fr);
      gap: 2.4rem;
      padding-inline: 2.4rem;
    }
  }
`;

export default GlobalStyle;
