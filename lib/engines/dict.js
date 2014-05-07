var HashMap = require('hashmap').HashMap;

module.exports = function(){
  return new DictEngines();
};

var DictEngines = function () {
  this.root = new HashMap();
  this.running = true;
  this.word = '';
  this.tree = global.harmonious.cnYaml;
  for(var rt in this.tree) {
    var tmpHash = new HashMap();
    var subRoot = this.tree[rt].split('');
    for(var r in subRoot){
      var subChar = subRoot[r];
      if(r == 0){
        if(this.root.get(subChar) == undefined){
          this.root.set(subChar, new HashMap());
        }
        tmpHash = this.root.get(subChar);
      }else{
        if (tmpHash.get(subChar) == undefined) {
          tmpHash.set(subChar, new HashMap());
        }
        tmpHash = tmpHash.get(subChar);
      }
    }
    tmpHash.set('end', true);
  }
  this.node = this.root;
}

DictEngines.prototype.process = function (chat, is_last) {
  var match = false,
      tmpWord = null;
    // console.info("dict:"+this.word);
  if(this.node.get(chat) != undefined){
    this.word += chat;
    this.node = this.node.get(chat);
    match = true;
  }
  if (is_last || match == false){
    if (this.node.get('end') == true || this.word.length == 1) {
      tmpWord = this.word;
    }else{
      tmpWord = this.word.split('');
    }
    this.node = this.root;
    this.word = '';
    match = false;
  }
  return [match, tmpWord];
}

DictEngines.prototype.stop = function () {
  this.running = false;
}

DictEngines.prototype.run = function () {
  this.running = true;
}

DictEngines.prototype.is_running = function () {
  return this.running;
}