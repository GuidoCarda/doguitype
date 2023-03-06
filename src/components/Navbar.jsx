import React from "react";
import { BsKeyboardFill } from "react-icons/bs";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  return (
    <header className="nav-bar">
      <div className="nav-logo">
        <BsKeyboardFill />
        <span>doguitype</span>
      </div>
    </header>
  );
};

export default Navbar;
