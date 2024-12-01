import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaFilter, FaLanguage, FaStar, FaUser } from "react-icons/fa";

const ManageCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  useEffect(() => {
    const getCoachces = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/coaches/" + id,
          {
            params: {
              page: 1,
            },
            withCredentials: true,
          }
        );
        setCoaches(data.coaches);
      } catch (error) {
        console.log(error);
      }
    };

    let result = coaches;

    if (filters.coachingLevel) {
      result = result.filter(
        (coach) => coach.CoachingLevel === filters.coachingLevel
      );
    }

    if (filters.specialties) {
      result = result.filter((coach) =>
        coach.specialties.includes(filters.specialties)
      );
    }

    if (filters.languagesSpoken) {
      result = result.filter((coach) =>
        coach.languagesSpoken.includes(filters.languagesSpoken)
      );
    }

    if (filters.status) {
      result = result.filter((coach) => coach.status === filters.status);
    }

    setFilteredCoaches(result);
  }, [coaches, filters]);

  // Get unique values for dropdown filters
  const getUniqueValues = (key) => {
    return [...new Set(coaches.map((coach) => coach[key]).filter(Boolean))];
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <FaFilter className="mr-2 text-gray-600" />
          <h2 className="text-lg font-semibold">Coach Filters</h2>
        </div>

        <div className="space-y-4">
          {/* Coaching Level Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Coaching Level
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.coachingLevel}
              onChange={(e) =>
                handleFilterChange("coachingLevel", e.target.value)
              }
            >
              <option value="">All Levels</option>
              {getUniqueValues("CoachingLevel").map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Specialty
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.specialties}
              onChange={(e) =>
                handleFilterChange("specialties", e.target.value)
              }
            >
              <option value="">All Specialties</option>
              {getUniqueValues("specialties").map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Languages Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.languagesSpoken}
              onChange={(e) =>
                handleFilterChange("languagesSpoken", e.target.value)
              }
            >
              <option value="">All Languages</option>
              {getUniqueValues("languagesSpoken").map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Coaches List */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-gray-600" />
          <h2 className="text-lg font-semibold">
            Coaches ({filteredCoaches.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoaches.map((coach) => (
            <div
              key={coach._id}
              className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
            >
              {coach.image ? (
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-16 h-16 text-gray-400" />
              )}
              <div>
                <h3 className="font-bold text-lg">{coach.name}</h3>
                <p className="text-sm text-gray-600">
                  {coach.specialties.join(", ")}
                </p>
                <div className="text-sm mt-2">
                  <div className="flex items-center">
                    <FaStar className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>Experience: {coach.experienceYears} years</span>
                  </div>
                  <div className="flex items-center">
                    <FaLanguage className="w-4 h-4 mr-1 text-blue-500" />
                    <span>Level: {coach.CoachingLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No coaches match the current filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageCoaches;
