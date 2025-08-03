import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

function CommonHeader() {
  return (
    <HeaderWrap>
      <h1>
        <Link to={"/"}>
          <img src="/assets/img/logo.png" alt="tocfa logo" />
        </Link>
      </h1>
    </HeaderWrap>
  );
}

function BackHeader() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <HeaderWrap>
      <BackButton onClick={goBack}>
        <AiOutlineLeft />
      </BackButton>
      <h1>
        <Link to={"/"}>
          <img src="/assets/img/logo.png" alt="tocfa logo" />
        </Link>
      </h1>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  width: 100%;
  height: 80px;
  background-color: var(--bg-color);
  box-shadow: 0 2px 4px var(--shadow-color);
  padding: 0 40px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  h1 {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    padding: 0 20px;
  }
  img {
    width: 40px;
    height: 40px;
    display: block;
  }
`;

const BackButton = styled.button`
  padding: 20px;
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: none;

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: none;
  }
`;

export { CommonHeader, BackHeader };
