import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import sessionStore from "../store/SessionStore";
import LogoutApi from "../api/LogoutApi";
import { CommonHeader } from "../components/Header";
import { RadioInput } from "../components/Input";
import ReadApi from "../api/ReadApi";
import DeleteApi from "../api/DeleteApi";

export default function AdminHome() {
  const navigate = useNavigate();
  const [typeSelected, setTypeSelected] = useState("notice");
  const { session } = sessionStore();
  const [data, setData] = useState([]);
  const adminName = session.user.email.split("@")[0];

  const logOut = async () => {
    await LogoutApi();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      try {
        const response = await ReadApi(typeSelected);
        setData(response);
      } catch (error) {}
    };
    fetchData();
  }, [typeSelected]);

  const handleDelete = async (id) => {
    console.log(id);
    const confirmDel = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDel) return;

    try {
      await DeleteApi({ id, typeSelected });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommonHeader />
      <main>
        <section>
          <InfoWrap>
            <strong>{adminName}</strong>
            <button onClick={logOut}>로그아웃</button>
          </InfoWrap>

          <ActionWrap>
            <div>
              <RadioInput
                id="notice"
                name="type"
                checked={typeSelected === "notice"}
                onChange={(e) => {
                  setTypeSelected(e.target.id);
                }}
              >
                공지사항
              </RadioInput>
              <RadioInput
                id="laws"
                name="type"
                checked={typeSelected === "laws"}
                onChange={(e) => {
                  setTypeSelected(e.target.id);
                }}
              >
                법률정보
              </RadioInput>
            </div>
            <Link to="/admin/post">새 글 작성</Link>
          </ActionWrap>

          <TableWrap>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>{typeSelected === "notice" ? "Content" : "Category"}</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {typeSelected === "notice"
                ? data.map((v) => {
                    return (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.noticeTitle}</td>
                        <td>{v.content}</td>
                        <td>
                          <Link to={`/admin/update/${v.id}`}>Edit</Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(v.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : data.map((v) => {
                    return (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.lawTitle}</td>
                        <td>{v.category}</td>
                        <td>
                          <Link to={`/admin/update/${v.id}`}>Edit</Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(v.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </TableWrap>
        </section>
      </main>
    </>
  );
}

const InfoWrap = styled.div`
  margin-block: 40px;
  text-align: right;
  & button {
    box-shadow: none;
    border-radius: 0;
    border: 1px solid var(--main-color);
    padding: 5px 10px;
    margin-left: 10px;
  }
`;

const ActionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    display: flex;
    align-items: center;
  }
  & a {
    border: 1px solid var(--main-color);
    padding: 5px 10px;
    color: var(--main-color);
  }
`;

const TableWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  }
  & td > a,
  & td > button {
    font-size: var(--font-ssz);
  }

  & td > a {
    text-align: center;
    color: var(--main-color);
  }

  & td > button {
    width: 100%;
    box-shadow: none;
    color: var(--error-color);
  }
`;
