import styled from "styled-components";
import { PartyPopper } from "lucide-react";
import AdminSectionWrap from "../../../components/AdminSection";
import BoxWrap from "../../../components/BoxWrap";
import Button from "../../../components/Button";

export default function EventPost() {
  return (
    <AdminSectionWrap>
      <BoxWrap>
        <TitleWrap>
          <div>
            <PartyPopper />
            <h1>이벤트 목록</h1>
          </div>
          <Button>신규 이벤트 등록</Button>
        </TitleWrap>
      </BoxWrap>
    </AdminSectionWrap>
  );
}

const TitleWrap = styled.div`
  box-shadow: inset 0 0 10px red;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
