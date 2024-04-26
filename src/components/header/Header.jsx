import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiChevronDown, BiChevronUp } from "react-icons/bi";
import "../../styles/header.css"; // Import CSS file for animations

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/patient-services",
    display: "Patient Services",
    submenu: [
      { path: "/patient-services", display: "Care Options" },
      { path: "/patient-services", display: "Wellness Programs" },
      { path: "/patient-services", display: "Treatment Plans" },
      { path: "/patient-services", display: "Health Solutions" },
    ],
  },
  {
    path: "/patient-resources",
    display: "Patient Resources",
    submenu: [
      { path: "/patient-resources", display: "Support Materials" },
      { path: "/patient-resources", display: "Educational Tools" },
      { path: "/patient-resources", display: "Wellbeing Resources" },
      { path: "/patient-resources", display: "Informational Assets" },
    ],
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/offers",
    display: "Offers",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);

  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      handleStickyHeader();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const smoothScroll = (path) => {
    const target = document.querySelector(`#${path}`);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      // Add a class to the header to hide it when scrolling to a section
      document.querySelector("header").classList.add("hide-on-scroll");
    }
  };

  const handleMouseEnter = (path) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [path]: true,
    }));
  };

  const handleMouseLeave = (path) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [path]: false,
    }));
  };

  return (
    <header
      className={`header background_image flex items-center ${
        stickyHeader ? "sticky__header" : ""
      }`}
      ref={headerRef}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="my-3">
          <Link to="/home" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "280px", height: "80px" }}
            />
          </Link>
        </div>

        {/* Menu */}
        <div className="navigation" ref={menuRef}>
          <div className="menu-wrapper border border-primaryColor rounded-lg px-[50px] py-[5px]">
            <ul className="menu flex items-center gap-[2.7rem] ">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleMouseEnter(link.path)}
                  onMouseLeave={() => handleMouseLeave(link.path)}
                  className="slide-in"
                >
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        smoothScroll(link.path.substr(1));
                      }}
                      isActive={(match, location) => {
                        if (link.path === "/home") {
                          return location.pathname === "/";
                        }
                        return location.pathname.includes(link.path);
                      }}
                      className={`text-textColor text-[16px] leading-7 font-[800] hover:text-primaryColor`}
                      style={{
                        transform:
                          hoveredItem === index ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.2s",
                      }}
                    >
                      {link.display}
                    </NavLink>
                    {link.submenu && dropdownOpen[link.path] && (
                      <BiChevronUp className="ml-1 text-primaryColor pointer-events-none" />
                    )}
                    {link.submenu && !dropdownOpen[link.path] && (
                      <BiChevronDown className="ml-1 text-primaryColor pointer-events-none" />
                    )}
                    {link.submenu && (
                      <ul
                        className={`dropdown top-[35px] rounded-[20px] absolute bg-subMenuColor shadow-lg p-2 transition-all duration-300 ease-in-out ${
                          dropdownOpen[link.path] ? "open" : ""
                        }`}
                        style={{ minWidth: "250px" }}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {link.submenu.map((submenuItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="text-textColor font-[600] hover:text-primaryColor"
                            onMouseEnter={() => setHoveredSubItem(subIndex)}
                            onMouseLeave={() => setHoveredSubItem(null)}
                            style={{
                              transform:
                                hoveredSubItem === subIndex
                                  ? "scale(1.05)"
                                  : "scale(1)",
                              transition: "transform 0.2s",
                            }}
                          >
                            <NavLink to={submenuItem.path}>
                              {submenuItem.display}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menu Button (Mobile) */}
        <span className="md:hidden" onClick={toggleMenu}>
          <BiMenu className="w-6 h-6 cursor-pointer" />
        </span>
      </div>
    </header>
  );
};

export default Header;
