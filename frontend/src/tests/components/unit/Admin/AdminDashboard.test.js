import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import AdminDashboard from "../../../../components/Admin/AdminDashboard.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test AdminDashboard Component", () => {
   it("renders admin dashboard links", () => {
      render(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      // Check whether the links are rendered properly
      const ordersLink = screen.getByRole("link", { name: /orders/i });
      const productsLink = screen.getByRole("link", { name: /products/i });
      const usersLink = screen.getByRole("link", { name: /users/i });

      expect(ordersLink).toBeInTheDocument();
      expect(productsLink).toBeInTheDocument();
      expect(usersLink).toBeInTheDocument();
   });

   it("links navigate to the correct routes", () => {
      render(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      // Check whether the links have correct routes
      const ordersLink = screen.getByRole("link", { name: /orders/i });
      const productsLink = screen.getByRole("link", { name: /products/i });
      const usersLink = screen.getByRole("link", { name: /users/i });

      expect(ordersLink.getAttribute("href")).toBe("/admin/orders");
      expect(productsLink.getAttribute("href")).toBe("/admin/products");
      expect(usersLink.getAttribute("href")).toBe("/admin/users");
   });

   it("navigate to 'admin/orders' when the 'orders' link is clicked", async () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      const ordersLink = screen.getByRole("link", { name: /orders/i });

      fireEvent.click(ordersLink);

      // Check if the route is navigated to /admin/orders
      await waitFor(() => {
         expect(window.location.pathname).toBe("/admin/orders");
      });
   });

   it("navigate to 'admin/products' when the 'products' link is clicked", async () => {
      render(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      const productsLink = screen.getByRole("link", { name: /products/i });

      fireEvent.click(productsLink);

      // Check if the route is navigated to /admin/products
      await waitFor(() => {
         expect(window.location.pathname).toBe("/admin/products");
      });
   });

   it("navigate to 'admin/users' when the 'users' link is clicked", async () => {
      render(
         <BrowserRouter>
            <AdminDashboard />
         </BrowserRouter>
      );

      const usersLink = screen.getByRole("link", { name: /users/i });

      fireEvent.click(usersLink);

      // Check if the route is navigated to /admin/users
      await waitFor(() => {
         expect(window.location.pathname).toBe("/admin/users");
      });
   });
});
