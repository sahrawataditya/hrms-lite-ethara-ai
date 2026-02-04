import { FC, useState } from "react";
import toast from "react-hot-toast";

const EmployeeForm: FC<{
  onAdd: (emp: Employee) => void;
  isPending: boolean;
}> = ({ onAdd, isPending }) => {
  const [form, setForm] = useState<Employee>({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const submit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v)) {
      toast.error("All fields required");
      return;
    }
    onAdd(form);
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">Add Employee</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(["employee_id", "full_name", "email", "department"] as const).map(
          (field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.toUpperCase()}
              className="border rounded px-3 py-2"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ),
        )}
      </div>

      <button
        disabled={isPending}
        className="mt-4 bg-slate-900 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
