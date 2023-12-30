import { assert } from "chai";
import { sum } from "../sum.js";

describe("Test the sum fuction", () => {
   it("3 + 1 should equal to 4", () => {
      assert.equal(sum(3, 1), 4, "Wrong sum result!");
   });
});
