import { setAllAdminJobs } from '@/redux/jobSlice';
import { job_end_point } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllAdminJobs() {
    const dispatch =useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs= async ()=>{
      try {
        const res= await axios.get(`${job_end_point}/getadminjobs`,{withCredentials:true})
        if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs))
        }
       
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs