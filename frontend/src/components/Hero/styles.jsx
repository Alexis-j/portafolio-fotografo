import styled from 'styled-components';

export const HeroWrapper = styled.section`
  background: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing(6)};
  text-align: center;
  transition: all 0.3s ease;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;
