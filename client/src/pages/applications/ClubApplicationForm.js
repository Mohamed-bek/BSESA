import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaExclamation, FaFileUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useMessageData } from "../../context/UserContext";

const ClubApplicationForm = () => {
  const { setErr, setMessage, setIcon, setShow } = useMessageData();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    applicationId: id,
    name: "",
    location: "",
    establishedYear: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
    level: "",
    clubSize: "",
  });
  const [ImagePreview, setImagePreview] = useState(null);
  const [file, setfile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfile(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Club name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    const currentYear = new Date().getFullYear();
    const establishedYear = parseInt(formData.establishedYear);
    if (!establishedYear) {
      newErrors.establishedYear = "Established year is required";
    } else if (establishedYear < 1800 || establishedYear > currentYear) {
      newErrors.establishedYear = `Year must be between 1800 and ${currentYear}`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }

    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    } else if (!phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = "Invalid phone number";
    }

    if (!formData.level) newErrors.level = "Club level is required";

    const clubSize = parseInt(formData.clubSize);
    if (!clubSize) {
      newErrors.clubSize = "Club size is required";
    } else if (clubSize < 1) {
      newErrors.clubSize = "Club size must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formDataSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataSend.append(key, value);
    }
    if (file) {
      formDataSend.append("file", file);
    } else {
      alert("Please upload an image before submitting.");
      return;
    }
    try {
      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/club/application",
        formDataSend
      );
      setIcon(<FaCheck />);
      setMessage("Registration Success");
      setErr(false);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      setIcon(<FaExclamation />);
      setMessage(
        error?.response?.data?.error == "You Already Requested This"
          ? "You Already Requested This"
          : "Registration Failed"
      );
      setErr(true);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    }
  };

  const handleImageUpload = (e) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    handleImageUpload();
  }, [file]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-[100px]">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Club Application Form
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your club's official application
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Club Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="establishedYear"
                className="block text-sm font-medium text-gray-700"
              >
                Established Year
              </label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.establishedYear ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.establishedYear && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.establishedYear}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                Club Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.level ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              >
                <option value="">Select Club Level</option>
                <option value="Professional">Professional</option>
                <option value="Semi-professional">Semi-professional</option>
                <option value="Amateur">Amateur</option>
              </select>
              {errors.level && (
                <p className="text-red-500 text-xs mt-1">{errors.level}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.contactEmail ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactEmail}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.contactPhone ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactPhone}
                </p>
              )}
            </div>
          </div>

          {/* Additional Optional Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
              />
            </div>

            <div>
              <label
                htmlFor="clubSize"
                className="block text-sm font-medium text-gray-700"
              >
                Club Size
              </label>
              <input
                type="number"
                name="clubSize"
                value={formData.clubSize}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.clubSize ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.clubSize && (
                <p className="text-red-500 text-xs mt-1">{errors.clubSize}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
              rows="4"
            />
          </div>

          {/* Logo Upload */}
          <div
            className="mt-6 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setfile(file);
              }
            }}
          >
            <div className="space-y-1 text-center flex flex-wrap  justify-center gap-10 items-center">
              <div>
                {" "}
                <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="logo"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary focus:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only focus:outline-none"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {ImagePreview && (
                <img className="h-[100px] block mx-auto" src={ImagePreview} />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="block justify-center py-2 px-4 mx-auto text-white  bg-primary border border-transparent rounded-md hover:bg-primary text-[1.1rem] font-semibold"
            >
              Registration Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubApplicationForm;
