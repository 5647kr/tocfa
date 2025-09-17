import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #000000;
    --gray-color: #767676;
    --bg-color: #f2f2f2;
    --white-color: #ffffff;
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

  &:where(input, textarea):focus {
    outline: none;
  }
`;

export default GlobalStyle;
