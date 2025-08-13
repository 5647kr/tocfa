import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import usePostStore from "../store/PostStore";
import { RadioInput, TextArea, TextInput } from "../components/Input";



export default function AdminPost() {
  const { typeSelect, createTable } = usePostStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      createTable(data);
      navigate("/admin/home")
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <main>
      <section>
        {typeSelect === "notice" && <NoticeForm handleSubmit={handleSubmit} />}
        {typeSelect === "laws" && <LawsForm handleSubmit={handleSubmit} />}
        {typeSelect === "category" && <CategoryForm handleSubmit={handleSubmit} />}
      </section>
    </main>
  );
}

function NoticeForm({handleSubmit}) {
  return (
    <RegisterWrap>
      <h2>공지사항 작성</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="title"
          name="title"
          placeholder="공지사항 제목"
        />
        <TextArea id="content" name="content" placeholder="공지사항 내용" />
        <button type="submit">등록</button>
      </form>
    </RegisterWrap>
  );
}

function LawsForm({handleSubmit}) {
  const { category, categoryTable } = usePostStore();
  useEffect(() => {
    categoryTable();
  }, []);

  return (
    <RegisterWrap>
      <h2>법률정보 작성</h2>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" id="title" name="title" placeholder="제목" />
        <TextInput
          type="text"
          id="law_ref"
          name="law_ref"
          placeholder="법 조항"
        />
        <TextArea id="law_con" name="law_con" placeholder="법 조항 내용" />
        <TextArea id="law_pen" name="law_pen" placeholder="처벌 내용" />
        <TextArea id="case" name="case" placeholder="실생활 예시" />
        <CategoryUl>
          {category.map((v) => {
            return (
              <li key={v.id}>
                <RadioInput id={v.engName} name="category" value={v.engName}>
                  {v.title}
                </RadioInput>
              </li>
            );
          })}
        </CategoryUl>
        <button type="submit">등록</button>
      </form>
    </RegisterWrap>
  );
}

function CategoryForm({handleSubmit}) {
  return (
    <RegisterWrap>
      <h2>카테고리 작성</h2>
      <form onSubmit={handleSubmit}>
        <TextInput type="text" name="title" placeholder="카테고리 제목" />
        <TextInput
          type="text"
          name="engName"
          placeholder="카테고리 영문 제목"
        />
        <button type="submit">등록</button>
      </form>
    </RegisterWrap>
  );
}

const RegisterWrap = styled.div`
  padding: 4rem;
  margin-top: 8rem;
  border: 1px solid var(--sub-color);
  & h2 {
    text-align: center;
    margin-bottom: 4rem;
  }
  & form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const CategoryUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  @media screen and (min-width: 1240px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
