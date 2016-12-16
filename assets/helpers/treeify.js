
// ref from:
// https://github.com/notatestuser/treeify

var treeify = {};

function makePrefix(key, last) {
  var str = (last ? "└" : "├");
  if (key) {
    str += "─ ";
  } else {
    str += "──┐";
  }
  return str;
}

function growBranch(key, root, last, lastStates, callback) {
    var line = "", index = 0, lastKey, circular, lastStatesCopy = lastStates.slice(0);

    if (lastStatesCopy.push([ root, last ]) && lastStates.length > 0) {
      // based on the "was last element" states of whatever we"re nested within,
      // we need to append either blankness or a branch to our line
      lastStates.forEach(function(lastState, idx) {
        if (idx > 0) {
            line += (lastState[1] ? treeify.firstLetter : "│") + treeify.indentString;
        }
        if ( ! circular && lastState[0] === root) {
          circular = true;
        }
      });

      // the prefix varies based on whether the key contains something to show and
      // whether we"re dealing with the last element in this collection
      line += makePrefix(key, last) + key;

      // append the circular reference indicator
      circular && (line += " (circular ref.)");

      callback(line);
    }

    // can we descend into the next item?
    if (!circular && typeof root === "object") {
      var keys = Object.keys(root);
      keys.forEach(function(branch){
        // the last key is always printed with a different prefix, so we"ll need to know if we have it
        lastKey = ++index === keys.length;

        // hold your breath for recursive action
        growBranch(branch, root[branch], lastKey, lastStatesCopy, callback);
      });
    }
}

treeify.exec = function(obj, indentType) {
    var tree = "",
        keys = Object.keys(obj),
        properObj;

    if(keys.length <= 1){
        tree += keys[0];
        properObj = obj[keys[0]];
    }else{
        tree += ".";
        properObj = obj;
    }

    if(indentType === "tab"){
        treeify.indentString = "\t" ;
        treeify.firstLetter = " ";
    }else{
        treeify.indentString = "    " ;
        treeify.firstLetter = "   ";
    }

    tree += "\n";
    growBranch(".", properObj, false, [], function(line) {
      tree += line + "\n";
    });
    return tree;
};

export default treeify;
