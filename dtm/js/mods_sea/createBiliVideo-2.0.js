/**
 * @author pandeng
 * @author heli
 *
 * 创建时间: 2016-08-12
 */

// 用法参考
// seajs.use('http://static.biligame.net/mods_sea/createBiliVideo.js', function(createBiliVideo) {
//     $('.btn').click(function() {
//       createBiliVideo("aid=5758760&page=1");
//     });
// });

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
      var dynamicLoading = require('http://static.biligame.net/mods_sea/dynamicLoading');
      dynamicLoading.css("http://static.biligame.net/mods/bilivideo.css");
      /**
       *   直接填参aid和cid就能得到一个自带关闭功能的播放器窗口
       *   每次调用都会产生一个新窗口，关闭时会删除该窗口实例
       */
      function createBiliVideo(flashvars)
      {
        if(document.querySelector(".BiliVideo-cover") != undefined)
        {
          return;
        }

        var video = document.createElement("div");
        video.innerHTML = '<div class="BiliVideo-cover">'+
            '<div class="BiliVideo-box">'+
              '<div class="BiliVideo-close"></div>'+
              '<embed wmode="transparent" width="100%" height="100%" name="plugin" id="plugin" src="http://static.hdslb.com/miniloader.swf?autoplay=1&' + flashvars + '" type="application/x-shockwave-flash">'+
            '</div>'+
          '</div>';

          var bodyNode = document.getElementsByTagName('body')[0];
          bodyNode.appendChild(video);

          document.querySelector('.BiliVideo-close').onclick = function()
          {
              bodyNode.removeChild(video);
          };
      }

      module.exports = createBiliVideo;

    });
}
