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
      name: "Services",
      link: "/courses",
      subLinks: [
        { name: "Courses", link: "/courses", id: 0 },
        { name: "Academy Development", link: "#", id: 1 },
        {
          name: "Coaches' Immersion",
          link: "/applications/coach",
          id: 2,
        },
        {
          name: "Team Immersion",
          link: "/applications/team",
          id: 3,
        },
      ],
      id: 1,
    },
    {
      name: "Academic",
      link: "/researches",
      subLinks: [
        { name: "Research", link: "/researches", id: 0 },
        { name: "Blogs", link: "/blogs", id: 1 },
        { name: "Conferences", link: "/conferences", id: 2 },
        { name: "Laboratory Visit", link: "#", id: 3 },
      ],
      id: 2,
    },
    {
      name: "Pricing",
      link: "/pricing",
      id: 3,
    },
    {
      name: "About Us",
      link: "/about",
      id: 4,
    },
  ]);

  const toggleMenu = (e) => {
    if (navRef.current) {
      const liElements = Array.from(navRef.current.querySelectorAll(".link"));

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
    <div className="w-full h-[70px] z-50 flex justify-between items-center  bg-whiteColor text-blackColor  shadow-md fixed top-0  left-1/2 -translate-x-1/2 py-0 md:px-5">
      <img src="/BSESA.png" className="h-[70px]" alt="BSESA" />
      <nav
        ref={navRef}
        className="flex justify-center items-center NavBar h-full"
      >
        {links.map((link) => (
          <div
            key={link.id}
            onClick={(e) => toggleMenu(e)}
            className=" h-full link p-0 font-normal cursor-pointer text-center relative"
          >
            <NavLink
              to={link.link}
              className="font-semibold h-full flex items-center px-5"
            >
              {link.name}
            </NavLink>

            {link.subLinks?.length > 0 && (
              <ul className="bg-whiteColor hidden  ListHide px-2 pt-3 absolute bottom-1 left-0  translate-y-full">
                {link.subLinks.map((sublink) => (
                  <NavLink
                    to={sublink.link}
                    className="px-5 text-nowrap text-left cursor-pointer w-full py-3 block border-b-[0.5px] border-solid border-blackColor"
                    key={sublink.id}
                  >
                    {" "}
                    {sublink.name}
                  </NavLink>
                ))}
              </ul>
            )}
          </div>
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
