"use client";
import { getAttendanceOfEmployee, markAttendance } from "@/services/attendance";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

const Attendance: FC<{ employees: Employee[] }> = ({ employees }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<AttendanceRecord>({
    employee_id: "",
    date: "",
    status: "Present" as "Present" | "Absent",
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!form.employee_id) {
      setRecords([]);
      return;
    }

    const fetchAttendance = async () => {
      setLoadingRecords(true);

      try {
        const response = await getAttendanceOfEmployee(form.employee_id);
        if (response) {
          setRecords(response ?? []);
        }
      } catch (error) {
        console.error(error);
        setRecords([]);
      } finally {
        setLoadingRecords(false);
      }
    };

    fetchAttendance();
  }, [form.employee_id, isPending]);

  const submitAttendance = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (!form.employee_id || !form.date) {
        alert("Employee and Date are required");
        return;
      }
      const res = await markAttendance(form);
      if (res) {
        toast.success(res.message);
        setForm({ employee_id: form.employee_id, date: "", status: "Present" });
        router.refresh();
      }
    });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 py-3.5">
        Attendance Management
      </h2>
      <form
        onSubmit={submitAttendance}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">Mark Attendance</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border rounded px-3 py-2"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <option className="capitalize" key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name}
                </option>
              ))
            ) : (
              <option disabled value="">
                No employees found
              </option>
            )}
          </select>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="border rounded px-3 py-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as any })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button
            disabled={isPending}
            className="bg-slate-900 text-white rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b">
          Attendance Records
        </h3>
        {!form.employee_id && (
          <p className="p-4 text-gray-500">
            Select an employee to display attendance records.
          </p>
        )}

        {form.employee_id && loadingRecords && (
          <p className="p-4 text-gray-500">Loading attendance records...</p>
        )}

        {form.employee_id && !loadingRecords && records.length === 0 && (
          <p className="p-4 text-gray-500">
            No attendance records found for this employee.
          </p>
        )}

        {records.length > 0 && (
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{r.date}</td>
                  <td
                    className={`p-3 font-medium ${
                      r.status === "Present" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Attendance;
