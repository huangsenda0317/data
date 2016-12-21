/**
 * 二维码页面
 *
 * 依赖 http://static.biligame.net/mods/ewm.css
 *
 * 例：http://bfzj.biligame.com/ewm/download_h5.html
 *
 * <div class="-EwmDown" android-url="${h5_android_url}"></div>
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

	var expPatt = /\$\{([^}]*)\}/g;
	function evalExpr(expr) {
		return expr.replace(expPatt, function(match, p1) {
			return eval("(function(_){with(_){ return " + p1 + "; }})($config)");
		});
	}

	Array.prototype.slice.call(document.querySelectorAll(".-EwmDown")).forEach(function(elem) {
		if (isWeixin()) {
			var img = new Image();
			img.src = "http://i1.hdslb.com/u_user/game/img/wx-ewm-cover.jpg";
			elem.appendChild(img);
			document.getElementsByTagName("html")[0].className += " weixin";
		} else {
			var defaultUrl = elem.getAttribute("href");
			var androidUrl = evalExpr(elem.getAttribute("android-url") || "${pc_android_url}");
			var iosUrl = evalExpr(elem.getAttribute("ios-url") || "${pc_ios_url}");
			var biliappUrl = evalExpr(elem.getAttribute("biliapp-url") || "${biliapp_url}");

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
