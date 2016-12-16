import Immutable from "immutable";

const initialState = Immutable.Map({
    content: "",
    rootName: ""
});

export default function(state = initialState, action) {
    switch (action.type) {
        case "FINISH_READ":
            return state.merge({
                content: action.content,
                rootName: action.rootName
            });
        default:
            return state;
    }
}
