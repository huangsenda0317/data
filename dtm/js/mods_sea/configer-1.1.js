/**
 * 根据 $config 的值，替换元素的属性。属性的值必须是 ${...} 的语法，大括号里面是一个 js 表达式
 *
 * 例：
 *
 * <a class="-Configer" href="${pc_android_url}">
 *    QQ群1: ${qq_txt_1}<br/>
 *    QQ群2: ${qq_txt_2}
 * </a>
 *
 * seajs.use('configer-1.1');
 *
 * @author heli & shenxuyang
 */
define(function(require) {
	require("configjs");
	var expPatt = /^\$\{(.*)\}$/;
	Array.prototype.slice.call(document.querySelectorAll(".-Configer")).forEach(function(elem) {
		var attrs = elem.attributes;
		var i;
		for (i = 0; i < attrs.length; i++) {
			var name = attrs[i].name;
			var value = attrs[i].value;
			var m = expPatt.exec(value);
			if (m) {
				// 以 $config 为环境，运行属性值
				var v = eval("(function(_){with(_){ return " + m[1] + "; }})($config)");
				elem.setAttribute(name, v);
			}
		}

		var nodes = elem.childNodes;
		var expPatt2 = /\$\{([^\}]*)\}/g;
		for (i = 0; i < nodes.length; i ++) {
			var nodeType = nodes[i].nodeType;
			var value = nodes[i].nodeValue;
			if (nodeType == 3) { // 判断文本节点
				nodes[i].nodeValue = nodes[i].nodeValue.replace(expPatt2, function(match, p1) {
					return eval("(function(_){with(_){ return " + p1 + "; }})($config)");
				});
			}
		}
	});
});
