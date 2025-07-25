import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./admin/Login";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
