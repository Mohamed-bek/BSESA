import axios from "axios";
import React, { useState, useRef } from "react";
import { FaImage, FaPlus, FaTrash } from "react-icons/fa";

const CreateConference = () => {
  const [conferenceName, setConferenceName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [speakers, setSpeakers] = useState([
    { firstName: "", lastName: "", image: null },
  ]);

  const [mainImage, setMainImage] = useState(null);

  const mainImageInputRef = useRef(null);
  const speakerImageRefs = useRef([]);

  const handleMainImageDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMainImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setMainImage({
          file,
          preview: event.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMainImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setMainImage({
          file,
          preview: event.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSpeakerImageDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSpeakerImageDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index] = {
          ...updatedSpeakers[index],
          image: {
            file,
            preview: event.target.result,
          },
        };

        setSpeakers(updatedSpeakers);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSpeakerImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index] = {
          ...updatedSpeakers[index],
          image: {
            file,
            preview: event.target.result,
          },
        };

        setSpeakers(updatedSpeakers);
      };

      reader.readAsDataURL(file);
    }
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { firstName: "", lastName: "", image: null }]);
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
  };

  const updateSpeaker = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", conferenceName);
    formData.append("location", location);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);

    if (mainImage && mainImage.file) {
      console.log("Image Main : ", mainImage.file);
      formData.append("file", mainImage.file);
    }

    speakers.forEach((speaker, index) => {
      formData.append(
        `speakers[${index}]`,
        JSON.stringify({
          firstName: speaker.firstName,
          lastName: speaker.lastName,
        })
      );

      if (speaker.image && speaker.image.file) {
        formData.append("speakerImages", speaker.image.file);
      }
    });

    try {
      const response = await axios.post(
        "https://bsesa-ksem.vercel.app/conference/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setConferenceName("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setMainImage(null);
      setSpeakers([{ firstName: "", lastName: "", image: null }]);
    } catch (error) {
      console.error("Conference creation error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create New Conference
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Conference Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Conference Image
          </label>
          <div
            onDragOver={handleMainImageDragOver}
            onDrop={handleMainImageDrop}
            onClick={() => mainImageInputRef.current.click()}
            className="
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
              transition-colors duration-300 
              border-gray-300 hover:border-primary
            "
          >
            <input
              type="file"
              ref={mainImageInputRef}
              onChange={handleMainImageChange}
              accept="image/*"
              className="hidden"
            />
            {mainImage ? (
              <div className="relative">
                <img
                  src={mainImage.preview}
                  alt="Conference"
                  className="max-h-64 mx-auto rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMainImage(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaImage className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Drag and drop an image or click to select
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the form remains the same as in the previous example */}
        {/* Conference Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Conference Name
            </label>
            <input
              type="text"
              value={conferenceName}
              onChange={(e) => setConferenceName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter conference name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter conference location"
              required
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            placeholder="Enter conference description"
            required
          />
        </div>

        {/* Speakers Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Speakers</h2>
            <button
              type="button"
              onClick={addSpeaker}
              className="flex items-center bg-primary text-white px-3 py-2 rounded-lg hover:bg-primaryHover"
            >
              <FaPlus className="w-5 h-5 mr-2" /> Add Speaker
            </button>
          </div>

          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg mb-4 relative"
            >
              {speakers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpeaker(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={speaker.firstName}
                    onChange={(e) =>
                      updateSpeaker(index, "firstName", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={speaker.lastName}
                    onChange={(e) =>
                      updateSpeaker(index, "lastName", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Last name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Speaker Image
                  </label>
                  <div
                    onDragOver={(e) => handleSpeakerImageDragOver(e, index)}
                    onDrop={(e) => handleSpeakerImageDrop(e, index)}
                    onClick={() => speakerImageRefs.current[index].click()}
                    className="
                      border-2 border-dashed rounded-lg p-2 text-center cursor-pointer 
                      transition-colors duration-300 h-24
                      border-gray-300 hover:border-primary
                    "
                  >
                    <input
                      type="file"
                      ref={(el) => (speakerImageRefs.current[index] = el)}
                      onChange={(e) => handleSpeakerImageChange(e, index)}
                      accept="image/*"
                      className="hidden"
                    />
                    {speaker.image ? (
                      <div className="relative h-full">
                        <img
                          src={speaker.image.preview}
                          alt="Speaker"
                          className="h-full w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updatedSpeakers = [...speakers];
                            updatedSpeakers[index].image = null;
                            setSpeakers(updatedSpeakers);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <FaPlus className="w-8 h-8 text-gray-400 mb-1" />
                        <p className="text-xs text-gray-600">Add Image</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryHover text-white py-3 rounded-lg hover:bg-primaryHover transition-colors"
        >
          Create Conference
        </button>
      </form>
    </div>
  );
};

export default CreateConference;
