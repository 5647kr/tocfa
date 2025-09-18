import styled from "styled-components";
import bgMobile from "../assets/img/adminLoginBg-mobile.webp";
import bgTablet from "../assets/img/adminLoginBg-tablet.webp";
import bgNoteBook from "../assets/img/adminLoginBg-notebook.webp";
import bg4k from "../assets/img/adminLoginBg-4k.webp";
import Input from "../components/Input";
import { User } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { SubmitButton } from "../components/Button";

export default function LoginPage() {
  return (
    <LoginWrap>
      <LoginForm>
        <h2>Login</h2>
        <p>로그인이 필요합니다.</p>
        <InputWrap>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            autocomplete="off"
            placeholder="이메일을 입력하세요."
          />
          <User color={`var(--gray-color)`} />
        </InputWrap>
        <InputWrap>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            autocomplete="off"
            placeholder="비밀번호를 입력하세요."
          />
          <LockKeyhole color={`var(--gray-color)`} />
        </InputWrap>

        <SubmitButton>로그인</SubmitButton>
      </LoginForm>
    </LoginWrap>
  );
}

const LoginWrap = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${bg4k}) no-repeat center / cover;

  @media (max-width: 1440px) {
    background: url(${bgNoteBook}) no-repeat center / cover;
  }

  @media (max-width: 768px) {
    background: url(${bgTablet}) no-repeat center / cover;
  }

  @media (max-width: 480px) {
    background: url(${bgMobile}) no-repeat center / cover;
  }
`;

const LoginForm = styled.form`
  width: clamp(480px, 100%, 480px);
  background-color: var(--white-color);
  padding: 4rem;
  border-radius: 1rem;
  h2 {
    font-weight: var(--font-bw);
  }
  p {
    margin-top: 2rem;
    color: var(--gray-color);
  }
  & > button {
    width: 100%;
    margin-top: 4rem;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--gray-color);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  & > label {
    min-width: 10rem;
    padding-left: 1.2rem;
    font-size: 1.4rem;
    color: var(--gray-color);
    border-right: 1px solid var(--gray-color);
  }
  & > input {
    width: 100%;
    padding: 1rem 2.4rem 1rem 1rem;
  }
  & > input::placeholder {
    color: var(--gray-color);
  }
  & > svg {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    aspect-ratio: 1 / 1;
  }
`;
