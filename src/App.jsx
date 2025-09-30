import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminOutlet from "./admin/AdminOutlet";

export default function App() {
  return (
    <>
      <GlobalStyle />

      <>
        <Routes>
          <Route path="/auth/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminOutlet/>} />
        </Routes>
      </>
    </>
  );
}
