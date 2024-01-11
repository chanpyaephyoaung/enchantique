import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import "./index.css";
import App from "./App.js";
import HomePage from "./screens/HomePage.jsx";
import reportWebVitals from "./reportWebVitals.js";
import ProductDetailPage from "./screens/ProductDetailPage.jsx";
import ShoppingCartPage from "./screens/ShoppingCartPage.jsx";
import SignInPage from "./screens/SignInPage.jsx";
import SignUpPage from "./screens/SignUpPage.jsx";
import ShippingAddressPage from "./screens/ShippingAddressPage.jsx";
import CheckoutPage from "./screens/CheckoutPage.jsx";
import AdminProtectedComponent from "./components/UI/AdminProtectedComponent.jsx";
import ProtectedComponent from "./components/UI/ProtectedComponent.jsx";
import OrderPage from "./screens/OrderPage.jsx";
import OrderCancelPage from "./screens/OrderCancelPage.jsx";
import UserProfilePage from "./screens/UserProfilePage.jsx";
import UserProfileUpdatePage from "./screens/UserProfileUpdatePage.jsx";
import OrdersPage from "./screens/admin/OrdersPage.jsx";
import ProductsPage from "./screens/admin/ProductsPage.jsx";
import AdminProductsPage from "./screens/admin/AdminProductsPage.jsx";
import AdminCreateProductPage from "./screens/admin/AdminCreateProductPage.jsx";
import UsersPage from "./screens/admin/UsersPage.jsx";
import NotificationsPage from "./screens/NotificationsPage.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index={true} element={<HomePage />} />
         <Route path="/product/:productId" element={<ProductDetailPage />} />
         <Route path="/shopping-cart" element={<ShoppingCartPage />} />
         <Route path="/signin" element={<SignInPage />} />
         <Route path="/signup" element={<SignUpPage />} />

         <Route path="" element={<ProtectedComponent />}>
            <Route path="/account-profile" element={<UserProfilePage />} />
            <Route path="/account-profile/update" element={<UserProfileUpdatePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route path="/order/:orderId/cancel" element={<OrderCancelPage />} />
            <Route path="/user/:userId/notifications" element={<NotificationsPage />} />
         </Route>

         <Route path="" element={<AdminProtectedComponent />}>
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/list" element={<ProductsPage />} />
            <Route path="/admin/products/new" element={<AdminCreateProductPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
         </Route>
      </Route>
   )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
