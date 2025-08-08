import { useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import useTypeStore from "../store/TypeStore";

function Header(userType) {
  const { setUserType, getMenu, menuList } = useTypeStore();
  useEffect(() => {
    setUserType(userType);
    getMenu();
  }, [getMenu]);

  console.log(menuList);

  return (
    <HeaderWrap>
      <HeaderTitle>
        <h1>
          <Link to="/">
            <img src="/assets/img/logo.png" alt="tocfa 로고" />
          </Link>
        </h1>
      </HeaderTitle>
      <NavLink>
        <ul>
          {userType === "admin"
            ? menuList.map((v) => {
                return (
                  <li key={v.id}>
                    <button>v.name</button>
                  </li>
                );
              })
            : menuList.map((v) => {
                return (
                  <li key={v.id}>
                    <Link to={`/laws/${v.engName}`}>{v.name}</Link>
                  </li>
                );
              })}
        </ul>
      </NavLink>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  box-shadow: 0 2px 4px var(--sub-color);
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const HeaderTitle = styled.div`
  width: 100%;
  height: 6rem;
  /* box-shadow: inset 0 0 10px red; */
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 4rem;
    aspect-ratio: 1 / 1;
    vertical-align: top;
  }

  @media screen and (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const NavLink = styled.nav`
  /* box-shadow: inset 0 0 10px blue; */
  width: 100%;
  height: 6rem;
  & ul {
    height: inherit;
    display: flex;
    /* box-shadow: inset 0 0 10px red; */
  }
  & ul li {
    /* box-shadow: inset 0 0 10px green; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 1024px) {
    & ul li {
      width: 140px;
    }
    & ul li a {
      font-size: var(--font-ssz);
    }
  }
`;

export { Header };
