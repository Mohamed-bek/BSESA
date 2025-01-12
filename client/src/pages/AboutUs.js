import React, { useEffect, useState } from "react";
import {
  FaAward,
  FaBookOpen,
  FaBrain,
  FaGlobe,
  FaMicroscope,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AboutUs = () => {
  const services = [
    {
      icon: <FaBookOpen className="w-16 h-16 text-primary" />,
      title: "Sport Performance",
    },
    {
      icon: <FaUsers className="w-16 h-16 text-primary" />,
      title: "Academy & Club Expertise",
    },
    {
      icon: <FaAward className="w-16 h-16 text-primary" />,
      title: "Health & Well-being",
    },
    {
      icon: <FaGlobe className="w-16 h-16 text-primary" />,
      title: "Nutrition",
    },
    {
      icon: <FaMicroscope className="w-16 h-16 text-primary" />,
      title: "Cutting-Edge Research",
    },
    {
      icon: <FaBrain className="w-16 h-16 text-primary" />,
      title: "And More",
    },
  ];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "categories"
        );
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative min-h-screen bg-secondary pt-[70px] overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[100px] left-[-100px] w-[600px] h-[600px] 
          bg-primaryTra rounded-full blur-3xl"
        ></div>
        <div
          className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] 
          bg-primaryTra z-10 rounded-full blur-3xl"
        ></div>
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Britannia Sport and Exercise Science Academy:
          </h1>
          <p className="text-xl max-w-[70%] mx-auto">
            At the heart of the Britannia Sport and Exercise Science Academy is
            a passionate and highly skilled team of scientists, coaches, and
            sports professionals, based in the United Kingdom with a global
            presence in countries including Sweden, France, Morocco, Tunisia,
            Algeria, Saudi Arabia, Oman and Kuwait.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-20 bg-transparent">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          We specialise in a wide array of areas, including:
        </h2>
        <div className="grid md:grid-cols-3 md:w-[90%] mx-auto gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/80 group backdrop-blur-sm shadow-lg rounded-lg p-6 
              transform transition relative duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#80808013] scale-0 duration-300 cursor-pointer group-hover:scale-100 "></div>
              <div className="flex items-center text-[5rem] justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="ml-4 text-[1.4rem] font-semibold text-gray-800 text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100/80 backdrop-blur-sm py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Comprehensive Course Categories
          </h2>
          <div className="flex flex-wrap md:w-[90%] mx-auto justify-center gap-4">
            {categories.map((category) => (
              <span
                key={category._id}
                className="bg-primaryTra text-primary px-4 py-2 rounded-full 
                transition hover:scale-105 hover:shadow-md"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-100px] left-[-50px] w-[400px] h-[400px] 
          bg-primary/10 rounded-full blur-3xl"
          ></div>
          <div
            className="absolute bottom-[-100px] right-[-50px] w-[500px] h-[500px] 
          bg-primary/10 rounded-full blur-3xl"
          ></div>
        </div>

        <div className="container bg-transparent z-20 mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-1 bg-primary "></div>
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <FaAward className="text-primary w-16 h-16 mr-4" />
                <h2 className="text-4xl font-bold text-gray-800">
                  Our Visionary Mission
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Comprehensive Development
                    </h3>
                    <p className="text-gray-700">
                      We are dedicated to nurturing holistic athletic potential
                      by integrating advanced scientific research, cutting-edge
                      technologies, and transformative educational strategies.
                    </p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Innovative Approach
                    </h3>
                    <p className="text-gray-700">
                      Our mission transcends traditional boundaries, empowering
                      athletes, coaches, and organizations to achieve
                      extraordinary performance through interdisciplinary
                      insights.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    At the{" "}
                    <span className=" font-bold">
                      {" "}
                      BRITANNIA SPORT AND EXERCISE SCIENCE ACADEMY{" "}
                    </span>{" "}
                    , we don't just train athletes—we transform human potential.
                    Our approach combines rigorous scientific research,
                    psychological resilience, and technological innovation to
                    create a comprehensive ecosystem of athletic excellence.
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="w-1 h-12 bg-primary mr-4"></div>
                    <p className="italic text-gray-600">
                      "Elevating performance, inspiring potential"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
