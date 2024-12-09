import React from "react";
import PackingPage from "src/features/packing/components/PackingPage";
import theme from "./config/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Import the exported instance

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <PackingPage />
      </I18nextProvider>
    </ThemeProvider>
  );
}
