import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../store/PostStore";
import { RxCrossCircled } from "react-icons/rx";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

export default function AdminHome() {
  const { typeSelect, readTable, deleteTable, notice, laws, category } =
    usePostStore();
  const [dataTable, setDataTable] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setDataTable([]);

    if (notice.length > 0 && typeSelect === "notice") {
      setDataTable([...notice]);
    } else if (laws.length > 0 && typeSelect === "laws") {
      setDataTable([...laws]);
    } else if (category.length > 0 && typeSelect === "category") {
      setDataTable([...category]);
    } else {
      readTable();
    }
  }, [typeSelect, notice, laws, category]);

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const clearDeleteModal = () => {
    setDeleteModal(false);
    setDeleteId(null)
  };

  const handleDeleteTable = () => {
    try {
      deleteTable(deleteId);
      clearDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section>
        <LogOutWrap>
          <button>로그아웃</button>
        </LogOutWrap>

        <TableWrap>
          <Link to="/admin/post">새 글 작성</Link>
          {dataTable.length > 0 ? (
            <DataTableWrap>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TItle</th>
                  <th>
                    {typeSelect === "notice" && "Content"}
                    {typeSelect === "laws" && "Category"}
                    {typeSelect !== "notice" &&
                      typeSelect !== "laws" &&
                      "English"}
                  </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((v) => {
                  return (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.title}</td>
                      <td>
                        {typeSelect === "notice" && v.content}
                        {typeSelect === "laws" && v.category}
                        {typeSelect !== "notice" &&
                          typeSelect !== "laws" &&
                          v.engName}
                      </td>
                      <td>
                        <Link to={`/admin/update/${v.id}`}>Edit</Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleDeleteModal(v.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </DataTableWrap>
          ) : (
            <Loading />
          )}
        </TableWrap>

        {deleteModal && (
          <DeleteModal>
            <ErrorIcon />
            <strong>정말 삭제하시겠습니까?</strong>
            <BtnWrap>
              <button onClick={clearDeleteModal}>취소</button>
              <button onClick={handleDeleteTable}>삭제</button>
            </BtnWrap>
          </DeleteModal>
        )}
      </section>
    </main>
  );
}

const LogOutWrap = styled.div`
  margin-block: 8rem 4rem;
  text-align: right;
`;

const TableWrap = styled.div`
  & a {
    width: fit-content;
    border: 1px solid var(--sub-color);
    border-bottom: none;
    padding: 0.5rem 1rem;
    color: var(--sub-color);
    margin-left: auto;
  }
`;

const DataTableWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  & th {
    font-weight: var(--font-bw);
  }
  & th,
  & td {
    padding: 10px;
    width: calc(100% / 5);
    border: 1px solid var(--main-color);
  }
  & td {
    font-size: var(--font-ssz);
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & td > a,
  & td > button {
    font-size: var(--font-ssz);
  }

  & td > a {
    width: 100%;
    color: var(--main-color);
    margin: 0;
    border: none;
  }

  & td > button {
    width: 100%;
    box-shadow: none;
    color: var(--error-color);
    background-color: var(--white-color);
    font-weight: var(--font-rw);
  }
`;

const DeleteModal = styled(Modal)`
  box-shadow: 0 2px 4px var(--sub-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorIcon = styled(RxCrossCircled)`
  font-size: 14rem;
  color: var(--error-color);
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 2rem;
  & button:nth-child(2) {
    background-color: var(--error-color);
  }
`;
