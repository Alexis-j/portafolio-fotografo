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
