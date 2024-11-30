import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AdminVideos() {
  const links = [
    {
      id: 0,
      name: "Videos",
      href: "",
    },
    {
      id: 1,
      name: "New",
      href: "/new-video",
    },
  ];
  return (
    <div className="w-full h-full bg-white">
      <div className="h-[50px] px-4 py-2 flex items-center gap-3 shadow-lg">
        {" "}
        {links.map((link) => (
          <NavLink
            className="subLink"
            to={"/dashboard/manage-videos" + link.href}
          >
            {" "}
            {link.name}{" "}
          </NavLink>
        ))}
      </div>
      <div className="h-[calc(100%-50px)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminVideos;
