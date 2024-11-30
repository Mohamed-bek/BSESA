import axios from "axios";
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useMessageData } from "../context/UserContext";

const CreateMembership = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    benefits: [], // Now benefits is an array
    discount: "",
    paymentId: "",
    link: "",
  });

  const [benefitInput, setBenefitInput] = useState("");
  const { setErr, setShow, setIcon, setMessage } = useMessageData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBenefit = () => {
    if (benefitInput.trim() !== "") {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefitInput],
      });
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://bsesa-ksem.vercel.app/memberships",
        { ...formData },
        { withCredentials: true }
      );

      setFormData({
        name: "",
        price: "",
        duration: "",
        description: "",
        benefits: [],
        discount: "",
        paymentId: "",
        link: "",
      });

      setMessage("Plan Created Successfully");
      setErr(false);
      setIcon(<FaCheck />);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1200);
    } catch (error) {
      setMessage("Failed to create plan");
      setErr(true);
      setIcon(<MdOutlineCancel />);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1200);
      console.log("eror : ", error);
    }
  };

  return (
    <div className="w-full h-full bg-whiteColor flex justify-center items-center">
      <div className="max-w-md mx-auto bg-secondary shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-[1.6rem] bg-primary text-whiteColor text-center px-6 py-4 font-semibold mb-4">
          Create New Membership
        </h2>
        <form className="px-6 pb-5" onSubmit={handleSubmit}>
          {/* Name and Price */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <select
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full  px-2 py-[6px] cursor-pointer rounded-md shadow-sm focus:outline-none"
                required
              >
                <option value="">Select a plan</option>
                <option value="Basic">Basic</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Duration and Discount */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="block w-full  px-2 py-[6px] cursor-pointer rounded-md shadow-sm focus:outline-none"
                required
              >
                <option value={null}>Select a Duration</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="block w-full px-2 py-1  rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Payment ID and Link */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="paymentId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payment ID
              </label>
              <input
                type="text"
                id="paymentId"
                name="paymentId"
                value={formData.paymentId}
                onChange={handleChange}
                className="block w-full px-2 py-1 rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="block w-full px-2 py-1  rounded-md shadow-sm focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block w-full resize-none h-[50px]  rounded-md shadow-sm focus:outline-none"
            ></textarea>
          </div>

          {/* Benefits Input */}
          <div className="mb-4">
            <label
              htmlFor="benefits"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Benefits
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="benefits"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                className="block px-2 py-1 w-full  rounded-md shadow-sm focus:outline-none"
                placeholder="Enter a benefit"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-3 py-1 text-white rounded-md hover:bg-primary bg-primary focus:outline-none"
              >
                Add
              </button>
            </div>
            {formData.benefits.length > 0 && (
              <ul className="mt-2 list-disc pl-5">
                {formData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{benefit}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-500 hover:underline"
                    >
                      <BiTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="px-5 block mx-auto text-[1.2rem] font-semibold mt-5 py-2 text-white  rounded-md hover:bg-primaryF bg-primary focus:outline-none"
          >
            Create Membership
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMembership;
