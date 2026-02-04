import { tryCatchWrapper } from "@/utils/request";
import { axiosService } from "..";

// get all employees
export const getAllEmployees = async <
  T = { employees: Employee[]; total_employees: number },
>(): Promise<T | null> => {
  return tryCatchWrapper(() => axiosService.get("/employees"));
};

//create employee
export const createEmployee = async (
  data: Employee,
): Promise<{ message: string } | null> => {
  return tryCatchWrapper(() => axiosService.post("/employees", data));
};

//delete employee
export const deleteEmployeeById = async (
  id: string,
): Promise<{ message: string } | null> => {
  return tryCatchWrapper(() => axiosService.delete(`/employees/${id}`));
};
