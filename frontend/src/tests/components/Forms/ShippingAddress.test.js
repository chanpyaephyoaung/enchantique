import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import ShippingAddressPage from "../../../screens/ShippingAddressPage.jsx";
import { BrowserRouter } from "react-router-dom";

describe("Test Shipping Address Form", () => {
   it("renders shipping address form inputs and submit button", () => {
      renderWithProviders(
         <BrowserRouter>
            <ShippingAddressPage />
         </BrowserRouter>
      );

      // Check whether the elements are rendered properly
      const heading = screen.getByTestId("heading");
      const firstLineAddr = screen.getByText("First Line of Address");
      const secondLineAddr = screen.getByText("Second Line of Address");
      const postalcode = screen.getByText("Postal Code");
      const shippingAddr = screen.getByText("Shipping Address");
      const city = screen.getByText("City");
      const submitBtn = screen.getByRole("button", { name: "Confirm" });

      expect(heading).toBeInTheDocument();
      expect(firstLineAddr).toBeInTheDocument();
      expect(secondLineAddr).toBeInTheDocument();
      expect(postalcode).toBeInTheDocument();
      expect(shippingAddr).toBeInTheDocument();
      expect(city).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
   });
});
