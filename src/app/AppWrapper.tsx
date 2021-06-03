import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import App from "./App";

export interface AppWrapperProps {}

const theme = createMuiTheme();
const AppWrapper: React.SFC<AppWrapperProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
