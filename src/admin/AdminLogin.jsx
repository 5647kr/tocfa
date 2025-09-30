import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Eye, EyeClosed, LockKeyhole, Mail } from "lucide-react";
import { LogIn } from "../api/Log";
import ErrorBox from "../components/ErrorBox";
import Input from "../components/Input";
import Button from "../components/Button";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    setErrorMessage("");
    e.preventDefault();

    try {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
        return;
      }

      if (password.trim().length < 6) {
        setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
        return;
      }

      const { error } = await LogIn({ email, password });
      if (error) {
        throw error;
      } else {
        navigate("/admin/home");
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("이메일과 비밀번호가 맞지 않습니다.");
    }
  };
  return (
    <LoginWrap>
      <LoginBox>
        <h1>Welcome to StarScope</h1>
        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

        <form onSubmit={handleLogin}>
          <InputWrap>
            <label htmlFor="email">Email Address</label>
            <div>
              <Mail />
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="이메일을 입력해주세요."
              />
            </div>
          </InputWrap>
          <InputWrap>
            <label htmlFor="password">Password</label>
            <div>
              <LockKeyhole />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </InputWrap>
          <Button type="submit">Log In</Button>
        </form>
      </LoginBox>
    </LoginWrap>
  );
}

const LoginWrap = styled.article`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: clamp(448px, 100%, 480px);
  border-radius: 1rem;
  padding: 4rem;
  background-color: var(--white-color);
  box-shadow: 0 5px 15px var(--stroke-color);

  & > h1 {
    text-align: center;
    font-size: var(--font-mz);
    font-weight: var(--font-bw);
    margin-bottom: 4rem;
  }

  & > div {
    width: 30rem;
    margin: 0 auto;
  }

  & > form {
    width: 30rem;
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const InputWrap = styled.div`
  & > label {
    color: var(--text-color);
    font-size: var(--font-smz);
    margin-bottom: 0.4rem;
  }
  & > div {
    width: 30rem;
    padding: 1.2rem;
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & > div svg {
    width: 1.4rem;
    stroke: var(--stroke-color);
  }
  & > div > input {
    width: 100%;
    font-size: var(--font-smz);
  }
  & > div > button {
    display: flex;
    align-items: center;
  }
  & + button {
    margin-left: auto;
  }
`;
