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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { application_end_point } from "@/utils/constants";


const shortListingStatus = ["accepted", "rejected"];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${application_end_point}/status/${id}/update`, { status });
        console.log(res);
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
}
  return (
    <div>
      <Table>
        <TableCaption>a list of applicants applied to this job.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.length > 0 &&
            applicants.map((application) => (
              <tr key={application?._id}>
                <TableCell>{application?.applicant?.fullName}</TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {" "}
                  {application?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                     >
                      {application?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{application?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent  className="w-32">
                      {shortListingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, application?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
