import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hook/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyBytext } from "@/redux/companySlice";

function Companies() {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setSearchCompanyBytext(input));
  },[input])

  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className=" my-5 flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
