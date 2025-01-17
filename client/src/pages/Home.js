import axios from "axios";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PopulairCourses from "../components/PopulairCourses";
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
          process.env.REACT_APP_API_URL + "course/populaire"
        );
        setPopulaireCourses(data.courses?.slice(0, 4) || []);
      } catch (error) {
        console.log(error);
      }
    };
    const getNewestCourses = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "course/newest"
        );
        setnewCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "categories"
        );
        setCategories([...data.categories]);
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
          <h1 className="text-[1.8rem] md:text-[2.6rem] capitalize text-center font-bold mb-5 text-blackColor">
            {" "}
            Elevating the Game
          </h1>
          <div className="flex h-[12dvh] md:h-[20dvh] justify-center items-center gap-10 py-4 animate-scroll mb-5">
            {LigueImages.map((ligue, index) => (
              <span key={index} className="text-[5rem] md:text-[8rem]">
                {" "}
                {ligue}{" "}
              </span>
            ))}
            {LigueImages.map((ligue, index) => (
              <span key={index} className="text-[5rem] md:text-[8rem]">
                {" "}
                {ligue}{" "}
              </span>
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
          <h1 className="text-[1.8rem] md:text-[2.8rem] capitalize text-center font-bold mb-5 text-blackColor">
            {" "}
            Popular Topic{" "}
          </h1>
          <div className="flex h-[180px] justify-center gap-10 py-8 animate-scroll mb-5">
            {categories.map((categorie, i) => (
              <div
                key={i}
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
      <Footer />
    </div>
  );
}

export default Home;
