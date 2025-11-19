import { Branch } from "../models/branch";
import { initialBranches } from "../../../data/branchData";

let branches: Branch[] = [];

export function resetBranches() {
  branches = initialBranches.map(b => ({ ...b }));
}
resetBranches();

export function getAllBranches(): Branch[] {
  return branches;
}

export function getBranchById(id: string): Branch | undefined {
  return branches.find(b => b.id === id);
}

function nextBranchId(): string {
  if (branches.length === 0) return "1";
  const numericIds = branches.map(b => Number(b.id)).filter(n => Number.isFinite(n));
  const maxId = numericIds.length ? Math.max(...numericIds) : branches.length;
  return String(maxId + 1);
}

export function createBranch(payload: Omit<Branch, "id">): Branch {
  const newBranch: Branch = { id: nextBranchId(), ...payload };
  branches.push(newBranch);
  return newBranch;
}

export function updateBranch(id: string, partial: Partial<Branch>): Branch | undefined {
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return undefined;
  branches[idx] = { ...branches[idx], ...partial, id };
  return branches[idx];
}

export function deleteBranch(id: string): boolean {
  const before = branches.length;
  branches = branches.filter(b => b.id !== id);
  return branches.length < before;

}
