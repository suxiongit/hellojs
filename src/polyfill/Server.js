/**
 * Server 对象实现
 */

var Server = {

	/**
	 * 生成UUID
	 * @param  {String} prefix 增加前缀
	 * @return {String}        返回prefix+uuid
	 */
	uuid: function(prefix) {
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	    if (prefix) {
	        uuid = prefix + uuid;
	    }
	    return uuid;
	},

	/**
	 * 生成唯一ID
	 * @param  {Number} length 指定生成长度
	 * @return {String}        返回指定长度的唯一标识
	 */
	genNonDuplicateID: function(length) {
	    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
	},

};


// 示例 uuid
// console.log(Server.uuid());
// console.log(Server.uuid('uuid-'));
// for (var i = 0; i < 10; i ++) {
//     console.log(Server.uuid());
// }

// 示例 genNonDuplicateID
// for (var i = 0; i < 10; i ++) {
//     console.log(Server.genNonDuplicateID());
// }
