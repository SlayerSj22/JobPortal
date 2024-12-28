import { setSearchJobByText } from '@/redux/jobSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import NavBar from '../shared/NavBar';
import useGetAllAdminJobs from '@/hook/useGetAllAdminJobs';
import AdminJobsTable from './AdminJobsTable';

function AdminJobs() {
  useGetAllAdminJobs()
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setSearchJobByText(input));
  },[input])

  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className=" my-5 flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="filter by role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post a new Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs