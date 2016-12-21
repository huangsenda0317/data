/**
 * 二维码页面
 *
 * 依赖 http://static.biligame.net/mods/ewm.css
 *
 * @author heli
 */
define(function(require) {
	require("configjs");
	require('http://static.biligame.net/lib/device.js/0.2.7/device.min');

	function isWeixin() {
		return navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1;
	}

	function isBiliApp() {
		return navigator.userAgent.toLowerCase().indexOf("biliapp") > -1;
	}

	Array.prototype.slice.call(document.querySelectorAll(".-EwmDown")).forEach(function(elem) {
		if (isWeixin()) {
			var img = new Image();
			img.src = "http://i1.hdslb.com/u_user/game/img/wx-ewm-cover.jpg";
			elem.appendChild(img);
			document.getElementsByTagName("html")[0].className += " weixin";
		} else {
			var defaultUrl = elem.getAttribute("href");
			var androidUrl = $config.pc_android_url;
			var iosUrl = $config.pc_ios_url;
			var biliappUrl = $config.biliapp_url;

			if (device.ios() && iosUrl) {
				window.location = iosUrl;
			} else if (isBiliApp() && biliappUrl) {
				window.location = biliappUrl;
			} else if (androidUrl) {
				window.location = androidUrl;
			} else if (defaultUrl) {
				window.location = defaultUrl;
			}
		}
	});
});
