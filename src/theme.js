import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#00b5ad',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
});

export default theme;