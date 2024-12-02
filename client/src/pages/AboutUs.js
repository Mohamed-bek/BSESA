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
      icon: <FaBookOpen className="w-12 h-12 text-primary" />,
      title: "Transformative Educational Experiences",
      description:
        "Revolutionize your sports knowledge with our meticulously crafted online learning ecosystem. Our expert-led courses blend cutting-edge theoretical insights with practical, real-world applications across multiple sports disciplines.",
    },
    {
      icon: <FaUsers className="w-12 h-12 text-primary" />,
      title: "Elite Team Performance Integration",
      description:
        "Experience unprecedented coaching innovation through our immersive team embedding program. Our experts live, breathe, and transform team dynamics, providing unparalleled strategic insights and performance optimization techniques.",
    },
    {
      icon: <FaAward className="w-12 h-12 text-primary" />,
      title: "Comprehensive Academy Transformation",
      description:
        "Elevate sports academies from good to extraordinary with our holistic development approach. We integrate advanced technologies, data-driven strategies, nutrition science, and psychological frameworks to unlock peak athletic potential.",
    },
    {
      icon: <FaGlobe className="w-12 h-12 text-primary" />,
      title: "Global Knowledge Exchange Platforms",
      description:
        "Connect with the world's leading sports science minds through our internationally renowned conferences. Break through traditional boundaries, share groundbreaking research, and shape the future of athletic performance.",
    },
    {
      icon: <FaMicroscope className="w-12 h-12 text-primary" />,
      title: "Cutting-Edge Research Experiences",
      description:
        "Gain exclusive access to our state-of-the-art sports science laboratories. Dive deep into advanced research methodologies, innovative testing protocols, and breakthrough performance measurement techniques that redefine athletic excellence.",
    },
    {
      icon: <FaBrain className="w-12 h-12 text-primary" />,
      title: "Comprehensive Sports Intelligence Platform",
      description:
        "Unlock a world of sports knowledge through our expansive digital research ecosystem. Navigate through in-depth analytical insights, expert publications, and interdisciplinary research spanning nutrition, psychology, biomechanics, and beyond.",
    },
  ];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/categories"
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
            British Academy of Sports Science and Technology
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Pioneering Transformative Performance through Innovative Research
            and Strategic Education
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 relative z-20 bg-transparent">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Innovative Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/80 group backdrop-blur-sm shadow-lg rounded-lg p-6 
              transform transition relative duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#80808013] scale-0 duration-300 cursor-pointer group-hover:scale-100 "></div>
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="ml-4 text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Categories */}
      <div className="bg-gray-100/80 backdrop-blur-sm py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Comprehensive Course Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
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

      {/* Mission Statement */}
      {/* <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Our Visionary Mission
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          We are a pioneering institution committed to revolutionizing sports
          performance through an integrated approach of advanced research,
          strategic education, and holistic athlete development. Our mission
          transcends traditional boundaries, empowering athletes, coaches, and
          organizations to achieve extraordinary performance by bridging
          scientific innovation with practical excellence. We believe in
          nurturing not just athletic skills, but comprehensive human
          potential—combining cutting-edge sports science, psychological
          resilience, technological innovation, and a deep understanding of
          individual and team dynamics to create transformative sporting
          experiences.
        </p>
      </div> */}
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
                    At the British Academy of Sports Science and Technology, we
                    don't just train athletes—we transform human potential. Our
                    approach combines rigorous scientific research,
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
