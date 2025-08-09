import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import GlobalStyle from "./styles/GlobalStyle";
import AdminHome from "./admin/AdminHome";
import UserHome from "./user/UserHome";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        {/* <Route path="/admin" element={<AdminHome />} />
        <Route path="/" element={<UserHome />} /> */}
      </Routes>
    </>
  );
}
export default App;
