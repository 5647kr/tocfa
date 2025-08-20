import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import usePostStore from "../store/PostStore";
import HeroSection from "../components/HeroSection";

export default function UserNotice() {
  const { notice, typeSelect, readTable } = usePostStore();
  useEffect(() => {
    if (!notice.length > 0) {
      readTable(typeSelect);
    }
  }, []);
  return (
    <main>
      <HeroSection bgImg={`${process.env.PUBLIC_URL}/assets/img/hero.webp`}>
        <h2>공지사항</h2>
      </HeroSection>
      <NoticeListSection>
        <ul>
          {notice.map((item) => {
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
      </NoticeListSection>
    </main>
  );
}

const NoticeListSection = styled.section`
  margin-top: 8rem;
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
