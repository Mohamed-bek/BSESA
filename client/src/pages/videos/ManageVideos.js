import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaEdit, FaExclamation, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { CheckAuthetication } from "../Login";

const ManageVideos = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const { setShow, setMessageData } = useMessageData();
  const [videos, setVideos] = useState([]);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [password, setPassword] = useState("");
  const deleteRef = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getVideosForAdmin = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "videos",
          {
            params: {
              title: searchQuery,
              page: currentPage,
              limit: 10,
            },
            withCredentials: true,
          }
        );
        console.log("Videos Videos Videos : ", data);
        setVideos(data.videos);
        setNbOfPages(data.NbOfPages);
      } catch (error) {
        console.log(error);
      }
    };

    getVideosForAdmin();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteVideo = async (e) => {
    e.preventDefault();
    const check = await CheckAuthetication();
    if (!check) {
      logout();
      navigate("/login");
      return;
    }
    try {
      await axios.delete(process.env.REACT_APP_API_URL + `admin/video/${id}`, {
        data: {
          password,
        },
        withCredentials: true,
      });
      deleteRef.current.classList.add("scale-0");
      const newVideos = videos.filter((v) => v._id !== id);
      setVideos(newVideos);
      setId(null);
      setMessageData({
        message: "Video deleted successfully",
        icon: <FaCheck />,
        err: false,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.log(error);
      setMessageData({
        message: "Video deletion failed",
        icon: <FaExclamation />,
        err: true,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto relative">
      <div
        ref={deleteRef}
        className="absolute duration-300 top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999] scale-0"
      >
        <form className="p-8 bg-white rounded-lg">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Enter your password"
            className="bg-secondary border-none rounded-md p-2  focus:outline-none mb-6"
          />
          <div className="flex justify-center gap-2 items-center">
            <button
              onClick={(e) => deleteVideo(e)}
              className="bg-red-500 text-whiteColor px-4 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setId(null);
                deleteRef.current.classList.add("scale-0");
              }}
              className="bg-blue-500 text-whiteColor px-4 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="w-full bg-whiteColor flex items-center justify-between px-5 py-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[260px] p-2 focus:outline-none bg-secondary border border-primary rounded-lg"
          placeholder="Search by title"
        />
      </div>
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Title</div>
        <div className="flex-1 min-w-[250px]">URL</div>
        <div className="w-[180px] text-center">Created</div>
        <div className="w-[120px] text-center">Manage</div>
      </header>

      <div className="h-[calc(100%-160px)] overflow-y-auto">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
          >
            <div className="flex-1 min-w-[250px]">{video.title}</div>
            <div className="flex-1 min-w-[250px] text-blue-500 underline">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                View Video
              </a>
            </div>
            <div className="w-[180px] text-center">
              {new Date(video.createdAt).toLocaleDateString()}
            </div>
            <div className="w-[120px] text-center flex items-center justify-center gap-2">
              <Link
                title="edit"
                to={`/dashboard/manage-videos/update-video/${video._id}`}
                className="text-blue-500"
              >
                <FaEdit />
              </Link>
              <button
                title="delete"
                onClick={() => {
                  setId(video._id);
                  deleteRef.current.classList.remove("scale-0");
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
              currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageVideos;
