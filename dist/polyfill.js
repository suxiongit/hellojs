/**
 * Array 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

if (!Array.prototype.contains) {
    /**
     * 数组中是否存在指定的值
     * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
     * @param {string|number} element 需要查找的元素值
     * @param {boolean} [strict] 严格模式下，会进行类型对比
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

    // 示例 Array.prototype.contains
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr.contains(1)); // true
    // console.log(arr.contains('1')); // true
    // console.log(arr.contains(1, true)); // 严格模式 true
    // console.log(arr.contains('1', true)); // 严格模式 false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.contains');
}

// if (!Array.prototype.forEach) {
//     /**
//      * 数组循环遍历（让IE兼容forEach方法）
//      * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//      * @param {function} callback 回调函数
//      */
//     Array.prototype.forEach = function(callback/*, thisArg*/) {
//         var T, k;
//         if (this == null) {
//             throw new TypeError('"this" is null or not defined');
//         }
//
//         var O = Object(this);
//         var len = O.length >>> 0; // Hack to convert O.length to a UInt32
//
//         if (typeof callback !== 'function') { // {}.toString.call(callback) != '[object Function]'
//             throw new TypeError(callback + ' is not a function');
//         }
//
//         if (arguments.length > 1) { // thisArg
//             T = arguments[1]; // T = thisArg
//         }
//
//         k = 0;
//         while (k < len) {
//             var kValue;
//             if (k in O) {
//                 kValue = O[k];
//                 callback.call(T, kValue, k, O);
//             }
//             k++;
//         }
//     };
//
//     // 示例 Array.prototype.forEach
//     // var arr = ['a', 'b', 'c', 'd', 'e'];
//     // arr.forEach(function(value) {
//     //     console.log(value);
//     // });
//     // arr.forEach(function(value, index, array) {
//     //     console.log(value + ' ' + index + ' ' + array);
//     // });
// } else {
//     console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.forEach');
// }

if (!Array.prototype.remove) {
    /**
     * 删除数组元素
     * @param {string|array} element 要删除的元素
     * @param {boolean} [isIndex] 是否索引
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

    // 示例 Array.prototype.remove
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.remove');
}

// if (!Array.prototype.indexOf) {
//     /**
//      * 查找指定的元素在数组中的位置（索引）
//      * @param {string} value 要查找的元素
//      * @return {number} 返回元素在数组中的索引位置
//      */
//     // Array.prototype.indexOf = function(value) {
//     //     for (var i = 0, n = this.length; i < n; i ++) {
//     //         if (this[i] == value) {
//     //             return i;
//     //         }
//     //     }
//     //     return -1;
//     // };
//
//     /**
//      * 查找指定的元素在数组中的位置（索引）
//      * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
//      * @param {string} searchElement 要查找的元素
//      * @param {number} [fromIndex] 开始查找的位置
//      * @return {number} 返回元素在数组中的索引位置
//      */
//     Array.prototype.indexOf = function(searchElement, fromIndex) {
//
//         var k;
//
//         // 1. Let O be the result of calling ToObject passing
//         //    the this value as the argument.
//         if (this == null) {
//             throw new TypeError('"this" is null or not defined');
//         }
//
//         var O = Object(this);
//
//         // 2. Let lenValue be the result of calling the Get
//         //    internal method of O with the argument "length".
//         // 3. Let len be ToUint32(lenValue).
//         var len = O.length >>> 0;
//
//         // 4. If len is 0, return -1.
//         if (len === 0) {
//             return -1;
//         }
//
//         // 5. If argument fromIndex was passed let n be
//         //    ToInteger(fromIndex); else let n be 0.
//         var n = +fromIndex || 0;
//
//         if (Math.abs(n) === Infinity) {
//             n = 0;
//         }
//
//         // 6. If n >= len, return -1.
//         if (n >= len) {
//             return -1;
//         }
//
//         // 7. If n >= 0, then Let k be n.
//         // 8. Else, n<0, Let k be len - abs(n).
//         //    If k is less than 0, then let k be 0.
//         k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
//
//         // 9. Repeat, while k < len
//         while (k < len) {
//             // a. Let Pk be ToString(k).
//             //   This is implicit for LHS operands of the in operator
//             // b. Let kPresent be the result of calling the
//             //    HasProperty internal method of O with argument Pk.
//             //   This step can be combined with c
//             // c. If kPresent is true, then
//             //    i.  Let elementK be the result of calling the Get
//             //        internal method of O with the argument ToString(k).
//             //   ii.  Let same be the result of applying the
//             //        Strict Equality Comparison Algorithm to
//             //        searchElement and elementK.
//             //  iii.  If same is true, return k.
//             if (k in O && O[k] === searchElement) {
//                 return k;
//             }
//             k++;
//         }
//         return -1;
//     };
//
//     // 示例 Array.prototype.indexOf
//     // var arr = ['a', 'b', 'c', 'd', 'e'];
//     // console.log(arr.indexOf('e'));
// } else {
//     console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.indexOf');
// }

if (!Array.prototype.random) {
    /**
     * 数组随机排序
     * @param {number} [length] 指定返回数组的长度，当不传值、0或者超出数组长度返回数组的全部元素
     * @return {array} 返回已随机排序的数组
     */
    Array.prototype.random = function(length) {
        if (null == this) {
            throw new TypeError('"this" is null or not defined');
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

    // 示例 Array.prototype.random
    // var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    // for (var i = 0; i < 10; i ++) {
    //     console.log(items.random());
    // }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.random');
}

if (!Array.prototype.shuffle) {
    /**
     * 数组随机排序
     * @alias Array.prototype.random(length)
     * @param {number} [length] 指定返回数组的长度，当不传值、0或者超出数组长度返回数组的全部元素
     * @return {array} 返回已随机排序的数组
     */
    Array.prototype.shuffle = function(length) {
        return this.slice(0).random(length);
    };

    // 示例 Array.prototype.shuffle
    // var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    // for (var i = 0; i < 10; i ++) {
    //     console.log(items.shuffle());
    // }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.shuffle');
}

if (!Array.prototype.empty) {
    /**
     * 清空数组
     */
    Array.prototype.empty = function() {
        this.splice(0, this.length);
    };

    // 示例 Array.prototype.empty
    // var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    // console.log(arr);
    // arr.empty();
    // console.log(arr);
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.empty');
}

if (!Array.prototype.filterEmpty) {
    /**
     * 数组过滤空值
     * @return {array}
     */
    Array.prototype.filterEmpty = function() {
        return this.filter(function(value) {
            if (Object.isType(value, 'String')) {
                value = value.trim();
            }
            return value;
        });
    };

    // 示例 Array.prototype.filterEmpty
    // var arr = ['a', '', 'b', ' ', 'c', '  ', 'd', , 'e', 0];
    // console.log(arr);
    // console.log(arr.filterEmpty());
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.filterEmpty');
}

if (!Array.prototype.unique) {
    /**
     * 数组去重
     * @return {array}
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

    // 示例 Array.prototype.unique
    // var arr = ['1', 1, 2];
    // var arr2 = arr.unique();
    // console.log(arr); // [ '1', 1, 2 ]
    // console.log(arr2); // [ '1', 2 ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.unique');
}

if (!Array.diff) {
    /**
     * 数组不同元素
     * @param {array} arr1
     * @param {array} arr2
     * @param {boolean} leftDiff true返回第一个数组不同元素
     * @return {array}
     */
    Array.diff = function(arr1, arr2, leftDiff) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError('Parameter "arr1" or "arr2" is not an array'); // 参数“arr1”和“arr2”不是一个数组
        }

        var arr = [];

        // 实现一
        // if (leftDiff) {
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
        if (leftDiff) {
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

    // 示例 Array.diff
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.diff');
}

if (!Array.same) {
    /**
     * 数组相同元素
     * @param {array} arr1
     * @param {array} arr2
     * @return {array}
     */
    Array.same = function(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
            throw new TypeError('Parameter "arr1" or "arr2" is not an array'); // 参数“arr1”和“arr2”不是一个数组
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

    // 示例 Array.same
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.same');
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

    // 示例 Array.prototype.max
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr + ' 最大值 ' + arr.max()); // 5
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr + ' 最大值 ' + arr.max()); // e
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.max');
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

    // 示例 Array.prototype.min
    // var arr = [1, 2, 3, 4, 5];
    // console.log(arr + ' 最小值 ' + arr.min()); // 1
    // var arr = ['a', 'b', 'c', 'd', 'e'];
    // console.log(arr + ' 最小值 ' + arr.min()); // a
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.min');
}

if (!Array.isEmpty) {
    /**
     * 数组是否为空
     * @param {array} arr
     * @return {boolean}
     */
    Array.isEmpty = function(arr) {
        if (!Array.isArray(arr) || arr.length <= 0) {
            return true;
        }
        return false;
    };

    // 示例 Array.isEmpty
    // console.log(Array.isEmpty([])); // true
    // console.log(Array.isEmpty(1)); // true
    // console.log(Array.isEmpty([1])); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.isEmpty');
}

if (!Array.prototype.copy) {
    /**
     * 复制数组
     * @return {array}
     */
    Array.prototype.copy = function() {
        return this.slice();

        // ES6写法
        // return [...this];
    };

    // 示例 Array.prototype.copy
    // var arr = ['a', 'b', 'c', 'd'];
    // var arr2 = arr.copy();
    // console.log(arr2); // [ 'a', 'b', 'c', 'd' ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.copy');
}

if (!Array.prototype.numberSort) {
    /**
     * 数字数组排序
     * @param {number} [descOrder] 排序（0 升序、1 降序）
     * @return {array<number>}
     */
    Array.prototype.numberSort = function(descOrder) {
        return this.sort(function(a, b) {
            return descOrder ? b - a : a - b;
        });
    };

    // 示例 Array.prototype.numberSort
    // console.log([1, 10, 21, 2].sort()); // [ 1, 10, 2, 21 ]
    // console.log([1, 10, 21, 2].numberSort()); // [ 1, 2, 10, 21 ]
    // console.log([1, 10, 21, 2].numberSort(1)); // [ 21, 10, 2, 1 ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.numberSort');
}

if (!Array.prototype.numberSum) {
    /**
     * 数字数组求和
     * @return {array<number>}
     */
    Array.prototype.numberSum = function() {
        // return eval(this.join('+')); // 如果是空数组，结果为undefined
        return this.reduce(function(count, v) { return count + v }, 0); // 支持空数组结果为0
    };

    // 示例 Array.prototype.numberSum
    // console.log([1, 2, 3, 4, 5].numberSum()); // 15
    // console.log([].numberSum()); // 0
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.numberSum');
}

if (!Array.prototype.equals) {
    /**
     * 数组比较
     * @param {array} array2 比较的目标数组
     * @return {boolean}
     */
    Array.prototype.equals = function(array2) {
        // if the other array is a falsy value, return
        if (!array2)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array2.length)
            return false;

        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array2[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array2[i]))
                    return false;
            }
            else if (this[i] != array2[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }

        return true;
    }

    // 示例 Array.prototype.equals
    // console.log([1, 2, 3].equals([1, 2, 3])); // true
    // console.log([1, 2, 3].equals([4, 5, 6])); // false
    // console.log([1, [2, 3]].equals([1, [2, 3]])); // true
    // console.log([{a:1}, {b:2}].equals([{a:1}, {b:2}])); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Array.prototype.equals');
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
     * @param {string} format 指定日期格式
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
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1)
                ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length));
            }
        }
        return format;
    };

    // 示例 Date.prototype.format
    // var date = new Date('2014-07-10 10:21:12');
    // console.log(date.format('yyyy年MM月dd日 hh时mm分ss秒')); // 2014年07月10日 10时21分12秒
    // var date2 = new Date();
    // console.log(date2.format('yyyy年MM月dd日 hh时mm分ss秒')); // 2017年04月25日 21时40分32秒
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.format');
}

if (!Date.prototype.isLeapYear) {
    /**
     * 判断闰年
     * 1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年，1900年不是闰年
     * 2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年
     * 注意：Date.prototype.getYear()获取的年份是减去1900，例如2017年值为117，而1900年值0
     * @return {boolean}
     */
    Date.prototype.isLeapYear = function() {
        var y = this.getFullYear();
        return !(y % (y % 100 ? 4 : 400)); // return (0 === y % 4 && ((y % 100 !== 0) || (y % 400 === 0)));
    };

    // 示例 Date.prototype.isLeapYear
    // var date = new Date('2016');
    // console.log(date.format('yyyy年') + ' 是否闰年 ' + date.isLeapYear()); // true
    // var date2 = new Date();
    // console.log(date2.format('yyyy年') + ' 是否闰年 ' + date2.isLeapYear()); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.isLeapYear');
}

if (!Date.getAge) {
    /**
     * 计算年龄
     * @param {string} dateStr
     * @return {number}
     */
    Date.getAge = function(dateStr) {
        var today = new Date();
        var birthDate = new Date(dateStr);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // 示例 Date.getAge
    // console.log(Date.getAge('1996-3-1')); // 21
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.getAge');
}

if (!Date.prototype.diff) {
    /**
     * 计算时间差
     * @param {string} dateType 日期类型（可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒）
     * @param {Date} target 目标时间
     * @return {number|undefined}
     */
    Date.prototype.diff = function(dateType, target) {
        // 若参数不匹配或 target 不是日期类型則回传 undefined
        if (arguments.length < 2 || target.constructor != Date) {
            return undefined;
        }
        switch (dateType) {
            //计算秒差
            case 's':
                return parseInt((target - this) / 1000);
            //计算分差
            case 'n':
                return parseInt((target - this) / 60000);
            //计算時差
            case 'h':
                return parseInt((target - this) / 3600000);
            //计算日差
            case 'd':
                return parseInt((target - this) / 86400000);
            //计算周差
            case 'w':
                return parseInt((target - this) / (86400000 * 7));
            //计算月差
            case 'm':
                return (target.getMonth() + 1) + ((target.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
            //计算年差
            case 'y':
                return target.getFullYear() - this.getFullYear();
            //输入有误
            default:
                return undefined;
        }
    };

    // 示例 Date.prototype.diff
    // var date1 = new Date('2011-08-10 09:00:00');
    // console.log(date1.format('yyyy-MM-dd hh:mm:ss')); // 2011-08-10 09:00:00
    // var date2 = new Date('2011-08-10 18:00:00');
    // console.log(date2.format('yyyy-MM-dd hh:mm:ss')); // 2011-08-10 18:00:00
    // console.log('相差多少%s小时', date1.diff('h', date2)); // 9
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.diff');
}

if (!Date.prototype.toCNDate) {
    /**
     * 获取当前时间的中文形式
     * @return {string}
     */
    Date.prototype.toCNDate = function() {
        var dateText = '';
        dateText += this.getFullYear().withZero(4) + Number(24180).chrW();
        dateText += this.getMonth().withZero(2) + Number(26376).chrW();
        dateText += this.getDate().withZero(2) + Number(26085).chrW();
        dateText += this.getHours().withZero(2) + Number(26102).chrW();
        dateText += this.getMinutes().withZero(2) + Number(20998).chrW();
        dateText += this.getSeconds().withZero(2) + Number(31186).chrW();
        dateText += Number(32).chrW() + Number(32).chrW() + Number(26143).chrW() + Number(26399).chrW()
            + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).toInt().chrW();
        return dateText;
    };

    // 示例 Date.prototype.toCNDate
    // var nowDate = new Date();
    // console.log('默认格式', nowDate); // 默认格式 2017-06-19T09:43:57.174Z
    // console.log('中文格式', nowDate.toCNDate()); // 中文格式 2017年05月19日17时43分57秒  星期一
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.toCNDate');
}

if (!Date.prototype.add) {
    /**
     * 日期计算
     * @param {string} dateType 日期类型（可选值 y 年 m月 d日 w星期 h时 n分 s秒）
     * @param {number} timeNum 增加的时间
     * @return {Date} 返回日期对象
     */
    Date.prototype.add = function(dateType, timeNum) {
        date = this;
        switch (dateType) {
            case 's' :
                return new Date(date.getTime() + (1000 * timeNum));
            case 'n' :
                return new Date(date.getTime() + (60000 * timeNum));
            case 'h' :
                return new Date(date.getTime() + (3600000 * timeNum));
            case 'd' :
                return new Date(date.getTime() + (86400000 * timeNum));
            case 'w' :
                return new Date(date.getTime() + ((86400000 * 7) * timeNum));
            case 'm' :
                return new Date(date.getFullYear(), (date.getMonth()) + timeNum, date.getDate(),
                    date.getHours(), date.getMinutes(), date.getSeconds());
            case 'y' :
                return new Date((date.getFullYear() + timeNum), date.getMonth(), date.getDate(),
                    date.getHours(), date.getMinutes(), date.getSeconds());
        }
    };

    // 示例 Date.prototype.add
    // var date = new Date();
    // console.log(date.add('y', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一年
    // console.log(date.add('m', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一个月
    // console.log(date.add('d', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一天
    // console.log(date.add('w', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一星期
    // console.log(date.add('h', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一小时
    // console.log(date.add('n', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一分钟
    // console.log(date.add('s', 1).format('yyyy-MM-dd hh:mm:ss')); // 增加一秒
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.add');
}

if (!Date.prototype.getMaxDay) {
    /**
     * 获取当前月份天数
     * @return {number}
     */
    Date.prototype.getMaxDay = function() {
        // 实现一
        var y = this.getFullYear(), m = this.getMonth() + 1;
        if (m === 4 || m === 6 || m === 9 || m === 11)
            return 30;
        if (m === 2)
            if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0)
                return 29;
            else
                return 28;
        return 31;

        // 实现二
        // var date = this;
        // date.setDate(1);
        // date.setMonth(date.getMonth() + 1);
        // var time = date.getTime() - 24 * 60 * 60 * 1000;
        // var newDate = new Date(time);
        // return newDate.getDate();
    };

    // 示例 Date.prototype.getMaxDay
    // console.log('当前月份%s天', new Date().getMaxDay()); // 当前月份30天
    // console.log('2018年2月份%s天', new Date('2018-02').getMaxDay()); // 2018年2月份28天
    // console.log('2016年2月份%s天', new Date('2016-02').getMaxDay()); // 2016年2月份29天
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Date.prototype.getMaxDay');
}

/**
 * Math 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math
 */

// Math.random() 获取0-1之间的随机数（带小数点）

if (!Math.randomArbitrary) {
    /**
     * 获取min到max之间的随机数（带小数点）
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    Math.randomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    // 示例 Math.randomArbitrary
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(0, 1)); // 0.5650337204284932
    // }
    //
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(1, 2)); // 1.2152592913032378
    // }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Math.randomArbitrary');
}

if (!Math.randomInt) {
    /**
     * 获取min到max之间的随机整数
     * @param {number} min
     * @param {number} max
     * @param {boolean} [inclusive] 包含max
     * @return {number}
     */
    Math.randomInt = function(min, max, inclusive) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var seed = inclusive ? (max - min + 1): (max - min);
        return Math.floor(Math.random() * seed) + min;
    };

    // 示例 Math.randomInt
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10)); // 1-9
    // }

    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10, 1)); // 1-10
    // }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Math.randomInt');
}

/**
 * Number 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

if (!Number.toInt) {
    /**
     * 字符串转整型
     * @param {string} numStr
     * @return {number}
     */
    Number.toInt = function(numStr) {
        return isNaN(parseInt(numStr)) ? 0 : parseInt(numStr);
    };

    // 示例 Number.toInt
    // console.log(Number.toInt('1')); // 1
    // console.log(Number.toInt('2')); // 2
    // console.log(Number.toInt('1') + Number.toInt('2')); // 3
    // console.log(Number.toInt('a')); // 0
    // console.log(parseInt('a')); // NaN
    // console.log(Number.parseInt('a')); // NaN
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.toInt');
}

if (!Number.toDouble) {
    /**
     * 字符串转浮点型
     * @param {string} numStr
     * @return {number}
     */
    Number.toDouble = function(numStr) {
        return isNaN(parseFloat(numStr)) ? 0.0 : parseFloat(numStr);
    };

    // 示例 Number.toDouble
    // console.log(Number.toDouble('.1')); // 0.1
    // console.log(Number.toDouble('.2')); // 0.2
    // console.log(Number.toDouble('.1') + Number.toDouble('.2')); // 0.30000000000000004
    // console.log(Number.toDouble('a')); // 0
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.toDouble');
}

if (!Number.prototype.withZero) { // ZeroPadding
    /**
     * 数字补零
     * @param {number} length 指定长度
     * @return {string}
     */
    Number.prototype.withZero = function(length) {
        var str = this.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    };

    // 示例 Number.prototype.withZero
    // console.log(Number(7).withZero(3)); // 007
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.prototype.withZero');
}

if (!Number.prototype.chrW) {
    /**
     * Unicode还原
     * @return {string}
     */
    Number.prototype.chrW = function() {
        return String.fromCharCode(this);
    };

    // 示例 Number.prototype.chrW
    // console.log(Number(65).chrW()); // A
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.prototype.chrW');
}

if (!Number.prototype.splitPow) {
    /**
     * 拆分2的次方（幂）
     * @return {array} 返回数位2的次方数组
     */
    Number.prototype.splitPow = function() {
        if (this <= 0) return [];
        var bin = this.toString(2), pow = [];
        bin = bin.split('');
        for (var i = 0, j = 0, n = bin.length; i < n; i ++) {
            if (bin[i] <= 0) continue;
            pow[j] = Math.pow(2, n - i - 1);
            j ++;
        }
        return pow;
	};

    // 示例 Number.prototype.splitPow
    // console.log(Number(15).splitPow()); // [ 8, 4, 2, 1 ]
    // console.log(Number(0).splitPow()); // []
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.prototype.splitPow');
}

if (!Number.prototype.digitUppercase) {
    /**
     * 现金额转大写
     * @return {string}
     */
    Number.prototype.digitUppercase = function() {
        var amount = this;
        var fraction = ['角', '分'];
        var digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = amount < 0 ? '欠' : '';
        amount = Math.abs(amount);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(amount * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        amount = Math.floor(amount);
        for (var i = 0; i < unit[0].length && amount > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && amount > 0; j++) {
                p = digit[amount % 10] + unit[1][j] + p;
                amount = Math.floor(amount / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    };

    // 示例 Number.prototype.digitUppercase
    // console.log(Number(10000).digitUppercase()); // 壹万元整
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Number.prototype.digitUppercase');
}

/**
 * Object 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

if (!Object.clone) {
    /**
     * 克隆对象
     * @param {object} obj
     * @return {object}
     */
    Object.clone = function(obj) {
        return Object.assign({}, obj);
    };

    // 示例 Object.clone
    // var obj = { a: 1 };
    // var copy = Object.clone(obj);
    // obj.a = 2;
    // console.log(copy); // { a: 1 }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.clone');
}

if (!Object.isEmpty) {
    /**
     * 是否为空
     * @param {object} obj
     * @return {boolean}
     */
    Object.isEmpty = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    // 示例 Object.isEmpty
    // console.log(Object.isEmpty()); // true
    // console.log(Object.isEmpty({})); // true
    // console.log(Object.isEmpty(null)); // true
    // console.log(Object.isEmpty(0)); // true
    // console.log(Object.isEmpty(1)); // true
    // console.log(Object.isEmpty({'a': 1})); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.isEmpty');
}

if (!Object.isType) {
    /**
     * 判断对象类型
     * @param {object} obj
     * @param {string} type 对象类型（Undefined、Null、Boolean、String、Number、Array、Object、Function、Date）
     * @param {boolean} [illegal] 默认false 参数type不合法抛出错误，true 忽略参数type不合法错误
     * @return {boolean}
     */
    Object.isType = function(obj, type, illegal) {
        type = String(type).firstUpperCase();
        var legal = [
            'Undefined',
            'Null',
            'Boolean',
            'String',
            'Number',
            'Array',
            'Object',
            'Function',
            'Date',
        ];
        if (!illegal && !legal.contains(type)) {
            throw new TypeError('Parameter "type" value is illegal'); // 参数“type”值是不合法的
        }
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };

    // 示例 Object.isType
    // console.log(Object.isType(undefined, 'Undefined')); // Undefined: true
    // console.log(Object.isType(null, 'Null')); // Null: true
    // console.log(Object.isType(true, 'Boolean')); // Boolean: true
    // console.log(Object.isType("foobar", 'String')); // String: true
    // console.log(Object.isType(123, 'Number')); // Number：true
    // console.log(Object.isType([1, 2, 3], 'Array')); // Array: true
    // console.log(Object.isType({foo: 123}, 'Object')); // Object: true
    // console.log(Object.isType(Object.isEmpty, 'Function')); // Function: true
    // console.log(Object.isType(new Date(), 'Date')); // Date: true

    // illegal
    // console.log(Object.isType(1, 'test')); // TypeError: Parameter "type" value is illegal
    // console.log(Object.isType(1, 'test', 1)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.isType');
}

if (!Object.prototype.remove) {
    /**
     * 删除对象属性
     * @param {array} arr 要删除的属性
     * @return {array} 返回删除属性之后的对象
     */
    Object.prototype.remove = function(arr) {
        if (!arr) return;
        var that = this;
        arr.forEach(function(name) {
            delete(that[name]);
        });
    };

    // 示例 Object.prototype.remove
    // var obj = {'name': 'zs', 'age': 17, 'car': 'suzuki'};
    // obj.remove(['age', 'car']);
    // console.log(obj); // { name: 'zs' }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.remove');
}

if (!Object.prototype.extend) {
    /**
     * 扩展对象
     * @param {object} obj 要扩展的对象
     */
    Object.prototype.extend = function(obj) {
        if (!obj) return;
        for(var name in obj) {
            if (obj.hasOwnProperty(name)) {
                this[name] = obj[name];
            }
        }
    };

    // 示例 Object.prototype.extend
    // var objA = {'name': 'colin', 'car': 'suzuki'};
    // var objB = {'name': 'james', 'age': 17};
    // objA.extend(objB);
    // console.log(objA); // { name: 'james', car: 'suzuki', age: 17 }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.extend');
}

if (!Object.prototype.pick) {
    /**
     * 从对象中选择属性组成新的对象
     * @param {array} arr 选择的属性
     * @return {array}
     */
    Object.prototype.pick = function(arr) {
        if (!arr) return {};
        var that = this, obj = {};
        arr.forEach(function(name) {
            obj[name] = that[name];
        });
        return obj;
    };

    // 示例 Object.prototype.pick
    // var objA = {'name': 'colin', 'car': 'suzuki', 'age': 17};
    // var objB = objA.pick(['car', 'age']);
    // console.log(objB); // { car: 'suzuki', age: 17 }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.equals');
}

if (!Object.prototype.equals) {
    /**
     * 对象比较
     * @param {object} object2 比较的目标对象
     * @return {boolean}
     */
    Object.prototype.equals = function(object2) {
        // For the first loop, we only check for types
        for (var propName in this) {
            // Check for inherited methods and properties - like .equals itself
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            // Return false if the return value is different
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            // Check instance type
            else if (typeof this[propName] != typeof object2[propName]) {
                // Different types => not equal
                return false;
            }
        }
        // Now a deeper check using other objects property names
        for (var propName in object2) {
            // We must check instances anyway, there may be a property that only exists in object2
            // I wonder, if remembering the checked values from the first loop would be faster or not
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            else if (typeof this[propName] != typeof object2[propName]) {
                return false;
            }
            // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
            if (!this.hasOwnProperty(propName))
                continue;

            // Now the detail check and recursion

            // This returns the script back to the array comparing
            /**REQUIRES Array.equals**/
            if (this[propName] instanceof Array && object2[propName] instanceof Array) {
                // recurse into the nested arrays
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
                // recurse into another objects
                // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            // Normal value comparison for strings and numbers
            else if (this[propName] != object2[propName]) {
                return false;
            }
        }
        // If everything passed, let's say YES
        return true;
    }

    // 示例 Object.prototype.equals
    // console.log({a:1, b:2}.equals({a:1, b:2})); // true
    // console.log({a:1, b:2}.equals({a:3, b:4})); // false
    // console.log({a:1, b:2}.equals({a:1})); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.equals');
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
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isEmpty = function(value) {
        return /^\s*$/.test(value);
    };

    // 示例 RegExp.isEmpty
    // console.log(RegExp.isEmpty('')); // true
    // console.log(RegExp.isEmpty(' ')); // true
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isEmpty');
}

if (!RegExp.isDate) {
    /**
     * 是否日期
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isDate = function(value) {
        return /^\d{4}\-\d{1,2}-\d{1,2}$/i.test(value);
    };

    // 示例 RegExp.isDate
    // var value = '2016-05-19';
    // console.log(value, RegExp.isDate(value)); // true
    // var value = '2016-05-19 00';
    // console.log(value, RegExp.isDate(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isDate');
}

if (!RegExp.isDomain) {
    /**
     * 是否域名
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isDomain = function(value) {
        return /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/i.test(value);
    };

    // 示例 RegExp.isDomain
    // var value = 'www.test-domain.com';
    // console.log(value, RegExp.isDomain(value)); // true
    // var value = 'test-domain';
    // console.log(value, RegExp.isDomain(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isDomain');
}

if (!RegExp.isEmail) {
    /**
     * 是否邮箱
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isEmail = function(value) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value);
    };

    // 示例 RegExp.isEmail
    // var value = 'test-email@domain.com';
    // console.log(value, RegExp.isEmail(value)); // true
    // var value = 'test-email@domain';
    // console.log(value, RegExp.isEmail(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isEmail');
}

if (!RegExp.isHtmlTag) {
    /**
     * 是否HTML标记
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isHtmlTag = function(value) {
        return /^<(\S*?)[^>]*>.*?<\/\1>|<.*?\s?\/>$/i.test(value);
    };

    // 示例 RegExp.isHtmlTag
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isHtmlTag');
}

if (!RegExp.isIdCard) {
    /**
     * 是否身份证（15位或18位）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isIdCard = function(value) {
        return /^\d{14}(\d{4}|(\d{3}[xX])|\d{1})$/i.test(value);
    };

    // 示例 RegExp.isIdCard
    // var value = '000000000000000000';
    // console.log(value, RegExp.isIdCard(value)); // true
    // var value = '0000000000000000000'; // 超出18位
    // console.log(value, RegExp.isIdCard(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isIdCard');
}

if (!RegExp.isIP) {
    /**
     * 是否IP地址
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isIP = function(value) {
        return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
    };

    // 示例 RegExp.isIP
    // var value = '127.0.0.1';
    // console.log(value, RegExp.isIP(value)); // true
    // var value = '127.0.0.1 0';
    // console.log(value, RegExp.isIP(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isIP');
}

if (!RegExp.isMobilePhone) {
    /**
     * 是否手机号码（11位手机号码）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isMobilePhone = function(value) {
        return /^(13|14|15|17|18)\d{9}$/i.test(value);
    };

    // 示例 RegExp.isMobilePhone
    // var value = '13800138000';
    // console.log(value, RegExp.isMobilePhone(value)); // true
    // var value = '013800138000';
    // console.log(value, RegExp.isMobilePhone(value)); // false
    // var value = '800138000';
    // console.log(value, RegExp.isMobilePhone(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isMobilePhone');
}

if (!RegExp.isQQ) {
    /**
     * 是否QQ号码（5-11位数字，[1-9][0-9]{4,}）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isQQ = function(value) {
        return /^[1-9]\d{4,10}$/.test(value);
    };

    // 示例 RegExp.isQQ
    // var value = '10001';
    // console.log(value, RegExp.isQQ(value)); // true
    // var value = '01000';
    // console.log(value, RegExp.isQQ(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isQQ');
}

if (!RegExp.isTelephone) {
    /**
     * 是否电话号码（匹配形式如 010-12345678 或 0571-12345678 或 0831-1234567）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isTelephone = function(value) {
        return /^\d{3,4}-\d{7,8}$/i.test(value);
    };

    // 示例 RegExp.isTelephone
    // console.log(RegExp.isTelephone('010-12345678')); // true
    // console.log(RegExp.isTelephone('12345678')); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isTelephone');
}

if (!RegExp.isUrl) {
    /**
     * 是否网址URL（以http|https开头）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isUrl = function(value) {
        return /^[a-zA-z]+:\/\/[^\s]*$/i.test(value);
    };

    // 示例 RegExp.isUrl
    // var value = 'http://www.test-url.com';
    // console.log(value, RegExp.isUrl(value)); // true
    // var value = 'https://www.test-url.com';
    // console.log(value, RegExp.isUrl(value)); // true
    // var value = 'www.test-url.com';
    // console.log(value, RegExp.isUrl(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isUrl');
}

if (!RegExp.isUsername) {
    /**
     * 是否用户名（字母开头，5-16位，允许字母数字下划线）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isUsername = function(value) {
        return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/i.test(value);
    };

    // 示例 RegExp.isUsername
    // var value = 'abc_123';
    // console.log(value, RegExp.isUsername(value)); // true
    // var value = 'abc-123';
    // console.log(value, RegExp.isUsername(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isUsername');
}

if (!RegExp.isVersion) {
    /**
     * 是否版本号（例如 3.8 或 3.8.2）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isVersion = function(value) {
        return /\d+(\.\d+)+/i.test(value);
    };

    // 示例 RegExp.isVersion
    // var value = '3.8.2';
    // console.log(value, RegExp.isVersion(value)); // true
    // var value = '382';
    // console.log(value, RegExp.isVersion(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isVersion');
}

if (!RegExp.isZipCode) {
    /**
     * 是否邮政编码（6位数字，以1-9开头）
     * @param {string} value
     * @return {boolean}
     */
    RegExp.isZipCode = function(value) {
        return /^[1-9]\d{5}(?!\d)$/i.test(value);
    };

    // 示例 RegExp.isZipCode
    // var value = '518000';
    // console.log(value, RegExp.isZipCode(value)); // true
    // var value = '5180001'; // 已超出6位
    // console.log(value, RegExp.isZipCode(value)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isZipCode');
}

if (!RegExp.isPassword) {
    /**
     * 是否密码（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）
     * @param {string} value
     * @param {boolean} [isStrong] 强密码（必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间）
     * @return {boolean}
     */
    RegExp.isPassword = function(value, isStrong) {
        if (isStrong) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/i.test(value);
        } else {
            return /^[a-zA-Z]\w{5,17}$/i.test(value);
        }
    };

    // 示例 RegExp.isPassword
    // console.log(RegExp.isPassword('abc123')); // true
    // console.log(RegExp.isPassword('Abcd1234')); // true
    // console.log(RegExp.isPassword('abc123', 1)); // false
    // console.log(RegExp.isPassword('Abcd1234', 1)); // true
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isPassword');
}

if (!RegExp.isMoney) {
    /**
     * 是否货币（允许负数、若有小数点则精确小数点后两位）
     * @param {string} value
     * @param {boolean} [isThousand] 千分位分隔符（“,”英文逗号）
     * @return {boolean}
     */
    RegExp.isMoney = function(value, isThousand) {
        if (isThousand) {
            return /(^[-]?[1-9]((\d{0,2}$)|(\d{0,2}(\,\d{3})*$|((\d{0,2})(\,\d{3})*(\.\d{1,2}$)))))|(^[0](\.\d{1,2})?$)|(^[-][0]\.\d{1,2}$)/i.test(value);
        } else {
            return /((^[-]?([1-9]\d*))|^0)(\.\d{1,2})?$|(^[-]0\.\d{1,2}$)/i.test(value);
        }
    };

    // 示例 RegExp.isMoney
    // console.log(RegExp.isMoney('10000')); // true
    // console.log(RegExp.isMoney('10000.00')); // true
    // console.log(RegExp.isMoney('10,000')); // false
    // console.log(RegExp.isMoney('10,000.00')); // false
    // console.log(RegExp.isMoney('10,000', 1)); // true
    // console.log(RegExp.isMoney('10,000.00', 1)); // true
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isMoney');
}

if (!RegExp.isNumber) {
    /**
     * 是否数字（n位的数字）
     * @param {string} value
     * @param {number} [length] 数字长度
     * @return {boolean}
     */
    RegExp.isNumber = function(value, length) {
        var regEx;
        if (length) {
            regEx = new RegExp('^\\d{'+length+'}$', 'm');
        } else {
            regEx = new RegExp('^[0-9]*$', 'm');
        }
        return regEx.test(value);
    };

    // 示例 RegExp.isNumber
    // console.log(RegExp.isNumber(123)); // true
    // console.log(RegExp.isNumber('123')); // true
    // console.log(RegExp.isNumber('abc')); // false
    //
    // console.log(RegExp.isNumber(123, 3)); // true
    // console.log(RegExp.isNumber(1234, 3)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isNumber');
}

if (!RegExp.isRangeNumber) {
    /**
     * 是否数字（m-n位的数字）
     * @param {string} value
     * @param {number} min
     * @param {number} max
     * @return {boolean}
     */
    RegExp.isRangeNumber = function(value, min, max) {
        var regEx;
        if (min && max) { // m-n位的数字：^\d{m,n}$
            regEx = new RegExp('^\\d{' + min + ',' + max + '}$', 'm');
        } else if (min) { // 至少n位的数字：^\d{n,}$
            regEx = new RegExp('^\\d{'+min+',}$', 'm');
        } else {
            regEx = new RegExp('^[0-9]*$', 'm');
        }
        return regEx.test(value);
    };

    // 示例 RegExp.isRangeNumber
    // console.log(RegExp.isRangeNumber(123, 1, 3)); // true
    // console.log(RegExp.isRangeNumber(1234, 1, 3)); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'RegExp.isRangeNumber');
}

/**
 * String 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
 */

if (!String.prototype.firstUpperCase) {
    /**
     * 字符串首字母转大写
     * （CSS实现text-transform: capitalize;）
     * @param {boolean} [isPerword] 每个单词首字母大写
     * @return {string}
     */
    String.prototype.firstUpperCase = function(isPerword) {
        if (isPerword) { // 输出：Hello World
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

    // 示例 String.prototype.firstUpperCase
    // console.log('hello world'.firstUpperCase()); // Hello world
    // console.log('HELLO WORLD'.firstUpperCase()); // Hello world
    // console.log('hello world'.firstUpperCase(1)); // Hello World
    // console.log('HELLO WORLD'.firstUpperCase(1)); // Hello World
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.firstUpperCase');
}

if (!String.prototype.cnLength) {
    /**
     * 获取字符串的长度（全角算两个字符）
     * @return {number}
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

    // 示例 String.prototype.cnLength
    // var str = 'hello';
    // console.log(str.length); // 5
    // console.log(str.cnLength()); // 5
    // var str = 'hello你好';
    // console.log(str.length); // 7
    // console.log(str.cnLength()); // 9
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.cnLength');
}

if (!String.prototype.cnSubstr) {
    /**
     * 截取字符串（中文占2个字符）
     * @param {number} length 截取长度
     * @return {string}
     */
    String.prototype.cnSubstr = function(length) {
        var _tmp = this;
        if (_tmp.replace(/[\u4e00-\u9fa5]/g, '**').length <= length) {
            return this;
        }

        var _len = 0;
        var _str = '';
        for (var i = 0, n = _tmp.length; i < n; i ++) { // 遍历字符串
            if (/[\u4e00-\u9fa5]/.test(_tmp[i])) { // 中文 长度为两字节
                _len += 2;
            } else {
                _len += 1;
            }

            if (_len > length) {
                break;
            } else {
                _str += this[i];
            }
        }

        return _str;
    };

    // 示例 String.prototype.cnSubstr
    // console.log('生命在于折腾'.cnSubstr(4)); // 生命
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.cnLength');
}

if (!String.prototype.replaceAll) {
    /**
     * 全部替换
     * @param {string} findStr 查找的字符串
     * @param {string} replaceStr 替换的字符串
     * @param {boolean} [ignoreCase] 大小写忽略
     * @return {string}
     */
    String.prototype.replaceAll = function(findStr, replaceStr, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(findStr)) {
            return this.replace(new RegExp(findStr, (ignoreCase ? 'gi' : 'g')), replaceStr);
        } else {
            return this.replace(findStr, replaceStr);
        }
    };

    // 示例 String.prototype.replaceAll
    // var str = 'Hello China, Hello World';
    // console.log(str.replace('Hello', 'Welcome to')); // Welcome to China, Hello World
    // console.log(str.replaceAll('hello', 'Welcome to', true)); // Welcome to China, Welcome to World
    // console.log(str.replace(/hello/gi, 'Welcome to')); // Welcome to China, Welcome to World
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.replaceAll');
}

if (!String.prototype.trimCRLF) {
    /**
     * 去除回车换行符号
     * @return {string}
     */
    String.prototype.trimCRLF = function() {
        return this.replaceAll('(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))', '');
    };

    // 示例 String.prototype.trimCRLF
    // var str = '\r\nhe\n';
    // console.log('去除前=' + str); // \r\nhe\n
    // console.log('去除后=' + str.trimCRLF()); // he
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.trimCRLF');
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

    // 示例 String.prototype.reverse
    // var str = 'abcdefg';
    // console.log(str + ' 反转为 ' + str.reverse()); // gfedcba
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.reverse');
}

if (!String.prototype.contains) {
    /**
     * 字符串是否包含指定内容
     * @param {string} chr
     * @return {boolean}
     */
    String.prototype.contains = function(chr) {
        return this.indexOf(chr) > -1;
    };

    // 示例 String.prototype.contains
    // var str = 'Welcome to Beijing!';
    // console.log(str.contains('Beijing')); // true
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.contains');
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

    // 示例 String.prototype.format
    // var str = 'I love {0}, but I don\'t love {1}';
    // console.log(str.format('China', 'Japan')); // I love China, but I don't love Japan
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.format');
}

if (!String.prototype.getNumber) {
    /**
     * 提取数字（支持浮点数）
     * @return {array}
     */
    String.prototype.getNumber = function() {
        return this.match(/\d+.\d+/g);
    };

    // 示例 String.prototype.getNumber
    // var str = 'Version 1.0, released in 1996';
    // console.log(str.getNumber()); // [ '1.0', '1996' ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.getNumber');
}

if (!String.prototype.removeNumber) {
    /**
     * 去掉数字（支持浮点数）
     * @return {string}
     */
    String.prototype.removeNumber = function(hasFloat) {
        return this.replace(/\d+.\d+/g, '');
    };

    // 示例 String.prototype.removeNumber
    // var str = 'Version 1.0, released in 1996';
    // console.log(str.removeNumber()); // Version , released in
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.removeNumber');
}

if (!String.prototype.getChinese) {
    /**
     * 提取中文
     * @return {array}
     */
    String.prototype.getChinese = function() {
        return this.match(/[\u4e00-\u9fa5\uf900-\ufa2d]+/g);
    };

    // 示例 String.prototype.getChinese
    // var str = 'Welcome to 中国';
    // console.log(str.getChinese()); // [ '中国' ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.getChinese');
}

if (!String.prototype.removeChinese) {
    /**
     * 去掉中文
     * @return {string}
     */
    String.prototype.removeChinese = function() {
        return this.replace(/[\u4e00-\u9fa5\uf900-\ufa2d]/g, '');
    };

    // 示例 String.prototype.removeChinese
    // var str = 'Welcome to 中国';
    // console.log(str.removeChinese()); // Welcome to
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.removeChinese');
}

if (!String.prototype.getEnglish) {
    /**
     * 提取英文
     * @return {array}
     */
    String.prototype.getEnglish = function() {
        return this.match(/[A-Za-z]+/g);
    };

    // 示例 String.prototype.getEnglish
    // var str = 'Welcome to 中国';
    // console.log(str.getEnglish()); // [ 'Welcome', 'to' ]
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.getEnglish');
}

if (!String.prototype.removeEnglish) {
    /**
     * 去掉英文
     * @return {string}
     */
    String.prototype.removeEnglish = function() {
        return this.replace(/[A-Za-z]/g, '');
    };

    // 示例 String.prototype.removeEnglish
    // var str = 'Welcome to 中国';
    // console.log(str.removeEnglish()); //   中国
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.removeEnglish');
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

    // 示例 String.prototype.filename
    // var str = 'D:/bearsu/workspace/hellojs/extensions/polyfill.js';
    // console.log(str.filename()); // polyfill.js
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.filename');
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

    // 示例 String.prototype.extname
    // var str = 'D:/bearsu/workspace/hellojs/extensions/polyfill.js';
    // console.log(str.extname()); // .js
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.extname');
}

if (!String.prototype.toInt) {
    /**
     * 字符串转整型
     * @return {string}
     */
    String.prototype.toInt = function() {
        return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
    };

    // 示例 String.prototype.toInt
    // console.log(typeof '123'.toInt()); // number: 123
    // console.log(typeof 'abc'.toInt()); // string: abc
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.toInt');
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

    // 示例 String.prototype.resetBlank
    // console.log('hello      world'.resetBlank()); // hello world
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'String.prototype.resetBlank');
}
