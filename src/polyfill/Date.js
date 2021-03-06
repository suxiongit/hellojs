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
