/**
 * 正则表达式扩展
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * Created by suxiong on 2017/3/18.
 */

if (!RegExp.pattern) {
    /**
     * 正则表达式模式
     * g： global，全文搜索，默认搜索到第一个结果接停止
     i： ingore case，忽略大小写，默认大小写敏感
     m： multiple lines，多行搜索
     *
     */
    RegExp.pattern = { // 按字母顺序添加
        date: /^\d{4}\-\d{1,2}-\d{1,2}$/m, // 日期，只能是 2004-10-22 格式
        domain: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/m, // 完整域名，例：www.domain.com
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/m, // 邮箱
        emailblank: /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^\s*$)/m, // 邮箱，可空
        htmltag: /^<(\S*?)[^>]*>.*?<\/\1>|<.*? \/>$/m, // HTML标记，无法匹配嵌套标签
        idcard: /^\d{14}(\d{4}|(\d{3}[xX])|\d{1})$/m, // 身份证，15位或18位
        ip: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/m, // IP 地址
        notblank: /\S+/m, // 非空
        qq: /^[1-9]\d{4,10}$/, // QQ号码，5-11位数字，[1-9][0-9]{4,}
        tel: /^\d{3}-\d{8}|\d{4}-\d{7,8}$/m, // 国内电话号码，匹配形式如 010-12345678 或 0571-12345678 或 0831-1234567
        url: /^[a-zA-z]+:\/\/[^\s]*$/m, // 网址 URL
        username: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/m, // 账号，字母开头，5-16位，允许字母数字下划线
        version: /\d+(\.\d+)+/m, // 版本号，例如 3.8 或 3.8.2
        zipcode: /^[1-9]\d{5}(?!\d)$/m, // 邮政编码
    };

    // 示例
    // var date = '2017-03-09';
    // if (RegExp.pattern.date.test(date)) {
    //     console.log('正确的日期格式', date);
    // } else {
    //     console.log('错误的日期格式', date);
    // }
}

