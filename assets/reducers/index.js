
import { combineReducers } from "redux";
import upload from "./upload";
import editor from "./editor";
import option from "./option";
import optionDisplay from "./optionDisplay";

export default combineReducers({
    upload, editor, option, optionDisplay
});
