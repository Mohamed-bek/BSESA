import React, { useState, useRef } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import MultiSelectForm from "../../components/MultiSelectForm";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CheckAuthetication } from "../Login";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { setErr, setMessage, setShow, setIcon } = useMessageData();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);
  const [plate, setPlate] = useState({
    title: "",
    description: "",
    price: null,
    publicshed: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(plate)) {
      formData.append(key, value);
    }
    if (selectedCategories.length > 0) {
      formData.append("categorys", JSON.stringify(selectedCategories));
    }
    if (imageFile) {
      formData.append("file", imageFile);
    } else {
      alert("Please upload an image before submitting.");
      return;
    }
    try {
      setIsLoading(true);
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      await axios.post(
        "https://bsesa-ksem.vercel.app/course/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setPlate({
        title: "",
        description: "",
        price: null,
        publicshed: true,
      });
      setImagePreview(null);
      setImageFile(null);
      setSelectedCategories([]);
      setErr(false);
      setMessage("Course Created Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.error("Error saving plate:", error);
      setErr(true);
      setMessage("Fail To Create Course");
      setIcon(<MdCancel />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field, value) => {
    setPlate((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full h-full bg-whiteColor">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative w-1/2 h-full bg-white flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-primary rounded-full  -translate-x-1/2 -translate-y-1/2"></div>
          {imagePreview ? (
            <img
              className="w-[90%] relative z-50 ShadowCLass block mx-auto rounded-md"
              src={imagePreview}
              alt="Thumbnail"
            />
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="w-[160px] h-[160px] cursor-pointer p-2 absolute top-1/2 left-1/2 rounded-lg bg-gray-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            >
              <p className="text-lg text-center">Add Image</p>
              <IoMdAdd className="text-5xl font-bold mx-auto" />
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="w-1/2 h-full p-4 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="h-fit flex pt-5 flex-col items-center max-w-[400px]"
          >
            <input
              id="title"
              placeholder="Title"
              type="text"
              className="w-full max-w-[300px] p-2 border-b-2 border-primary bg-transparent mb-5 focus:outline-none"
              value={plate.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
            <input
              id="description"
              type="text"
              placeholder="Description"
              className="w-full max-w-[300px] p-2 border-b-2 mb-5 border-primary bg-transparent focus:outline-none"
              value={plate.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            <input
              id="price"
              type="number"
              placeholder="Price"
              className="w-full max-w-[300px] p-2 border-b-2 mb-8 border-primary bg-transparent focus:outline-none"
              value={plate.price}
              onChange={(e) => updateField("price", e.target.value)}
            />
            <MultiSelectForm
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <button
              type="submit"
              className="w-full mt-8 max-w-[200px] text-[1.2rem] cursor-pointer px-3 py-2 bg-primary text-whiteColor font-semibold rounded-md"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
