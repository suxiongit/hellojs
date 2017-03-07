/**
 * Created by p_bearsu on 2017/3/1.
 * 对象原型扩展测试
 */

require('./extensions/prototype.js');

function testContains() {
    var countries = ['美国', '俄罗斯', '英国', '法国', '中国'];
    console.log(countries.contains('中国'));//true
    console.log(countries.contains('日本'));//false
}
testContains();

