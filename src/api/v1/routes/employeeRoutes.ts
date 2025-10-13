import { Router } from "express";
import Joi from "joi";
import * as ctrl from "../controllers/employeeController";
import { validate } from "../middleware/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  idParamSchema as idParamSchemaImported,
} from "../validation/employeeSchema";

const router = Router();

const branchIdParamSchema = Joi.object({
  branchId: Joi.alternatives(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "branchId is required",
    "string.base": "branchId must be a string or number",
  }),
});

const departmentParamSchema = Joi.object({
  department: Joi.string().min(1).required().messages({
    "any.required": "department is required",
    "string.base": "department must be a string",
  }),
});

router.post("/", validate(createEmployeeSchema), ctrl.create);

router.get("/", ctrl.getAll);

router.get("/branch/:branchId", validate(branchIdParamSchema, "params"), ctrl.byBranch);
router.get("/department/:department", validate(departmentParamSchema, "params"), ctrl.byDepartment);

router.get("/:id", validate(idParamSchemaImported, "params"), ctrl.getById);
router.patch(
  "/:id",
  validate(idParamSchemaImported, "params"),
  validate(updateEmployeeSchema, "body"),
  ctrl.update
);
router.delete("/:id", validate(idParamSchemaImported, "params"), ctrl.remove);

export default router;
