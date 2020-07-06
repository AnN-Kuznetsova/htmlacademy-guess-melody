import React from "react";
import ReactDom from "react-dom";
import {ConnectedApp} from "./components/app/app.jsx";
import {MAX_ERRORS_COUNT} from "./const.js";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducers/reducer.js";
import {questions} from "./mocks/questions.js";


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);


ReactDom.render(
    <Provider store={store}>
      <ConnectedApp
        maxErrorsCount={MAX_ERRORS_COUNT}
        questions={questions}
      />
    </Provider>,
    document.querySelector(`#root`)
);
