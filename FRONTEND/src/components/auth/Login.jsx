import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { user_end_point } from "@/utils/constants.js";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
// import store from "@/redux/store.js";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading ,user} = useSelector((store) => store.auth);
  //store ke andar auth slice ke state se nikalega

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${user_end_point}/login`, input, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
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
          <h1 className="font-bold mb-5 text-xl text-center">Login :</h1>
          <div className="my-2">
            <Label className="mb-5">Email :</Label>
            <Input
              type="text"
              placeholder="Enter Your Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label className="mb-5">Password:</Label>
            <Input
              type="password"
              placeholder="Create a Strong password"
              value={input.password}
              name="password"
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

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait while logging in
            </Button>
          ) : (
            <Button type="submit" className="my-4 w-full ">
              Login
            </Button>
          )}

          <span className="text-sm">
            New user ?{" "}
            <Link to="/signup" className="text-blue-600">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
