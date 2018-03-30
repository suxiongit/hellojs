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
}

if (!Number.prototype.withZero) {
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
}
