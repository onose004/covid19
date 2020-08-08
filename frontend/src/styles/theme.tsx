import {
  createMuiTheme,
} from '@material-ui/core';  
import { pink, cyan} from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: cyan,
    type: "dark",
  }
});

export default theme;
