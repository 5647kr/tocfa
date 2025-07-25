import styled from "styled-components"
import LoginApi from "../api/LoginApi";



export default function Login() {
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());
    try {
      await LoginApi(loginData);
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <section>
      <LoginWrap>
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
        </form>
      </LoginWrap>
    </section>
  )
}


const LoginWrap = styled.div`
  border: 1px solid var(--shadow-color);
  border-radius: 1rem;
  padding: 20px 40px 40px 40px;
  margin-top: 50%;
  & > h1 {
    margin-bottom: 40px;
  }
  & > h1 > img {
    width: 3rem;
    aspect-ratio: 1 / 1;
    display: block;
    margin: 0 auto;
  }
  & > form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  & > form button {
    padding: 1rem;
    color: var(--main-color);
    margin-top: 20px;
  }
`

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    padding: 10px;
  }
`