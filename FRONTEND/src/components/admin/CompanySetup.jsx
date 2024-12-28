import React, { useState ,useEffect} from "react";
import NavBar from "../shared/NavBar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { company_end_point } from "@/utils/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hook/useGetCompanyById";



function CompanySetup() {
  const {singleCompany} =useSelector((store)=>store.company)
  const [input, setInput] = useState({
    name: "",
    description:"",
    website:"",
    location:"",
    file: null
  });

  const params=useParams();
  const jobId=params.id;
  useGetCompanyById(params.id);
  const navigate=useNavigate()

  const [loading,setLoading]=useState(false)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file})
  }

  const submitHandler= async (e)=>{
    e.preventDefault();
    console.log(input);
    const formData =new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);

    if(input.file){
      formData.append("file",input.file);
    }

    try {
      setLoading(true);
      const response= await axios.put(`${company_end_point}/update/${jobId}`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      })

      if(response.data.success){
        toast.success(response.data.message)
        navigate("/admin/companies")
      }
      
    } 
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
    finally{
      setLoading(false);
    }
    
  }

  useEffect(() => {
    setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null
    })
},[singleCompany]);
  return (
    <div>
      <NavBar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 "
              onClick={()=>navigate("/admin/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
            <Label>Compnay Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
            </div>

            <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
            </div>

            <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
            </div>

            <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
            </div>

            <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait while updating
            </Button>
          ) : (
            <Button type="submit" className="my-4 w-full ">
             Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
