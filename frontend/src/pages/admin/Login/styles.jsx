// pages/Login/styles.js
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

export const Card = styled.div`
  position: relative; /* 👈 necesario para que CloseWrapper se posicione dentro */
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 350px;
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
