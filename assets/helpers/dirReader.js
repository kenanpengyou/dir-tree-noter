
// ref from:
// https://github.com/silverwind/uppie/blob/master/uppie.js

var dirReader = {};

 // API implemented in Firefox 42+ and Edge
var newDirectoryApi = function(input, cb){
    var fd = new FormData(), files = [];
    var iterate = function(entries, path, resolve) {
      var promises = [];
      entries.forEach(function(entry) {
        promises.push(new Promise(function(resolve) {
          if ("getFilesAndDirectories" in entry) {
            entry.getFilesAndDirectories().then(function(entries) {
              iterate(entries, entry.path + "/", resolve);
            });
          } else {
            if (entry.name) {
              var p = (path + entry.name).replace(/^[\/\\]/, "");
              fd.append("file", entry, p);
              files.push(p);
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
      }).then(cb.bind(null, fd, files));
    });
};

// old drag and drop API implemented in Chrome 11+
var entriesApi = function(items, cb) {
    var fd = new FormData(), files = [], rootPromises = [];

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
      readEntries(entry, 0, 0, function(entries) {
        var promises = [];
        entries.forEach(function(entry) {
          promises.push(new Promise(function(resolve) {
            if (entry.isFile) {
              entry.file(function(file) {
                var p = path + "/" + file.name;
                fd.append("file", file, p);
                files.push(p);
                resolve();
              }, resolve.bind());
            } else readDirectory(entry, path + "/" + entry.name, resolve);
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
              fd.append("file", file, file.name);
              files.push(file.name);
              resolve();
            }, resolve.bind());
          } else if (entry.isDirectory) {
            readDirectory(entry, null, resolve);
          }
        }));
      }
    });
    Promise.all(rootPromises).then(cb.bind(null, fd, files));
};

// old prefixed API implemented in Chrome 11+ as well as array fallback
var arrayApi = function(input, cb) {
    var fd = new FormData(), files = [];
    [].slice.call(input.files).forEach(function(file) {
      fd.append("file", file, file.webkitRelativePath || file.name);
      files.push(file.webkitRelativePath || file.name);
    });
    cb(fd, files);
};

dirReader.exec = function(event, input, cb) {
    console.log("[exec] ", input.items);
    console.log("[exec] ", input.items.length);
    if ("getFilesAndDirectories" in input) {
        newDirectoryApi(input, cb.bind(null, event));
    } else if (input.items && input.items.length && "webkitGetAsEntry" in input.items[0]) {
        entriesApi(input.items, cb.bind(null, event));
    } else if (input.files) {
        arrayApi(input, cb.bind(null, event));
    } else {
        cb();
    }
};

export default dirReader;
