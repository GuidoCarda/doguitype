import React from "react";
import { BsKeyboardFill } from "react-icons/bs";
import ThemePicker from "./ThemePicker";

const Navbar = () => {
  return (
    <header className="nav-bar">
      <div className="nav-logo">
        <BsKeyboardFill />
        <span>doguitype</span>
      </div>
      <ThemePicker />
    </header>
  );
};

export default Navbar;
