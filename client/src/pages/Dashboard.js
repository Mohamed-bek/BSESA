import axios from "axios";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ links }) => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await axios.get("/logout", { withCredentials: true });
    } catch (error) {
      console.log(error);
    } finally {
      logout();
      navigate("/");
    }
  };
  return (
    <div className="w-full h-dvh pt-[100px] bg-secondary">
      <div className="h-[calc(100dvh-100px)] container flex items-center gap-8 flex-wrap">
        <div className="w-1/4 h-[90%] bg-blackColor rounded-[30px] flex justify-center items-center">
          <div className="w-full">
            {links &&
              links.map((link) => (
                <NavLink
                  className="dshb bg-white text-center block mx-auto w-4/5 mb-5 rounded-3xl py-2 text-[1.2rem] font-semibold"
                  to={"/dashboard" + link.href}
                >
                  {" "}
                  {link.name}{" "}
                </NavLink>
              ))}
            <button
              onClick={() => logOut()}
              className="bg-white text-center text-black block mx-auto w-4/5 mb-5 rounded-3xl py-2 text-[1.2rem] font-semibold"
            >
              {" "}
              Log Out{" "}
            </button>
          </div>
        </div>
        <div className="w-[calc(75%-32px)] bg-blackColor h-[90%] rounded-[30px] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
