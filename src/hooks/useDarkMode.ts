import { useEffect, useState } from "react";

const DARK_MODE_KEY = "ferticoolombia-dark-mode";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(DARK_MODE_KEY);
    // The site defaults to light mode until the visitor explicitly chooses a theme.
    const shouldBeDark = storedValue === "true";
    
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
    setMounted(true);
  }, []);

  // Update DOM and localStorage when isDark changes
  useEffect(() => {
    if (mounted) {
      updateTheme(isDark);
      localStorage.setItem(DARK_MODE_KEY, isDark.toString());
    }
  }, [isDark, mounted]);

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return { isDark, toggleDarkMode, mounted };
}
