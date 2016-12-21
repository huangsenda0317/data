if (typeof define === "function" && define.cmd) {
    define(['http://static.hdslb.com/js/jquery.min'], function(require, exports){
        require('http://static.hdslb.com/js/core-v5/base.core');
        require('http://static.hdslb.com/js/core-v5/page.arc');

        exports.init = function(type, id, autoLoad) {
            var fb = new bbFeedback('.comm', type, {autoLoad:autoLoad});
            fb.show(id, 1);
        };
    });
}
