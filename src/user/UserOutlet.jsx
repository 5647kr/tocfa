import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function UserOutlet() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <UserHeader />
      <main>
        <UserWrap>
          <div>
            <Outlet />
          </div>
        </UserWrap>
      </main>
    </>
  );
}

const UserWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 1.6rem;
  padding-block: 8rem;
  position: relative;
  & > div {
    display: contents;
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    & {
      grid-template-columns: repeat(8, 1fr);
      gap: 0 2rem;
    }
  }

  @media screen and (min-width: 769px) {
    & {
      grid-template-columns: repeat(12, 1fr);
      gap: 0 2.4rem;
    }
  }
`;
