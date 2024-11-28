import React from "react";
import PackingPage from "src/features/packing/components/PackingPage";
import theme from "./config/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PackingPage />
    </ThemeProvider>
  );
}
