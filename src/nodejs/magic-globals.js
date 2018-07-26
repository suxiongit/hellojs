/*
 * 定义全局变量：
 * __stack
 * __line
 * __file => /Users/suxiong/example.js
 * __basename => /Users/suxiong/example
 * __ext => js
 * __function
 * __meta => {}
 *
 * 原生支持：
 * __filename => /Users/suxiong/example.js
 * __dirname => /Users/suxiong
 *
 * 参考：
 * http://goo.gl/wwjGVV and http://goo.gl/umq4s1
 * https://gist.github.com/lordvlad/ec81834ddff73aaa1ab0
 * https://gist.github.com/gavinengel/8572856
 * https://gist.github.com/branneman/8048520
 * https://www.npmjs.com/package/magic-globals
 *
 * define __base in your index.js or app.js：
 * if (!global.__base) { global.__base = __dirname + '/'; }
 *
 * for __get and __set check out: https://www.npmjs.com/package/magic
 *
 * todo: __method, __class/__constructor
 */

if (!global.hasOwnProperty('__stack')) {
    /**
     * 打印当前的堆栈信息
     */
    Object.defineProperty(global, '__stack', {
        get: function() {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack) { return stack; };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__stack');
}

if (!global.hasOwnProperty('__line')) {
    /**
     * 打印当前的行号
     */
    Object.defineProperty(global, '__line', {
        get: function() {
            return __stack[1].getLineNumber();
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__line');
}

if (!global.hasOwnProperty('__file')) {
    /**
     * 打印当前的文件名（带文件扩展名）
     */
    Object.defineProperty(global, '__file', {
        get: function() {
            return __stack[1].getFileName().split('/').slice(-1)[0];
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__file');
}

if (!global.hasOwnProperty('__basename')) {
    /**
     * 打印当前的文件名（不带文件扩展名）
     */
    Object.defineProperty(global, '__basename', {
        get: function() {
            return __filename.split('/').slice(-1)[0].split('.').slice(0, -1).join('.');
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__basename');
}

if (!global.hasOwnProperty('__ext')) {
    /**
     * 打印当前的文件扩展名
     */
    Object.defineProperty(global, '__ext', {
        get: function() {
            return __filename.split('.').slice(-1)[0];
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__ext');
}

if (!global.hasOwnProperty('__function')) {
    /**
     * 打印当前的函数名
     */
    Object.defineProperty(global, '__function', {
        get: function(){
            return arguments.callee.caller && arguments.callee.caller.name || '(anonymous)';
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__function');
}

if (!global.hasOwnProperty('__meta')) {
    /**
     * 打印当前的文件所有信息
     */
    Object.defineProperty(global, '__meta', {
        get: function() {
            var meta = {};
            try {
                let index = 2;
                if (__stack.length <= index) {
                    index = Math.max(__stack.length - 1, 0);
                }
                let targetStack = __stack[index];
                if (targetStack) {
                    let properties = {
                        column: "getColumnNumber",
                        origin: "getEvalOrigin",
                        file_name: "getFileName",
                        function: "getFunction",
                        func_name: "getFunctionName",
                        line: "getLineNumber",
                        method_name: "getMethodName",
                        position: "getPosition",
                        script_name_or_source_url: "getScriptNameOrSourceURL",
                        self: "getThis",
                        type_name: "getTypeName",
                        is_constructor: "isConstructor",
                        is_eval: "isEval",
                        is_native: "isNative",
                        is_top_level: "isToplevel"
                    }
                    Object.keys(properties).forEach(key => {
                        meta[key] = targetStack[properties[key]]();
                    });
                }
            } catch (e) {
                console.error('MagicGlobals Error: ', e);
            }
            return meta;
        }
    });
} else {
    console.warn('MagicGlobals Error: \'%s\' already exists.', '__meta');
}

// 测试
console.log('__stack', __stack);
console.log('__line', __line);
console.log('__file', __file);
console.log('__basename', __basename);
console.log('__ext', __ext);
console.log('__function', __function);
console.log('__meta', __meta);
console.log('__filename', __filename);
console.log('__dirname', __dirname);
