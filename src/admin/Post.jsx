import { useState } from "react";
import styled from "styled-components";
import { BackHeader } from "../components/Header";
import PostType from "../components/PostType";

export default function Post() {
  const [isNotice, setIsNotice] = useState(true);

  return (
    <>
      <BackHeader />
      <main>
        <section>
          <PostWrap>
            <PostType isNotice={isNotice} setIsNotice={setIsNotice} />

            <FormWrap>
              {isNotice ? (
                <>
                  <h2>공지사항 작성</h2>
                  <form>
                    <div>
                      <label>제목</label>
                      <input type="text" placeholder="공지사항 제목" />
                    </div>
                    <div>
                      <label>내용</label>
                      <textarea placeholder="공지사항 내용" />
                    </div>
                    <button>등록</button>
                  </form>
                </>
              ) : (
                <>
                  <h2>법률정보 작성</h2>
                  <form>
                    <div>
                      <label>제목</label>
                      <input
                        type="text"
                        placeholder="제목 | ex) 대한민국의 주권은?"
                      />
                    </div>
                    <div>
                      <label>관련 법 조항</label>
                      <input
                        type="text"
                        placeholder="관련 법 조항 | ex) 헌법 1조 2항"
                      />
                    </div>
                    <div>
                      <label>조항 내용</label>
                      <textarea placeholder="관련 법 조항 | ex) 대한민국의 주권은 국민에게 있다." />
                    </div>
                    <div>
                      <label>처벌 내용</label>
                      <textarea placeholder="처벌 내용 | ex) 이를 위반할시, 몇년 이하의 징역 또는 몇년 이하의 벌금형에 처할 수 있다." />
                    </div>
                    <div>
                      <label>실생활 예시</label>
                      <textarea placeholder="실생활 예시" />
                    </div>
                    <div>
                      <label>카테고리</label>
                      <CategoryList>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="house"
                          />
                          <label htmlFor="house">임대차 / 부동산</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="contract"
                          />
                          <label htmlFor="contract">계약</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="work"
                          />
                          <label htmlFor="work">근로 / 노동</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="traffic"
                          />
                          <label htmlFor="traffic">교통</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="rights"
                          />
                          <label htmlFor="rights">권리 / 명예</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            className="a11y-hidden"
                            name="category"
                            id="money"
                          />
                          <label htmlFor="money">금전 / 사기</label>
                        </li>
                      </CategoryList>
                    </div>
                    <button>등록</button>
                  </form>
                </>
              )}
            </FormWrap>
          </PostWrap>
        </section>
      </main>
    </>
  );
}

const PostWrap = styled.div`
  padding-top: 40px;
`;

const FormWrap = styled.div`
  border: 1px solid var(--main-color);
  margin-top: 40px;
  padding: 20px 40px 40px;
  border-radius: 10px;
  & h2 {
    text-align: center;
    font-weight: var(--font-bw);
    margin-bottom: 40px;
  }
  & form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  & div {
    display: flex;
    flex-direction: column;
  }
  & input,
  & textarea {
    padding: 10px;
  }

  & textarea {
    height: 200px;
  }

  & button {
    margin-top: 40px;
    width: 100%;
    padding-block: 10px;
  }
`;

const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  & li {
    display: flex;
    align-items: center;
  }

  & label {
    width: 100%;
    padding: 5px 10px;
    border: 1px solid var(--main-color);
    cursor: pointer;
    text-align: center;
  }

  & input:checked + label {
    background-color: var(--shadow-color);
    color: var(--bg-color);
  }
`;
