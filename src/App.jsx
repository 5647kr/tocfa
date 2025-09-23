import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import LoginPage from "./admin/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
