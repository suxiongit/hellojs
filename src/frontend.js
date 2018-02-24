/**
 * 前端常用方法（浏览器使用）
 * @author p_bearsu
 * @date 2017/6/7
 */

/**
 * 判断是否PC访问
 * @returns {boolean}
 */
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var v = 0; v < agents.length; v++) {
        if (userAgentInfo.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

// 示例
// if (isPC()) {
//     console.log('PC');
// } else {
//     console.log('移动设备');
// }

/**
 * 获取Url参数值
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    // var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
    // var r = window.location.search.substr(1).match(reg);//匹配目标参数
    // if (r != null) return unescape(r[2]); return null; //返回参数值

    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 * 获取浏览器类型及主版本
 * @returns {{}}
 */
function getBrowserInfo() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject) {
        Sys.b = 'ie';
        Sys.v = parseInt(ua.match(/msie ([\d.]+)/)[1]);
    }
    else if (document.getBoxObjectFor) {
        Sys.b = 'firefox';
        Sys.v = parseInt(ua.match(/firefox\/([\d.]+)/)[1]);
    }
    else if (window.MessageEvent && !document.getBoxObjectFor) {
        Sys.b = 'chrome';
        Sys.v == parseInt(ua.match(/chrome\/([\d.]+)/)[1]);
    }
    else if (window.opera) {
        Sys.b = 'opera';
        Sys.v == parseInt(ua.match(/opera.([\d.]+)/)[1]);
    }
    else if (window.openDatabase) {
        Sys.b = 'safari';
        Sys.v == parseInt(ua.match(/version\/([\d.]+)/)[1]);
    }
    return Sys;
}

// 示例
// var bi = getBrowserInfo();
// document.write('Browser:'+bi.b+'    Version:'+bi.v);//Browser:ie Version:10

/**
 * 设置cookie值
 * @param name
 * @param value
 * @param msec (1h * 60min * 60s * 1000ms)
 */
function setCookie(name, value, msec) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + msec);
    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString() + ';domain=360doc.com;';
}

/**
 * 获取cookie值
 * @param name
 * @return {null}
 */
function getCookie(name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) return unescape(arr[2]);
    return null
}

/**
 * 加入收藏夹
 * @param sURL
 * @param sTitle
 * @constructor
 */
function addFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}

/**
 * 设为首页
 * @param homeurl
 */
function setHomepage(homeurl) {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(homeurl)
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', homeurl)
    }
}

