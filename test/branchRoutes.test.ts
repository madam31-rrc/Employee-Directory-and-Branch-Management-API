import request from "supertest";
import app from "../src/app";
import * as branchService from "../src/api/v1/services/branchServices";

beforeEach(() => {
  branchService.resetBranches();
});

describe("Branch endpoints", () => {
  it("should create a new branch", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "New Branch",
      address: "1 Road",
      phone: "204-999-9999"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("New Branch");
  });

  it("should 400 when creating branch with missing params", async () => {
    const res = await request(app).post("/api/v1/branches").send({ name: "NoPhone" });
    expect(res.status).toBe(400);
  });

  it("should get all branches", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(10);
  });

  it("should get branch by id", async () => {
    const all = await request(app).get("/api/v1/branches");
    const id = all.body[0].id;
    const res = await request(app).get(`/api/v1/branches/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it("should 404 for missing branch id", async () => {
    const res = await request(app).get("/api/v1/branches/non-id");
    expect(res.status).toBe(404);
  });

  it("should update a branch", async () => {
    const all = await request(app).get("/api/v1/branches");
    const id = all.body[0].id;
    const res = await request(app).patch(`/api/v1/branches/${id}`).send({ address: "New Address" });
    expect(res.status).toBe(200);
    expect(res.body.address).toBe("New Address");
  });

  it("should 404 when updating non-existent branch", async () => {
    const res = await request(app).patch("/api/v1/branches/non-id").send({ address: "X" });
    expect(res.status).toBe(404);
  });

  it("should delete a branch", async () => {
    const all = await request(app).get("/api/v1/branches");
    const id = all.body[0].id;
    const res = await request(app).delete(`/api/v1/branches/${id}`);
    expect(res.status).toBe(200);
  });

  it("should 404 when deleting non-existent branch", async () => {
    const res = await request(app).delete("/api/v1/branches/non-id");
    expect(res.status).toBe(404);
  });
});
