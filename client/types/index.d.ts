type Employee = {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
};

type AttendanceRecord = {
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
};