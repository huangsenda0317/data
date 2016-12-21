/**
 *  author：shenxuyang
 *
 * 创建时间: 2016-08-02
 */

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        // function getServerDate() {
        //     if (document.querySelector('.script-serverdate')) {
        //         document.querySelector('body').removeChild(document.querySelector('.script-serverdate'));
        //     }
        //     window.serverdate = null;
        //     var script = document.createElement('script');
        //     script.src = "http://interface.bilibili.com/serverdate.js";
        //     script.onload = function(){};
        //     document.querySelector('body').appendChild(script);
        // }
        var SiNum = {
            get: function(p, n) {
                n = parseInt(n);
                if (p.length >= 2) {
                    for (var i = 0; i < p.length; i++) {
                        if (n < p[i].time) {
                            break;
                        }
                    }
                    var num = 0;
                    if (i == 0) {
                        num = (p[1].target - p[0].target) / (p[1].time - p[0].time) * (n - p[0].time) + p[0].target;
                    } else if (i < p.length) {
                        num = (p[i].target - p[i - 1].target) / (p[i].time - p[i - 1].time) * (n - p[i - 1].time) + p[i - 1].target;
                    } else {
                        var v = (p[i - 1].target - p[i - 2].target) / (p[i - 1].time - p[i - 2].time);
                        var d = (p[i - 1].time - p[0].time) / (n - p[0].time);
                        num = 0.5 * d * v * (n - p[i - 1].time) + p[i - 1].target;
                    }
                    return parseInt(num);
                } else {
                    return -1;
                }
            };
        }

        module.exports = SiNum;
    });
}
