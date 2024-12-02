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
import { FaXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const UpdateResearch = () => {
  const { id } = useParams();
  const [researchData, setResearchData] = useState(null);
  const [title, setTitle] = useState(researchData?.title || "");
  const [abstract, setAbstract] = useState(researchData?.abstract || "");
  const [content, setContent] = useState(researchData?.content || "");
  const [category, setCategory] = useState(researchData?.category || "");
  const [tags, setTags] = useState(researchData?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [thumbnail, setThumbnail] = useState(researchData?.thumbnail || null); // New Thumbnail
  const [researchFile, setResearchFile] = useState(researchData?.file || null); // New PDF

  useEffect(() => {
    const getResearch = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/researches/" + id
        );
        setTitle(data?.title);
        setAbstract(data?.abstract);
        setContent(data?.content);
        setCategory(data?.category);
        setTags(data?.tags);
        setResearchData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getResearch();
    console.log("New Title : ", title);
  }, []);

  const [categories, setCategories] = useState([]);

  const thumbnailInputRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnailDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      setThumbnail(files[0]);
    } else {
      alert("Please upload a valid image file.");
    }
  }, []);

  const handleFileDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setResearchFile(files[0]);
    } else {
      alert("Please upload a valid PDF file.");
    }
  }, []);

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("abstract", abstract);
    formDataToSend.append("content", content);
    formDataToSend.append("category", category);

    if (tags.length > 0) formDataToSend.append("tags", JSON.stringify(tags));
    if (thumbnail) formDataToSend.append("thumbnail", thumbnail);
    if (researchFile) formDataToSend.append("pdf", researchFile);

    try {
      await axios.put(
        `https://bsesa-ksem.vercel.app/researches/${id}`,
        formDataToSend,
        { withCredentials: true }
      );

      alert("Research updated successfully!");
    } catch (error) {
      console.error("Error updating research:", error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-whiteColor overflow-y-auto">
      <div className="overflow-y-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Update Research
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex justify-center items-start gap-10 flex-wrap"
        >
          {/* Left Column */}
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
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
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

            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
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
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/5 md:min-w-[400px]">
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
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

            {/* Thumbnail */}
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FaFileImage className="mr-2 h-5 w-5 text-gray-500" />
                Thumbnail Image
              </label>
              <div
                onClick={() => thumbnailInputRef.current.click()}
                onDrop={handleThumbnailDrop}
                onDragOver={preventDefaults}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
              >
                {thumbnail ? (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">
                    Drag and drop or click to upload
                  </p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            {/* PDF */}
            <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center">
                <FiUploadCloud className="mr-2 h-5 w-5 text-gray-500" />
                Research File (PDF)
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                onDrop={handleFileDrop}
                onDragOver={preventDefaults}
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
              >
                {researchFile ? (
                  <span className="text-gray-600 text-sm">
                    {researchFile.name}
                  </span>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Drag and drop or click to upload
                  </p>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={(e) => setResearchFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition-colors"
              >
                Update Research
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateResearch;
