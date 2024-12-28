import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query,setQuery]=useState("")

  const dispatch =useDispatch()
  const navigate= useNavigate()
  const searchQueryHandler = ()=>{
   dispatch(setSearchQuery(query));
   navigate("/browse")
  }



  return (
    <div className="text-center ">
      <div className="flex flex-col gap-5 my-10 ">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto">
          No. 1 Job Finding Website
        </span>

        <h1 className="text-4xl font-bold">
          Search, Apply & <br />{" "}
          <span className="text-[#6A38c2]">And get your Dream Job</span>
        </h1>
        <p>Yo soy shashwat Jain you vivo en india y wanted to be a great full stack developer.</p>

        <div className="flex w-[40%] shadow-lg border border-gray-200  pl-3 rounded-full items-center gap-4 mx-auto">
            <input
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full"
            onChange={(e)=>setQuery(e.target.value)}
            />

            <Button className="rounded-r-full" onClick={searchQueryHandler}>
                <Search className="h-5 w-5 " />
            </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
