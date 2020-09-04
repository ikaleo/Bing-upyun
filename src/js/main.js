//定义又拍云图片链接
const upyunDom = "https://upyuns.mcloc.cn/";

/* 获取指定日期 */
//获取指定日期 英文
function todayTimeEn(day) {
    var dt = new Date();
    dt.setDate(dt.getDate() - day);
    var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var mn = dt.getMonth();
    var dn = dt.getDate();
    if (dn < 10) {
        dn = '0' + dn;
    }
    var curtime = dn + "-" + m[mn] + "-" + dt.getFullYear();
    return curtime;
}

let today = todayTimeEn(0);
//日期格式 02-Sep-2020
/* 获取今日日期 end*/

/* 获取指定日期的HD图片url */
//日期格式 02-Sep-2020
function getImgUrlHd(date) {
    var imgUrlHd = upyunDom + "bing/" + date + "/" + date + ".jpg";
    return imgUrlHd;
}
/* 获取指定日期的HD图片url end*/

/* 获取指定日期的compress图片url */
//日期格式 02-Sep-2020
function getImgUrlCom(date) {
    var imgUrlCom = upyunDom + "bing/" + date + "/" + date + "-compress_25.jpg";
    return imgUrlCom;
}
/* 获取指定日期的com图片url end*/

/* 点击导航栏按钮下载今日图片 */
$("#btnToday").click(function () {
    var x = new XMLHttpRequest();

    var resourceUrl = getImgUrlHd(today);
    x.open("GET", resourceUrl, true);
    x.responseType = 'blob';

    x.onload = function (e) {
        // ie10+
        if (navigator.msSaveBlob) {
            var name = resourceUrl.substr(resourceUrl.lastIndexOf("/") + 1);
            return navigator.msSaveBlob(x.response, name);
        } else {
            var url = window.URL.createObjectURL(x.response)
            var a = document.createElement('a');
            a.href = url;
            a.download = today;
            a.click();
        }
    }
    x.send();
});
/* 点击导航栏按钮下载今日图片 end */

/* ajax获取图片信息 */
function getImgMsg(day) {
    var imgMsg = "";
    $.ajax({
        type: "GET",
        async: false,
        url: "https://bing.mcloc.cn/api/",
        data: `type=json&day=${day}`,
        success: function (msg) {
            imgMsg = $.parseJSON(msg);;
        }
    });
    return imgMsg;
}
/* ajax获取图片信息 end */

/* 图片渐进式加载 */
function imgpro(ele) {
    new Progressive({
        el: ele,
        lazyClass: 'lazy',
        removePreview: true,
        scale: true
    }).fire()
}

imgpro("#carousel-js");

for (let i = 0; i < 12; i++) {
    var ele = `#pic-js-son${i}`;
    imgpro(ele);
}

//思路：通过循环对每个id进行渐进
/* 图片渐进式加载 end */

/* 生成轮播图文字并插入 */
for (let i = 0; i < 3; i++) {
    var carouselStr = "";
    var imgMsg = getImgMsg(i);
    var imgTit = imgMsg["bing_title"];
    var imgTitS = imgTit.replace(/\([^\)]*\)/g, ""); //去除括号及空格
    imgTitS = imgTitS.replace(/\s*$/g, "");

    // var imgUrlDate = getImgUrlHd(todayTimeEn(i)); //生成HD图片url

    carouselStr = `
            <h5>${imgTitS}</h5>
            <p>${imgTit}</p>
    `
    $(".carousel-caption").eq(i).empty().append(carouselStr);
}
/* 生成轮播图文字并插入 end */

/* 生成缩略图文字并插入 */
for (let i = 0; i < 12; i++) {
    var imgMsg = getImgMsg(i);
    var imgTit = imgMsg["bing_title"];
    var imgTitS = imgTit.replace(/\([^\)]*\)/g, ""); //去除括号及空格
    imgTitS = imgTitS.replace(/\s*$/g, "");

    // var imgUrlDate = getImgUrlCom(todayTimeEn(i)); //生成com图片url

    $("#pic-js").children().eq(i).children("p").empty().append(imgTitS);
}
/* 生成缩略图文字并插入 end */