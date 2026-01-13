import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/home/Home";
import Shop from "../Pages/shop/Shop";
import Checkout from "../Pages/checkout/Checkout";
import Register from "../auth/register/Register";
import Login from "../auth/login/Login";
import Cart from "../Pages/cart/Cart";
import SinglePage from "../Pages/singlepage/SinglePage";
import Header from "../components/header/Header";
import { useAuth } from "../context/AuthContext";
import MakeCategories from "../Pages/createcatgs/MakeCategories";
import UploadProducts from "../Pages/products/UploadProducts";
import Footer from "../components/Footer";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Checking status...</h2>;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

{/* Admin -> To upload products make categories */}

<Route path="/createcate" element={
            <ProtectedRoute>
              <MakeCategories />
            </ProtectedRoute>
          } />

<Route path="/uploadproducts" element={
            <ProtectedRoute>
              <UploadProducts />
            </ProtectedRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
          />
          <Route path="/login" element={

            <PublicRoute>
              <Login />
            </PublicRoute>
          }
          />


        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
