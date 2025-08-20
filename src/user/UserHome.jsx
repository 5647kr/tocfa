import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../store/PostStore";
import HeroSection from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserHome() {
  const { setTypeSelect, categoryTable, readTable, category, notice } = usePostStore();

  
  useEffect(() => {
    setTypeSelect("notice")
    categoryTable();
    readTable();
  }, [categoryTable, readTable]);

  const [noticeList, setNoticeList] = useState(notice);

  useEffect(() => {
    if (notice.length > 0) {
      const sortList = [...notice].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      ).slice(0, 6);
      setNoticeList(sortList);
    }
  }, [notice]);

  return (
    <main>
      <HeroSection bgImg={`${process.env.PUBLIC_URL}/assets/img/hero.webp`}>
        <h2>생활 속 법률 지식, 이제는 나에게 맞게</h2>
        <h3>
          카테고리별 상황별로 구성하여 <br />
          누구든지 쉽게 접근할 수 있는 법률
        </h3>
        <p>공공성을 담은 지식, 쉽고 실질적인 법률 콘텐츠를 제공합니다.</p>
      </HeroSection>
      <CategorySection>
        <h2>실생활에 도움이 되는 법률 지식</h2>
        <ul>
          {category.map((item) => {
            return (
              <CategoryItem
                key={item.id}
                $bg={`${process.env.PUBLIC_URL}/assets/img/${item.engName}.webp`}
              >
                <Link to={`/laws/${item.engName}`}>
                  <div>
                    <h3>{item.title}</h3>
                    <LinkIcon />
                  </div>
                </Link>
              </CategoryItem>
            );
          })}
        </ul>
      </CategorySection>
      <NoticeSection>
        <TitleWrap>
          <h2>새소식</h2>
          <Link to={"/notice"}>전체보기</Link>
        </TitleWrap>
        <ul>
          {noticeList.map((item) => {
            const date = new Date(item.created_at).toLocaleDateString("ko-KR", {
              timeZone: "Asia/Seoul",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            return (
              <li key={item.id}>
                <Link to={`/notice/${item.id}`}>
                  <h3>{item.title}</h3>
                  <span>{date}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </NoticeSection>
    </main>
  );
}

const CategorySection = styled(ContentSection)`
  & h2 {
    margin-bottom: 4rem;
  }
  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media screen and (min-width: 1240px) {
    & ul {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const CategoryItem = styled.li`
  width: 100%;
  aspect-ratio: 2 / 1;
  box-shadow: inset 0 0 10px pink;
  background: ${({ $bg }) => `url(${$bg}) no-repeat center center / cover`};
  & a {
    width: 100%;
    height: 100%;
  }

  & div {
    height: 100%;
    background-color: var(--sub-color);
    position: relative;
  }

  & h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white-color);
    font-weight: var(--font-bw);
  }
`;

const LinkIcon = styled(FaExternalLinkAlt)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  color: var(--white-color);
`;

const NoticeSection = styled(ContentSection)`
  & h2 {
    text-align: left;
  }
  & ul {
    margin-top: 1rem;
  }
  & li {
    padding: 1rem;
    border-bottom: 1px dashed var(--sub-color);
  }
  & a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & span {
    color: var(--sub-color);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & a {
    color: var(--sub-color);
  }
`;
