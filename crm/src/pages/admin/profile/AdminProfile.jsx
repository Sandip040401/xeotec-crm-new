import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [admin, setAdmin] = useState({
    name: "John Doe",
    email: "admin@example.com",
    role: "Administrator",
    phone: "+91 9876543210",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/avatar.png" alt="Admin" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{admin.name}</h2>
              <p className="text-gray-500">{admin.email}</p>
              <p className="text-gray-600 font-medium">{admin.role}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={admin.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={admin.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <Button onClick={() => setEditMode(!editMode)} variant="outline">
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
            {editMode && <Button>Save Changes</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
