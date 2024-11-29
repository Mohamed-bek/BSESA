import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import MultiSelectForm from "../components/MultiSelectForm";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useMessageData } from "../context/UserContext";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { setErr, setMessage, setShow, setIcon } = useMessageData();
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: null,
    published: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://bsesa-ksem.vercel.app/course/${id}`,
          { withCredentials: true }
        );
        const { title, description, price, categorys, thumbnail } = data.course;
        console.log("Categories: " + categorys);
        setCourse({ title, description, price, published: true });
        setSelectedCategories(categorys || []);
        setImagePreview(thumbnail || null);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setErr(true);
        setMessage("Failed to load course data");
        setIcon(<MdCancel />);
        setShow(true);
        setTimeout(() => setShow(false), 1200);
      }
    };

    fetchCourseDetails();
  }, [id, setErr, setMessage, setIcon, setShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(course)) {
      formData.append(key, value);
    }
    if (selectedCategories.length > 0) {
      formData.append("categorys", JSON.stringify(selectedCategories));
    }
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      setIsLoading(true);
      await axios.put(
        `https://bsesa-ksem.vercel.app/course/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setCourse({
        title: "",
        description: "",
        price: null,
        published: true,
      });
      setImagePreview(null);
      setImageFile(null);
      setSelectedCategories([]);
      setErr(false);
      setMessage("Course Updated Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.error("Error updating course:", error);
      setErr(true);
      setMessage("Failed To Update Course");
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
    setCourse((prev) => ({ ...prev, [field]: value }));
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
              value={course?.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
            <input
              id="description"
              type="text"
              placeholder="Description"
              className="w-full max-w-[300px] p-2 border-b-2 mb-5 border-primary bg-transparent focus:outline-none"
              value={course?.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            <input
              id="price"
              type="number"
              placeholder="Price"
              className="w-full max-w-[300px] p-2 border-b-2 mb-8 border-primary bg-transparent focus:outline-none"
              value={course?.price}
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
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
