// test/branchValidation.test.ts
import { createBranchSchema } from "../../src/api/v1/validation/branchSchema";

describe("Branch Joi validation (create)", () => {
  it("accepts a valid branch payload", () => {
    const payload = {
      name: "Vancouver Branch",
      address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
      phone: "604-456-0022",
    };

    const { error } = createBranchSchema.validate(payload);
    expect(error).toBeUndefined();
  });

  it("rejects payload with missing/invalid fields", () => {
    const payload = { phone: "abc" }; // missing name/address, phone invalid
    const { error } = createBranchSchema.validate(payload);
    expect(error).toBeDefined();
  });
});
