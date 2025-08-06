import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../../store/PostStore";
import { CommonHeader } from "../../components/Header";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserHome() {
  const [recentNotice, setRecentNotice] = useState([]);
  const { readPost, notice } = usePostStore();

  useEffect(() => {
    readPost();
  }, []);

  useEffect(() => {
    if (notice.length > 0) {
      setRecentNotice([...notice].slice(0, 5));
    }
  }, [notice]);

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
                <Link to="/laws/house">
                  <img src="/assets/img/house.webp" alt="부동산/임대차" />
                  <div>
                    <p>부동산 / 임대차</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/laws/contract">
                  <img src="/assets/img/contract.webp" alt="계약" />
                  <div>
                    <p>계약</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/laws/work">
                  <img src="/assets/img/work.webp" alt="근로/노동" />
                  <div>
                    <p>근로 / 노동</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/laws/transport">
                  <img src="/assets/img/transport.webp" alt="교통" />
                  <div>
                    <p>교통</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/laws/rights">
                  <img src="/assets/img/rights.webp" alt="권리/명예" />
                  <div>
                    <p>권리 / 명예</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/laws/finance">
                  <img src="/assets/img/finance.webp" alt="금전/사기" />
                  <div>
                    <p>금전 / 사기</p>
                    <StyledIcon />
                  </div>
                </Link>
              </li>
            </ul>
          </LawsWrap>
          <NoticeWrap>
            <div>
              <h3>공지사항</h3>
              <Link to={"/notice"}>전체 보기</Link>
            </div>
            <ul>
              {recentNotice.map((item) => {
                return (
                  <li key={item.id}>
                    <Link to={`/notice/${item.id}`}>
                      <h4>{item.noticeTitle}</h4>
                    </Link>
                  </li>
                );
              })}
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
  & > div {
    display: flex;
    justify-content: space-between;
    h3 {
      font-weight: var(--font-bw);
    }
    a {
      color: var(--main-color);
    }
  }

  & ul {
    margin-top: 10px;
  }

  & ul li {
    padding: 10px;
    border-bottom: 1px dashed var(--main-color);
    & a h4 {
      font-size: var(--font-ssz);
      color: var(--main-color);
    }
  }
`;
