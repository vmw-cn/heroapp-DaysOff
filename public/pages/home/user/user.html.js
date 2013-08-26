(function (wndw) {
var jadify = function (jade) {
return function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),user = locals_.user;buf.push("<span class=\"account-name\">" + (jade.escape(null == (jade.interp = user.name ) ? "" : jade.interp)) + "</span>|<a" + (jade.attrs({ 'href':('' + (user.logoutUrl) + '') }, {"href":true})) + ">logout</a>");;return buf.join("");
}
};
"function" == typeof define && define.amd ? define("pages/home/user/user.html", ["js/lib/jade"], function (e) {
return jadify(e); 
}) : wndw.jade.templates.user= jadify(wndw.jade.helpers);
}(window));