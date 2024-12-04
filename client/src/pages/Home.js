import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFootball } from "react-icons/fa6";
import Hero from "../components/Hero";
import PopulairCourses from "../components/PopulairCourses";
import Plans from "../pages/Plans";
import { CiBasketball, CiFootball } from "react-icons/ci";
import { IoIosFootball } from "react-icons/io";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { GiBoxingGlove } from "react-icons/gi";
import Footer from "../components/Fotter";
import HomePage from "../components/HomeComponent";

function Home() {
  const [populaireCourses, setPopulaireCourses] = useState([]);
  const [newCourses, setnewCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const LigueImages = [
    <CiFootball />,
    <IoIosFootball />,
    <MdOutlineSportsVolleyball />,
    <CiBasketball />,
    <GiBoxingGlove />,
  ];
  useEffect(() => {
    const getPopulairCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/course/populaire"
        );
        setPopulaireCourses([
          data.courses[0],
          data.courses[1],
          data.courses[2],
          data.courses[3],
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    const getNewestCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/course/newest"
        );
        setnewCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/categories"
        );
        setCategories([...data.categories, ...data.categories]);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getPopulairCourses();
    getNewestCourses();
  }, []);
  return (
    <div className="w-full relative">
      <Hero />
      <div className="w-full h-fit py-5 bg-whiteColor overflow-hidden  flex justify-center items-center">
        <div className="w-full">
          <h1 className="text-[2rem] capitalize text-center font-bold mb-5 text-blackColor">
            {" "}
            Elevating the Game
          </h1>
          <div className="flex h-[15dvh] md:h-[20dvh] justify-center items-center gap-10 py-4 animate-scroll mb-5">
            {LigueImages.map((ligue, index) => (
              // <img key={index} className="h-full" src={ligue} alt="Ligue" />
              <span className="text-[8rem]"> {ligue} </span>
            ))}
            {LigueImages.map((ligue, index) => (
              // <img key={index} className="h-full" src={ligue} alt="Ligue" />
              <span className="text-[8rem]"> {ligue} </span>
            ))}
          </div>
          <PopulairCourses
            courses={populaireCourses}
            headerText="Populair Courses"
          />
        </div>
      </div>
      <div className="w-full h-fit py-5 bg-whiteColor overflow-hidden  flex justify-center items-center pb-10">
        <div className="w-full ">
          <h1 className="text-[2rem] capitalize text-center font-bold mb-5 text-blackColor">
            {" "}
            Popular Topic{" "}
          </h1>
          <div className="flex h-[180px] justify-center gap-10 py-8 animate-scroll mb-5">
            {categories.map((categorie, i) => (
              <div
                className={`px-5 rounded-md w-[180px] h-[90px] flex justify-center items-center bg-whiteColor relative text-[1.4rem] ShadowCLass ${
                  i % 2 == 0 ? "self-start" : "self-end"
                } ${
                  i % 3 === 0
                    ? "category1"
                    : i % 3 === 1
                    ? "category2"
                    : "category3"
                }`}
              >
                {categorie.name}
              </div>
            ))}
          </div>
          <PopulairCourses courses={newCourses} headerText="Fresh Courses" />
        </div>
      </div>
      <HomePage />
      {/* <Plans /> */}
      <Footer />
    </div>
  );
}

export default Home;
