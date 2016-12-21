/**
 * bili 视频弹窗
 *
 * @param cid
 * @param aid
 *
 * @author heli
 */
define(function(require) {
	var createBiliVideo = require("http://static.biligame.net/mods_sea/createBiliVideo.js");
	Array.prototype.slice.call(document.querySelectorAll(".-BiliVideo")).forEach(function(elem) {
		var cid = elem.getAttribute("data-cid");
		var aid = elem.getAttribute("data-aid");
		elem.addEventListener("click", function(e) {
			createBiliVideo(aid, cid);
			e.preventDefault();
		});
	});
});
