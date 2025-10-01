import { Request, Response } from "express";
import * as svc from "../services/employeeService";

export function create(req: Request, res: Response) {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const employee = svc.createEmployee({ name, position, department, email, phone, branchId });
  return res.status(201).json(employee);
}

export function getAll(_req: Request, res: Response) {
  return res.json(svc.getAllEmployees());
}

export function getById(req: Request, res: Response) {
  const { id } = req.params;
  const emp = svc.getEmployeeById(id);
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  return res.json(emp);
}

export function update(req: Request, res: Response) {
  const { id } = req.params;
  const updated = svc.updateEmployee(id, req.body);
  if (!updated) return res.status(404).json({ error: "Employee not found" });
  return res.json(updated);
}

export function remove(req: Request, res: Response) {
  const { id } = req.params;
  const ok = svc.deleteEmployee(id);
  if (!ok) return res.status(404).json({ error: "Employee not found" });
  return res.json({ message: "Employee deleted" });
}

export function byBranch(req: Request, res: Response) {
  const { branchId } = req.params;
  if (!branchId) return res.status(400).json({ error: "Missing branchId" });
  const list = svc.getEmployeesByBranch(branchId);
  return res.json(list);
}

export function byDepartment(req: Request, res: Response) {
  const { department } = req.params;
  if (!department) return res.status(400).json({ error: "Missing department" });
  const list = svc.getEmployeesByDepartment(department);
  return res.json(list);
}
