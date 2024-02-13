import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/context/AuthContextProvider";
import ContentContextProvider from "./components/context/ContentContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ContentContextProvider>
        <App />
      </ContentContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
