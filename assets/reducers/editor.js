const initialState = {
    content: "",
    rootName: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "FINISH_READ":
            return Object.assign({}, state, {
                content: action.content,
                rootName: action.rootName
            });
        default:
            return state;
    }
}
