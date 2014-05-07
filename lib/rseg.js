var fullWidth = new require('./filters/fullwidth')();

var DictEngine = require('./engines/dict'),
    EnglishEngine = require('./engines/english');

module.exports = function () {
  var rseg = new Rseg();
  return rseg;
};

var Rseg = function () {
  this.word = [];
  this.init_engines();
  this.englishDictionary = global.harmonious.enYaml;
}

Rseg.prototype.segment = function (input) {
  var This = this;
      maxLength = input.length;
  input.split('').forEach(function (element, index, array) {
    var c = fullWidth.filter(element);
    This.process(c, (index == (maxLength-1)));
  });
  return this.word;
}

Rseg.prototype.process = function (c, is_last) {
  this.englishProcess(c);
  this.dictProcess(c, is_last);
}

Rseg.prototype.englishProcess = function (c) {
  var nomatch = true,
      tmpWord = '';
  
  if(this.englishEngine.is_running()){
    var EMatchAndWord = this.englishEngine.process(c);
    tmpWord = EMatchAndWord[1];
    if (EMatchAndWord[0]) {
      nomatch = false;
    }else{
      if (this.englishDictionary.indexOf(tmpWord) == -1) {
        tmpWord = '';
      };
      this.englishEngine.stop();
    }
  }

  if (nomatch) {
    // console.info('nomatch');
    this.reset_engines();
    if (tmpWord != '') {
      if (typeof(tmpWord) == "string" && tmpWord.length >= 2) {
        this.word.push(tmpWord);
      }
      this.englishProcess(c);
    }
  };
}

Rseg.prototype.dictProcess = function(c, is_last) {
  var nomatch = true,
      tmpWord = '';
  
  if(this.dictEngine.is_running()){
    var dictMatchAndWord = this.dictEngine.process(c, is_last);
    tmpWord = dictMatchAndWord[1];
    if (dictMatchAndWord[0]) {
      nomatch = false;
    }else{
      this.dictEngine.stop();
    }
  }

  if (nomatch) {
    this.reset_engines();
    if (tmpWord != '') {
      if (typeof(tmpWord) == "string" && tmpWord.length >= 2) {
        this.word.push(tmpWord);
      }
      this.dictProcess(c);
    }
  };

}

Rseg.prototype.init_engines = function() {
  this.dictEngine = new DictEngine();
  this.englishEngine = new EnglishEngine();
  this.reset_engines();
}


Rseg.prototype.load_english_dictionary = function (path) {
  return yaml.load(fs.readFileSync(path, "utf8"));
}

Rseg.prototype.reset_engines = function () {
  this.dictEngine.run();
  this.englishEngine.run();
}