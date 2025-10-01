// src/api/v1/routes/branchRoutes.ts
import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

router.post("/", branchController.create);     // use 'create' (matches controller)
router.get("/", branchController.getAll);
router.get("/:id", branchController.getById);
router.patch("/:id", branchController.update);
router.delete("/:id", branchController.remove);

export default router;
