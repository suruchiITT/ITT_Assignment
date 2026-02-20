import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<Provider store={store}>
<ThemeProvider theme={theme}>
<GlobalStyles/>
<BrowserRouter>
<App/>
</BrowserRouter>
</ThemeProvider>
</Provider>
</React.StrictMode>
);
