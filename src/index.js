import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app/app.jsx";
import {MAX_ERRORS_COUNT} from "./const.js";
import {questions} from "./mocks/questions.js";


ReactDom.render(
    <App
      maxErrorsCount={MAX_ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
