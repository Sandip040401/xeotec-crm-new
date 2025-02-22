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

const SuperAdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [open, setOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: "", domain: "" });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getCompanies();
        if (response.data && Array.isArray(response.data.companies)) {
          setCompanies(response.data.companies);
        } else {
          console.error("Unexpected response format:", response.data);
          setCompanies([]);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = async () => {
    try {
      const response = await companyService.createCompanies(newCompany);
      if (response.data) {
        setCompanies((prev) => [...prev, response.data]);
        setNewCompany({ name: "", domain: "" });
        setOpen(false);
      } else {
        console.error("Invalid response data:", response);
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
          <Dialog open={open} onOpenChange={setOpen}>
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
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    name="domain"
                    value={newCompany.domain}
                    onChange={handleInputChange}
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
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                  </TableRow>
                ))
              ) : companies.length > 0 ? (
                companies.map((company) => (
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
                      <a
                        href={`/company/${company._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">
                    No companies available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
