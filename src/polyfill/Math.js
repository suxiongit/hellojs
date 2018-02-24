/**
 * Math 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math
 */

// Math.random() 获取0-1之间的随机数（带小数点）

if (!Math.randomArbitrary) {
    /**
     * 获取min到max之间的随机数（带小数点）
     * @param min
     * @param max
     * @return {Number}
     */
    Math.randomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(0, 1)); // 0.5650337204284932
    // }
    //
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomArbitrary(1, 2)); // 1.2152592913032378
    // }
}

if (!Math.randomInt) {
    /**
     * 获取min到max之间的随机整数
     * @param min
     * @param max
     * @param inclusive 包含max
     * @return {*}
     */
    Math.randomInt = function(min, max, inclusive) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var seed = inclusive ? (max - min + 1): (max - min);
        return Math.floor(Math.random() * seed) + min;
    };

    // 示例
    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10)); // 1-9
    // }

    // for (var i = 0; i < 10; i ++) {
    //     console.log(Math.randomInt(1, 10, 1)); // 1-10
    // }
}