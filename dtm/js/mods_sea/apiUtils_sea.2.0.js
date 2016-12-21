/**
 * 通用 api 的工具类集合
 *
 * author：shenxuyang
 *
 * 创建时间: 2016-07-29
 *
 * 最后修改：2016-08-09
 */

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        var SourceFrom = require('yysource2.0');
        require('http://static.biligame.net/lib/plupload/2.1.9/moxie.min');
        mOxie.Env.swf_url = "/flash/Moxie.swf";

        function getCookie(name) {
            var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            var arr = document.cookie.match(reg);
            if (arr) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }

        function serializeParams(params) {
            params = params || {};
            var p = '';

            if (typeof params == 'object') {
                var ar = [];
                for (var name in params) {
                    if (params.hasOwnProperty(name)) {
                        ar.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
                    }
                }
                p = ar.join("&");
            } else {
                p = params.toString();
            }
            return p;
        }

        function sendmOxieAjax(url, type, params) {
            params = params || {};
            type = type || 'POST';
            type = type.toUpperCase();

            if (['POST', 'GET'].indexOf(type) > -1) {
                if (type == 'GET') {
                    return mOxieAjax(url + '?' + serializeParams(params), type);
                } else if (type == 'POST') {
                    return mOxieAjax(url, type, serializeParams(params));
                }
            }

            console.log('该请求方式暂不支持');
            return null;
        }

        function errorAjax(msg) {
            var dfd = $.Deferred();
            dfd.reject(msg);
            return dfd;
        }

        function mOxieAjax(url, type, params) {
            var dfd = $.Deferred();
            var xhr = new mOxie.XMLHttpRequest();

            xhr.open(type, url);
            xhr.withCredentials = true;
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var resp = xhr.response;
                        dfd.resolve(resp);
                    } else {
                        var resp = xhr.response;
                        dfd.reject(resp);
                    }
                }
            };
            if (type == "POST") {
                xhr.send(params);
            } else {
                xhr.send();
            }

            return dfd;
        }

        var ApiUtils = {

            sendmOxieAjax: sendmOxieAjax,

            // 获取登录信息
            getLoginInfo: function() {
                var url = 'http://api.biligame.com/user/info';
                var type = 'GET';
                var params = {
                    "_": Date.now()
                };

                return sendmOxieAjax(url, type, params);
            },

            // 判断是否登录
            isLogin: function() {
                if (getCookie('DedeUserID') && getCookie('DedeUserID') != '' && getCookie('DedeUserID') != '""') {
                    return true;
                } else {
                    return false;
                }
            },

            // 获取预约人数
            getBookingSum: function(gameId) {
                var url = 'http://activity.biligame.com/order/common_sum';
                var type = 'POST';
                var params = {
                    game_id: gameId || ''
                };

                return sendmOxieAjax(url, type, params);
            },

            // 预约功能
            booking: function(gameId, phone) {
                var url = 'http://activity.biligame.com/order/common_order';
                var type = 'POST';
                var params = {
                    game_id: gameId || '',
                    phone: phone || '',
                    source: SourceFrom.getSourceFrom() || ''
                };
                return sendmOxieAjax(url, type, params);
            },

            // 获取预约短信验证码
            getPhoneSms: function(gameId, phone) {
                var url = 'http://activity.biligame.com/sms/send_sms';
                var type = 'POST';
                var params = {
                    game_id: gameId || '',
                    phone: phone || ''
                };
                return sendmOxieAjax(url, type, params);
            },

            // 获取预约短信验证码
            phoneOrder: function(gameId, phone, code) {
                var url = 'http://activity.biligame.com/order/phone_order';
                var type = 'POST';
                var params = {
                    game_id: gameId || '',
                    phone: phone || '',
                    sms_code: code || ''
                };
                return sendmOxieAjax(url, type, params);
            },


            // 判断是否预约
            getBookingStatus: function(gameId) {
                var url = 'http://activity.biligame.com/order/common_count';
                var type = 'POST';
                var params = {
                    game_id: gameId || ''
                };

                return sendmOxieAjax(url, type, params);
            },

            // 更新手机号
            updatePhone: function(gameId, phone) {
                var url = 'http://activity.biligame.com/order/update_phone';
                var type = 'POST';
                var params = {
                    game_id: gameId || '',
                    phone: phone || ''
                };

                return sendmOxieAjax(url, type, params);
            },

            // 领取礼包码
            getGiftCode: function(infoId) {
                var url = 'http://ka.biligame.com/api/getCode2.do';
                var type = 'GET';
                var params = {
                    ka_info_id: infoId || ''
                };

                return sendmOxieAjax(url, type, params);
            },

            /**
             * 检查是否领取过礼包码
             * @param giftCode 礼包码
             */
            checkGetCode: function(giftCode) {

                var url = 'http://ka.biligame.com/api/checkGetCode.do';
                var type = 'GET';
                var params = {
                    ka_info_id: giftCode
                };

                return sendmOxieAjax(url, type, params);
            },

            /**
             * 发生领取礼包短信验证码
             * @param giftCode 礼包码
             * @param phone 手机号
             */
            sendSmsForGetCode: function(giftCode, phone) {

                var url = 'http://ka.biligame.com/api/sendSmsForGetCode.do';
                var type = 'GET';
                var params = {
                    ka_info_id: giftCode,
                    phone:phone
                };

                return sendmOxieAjax(url, type, params);
            },

            /**
             * 根据短信验证码领取礼包
             * @param giftCode 礼包码
             * @param phone 手机号
             * @param smsCode 短信验证码
             */
            getCodeWithSmsCode: function(giftCode, phone, smsCode) {

                var url = 'http://ka.biligame.com/api/getCodeWithSmsCode.do';
                var type = 'GET';
                var params = {
                    ka_info_id: giftCode,
                    phone: phone,
                    sms_code: smsCode
                };

                return sendmOxieAjax(url, type, params);
            },

            /**
             * 功能：与cp方接口交互时，获取签名等相关参数
             * @param vendorId cp方对应的vendor key在数据库中的 id
             */
            getSignParams: function(vendorId) {
                if (vendorId) {
                    var url = 'http://api.biligame.com/vendor_sign';
                    var type = 'GET';
                    var params = {
                        vendor_id: vendorId || '',
                        fallback_uid: -1
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('vendor id 不能为空！');
            },

            /**
             * 功能：获取新闻列表功能
             * @param options（Object） 包含 gameExtensionId、positionId、typeId、pageNum、pageSize
             */
            getNewsList: function(options) {
                var url = 'http://api.biligame.com/news/list.action';
                var type = 'GET';
                var params = {
                    gameExtensionId: options.gameExtensionId || '',
                    positionId: options.positionId || 2,
                    typeId: options.typeId || '',
                    pageNum: options.pageNum || 1,
                    pageSize: options.pageSize || 10
                };

                return sendmOxieAjax(url, type, params);
            },

            /**
             * 功能：获取新闻详情功能
             * @param detailId 新闻 id
             */
            getNewsDetail: function(detailId) {
                var url = 'http://api.biligame.com/news/' + detailId + '.action';
                var type = 'GET';

                return sendmOxieAjax(url, type, {});
            },

            /**
             * 获得抽卡信息 (可以参考:http://sdmht.biligame.com/yuyue.html)
             * @param lottery_id 每个游戏有自己的专用号码
             * @returns {*}
             */
            getLotteryInfo: function(lottery_id) {
                if (lottery_id) {
                    var url = 'http://activity.biligame.com/lottery/query';
                    var type = 'POST';
                    var params = {
                        lottery_id: lottery_id || ''
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('lottery id 不能为空！');
            },

            /**
             * 首次预约成功
             */
            ALT_FIRST_ORDER:10,
            /**
             * 首次分享至微博
             */
            ALT_FIRST_MICROBLOG:1,
            /**
             * 首次分享至贴吧
             */
            ALT_FIRST_TIEBA:2,
            /**
             * 首次分享至微信
             */
            ALT_FIRST_WECHAT:3,
            /**
             * 首次分享至QQ空间
             */
            ALT_FIRST_QQZONE:4,
            /**
             * 每日首次登陆
             */
            ALT_FIRST_LOGIN:5,
            /**
             * 增加抽卡次数 (可以参考:http://sdmht.biligame.com/yuyue.html)
             * @param lottery_id 每个游戏有自己的专用号码
             * @param bonus_type 取值：6: 首次预约成功，1: 首次分享至微博，2: 首次分享至贴吧，3: 首次分享至微信，4: 首次分享至QQ空间，5: 每日首次登陆
             * @returns {*}
             */
            addLotteryTimes: function(lottery_id, bonus_type) {
                if (lottery_id) {
                    var url = 'http://activity.biligame.com/lottery/chance/bonus';
                    var type = 'POST';
                    var params = {
                        lottery_id: lottery_id || '',
                        bonus_type: bonus_type || ''
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('lottery id 不能为空！');
            },

            /**
             * 抽卡 (可以参考:http://sdmht.biligame.com/yuyue.html)
             * @param lottery_id 每个游戏有自己的专用号码
             * @returns {*}
             */
            executeLottery: function(lottery_id) {
                if (lottery_id) {
                    var url = 'http://activity.biligame.com/lottery/excute';
                    var type = 'POST';
                    var params = {
                        lottery_id: lottery_id || ''
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('lottery id 不能为空！');
            },

            /**
             * 保留新抽到的卡 (可以参考:http://sdmht.biligame.com/yuyue.html)
             * @param lottery_id 每个游戏有自己的专用号码
             * @returns {*}
             */
            replaceLottery: function(lottery_id) {
                if (lottery_id) {
                    var url = 'http://activity.biligame.com/lottery/excute/replace';
                    var type = 'POST';
                    var params = {
                        lottery_id: lottery_id || ''
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('lottery id 不能为空！');
            },

            /**
             * 查询当前已使用抽奖次数 (可以参考:http://sdmht.biligame.com/yuyue.html)
             * @param lottery_id 每个游戏有自己的专用号码
             * @returns {*}
             */
            getLotteryUsed: function(lottery_id) {
                if (lottery_id) {
                    var url = 'http://activity.biligame.com/lottery/query/used';
                    var type = 'POST';
                    var params = {
                        lottery_id: lottery_id || ''
                    };

                    return sendmOxieAjax(url, type, params);
                }

                return errorAjax('lottery id 不能为空！');
            }
        };

        module.exports = ApiUtils;
    });
}
