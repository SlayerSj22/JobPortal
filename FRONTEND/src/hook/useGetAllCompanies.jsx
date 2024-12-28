import { setAllCompanies } from '@/redux/companySlice';
import { company_end_point} from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetAllCompanies() {
  const dispatch =useDispatch();
  useEffect(()=>{
    const fetchAllCompanies= async ()=>{
      try {
        const res= await axios.get(`${company_end_point}/get`,{withCredentials:true})
        if(res.data.success){
            dispatch(setAllCompanies(res.data.companies))
        }
       
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllCompanies();
  },[])
}

export default useGetAllCompanies