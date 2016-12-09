
import { combineReducers } from "redux";
import upload from "./upload";
import editor from "./editor";
import option from "./option";

export default combineReducers({
    upload, editor, option
});
