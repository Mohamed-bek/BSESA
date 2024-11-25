import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import React, { useState, useRef } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useMessageData } from "../context/UserContext";

const AddVideo = () => {
  const navigate = useNavigate();
  const [comprising, setComprising] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [plate, setPlate] = useState({
    title: "",
    description: "",
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
      formData.append(key, value);
    }
    if (imageFile) {
      formData.append("thumbnail", imageFile);
    } else {
      alert("Please upload an image before submitting.");
      return;
    }
    if (videoFile) {
      formData.append("filename", videoFile.name);
      formData.append("contentType", videoFile.type);
    } else {
      alert("Please upload a video before submitting.");
      return;
    }

    try {
      setIsLoading(true);
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
      console.log("Url : ", data?.video?.url);
      const response = await axios.put(data?.video?.url, videoFile, {
        headers: {
          "Content-Type": videoFile.type,
        },
      });
      console.log("Response: " + response);
      setPlate({
        title: "",
        description: "",
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

  // const compressVideo = async (videoFile) => {
  //   console.log("Compressing video From the Compressed");

  //   const ffmpeg = new FFmpeg();
  //   await ffmpeg.load();

  //   try {
  //     const videoData = await fetchFile(videoFile);
  //     console.log("Video file fetched successfully");

  //     await ffmpeg.writeFile("input.mp4", videoData);
  //     console.log("File written to FFmpeg virtual file system");
  //   } catch (error) {
  //     console.error("Error writing file:", error);
  //     return null;
  //   }

  //   try {
  //     await ffmpeg.exec([
  //       "-i",
  //       "input.mp4",
  //       "-vcodec",
  //       "libx264",
  //       "-crf",
  //       "28",
  //       "output.mp4",
  //     ]);
  //     console.log("FFmpeg execution completed successfully");
  //   } catch (error) {
  //     console.error("Error executing ffmpeg command:", error);
  //     return null;
  //   }

  //   try {
  //     const data = await ffmpeg.readFile("output.mp4");
  //     console.log("Compressed video read successfully");

  //     const videoBlobCompressed = new Blob([data.buffer], {
  //       type: "video/mp4",
  //     });

  //     return videoBlobCompressed;
  //   } catch (error) {
  //     console.error("Error reading compressed file:", error);
  //     return null;
  //   }
  // };

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
              className="w-[170px] h-[170px] p-4 absolute top-1/2 left-1/2 rounded-lg bg-gray-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
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
                className="w-[170px] h-[170px] p-4 absolute top-1/2 left-1/2 rounded-lg bg-gray-200 flex items-center justify-center transform -translate-x-1/2 "
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
            className="h-3/5 flex pt-5 flex-col justify-center items-center"
          >
            <div>
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
                className="w-full max-w-[300px] p-2 border-b-2 mb-8 border-primary bg-transparent focus:outline-none"
                value={plate.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
              <button
                type="submit"
                className="w-full max-w-[200px] text-[1.2rem] cursor-pointer font-[300] mt-6 px-3 py-2 bg-primary text-white rounded-md block mx-auto"
              >
                Add Plate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
