import { data } from "@remix-run/router";
import axios from "axios";
import React, { useState, useRef } from "react";
import { FaPen, FaUser } from "react-icons/fa";
import { useUserStore } from "../context/UserContext";

export default function Accountsetting() {
  const { user, login } = useUserStore();
  const inChangeImg = useRef();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);

  let FullName = user ? `${user?.firstName} ${user?.lastName}` : "Unknown";

  const handleCancel = () => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      (firstName.length < 4 || lastName.length < 4)
    )
      return;
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/update",
        {
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );
      login(data.user);
    } catch (error) {
      console.log(data);
    }
  };

  const handleProfilePictureChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      console.log("profile picture changed");
      const { data } = await axios.put(
        "https://bsesa-ksem.vercel.app/avatar",
        formData,
        {
          withCredentials: true,
        }
      );
      login(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full p-4 flex justify-center items-center text-blackColor bg-whiteColor">
      <form onSubmit={(e) => updateHandler(e)} className="flex flex-col">
        <div className="flex items-center mb-4 mt-8">
          <div className="relative mr-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={user?.image}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-3 left-3 z-10">
              <input
                ref={inChangeImg}
                type="file"
                id="profilePictureLabel"
                name="profilePicture"
                accept="image/*"
                onChange={(e) => handleProfilePictureChange(e)}
                className="hidden"
              />
              <span
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-400 cursor-pointer"
                onClick={() => inChangeImg.current.click()}
              >
                <FaPen className="text-gray-800 text-sm" />
              </span>
            </div>
          </div>
          <div className=" text-[2rem] capitalize">{FullName}</div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 py-8">
          <div className="flex items-center rounded-md w-2/5 bg-white border border-black p-2">
            <FaUser className="text-black text-base mr-2" />

            <input
              value={firstName}
              type="text"
              placeholder={user ? user.firstName : "First Name"}
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-transparent rounded-md text-black text-base flex-1 border-none outline-none"
              minLength={4}
            />
          </div>

          <div className="flex rounded-md items-center w-2/5 bg-white border border-black p-2">
            <FaUser className="text-black text-base mr-2" />
            <input
              value={lastName}
              type="text"
              placeholder={user ? user.lastName : "Last Name"}
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="bg-transparent rounded-md text-black text-base flex-1 border-none outline-none"
              minLength={4}
            />
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <button
            type="submit"
            className="w-28 py-2  font-semibold rounded-md  bg-secondary text-blackColor "
          >
            Update
          </button>
          <button
            type="button"
            className="w-28 py-2 font-semibold rounded-md bg-secondary text-blackColor "
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
