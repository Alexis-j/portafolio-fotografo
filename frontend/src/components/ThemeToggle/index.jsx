import { Moon, Sun } from "lucide-react"; // librería de íconos moderna

import { Button } from "./styles";
import React from "react";
import { useTheme } from "styled-components";

function ThemeToggle({ toggleTheme }) {
  const theme = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme.mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}

export default ThemeToggle;
