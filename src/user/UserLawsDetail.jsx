import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePostStore from "../store/PostStore";
import styled from "styled-components";
import Loading from "../components/Loading";
import { ViewApi } from "../api/PostApi";

export default function UserLawsDetail() {
  const params = useParams();
  const id = params.id;
  const { typeSelect, setTypeSelect, readTable, laws } = usePostStore();
  const [data, setData] = useState(null);

  console.log(typeSelect);
  console.log(laws);

  useEffect(() => {
    if (laws.length === 0) {
      setTypeSelect("laws");
      readTable();
    }
    setData(laws.find((item) => item.id === id) || null);
  }, [laws, id, readTable, setTypeSelect]);

  useEffect(() => {
    ViewApi({id, typeSelect});
  }, [id])

  const date = data
    ? new Date(data.created_at).toLocaleDateString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  let category = "계약";
  switch (data?.category) {
    case "house":
      category = "임대/임차"
      break;
    case "finance":
      category = "금전/사기"
      break;
    case "rights":
      category = "권리/명예"
      break;
    case "transport":
      category = "교통"
      break;
    case "work":
      category = "근로/노동"
      break;
    case "contract":
      category = "계약"
      break;
    default:
      category = "기타";
  }

  return (
    <main>
      <section>
        {data ? (
          <LawsInfo>
            <h2>{data.title}</h2>
            <InfoWrap>
              <p>{category}</p>
              <div>
                <p>등록일: {date}</p>
                <p>조회수: {data.view}</p>
              </div>
            </InfoWrap>
            <ContentWrap>
              <ul>
                <li>
                  <h3>관련 법 조항</h3>
                  <p>{data.law_ref}</p>
                </li>
                <li>
                  <h3>법 조항 내용</h3>
                  <pre>{data.law_con}</pre>
                </li>
                <li>
                  <h3>처벌</h3>
                  <pre>{data.law_pen}</pre>
                </li>
                <li>
                  <h3>실생활 적용 예시</h3>
                  <pre>{data.case}</pre>
                </li>
              </ul>
            </ContentWrap>
          </LawsInfo>
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
}

const LawsInfo = styled.div`
  margin-block: 4rem;
  & h2 {
    text-align: center;
    font-weight: var(--font-bw);
  }
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 4rem;
  text-align: right;
`;

const ContentWrap = styled.div`
  & li ~ li {
    margin-top: 4rem;
  }

  & h3 {
    margin-bottom: 1px;
    font-weight: var(--font-bw);
  }
`;
