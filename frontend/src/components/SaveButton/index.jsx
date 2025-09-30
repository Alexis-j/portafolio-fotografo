import React from "react";
import { StyledSaveButton } from "./styles";

const SaveButton = ({ children = "Guardar", ...props }) => {
  return <StyledSaveButton {...props}>{children}</StyledSaveButton>;
};

export default SaveButton;
