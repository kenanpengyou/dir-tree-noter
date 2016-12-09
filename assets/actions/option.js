const setDepth = (value) => ({
    type: "SET_DEPTH",
    value
});

const setIndent = (value) => ({
    type: "SET_INDENT",
    value
});

export default {
    setDepth, setIndent
};
