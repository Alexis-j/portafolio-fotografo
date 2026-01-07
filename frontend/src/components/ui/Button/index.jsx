import { NavLink } from 'react-router-dom';
import React from 'react';
import { StyledButton } from './styles';

function Button({ children, variant = 'primary', to, ...props }) {
  const Component = to ? NavLink : 'button';

  return (
    <StyledButton
      as={Component}
      to={to}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
