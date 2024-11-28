import { createTheme } from "@mui/material";
import { FontFamilies } from "./FontFamilies";
import { FontWeights } from "./FontWeights";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b26e6e",
      light: "#d79191",
    },
    text: {
      primary: "#b26e6e",
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.regular,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FAF0D7",
          margin: "2rem 0",
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "3rem",
  lineHeight: "3rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.semibold,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    lineHeight: "2.25rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.875rem",
  lineHeight: "2.813rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.375rem",
    lineHeight: "2.063rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.5rem",
  lineHeight: "2.25rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
};

theme.typography.h5 = {
  fontSize: "1.375rem",
  lineHeight: "2.063rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
};
theme.typography.h6 = {
  fontSize: "1.25rem",
  lineHeight: "1.875rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  },
};
theme.typography.body1 = {
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};
theme.typography.body2 = {
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
};
theme.typography.subtitle1 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
};
theme.typography.subtitle2 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
};
theme.typography.caption = {
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
};

export default theme;
