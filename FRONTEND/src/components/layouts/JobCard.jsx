import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job?._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer mx-12">
      <div>
        <h1 className="font-md text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>

      <div>
        <h1 className="font-bold my-2 text-lg">{job?.title}</h1>
        <p className="text-small text-gray-600">{job?.description}</p>
      </div>

      <div>
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {" "}
          {`${job?.position} positions`}
        </Badge>
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge
          className={"text-blue-700 font-bold"}
          variant={"ghost"}
        >{`${job?.salary} LPA`}</Badge>
      </div>
    </div>
  );
}

export default JobCard;
