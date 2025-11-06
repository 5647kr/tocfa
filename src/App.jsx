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
import HomePost from "./admin/home/HomePost";
import UserOutlet from "./user/UserOutlet";
import UserProduct from "./user/product/UserProduct";
import UserProductDetail from "./user/product/UserProductDetail";
import UserStore from "./user/store/UserStore";
import CommuOutlet from "./user/commu/CommuOutlet";
import CommuEventDetail from "./user/commu/event/CommuEventDetail";
import UserHome from "./user/home/UserHome";
import UserBrand from "./user/brand/UserBrand";


export default function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        {/* 사용자용  */}
        <Route path="/" element={<UserOutlet />}>
          <Route path="" element={<UserHome />} />
          <Route path="brand" element={<UserBrand />} />
          <Route path="product" element={<UserProduct />} />
          <Route path="product/:id" element={<UserProductDetail />} />
          <Route path="store" element={<UserStore />} />
          <Route path="commu" element={<CommuOutlet />} />
          <Route path="commu/event/:id" element={<CommuEventDetail />} />
        </Route>

        {/* 관리자용 */}
        <Route path="/auth/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminOutlet />}>
          <Route path="home" element={<HomePost />} />
          <Route path="product" element={<ProductPost />} />
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update/:id" element={<ProductCreate />} />
          <Route path="store" element={<StorePost />} />
          <Route path="store/create" element={<StoreCreate />} />
          <Route path="store/update/:id" element={<StoreCreate />} />
          <Route path="event" element={<EventPost />} />
          <Route path="event/create" element={<EventCreate />} />
          <Route path="event/update/:id" element={<EventCreate />} />
          <Route path="faq" element={<FaqPost />} />
          <Route path="faq/create" element={<FaqCreate />} />
          <Route path="faq/update/:id" element={<FaqCreate />} />
        </Route>
      </Routes>
    </>
  );
}
