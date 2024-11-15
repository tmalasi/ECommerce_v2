import { createContext, useState, useEffect } from "react";
import { ThemeContextType } from "../interfaces/ThemeInterface";
import { ContextProviderProps } from "../interfaces/CartInterface";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const values: ThemeContextType = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={values}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
