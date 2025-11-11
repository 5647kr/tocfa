import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ConfirmWrap from "../../../components/ConfirmWrap";
import ErrorBox from "../../../components/ErrorBox";
import usePostStore from "../../../store/postStore";
import { Sparkles } from "lucide-react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { GridWrap } from "../../../components/SectionWrap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CommuQna() {
  const { createPost } = usePostStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [successReq, setSuccessReq] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleQnaSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const agree = e.currentTarget.querySelector("#agree").checked;

    if (!data.name.trim()) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }
    if (!data.email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    if (!data.contact.trim()) {
      setErrorMessage("연락처을 입력해주세요.");
      return;
    }
    if (!data.content.trim()) {
      setErrorMessage("문의내용을 입력해주세요.");
      return;
    }

    if (!agree) {
      setErrorMessage("개인정보 수집에 동의해주세요.");
      return;
    }

    try {
      await createPost(data, "commu_qna");
      setSuccessReq(true);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickConfirm = () => {
    setSuccessReq(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <>
      <title>StarScope 문의</title>
      <h1 className="a11y-hidden">StarScope 문의</h1>

      {errorMessage && (
        <ErrorWrap>
          <ErrorBox>{errorMessage}</ErrorBox>
        </ErrorWrap>
      )}

      <QnaWrap>
        <QnaForm ref={formRef} onSubmit={handleQnaSubmit}>
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <InputTitleWrap>
              <Sparkles />
              <label htmlFor="name">고객명</label>
            </InputTitleWrap>
            <Input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            <InputTitleWrap>
              <Sparkles />
              <label htmlFor="contact">연락처</label>
            </InputTitleWrap>
            <Input
              type="text"
              id="contact"
              name="contact"
              autoComplete="off"
              placeholder="연락처를 입력해주세요."
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            <InputTitleWrap>
              <Sparkles />
              <label htmlFor="email">이메일</label>
            </InputTitleWrap>
            <Input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            <InputTitleWrap>
              <Sparkles />
              <label htmlFor="content">문의 내용</label>
            </InputTitleWrap>
            <textarea
              id="content"
              name="content"
              placeholder="문의 내용을 입력해주세요."
            />
          </div>

          <span>
            <Input type="checkbox" id="agree" />
            <label htmlFor="agree">개인정보수집 및 동의</label>
          </span>

          <Button type="submit">신청하기</Button>
        </QnaForm>
      </QnaWrap>

      {successReq && (
        <ConfirmBox>
          <h3>신청이 완료되었습니다.</h3>

          <Button type="button" onClick={handleClickConfirm}>
            닫기
          </Button>
        </ConfirmBox>
      )}
    </>
  );
}

const ErrorWrap = styled(GridWrap)`
  margin-top: 4rem;
`;

const QnaWrap = styled(GridWrap)`
  margin-top: 4rem;
`;

const QnaForm = styled.form`
  & > div {
    padding: 2rem;
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    display: flex;
    background-color: var(--white-color);
  }

  & div ~ div {
    margin-top: 2rem;
  }

  & > div input,
  textarea {
    width: 100%;
    font-size: var(--font-smz);
    margin-left: 2rem;
    background-color: transparent;
  }

  & > div textarea {
    border: none;
    resize: none;
    height: 10rem;
  }

  & > div textarea::placeholder {
    color: var(--bg-color);
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    margin-block: 6rem;
  }

  & > span input {
    width: 1.4rem;
    height: 1.4rem;
    accent-color: var(--boxBg-color);
    border: 1px solid var(--stroke-color);
    background-color: transparent;
  }

  & > span label {
    font-size: var(--font-smz);
  }

  & > button {
    margin: 0 auto;
  }
`;

const InputTitleWrap = styled.div`
  width: 20rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-right: 1px solid var(--stroke-color);

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }
  & > label {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
  }
`;

const ConfirmBox = styled(ConfirmWrap)`
  & > h3 {
    font-size: var(--font-2xlz);
    font-weight: var(--font-bw);
    text-align: center;
    margin: 2rem 0 6rem;
  }
  & > button {
    margin: 0 auto;
  }
`;
