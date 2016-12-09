import optionPresets from "../presets/option";

const initialState = {
    display: Object.assign({}, optionPresets),
    actual: Object.assign({}, optionPresets)
};

export default function(state = initialState, action) {
    let display = Object.assign({}, state.display),
        actual = Object.assign({}, state.actual);

    switch (action.type) {

        // submit: assign "actual" with "display"
        case "SUBMIT_DISPLAY":
            actual = Object.assign({}, display);
            return {
                display,
                actual
            };
        case "SET_DEPTH_DISPLAY":
            return {
                display: Object.assign(display, {
                    depth: action.value
                }),
                actual
            };
        case "SET_INDENT_DISPLAY":
            return {
                display: Object.assign(display, {
                    indent: action.value
                }),
                actual
            };
        case "RESET_OPTION_DISPLAY":
            return {
                display: Object.assign({}, optionPresets),
                actual
            };

        // restore "display" to "actual"
        case "RESTORE_OPTION_DISPLAY":
            display = Object.assign({}, actual);
            return {
                display,
                actual
            };
        default:
            return state;
    }
}
