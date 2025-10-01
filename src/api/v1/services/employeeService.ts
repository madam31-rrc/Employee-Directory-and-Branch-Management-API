// src/api/v1/services/employeeService.ts
import { Employee, initialEmployees } from "../../../data/employeeData";

let employees: Employee[] = [];

export function resetEmployees(): void {
  employees = initialEmployees.map(emp => ({ ...emp }));
}

resetEmployees();

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find(emp => emp.id === id);
}

function nextEmployeeId(): string {
  if (employees.length === 0) return "1";

  const numericIds = employees
    .map(e => Number(e.id))
    .filter(n => Number.isFinite(n));

  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  return String(maxId + 1);
}

export function createEmployee(payload: Omit<Employee, "id">): Employee {
  const newEmployee: Employee = {
    id: nextEmployeeId(),
    ...payload
  };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(
  id: string,
  partial: Partial<Employee>
): Employee | undefined {
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) return undefined;

  employees[index] = { ...employees[index], ...partial, id };
  return employees[index];
}

export function deleteEmployee(id: string): boolean {
  const before = employees.length;
  employees = employees.filter(e => e.id !== id);
  return employees.length < before;
}

export function getEmployeesByBranch(branchId: string): Employee[] {
  return employees.filter(e => e.branchId === branchId);
}

export function getEmployeesByDepartment(department: string): Employee[] {
  return employees.filter(
    e => e.department.toLowerCase() === department.toLowerCase()
  );
}
