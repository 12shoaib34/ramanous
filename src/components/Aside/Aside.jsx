import { AppstoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AngleRight from "../../icons/AngleRight";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../commonSlice";

const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState({});

  const { isMenuOpen } = useSelector((state) => state?.common);

  const toggleDropdown = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const items = [
    {
      path: null,
      title: "Lucky Draw",
      icon: <AppstoreOutlined />,
      disabled: false,
      divider: false,
      children: [
        {
          path: "/create-lucky-draw",
          title: "Create Lucky Draw",
          icon: null,
          disabled: false,
          divider: false,
        },
        {
          path: "/list-lucky-draw",
          title: "List Lucky Draw",
          icon: null,
          disabled: false,
          divider: false,
        },
      ],
    },
  ];

  const handleClick = (path) => {
    dispatch(toggleMenu(false));
    if (path) navigate(path);
  };

  return (
    <div
      className={`w-60 max-w-60 flex flex-col h-full shadow-soft-right bg-nav-bg overflow-hidden z-50 duration-300 max-2xl:fixed ${
        isMenuOpen ? "max-2xl:translate-x-0" : "max-2xl:-translate-x-full"
      }`}
    >
      <div className="h-full w-full flex flex-col">
        <div className="flex-grow overflow-auto w-full">
          {items.map((item, index) => (
            <div key={index} className="p-2">
              {item.path === null && item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    disabled={item.disabled}
                    className={`flex items-center justify-between w-full px-2 py-1 rounded-lg text-sm font-medium ${
                      item.disabled ? "bg-white opacity-50 cursor-not-allowed" : "bg-transparent hover:bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon} {item.title}
                    </span>
                    <span>
                      <AngleRight className={`${openMenus[item.title] ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: openMenus[item.title] ? "auto" : 0, opacity: openMenus[item.title] ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {item.children.map((child, idx) => {
                      const isActive = location.pathname === child.path; // Check if current route is active

                      return (
                        <React.Fragment key={idx}>
                          <button
                            onClick={() => handleClick(child.path)}
                            disabled={child.disabled}
                            className={`w-full text-left px-8 py-1 rounded-lg text-sm font-medium ${
                              child.disabled
                                ? "bg-transparent opacity-50 cursor-not-allowed"
                                : isActive
                                ? "bg-white text-black font-bold" // Active state style
                                : "bg-transparent hover:bg-white"
                            }`}
                          >
                            {child.title}
                          </button>
                          {child.divider && <div className="border-t border-gray-600 my-2"></div>}
                        </React.Fragment>
                      );
                    })}
                  </motion.div>
                </>
              ) : (
                <button
                  onClick={() => handleClick(item.path)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                    item.disabled
                      ? "bg-gray-700 opacity-50 cursor-not-allowed"
                      : location.pathname === item.path
                      ? "bg-white text-black font-bold" // Active state for parent menu items
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {item.icon} {item.title}
                </button>
              )}
              {item.divider && <div className="border-t border-gray-600 my-2"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
