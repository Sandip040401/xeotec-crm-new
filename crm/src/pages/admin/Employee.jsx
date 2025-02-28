import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router";

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      role: "Software Engineer",
      department: "Development",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Project Manager",
      department: "Management",
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div>
              <Label>Search Employees</Label>
              <Input placeholder="Search..." />
            </div>
            <Button onClick={() => navigate("add-employee")}>
              Add Employee
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive" className="ml-2">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employee;
