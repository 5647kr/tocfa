import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #D1D5DC;
    --text-color: #0F172B;
    --boxBg-color: #45556C;
    --stroke-color: #99A1AF;
    --error-color: #FB2C36;
    --errorBg-color: #FFE2E2;
    --black-color: #000000;
    --white-color: #ffffff;
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
    font-weight: var(--font-rw);
    color: var(--text-color);
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

  &:where(input, textarea, a, button):focus {
    outline: none;
  }

  main {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
    padding-inline: 1.6rem;
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
