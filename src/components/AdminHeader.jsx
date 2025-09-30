import styled from "styled-components";
import { Menu } from "lucide-react";

export default function AdminHeader({ handleNav }) {
  return (
    <HeaderWrap>
      <button onClick={handleNav}>
        <Menu />
      </button>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  width: 100%;
  height: 6rem;
  padding-inline: 1.6rem;
  display: flex;
  align-items: center;
  @media screen and (min-width: 481px) and (max-width: 768px) {
    padding-inline: 2rem;
  }
  @media screen and (min-width: 769px) {
    display: none;
  }
`;
