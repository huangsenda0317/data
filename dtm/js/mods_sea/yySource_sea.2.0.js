if (window.location.search.substr(1).match(/(^|&)source=([^&]*)(&|$)/)) {
    localStorage.setItem(window.location.hostname + '_source', unescape(window.location.search.substr(1).match(/(^|&)source=([^&]*)(&|$)/)[2]));
}

if (typeof define === "function" && define.cmd) {
    define(function(require, exports) {
        exports.getSourceFrom = function() {
            var source_name = window.location.hostname + '_source';
            source = localStorage.getItem(source_name) || '';

            return source;
        };
    });
}
