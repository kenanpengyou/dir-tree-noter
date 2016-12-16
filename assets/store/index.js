import { createStore } from "redux";
import appReducer from "../reducers";
import Immutable from "immutable";

const initialState = Immutable.Map();
export default createStore(appReducer, initialState);
