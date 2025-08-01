import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import sessionStore from "../store/SessionStore";
import LogoutApi from "../api/LogoutApi";
import { CommonHeader } from "../components/Header";
import { RadioInput } from "../components/Input";

export default function AdminHome() {
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState("notice");
  const { session } = sessionStore();
  const adminName = session.user.email.split("@")[0];

  console.log(selectType);
  const logOut = async () => {
    await LogoutApi();
    navigate("/login");
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
                checked={selectType === "notice"}
                onChange={(e) => {
                  setSelectType(e.target.id);
                }}
              >
                공지사항
              </RadioInput>
              <RadioInput
                id="laws"
                name="type"
                checked={selectType === "laws"}
                onChange={(e) => {
                  setSelectType(e.target.id);
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
                <th>{selectType === "notice" ? "Content" : "Category"}</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {selectType === "notice" ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/admin/update/:id">Edit</Link>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
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
