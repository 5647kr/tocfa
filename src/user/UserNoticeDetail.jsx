import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import usePostStore from "../store/PostStore";
import styled from "styled-components";
import { ViewApi } from "../api/PostApi";

export default function UserNoticeDetail() {
  const params = useParams();
  const id = params.id;
  const { typeSelect, notice, readTable } = usePostStore();
  const [noticeItem, setNoticeItem] = useState([]);

  useEffect(() => {
    const foundItem = notice.find((item) => item.id === id);
    if (foundItem) {
      setNoticeItem((prev) => ({
        ...prev,
        ...foundItem,
      }));
    }
    if (!notice || notice.length === 0) {
      readTable();
    }
  }, [id, notice, readTable]);

  const date = new Date(noticeItem.created_at).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
    ViewApi({id, typeSelect});
  }, [id])

  return (
    <main>
      <NoticeSection>
        <h2>{noticeItem.title}</h2>
        <NoticeInfo>
          <p>조회수: {noticeItem.view}</p>
          <p>작성일: {date}</p>
        </NoticeInfo>
        <pre>{noticeItem.content}</pre>
      </NoticeSection>
    </main>
  );
}

const NoticeSection = styled.section`
  margin-top: 8rem;
  & h2 {
    text-align: center;
    font-weight: var(--font-bw);
  }
  & > pre {
    text-align: center;
  }
`;

const NoticeInfo = styled.div`
  text-align: right;
  margin-block: 4rem;
`;
