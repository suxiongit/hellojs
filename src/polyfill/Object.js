/**
 * Object 类型扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

if (!Object.clone) {
    /**
     * 克隆对象
     * @param {object} obj
     * @return {object}
     */
    Object.clone = function(obj) {
        return Object.assign({}, obj);
    };

    // 示例 Object.clone
    // var obj = { a: 1 };
    // var copy = Object.clone(obj);
    // obj.a = 2;
    // console.log(copy); // { a: 1 }
}

if (!Object.isEmpty) {
    /**
     * 是否为空
     * @param {object} obj
     * @return {boolean}
     */
    Object.isEmpty = function(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    // 示例 Object.isEmpty
    // console.log(Object.isEmpty()); // true
    // console.log(Object.isEmpty({})); // true
    // console.log(Object.isEmpty(null)); // true
    // console.log(Object.isEmpty(0)); // true
    // console.log(Object.isEmpty(1)); // true
    // console.log(Object.isEmpty({'a': 1})); // false
}

if (!Object.isType) {
    /**
     * 判断对象类型
     * @param {object} obj
     * @param {string} type 对象类型（Undefined、Null、Boolean、String、Number、Array、Object、Function、Date）
     * @param {boolean} [illegal] 默认false 参数type不合法抛出错误，true 忽略参数type不合法错误
     * @return {boolean}
     */
    Object.isType = function(obj, type, illegal) {
        type = String(type).firstUpperCase();
        var legal = [
            'Undefined',
            'Null',
            'Boolean',
            'String',
            'Number',
            'Array',
            'Object',
            'Function',
            'Date',
        ];
        if (!illegal && !legal.contains(type)) {
            throw new TypeError('Parameter "type" value is illegal'); // 参数“type”值是不合法的
        }
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };

    // 示例 Object.isType
    // console.log(Object.isType(undefined, 'Undefined')); // Undefined: true
    // console.log(Object.isType(null, 'Null')); // Null: true
    // console.log(Object.isType(true, 'Boolean')); // Boolean: true
    // console.log(Object.isType("foobar", 'String')); // String: true
    // console.log(Object.isType(123, 'Number')); // Number：true
    // console.log(Object.isType([1, 2, 3], 'Array')); // Array: true
    // console.log(Object.isType({foo: 123}, 'Object')); // Object: true
    // console.log(Object.isType(Object.isEmpty, 'Function')); // Function: true
    // console.log(Object.isType(new Date(), 'Date')); // Date: true

    // illegal
    // console.log(Object.isType(1, 'test')); // TypeError: Parameter "type" value is illegal
    // console.log(Object.isType(1, 'test', 1)); // false
}

if (!Object.prototype.remove) {
    /**
     * 删除对象属性
     * @param {array} keys 要删除的属性
     * @return {array} 返回删除属性之后的对象
     */
    Object.prototype.remove = function(keys) {
        if (!keys) return;
        var that = this;
        keys.forEach(function(key) {
            delete(that[key]);
        });
    };

    // 示例 Object.prototype.remove
    // var obj = {'name': 'zs', 'age': 17, 'car': 'suzuki'};
    // obj.remove(['age', 'car']);
    // console.log(obj); // { name: 'zs' }
}
