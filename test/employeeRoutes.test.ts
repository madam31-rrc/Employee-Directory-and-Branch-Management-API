import request from "supertest";
import app from "../src/app";
import * as empSvc from "../src/api/v1/services/employeeService";
import * as brSvc from "../src/api/v1/services/branchServices";

beforeEach(() => {
  empSvc.resetEmployees();
  brSvc.resetBranches();
});

describe("Employee endpoints", () => {
  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "Test User",
        position: "Tester",
        department: "QA",
        email: "test@example.com",
        phone: "204-000-0000",
        branchId: "1"
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test User");
  });

  it("should 400 when creating with missing params", async () => {
    const res = await request(app).post("/api/v1/employees").send({ name: "NoPhone" });
    expect(res.status).toBe(400);
  });

  it("should get all employees", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(35);
  });

  it("should get employee by id", async () => {
    const resAll = await request(app).get("/api/v1/employees");
    const id = resAll.body[0].id;
    const res = await request(app).get(`/api/v1/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("should return 404 for missing employee id", async () => {
    const res = await request(app).get("/api/v1/employees/non-existent-id");
    expect(res.status).toBe(404);
  });

  it("should update an employee", async () => {
    const all = await request(app).get("/api/v1/employees");
    const id = all.body[0].id;
    const res = await request(app).patch(`/api/v1/employees/${id}`).send({ position: "Senior" });
    expect(res.status).toBe(200);
    expect(res.body.position).toBe("Senior");
  });

  it("should 404 when updating non-existent employee", async () => {
    const res = await request(app).patch("/api/v1/employees/non-id").send({ position: "X" });
    expect(res.status).toBe(404);
  });

  it("should delete an employee", async () => {
    const all = await request(app).get("/api/v1/employees");
    const id = all.body[0].id;
    const res = await request(app).delete(`/api/v1/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should 404 when deleting non-existent employee", async () => {
    const res = await request(app).delete("/api/v1/employees/non-id");
    expect(res.status).toBe(404);
  });

  it("should get employees by branch", async () => {
    const res = await request(app).get("/api/v1/employees/branch/1");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get employees by department", async () => {
    const res = await request(app).get("/api/v1/employees/department/Loans");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
