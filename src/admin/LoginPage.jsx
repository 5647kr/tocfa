import { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { Mail } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { SubmitButton } from "../components/Button";
import { LogInApi } from "../api/LogApi";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // 벨리데이션
      if (email.trim() === "") {
        setErrorMsg("이메일을 작성해주세요.");
        return;
      }

      if (password.trim().length < 6) {
        setErrorMsg("비밀번호는 6자 이상 작성해주세요.");
        return;
      }

      const { error } = await LogInApi({ email, password });

      if (error) {
        throw error;
      } else {
        navigate("/admin/home");
      }
    } catch (error) {
      setErrorMsg("이메일과 비밀번호가 맞지 않습니다.");
    }
  };

  const handlePasswordShow = () => {
    setIsPasswordShow((isPasswordShow) => !isPasswordShow);
  };

  console.log(errorMsg)

  return (
    <LoginWrap>
      <h2>Welcome To StarScope</h2>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <LoginForm onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email Address</label>
          <InputWrap>
            <Mail color="#99A1AF" />
            <Input
              type="email"
              id="email"
              value={email}
              autoComplete="off"
              placeholder="이메일을 입력하세요."
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrap>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <InputWrap>
            <LockKeyhole color="#99A1AF" />
            <Input
              type={isPasswordShow ? "text" : "password"}
              id="password"
              value={password}
              autoComplete="off"
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handlePasswordShow}>
              {isPasswordShow ? (
                <Eye color="#99A1AF" />
              ) : (
                <EyeOff color="#99A1AF" />
              )}
            </button>
          </InputWrap>
        </div>

        <SubmitButton>Sign In</SubmitButton>
      </LoginForm>
    </LoginWrap>
  );
}

const LoginWrap = styled.article`
  width: clamp(448px, 100%, 448px);
  background-color: #45556c;
  padding: 4rem;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > h2 {
    font-size: 1.6rem;
    font-weight: var(--font-bw);
    text-align: center;
    color: var(--white-color);
    margin-bottom: 4rem;
  }
  & > div {
    width: 30rem;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
`;

const LoginForm = styled.form`
  width: 30rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  h2 {
    font-size: 1.6rem;
    font-weight: var(--font-bw);
    text-align: center;
    color: var(--white-color);
    margin-bottom: 4rem;
  }
  & label {
    color: var(--white-color);
    font-size: 1.4rem;
  }
  & > button {
    background-color: #99a1af;
    font-size: 1.4rem;
    width: fit-content;
    margin-left: auto;
    color: var(--white-color);
  }
`;

const InputWrap = styled.div`
  margin: 0 auto;
  position: relative;
  & > input {
    padding: 1rem 4rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    margin-top: 0.4rem;
    display: block;
  }
  & > input::placeholder {
    color: #99a1af;
  }
  & > svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.2rem;
    width: 1.4rem;
  }
  & > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.2rem;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
  }
  & svg {
    width: 1.4rem;
  }
`;
