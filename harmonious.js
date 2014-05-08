var fs = require("fs"),
    yaml = require("js-yaml");
var Rseg = require('./lib/rseg');

module.exports = function (vocabularyPath) {
  if (global.harmonious == undefined) {
    global.harmonious = {};
  };
  return new Harmonious(vocabularyPath);
};

var Harmonious = function (vocabularyPath) {
  init_harmonious_files(vocabularyPath.cnPath, vocabularyPath.enPath);
}

Harmonious.prototype.clean = function (input) {
  var rseg = new Rseg();
  var forbiddenWord = rseg.segment(input);
  for(var w in forbiddenWord){
    input = input.replace(forbiddenWord[w], replace_clean(forbiddenWord[w].length));
  }
  return input;
}

//unit function
function init_harmonious_files (cnPath, enPath) {
  if (global.harmonious.cnYaml == undefined) {
    global.harmonious.cnYaml = load_harmonious_dictionary(cnPath);
  };
  if (global.harmonious.enYaml == undefined) {
    global.harmonious.enYaml = load_harmonious_dictionary(enPath);
    for(var en in global.harmonious.enYaml) {
      global.harmonious.enYaml[en] = global.harmonious.enYaml[en].toLocaleLowerCase();
    }
  }; 
}

function load_harmonious_dictionary (path) {
  return yaml.load(fs.readFileSync(path, "utf8"));
}

function replace_clean (n) {
  var xing = '';
  (n).times(function (i) {
    xing += '*';
  })
  return xing;
}

// number extend
Number.prototype.times = function(func) { 
    for(var i = 0; i < Number(this); i++) {
        func(i); 
    }
}