const lightTheme = {
  colors: {
    primary: '#222222',      // títulos
    text: '#333333',         // texto base
    accent: '#d35400',       // botones, links
    background: '#fdfdfd',   // fondo claro
    lightGray: '#f4f4f4',    // fondos secundarios
  },
  fontSizes: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    md: '1rem',     // 16px
    lg: '1.25rem',  // 20px
    xl: '2rem',     // 32px
    xxl: '3rem',    // 48px
  },
  spacing: (factor) => `${factor * 8}px`,
  borderRadius: '12px',
};

const darkTheme = {
  colors: {
    primary: '#e0e0e0',      // títulos claros
    text: '#cccccc',         // texto base
    accent: '#f39c12',       // botones, links
    background: '#2c2c2c',   // gris oscuro
    lightGray: '#3a3a3a',    // fondos secundarios
  },
  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
};

export { lightTheme, darkTheme };
