import { Moon, Sun } from "lucide-react";

import React from "react";
import { ToggleButton } from "./styles";

function ToggleThemeButton({ toggleTheme, isDark }) {
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Cambiar tema">
      {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </ToggleButton>
  );
}

export default ToggleThemeButton;
