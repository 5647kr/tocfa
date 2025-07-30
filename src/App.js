import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./admin/Login";
import Admin from "./admin/Admin";
import Post from "./admin/Post";
import Update from "./admin/Update";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/post" element={<Post />} />
        <Route path="/admin/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
