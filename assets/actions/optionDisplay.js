const setDepthDisplay = (value) => ({
    type: "SET_DEPTH_DISPLAY",
    value
});

const setIndentDisplay = (value) => ({
    type: "SET_INDENT_DISPLAY",
    value
});

const resetOptionDisplay = () => ({
    type: "RESET_OPTION_DISPLAY"
});

const restoreDisplay = () => ({
    type: "RESTORE_OPTION_DISPLAY"
});

export default {
    setDepthDisplay, setIndentDisplay, resetOptionDisplay, restoreDisplay
};
