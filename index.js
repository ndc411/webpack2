/**
 * Created by Administrator on 2016/11/14.
 */
var path = require('path');
var cwd = process.cwd();//cwd() 是当前执行node命令时候的文件夹地址
                        //__dirname 是被执行的js 文件的地址
var CURRENT_PATH = path.join(__dirname); // 获取到当前目录
    views_path = path.join(__dirname + '/src/'+'views/');
var content = require("./content");
// alert(content.name);
//document.write(content.content);
// alert(cwd+"------"+CURRENT_PATH);
var $ = require('jquery');
require("./index.css");
$('body').prepend('<div class="menu">' + '<ul>' +
    '<li><a id="home" href='+__dirname+'index.html>校园首页</a></li>' +
    '<li><a id="media" href=' + views_path + 'media/media.html>学校动态</a></li>' +
    '<li><a id="activities" href=' + views_path + 'activities/activities.html>精彩活动</a></li>' +
    '<li><a id="about" href=' + views_path + 'about/about.html>校园简介</a></li>' +
    '<li><a id="about" href=' + views_path + 'about/about.html>教师风采</a></li>' +
    '<li><a id="about" href=' + views_path + 'about/about.html>优秀毕业班</a></li>' +
    '<li><a id="contact" href=' + views_path + 'contact/contact.html>联系我们</a></li>' +
    '</ul>' +
    '</div>');
