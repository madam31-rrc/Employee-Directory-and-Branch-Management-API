import request from "supertest";
import app from "../src/app";
import {
    createEmployee }
    createEmployee,
    getAllEmployees, } 
    from "../src/api/v1/controllers/employeeController"

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getAllEmployees: jest.fn((req, res) => res.status(200).send()),
}));

describe("Employee Routes", () => {
@@ -15,17 +17,31 @@ describe("Employee Routes", () => {

    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockItem = {
            interface NewEmployee {
                name: string;
                position: string;
                department: string;
                email: string;
                phone: string;
                branchId: string;
            }
            const mockNewEmployee: NewEmployee = {
                name: "Test Name",
                position: "Test Position",
                department: "Test Department",
                email: "Test Email",
                phone: "Test Phone",
                branchId: "Test Branch Id",
            };

            await request(app).post("/api/v1/employees").send(mockItem);
            await request(app).post("/api/v1/employees").send(mockNewEmployee);
            expect(createEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees");
            expect(getAllEmployees).toHaveBeenCalled();
        });
    });
});