/**
 * 通用 dialog 模块
 */

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        var Apis = require('apiUtils');

        var style = '<style>@charset "utf-8";.dialog-valid-code{display:none;position:fixed;width:100%;height:100%;z-index:10010;left:0;top:0;background-color:rgba(0,0,0,0.7)}.dialog-valid-code.show{display:block}.dialog-valid-code .valid-code{position:absolute;top:50%;left:50%;z-index:2;width:312px;height:197px;text-align:center;box-sizing:border-box;padding:15px 40px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-image:-webkit-linear-gradient(#f49370,#fee7bb);background-image:-moz-linear-gradient(#f49370,#fee7bb);background-image:-o-linear-gradient(#f49370,#fee7bb);background-image:linear-gradient(#f49370,#fee7bb)}.dialog-valid-code .valid-code:before{content:"";width:308px;height:192px;position:absolute;left:2px;top:2px;z-index:-1;background-color:#070e35}.dialog-valid-code .valid-code:after{content:"";width:300px;height:185px;position:absolute;left:6px;top:6px;z-index:-1;background-color:#070e35;box-shadow:0 0 0 1px #f49370 inset}'
                    + '.dialog-valid-code .valid-code .code-wrap{position:relative}.dialog-valid-code .valid-code .code-wrap input{padding-right:115px;font-size:14px}.dialog-valid-code .valid-code .btn-get-code{position:absolute;right:0;top:0;z-index:5;height:40px;line-height:40px;font-size:14px;width:108px;color:#666;background-color:#f9f9f9;cursor:pointer;border:0;border-left:1px solid #aaa;box-sizing:border-box;border-top-right-radius:4px;border-bottom-right-radius:4px}.dialog-valid-code .valid-code .btn-get-code:hover{background-color:#fff}.dialog-valid-code .valid-code .btn-get-code:active{background-color:#f0f0f0}.dialog-valid-code .valid-code .btn-get-code.disabled{background-color:#e0e0e0;cursor:not-allowed}.dialog-valid-code .valid-code input{display:block;width:100%;height:40px;padding:0 10px;font-size:16px;color:#444;border:0;box-shadow:none;outline:0;box-sizing:border-box;margin:12px auto;-webkit-border-radius:4px;border-radius:4px}.dialog-valid-code .valid-code .btn-group:after{content:"";display:block;height:0;clear:both}'
                    + '.dialog-valid-code .valid-code .btn-submit{float:right;width:108px;height:40px;font-size:16px;line-height:40px;border:0;margin-left:5px;-webkit-border-radius:4px;border-radius:4px}.dialog-valid-code .valid-code .btn-cancel{float:left;width:108px;height:40px;font-size:16px;line-height:40px;border:0;cursor:pointer;color:#666;text-align:center;margin-right:5px;border-radius:4px;background-color:#f9f9f9;transition:.1s}.dialog-valid-code .valid-code .btn-cancel:hover{background-color:#fff}.dialog-valid-code .valid-code .btn-cancel:active{background-color:#f0f0f0}.b-btn,button{color:#fff;cursor:pointer;text-align:center;border-radius:4px;background-color:#00a1d6;vertical-align:middle;border:1px solid #00a1d6;transition:.1s;transition-property:background-color,border,color;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}</style>';
        $('head').append(style);


        // 发短信倒计时
        function countValidCode(btn) {
            var $btn = $(btn).eq(0);
            var time = 60;
            $btn.text('test');
            if (!$btn.hasClass('disabled')) {
                $btn.addClass('disabled');
                $btn.text(time + '秒后可重发');
                var interval = setInterval(function() {
                    if (time == 1) {
                        clearInterval(interval);
                        $btn.text('获取验证码');
                        $btn.removeClass('disabled');
                    } else {
                        time--;
                        $btn.text(time + '秒后可重发');
                    }
                }, 1000);
            }
        }



        function PhoneSms(options) {
            this.$dialog = null;
            this.options = {
                gameId: options.gameId || '',
                phone: options.phone || '',
                successOrderEvent: options.successOrderEvent || null,
                alreadyOrderEvent: options.alreadyOrderEvent || null
            };
            this.init();
        }

        PhoneSms.prototype.init = function() {
            var that = this;

            that.$dialog = $('<div class="dialog-valid-code"><div class="valid-code"><input type="text" id="valid-phone" placeholder="请输入手机号码" /><div class="code-wrap"><input type="text" id="valid-code" placeholder="请输入验证码" /><div class="btn-get-code">获取验证码</div></div><div class="btn-group"><div class="btn-cancel">取消</div><div class="b-btn btn-submit">提交</div></div></div></div>');

            // 初始化手机号
            that.$dialog.find('#valid-phone').val(that.options.phone);

            // 取消事件
            that.$dialog.find('.btn-cancel').click(function() {
                that.remove();
            });

            // 发送验证码
            that.$dialog.find('.btn-get-code').click(function() {
                var obj = this;
                if (!$(this).hasClass('disabled')) {

                    if (that.options.gameId != '') {
                        var phone = that.$dialog.find('#valid-phone').val().trim();

                        if (that.options.gameId && phone != '') {
                            Apis.getPhoneSms(that.options.gameId, phone).then(function(data) {
                                if (data.code == 0 && data.status == true) {
                                    countValidCode(obj);
                                } else {
                                    if (data.login == false) {
                                        that.redirectLogin();
                                    } else {
                                        alert(data.msg);
                                    }
                                }
                            }, function() {
                                alert('网络错误，请稍后重试~');
                            });
                        }
                    } else {
                        console.log('游戏id不存在');
                        alert('内部错误，请稍后重试~');
                    }
                }
            });

            // 提交按钮
            that.$dialog.find('.btn-submit').click(function() {
                var phone = that.$dialog.find('#valid-phone').val().trim();
                var code = that.$dialog.find('#valid-code').val().trim();

                if (that.options.gameId != '') {
                    if (phone != '' && code != '') {
                        Apis.phoneOrder(that.options.gameId, phone, code).then(function(data) {
                            if (data.code == 0) {
                                if (data.status == true) {
                                    if (typeof that.options.successOrderEvent === 'function') {
                                        that.options.successOrderEvent();
                                    } else {
                                        alert('恭喜您预约成功~');
                                    }
                                    that.remove();
                                } else {
                                    if (data.login == false) {
                                        that.redirectLogin();
                                    } else {
                                        alert(data.msg + '~');
                                    }
                                }
                            } else {
                                if (data.code == -202) {
                                    if (typeof that.options.alreadyOrderEvent === 'function') {
                                        that.options.alreadyOrderEvent();
                                    } else {
                                        alert(data.msg + '~');
                                    }
                                } else {
                                    alert(data.msg + '~');
                                }
                            }
                        }, function() {
                            alert('网络错误，请稍后重试~');
                        });
                    }
                } else {
                    console.log('游戏id不存在');
                    alert('内部错误，请稍后重试~');
                }

            });

            $('body').append(that.$dialog);

            that.show();
        };

        PhoneSms.prototype.redirectLogin = function() {
            window.location.href = "https://passport.bilibili.com/login?gourl=" + encodeURIComponent(location.href);
        };

        PhoneSms.prototype.show = function() {
            this.$dialog.addClass('show');
        };

        PhoneSms.prototype.remove = function() {
            this.$dialog.remove();
        };

        module.exports = PhoneSms;
    });
}
