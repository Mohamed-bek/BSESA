import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MultiSelectForm from "../../components/MultiSelectForm";
import { MdCancel } from "react-icons/md";
import { FaCheck, FaPen } from "react-icons/fa";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { CheckAuthetication } from "../Login";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
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
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + `course/${id}`,
          { withCredentials: true }
        );
        const { title, description, price, categorys, thumbnail } = data.course;
        console.log("Categories: " + categorys);
        setCourse({ title, description, price, published: true });
        const categoryNames = categorys.map((category) => {
          console.log("Category: " + category);
          return category._id;
        });
        console.log("categoryNames : ", categoryNames);
        setSelectedCategories(categoryNames || []);
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
  }, [id]);

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
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + `course/update/${id}`,
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
        price: "",
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
          {imagePreview && (
            <div className="w-fit h-fit relative">
              <img
                className="w-[90%] relative z-50 ShadowCLass block mx-auto rounded-md"
                src={imagePreview}
                alt="Thumbnail"
              />
              <div
                onClick={() => fileRef.current?.click()}
                className="w-[35px] h-[35px] cursor-pointer p-2 absolute -bottom-2 right-5 rounded-full bg-secondary flex items-center justify-center transform  z-50"
              >
                <FaPen className="text-5xl font-bold mx-auto " />
              </div>
            </div>
          )}{" "}
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
              className="w-full max-w-[300px] p-2 border rounded-md bg-secondary border-primary mb-5 focus:outline-none"
              value={course?.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
            <input
              id="description"
              type="text"
              placeholder="Description"
              className="w-full max-w-[300px] p-2 border rounded-md bg-secondary border-primary mb-5 focus:outline-none"
              value={course?.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            <input
              id="price"
              type="number"
              placeholder="Price"
              className="w-full max-w-[300px] p-2 border rounded-md bg-secondary border-primary mb-8  focus:outline-none"
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
