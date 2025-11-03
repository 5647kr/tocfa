import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircleQuestionMark } from "lucide-react";
import usePostStore from "../../../store/postStore";
import ConfirmWrap from "../../../components/ConfirmWrap";
import Button from "../../../components/Button";

export default function FaqPost() {
  const { commu_faq, readPost, deletePost } = usePostStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [delId, setDelId] = useState("");
  const [sortFaq, setSortFaq] = useState(commu_faq);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isLoaded) {
        await readPost("commu_faq");
        setIsLoaded(true);
      }
      setSortFaq(
        [...commu_faq].sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    };
    fetchPost();
  }, [commu_faq, isLoaded, readPost]);

  const activeConfirmDelete = (id) => {
    setConfirmDel(true);
    setDelId(id);
  };

  const cancelDelete = () => {
    setConfirmDel(false);
  };

  const handleDelete = async () => {
    try {
      await deletePost(delId, "commu_faq");
      setConfirmDel(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TitleWrap>
        <div>
          <CircleQuestionMark />
          <h1>FAQ 목록</h1>
        </div>
        <Link to={"create"}>신규 FAQ 등록</Link>
      </TitleWrap>

      <TableWrap>
        <CommuTable>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortFaq?.map((commu) => (
              <tr key={commu.id}>
                <td>{commu.title}</td>
                <td>{commu.content}</td>
                <td>
                  <Link to={`update/${commu.id}`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => activeConfirmDelete(commu.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </CommuTable>
      </TableWrap>

      {confirmDel && (
        <DeleteConfirmBox>
          <h2>정말 삭제하시겠습니까?</h2>
          <div>
            <Button onClick={cancelDelete}>취소</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        </DeleteConfirmBox>
      )}
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
  & a {
    background-color: var(--boxBg-color);
    color: var(--white-color);
    border-radius: 1rem;
    padding: 1rem 2rem;
    font-size: var(--font-sz);
  }
`;

const TableWrap = styled.div`
  overflow-y: auto;
  margin-top: 6rem;
  overflow-y: auto;
`;

const CommuTable = styled.table`
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
  & button,
  a {
    font-size: var(--font-sz);
    width: 100%;
  }
  & button {
    color: var(--error-color);
  }
`;

const DeleteConfirmBox = styled(ConfirmWrap)`
  border-color: var(--error-color);
  & > h2 {
    text-align: center;
    color: var(--error-color);
    font-size: var(--font-mz);
    font-weight: var(--font-mw);
  }
  & > div {
    display: flex;
    gap: 2rem;
    margin-top: 4rem;
  }
  & button {
    width: 100%;
    background-color: var(--error-color);
  }
  & button:first-child {
    background-color: var(--white-color);
    color: var(--text-color);
    border: 1px solid var(--stroke-color);
  }
`;
