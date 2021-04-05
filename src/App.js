import React from "react";
import GlobalState from "./context/GlobalState";
import { ThemeProvider } from "@material-ui/core/styles";
import smTheme from "./styles/theme";
import { Header } from "./components/layout/index";
import AppRouter from "./components/routes/AppRouter";

function App() {
  return (
    <GlobalState>
      <ThemeProvider theme={smTheme}>
        <AppRouter>
          <Header />
        </AppRouter>
      </ThemeProvider>
    </GlobalState>
  );
}

export default App;
