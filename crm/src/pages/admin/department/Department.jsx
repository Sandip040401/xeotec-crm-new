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
import departmentService from "@/services/departmentService";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDept, setEditDept] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const addDepartment = async (e) => {
    // setDepartments([...departments, newDepartment]);

    try {
      const response = await departmentService.create(formData);
      setDepartments(response.data.data);
    } catch (error) {
    } finally {
      // setLoading(false);
    }
    console.log(formData);

    setDialogOpen(false);
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept._id !== id));
  };

  const editDepartment = (dept) => {
    setEditDept(dept);
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.fetch();
        setDepartments(response.data.data);
      } catch (error) {
      } finally {
        // setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

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
                    // value={editDept ? editDept.name : newDept}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      });
                    }}
                    className="col-span-3"
                  />
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    // value={editDept ? editDept.name : newDept}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      });
                    }}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addDepartment}>
                  {/* {editDept ? "Save Changes" : "Save"} */}
                  Save
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
              {departments &&
                departments?.map((dept) => (
                  <TableRow key={dept._id}>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>
                      {dept.managers?.map((mgr) => mgr.name).join(", ") ||
                        "None"}
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
