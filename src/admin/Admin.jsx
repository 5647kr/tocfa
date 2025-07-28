import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CommonHeader } from "../components/Header";
import sessionStore from "../store/SessionStore";
import LogoutApi from "../api/LogoutApi";

export default function Admin() {
  const { session } = sessionStore();
  const navigate = useNavigate();
  const [isNotice, setIsNotice] = useState(true);

  // 로그인 없이 주소로 접근시 차단
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, []);

  // 로그인 기능
  const logOut = async () => {
    await LogoutApi();
    navigate(-1);
  };

  const checkNotice = (e) => {
    e === "notice" ? setIsNotice(true) : setIsNotice(false);
  };

  return (
    <>
      <CommonHeader />
      <main>
        <AuthorWrap>
          <div>
            <strong>{session.user.email.split("@")[0]}님</strong>
            <button onClick={logOut}>로그아웃</button>
          </div>
        </AuthorWrap>

        <DataWrap>
          <InputWrap>
            <div>
              <input
                className="a11y-hidden"
                type="radio"
                name="type"
                id="notice"
                onChange={(e) => {
                  checkNotice(e.target.id);
                }}
                defaultChecked
              />
              <label htmlFor="notice">공지사항</label>
              <input
                className="a11y-hidden"
                type="radio"
                name="type"
                id="laws"
                onChange={(e) => {
                  checkNotice(e.target.id);
                }}
              />
              <label htmlFor="laws">법률정보</label>
            </div>
            <Link to={""}>새 글 작성</Link>
          </InputWrap>

          <DataTable>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>{isNotice? "Content" : "Category"}</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {isNotice ? (
                  <tr>
                    <td>1</td>
                    <td>공지 테스트1</td>
                    <td>
                      공지 테스트2텍스트 넘어가면 어떻게 처리하고 있나요
                      궁금해서 길게 늘려봅니다.
                    </td>
                    <td>
                      <Link to={""}>Edit</Link>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>1</td>
                    <td>법률 테스트1</td>
                    <td>법률 테스트2</td>
                    <td>
                      <Link to={""}>Edit</Link>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </DataTable>
        </DataWrap>
      </main>
    </>
  );
}

const AuthorWrap = styled.section`
  & > div {
    padding: 40px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }
  button {
    box-shadow: none;
    border-radius: 0;
    border: 1px solid var(--main-color);
    padding: 0.5rem 1rem;
    color: var(--main-color);
  }
`;

const DataWrap = styled.section`
  margin-top: 20px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    padding: 5px 10px;
    border: 1px solid var(--main-color);
    cursor: pointer;
  }

  & label:nth-child(2) {
    border-right: none;
  }

  & input:checked + label {
    background-color: var(--shadow-color);
    color: var(--bg-color);
  }

  & > a {
    color: var(--main-color);
    padding: 5px 10px;
    border: 1px solid var(--main-color);
  }
`;

const DataTable = styled.div`
  margin-top: 20px;
  & > table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  & > table th,
  & > table td {
    width: calc(100% / 5);
    padding: 10px;
    border: 1px solid var(--main-color);
  }
  & > table th {
    font-weight: var(--font-bw);
  }
  & > table td {
    text-align: center;
    font-size: var(--font-ssz);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > table td:nth-child(4) a {
    font-size: var(--font-ssz);
    color: var(--main-color);
  }
  & > table td:last-child button {
    width: 100%;
    box-shadow: none;
    color: red;
    font-size: var(--font-ssz);
  }
`;
