import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaExclamation, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { FaFilter, FaSearch } from "react-icons/fa";
import { CheckAuthetication } from "../Login";
const ManageResearches = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [researches, setResearches] = useState([]);
  const { setShow, setMessageData } = useMessageData();
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getResaerches = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/researches/",
          {
            params: {
              title,
              category: categorie,
              page: currentPage,
              limit: 20,
            },
          }
        );
        console.log(data);
        setNbOfPages(data.NbOfPages);
        setResearches(data.researches);
      } catch (error) {
        console.error("Error fetching researches:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getResaerches();
  }, [categorie, title, currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/categories"
        );
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteResearch = async (id) => {
    try {
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      const { data } = await axios.delete(
        `https://bsesa-ksem.vercel.app/researches/${id}`,
        {
          withCredentials: true,
        }
      );
      const newResaerches = researches.filter((a) => a._id !== id);
      setResearches(newResaerches);
      setMessageData({
        message: "Application deleted successfully",
        icon: <FaCheck />,
        err: false,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.log(error);
      setMessageData({
        message: "Application deletion failed",
        icon: <FaExclamation />,
        err: true,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="w-full h-full relative pt-3">
      <div className="mb-3 flex flex-col md:flex-row gap-4 px-5">
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
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Name</div>
        <div className="w-[120px] text-center">category</div>
        <div className="w-[120px] text-center">views</div>
        <div className="w-[120px] text-center">Created</div>
        <div className="w-[120px] text-center">Manage</div>
      </header>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
          <div className="loader"></div>
        </div>
      )}{" "}
      {!isLoading && (
        <>
          {" "}
          <div className="h-[calc(100%-155px)] overflow-y-auto">
            {researches.map((research) => (
              <div
                key={research._id}
                className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
              >
                <div className="flex-1 min-w-[250px]">{research.title}</div>
                <div className="w-[120px] text-center">
                  {research.category?.name || "unknown"}
                </div>
                <div className="w-[120px] text-center">{research?.views}</div>
                <div className="w-[120px] text-center">
                  {new Date(research.createdAt).toLocaleDateString()}
                </div>
                <div className="w-[120px] text-center flex items-center justify-center gap-2">
                  <Link
                    title="edit"
                    to={`/dashboard/manage-researches/update-research/${research._id}`}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    title="delete"
                    onClick={() => {
                      deleteResearch(research._id);
                    }}
                    className="text-red-500 ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-1">
            {[...Array(NbOfPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
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
      )}{" "}
    </div>
  );
};

export default ManageResearches;
