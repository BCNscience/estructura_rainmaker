Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},a=function(){return n.apply(this instanceof i&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,a.prototype=new i,a});var app=app||function(){"use strict";function t(){if(m.wrapper){var t=a(),e=app.config.get("maxScale"),n=app.config.get("minScale");m.slides.style.width=t.slideWidth+"px",m.slides.style.height=t.slideHeight+"px",y=Math.min(t.availableWidth/t.slideWidth,t.availableHeight/t.slideHeight),y=Math.max(y,n),y=Math.min(y,e),"undefined"==typeof m.slides.style.zoom||navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)?c(m.slides,"translate(-50%, -50%) scale("+y+") translate(50%, 50%)"):m.slides.style.zoom=y,app.trigger("update:layout",{scale:y})}}function e(){return y}function n(){function t(){!window.Promise&&window.ES6Promise&&(window.Promise=window.ES6Promise.Promise),i.length&&head.js.apply(null,i),app.start.init()}function e(e){head.ready(e.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0],function(){"function"==typeof e.callback&&e.callback.apply(this),0===--a&&t()})}var n=[],i=[],a=0,r=app.config.get("dependencies"),o=app.config.get("transition"),s=app.config.get("monitoringAPI");o?m.wrapper.classList.add(o):m.wrapper.classList.add("linear"),app.start||r.unshift({src:"accelerator/js/core.js"}),window.touchy||r.push({src:"accelerator/lib/touchy.js"}),!window.ag&&s&&r.unshift({src:s}),window.Promise||r.unshift({src:"accelerator/lib/promise.min.js"});for(var p=0,l=r.length;l>p;p++){var c=r[p];(!c.condition||c.condition())&&(c.async?i.push(c.src):n.push(c.src),e(c))}n.length?(a=n.length,head.js.apply(null,n)):t()}function i(){var t=m.slides.querySelectorAll(".slide");return t.length>0&&p(t).forEach(function(t,e){t.id&&(m[t.id]=t)}),t}function a(){var t=m.wrapper.offsetWidth,e=m.wrapper.offsetHeight,n=app.config.get();t-=e*n.margin,e-=e*n.margin;var i=n.width,a=n.height,r=20;return"string"==typeof i&&/%$/.test(i)&&(i=parseInt(i,10)/100*t),"string"==typeof a&&/%$/.test(a)&&(a=parseInt(a,10)/100*e),{availableWidth:t,availableHeight:e,slideWidth:i,slideHeight:a,slidePadding:r}}function r(e){var a=app.config.get();e&&app.config.add(e),e.setup&&e.setup(app.config.get()),app.env&&a[app.env]&&app.config.add(a[app.env]),!app.lang&&a.lang&&(app.lang=a.lang),t();i();app.config.add({cachedElements:m}),setTimeout(function(){n()},50)}function o(t,e){t=t||null,e=e||{},app.initialize=!1;window.location.port||null;m.theme=document.querySelector("#theme"),m.wrapper=document.querySelector(".accelerator"),m.slides=document.querySelector(".accelerator .slides"),m.template=document.querySelector(".accelerator .template"),app.queryParams=h(window.location.search),app.queryParams&&(app.queryParams.env&&(app.env=app.queryParams.env),app.queryParams.lang&&(app.lang=app.queryParams.lang),app.queryParams.mode&&(app.mode=app.queryParams.mode)),t?app.config.fetch(t,function(){r(e)}):r(e)}function s(t){return b.call(arguments,1).forEach(function(e){for(var n in e)t[n]=e[n]}),t}function p(t){return Array.prototype.slice.call(t)}function l(t){var e=0;if(t){var n=0;p(t.childNodes).forEach(function(t){"number"==typeof t.offsetTop&&t.style&&("absolute"===t.style.position&&(n+=1),e=Math.max(e,t.offsetTop+t.offsetHeight))}),0===n&&(e=t.offsetHeight)}return e}function c(t,e){t.style.WebkitTransform=e,t.style.MozTransform=e,t.style.msTransform=e,t.style.OTransform=e,t.style.transform=e}function u(){if(window.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1}function f(t,e){var n=u();if(!n)throw new Error("XMLHttpRequest or ActiveXObject is not available. Cannot get file.");n.open("GET",t),n.onreadystatechange=function(){4===n.readyState&&(n.onreadystatechange=function(){},n.status>=200&&n.status<300||304==n.status||0==n.status&&"file:"==window.location.protocol?e(null,n.responseText):400===n.status?e({error:"Could not locate file"},null):e({error:n.status},null))},n.send(null)}function d(t){var e,n=document.createElement("div"),i=n.style;return t.toLowerCase()in i?e="":"Webkit"+t in i?e="-webkit-":"Moz"+t in i?e="-moz-":"ms"+t in i?e="-ms-":"O"+t in i&&(e="-o-"),e}function h(t){return(t||document.location.search).replace(/(^\?)/,"").split("&").map(function(t){return t=t.split("="),this[t[0]]=t[1],this}.bind({}))[0]}function g(){function t(t){var e=_.template(t);return e()}return t}var v="1.1.0",m={},y=1,w=[],b=w.slice;return window.addEventListener("resize",t,!1),setTimeout(function(){app.initialize&&app.initialize("config.json")},100),{initialize:o,layout:t,getScale:e,util:{extend:s,getAbsoluteHeight:l,toArray:p,transformElement:c,getFile:f,getBrowserPrefix:d,_templateParser:g},version:v}}();!function(){function t(t){var e=++a+"";return t?t+e:e}var e=[],n=e.push,i=e.slice,a=({}.toString,0),r=app.events={on:function(t,e,n){if(!s(this,"on",t,[e,n])||!e)return this;this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:n,ctx:n||this}),this},once:function(t,e,n){if(!s(this,"once",t,[e,n])||!e)return this;var i,a=this,r=function(){i||(i=!0,a.off(t,r),e.apply(this,arguments))};return r._callback=e,this.on(t,r,n)},off:function(t,e,n){var i,a,r,o,p,l,c,u;if(!this._events||!s(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events=void 0,this;for(o=t?[t]:Object.keys(this._events),p=0,l=o.length;l>p;p++)if(t=o[p],r=this._events[t]){if(this._events[t]=i=[],e||n)for(c=0,u=r.length;u>c;c++)a=r[c],(e&&e!==a.callback&&e!==a.callback._callback||n&&n!==a.context)&&i.push(a);i.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=i.call(arguments,1);if(!s(this,"trigger",t,e))return this;var n=this._events[t],a=this._events.all;return n&&p(n,e),a&&p(a,arguments),this},stopListening:function(t,e,n){var i=this._listeningTo;if(!i)return this;var a=!e&&!n;n||"object"!=typeof e||(n=this),t&&((i={})[t._listenId]=t);for(var r in i)t=i[r],t.off(e,n,this),(a||!Object.keys(t._events).length)&&delete this._listeningTo[r];return this}},o=/\s+/,s=function(t,e,i,a){if(!i)return!0;var r;if("object"==typeof i){for(var s in i)r=[s,i[s]],n.apply(r,a),t[e].apply(t,r);return!1}if(o.test(i)){for(var p=i.split(o),l=0,c=p.length;c>l;l++)r=[p[l]],n.apply(r,a),t[e].apply(t,r);return!1}return!0},p=function(t,e){var n,i=-1,a=t.length,r=e[0],o=e[1],s=e[2];switch(e.length){case 0:for(;++i<a;)(n=t[i]).callback.call(n.ctx);return;case 1:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r);return;case 2:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r,o);return;case 3:for(;++i<a;)(n=t[i]).callback.call(n.ctx,r,o,s);return;default:for(;++i<a;)(n=t[i]).callback.apply(n.ctx,e)}},l={listenTo:"on",listenToOnce:"once"};Object.keys(l).forEach(function(e){var n=l[e];r[e]=function(e,i,a){var r=this._listeningTo||(this._listeningTo={}),o=e._listenId||(e._listenId=t("l"));return r[o]=e,a||"object"!=typeof i||(a=this),e[n](i,a,this),this}})}(),app.util.extend(app,app.events),app.config=function(){function t(t,e){for(var n in e)t[n]=e[n]}function e(t,e){var i=app.cache.get(t);i?(n(JSON.parse(i)),e()):app.util.getFile(t,function(i,a){var r;if(i)throw new Error("Unable to fetch configuration "+t,i);r=JSON.parse(a),r&&n(r),e()})}function n(e){t(s,e)}function i(t){return t?s[t]?s[t]:!1:s}function a(t,e){s[t]=e}function r(t,e,n){s[t]&&"object"==typeof s[t]?s[t][e]=n:(s[t]={},s[t][e]=n)}function o(t){s[t]&&n(s[t])}var s={width:960,height:700,margin:.1,minScale:.2,maxScale:1,controls:!0,progress:!0,history:!1,keyboard:!0,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,fragments:!0,embedded:!1,autoSlide:0,mouseWheel:!1,rollingLinks:!1,hideAddressBar:!0,previewLinks:!1,theme:null,transition:"linear",transitionSpeed:"default",backgroundTransition:"default",viewDistance:3,preload:!1,pathToSlides:"slides/<id>/",pathToModules:"modules/<id>/",monitoringAPI:"accelerator/lib/agnitio.js",dependencies:[],lazy:!1,remote:!1};return{fetch:e,add:n,get:i,set:a,update:r,storyboardSetup:o}}(),app.registry=function(){function t(t,e){i[t]=e(app),app.registry.trigger("register",t)}function e(t){return i[t]?!0:!1}function n(t){return t?e(t)?i[t]:null:i}var i={},a={add:t,exist:e,get:n};return app.util.extend(a,app.events),a}(),app.register=app.registry.add,app.util.extend(app.registry,app.events),app.cache=function(){function t(t,e){a[t]=e}function e(t){return a[t]?!0:!1}function n(t){return t?e(t)?a[t]:void 0:a}function i(t){return e(t)&&(a[t]=null),!0}var a={};return{put:t,exist:e,get:n,remove:i}}(),app.remote=function(){function t(t){n=t.role,i=t.path||null,app.config.set("remote",!0)}function e(){if(window.ag&&n){var t=function(){};app.slideshow.on("update:current",function(t){ag.msg.send({name:"slideEnter",value:app.getPath()})}),app.slide.on("state:enter",function(t){ag.msg.send({name:"stateEnter",value:JSON.stringify(t)})}),app.slide.on("reset",function(t){ag.msg.send({name:"stateExit",value:JSON.stringify(t)})}),"contact"===n&&(app.removeNavListeners(),app.slideshow.load=t,app.slideshow.goTo=t,app.slideshow.step=t,app.slideshow.next=t,app.slideshow.prev=t,app.slideshow.left=t,app.slideshow.right=t,app.slideshow.up=t,app.slideshow.down=t,ag.on("goTo",function(t){app.slideshow.__load__(t)}),ag.on("enterState",function(t){var e=JSON.parse(t),n=app.slide.get(e.view);n&&n.goTo(e.id,e.data)}),ag.on("resetState",function(t){var e=JSON.parse(t),n=app.slide.get(e.view);n&&n.reset()})),i&&app.slideshow.__load__(i)}}var n,i;return window.ag&&window.ag.on&&ag.on("registerUser",function(e){t(e)}),{init:t,setup:e}}();