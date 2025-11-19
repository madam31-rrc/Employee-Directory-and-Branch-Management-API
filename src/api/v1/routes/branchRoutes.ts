import { Router } from "express";
import Joi from "joi";
import * as branchCtrl from "../controllers/branchController";
import { validate } from "../middleware/validate";
import {
  createBranchSchema,
  idParamSchema as importedBranchIdParamSchema,
  updateBranchSchema,
} from "../validation/branchSchema";

const router = Router();

const fallbackIdParamSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "id is required",
    "string.base": "id must be a string or number",
    "string.empty": "id is required",
  }),
});

const idParamSchema = Joi.alternatives().try(
  importedBranchIdParamSchema || Joi.forbidden(),
  fallbackIdParamSchema
) as Joi.Schema;

router.post("/", validate(createBranchSchema), branchCtrl.createBranch);

router.get("/", branchCtrl.getAllBranches);

router.get("/:id", validate(idParamSchema, "params"), branchCtrl.getBranchById);

router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateBranchSchema, "body"),
  branchCtrl.updateBranch
);

router.delete("/:id", validate(idParamSchema, "params"), branchCtrl.deleteBranch);

export default router;