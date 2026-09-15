import { Router } from "express";
import * as ctrl from "../controllers/employeeController";
import { validate } from "../middleware/validate";
import { createEmployeeSchema, updateEmployeeSchema, idParamSchema } from "../validation/employeeSchema";

const router = Router();

router.post("/", validate(createEmployeeSchema), ctrl.createEmployee);
router.get("/", ctrl.getAllEmployees);
router.get("/branch/:branchId", ctrl.getEmployeesByBranch);
router.get("/department/:department", ctrl.getEmployeesByDepartment);
router.get("/:id", validate(idParamSchema, "params"), ctrl.getEmployeeById);
router.patch("/:id", validate(idParamSchema, "params"), validate(updateEmployeeSchema, "body"), ctrl.updateEmployee);
router.delete("/:id", validate(idParamSchema, "params"), ctrl.deleteEmployee);

export default router;
