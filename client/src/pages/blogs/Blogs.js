import { LuSettings2 } from "react-icons/lu";
import React, { useEffect, useRef, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserStore } from "../../context/UserContext";
import BlogBox from "../../components/BlogBox";

const Blogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();
  const spanRef = useRef(null);
  const [selectedSections, setSelectedSections] = useState([]);
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

  const [blogs, setBlogs] = useState([]);

  const GetFilterPlats = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://bsesa-ksem.vercel.app/blogs", {
        params: {
          categories: selectedSections,
          page: currentPage,
          limit: 12,
        },
      });
      setBlogs(data.blogs);
      setNbOfPages(data.NbofPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    <div className="w-full  bg-secondary relative pt-[100px] min-h-[100vh] z-10 flex justify-between flex-wrap">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <>
          {" "}
          <nav
            ref={navRef}
            className="fixed pt-40 duration-500 h-[100vh] top-[0px] left-0 -translate-x-full bg-blackColor text-white w-full md:w-[300px] z-[99999999999999]"
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
              spanRef.current?.classList.toggle("text-secondary");
              navRef.current?.classList.toggle("-translate-x-full");
            }}
            className="p-3 fixed top-[105px] left-[20px] duration-300 z-[999999999999] text-[1.7rem] text-secondary bg-primary rounded-full cursor-pointer"
          >
            <LuSettings2 />
          </span>
          {user?.role === "admin" && (
            <h1 className="w-fit flex items-center gap-2 ml-auto px-4 py-2 bg-primary relative z-[9999999] rounded-full mt-3 text-whiteColor text-[1.4rem] cursor-pointer">
              <Link to="/add-plat">Add Course</Link> <MdAdd />
            </h1>
          )}
          <div className="w-full pb-20 xl:w-[90%] mx-auto rounded-xl flex justify-center gap-5 gap-y-5 items-start flex-wrap pt-5">
            {blogs?.length > 0 &&
              blogs.map((blog) => (
                <BlogBox key={blog._id} blog={blog} color="black" />
              ))}
            {blogs?.length === 0 && (
              <h1 className="text-[5rem] text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {" "}
                No Blogs matches the search!{" "}
              </h1>
            )}
          </div>
          <div className=" absolute bottom-5 left-1/2 -translate-x-1/2 z-30 container flex justify-center items-center gap-1">
            {[...Array(NbOfPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={` w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
