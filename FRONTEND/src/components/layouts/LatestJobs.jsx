import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hook/useGetAllJobs";
import { useNavigate } from "react-router-dom";

function LatestJobs() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  

  return (
    <div className=" m-w-7xl mx-auto my-20">
      <div className="text-center">
        <h1 className="text-4xl  font-bold">
          <span className="text-[#3633e1]">Latest & Top </span>Job Openings
        </h1>
      </div>
      {/* multiple job card display here */}
      <div className="grid grid-cols-3 gap-4  my-5">
        {allJobs.length <= 0 ? (
          <span className="text-center">No jobs Found</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <JobCard   key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
