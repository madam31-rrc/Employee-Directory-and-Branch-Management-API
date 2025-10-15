// src/api/v1/controllers/branchController.ts
import { Request, Response } from "express";
import * as svc from "../services/branchService";
import { Branch } from "../models/branch";

export function createBranch(req: Request, res: Response) {
  const payload: Partial<Branch> = req.body;
  const created = svc.createBranch(payload);
  // return created branch directly (tests expect body.id etc.)
  return res.status(201).json(created);
}

export function getAllBranches(_req: Request, res: Response) {
  return res.json(svc.getAllBranches());
}

export function getBranchById(req: Request, res: Response) {
  const { id } = req.params;
  const b = svc.getBranchById(id);
  if (!b) return res.status(404).json({ error: "Branch not found" });
  return res.json(b);
}

export function updateBranch(req: Request, res: Response) {
  const { id } = req.params;
  const updated = svc.updateBranch(id, req.body);
  if (!updated) return res.status(404).json({ error: "Branch not found" });
  return res.json(updated);
}

export function deleteBranch(req: Request, res: Response) {
  const { id } = req.params;
  const ok = svc.deleteBranch(id);
  if (!ok) return res.status(404).json({ error: "Branch not found" });
  return res.json({ message: "Branch deleted" });
}
