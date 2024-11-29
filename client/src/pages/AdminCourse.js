import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
function AdminCourse() {
  const links = [
    { id: 0, name: "Manage Courses", ref: "" },
    { id: 1, name: "New Courses", ref: "/new-course" },
  ];
  return (
    <div className="w-full h-full bg-white">
      <div className="h-[50px] shadow-lg px-4 py-2 flex items-center gap-3">
        {" "}
        {links.map((link) => (
          <NavLink
            className="subLink"
            to={"/dashboard/manage-courses" + link.ref}
          >
            {" "}
            {link.name}{" "}
          </NavLink>
        ))}
      </div>
      <div className="h-[calc(100%-50px)]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminCourse;
