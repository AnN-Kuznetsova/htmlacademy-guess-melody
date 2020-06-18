import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app/app.jsx";
import {ERRORS_COUNT} from "./const.js";
import {questions} from "./mocks/questions.js";


const settings = {
  ERRORS_COUNT,
};

ReactDom.render(
    <App
      errorsCount={settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
