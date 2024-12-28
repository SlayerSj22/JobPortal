import {Job} from "../models/job.model.js"

const postJob =async (req,res)=>{

  try {
    const {title,description,requirements,salary,experienceLevel,location,jobType,position,companyId}=req.body;
    const userId=req.id;
    

  if(!title||!description||!requirements||!salary||!experienceLevel||!location||!jobType||!position||!companyId){
    return res.status(400).json({
        message:"All fields are required",
        success:false
    })
  }


  const arr=requirements.split(",");
  
  const job =await Job.create({
    title,
    description,
    requirements:arr,
    salary:Number(salary),
    experienceLevel:Number(salary),
    location,
    jobType,
    position:Number(position),
    company:companyId,
    created_by:userId
  })


  return res.status(200).json({
    message:"Job created successfully",
    success:true,
    job
  })

  }
  
  
  catch (error) {
    console.log(error);
    
  }

}

//studnet ke liye
const getAllJobs= async (req,res)=>{
    try {
        const keyword= req.query.keyword || "";
        const query = {
            $or:[
                { title :{$regex:keyword,$options:"i"}},
                { description :{$regex:keyword,$options:"i"}}
            ]
        }

        const jobs= await Job.find(query).populate({
            path:"company"
        }).sort({created_At:-1});
        


        if(!jobs)
            return res.status(404).json({
              message:"No jobs found with spcific keyword",
              success:false
            })



          
            return res.status(200).json({
                message:"Jobs fetched successfully",
                success:true,
                jobs
            })

    } 
    
    catch (error) {
        console.log(error);
        
    }
}

const getJobById= async (req,res)=>{
    try {
         const id=req.params.id;
         const job = await Job.findById(id).populate({
            path:"applications"
         })
         
         ;
         if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
         } 

         return res.status(200).json({
            success:true,
            job
         })

    } catch (error) {
        console.log(error);
        
    }
}

// all jobs created by a recruiter
const getAdminJobs= async (req,res)=>{
    try {
        const adminId=req.id;
        const jobs= await Job.find({created_by:adminId}).populate({
            path:'company',
            created_At:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            success:true,
            jobs
        })

    } catch (error) {
        console.log(error);
        
    }
}







export{
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
}