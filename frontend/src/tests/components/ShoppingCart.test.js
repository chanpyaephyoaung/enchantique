import { screen, act, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../helpers/testRenderFunc.js";
import { describe, expect, it } from "@jest/globals";
import ShoppingCartPage from "../../screens/ShoppingCartPage.jsx";
import { BrowserRouter } from "react-router-dom";
import { addProductToCart } from "../../slices/shoppingCartSlice.js";

const mockProduct = {
   _id: "123",
   seller: "admin",
   name: "Test Product",
   price: 20,
   description: "Test description",
   image: "test_image",
   brandName: "Test",
   category: "Test Category",
   rating: 0,
   stocksCount: 15,
   quantity: 1,
};

describe("Test Shopping Cart Page", () => {
   it("renders elements correctly", () => {
      renderWithProviders(
         <BrowserRouter>
            <ShoppingCartPage />
         </BrowserRouter>
      );

      // Check whether the links are rendered properly
      const heading = screen.getByText(/My Shopping Cart/i);
      const subHeading = screen.getByText(/Your Cart is so empty!/i);
      const goShoppingLink = screen.getByRole("link", { name: /Go Shopping/i });

      expect(heading).toBeInTheDocument();
      expect(subHeading).toBeInTheDocument();
      expect(goShoppingLink).toBeInTheDocument();
   });

   it("renders added product to the shopping cart page", () => {
      const mockStore = renderWithProviders(
         <BrowserRouter>
            <ShoppingCartPage />
         </BrowserRouter>
      );
      const dispatch = mockStore.store.dispatch;

      act(() => {
         dispatch(addProductToCart(mockProduct));
      });

      const stockSelectEl = screen.getByTestId("quantity-select", { name: "quantity" });
      const options = screen.getAllByRole("option", { name: /\d+/ });

      const removeItemLink = screen.getByRole("link", { name: /Remove/i });

      const totalProductsPriceLabel = screen.getByText(/Total Products Price:/i);
      const totalProductsPrice = screen.getByTestId("totalProductsPrice");

      const taxAmountLabel = screen.getByText(/Tax Amount:/i);
      const taxAmount = screen.getByTestId("taxAmount");

      const shippingAmountLabel = screen.getByText(/Shipping Amount:/i);
      const shippingAmount = screen.getByTestId("shippingAmount");

      const subtotalLabel = screen.getByText(/Subtotal/i);
      const subtotal = screen.getByTestId("subtotal");

      const total = screen.getByTestId("total");

      const checkoutBtn = screen.getByRole("button", { name: /Proceed to Checkout/i });

      // Test for test product and its price
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText("$20")).toBeInTheDocument();

      // Test for stock count select element and its length
      expect(stockSelectEl).toBeInTheDocument();
      expect(options.length).toBe(15);

      // Test for removeItemLink
      expect(removeItemLink).toBeInTheDocument();

      // Test for total products price
      expect(totalProductsPriceLabel).toBeInTheDocument();
      expect(totalProductsPrice.textContent).toBe("$20.00");

      // Test for tax amount
      expect(taxAmountLabel).toBeInTheDocument();
      expect(taxAmount.textContent).toBe("$1.00");

      // Test for shipping amount
      expect(shippingAmountLabel).toBeInTheDocument();
      expect(shippingAmount.textContent).toBe("$5.00");

      // Test for subtotal
      expect(subtotalLabel).toBeInTheDocument();
      expect(subtotal.textContent).toBe("Subtotal (1) items:");

      // Test for total
      expect(total.textContent).toBe("$26.00");

      // Test for checkout button
      expect(checkoutBtn).toBeInTheDocument();
   });

   describe("Stock Count Select Component", () => {
      it("selects the correct value on change", async () => {
         const mockStore = renderWithProviders(
            <BrowserRouter>
               <ShoppingCartPage />
            </BrowserRouter>
         );
         const dispatch = mockStore.store.dispatch;

         act(() => {
            dispatch(addProductToCart(mockProduct));
         });

         const stockSelectEl = screen.getByTestId("quantity-select", { name: "quantity" });

         // Select a value from the dropdown
         fireEvent.change(stockSelectEl, { target: { value: "12" } });

         // Check if the selected value is correct
         await waitFor(() => expect(stockSelectEl.value).toBe("12"));
      });
   });
});
