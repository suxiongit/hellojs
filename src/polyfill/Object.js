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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.clone');
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.isEmpty');
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
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.isType');
}

if (!Object.prototype.remove) {
    /**
     * 删除对象属性
     * @param {array} arr 要删除的属性
     * @return {array} 返回删除属性之后的对象
     */
    Object.prototype.remove = function(arr) {
        if (!arr) return;
        var that = this;
        arr.forEach(function(name) {
            delete(that[name]);
        });
    };

    // 示例 Object.prototype.remove
    // var obj = {'name': 'zs', 'age': 17, 'car': 'suzuki'};
    // obj.remove(['age', 'car']);
    // console.log(obj); // { name: 'zs' }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.remove');
}

if (!Object.prototype.extend) {
    /**
     * 扩展对象
     * @param {object} obj 要扩展的对象
     */
    Object.prototype.extend = function(obj) {
        if (!obj) return;
        for(var name in obj) {
            if (obj.hasOwnProperty(name)) {
                this[name] = obj[name];
            }
        }
    };

    // 示例 Object.prototype.extend
    // var objA = {'name': 'colin', 'car': 'suzuki'};
    // var objB = {'name': 'james', 'age': 17};
    // objA.extend(objB);
    // console.log(objA); // { name: 'james', car: 'suzuki', age: 17 }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.extend');
}

if (!Object.prototype.pick) {
    /**
     * 从对象中选择属性组成新的对象
     * @param {array} arr 选择的属性
     * @return {array}
     */
    Object.prototype.pick = function(arr) {
        if (!arr) return {};
        var that = this, obj = {};
        arr.forEach(function(name) {
            obj[name] = that[name];
        });
        return obj;
    };

    // 示例 Object.prototype.pick
    // var objA = {'name': 'colin', 'car': 'suzuki', 'age': 17};
    // var objB = objA.pick(['car', 'age']);
    // console.log(objB); // { car: 'suzuki', age: 17 }
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.equals');
}

if (!Object.prototype.equals) {
    /**
     * 对象比较
     * @param {object} object2 比较的目标对象
     * @return {boolean}
     */
    Object.prototype.equals = function(object2) {
        // For the first loop, we only check for types
        for (var propName in this) {
            // Check for inherited methods and properties - like .equals itself
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            // Return false if the return value is different
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            // Check instance type
            else if (typeof this[propName] != typeof object2[propName]) {
                // Different types => not equal
                return false;
            }
        }
        // Now a deeper check using other objects property names
        for (var propName in object2) {
            // We must check instances anyway, there may be a property that only exists in object2
            // I wonder, if remembering the checked values from the first loop would be faster or not
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            else if (typeof this[propName] != typeof object2[propName]) {
                return false;
            }
            // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
            if (!this.hasOwnProperty(propName))
                continue;

            // Now the detail check and recursion

            // This returns the script back to the array comparing
            /**REQUIRES Array.equals**/
            if (this[propName] instanceof Array && object2[propName] instanceof Array) {
                // recurse into the nested arrays
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
                // recurse into another objects
                // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            // Normal value comparison for strings and numbers
            else if (this[propName] != object2[propName]) {
                return false;
            }
        }
        // If everything passed, let's say YES
        return true;
    }

    // 示例 Object.prototype.equals
    // console.log({a:1, b:2}.equals({a:1, b:2})); // true
    // console.log({a:1, b:2}.equals({a:3, b:4})); // false
    // console.log({a:1, b:2}.equals({a:1})); // false
} else {
    console.warn('Polyfill Error: \'%s\' already exists.', 'Object.prototype.equals');
}
