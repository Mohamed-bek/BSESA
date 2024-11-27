import { LuSettings2 } from "react-icons/lu";
import CourseBox from "../components/CourseBox";
import React, { useEffect, useRef, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserStore } from "../context/UserContext";

const Page = () => {
  const { user } = useUserStore();
  const spanRef = useRef(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [rating, setRating] = useState(1);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const handleCheckboxChange = (event) => {
    const section = event.target.value;

    setSelectedSections((prev) => {
      if (prev.includes(section)) {
        return prev.filter((s) => s !== section); // Remove if already selected
      } else {
        return [...prev, section]; // Add if not selected
      }
    });
  };

  const [courses, setCourses] = useState([]);

  const GetFilterPlats = async () => {
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/courses",
        {
          params: {
            minPrice,
            maxPrice,
            categories: selectedSections,
            rating,
            page: currentPage,
            limit: 20,
          },
        }
      );
      setCourses(data.courses);
      setNbOfPages(data.NbOfPages);
      // console.log(data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/categories"
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetFilterPlats();
    getCategories();
  }, [currentPage]);

  const navRef = useRef(null);

  return (
    <div className="w-full bg-secondary relative pt-[100px] min-h-[100vh] z-10">
      <nav
        ref={navRef}
        className="fixed pt-36 duration-500 h-[100vh] top-[0px] left-0 -translate-x-full bg-blackColor text-white w-full md:w-[300px] z-[99999999999999]"
      >
        <h2 className="pl-3 text-[1.7rem] mb-4">Filters:</h2>
        <h3 className="pl-5 text-[1.4rem]">Category:</h3>
        <div className="px-5 text-[1.15rem] text-whiteColor">
          {categories.map((category) => (
            <label
              key={category._id}
              className="flex items-center mb-2 text-[1.1rem]"
            >
              <input
                type="checkbox"
                value={category._id}
                checked={selectedSections.includes(category._id)}
                onChange={handleCheckboxChange}
                className="mr-2 w-4 h-4"
              />
              {category.name}
            </label>
          ))}
          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="rounded-md text-black font-bold py-1 px-2 w-full focus:outline-none"
              placeholder="DA"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="rounded-md text-black font-bold px-2 py-1 w-full focus:outline-none"
              placeholder="DA"
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Rating:</label>
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                return (
                  <RiStarSFill
                    key={starValue}
                    className={`cursor-pointer text-[2rem] ${
                      starValue <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={() => GetFilterPlats()}
            className="w-fit block px-4 py-2 bg-primary text-secondary cursor-pointer rounded-3xl mt-3 text-[1.5rem] font-medium mx-auto"
          >
            Apply Filters
          </button>
        </div>
      </nav>
      <span
        ref={spanRef}
        onClick={() => {
          spanRef.current?.classList.toggle("bg-white");
          spanRef.current?.classList.toggle("text-blackColor");
          spanRef.current?.classList.toggle("text-whiteColor");
          navRef.current?.classList.toggle("-translate-x-full");
        }}
        className="p-3 fixed top-[90px] left-[20px] duration-300 z-[999999999999] text-[1.7rem] text-whiteColor bg-primary rounded-full cursor-pointer"
      >
        <LuSettings2 />
      </span>
      <div className="container rounded-xl flex justify-center gap-5 gap-y-5 items-stretch flex-wrap py-5 pt-4 pb-20">
        {courses?.length > 0 &&
          courses.map((course) => (
            <div>
              <CourseBox key={course._id} course={course} color="black" />
            </div>
          ))}
        {courses?.length === 0 && (
          <h1 className="text-[5rem] text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {" "}
            No course matches the search!{" "}
          </h1>
        )}
      </div>
      <div className=" absolute bottom-7 left-1/2 -translate-x-1/2 z-30 container flex  justify-center items-center gap-1">
        {[...Array(NbOfPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={` w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
              currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;
