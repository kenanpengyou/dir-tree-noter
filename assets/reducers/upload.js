const initialState = {
    isBoxActive: false,
    isLoading: false,
    isComplete: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "DETECT_DROP":
            return Object.assign({}, state, {
                isBoxActive: action.isOver
            });
        case "LOADING_DROP":
            return Object.assign({}, state, {
                isBoxActive: false,
                isLoading: true
            });
        case "COMPLETE_DROP":
            return Object.assign({}, state, {
                isComplete: true
            });
        default:
            return state;
    }
}
