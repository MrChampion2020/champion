import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    root.style.setProperty('--brand-primary', '#191970');
    root.style.setProperty('--brand-primary-rgb', '25, 25, 112');
    root.style.setProperty('--brand-surface', '#ECEFF1');
    root.style.setProperty('--brand-surface-rgb', '236, 239, 241');
    root.style.setProperty('--brand-secondary', '#8C6F4E');
    root.style.setProperty('--brand-secondary-rgb', '140, 111, 78');

    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#10143D');
      root.style.setProperty('--bg-secondary', '#131A4B');
      root.style.setProperty('--bg-tertiary', '#1A235F');
      root.style.setProperty('--text-primary', '#F6F8FB');
      root.style.setProperty('--text-secondary', '#BCC7D5');
      root.style.setProperty('--accent', '#8C6F4E');
      root.style.setProperty('--accent-soft', '#B19270');
      root.style.setProperty('--accent-strong', '#C5A17A');
      root.style.setProperty('--card-bg', 'rgba(18, 24, 68, 0.72)');
      root.style.setProperty('--card-bg-strong', 'rgba(22, 29, 81, 0.88)');
      root.style.setProperty('--field-bg', 'rgba(236, 239, 241, 0.08)');
      root.style.setProperty('--field-text', '#F6F8FB');
      root.style.setProperty('--field-placeholder', 'rgba(236, 239, 241, 0.62)');
      root.style.setProperty('--border', 'rgba(236, 239, 241, 0.12)');
      root.style.setProperty('--border-strong', 'rgba(236, 239, 241, 0.2)');
      root.style.setProperty('--nav-shell', 'rgba(12, 16, 51, 0.74)');
      root.style.setProperty('--section-muted', 'rgba(236, 239, 241, 0.04)');
      root.style.setProperty('--hero-overlay-start', 'rgba(8, 11, 33, 0.12)');
      root.style.setProperty('--hero-overlay-end', 'rgba(8, 11, 33, 0.82)');
      root.style.setProperty('--wheel-color', 'rgba(236, 239, 241, 0.18)');
      root.style.setProperty('--glow', 'rgba(140, 111, 78, 0.28)');
      root.style.setProperty('--shadow-soft', '0 18px 45px rgba(3, 6, 22, 0.32)');
      root.style.setProperty('--shadow-lifted', '0 26px 65px rgba(3, 6, 22, 0.42)');
      root.style.setProperty(
        '--button-shadow',
        '0 18px 35px rgba(140, 111, 78, 0.18), 0 0 0 1px rgba(236, 239, 241, 0.08) inset'
      );
      root.style.setProperty(
        '--button-shadow-strong',
        '0 22px 45px rgba(140, 111, 78, 0.26), 0 0 0 1px rgba(236, 239, 241, 0.14) inset'
      );
      root.style.setProperty('--button-text', '#FDFBF8');
    } else {
      root.style.setProperty('--bg-primary', '#F7F8FB');
      root.style.setProperty('--bg-secondary', '#EDF1F4');
      root.style.setProperty('--bg-tertiary', '#FFFFFF');
      root.style.setProperty('--text-primary', '#1B2350');
      root.style.setProperty('--text-secondary', '#55627B');
      root.style.setProperty('--accent', '#8C6F4E');
      root.style.setProperty('--accent-soft', '#A78964');
      root.style.setProperty('--accent-strong', '#6F553B');
      root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.84)');
      root.style.setProperty('--card-bg-strong', 'rgba(255, 255, 255, 0.94)');
      root.style.setProperty('--field-bg', 'rgba(255, 255, 255, 0.92)');
      root.style.setProperty('--field-text', '#1B2350');
      root.style.setProperty('--field-placeholder', 'rgba(27, 35, 80, 0.48)');
      root.style.setProperty('--border', 'rgba(25, 25, 112, 0.12)');
      root.style.setProperty('--border-strong', 'rgba(25, 25, 112, 0.18)');
      root.style.setProperty('--nav-shell', 'rgba(248, 249, 252, 0.82)');
      root.style.setProperty('--section-muted', 'rgba(25, 25, 112, 0.035)');
      root.style.setProperty('--hero-overlay-start', 'rgba(248, 249, 252, 0.14)');
      root.style.setProperty('--hero-overlay-end', 'rgba(10, 16, 49, 0.42)');
      root.style.setProperty('--wheel-color', 'rgba(25, 25, 112, 0.16)');
      root.style.setProperty('--glow', 'rgba(25, 25, 112, 0.14)');
      root.style.setProperty('--shadow-soft', '0 16px 38px rgba(25, 25, 112, 0.08)');
      root.style.setProperty('--shadow-lifted', '0 22px 48px rgba(25, 25, 112, 0.14)');
      root.style.setProperty(
        '--button-shadow',
        '0 18px 32px rgba(25, 25, 112, 0.10), 0 0 0 1px rgba(255, 255, 255, 0.72) inset'
      );
      root.style.setProperty(
        '--button-shadow-strong',
        '0 24px 40px rgba(25, 25, 112, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.92) inset'
      );
      root.style.setProperty('--button-text', '#F8F6F2');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};










// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };



