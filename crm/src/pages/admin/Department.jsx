import { useState } from "react";
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
import { Trash, Pencil } from "lucide-react";

const Department = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Sales" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "HR" },
  ]);
  const [newDept, setNewDept] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addDepartment = () => {
    if (newDept.trim() !== "") {
      setDepartments([...departments, { id: Date.now(), name: newDept }]);
      setNewDept("");
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditValue(name);
  };

  const saveEdit = () => {
    setDepartments(
      departments.map((dept) =>
        dept.id === editingId ? { ...dept, name: editValue } : dept
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <Card className="">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    {editingId === dept.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      dept.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === dept.id ? (
                      <Button onClick={saveEdit} size="sm">
                        Save
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(dept.id, dept.name)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteDepartment(dept.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    )}
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
