/**
 * Created by p_bearsu on 2017/3/1.
 * 对象原型扩展
 */

// Array 类型扩展

if (!Array.prototype.contains) {
    /**
     * 数组中是否存在指定的值
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
     * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
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
            "M+" : this.getMonth() + 1,
            "d+" : this.getDate(),
            "h+" : this.getHours(),
            "m+" : this.getMinutes(),
            "s+" : this.getSeconds(),
            "q+" : Math.floor((this.getMonth() + 3) / 3),
            "S+" : this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '')
                .substr(4 - RegExp.$1.length));
        }
        for ( var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k]
                    : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    // 示例
    // var newDate = new Date('2014-07-10 10:21:12');
    // console.log(newDate.format('yyyy年MM月dd日 h时m分s秒'));
}

