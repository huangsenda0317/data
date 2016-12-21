/**
 * 线下手动运行，输入需要拆分的字符串，获得用来拼接的两个数组
 * ver 2.0
 * 混淆： http://closure-compiler.appspot.com/home
 */

// var karr = [
//     0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
//     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
// ];
var karr = [
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a'
];

karr = karr.sort(function() {
    return 0.5 - Math.random();
});

// 获得 数组一
// console.log(karr);
console.log(karr.join(' '));

(function(str) {
    var ar = str.split('');
    var order = [];

    for (var i = 0; i < karr.length; i++) {
        karr[i] = eval("'" + '\\u00' + karr[i] + "'");
    }

    for (var i = 0; i < ar.length; i++) {
        order.push(karr.indexOf(ar[i]));
    }

    // 获得 数组二
    console.log(order);

})('85eabb5f58a46408');


// key对应表（暂存）
[
    {
        name: '三国罗曼史',
        domain: 'sglms.biligame.com',
        key: '85eabb5f58a46408'
        hkey: '(_=-~-~-~-~[])*-~-~[]+(-~_+(g(g(g(___=g(__=(![]+[])[_/_],_+_*-~-~[]+_),_+_*-~-~[]+_),_+_*-~-~[]+_),_+_*-~-~[]+_)))+__+___+___+-~_+g((g(g(g(___=g(__=(![]+[])[_/_],_+_*-~-~[]+_),_+_*-~-~[]+_),_+_*-~-~[]+_),_+_*-~-~[]+_)),_+_*-~-~[]+_)+-~_+_*-~-~[]+__+_+(-~-~_)+_+(_-_)+_*-~-~[]',
        hfun: 'function g(b,a){return(parseInt(b,a)+-~[]).toString(a)};'
    },
]
