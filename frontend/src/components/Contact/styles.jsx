import styled from "styled-components";

export const ContactWrapper = styled.section`
  display: flex;
  align-items: flex-start;

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  padding-left: 15%;
  padding-right: 5.5%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding-left: 5%;
    padding-right: 5%;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const ContactTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const ContactDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;
export const Select = styled.select`
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder || "#aaa"};
  }
`;




export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const AltContact = styled.p`
  margin-top: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;
export const Photo = styled.img`
  width: 100%;
  max-width: 380px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Input = styled.input`
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder || "#aaa"};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  min-height: 80px;
  resize: none;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder || "#aaa"};
  }
`;
