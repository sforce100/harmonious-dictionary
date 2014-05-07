var Harmonious = require('../harmonious');

var harmonious = new Harmonious({cnPath: "./chinese_dictionary.yml", enPath: "./harmonious_english.yml"});

console.info(harmonious.clean('我是毛泽东是豆比'));
console.info(harmonious.clean('xxoo毛泽东是豆比'));
console.info(harmonious.clean('豆比 fuck 毛爷爷'));
console.info(harmonious.clean('豆比fuck毛爷爷'));
console.info(harmonious.clean('豆比的法轮功haha'));
console.info(harmonious.clean('豆比的18禁'));
console.info(harmonious.clean('脱光1234567'));
console.info(harmonious.clean('xxoo == fuck'));
console.info(harmonious.clean('xxoo==fuck'));
