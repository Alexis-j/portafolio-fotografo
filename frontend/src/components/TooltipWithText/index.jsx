import {TooltipText, TooltipWrapper} from './styles'

import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <TooltipWrapper>
      {children}
      <TooltipText>{text}</TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
