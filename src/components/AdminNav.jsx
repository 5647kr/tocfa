import { useEffect } from "react";
import useMenuStore from "../store/menuStore";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Home, Package, Store, MessagesSquare, X } from "lucide-react";
import Button from "./Button";
import { LogOut } from "../api/Log";

export default function AdminNav({ handleCloseNav }) {
  const navigate = useNavigate();
  const { menus, getMenu } = useMenuStore();
  const info = JSON.parse(
    localStorage.getItem("sb-gbsjttwoeqeidstgcgcv-auth-token")
  );

  useEffect(() => {
    if (menus.length > 0) return;
    getMenu();
  }, [getMenu, menus.length]);

  const mainMenuIcon = (menu) => {
    switch (menu) {
      case "Home":
        return <Home />;
      case "Product":
        return <Package />;
      case "Store":
        return <Store />;
      case "Commu":
        return <MessagesSquare />;
      default:
        return null;
    }
  };

  const handleLogOut = async () => {
    const { error } = await LogOut();
    console.log(error);
    navigate("/auth/login");
  };

  return (
    <NavWrap>
      <div>
        <MainMenu>
          {menus?.map((menu) => (
            <li key={menu.id}>
              <div>
                {mainMenuIcon(menu.title)}
                {menu.url ? (
                  <Link to={menu.url}>{menu.title}</Link>
                ) : (
                  <span>{menu.title}</span>
                )}
              </div>
              {menu.subMenu ? (
                <SubMenu>
                  {menu.subMenu.map((menu) => (
                    <li key={menu.id}>
                      <Link to={menu.url}>{menu.title}</Link>
                    </li>
                  ))}
                </SubMenu>
              ) : null}
            </li>
          ))}
        </MainMenu>
        <LogWrap>
          <p>{info.user.email}</p>
          <Button onClick={handleLogOut}>LogOut</Button>
        </LogWrap>
      </div>
      <button onClick={handleCloseNav}>
        <X />
      </button>
    </NavWrap>
  );
}

const NavWrap = styled.nav`
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--white-color);
  padding-block: 4rem;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & > button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  @media screen and (min-width: 769px) {
    & > button {
      display: none;
    }
  }

  @media screen and (min-width: 769px) {
    & {
      position: relative;
      grid-column: 1 / 3;
    }
  }
`;

const MainMenu = styled.ul`
  & > li {
    background-color: var(--boxBg-color);
  }
  & > li > div {
    display: flex;
    align-items: center;
    padding-inline: 1.2rem;
  }
  & svg {
    stroke: var(--white-color);
  }
  & a,
  span {
    width: 100%;
    padding: 1.2rem;
    font-size: 1.4rem;
    color: var(--white-color);
    font-weight: var(--font-mw);
  }
  & span {
    display: block;
  }
`;

const SubMenu = styled.ul`
  display: flex;
  flex-direction: column;
  & li {
    background-color: var(--white-color);
    border-bottom: 1px solid var(--stroke-color);
  }
  & a {
    font-size: 1.2rem;
    font-weight: var(--font-rw);
    padding-inline: 4rem;
    color: var(--text-color);
  }
`;

const LogWrap = styled.div`
  margin-inline: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--stroke-color);
  padding: 2rem;
  height: 10rem;
  position: relative;
  & p {
    font-size: var(--font-sz);
  }
  & button {
    font-size: var(--font-sz);
    font-weight: var(--font-rw);
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;
