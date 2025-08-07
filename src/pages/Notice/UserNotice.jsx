import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import usePostStore from "../../store/PostStore";
import { BackHeader } from "../../components/Header";

export default function UserNotice() {
  const { readPost, notice } = usePostStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!notice || notice.length === 0) {
      readPost();
    }
  }, [notice]);

  return (
    <>
      <BackHeader />
      <main>
        <HeroSection>
          <div>
            <h2>공지사항</h2>
          </div>
        </HeroSection>
        <section>
          <NoticeList>
            {notice.map((item) => {
              const date = new Date(item.created_at);
              const krDate = `${date.getFullYear()}.${String(
                date.getMonth() + 1
              ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
              return (
                <li key={item.id}>
                  <Link to={`/notice/${item.id}`}>
                    <h3>{item.noticeTitle}</h3>
                    <p>{krDate}</p>
                  </Link>
                </li>
              );
            })}
          </NoticeList>
        </section>
      </main>
    </>
  );
}

const HeroSection = styled.section`
  background: url("/assets/img/hero.webp") no-repeat 100% 25% / cover;
  aspect-ratio: 1 / 0.2;
  padding: 0;
  & > div {
    width: 100%;
    height: 100%;
    background-color: var(--shadow-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > h2 {
    font-weight: var(--font-bw);
    color: var(--bg-color);
  }
`;

const NoticeList = styled.ul`
  margin-block: 80px;
  & > li {
    padding: 20px 10px;
    border-bottom: 1px dashed var(--main-color);
  }

  & > li > a {
    color: var(--main-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & a > p {
    font-size: var(--font-ssz);
  }
`;
