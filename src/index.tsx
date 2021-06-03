import AppWrapper from "@app/AppWrapper";
import React from "react";
import { render } from "react-dom";

render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);
