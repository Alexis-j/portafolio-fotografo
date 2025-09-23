import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 2rem auto;
`;

export const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const PreviewImage = styled.img`
  margin-top: 0.5rem;
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const ShowTextWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
