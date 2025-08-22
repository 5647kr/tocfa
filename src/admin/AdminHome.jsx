import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../store/PostStore";
import { RxCrossCircled } from "react-icons/rx";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import useTypeStore from "../store/TypeStore";

export default function AdminHome() {
  const {
    typeSelect,
    setTypeSelect,
    readTable,
    deleteTable,
    notice,
    laws,
    category,
  } = usePostStore();
  const { getMenu, menuList } = useTypeStore();
  const [dataTable, setDataTable] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getMenu();
  }, [getMenu]);

useEffect(() => {
  setDataTable([]);

  const sortByLatest = (arr) =>
    [...arr].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (notice.length > 0 && typeSelect === "notice") {
    setDataTable(sortByLatest(notice));
  } else if (laws.length > 0 && typeSelect === "laws") {
    setDataTable(sortByLatest(laws));
  } else if (category.length > 0 && typeSelect === "category") {
    setDataTable(sortByLatest(category));
  } else {
    readTable();
  }
}, [typeSelect, readTable, notice, laws, category]);

  const handleChageType = (engName) => {
    setTypeSelect(engName);
  };

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const clearDeleteModal = () => {
    setDeleteModal(false);
    setDeleteId(null);
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
        <HandleWrap>
          <ul>
            {menuList.map((v) => {
              return (
                <li key={v.id}>
                  <button id={v.id} onClick={() => handleChageType(v.engName)}>
                    {v.title}
                  </button>
                </li>
              );
            })}
          </ul>
          <Link to="/admin/post">새 글 작성</Link>
        </HandleWrap>
        <div>
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
                  let category = "";
                  switch (v.category) {
                    case "house":
                      category = "임대/임차";
                      break;
                    case "finance":
                      category = "금전/사기";
                      break;
                    case "rights":
                      category = "권리/명예";
                      break;
                    case "work":
                      category = "근로/노동";
                      break;
                    case "contract":
                      category = "계약";
                      break;
                    case "transport":
                      category = "교통";
                      break;
                    default:
                      category = "기타";
                      break;
                  }
                  return (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.title}</td>
                      <td>
                        {typeSelect === "notice" && v.content}
                        {typeSelect === "laws" && category}
                        {typeSelect !== "notice" &&
                          typeSelect !== "laws" &&
                          v.engName}
                      </td>
                      <td>
                        <Link to={`/admin/update/${v.id}`} state={v}>
                          Edit
                        </Link>
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
        </div>

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

const HandleWrap = styled.div`
  margin-top: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & ul {
    display: flex;
  }
  & button {
    background-color: var(--white-color);
    border: 1px solid var(--sub-color);
    border-bottom: none;
    color: var(--sub-color);
    font-weight: var(--font-rw);
    padding: 0.5rem 1rem;
  }
  & li:nth-child(2) button {
    border-inline: none;
  }
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
