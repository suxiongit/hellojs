/**
 * Browser 对象实现
 */

var Browser = {

	/**
	 * 判断是否PC访问
	 * @return {Boolean}
	 */
	isPC: function() {
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
	},

	/**
	 * 获取Url参数值
	 * @param  {String} name 参数名称
	 * @return {String}      返回参数值
	 */
	getUrlParam: function(name) {
	    // var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
	    // var r = window.location.search.substr(1).match(reg);//匹配目标参数
	    // if (r != null) return unescape(r[2]); return null; //返回参数值

	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},

	/**
	 * 获取浏览器类型及主版本
	 * @return {Object} 返回包含浏览器和版本的对象
	 */
	getBrowserInfo: function() {
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
	},

	/**
	 * 设置cookie值
	 * @param  {String} name   缓存名称
	 * @param  {String} value  缓存值
	 * @param  {Number} msec   缓存时间（毫秒，例如：一小时=1h * 60min * 60s * 1000ms）
	 * @param  {String} domain 缓存域名
	 */
	setCookie: function(name, value, msec, domain) {
	    var d = new Date();
	    var offset = 8;
	    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	    var nd = utc + (3600000 * offset);
	    var exp = new Date(nd);
	    exp.setTime(exp.getTime() + msec);
	    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString() + ';domain=' + domain + ';';
	},

	/**
	 * 获取cookie值
	 * @param  {String} name 缓存名称
	 * @return {String}      缓存值
	 */
	getCookie: function(name) {
	    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
	    if (arr != null) return unescape(arr[2]);
	    return null
	},

	/**
	 * 加入收藏夹
	 * @param  {String} url   链接
	 * @param  {String} title 标题
	 * @return {Boolean}       返回收藏结果
	 */
	addFavorite: function(url, title) {
	    try {
	        window.external.addFavorite(url, title);
	    } catch (e) {
	        try {
	            window.sidebar.addPanel(title, url, "");
	        } catch (e) {
	            alert("加入收藏失败，请使用Ctrl+D进行添加");
				return false;
	        }
	    }
		return true;
	},

	/**
	 * 设为首页
	 * @param  {String} homeurl 链接
	 * @return {Boolean}
	 */
	setHomepage: function(homeurl) {
	    if (document.all) {
	        document.body.style.behavior = 'url(#default#homepage)';
	        document.body.setHomePage(homeurl);
			return true;
	    } else if (window.sidebar) {
	        if (window.netscape) {
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	            } catch (e) {
	                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
					return false;
	            }
	        }
	        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
	        prefs.setCharPref('browser.startup.homepage', homeurl);
			return true;
	    }
	},
};

// 示例 isPC
// if (isPC()) {
//     console.log('PC');
// } else {
//     console.log('移动设备');
// }

// 示例 getBrowserInfo
// var bi = getBrowserInfo();
// document.write('Browser:'+bi.b+'    Version:'+bi.v);//Browser:ie Version:10
