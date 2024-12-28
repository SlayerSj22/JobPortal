import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "@/redux/applicationSlice";
import axios from "axios";
import { application_end_point } from "@/utils/constants";
// const skills = ["Html", "Css", "Javascript", "ReactJs"];

function Profile() {
  
  const [open,setOpen]=useState(false)
  const {user}=useSelector((store)=>store.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchJobs= async ()=>{
      try {
        const response =await axios.get(`${application_end_point}/getApplied`,{withCredentials:true})

        if(response.data.success){
          dispatch(setAppliedJobs(response.data.applications))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchJobs()
  },[user])
  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="mt-5">
          <div className="flex items-center my-2 gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center my-2 gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1 my-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>

          <div className="grid grid-cols-1 space-y-1">
            <Label className="text-md font-bold">Resume</Label>
            {user?.profile?.resume ? (
              <a
                target="blank"
                className="text-blue-600"
                href={user?.profile?.resume}
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
