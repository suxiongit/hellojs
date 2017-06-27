/**
 * 后台常用方法（服务器使用）
 * @author p_bearsu
 * @date 2017/6/7
 */

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
// for (var i = 0; i < 10; i ++) {
//     console.log(uuid());
// }


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

