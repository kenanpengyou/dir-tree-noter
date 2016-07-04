
import { combineReducers } from "redux";
import upload from "./upload";
import editor from "./editor";

const app = combineReducers({
    upload, editor
});

export default app;
