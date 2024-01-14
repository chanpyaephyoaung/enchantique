import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductPreview from "../../../components/Products/ProductPreview";
import { describe, expect, it } from "@jest/globals";

describe("Test ProductPreview Component", () => {
   it("render product preview component with correct props and data", () => {
      const mockProdObj = {
         id: 1,
         name: "Product Test",
         image: "/images/product_test.jpg",
         price: 10,
         rating: 4,
         reviewsCount: 10,
      };
      const { getByTestId } = render(
         <BrowserRouter>
            <ProductPreview
               id={mockProdObj.id}
               name={mockProdObj.name}
               imagePath={mockProdObj.image}
               price={mockProdObj.price}
               rating={mockProdObj.rating}
               reviewsCount={mockProdObj.reviewsCount}
            />
         </BrowserRouter>
      );

      const prodImgLink = getByTestId("productImgLink");
      const prodNameLink = getByTestId("productNameLink");
      const prodImg = getByTestId("productImg");
      const prodPrice = getByTestId("productPrice");

      const ratingComp = getByTestId("ratingComp");

      expect(prodImgLink).toHaveAttribute("href", `/product/${mockProdObj.id}`);
      expect(prodNameLink).toHaveAttribute("href", `/product/${mockProdObj.id}`);
      expect(prodImg).toHaveAttribute("src", mockProdObj.image);
      expect(prodPrice.textContent.slice(1)).toBe(mockProdObj.price.toFixed(2));

      expect(ratingComp).toBeInTheDocument();
   });
});
