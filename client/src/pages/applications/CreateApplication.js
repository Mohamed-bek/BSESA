import axios from "axios";
import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../context/UserContext";
import { CheckAuthetication } from "../Login";

const CreateApplication = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    applicantType: "",
    desiredDevelopment: "",
    level: "",
    deadline: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [steps, setSteps] = useState([
    { title: "", description: "", image: null },
  ]);
  const fileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage({
          file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSteps = [...steps];
        newSteps[index] = {
          ...newSteps[index],
          image: {
            file,
            preview: reader.result,
          },
        };
        setSteps(newSteps);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const newSteps = [...steps];
    newSteps[index][name] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { title: "", description: "", image: null }]);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const removeMainImage = () => {
    setMainImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeStepImage = (index) => {
    const newSteps = [...steps];
    newSteps[index].image = null;
    if (stepFileInputRefs.current[index]) {
      stepFileInputRefs.current[index].value = "";
    }
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await CheckAuthetication();
    if (!check) {
      logout();
      navigate("/login");
      return;
    }
    const formDataToSubmit = new FormData();

    // Add main form fields
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("applicantType", formData.applicantType);
    formDataToSubmit.append("desiredDevelopment", formData.desiredDevelopment);
    formDataToSubmit.append("level", formData.level);
    formDataToSubmit.append("deadline", formData.deadline);

    // Add main image
    if (mainImage?.file) {
      formDataToSubmit.append("file", mainImage.file);
    }

    // Add steps
    const processedSteps = steps.map((step, index) => ({
      title: step.title,
      description: step.description,
    }));
    formDataToSubmit.append("steps", JSON.stringify(processedSteps));

    // Add step images
    steps.forEach((step, index) => {
      if (step.image?.file) {
        formDataToSubmit.append(`steps[${index}][image]`, step.image.file);
      }
    });

    try {
      const isLogin = CheckAuthetication();
      if (!isLogin) throw new Error("Please login");
      const response = await axios.post(
        "https://bsesa-ksem.vercel.app/application",
        formDataToSubmit,
        {
          withCredentials: true,
        }
      );
      // Show success message
      alert("Application created successfully!");
      resetForm();
    } catch (error) {
      console.error("Application submission error:", error);
    }
  };

  const resetForm = () => {
    // Reset form data
    setFormData({
      name: "",
      applicantType: "",
      desiredDevelopment: "",
      level: "",
      deadline: "",
    });

    // Reset images
    setMainImage(null);
    setSteps([{ title: "", description: "", image: null }]);

    // Reset file inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    stepFileInputRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
  };
  return (
    <div className="py-8 bg-secondary w-full h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create New Application</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Application Image
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleMainImageDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center 
              ${
                mainImage
                  ? "border-green-300"
                  : "border-gray-300 hover:border-primary"
              }`}
            >
              {mainImage ? (
                <div className="relative">
                  <img
                    src={mainImage.preview}
                    alt="Main application"
                    className="mx-auto max-h-64 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <MdCancel size={20} />
                  </button>
                </div>
              ) : (
                <div>
                  <FaUpload className="mx-auto mb-4 text-gray-400" size={40} />
                  <p className="text-gray-600">
                    Drag and drop an image or
                    <label className="ml-1 text-primary cursor-pointer">
                      browse
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleMainImageDrop}
                        className="hidden"
                      />
                    </label>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Basic Application Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Applicant Type
              </label>
              <select
                name="applicantType"
                value={formData.applicantType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 py-[10px] focus:outline-primary"
              >
                <option value="">Select Type</option>
                <option value="ClubApplication">Club Application</option>
                <option value="CoachApplication">Coach Application</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-primary"
              >
                <option value="">Select Level</option>
                <option value="Youth">Youth</option>
                <option value="Amateur">Amateur</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Desired Development
            </label>
            <textarea
              name="desiredDevelopment"
              value={formData.desiredDevelopment}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 focus:outline-primary rounded-md shadow-sm p-2"
              rows="4"
            />
          </div>

          {/* Steps Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Application Steps</h2>
              <button
                type="button"
                onClick={addStep}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary"
              >
                Add Step
              </button>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4 relative">
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdCancel size={24} />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Step Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={step.title}
                      onChange={(e) => handleStepChange(index, e)}
                      required
                      className="mt-1 focus:outline-primary block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    {/* Step Image Upload */}
                    <label className="block text-sm font-medium text-gray-700">
                      Step Image
                    </label>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleStepImageDrop(e, index)}
                      className={`border-2 border-dashed rounded-lg p-2 text-center 
                      ${
                        step.image
                          ? "border-green-300"
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      {step.image ? (
                        <div className="relative">
                          <img
                            src={step.image.preview}
                            alt={`Step ${index + 1}`}
                            className="mx-auto max-h-32 rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeStepImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <MdCancel size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">
                          <FaUpload
                            className="mx-auto mb-2 text-gray-400"
                            size={24}
                          />
                          Drag or
                          <label className="ml-1 text-primary cursor-pointer">
                            browse
                            <input
                              type="file"
                              accept="image/*"
                              ref={(el) =>
                                (stepFileInputRefs.current[index] = el)
                              }
                              onChange={(e) => handleStepImageDrop(e, index)}
                              className="hidden "
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Step Description
                  </label>
                  <textarea
                    name="description"
                    value={step.description}
                    onChange={(e) => handleStepChange(index, e)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary block mx-auto text-[1.1rem] font-semibold"
            >
              Create Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;
