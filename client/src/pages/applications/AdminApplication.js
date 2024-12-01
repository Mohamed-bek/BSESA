import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AdminApplication() {
  const links = [
    {
      id: 0,
      name: "Application",
      href: "",
    },
    {
      id: 1,
      name: "New",
      href: "/new-application",
    },
  ];
  return (
    <div className="w-full h-full bg-white">
      <div className="h-[50px] px-4 py-2 flex items-center gap-3 shadow-lg">
        {" "}
        {links.map((link) => (
          <NavLink
            className="subLink"
            to={"/dashboard/manage-applications" + link.href}
          >
            {" "}
            {link.name}{" "}
          </NavLink>
        ))}
      </div>
      <div className="h-[calc(100%-50px)] overflow-hidden ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminApplication;
