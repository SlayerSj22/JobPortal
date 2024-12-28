import React, { useEffect } from "react";
import NavBar from "./shared/NavBar";
import HeroSection from "./layouts/HeroSection";
import CategoryCarousel from "./layouts/CategoryCarousel";
import LatestJobs from "./layouts/LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hook/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role==="recruiter")
      navigate("/admin/companies")
  },[])

  
  return (
    <div>
      <NavBar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
