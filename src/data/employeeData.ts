// filename: src/data/employeeData.ts
import { Employee } from "../api/v1/models/employee";

export const initialEmployees: Employee[] = [
  { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@example.com", phone: "604-555-0148", branchId: "1" },
  { id: "2", name: "Amandeep Singh", position: "Customer Service Rep", department: "Customer Service", email: "amandeep.singh@example.com", phone: "780-555-0150", branchId: "2" },
  { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@example.com", phone: "204-555-0193", branchId: "3" },
  { id: "4", name: "James Wilson", position: "IT Support", department: "IT", email: "james.wilson@example.com", phone: "306-555-0111", branchId: "4" },
  { id: "5", name: "Linda Martinez", position: "Financial Advisor", department: "Advising", email: "linda.martinez@example.com", phone: "204-555-0122", branchId: "5" },
  { id: "6", name: "Michael Brown", position: "Teller", department: "Operations", email: "michael.brown@example.com", phone: "204-555-0133", branchId: "6" },
  { id: "7", name: "Patricia Taylor", position: "Operations Manager", department: "Operations", email: "patricia.taylor@example.com", phone: "514-555-0144", branchId: "7" },
  { id: "8", name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@example.com", phone: "416-555-0155", branchId: "8" },
  { id: "9", name: "Charles Thomas", position: "Accountant", department: "Finance", email: "charles.thomas@example.com", phone: "506-555-0166", branchId: "9" },
  { id: "10", name: "Maria Garcia 2", position: "Loan Assistant", department: "Loans", email: "maria.g2@example.com", phone: "204-555-0177", branchId: "3" },
];
