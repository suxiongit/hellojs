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
