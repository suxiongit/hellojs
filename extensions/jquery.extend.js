/**
 * jquery扩展
 * @author p_bearsu
 * @date 2017/6/7
 */

var h = {};

/**
 * GET请求
 * @param url
 * @param data
 * @param ok
 * @param error
 */
h.get = function (url, data, ok, error) {
    $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        success: ok,
        error: error
    });
};

/**
 * POST请求
 * @param url
 * @param data
 * @param ok
 * @param error
 */
h.post = function (url, data, ok, error) {
    $.ajax({
        url: url,
        data: data,
        type: 'post',
        dataType: 'json',
        success: ok,
        error: error
    });
};

/**
 * 获取url参数
 * @param url
 * @return {Object}
 */
h.url = function (url) {
    if (!url) {
        url = location.search.substring(1);
    } else {
        url = url.substr(url.indexOf('?') + 1);
    }
    var args = new Object();   // 声明并初始化一个 "类"
    // 获得地址(URL)"?"后面的字符串.
    var query = decodeURI(url);
    var pairs = query.split("&");  // 分割URL(别忘了'&'是用来连接下一个参数)
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue; // 它在找有等号的 数组[i]
        var argname = pairs[i].substring(0, pos); // 参数名字
        var value = pairs[i].substring(pos + 1);  // 参数值
        // 以键值对的形式存放到"args"对象中
        args[argname] = decodeURI(value);
    }
    return args;
};