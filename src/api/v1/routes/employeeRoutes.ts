import { Router } from "express";
import Joi from "joi";
import * as branchCtrl from "../controllers/branchController";
import { validate } from "../middleware/validate";
import {
  createBranchSchema,
  updateBranchSchema,
  idParamSchema as branchIdParamSchemaImported,
} from "../validation/branchSchema";

const router = Router();

// Inline if you want custom branch param schema (this is optional if you already have branchId exported)
const branchIdParamSchema = Joi.object({
  id: Joi.alternatives(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "id is required",
    "string.base": "id must be a string or number",
  }),
});

// Create (validate body)
router.post("/", validate(createBranchSchema), branchCtrl.createBranch);

// List
router.get("/", branchCtrl.getAllBranches);

// Get by id (validate params)
router.get("/:id", validate(branchIdParamSchemaImported || branchIdParamSchema, "params"), branchCtrl.getBranchById);

// Update (validate params then body)
router.patch(
  "/:id",
  validate(branchIdParamSchemaImported || branchIdParamSchema, "params"),
  validate(updateBranchSchema, "body"),
  branchCtrl.updateBranch
);

// Delete
router.delete("/:id", validate(branchIdParamSchemaImported || branchIdParamSchema, "params"), branchCtrl.deleteBranch);

export default router;
