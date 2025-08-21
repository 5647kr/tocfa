import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogInApi } from "../api/LogApi";
import { RxCrossCircled } from "react-icons/rx";
import { TextInput } from "../components/Input";
import Modal from "../components/Modal";

export default function AdminLogin() {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);

    const formData = new FormData(e.currentTarget);
    const logInData = Object.fromEntries(formData.entries());

    try {
      await LogInApi(logInData);
      navigate("/admin/home");
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <MainWrap>
      <LoginWrap>
        <h1>TOCFA</h1>
        <h2>로그인이 필요합니다.</h2>
        <LoginForm onSubmit={handleSubmit}>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="이메일"
          />
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
          />
          <button type="submit">로그인</button>
        </LoginForm>
      </LoginWrap>

      {!!loginError && (
        <ModalWrap>
          <LoginErr>
            <ErrorIcon />
            <strong>이메일이나 비밀번호를 확인하세요.</strong>
            <button onClick={() => setLoginError(false)}>OK</button>
          </LoginErr>
        </ModalWrap>
      )}
    </MainWrap>
  );
}

const MainWrap = styled.main`
  height: 100vh;
  background: url(${process.env.PUBLIC_URL}/assets/img/hero.webp) center center /
    cover no-repeat;
  opacity: 0.8;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 0;
  padding-inline: 1.6rem;
`;

const LoginWrap = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: var(--white-color);
  padding: 4rem;
  & h1 {
    text-align: center;
    font-size: 4rem;
    font-weight: var(--font-bw);
  }
  & h2 {
    margin-block: 4rem;
    font-size: 1.8rem;
    color: var(--sub-color);
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & button {
    align-self: flex-end;
    padding: 1rem 2rem;
    width: fit-content;
  }
`;

const ModalWrap = styled.div`
  background-color: var(--sub-color);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`;

const LoginErr = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ErrorIcon = styled(RxCrossCircled)`
  font-size: 14rem;
  color: var(--error-color);
`;
