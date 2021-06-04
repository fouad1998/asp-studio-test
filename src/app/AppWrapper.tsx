import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import App from "./App";

export interface AppWrapperProps {}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1f6bff",
    },
  },
  typography: {
    fontFamily: `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
});
const AppWrapper: React.FC<AppWrapperProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
