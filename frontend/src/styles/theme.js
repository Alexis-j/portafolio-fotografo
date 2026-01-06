const lightTheme = {
  colors: {
    primary: '#222222',      // títulos
    text: '#333333',         // texto base
    accent: '#aeb4baff',       // botones, links
    background: '#fdfdfd',   // fondo claro
    lightGray: '#f4f4f4',    // fondos secundarios
    danger: '#d35400',       // ❌ botones de cancelar / error
    loginButton: '#4747D4',  // Login Botones
    bulletsActives:'#2c2c2c',
    border: '#222222', // 👈 borde oscuro

  },
    components: {
    reviews: {
      textBox: {
        background: '#ffffff',
        text: '#333333',
        name: '#222222',
        shadow: '0 4px 14px rgba(0,0,0,0.15)',
      },
    },
  },
  fontSizes: {
    xs: '0.75rem',  // 12px
    sm: '1.1rem', // 14px
    md: '1.35rem',     // 16px
    lg: '1.75rem',  // 20px
    xl: '2rem',     // 32px
    xxl: '3rem',    // 48px
  },
  spacing: (factor) => `${factor * 8}px`,
  borderRadius: '4px',
};

const darkTheme = {
  colors: {
    primary: '#e0e0e0',
    text: '#cccccc',
    accent: '#bdc3c7',
    background: '#2c2c2c',
    bulletsActives:'#fdfdfd',
    lightGray: '#3a3a3a',
    danger: '#f39c12',
    loginButton:'#2c3e50',

    border: '#e0e0e0', // 👈 borde claro
  },

  components: {
    reviews: {
      textBox: {
        background: '#3a3a3a',  // 🔥 NO negro puro
        text: '#e0e0e0',
        name: '#ffffff',
        shadow: '0 6px 20px rgba(0,0,0,0.6)',
      },
    },
  },

  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
};


export { lightTheme, darkTheme };
