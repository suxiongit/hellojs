/**
 * 对象兼容扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference
 * @author suxiong
 * @date 2017/3/1
 */

/**
 * Array 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

if (!Array.prototype.contains) {
    /**
     * 数组中是否存在指定的值
     * @see Array.prototype.includes(searchElement, fromIndex)
     * @param element
     * @return {boolean}
     */
    Array.prototype.contains = function(element) {
        var i = this.length;
        while (i --) {
            if (this[i] === element) {
                return true;
            }
        }
        return false;
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    // console.log(countries.contains('中国')); // true
    // console.log(countries.contains('日本')); // false
}

if (!Array.prototype.forEach) {
    /**
     * 数组循环遍历
     * （让IE兼容forEach方法）
     * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     * @param callback
     */
    Array.prototype.forEach = function(callback/*, thisArg*/) {
        var T, k;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32

        if (typeof callback !== 'function') { // {}.toString.call(callback) != '[object Function]'
            throw new TypeError(callback + ' is not a function');
        }

        if (arguments.length > 1) { // thisArg
            T = arguments[1]; // T = thisArg
        }

        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };

    // 示例
    // var countries = [];
    // countries.push('美国');
    // countries.push('俄罗斯');
    // countries.push('英国');
    // countries.push('法国');
    // countries.push('中国');
    // countries.forEach(function(value) {
    //     console.log(value);
    // });
    // countries.forEach(function(value, index, array) {
    //     console.log(value + ' ' + index + ' ' + array);
    // });
}

if (!Array.prototype.remove) {
    /**
     * 通过索引删除某个数组元素
     * @param index
     */
    Array.prototype.remove = function(index) {
        this.splice(index, 1);
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国', '日本'];
    // countries.remove(countries.length - 1);
    // console.log(countries);
    // countries.remove(-1);
    // console.log(countries);
}

if (!Array.prototype.removeByValue) {
    /**
     * 通过值删除某个数组元素
     * @param value
     */
    Array.prototype.removeByValue = function(value) {
        // for (var i = 0, n = this.length; i < n; i ++) {
        //     if (this[i] == value) {
        //         this.splice(i, 1);
        //         break;
        //     }
        // }

        var index = this.indexOf(value);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国', '日本'];
    // countries.removeByValue('日本');
    // console.log(countries);
}

if (!Array.prototype.indexOf) {
    /**
     * 查找指定的元素在数组中的位置（索引）
     * @param value
     * @return {number}
     */
    // Array.prototype.indexOf = function(value) {
    //     for (var i = 0, n = this.length; i < n; i ++) {
    //         if (this[i] == value) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // };

    /**
     * 查找指定的元素在数组中的位置（索引）
     * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
     * @param searchElement
     * @param fromIndex
     * @return {*}
     */
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    // console.log(countries.indexOf('中国'));
}

if (!Array.prototype.random) {
    /**
     * 数组随机排序
     * @param length 返回数组长度，当不传值、0或者超出数组长度
     * @return {Array}
     */
    Array.prototype.random = function(length) {
        if (null == this) {
            throw new TypeError('this is null or not defined');
        }

        var len = this.length,
            index,
            temp,
            arr = this.slice(0),
            end = len;

        for (var i = 0; i < len; i ++) {
            // 产生从 i 到 len 之间的随机数
            index = Math.floor(Math.random() * (len - i)) + i;
            if (index != i) {
                temp = arr[i];
                arr[i] = arr[index];
                arr[index] = temp;
            }
        }

        if (length > 0 && length < len) {
            end = Number(length);
        }

        return arr.slice(0, end);
    };

    // 示例
    // var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    // for (var i = 0; i < 10; i ++) {
    //     console.log(items.random());
    // }
}

if (!Array.prototype.shuffle) {
    /**
     * 数组随机排序
     * @see Array.prototype.random(length)
     * @param length
     * @return {Array}
     */
    Array.prototype.shuffle = function(length) {
        return this.slice(0).random(length);
    };

    // 示例
    // var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    // for (var i = 0; i < 10; i ++) {
    //     console.log(items.shuffle());
    // }
}

if (!Array.prototype.empty) {
    /**
     * 清空数组
     */
    Array.prototype.empty = function() {
        this.splice(0, this.length);
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国', '日本'];
    // console.log(countries);
    // countries.empty();
    // console.log(countries);
}

if (!Array.prototype.filterEmpty) {
    /**
     * 数组过滤空值
     * @return {Array.<*>}
     */
    Array.prototype.filterEmpty = function() {
        return this.filter(function(value) {
            return value.trim();
        });
    };

    // 示例
    // var countries = ['美国', '', '俄罗斯', ' ', '英国', '  ', '法国', , '中国'];
    // console.log(countries);
    // console.log(countries.filterEmpty());
}

if (!Array.prototype.unique) {
    /**
     * 数组去重
     * @return {Array}
     */
    Array.prototype.unique = function() {
        var hash = {}, arr = [];
        for(var i = 0; i < this.length; i++) { // 遍历当前数组
            if (!hash[this[i]]) { // 如果hash表中没有当前项
                hash[this[i]] = true; // 存入hash表
                arr.push(this[i]); // 把当前数组的当前项push到临时数组里面
            }
        }
        return arr;
    };

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    // countries = countries.concat(countries);
    // console.log(countries);
    // console.log(countries.unique());
}

/**
 * Date 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

if (!Date.prototype.format) {
    /**
     * 日期时间格式化
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 示例：
     * format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
     * format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
     * @param format
     * @return {*}
     */
    Date.prototype.format = function(format) {
        var date = {
            'M+' : this.getMonth() + 1, // 月份
            'd+' : this.getDate(), // 日
            'h+' : this.getHours(), // 小时
            'm+' : this.getMinutes(), // 分
            's+' : this.getSeconds(), // 秒
            'q+' : Math.floor((this.getMonth() + 3) / 3), // 季度
            'S+' : this.getMilliseconds() // 毫秒
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length));
            }
        }
        return format;
    };

    // 示例
    // var newDate = new Date('2014-07-10 10:21:12');
    // console.log(newDate.format('yyyy年MM月dd日 h时m分s秒'));
    // var newDate2 = new Date();
    // console.log(newDate2.format('yyyy年MM月dd日 h时m分s秒'));
}

if (!Date.prototype.isLeapYear) {
    /**
     * 判断闰年
     * 1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年，1900年不是闰年
     * 2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年
     * 注意：Date.prototype.getYear()获取的年份是减去1900，例如2017年值为117，而1900年值0
     * @param date
     * @return {boolean}
     */
    Date.prototype.isLeapYear = function(date) {
        var y;

        if (null != date) {
            var d = new Date(date);
            y = d.getFullYear();
        } else {
            y = this.getFullYear();
        }

        // return (0 === y % 4 && ((y % 100 !== 0) || (y % 400 === 0)));
        return !(y % (y % 100 ? 4 : 400));
    };

    // 示例
    // var newDate = new Date('2016');
    // console.log(newDate + ' 是否闰年 ' + newDate.isLeapYear());
    // var newDate2 = new Date();
    // console.log(newDate2 + ' 是否闰年 ' + Date.prototype.isLeapYear(newDate2));
}

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
            return this.toLowerCase().replace(/\b[a-z]/g, function(s) {
                return s.toUpperCase();
            });

            // return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
            //     return $1.toUpperCase() + $2.toLowerCase();
            // });

            // ES6写法
            // return this.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        } else { // 输出：Hello world
            return this.toLowerCase().replace(/^\S/g, function(s) {
                return s.toUpperCase();
            });

            // return this.toString()[0].toUpperCase() + this.toString().slice(1).toLowerCase();
        }
    };

    // 示例
    // console.log('hello world'.firstUpperCase());
    // console.log('HELLO WORLD'.firstUpperCase());
    // console.log('hello world'.firstUpperCase(1));
    // console.log('HELLO WORLD'.firstUpperCase(1));
}

if (!String.prototype.cnLength) {
    /**
     * 获取字符串的长度（全角算两个字符）
     * @return {Number}
     */
    String.prototype.cnLength = function() {
        return this.replace(/[^\x00-\xff]/g, '^^').length;

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
     * （现有replace方法只会对匹配到的第一个字串替换）
     * g （global）执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
     * m （multiLine）执行多行匹配。
     * @param searchment 搜索串
     * @param replacement 替换串
     * @return {string}
     */
    String.prototype.replaceAll = function(searchment, replacement) {
        return this.replace(new RegExp(searchment, 'gm'), replacement);
    };

    // 示例
    // var str = 'hello hello hello hello hello';
    // console.log('替换前=' + str);
    // console.log('替换后=' + str.replaceAll('hello', 'world'));
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
    // console.log('去除前=' + str);
    // console.log('去除后=' + str.trimCRLF());
}

if (!String.prototype.toInt) {
    /**
     * 字符串转整型
     * @return {number}
     */
    String.prototype.toInt = function() {
        return isNaN(parseInt(this)) ? 0 : parseInt(this);
    };

    // 示例
    // var num1 = '1', num2 = '2';
    // console.log(num1 + num2); // 12
    // console.log(parseInt(num1) + parseInt(num2)); // 3
    // console.log(num1.toInt() + num2.toInt()); // 3
    // var num3 = 'a', num4 = 'b';
    // console.log(num3 + num4); // ab
    // console.log(parseInt(num3) + parseInt(num4)); // NaN
    // console.log(num4.toInt() + num4.toInt()); // 0
}

if (!String.prototype.toDouble) {
    /**
     * 字符串转浮点型
     * @return {number}
     */
    String.prototype.toDouble = function() {
        return isNaN(parseFloat(this)) ? 0.0 : parseFloat(this);
    };

    // 示例
    // var num1 = '0.1', num2 = '0.2';
    // console.log(num1 + num2); // 0.10.2
    // console.log(parseFloat(num1) + parseFloat(num2)); // 0.30000000000000004
    // console.log(num1.toDouble() + num2.toDouble()); // 0.30000000000000004
    // var num3 = 'a', num4 = 'b';
    // console.log(num3 + num4); // ab
    // console.log(parseFloat(num3) + parseFloat(num4)); // NaN
    // console.log(num4.toDouble() + num4.toDouble()); // 0
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
    var str = 'abcdefg';
    console.log(str + ' 反转为 ' + str.reverse());
}

