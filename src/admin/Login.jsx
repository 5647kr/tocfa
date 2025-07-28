import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginApi from "../api/LoginApi";
import MainWrap from "../components/Main";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    try {
      await LoginApi(loginData);
      navigate("/admin");
    } catch (error) {
      setErrorMsg("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <MainWrap>
      <LoginWrap>
        <LoginForm>
          <h1>
            <img src="assets/img/logo.png" alt="tocfa logo" />
          </h1>
          <form onSubmit={handleSubmit}>
            <InputWrap>
              <label htmlFor="email">이메일</label>
              <input type="email" name="email" id="email" required />
            </InputWrap>
            <InputWrap>
              <label htmlFor="password">비밀번호</label>
              <input type="password" name="password" id="password" required />
            </InputWrap>
            <button type="submit">로그인</button>
            {errorMsg ? <strong>{errorMsg}</strong> : null}
          </form>
        </LoginForm>
      </LoginWrap>
    </MainWrap>
  );
}

const LoginWrap = styled.section`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const LoginForm = styled.div`
  border: 1px solid var(--shadow-color);
  padding: 20px 40px 40px;
  border-radius: 1rem;
  & img {
    display: block;
    margin: 0 auto 4rem;
    width: 3rem;
    aspect-ratio: 1 / 1;
  }
  & form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  & form button {
    padding: 1rem 0;
    margin-top: 2rem;
  }

  & form button:active {
    box-shadow: inset 0 2px 4px var(--shadow-color);
  }

  & form strong {
    color: red;
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    padding: 10px;
  }
`;
