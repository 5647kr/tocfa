import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminPost from "./admin/AdminPost";
import AdminUpdate from "./admin/AdminUpdate";
import Protected from "./components/Protected";
import Admin from "./admin/Admin";
import UserHome from "./user/UserHome";
import UserNotice from "./user/UserNotice";
import UserNoticeDetail from "./user/UserNoticeDetail";
import UserLaws from "./user/UserLaws";
import UserLawsDetail from "./user/UserLawsDetail";

function App() {
  const location = useLocation();
  const hidePage = location.pathname === "/tocfa/admin";

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
        <Route path="/notice" element={<UserNotice />} />
        <Route path="/notice/:id" element={<UserNoticeDetail />} />
        <Route path="/laws/:id/" element={<UserLaws />} />
        <Route path="/laws/:id/:id" element={<UserLawsDetail />} />
      </Routes>
    </>
  );
}
export default App;
