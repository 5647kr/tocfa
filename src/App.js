import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminPost from "./admin/AdminPost";
import AdminUpdate from "./admin/AdminUpdate";
import UserHome from "./user/UserHome";


function App() {
  const location = useLocation();
  const hidePage = location.pathname === "/admin";
  return (
    <>
      <GlobalStyle />
      {!hidePage && <Header />}
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/post" element={<AdminPost />} />
        <Route path="/admin/update/:id" element={<AdminUpdate />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </>
  );
}
export default App;
