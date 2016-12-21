/**
 * 引入配置的全局变量，如果不存在，则使用 /config.js
 *
 * @author heli
 */
define(function(require) {
	if (typeof $config === "undefined") {
		require("/config.js?_=20161214");
	}
});
