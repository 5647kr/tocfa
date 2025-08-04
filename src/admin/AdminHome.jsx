import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutApi from "../api/LogoutApi";
import sessionStore from "../store/SessionStore";
import usePostStore from "../store/PostStore";
import { CommonHeader } from "../components/Header";
import { RadioInput } from "../components/Input";

export default function AdminHome() {
  const navigate = useNavigate();
  const { session } = sessionStore();
  const { typeSelected, setType, readPost, deletePost, notice, laws } =
    usePostStore();
  const adminName = session.user.email.split("@")[0];

  console.log("notice:", notice)
  console.log("laws:", laws)

  const logOut = async () => {
    await LogoutApi();
    navigate("/login");
  };

  // zustand를 이용한 글 목록 조회
  useEffect(() => {
    readPost();
  }, [typeSelected]);

  // zustand를 이용한 글 목록 삭제
  const handleDelete = async (id) => {
    const confirmDel = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDel) return;

    try {
      deletePost(id);
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
                  setType(e.target.id);
                }}
              >
                공지사항
              </RadioInput>
              <RadioInput
                id="laws"
                name="type"
                checked={typeSelected === "laws"}
                onChange={(e) => {
                  setType(e.target.id);
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
                ? notice.map((v) => {
                    return (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.noticeTitle}</td>
                        <td>{v.content}</td>
                        <td>
                          <Link to={`/admin/update/${v.id}`} state={{v, typeSelected}}>
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(v.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : laws.map((v) => {
                    return (
                      <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.lawTitle}</td>
                        <td>{v.category}</td>
                        <td>
                          <Link to={`/admin/update/${v.id}`} state={{v, typeSelected}}>
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(v.id)}>
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
