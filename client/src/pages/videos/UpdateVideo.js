import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaPen } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import AddLinkWithDescription from "../../context/AddLinkWithDescription";
import { useMessageData, useUserStore } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { CheckAuthetication } from "../Login";

const UpdateVideo = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Track if we're updating
  const [video, setVideo] = useState({
    title: "",
    description: "",
    links: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { setErr, setMessage, setShow, setIcon } = useMessageData();

  const fileRef = useRef(null);

  useEffect(() => {
    if (videoId) {
      // Make an API call to fetch the existing video data by ID
      const fetchVideoData = async () => {
        const check = await CheckAuthetication();
        if (!check) {
          logout();
          navigate("/login");
          return;
        }
        try {
          const { data } = await axios.get(
            `https://bsesa-ksem.vercel.app/admin/video/${videoId}`,
            {
              withCredentials: true,
            }
          );
          console.log(data);
          setVideo(data?.video);
          setImagePreview(data?.video?.thumbnail); // Assuming the thumbnail URL is in the response
          setIsUpdate(true);
        } catch (error) {
          console.error("Error fetching video data", error);
        }
      };
      fetchVideoData();
    }
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(video)) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
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
        process.env.REACT_APP_API_URL + "admin/video/" + videoId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setVideo(data.video);
      setImagePreview(data?.video?.thumbnail);
      setErr(false);
      setMessage(
        isUpdate ? "Video Updated Successfully" : "Video Created Successfully"
      );
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.error("Error saving Video:", error);
      setErr(true);
      setMessage(
        isUpdate ? "Failed To Update Video" : "Failed To Create Video"
      );
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
    setVideo((prev) => ({ ...prev, [field]: value }));
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
          <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          {imagePreview && (
            <div className="relative">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-[35px] z-50 cursor-pointer h-[35px] p-[10px] absolute -bottom-2 right-4 rounded-full bg-primary text-whiteColor flex items-center justify-center transform"
              >
                <FaPen className="text-5xl font-bold mx-auto" />
              </div>
              <img
                className="w-[90%] relative z-40 ShadowCLass block mx-auto rounded-md"
                src={imagePreview}
                alt="Thumbnail"
              />
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
            className="flex pt-5 justify-center items-center"
          >
            <div className="text-center">
              <input
                id="title"
                placeholder="Title"
                type="text"
                className="w-full max-w-[300px] p-2 border-b-2 border-primary bg-transparent mb-5 focus:outline-none block mx-auto"
                value={video.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <textarea
                id="description"
                placeholder="Description"
                className="w-full max-w-[300px] p-2 border-b-2 border-primary bg-transparent mb-5 focus:outline-none block mx-auto"
                value={video.description}
                onChange={(e) => updateField("description", e.target.value)}
              />

              <AddLinkWithDescription
                links={video.links}
                setLinks={(links) => setVideo({ ...video, links })}
              />
              <button
                type="submit"
                className="bg-primary text-white px-10 py-3 rounded-full mt-10"
              >
                {isUpdate ? "Update Video" : "Create Video"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVideo;
