import { setSingleCompany } from '@/redux/companySlice';
import { company_end_point } from '@/utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function useGetCompanyById(compId) {
    const dispatch =useDispatch();
    useEffect(()=>{
      const fetchCompany= async ()=>{
        try {
          const res= await axios.get(`${company_end_point}/get/${compId}`,{withCredentials:true})
          if(res.data.success){
              dispatch(setSingleCompany(res.data.company))
          }
         
          
        } catch (error) {
          console.log(error);
          
        }
      }
      fetchCompany();
    },[compId,dispatch])
}

export default useGetCompanyById