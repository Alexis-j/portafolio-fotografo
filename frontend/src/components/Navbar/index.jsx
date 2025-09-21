import { Nav, NavItem } from "./styles";

import React from "react";
import ThemeToggle from "../ThemeToggle";

function Navbar({ toggleTheme }) {
  return (
    <Nav>
      <h2>MiLogo</h2>
      <div>
        <NavItem href="#hero">Inicio</NavItem>
        <NavItem href="#portfolio">Portfolio</NavItem>
        <NavItem href="#contact">Contacto</NavItem>
      </div>
      <ThemeToggle toggleTheme={toggleTheme} />
    </Nav>
  );
}

export default Navbar;
