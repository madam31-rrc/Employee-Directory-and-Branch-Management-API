// test/employeeValidation.test.ts
import { createEmployeeSchema } from "../../src/api/v1/validation/employeeSchema";

describe("Employee Joi validation (create)", () => {
  it("accepts a valid employee payload", () => {
    const payload = {
      name: "Test Name",
      position: "Teller",
      department: "Operations",
      email: "test.name@example.com",
      phone: "604-555-0000",
      branchId: "1",
    };

    const { error } = createEmployeeSchema.validate(payload);
    expect(error).toBeUndefined();
  });

  it("rejects payload missing required fields", () => {
    const payload = { position: "Teller" };
    const { error } = createEmployeeSchema.validate(payload);
    expect(error).toBeDefined();
  });
});
