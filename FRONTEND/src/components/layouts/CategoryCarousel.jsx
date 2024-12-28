import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { setSearchQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "frontend devloper",
  "backend devloper",
  "data scientist",
  "graphic designer",
  "devops specialist",
  "fullstack devloper",
];
function CategoryCarousel() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const searchQueryHandler = (query)=>{
     dispatch(setSearchQuery(query));
     navigate("/browse")
    }
  return (
    <div className="text-center mx-auto">
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              <Button onClick={()=>searchQueryHandler(cat)} className="rounded-2xl">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
