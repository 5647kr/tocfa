import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import styled from "styled-components";
import useTypeStore from "../store/TypeStore";

function Header() {
  const { userType, setUserType, getMenu, menuList } = useTypeStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setUserType("admin");
    } else {
      setUserType("user");
    }
  }, [location.pathname, userType]);

  console.log(userType)

  // 메뉴 가져오기
  useEffect(() => {
    getMenu();
  }, [userType]);

  // 현재 경로가 admin인지 판단
  const isAdmin = location.pathname.startsWith("/admin");

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
        {isAdmin ? (
          <LogOutWrap>
            <button>로그아웃</button>
          </LogOutWrap>
        ) : (
          <ul>
            {menuList.map((v) => (
              <li key={v.id}>
                <Link to={`/laws/${v.engName}`}>{v.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </NavLink>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  width: 100%;
  background-color: var(--white-color);
  box-shadow: 0 2px 4px var(--sub-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const HeaderTitle = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 4rem;
    aspect-ratio: 1 / 1;
    vertical-align: top;
  }

  @media screen and (min-width: 1024px) {
    height: 8rem;
    justify-content: flex-start;
  }
`;

const LogOutWrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavLink = styled.div`
  width: 100%;
  height: 6rem;
  & ul {
    height: inherit;
    display: flex;
  }
  & ul li {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & ul li a {
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 1024px) {
    height: 8rem;
    & ul li {
      width: 120px;
    }
    & ul li a {
      height: 8rem;
      font-size: var(--font-ssz);
    }
  }
`;

export { Header };
