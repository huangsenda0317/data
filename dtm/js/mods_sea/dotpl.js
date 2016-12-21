/**
 * 渲染 doT 模板，并用结果替换原 script 标签
 *
 * 例：
 *
 * <script class="-DoT" type="text/x-dot-template">
 * {{= $config.name }}
 * </script>
 *
 * @author heli
 */
define(function(require) {
	require("doT");

	Array.prototype.slice.call(document.querySelectorAll(".-DoT")).forEach(function(elem) {
		var tplFn = doT.template(elem.textContent.trim());
		// 渲染并用 DocumentFragment 保存结果
		// https://stackoverflow.com/a/9285046/1305074
		var frag = document.createDocumentFragment();
		var tmp = document.createElement('body');
		tmp.innerHTML = tplFn();
		while (tmp.firstChild) {
			frag.appendChild(tmp.firstChild);
		}
		elem.parentNode.insertBefore(frag, elem);
		elem.parentNode.removeChild(elem);
	});
});
