import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CircleQuestionMark } from "lucide-react";
import usePostStore from "../../../store/postStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ErrorBox from "../../../components/ErrorBox";

export default function FaqCreate() {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { commu_faq, readPost, createPost, updatePost } = usePostStore();
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = !!params.id;

  // 수정용 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) await readPost("commu_faq");
      setIsLoaded(true);
    };
    fetchData();
  }, [isLoaded, readPost]);

  // 수정모드인지 새글작성인지 확인후 input처리
  useEffect(() => {
    if (isEditMode && commu_faq.length > 0) {
      const post = commu_faq.find((data) => data?.id === params.id);

      if (post) {
        setFormState({ title: post.title, content: post.content });
      }
    }
  }, [commu_faq, isEditMode, params.id]);

  // 제출
  const handleFaqSubmit = async (e) => {
    e.preventDefault();

    if (formState.title.trim() === "") {
      setErrorMessage("제목을 입력해주세요.");
      return;
    }
    if (formState.content.trim() === "") {
      setErrorMessage("답변을 입력해주세요.");
      return;
    }

    try {
      if (isEditMode) {
        await updatePost(params.id, formState, "commu_faq");
      } else {
        await createPost(formState, "commu_faq");
      }
      navigate("/admin/faq");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <>
        <TitleWrap>
          <div>
            <CircleQuestionMark />
            <h1>{isEditMode ? "기존 FAQ 수정" : "신규 FAQ 등록"}</h1>
          </div>
        </TitleWrap>

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <FaqForm onSubmit={handleFaqSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <Input
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              value={formState.title}
              onChange={handleChange}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div>
            <label htmlFor="content">답변</label>
            <textarea
              id="content"
              name="content"
              autoComplete="off"
              value={formState.content}
              onChange={handleChange}
              placeholder="답변을 입력해주세요"
            />
          </div>

          <Button type="submit">
            {isEditMode ? "FAQ 수정 완료" : "신규 FAQ 등록"}
          </Button>
        </FaqForm>
      </>
  );
}

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  & h1 {
    font-size: 1.6rem;
    font-weight: var(--font-mw);
  }
  & svg {
    width: 1.6rem;
  }
`;

const FaqForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & > div {
    display: flex;
    flex-direction: column;
  }
  & label {
    font-size: var(--font-mz);
  }
  & textarea {
    min-height: 40rem;
  }
  & textarea,
  input {
    resize: none;
    padding: 1.2rem;
    border: 1px solid var(--stroke-color);
    border-radius: 1rem;
    font-size: var(--font-mz);
  }
  & textarea::placeholder,
  input::placeholder {
    color: var(--bg-color);
    font-size: var(--font-mz);
  }
  & button {
    width: fit-content;
    margin: 0 auto;
    margin-top: 4rem;
  }
`;
