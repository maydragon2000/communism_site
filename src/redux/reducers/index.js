import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";

const rootReducer = combineReducers({
  tokens: tokenReducer,
});

export default rootReducer;
