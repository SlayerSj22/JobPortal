import React, { useEffect } from 'react'
import NavBar from '../shared/NavBar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { application_end_point } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'


function JobApplicants() {
  
  const params=useParams()
  const dispatch = useDispatch()
  const {applicants}= useSelector((store)=>store.application)
  useEffect(()=>{
     const fetchAllApplicants= async ()=>{
      try {
        const response = await axios.get(`${application_end_point}/${params.id}/getApplicants`,{withCredentials:true})
        
        if(response.data.success){
          dispatch(setAllApplicants(response.data.applications))
        }

      } catch (error) {
        console.log(error);
        
      }
     }
     fetchAllApplicants()
  },[])
  return (
    <div>
        <NavBar />
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants  :{applicants.length}</h1>
            <ApplicantsTable  />
        </div>
    </div>
  )
}

export default JobApplicants