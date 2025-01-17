import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChartComponent from "../components/ChartComponent";
import { FaBloggerB, FaPen, FaPlus, FaUser } from "react-icons/fa";
import { useUserStore } from "../context/UserContext";
import { SiCoursera } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";
import { FcConferenceCall } from "react-icons/fc";
import { CheckAuthetication } from "./Login";
import { useNavigate } from "react-router-dom";

function AdminStat() {
  const navigate = useNavigate();
  const { user, login, logout } = useUserStore();
  const [primaryColor, setprimaryColor] = useState("#c70039");
  const inChangeImg = useRef();
  const [usersData, setusersData] = useState({ months: [], counts: [] });
  const [courseData, setcourseData] = useState({ months: [], counts: [] });
  const [orderData, setorderData] = useState({ months: [], counts: [] });
  const [users, setusers] = useState(null);
  const [courses, setcourses] = useState(null);
  const [orders, setorders] = useState(null);
  const [conferences, setconferences] = useState(null);
  const [blogs, setblogs] = useState(null);

  useEffect(() => {
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();
    setprimaryColor(primaryColor);
  }, []);

  const GetUserState = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "admin/user_analytics",
        { withCredentials: true }
      );
      setusersData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCourseState = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "admin/course_analytics",
        { withCredentials: true }
      );
      setcourseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetOrderState = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "admin/order_analytics",
        { withCredentials: true }
      );
      setorderData(data);
    } catch (error) {}
  };

  const GetCountsState = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "admin/counts",
        { withCredentials: true }
      );
      setusers(data.users);
      setcourses(data.courses);
      setorders(data.orders);
      setblogs(data.blogs);
      setconferences(data.conferences);
    } catch (error) {}
  };

  useEffect(() => {
    const GetData = async () => {
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
      }
      GetUserState();
      GetCourseState();
      GetCountsState();
      GetOrderState();
    };
    GetData();
  }, []);

  const data = {
    labels: usersData.months,
    datasets: [
      {
        label: "User ",
        data: usersData.counts,
        backgroundColor: primaryColor,
        borderColor: "rgb(0 146 68)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };
  const coursedata = {
    labels: courseData.months,
    datasets: [
      {
        label: "User ",
        data: courseData.counts,
        backgroundColor: primaryColor,
        borderColor: "rgb(0 146 68)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const orderdata = {
    labels: orderData.months,
    datasets: [
      {
        label: "User ",
        data: orderData.counts,

        backgroundColor: ["#009fff", "#c70039", "#029202"],
        borderColor: "rgb(0 146 68)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const handleProfilePictureChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "avatar",
        formData,
        {
          withCredentials: true,
        }
      );
      login(data.user);
    } catch (error) {}
  };

  return (
    <div className="w-full h-full bg-secondary overflow-y-auto">
      <div className="w-full bg-whiteColor shadow-md flex justify-between px-4 py-2 items-center">
        <h1 className="text-[2.15rem] font-semibold">Dashboard</h1>
        <div className="flex items-start gap-1">
          <div className="relative mr-4 w-fit">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={user?.image}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-2 z-10">
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
                className="w-5 h-5 flex items-center justify-center bg-white rounded-full border border-gray-400 cursor-pointer"
                onClick={() => inChangeImg.current.click()}
              >
                <FaPen className="text-gray-800 text-sm text-[0.7rem]" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around px-5 flex-wrap items-center gap-5 py-5">
        <div className="flex shadow-md justify-center items-center gap-5 bg-whiteColor px-5 rounded-lg py-5">
          <div>
            <FaUser className="p-3 rounded-full block text-[4.5rem] bg-primaryTra text-primary " />
          </div>
          <div>
            <h1 className="text-[1.15rem] text-center "> Total users </h1>
            <h1 className="text-[2rem] font-bold text-center">
              {" "}
              {users?.total || 0}{" "}
            </h1>
            <p className="bg-primaryTra  text-primary text-[0.9rem] flex justify-center items-center gap-1 rounded-full px-3 py-1">
              {" "}
              <FaPlus /> {users?.today || 0} user{" "}
            </p>
          </div>
        </div>
        <div className="flex shadow-md justify-center items-center gap-5 bg-whiteColor px-5 rounded-lg py-5">
          <div>
            <SiCoursera className="p-3 rounded-full block text-[4.5rem] bg-primaryTra text-primary " />
          </div>
          <div>
            <h1 className="text-[1.15rem] text-center "> Total courses </h1>
            <h1 className="text-[2rem] font-bold text-center">
              {" "}
              {courses?.total || 0}{" "}
            </h1>
            <p className="bg-primaryTra  text-primary text-[0.9rem] flex justify-center items-center gap-1 rounded-full px-3 py-1">
              {" "}
              <FaPlus /> {courses?.today || 0} course{" "}
            </p>
          </div>
        </div>
        <div className="flex shadow-md justify-center items-center gap-5 bg-whiteColor px-5 rounded-lg py-5">
          <div>
            <FaBloggerB className="p-3 rounded-full block text-[4.5rem] bg-primaryTra text-primary " />
          </div>
          <div>
            <h1 className="text-[1.15rem] text-center "> Total blogs </h1>
            <h1 className="text-[2rem] font-bold text-center">
              {" "}
              {blogs?.total || 0}{" "}
            </h1>
            <p className="bg-primaryTra  text-primary text-[0.9rem] flex justify-center items-center gap-1 rounded-full px-3 py-1">
              {" "}
              <FaPlus /> {blogs?.today || 0} blog{" "}
            </p>
          </div>
        </div>
        <div className="flex shadow-md justify-center items-center gap-5 bg-whiteColor px-5 rounded-lg py-5">
          <div>
            <FcConferenceCall className="p-3 rounded-full block text-[4.5rem] bg-primaryTra text-primary " />
          </div>
          <div>
            <h1 className="text-[1.15rem] text-center "> Total conferences </h1>
            <h1 className="text-[2rem] font-bold text-center">
              {" "}
              {conferences?.total || 0}{" "}
            </h1>
            <p className="bg-primaryTra  text-primary text-[0.9rem] flex justify-center items-center gap-1 rounded-full px-3 py-1">
              {" "}
              <FaPlus /> {conferences?.today || 0} conference{" "}
            </p>
          </div>
        </div>
        <div className="flex shadow-md justify-center items-center gap-5 bg-whiteColor px-5 rounded-lg py-5">
          <div>
            <FaCartShopping className="p-3 rounded-full block text-[4.5rem] bg-primaryTra text-primary " />
          </div>
          <div>
            <h1 className="text-[1.15rem] text-center "> Total orders </h1>
            <h1 className="text-[2rem] font-bold text-center">
              {" "}
              {orders?.total || 1000}{" "}
            </h1>
            <p className="bg-primaryTra  text-primary text-[0.9rem] flex justify-center items-center gap-1 rounded-full px-3 py-1">
              {" "}
              <FaPlus /> {orders?.today || 0} order{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full">
            <h1 className="text-[2rem] text-center"> Users Analytics </h1>
            <ChartComponent data={data} options={options} type="bar" />
          </div>
          {/* <div className="w-full">
            <ChartComponent data={coursedata} options={options} type="bar" />
          </div> */}
        </div>
        <div className="w-1/2 flex justify-center items-center ">
          <div className="w-full  max-w-[450px] min-w-[350px]">
            <h1 className="text-[2rem] text-center"> Orders Analytics </h1>
            <ChartComponent
              className="mx-auto block"
              data={orderdata}
              options={pieOptions}
              type="pie"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStat;
