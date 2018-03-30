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
     * @param {string} format
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
     * @param {string} date
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

    // 示例 Date.prototype.isLeapYear
    // var newDate = new Date('2016');
    // console.log(newDate + ' 是否闰年 ' + newDate.isLeapYear()); // true
    // var newDate2 = new Date();
    // console.log(newDate2 + ' 是否闰年 ' + Date.prototype.isLeapYear(newDate2)); // false
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
}

if (!Date.prototype.diff) {
    /**
     * 计算时间差
     * @param {string} interval
     * @param {Date} target 目标时间
     * @return {number|undefined}
     */
    Date.prototype.diff = function(interval, target) {
        // 若参数不匹配或 target 不是日期类型則回传 undefined
        if (arguments.length < 2 || target.constructor != Date) { return undefined; }
        switch (interval) {
            //计算秒差
            case 's': return parseInt((target - this) / 1000);
            //计算分差
            case 'n': return parseInt((target - this) / 60000);
            //计算時差
            case 'h': return parseInt((target - this) / 3600000);
            //计算日差
            case 'd': return parseInt((target - this) / 86400000);
            //计算周差
            case 'w': return parseInt((target - this) / (86400000 * 7));
            //计算月差
            case 'm': return (target.getMonth() + 1) + ((target.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
            //计算年差
            case 'y': return target.getFullYear() - this.getFullYear();
            //输入有误
            default: return undefined;
        }
    };

    // 示例 Date.prototype.diff
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

    // 示例 Date.prototype.toCNDate
    // var nowDate = new Date();
    // console.log('默认格式', nowDate); // 默认格式 2017-06-19T09:43:57.174Z
    // console.log('中文格式', nowDate.toCNDate()); // 中文格式 2017年05月19日17时43分57秒  星期一
}
