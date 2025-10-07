import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    opacity: 1;
    visibility: visible;
    transition: all 0.2s ease;

  }
`;

export const TooltipText = styled.span`
  position: absolute;
  bottom: 130%; /* Aparece arriba del elemento */
  left: 50%;
  transform: translateX(1%);
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;

  &::after {
  content: "";
  position: absolute;
  bottom: -6px; /* hacia abajo del tooltip */
  left: 5px;
  transform: none;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 50%; /* círculo perfecto */
clip-path: polygon(49% 28%, 50% 0, 100% 0, 100% 55%, 70% 71%, 31% 92%, 0 100%, 31% 63%);
`;
