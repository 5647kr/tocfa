import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminNav from "../components/AdminNav";

export default function AdminOutlet() {
  const [isMobile, setIsMobile] = useState(false);
  const [navActive, setNavActive] = useState(false);

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

  return (
    <>
      {isMobile && <AdminHeader handleNav={handleNav} />}
      <main>
        {navActive && <AdminNav handleCloseNav={handleCloseNav} />}
        <Outlet />
      </main>
    </>
  );
}
