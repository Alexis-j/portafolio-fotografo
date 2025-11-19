import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 600px;
  margin: 2rem auto;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: 1px solid;

`;

export const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const PreviewImage = styled.img`
  margin-top: 0.5rem;
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const PreviewImageVertical = styled.img`
  margin-top: 0.5rem;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
export const ShowTextWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
export const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
export const TextArea = styled.textarea`
  padding: 0.7rem;
  min-height: 100px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
`;
