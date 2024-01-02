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
import ShoppingCartScreen from "./screens/ShoppingCartScreen.jsx";
import SignInPage from "./screens/SignInPage.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index={true} element={<HomePage />} />
         <Route path="/product/:productId" element={<ProductDetailPage />} />
         <Route path="/shopping-cart" element={<ShoppingCartScreen />} />
         <Route path="/signin" element={<SignInPage />} />
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
