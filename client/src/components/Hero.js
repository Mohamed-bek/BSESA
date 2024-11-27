import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Hero() {
  const pages = [
    {
      _id: 1,
      image: "/Landing/1.jpg",
      h1: "Unlock Your Potential",
      link: "#",
      color: "black",
      p: "Discover tailored training programs designed to enhance your skills and achieve your goals. Our coaching sessions focus on personal growth and professional excellence.",
    },
    {
      _id: 2,
      image: "/Landing/2.jpg",
      h1: "Empowering Through Knowledge",
      link: "#",
      color: "white",
      p: "Our coaching philosophy centers around empowering individuals with the tools and knowledge they need to thrive. Join us to embark on a transformative journey of learning and success.",
    },
    {
      _id: 3,
      link: "#",
      image: "/Landing/3.jpg",
      color: "white",
      h1: "Achieve Your Dreams",
      p: "With our expert guidance, you'll gain clarity, confidence, and the competence to reach your aspirations. Let's work together to turn your vision into reality.",
    },
  ];
  return (
    <div className="w-full h-[75vh] md:h-[100dvh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
      >
        {pages.map((page) => (
          <SwiperSlide className="w-full h-[75vh] md:min-h-[100dvh]">
            {" "}
            <img
              className="w-full h-[75vh] md:h-[100dvh] absolute top-0 left-0"
              src={page.image}
            />{" "}
            <div
              className={`w-full h-[75vh] md:h-[100dvh] flex items-center z-30 relative ${
                page.color === "black" ? "text-black" : "text-white"
              }`}
            >
              <div className="w-full pt-[120px] md:w-1/2 px-3 md:pl-20">
                <h1 className="text-[2rem] md:text-[4rem] font-bold leading-[1.1] mb-8">
                  {" "}
                  {page.h1}{" "}
                </h1>
                <p className="text-[1.3rem] font-light mb-8 "> {page.p} </p>
                <button
                  className={`px-5 py-2 font-bold cursor-pointer text-[1.3rem] rounded-md ${
                    page.color === "black"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {" "}
                  Check That{" "}
                </button>
              </div>
            </div>
            <div className=" absolute top-0 left-0 w-full h-full bg-[#00000024]"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
