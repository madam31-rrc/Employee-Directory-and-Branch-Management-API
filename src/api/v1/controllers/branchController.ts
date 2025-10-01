// src/api/v1/controllers/branchController.ts
import { Request, Response } from "express";
import * as svc from "../services/branchServices";

export function create(req: Request, res: Response) {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields (name, address, phone)" });
  }
  const branch = svc.createBranch({ name, address, phone });
  return res.status(201).json(branch);
}

export function getAll(_req: Request, res: Response) {
  return res.json(svc.getAllBranches());
}

export function getById(req: Request, res: Response) {
  const { id } = req.params;
  const branch = svc.getBranchById(id);
  if (!branch) return res.status(404).json({ error: "Branch not found" });
  return res.json(branch);
}

export function update(req: Request, res: Response) {
  const { id } = req.params;
  const updated = svc.updateBranch(id, req.body);
  if (!updated) return res.status(404).json({ error: "Branch not found" });
  return res.json(updated);
}

export function remove(req: Request, res: Response) {
  const { id } = req.params;
  const ok = svc.deleteBranch(id);
  if (!ok) return res.status(404).json({ error: "Branch not found" });
  return res.json({ message: "Branch deleted" });
}
