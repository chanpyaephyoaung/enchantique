import { screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../helpers/testRenderFunc.js";
import ProductList from "../../../components/Products/ProductList.jsx";
import { it, expect, beforeEach } from "@jest/globals";

const mockApi = new MockAdapter(axios);

beforeEach(() => {
   mockApi.reset(); // Reset mock adapter before each test
});

it("renders product list", async () => {
   // Mock the API response
   mockApi.onGet("/api/products").reply(200, [
      {
         _id: "1",
         name: "Product 1",
         image: "/images/product1.jpg",
         price: 20,
         rating: 4.5,
      },
   ]);

   axios.get("/api/products").then(function (response) {
      console.log(response.data);
   });

   renderWithProviders(<ProductList />);

   // Wait for the API call to complete
   await waitFor(() => screen.getByText("Product 1").toBeInTheDocument());

   // Verify that the product list is rendered
   expect(screen.getByText("Product 1")).toBeInTheDocument();
});
