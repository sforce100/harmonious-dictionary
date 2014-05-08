module.exports = function(){
  return new EnglishEngine();
};

var EnglishEngine = function() {
  this.running = true;
  this.word = '';
}

EnglishEngine.prototype.process = function (chat, is_last) {
  var match = false,
      tmpWord = null;
  var rePattern = new RegExp(/^[A-Za-z]+$/);
  if (chat.match(rePattern)) {
    this.word += chat;
    match = true;
  }
  if(match == false || is_last){
    tmpWord = this.word;
    this.word = '';
    match = false;
  }
  return [match, tmpWord];
}

EnglishEngine.prototype.stop = function () {
  this.running = false;
}

EnglishEngine.prototype.run = function () {
  this.running = true;
}

EnglishEngine.prototype.is_running = function () {
  return this.running;
}
