const initialState = {
    content: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "FINISH_READ":
            return Object.assign({}, state, {
                content: action.output
            });
        default:
            return state;
    }
}
