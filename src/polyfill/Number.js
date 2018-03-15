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
		if (this <= 0) return [];
	    var numbers = this.toString(2);
	    numbers = numbers.split('');
	    for (var i = 0, n = numbers.length; i < n; i ++) {
			numbers[i] = Math.pow(2, n - i - 1);
	    }
	    return numbers;
	};

    // 示例
    // console.log(Number(15).splitPow()); // [ 8, 4, 2, 1 ]
	// console.log(Number(0).splitPow()); // []
}
