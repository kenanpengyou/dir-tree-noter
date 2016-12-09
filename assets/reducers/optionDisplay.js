import optionPresets from "../presets/option";

const initialState = optionPresets;

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_DEPTH_DISPLAY":
            return Object.assign({}, state, {
                depth: action.value
            });
        case "SET_INDENT_DISPLAY":
            return Object.assign({}, state, {
                indent: action.value
            });
        case "RESET_OPTION_DISPLAY":
            return Object.assign({}, optionPresets);
        case "RESTORE_OPTION_DISPLAY":
            return Object.assign({}, optionPresets);
        default:
            return state;
    }
}
