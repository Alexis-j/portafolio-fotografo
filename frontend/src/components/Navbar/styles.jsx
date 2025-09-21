import styled, { css, keyframes } from 'styled-components';

export const NavWrapper = styled.div`
  position: relative;
`;

// Animación para los items del menú
const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const BurgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px; /* o right: 20px si lo quieres al otro lado */
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .burger-icon {
    position: relative;
    display: block;
    width: 28px;
    height: 3px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  .burger-icon::before,
  .burger-icon::after {
    content: '';
    position: absolute;
    height: 3px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  .burger-icon::before {
    top: -8px;
    width: 18px;
    right: 0;
  }

  .burger-icon::after {
    top: 8px;
    width: 18px;
    left: 0;
  }

  /* Cuando el menú está abierto */
  ${({ isOpen }) =>
    isOpen &&
    css`
      .burger-icon {
        background: transparent;
      }
      .burger-icon::before {
        transform: rotate(45deg) translate(6px, 6px);
        width: 28px;
      }
      .burger-icon::after {
        transform: rotate(-45deg) translate(5px, -5px);
        width: 28px;
      }
    `}
`;


export const Menu = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 250px;
  height: 100vh;
  background: ${({ theme }) =>
    theme.colors.background === '#2c2c2c'
      ? 'rgba(44, 44, 44, 0.5)'   /* dark */
      : 'rgba(244, 244, 244, 0.5)' /* light (#f4f4f4 con transparencia) */};
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(10px); /* para Safari */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: left 0.5s ease-in-out;
  z-index: 90;
`;

export const MenuItem = styled.a`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem 0;
  opacity: 0;
  animation: ${slideFadeIn} 0.5s forwards;
  animation-delay: ${({ delay }) => delay || '0s'};
`;
