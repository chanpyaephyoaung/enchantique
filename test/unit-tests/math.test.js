import { assert } from "chai";
import { addTwoDecimals, generateSeriesOfNums } from "../../frontend/src/helpers/mathHelpers.js";

describe("Unit test for math-related functions used", () => {
   describe("Test 'addTwoDecimals' function - Round and cut off a value to two decimal place and return a string", () => {
      it("should return a string '9.56' if the input is number 9.555555555", () => {
         assert.isString(addTwoDecimals(9.5));
         assert.equal(addTwoDecimals(9.555555555), "9.56");
      });
      it("should return a string '9.51' if the input is number 9.509000001", () => {
         assert.isString(addTwoDecimals(9.5));
         assert.equal(addTwoDecimals(9.509000001), "9.51");
      });
      it("should return a string '9.00' if the input is number 9", () => {
         assert.isString(addTwoDecimals(9.5));
         assert.equal(addTwoDecimals(9), "9.00");
      });
   });

   describe("Test 'generateSeriesOfNums' function - Generate an array containing a series of numbers from 0 to the input value (positive number)", () => {
      it("should return an empty array if the input value is equal to or less than 0", () => {
         assert.isEmpty(generateSeriesOfNums(-2));
         assert.isEmpty(generateSeriesOfNums(0));
      });
      it("should return an array [0, 1, 2] if the input value is 3", () => {
         assert.isArray(generateSeriesOfNums(3));
         assert.equal(generateSeriesOfNums(3).length, 3);
         assert.equal(generateSeriesOfNums(3)[0], 0);
         assert.equal(generateSeriesOfNums(3)[1], 1);
         assert.equal(generateSeriesOfNums(3)[2], 2);
      });
   });
});
