import React from "react";
import { Router, Route, Switch } from "react-router";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import indexRoutes from "./routes/index";
import { rewriteUrl } from "./routes/routingSystem";

import "./assets/scss/material-kit-react.css?v=1.1.0";

const hist = rewriteUrl();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          const { path, exact, Component } = prop;
          return <Route path={path} exact={exact} key={key} render={(props) => <Component {...props} />} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
