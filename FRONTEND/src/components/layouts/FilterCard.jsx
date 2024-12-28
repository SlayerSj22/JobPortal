import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Pune",
      "Bengaluru",
      "Navi mumbai",
      "Hyderabad",
      "Indore",
    ],
  },
  {
    filterType: "Role",
    array: [
      "Frontend Devloper",
      "Backend Devloper",
      "Fullstack Devloper",
      "Data scientist",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", " 40k-1Lakh", "1Lakh+"],
  },
];

function FilterCard() {
  const [selectedInput,setSelectedInput]=useState("");
  const changeHandler = (value)=>{
      setSelectedInput(value)
  }
  const dispatch =useDispatch()
  useEffect(()=>{
   dispatch(setSearchQuery(selectedInput))
  },[selectedInput])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg ">Filter Jobs :</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedInput} onValueChange={changeHandler}>
        {filterData.map((obj, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{obj.filterType}</h1>
            <div>
              {obj.array.map((item, index) => {
                const itmId=Math.random();
                return (
                  
                  <div key={index}className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item}  id={itmId} />
                    <Label htmlFor={itmId} >{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
