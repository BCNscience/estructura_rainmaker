Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},a=function(){return n.apply(this instanceof i&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,a.prototype=new i,a});var app=app||function(){"use strict";function t(){if(m.wrapper){var t=a(),e=app.config.get("maxScale"),n=app.config.get("minScale");m.slides.style.width=t.slideWidth+"px",m.slides.style.height=t.slideHeight+"px",y=Math.min(t.availableWidth/t.slideWidth,t.availableHeight/t.slideHeight),y=Math.max(y,n),y=Math.min(y,e),"undefined"==typeof m.slides.style.zoom||navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)?c(m.slides,"translate(-50%, -50%) scale("+y+") translate(50%, 50%)"):m.slides.style.zoom=y,app.trigger("update:layout",{scale:y})}}function e(){return y}function n(){function t(){!window.Promise&&window.ES6Promise&&(window.Promise=window.ES6Promise.Promise),i.length&&head.js.apply(null,i),app.start.init()}function e(e){head.ready(e.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0],function(){"function"==typeof e.callback&&e.callback.apply(this),0===--a&&t()})}var n=[],i=[],a=0,r=app.config.get("dependencies"),o=app.config.get("transition"),s=app.config.get("monitoringAPI");o?m.wrapper.classList.add(o):m.wrapper.classList.add("linear"),app.start||r.unshift({src:"accelerator/js/core.js"}),window.touchy||r.push({src:"accelerator/lib/touchy.js"}),!window.ag&&s&&r.unshift({src:s}),window.Promise||r.unshift({src:"accelerator/lib/promise.min.js"});for(var p=0,l=r.length;l>p;p++){var c=r[p];(!c.condition||c.condition())&&(c.async?i.push(c.src):n.push(c.src),e(c))}n.length?(a=n.length,head.js.apply(null,n)):t()}function i(){var t=m.slides.querySelectorAll(".slide");return t.length>0&&p(t).forEach(function(t,e){t.id&&(m[t.id]=t)}),t}function a(){var t=m.wrapper.offsetWidth,e=m.wrapper.offsetHeight,n=app.config.get();t-=e*n.margin,e-=e*n.margin;var i=n.width,a=n.height,r=20;return"string"==typeof i&&/%$/.test(i)&&(i=parseInt(i,10)/100*t),"string"==typeof a&&/%$/.test(a)&&(a=parseInt(a,10)/100*e),{availableWidth:t,availableHeight:e,slideWidth:i,slideHeight:a,slidePadding:r}}function r(e){var a=app.config.get();e&&app.config.add(e),e.setup&&e.setup(app.config.get()),app.env&&a[app.env]&&app.config.add(a[app.env]),!app.lang&&a.lang&&(app.lang=a.lang),t();i();app.config.add({cachedElements:m}),setTimeout(function(){n()},50)}function o(t,e){t=t||null,e=e||{},app.initialize=!1;window.location.port||null;m.theme=document.querySelector("#theme"),m.wrapper=document.querySelector(".accelerator"),m.slides=document.querySelector(".accelerator .slides"),m.template=document.querySelector(".accelerator .template"),app.queryParams=h(window.location.search),app.queryParams&&(app.queryParams.env&&(app.env=app.queryParams.env),app.queryParams.lang&&(app.lang=app.queryParams.lang),app.queryParams.mode&&(app.mode=app.queryParams.mode)),t?app.config.fetch(t,function(){r(e)}):r(e)}function s(t){return b.call(arguments,1).forEach(function(e){for(var n in e)t[n]=e[n]}),t}function p(t){return Array.prototype.slice.call(t)}function l(t){var e=0;if(t){var n=0;p(t.childNodes).forEach(function(t){"number"==typeof t.offsetTop&&t.style&&("absolute"===t.style.position&&(n+=1),e=Math.max(e,t.offsetTop+t.offsetHeight))}),0===n&&(e=t.offsetHeight)}return e}function c(t,e){t.style.WebkitTransform=e,t.style.MozTransform=e,t.style.msTransform=e,t.style.OTransform=e,t.style.transform=e}function u(){if(window.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1}function f(t,e){var n=u();if(!n)throw new Error("XMLHttpRequest or ActiveXObject is not available. Cannot get file.");n.open("GET",t),n.onreadystatechange=function(){4===n.readyState&&(n.onreadystatechange=function(){},n.status>=200&&n.status<300||304==n.status||0==n.status&&"file:"==window.location.protocol?e(null,n.responseText):400===n.status?e({error:"Could not locate file"},null):e({error:n.status},null))},n.send(null)}function d(t){var e,n=document.createElement("div"),i=n.style;return t.toLowerCase()in i?e="":"Webkit"+t in i?e="-webkit-":"Moz"+t in i?e="-moz-":"ms"+t in i?e="-ms-":"O"+t in i&&(e="-o-"),e}function h(t){return(t||document.location.search).replace(/(^\?)/,"").split("&").map(function(t){return t=t.split("="),this[t[0]]=t[1],this}.bind({}))[0]}function g(){function t(t){var e=_.template(t);return e()}return t}var v="1.1.0",m={},y=1,w=[],b=w.slice;return window.addEventListener("resize",t,!1),setTimeout(function(){app.initialize&&app.initialize("config.json")},100),{initialize:o,layout:t,getScale:e,util:{extend:s,getAbsoluteHeight:l,toArray:p,transformElement:c,getFile:f,getBrowserPrefix:d,_templateParser:g},version:v}}();!function(){function t(t){var e=++a+"";return t?t+e:e}var e=[],n=e.push,i=e.slice,a=({}.toString,0),r=app.events={on:function(t,e,n){if(!s(this,"on",t,[e,n])||!e)return this;this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:n,ctx:n||this}),this},once:function(t,e,n){if(!s(this,"once",t,[e,n])||!e)return this;var i,a=this,r=function(){i||(i=!0,a.off(t,r),e.apply(this,arguments))};return r._callback=e,this.on(t,r,n)},off:function(t,e,n){var i,a,r,o,p,l,c,u;if(!this._events||!s(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events=void 0,this;for(o=t?[t]:Object.keys(this._events),p=0,l=o.length;l>p;p++)if(t=o[p],r=this._events[t]){if(this._events[t]=i=[],e||n)for(c=0,u=r.length;u>c;c++)a=r[c],(e&&e!==a.callback&&e!==a.callback._callback||n&&n!==a.context)&&i.push(a);i.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=i.call(arguments,1);if(!s(this,"trigger",t,e))return this;var n=this._events[t],a=this._events.all;return n&&p(n,e),a&&p(a,arguments),this},stopListening:function(t,e,n){var i=this._listeningTo;if(!i)return this;var a=!e&&!n;n||"object"!=typeof e||(n=this),t&&((i={})[t._listenId]=t);for(var r in i)t=i[r],t.off(e,n,this),(a||!Object.keys(t._events).length)&&delete this._listeningTo[r];return this}},o=/\s+/,s=function(t,e,i,a){if(!i)return!0;var r;if("object"==typeof i){for(var s in i)r=[s,i[s]],n.apply(r,a),t[e].apply(t,r);return!1}if(o.test(i)){for(var p=i.split(o),l=0,c=p.length;c>l;l++)r=[p[l]],n.apply(r,a),t[e].apply(t,r);return!1}return!0},p=function(t,e){var n,i=-1,a=t.length,r=e[0],o=e[1],s=e[2];switch(e.length){case 0:for(;++i<a;)(n=t[i]).callback.call(n.ctx);return;case 1:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r);return;case 2:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r,o);return;case 3:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r,o,s);return;default:for(;++i<a;)(n=t[i]).callback.apply(n.ctx,e)}},l={listenTo:"on",listenToOnce:"once"};Object.keys(l).forEach(function(e){var n=l[e];r[e]=function(e,i,a){var r=this._listeningTo||(this._listeningTo={}),o=e._listenId||(e._listenId=t("l"));return r[o]=e,a||"object"!=typeof i||(a=this),e[n](i,a,this),this}})}(),app.util.extend(app,app.events),app.config=function(){function t(t,e){for(var n in e)t[n]=e[n]}function e(t,e){var i=app.cache.get(t);i?(n(JSON.parse(i)),e()):app.util.getFile(t,function(i,a){var r;if(i)throw new Error("Unable to fetch configuration "+t,i);r=JSON.parse(a),r&&n(r),e()})}function n(e){t(s,e)}function i(t){return t?s[t]?s[t]:!1:s}function a(t,e){s[t]=e}function r(t,e,n){s[t]&&"object"==typeof s[t]?s[t][e]=n:(s[t]={},s[t][e]=n)}function o(t){s[t]&&n(s[t])}var s={width:960,height:700,margin:.1,minScale:.2,maxScale:1,controls:!0,progress:!0,history:!1,keyboard:!0,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,fragments:!0,embedded:!1,autoSlide:0,mouseWheel:!1,rollingLinks:!1,hideAddressBar:!0,previewLinks:!1,theme:null,transition:"linear",transitionSpeed:"default",backgroundTransition:"default",viewDistance:3,preload:!1,pathToSlides:"slides/<id>/",pathToModules:"modules/<id>/",monitoringAPI:"accelerator/lib/agnitio.js",dependencies:[],lazy:!1,remote:!1};return{fetch:e,add:n,get:i,set:a,update:r,storyboardSetup:o}}(),app.registry=function(){function t(t,e){i[t]=e(app),app.registry.trigger("register",t)}function e(t){return i[t]?!0:!1}function n(t){return t?e(t)?i[t]:null:i}var i={},a={add:t,exist:e,get:n};return app.util.extend(a,app.events),a}(),app.register=app.registry.add,app.util.extend(app.registry,app.events),app.cache=function(){function t(t,e){a[t]=e}function e(t){return a[t]?!0:!1}function n(t){return t?e(t)?a[t]:void 0:a}function i(t){return e(t)&&(a[t]=null),!0}var a={};return{put:t,exist:e,get:n,remove:i}}(),app.remote=function(){function t(t){n=t.role,i=t.path||null,app.config.set("remote",!0)}function e(){if(window.ag&&n){var t=function(){};app.slideshow.on("update:current",function(t){ag.msg.send({name:"slideEnter",value:app.getPath()})}),app.slide.on("state:enter",function(t){ag.msg.send({name:"stateEnter",value:JSON.stringify(t)})}),app.slide.on("reset",function(t){ag.msg.send({name:"stateExit",value:JSON.stringify(t)})}),"contact"===n&&(app.removeNavListeners(),app.slideshow.load=t,app.slideshow.goTo=t,app.slideshow.step=t,app.slideshow.next=t,app.slideshow.prev=t,app.slideshow.left=t,app.slideshow.right=t,app.slideshow.up=t,app.slideshow.down=t,ag.on("goTo",function(t){app.slideshow.__load__(t)}),ag.on("enterState",function(t){var e=JSON.parse(t),n=app.slide.get(e.view);n&&n.goTo(e.id,e.data)}),ag.on("resetState",function(t){var e=JSON.parse(t),n=app.slide.get(e.view);n&&n.reset()})),i&&app.slideshow.__load__(i)}}var n,i;return window.ag&&window.ag.on&&ag.on("registerUser",function(e){t(e)}),{init:t,setup:e}}();
/*! head.core - v1.0.2 */
(function(n,t){"use strict";function r(n){a[a.length]=n}function k(n){var t=new RegExp(" ?\\b"+n+"\\b");c.className=c.className.replace(t,"")}function p(n,t){for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}function tt(){var t,e,f,o;c.className=c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");t=n.innerWidth||c.clientWidth;e=n.outerWidth||n.screen.width;u.screen.innerWidth=t;u.screen.outerWidth=e;r("w-"+t);p(i.screens,function(n){t>n?(i.screensCss.gt&&r("gt-"+n),i.screensCss.gte&&r("gte-"+n)):t<n?(i.screensCss.lt&&r("lt-"+n),i.screensCss.lte&&r("lte-"+n)):t===n&&(i.screensCss.lte&&r("lte-"+n),i.screensCss.eq&&r("e-q"+n),i.screensCss.gte&&r("gte-"+n))});f=n.innerHeight||c.clientHeight;o=n.outerHeight||n.screen.height;u.screen.innerHeight=f;u.screen.outerHeight=o;u.feature("portrait",f>t);u.feature("landscape",f<t)}function it(){n.clearTimeout(b);b=n.setTimeout(tt,50)}var y=n.document,rt=n.navigator,ut=n.location,c=y.documentElement,a=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"},v,u,s,w,o,h,l,d,f,g,nt,e,b;if(n.head_conf)for(v in n.head_conf)n.head_conf[v]!==t&&(i[v]=n.head_conf[v]);u=n[i.head]=function(){u.ready.apply(null,arguments)};u.feature=function(n,t,i){return n?(Object.prototype.toString.call(t)==="[object Function]"&&(t=t.call()),r((t?"":"no-")+n),u[n]=!!t,i||(k("no-"+n),k(n),u.feature()),u):(c.className+=" "+a.join(" "),a=[],u)};u.feature("js",!0);s=rt.userAgent.toLowerCase();w=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);u.feature("mobile",w,!0);u.feature("desktop",!w,!0);s=/(chrome|firefox)[ \/]([\w.]+)/.exec(s)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||/(trident).+rv:(\w.)+/.exec(s)||[];o=s[1];h=parseFloat(s[2]);switch(o){case"msie":case"trident":o="ie";h=y.documentMode||h;break;case"firefox":o="ff";break;case"ipod":case"ipad":case"iphone":o="ios";break;case"webkit":o="safari"}for(u.browser={name:o,version:h},u.browser[o]=!0,l=0,d=i.browsers.length;l<d;l++)for(f in i.browsers[l])if(o===f)for(r(f),g=i.browsers[l][f].min,nt=i.browsers[l][f].max,e=g;e<=nt;e++)h>e?(i.browserCss.gt&&r("gt-"+f+e),i.browserCss.gte&&r("gte-"+f+e)):h<e?(i.browserCss.lt&&r("lt-"+f+e),i.browserCss.lte&&r("lte-"+f+e)):h===e&&(i.browserCss.lte&&r("lte-"+f+e),i.browserCss.eq&&r("eq-"+f+e),i.browserCss.gte&&r("gte-"+f+e));else r("no-"+f);r(o);r(o+parseInt(h,10));i.html5&&o==="ie"&&h<9&&p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(n){y.createElement(n)});p(ut.pathname.split("/"),function(n,u){if(this.length>2&&this[u+1]!==t)u&&r(this.slice(u,u+1).join("-").toLowerCase()+i.section);else{var f=n||"index",e=f.indexOf(".");e>0&&(f=f.substring(0,e));c.id=f.toLowerCase()+i.page;u||r("root"+i.section)}});u.screen={height:n.screen.height,width:n.screen.width};tt();b=0;n.addEventListener?n.addEventListener("resize",it,!1):n.attachEvent("onresize",it)})(window);
/*! head.css3 - v1.0.0 */
(function(n,t){"use strict";function a(n){for(var r in n)if(i[n[r]]!==t)return!0;return!1}function r(n){var t=n.charAt(0).toUpperCase()+n.substr(1),i=(n+" "+c.join(t+" ")+t).split(" ");return!!a(i)}var h=n.document,o=h.createElement("i"),i=o.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),c="Webkit Moz O ms Khtml".split(" "),l=n.head_conf&&n.head_conf.head||"head",u=n[l],f={gradient:function(){var n="background-image:";return i.cssText=(n+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+n)+s.join("linear-gradient(left top,#eee,#fff);"+n)).slice(0,-n.length),!!i.backgroundImage},rgba:function(){return i.cssText="background-color:rgba(0,0,0,0.5)",!!i.backgroundColor},opacity:function(){return o.style.opacity===""},textshadow:function(){return i.textShadow===""},multiplebgs:function(){i.cssText="background:url(https://),url(https://),red url(https://)";var n=(i.background||"").match(/url/g);return Object.prototype.toString.call(n)==="[object Array]"&&n.length===3},boxshadow:function(){return r("boxShadow")},borderimage:function(){return r("borderImage")},borderradius:function(){return r("borderRadius")},cssreflections:function(){return r("boxReflect")},csstransforms:function(){return r("transform")},csstransitions:function(){return r("transition")},touch:function(){return"ontouchstart"in n},retina:function(){return n.devicePixelRatio>1},fontface:function(){var t=u.browser.name,n=u.browser.version;switch(t){case"ie":return n>=9;case"chrome":return n>=13;case"ff":return n>=6;case"ios":return n>=5;case"android":return!1;case"webkit":return n>=5.1;case"opera":return n>=10;default:return!1}}};for(var e in f)f[e]&&u.feature(e,f[e].call(),!0);u.feature()})(window);
/*! head.load - v1.0.3 */
(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);
/*
//# sourceMappingURL=/accelerator/lib/head.min.js.map
*/
(function(){
    'use strict';

    document.addEventListener('ready', function() {

      // Prevent vertical bouncing of slides if tablet or bigger
      document.ontouchmove = function(event){
        var currentWidth = app.dom.get('wrapper').getBoundingClientRect().width;
        if(currentWidth >= 768) event.preventDefault();
      };

      if (window.ag && window.ag.data) {
        ag.data.getPresenter(); // data available through ag.data.presenter
        ag.data.getCallContacts(); // data available through ag.data.call_contacts
      }
      
    })

})();
app.register('ag-auto-menu', function () {
    var self;

    return {
        template: '<div class="menu-container"><ul class="menu"></ul></div>',
        current: '',
        fallback: '', // if no menu is built
        publish: {
            hide: false, // Should we initially hide menu?
            placement: ['top', 'bottom'], // top or bottom?
            exclude: '', // Some content that should not be in the menu?
            slideshows: '',
            binding: 77,
            trigger: ''
        },
        events: {
            "tap li": "navigate",
            "tap .menu-container": function (e) {
                if (this.stateIsnt('hidden')) {
                    this.goTo('hidden');
                    app.$.toolbar.hide();
                }
                else
                    this.goTo('open');
            },
            "swipeleft": function (event) {
                event.stopPropagation();
            },
            "swiperight": function (event) {
                event.stopPropagation();
            }
        },
        states: [
            {
                id: 'hidden',
                onEnter: function () {
                    if (this.props.placement === 'bottom') {
                        app.util.transformElement(this.$el, 'translate(0,62px)');
                    }
                    else {
                        app.util.transformElement(this.$el, 'translate(0,-62px)');
                    }
                },
                onExit: function () {
                    app.util.transformElement(this.$el, 'translate(0,0)');
                }
            },
            {
                id: 'open'
            }
        ],
        onRender: function (el) {
            self = this;
            /* antwerpes modification */
            self.appWidth = $(window).width();
            /* end antwerpes modification*/

            if (app.env == 'ag-microsites' || app.env == 'ag-remote') {
                $(el).hide();
            }

            self.pathLength = 2; // Default to menu of structures
            app.$.menu = this;
            if (this.props.hide) {
                this.hide();
                if (this.props.binding) {
                    app.config.update('keyboard', parseInt(this.props.binding, 10), function () {
                        app.$.trigger("toggle:menu");
                    })
                }
            }
            app.$.on('toggle:menu', function () {
                this.toggle('hidden');
            }.bind(this));
            if (this.props.placement === 'bottom') el.classList.add('placement-bottom');
            // Are we using this menu with specific slideshows?
            if (this.props.slideshows) {
                this.props.slideshows.replace(/\s+/g, ''); // "one, two" => "one,two"
                this.props.slideshows = this.props.slideshows.split(',');
            }
            app.listenTo(app.slideshow, 'update:current', this.updateCurrent);
            app.listenTo(app.slideshow, 'load', function (data) {
                self.setup(data.id);
            });
            this.layout({scale: app.getScale()});
            app.on('update:layout', this.layout);
            this.setup();
        },
        hide: function () {
            this.goTo('hidden');
        },
        setup: function (id) {
            id = id || app.slideshow.getId();
            if (!this.props.slideshows || this.props.slideshows.indexOf(id) > -1) {
                this.createLinks(id);
                this.updateCurrent();
            }
            else {
                this.removeLinks();
            }
            this.setTrigger();
        },
        setTrigger: function () {
            if (this.props.trigger) {
                var parts = this.props.trigger.split(' ');
                var e = parts[0];
                var selector = parts[1] || null;
                var el = document;
                if (selector) {
                    el = document.body.querySelector(selector);
                }
                if (el) el.addEventListener(e, function () {
                    self.toggle('hidden');
                });
            }
        },
        createLinks: function (structure) {
            var list = this.$('.menu')[0];
            var structure = structure || app.slideshow.getId();
            var html = '';
            var chapter, links;
            var data = structure === 'storyboard' ? app.model.getStoryboard() : app.model.getStoryboard(structure);
            var pathPrefix = structure + '/';
            var excludedLinks = this.props.exclude.split(' ');

            if (data && data.content) {
                links = data.content;

                // If a single item in menu, let's try to dive down and get more links
                if (links.length === 1) {
                    chapter = data.content[0];
                    data = app.model.getStructure(chapter);
                    if (data && data.content) {
                        links = data.content;
                        pathPrefix += chapter + '/';
                        this.pathLength = 3;
                    }
                }

            }

            if (!list) {
                list = document.createElement('ul');
                list.classList.add('menu');
                this.$el.appendChild(list);
            }
            else {
                list.innerHTML = '';
            }

            if (links) {
                links.forEach(function (item, i) {
                    if (typeof item !== 'string') item = item[0];
                    if (excludedLinks.indexOf(item) === -1) {
                        var name = app.model.getItem(item).name;
                        html += '<li data-goto="' + pathPrefix + item + '">' + name + '</li>';
                    }
                });

                list.appendChild(app.dom.parse(html));
                this.createScroller(list);
            }
        },
        setFallback: function (html) {
            if (html) this.fallback = html;
        },
        removeLinks: function () {
            var list = this.$('.menu')[0];
            list.innerHTML = this.fallback;
        },
        updateCurrent: function () {
            var path = app.getPath();
            var parts = path.split('/');
            if (parts.length > 2 && self.pathLength === 2) path = parts[0] + '/' + parts[1];
            if (self.current) self.current.classList.remove('selected');
            self.current = self.el.querySelector('.menu [data-goto="' + path + '"]');
            if (self.current) self.current.classList.add('selected');


            /*antwerpes modification */
            if (self.scroller) {
                var moveTo;
                if (self.getWidth().menu > self.appWidth) {
                    if (self.current) var pos = $(self.current).position();
                    if (self.current) var outerWidth = $(self.current).outerWidth();

                    if ((pos.left + outerWidth) > self.appWidth) {
                        moveTo = self.scroller.config.limitsX[0];

                    }
                    else if ((pos.left + outerWidth) < self.getWidth().menu) {
                        moveTo = 0;
                    }

                    setTimeout(function () {
                        return self.scroller.moveTo(moveTo, 0)
                    }, 500);
                }
            }


            /*antwerpes modification end */


        },
        navigate: function (event) {
            var link = event.target;
            var path;

            if (link) {
                path = link.getAttribute('data-goto');
                if (path) {
                    app.goTo(path);
                    self.updateCurrent(); // Immediate update of menu
                }
                if (self.props.hide) app.$.trigger("toggle:menu");
            }
        },
        createScroller: function (menu) {
            // TODO: listen to window resize and update limits
            var widths = this.getWidth();
            var appWidth = app.dom.get('wrapper').getBoundingClientRect().width;
            var scrollLimit = appWidth - widths.menu;
            // No scroller necessary if menu isn't bigger than width of view
            if (scrollLimit < 0) {
                this.scroller = new Draggy(menu, {
                    restrictY: true,
                    limitsX: [scrollLimit, 0]
                });
            }
            else {
                this.scroller = null;
            }
        },
        getWidth: function () {
            var links = this.el.querySelectorAll('.menu li');
            var menuWidth = 0;
            var linkWidths = [];
            Array.prototype.slice.call(links).forEach(function (link) {
                var width = link.getBoundingClientRect().width;
                menuWidth += width;
                linkWidths.push(width);
            });
            return {
                menu: menuWidth,
                links: linkWidths
            }
        },
        layout: function (data) {
            // Only apply if zoom is supported
            if (typeof self.el.style.zoom !== 'undefined' && !navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)) {
                self.el.style.zoom = data.scale;
            }
            // Apply scale transform as a fallback
            else {
                app.util.transformElement(self.el, 'translate(-50%, -50%) scale(' + data.scale + ') translate(50%, 50%)');
            }
        },

        moveToCurrent: function (data) {

        }
    }
});
app.register('ag-slide-analytics', function() {

  /**
   * Agnitio Slide Analytics Module
   *
   * This module will save data about
   * the slides visited.
   *
   * Usage:
   * Include <div data-modules="ag-slide-analytics"></div>
   * in index.html. See docs for more info.
   */

  var self;
  return {
    template: false,
    // The interface to this module
    publish: {
      debug: false,
      map: "", // Provide the namespace for map, e.g. "monitorMap" => window.monitorMap
      offset: 0, // e.g. if 1: default/safety/study => safety/study
      skip: ""
    },
    onRender: function(el) {
      self = this;
      app.listenTo(app.slide, 'slide:enter', this.save.bind(this));
      if (this.props.debug) ag.debug(true);
    },
    /**
     * Assign correct id or name
     * Get correct id and name for chapter, subchapter and slide
     * Lookup order:
     * 1. map[id]
     * 2. app.json[type]['name']
     * 3. id
     * @private
     * @param id STRING Id of structure to find label for
     * @param itemType STRING One of 'slide', 'chapter', or 'slideshow'
     */
    assignValues: function(id, itemType) {
      var val;
      var data;
      var name;

      if (itemType === 'slide') {
        data = app.model.getSlide(id);
      }
      else if (itemType === 'chapter') {
        data = app.model.getStructure(id);
      }
      if (itemType === 'slideshow') {
        data = app.model.getStoryboard(id);
      }

      if (data) {
        // If specific id and name has been specified
        // for monitoring in presentation.json
        if (data.monitoring) {
          id = data.monitoring.id || id;
          name = data.monitoring.name || data.name;
        }
        else if (this.map && this.map[id]) {
          id = this.map[id].id || id;
          name = this.map[id].name || data.name;
        }
        else {
          name = data.name;
        }
        return {id: id, name: name};
      }
      return {id: id, name: null};
    },
    save: function(data) {
      var id = data.id;
      var path = app.getPath();
      var index = app.slideshow.getIndex();
      var slideIndex = index.v ? index.v : index.h;
      var components = app.slideshow.resolve();
      var subChapterId = components.chapter || null;
      var chapterId = components.slideshow || null;
      var chapter = {id: null, name: null};
      var subChapter = {id: null, name: null};
      var slide = this.assignValues(id, 'slide');
      
      if (subChapterId) subChapter = this.assignValues(subChapterId, 'chapter');
      if (chapterId) chapter = this.assignValues(chapterId, 'slideshow');

      // Slide id and name are required
      if (!slide.name) {
        if (console.error) console.error('Slide will not be monitored! Name must be specified for "' + data.id + '"');
        return;
      }

      if (window.ag) {
        ag.submit.slide({
          id: slide.id,
          name: slide.name,
          path: path,
          slideIndex: slideIndex,
          chapter: chapter.name,
          chapterId: chapter.id,
          subChapter: subChapter.name,
          subChapterId: subChapter.id
        })
      }
    }
  }
});
app.register('ag-slide-popup', function() {
  return {
    slideEl: null,
    popupScript: null,
    loaded: false,
    popupEl: null,
    template: false,
    publish: {
      slide: null,
      trigger: null,
      noCloseBtn: false,
      popupClass: null
    },
    events: {
      "tap .close-popup-btn": function(e) { e.stopPropagation(); this.close()}
    },
    states: [
      {
        id: 'open',
        label: 'Open popup',
        onEnter: function() {
          if (!this.loaded) this.renderContent();
          if (this.popupScript && this.popupScript.onEnter) this.popupScript.onEnter(this.slideEl);
          this.popupEl.classList.add('state-open');
          app.trigger('open:popup', {id: this.id});
          var self = this;
          $('.close-popup-btn').on('click', function(){
              self.close();
          });
        },
        onExit: function() {
          if (this.popupScript && this.popupScript.onExit) this.popupScript.onExit(this.slideEl);
          this.popupEl.classList.remove('state-open');
          app.trigger('close:popup', {id: this.id});
        }
      }
    ],
    onRender: function(el) {
      var slideId = this.props.slide;
      var self = this;

      this.createContainer();
      this.setTrigger();
      this.addCloseBtn();

      if (slideId) {
        // Fetch the slide but don't render it yet
        app.slide.load(slideId, function(data) {
          this.slideEl = app.dom.get(slideId);
        });
      }
      else {
        this.slideEl = el.querySelector('[data-partial]');
        this.loaded = true;
      }
    },
    onRemove: function() {
      this._removeElement();
    },
    open: function(e) {
      if (this.stateIsnt('open')) this.goTo('open');
    },
    close: function() {
      if (this.stateIs('open')) this.reset();
    },
    renderContent: function() {
      this.loaded = true;
      app.dom.render(this.props.slide, this.popupEl);
      this.popupScript = app.slide.get(this.props.slide);
    },
    createContainer: function() {
      this.popupEl = document.createElement('DIV');
      this.popupEl.classList.add("ag-slide-popup");
      if (this.props.popupClass) this.popupEl.classList.add(this.props.popupClass);
//      this.el.appendChild(this.popupEl);
//EDITED!!
        var slide  = this.el.parentNode;
        slide.appendChild(this.popupEl);
    },
    setTrigger: function() {
      if (this.props.trigger) {
        var parts = this.props.trigger.split(' ');
        var e = parts[0];
        var selector = parts[1] || null;
        if (selector) {
          this.parent.delegate(e, selector, this.open.bind(this));
        }
        else {
          this.delegate(e, this.open.bind(this));
        }
      }
    },
    addCloseBtn: function() {
      if (!this.props.noCloseBtn) {
//        var el = app.dom.parse('<div class="close-popup-btn">[ X ]</div>');
        var el = app.dom.parse('<div class="close-popup-btn"></div>');
        this.popupEl.appendChild(el);
      }
    }
  }
});
app.register("ag-video", function() {

    // This module makes videos stateful so that they'll work remotely
    // ... and fix some layering issues that default controls cause
    // Usage: <div src="modules/ag-video/assets/myvideo.mp4" data-module="ag-video">

    var self = null;
    return {
        publish: {
            src: "",
            poster: "",
            type: "video/mp4",
            monitor: false
        },
        events: {
            "playing video": function() {this.goTo('play')},
            "pause video": function() {this.goTo('pause')},
            "tap .ag-video-play-toggle": 'toggleVideo',
            "tap .ag-upper-click-layer": 'toggleVideo',
            "tap .ag-video-fullscreen-button": 'toggleFullscreen',
            "swipeleft .ag-video-controls": 'noSwipe',
            "swiperight .ag-video-controls": 'noSwipe',
            "swipeleft": 'checkIfSwipe',
            "swiperight": 'checkIfSwipe',
            "swipeup": 'checkIfSwipe',
            "swipedown": 'checkIfSwipe',
            "onDrop .ag-video-seek-ele": 'handleDrop'
        },
        states: [
            {
                id: 'play',
                onEnter: function() {
                    this.videoEle.play();
                }
            },
            {
                id: 'pause',
                onEnter: function() {
                    this.videoEle.pause();
                    if (this.props.monitor) {
                        ag.submit.data({
                            category: "Video viewed",
                            label: this.props.src,
                            value: this.formatTime(this.currentPlayTime),
                            valueType: "time",
                            path: app.getPath(),
                            unique: true
                        });
                    }
                }
            }
        ],
        onRender: function(el) {
            self = this;
            this.currentPlayTime = 0;
            this.videoEle = this.el.querySelector('.ag-video-element');
            this.progressBar = this.el.querySelector('.ag-video-progress-bar');
            this.currentTimeText = this.el.querySelector('.ag-video-current-time');
            this.endTimeText = this.el.querySelector('.ag-video-total-time');
            this.videoContainer = this.el.querySelector('.ag-video-container');
            this.seekEle = this.el.querySelector('.ag-video-seek-ele');
            this.progressBarContainer = this.el.querySelector('.ag-video-progress-container');

            // this.videoEle.addEventListener('error', this.fallBackSrc.bind(this));
            this.videoEle.src = this.props.src;
            this.videoEle.poster = this.props.poster;
            this.videoEle.type = this.props.type;

            // Make sure play and pause is passed on if handled with default controls
            this.videoEle.addEventListener('playing', function() {
                if (self.stateIsnt('play')) self.goTo('play');
            });
            this.videoEle.addEventListener('pause', function() {
                if (self.stateIsnt('pause')) self.goTo('pause');
            });

            // Wait for for everything to finish loading
            setTimeout(function(){
                self.seekHandle = new Draggy(self.seekEle, {
                  restrictY: true, limitsX: [0, self.progressBarContainer.offsetWidth], onChange: self.moveSeekHandle
                });
            },100);
        },
        // If can't load src as specified, then try to load from "slides/[parentId]/[src specified]"
        // This is to make it work if lazyloaded
        // TODO: use slides path in config
        fallBackSrc: function(event) {
            var el = event.target;
            // el.removeEventListener('error', this.fallBackSrc.bind(this));
            el.src = "slides/" + this.parentId + "/" + this.props.src;
        },
        onEnter: function(el) {
            this.videoEle.addEventListener('timeupdate', this.setTime);
            document.addEventListener('webkitfullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('mozfullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('fullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('MSFullscreenChange', this.addFullscreenClass, false);
            window.addEventListener('resize', this.updateSeekHandle, false);
        },
        onExit: function(el) {
            this.videoEle.removeEventListener('timeupdate', this.setTime);
            document.removeEventListener('webkitfullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('mozfullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('fullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('MSFullscreenChange', this.addFullscreenClass, false);
            window.removeEventListener('resize', this.updateSeekHandle, false);
            if (this.stateIs('play')) this.goTo('pause');
        },
        onRemove: function() {
            this._removeElement();
        },
        noSwipe: function(e){
            e.stopPropagation();
        },
        checkIfSwipe: function(e){
            // prevent swiping in fullscreen mode
            if(self.el.classList.contains('ag-video-fullscreen'))
                self.noSwipe(e);
        },
        toggleVideo: function(e){
            if(this.stateIs('play'))
                this.goTo('pause');
            else
                this.goTo('play');
        },
        setTime: function(e) {
            self.currentPlayTime = self.videoEle.currentTime;
            self.updateProgress();
        },
        updateProgress: function(time) {
            this.currentPlayTime = time || this.currentPlayTime;
            var seekHandlePos = 0;
            var value = 0;
            
            if (this.currentPlayTime > 0) {
                value = Math.floor((100 / this.videoEle.duration) * this.currentPlayTime);
            }

            var videoCurrentTime = this.formatTime(this.currentPlayTime);
            var videoEndTime = this.formatTime(this.videoEle.duration);

            this.currentTimeText.innerHTML = videoCurrentTime;
            this.endTimeText.innerHTML = videoEndTime; 

            this.progressBar.style.width = value + "%";

            seekHandlePos = value * 0.01 * this.progressBarContainer.offsetWidth;
            this.seekHandle.moveTo(seekHandlePos);
        },
        formatTime: function(seconds) {
            var s = Math.floor(seconds % 60),
                m = Math.floor(seconds / 60 % 60),
                h = Math.floor(seconds / 3600);

            if (h > 0) {
                h = ((h < 10) ? "0" + h : h) + ":";
            }
            else {
                h = "00:";
            }

            if (m > 0) {
                m = ((m < 10) ? "0" + m : m) + ":";
            }
            else {
                m = "00:";
            }

            // Check if leading zero is need for seconds
            s = (s < 10) ? "0" + s : s;

            return h + m + s;
        },
        toggleFullscreen: function(e){
            var fullscreenEle = document.fullscreenElement || document.msFullscreenElement || 
                                document.mozFullScreenElement || document.webkitCurrentFullScreenElement;

            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i )){
                if (this.videoEle.webkitEnterFullscreen){
                    this.videoEle.webkitEnterFullscreen();
                }
            }
            else{
                if (this.videoContainer.requestFullscreen) {
                    if(fullscreenEle)
                        document.exitFullscreen();
                    else
                        this.videoContainer.requestFullscreen();
                } 
                else if (this.videoContainer.msRequestFullscreen) {
                    if(fullscreenEle)
                        document.msExitFullscreen();
                    else
                        this.videoContainer.msRequestFullscreen();
                } 
                else if (this.videoContainer.mozRequestFullScreen) {
                    if(fullscreenEle)
                        document.mozCancelFullScreen();
                    else
                        this.videoContainer.mozRequestFullScreen();
                } 
                else if (this.videoContainer.webkitRequestFullscreen) {
                    if(fullscreenEle)
                        document.webkitCancelFullScreen();
                    else
                        this.videoContainer.webkitRequestFullscreen();
                }
            }
        },
        addFullscreenClass: function(){
            var fullscreenEle = document.fullscreenElement || document.msFullscreenElement || 
                                document.mozFullScreenElement || document.webkitCurrentFullScreenElement;

            if (fullscreenEle) {
                self.el.classList.add('ag-video-fullscreen');
            }
            else{
                self.el.classList.remove('ag-video-fullscreen');
            }
        },
        updateSeekHandle: function(){
            // draggy - changes limits and position on window resize
            self.seekHandle.config.limitsX[1] = self.progressBarContainer.offsetWidth;
            var seekHandlePos = self.videoEle.currentTime / self.videoEle.duration * self.progressBarContainer.offsetWidth;
            self.seekHandle.moveTo(seekHandlePos);
        },
        moveSeekHandle: function(x, y){
            // updates progressbar
            var currentPos = x / self.progressBarContainer.offsetWidth;
            self.updateProgress(self.videoEle.duration * currentPos);
        },
        handleDrop: function(e) {
            // moves handle
            var pos = e.target.position;
            var currentPos = pos[0] / self.progressBarContainer.offsetWidth;
            self.videoEle.currentTime = self.videoEle.duration * currentPos;
        }
    }

});
/* global app */
/* global ag */
app.register("ag-viewer", function() {

  /**
   * Agnitio Viewer Module
   *
   * This module will open URLs or PDF documents
   * in iFrame on top of presentation.
   *
   * Usage:
   * - Call ag.openPDF in non-agnitio app or on the web
   * - Call ag.openURL in non-agnitio app or on the web
   * - Add 'data-viewer="browser"' to a link (<a>)
   */

  return {
    template: false,
    publish: {
        
    },
    events: {
      "tap .close": "closeViewer"
    },
    states: [],
    onRender: function(el) {

        // app.on('ready', this.init.bind(this));

        this.frame = null;
        this.content = [];
        this.inDevice = true;

        var info = ag.platform.info();

        // If non-Engager, let's open PDFs in viewer
        if (!info || (info.localizedModel !== "iPad" && info.platform !== "Windows")) {
            this.inDevice = false;
            ag.on('openPDF', this.openContent.bind(this));
        }
        ag.on('openURL', this.openContent.bind(this));
        ag.on('openSlide', this.openSlide.bind(this));

        document.addEventListener('click', this.handleClick.bind(this));
      
    },
    onRemove: function(el) {
        this._removeElement(); // Will undelegate events
    },
    handleClick: function(event) {
        var el = event.target;
        var attr = el.getAttribute('data-viewer') || el.hasAttribute('data-viewer');
        var href = el.getAttribute('href') || attr;
        if (attr) {
            event.preventDefault();
            event.stopPropagation();
            if (attr === "slide") {
                if (!href) return;
                ag.publish('openSlide', {slide: href});
            }
            else if (href) {
                if (/.pdf/.test(href)) {
                    ag.openPDF(href);
                }
                else if (ag.openURL && typeof href === 'string') {
                    ag.openURL(href);
                }
            }
        }
    },
    openLink: function(link) {
      var href = link.getAttribute('href');
      if (ag.openURL) ag.openURL(href);
    },
    closeViewer: function() {
        app.unlock();
        var last = this.content.length - 1;
        var view = this.content[last];
        if (view.slide) {
            app.slide.remove(view.slide, true);
        }
        view.container.classList.remove('loaded');
        view.container.classList.remove('visible');
        this.el.removeChild(view.container);
        this.frame = null;
        view.container = null;
        this.content.pop();
    },
    openContent: function(path) {
        var view = {};
        var markup = [
            '<header>',
                '<a class="close" href="#"><span class="icon"></span></a>',
            '</header>',
            '<div class="spinner"></div>',
            '<div class="viewport">',
                '<iframe src="'+ path +'"></iframe>',
            '</div>'
        ];
        if (!this.inDevice) markup.splice(2, 0, '<a class="external" href="'+ path +'" target="_blank"><span class="icon"></span></a>');
        view.container = document.createElement('div');
        view.container.classList.add('preview-link-overlay');
        this.el.appendChild(view.container);
        view.container.innerHTML = markup.join('');
        this.frame = this.el.querySelector('iframe');
        this.frame.addEventListener('load', this.load.bind(this));
        this.content.push(view);
        setTimeout(function() {
            view.container.classList.add('visible');
        },1);
        app.lock();
    },
    openSlide: function(data) {
        var viewer = document.createElement('div');
        var view = {};
        viewer.classList.add('viewport');
        // Need to remove slide if already loaded in presentation
        app.slide.remove(data.slide, true);
        view.slide = data.slide;
        view.container = document.createElement('div');
        view.container.classList.add('preview-link-overlay');
        this.el.appendChild(view.container);
        view.container.innerHTML = [
            '<header>',
                '<a class="close" href="#"><span class="icon"></span></a>',
            '</header>',
            '<div class="spinner"></div>'
        ].join('');
        app.dom.insert([{id: data.slide}], false, viewer);
        view.container.appendChild(viewer);
        this.content.push(view);
        setTimeout(function() {
            view.container.classList.add('visible');
            view.container.classList.add('loaded');
        },1);
        app.lock();
    },
    load: function() {
        var last = this.content.length - 1;
        this.content[last].container.classList.add('loaded');
        this.frame.removeEventListener('load', this.load.bind(this));
    }
  }

});
app.register("ap-add-slide-button", function() {

  var self;
  return {
    publish: {
        
    },
    events: {
      "tap .addButton": "addSlide"
    },
    states: [
      {
        id: "added"
      }

    ],
    onRender: function(el) {

      self = this;

      app.$.on('clear:addedSlides', function () {
        this.reset();
      }.bind(this));


      app.$.on('remove:addedSlide', function(data){
        self.updateState(data);
      }.bind(this));

      app.listenTo(app.slide, 'slide:enter', this.updateState.bind(this));

      if (app.env == 'ag-microsites' || app.env == 'ag-remote') {
        $(el).hide();
      }

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    updateState: function(data) {

      if(app.$.provideSlides.addedSlides.indexOf(data.id) === -1){
        this.reset();
      }else
      {
        this.goTo("added");
      }

    },

    addSlide: function(){

      if(this.stateIs("added")){
        this.reset();
        app.$.provideSlides.removeSlide(app.slide.get().id);
      }
      else{
        this.goTo("added");
        app.$.provideSlides.addSlide(app.slide.get().id);
      }

    }
  }

});
app.register("ap-auto-menu-handle", function() {

  return {
    publish: {
        
    },
    events: {

    },
    states: [],
    onRender: function(el) {
      
    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    }
  }

});
app.register("ap-auto-references", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenToOnce(app.slide, 'slide:enter', this.addAutoReferences.bind(this));
            app.listenTo(app.slideshow, 'load', this.addAutoReferences.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        addAutoReferences: function (data) {

            // Load all slide html files of the currently loaded collection
            // and gather all unique reference ids (asynchronously):

            $("article.slide").each(function() {
                var $slide = $(this);
                var referenceIds = {}; // unique reference ids
                $slide.find("[data-reference-id]").each(function () {

                    referenceIds[$(this).attr("data-reference-id")] = true;
                });
                referenceIds = Object.keys(referenceIds);

                // Find media resources associated with the collected reference ids:
                var references = {};
                $.each(window.mediaRepository.metadata(), function (file, meta) {

                    if (referenceIds.indexOf("" + meta.referenceId) > -1) {
                        references[file] = meta;
                    }
                });

                var $list = $("<ul class='references'/>");
                // Render all references into the list:
                $list.append($.map(references, function (meta, file) {
                    return window.mediaRepository.render(file, meta);
                }));
                $slide.find(".auto-side-clip").prepend($list);

            });

        }
    }

});
app.register("ap-auto-side-clip", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenTo(app.slide, 'slide:enter', this.autoSideClipHandler.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        autoSideClipHandler: function (data) {
            var $slide = $("#" + data.id);

            // search for auto-side-clip elements not already set up
            $slide.find(".auto-side-clip:not(.configured)").each(function () {

                // mark thise auto-side-clip as already set up
                var $content = $(this).addClass("configured");

                var $sideClipHandle = $("<div class='sideClipHandle'/>");

                $content.wrap("<div class='contentContainer'/>"); //fixes webkit scroll render bug
                var $contentContainer = $content.parent();

                $contentContainer.wrap("<div class='sideClipContainer'/>");
                var $sideClipContainer = $contentContainer.parent();

                $sideClipHandle.appendTo($sideClipContainer);
                var $sideClipOverlay = $("<div class='sideClipOverlay'/>");
                $sideClipOverlay.insertBefore($sideClipContainer);

                function toggleSideClip() {
                    $sideClipContainer.toggleClass("active");
                    $sideClipOverlay.toggleClass("active");
                }

                $sideClipHandle.add($sideClipOverlay).on("tap", toggleSideClip);

                $sideClipOverlay.on("swipedown swipeup swiperight swipeleft", function (e) {
                    toggleSideClip();
                    e.stopPropagation();
                });
                $sideClipContainer.on("swipedown swipeup swiperight swipeleft", function (e) {
                    e.stopPropagation();
                });
            });
        }
    }

});
app.register("ap-auto-references-popup", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenTo(app.slide, 'slide:enter', this.autoReferencePopupHandler.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        autoReferencePopupHandler: function (data) {
            var $slide = $("#" + data.id);

            $slide.find("[data-reference-id]")
                .off('tap.auto-references-popup')
                .on('tap.auto-references-popup', function () {

                    // Collect unique reference ids:
                    var referenceIds = {};
                    $slide.find("[data-reference-id]").each(function () {

                        var referenceId = $(this).attr("data-reference-id");

                        if (referenceId.indexOf('-') > -1) {
                            var range = referenceId.split('-');
                            var from = parseInt(range[0]);
                            var to = parseInt(range[1]);

                            for(var i = from; i <= to; i++){
                                referenceIds[i] = true;
                            }
                        }
                        else
                        {
                            var ids = referenceId.split(',');


                            $.each(ids, function (index, value) {
                                referenceIds[value] = true;
                            });
                        }
                    });
                    referenceIds = Object.keys(referenceIds);

                    // Find media resources associated with the collected reference ids:
                    var references = {};
                    $.each(window.mediaRepository.metadata(), function (file, meta) {
                        if (referenceIds.indexOf("" + meta.referenceId) > -1) {
                            references[file] = meta;
                        }
                    });

                    // Render all references into a list:
                    var $list = $("<ul class='references'/>");
                    $list.append($.map(references, function (meta, file) {
                        return window.mediaRepository.render(file, meta);
                    }));

                    // Put list in popup:
                    var $popup = $('<div class="auto-references-popup" />')
                        .append('<div class="x">⊗</div>')
                        .append('<h1>References</h1>')
                        .append($list);

                    // Put popup in overlay:
                    $('<div class="auto-references-popup-overlay" />')
                        .append($popup)
                        .on("swipedown swipeup swiperight swipeleft", function (e) {
                            e.stopPropagation();
                        })
                        .on("tap", function (event) {
                            if ($(event.target).is(":not(.auto-references-popup, .auto-references-popup *) .x")) $(this).remove();
                        }).appendTo("#presentation");
                });
        }
    }

});
/**
 * Implements a function to navigate backwards between slides.
 * -----------------------------------------------------------
 *
 * Navigates backwards through the sequence of app.goTo calls.
 *
 * @class BackNavigation
 * @constructor
 */


app.register("ap-back-navigation", function () {

    var self;
    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            self = this;


            app.$.BackNavigation = this;
            app.listenTo(app.slideshow, 'unload',this.storeLastCollection.bind(this));
            app.listenTo(app.slideshow, 'update:current',this.storePrevSlide.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        storeLastCollection: function(data) {
          self.prevCollection = data.id;
        },

        storePrevSlide: function (data) {
            self.prevSlide = data.prev.id;
        },

        setPrevCollection: function (id) {
          self.prevCollection = id;
        },

        back: function () {
            if(self.prevCollection != null && self.prevSlide != null){
                app.goTo(self.prevCollection + "/" + self.prevSlide);
                self.prevCollection = null;
                self.prevSlide = null;
            }
            else if(self.prevSlide != null)
            {
                //var currentCollection = app.model.getStoryboard(app.slideshow.getId()).id;
                app.slideshow.goTo(self.prevSlide);
                self.prevSlide = null;
            }
        }
    }

});
app.register("ap-content-groups", function () {
    var self;
    return {
        definition: null,
        json: {},
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {

            self = this;
            app.$.contentGroups = this;


            $.get('contentGroups.json').done(function (groupDefinition) {
                if (typeof groupDefinition === 'string') {
                    groupDefinition = JSON.parse(groupDefinition);
                }

                self.json = groupDefinition;

            });


            this.validateContentgroups();


        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        collectionContainsSlides: function (collection, groupDefinition) {
            // test if the collection needs validation
            // (by checking if the collection has any slide from the contentGroup)

            // get all slides which are used in this collection
            var collectionClone = $.extend(true, {}, collection);

            var slidesUsed;

            if (collection.content) {

                if (collectionClone.content.length > 0) {
                    $.each(collectionClone.content, function (i, slideshowName) {
                        collectionClone.content[i] = app.model.getStructure(slideshowName).content;
                    });

                    slidesUsed = collectionClone.content.reduce(function (a, b) {
                        return a.concat(b)
                    });
                }

            } else {
                slidesUsed = collectionClone.slides;
            }

            // check if the collection contains any slide from this contentGroup
            var collectionContainsSlide = false;


            if (slidesUsed) {
                $.each(groupDefinition.slides, function (i, slide) {
                    if (~slidesUsed.indexOf(slide)) {
                        collectionContainsSlide = true;
                    }
                });

            }
            return collectionContainsSlide
        },


        validateContentgroups: function () {
            // validate groups

            //var customCollections = app.$.customCollectionsStorage.getAll();
            //$.extend(true, app.model.get().storyboards, customCollections);

            $.get('contentGroups.json').done(function (groupDefinition) {
                if (typeof groupDefinition === 'string') {
                    groupDefinition = JSON.parse(groupDefinition);
                }
                for (var property in groupDefinition) {
                    if (groupDefinition.hasOwnProperty(property)) {
                        var groupName = property;
                        var definition = groupDefinition[property];
                        if (definition.orientation === "horizontal") {
                            $.each(app.model.get().storyboards, function (i, collection) {
                                if (collection.type === "collection") {

                                    var collectionContainsSlide = self.collectionContainsSlides(collection, definition);
                                    // if it contains a slide, validate if its been used correctly

                                    if (collectionContainsSlide) {
                                        var firstSlides = [];
                                        if (collection.content) {
                                            // normal Collections
                                            $.each(collection.content, function (i, slideshow) {
                                                if (definition.slides.indexOf(app.model.getStructure(slideshow).content[0]) > -1) {
                                                    if (app.model.getStructure(slideshow).content.length === 1) {
                                                        // okay
                                                    } else {
                                                        console.warn('horizontal contentGroups may not have more than one vertical slides @%s', slideshow)
                                                    }
                                                }
                                                if(typeof app.model.getStructure(slideshow).content === 'string')
                                                    firstSlides.push(app.model.getStructure(slideshow).content);
                                                else
                                                    firstSlides.push(app.model.getStructure(slideshow).content[0]);
                                            });
                                            if (~firstSlides.join(':').indexOf(definition.slides.join(':'))) {

                                                console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                                // write the matching contentgroups to the structures for use in the custom-collections


                                                var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                                if(storyboard){
                                                    if (!storyboard.contentGroups) {
                                                        storyboard.contentGroups = {};

                                                    }
                                                    storyboard.contentGroups[groupName] = definition;
                                                }

                                            } else {
                                                console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                                console.warn('the group definition will be ignored!');
                                                delete groupDefinition[groupName];
                                            }
                                        } else {
                                            // custom Collections
                                            $.each(collection.slideshows, function (i, slideshow) {
                                                // if the slideshow contains a slide from the group definition
                                                if (definition.slides.indexOf(slideshow.content[0]) > -1) {
                                                    // and is only 1 slide long vertically
                                                    if (slideshow.content.length === 1) {
                                                        // okay
                                                    } else {
                                                        console.warn('horizontal contentGroups may not have more than one vertical slides @%s', slideshow)
                                                    }
                                                }
                                                if(typeof app.model.getStructure(slideshow).content === 'string')
                                                    firstSlides.push(app.model.getStructure(slideshow).content);
                                                else
                                                    firstSlides.push(app.model.getStructure(slideshow).content[0]);
                                            });

                                            if (~firstSlides.join(':').indexOf(definition.slides.join(':'))) {
                                                console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                                // write the matching contentgroups to the structures for use in the custom-collections
                                                var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                                if(storyboard){
                                                    if (!storyboard.contentGroups) {
                                                        storyboard.contentGroups = {};

                                                    }
                                                    storyboard.contentGroups[groupName] = definition;
                                                }
                                            } else {
                                                console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                                console.warn('the group definition will be ignored!');
                                                delete groupDefinition[groupName];
                                            }
                                        }
                                    }
                                }
                            });
                        } else if (definition.orientation === "vertical") {
                            $.each(app.model.get().storyboards, function (i, collection) {

                                if (collection.type === "collection") {
                                    var collectionContainsSlide = self.collectionContainsSlides(collection, definition);
                                    if (collectionContainsSlide) {
                                        var allSlides = [];
                                        if (collection.content) {
                                            $.each(collection.content, function (i, slideshow) {
                                                var slideshowSlides = app.model.getStructure(slideshow).content;
                                                allSlides.push(slideshowSlides);
                                            });

                                        } else {
                                            // custom Collection
                                            $.each(collection.slideshows, function (i, slideshow) {
                                                allSlides.push(slideshow.content);
                                            });
                                        }
                                        if (~allSlides.join(':').indexOf(definition.slides.join(','))) {
                                            console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                            // write the matching contentgroups to the structures for use in the custom-collections
                                            var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                            if(storyboard){
                                                if (!storyboard.contentGroups) {
                                                    storyboard.contentGroups = {};

                                                }
                                                storyboard.contentGroups[groupName] = definition;
                                            }
                                        } else {
                                            console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                            console.warn('the group definition will be ignored!');
                                            delete groupDefinition[groupName];
                                        }
                                    }
                                }

                            });
                        } else {
                            console.log("unknown ContentGroup definition type");
                        }
                    }
                }

                self.definition = groupDefinition;
            });
        }
    }

});
app.register("ap-custom-collections", function () {


    var self;
    var eventNamespace = ".custom-collections";
    var _mouseMoveEvent;
    var _mouseUpEvent;
    var _mouseDownEvent;


    return {
        presentationName: null,
        dragData: null,
        publish: {},
        events: {
            "touchstart .o_slide": "startDragEventHandler",
            "MSPointerDown .o_slide": "startDragEventHandler",
            "tap .collectionName": function (event) {
                self.markAlreadyUsedSlides();
            }
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {

            self = this;
            self.dragData = null;
            app.$.customCollections = this;

            app.$.on('open:ap-custom-collections', function (data) {
                this.show();

                this.load(data.presentationName);
            }.bind(this));

            app.$.on('close:ap-custom-collections', function () {
                this.hide();
                this.unload();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            /*
             app.$.on("toolbar:load-module", function(moduleToLoad){
             console.log(moduleToLoad.id);

             if(self.props.dataModule != moduleToLoad.id && this.stateIsnt("hide"))
             {
             console.log("unload" + moduleToLoad.id);

             }

             }.bind(this));
             */

            var $editZone = $(".editZone");

            $(".cancel").on("tap", function () {
                // user canceled, so go back to the custom collection menu without saving
                self.unload();
                self.hide();
                app.$.overview.hide();
                app.$.customCollectionsMenu.show();

            });
            $(".save").on("tap", function () {

                // save and then go back to the custom collection menu
                var presentation = $.map($editZone.find(".o_slideshow"), function (slideshow) {
                    return [$.map($(slideshow).find(".o_slide"), function (slide) {
                        return $(slide).attr("data-id");
                    })];
                });


                var slides = [];
                var contentArray = [];
                $.each(presentation, function (index, slideshows) {
                    $.each(slideshows, function (index, id) {
                        slides.push(id);

                    })
                });

                var slideshowArray = [];

                var slideshowIdArray = [];
                $.each(presentation, function (i, slideshow) {

                    var slideshowId = "custom-slideshow-" + Math.floor((Math.random() * 10000) + 1);
                    var slideShowName;
                    switch (i) {
                        case 0:
                            slideShowName = "Home";
                            break;
                        case presentation.length - 1:
                            slideShowName = "Summary";
                            break;
                        default:
                            slideShowName = "Chapter " + i
                    }


                    slideshowIdArray.push(slideshowId);

                    var slideshowObj = {id: slideshowId, name: slideShowName, type: "slideshow", content: slideshow};
                    slideshowArray.push(slideshowObj);

                    app.model.addStructure(slideshowId, slideshowObj);

                });


                //var homeSlideName = slideshowArray[0].id;

                var collectionId;
                if (!app.model.hasStoryboard(self.presentationName))
                    collectionId = "custom-collection-" + Math.floor((Math.random() * 10000) + 1);
                else
                    collectionId = app.model.getStoryboard(self.presentationName).id;


                var customCollection = {
                    id: collectionId,
                    name: self.presentationName,
                    type: "collection",
                    slideshows: slideshowArray,
                    slides: slides,
                    presentation: presentation,
                    isCustomPresentation: true
                };


                app.model.addStoryboard(self.presentationName, {
                    id: collectionId,
                    name: self.presentationName,
                    content: slideshowIdArray,
                    type: "collection"
                });


                app.$.customCollectionsStorage.add(self.presentationName, customCollection);
                app.$.contentGroups.validateContentgroups();

                self.unload();
                self.hide();
                app.$.overview.hide();
                app.$.customCollectionsMenu.show();

                //app.json.storyboard.push(collectionId);
                //window.app.menu.attachTo = app.json.storyboard;

            });


        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        hide: function () {

            app.unlock();
            this.reset();
            this.unload();


        },

        show: function () {
            app.lock();
            this.goTo('visible');
        },

        load: function (presentationName) {
            self.presentationName = presentationName;

            _mouseMoveEvent = touchy.events.move + eventNamespace;
            _mouseUpEvent = touchy.events.end + eventNamespace;
            _mouseDownEvent = touchy.events.start + eventNamespace;


            var $document = $(document);
            var slideHTML = "<div class='o_slide'>"; // thumbnail template
            var slideshowHTML = "<div class='o_slideshow'>"; // slideshow template
            var collectionHTML = "<div class='o_collection'>"; // collection template


            $(".presentationName").text(presentationName);

            var $editZone = $(".editZone");
            var storage = app.$.customCollectionsStorage.get(presentationName);
            var $overview = $(".overview");


            // add home and summary slides to the new presentation

            if (storage.presentation.length === 0) {
                storage.slideshows = [{
                    "id": "home_slideshow",
                    "name": "Home",
                    "type": "slideshow",
                    "content": ["home_slide"]
                }, {
                    "id": "summary_slideshow",
                    "name": "Summary",
                    "type": "slideshow",
                    "content": ["summary_slide"]
                }];
                storage.slides = ["home_slide", "summary_slide"];
                storage.presentation = [
                    ["home_slide"],
                    ["summary_slide"]
                ];
            }


            // create the initial DOM representation from stored presentation
            var $o_collection = $(collectionHTML).append($.map(storage.presentation, function (slideshow) {
                var $slideshow = $(slideshowHTML);
                $slideshow.append($.map(slideshow, function (slideId) {

                    var $slide = $(slideHTML).attr("data-id", slideId).text(app.model.get().slides[slideId].name);
                    $slide.css({"background-image": "url(slides/" + slideId + "/" + slideId + ".png)"});


                    $.each(app.$.contentGroups.json, function (groupName, group) {
                        if (group.slides.indexOf(slideId) < 0) {
                            return
                        }
                        $slide.data('contentGroup', group);
                        $slide.addClass('grouped');
                        if (group.orientation === 'horizontal') {
                            $slideshow.addClass('grouped');
                        }
                    });

                    return $slide;
                }));
                return $slideshow;
            }));

            $editZone.append($o_collection);

            self._setupPlaceholders();
            self.markAlreadyUsedSlides();

            var slideWidth = 136;
            var slideHeight = 102;

            app.$.overview.showCustomOverview();


            self.markAlreadyUsedSlides();

            // each time a new collection is selected on the overview, new slide thumbnails are created
            // so we have to re-mark the slides which are already present in the edit zone


            self.scroll = new IScroll($editZone[0], {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });


            /*
             Stores information about the dragged slide while it is being dragged.
             At runtime it looks like this:
             {
             startPos: {
             x: number,
             y: number
             },
             $clone: (jQ object) draggable slide clone,
             $original: (jQ object) original slide,
             currentTarget: DOM element
             */


            $document.on(_mouseMoveEvent, function (event) {
                if (event.target.classList.contains('alreadyUsed')) {
                    // slide comes from the overview and is already present in the edit zone
                    // so we forbid it by returning now
                    return;
                }
                if (self.dragData == null || self.dragData == undefined) return; // if drag data is undefined, the user is not dragging anything

                var touch, target;

                self.dragData.didDrag = true;

                if (touchy.isTouch) {
                    touch = event.originalEvent.targetTouches[0];
                    target = document.elementFromPoint(touch.pageX, touch.pageY);
                } else {
                    touch = event;
                    target = event.target;
                }
                /* Drag Move*/
                self.dragData.$clone.css("transform",
                    "translate3d(" +
                    (touch.pageX - self.dragData.startPos.x) + "px," +
                    (touch.pageY - self.dragData.startPos.y) + "px," +
                    "0" +
                    ")"
                );


                self.dragData.$clone.css("z-index", "9999");
                /* Drag over */

                var newTarget = null;
                var contentGroup = self.dragData.$original.data('contentGroup');
                if (target && target.classList.contains("o_slide")) {

                    // if dragging over a slide, decide which placeholder (over, under, left, right) to mark
                    // based on over which quartile the finger (mouse) is
                    var $underlyingSlide = $(target);
                    var overSlidePos = $underlyingSlide.offset();
                    var x = (overSlidePos.left + slideWidth / 2) - touch.pageX;
                    var y = (overSlidePos.top + slideHeight / 2) - touch.pageY;
                    var angle = Math.atan2(y, -x);
                    var PI = Math.PI;
                    var $underlyingSlideshow = $underlyingSlide.parent();
                    if (angle > -PI / 4 && angle < PI / 4) { // right
                        newTarget = $underlyingSlideshow.next(".placeholder")[0];
                    } else if (angle > PI / 4 && angle < PI * 3 / 4) { // over
                        newTarget = $underlyingSlide.prev(".placeholder")[0];
                    } else if (angle > PI * 3 / 4 || angle < -PI * 3 / 4) { // left
                        newTarget = $underlyingSlideshow.prev(".placeholder")[0];
                    } else if (angle > -PI * 3 / 4 && angle < -PI / 4) { // under
                        newTarget = $underlyingSlide.next(".placeholder")[0];
                    }
                    if (!(contentGroup && contentGroup.orientation == 'horizontal' && $(target).parent('.o_collection').length > 0)) {
                        newTarget = null;
                    } else {
                        $editZone.addClass("highlighted");
                    }


                } else if (target && target.classList.contains('placeholder')) {
                    newTarget = target;
                    if (contentGroup && contentGroup.orientation == 'horizontal' && !($(target).parent('.o_collection').length > 0)) {
                        newTarget = null
                    }
                }
                if (self.dragData.currentTarget !== newTarget) {
                    if (self.dragData.currentTarget) self.dragData.currentTarget.classList.remove("target");
                    self.dragData.currentTarget = null;
                    if (newTarget) {
                        self.dragData.currentTarget = newTarget;
                        self.dragData.currentTarget.classList.add("target");
                    }
                }
            });

            $document.on(_mouseUpEvent, function (event) {

                /* Drop */
                if (self.dragData == null || self.dragData == undefined) return;	// if drag data is undefined, the user is not dragging anything
                self.dragData.$original.removeClass("source");

                if (self.dragData.currentTarget) {
                    /* Drop Insert */
                    var $newSlide = self.dragData.$original.clone(true).off().removeClass("highlighted");

                    $(self.dragData.currentTarget).replaceWith($newSlide);

                    var contentGroup = $newSlide.data('contentGroup');
                    if (contentGroup) {
                        $newSlide.addClass('grouped');
                        if (contentGroup && contentGroup.orientation == 'vertical' && !$newSlide.parent().is(".o_slideshow")) {
                            $newSlide.wrapAll(slideshowHTML);
                        }
                    }

                    if ($newSlide.parent().is(".o_slideshow")) {
                        $newSlide.css({
                            height: 0
                        });
                        $newSlide
                            .animate({
                                height: slideHeight
                            }, 500, "easeOutBounce", function () {
                                self.scroll.refresh();
                            });
                    } else {
                        $newSlide.wrap(slideshowHTML);
                        var $slideshow = $newSlide.parent();
                        $slideshow.css({
                            width: 0
                        });
                        $slideshow
                            .animate({
                                width: slideWidth
                            }, 500, "easeOutBounce", function () {
                                self.scroll.refresh();
                            });
                    }
                    if (contentGroup && contentGroup.orientation === 'horizontal') {
                        $newSlide.parents('.o_slideshow').addClass('grouped');
                    }
                }
                self.dragData.$clone.remove();

                var comesFromCustomPresentation = $editZone.find(self.dragData.$original).length > 0;
                if (comesFromCustomPresentation && self.dragData.didDrag) {
                    /* Delete original */
                    var originalIsAlone = (self.dragData.$original.siblings(".o_slide").length === 0);

                    if (originalIsAlone) {
                        var $slideshow = self.dragData.$original.parent();
                        var placeholder = $slideshow.prev(".placeholder");
                        placeholder.css("transition", "none");
                        $slideshow.add(placeholder)
                            .animate({
                                width: 0
                            }, 500, "easeOutBounce", function () {
                                $(this).remove();
                                self._setupPlaceholders();
                                self.markAlreadyUsedSlides();
                                self.scroll.refresh();
                            });
                    } else {
                        var placeholder = self.dragData.$original.next(".placeholder");
                        placeholder.css("transition", "none");
                        self.dragData.$original.add(placeholder)
                            .animate({
                                height: 0
                            }, 500, "easeOutBounce", function () {
                                $(this).remove();
                                self._setupPlaceholders();
                                self.markAlreadyUsedSlides();
                                self.scroll.refresh();
                            });
                    }
                }
                self._setupPlaceholders();
                self.dragData = undefined;
                self.markAlreadyUsedSlides();
                self.scroll.enable();
            });

        },

        unload: function () {
            $(".editZone").empty();
            app.$.overview.unload();
            self.dragData = null;
            $(document).off(_mouseUpEvent);
            $(document).off(_mouseMoveEvent);
        },

        _setupPlaceholders: function () {
            var placeholderHTML = "<div class='placeholder'>"; // placeholder template, slides can be dragged into placeholders
            var $editZone = $(".editZone");
            $editZone.find(".o_slide:first-child," +
            ".o_slide+.o_slide, .o_slideshow+.o_slideshow")
                .not('.o_slideshow:first-child .o_slide:first-child, ' +
                '.o_slideshow:last-child .o_slide:first-child, ' +
                '.o_slide.grouped+.o_slide.grouped, .o_slideshow.grouped + .o_slideshow.grouped')
                .before(placeholderHTML);
            $editZone.find(".o_slide:last-child")
                .not('.o_slideshow:first-child .o_slide, .o_slideshow:last-child .o_slide, .o_slideshow.grouped .o_slide')
                .after(placeholderHTML);
            $editZone.find(".o_collection:empty").append(placeholderHTML);
            $editZone.find(".placeholder+.placeholder").prev().remove();
            $editZone.find(".o_slideshow > .placeholder:only-child, .o_slideshow:empty").remove();
            $editZone.find(".placeholder+.placeholder").prev().remove(); // must be repeated!

            // show the first vertical placeholder fully so that you see immediately where you need to drop the first slide(s)
            if ($editZone.find('.o_slideshow + .placeholder + .o_slideshow').length == 1) {
                $editZone.find('.o_slideshow + .placeholder + .o_slideshow').prev().addClass('expanded');
            } else {
                $editZone.find('.o_slideshow + .placeholder + .o_slideshow').prev().removeClass('expanded');
            }
        },

        markAlreadyUsedSlides: function () {
            var scope = "#" + self.id;
            var $editZone = $(".editZone");
            var $overview = $(scope + " .custom-collections .overview .collectionOverview");
            $overview.find(".alreadyUsed").removeClass("alreadyUsed");
            $editZone.find(".o_slide").each(function () {

                $overview.find("[data-id='" + $(this).attr("data-id") + "']").addClass('alreadyUsed');
            });
        },

        startDragEventHandler: function (event) {
            /* Drag Start */
            if (event.target.classList.contains('alreadyUsed')) {
                // slide comes from the overview and is already present in the edit zone
                // so we forbid it by returning now
                return;
            }

            var touch = (touchy.isTouch) ? event.targetTouches[0] : event;

            self.scroll.disable();

            var $originalSlide = $(event.target);
            var $clone = $originalSlide.clone().removeClass("highlighted");

            var contentGroups = $originalSlide.parents('.o_collection').data('contentGroups');
            var originalSlideOffsetCompensation = {
                x: 0,
                y: 0
            };

            if (contentGroups) {
                var originalSlideId = $originalSlide.data('id');
                var scope = "#" + self.id;
                $.each(contentGroups, function (groupName, group) {

                    if (group.slides.indexOf(originalSlideId) < 0) {
                        return
                    }
                    if (group.orientation === 'vertical') {
                        originalSlideOffsetCompensation = {
                            x: 0,
                            y: (group.slides.indexOf(originalSlideId) * $originalSlide.height()) * -1
                        }
                    } else {
                        originalSlideOffsetCompensation = {
                            x: (group.slides.indexOf(originalSlideId) * $originalSlide.width()) * -1,
                            y: 0
                        }
                    }


                    var selector = '';

                    $.each(group.slides, function (i, slide) {
                        if (i != 0) {
                            selector += ','
                        }
                        selector += scope + ' .o_slide[data-id="' + slide + '"]'
                    });

                    $originalSlide = $(selector);
                    $clone = $originalSlide.clone(true).off();
                });

            } else if (contentGroup = $originalSlide.data('contentGroup')) {

                var selector = '';
                $.each(contentGroup.slides, function (i, slide) {
                    if (i != 0) {
                        selector += ','
                    }
                    selector += '.editZone .o_slide[data-id="' + slide + '"]'
                });
                if (contentGroup.orientation === 'vertical') {
                    originalSlideOffsetCompensation = {
                        x: 0,
                        y: (contentGroup.slides.indexOf($originalSlide.data('id')) * $originalSlide.height()) * -1
                    }
                } else {
                    originalSlideOffsetCompensation = {
                        x: (contentGroup.slides.indexOf($originalSlide.data('id')) * $originalSlide.width()) * -1,
                        y: 0
                    }
                }
                $originalSlide = $(selector);
                $clone = $originalSlide.clone(true).off();
            }

            self.dragData = {
                startPos: {
                    x: touch.pageX + originalSlideOffsetCompensation.x,
                    y: touch.pageY + originalSlideOffsetCompensation.y
                },
                $clone: $clone,
                $original: $originalSlide,
                currentTarget: null,
                didDrag: false
            };
            self.dragData.$original.addClass("source");
            var offset = self.dragData.$original.offset();
            self.dragData.$clone
                .css({
                    left: offset.left,
                    top: offset.top
                });

            // the clone must be inserted at the end of the body, so that it can "float" over everything else
            // without having to use z-indexes and overflow visibility
            $("body").append(self.dragData.$clone);

            event.preventDefault(); // prevent text selection on desktop
        }

    }

});
app.register("ap-custom-collections-storage", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    onRender: function(el) {

      if(app.config.get('name') === "Bayer Health Care Rainmaker Template (replace with the name of your presentation)")
        console.error("### Please update the name of the presentation in the config.json ###");

      self = this;
      app.$.customCollectionsStorage = this;
    },

    /**
     * Deletes the custom collection named collectionName from the localStorage
     *
     * @method delete
     * @param {string} collectionName
     */
    delete : function(collectionName){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();
      delete(customCollections[collectionName]);
      app.model.deleteStoryboard(collectionName);
      localStorage[storageNamespace] = JSON.stringify(customCollections);

      //customCollectionsStorage.isFavorite(collectionName, false);
    },
    /**
     * returns all custom collections as an associative array from collection name to collection representation
     *
     * @method getAll
     */
    getAll : function(){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      try{
        return JSON.parse(localStorage[storageNamespace] || "{}");
      } catch (e){
        console.log("Custom Presentations storage is corrupt or empty and will be reseted: "+JSON.stringify(e));
        delete(localStorage[storageNamespace]);
      }
      return {};
    },
    /**
     * Adds a custom collection to the localStorage
     *
     * @method add
     * @param {string} collectionName name of the collection to store
     * @param {string} collectionObject object representation of the collection
     */
    add : function(collectionName, collectionObject){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();

      customCollections[collectionName] = collectionObject;

      localStorage[storageNamespace] = JSON.stringify(customCollections);
    },
    /**
     * returns the stored collection with the provided name
     *
     * @method get
     * @param {string} collectionName
     */
    get : function(collectionName){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var collection = self.getAll()[collectionName];

      if (collection == undefined || Array.isArray(collection.presentation) === false){
        return undefined;
      }

      var invalidSlidesCount = 0;
      collection.presentation = collection.presentation.map(function(slideshow){
        return slideshow.filter(function(slideId){
          if (app.model.get().slides[slideId] === undefined){
            invalidSlidesCount++;
            return false;
          }
          return true;
        });
      }).filter(function(slideshow){
        return slideshow.length > 0;
      });

      if (invalidSlidesCount > 0) {
        var errorMsg = translation["MISSING_PRESSENTATIONS_TITLE"]
            .replace("$INVALID_SLIDES_COUNT$", invalidSlidesCount);
        apprise(errorMsg, {textOk: translation["OK"]});
        self.add(collectionName, collection);
      }

      return collection;

    },
    /**
     * renames a stored collection without changing its position (e.g. collections order returned by getAll)
     *
     * @method rename
     * @param {string} oldName
     * @param {string} newName
     */
    rename : function(oldName, newName){
      //rename presentation keeping the presentation order
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections={};
      $.each(self.getAll(),function(name, object){
        if(name==oldName){
          $.each(object.slideshows, function(name, slideshow){
            slideshow.name = slideshow.name.replace(oldName,newName);
          });
          object.name = newName;
        }
        customCollections[(name==oldName) ? newName : name ] = object;

      });
      //var isFavorite = customCollectionsStorage.isFavorite(oldName);
      //customCollectionsStorage.isFavorite(oldName, false);
      //customCollectionsStorage.isFavorite(newName, isFavorite);
      localStorage[storageNamespace] = JSON.stringify(customCollections);
    },

    /**
     * returns all stored favorite collections
     *
     * @method getFavorites
     *
     */
    getFavorites : function(){

      var collections = self.getAll();

      var favorites = [];

      $.each(collections,function(collectionName,collectionObject){
        if(collectionObject.isFavorite)
          favorites.push(collectionObject);
      });

      return favorites;

    },
    /**
     * returns all stored favorite collections
     *
     * @method updateOrder
     *
     */
    updateOrder : function(order){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();
      var newCustomCollections = {};

      //clear old order
      var backUp =  localStorage[storageNamespace];
      localStorage[storageNamespace] = JSON.stringify({});

      //set new order
      try{
        $.each(order,function(index,name){
          newCustomCollections[name] = customCollections[name];
        });
      }catch(e){
        localStorage[storageNamespace] = backUp;
      }


      localStorage[storageNamespace] = JSON.stringify(newCustomCollections);
    },

    /**
     * store all custom-collections
     *
     * @method saveAll
     *
     */
    saveAll : function(customPresentations){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      localStorage[storageNamespace] = JSON.stringify(customPresentations);
    }
  }

});
app.register("ap-custom-collections-menu", function () {


    var translation = {
        "ENTER_PRESENTATION_NAME": "Please enter a name for your presentation",
        "PRESENTATION_NAME": "Presentation name",
        "NAME_ALREADY_EXISTS": "Another presentation exists with the same name, please choose a new one",
        "$PRESENTATION_NAME$_WILL_BE_REMOVED": "'$PRESENTATION_NAME$' will be erased",
        "OK": "OK",
        "CANCEL": "Cancel",
        "YES": "Yes",
        "NO": "No",
        "PRESENTATION_IS_EMPTY": "This presentation is empty."
    };

    var self;
    return {
        publish: {},
        events: {
            "tap .newPresentation": "createNewPresentation",
            "tap .trash": "deletePresentation",
            "tap .rename": "renamePresentation",
            "tap .presentation": "openPresentation",
            "tap .edit": "editPresentation",
            "tap .favorite": "favorisePresentation"
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {

            self = this;

            app.$.customCollectionsMenu = this;

            app.$.on('open:ap-custom-collections-menu', function(){

                this.show();

            }.bind(this));

            app.$.on('close:ap-custom-collections-menu', function(){
                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function(){
                this.hide();
            }.bind(this));



            self.appriseDefaults = {
                textOk: translation["OK"],
                textCancel: translation["CANCEL"],
                textYes: translation["YES"],
                textNo: translation["NO"]
            };

            $(".presentationsContainer").sortable({
                items: ".row:not(.newPresentationButtonContainer)",
                scroll: true,
                update: function (event, ui) {
                    self.updateCustomPresentationOrder();
                }
            });


            $.each(app.$.customCollectionsStorage.getAll(), function (index, presentationObject) {
                self._addPresentationToView(presentationObject.name, presentationObject, /* animated: */false);
            });
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        hide: function () {
            app.unlock();
            this.reset();
        },

        show: function () {
            app.lock();
            this.goTo('visible');
        },

        _addPresentationToView: function (presentationName, presentationObject, animated) {
            var self = this;
            var $row = $(".row.template").clone();


            $row.removeClass("template");
            $row.data("presentationName", presentationName);
            $row.find(".presentation .name").text(presentationName);
            if (presentationObject.isFavorite)
                $row.find(".favorite").addClass('selected');
            $row.insertBefore(self.$(".newPresentationButtonContainer"));


        },
        updateCustomPresentationOrder: function () {
            var self = this;

            var rowsArray = [];

            $('.presentationsContainer').children('.row').each(function () {
                var presentationName = $(this).data("presentationName");

                if (presentationName != undefined) {

                    if (app.$.customCollectionsStorage.getFavorites().length < 3) {
                        var isFavorite = $(this).find('.favorite').hasClass('selected');

                        var collection = app.$.customCollectionsStorage.get(presentationName);

                        collection.isFavorite = isFavorite;

                        app.$.customCollectionsStorage.add(presentationName, collection);
                    }

                    rowsArray.push(presentationName);
                }


            });

            if (rowsArray.length > 1)
                app.$.customCollectionsStorage.updateOrder(rowsArray);

            app.$.trigger("update:favorites");

        },

        createNewPresentation: function(){
            function askName(defaultName) {
                var optn = $.extend({}, self.appriseDefaults, {input: defaultName});
                apprise(translation["ENTER_PRESENTATION_NAME"], optn, function (newName) {
                    if (newName === false || newName === "") {
                        return; //user canceled
                    } else if (app.$.customCollectionsStorage.get(newName) != undefined) {
                        apprise(translation["NAME_ALREADY_EXISTS"], self.appriseDefaults, function () {
                            askName(newName); //ask again
                        });
                    } else {
                        var collectionId = "custom-collection-" + Math.floor((Math.random() * 10000) +1);

                        var presentationObject = {
                            id: collectionId,
                            name: newName,
                            type: "collection",
                            slideshows: [{
                                "id": "home_slideshow",
                                "name": "Home",
                                "type": "slideshow",
                                "content": ["home_slide"]
                            }, {
                                "id": "summary_slideshow",
                                "name": "Summary",
                                "type": "slideshow",
                                "content": ["summary_slide"]
                            }],
                            slides: ["home_slide", "summary_slide"],
                            presentation: [
                                ["home_slide"],
                                ["summary_slide"]
                            ],
                            isCustomPresentation: true,
                            isFavorite: false
                        };
                        app.$.customCollectionsStorage.add(newName, presentationObject);
                        self._addPresentationToView(newName, presentationObject, true);
                    }
                });
            }

            var standardName = translation["PRESENTATION_NAME"];
            askName(standardName);
        },

        deletePresentation: function(event){

            var $row = $(event.target).parent();
            var presentationName = $row.data("presentationName");
            var confirmationTitle = translation["$PRESENTATION_NAME$_WILL_BE_REMOVED"].replace("$PRESENTATION_NAME$", presentationName);
            var optn = $.extend({}, self.appriseDefaults, {confirm: true});
            apprise(confirmationTitle, optn, function (answer) {
                if (answer) {
                    app.$.customCollectionsStorage.delete(presentationName);
                    $row.animate({height: 0}, function () {
                        $(this).remove();

                    });
                }
            });

            app.$.trigger("update:favorites");
        },

        renamePresentation: function(event){
            var $row = $(event.target).parent();

            function askName(defaultName) {
                var optn = $.extend({}, self.appriseDefaults, {input: defaultName});
                apprise(translation["ENTER_PRESENTATION_NAME"], optn, function (newName) {
                    if (newName === false || newName == oldName || newName === "") {
                        return; //user canceled
                    } else if (app.$.customCollectionsStorage.get(newName) != undefined) {
                        apprise(translation["NAME_ALREADY_EXISTS"], self.appriseDefaults, function () {
                            askName(newName); //ask again
                        });
                    } else {
                        app.$.customCollectionsStorage.rename(oldName, newName);
                        $row.data("presentationName", newName);
                        var $name = $row.find(".name");
                        $name.css({opacity: 0});
                        setTimeout(function () {
                            $name.text(newName);
                            $name.css({opacity: 1});
                        }, 500);
                    }
                });
            }

            var oldName = $row.data("presentationName");
            askName(oldName);
        },

        openPresentation: function(event){

            var presentationName = $(event.target).parent().parent().data("presentationName");

            if(presentationName == undefined)
                presentationName = $(event.target).parent().data("presentationName");


            var collection = app.$.customCollectionsStorage.get(presentationName);

            //app.menu.linksConfig[homeSlideName] = {title: "<div class='homeIcon' />", classname: "home"}


            if (collection.slideshows.length > 0) {
                var slideshowIdArray = [];
                $.each(collection.slideshows, function (i, slideshow) {
                    slideshowIdArray.push(slideshow.id);
                    var slidesArrary = [];
                    $.each(slideshow.content, function (i, slide) {
                        slidesArrary.push(slide);
                    });

                    var temp = {
                        id: slideshow.id,
                        name: slideshow.name,
                        content: slidesArrary,
                        type: "slideshow"
                    };

                    if(!app.model.hasStructure(slideshow.id))
                        app.model.addStructure(slideshow.id, temp);

                });

                var storyboardData = {
                    id: collection.id,
                    name: collection.name,
                    content: slideshowIdArray
                };

                if(!app.model.hasStoryboard(collection.id))
                    app.model.addStoryboard(collection.id, storyboardData);

                app.slideshow.init(collection.id);
                app.slideshow.load(collection.id);
                app.$.toolbar.hide();

            } else {
                apprise(translation["PRESENTATION_IS_EMPTY"], self.appriseDefaults);
            }
        },

        editPresentation: function(event) {
            // load custom collections editor into own container
            /*
            new CustomCollections({
                $container: self.$container,
                presentationName: $(this).parent().data("presentationName")
            });
            */
            self.hide();
            var trigger = "open:ap-custom-collections";
            var presentationName = $(event.target).parent().data("presentationName");

            app.$.trigger(trigger, {presentationName: presentationName});


        },

        favorisePresentation:function(event) {
            // set favorite
            var $this = $(event.target);

            var presentationName = $this.parent().data("presentationName");
            var collection = app.$.customCollectionsStorage.get(presentationName);

            if (app.$.customCollectionsStorage.getFavorites().length < 3 || collection.isFavorite) {
                $this.toggleClass("selected");

                collection.isFavorite = !collection.isFavorite;

                app.$.customCollectionsStorage.add(presentationName, collection);
            }
            else {
                var $popup = $('#maxFavoritesPopUp');

                $popup.fadeIn();

                $popup.delay(1600).fadeOut();
            }

            app.$.trigger("update:favorites");
        }


    }

});
app.register("ap-follow-up-mail", function() {

  var self;
  var address = "";
  var subject = "Reference to our meeting"; //"Dateien/Referenzen aus unserem Gespräch";

  return {
    publish: {
       },
    events: {
      "tap .sendButton": "sendMailHandler",
      "tap .library .emailAttachmentToggler": "emailAttachmentHandler",
      "tap .clearButton": "clear"

    },
    states: [
      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;

      app.$.on('open:ap-follow-up-mail', function () {
        if(this.stateIsnt("visible"))
          this.show();
      }.bind(this));

      app.$.on('close:ap-follow-up-mail', function () {
        this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        this.hide();
      }.bind(this));

      self.bodyText = "Dear Customer,<br /><br />in reference to our meeting, please find attached the following documents.<br /><br />Best regards<br />Your Bayer team <br /><br /><hr />";


      var presentationName = app.config.get('name');

      localStorage.removeItem(presentationName + ":attachmentStorage");

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      app.unlock();
      this.reset();
    },

    show: function () {
      app.lock();
      this.goTo('visible');

    },

    sendMailHandler: function(){

      //var generalBodyText = "Dear Customer,<br /><br />in reference to our meeting, please find attached the following documents.<br /><br />Best regards<br />Your Bayer team"; //Sehr geehrter Kunde,<br /><br />anbei finden Sie wie gewünscht die folgenden Dateien/Referenzen aus unserem Gespräch.<br /><br />Mit freundlichen Grüßen,<br />Ihr Bayer Team",

      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":attachmentStorage";
      var collectedAttachments = Object.keys(JSON.parse(localStorage[storageNamespace] || "{}"));

      var fileAttachments = [];


      // Attachments that don't represent real files are writen into the body text,
      // all others are being attached as files:
      $.each(collectedAttachments, function (index, attachment) {
        var contentRegex = /^content\:\/\//;
        var urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        if (contentRegex.test(attachment)) {
          self.bodyText += "<br /><br />";
          self.bodyText += attachment.replace(contentRegex, "");
        } else if (urlRegex.test(attachment)) {
          self.bodyText += "<br /><br />";
          self.bodyText += attachment;
        } else {
          fileAttachments.push(attachment);
        }
      });

      // Hand over to agnitio native mail dialog:
      console.log('ag.sendMail("' + address + '", "' + subject + '", "' + self.bodyText + '",', fileAttachments, ")");
      ag.sendMail(address, subject, self.bodyText, fileAttachments);
    },

    emailAttachmentHandler: function(event){
      var filename = $(event.target).parent("li").attr("data-file");
      var $movedDown = $(".attachments ul li[data-file='"+filename+"']");
      $(".attachments ul").append($movedDown);
    },

    clear: function(event){
      $(".mail [data-file][data-is-attached='true'] .emailAttachmentToggler").each(function() {
        // touchy custom events doesn't support jquery trigger
        var tapEvent = document.createEvent('UIEvents');
        tapEvent.initEvent("tap", true, true);
        this.dispatchEvent(tapEvent);
      });
    }

  }

});
app.register("ap-favorite-presentations-buttons", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    states: [],
    onRender: function(el) {
      self = this;
      app.listenTo(app.slideshow, 'load', this.favoritePresentationHandler.bind(this));

      app.$.on('update:favorites', function () {
        self.favoritePresentationHandler();
      }.bind(this));


    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {
      this.favoritePresentationHandler();
    },
    onExit: function(el) {

    },

    favoritePresentationHandler: function(data){

      var content = app.slideshow.resolve();
      var $slide = $("#" + content.slide);
      var $favoritePresentationsContainer = $slide.find('.favoritePresentationsContainer');

      // remove the favorits block if its already a custom presentation
      if (app.slideshow.resolve().slideshow.indexOf("custom-collection") > -1) {
        $favoritePresentationsContainer.empty();
        return;
      }



      if($favoritePresentationsContainer != undefined) {
        $favoritePresentationsContainer.empty();
        $.each(app.$.customCollectionsStorage.getFavorites(), function (index, orderObject) {
          $favoritePresentationsContainer.append("<div class='button' id='button" + index + "'>" + orderObject.name + "</div>");

          $favoritePresentationsContainer.find(("#button" + index)).on("tap", function () {
            var collectionObject = app.$.customCollectionsStorage.get(orderObject.name);
            if(!app.model.hasStoryboard(collectionObject.id)){

              var slideshowIdArray = [];
              $.each(collectionObject.slideshows, function (i, slideshow) {
                slideshowIdArray.push(slideshow.id);
                var slidesArrary = [];
                $.each(slideshow.content, function (i, slide) {
                  slidesArrary.push(slide);
                });

                var temp = {
                  id: slideshow.id,
                  name: slideshow.name,
                  content: slidesArrary,
                  type: "slideshow"
                };

                app.model.addStructure(slideshow.id, temp);

              });

              var storyboardData = {
                id: collectionObject.id,
                name: collectionObject.name,
                content: slideshowIdArray
              };

              app.model.addStoryboard(collectionObject.id, storyboardData);

              //app.slideshow.init(collectionObject.id);
              app.goTo(collectionObject.id);
              app.$.toolbar.hide();

              // set home icon
              //app.menu.linksConfig[orderObject.slideshows[0].id] = {title: "<div class='homeIcon' />", classname: "home"}
            }
            else{


              app.goTo(collectionObject.id);
            }

          });
        });
      }
    }
  }

});
/**
 * Implements a frequently asked questions section.
 * ------------------------------------------------
 * @module frequently-asked-questions.js
 * @requires jquery.js, iscroll.js, module.js
 * @author Andreas Tietz, antwerpes ag
 */


/**
 * Implements a frequently asked questions section.
 * ------------------------------------------------
 * Questions and answeres are maintained directly inside the frequently-asked-questions.html file.
 * Tapping on a question or answer shows/hides the answer.
 *
 * @class FrequentlyAskedQuestions
 * @extends Module
 * @constructor
 * @param {object} options Valid properties are:
 *     - $container: jQuery DOM object inside which to load the module
 */

app.register("ap-frequently-asked-questions", function() {
  var self;
  return {
    publish: {
        
    },
    events: {


    },
    states: [
      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;



      app.$.on('open:ap-frequently-asked-questions', function () {
          this.show();
      }.bind(this));

      app.$.on('close:ap-frequently-asked-questions', function () {
        if (this.stateIs("visible"))
          this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        if (this.stateIs("visible"))
          this.hide();
      }.bind(this));

      // Initialize scrolling:

      if(self.scroll) self.scroll.destroy();
      var $scroll = $(self.el).find(".scroll");
      self.scroll = new IScroll($scroll[0], {scrollbars: true});



    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      this.unload();
      app.unlock();
      this.reset();
    },

    show: function () {
      $(".FrequentlyAskedQuestions li").on("tap", function () {
        $(this).toggleClass("maximized");

        self.scroll.refresh();

        if($(this).hasClass("maximized"))
          self.scroll.scrollToElement(this);

      });
      app.lock();
      this.goTo('visible');
    },

    unload: function () {
      // Cleanup:
      $(self.el).find("li").off("tap");

    }
  }

});
app.register("ap-media-library", function () {

    var self;
    return {
        publish: {
            prefiltersearchterms: undefined,
            prefilterattributestobesearched: undefined,
            renderOptions: {},
            attachment: false,
            followupmail: false,
            hide: false
        },
        events: {

        },
        states: [
            {
                id: "hide"
            },
            {
                id: "visible"
            },
            {
                id: "followupmail"
            },
            {
                id: "attachment"
            }
        ],
        onRender: function (el) {

            self = this;


            this.load(el);

            if (this.props.hide) {
                this.hide();
            }

            if (this.props.attachment) {
                this.goTo('attachment');
            }
            if (this.props.followupmail) {
                this.goTo('followupmail');
            }

            app.$.on('open:ap-media-library', function () {
                if (this.stateIs("hide"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-media-library', function () {
                if (this.stateIs("visible"))
                    this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                if (this.stateIs("visible"))
                    this.hide();
            }.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        hide: function () {
            app.unlock();
            this.goTo('hide');
        },

        show: function () {
            app.lock();
            this.goTo('visible');
            this.load();
        },

        unload: function() {
            if(this.stateIs("visible"))
                if(self.scroll) self.scroll.destroy();
        },

        load: function (el) {


            var $list = $(el).find("ul");
            $list.empty();
            if(self.scroll) self.scroll.destroy();
            // Initialize scrolling:
            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true});

            // Fill the list with a basic set of media entries (e.g. "all media entries that are attachable to emails"):


            var media = window.mediaRepository.find(this.props.prefiltersearchterms, this.props.prefilterattributestobesearched);
            if (media) {
                $.each(media, function (file, meta) {
                    var listElement = window.mediaRepository.render(file, meta, self.renderOptions);
                    if (listElement) {
                        $list.append(listElement);
                    }
                });
                self.scroll.refresh();
            }

            // Set up live-search (on each key stroke):
            var $listElements = $(self.el).find("ul li");
            var $input = $(self.el).find("input");
            $input.keyup(function (e) {
                // Dismiss on enter:
                if (e.keyCode == 13) {
                    $input.blur();
                    return;
                }
                // Search and update list:
                var searchString = $input.val().toLowerCase();
                var searchTerms = searchString.split(/\s+/g);
                $listElements.each(function () {
                    var $listElement = $(this);
                    var found = searchTerms.reduce(function (found, searchTerm) {
                        return found && ($listElement.text().toLowerCase().indexOf(searchTerm) !== -1);
                    }, true);
                    $listElement.toggleClass("hidden", !found);
                });
                self.scroll.refresh();
            });
        }
    }

});
app.register("ap-media-repository", function () {


    /**
     * Implements a database interface for accessing meta information of media content.
     * --------------------------------------------------------------------------------
     *
     * The media repository provides search and rendering capability
     * of arbitrary media information and content based on meta data
     * defined in a json file. Within this json file arbitrary meta
     * data can be associated with any type of file or content.
     * The solution is relying heavily the "convention over configuration" principle.
     *
     * Anatomy of a media entry:
     *
     *     // It's key can be any kind of unique string:
     *     // An example convention might be to put in the file path
     *     // of a real file the meta data should be associated with:
     *     "content/pdf/reference_01.pdf": {
	 *         // Meta data is defined as attributes. Those can really
	 *         // be completely arbitrary as long as there is a renderer
	 *         // implemented that is capable of processing these values.
	 *         // Currently string, number and boolean are the types of
	 *         // object values supported by the search/find functionality.
	 *         "title": "Doe J, Lorem Ipsum 1. 2005",
	 *         "referenceId": 3,
	 *         "allowDistribution": true,
	 *         "tags": "document pdf publication reference 3"
	 *     },
     *
     * Apart from searching, each media entry can also be rendered into
     * DOM via "renderers", e.g. in order to be displayed inside a list.
     * For each "type" of media (which is completely up to the developer to be defined),
     * a separate renderer must be implemented and registered at the media repository.
     * When a media entry is about to be rendered, the media repository uses the
     * renderer that matches first the media type of the file or content of the entry
     * (first come first serve at registration time).
     *
     * Anatomy of a media renderer:
     *
     *     MediaRepository.addRenderer({
	 *         // Regular expression used to determine what "type" of
	 *         // media entries are accepted by this renderer:
	 *         regex: <some regular expression>,
	 *         // Function returning a jQuery DOM element representing that
	 *         // media entry based on the filename or content as well as meta data
	 *         render: function (fileOrContent, meta, options) {
	 *             return <some generated jQuery DOM element>;
	 *         }
	 *     });
     **/


    var _metadata;
    var _renderers;


    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            window.mediaRepository = this; // export globally
            window.mediaRepository.load("media.json"); // load database file

            var createBasicMediaEntry; //forward declaration

            // Content:
            window.mediaRepository.addRenderer({
                regex: /^content\:\/\//,
                render: function (file, meta, options) {
                    return createBasicMediaEntry(file, meta, $.noop)
                        .addClass('content')
                        .append("<span class='title'>" + file.replace("content://", "") + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // PDF:
            window.mediaRepository.addRenderer({
                regex: /\.(pdf)$/,
                render: function (file, meta, options) {
                    options = $.extend({
                        onTap: function () {
                            console.log('ag.openPDF("' + file + '", "' + meta.title + '")');
                            ag.openPDF(file, meta.title);
                        }
                    }, options);
                    return createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('pdf')
                        .append("<span class='title'>" + (meta.title || "") + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // URL:
            window.mediaRepository.addRenderer({
                /* http://blog.mattheworiordan.com/post/13174566389 */
                regex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                render: function (file, meta, options) {
                    options = $.extend({
                        shouldAllowTap: function () {
                            return true;
                        },
                        onTap: function () {
                            console.log('window.open("' + file.replace(/^(https?|ftp)/, "agnitiodefaultbrowser") + '", "' + meta.title + '")');

                            //iOS Fix until Agnitio fixes their ag.openUrl function
                            //window.open(file.replace(/^(https?|ftp)/, "agnitiodefaultbrowser"));

                            ag.openURL(file, meta.title);


                        }
                    }, options);
                    return createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('url')
                        .append("<span class='title'>" + (meta.title || "") + "</span>")
                        .append("<span class='url'>(" + file + ")</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // Video (with thumbnail):
            // Expecting a PNG thumbnail image by convention
            // e.g. thumbnail for "content/video/my_movie.mp4" is expected to be "content/video/my_movie.mp4.png"
            window.mediaRepository.addRenderer({
                regex: /\.(mov|mp4|m4v)$/,
                render: function (file, meta, options) {
                    options = $.extend({
                        onTap: function () {
                            $("<div class='videoPopup'><video src='" + file + "' controls/><div class='close'></div></div>")
                                .on("swipedown swipeup swiperight swipeleft", function (e) {
                                    e.stopPropagation();
                                })
                                .on("tap", function (event) {
                                    if ($(event.target).is(":not(video)")) $(this).remove();
                                }).appendTo("#presentation");
                            var v = $("#presentation").find('.videoPopup video').get(0)
                            if (v.load) v.load()
                        }
                    }, options);
                    var entry = createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('video')
                        .append("<span class='title'>" + meta.title + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                    entry.find(".icon").css({
                        "background-image": "url('" + file + ".png')",
                        "background-size": "contain"
                    });
                    return entry;
                }
            });

            createBasicMediaEntry = function (file, meta, onTap) {
                var presentationName = app.config.get('name');
                var storageNamespace = presentationName + ":attachmentStorage";
                var attachmentStorage = JSON.parse(localStorage[storageNamespace] || "{}");

                var $emailAttachmentToggler = null;
                if (meta.allowDistribution) {
                    $emailAttachmentToggler = $("<div class='emailAttachmentToggler' />");
                    $emailAttachmentToggler.on("tap", function (e) {
                        attachmentStorage = JSON.parse(localStorage[storageNamespace] || "{}");

                        var file = $(this).parent().attr("data-file");
                        var isAttached = !attachmentStorage[file];
                        if (isAttached) {
                            attachmentStorage[file] = true;
                        } else {
                            delete(attachmentStorage[file]);
                        }
                        localStorage[storageNamespace] = JSON.stringify(attachmentStorage);
                        $("[data-file='" + file + "']").attr("data-is-attached", isAttached);
                    });
                }

                return $("<li/>")
                    .addClass('mediaEntry')
                    .attr("data-file", file)
                    .attr("data-is-attached", !!attachmentStorage[file])
                    .append($emailAttachmentToggler)
                    .append("<div class='icon' />")
                    .append(meta.referenceId ? "<div class='referenceId'>[" + meta.referenceId + "]</div>" : "")
                    .on("tap", ":not(.emailAttachmentToggler)", function () {
                        onTap.apply(this);
                    });
            };
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        /**
         * Loads a JSON file containing meta data in an object for later runtime use.
         *
         * @method load
         * @param {String} file Path of file containing meta data.
         */
        load: function (file) {
            _metadata = {};
            _metadata = JSON.parse(app.cache.get(file));
            if (!_metadata) {
                $.ajax({
                    url: file,
                    dataType: "json",
                    success: function (json) {
                        _metadata = json;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        throw "Error loading media repository metadata file '" + file + "': " + textStatus;
                    },
                    async: false
                });
            }
        },
        /**
         * Returns the meta data object representing the meta database at runtime.
         *
         * @method metadata
         * @return {Object} Reference to the meta data object.
         */
        metadata: function () {
            return _metadata;
        },
        /**
         * Searches through the meta data object for given search terms in given attributes.
         *
         * @method find
         * @param {String} [searchTerms] Search terms separated by whitespaces. If not specified, all entries will be returned.
         * @param {String|Array} [attributesToBeSearched] Meta attribute keys whose values should be searched for searchTerms. If not specified, all attributes are being searched.
         * @return {Object} Hash containing found media entries or null if nothing was found.
         */
        find: function (searchTerms, attributesToBeSearched) {

            var searchTerms = searchTerms || "";
            var searchTerms = searchTerms.toLowerCase().split(/\s+/g);
            if (typeof attributesToBeSearched === "string") {
                attributesToBeSearched = [attributesToBeSearched];
            }
            var results = null;
            $.each(_metadata, function (file, meta) {
                var haystack = "";

                if (attributesToBeSearched) { // search only specific attributes
                    $.each(attributesToBeSearched, function (index, attributeToBeSearched) {
                        var attrVal = meta[attributeToBeSearched];
                        if (attrVal && (typeof attrVal === "string"
                            || typeof attrVal === "number"
                            || typeof attrVal === "boolean")) {
                            haystack += attrVal.toString() + " ";
                        }
                    });
                } else { // search all
                    $.each(meta, function (attrKey, attrVal) {
                        if (typeof attrVal === "string" || typeof attrVal === "number" || typeof attrVal === "boolean") {
                            haystack += attrVal.toString() + " ";
                        }
                    });
                }
                if (haystack.length > 0) {
                    haystack = haystack.toLowerCase();
                    var found = searchTerms.reduce(function (found, searchTerm) {
                        return found && (haystack.indexOf(searchTerm) !== -1);
                    }, true);
                    if (found) {
                        results = results || {};
                        results[file] = meta;
                    }
                }
            });
            return results;
        },
        /**
         * Adds a renderer to the renderer chain.
         *
         * @method addRenderer
         * @param {Object} Renderer to be added.
         */
        addRenderer: function (renderer) {
            _renderers = _renderers || [];
            _renderers.push(renderer);
        },
        /**
         * Renders a media entry. Uses the first matching renderer in the renderer chain.
         *
         * @method render
         * @param {String} file Media entry key.
         * @param {Object} meta Media entry meta data.
         * @param {Object} options Attributes passed to the designated renderer.
         * @return {jQuery Element} Rendered jQuery Element ready to be inserted into the DOM.
         */
        render: function (file, meta, options) {
            var renderer = _renderers.reduce(function (bestRenderer, currentRenderer) {
                return bestRenderer || (currentRenderer.regex.test(file) && currentRenderer)
            }, undefined);
            if (!renderer) console.log("Warning: no renderer found for media resource ", file);
            else return renderer.render(file, meta, options);
        }
    }

});
app.register("ap-notepad", function() {

  /**
   * Implements the Notepad Class.
   * -------------------------------------
   * This class enables the user to draw over other content via touch/mouse events.
   *
   * @class Notepad
   * @constructor
   * @param {object} options Valid properties are:
   *     - $container: jQuery DOM object inside which to load the module
   *     - $menuButton: jQuery DOM object representing the button which toggled the notepad.
   *       Used to possition the Notepad menu over the original toggler.
   */

  var BRUSH_RED   = "modules/ap-notepad/assets/brush_red.png";
  var BRUSH_GREEN = "modules/ap-notepad/assets/brush_green.png";
  var brush = new Image();
  var sketcher;


  var self;
  return {
    publish: {
        
    },
    events: {
      "swipeleft": function (event) {
        event.stopPropagation();
      },
      "swiperight": function (event) {
        event.stopPropagation();
      },
      "swipeup": function (event) {
        event.stopPropagation();
      },
      "swipedown": function (event) {
        event.stopPropagation();
      }
    },
    states: [],
    onRender: function(el) {
      self = this;
      app.$.notepad = this;

      brush.src = BRUSH_RED;
      brush.onload = function () {
        sketcher = new Sketcher($("canvas"), brush);
      };

      $(el).find(".button.exit").on("tap", function () {
        self.toggle();
        sketcher.clear();
      });

      $(el).find(".button.green").on("tap", function () {
        brush.src = BRUSH_GREEN;
      });
      $(el).find(".button.red").on("tap", function () {
        brush.src = BRUSH_RED;
      });
      $(el).find(".button.clear").on("tap", function () {
        sketcher.clear();
      });

      $(el).find(".button:not(.clear,.exit)").on("tap", function (event) {
        $(self.el).find('.button').removeClass('active');
        $(event.target).addClass('active');
      });

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    unload: function() {

    },

    toggle: function() {
      var self = this;
      $(self.el).find('.Notepad').toggleClass("active");
      var pencilPos = $(".bar .button.notepad").offset();
      $(".palette").css({
        top: pencilPos.top+3,
        left: pencilPos.left+9
      });
    }
  }

});
/**
 * Implements the Collections Overview.
 * ------------------------------------
 * This module Presents an overview of the default collections set in presentation.json and allows loading slides by tapping on their thumbnails.
 *
 * @class Overview
 * @extends Module
 * @constructor
 * @param {object} options Valid properties are:
 *     - $container: jQuery DOM object inside which to load the module
 *     - slideTapAction: one of the following strings representing what to do when a thumbnail receives the tap event
 *         - "goto" => goto slide on tap
 *         - "noop" => do nothing
 *         - "showPreview" => (NOT IMPLEMENTED) shows a bigger thumbnail of the slide
 *     - disableScrollOnSlideDrag: {boolean}
 */

app.register("ap-overview", function () {
    var self;
    var eventNamespace = ".overview";
    var $collectionsList;
    var $collectionOverview;
    var $collectionContainer;
    var _mouseDownEvent;
    var _mouseUpEvent;

    return {
        slideTapAction: ["goto", "noop", "showPreview"][0],
        disableScrollOnSlideDrag: false,
        publish: {
            iscustomoverview: false,
            highlightCurrentSlide: true
        },
        events: {
            "tap .overview .collectionName": "collectionsListHandler",
            "tap .overview .o_slide": "slideHandler"        },
        states: [
            {
                id: "visible"
            },
            {
                id: "customOverview"
            }
        ],
        onRender: function (el) {



            self = this;

            app.$.overview = this;

            this.normalizeCollections();

            if (this.props.iscustomoverview){
                this.goTo("customOverview");
            }

            _mouseDownEvent = touchy.events.start + eventNamespace;

            _mouseUpEvent = touchy.events.end + eventNamespace;

            $collectionsList = $(el).find(".collectionsList"); // available collections container
            $collectionOverview = $(el).find(".collectionOverview"); // selected collection overview container
            $collectionContainer = $collectionOverview.find(".o_collection"); // actual collection thumbnail
            var $overview = $(el).find('#overview');

            $collectionsList.empty();

            app.$.on('open:ap-overview', function () {
                if(this.stateIsnt("visible"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-overview', function () {

                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            app.$.on('insert:ap-overview', function () {
                this.goTo("custom-overview");
                this.updateOverview();
            }.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {
        },

        hide: function () {
            app.unlock();
            this.reset();
        },

        show: function () {
            this.goTo('visible');
            app.lock();
            self.slideTapAction = "goto";
            app.$.customCollections.hide();
            this.updateOverview();
        },

        showCustomOverview: function () {
            this.goTo('customOverview');
            self.slideTapAction = "noop";
            self.disableScrollOnSlideDrag = true;
            this.updateOverview();
        },

        unload: function () {
            $collectionsList.empty();
        },

        updateOverview: function () {

            var $body = $("body");

            $collectionsList = $(".overview .collectionsList"); // available collections container


            $collectionContainer = $collectionOverview.find(".o_collection"); // actual collection thumbnail
            var $overview = $('.overview');

            $collectionsList.empty();

            var storyboards = app.model.get().storyboards;


            //traverse app.json and get the collections list (ignoring custom collections)
            $.each(storyboards, function (index, collection) {

                if(collection.type !== "collection") return;

                if (collection.id.indexOf('custom') == -1 ) {
                    var $collectionName = $("<div class='collectionName' />");
                    $.extend({id: collection.id}, collection);
                    $collectionName.data("collection", collection);
                    $collectionName.attr("data-collectionId", collection.id);
                    $collectionName.text(collection.name);
                    $collectionsList.append($collectionName);
                }
            });

            // get custom collections
            $.each(app.$.customCollectionsStorage.getAll(), function (name, content) {
                if (content.slideshows.length != 0) {
                    var $collectionName = $("<div class='collectionName' />");
                    $collectionName.data("collection", content);
                    $collectionName.attr("data-collectionId", content.id);
                    $collectionName.text(content.name);
                    $collectionsList.append($collectionName);
                }
            });


            /* very strange fix, which currently works */
            var $currentCollection = $collectionsList.find("[data-collectionid='" + app.getPath().split("/")[0] + "']");
            var tempEvent = {
                target: $currentCollection
            };
            self.collectionsListHandler(tempEvent);


            if (this.props.iscustomoverview) {

                $collectionOverview = $(".custom-collections .overview .collectionOverview"); // selected collection overview container
            }
            else {

                $collectionOverview = $(".overview .collectionOverview"); // selected collection overview container
            }


            if(self.scroll) self.scroll.destroy();

            self.scroll = new IScroll( $(".overview .collectionOverview").get(0), {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });

            if(self.scrollCustom) self.scrollCustom.destroy();
            self.scrollCustom = new IScroll( $(".custom-collections .overview .collectionOverview").get(0), {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });


            if (self.disableScrollOnSlideDrag) {
                $collectionContainer.on(_mouseDownEvent, ".o_slide", function () {
                    self.scrollCustom.disable();
                    $("body").one(_mouseUpEvent, function () {
                        self.scrollCustom.enable();
                    });
                });
            }


        },

        normalizeCollections: function() {

            var allCollections = app.model.get().storyboards;

            $.each(allCollections, function(i, collection){

                    if(!collection.id && !collection.type){
                        var newContent = [];
                        $.each(collection.content, function(index, content){
                            var slideShowName;
                            switch (index) {
                                case 0:
                                    slideShowName = "Home";
                                    break;
                                case content.length - 1:
                                    slideShowName = "Summary";
                                    break;
                                default:
                                    slideShowName = "Chapter " + index
                            }

                            var slideShowId;
                            if(typeof content === 'string'){
                                slideShowId = content + "-chapter-" + Math.floor((Math.random() * 10000) + 1);

                            }else
                            {
                                slideShowId = slideShowName + "-" + Math.floor((Math.random() * 10000) + 1);

                            }

                            var temp = {
                                "id": slideShowId,
                                "name": slideShowName,
                                "type": "slideshow",
                                "content": content
                            };
                            app.model.addStructure(slideShowId, temp);
                            newContent.push(slideShowId);
                        });

                        app.model.deleteStoryboard(i);
                        var collectionId =  collection.name + "_" + Math.floor((Math.random() * 10000) + 1);
                        var collectionObj = {
                            "id": collectionId,
                            "name": collection.name,
                            "linear": false,
                            "type": "collection",
                            "content": newContent
                        };
                        app.model.addStoryboard(collectionId,collectionObj);
                    }
                }
            );

        },

        collectionsListHandler: function (event) {

            $collectionsList.find(".selected").removeClass('selected');
            $(event.target).addClass('selected');
            // load the selected collection

            var collection = $(event.target).data("collection");
            var collectionId = $(event.target).attr("data-collectionId");



            $collectionContainer
                .empty()
                .attr("data-id", collectionId)
                .data('contentGroups', app.model.getStoryboard(collectionId).contentGroups);
            // TODO add Class and Data
            if (collection.isCustomPresentation) {
                collection.contentGroups = app.model.getStoryboard(collectionId).contentGroups;
                $.each(collection.slideshows, function (index, slideshow) {
                    var $slideshow = $("<div class='o_slideshow' />")
                        .appendTo($collectionContainer)
                        .attr("data-id", slideshow.id)
                        .append("<div class='o_slideshowName'>" + slideshow.name + "</div>");
                    $.each(slideshow.content, function (index, slideId) {
                        var $slide = $("<div class='o_slide' />")
                            .appendTo($slideshow)
                            .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                            .attr("data-id", slideId);
                        if (collection.contentGroups) {
                            $.each(collection.contentGroups, function (i, group) {
                                if (~group.slides.indexOf(slideId)) {
                                    $slide.data('contentGroup', group);
                                    $slide.addClass('grouped');
                                    if (group.orientation == 'horizontal') {
                                        $slide.parents('.o_slideshow').addClass('grouped');
                                    }
                                }
                            });
                        }
                        $slide.text(app.model.get().slides[slideId].name);
                    });
                });


                if (collection.slideshows.length > 0 && app.model.hasStoryboard(collection.id) == false) {
                    var slideshowIdArray = [];
                    $.each(collection.slideshows, function (i, slideshow) {
                        slideshowIdArray.push(slideshow.id);
                        var slidesArrary = [];
                        $.each(slideshow.content, function (i, slide) {
                            slidesArrary.push(slide);
                        });

                        app.model.addStructure(slideshow.id, slideshow);
                    });

                    var collectionObj = {
                        "content": slideshowIdArray,
                        "name": collection.name,
                        "linear": false,
                        "id": collection.id,
                        "type": "collection"
                    };

                    app.model.addStoryboard(collection.id, collectionObj);

                }


            }
            else {

                collection = app.model.getStoryboard(collectionId);

                $.each(collection.content, function (index, slideshowId) {

                    var slideshow = app.model.getStructure(slideshowId);
                    slideshow = $.extend({id: slideshowId}, slideshow);
                    var $slideshow = $("<div class='o_slideshow' />")
                        .appendTo($collectionContainer)
                        .attr("data-id", slideshow.id)
                        .append("<div class='o_slideshowName'>" + slideshow.name + "</div>");



                    if (typeof slideshow.content === 'string'){
                        var slideId = slideshow.content;
                        var $slide = $("<div class='o_slide' />")
                            .appendTo($slideshow)
                            .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                            .attr("data-id", slideId);
                        if (collection.contentGroups) {
                            $.each(collection.contentGroups, function (i, group) {
                                if (~group.slides.indexOf(slideId)) {
                                    $slide.data('contentGroup', group);
                                    $slide.addClass('grouped');
                                    if (group.orientation == 'horizontal') {
                                        $slide.parents('.o_slideshow').addClass('grouped')
                                    }
                                }

                            });
                        }
                        $slide.text(app.model.get().slides[slideId].name);
                    }else
                    {
                        $.each(slideshow.content, function (index, slideId) {
                            var $slide = $("<div class='o_slide' />")
                                .appendTo($slideshow)
                                .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                                .attr("data-id", slideId);
                            if (collection.contentGroups) {
                                $.each(collection.contentGroups, function (i, group) {
                                    if (~group.slides.indexOf(slideId)) {
                                        $slide.data('contentGroup', group);
                                        $slide.addClass('grouped');
                                        if (group.orientation == 'horizontal') {
                                            $slide.parents('.o_slideshow').addClass('grouped')
                                        }
                                    }

                                });
                            }

                            $slide.text(app.model.get().slides[slideId].name);
                        });
                    }



                });
            }

            var slideThumbSelector = "";
            $.each(app.getPath().substr().split("/"), function (i, id) {
                slideThumbSelector += "[data-id='" + id + "'] ";
            });
            $collectionOverview.find(".highlighted").removeClass('highlighted');
            $collectionOverview.find(slideThumbSelector).addClass('highlighted');


        },

        slideHandler: function (event) {
            if (self.slideTapAction === "goto") {
                var slideId = $(event.target).attr("data-id");
                var slideshowId = $(event.target).parent().attr("data-id");
                var collectionId = $(event.target).parent().parent().attr("data-id");

                var path = collectionId + "/" + slideshowId + "/" + slideId;

                app.goTo(path);
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();

            } else if (self.slideTapAction === "noop") {
                //do nothing
            }

        }
    }

});
app.register("ap-provide-slides", function () {


    var self;
    return {
        addedSlides: [],
        publish: {},
        events: {
            "tap .clearButton": "clearSlides",
            "tap .sendButton": "sendMail",
            'tap .add-user-btn': "checkAddedMail",
            "tap .o_slide .removeButton": "removeSlideHandler"
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {
            self = this;

            app.$.provideSlides = this;

            app.$.on('open:ap-provide-slides', function () {
                if (this.stateIsnt("visible"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-provide-slides', function () {
                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            this.usersList = this.el.querySelector('#userList');
            this.emailField = this.el.querySelector('.email-field');
            this.messageBox = this.el.querySelector('.send-message');
            this.slideContainer = this.el.querySelector('.thumbnails');


            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true, mouseWheel: true, scrollY: true});
            self.scroll.refresh();
            this.createSlideThumbnail();

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {
        },
        onExit: function (el) {

        },

        hide: function () {
            app.unlock();
            this.reset();
        },

        show: function () {
            app.lock();
            this.goTo('visible');
            this.createSlideThumbnail();
            self.scroll.refresh();


        },

        addSlide: function (slideId) {
            if (self.addedSlides.indexOf(slideId) === -1)
                self.addedSlides.push(slideId);
        },

        removeSlide: function (slideId) {
            var slideIndex = self.addedSlides.indexOf(slideId);
            self.addedSlides.splice(slideIndex, 1);
            app.$.trigger("remove:addedSlide", {id: slideId});
        },

        removeSlideHandler: function (e) {

            var slideId = e.target.dataset.slideId;
            this.removeSlide(slideId);
            this.createSlideThumbnail();

        },

        sendMail: function () {
            var users = this.usersList.querySelectorAll('input'),
                selectedUsers = this.checkSelectedContacts(users);

            if (!self.addedSlides.length) {
                self.addedSlides = ['home_slide', 'summary_slide'];
            }

            if (ag && ag.content) {
                ag.content.provide(selectedUsers, self.addedSlides);

                //this.messageBox.classList.add('show');
                // this.sendBtn.classList.add('disabled');

                var $popup = $('#content-provided');

                $popup.fadeIn();

                $popup.delay(1600).fadeOut();
            }
        },

        clearSlides: function () {
            self.addedSlides = [];
            this.createSlideThumbnail();
            app.$.trigger("clear:addedSlides");
            $('#userList').empty();
        },

        addUsers: function () {
            var self = this;
            setTimeout(function () {
                if (ag.data.call_contacts.length) {
                    ag.data.call_contacts.forEach(function (data) {
                        self.createUserListItem(data);
                    });
                }
            }, 100);
        },

        checkAddedMail: function () {
            var email = this.emailField.value;
            if (email) {
                this.createUserListItem({email: email});
                this.emailField.value = '';
            }
        },
        createUserListItem: function (data) {
            var item = document.createElement('li');
            var checkBox = document.createElement('input');
            var text = document.createElement('p');
            var name = '';
            if (data.email) {
                checkBox.setAttribute('type', 'checkbox');
                checkBox.checked = true;
                checkBox.setAttribute('value', data.id || data.email);
                if (data.firstName) {
                    name = data.firstName;
                    if (data.lastName) name += ' ' + data.lastName;
                    if (data.id) name += ' (' + data.id + ')';
                }
                else {
                    name = data.email;
                }
                text.innerHTML = name;
                item.appendChild(checkBox);
                item.appendChild(text);
                this.usersList.appendChild(item);
            }
            else {
                if (data.id) {
                    alert('User without email: ' + data.id);
                }
            }
        },

        checkSelectedContacts: function (users) {
            var selectedUsers = [];

            for (var i = 0; i < users.length; i++) {
                if (users[i].checked) {
                    selectedUsers.push(users[i].value);
                }
            }

            return selectedUsers;
        },

        createSlideThumbnail: function () {


            var $thumbnails = $('.thumbnails');
            $thumbnails.empty();

            var slideHTML = "<div class='o_slide'><div class='removeButton'></div></div>"; // thumbnail template


            $.each(self.addedSlides, function (index, slideId) {

                var slide = app.model.getSlide(slideId);
                var $slide = $(slideHTML);
                $slide.find('.removeButton').attr("data-slide-id", slideId);
                $slide.css({"background-image": "url(slides/" + slideId + "/" + slideId + ".png)"});

                var slideNameHTML = "<div class='slide-name'>" + slide.name + "</div>";

                $slide.append(slideNameHTML);

                $thumbnails.append($slide);
            });

            if (self.scroll) self.scroll.destroy();

            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true, mouseWheel: true, scrollY: true});
            self.scroll.refresh();


        }


    }

});
app.register("ap-reference-library", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    states: [
      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;

      app.$.on('open:ap-reference-library', function () {
        if(this.stateIsnt("visible"))
          this.show();
      }.bind(this));

      app.$.on('close:ap-reference-library', function () {
        this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        this.hide();
        this.unload();
      }.bind(this));

      var $list = $(el).find("ul");

      // Initialize scrolling:
      self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true});

      // Fill the list with all media entries that have a reference id:
      var references = window.mediaRepository.find("", "referenceId");
      if (references) {
        $.each(references, function (file, meta) {
          $list.append(window.mediaRepository.render(file, meta));
        });
        self.scroll.refresh();
      }

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      app.unlock();
      this.reset();
    },

    show: function () {
      app.lock();
      this.goTo('visible');
    },

    unload: function() {
      if(this.stateIs("visible"))
        if(self.scroll) self.scroll.destroy();
    }
  }

});
app.register("ap-slide-indicator", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenToOnce(app.slide, 'slide:enter', this.updateIndicators.bind(this));
            app.listenToOnce(app.slideshow, 'load', this.updateIndicators.bind(this));
            app.listenTo(app.slideshow, 'update:current', this.updateIndicators.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        updateIndicators: function (data) {


            var slideList = app.slideshow.inspect();
            var $joystick = $('.joystick');

            if(slideList.getLeft()){
                $joystick.find('.left').css('display', 'block');
            }
            else{
                $joystick.find('.left').css('display', 'none');
            }
            if(slideList.getRight()){
                $joystick.find('.right').css('display', 'block');
            }
            else{
                $joystick.find('.right').css('display', 'none');
            }
            if(slideList.getUp()){
                $joystick.find('.up').css('display', 'block');
            }
            else {
                $joystick.find('.up').css('display', 'none');
            }
            if(slideList.getDown()){
                $joystick.find('.down').css('display', 'block');
            }
            else{
                $joystick.find('.down').css('display', 'none');
            }
        }
    }

});
app.register("ap-specific-product-characteristics", function() {

  return {
    publish: {
        
    },
    events: {

    },
    states: [],
    onRender: function(el) {
      /**
       * Implements a function that will open the specific-product-characteristics.pdf file with the agnitio in-app PDF viewer.
       * ----------------------------------------------------------------------------------------------------------------------
       *
       * @class SpecificProductCharacteristics
       * @constructor
       */

      app.$.specificProductCharacteristics = this;



    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    openPdf: function() {
      console.log('openPDF("shared/references/specific-product-characteristics.pdf", "Specific Product Characteristics"');
      ag.openPDF("shared/references/specific-product-characteristics.pdf", "Specific Product Characteristics");
      var $joystick = $('.joystick');
      var $addSlideButton = $('[data-module="ap-add-slide-button"]');
      $joystick.fadeIn();
      $addSlideButton.fadeIn();

    }
  }

});
app.register("ap-toolbar", function () {

    var self;

    return {
        publish: {
            hide: false,
            microsite: false
        },
        events: {
            "tap": "handleEvent",
            "tap .button[data-module-to-load='ap-specific-product-characteristics']": function (event) {
                app.$.specificProductCharacteristics.openPdf();
                self.handleEvent(event);
            },
            "tap .button.back": function () {
                app.$.BackNavigation.back();
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();
            },
            "tap .bar .button.notepad": function () {
                app.$.notepad.toggle();
            },
            "tap .bar .button.jumpToLastSlide": function () {
                self.jumpToLastSlide();
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();
            },
            "swipeleft": function (event) {
                event.stopPropagation();
            },
            "swiperight": function (event) {
                event.stopPropagation();
            },
            "swipeup": function (event) {
                event.stopPropagation();
            },
            "swipedown": function (event) {
                event.stopPropagation();
            }
        },
        states: [
            {
                id: 'minimized',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,100%,0)');

                }
            },
            {
                id: 'hidden',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,667px,0)');
                }
            },
            {
                id: 'maximized',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,0,0)');
                }
            }
        ],
        onRender: function (el) {

            self = this;
            app.$.toolbar = this;

            if (this.props.hide) {
                this.hide();
            }

            $(".ap-toolbar").attr("data-state", "minimized");
            this.goTo("minimized");

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        setMicrosite: function () {
            self.microsite = true;
            $(this.$el).addClass("microsite");
        },

        hide: function () {
            app.$.trigger("toolbar:hidden");
            var $joystick = $('.joystick');
            $(".ap-toolbar").attr("data-state", "hidden");
            $joystick.fadeIn();
            this.goTo("hidden");
        },


        open: function (e) {


        },

        jumpToLastSlide: function(){
            var collectionLength = app.slideshow.getLength();
            var lastSlide = app.model.getStoryboard(app.slideshow.getId()).content[collectionLength - 2];
            app.$.BackNavigation.setPrevCollection(app.model.getStoryboard(app.slideshow.getId()).id);
            app.slideshow.goTo(lastSlide);

        },

        handleEvent: function (e) {

            if($(e.target).hasClass('active')) return;

            var $allButtons = $(".button[data-module-to-load]");
            var $joystick = $('.joystick');
            var $addSlideButton = $('[data-module="ap-add-slide-button"]');

            var target = e.target;


            if ($(target).hasClass(this.props.dataModule)) {
                var state = $(target).attr("data-state");
                var map = {
                    hidden: "minimized",
                    maximized: "hidden",
                    minimized: "hidden"
                };
                self.goTo(map[state]);
                $allButtons.removeClass("active");

                $("input").blur();
                $joystick.fadeIn();
                if (app.env != 'ag-microsites' && app.env != 'ag-remote') {
                 $addSlideButton.fadeIn();
                }
                $(target).attr("data-state", map[state]);
                app.$.menu.hide();
                app.$.trigger("toolbar:hidden");
            }


            var moduleToLoad = $(target).attr("data-module-to-load");
            var currentModule = "";
            if (moduleToLoad) {

                var state = $(target).attr("data-toolbar-state");
                setTimeout(function () {
                    // avoid same touch event triggering input elements focus
                    // avoid same touch event triggering input elements focus

                }, 0);
                if (state) {
                    app.$.toolbar.goTo(state);
                    app.$.menu.hide();
                }

                if(currentModule === moduleToLoad) return;

                var trigger = "open:" + moduleToLoad;
                app.$.trigger(trigger);
                $joystick.fadeOut();
                $addSlideButton.fadeOut();

                currentModule = moduleToLoad;
                //app.$.trigger("toolbar:load-module", {id: moduleToLoad});

                $allButtons.not($(target)).removeClass("active");

                $allButtons.each(function (index, item) {

                    var otherModule = $(item).attr("data-module-to-load");
                    if (moduleToLoad != otherModule) {
                        var trigger = "close:" + otherModule;
                        app.$.trigger(trigger);
                    }
                });

                $(target).addClass("active");
            }

        }

    }
});
app.register("ap-video-library", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    states: [

      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;


      app.$.on('open:ap-video-library', function () {
        if(this.stateIsnt("visible"))
          this.show();
      }.bind(this));

      app.$.on('close:ap-video-library', function () {
        this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        this.hide();
        this.unload();
      }.bind(this));


      var $list = $(el).find("ul");

      // Initialize scrolling:
      self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true});

      // Fill the list with all media entries that have the "video" tag:
      var videos = window.mediaRepository.find("video");
      if (videos) {
        $.each(videos, function (file, meta) {
          $list.append(window.mediaRepository.render(file, meta));
        });
        self.scroll.refresh();
      }
    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      app.unlock();
      this.reset();
    },

    show: function () {
      app.lock();
      this.goTo('visible');
    },

    unload: function() {
      if(this.stateIs("visible"))
        if(self.scroll) self.scroll.destroy();
    }
  }

});
app.register("bhc_microsite", function() {
  return {
    events: {
      "tap .thumb": "gotoSlide"
    },
    states: [],
    onRender: function(el) {
      var self = this;
      var provided;
      this.wrapper = this.el.querySelector('.slide-container');
      var defaultContent = ["test_slide_1", "test_slide_2", "test_slide_3"];
      if (window.ag) {
        // Allow some time for message to come from server
        // Will work even if the timeout is too short, but
        // there might be a slight flash of content
        setTimeout(function() {
          provided = ag.content.get(); // If server/content is setup
          if (provided.topics && provided.topics.length) {
            self.buildThumbs(provided.topics);
            self.createStoryboard(provided.topics);
            console.log('Build content from topics');
          }
          else {
            // This is a demo fallback. Can be replaced with error message
            // or other default content
            self.buildThumbs(defaultContent);
            console.log('Build content from defaults. No topics provided');
          }
          // If server/content setup happens after timeout
          ag.on('contentData', function(data) {
            if (!data.topics || !data.topics.length) data.topics = defaultContent;
            self.buildThumbs(data.topics);
            self.createStoryboard(data.topics);
            console.log('Update content from provided data');
          });
        },300);
      }
      else {
        this.buildThumbs(defaultContent);
        console.log('Build content from defaults. API not available.');
      }

    },
    onEnter: function(el) {
      app.$.toolbar.setMicrosite();

    },
    onExit: function(el) {

    },
    gotoSlide: function(event) {
      var thumb = event.target;
      var slide = thumb.getAttribute('data-slide-id');
      if (slide) {
        app.slideshow.goTo(slide);
      }
    },
    createStoryboard: function(topics) {
      var content = ['bhc_microsite'];
      content = content.concat(topics);
      if(app.model.hasStoryboard("bhc_custom"))
        app.model.deleteStoryboard("bhc_custom");

      app.model.addStoryboard("bhc_custom", {
        "name": "Personalized BHC",
        "content": content,
        "type":"microsite"
      });
      app.slideshow.load('bhc_custom');
    },
    buildThumbs: function(content){
      var self = this;
      self.wrapper.innerHTML = "";
      content.forEach(function(item) {
        var info = app.model.getItem(item);
        var thumb = document.createElement("div"),
            thumbText = document.createElement("p");
        if (info) {
          thumb.setAttribute('data-slide-id', item);
          thumb.classList.add('thumb');
          thumbText.innerHTML = info.name;
          thumbText.classList.add('thumb-text');

          thumb.appendChild(thumbText);
          self.wrapper.appendChild(thumb);
        }
      });
    }
  }
});
app.register("bcn-goto", function () {

    return {
        
        template: false,
        
        publish: {
            element: ''
        },
        events: {
            "tap": "navigate"
        },
        states: [],
        onRender: function () {
        },
        onRemove: function () {
        },
        onEnter: function () {
        },
        onExit: function () {
        },
        navigate: function (event) {
            var element = event.target;
            var path;
            var regex = new RegExp(/app\./);
            if (element) {
                path = element.getAttribute('data-goto');
//                console.log('element: ' + element);
//                console.log('path: ' + path);
//                console.log('regex: ' + regex);
                if (path) {
                    if (regex.test(path))
                        eval(path);
                    else
                        app.goTo(path);
                }
            }
        }
    };

});
