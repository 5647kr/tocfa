import { Link } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../store/PostStore";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function AdminHome() {
  const { typeSelect, readTable, notice, laws, category } = usePostStore();
  const [dataTable, setDataTable] = useState([]);

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

  console.log("data", dataTable);

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
                  console.log(v)
                  return (
                    <tr>
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
                        <button>Delete</button>
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
