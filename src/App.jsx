import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import AdminLogin from "./admin/AdminLogin";
import AdminOutlet from "./admin/AdminOutlet";
import EventPost from "./admin/commu/event/EventPost";
import EventCreate from "./admin/commu/event/EventCreate";
import FaqPost from "./admin/commu/faq/FaqPost";
import FaqCreate from "./admin/commu/faq/FaqCreate";
import StorePost from "./admin/store/StorePost";
import StoreCreate from "./admin/store/StoreCreate";
import ProductPost from "./admin/product/ProductPost";
import ProductCreate from "./admin/product/ProductCreate";

export default function App() {
  return (
    <>
      <GlobalStyle />

      <>
        <Routes>
          <Route path="/auth/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminOutlet />}>
            <Route path="home" element={<EventPost />} />
            <Route path="product" element={<ProductPost />} />
            <Route path="product/create" element={<ProductCreate />} />
            <Route path="product/update/:id" element={<ProductCreate />} />
            <Route path="store" element={<StorePost />} />
            <Route path="store/create" element={<StoreCreate />} />
            <Route path="store/update/:id" element={<StoreCreate />} />
            <Route path="event" element={<EventPost />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="event/create/:id" element={<EventCreate />} />
            <Route path="faq" element={<FaqPost />} />
            <Route path="faq/create" element={<FaqCreate />} />
            <Route path="faq/update/:id" element={<FaqCreate />} />
          </Route>
        </Routes>
      </>
    </>
  );
}
