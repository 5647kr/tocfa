import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #000;
    --sub-color: rgba(0, 0, 0, 0.5);
    --white-color: #fff;
    --error-color: #ff0000;
    --font-ssz: clamp(1.2rem, 1.3vw, 2rem);
    --font-rw: 400;
    --font-bw: 700;
  }
  
  html {
    font-size: 10px;
    font-family: "Noto Sans KR";
  }

  main {
    padding-block: 120px;
    position: relative;
    @media screen and (min-width: 1024px) {
      padding-block: 80px;
    }
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    display: block;
    color: var(--main-color);
  }

  input:focus, textarea:focus {
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
  p, button, a, input, textarea, label, strong, span, th, pre {
    font-size: clamp(1.4rem, 1.6vw, 2.2rem);
  }

  input, textarea {
    width: 100%;
    border: 1px solid var(--sub-color);
    padding: 10px;
    resize: none;
  }

  textarea {
    height: 200px;
  }

  button {
    border: none;
    padding: 10px 20px;
    font-weight: var(--font-bw);
    background-color: var(--sub-color);
    color: var(--white-color);
    cursor: pointer;
  }

  button:active {
    box-shadow: inset 0 2px 4px var(--sub-color);
  }
  
  @media screen and (max-width: 480px) {
    section {
      padding-inline: 16px;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    header, section {
      padding-inline: 32px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    header, section {
      padding-inline: 64px;
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    header, section {
      padding-inline: 128px;
    }
  }

  @media screen and (min-width: 1441px) {
    header, section {
      padding-inline: 256px;
    }
  }

`;

export default GlobalStyle;
