import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaChevronDown,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserStore();
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
        { name: "Academy Development", link: "/academy-devlopment", id: 1 },
        {
          name: "Coaches' Immersion",
          link: "/applications/coach",
          id: 2,
        },
        {
          name: "Players Immersion",
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
        { name: "Laboratory Visit", link: "/laboratory-visit", id: 3 },
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full h-[70px] z-[100] bg-whiteColor text-blackColor shadow-md fixed top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <img src="/BSESA.png" className="h-[70px]" alt="BSESA" />
        <nav className="hidden md:flex space-x-8">
          {links.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <NavLink
                to={item.link}
                className={({ isActive }) => `
                                    flex items-center space-x-1 py-2 transition-colors
                                    ${
                                      isActive
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-primary"
                                    }
                                `}
              >
                <span>{item.name}</span>
                {item.subLinks && (
                  <FaChevronDown
                    className={`w-3 h-3 mt-1 transition-transform duration-200 ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </NavLink>

              {item.subLinks && (
                <div
                  className={`absolute top-full left-0 w-56 bg-white rounded-md shadow-lg py-2 transition-all duration-300 ${
                    activeMenu === item.id
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {item.subLinks.map((sublink) => (
                    <NavLink
                      key={sublink.id}
                      to={sublink.link}
                      className={({ isActive }) => `
                                                block px-4 py-2 text-sm transition-colors
                                                ${
                                                  isActive
                                                    ? "bg-indigo-50 text-primary"
                                                    : "text-gray-700 hover:bg-indigo-50 hover:text-primary"
                                                }
                                            `}
                    >
                      {sublink.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex socialMedias space-x-4 ml-10 items-center">
            <a
              href="https://www.facebook.com/profile.php?id=100058790962758&mibextid=ZbWKwL"
              className="text-[#1877F2] transition-colors "
              target="_blank"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/BSESA01?t=B0pYGR1q-pmYSlQ2PWdx5A&s=09"
              target="_blank"
              className="text-[#000000] transition-colors"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/bsesa01?fbclid=IwY2xjawHJjZ5leHRuA2FlbQIxMAABHZ_qYxqPM4ZAIrCMsK_G-yhdLSIRq7PuQf9qzptwuPNtmTPnsJl89Qlldw_aem_5Z7j60a0nwEwLcxj0mcwCw"
              target="_blank"
              className="text-[#E4405F] transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@britanniasportandexercises6589"
              target="_blank"
              className="text-[#FF0000] transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <NavLink to="/dashboard">
              <div className="w-14 h-14 border border-primary border-solid relative rounded-full cursor-pointer overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user.image}
                  alt="User"
                />
              </div>
            </NavLink>
          ) : (
            <NavLink
              className="px-3 py-2 bg-primary text-whiteColor font-bold text-[1.1rem] cursor-pointer rounded-md"
              to="/login"
            >
              Log in
            </NavLink>
          )}

          {/* Mobile Menu Button */}
        </div>
        <button
          className="md:hidden text-gray-600 hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <HiX className="text-[2rem]" />
          ) : (
            <HiMenu className="text-[1.8rem]" />
          )}
        </button>
        <div
          className={`fixed inset-0 bg-black/50 z-[150] md:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 w-[300px] h-full bg-white z-[200] transform transition-transform duration-300 ease-in-out overflow-y-auto md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiX className="text-[2rem]" />
            </button>
            <nav className="mt-8">
              {links.map((item) => (
                <div key={item.id} className="mb-4">
                  <div
                    className="flex items-center justify-between py-2"
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                  >
                    <NavLink
                      to={item.link}
                      className={({ isActive }) => `
                                                text-[1.3rem] font-medium
                                                ${
                                                  isActive
                                                    ? "text-primary"
                                                    : "text-gray-800"
                                                }
                                            `}
                      onClick={(e) => {
                        if (item.subLinks) {
                          e.preventDefault();
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      {item.name}
                    </NavLink>
                    {item.subLinks && (
                      <FaChevronDown
                        className={`
                                                w-4 h-4 transition-transform duration-200
                                                ${
                                                  activeMenu === item.id
                                                    ? "rotate-180"
                                                    : ""
                                                }
                                            `}
                      />
                    )}
                  </div>
                  {item.subLinks && (
                    <div
                      className={`
                                            pl-4 overflow-hidden transition-all duration-300
                                            ${
                                              activeMenu === item.id
                                                ? "max-h-[600px] mt-2"
                                                : "max-h-0"
                                            }
                                        `}
                    >
                      {item.subLinks.map((sublink) => (
                        <NavLink
                          key={sublink.id}
                          to={sublink.link}
                          className={({ isActive }) => `
                                                        block py-2 text-[1.1rem]
                                                        ${
                                                          isActive
                                                            ? "text-primary"
                                                            : "text-gray-600"
                                                        }
                                                    `}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sublink.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100058790962758&mibextid=ZbWKwL"
                  className="text-[#1877F2] hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="w-9 h-9" />
                </a>
                <a
                  href="https://x.com/BSESA01"
                  className="text-black hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-9 h-9" />
                </a>
                <a
                  href="https://www.instagram.com/bsesa01"
                  className="text-[#E4405F] hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-9 h-9" />
                </a>
                <a
                  href="https://www.youtube.com/@britanniasportandexercises6589"
                  className="text-[#FF0000] hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="w-9 h-9" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
