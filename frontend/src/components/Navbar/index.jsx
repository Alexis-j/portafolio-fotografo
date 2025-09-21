import { BurgerButton, Menu, MenuItem, NavWrapper } from './styles.jsx';
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <NavWrapper>
      <BurgerButton onClick={toggleMenu} isOpen={isOpen}>
        <span className="burger-icon" />
      </BurgerButton>

      <Menu isOpen={isOpen}>
        <MenuItem delay="0.2s">About</MenuItem>
        <MenuItem delay="0.3s">Portfolio</MenuItem>
        <MenuItem delay="0.4s">Services</MenuItem>
        <MenuItem delay="0.5s">Contact</MenuItem>
      </Menu>
    </NavWrapper>
  );
}

export default Navbar;
