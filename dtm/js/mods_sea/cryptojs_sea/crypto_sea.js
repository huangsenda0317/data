if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module){
        require('http://static.biligame.net/lib/cryptojs/3.1.2/rollups/hmac-sha1');

        var CryptoUtils = (function(){
            // TODO 替换的值
            var karray = ["71", "74", "6b", "64", "31", "72", "6d", "79", "65", "73", "34", "66", "76", "30", "7a", "62", "38", "37", "35", "61", "68", "36", "39", "6f", "33", "70", "63", "75", "6e", "6c", "67", "77", "6a", "32", "78", "69"];
            var korder = [16, 18, 8, 19, 15, 15, 18, 11, 18, 16, 19, 10, 21, 10, 13, 16];

            // 过期时间 30分钟
            var expires = 30 * 60;

            // 参数
            var _options = {
                uid: '', // 用户id
                timestamp: '',
                key: '',
                hmacsha1: ''
            };

            /**
             * @param uid 用户的唯一标识id
             * @param key 合作方的加密用key
             */
            var init = function(uid) {
                _options.uid = uid;
            };

            var getHmacSHA1 = function() {
                if (!verifyExpires()) {
                    createSign();
                }
                return _options.hmacsha1;
            }

            var getParams = function() {
                var sign = getHmacSHA1();
                var timestamp = _options.timestamp;
                var uid = _options.uid;

                return {
                    'uid': uid,
                    'timestamp': timestamp,
                    'sign': sign
                }
            }

            var createSign = function() {
                _options.timestamp = (Date.now() / 1000).toFixed(0);
                _options.hmacsha1 = CryptoJS.HmacSHA1('' + _options.uid + _options.timestamp, getKey(karray, korder)).toString();
            }

            var verifyExpires = function() {
                var flag = true;
                if (_options.timestamp == '') {
                    flag = false;
                } else {
                    var timenow = (Date.now() / 1000).toFixed(0);
                    if ((timenow - _options.timestamp) > expires) {
                        flag = false;
                    }
                }

                return flag;
            }

            var getKey = function(res,order) {
                var result = [];
                for (var i = 0; i < order.length; i++) {
                    result.push(res[order[i]]);
                }
                return getRealKey(result).join('');
            }

            var getRealKey = function(ar) {
                for(var i = 0; i < ar.length; i++) {
                    ar[i] = eval("'" + '\\u00' + ar[i] + "'");
                }
                return ar;
            }
            return {
                init,
                getParams,
            }
        })()

        module.exports = CryptoUtils;
    });
}
