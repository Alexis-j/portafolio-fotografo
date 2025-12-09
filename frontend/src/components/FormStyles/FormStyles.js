import styled from 'styled-components';

/* ======================================================
   🔵 FORMULARIO PRINCIPAL
====================================================== */

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  max-width: 700px;
  margin: 2rem auto;   /* ← esto lo centra 😎 */

  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadius};

  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

/* Botón cerrar arriba a la derecha */
export const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

/* Inputs */
export const Label = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const TextArea = styled.textarea`
  padding: 0.7rem;
  min-height: 100px;
  width: 100%;

  border-radius: 8px;
  border: 1px solid #ccc;

  resize: vertical;

  font-size: 1rem;
  font-family: inherit;
`;

/* ======================================================
   🟣 IMÁGENES DE PREVISUALIZACIÓN
====================================================== */

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;

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

/* ======================================================
   🟢 LISTA DE RESEÑAS
====================================================== */

/* Contenedor de formulario + lista */
export const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  width: 100%;
`;


/* Versión horizontal para pantallas grandes */
export const PageWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  overflow-x: auto;
`;

/* Card de cada reseña */
export const ReviewCard = styled.div`
  display: grid;
  align-items: start;
  gap: 1rem;

  padding: 1rem;
  margin-bottom: 1rem;

  border: 1px solid #ccc;
  border-radius: 8px;

  width: 100%;
  max-width: 600px;

`;


/* Texto dentro del card */
export const ReviewText = styled.div`
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
`;


/* Acciones dentro del card */
export const ReviewActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  justify-content: center;
`;


/* Mensajes auxiliares */
export const ShowTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: red;
`;


export const ReviewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;

  width: 100%;
  max-width: 900px;

  margin-top: 1rem;
`;
