import { NavItem, NavLeft, NavLinks, NavRight, NavbarWrapper } from "./styles";

import React from "react";
import ThemeToggle from "../ThemeToggle";

function Navbar({ toggleTheme }) {
  return (
    <NavbarWrapper>
      <NavLeft>
        <h2>MiLogo</h2>
        <NavLinks>
          <NavItem href="#hero">Inicio</NavItem>
          <NavItem href="#portfolio">Portfolio</NavItem>
          <NavItem href="#contact">Contacto</NavItem>
        </NavLinks>
      </NavLeft>
      <NavRight>
        <ThemeToggle toggleTheme={toggleTheme} />
      </NavRight>
    </NavbarWrapper>
  );
}

export default Navbar;
