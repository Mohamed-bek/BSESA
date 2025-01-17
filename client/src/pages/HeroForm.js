import axios from "axios";
import { useState } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMessageData, useUserStore } from "../context/UserContext";
import { CheckAuthetication } from "./Login";

const HeroForm = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setMessageData, setShow } = useMessageData();
  const [formData, setFormData] = useState({
    name: "hero",
    h1: "",
    p: "",
    link: "",
    asset_type: "image",
    pageNb: 1,
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a video before submitting.");
      return;
    }
    setIsLoading(true);
    try {
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "pages/hero",
        {
          ...formData,
          fileName: file.name,
          contentType: file.type,
        },
        {
          withCredentials: true,
        }
      );
      if (data.url) {
        const response = await fetch(data.url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          },
          body: file,
        });

        if (!response.ok) {
          console.log("Error: ", response);
          const errorText = await response.text();
          console.error("Upload failed:", errorText);
          throw new Error("Upload failed");
        }

        console.log(response?.text());
      }

      setMessageData({
        message: "Hero Page Updated Successfully",
        icon: <FaCheck />,
        err: false,
        show: true,
      });
      setFormData({
        name: "hero",
        h1: "",
        p: "",
        link: "",
        asset_type: "image",
        pageNb: 1,
      });
      setTimeout(() => setShow(false), 1200);
    } catch (err) {
      console.log(err);
      setMessageData({
        message: "Failed to update Hero Page",
        icon: <FaExclamation />,
        err: true,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center bg-whiteColor">
      {" "}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
          <div className="loader"></div>
        </div>
      )}
      <div className="mx-auto bg-secondary rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 bg-primary text-whiteColor text-center px-6 py-4">
          Create or Update Hero Section
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-5">
          <div>
            <label className="block font-medium mb-1">Page Number</label>
            <select
              name="pageNb"
              value={formData.pageNb}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Heading (H1)</label>
            <input
              type="text"
              name="h1"
              value={formData.h1}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter the heading"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Paragraph</label>
            <textarea
              name="p"
              value={formData.p}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter the paragraph text"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter the link URL"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Asset Type</label>
            <select
              name="asset_type"
              value={formData.asset_type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Upload Asset</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded focus:outline-none"
              accept="image/*,video/*"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary  text-[1.2rem] font-semibold text-whiteColor mx-auto block py-2 px-4 rounded cursor-pointer "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroForm;
