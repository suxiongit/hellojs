/**
 * Created by suxiong on 2017/3/1.
 * 对象原型扩展测试
 */

require('./extensions/prototype.js');

/**
 * 数组中是否存在指定的值
 */
function testArrayContains() {
    var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    console.log(countries.contains('中国'));//true
    console.log(countries.contains('日本'));//false
}
// testArrayContains();


function testArrayForEach() {
    var countries = [];
    countries.push('美国');
    countries.push('俄罗斯');
    countries.push('英国');
    countries.push('法国');
    countries.push('中国');
    countries.forEach(function(item) {
        console.log(item);
    });
}
// testArrayForEach();

