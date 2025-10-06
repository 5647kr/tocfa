import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminOutlet from "./admin/AdminOutlet";
import EventPost from "./admin/commu/event/EventPost";
import FaqPost from "./admin/commu/faq/FaqPost";
import FaqCreate from "./admin/commu/faq/FaqCreate";
import StorePost from "./admin/store/StorePost";
import StoreCreate from "./admin/store/StoreCreate";

export default function App() {
  return (
    <>
      <GlobalStyle />

      <>
        <Routes>
          <Route path="/auth/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminOutlet />}>
            <Route path="home" element={<EventPost />} />
            <Route path="event" element={<EventPost />} />
            <Route path="store" element={<StorePost />} />
            <Route path="store/create" element={<StoreCreate />} />
            <Route path="store/update/:id" element={<StoreCreate />} />
            <Route path="faq" element={<FaqPost />} />
            <Route path="faq/create" element={<FaqCreate />} />
            <Route path="faq/update/:id" element={<FaqCreate />} />
          </Route>
        </Routes>
      </>
    </>
  );
}
