
// ref from:
// https://github.com/silverwind/uppie/blob/master/uppie.js

var dirReader = {};

// assign a file or a directory to the tree object
var assignToObject = function(trees, path, fileName){
    var partArray = path.split("/"),
    obj = trees;

    partArray.forEach(function(part){
        obj[part] = obj[part] || {};
        obj = obj[part];
    });

    if(fileName){
        obj[fileName] = "file";
    }else{
        obj = "directory";
    }
};

// calculate the depth of a path
// example: "client/page2/extra" → 3
var calcDepth = function(path){
    var reg = /\//g;
    return (path.match(reg) || []).length + 1;
};

 // API implemented in Firefox 42+ and Edge
 var newDirectoryApi = function(input, cb, maxDepth) {
     var files = [],
         trees = {};
     var iterate = function(entries, path, resolve) {
         var promises = [];

         if(calcDepth(path) > maxDepth){
             assignToObject(trees, path);
             return resolve();
         }

         entries.forEach(function(entry) {
             promises.push(new Promise(function(resolve) {
                 if ("getFilesAndDirectories" in entry) {
                     entry.getFilesAndDirectories().then(function(entries) {
                         iterate(entries, entry.path + "/", resolve);
                     });
                 } else {
                     if (entry.name) {
                         var p = (path + entry.name).replace(/^[\/\\]/, "");
                         files.push(p);
                         assignToObject(trees, path, entry.name);
                     }
                     resolve();
                 }
             }));
         });
         Promise.all(promises).then(resolve);
     };
     input.getFilesAndDirectories().then(function(entries) {
         new Promise(function(resolve) {
             iterate(entries, "/", resolve);
         }).then(cb.bind(null, files, trees));
     });
 };

 // old drag and drop API implemented in Chrome 11+
 var entriesApi = function(items, cb, maxDepth) {
     var files = [],
         trees = {},
         rootPromises = [];

     // when entry is a directory, inspect its children (also entries) inside
     function readEntries(entry, reader, oldEntries, cb) {
         var dirReader = reader || entry.createReader();
         dirReader.readEntries(function(entries) {
             var newEntries = oldEntries ? oldEntries.concat(entries) : entries;
             if (entries.length) {
                 setTimeout(readEntries.bind(null, entry, dirReader, newEntries, cb), 0);
             } else {
                 cb(newEntries);
             }
         });
     }

     function readDirectory(entry, path, resolve) {
         if (!path) path = entry.name;

         // if exceed the max depth, just record the directory path, do not go further
         if(calcDepth(path) > maxDepth){
             assignToObject(trees, path);
             return resolve();
         }

         readEntries(entry, 0, 0, function(entries) {
             var promises = [];
             entries.forEach(function(entry) {
                 promises.push(new Promise(function(resolve) {
                     if (entry.isFile) {
                         entry.file(function(file) {
                             var p = path + "/" + file.name;
                             files.push(p);
                             assignToObject(trees, path, entry.name);
                             resolve();
                         }, resolve.bind());
                     } else if (entry.isDirectory) {
                         readDirectory(entry, path + "/" + entry.name, resolve);
                     }
                 }));
             });
             Promise.all(promises).then(resolve.bind());
         });
     }

     [].slice.call(items).forEach(function(entry) {
         entry = entry.webkitGetAsEntry();
         if (entry) {
             rootPromises.push(new Promise(function(resolve) {
                 if (entry.isFile) {
                     entry.file(function(file) {
                         files.push(file.name);
                         trees[file.name] = trees[file.name] || "file";
                         resolve();
                     }, resolve.bind());
                 } else if (entry.isDirectory) {
                     readDirectory(entry, null, resolve);
                 }
             }));
         }
     });
     Promise.all(rootPromises).then(cb.bind(null, files, trees));
 };

// old prefixed API implemented in Chrome 11+ as well as array fallback
var arrayApi = function(input, cb) {
    var files = [],
        trees = {};
    [].slice.call(input.files).forEach(function(file) {
        var filePath = file.webkitRelativePath || file.name;
        files.push(filePath);
        trees[file.name] = trees[file.name] || "file";
    });
    cb(files, trees);
};

dirReader.exec = function(input, options) {
    const {maxDepth, onComplete} = options;

    if ("getFilesAndDirectories" in input) {
        newDirectoryApi(input, onComplete, maxDepth);
    } else if (input.items && input.items.length && "webkitGetAsEntry" in input.items[0]) {
        entriesApi(input.items, onComplete, maxDepth);
    } else if (input.files) {
        arrayApi(input, onComplete);
    } else {
        onComplete();
    }
};

export default dirReader;
