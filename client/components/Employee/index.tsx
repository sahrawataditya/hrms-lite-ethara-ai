"use client";
import { FC, useState, useTransition } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import { createEmployee, deleteEmployeeById } from "@/services/employee";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Employees: FC<{ employeesData: Employee[] }> = ({ employeesData }) => {
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const addEmployee = (emp: Employee) =>
    startTransition(async () => {
      const res = await createEmployee(emp);
      if (res) {
        toast.success(res.message);
        router.refresh();
        setEmployees([...employees, emp]);
      }
    });

  const deleteEmployee = (id: string) =>
    startTransition(async () => {
      const res = await deleteEmployeeById(id);
      if (res) {
        setEmployees(employees.filter((e) => e.employee_id !== id));
        toast.success(res.message);
        router.refresh();
      }
    });

  return (
    <div className="py-3">
      <h2 className="text-2xl font-semibold mb-6">Employees</h2>
      <EmployeeForm onAdd={addEmployee} isPending={isPending} />
      <EmployeeTable
        employees={employees}
        onDelete={deleteEmployee}
        isPending={isPending}
      />
    </div>
  );
};

export default Employees;
