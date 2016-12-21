/**
 * 移动端下载按钮，根据不同设备用 $config 里的值设置 href
 *
 * 例：
 *
 * <a class="-DownBtn">下载按钮</a>
 *
 * <a class="-DownBtn" data-devices="weixin,biliapp,android">只针对安卓的下载按钮</a>
 *
 * @author heli
 */
define(function(require) {
	require("configjs");
	require('http://static.biligame.net/lib/device.js/0.2.7/device.min');

	function uaContains(keyword) {
		return function() {
			return navigator.userAgent.toLowerCase().indexOf(keyword) > -1;
		};
	}

	// 各种设备的规则
	var availDevices = {
		biliapp: {
			varname: "biliapp_url",
			is: uaContains("biliapp")
		},
		weixin: {
			varname: "weixin_url",
			is: uaContains("micromessenger")
		},
		weibo_ios: {
			varname: "ios_weibo_url",
			is: function() {
				return device.ios() && navigator.userAgent.toLowerCase().indexOf("weibo") > -1;
			}
		},
		ios: {
			varname: "h5_ios_url",
			is: function() { return device.ios(); }
		},
		android: {
			varname: "h5_android_url",
			is: function() { return device.android(); }
		}
	};

	Array.prototype.slice.call(document.querySelectorAll(".-DownBtn")).forEach(function(elem) {
		// 默认值
		var devices = (elem.getAttribute("data-devices") || "weixin,weibo_ios,ios,biliapp,android").split(",");
		// 找到匹配的设备并设置 href
		for (var i = 0; i < devices.length; i++) {
			var rule = availDevices[devices[i]];
			if (rule.is() || i == devices.length - 1) { // 最后一个强制成功，相当于默认
				elem.setAttribute("href", $config[rule.varname]);
				break;
			}
		}
	});
});
