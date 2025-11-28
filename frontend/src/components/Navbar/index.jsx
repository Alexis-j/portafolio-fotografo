import { BurgerButton, Menu, MenuItem, NavWrapper } from './styles.jsx';
import React, { useEffect, useRef, useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <NavWrapper>
      <BurgerButton ref={buttonRef} onClick={toggleMenu} $isOpen={isOpen}>
        <span className="burger-icon" />
      </BurgerButton>

      <Menu ref={menuRef} $isOpen={isOpen}>
        <MenuItem $delay="0.2s" onClick={() => setIsOpen(false)}>Home</MenuItem>
        <MenuItem $delay="0.3s" onClick={() => setIsOpen(false)}>Portfolio</MenuItem>
        <MenuItem $delay="0.4s" onClick={() => setIsOpen(false)}>Services</MenuItem>
        <MenuItem $delay="0.5s" onClick={() => setIsOpen(false)}>Contact</MenuItem>
      </Menu>
    </NavWrapper>
  );
}

export default Navbar;
