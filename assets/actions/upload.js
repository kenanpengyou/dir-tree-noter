const detectDrop = (isOver) => ({
    type: "DETECT_DROP",
    isOver: isOver
});

const loadingDrop = () => ({
    type: "LOADING_DROP"
});

const finishRead = (output) => ({
    type: "FINISH_READ",
    content: output.content,
    rootName: output.rootName
});

export default {
    detectDrop,
    loadingDrop,
    finishRead
};
