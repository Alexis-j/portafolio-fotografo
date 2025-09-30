import React from "react";
import { StyledCancelButton } from "./styles";
import { useNavigate } from "react-router-dom";

const CancelButton = ({ children = "Cancelar", redirect = "/admin/dashboard" }) => {
  const navigate = useNavigate();

  return (
    <StyledCancelButton type="button" onClick={() => navigate(redirect)}>
      {children}
    </StyledCancelButton>
  );
};

export default CancelButton;
