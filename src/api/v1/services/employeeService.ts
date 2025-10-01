import { Employee, initialEmployees } from "../../data/employeeData";
import { v4 as uuidv4 } from "uuid";

let employees: Employee[] = [];

export function resetEmployees() {
  employees = initialEmployees.map(e => ({ ...e }));
}

resetEmployees();

export function getAllEmployees(): Employee[] {
  return employees;
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find(e => e.id === id);
}

export function createEmployee(payload: Omit<Employee, "id">): Employee {
  const newEmployee: Employee = { id: uuidv4(), ...payload };
  employees.push(newEmployee);
  return newEmployee;
}

export function updateEmployee(id: string, partial: Partial<Employee>): Employee | undefined {
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return undefined;
  employees[idx] = { ...employees[idx], ...partial, id };
  return employees[idx];
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
  return employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
}
