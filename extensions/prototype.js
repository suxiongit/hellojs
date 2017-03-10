/**
 * Created by suxiong on 2017/3/1.
 * 对象原型扩展
 */

// Array 类型扩展

if (!Array.prototype.contains) {
    /**
     * 数组中是否存在指定的值
     * @see Array.prototype.includes(searchElement, fromIndex)
     * 参考https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
     * @param obj
     * @returns {boolean}
     */
    Array.prototype.contains = function(element) {
        var i = this.length;
        while (i --) {
            if (this[i] === element) {
                return true;
            }
        }
        return false;
    }

    // 示例
    // var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    // console.log(countries.contains('中国'));//true
    // console.log(countries.contains('日本'));//false
}

if (!Array.prototype.forEach) {
    /**
     * 数组循环遍历
     * （让IE兼容forEach方法）
     * 参考https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
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
    }

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


// Date 类型扩展

if (!Date.prototype.format) {
    /**
     * 日期时间格式化
     * @param format
     * @returns {*}
     */
    Date.prototype.format = function(format) {
        var date = {
            'M+' : this.getMonth() + 1,
            'd+' : this.getDate(),
            'h+' : this.getHours(),
            'm+' : this.getMinutes(),
            's+' : this.getSeconds(),
            'q+' : Math.floor((this.getMonth() + 3) / 3),
            'S+' : this.getMilliseconds()
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
    }

    // 示例
    // var newDate = new Date('2014-07-10 10:21:12');
    // console.log(newDate.format('yyyy年MM月dd日 h时m分s秒'));
}


// String 类型扩展

if (!String.prototype.firstUpperCase) {
    /**
     * 字符串首字母转大写
     * （CSS实现text-transform: capitalize;）
     * @param perword
     * @returns {string}
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
    }

    // 示例
    // console.log('hello world'.firstUpperCase());
    // console.log('HELLO WORLD'.firstUpperCase());
    // console.log('hello world'.firstUpperCase(1));
    // console.log('HELLO WORLD'.firstUpperCase(1));
}

if (!String.prototype.cnLength) {
    /**
     * 获取字符串的长度（全角算两个字符）
     * @returns {Number}
     */
    String.prototype.cnLength = function() {
        // return this.replace(/[^\x00-\xff]/g, '^^').length;

        var L = this.length;
        var T = this.match(/[^\x00-\x80]/ig);
        if (T) {
            L += T.length;
        }
        return L;
    }

    // 示例
    // var str = 'hello';
    // console.log(str.length);
    // console.log(str.cnLength());
    // var str = 'hello你好';
    // console.log(str.length);
    // console.log(str.cnLength());
}

