import branches, { Branch } from "../data/branchData"
import branchs from "../../../data/branchData"

export const createBranch = async (branch: {
    name: string,
    address: string,
    phone: string,
}): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch };
    branches.push(newBranch);
    return newBranch;
};