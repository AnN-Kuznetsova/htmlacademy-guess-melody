import * as React from "react";
import * as ReactDom from "react-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";

import {App} from "./components/app/app";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api";
import {reducer} from "./reducers/reducer";


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
