// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as svc from "../services/employeeService";
import { Employee } from "../models/employee";
import { SuccessResponse, ErrorResponse } from "../models/response";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;

    if (!name || !position || !department || !email || !phone || !branchId) {
      return res.status(400).json({
        error: 'All fields are required: name, position, department, email, phone, branchId'
      });
    }

    const newEmployee: Employee = svc.createEmployee({ name, position, department, email, phone, branchId });
    const payload: SuccessResponse<Employee> = { success: true, data: newEmployee, message: "Employee created" };
    return res.status(201).json(payload);
  } catch (error: any) {
    const payload: ErrorResponse = { success: false, error: error?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await svc.getAllEmployees();
    const payload: SuccessResponse<Employee[]> = { success: true, data: employees };
    return res.json(payload);
  } catch (error: any) {
    const payload: ErrorResponse = { success: false, error: error?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id;
    if (!id) {
      const payload: ErrorResponse = { success: false, error: "Missing id parameter" };
      return res.status(400).json(payload);
    }
    const emp = await svc.getEmployeeById(id);
    if (!emp) {
      const payload: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(payload);
    }
    const payload: SuccessResponse<Employee> = { success: true, data: emp };
    return res.json(payload);
  } catch (err: any) {
    const payload: ErrorResponse = { success: false, error: err?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export function Employee(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updated = svc.updateEmployee(id, req.body);
    if (!updated) {
      const payload: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(payload);
    }
    const payload: SuccessResponse<Employee> = { success: true, data: updated, message: "Employee updated" };
    return res.json(payload);
  } catch (err: any) {
    const payload: ErrorResponse = { success: false, error: err?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export function deleteEmployee(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const ok = svc.deleteEmployee(id);
    if (!ok) {
      const payload: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(payload);
    }
    const payload = { success: true, data: { id }, message: "Employee deleted" } as SuccessResponse<{ id: string }>;
    return res.json(payload);
  } catch (err: any) {
    const payload: ErrorResponse = { success: false, error: err?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export function bgetEmployeesByBranch(req: Request, res: Response) {
  try {
    const { branchId } = req.params;
    if (!branchId) {
      const payload: ErrorResponse = { success: false, error: "Missing branchId parameter" };
      return res.status(400).json(payload);
    }
    const list = svc.getEmployeesByBranch(branchId);
    const payload: SuccessResponse<Employee[]> = { success: true, data: list };
    return res.json(payload);
  } catch (err: any) {
    const payload: ErrorResponse = { success: false, error: err?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.params;
    if (!department) {
      const payload: ErrorResponse = { success: false, error: "Missing department parameter" };
      return res.status(400).json(payload);
    }
    const list = svc.getEmployeesByDepartment(department);
    const payload: SuccessResponse<Employee[]> = { success: true, data: list };
    return res.json(payload);
  } catch (err: any) {
    const payload: ErrorResponse = { success: false, error: err?.message || "Internal server error" };
    return res.status(500).json(payload);
  }
}

