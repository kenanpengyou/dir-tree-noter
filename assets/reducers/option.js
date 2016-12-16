import optionPresets from "../presets/option";
import Immutable from "immutable";

const initialState = Immutable.Map({
    display: Immutable.Map(optionPresets),
    actual: Immutable.Map(optionPresets)
});

export default function(state = initialState, action) {
    let display = state.get("display"),
        actual = state.get("actual");

    switch (action.type) {

        // submit: assign "actual" with "display"
        case "SUBMIT_DISPLAY":
            return state.mergeDeep({
                actual: display
            });
        case "SET_DEPTH_DISPLAY":
            return state.mergeDeep({
                display: {
                    depth: action.value
                }
            });
        case "SET_INDENT_DISPLAY":
            return state.mergeDeep({
                display: {
                    indent: action.value
                }
            });
        case "RESET_OPTION_DISPLAY":
            return state.mergeDeep({
                display: Immutable.Map(optionPresets)
            });

        // restore "display" to "actual"
        case "RESTORE_OPTION_DISPLAY":
            return state.mergeDeep({
                display: actual
            });
        default:
            return state;
    }
}
