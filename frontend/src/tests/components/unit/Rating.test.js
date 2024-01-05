import { render } from "@testing-library/react";
import Rating from "../../../components/UI/Rating.jsx";
import { describe, expect, it } from "@jest/globals";

describe("Test Rating Component", () => {
   it("render rating component with correct props and data", () => {
      const mockRatingVal = 4.5;
      const mockReviewsCount = 15;

      const { getByTestId } = render(
         <Rating ratingVal={mockRatingVal} reviewsCount={mockReviewsCount} />
      );

      const ratingValEl = getByTestId("ratingVal");
      const reviewCountsEl = getByTestId("reviewsCount");

      expect(ratingValEl.textContent).toBe(mockRatingVal.toString());
      expect(reviewCountsEl.textContent).toBe(`${mockReviewsCount} reviews`);
   });
});
