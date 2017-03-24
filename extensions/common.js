/**
 * Created by suxiong on 2017/3/9.
 *
 */

// Math.random() 随机数

/**
 * 获取0-1之间的随机数（带小数点）
 * @returns {number}
 */
function getRandom() {
    return Math.random();
}

/**
 * 获取min到max之间的随机数（带小数点）
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 获取min到max之间的随机整数
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 获取min到max之间的随机整数（包含max）
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 示例
// for (var i = 0; i < 1000; i ++) {
    // console.log(getRandom());
    // console.log(getRandomArbitrary(1, 9));
    // console.log(getRandomInt(1, 9));
    // console.log(getRandomIntInclusive(1, 9));
// }


/**
 * 获取Url参数值
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    // var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
    // var r = window.location.search.substr(1).match(reg);//匹配目标参数
    // if (r != null) return unescape(r[2]); return null; //返回参数值

    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 * 判断是否PC访问
 * @returns {boolean}
 */
function isPC() {
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
}

// 示例
// if (isPC()) {
//     console.log('PC');
// } else {
//     console.log('移动设备');
// }

/**
 * 生成UUID
 * @param prefix
 * @returns {string}
 */
function uuid(prefix) {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    if (prefix) {
        uuid = prefix + uuid;
    }
    return uuid;
}

// 示例
// console.log(uuid());
// console.log(uuid('uuid-'));

/**
 * 生成唯一ID
 * @param length
 * @returns {string}
 */
function genNonDuplicateID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

// 示例
// for (var i = 0; i < 10; i ++) {
//     console.log(genNonDuplicateID());
// }

/**
 * 根据日期计算年龄
 * @param dateString
 * @returns {number}
 */
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// 示例
console.log(getAge('1989,02,17'));