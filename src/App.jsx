import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productinfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cartPage/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashBoard from "./pages/user/UserDashBoard";
import Admin from "./pages/admin/Admin";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Mystate from "./context/Mystate";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import CategoryPage from "./pages/category/CategoryPage";
function App() {
  return (
    <Mystate>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/*" element={<NoPage />}></Route>
          <Route path="/productinfo/:id" element={<ProductInfo />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/allproduct" element={<AllProduct />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/category/:categoryname"
            element={<CategoryPage />}
          ></Route>
          <Route
            path="/userdashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashBoard />
              </ProtectedRouteForUser>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRouteForAdmin>
                <Admin />
              </ProtectedRouteForAdmin>
            }
          ></Route>
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          ></Route>
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          ></Route>
        </Routes>
        <Toaster />
      </Router>
    </Mystate>
  );
}

export default App;
