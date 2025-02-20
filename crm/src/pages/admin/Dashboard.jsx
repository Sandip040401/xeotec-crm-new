import { useState } from "react";
import { Menu, X, Home, Users, BarChart, Settings } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white p-4 rounded shadow">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded"
            />
            <div className="bg-gray-200 p-2 rounded-full">👤</div>
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">1,200</h2>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">$45,000</h2>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">New Orders</p>
            <h2 className="text-2xl font-bold">320</h2>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-500">Tickets</p>
            <h2 className="text-2xl font-bold">87</h2>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <li className="text-gray-600">✔ User John Doe signed up</li>
            <li className="text-gray-600">✔ Order #1234 processed</li>
            <li className="text-gray-600">✔ Payment received from client</li>
            <li className="text-gray-600">✔ Support ticket closed</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
