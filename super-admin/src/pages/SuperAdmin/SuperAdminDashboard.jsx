import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const SuperAdminDashboard = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Tech Solutions", status: "Active", paymentStatus: "Paid" },
    {
      id: 2,
      name: "Innovate Inc.",
      status: "Inactive",
      paymentStatus: "Pending",
    },
    { id: 3, name: "Future Systems", status: "Active", paymentStatus: "Paid" },
    { id: 4, name: "CloudWorks", status: "Inactive", paymentStatus: "Pending" },
  ]);

  return (
    <div className="pl-0 md:pl-20">
      <Card>
        <CardHeader>
          <CardTitle>Super Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        company.status === "Active" ? "success" : "destructive"
                      }
                    >
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        company.paymentStatus === "Paid" ? "success" : "warning"
                      }
                    >
                      {company.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/company/${company.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </a>
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

export default SuperAdminDashboard;
