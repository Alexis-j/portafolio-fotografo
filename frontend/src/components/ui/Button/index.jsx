import React from 'react';
import { StyledButton } from './styles';

function Button({ children, variant = 'primary', ...props }) {
  // variant: 'primary' | 'secondary' | 'save' | 'cancel' etc.
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
