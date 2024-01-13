import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import AdminProductDashboard from "../../../../components/Admin/AdminProductDashboard.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test AdminProductDashboard Component", () => {
   it("renders admin dashboard links", () => {
      render(
         <BrowserRouter>
            <AdminProductDashboard />
         </BrowserRouter>
      );

      // Check whether the links are rendered properly
      const createNewProdLink = screen.getByRole("link", { name: /Create New Product/i });
      const prodListLink = screen.getByRole("link", { name: /Product List/i });

      expect(createNewProdLink).toBeInTheDocument();
      expect(prodListLink).toBeInTheDocument();
   });

   it("links navigate to the correct routes", () => {
      render(
         <BrowserRouter>
            <AdminProductDashboard />
         </BrowserRouter>
      );

      // Check whether the links have correct routes
      const createNewProdLink = screen.getByRole("link", { name: /Create New Product/i });
      const prodListLink = screen.getByRole("link", { name: /Product List/i });

      expect(createNewProdLink.getAttribute("href")).toBe("/admin/products/new");
      expect(prodListLink.getAttribute("href")).toBe("/admin/products/list");
   });

   it("navigate to 'admin/orders' when the 'orders' link is clicked", async () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminProductDashboard />
         </BrowserRouter>
      );

      const ordersLink = screen.getByRole("link", { name: /Create New Product/i });

      fireEvent.click(ordersLink);

      // Check if the route is navigated to /admin/products/new
      await waitFor(() => {
         expect(window.location.pathname).toBe("/admin/products/new");
      });
   });

   it("navigate to 'admin/products' when the 'products' link is clicked", async () => {
      render(
         <BrowserRouter>
            <AdminProductDashboard />
         </BrowserRouter>
      );

      const productsLink = screen.getByRole("link", { name: /Product List/i });

      fireEvent.click(productsLink);

      // Check if the route is navigated to /admin/products/list
      await waitFor(() => {
         expect(window.location.pathname).toBe("/admin/products/list");
      });
   });
});
