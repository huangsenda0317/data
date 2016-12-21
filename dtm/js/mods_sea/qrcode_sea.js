/**
 * 根据文本自动生成二维码图片
 *
 * @param title 指定需要生成的文本
 * 使用时需要元素的宽高已知，或者使用 qr-width 和 qr-height 属性指定宽高
 */
 define(function(require, exports, module){
     require('http://static.biligame.net/lib/qrcodejs/qrcode-04f46c6.min');
     var codes = document.querySelectorAll('.-QRCoder');
     for (var i = 0; i < codes.length; i++) {
         var code = codes[i];
         new QRCode(code, {
             text: code.getAttribute("title"),
             width: code.getAttribute("qr-width") || 100,
             height: code.getAttribute("qr-height") || 100,
             colorLight : code.getAttribute("qr-colorLight") || "#ffffff"
         });
         code.removeAttribute("title"); // 有时会要求不显示地址
     }
 });
