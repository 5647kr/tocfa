import { useState } from "react";
import styled from "styled-components";
import { BackHeader } from "../components/Header";
import { RadioInput, TextArea, TextInput } from "../components/Input";
import PostApi from "../api/PostApi";
import { useNavigate } from "react-router-dom";

export default function AdminPost() {
  const [typeSelected, setTypeSelected] = useState("notice");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await PostApi({ data, typeSelected });
      navigate(-1)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackHeader />
      <main>
        <section>
          <TypeWrap>
            <RadioInput
              id="notice"
              name="type"
              checked={typeSelected === "notice"}
              onChange={(e) => {
                setTypeSelected(e.target.id);
              }}
            >
              공지사항
            </RadioInput>
            <RadioInput
              id="laws"
              name="type"
              checked={typeSelected === "laws"}
              onChange={(e) => {
                setTypeSelected(e.target.id);
              }}
            >
              법률정보
            </RadioInput>
          </TypeWrap>

          <FormWrap>
            {typeSelected === "notice" ? (
              <>
                <h2>공지사항 작성</h2>
                <form onSubmit={handleSubmit}>
                  <TextInput
                    id="noticeTitle"
                    type="text"
                    name="noticeTitle"
                    placeholder="공지사항 제목을 입력하세요"
                  >
                    제목
                  </TextInput>
                  <TextArea
                    id="content"
                    name="content"
                    placeholder="공지사항 내용을 입력하세요"
                  >
                    내용
                  </TextArea>
                  <button type="submit">등록</button>
                </form>
              </>
            ) : (
              <>
                <h2>법률정보 작성</h2>
                <form onSubmit={handleSubmit}>
                  <TextInput
                    id="lawTitle"
                    type="text"
                    name="lawTitle"
                    placeholder="제목 ex) 대한민국 주권은?"
                  >
                    제목
                  </TextInput>
                  <TextInput
                    id="law_ref"
                    type="text"
                    name="law_ref"
                    placeholder="관련 법 조항 ex) 헌법 1조 2항"
                  >
                    관련 법 조항
                  </TextInput>
                  <TextArea
                    id="law_con"
                    name="law_con"
                    placeholder="관련 법 내용 ex) 대한민국의 주권은 국민에게 있다."
                  >
                    법 조항 내용
                  </TextArea>
                  <TextArea
                    id="law_pen"
                    name="law_pen"
                    placeholder="처벌 내용 ex) 이를 위반할시, 몇년 이하의 징역 또는 몇년 이하의 벌금형에 처할 수 있다."
                  >
                    처벌 내용
                  </TextArea>
                  <TextArea id="case" name="case" placeholder="실생활 예시">
                    실생활 예시
                  </TextArea>
                  <CategoryWrap>
                    <h3>카테고리</h3>
                    <ul>
                      <li>
                        <RadioInput id="house" name="category">
                          임대차 / 부동산
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput id="contract" name="category">
                          계약
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput id="work" name="category">
                          근로
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput id="transport" name="category">
                          교통
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput id="rights" name="category">
                          권리 / 명예
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput id="finance" name="category">
                          금전 / 사기
                        </RadioInput>
                      </li>
                    </ul>
                  </CategoryWrap>
                  <button type="submit">등록</button>
                </form>
              </>
            )}
          </FormWrap>
        </section>
      </main>
    </>
  );
}

const TypeWrap = styled.div`
  padding-top: 40px;
  display: flex;
  align-items: center;
`;

const FormWrap = styled.div`
  margin-block: 40px;
  border: 1px solid var(--main-color);
  border-radius: 10px;
  padding: 20px 40px 40px;
  & > h2 {
    text-align: center;
    font-weight: var(--font-bw);
    margin-bottom: 40px;
  }
  & > form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & > form button {
    margin-top: 20px;
  }
`;

const NoticeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    margin-top: 20px;
  }
`;

const CategoryWrap = styled.div`
  h3 {
    font-size: clamp(1.4rem, 1.6vw, 2.2rem);
    font-weight: var(--font-bw);
  }
  & > ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  & label {
    display: block;
    width: 100%;
    text-align: center;
  }
`;
