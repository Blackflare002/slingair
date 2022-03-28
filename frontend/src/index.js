import React from "react";
import ReactDOM from "react-dom";
import { FlightContextProvider } from "./flightContext";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <FlightContextProvider>
      <App />
    </FlightContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
