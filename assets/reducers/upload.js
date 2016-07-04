const initialState = {
    isLoading : false,
    isComplete : false
};

export default function(state = initialState, action){
    switch (action.type) {
        case "loading":
            return { isLoading: true};
        case "complete":
            return { isComplete: true};
        default:
            return state;
    }
}
