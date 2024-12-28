import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { user_end_point } from "@/utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function SignUp() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    file: "",
    role: "",
  });
 
  const navigate=useNavigate();
  const {loading,user} = useSelector((store)=>store.auth)
  const dispatch= useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("role",input.role)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    
    if(input.file){
      formData.append("file",input.file)
    }

    try {
      
      dispatch(setLoading(true));
      const response = await axios.post(`${user_end_point}/register`,formData,
        {
          headers:{
            "content-type":"multipart/form-data"
          },
          withCredentials:true
        }
      )

      if(response.data.success){
        navigate("/login")
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }

    finally{
      dispatch(setLoading(false))
    }
  };
  useEffect(()=>{
      if(user){
          navigate("/");
      }
  },[])

  return (
    <>
      <div>
        {" "}
        <NavBar />
      </div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold mb-5 text-xl text-center">Sign Up :</h1>
          <div className="my-2">
            <Label className="mb-5">Full Name :</Label>
            <Input
              type="text"
              placeholder="Enter Your Name"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="mb-5">Email :</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="mb-5">PhoneNumber :</Label>
            <Input
              type="text"
              placeholder="Enter Your Phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="mb-5">Password:</Label>
            <Input
              type="password"
              placeholder="Create a Strong password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between ">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <Label>ProfileImage :</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer w-1/3 border border-red-500"
              onChange={changeFileHandler}
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait while Sign up
            </Button>
          ) : (
            <Button type="submit" className="my-4 w-full ">
              Sign up
            </Button>
          )}

          
          <span className="text-sm">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;
