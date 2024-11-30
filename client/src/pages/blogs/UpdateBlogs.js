import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMessageData, useUserStore } from "../../context/UserContext";
import {
  FaCheck,
  FaHeart,
  FaPen,
  FaPlus,
  FaRegEye,
  FaTrash,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function timeAgo(createdAt) {
  const now = new Date();
  const pastDate = new Date(createdAt);
  const diffInMs = now - pastDate; // Difference in milliseconds

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }
}

function UpdateBlog() {
  const { setErr, setMessage, setShow, setIcon } = useMessageData();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [ImageFile, setImageFile] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const iputFileRef = useRef();

  const GetBlog = async () => {
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/blog/" + id
      );
      setBlog(data.blog);
      setImagePreview(data?.blog?.thumbnailUrl);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetBlog();
  }, [id]);

  const UpdateBlog = async () => {
    const formData = new FormData();
    if (blog?.title.length < 4)
      alert("Please enter a title More than 3 characters");
    if (blog?.content.length < 21)
      alert("Please enter a Content More than 20 characters");

    formData.append("title", blog?.title);
    formData.append("content", blog?.content);
    if (ImageFile) formData.append("file", ImageFile);

    try {
      await axios.put(`https://bsesa-ksem.vercel.app/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setImageFile(null);
      setErr(false);
      setMessage("Course Updated Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.log(error);

      setErr(true);
      setMessage("Failed To Update Course");
      setIcon(<MdCancel />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
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

  const deleteComent = async (commentId) => {
    try {
      await axios.delete(
        `https://bsesa-ksem.vercel.app/blog/comment/${commentId}`,
        {
          params: {
            blogId: id,
          },
          withCredentials: true,
        }
      );
      blog.comments = blog?.comments?.filter(
        (comment) => comment._id !== commentId
      );
      setErr(false);
      setMessage("Comment Deleted Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      setErr(true);
      setMessage("Failed To Delete Comment");
      setIcon(<MdCancel />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="w-full h-full px-5 py-3 overflow-y-auto bg-whiteColor">
      <div className="w-full min-h-[calc(100dvh-160px)] flex justify-center items-stretch flex-wrap">
        <div className="w-full md:w-[55%] min-w-[350px] relative h-full">
          <div className="relative">
            <FaPlus
              onClick={() => iputFileRef?.current?.click()}
              className=" absolute -bottom-2 -right-2 cursor-pointer p-2 bg-primary w-10 h-10 rounded-full text-whiteColor font-light text-[1.3rem]"
            />
            <img
              className="w-full max-h-[430px] rounded-xl mb-2"
              src={ImagePreview}
            />
            <input
              className="hidden"
              onChange={handleImageUpload}
              type="file"
              ref={iputFileRef}
            />
          </div>
          <div className="flex justify-between gap-5">
            <input
              value={blog?.title}
              onChange={(e) =>
                setBlog((prevBlog) => ({
                  ...prevBlog,
                  title: e.target.value,
                }))
              }
              className="text-[1.5rem] focus:outline-none bg-secondary p-2 md:text-left font-medium rounded-lg w-full "
            />{" "}
          </div>
          <h2 className="text-[1.25rem] font-bold mt-5 text-center md:text-left mb-3 pl-1">
            {" "}
            Summary{" "}
          </h2>
          <textarea
            className="text-[1.2rem] bg-secondary p-2 rounded-lg focus:outline-none  mb-5 md:mb-0 leading-7 font-medium w-full md:text-left text-center fo"
            value={blog?.content}
            onChange={(e) =>
              setBlog((prevBlog) => ({
                ...prevBlog,
                content: e.target.value,
              }))
            }
          />
          <button
            onClick={() => UpdateBlog()}
            className="px-5 py-2 mb-5 font-semibold bg-primary text-whiteColor mt-5 mx-auto block cursor-pointer rounded-xl"
          >
            {" "}
            Update Blog{" "}
          </button>
        </div>
        <div className="w-full md:w-[45%] h-full px-4 ">
          <h2 className="h-[50px] py-2 px-2 text-[1.3rem] border border-solid border-gray-300">
            {" "}
            Comments{" "}
          </h2>
          <div className="px-2 max-h-[500px] md:max-h-[100%]  h-[calc(100%-95px)] overflow-y-auto border-l border-b border-r border-solid border-gray-300">
            {blog?.comments.map((comment) => (
              <div
                key={comment?._id}
                className="py-2 flex justify-between items-center gap-4"
              >
                <div className=" flex justify-start gap-3 items-center">
                  {" "}
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={comment?.author?.image}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-[0.8rem] lowercase font-bold">
                      {" "}
                      {comment?.author?.firstName +
                        " " +
                        comment?.author?.lastName}{" "}
                      <span className="ml-4 font-medium text-gray-800">
                        {timeAgo(comment.createdAt)}
                      </span>
                    </h3>

                    <p className="text-[0.95rem] font-medium">
                      {" "}
                      {comment?.content}{" "}
                    </p>
                  </div>
                </div>
                <FaTrash
                  onClick={() => deleteComent(comment?._id)}
                  className="text-[1.2rem] text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default UpdateBlog;
