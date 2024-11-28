import axios from "axios";
import { useState } from "react";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { useMessageData } from "../context/UserContext";

const HeroForm = () => {
  const { setMessageData, setShow } = useMessageData();
  const [formData, setFormData] = useState({
    name: "hero",
    h1: "",
    p: "",
    link: "",
    asset_type: "image",
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
    try {
      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/pages/hero",
        {
          ...formData,
          fileName: file.name,
          contentType: file.type,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Url : ", data.url);
      if (data.url) {
        // const response = await axios.put(data?.url, file, {
        //   headers: {
        //     "Content-Type": file.type,
        //     "x-amz-acl": "public-read",
        //   },
        // });
        // console.log("Response: ", ...response);
        const response = await fetch(data.ur, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          },
          body: file,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Upload failed:", errorText);
          throw new Error("Upload failed");
        }

        console.log(response);
        console.log(...response);
        console.log(response?.text());
      }

      setMessageData({
        message: "Hero Page Updated Successfully",
        icon: <FaCheck />,
        err: false,
        show: true,
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create or Update Hero Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label className="block font-medium mb-1">Page Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="Enter the page name"
            required
          />
        </div> */}
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HeroForm;
