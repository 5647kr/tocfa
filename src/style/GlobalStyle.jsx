import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #000000;
    --gray-color: #767676;
    --bg-color: #f2f2f2;
    --white-color: #ffffff;
    --font-ssz: clamp(1.2rem, 1.3vw, 2rem);
    --font-rw: 400;
    --font-mw: 500;
    --font-bw: 700;
  }

  html {
    font-family: "Noto Sans KR";
    font-size: 10px;
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

  a {
    display: block;
    text-decoration: none;
  }

  a, button {
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

  &:where(input, textarea):focus {
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
