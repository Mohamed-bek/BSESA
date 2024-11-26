import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const { user } = useUserStore();
  const navRef = useRef(null);
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

  const toggleMenu = (e) => {
    if (navRef.current) {
      const liElements = Array.from(navRef.current.querySelectorAll("a"));

      if (window.innerWidth <= 867) {
        const isActive = navRef.current.classList.contains("active");

        if (isActive) {
          // Apply `exiting` class to all links and remove `active` after animation
          liElements.forEach((a) => {
            a.classList.add("exiting");
          });

          // Wait for CSS animation duration (500ms here) to remove classes
          setTimeout(() => {
            navRef.current.classList.remove("active");

            liElements.forEach((a) => {
              a.classList.remove("exiting");
            });
          }, 600); // Match with your CSS animation duration
        } else {
          // Activate the menu
          navRef.current.classList.add("active");
        }
      } else {
        liElements.forEach((a) => {
          a.classList.remove("active");
        });
        e.target.classList.add("active");
      }
    }
  };

  return (
    <div className="w-full mx-auto md:w-[90%] z-50 flex justify-between items-center HeaderShadow  h-fit bg-whiteColor text-blackColor md:rounded-full shadow-md fixed top-0 md:top-3 left-1/2 -translate-x-1/2 py-0 md:px-5">
      <img src="/BSESA.png" className="h-20" alt="BSESA" />
      <nav ref={navRef} className="flex justify-center items-center NavBar">
        {links.map((link) => (
          <Link
            key={link.id}
            onClick={(e) => toggleMenu(e)}
            className="py-2 link px-5 font-normal cursor-pointer relative text-center"
            to={link.link}
          >
            {link.name}
          </Link>
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
      <div className="md:hidden mr-5" onClick={toggleMenu}>
        <GiHamburgerMenu className="text-[1.8rem] cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
