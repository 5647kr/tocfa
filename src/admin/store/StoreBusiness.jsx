import { useEffect, useState } from "react";
import usePostStore from "../../store/postStore";
import styled from "styled-components";
import { Store } from "lucide-react";
import Input from "../../components/Input";

export default function StoreBusiness() {
  const { readPost, updatePost, store_business } = usePostStore();
  const [sortTable, setSortTable] = useState("all");

  const handleSortChange = (e) => {
    setSortTable(e.target.value);
  };

  useEffect(() => {
    if (store_business.length === 0) {
      readPost("store_business");
    }
  }, []);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    const newValue = value === "true";
    await updatePost(id, { recall: newValue }, "store_business");
  };

  const filteredBusiness = store_business.filter((item) => {
    if (sortTable === "true") return item.recall === true;
    if (sortTable === "false") return item.recall === false;
    return true;
  });

  const hasAnswered = store_business.some((item) => item.recall === true);
  const hasUnanswered = store_business.some((item) => item.recall === false);

  let message = "";
  if (sortTable === "true" && !hasAnswered)
    message = "답변완료한 창업문의가 없습니다.";
  if (sortTable === "false" && !hasUnanswered)
    message = "모든 창업문의의 답변을 완료하였습니다.";

  return (
    <>
      <TitleWrap>
        <div>
          <Store />
          <h1>창업 문의</h1>
        </div>
        <SortBox>
          <label htmlFor="all">전체</label>
          <Input
            type="radio"
            id="all"
            name="sortQna"
            value="all"
            onChange={handleSortChange}
            checked={sortTable === "all"}
          />
          <label htmlFor="true">답변완료</label>
          <Input
            type="radio"
            id="true"
            name="sortQna"
            value="true"
            onChange={handleSortChange}
            checked={sortTable === "true"}
          />
          <label htmlFor="false">미완료</label>
          <Input
            type="radio"
            id="false"
            name="sortQna"
            value="false"
            onChange={handleSortChange}
            checked={sortTable === "false"}
          />
        </SortBox>
      </TitleWrap>

      <TableWrap>
        {store_business.length > 0 ? (
          filteredBusiness.length > 0 ? (
            <StoreTable>
              <thead>
                <tr>
                  <th>id</th>
                  <th>성함</th>
                  <th>연락처</th>
                  <th>문의 내용</th>
                  <th>답변 여부</th>
                </tr>
              </thead>
              <tbody>
                {filteredBusiness.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.contact}</td>
                    <td>{item.content}</td>
                    <td>
                      <select
                        id={item.id}
                        name="recall"
                        onChange={handleChange}
                        value={item.recall ? "true" : "false"}
                      >
                        <option value="true">답변완료</option>
                        <option value="false">미완료</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StoreTable>
          ) : (
            <EmptyBox>
              <Store />
              <strong>{message || "해당 조건의 창업문의가 없습니다."}</strong>
            </EmptyBox>
          )
        ) : (
          <EmptyBox>
            <Store />
            <strong>등록된 창업문의가 없습니다.</strong>
          </EmptyBox>
        )}
      </TableWrap>
    </>
  );
}

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & h1 {
    font-size: 1.6rem;
    font-weight: var(--font-mw);
  }
  & svg {
    width: 1.6rem;
  }
`;

const SortBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const TableWrap = styled.div`
  overflow-y: auto;
  margin-top: 6rem;
  height: calc(100% - 9.7rem);
`;

const EmptyBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  flex-direction: column;
  & > strong {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
    line-height: 1.4;
  }
`;

const StoreTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  padding-right: 1rem;

  & tbody > tr {
    border-top: 1px solid var(--stroke-color);
  }

  & th,
  td {
    width: calc(100% / 4);
    padding: 1.2rem;
  }
  & th {
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }
  & td {
    font-size: var(--font-sz);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
`;