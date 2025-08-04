import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePostStore from "../store/PostStore";
import { BackHeader } from "../components/Header";
import { RadioInput, TextArea, TextInput } from "../components/Input";
import styled from "styled-components";

export default function AdminUpdate() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { v, typeSelected } = loc.state;
  const { updatePost } = usePostStore();
  const [noticeData, setNoticeData] = useState({
    id: "",
    noticeTitle: "",
    content: "",
  });
  const [lawData, setLawData] = useState({
    id: "",
    lawTitle: "",
    law_ref: "",
    law_con: "",
    law_pen: "",
    case: "",
    category: "",
  });

  useEffect(() => {
    if (typeSelected === "notice") {
      setNoticeData({
        id: v.id,
        noticeTitle: v.noticeTitle,
        content: v.content,
      });
    } else {
      setLawData({
        id: v.id,
        lawTitle: v.lawTitle,
        law_ref: v.law_ref,
        law_con: v.law_con,
        law_pen: v.law_pen,
        case: v.case,
        category: v.category,
      });
    }
  }, [v]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (typeSelected === "notice") {
      setNoticeData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLawData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e) => {
    setLawData((prev) => ({ ...prev, category: e.target.id }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const id = typeSelected === "notice" ? noticeData.id : lawData.id;

    await updatePost(id, data);
    navigate(-1);
  };

  return (
    <>
      <BackHeader />
      <main>
        <section>
          <FormWrap>
            {typeSelected === "notice" ? (
              <>
                <h2>공지사항 수정</h2>
                <form onSubmit={handleUpdate}>
                  <TextInput
                    id="noticeTitle"
                    type="text"
                    name="noticeTitle"
                    placeholder="공지사항 제목을 입력하세요"
                    value={noticeData.noticeTitle}
                    onChange={handleChange}
                  >
                    제목
                  </TextInput>
                  <TextArea
                    id="content"
                    name="content"
                    value={noticeData.content}
                    onChange={handleChange}
                    placeholder="공지사항 내용을 입력하세요"
                  >
                    내용
                  </TextArea>
                  <button type="submit">수정</button>
                </form>
              </>
            ) : (
              <>
                <h2>법률정보 수정</h2>
                <form onSubmit={handleUpdate}>
                  <TextInput
                    id="lawTitle"
                    type="text"
                    name="lawTitle"
                    value={lawData.lawTitle}
                    onChange={handleChange}
                    placeholder="제목 ex) 대한민국 주권은?"
                  >
                    제목
                  </TextInput>
                  <TextInput
                    id="law_ref"
                    type="text"
                    name="law_ref"
                    value={lawData.law_ref}
                    onChange={handleChange}
                    placeholder="관련 법 조항 ex) 헌법 1조 2항"
                  >
                    관련 법 조항
                  </TextInput>
                  <TextArea
                    id="law_con"
                    name="law_con"
                    value={lawData.law_con}
                    onChange={handleChange}
                    placeholder="관련 법 내용 ex) 대한민국의 주권은 국민에게 있다."
                  >
                    법 조항 내용
                  </TextArea>
                  <TextArea
                    id="law_pen"
                    name="law_pen"
                    value={lawData.law_pen}
                    onChange={handleChange}
                    placeholder="처벌 내용 ex) 이를 위반할시, 몇년 이하의 징역 또는 몇년 이하의 벌금형에 처할 수 있다."
                  >
                    처벌 내용
                  </TextArea>
                  <TextArea
                    id="case"
                    name="case"
                    value={lawData.case}
                    onChange={handleChange}
                    placeholder="실생활 예시"
                  >
                    실생활 예시
                  </TextArea>
                  <CategoryWrap>
                    <h3>카테고리</h3>
                    <ul>
                      <li>
                        <RadioInput
                          id="house"
                          name="category"
                          checked={lawData.category === "house"}
                          onChange={handleRadioChange}
                        >
                          임대차 / 부동산
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput
                          id="contract"
                          name="category"
                          checked={lawData.category === "contract"}
                          onChange={handleRadioChange}
                        >
                          계약
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput
                          id="work"
                          name="category"
                          checked={lawData.category === "work"}
                          onChange={handleRadioChange}
                        >
                          근로
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput
                          id="transport"
                          name="category"
                          checked={lawData.category === "transport"}
                          onChange={handleRadioChange}
                        >
                          교통
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput
                          id="rights"
                          name="category"
                          checked={lawData.category === "rights"}
                          onChange={handleRadioChange}
                        >
                          권리 / 명예
                        </RadioInput>
                      </li>
                      <li>
                        <RadioInput
                          id="finance"
                          name="category"
                          checked={lawData.category === "finance"}
                          onChange={handleRadioChange}
                        >
                          금전 / 사기
                        </RadioInput>
                      </li>
                    </ul>
                  </CategoryWrap>
                  <button type="submit">수정</button>
                </form>
              </>
            )}
          </FormWrap>
        </section>
      </main>
    </>
  );
}

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
