import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleLanguage from "./toggleLanguage";

interface AppNavbarProps {
  pageTitle: string;
  pageLink: string;
}

export default function AppNavbar({ pageTitle, pageLink }: AppNavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ px: "4%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to={pageLink}
            sx={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderColor: "inherit",
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            {pageTitle}
          </Typography>
          <Box>
            <ToggleLanguage />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
