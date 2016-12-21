// seajs 的简单配置
seajs.config({
    // seajs所在目录
    base: "http://static.biligame.net/lib/",

    // 目录配置
    paths: {
        // 公共库文件夹目录
        "lib": "http://static.biligame.net/lib",


        "mods_sea": "http://static.biligame.net/mods_sea"
    },
    alias: {
        // 加载主站的jquery
        "bilijquery": "http://static.hdslb.com/js/jquery.min",

        // 加载主站头部登录信息，修复登录的cookie不对应的bug，和跳转登录页面等功能
        "biliutil": "mods_sea/biliUtil_sea.js",

        // 加载主站头部登录信息，修复登录的cookie不对应的bug，和跳转登录页面等功能
        // ver 2.0
        "biliutil2.0": "mods_sea/biliUtil_sea.2.0.js",
        // v3.0: 去掉 jquery 依赖
        "biliutil3.0": "mods_sea/biliUtil_sea.3.0.js",

        // 根据不同的设备赋予对应url值，例如下载 ios、android、b站客户端等下载链接
        "device": "mods_sea/device_sea.js",

        // 根据不同的设备赋予对应url值，例如下载 ios、android、b站客户端等下载链接
        // ver 2.0
        // 改动：脱离 util 类，并且更改各个 href 的自定属性的命名
        "device2.0": "mods_sea/device_sea.2.0.js",

        // 根据设备 pc 和 h5 互跳
        "devredirect": "mods_sea/devredirect_sea.js",

        // bili 视频弹窗
        "bilivideo": "mods_sea/bilivideo.js",

        // 根据文本生成二维码图片
        "qrcode": "mods_sea/qrcode_sea.js",

        // 兼容 ie9 的异步请求
        "xdomainrequest": "lib/jquery-ajaxtransport-xdomainrequest/1.0.3/jquery.xdomainrequest.min.js",

        // 通用 api 的集合
        "apiUtils": "mods_sea/apiUtils_sea.js",
        // v2.0: 去掉 jquery 依赖
        "apiUtils2.0": "mods_sea/apiUtils_sea.2.0.js",

        // 显示预约人数
        "bookingSum": "mods_sea/bookingSum.js",

        // 轮播滑动插件
        "swiper": "lib/swiper/3.3.1/swiper.min.js",

        // 预约统计来源模块
        "yysource": "mods_sea/yySource_sea.js",
        // v2.0: 去掉 jquery 依赖
        "yysource2.0": "mods_sea/yySource_sea.2.0.js",

        // copy插件
        "zeroclipboard": "lib/zeroclipboard/2.3.0/ZeroClipboard.min.js",

        // copy插件-jquery版本
        "jquery-zeroclipboard": "lib/jquery-zeroclipboard/0.2.0/jquery.zeroclipboard.min.js",

        // vuejs
        "vuejs": "lib/vuejs/1.0.26/vue.min.js",

        // 宽屏模式
        "widescreen": "mods_sea/widescreen_sea.js",

        // 全局配置
        "configjs": "mods_sea/configjs.js",
        "configer": "mods_sea/configer.js",
        "configer-1.1": "mods_sea/configer-1.1.js",
        "downbtn": "mods_sea/downbtn.js",
        "ewm": "mods_sea/ewm.js",
        "ewm-2.0": "mods_sea/ewm-2.0.js",

        // 手机短信验证码模块
        "phonesms": "mods_sea/phoneSms.js",
        // v2.0: 去掉 jquery 依赖
        "phonesms2.0": "mods_sea/phoneSms.2.0.js",

        // doT
        "doT": "lib/dot/1.1.0/doT.min.js",
        "dotpl": "mods_sea/dotpl.js"
    }
});
