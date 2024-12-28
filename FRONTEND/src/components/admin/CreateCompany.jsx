import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { company_end_point } from "@/utils/constants.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CreateCompany() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [companyName,setCompanyName]=useState();
  const registerCompany = async ()=>{
    try {
      console.log(companyName);
      
      const response=await axios.post(`${company_end_point}/register`,{companyName},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })

      // console.log(res);
      

      if(response?.data?.message){
        dispatch(setSingleCompany(response?.data?.company))
        toast.success(response.data.message)
        const companyId=response?.data?.company?._id;
        navigate(`/admin/company/${companyId}`)
      }

      // else{
      //   toast.success(res?.data?.message)
      // }
    } 
    
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  }
  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your company name</h1>
          <p className="text-gray-500">
            what would you like to give your compnay name you can change this
            later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="jobhunt microsoft ect."
          onChange={(e)=>setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
