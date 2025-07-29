import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #000;
    --shadow-color: rgba(0, 0, 0, 0.5);
    --bg-color: #fff;
    --font-ssz: clamp(1.2rem, 1.3vw, 2rem);
    --font-rw: 400;
    --font-bw: 700;
  }
  
  html {
    font-size: 10px;
    font-family: "Noto Sans KR";
  }

  main {
    margin-top: 80px;
    min-height: calc(100vh - 80px);
    position: relative;
  }

  ul, li {
    list-style: none;
  }

  button {
    border: none;
    background-color: var(--bg-color);
    cursor: pointer;
  }

  a {
    text-decoration: none;
    display: block;
  }

  input:focus {
    outline: none;
  }

  textarea:focus {
    outline: none;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-weight: var(--font-rw);
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
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
  p, button, a, input, textarea, label, strong, span, th {
    font-size: clamp(1.4rem, 1.6vw, 2.2rem);
  }

  input, textarea {
    border: 1px solid var(--shadow-color);
    border-radius: 1rem;
  }

  button:focus {
    outline: 1px solid var(--main-color);
  }

  button {
    border-radius: 1rem;
    box-shadow: 0 2px 4px var(--shadow-color);
    font-weight: var(--font-rw);
    color: var(--shadow-color);
  }

  
  @media screen and (max-width: 480px) {
    section {
      padding: 0 16px;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    section {
      padding: 0 32px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    section {
      padding: 0 64px;
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    section {
      padding: 0 128px;
    }
  }

  @media screen and (min-width: 1441px) {
    section {
      padding: 0 256px;
    }
  }

`;

export default GlobalStyle;
