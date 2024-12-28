import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />{" "}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>

        <div>
          <h1 className="font-bold">{job?.company?.name}</h1>
          <p>{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
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

      <div className="flex items-center  gap-4 mt-4">
        <Button
          variant="outline "
          onClick={() => {
            navigate(`/description/${job?._id}`);
          }}
        >
          Details
        </Button>
        <Button className="bg-blue-600 ">Save for later</Button>
      </div>
    </div>
  );
}

export default Job;
