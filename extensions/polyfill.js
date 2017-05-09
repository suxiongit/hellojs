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
     * @param strict 严格模式
     * @return {boolean}
     */
    Array.prototype.contains = function(element, strict) {
        var i = this.length;
        if (strict) {
            while (i --) {
                if (this[i] === element) {
                    return true;
                }
            }
        } else {
            while (i --) {
                if (this[i] == element) {
                    return true;
                }
            }
        }

        return false;
    };

    // 示例
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr.contains(1)); // true
    // console.log(arr.contains('1')); // true
    // console.log(arr.contains(1, true)); // 严格模式 true
    // console.log(arr.contains('1', true)); // 严格模式 false
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
     * @return {Number}
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
     * @return {Number}
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
     * @param arr1
     * @param arr2
     * @param onlyFirst true返回第一个数组不同元素
     * @return {Array.<T>}
     */
    Array.diff = function(arr1, arr2, onlyFirst) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError('Parameter is not an array');
        }

        var arr = [];

        // 实现一
        // if (onlyFirst) {
        //     for (var i = 0, n = arr1.length; i < n; i ++) {
        //         if (!arr2.contains(arr1[i])) {
        //             arr.push(arr1[i]);
        //         }
        //     }
        // } else {
        //     for (var i = 0, n = arr1.length; i < n; i ++) {
        //         if (!arr2.contains(arr1[i])) {
        //             arr.push(arr1[i]);
        //         }
        //     }
        //     for (var i = 0, n = arr2.length; i < n; i ++) {
        //         if (!arr1.contains(arr2[i])) {
        //             arr.push(arr2[i]);
        //         }
        //     }
        // }

        // 实现二
        if (onlyFirst) {
            arr = arr1.filter(function(value) {
                return !arr2.contains(value);
            });
        } else {
            var _arr1 = arr1.filter(function(value) {
                return !arr2.contains(value);
            });
            var _arr2 = arr2.filter(function(value) {
                return !arr1.contains(value);
            });
            arr = _arr1.concat(_arr2);
        }

        return arr;
    };

    // 示例
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'f'];
    // console.log(Array.diff(arr1, arr2)); // ['e', 'f']
    // console.log(Array.diff(arr1, arr2, 1)); // ['e']
    // console.log(Array.diff(arr2, arr1, 1)); // ['f']
    //
    // var arr1 = ['a', 'b', 'c', 'd', 'e'];
    // var arr2 = ['a', 'b', 'c', 'd', 'f', 'f'];
    // console.log(Array.diff(arr1, arr2)); // ['e', 'f', 'f']
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
     * @return {Number}
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
     * @return {Number}
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
    // console.log(Array.isEmpty([])); // true
    // console.log(Array.isEmpty(1)); // true
    // console.log(Array.isEmpty([1])); // false
}

if (!Array.prototype.copy) {
    /**
     * 复制数组
     * @return {Array.<*>}
     */
    Array.prototype.copy = function() {
        return this.slice();
    };

    // 示例
    // var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    // var arr2 = arr.copy();
    // console.log(arr2);
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
     * @return {string}
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
    // console.log(newDate.format('yyyy年MM月dd日 h时m分s秒')); // 2014年07月10日 10时21分12秒
    // var newDate2 = new Date();
    // console.log(newDate2.format('yyyy年MM月dd日 h时m分s秒')); // 2017年04月25日 21时40分32秒
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
    // console.log(newDate + ' 是否闰年 ' + newDate.isLeapYear()); // true
    // var newDate2 = new Date();
    // console.log(newDate2 + ' 是否闰年 ' + Date.prototype.isLeapYear(newDate2)); // false
}

if (!Date.getAge) {
    /**
     * 计算年龄
     * @param date
     * @return {number}
     */
    Date.getAge = function(date) {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // 示例
    console.log(Date.getAge('1996-3-1')); // 21
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
    // console.log(str.replaceAll('hello', 'Welcome to', true)); // Welcome to China, Welcome to World
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
     * 获取数字
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
     * 获取中文
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
     * 获取英文
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

/**
 * Number 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

if (!Number.toInt) {
    /**
     * 字符串转整型
     * @param num
     * @return {Number}
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
     * @return {Number}
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
    // console.log(RegExp.isEmpty('')); // true
    // console.log(RegExp.isEmpty(' ')); // true
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
    // console.log(value, RegExp.isDate(value)); // true
    // var value = '2016-05-19 00';
    // console.log(value, RegExp.isDate(value)); // false
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
    // console.log(value, RegExp.isDomain(value)); // true
    // var value = 'test-domain';
    // console.log(value, RegExp.isDomain(value)); // false
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
    // console.log(value, RegExp.isEmail(value)); // true
    // var value = 'test-email@domain';
    // console.log(value, RegExp.isEmail(value)); // false
}

if (!RegExp.isHtmlTag) {
    /**
     * 是否HTML标记
     * @param value
     * @return {boolean}
     */
    RegExp.isHtmlTag = function(value) {
        return /^<(\S*?)[^>]*>.*?<\/\1>|<.*?\s?\/>$/i.test(value);
    };

    // 示例
    // var value = '<span></span>';
    // console.log(value, RegExp.isHtmlTag(value)); // true
    // var value = '<div><span></span></div>';
    // console.log(value, RegExp.isHtmlTag(value)); // true
    // var value = 'span';
    // console.log(value, RegExp.isHtmlTag(value)); // false
    // var value = '<br />';
    // console.log(value, RegExp.isHtmlTag(value)); // true
    // var value = '<br/>';
    // console.log(value, RegExp.isHtmlTag(value)); // true
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
    // console.log(value, RegExp.isIdCard(value)); // true
    // var value = '0000000000000000000'; // 超出18位
    // console.log(value, RegExp.isIdCard(value)); // false
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
    // console.log(value, RegExp.isIP(value)); // true
    // var value = '127.0.0.1 0';
    // console.log(value, RegExp.isIP(value)); // false
}

if (!RegExp.isPhone) {
    /**
     * 是否手机号码（11位手机号码）
     * @param value
     * @return {boolean}
     */
    RegExp.isPhone = function(value) {
        return /^(13|14|15|17|18)\d{9}$/i.test(value);
    };

    // 示例
    // var value = '13800138000';
    // console.log(value, RegExp.isPhone(value)); // true
    // var value = '013800138000';
    // console.log(value, RegExp.isPhone(value)); // false
    // var value = '800138000';
    // console.log(value, RegExp.isPhone(value)); // false
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
    // console.log(value, RegExp.isQQ(value)); // true
    // var value = '01000';
    // console.log(value, RegExp.isQQ(value)); // false
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
    // console.log(value, RegExp.isTel(value)); // true
    // var value = '12345678';
    // console.log(value, RegExp.isTel(value)); // false
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
    // console.log(value, RegExp.isUrl(value)); // true
    // var value = 'https://www.test-url.com';
    // console.log(value, RegExp.isUrl(value)); // true
    // var value = 'www.test-url.com';
    // console.log(value, RegExp.isUrl(value)); // false
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
    // console.log(value, RegExp.isUsername(value)); // true
    // var value = 'abc-123';
    // console.log(value, RegExp.isUsername(value)); // false
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
    // console.log(value, RegExp.isVersion(value)); // true
    // var value = '382';
    // console.log(value, RegExp.isVersion(value)); // false
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
    // console.log(value, RegExp.isZipCode(value)); // true
    // var value = '5180001'; // 已超出6位
    // console.log(value, RegExp.isZipCode(value)); // false
}

if (!RegExp.isPassword) {
    /**
     * 是否密码（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）
     * @param value
     * @param strong 强密码（必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间）
     * @return {boolean}
     */
    RegExp.isPassword = function(value, strong) {
        if (strong) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/i.test(value);
        } else {
            return /^[a-zA-Z]\w{5,17}$/i.test(value);
        }
    };

    // 示例
    // console.log(RegExp.isPassword('abc123')); // true
    // console.log(RegExp.isPassword('Abcd1234')); // true
    // console.log(RegExp.isPassword('abc123', 1)); // false
    // console.log(RegExp.isPassword('Abcd1234', 1)); // true
}

if (!RegExp.isMoney) {
    /**
     * 是否货币（允许负数、若有小数点则精确小数点后两位）
     * @param value
     * @param thousand 千分位分隔符（“,”英文逗号）
     * @return {boolean}
     */
    RegExp.isMoney = function(value, thousand) {
        if (thousand) {
            return /(^[-]?[1-9]((\d{0,2}$)|(\d{0,2}(\,\d{3})*$|((\d{0,2})(\,\d{3})*(\.\d{1,2}$)))))|(^[0](\.\d{1,2})?$)|(^[-][0]\.\d{1,2}$)/i.test(value);
        } else {
            return /((^[-]?([1-9]\d*))|^0)(\.\d{1,2})?$|(^[-]0\.\d{1,2}$)/i.test(value);
        }
    };

    // 示例
    // console.log(RegExp.isMoney('10000')); // true
    // console.log(RegExp.isMoney('10000.00')); // true
    // console.log(RegExp.isMoney('10,000')); // false
    // console.log(RegExp.isMoney('10,000.00')); // false
    // console.log(RegExp.isMoney('10,000', 1)); // true
    // console.log(RegExp.isMoney('10,000.00', 1)); // true
}

/**
 * Math 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math
 */

// Math.random() 获取0-1之间的随机数（带小数点）

if (!Math.randomArbitrary) {
    /**
     * 获取min到max之间的随机数（带小数点）
     * @param min
     * @param max
     * @return {Number}
     */
    Math.randomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(0, 1)); // 0.5650337204284932
    // }
    //
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(1, 2)); // 1.2152592913032378
    // }
}

if (!Math.randomInt) {
    /**
     * 获取min到max之间的随机整数
     * @param min
     * @param max
     * @return {Number}
     */
    Math.randomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10)); // 5
    // }
}

if (!Math.randomIntInclusive) {
    /**
     * 获取min到max之间的随机整数（包含max）
     * @param min
     * @param max
     * @return {Number}
     */
    Math.randomIntInclusive = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomIntInclusive(1, 10)); // 10
    // }
}

/**
 * Object 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

if (!Object.clone) {
    /**
     * 克隆对象
     * @param obj
     * @return {Object}
     */
    Object.clone = function(obj) {
        return Object.assign({}, obj);
    };

    // 示例
    // var obj = { a: 1 };
    // var copy = Object.clone(obj);
    // obj.a = 2;
    // console.log(copy); // { a: 1 }
}

if (!Object.isEmpty) {
    /**
     * 是否为空
     * @param obj
     * @return {boolean}
     */
    Object.isEmpty = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    // 示例
    // console.log(Object.isEmpty()); // true
    // console.log(Object.isEmpty({})); // true
    // console.log(Object.isEmpty(null)); // true
    // console.log(Object.isEmpty(0)); // true
    // console.log(Object.isEmpty(1)); // true
    // console.log(Object.isEmpty({'a': 1})); // false
}