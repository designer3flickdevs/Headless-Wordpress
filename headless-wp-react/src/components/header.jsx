import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sun } from "lucide-react";
import logo from "../assets/logo.webp";
import "../App.css";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/headless_wordpress/server/wp-json/wp-api-menus/v2/menus/17")
      .then((res) => setMenuItems(res.data.items))
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="flex items-center justify-between px-10 py-5 bg-[#0e1525] text-white">
      {/* Logo */}
      <img src={logo} alt="Logo" />

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-6 text-sm font-semibold">
          {menuItems.map((item) => (
            <li key={item.ID} className="relative group">
              <a href={item.url}>{item.title}</a>
              {/* Dropdown (optional) */}
              {item.children?.length > 0 && (
                <ul className="absolute hidden group-hover:block bg-[#1a2235] p-3 rounded-lg mt-2 shadow-lg">
                  {item.children.map((child) => (
                    <li key={child.ID}>
                      <a href={child.url} className="block py-1 px-3 hover:text-blue-400">
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;