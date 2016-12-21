$(function () {
    $('.closed').click(function () {
        if (!$('.closed').hasClass('active')) {
            leftClose();
        } else {
            leftOpen();
        }
    });

    $('.dance-type').mousemove(function () {
        $('.dance-type-hover').show();
        $('.dance-type-over').hide();
    });
    $('.dance-type').mouseout(function () {
        $('.dance-type-hover').hide();
        $('.dance-type-over').show();
    });

    window.onresize = resizeBannerImage;
    function resizeBannerImage() {
        var winW = $(window).width();
        var winH = $(window).height();
        $('.face-bg').css('width',winW*0.1);
        $('.face-bg').css('height',winH*0.1);
    }

    var html_bk = '<video loop autoplay class="dtm-video">浏览器版本太古老,赶紧更新吧!!<source src="./video/breakin.mp4" type="video/mp4" id="dtm-source"></video>';
    var html_pp = '<video loop autoplay class="dtm-video">浏览器版本太古老,赶紧更新吧!!<source src="./video/poppin.mp4" type="video/mp4" id="dtm-source"></video>';
    var html_jazz = '<video loop autoplay class="dtm-video">浏览器版本太古老,赶紧更新吧!!<source src="./video/jazz.mp4" type="video/mp4" id="dtm-source"></video>';
    var html_lock = '<video loop autoplay class="dtm-video">浏览器版本太古老,赶紧更新吧!!<source src="./video/lockin.mp4" type="video/mp4" id="dtm-source"></video>';

    $('.btn-bk').click(function () {
        leftClose();
        $('.pop-video-bg').show();
        $('.pop-video-bg').append(html_bk);
    });
    $('.closed').click(function () {
        $('.pop-video-bg').children('video').remove();
        $('.pop-video-bg').hide();
    });

    $('.btn-pp').click(function () {
        leftClose();
        $('.pop-video-bg').show();
        $('.pop-video-bg').append(html_pp);
    });
    $('.closed').click(function () {
        $('.pop-video-bg').children('video').remove();
        $('.pop-video-bg').hide();
    });

    $('.btn-jazz').click(function () {
        leftClose();
        $('.pop-video-bg').show();
        $('.pop-video-bg').append(html_jazz);
    });
    $('.closed').click(function () {
        $('.pop-video-bg').children('video').remove();
        $('.pop-video-bg').hide();
    });

    $('.btn-lock').click(function () {
        leftClose();
        $('.pop-video-bg').show();
        $('.pop-video-bg').append(html_lock);
    });
    $('.closed').click(function () {
        $('.pop-video-bg').children('video').remove();
        $('.pop-video-bg').hide();
    });


    function leftClose() {
        $('.closed').addClass('active');
        $('.header-left').animate({'left': '-300px'});
        $('.closed').addClass('close-animation');
        $('.closed').removeClass('open-animation');
    }
    
    function leftOpen() {
        $('.closed').removeClass('active');
        $('.closed').removeClass('close-animation');
        $('.header-left').animate({'left': '0px'});
        $('.closed').addClass('open-animation');
    }
});










