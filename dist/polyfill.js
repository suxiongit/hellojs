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

/**
 * Base64 编码对象
 */

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
};

// 示例
// console.log(Base64.encode("Test")); //VGVzdA==
// console.log(Base64.decode("VGVzdA==")); // Test

/**
 * Browser 对象实现
 */

var Browser = {

	/**
	 * 判断是否PC访问
	 * @return {Boolean}
	 */
	isPC: function() {
	    var userAgentInfo = navigator.userAgent;
	    var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	    var flag = true;
	    for (var v = 0; v < agents.length; v++) {
	        if (userAgentInfo.indexOf(agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	},

	/**
	 * 获取Url参数值
	 * @param  {String} name 参数名称
	 * @return {String}      返回参数值
	 */
	getUrlParam: function(name) {
	    // var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
	    // var r = window.location.search.substr(1).match(reg);//匹配目标参数
	    // if (r != null) return unescape(r[2]); return null; //返回参数值

	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},

	/**
	 * 获取浏览器类型及主版本
	 * @return {Object} 返回包含浏览器和版本的对象
	 */
	getBrowserInfo: function() {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    if (window.ActiveXObject) {
	        Sys.b = 'ie';
	        Sys.v = parseInt(ua.match(/msie ([\d.]+)/)[1]);
	    }
	    else if (document.getBoxObjectFor) {
	        Sys.b = 'firefox';
	        Sys.v = parseInt(ua.match(/firefox\/([\d.]+)/)[1]);
	    }
	    else if (window.MessageEvent && !document.getBoxObjectFor) {
	        Sys.b = 'chrome';
	        Sys.v == parseInt(ua.match(/chrome\/([\d.]+)/)[1]);
	    }
	    else if (window.opera) {
	        Sys.b = 'opera';
	        Sys.v == parseInt(ua.match(/opera.([\d.]+)/)[1]);
	    }
	    else if (window.openDatabase) {
	        Sys.b = 'safari';
	        Sys.v == parseInt(ua.match(/version\/([\d.]+)/)[1]);
	    }
	    return Sys;
	},

	/**
	 * 设置cookie值
	 * @param  {String} name   缓存名称
	 * @param  {String} value  缓存值
	 * @param  {Number} msec   缓存时间（毫秒，例如：一小时=1h * 60min * 60s * 1000ms）
	 * @param  {String} domain 缓存域名
	 */
	setCookie: function(name, value, msec, domain) {
	    var d = new Date();
	    var offset = 8;
	    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	    var nd = utc + (3600000 * offset);
	    var exp = new Date(nd);
	    exp.setTime(exp.getTime() + msec);
	    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString() + ';domain=' + domain + ';';
	},

	/**
	 * 获取cookie值
	 * @param  {String} name 缓存名称
	 * @return {String}      缓存值
	 */
	getCookie: function(name) {
	    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
	    if (arr != null) return unescape(arr[2]);
	    return null
	},

	/**
	 * 加入收藏夹
	 * @param  {String} url   链接
	 * @param  {String} title 标题
	 * @return {Boolean}       返回收藏结果
	 */
	addFavorite: function(url, title) {
	    try {
	        window.external.addFavorite(url, title);
	    } catch (e) {
	        try {
	            window.sidebar.addPanel(title, url, "");
	        } catch (e) {
	            alert("加入收藏失败，请使用Ctrl+D进行添加");
				return false;
	        }
	    }
		return true;
	},

	/**
	 * 设为首页
	 * @param  {String} homeurl 链接
	 * @return {Boolean}
	 */
	setHomepage: function(homeurl) {
	    if (document.all) {
	        document.body.style.behavior = 'url(#default#homepage)';
	        document.body.setHomePage(homeurl);
			return true;
	    } else if (window.sidebar) {
	        if (window.netscape) {
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	            } catch (e) {
	                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
					return false;
	            }
	        }
	        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
	        prefs.setCharPref('browser.startup.homepage', homeurl);
			return true;
	    }
	},
};

// 示例 isPC
// if (isPC()) {
//     console.log('PC');
// } else {
//     console.log('移动设备');
// }

// 示例 getBrowserInfo
// var bi = getBrowserInfo();
// document.write('Browser:'+bi.b+'    Version:'+bi.v);//Browser:ie Version:10

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

    // 示例
    // var newDate = new Date('2014-07-10 10:21:12');
    // console.log(newDate.format('yyyy年MM月dd日 hh时mm分ss秒')); // 2014年07月10日 10时21分12秒
    // var newDate2 = new Date();
    // console.log(newDate2.format('yyyy年MM月dd日 hh时mm分ss秒')); // 2017年04月25日 21时40分32秒
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
    // console.log(Date.getAge('1996-3-1')); // 21
}

if (!Date.prototype.diff) {
    /**
     * 计算时间差
     * @param interval
     * @param objDate 目标时间
     * @return {number|undefined}
     */
    Date.prototype.diff = function(interval, objDate) {
        // 若参数不足或 objDate 不是日期类型則回传 undefined
        if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }
        switch (interval) {
            //计算秒差
            case 's': return parseInt((objDate - this) / 1000);
            //计算分差
            case 'n': return parseInt((objDate - this) / 60000);
            //计算時差
            case 'h': return parseInt((objDate - this) / 3600000);
            //计算日差
            case 'd': return parseInt((objDate - this) / 86400000);
            //计算周差
            case 'w': return parseInt((objDate - this) / (86400000 * 7));
            //计算月差
            case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
            //计算年差
            case 'y': return objDate.getFullYear() - this.getFullYear();
            //输入有误
            default: return undefined;
        }
    };

    // 示例
    // var date1 = new Date('2011-08-10 09:00:00');
    // console.log(date1.format('yyyy-MM-dd hh:mm:ss')); // 2011-08-10 09:00:00
    // var date2 = new Date('2011-08-10 18:00:00');
    // console.log(date2.format('yyyy-MM-dd hh:mm:ss')); // 2011-08-10 18:00:00
    // console.log('相差多少小时', date1.diff('h', date2)); // 9
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

    // 示例
    // var nowDate = new Date();
    // console.log('默认格式', nowDate); // 默认格式 2017-06-19T09:43:57.174Z
    // console.log('中文格式', nowDate.toCNDate()); // 中文格式 2017年05月19日17时43分57秒  星期一
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
     * @param inclusive 包含max
     * @return {*}
     */
    Math.randomInt = function(min, max, inclusive) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var seed = inclusive ? (max - min + 1): (max - min);
        return Math.floor(Math.random() * seed) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10)); // 1-9
    // }

    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10, 1)); // 1-10
    // }
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

if (!Number.prototype.withZero) {
    /**
     * 数字补零
     * @param length 指定长度
     * @return {string}
     */
    Number.prototype.withZero = function(length) {
        var str = this.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    };

    // 示例
    // console.log(Number(7).withZero(3)); // 007
}

if (!Number.prototype.chrW) {
    /**
     * Unicode还原
     * @return {string}
     */
    Number.prototype.chrW = function() {
        return String.fromCharCode(this);
    };

    // 示例
    // console.log(Number(65).chrW()); // A
}

if (!Number.prototype.splitPow) {
    /**
     * 拆分2的次方（幂）
     * @return {Array} 返回数位2的次方数组
     */
    Number.prototype.splitPow = function() {
	    var numbers = this.toString(2);
	    numbers = numbers.split('');
	    for (var i = 0, n = numbers.length; i < n; i ++) {
			numbers[i] = Math.pow(2, n - i - 1);
	    }
	    return numbers;
	};

    // 示例
    // console.log(Number(15).splitPow()); // [ 8, 4, 2, 1 ]
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

if (!Object.isType) {
    /**
     * 判断对象类型
     * @param obj
     * @param type 对象类型
     * @param illegal
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

    // 示例
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
        return /^\d{3,4}-\d{7,8}$/i.test(value);
    };

    // 示例
    // console.log(RegExp.isTel('010-12345678')); // true
    // console.log(RegExp.isTel('12345678')); // false
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

if (!RegExp.isNumber) {
    /**
     * 是否数字（n位的数字）
     * @param value
     * @param num
     * @return {boolean}
     */
    RegExp.isNumber = function(value, num) {
        var regEx;
        if (num) {
            regEx = new RegExp('^\\d{'+num+'}$', 'm');
        } else {
            regEx = new RegExp('^[0-9]*$', 'm');
        }
        return regEx.test(value);
    };

    // 示例
    // console.log(RegExp.isNumber(123)); // true
    // console.log(RegExp.isNumber('123')); // true
    // console.log(RegExp.isNumber('abc')); // false
    //
    // console.log(RegExp.isNumber(123, 3)); // true
    // console.log(RegExp.isNumber(1234, 3)); // false
}

if (!RegExp.isRangeNumber) {
    /**
     * 是否数字（m-n位的数字）
     * @param value
     * @param min
     * @param max
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

    // 示例
    // console.log(RegExp.isRangeNumber(123, 1, 3)); // true
    // console.log(RegExp.isRangeNumber(1234, 1, 3)); // false
}
/**
 * Server 对象实现
 */

var Server = {

	/**
	 * 生成UUID
	 * @param  {String} prefix 增加前缀
	 * @return {String}        返回prefix+uuid
	 */
	uuid: function(prefix) {
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	    if (prefix) {
	        uuid = prefix + uuid;
	    }
	    return uuid;
	},

	/**
	 * 生成唯一ID
	 * @param  {Number} length 指定生成长度
	 * @return {String}        返回指定长度的唯一标识
	 */
	genNonDuplicateID: function(length) {
	    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
	},

};


// 示例 uuid
// console.log(Server.uuid());
// console.log(Server.uuid('uuid-'));
// for (var i = 0; i < 10; i ++) {
//     console.log(Server.uuid());
// }

// 示例 genNonDuplicateID
// for (var i = 0; i < 10; i ++) {
//     console.log(Server.genNonDuplicateID());
// }

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
