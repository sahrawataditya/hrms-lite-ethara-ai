import { FC } from "react";

const EmployeeTable: FC<{
  employees: Employee[];
  onDelete: (id: string) => void;
  isPending: boolean;
}> = ({ employees, onDelete, isPending }) => {
  if (isPending) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }
  if (employees.length === 0) {
    return <p className="text-gray-500 text-center">No employees added yet.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Department</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employee_id} className="border-t">
              <td className="p-3">{e.employee_id}</td>
              <td className="p-3 capitalize">{e.full_name}</td>
              <td className="p-3">{e.email}</td>
              <td className="p-3">{e.department}</td>
              <td className="p-3">
                <button
                  disabled={isPending}
                  onClick={() => onDelete(e.employee_id)}
                  className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
