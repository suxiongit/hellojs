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
