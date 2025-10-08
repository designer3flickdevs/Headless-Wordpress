import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sun } from "lucide-react";
import logo from "../assets/logo.webp";
import "../App.css";

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://headlesswpreact.s6-tastewp.com/wp-json/wp-api-menus/v2/menus/17")
      .then((res) => setMenuItems(res.data.items))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    {/* Header */}
    <header className="lifestyle-header flex items-center justify-between px-10 py-5 bg-[#0e1525] text-white">
      <img src={logo} alt="Logo" />
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
    
    {/* Hero Banner */}
    {/* <div backgroundImage="url('https://zf2xqj.yourbrand.studio/files/dynamicContent/sites/zf2xqj/images/en/webpage_12/m5p6bgzu/element_280/rwdMode_1/2400x800/Header_Home.webp')" className="h-64 bg-cover bg-center flex items-center justify-center">
        <h1>Header Component</h1>
    </div> */}
    </>
    
  );
};

export default Header;