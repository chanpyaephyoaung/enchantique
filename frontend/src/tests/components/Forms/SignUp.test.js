import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import SignUpPage from "../../../screens/SignUpPage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test Sign Up Form", () => {
   it("renders sign up form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <SignUpPage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const usernameInput = screen.getByPlaceholderText("Username");
      const emailAddressInput = screen.getByPlaceholderText("Email Address");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const telephoneNumInput = screen.getByPlaceholderText("Telephone Number");
      const submitBtn = screen.getByRole("button", { name: "Sign Up" });

      expect(heading).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(emailAddressInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(telephoneNumInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
   });
});
