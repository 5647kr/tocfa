import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import usePostStore from "../../store/PostStore";
import { BackHeader } from "../../components/Header";

export default function UserNotice() {
  const { readPost, notice } = usePostStore();

  useEffect(() => {
    if (!notice || notice.length === 0) {
      readPost();
    }
  }, [notice]);

  return (
    <>
      <BackHeader />
      <main>
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
                    <h2>{item.noticeTitle}</h2>
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

const NoticeList = styled.ul`
  margin-top: 40px;
  & li {
    padding: 10px;
    border-bottom: 1px dashed var(--main-color);
  }

  & a {
    color: var(--main-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & h2 {
    font-weight: var(--font-bw);
  }
`;
