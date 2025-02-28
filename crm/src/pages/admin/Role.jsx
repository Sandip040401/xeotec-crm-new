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

const dummyRoles = [
  {
    _id: "1",
    name: "Admin",
    description: "Full access to all modules",
    permissions: [{ permissionId: "101", allowed: true }],
  },
  {
    _id: "2",
    name: "Manager",
    description: "Can manage teams and view reports",
    permissions: [{ permissionId: "102", allowed: true }],
  },
  {
    _id: "3",
    name: "Employee",
    description: "Limited access to assigned tasks",
    permissions: [{ permissionId: "103", allowed: false }],
  },
];

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    setRoles(dummyRoles);
  }, []);

  const addRole = () => {
    if (newRole.trim() !== "") {
      const newRoleData = {
        _id: (roles.length + 1).toString(),
        name: newRole,
        description: "Newly added role",
        permissions: [],
      };
      setRoles([...roles, newRoleData]);
      setNewRole("");
    }
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role._id !== id));
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 mb-10">
            <Input
              placeholder="Add new role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <Button onClick={addRole}>Add</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description || "No description"}</TableCell>
                  <TableCell>
                    {role.permissions.length > 0
                      ? "Has Permissions"
                      : "No Permissions"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteRole(role._id)}
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

export default Role;
