import { BrowserRouter, Routes, Route } from "react-router-dom";
import PackingPage from "src/features/packing/components/PackingPage";
import theme from "./config/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import SolveKnapsackBenchmarkPage from "../features/packing/components/SolveKnapsackBenchmarkPage";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <Routes>
            <Route index element={<PackingPage />} />
            <Route path="/benchmark" element={<SolveKnapsackBenchmarkPage />} />
          </Routes>
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
