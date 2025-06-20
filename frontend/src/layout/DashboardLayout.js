import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="font-bold text-lg">Dashboard</h2>
        <nav className="mt-4 flex flex-col gap-2">
          <Link to="/dashboard">Students</Link>
          <Link to="/dashboard/modules">Modules / Notes</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
