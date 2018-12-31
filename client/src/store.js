import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);
export default store;
