import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import companyService from "@/services/companyService";
import userService from "@/services/userService";

const SuperAdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminModal, setAdminModal] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [newCompany, setNewCompany] = useState({ name: "", domain: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, adminRes] = await Promise.all([
          companyService.getCompanies(),
          userService.getAdmins(),
        ]);

        if (companyRes.data && Array.isArray(companyRes.data.companies)) {
          setCompanies(companyRes.data.companies);
        } else {
          console.error("Unexpected company response format:", companyRes.data);
          setCompanies([]);
        }

        if (adminRes.data && Array.isArray(adminRes.data)) {
          setAdmins(adminRes.data);
        } else {
          console.error("Unexpected admin response format:", adminRes.data);
          setAdmins([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAdminModal = (company) => {
    setSelectedCompany(company);
    setAdminModal(true);
  };

  const handleAddAdmin = async () => {
    try {
      if (!selectedCompany) return;
      const response = await userService.createAdmin({
        ...adminData,
        companyId: selectedCompany._id,
      });
      if (response.data) {
        setAdmins((prev) => [...prev, response.data]);
        setAdminModal(false);
        setAdminData({ name: "", email: "" });
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleAddCompany = async () => {
    try {
      const response = await companyService.createCompanies(newCompany);
      if (response.data) {
        setCompanies((prev) => [...prev, response.data]);
        setNewCompany({ name: "", domain: "" });
        setCompanyModal(false);
      }
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div className="pl-0 md:pl-20">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Super Admin Dashboard</CardTitle>
          <Dialog open={companyModal} onOpenChange={setCompanyModal}>
            <DialogTrigger asChild>
              <Button variant="default">Add Company</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCompany.name}
                    onChange={handleCompanyInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    name="domain"
                    value={newCompany.domain}
                    onChange={handleCompanyInputChange}
                  />
                </div>
                <Button onClick={handleAddCompany}>Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                  </TableRow>
                ))
              ) : companies.length > 0 ? (
                companies.map((company) => {
                  const admin = admins.find(
                    (admin) => admin.companyId?._id === company._id
                  );

                  return (
                    <TableRow key={company._id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>
                        <a
                          href={company.domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {company.domain}
                        </a>
                      </TableCell>
                      <TableCell>
                        {company.employees?.length > 0 ? (
                          <ul>
                            {company.employees.map((employee, index) => (
                              <li key={employee._id || `emp-${index}`}>
                                {employee.name} ({employee.email})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>No employees</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {admin ? (
                          <>
                            {admin.name} ({admin.email})
                          </>
                        ) : (
                          <Button onClick={() => handleOpenAdminModal(company)}>
                            Add Admin
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`/company/${company._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    No companies available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={adminModal} onOpenChange={setAdminModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminName">Name</Label>
              <Input
                id="adminName"
                name="name"
                value={adminData.name}
                onChange={handleAdminInputChange}
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                name="email"
                value={adminData.email}
                onChange={handleAdminInputChange}
              />
            </div>
            <Button onClick={handleAddAdmin}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminDashboard;
