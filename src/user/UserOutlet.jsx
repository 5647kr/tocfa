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
        <Outlet />
      </main>
    </>
  );
}
