import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
`;
