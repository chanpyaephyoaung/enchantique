import React from "react";
import ReactDOM from "react-dom/client";
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.js";
import HomePage from "./screens/HomePage.jsx";
import reportWebVitals from "./reportWebVitals.js";
import ProductDetailPage from "./screens/ProductDetailPage.jsx";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<App />}>
         <Route index={true} element={<HomePage />} />
         <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Route>
   )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
