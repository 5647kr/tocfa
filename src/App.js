import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import sessionStore from "./store/SessionStore";
import Admin from "./admin/Admin";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminPost from "./admin/AdminPost";
import AdminUpdate from "./admin/AdminUpdate";
import Protected from "./components/Protected";
import UserHome from "./pages/Home/UserHome";
import UserNotice from "./pages/Notice/UserNotice";
import UserNoticeDetail from "./pages/Notice/UserNoticeDetail";



function App() {
  const { session } = sessionStore();

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <Protected session={session}>
              <Admin />
            </Protected>
          }
        >
          <Route path="" element={<AdminHome />} />
          <Route path="post" element={<AdminPost />} />
          <Route path="update/:id" element={<AdminUpdate />} />
        </Route>


        <Route path="/" element={<UserHome />} />
        <Route path="/notice" element={<UserNotice />} />
        <Route path="/notice/:id" element={<UserNoticeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
