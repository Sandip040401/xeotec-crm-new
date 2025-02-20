import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SuperAdminSettings = () => {
  const [settings, setSettings] = useState({
    name: "Alice Johnson",
    email: "alice.johnson@crm.com",
    password: "",
    contact: "+1 987 654 3210",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Implement save settings logic here (e.g., API call)
    console.log("Settings saved", settings);
  };

  return (
    <div className="flex justify-center items-center min-h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={settings.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                name="password"
                value={settings.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Contact</Label>
              <Input
                name="contact"
                value={settings.contact}
                onChange={handleChange}
              />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminSettings;
