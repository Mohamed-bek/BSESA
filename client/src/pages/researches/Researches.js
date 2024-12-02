import React, { useState, useEffect } from "react";
import ResearchBox from "../../components/ResearchBox";
import { FaFilter, FaSearch } from "react-icons/fa";
import axios from "axios";

const Researches = () => {
  const [researches, setResearches] = useState([]);
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
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

  useEffect(() => {
    const getResaerches = async () => {
      console.log("getResaerches");
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/researches/",
          {
            params: {
              title,
              category: categorie,
            },
          }
        );
        setResearches(data);
      } catch (error) {
        console.error("Error fetching researches:", error);
      }
    };
    getResaerches();
  }, [categorie, title]);

  return (
    <div className="container min-h-dvh mx-auto px-4 pt-[90px] pb-[20px] bg-secondary">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search researches..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            className="w-full pl-10 pr-4 py-[9px] border border-gray-300 rounded-lg focus:outline-none"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category}>
                {category.name}
              </option>
            ))}
          </select>
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researches.map((research) => (
          <ResearchBox research={research} />
        ))}
      </div>

      {/* No Results State */}
      {researches.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No researches found</p>
          <p>Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default Researches;
