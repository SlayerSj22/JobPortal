import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { appliedJobs } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption>Jobs you have applied for</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs?.length <= 0 ? (
            <span>You haven't applied for any job yet</span>
          ) : (
            appliedJobs.map((application, index) => (
              <TableRow key={index}>
                <TableCell>{application.createdAt.split("T")[0]}</TableCell>
                <TableCell>{application?.job?.title}</TableCell>
                <TableCell>{application?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`${application?.status === "rejected" ? 'bg-red-400' : application.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{application?.status?.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
