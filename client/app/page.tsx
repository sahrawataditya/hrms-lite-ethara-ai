import Dashboard from "@/components/Dashboard";
import Employees from "@/components/Employee";
import Navbar from "@/components/Navbar";
import { getAllEmployees } from "@/services/employee";

export const revalidate = 0;
export default async function Home() {
  const employees = await getAllEmployees();
  return (
    <>
      <Navbar />
      {employees && (
        <>
          <Dashboard totalEmployees={employees.total_employees ?? 0} />
          <Employees employeesData={employees.employees ?? []} />
        </>
      )}
    </>
  );
}
