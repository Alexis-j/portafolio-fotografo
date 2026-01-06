import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  width: 220px;
  background-color: ${({ theme }) => theme.colors.backgroundSidebar};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid;

`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LinkItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin-bottom: 1rem;
  font-weight: bold;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Divider = styled.div `
width: 100%;
height: 1px;
margin: 0;
background: ${({ theme }) => theme.components.reviews.textBox.text};
`

export const CategoryItem = styled(NavLink)`
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.background || "#fff"};
  color: ${({ theme }) => theme.colors.text || "#000"};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textOnAccent || "#fff"};
  }

  &.active {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textOnAccent || "#fff"};
  }
`;

