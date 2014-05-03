var Harmonious = require('../harmonious');

var harmonious = new Harmonious({cnPath: "/Users/huangzihao/mytest/nodejs/chinese_dictionary.txt", enPath: "/Users/huangzihao/mytest/nodejs/harmonious_english.yml"});

console.info(harmonious.clean('我是毛泽东是豆比'));
console.info(harmonious.clean('xxoo毛泽东是豆比'));
console.info(harmonious.clean('豆比 fuck 毛爷爷'));
