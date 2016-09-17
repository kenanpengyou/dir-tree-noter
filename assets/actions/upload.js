const detectDrop = function(isOver){
    return {
        type: "DETECT_DROP",
        isOver: isOver
    };
};

const loadingDrop = () => ({
    type: "LOADING_DROP"
});

const finishRead = (output) => ({
    type: "FINISH_READ",
    output: output
});

export default {
    detectDrop,
    loadingDrop,
    finishRead
};
