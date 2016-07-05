const detectDrop = function(isOver){
    return {
        type: "DETECT_DROP",
        isOver: isOver
    };
};

const completeDrop = () => ({
    type: "COMPLETE_DROP"
});

const loadingDrop = () => ({
    type: "LOADING_DROP"
});

export default {
    detectDrop,
    completeDrop,
    loadingDrop
};
