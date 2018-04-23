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
