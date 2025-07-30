import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginApi from "../api/LoginApi";
import MainWrap from "../components/Main";
import { TextInput } from "../components/Input";

export default function AdminLogin() {
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    try {
      await LoginApi(loginData);
      navigate("/admin");
    } catch (error) {
      setIsError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <MainWrap>
      <LoginWrap>
        <div>
          <h2>
            <img src="/assets/img/logo.png" alt="tocfa logo" />
          </h2>
          <LoginForm onSubmit={handleSubmit}>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
            >
              이메일
            </TextInput>
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
            >
              비밀번호
            </TextInput>
            <button type="submit">로그인</button>
          </LoginForm>
          {isError ? <strong>{isError}</strong> : null}
        </div>
      </LoginWrap>
    </MainWrap>
  );
}

const LoginWrap = styled.section`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  & > div {
    border: 1px solid var(--shadow-color);
    border-radius: 1rem;
    padding: 2rem 4rem 4rem;
  }
  & h2 {
    text-align: center;
    margin-bottom: 4rem;
  }
  & h2 img {
    width: 3rem;
    aspect-ratio: 1 / 1;
    vertical-align: top;
  }
  & strong {
    display: block;
    margin-top: 2rem;
    color: var(--error-color);
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & button {
    margin-top: 20px;
  }
`;
