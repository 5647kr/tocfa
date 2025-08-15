import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminPost from "./admin/AdminPost";
import AdminUpdate from "./admin/AdminUpdate";
import UserHome from "./user/UserHome";
import Protected from "./components/Protected";
import Admin from "./admin/Admin";

function App() {
  const location = useLocation();
  const hidePage = location.pathname === "/admin";

  const session = localStorage.getItem("sb-gbsjttwoeqeidstgcgcv-auth-token");
  return (
    <>
      <GlobalStyle />
      {!hidePage && <Header />}
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <Protected session={session}>
              <Admin />
            </Protected>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="post" element={<AdminPost />} />
          <Route path="update/:id" element={<AdminUpdate />} />
        </Route>

        <Route path="/" element={<UserHome />} />
      </Routes>
    </>
  );
}
export default App;
