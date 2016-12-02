const initialState = {
    depth: 3
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_DEPTH":
            return Object.assign({}, state, {
                depth: action.value
            });
        default:
            return state;
    }
}
