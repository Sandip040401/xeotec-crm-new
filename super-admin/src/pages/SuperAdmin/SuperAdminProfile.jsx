import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

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
    <div className="flex justify-center items-center min-h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center space-x-4">
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
