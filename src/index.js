import React from "react";
import ReactDom from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";

import {App} from "./components/app/app.jsx";
import {Operation as DataOperation} from "./reducers/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user.js";
import {createAPI} from "./api.js";
import {reducer} from "./reducers/reducer.js";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());


ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
