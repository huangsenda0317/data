/**
 *  author：pandeng
 *  动态加载css和script到head中，不会重复添加
 * 创建时间: 2016-08-12
 */

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {

      var dynamicLoading = {
            css: function(path){
                if(!path || path.length === 0){
                  throw new Error('argument "path" is required !');
                }

                var links = document.getElementsByTagName('link');
                for(var i=0; i<links.length; i++)
                {
                  if(links[i].href == path)
                  {
                    return;
                  }
                }

                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.href = path;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
            },

            js: function(path){
                if(!path || path.length === 0){
                  throw new Error('argument "path" is required !');
                }

                var scripts = document.getElementsByTagName('script');
                for(var i=0; i<scripts.length; i++)
                {
                  if(scripts[i].src == path)
                  {
                    return;
                  }
                }

                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.src = path;
                script.type = 'text/javascript';
                head.appendChild(script);
            }
      };

        module.exports = dynamicLoading;
    });
}
