import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  FaBookOpen,
  FaTag,
  FaLink,
  FaFile,
  FaEye,
  FaCalendarDay,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const Research = () => {
  const { id } = useParams();
  const [research, setResearch] = useState(null);
  useEffect(() => {
    const getResearch = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/researches/" + id
        );
        setResearch(data);
      } catch (error) {
        console.log(error);
      }
    };
    getResearch();
  }, []);
  const sampleResearch = {
    title: "Artificial Intelligence in Modern Healthcare",
    abstract:
      "This comprehensive study explores the transformative potential of AI technologies in medical diagnostics, patient care, and healthcare management.",
    content:
      "The research delves into various AI applications, including machine learning algorithms for early disease detection, predictive analytics for patient outcomes, and automated medical imaging interpretation...",
    tags: ["AI", "Healthcare", "Machine Learning", "Medical Technology"],
    references: [
      "IEEE Journal of Biomedical and Health Informatics",
      "Nature Medicine Research",
    ],
    category: { name: "Medical Technology" },
    views: 1245,
    createdAt: new Date("2024-02-15"),
    thumbnail: "/api/placeholder/800/400",
    file: "/sample-research.pdf",
  };

  const displayResearch = research || sampleResearch;

  return (
    <div className="w-full min-h-[100dvh] pt-[100px] pb-[30px] bg-secondary">
      <div className="mx-auto px-4 py-8 max-w-[1100px] Shadow">
        <div className="bg-whiteColor rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={displayResearch.thumbnail || "/api/placeholder/800/400"}
              alt={displayResearch.title}
              className="w-full h-64 md:h-[400px] object-cover"
            />
            <span className="absolute top-4 right-4 bg-primaryTra text-primary p-2 rounded-full text-sm flex items-center justify-center">
              <FaBookOpen className="h-5 w-5" />
              {displayResearch.category?.name}
            </span>
          </div>

          {/* Research Details */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blackColor mb-4">
              {displayResearch.title}
            </h1>

            {/* Metadata */}
            <div className="grid md:grid-cols-3 justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2  w-fit">
                <FaCalendarDay className="h-5 w-5 text-blackColor" />
                <span>
                  {new Date(displayResearch.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 w-fit">
                <FaEye className="h-5 w-5 text-blackColor" />
                <span>{displayResearch.views} Views</span>
              </div>
              <div className="flex items-center space-x-2 w-fit">
                <FaLink className="h-5 w-5 text-blackColor" />
                <a
                  href={displayResearch.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Download Research
                </a>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-t border-secondary mb-6" />

            {/* Abstract */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-blackColor mb-3">
                Abstract
              </h2>
              <p className="text-blackColor leading-relaxed">
                {displayResearch.abstract}
              </p>
            </section>

            {/* Content */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-blackColor mb-3">
                Research Content
              </h2>
              <p className="text-blackColor leading-relaxed">
                {displayResearch.content}
              </p>
            </section>

            {/* Tags */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-blackColor mb-3 flex items-center">
                <FaTag className="mr-2 h-5 w-5" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayResearch.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-blackColor px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* References */}
            <section>
              <h2 className="text-xl font-semibold text-blackColor mb-3 flex items-center">
                <FaFile className="mr-2 h-5 w-5" /> References
              </h2>
              <ul className="list-disc list-inside text-blackColor">
                {displayResearch.references.map((ref, index) => (
                  <li key={index} className="mb-2">
                    {ref}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
