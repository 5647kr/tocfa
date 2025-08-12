import styled from "styled-components";
import usePostStore from "../store/PostStore";
import { RadioInput, TextArea, TextInput } from "../components/Input";
import { useEffect, useState } from "react";
import CategoryApi from "../api/CategoryApi";


export default function AdminPost() {
  const { typeSelect, createTable } = usePostStore();

  console.log(typeSelect);
  return (
    <main>
      <section>
        {typeSelect === "notice" && <NoticeForm />}
        {typeSelect === "laws" && <LawsForm />}
        {typeSelect === "category" && <CategoryForm />}
      </section>
    </main>
  );
}

function NoticeForm() {
  return (
    <RegisterWrap>
      <h2>공지사항 작성</h2>
      <form>
        <TextInput
          type="text"
          id="title"
          name="title"
          placeholder="공지사항 제목"
        />
        <TextArea id="content" name="content" placeholder="공지사항 내용" />
        <button>등록</button>
      </form>
    </RegisterWrap>
  );
}

function LawsForm() {
  const [category, setCategory] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await CategoryApi("user");
        setCategory(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])

  return (
    <RegisterWrap>
      <h2>법률정보 작성</h2>
      <form>
        <TextInput type="text" id="title" name="title" placeholder="제목" />
        <TextInput
          type="text"
          id="laws_ref"
          name="laws_ref"
          placeholder="법 조항"
        />
        <TextArea id="laws_con" name="laws_con" placeholder="법 조항 내용" />
        <TextArea id="laws_pen" name="laws_pen" placeholder="처벌 내용" />
        <TextArea id="case" name="case" placeholder="실생활 예시" />
        <CategoryUl>
          {category.map((v) => {
            return (
              <li key={v.id}>
                <RadioInput id={v.engName} name="category">
                  {v.title}
                </RadioInput>
              </li>
            );
          })}
        </CategoryUl>
        <button>등록</button>
      </form>
    </RegisterWrap>
  );
}

function CategoryForm() {
  return (
    <RegisterWrap>
      <h2>카테고리 작성</h2>
      <form>
        <TextInput type="text" name="title" placeholder="카테고리 제목" />
        <TextInput
          type="text"
          name="engName"
          placeholder="카테고리 영문 제목"
        />
        <button>등록</button>
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
