import { Request, Response } from "express";
import * as svc from "../services/employeeService";

export function createEmployee(req: Request, res: Response) {
  const payload = req.body;
  const created = svc.createEmployee(payload);
  return res.status(201).json(created);
}

export function getAllEmployees(_req: Request, res: Response) {
/**
 * Returns all employees in the system.
 * @returns {Response} A response containing all employees in the system.
 */
  return res.json(svc.getAllEmployees());
}

export function getEmployeeById(req: Request, res: Response) {
  const { id } = req.params;
  const emp = svc.getEmployeeById(String(id));
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  return res.json(emp);
}

export function updateEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const updated = svc.updateEmployee(String(id), req.body);
  if (!updated) return res.status(404).json({ error: "Employee not found" });
  return res.json(updated);
}

export function deleteEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const ok = svc.deleteEmployee(String(id));
  if (!ok) return res.status(404).json({ error: "Employee not found" });
  return res.json({ message: "Deleted" });
}

export function getEmployeesByBranch(req: Request, res: Response) {
  const { branchId } = req.params;
  return res.json(svc.getEmployeesByBranch(String(branchId)));
}

export function getEmployeesByDepartment(req: Request, res: Response) {
  const { department } = req.params;
  return res.json(svc.getEmployeesByDepartment(String(department)));
}
