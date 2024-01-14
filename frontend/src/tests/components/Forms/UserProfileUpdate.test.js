import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import UserProfileUpdatePage from "../../../screens/UserProfileUpdatePage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test User Profile Update Form", () => {
   it("renders user profile update form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <UserProfileUpdatePage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const usernameInput = screen.getByPlaceholderText("Username");
      const emailAddressInput = screen.getByPlaceholderText("Email Address");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const telephoneNumInput = screen.getByPlaceholderText("Telephone Number");
      const submitBtn = screen.getByRole("button", { name: "Update" });

      expect(heading).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(emailAddressInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(telephoneNumInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
   });
});
