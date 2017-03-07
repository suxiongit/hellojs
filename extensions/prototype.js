/**
 * Created by p_bearsu on 2017/3/1.
 * 对象原型扩展
 */

// Array 类型扩展

/**
 * 数组中是否存在指定的值
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i --) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

// 示例
// var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
// console.log(countries.contains('中国'));//true
// console.log(countries.contains('日本'));//false


