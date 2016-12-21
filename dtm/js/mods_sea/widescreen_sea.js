// 判断宽屏模式
define(function(require){
    require('http://static.hdslb.com/js/jquery.min');

    (function() {
        function judgeWide() {
            if ($(this).width() >= 1360) {
                $('body').addClass('widescreen');
            } else {
                $('body').removeClass('widescreen');
            }
        }
        judgeWide();
        $(window).resize(function() {
            judgeWide();
        });
    })();
});
