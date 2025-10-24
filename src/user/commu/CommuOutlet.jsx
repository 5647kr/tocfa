import { useState } from "react";
import styled from "styled-components";
import CommuEvent from "./event/CommuEvent";
import CommuFaq from "./faq/CommuFaq";
import CommuQna from "./qna/CommuQna";

export default function CommuOutlet() {
  const [activeMenu, setActiveMenu] = useState("event");

  const handleActiveMenu = (value) => {
    setActiveMenu(value);
  };

  return (
    <>
      <title>StarScope 이벤트</title>
      <h1 className="a11y-hidden">StarScope 이벤트</h1>

      <BtnWrap>
        <ul>
          <li>
            <FilterBtn
              value="event"
              $isActive={activeMenu === "event"}
              onClick={(e) => {
                handleActiveMenu(e.target.value);
              }}
            >
              이벤트
            </FilterBtn>
          </li>
          <li>
            <FilterBtn
              value="faq"
              $isActive={activeMenu === "faq"}
              onClick={(e) => {
                handleActiveMenu(e.target.value);
              }}
            >
              FAQ
            </FilterBtn>
          </li>
          <li>
            <FilterBtn
              value="qna"
              $isActive={activeMenu === "qna"}
              onClick={(e) => {
                handleActiveMenu(e.target.value);
              }}
            >
              문의
            </FilterBtn>
          </li>
        </ul>
      </BtnWrap>

      {activeMenu === "event" && <CommuEvent />}
      {activeMenu === "faq" && <CommuFaq />}
      {activeMenu === "qna" && <CommuQna />}
    </>
  );
}

const BtnWrap = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--bg-color);
  z-index: 20;
  grid-column: 1 / -1;
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
