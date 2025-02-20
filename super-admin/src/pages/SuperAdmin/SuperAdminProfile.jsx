import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
// import axios from "axios";

const SuperAdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Alice Johnson",
    email: "alice.johnson@crm.com",
    role: "Super Admin",
    contact: "+1 987 654 3210",
    joinedDate: "2022-08-10",
  });

  useEffect(() => {
    // Fetch super admin details from backend (commented out for demo data)
    // axios.get("/api/superadmin/profile")
    //   .then(response => setAdmin(response.data))
    //   .catch(error => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <Avatar
            className="w-16 h-16"
            src="/images/admin-avatar.png"
            alt="Admin Avatar"
          />
          <CardTitle>Super Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <p>
              <strong>Name:</strong> {admin.name}
            </p>
            <p>
              <strong>Email:</strong> {admin.email}
            </p>
            <p>
              <strong>Role:</strong> {admin.role}
            </p>
            <p>
              <strong>Contact:</strong> {admin.contact}
            </p>
            <p>
              <strong>Joined Date:</strong> {admin.joinedDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminProfile;
