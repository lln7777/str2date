## 字符转时间

本模块主要面向爬虫和Excel解析等程序中时间字符的识别，可以将大部分常见的时间字符串转化为JS的Date类型。
源码使用的是低级语法，兼容CommonJS、AMD、CMD，可在Node 所有版本、和大部分浏览器中使用。
核心用法（以ES6语法示例）：

#### CommonJS

```javascript
const str2date = require('parsetime-zhcn');
const date = trans('2013年01月13日16:30:18');
console.log(date);
```

#### ES6

```javascript
import str2date from 'parsetime-zhcn';
const date = trans('2013年01月13日16:30:18');
console.log(date);
```

### 示例

```javascript
const str2date = require('parsetime-zhcn');

console.log(str2date('01月13号8:30am').toLocaleString())
console.log(str2date('01月13号8:30pm').toLocaleString())
console.log(str2date('01月13号早上8:30').toLocaleString())
console.log(str2date('01月13号下午16:30').toLocaleString())
console.log(str2date('2013年01月13日16:30:18').toLocaleString())
console.log(str2date('2018-01-13 16:29:06').toLocaleString())
console.log(str2date('2018/01/13 16:29:06').toLocaleString())
console.log(str2date('2018.1.13 16:29:06').toLocaleString())
console.log(str2date('1/13/2018 16:29:06').toLocaleString())
console.log(str2date('10:10:10').toLocaleString())
console.log(str2date('10：10').toLocaleString())
console.log(str2date('10：10 pm').toLocaleString())
console.log(str2date('下午10：10').toLocaleString())
console.log(str2date('上午10：10 pm').toLocaleString())
console.log(str2date('am 10：10').toLocaleString())
console.log(str2date('pm 10：10').toLocaleString())
console.log(str2date('1秒钟前').toLocaleString())
console.log(str2date('1分钟前').toLocaleString())
console.log(str2date('16天前').toLocaleString())
console.log(str2date('1个月前').toLocaleString())
console.log(str2date('1年前').toLocaleString())
console.log(str2date('刚刚').toLocaleString())
```
