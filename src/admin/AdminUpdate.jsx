import styled from "styled-components";
import { RadioInput, TextArea, TextInput } from "../components/Input";
import usePostStore from "../store/PostStore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const value = location.state;
  const { typeSelect, readTable, updateTable } = usePostStore();
  const [data, setData] = useState(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateTable(data);
      await readTable();
      navigate("/admin/home");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <main>
      <section>
        {typeSelect === "notice" && (
          <NoticeForm
            value={data}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        )}
        {typeSelect === "laws" && (
          <LawsForm
            value={data}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            handleRadioChange={handleRadioChange}
          />
        )}
        {typeSelect === "category" && (
          <CategoryForm
            value={data}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        )}
      </section>
    </main>
  );
}

function NoticeForm({ value, handleChange, handleUpdate }) {
  return (
    <RegisterWrap>
      <h2>공지사항 수정</h2>
      <form onSubmit={handleUpdate}>
        <TextInput
          type="text"
          id="title"
          name="title"
          value={value.title}
          onChange={handleChange}
          placeholder="공지사항 제목"
        />
        <TextArea
          id="content"
          name="content"
          value={value.content}
          onChange={handleChange}
          placeholder="공지사항 내용"
        />
        <button type="submit">등록</button>
      </form>
    </RegisterWrap>
  );
}

function LawsForm({ value, handleRadioChange, handleChange, handleUpdate }) {
  const { category, categoryTable } = usePostStore();
  useEffect(() => {
    categoryTable();
  }, []);

  return (
    <RegisterWrap>
      <h2>법률정보 수정</h2>
      <form onSubmit={handleUpdate}>
        <TextInput
          type="text"
          id="title"
          name="title"
          value={value.title}
          onChange={handleChange}
          placeholder="제목"
        />
        <TextInput
          type="text"
          id="law_ref"
          name="law_ref"
          value={value.law_ref}
          onChange={handleChange}
          placeholder="법 조항"
        />
        <TextArea
          id="law_con"
          name="law_con"
          value={value.law_con}
          onChange={handleChange}
          placeholder="법 조항 내용"
        />
        <TextArea
          id="law_pen"
          name="law_pen"
          value={value.law_pen}
          onChange={handleChange}
          placeholder="처벌 내용"
        />
        <TextArea
          id="case"
          name="case"
          value={value.case}
          onChange={handleChange}
          placeholder="실생활 예시"
        />
        <CategoryUl>
          {category.map((v) => {
            return (
              <li key={v.id}>
                <RadioInput
                  id={v.engName}
                  name="category"
                  value={v.engName}
                  checked={value.category === v.engName}
                  onChange={handleRadioChange}
                >
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

function CategoryForm({ value, handleChange, handleUpdate }) {
  return (
    <RegisterWrap>
      <h2>카테고리 수정</h2>
      <form onSubmit={handleUpdate}>
        <TextInput
          type="text"
          name="title"
          value={value.title}
          onChange={handleChange}
          placeholder="카테고리 제목"
        />
        <TextInput
          type="text"
          name="engName"
          value={value.engName}
          onChange={handleChange}
          placeholder="카테고리 영문 제목"
        />
        <button type="submit">등록</button>
      </form>
    </RegisterWrap>
  );
}

const RegisterWrap = styled.div`
  margin-top: 8rem;
  padding: 4rem;
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
