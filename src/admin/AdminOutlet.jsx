import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminNav from "../components/AdminNav";
import styled from "styled-components";

export default function AdminOutlet() {
  const [isMobile, setIsMobile] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const location = useLocation();

  const handleCloseNav = () => {
    setNavActive((navActive) => !navActive);
  };

  const handleNav = () => {
    setNavActive((navActive) => !navActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 768) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    if (location.pathname === "/admin/home") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }

    if (
      location.pathname.includes("create") ||
      location.pathname.includes("update")
    ) {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }
  }, [location.pathname]);

  return (
    <>
      {isMobile && <AdminHeader handleNav={handleNav} />}
      <main>
        {navActive && <AdminNav handleCloseNav={handleCloseNav} />}

        <AdminSectionWrap $isHome={isHome} $isCreate={isCreate}>
          <div>
            <Outlet />
          </div>
        </AdminSectionWrap>
      </main>
    </>
  );
}

const AdminSectionWrap = styled.section`
  grid-column: 1 / -1;
  padding-inline: 1.6rem;

  @media screen and (min-width: 468px) and (max-width: 768px) {
    padding-inline: 2rem;
  }
  
  @media screen and (min-width: 769px) {
    margin-left: 24rem;
    padding-inline: 2.4rem;
  }


  & > div {
    background-color: ${({ $isHome }) =>
      $isHome ? "transparent" : "var(--white-color)"};
    border-radius: ${({ $isHome }) => ($isHome ? "none" : "1rem")};
    padding: ${({ $isHome }) => ($isHome ? "none" : "2rem")};
    box-shadow: ${({ $isHome }) =>
      $isHome ? "none" : "0 5px 15px var(--stroke-color)"};
    min-height: ${({ $isCreate }) =>
      $isCreate ? "calc(100vh - 18rem)" : "none"};
    height: ${({ $isCreate }) => ($isCreate ? "none" : "calc(100vh - 18rem)")};
    @media screen and (min-width: 769px) {
      min-height: ${({ $isCreate }) =>
        $isCreate ? "calc(100vh - 16rem)" : "none"};
      height: ${({ $isCreate }) =>
        $isCreate ? "none" : "calc(100vh - 16rem)"};
    }
  }
`;
