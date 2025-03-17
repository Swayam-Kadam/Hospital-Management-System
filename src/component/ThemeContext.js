import React, { createContext, useState, useEffect } from "react";

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem("theme") || "light";

  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Apply theme to <body>
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
