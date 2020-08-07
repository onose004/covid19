import {
  createMuiTheme,
} from '@material-ui/core';  
import { pink, purple } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: purple,
    type: "dark",
  }
});

export default theme;
