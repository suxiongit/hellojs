/**
 * String 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
 */

if (!String.prototype.firstUpperCase) {
    /**
     * 字符串首字母转大写
     * （CSS实现text-transform: capitalize;）
     * @param perword
     * @return {string}
     */
    String.prototype.firstUpperCase = function(perword) {
        if (perword) { // 输出：Hello World
            // 实现一
            return this.toLowerCase().replace(/\b[a-z]/g, function(s) {
                return s.toUpperCase();
            });

            // 实现二
            // return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
            //     return $1.toUpperCase() + $2.toLowerCase();
            // });

            // 实现三：ES6写法
            // return this.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        } else { // 输出：Hello world
            return this.toLowerCase().replace(/^\S/g, function(s) {
                return s.toUpperCase();
            });

            // return this.toString()[0].toUpperCase() + this.toString().slice(1).toLowerCase();
        }
    };

    // 示例
    // console.log('hello world'.firstUpperCase()); // Hello world
    // console.log('HELLO WORLD'.firstUpperCase()); // Hello world
    // console.log('hello world'.firstUpperCase(1)); // Hello World
    // console.log('HELLO WORLD'.firstUpperCase(1)); // Hello World
}

if (!String.prototype.cnLength) {
    /**
     * 获取字符串的长度（全角算两个字符）
     * @return {Number}
     */
    String.prototype.cnLength = function() {
        // 实现一
        return this.replace(/[^\x00-\xff]/g, '**').length;

        // 实现二
        // var L = this.length;
        // var T = this.match(/[^\x00-\x80]/ig);
        // if (T) {
        //     L += T.length;
        // }
        // return L;
    };

    // 示例
    // var str = 'hello';
    // console.log(str.length); // 5
    // console.log(str.cnLength()); // 5
    // var str = 'hello你好';
    // console.log(str.length); // 7
    // console.log(str.cnLength()); // 9
}

if (!String.prototype.replaceAll) {
    /**
     * 全部替换
     * @param findStr
     * @param replaceStr
     * @param ignoreCase
     * @return {string}
     */
    String.prototype.replaceAll = function(findStr, replaceStr, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(findStr)) {
            return this.replace(new RegExp(findStr, (ignoreCase ? 'gi' : 'g')), replaceStr);
        } else {
            return this.replace(findStr, replaceStr);
        }
    };

    // 示例
    // var str = 'Hello China, Hello World';
    // console.log(str.replace('Hello', 'Welcome to')); // Welcome to China, Hello World
    // console.log(str.replaceAll('hello', 'Welcome to', true)); // Welcome to China, Welcome to World
    // console.log(str.replace(/hello/gi, 'Welcome to')); // Welcome to China, Welcome to World
}

if (!String.prototype.trimCRLF) {
    /**
     * 去除回车换行符号
     * @return {string}
     */
    String.prototype.trimCRLF = function() {
        return this.replaceAll('(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))', '');
    };

    // 示例
    // var str = '\r\nhe\n';
    // console.log('去除前=' + str); // \r\nhe\n
    // console.log('去除后=' + str.trimCRLF()); // he
}

if (!String.prototype.reverse) {
    /**
     * 反转字符串
     * @return {string}
     */
    String.prototype.reverse = function() {
        var chars = [];
        for (var i = this.length - 1; i > -1; i--) {
            chars.push(this[i]);
        }
        return chars.join('');
    };

    // 示例
    // var str = 'abcdefg';
    // console.log(str + ' 反转为 ' + str.reverse()); // gfedcba
}

if (!String.prototype.contains) {
    /**
     * 字符串是否包含指定内容
     * @param chr
     * @return {boolean}
     */
    String.prototype.contains = function(chr) {
        return this.indexOf(chr) > -1;
    };

    // 示例
    // var str = 'Welcome to Beijing!';
    // console.log(str.contains('Beijing')); // true
}

if (!String.format) {
    /**
     * 格式化字符串
     * @param format
     * @return {string}
     */
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(match, i) {
            return (typeof args[i] == 'undefined') ? match : args[i];
        });
    };

    // 示例
    // var str = 'I love {0}, but I don\'t love {1}';
    // console.log(String.format(str, 'China', 'Japan')); // I love China, but I don't love Japan
}

if (!String.prototype.format) {
    /**
     * 格式化字符串
     * @return {string}
     */
    String.prototype.format = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return this.replace(/\{(\d+)\}/g, function(match, i) {
            return (typeof args[i] == 'undefined') ? match : args[i];
        });
    };

    // 示例
    // var str = 'I love {0}, but I don\'t love {1}';
    // console.log(str.format('China', 'Japan')); // I love China, but I don't love Japan
}

if (!String.prototype.number) {
    /**
     * 获取数字部分
     * @param float 浮点数
     * @return {string}
     */
    String.prototype.number = function() {
        var regEx = arguments[0] ? /[^\d.]/g: /[^\d]/g;
        return this.replace(regEx, '');
    };

    // 示例
    // var str = 'Version 1.0, released in 1996';
    // console.log(str.number()); // 101996
    // console.log(str.number(1)); // 1.01996
    // console.log(str.match(/\d/g)); // [ '1', '0', '1', '9', '9', '6' ]
    // console.log(str.match(/\d+/g)); // [ '1', '0', '1996' ]
    // console.log(str.match(/\d+.\d+/g)); // [ '1.0', '1996' ]
}

if (!String.prototype.chinese) {
    /**
     * 获取中文部分
     * @return {string}
     */
    String.prototype.chinese = function() {
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
        return this.replace(regEx, '');
    };

    // 示例
    // var str = '你好，中国';
    // console.log(str.chinese()); // 你好中国
    // console.log(str.match(/[\u4e00-\u9fa5\uf900-\ufa2d]/g)); // [ '你', '好', '中', '国' ]
    // console.log(str.match(/[\u4e00-\u9fa5\uf900-\ufa2d]+/g)); // [ '你好', '中国' ]
}

if (!String.prototype.english) {
    /**
     * 获取英文部分
     * @return {string}
     */
    String.prototype.english = function() {
        var regEx = /[^A-Za-z]/g;
        return this.replace(regEx, '');
    };

    // 示例
    // var str = 'This is English';
    // console.log(str.english()); // ThisisEnglish
    // console.log(str.match(/[A-Za-z]/g)); // [ 'T', 'h', 'i', 's', 'i', 's', 'E', 'n', 'g', 'l', 'i', 's', 'h' ]
    // console.log(str.match(/[A-Za-z]+/g)); // [ 'This', 'is', 'English' ]
}

if (!String.prototype.filename) {
    /**
     * 获取文件全名
     * @return {string}
     */
    String.prototype.filename = function() {
        var regEx = /^.*\/([^\/\?]*).*$/;
        return this.replace(regEx, '$1');
    };

    // 示例
    // var str = 'D:/bearsu/workspace/hellojs/extensions/polyfill.js';
    // console.log(str.filename()); // polyfill.js
}

if (!String.prototype.extname) {
    /**
     * 获取文件扩展名
     * @return {string}
     */
    String.prototype.extname = function() {
        var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;
        return this.replace(regEx, '$1');
    };

    // 示例
    // var str = 'D:/bearsu/workspace/hellojs/extensions/polyfill.js';
    // console.log(str.extname()); // .js
}

if (!String.prototype.toInt) {
    /**
     * 字符串转整型
     * @return {string}
     */
    String.prototype.toInt = function() {
        return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
    };

    // 示例
    // console.log(typeof '123'.toInt()); // number: 123
    // console.log(typeof 'abc'.toInt()); // string: abc
}

if (!String.prototype.resetBlank) {
    /**
     * 合并多个空白为一个空白
     * @return {string}
     */
    String.prototype.resetBlank = function() {
        var regEx = /\s+/g;
        return this.replace(regEx, ' ');
    };

    // 示例
    // console.log('hello      world'.resetBlank()); // hello world
}
