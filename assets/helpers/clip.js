const clip = {};

clip.getSelectionText = function() {
    let selectedText = "";
    if (window.getSelection) { // all modern browsers and IE9+
        selectedText = window.getSelection().toString();
    }
    return selectedText;
};

clip.selectElementText = function(el) {
    let range, selection;
    range = document.createRange();
    range.selectNodeContents(el);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

clip.copySelectionText = function() {
    let copySuccess;

    try{
        copySuccess = document.execCommand("copy");
    }catch(e){
        copySuccess = false;
    }

    return copySuccess;
};

clip.clearSelection = function(){
    let selection = window.getSelection();
    selection.removeAllRanges();
};

export default clip;
