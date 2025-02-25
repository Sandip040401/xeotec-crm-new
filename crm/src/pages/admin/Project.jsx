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

const Project = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "CRM Development",
      status: "In Progress",
      manager: "John Doe",
    },
    {
      id: 2,
      name: "UI Enhancement",
      status: "Completed",
      manager: "Jane Smith",
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div>
              <Label>Search Projects</Label>
              <Input placeholder="Search..." />
            </div>
            <Button>Add Project</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.manager}</TableCell>
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

export default Project;
