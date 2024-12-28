import React, { useEffect } from "react";
import NavBar from "./shared/NavBar";
import Job from "./layouts/Job";
import { useDispatch, useSelector } from "react-redux";
import {  setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hook/useGetAllJobs";




function Browse() {
  useGetAllJobs()
  const {allJobs}=useSelector(store=>store.job)
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchQuery(""))
    }
  },[])
  return (
    <div >
      <NavBar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-lg text-center">Search Results : ({allJobs.length})</h1>
        <div className="grid grid-cols-3 my-5 gap-4">
        {
          allJobs.map((job)=>{
            return (
              <div>
                <Job key={job?._id} job={job} />
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}

export default Browse;
