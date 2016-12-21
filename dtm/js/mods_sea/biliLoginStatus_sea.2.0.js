if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module){
        require.async('http://static.hdslb.com/js/core-v5/base.core', function() {
            $(function() {
                loadLoginStatus();

                // https://github.com/medialize/URI.js
                function addQuery(url, key, value) {
                    var separator = url.indexOf('?') > -1 ? '&' : '?';
                    return url + separator + encodeURIComponent(key) + "=" + encodeURIComponent(value);
                }
                /**
                 * 在登出和登录按钮上加上 gourl ，避免某些浏览器（如 IE9）登出后无法跳回原页面
                 */
                $("a.logout, #i_menu_login_btn").attr("href", function(i, href) {
                    return addQuery(href, "gourl", location.href);
                });
            });
        });
    });
}
