import { Employee } from "../models/employee";
import { initialEmployees } from "../../../data/employeeData";

let employees: Employee[] = [];

export function resetEmployees(): void {
  employees = initialEmployees.map(e => ({ ...e }));
}
resetEmployees();

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find(e => e.id === String(id));
}

function nextEmployeeId(): string {
  if (employees.length === 0) return "1";
  const numericIds = employees.map(e => Number(e.id)).filter(n => Number.isFinite(n));
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : employees.length;
  return String(maxId + 1);
}

export function createEmployee(payload: Omit<Employee, "id">): Employee {
  const newEmployee: Employee = { id: nextEmployeeId(), ...payload };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(id: string, partial: Partial<Employee>): Employee | undefined {
  const idx = employees.findIndex(e => e.id === String(id));
  if (idx === -1) return undefined;
  employees[idx] = { ...employees[idx], ...partial, id: employees[idx].id };
  return employees[idx];
}

export function deleteEmployee(id: string): boolean {
  const before = employees.length;
  employees = employees.filter(e => e.id !== String(id));
  return employees.length < before;
}

export function getEmployeesByBranch(branchId: string): Employee[] {
  return employees.filter(e => e.branchId === String(branchId));
}

export function getEmployeesByDepartment(department: string): Employee[] {
  return employees.filter(e => e.department.toLowerCase() === String(department).toLowerCase());
}
