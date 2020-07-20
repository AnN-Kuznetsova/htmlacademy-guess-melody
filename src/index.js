import React from "react";
import ReactDom from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";

import {App} from "./components/app/app.jsx";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {createAPI} from "./api.js";
import {reducer} from "./reducers/reducer.js";


const api = createAPI(() => {});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);


ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
