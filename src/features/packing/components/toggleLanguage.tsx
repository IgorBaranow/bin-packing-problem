import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ToggleLanguage() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pl" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      sx={{
        color: "inherit",
        borderBottom: "2px solid transparent",

        "&:hover": {
          borderColor: "inherit",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {i18n.language === "en" ? "Polski" : "English"}
    </Button>
  );
}
