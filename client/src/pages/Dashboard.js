import axios from "axios";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Dashboard = ({ links }) => {
  const { logout, user } = useUserStore();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await axios.get("https://bsesa-ksem.vercel.app/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      logout();
      navigate("/");
    }
  };
  return (
    <div
      className={`w-full h-dvh bg-blackColor p-5 pl-0 ${
        user?.role === "admin" ? null : "pt-[110px]"
      }`}
    >
      <div className="h-full w-full  flex items-center flex-wrap  ">
        <div className="w-fit h-full bg-transparent flex justify-center items-center">
          <div className="w-full">
            {links &&
              links.map((link) => (
                <NavLink
                  className="dshb text-nowrap px-5 text-white text-center flex justify-center items-center mx-auto w-4/5 mb-5 rounded-3xl py-2 text-[1.2rem] font-semibold cursor-pointer"
                  to={"/dashboard" + link.href}
                >
                  {" "}
                  {link?.icon ? (
                    <span className="text-[1.8rem] w-fit block mx-auto font-normal">
                      {link?.icon}
                    </span>
                  ) : (
                    link.name
                  )}{" "}
                </NavLink>
              ))}
            <button
              onClick={() => logOut()}
              className="text-center text-whiteColor font-bold block mx-auto w-4/5 mb-5 rounded-3xl py-2 text-[1.2rem]"
            >
              {" "}
              <MdLogout className="text-[1.8rem] block mx-auto" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-blackColor h-full rounded-2xl overflow-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
