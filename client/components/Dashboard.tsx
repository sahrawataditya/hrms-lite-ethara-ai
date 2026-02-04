import { FC } from "react";

const Dashboard: FC<{ totalEmployees: number }> = ({ totalEmployees }) => {
  return (
    <>
      <h2 className="text-2xl py-3.5 font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ title: "Total Employees", value: totalEmployees }].map((card) => (
          <div key={card.title} className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">{card.title}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
