import { Request, Response } from "express";
import * as svc from "../services/branchServices";
import { Branch } from "../models/branch";

export function createBranch(req: Request, res: Response) {
  const { name, address, phone } = req.body ?? {};

  // Runtime validation (Joi should normally run before this; this is a safety net)
  if (typeof name !== "string" || name.trim() === "" ||
      typeof address !== "string" || address.trim() === "" ||
      typeof phone !== "string" || phone.trim() === "") {
    return res.status(400).json({ error: "Missing required fields: name, address, phone" });
  }

  // Build the exact type the service expects: Omit<Branch, 'id'>
  const payload: Omit<Branch, "id"> = {
    name: name.trim(),
    address: address.trim(),
    phone: phone.trim(),
  };

  const created = svc.createBranch(payload);
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
