define(function(require, exports, module){
    require('http://static.hdslb.com/js/core-v5/base.core.js');
    require('http://data.bilibili.com/rec.js');
    require('http://static.biligame.net/lib/js-cookie/2.1.1/js.cookie.min.js');

    $(function(){
        loadLoginStatus();
    })
    function genLoginUrl() {
		return "https://passport.bilibili.com/login?gourl=" + encodeURIComponent(location.href);
	}
    var BiliUtils = {
        /**
         * 检测 *.biligame.com 的登录信息和 *.bilibili.com 的登录信息的不一致
         * @return 如果一个登录而另一个未登录，返回 true
         */
        isLoginMismatch: function() {
            var biligameLoggedin = !!Cookies.get("DedeUserID");
            var bilibiliLoggedin = typeof biliLoginStatus != "undefined" && biliLoginStatus.isLogin;
            return !biligameLoggedin && bilibiliLoggedin;
            // 临时措施，等 IE P3P header 加上后可以使用下面的：
            // return (biligameLoggedin ^ bilibiliLoggedin) == 1;
        },
        /**
         * 跳到主站进行登录
         */
        redirectLogin: function() {
            location.href = genLoginUrl();
        },
        /**
         * 强制登出后，跳到主站登录
         */
        redirectForceLogin: function() {
            // location.href = "https://passport.bilibili.com/login?act=exit&gourl=" + encodeURIComponent(genLoginUrl());
            // 主站登出后，如果有 gourl 则不会设置 cookie ，所以只能直接登出
            location.href = "https://account.bilibili.com/login?act=exit";
        },
        /**
         * @return true: 成功 false 不成功，需要跳转
         */
        fixLogin: function() {
            // 这边没有登录信息，但主站已经登录
            if (!Cookies.get("DedeUserID") && typeof biliLoginStatus != "undefined" && biliLoginStatus.isLogin) {
                try {
                    // 从 sessionStorage 中获取 DedeUserID 并写入 cookie
                    // 这只是一个临时解决方案
                    // TODO: 需要主站扫码登录时正确写入 cookie
                    var userId = JSON.parse(sessionStorage.bili_login_status)[3];
                    if (userId) {
                        Cookies.remove("DedeUserID");
                        Cookies.set("DedeUserID", userId, { expires: 7, domain: ".biligame.com" });
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            } else {
                return true;
            }
        }
    };

    return BiliUtils;
});
