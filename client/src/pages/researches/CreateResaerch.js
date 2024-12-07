import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  FaAlignLeft,
  FaBookOpen,
  FaFile,
  FaFileImage,
  FaHeading,
  FaTag,
} from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckAuthetication } from "../Login";

const CreateResearch = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { setErr, setMessage, setShow, setIcon } = useMessageData();
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [researchFile, setResearchFile] = useState(null);

  const thumbnailInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleThumbnailDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setThumbnail(file);
      } else {
        alert("Please upload a valid image file");
      }
    }
  }, []);

  const handleFileDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setResearchFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  }, []);

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("Getting categories :");
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

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title,
      abstract,
      content,
      category,
    };
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    if (tags.length > 0) {
      formDataToSend.append("tags", JSON.stringify(tags));
    }
    if (thumbnail) formDataToSend.append("thumbnail", thumbnail);
    if (researchFile) formDataToSend.append("pdf", researchFile);
    try {
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      await axios.post(
        process.env.REACT_APP_API_URL + "researches/",
        formDataToSend,
        { withCredentials: true }
      );
      setTitle("");
      setTags([]);
      setAbstract("");
      setCategory("");
      setContent("");
      setNewTag("");
      setThumbnail(null);
      setResearchFile(null);
      setErr(false);
      setMessage("Blog Created Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      setErr(true);
      setMessage(" Fail To Create Blog");
      setIcon(<FaXmark />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex justify-center items-center bg-whiteColor overflow-y-auto">
      <div className=" overflow-y-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create New Research
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-start gap-10 flex-wrap "
        >
          <div className="w-full md:w-2/5 md:min-w-[400px]">
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FaHeading className="mr-2 h-5 w-5 text-gray-500" />
                Research Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                placeholder="Enter research title"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FaAlignLeft className="mr-2 h-5 w-5 text-gray-500" />
                Abstract
              </label>
              <textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary h-32"
                placeholder="Provide a brief summary of your research"
                required
              />
            </div>

            <div>
              <label className=" text-gray-700 font-semibold mb-2 flex items-center">
                <FaFile className="mr-2 h-5 w-5 text-gray-500" />
                Research Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary h-48"
                placeholder="Detailed description of your research"
                required
              />
            </div>
          </div>
          <div className="w-full md:w-2/5 md:mt-0 md:min-w-[400px]">
            <div>
              <label className=" text-gray-700 font-semibold mb-2 flex items-center">
                <FaBookOpen className="mr-2 h-5 w-5 text-gray-500" />
                Research Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-primary"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className=" text-gray-700 font-semibold mb-2 flex items-center">
                <FaTag className="mr-2 h-5 w-5 text-gray-500" />
                Tags
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-primary"
                  placeholder="Add tags"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primaryHover transition-colors"
                >
                  Add Tag
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <FaXmark
                        className="ml-2 h-4 w-4 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className=" text-gray-700 font-semibold mb-2 flex items-center">
                <FaFileImage className="mr-2 h-5 w-5 text-gray-500" />
                Thumbnail Image
              </label>
              <div
                onDragEnter={preventDefaults}
                onDragOver={preventDefaults}
                onDragLeave={preventDefaults}
                onDrop={handleThumbnailDrop}
                onClick={() => thumbnailInputRef.current.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primaryHover transition-colors"
              >
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setThumbnail(file);
                    }
                  }}
                />
                {thumbnail ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Thumbnail"
                      className="max-h-48 max-w-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setThumbnail(null);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaXmark />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Drag and drop or click to upload thumbnail
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className=" text-gray-700 font-semibold mb-2 flex items-center">
                <FaFile className="mr-2 h-5 w-5 text-gray-500" />
                Research Document (PDF)
              </label>
              <div
                onDragEnter={preventDefaults}
                onDragOver={preventDefaults}
                onDragLeave={preventDefaults}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primaryHover transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type === "application/pdf") {
                      setResearchFile(file);
                    }
                  }}
                />
                {researchFile ? (
                  <div className="flex items-center justify-center">
                    <FaFile className="h-8 w-8 text-gray-500 mr-2" />
                    <span>{researchFile.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResearchFile(null);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaXmark />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Drag and drop or click to upload PDF
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary transition-colors font-semibold text-lg"
            >
              Submit Research
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResearch;
