import uploadActions from "./upload";
import editorActions from "./editor";
import optionsAction from "./editor";

module.exports = Object.assign({},
    uploadActions,
    editorActions,
    optionsAction
);
