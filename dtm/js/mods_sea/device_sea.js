// 根据不同的设备类型给指定元素绑定 href
define(function(require, exports, module){
    require('http://static.biligame.net/lib/device.js/0.2.7/device.min');
    var Util = require('mods_sea/util_sea');

    var elem, weixinUrl, iosUrl, androidUrl, appUrl, href;
    var ar = document.querySelectorAll('.-DeviceHref');

    for (var i = 0; i < ar.length; i++) {
        elem = ar[i];
        weixinUrl = elem.getAttribute("weixin-href");
    	iosUrl = elem.getAttribute("ios-href");
    	androidUrl = elem.getAttribute("android-href");
    	appUrl = elem.getAttribute("app-href");

    	if (isBiliApp() && appUrl) {
    		elem.setAttribute("href", appUrl);
    	} else if (Util.isWeixin() && weixinUrl) {
    		elem.setAttribute("href", weixinUrl);
    	} else if (device.ios() && iosUrl) {
    		elem.setAttribute("href", iosUrl);
    	} else if (device.android() && androidUrl) {
    		elem.setAttribute("href", androidUrl);
    	}
    }

    function isBiliApp() {
        return navigator.userAgent.toLowerCase().indexOf("biliapp") > -1;
    }
});
