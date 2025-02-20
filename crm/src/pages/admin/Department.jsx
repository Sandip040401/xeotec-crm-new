import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Trash } from "lucide-react";

const dummyData = [
  {
    _id: "1",
    name: "Sales",
    managers: [{ name: "Alice" }],
    employees: [{ name: "Bob" }, { name: "Charlie" }],
  },
  {
    _id: "2",
    name: "Marketing",
    managers: [{ name: "Dave" }],
    employees: [{ name: "Eve" }],
  },
  {
    _id: "3",
    name: "HR",
    managers: [{ name: "Frank" }],
    employees: [{ name: "Grace" }],
  },
];

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");

  useEffect(() => {
    setDepartments(dummyData);
  }, []);

  const addDepartment = () => {
    if (newDept.trim() !== "") {
      const newDepartment = {
        _id: (departments.length + 1).toString(),
        name: newDept,
        managers: [],
        employees: [],
      };
      setDepartments([...departments, newDepartment]);
      setNewDept("");
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add new department"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
            />
            <Button onClick={addDepartment}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Managers</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept._id}>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>
                    {dept.managers?.map((mgr) => mgr.name).join(", ") || "None"}
                  </TableCell>
                  <TableCell>
                    {dept.employees?.map((emp) => emp.name).join(", ") ||
                      "None"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteDepartment(dept._id)}
                    >
                      <Trash size={16} />
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

export default Department;
