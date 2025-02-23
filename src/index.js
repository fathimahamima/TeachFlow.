import React from "react";
import ReactDOM from "react-dom";
import { SessionProvider } from "next-auth/react";
import App from "./App";

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById("root")
);

