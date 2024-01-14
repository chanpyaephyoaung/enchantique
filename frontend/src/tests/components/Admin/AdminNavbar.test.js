import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import AdminNavBar from "../../../components/Navbar/AdminNavbar.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test AdminNavbar Component", () => {
   it("renders admin navbar links", () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminNavBar />
         </BrowserRouter>
      );

      // Check whether the links are rendered properly
      const homepageLink = screen.getByRole("link", { name: /Enchantique/i });
      const adminLink = screen.getByRole("link", { name: /Admin/i });
      const signoutLink = screen.getByRole("link", { name: /Sign out/i });

      expect(homepageLink).toBeInTheDocument();
      expect(adminLink).toBeInTheDocument();
      expect(signoutLink).toBeInTheDocument();
   });

   it("navbar links navigate to the correct routes", () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminNavBar />
         </BrowserRouter>
      );

      // Check whether the links have correct routes
      const homepageLink = screen.getByRole("link", { name: /Enchantique/i });
      const adminLink = screen.getByRole("link", { name: /Admin/i });
      const signoutLink = screen.getByRole("link", { name: /Sign out/i });

      expect(homepageLink.getAttribute("href")).toBe("/");
      expect(adminLink.getAttribute("href")).toBe("/");
      expect(signoutLink.getAttribute("href")).toBe("/");
   });

   it("navbar links all navigate to '/' when each link is clicked", async () => {
      renderWithProviders(
         <BrowserRouter>
            <AdminNavBar />
         </BrowserRouter>
      );

      const homepageLink = screen.getByRole("link", { name: /Enchantique/i });
      const adminLink = screen.getByRole("link", { name: /Admin/i });
      const signoutLink = screen.getByRole("link", { name: /Sign out/i });

      fireEvent.click(homepageLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/");
      });

      fireEvent.click(adminLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/");
      });

      fireEvent.click(signoutLink);
      // Check if the route is navigated to /
      await waitFor(() => {
         expect(window.location.pathname).toBe("/");
      });
   });
});
