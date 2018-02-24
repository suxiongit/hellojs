/**
 * Array 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

if (!Array.prototype.contains) {
    /**
     * 数组中是否存在指定的值
     * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
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
            throw new TypeError('"this" is null or not defined');
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

    // 示例
    // var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    // for (var i = 0; i < 10; i ++) {
    //     console.log(items.random());
    // }
}

if (!Array.prototype.shuffle) {
    /**
     * 数组随机排序
     * @alias Array.prototype.random(length)
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
            if (Object.isType(value, 'String')) {
                value = value.trim();
            }
            return value;
        });
    };

    // 示例
    // var arr = ['a', '', 'b', ' ', 'c', '  ', 'd', , 'e', 0];
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
    // var arr = ['1', 1, 2];
    // var arr2 = arr.unique();
    // console.log(arr); // [ '1', 1, 2 ]
    // console.log(arr2); // [ '1', 2 ]
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
            throw new TypeError('Parameter "arr1" or "arr2" is not an array'); // 参数“arr1”和“arr2”不是一个数组
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

        // ES6写法
        // return [...this];
    };

    // 示例
    // var arr = ['a', 'b', 'c', 'd'];
    // var arr2 = arr.copy();
    // console.log(arr2); // [ 'a', 'b', 'c', 'd' ]
}

if (!Array.prototype.numberSort) {
    /**
     * 数字数组排序
     * @param descOrder 排序（0 升序、1 降序）
     * @return {Array.<*>}
     */
    Array.prototype.numberSort = function(descOrder) {
        return this.sort(function(a, b) {
            return descOrder ? b - a : a - b;
        });
    };

    // 示例
    // console.log([1, 10, 21, 2].sort()); // [ 1, 10, 2, 21 ]
    // console.log([1, 10, 21, 2].numberSort()); // [ 1, 2, 10, 21 ]
    // console.log([1, 10, 21, 2].numberSort(1)); // [ 21, 10, 2, 1 ]
}