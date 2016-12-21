/**
 * 在一个元素中显示预约总数
 *
 * @param data-gameids 用逗号分隔的 game_id
 *
 * 隐含依赖：jquery
 *
 * @author heli
 */
define(function(require) {
	var ApiUtils = require("apiUtils2.0");

	function onAjaxFail(jqXHR, textStatus, e) {
		alert("网络错误，请稍后重试");
		console.log(textStatus, e);
	}

	Array.prototype.slice.call(document.querySelectorAll(".-BookingSum")).forEach(function(elem) {
		var gameIds = elem.getAttribute("data-gameids").split(",");
		$.when.apply(null, gameIds.map(ApiUtils.getBookingSum)).fail(onAjaxFail).done(function() {
			var sum = Array.prototype.slice.call(arguments).map(function(data) { return data.sum; }).reduce(function(a, b) { return a + b; }, 0);
			elem.textContent = sum;
		});
	});
});
