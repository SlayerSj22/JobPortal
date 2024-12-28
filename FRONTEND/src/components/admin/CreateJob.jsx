import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "../ui/select";
import axios from "axios";
import { job_end_point } from "@/utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CreateJob() {
  const { allCompanies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${job_end_point}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
      console.log(res);
    } catch (error) {
      toast.error(response.error.data.message);
    } finally {
      setLoading(false);
    }
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="max-w-4xl p-6 border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.requriements}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experienceLevel"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Positions</Label>
              <Input
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {allCompanies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Job
            </Button>
          )}
          {allCompanies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
