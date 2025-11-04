import { useEffect } from "react";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";
import { Outlet, useLocation } from "react-router-dom";


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
      <UserFooter />
    </>
  );
}
