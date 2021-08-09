import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000",
      light: "#202035",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#2a2a31",
      secondary: "rgba(12, 45, 72, 0.54)",
      hint: "rgba(12,45,72,0.38)",
      disabled: "rgba(12,45,72,0.38)",
    },
  },
});

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <ThemeProvider theme={theme}>
        <header>
          <Header />
        </header>
        <main>
          <Routing />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
