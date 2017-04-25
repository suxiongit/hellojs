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
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr.contains('e')); // true
    // console.log(arr.contains('f')); // false
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
    // var arr = [];
    // arr.push('a');
    // arr.push('b');
    // arr.push('c');
    // arr.push('d');
    // arr.push('e');
    // arr.forEach(function(value) {
    //     console.log(value);
    // });
    // arr.forEach(function(value, index, array) {
    //     console.log(value + ' ' + index + ' ' + array);
    // });
}

if (!Array.prototype.remove) {
    /**
     * 删除数组元素
     * @param element string|array 删除元素
     * @param isIndex boolean|integer 是否索引
     */
    Array.prototype.remove = function(element, isIndex) {
        if (isIndex) {
            this.splice(element, 1);
        } else {
            if (Array.isArray(element)) {
                for (var i = this.length - 1; i > -1; i --) {
                    if (element.contains(this[i])) {
                        this.splice(i, 1);
                        continue;
                    }
                }
            } else {
                // 实现一
                // for (var i = 0, n = this.length; i < n; i ++) {
                //     if (this[i] == value) {
                //         this.splice(i, 1);
                //         break;
                //     }
                // }

                // 实现二
                var index = this.indexOf(element);
                if (index > -1) {
                    this.splice(index, 1);
                }
            }
        }
    };

    // 示例
    // var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    // arr.remove('f'); // 删除值
    // console.log(arr);
    //
    // arr.remove(['d', 'e']); // 删除数组
    // console.log(arr);
    //
    // arr.remove(arr.length - 1, true); // 通过索引删除
    // console.log(arr);
    //
    // arr.remove(-1, true); // 通过索引删除
    // console.log(arr);
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
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr.indexOf('e'));
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
    // var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    // console.log(arr);
    // arr.empty();
    // console.log(arr);
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
    // var arr = ['a', '', 'b', ' ', 'c', '  ', 'd', , 'e'];
    // console.log(arr);
    // console.log(arr.filterEmpty());
}

if (!Array.prototype.unique) {
    /**
     * 数组去重
     * @return {Array}
     */
    Array.prototype.unique = function() {
        var arr = [], hash = {};
        for(var i = 0; i < this.length; i++) { // 遍历当前数组
            if (!hash[this[i]]) { // 如果hash表中没有当前项
                hash[this[i]] = true; // 存入hash表
                arr.push(this[i]); // 把当前数组的当前项push到临时数组里面
            }
        }
        return arr;
    };

    // 示例
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // arr = arr.concat(arr);
    // console.log(arr);
    // console.log(arr.unique());
}

if (!Array.diff) {
    /**
     * 数组不同元素
     * @return {Array}
     */
    Array.diff = function(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError('Parameter is not an array');
        }

        // 实现一
        // var arr = [];
        // for (var i = 0, n = arr1.length; i < n; i ++) {
        //     if (!arr2.contains(arr1[i])) {
        //         arr.push(arr1[i]);
        //     }
        // }
        // for (var i = 0, n = arr2.length; i < n; i ++) {
        //     if (!arr1.contains(arr2[i])) {
        //         arr.push(arr2[i]);
        //     }
        // }

        // 实现二
        var _arr1 = arr1.filter(function(value) {
            return !arr2.contains(value);
        });
        var _arr2 = arr2.filter(function(value) {
            return !arr1.contains(value);
        });
        var arr = _arr1.concat(_arr2);

        return arr;
    };

    // 示例
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'f'];
    // console.log(Array.diff(arr1, arr2));
    //
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'f', 'f'];
    // console.log(Array.diff(arr1, arr2));
    //
    // var arr1 = 'a';
    // var arr2 = ['a', 'b', 'c', 'd', 'e', 'f'];
    // console.log(Array.diff(arr1, arr2)); // TypeError: Parameter is not an array
}

if (!Array.same) {
    /**
     * 数组相同元素
     * @return {Array}
     */
    Array.same = function(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError('Parameter is not an array');
        }

        // 实现一
        // var arr = [];
        // for (var i = 0, n = arr1.length; i < n; i ++) {
        //     if (arr2.contains(arr1[i])) {
        //         arr.push(arr1[i]);
        //     }
        // }

        // 实现二
        var arr = arr1.filter(function(value) {
            return arr2.contains(value);
        });

        return arr;
    };

    // 示例
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'f'];
    // console.log(Array.same(arr1, arr2));
    //
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'd', 'f'];
    // console.log(Array.same(arr1, arr2));
    //
    // var arr1 = 'a';
    // var arr2 = ['a', 'b', 'c', 'd', 'e', 'f'];
    // console.log(Array.same(arr1, arr2)); // TypeError: Parameter is not an array
}

if (!Array.prototype.max) {
    /**
     * 数组最大值
     * @return {number}
     */
    Array.prototype.max = function() {
        var value = this[0];
        for (var i = 1, n = this.length; i < n; i++) {
            if (this[i] > value) {
                value = this[i];
            }
        }
        return value;
    };

    // 示例
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr + ' 最大值 ' + arr.max()); // 5
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr + ' 最大值 ' + arr.max()); // e
}

if (!Array.prototype.min) {
    /**
     * 数组最小值
     * @return {number}
     */
    Array.prototype.min = function() {
        var value = this[0];
        for (var i = 1, n = this.length; i < n; i++) {
            if (this[i] < value) {
                value = this[i];
            }
        }
        return value;
    };

    // 示例
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr + ' 最小值 ' + arr.min()); // 1
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr + ' 最小值 ' + arr.min()); // a
}

if (!Array.isEmpty) {
    /**
     * 数组是否为空
     * @param arr
     * @return {boolean}
     */
    Array.isEmpty = function(arr) {
        if (!Array.isArray(arr) || arr.length <= 0) {
            return true;
        }
        return false;
    };

    // 示例
    // var arr = [];
    // console.log(Array.isEmpty(arr));
    // var arr = 1;
    // console.log(Array.isEmpty(arr));
}

if (!Array.isNotEmpty) {
    /**
     * 数组是否非空
     * @param arr
     * @return {boolean}
     */
    Array.isNotEmpty = function(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            return true;
        }
        return false;
    };

    // 示例
    // var arr = [1];
    // console.log(Array.isNotEmpty(arr));
    // var arr = 1;
    // console.log(Array.isNotEmpty(arr));
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
        // 实现一
        return this.replace(/[^\x00-\xff]/g, '^^').length;

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
     * @param reallyDo
     * @param replaceWith
     * @param ignoreCase
     * @return {string}
     */
    String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return this.replace(new RegExp(reallyDo, (ignoreCase ? 'gi' : 'g')), replaceWith);
        } else {
            return this.replace(reallyDo, replaceWith);
        }
    };

    // 示例
    // var str = 'Hello China, Hello World';
    // console.log(str.replaceAll('hello', 'Welcome to', true));
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
    // console.log(str + ' 反转为 ' + str.reverse());
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
    // console.log(str + ' 是否包含Beijing ' + str.contains('Beijing'));
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
    // console.log(String.format(str, 'China', 'Japan'));
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
    // console.log(str.format('China', 'Japan'));
}

if (!String.prototype.number) {
    /**
     * 获取数字
     * @param float 浮点数
     * @return {string}
     */
    String.prototype.number = function() {
        var regEx = arguments[0] ? /[^\d.]/g: /[^\d]/g;
        return this.replace(regEx, '');
    };

    // 示例
    // console.log('I was born in March 1996'.number());
    // console.log('￥100,000.00'.number(1));
}

if (!String.prototype.ZH) {
    /**
     * 获取中文
     * @return {string}
     */
    String.prototype.ZH = function() {
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
        return this.replace(regEx, '');
    };

    // 示例
    // var str = '版本1.0发布于1996年3月';
    // console.log(str.ZH());
}

/**
 * Number 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

if (!Number.toInt) {
    /**
     * 字符串转整型
     * @return {number}
     */
    Number.toInt = function(num) {
        return isNaN(parseInt(num)) ? 0 : parseInt(num);
    };

    // 示例
    // console.log(Number.toInt('1')); // 1
    // console.log(Number.toInt('2')); // 2
    // console.log(Number.toInt('1') + Number.toInt('2')); // 3
    // console.log(Number.toInt('a')); // 0
    // console.log(parseInt('a')); // NaN
    // console.log(Number.parseInt('a')); // NaN
}

if (!Number.toDouble) {
    /**
     * 字符串转浮点型
     * @return {number}
     */
    Number.toDouble = function(num) {
        return isNaN(parseFloat(num)) ? 0.0 : parseFloat(num);
    };

    // 示例
    // console.log(Number.toDouble('.1')); // 0.1
    // console.log(Number.toDouble('.2')); // 0.2
    // console.log(Number.toDouble('.1') + Number.toDouble('.2')); // 0.30000000000000004
    // console.log(Number.toDouble('a')); // 0
}

/**
 * RegExp 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * g： global，全文搜索，默认搜索到第一个结果接停止
 i： ignore case，忽略大小写，默认大小写敏感
 m： multiple lines，多行搜索
 */

if (!RegExp.isEmpty) {
    /**
     * 是否为空
     * @param value
     * @return {boolean}
     */
    RegExp.isEmpty = function(value) {
        return /^\s*$/.test(value);
    };

    // 示例
    // var value = ''; // true
    // console.log(value, RegExp.isEmpty(value));
    // var value = ' '; // true
    // console.log(value, RegExp.isEmpty(value));
}

if (!RegExp.isDate) {
    /**
     * 是否日期
     * @param value
     * @return {boolean}
     */
    RegExp.isDate = function(value) {
        return /^\d{4}\-\d{1,2}-\d{1,2}$/i.test(value);
    };

    // 示例
    // var value = '2016-05-19';
    // console.log(value, RegExp.isDate(value));
    // var value = '2016-05-19 00';
    // console.log(value, RegExp.isDate(value));
}

if (!RegExp.isDomain) {
    /**
     * 是否域名
     * @param value
     * @return {boolean}
     */
    RegExp.isDomain = function(value) {
        return /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/i.test(value);
    };

    // 示例
    // var value = 'www.test-domain.com';
    // console.log(value, RegExp.isDomain(value));
    // var value = 'test-domain';
    // console.log(value, RegExp.isDomain(value));
}

if (!RegExp.isEmail) {
    /**
     * 是否邮箱
     * @param value
     * @return {boolean}
     */
    RegExp.isEmail = function(value) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value);
    };

    // 示例
    // var value = 'test-email@domain.com';
    // console.log(value, RegExp.isEmail(value));
    // var value = 'test-email@domain';
    // console.log(value, RegExp.isEmail(value));
}

if (!RegExp.isHtml) {
    /**
     * 是否HTML标记
     * @param value
     * @return {boolean}
     */
    RegExp.isHtml = function(value) {
        return /^<(\S*?)[^>]*>.*?<\/\1>|<.*?\s?\/>$/i.test(value);
    };

    // 示例
    // var value = '<span></span>'; // true
    // console.log(value, RegExp.isHtml(value));
    // var value = '<div><span></span></div>';
    // console.log(value, RegExp.isHtml(value));
    // var value = 'span'; // false
    // console.log(value, RegExp.isHtml(value));
    // var value = '<br />'; // true
    // console.log(value, RegExp.isHtml(value));
    // var value = '<br/>'; // true
    // console.log(value, RegExp.isHtml(value));
}

if (!RegExp.isIdCard) {
    /**
     * 是否身份证（15位或18位）
     * @param value
     * @return {boolean}
     */
    RegExp.isIdCard = function(value) {
        return /^\d{14}(\d{4}|(\d{3}[xX])|\d{1})$/i.test(value);
    };

    // 示例
    // var value = '000000000000000000';
    // console.log(value, RegExp.isIdCard(value));
    // var value = '0000000000000000000';
    // console.log(value, RegExp.isIdCard(value));
}

if (!RegExp.isIP) {
    /**
     * 是否IP地址
     * @param value
     * @return {boolean}
     */
    RegExp.isIP = function(value) {
        return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
    };

    // 示例
    // var value = '127.0.0.1';
    // console.log(value, RegExp.isIP(value));
    // var value = '127.0.0.1 0';
    // console.log(value, RegExp.isIP(value));
}

if (!RegExp.isMobile) {
    /**
     * 是否手机号码（11位手机号码）
     * @param value
     * @return {boolean}
     */
    RegExp.isMobile = function(value) {
        return /^(13|14|15|17|18)\d{9}$/i.test(value);
    };

    // 示例
    // var value = '13800138000';
    // console.log(value, RegExp.isMobile(value));
    // var value = '013800138000';
    // console.log(value, RegExp.isMobile(value));
    // var value = '800138000';
    // console.log(value, RegExp.isMobile(value));
}

if (!RegExp.isQQ) {
    /**
     * 是否QQ号码（5-11位数字，[1-9][0-9]{4,}）
     * @param value
     * @return {boolean}
     */
    RegExp.isQQ = function(value) {
        return /^[1-9]\d{4,10}$/.test(value);
    };

    // 示例
    // var value = '10001';
    // console.log(value, RegExp.isQQ(value));
    // var value = '01000';
    // console.log(value, RegExp.isQQ(value));
}

if (!RegExp.isTel) {
    /**
     * 是否电话号码（匹配形式如 010-12345678 或 0571-12345678 或 0831-1234567）
     * @param value
     * @return {boolean}
     */
    RegExp.isTel = function(value) {
        return /^\d{3}-\d{8}|\d{4}-\d{7,8}$/i.test(value);
    };

    // 示例
    // var value = '010-12345678';
    // console.log(value, RegExp.isTel(value));
    // var value = '12345678';
    // console.log(value, RegExp.isTel(value));
}

if (!RegExp.isUrl) {
    /**
     * 是否网址URL（以http|https开头）
     * @param value
     * @return {boolean}
     */
    RegExp.isUrl = function(value) {
        return /^[a-zA-z]+:\/\/[^\s]*$/i.test(value);
    };

    // 示例
    // var value = 'http://www.test-url.com';
    // console.log(value, RegExp.isUrl(value));
    // var value = 'https://www.test-url.com';
    // console.log(value, RegExp.isUrl(value));
    // var value = 'www.test-url.com';
    // console.log(value, RegExp.isUrl(value));
}

if (!RegExp.isUsername) {
    /**
     * 是否用户名（字母开头，5-16位，允许字母数字下划线）
     * @param value
     * @return {boolean}
     */
    RegExp.isUsername = function(value) {
        return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/i.test(value);
    };

    // 示例
    // var value = 'abc_123';
    // console.log(value, RegExp.isUsername(value));
    // var value = 'abc-123';
    // console.log(value, RegExp.isUsername(value));
}

if (!RegExp.isVersion) {
    /**
     * 是否版本号（例如 3.8 或 3.8.2）
     * @param value
     * @return {boolean}
     */
    RegExp.isVersion = function(value) {
        return /\d+(\.\d+)+/i.test(value);
    };

    // 示例
    // var value = '3.8.2';
    // console.log(value, RegExp.isVersion(value));
    // var value = '382';
    // console.log(value, RegExp.isVersion(value));
}

if (!RegExp.isZipCode) {
    /**
     * 是否邮政编码（6位数字，以1-9开头）
     * @param value
     * @return {boolean}
     */
    RegExp.isZipCode = function(value) {
        return /^[1-9]\d{5}(?!\d)$/i.test(value);
    };

    // 示例
    // var value = '518000';
    // console.log(value, RegExp.isZipCode(value));
    // var value = '5180001';
    // console.log(value, RegExp.isZipCode(value));
}


