import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { FaUsers, FaExchangeAlt, FaGlobe, FaChartPie } from "react-icons/fa";
const stats = [
  { title: "Total Users", value: "1,250" },
  { title: "New Leads", value: "320" },
  { title: "Sales This Month", value: "$25,430" },
  { title: "Active Tickets", value: "15" },
];

const recentActivities = [
  { id: 1, activity: "John Doe created a new lead", date: "Feb 20, 2025" },
  { id: 2, activity: "Alice Johnson closed a deal", date: "Feb 19, 2025" },
  { id: 3, activity: "Michael updated client details", date: "Feb 18, 2025" },
];

const salesData = [
  { name: "Jan", sales: 12000, revenue: 8000 },
  { name: "Feb", sales: 18000, revenue: 12000 },
  { name: "Mar", sales: 15000, revenue: 10000 },
  { name: "Apr", sales: 22000, revenue: 17000 },
  { name: "May", sales: 25000, revenue: 19000 },
];

const pieData = [
  { name: "Online Sales", value: 60 },
  { name: "In-Store Sales", value: 30 },
  { name: "Wholesale", value: 10 },
];

const COLORS = ["#3b82f6", "#34d399", "#facc15"];

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-6 w-full h-full overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Stats Overview */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-4 ${stat.color} text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <CardHeader className="flex items-center space-x-3">
                <div className="text-3xl">{stat.icon}</div>
                <CardTitle className="text-md font-medium uppercase">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Client Button */}
        <div className="mt-4 flex justify-end">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
            + Create Client
          </Button>
        </div>
      </div>

      {/* Sales Line Chart */}
      <Card className="shadow-lg border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesData} className="mx-auto">
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="url(#salesGradient)"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#revenueGradient)"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sales Pie Chart */}
      <Card className="shadow-lg border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Sales Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="shadow-lg border border-gray-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-600">Activity</TableHead>
                <TableHead className="text-gray-600">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow
                  key={activity.id}
                  className="hover:bg-gray-50 transition-transform transform hover:scale-[1.02]"
                >
                  <TableCell className="py-3 text-gray-700">
                    {activity.activity}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500">
                    {activity.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
