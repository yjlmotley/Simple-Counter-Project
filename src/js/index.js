import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App.jsx";

// Use App component from AppSimplified.jsx file for just the counter or counter w/ the start/stop/reset buttons 
// import App from "./component/AppSimplified.jsx"

import "../styles/index.css";


ReactDOM.render(<App />, document.querySelector("#app"));