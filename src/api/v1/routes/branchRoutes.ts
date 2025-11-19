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

const branchIdParamSchema = Joi.object({
  id: Joi.alternatives(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "id is required",
    "string.base": "id must be a string or number",
  }),
});

router.post("/", validate(createBranchSchema), branchCtrl.createBranch);

router.get("/", branchCtrl.getAllBranches);

router.get("/:id", validate(branchIdParamSchemaImported || branchIdParamSchema, "params"), branchCtrl.getBranchById);

router.patch(
  "/:id",
  validate(branchIdParamSchemaImported || branchIdParamSchema, "params"),
  validate(updateBranchSchema, "body"),
  branchCtrl.updateBranch
);

router.delete("/:id", validate(branchIdParamSchemaImported || branchIdParamSchema, "params"),
branchCtrl.deleteBranch);

export default router;
