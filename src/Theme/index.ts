import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const violetBBase = '#181661';
const redBase = '#d32f2f';
const violetMain = alpha(violetBBase, 0.7);
const redMain = alpha(redBase, 0.7);
const mainBase = redBase;
const main = redMain;

export const theme = createTheme({
  palette: {
    primary: {
      main: main,
      light: alpha(mainBase, 0.5),
      dark: alpha(mainBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});
