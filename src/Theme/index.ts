import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

const violetBase = "#409638";
// const redBase = "#BF3737";
const violetMain = alpha(violetBase, 0.7);
// const redMain = alpha(redBase, 0.7);
const mainBase = violetBase;
const main = violetMain;

export const theme = createTheme({
  palette: {
    primary: {
      main: main,
      light: alpha(mainBase, 0.5),
      dark: alpha(mainBase, 0.9),
      contrastText:
        getContrastRatio(main, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});
