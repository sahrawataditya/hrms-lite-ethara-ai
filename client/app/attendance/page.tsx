import Attendance from "@/components/Attendance";
import Navbar from "@/components/Navbar";
import { getAllEmployees } from "@/services/employee";

export const revalidate = 0;
const AttendancePage = async () => {
  const employees = await getAllEmployees();
  return (
    <>
      <Navbar />
      {employees && <Attendance employees={employees.employees ?? []} />}
    </>
  );
};

export default AttendancePage;
