import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app/app.jsx";


const settings = {
  ERRORS_COUNT: 3,
};

ReactDom.render(
    <App errorCount={settings.ERRORS_COUNT} />,
    document.querySelector(`#root`)
);
