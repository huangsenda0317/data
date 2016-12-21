// 各种各样通用的工具类
define(function(require, exports){
    require('bilijquery');

    /**
     * 功能：判断是否是在微信浏览器里
     */
    exports.isWeixin = function () {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
    };

    /**
     * 功能：判断是否是在微博浏览器里
     */
    exports.isWeibo = function () {
        return navigator.userAgent.toLowerCase().indexOf("weibo") != -1;
    };

    /**
     * 功能：异步获取列表数据
     * 参数：参数对象 options {
     *                  gameExtensionId 游戏id
     *                  typeId          列表类别 1-5
     *                  pageSize        每页个数
     *                  pageNum         页码
     *                  positionId      功能未知，暂固定为 2
     *               }
     * 返回：jquery  deferred 对象，自行做不同情况处理
     */
    exports.getList = function (options) {
        // 默认设置
        var listApi = "http://api.biligame.com/news/list";
        var url = listApi + '?';
        var _options = {
            gameExtensionId : '',
            pageSize        : 5,
            pageNum         : 1,
            typeId 			: '',
            positionId 		: 2
        };
        if (options) {
            for (var option in options) {
                if (_options.hasOwnProperty(option)) {
                    _options[option] = options[option];
                }
            }
        }
        for (var option in _options) {
            if (_options.hasOwnProperty(option)) {
                url += option + "=" + _options[option] + "&";
            }
        }
        url = url.substr(0, url.length - 1);

        return $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
        });
    };

    /**
    * 功能：异步获取列表数据
    * 参数：id
    * 返回：jquery  deferred 对象，自行做不同情况处理
    */
    exports.getDetail = function (id) {
        var listApi = "http://api.biligame.com/news";
        var url = listApi + '/' + id + '.action?' + Date.now();
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
        });
    };

    /**
     * 功能：获取特定名字的hash的参数值
     */
    exports.getHashValue = function (name) {
        var reg = new RegExp("(^|,)" + name + "=([^,]*)(,|$)");
        var r = window.location.hash.substr(1).match(reg);
        if (r !== null) {
            return unescape(r[2]);
        }
        return null;
    };

    exports.getQueryString = function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	};

    /**
     * 功能：去除script代码注入问题
     */
    exports.escScript = function (str) {
        return str.replace(/(<script)/g, "&lt;script").replace(/(<\/script)/g, "&lt;script");
    };

    exports.scrollRocket = function () {
        var v = 50;
        var minV = 1;
        var top = $(window).scrollTop();
        var scroll = setInterval(function() {
            if (top > v) {
                if (top < 800) {
                    // v -= 1;
                    v *= 0.94;
                    if (v < minV) {
                        v = minV;
                    }
                }
                top -= v;
            } else {
                top = 0;
                clearInterval(scroll);
            }
            $(window).scrollTop(top);
        }, 10);
    };
});
