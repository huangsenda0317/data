/**
 * 功能：根据不同的设备类型给指定元素绑定 href
 * eg.   <a href="" data-href-ios="" data-href-android="" data-href-biliapp="bilibili://game/34?download=1" data-href-weixin=""></a>
 */
define(function(require){
	require('http://static.biligame.net/lib/device.js/0.2.7/device.min');

	var elem, weixinUrl, iosUrl, androidUrl, appUrl;
	var ar = document.querySelectorAll('.-DeviceHref');

	for (var i = 0; i < ar.length; i++) {
		elem = ar[i];
		weixinUrl = elem.getAttribute("data-href-weixin");
		weiboUrl = elem.getAttribute("data-href-weibo");
		iosUrl = elem.getAttribute("data-href-ios");
		androidUrl = elem.getAttribute("data-href-android");
		appUrl = elem.getAttribute("data-href-biliapp");

		if (isWeixin() && weixinUrl) {
			elem.setAttribute("href", weixinUrl);
		} else if (device.ios() && iosUrl) {
			if (isWeibo() && weiboUrl) {
				elem.setAttribute("href", weiboUrl);
			} else {
				elem.setAttribute("href", iosUrl);
			}
		} else if (isBiliApp() && appUrl) {
			elem.setAttribute("href", appUrl);
		} else if (device.android() && androidUrl) {
			elem.setAttribute("href", androidUrl);
		}
	}

	function isBiliApp() {
		return navigator.userAgent.toLowerCase().indexOf("biliapp") > -1;
	}

	function isWeibo() {
		return navigator.userAgent.toLowerCase().indexOf("weibo") > -1;
	}

	function isWeixin() {
		return navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
	}
});
