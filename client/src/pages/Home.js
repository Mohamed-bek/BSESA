import axios from "axios";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PopulairCourses from "../components/PopulairCourses";
import Plans from "../pages/Plans";

function Home() {
  const [populaireCourses, setPopulaireCourses] = useState([]);
  const [newCourses, setnewCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const LigueImages = [
    "/ligue/1.png",
    "/ligue/2.png",
    "/ligue/3.png",
    "/ligue/4.png",
    "/ligue/5.png",
  ];
  useEffect(() => {
    const getPopulairCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/course/populaire"
        );
        setPopulaireCourses(data.courses);
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
            Trusted by{" "}
          </h1>
          <div className="flex h-[15dvh] md:h-[20dvh] justify-center items-center gap-10 py-4 animate-scroll mb-5">
            {LigueImages.map((ligue, index) => (
              <img key={index} className="h-full" src={ligue} alt="Ligue" />
            ))}
            {LigueImages.map((ligue, index) => (
              <img key={index} className="h-full" src={ligue} alt="Ligue" />
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
                className={`px-5 py-7 h-[90px] bg-whiteColor relative text-[1.4rem] ShadowCLass ${
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
      <Plans />
    </div>
  );
}

export default Home;
