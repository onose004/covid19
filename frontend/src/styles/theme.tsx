import {
  createMuiTheme,
} from '@material-ui/core';  
import { pink, cyan } from '@material-ui/core/colors';

const lightTheme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: cyan,
    type: "light",
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: cyan,
    type: "dark",
  }
});

const theme = lightTheme
export default theme;
