import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import usePostStore from "../../store/postStore";
import Loading from "../../components/Loading";
import { Sparkles } from "lucide-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorBox from "../../components/ErrorBox";
import ConfirmWrap from "../../components/ConfirmWrap";
import { FullWrap, GridWrap } from "../../components/SectionWrap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserStore() {
  const { store_store, readPost, createPost } = usePostStore();
  const [activeMenu, setActiveMenu] = useState("store");
  const [errorMessage, setErrorMessage] = useState("");
  const [successReq, setSuccessReq] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (store_store.length === 0) {
      readPost("store_store");
    }
  }, [store_store, readPost]);

  const handleActiveMenu = (value) => {
    setActiveMenu(value);
  };

  const handleBusinessSubmit = async (e) => {
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
    if (!data.storename.trim()) {
      setErrorMessage("지점명을 입력해주세요.");
      return;
    }
    if (!data.storelocation.trim()) {
      setErrorMessage("희망창업지역을 입력해주세요.");
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
      await createPost(data, "store_business");
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

  if (!store_store.length === 0) return <Loading />;

  return (
    <>
      <title>
        {`StarScope ${activeMenu === "store" ? "오프라인 매장" : "창업문의"}`}
      </title>
      <h1 className="a11y-hidden">오프라인 매장</h1>

      <BtnWrap>
        <ul>
          <li>
            <FilterBtn
              value="store"
              $isActive={activeMenu === "store"}
              onClick={(e) => {
                handleActiveMenu(e.target.value);
              }}
            >
              매장 목록
            </FilterBtn>
          </li>
          <li>
            <FilterBtn
              value="business"
              $isActive={activeMenu === "business"}
              onClick={(e) => {
                handleActiveMenu(e.target.value);
              }}
            >
              창업 문의
            </FilterBtn>
          </li>
        </ul>
      </BtnWrap>

      {activeMenu === "store" ? (
        <StoreListWrap>
          <ul>
            {store_store?.map((store, index) => (
              <li
                key={store?.id}
                data-aos="fade-right"
                data-aos-delay={100 * index}
                data-aos-duration="600"
              >
                <h2>{store?.title}</h2>
                <p>{store?.location}</p>
                <p>
                  영업시간: {store?.open} ~ {store?.close}
                </p>
              </li>
            ))}
          </ul>
        </StoreListWrap>
      ) : (
        <>
          {errorMessage && (
            <ErrorWrap>
              <ErrorBox>{errorMessage}</ErrorBox>
            </ErrorWrap>
          )}

          <BusinessWrap>
            <BusinessForm ref={formRef} onSubmit={handleBusinessSubmit}>
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
                  <label htmlFor="storename">지점명</label>
                </InputTitleWrap>
                <Input
                  type="text"
                  id="storename"
                  name="storename"
                  autoComplete="off"
                  placeholder="지점명을 입력해주세요."
                />
              </div>
              <div
                data-aos="fade-right"
                data-aos-delay="500"
                data-aos-duration="800"
              >
                <InputTitleWrap>
                  <Sparkles />
                  <label htmlFor="storelocation">창업희망지역</label>
                </InputTitleWrap>
                <Input
                  type="text"
                  id="storelocation"
                  name="storelocation"
                  autoComplete="off"
                  placeholder="창업희망지역을 입력해주세요."
                />
              </div>
              <div
                data-aos="fade-right"
                data-aos-delay="600"
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
            </BusinessForm>
          </BusinessWrap>

          {successReq && (
            <ConfirmBox>
              <h3>신청이 완료되었습니다.</h3>

              <Button type="button" onClick={handleClickConfirm}>
                닫기
              </Button>
            </ConfirmBox>
          )}
        </>
      )}
    </>
  );
}

const BtnWrap = styled(FullWrap)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--bg-color);
  z-index: 20;
  & > ul {
    display: flex;
    justify-content: center;
  }
  & li {
    width: 8rem;
  }
`;

const FilterBtn = styled.button`
  width: 100%;
  height: 4rem;
  font-size: var(--font-sz);
  color: ${({ $isActive }) =>
    $isActive ? "var(--text-color)" : "var(--stroke-color)"};
  font-weight: ${({ $isActive }) =>
    $isActive ? "var(--font-bw)" : "var(--font-rw)"};
`;

const StoreListWrap = styled(GridWrap)`
  margin-top: 4rem;
  & li {
    box-shadow: 0 5px 15px var(--stroke-color);
    border-radius: 1rem;
    padding: 2rem;
    background-color: var(--white-color);
  }
  & li ~ li {
    margin-top: 2rem;
  }
  & h2 {
    font-size: var(--font-smz);
    font-weight: var(--font-mw);
  }
  & p {
    font-size: var(--font-sz);
    color: var(--stroke-color);
    font-weight: var(--font-mw);
    margin-top: 1rem;
  }
`;

const ErrorWrap = styled(GridWrap)`
  margin-top: 4rem;
`;

const BusinessWrap = styled(GridWrap)`
  margin-top: 4rem;
`;

const BusinessForm = styled.form`
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
