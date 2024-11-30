import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaExclamation, FaFileUpload } from "react-icons/fa";
import { useMessageData } from "../context/UserContext";
import { useParams } from "react-router-dom";

const CoachApplicationForm = () => {
  const { setErr, setMessage, setIcon, setShow } = useMessageData();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    applicationId: id,
    name: "",
    dateOfBirth: "",
    contactEmail: "",
    contactPhone: "",
    experienceYears: "",
    qualifications: "",
    specialties: "",
    currentClub: "",
    biography: "",
    coachingLevel: "",
    languagesSpoken: "",
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }

    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!formData.contactPhone.trim())
      newErrors.contactPhone = "Contact phone is required";
    else if (!phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = "Invalid phone number";
    }

    if (!formData.experienceYears || isNaN(formData.experienceYears)) {
      newErrors.experienceYears =
        "Experience years are required and should be a number";
    }

    if (!formData.coachingLevel)
      newErrors.coachingLevel = "Coaching level is required";

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
        "https://bsesa-ksem.vercel.app/coach/application",
        formDataSend
      );
      setIcon(<FaCheck />);
      setMessage("Application Success");
      setErr(false);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      setIcon(<FaExclamation />);
      setMessage(
        error.response.data.error === "You’ve already requested to register"
          ? "You’ve already requested to register"
          : "Registration Failed"
      );
      setErr(true);
      setShow(true);
      setTimeout(() => setShow(false), 1200);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    handleImageUpload();
  }, [file]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-[100px]">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Coach Application Form
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Apply to become a coach and join our network
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
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
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
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

          {/* Experience and Qualifications */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="experienceYears"
                className="block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.experienceYears ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              />
              {errors.experienceYears && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experienceYears}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="coachingLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Coaching Level
              </label>
              <select
                name="coachingLevel"
                value={formData.coachingLevel}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.coachingLevel ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 px-3`}
              >
                <option value="">Select Coaching Level</option>
                <option value="Youth">Youth</option>
                <option value="Amateur">Amateur</option>
                <option value="Professional">Professional</option>
              </select>
              {errors.coachingLevel && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.coachingLevel}
                </p>
              )}
            </div>
          </div>

          {/* Biography */}
          <div>
            <label
              htmlFor="biography"
              className="block text-sm font-medium text-gray-700"
            >
              Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            />
          </div>

          {/* Drag and Drop Image Upload */}
          <div
            className="mt-6 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setFile(file);
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
              {imagePreview && (
                <img className="h-[100px] block mx-auto" src={imagePreview} />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachApplicationForm;
