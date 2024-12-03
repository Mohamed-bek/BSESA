import React, { useState, useRef } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useMessageData } from "../../context/UserContext";
import AddLinkWithDescription from "../../context/AddLinkWithDescription";

const AddVideo = () => {
  const [comprising, setComprising] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [plate, setPlate] = useState({
    title: "",
    description: "",
    links: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const { setErr, setMessage, setShow, setIcon } = useMessageData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(plate)) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    if (imageFile) {
      formData.append("file", imageFile);
    } else {
      alert("Please upload an image before submitting.");
      return;
    }
    if (!videoFile) {
      alert("Please upload a video before submitting.");
      return;
    }
    try {
      setIsLoading(true);
      const { dataUrls } = await axios.post(
        "https://bsesa-ksem.vercel.app/video/url",
        {
          filename: videoFile.name,
          contentType: videoFile.type,
        },
        {
          withCredentials: true,
        }
      );

      await axios.put(dataUrls?.url, videoFile, {
        headers: {
          "Content-Type": videoFile.type,
          "x-amz-acl": "public-read",
        },
      });

      formData.append("url", dataUrls.realUrl);

      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/video/create",
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
        links: [],
      });

      setImagePreview(null);
      setVideoPreview(null);
      setErr(false);
      setMessage("Video Created Successfully");
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.error("Error saving plate:", error);
      setErr(true);
      setMessage("Fail To Create Video");
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

  const handleVideoUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // setComprising(true);
      // const compressedVideo = await compressVideo(file);
      // setComprising(false);

      const compressedVideoUrl = URL.createObjectURL(file);

      setVideoPreview(compressedVideoUrl);
      setVideoFile(file);
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
          {videoPreview ? (
            <video
              className="h-fit ShadowCLass w-[90%] rounded-md mx-auto relative z-50"
              controls
            >
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              onClick={() => videoFileRef.current?.click()}
              className="w-[160px] cursor-pointer h-[160px] p-2 absolute top-1/2 left-1/2 rounded-lg bg-gray-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            >
              {comprising && (
                <div className="text-center">
                  {" "}
                  <p className="text-[1.1rem] font-bold text-primary">
                    {" "}
                    Compressing...{" "}
                  </p>
                  <span className="loader block w-fit mx-auto mt-2"></span>{" "}
                </div>
              )}
              {!comprising && (
                <>
                  <p className="text-lg text-center">Add Video</p>
                  <IoMdAdd className="text-5xl font-bold mx-auto" />
                </>
              )}
            </div>
          )}
          <input
            ref={videoFileRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </div>

        <div className="w-1/2 h-full p-4 ">
          <div className="relative w-full h-2/5 flex items-center justify-center pt-[70px]">
            <div className="w-[500px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] bg-primary rounded-full"></div>
            {imagePreview ? (
              <img
                className="w-[90%] relative z-50 ShadowCLass block mx-auto rounded-md"
                src={imagePreview}
                alt="Thumbnail"
              />
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="w-[155px] cursor-pointer h-[155px] p-2 absolute top-1/2 left-1/2 rounded-lg bg-gray-200 flex items-center justify-center transform -translate-x-1/2 "
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
          <form
            onSubmit={handleSubmit}
            className="h-3/5 flex pt-5 justify-center items-center"
          >
            <div className="text-center">
              <input
                id="title"
                placeholder="Title"
                type="text"
                className="w-full max-w-[300px] p-2 border-b-2 border-primary bg-transparent mb-5 focus:outline-none block mx-auto"
                value={plate.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <input
                id="description"
                type="text"
                placeholder="Description"
                className="w-full max-w-[300px] p-2 border-b-2 mb-8 border-primary bg-transparent focus:outline-none mx-auto"
                value={plate.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
              <AddLinkWithDescription
                links={plate.links}
                setLinks={(links) => setPlate({ ...plate, links })}
              />
              <button
                type="submit"
                className="w-full max-w-[200px] text-[1.2rem] cursor-pointer font-semibold mt-6 px-3 py-2 bg-primary text-whiteColor rounded-md block mx-auto"
              >
                Create Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
