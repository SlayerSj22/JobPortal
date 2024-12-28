import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { user_end_point } from "@/utils/constants";

function NavBar() {
  let { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${user_end_point}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div onClick={()=>navigate('/')} className="cursor-pointer">
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>

          <div>
            {!user ? (
              <div className="flex items-center gap-1">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="width-80">
                  <div className="flex gap-4 ">
                    <div>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="@shadcn"
                        />
                      </Avatar>
                    </div>

                    <div>
                      <h4 className="font-medium mt-2 ">{user?.fullName}</h4>
                      <p className="text-sm ">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap- text-gray-600 my-2">
                    <div className="flex w-fit items-center gap-3 cursor-pointer">
                      {user.role === "recruiter" ? (
                        <></>
                      ) : (
                        <>
                          <User2 />

                          <Button variant="link">
                            <Link to={"/profile"}>View Profile</Link>
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="flex w-fit items-center gap-3 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
