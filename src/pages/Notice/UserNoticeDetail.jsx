import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import usePostStore from "../../store/PostStore";
import { BackHeader } from "../../components/Header";

export default function UserNoticeDetail() {
  const params = useParams().id;
  const { notice, readPost } = usePostStore();
  const [noticeItem, setNoticeItem] = useState([]);

  // 조회수 증가
  async function increaseView(id) {
    const { error } = await supabase.rpc("increment_view", {
      table_name: "notice",
      row_id: id,
    });
    if (error) console.error("조회수 증가 실패:", error);
  }

  // sessionStorage를 이용한 조회수 중복 증가 방지
  useEffect(() => {
    const viewAndRefresh = async () => {
      if(notice.length === 0 || !notice) {
        await readPost();
      }

      const viewedKey = `notice_${params}`;
      const hasViewed = sessionStorage.getItem(viewedKey);

      if (!hasViewed) {
        await increaseView(params);
        await readPost();
        sessionStorage.setItem(viewedKey, "true");
      }
    };
    viewAndRefresh();
  }, [params]);

  // notice에서 하나의 글 찾기
  useEffect(() => {
    setNoticeItem(notice.find((item) => item.id === params));
  }, [params, notice]);

  if (!noticeItem || !noticeItem.created_at) return null;

  const date = new Date(noticeItem.created_at);
  const PostDate = date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // hour12: false
  });

  return (
    <>
      <BackHeader />
      <main>
        <section>
          <InfoWrap>
            <p>등록일: {PostDate}</p>
            <p>조회수: {noticeItem.view}</p>
          </InfoWrap>
          <ContentWrap>
            <h2>{noticeItem.noticeTitle}</h2>
            <p>{noticeItem.content}</p>
          </ContentWrap>
        </section>
      </main>
    </>
  );
}

const InfoWrap = styled.div`
  margin-block: 40px;
  text-align: right;
`;

const ContentWrap = styled.div`
  text-align: center;
  & h2 {
    margin-bottom: 40px;
    font-weight: var(--font-bw);
  }
`;
