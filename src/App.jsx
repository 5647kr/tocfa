import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";

export default function App() {
  return (
    <>
      <GlobalStyle />

      <main>
        <Routes>
          <Route path="/auth/login" element={<AdminLogin />} />
        </Routes>
      </main>
    </>
  );
}
