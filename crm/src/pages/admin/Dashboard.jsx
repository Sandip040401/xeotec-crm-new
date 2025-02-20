import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const chartData = [
  { name: "Jan", sales: 12000 },
  { name: "Feb", sales: 18000 },
  { name: "Mar", sales: 15000 },
  { name: "Apr", sales: 22000 },
  { name: "May", sales: 25000 },
];

export default function Dashboard() {
  return (
    <div className="p-6 grid gap-6 w-full h-full overflow-y-scroll">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-lg border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-700">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} className="mx-auto">
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="shadow-lg border border-gray-200">
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
                  className="hover:bg-gray-50 transition"
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
