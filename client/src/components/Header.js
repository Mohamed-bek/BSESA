import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../context/UserContext";

function Header() {
  const [remove, setremove] = useState(false);
  // useEffect(() => {
  //   let lastScrollTop = 0;

  //   const handleScroll = () => {
  //     const currentScrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;

  //     if (currentScrollTop > lastScrollTop) {
  //     } else {
  //     }

  //     lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  //   };

  //   // Attach the scroll event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup the listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const { user } = useUserStore();
  const [links, setLinks] = useState([
    {
      name: "Home",
      link: "/",
      id: 0,
    },
    {
      name: "Courses",
      link: "/courses",
      id: 1,
    },
    {
      name: "Blogs",
      link: "/blogs",
      id: 2,
    },
    {
      name: "Pricing",
      link: "/pricing",
      id: 3,
    },
    {
      name: "Application",
      link: "/application",
      id: 4,
    },
  ]);
  return (
    <div className="container z-50 flex justify-between items-center HeaderShadow  h-fit bg-whiteColor text-blackColor rounded-full shadow-md fixed top-3 left-1/2 -translate-x-1/2 py-0 px-5">
      <img src="/BSESA.png" className="h-20" alt="BSESA" />
      <nav className="flex justify-center items-center">
        {links.map((link) => (
          <NavLink
            key={link.id}
            className="py-2 link px-5 font-normal cursor-pointer relative"
            to={link.link}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
      {user ? (
        <NavLink to="/dashboard">
          <div className="w-14 h-14 border border-primary border-solid relative rounded-full cursor-pointer overflow-hidden">
            <img
              className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={user.image}
            />
          </div>
        </NavLink>
      ) : (
        <NavLink
          className="px-3 py-2 bg-primary text-whiteColor font-bold text-[1.1rem] cursor-pointer rounded-md"
          to={"/login"}
        >
          {" "}
          Log in
        </NavLink>
      )}
    </div>
  );
}

export default Header;
