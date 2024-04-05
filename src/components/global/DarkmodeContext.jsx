import React, { createContext, useContext } from "react";

const initialState = {
  theme: "system",
  setTheme: () => {},
};

const ThemeProviderContext = createContext(initialState);

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    const storageKey = props.storageKey || "vite-ui-theme";
    const defaultTheme = props.defaultTheme || "system";
    const theme = localStorage.getItem(storageKey) || defaultTheme;
    this.state = { theme };

    this.setTheme = (theme) => {
      localStorage.setItem(storageKey, theme);
      this.setState({ theme });
    };
  }

  componentDidMount() {
    const root = window.document.documentElement;
    const { theme } = this.state;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }

  componentDidUpdate() {
    const root = window.document.documentElement;
    const { theme } = this.state;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }

  render() {
    return <ThemeProviderContext.Provider value={{ ...this.state, setTheme: this.setTheme }}>{this.props.children}</ThemeProviderContext.Provider>;
  }
}

const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { ThemeProvider, useTheme };
