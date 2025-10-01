import { Router } from "express";
import * as ctrl from "../controllers/employeeController";

const router = Router();

router.post("/", ctrl.create);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.patch("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

router.get("/branch/:branchId", ctrl.byBranch);
router.get("/department/:department", ctrl.byDepartment);

export default router;
