import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminNav from "../components/AdminNav";
import AdminSectionWrap from "../components/AdminSection";
import BoxWrap from "../components/BoxWrap";

export default function AdminOutlet() {
  const [isMobile, setIsMobile] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [isHome, setIsHome] = useState(false);
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
    if (location.pathname === "/admin/home") setIsHome(true);
  }, [location.pathname]);

  return (
    <>
      {isMobile && <AdminHeader handleNav={handleNav} />}
      <main>
        {navActive && <AdminNav handleCloseNav={handleCloseNav} />}

        <AdminSectionWrap>
          <BoxWrap $isHome={isHome}>
            <Outlet />
          </BoxWrap>
        </AdminSectionWrap>
      </main>
    </>
  );
}
