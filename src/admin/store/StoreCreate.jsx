import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircleQuestionMark } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import AdminSectionWrap from "../../components/AdminSection";
import BoxWrap from "../../components/BoxWrap";
import ErrorBox from "../../components/ErrorBox";
import Input from "../../components/Input";
import Button from "../../components/Button";
import usePostStore from "../../store/postStore";

export default function StoreCreate() {
  const [formState, setFormState] = useState({
    title: "",
    location: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { store_store, readPost, createPost, updatePost } = usePostStore();
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = !!params.id;

  // 수정용 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && !isLoaded) await readPost("store_store");
      setIsLoaded(true);
    };
    fetchData();
  }, [isEditMode, isLoaded, readPost]);

  // 수정모드인지 새글작성인지 확인후 input처리
  useEffect(() => {
    if (isEditMode && store_store.length > 0) {
      const post = store_store.find((data) => data?.id === params.id);

      if (post) {
        setFormState({ title: post.title, location: post.location });
      }
    }
  }, [store_store, isEditMode, params.id]);

  // 제출
  const handleStoreSubmit = async (e) => {
    e.preventDefault();

    if (formState.title.trim() === "") {
      setErrorMessage("제목을 입력해주세요.");
      return;
    }
    if (formState.location.trim() === "") {
      setErrorMessage("위치를 입력해주세요.");
      return;
    }

    try {
      if (isEditMode) {
        await updatePost(params.id, formState, "store_store");
      } else {
        await createPost(formState, "store_store");
      }
      navigate("/admin/store");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  console.log(store_store)

  return (
    <AdminSectionWrap>
      <BoxWrap>
        <TitleWrap>
          <CircleQuestionMark />
          <h1>{isEditMode ? "기존 매장 수정" : "신규 매장 등록"}</h1>
        </TitleWrap>

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
        <FaqForm onSubmit={handleStoreSubmit}>
          <div>
            <label htmlFor="title">매장명</label>
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
            <label htmlFor="location">위치</label>
            <Input
              type="text"
              id="location"
              name="location"
              autoComplete="off"
              value={formState.location}
              onChange={handleChange}
              placeholder="위치를 입력해주세요."
            />
          </div>

          <Button type="submit">
            {isEditMode ? "매장 수정 완료" : "신규 매장 등록"}
          </Button>
        </FaqForm>
      </BoxWrap>
    </AdminSectionWrap>
  );
}

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
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
