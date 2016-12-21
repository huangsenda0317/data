/**
 * 根据 $config 的值，替换元素的属性。属性的值必须是 ${...} 的语法，大括号里面是一个 js 表达式
 *
 * 例：
 *
 * <a class="-Configer" href="${pc_android_url}"></a>
 *
 * @author heli
 */
define(function(require) {
	require("configjs");
	var expPatt = /^\$\{(.*)\}$/;
	Array.prototype.slice.call(document.querySelectorAll(".-Configer")).forEach(function(elem) {
		var attrs = elem.attributes;
		for (var i = 0; i < attrs.length; i++) {
			var name = attrs[i].name;
			var value = attrs[i].value;
			var m = expPatt.exec(value);
			if (m) {
				// 以 $config 为环境，运行属性值
				var v = eval("(function(_){with(_){ return " + m[1] + "; }})($config)");
				elem.setAttribute(name, v);
			}
		}
	});
});
