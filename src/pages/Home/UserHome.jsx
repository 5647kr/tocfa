import styled from "styled-components";
import { Link } from "react-router-dom";
import { CommonHeader } from "../../components/Header";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserHome() {
  return (
    <>
      <CommonHeader />
      <main>
        <HeroSection>
          <div>
            <h2>생활 속 법률 지식, 이제는 나에게 맞게</h2>
            <h3>
              카테고리별 상황별로 구성하여
              <br />
              누구든지 쉽게 접근할 수 있는 법률
            </h3>
            <p>공공성을 담은 지식, 쉽고 실질적인 법률 콘텐츠를 제공합니다.</p>
          </div>
        </HeroSection>

        <section>
          <LawsWrap>
            <h3>실생활에 도움이 되는 법률 지식</h3>
            <ul>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
            </ul>
          </LawsWrap>
          <NoticeWrap>
            <h3>공지사항</h3>
            <ul>
              <li>...</li>
              <li>...</li>
              <li>...</li>
              <li>...</li>
              <li>...</li>
            </ul>
          </NoticeWrap>
        </section>
      </main>
    </>
  );
}

const HeroSection = styled.section`
  padding: 0;
  height: 400px;
  background: url("/assets/img/hero.webp") no-repeat 100% 50% / cover;
  position: relative;
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--shadow-color);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    h2,
    h3 {
      font-weight: var(--font-bw);
    }
    h2,
    h3,
    p {
      text-align: center;
      color: var(--bg-color);
    }
  }
`;

const LawsWrap = styled.div`
  margin-top: 80px;
  & h3 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 40px;
  }
  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media screen and (min-width: 769px) {
    & ul {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  & ul li {
    position: relative;
    aspect-ratio: 2 / 1;
  }
  & ul li a {
    width: 100%;
    height: 100%;
  }
  & ul li a img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & ul li a > div {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--shadow-color);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--bg-color);
  }
`;

const StyledIcon = styled(FaExternalLinkAlt)`
  font-size: var(--font-ssz);
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const NoticeWrap = styled.div`
  margin: 80px 0;
  & h3 {
    font-weight: var(--font-bw);
  }

  & ul li {
    padding: 10px;
    border-bottom: 1px solid var(--main-color);
  }
`;

