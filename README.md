harmonious-dictionary
=====================

这是一个nodejs的中英文过滤词库

=====================

### 使用方法

```
var Harmonious = require('../harmonious');

var harmonious = new Harmonious({cnPath: "./chinese_dictionary.yml", enPath: "./harmonious_english.yml"});

harmonious.clean('xxoo == fuck'); //输出 xxoo == ****
```

test里面有词库，不介意可以拿去用。