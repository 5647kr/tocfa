import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";

export default function UserHeader() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/brand")) {
      setActiveMenu("Brand");
    } else if (path.includes("/product")) {
      setActiveMenu("Product");
    } else if (path.includes("/store")) {
      setActiveMenu("Store");
    } else if (path.includes("/commu")) {
      setActiveMenu("Commu");
    } else {
      setActiveMenu("");
    }
  }, [location.pathname]);

  return (
    <HeaderWrap>
      <HeroWrap>...</HeroWrap>
      <NavWrap>
        <TitleWrap>
          <h1>
            <Link to={"/"}>StarScope</Link>
          </h1>
        </TitleWrap>

        <NavList>
          <ul>
            <NavItem $isActive={activeMenu === "Brand"}>
              <Link to={"/brand"}>Brand</Link>
            </NavItem>
            <NavItem $isActive={activeMenu === "Product"}>
              <Link to={"/product"}>Product</Link>
            </NavItem>
            <NavItem $isActive={activeMenu === "Store"}>
              <Link to={"/store"}>Store</Link>
            </NavItem>
            <NavItem $isActive={activeMenu === "Commu"}>
              <Link to={"/commu"}>Commu</Link>
            </NavItem>
          </ul>
        </NavList>

        <SearchWrap>...</SearchWrap>
      </NavWrap>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  position: relative;
`;

const HeroWrap = styled.div`
  box-shadow: inset 0 0 10px red;
  aspect-ratio: 1 / 0.4;
  border-radius: 0 0 1rem 1rem;
`;

const NavWrap = styled.nav`
  width: 40rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: var(--boxBg-color);
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ $activeSearch }) => ($activeSearch ? "3rem" : "0")};

  & a {
    color: var(--white-color);
  }

  & > div {
    height: 100%;
  }
`;

const TitleWrap = styled.div`
  & > h1 {
    height: 100%;
    display: flex;
    align-items: center;
  }
  & a {
    font-size: var(--font-smz);
    font-weight: var(--font-bw);
  }
`;

const NavList = styled.div`
  width: 20rem;
  background-color: transparent;
  & > ul {
    height: 100%;
    display: flex;
  }
`;

const NavItem = styled.li`
  width: 100%;
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-sz);
    font-weight: ${({ $isActive }) =>
      $isActive ? "var(--font-bw)" : "var(--font-rw)"};
    text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
  }
`;

const SearchWrap = styled.div``;
