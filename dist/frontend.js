/**
 * Browser 对象实现
 */

var Browser = {

	/**
	 * 获取浏览器类型及主版本
	 * @return {object} 返回包含浏览器和版本的对象
	 */
	getBrowserInfo: function() {
		var sys = {};
		var ua = navigator.userAgent.toLowerCase();
		if (window.ActiveXObject) {
			sys.b = 'ie';
			sys.v = parseInt(ua.match(/msie ([\d.]+)/)[1]);
		}
		else if (document.getBoxObjectFor) {
			sys.b = 'firefox';
			sys.v = parseInt(ua.match(/firefox\/([\d.]+)/)[1]);
		}
		else if (window.MessageEvent && !document.getBoxObjectFor) {
			sys.b = 'chrome';
			sys.v == parseInt(ua.match(/chrome\/([\d.]+)/)[1]);
		}
		else if (window.opera) {
			sys.b = 'opera';
			sys.v == parseInt(ua.match(/opera.([\d.]+)/)[1]);
		}
		else if (window.openDatabase) {
			sys.b = 'safari';
			sys.v == parseInt(ua.match(/version\/([\d.]+)/)[1]);
		}
		return sys;
	},

	/**
	 * 判断是否PC访问
	 * @return {boolean}
	 */
	isPC: function() {
		var userAgentInfo = navigator.userAgent;
		var agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
		var flag = true;
		for (var v = 0, n = agents.length; v < n; v++) {
			if (userAgentInfo.indexOf(agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	},

	/**
	 * 获取Url参数值
	 * @param {string} name 参数名称
	 * @return {string} 返回参数值
	 */
	getUrlParam: function(name) {
		// var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');//构造一个含有目标参数的正则表达式对象
		// var r = window.location.search.substr(1).match(reg);//匹配目标参数
		// if (r != null) return unescape(r[2]); return null; //返回参数值

		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},

	/**
	 * 设置cookie值
	 * @param {string} name 缓存名称
	 * @param {string} value 缓存值
	 * @param {number} msec 缓存时间（毫秒，例如：一小时=1h * 60min * 60s * 1000ms）
	 * @param {string} domain 缓存域名
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
	 * @param {string} name 缓存名称
	 * @return {string} 缓存值
	 */
	getCookie: function(name) {
		var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
		if (arr != null) return unescape(arr[2]);
		return null
	},

	/**
     * 删除cookie值
     * @param {string} name 缓存名称
     */
    removeCookie: function(name) {
        // 设置已过期，系统会立刻删除cookie
        setCookie(name, '1', -1);
    },

	/**
	 * 加入收藏夹
	 * @param {string} url 链接
	 * @param {string} title 标题
	 * @return {boolean} 返回收藏结果
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
	 * @param {string} homeurl 链接
	 * @return {boolean}
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

	getKeyName: function(keycode) {
		var keyCodeMap = {
		    8: 'Backspace',
		    9: 'Tab',
		    13: 'Enter',
		    16: 'Shift',
		    17: 'Ctrl',
		    18: 'Alt',
		    19: 'Pause',
		    20: 'Caps Lock',
		    27: 'Escape',
		    32: 'Space',
		    33: 'Page Up',
		    34: 'Page Down',
		    35: 'End',
		    36: 'Home',
		    37: 'Left',
		    38: 'Up',
		    39: 'Right',
		    40: 'Down',
		    42: 'Print Screen',
		    45: 'Insert',
		    46: 'Delete',
		    48: '0',
		    49: '1',
		    50: '2',
		    51: '3',
		    52: '4',
		    53: '5',
		    54: '6',
		    55: '7',
		    56: '8',
		    57: '9',
		    65: 'A',
		    66: 'B',
		    67: 'C',
		    68: 'D',
		    69: 'E',
		    70: 'F',
		    71: 'G',
		    72: 'H',
		    73: 'I',
		    74: 'J',
		    75: 'K',
		    76: 'L',
		    77: 'M',
		    78: 'N',
		    79: 'O',
		    80: 'P',
		    81: 'Q',
		    82: 'R',
		    83: 'S',
		    84: 'T',
		    85: 'U',
		    86: 'V',
		    87: 'W',
		    88: 'X',
		    89: 'Y',
		    90: 'Z',
		    91: 'Windows',
		    93: 'Right Click',
		    96: 'Numpad 0',
		    97: 'Numpad 1',
		    98: 'Numpad 2',
		    99: 'Numpad 3',
		    100: 'Numpad 4',
		    101: 'Numpad 5',
		    102: 'Numpad 6',
		    103: 'Numpad 7',
		    104: 'Numpad 8',
		    105: 'Numpad 9',
		    106: 'Numpad *',
		    107: 'Numpad +',
		    109: 'Numpad -',
		    110: 'Numpad .',
		    111: 'Numpad /',
		    112: 'F1',
		    113: 'F2',
		    114: 'F3',
		    115: 'F4',
		    116: 'F5',
		    117: 'F6',
		    118: 'F7',
		    119: 'F8',
		    120: 'F9',
		    121: 'F10',
		    122: 'F11',
		    123: 'F12',
		    144: 'Num Lock',
		    145: 'Scroll Lock',
		    182: 'My Computer',
		    183: 'My Calculator',
		    186: ';',
		    187: '=',
		    188: ',',
		    189: '-',
		    190: '.',
		    191: '/',
		    192: '`',
		    219: '[',
		    220: '\\',
		    221: ']',
		    222: '\''
		};
	    if (keyCodeMap[keycode]) {
	        return keyCodeMap[keycode];
	    } else {
	        console.log('Unknown Key(Key Code:' + keycode + ')');
	        return '';
	    }
	},
};

// 示例 Browser.isPC
// if (Browser.isPC()) {
//     console.log('PC');
// } else {
//     console.log('移动设备');
// }

// 示例 Browser.getBrowserInfo
// var bi = Browser.getBrowserInfo();
// document.write('Browser:'+bi.b+' Version:'+bi.v); // Browser:ie Version:10
