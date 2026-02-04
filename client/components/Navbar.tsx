import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between rounded-2xl">
      <Link href={"/"} className="text-xl font-semibold">
        HRMS Lite
      </Link>
      <div className="space-x-6">
        <Link className="hover:text-slate-300" href="/">
          Dashboard
        </Link>
        <Link className="hover:text-slate-300" href="/attendance">
          Attendance
        </Link>
      </div>
    </nav>
  );
}
