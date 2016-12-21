define(function(require, exports, module){
    require('http://static.biligame.net/lib/device.js/0.2.7/device.min');

    if (location.search && location.search.indexOf("debug") >= 0) return;

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    // https://github.com/medialize/URI.js
    function addQuery(url, key, value) {
        var separator = url.indexOf('?') > -1 ? '&' : '?';
        return url + separator + encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }
    /**
     * 跳转时自动带上游戏中心的 isApp 参数
     */
    var $isApp = (GetQueryString("isApp") == "1");
    function addIsApp(url) {
        return $isApp ? addQuery(url, "isApp", "1") : url;
    }

    var conf = document.querySelector('html');
    var pcurl = conf.getAttribute("pc-url");
    var h5url = conf.getAttribute("h5-url");
    var landscape = device.landscape();


    // 当前归类：平板竖屏为h5，平板横屏为pc
    if (device.mobile() || (device.tablet() && !device.landscape())) {
        if (h5url) {
            location.href = addIsApp(h5url);
        }
    } else {
        if (pcurl) {
            location.href = addIsApp(pcurl);
        }
    }

    // 判断 平板 的横竖屏切换来来切换 pc 和 h5 的页面
    window.onresize = function() {
        if (device.tablet() && !(landscape === device.landscape())) {
            if (device.landscape() && pcurl) {
                location.href = addIsApp(pcurl);
            } else if (!device.landscape() && h5url) {
                location.href = addIsApp(h5url);
            }
        }
    }
})
