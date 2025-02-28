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
import { Trash, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import EditDepartment from "./EditDepartment";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDept, setEditDept] = useState(null);

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
      setDialogOpen(false);
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept._id !== id));
  };

  const editDepartment = (dept) => {
    setEditDept(dept);
    setDialogOpen(true);
  };

  return (
    <div className="p-6 w-full ">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <Card>
        <CardContent className="p-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Department</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editDept ? "Edit Department" : "Add New Department"}
                </DialogTitle>
                <DialogDescription>
                  {editDept
                    ? "Modify department details."
                    : "Enter the details of the new department."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editDept ? editDept.name : newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addDepartment}>
                  {editDept ? "Save Changes" : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Table className="mt-9">
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
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editDepartment(dept)}
                    >
                      <Edit size={16} />
                    </Button>
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
