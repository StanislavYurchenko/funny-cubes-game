(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1DEj":function(e,n,r){},QfWi:function(e,n,r){"use strict";r.r(n);r("7qfE"),r("4owi"),r("uQK7"),r("lmye"),r("fp7Y"),r("WoWj"),r("1DEj"),r("Omr6");var t=r("v3zq"),a=r.n(t),u=r("WGEY"),o=r.n(u),i=0,l=document.querySelector(".box");function c(e,n,r){n.firstChild.innerHTML=e(r)}function s(e,n){return Math.round(e-.5+Math.random()*(n-e+1))}var f,m=function(e){return e.map((function(e){var n=e>=-1&&e<=2&&0!==e;return{number:n?e:0,isActiveSquare:n}}))}(Array.from({length:25},(function(){return s(-1,10)})));f=a.a,l.innerHTML=f(),c(o.a,l,m),l.querySelector(".squares").addEventListener("click",(function(e){var n=e.target,r=Array.from(e.currentTarget.children),t=Number(n.dataset.number);if("true"===n.dataset.isActiveSquare){console.log("You received score "+t),i+=+t;var a=r.indexOf(n);m[a]={number:0,isActiveSquare:!1};for(var u=s(0,2);u>0;){var f=s(0,24);if("true"!==r[f].dataset.isActiveSquare){var v=s(-1,2);if(0!==v){var p=v>=-1&&v<=2&&0!==v;m[f]={number:p?v:0,isActiveSquare:p},u-=1}}}if(c(o.a,l,m),console.log("score",i),m.every((function(e){return e.isActiveSquare}))||m.every((function(e){return!e.isActiveSquare})))return void console.log("Game over, your score is ",i)}}))},WGEY:function(e,n,r){var t=r("mp5j");e.exports=(t.default||t).template({1:function(e,n,r,t,a){var u,o=null!=n?n:e.nullContext||{},i=e.hooks.helperMissing,l=e.escapeExpression,c=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'  <li class="square" data-number="'+l("function"==typeof(u=null!=(u=c(r,"number")||(null!=n?c(n,"number"):n))?u:i)?u.call(o,{name:"number",hash:{},data:a,loc:{start:{line:2,column:34},end:{line:2,column:44}}}):u)+'" data-is-active-square="'+l("function"==typeof(u=null!=(u=c(r,"isActiveSquare")||(null!=n?c(n,"isActiveSquare"):n))?u:i)?u.call(o,{name:"isActiveSquare",hash:{},data:a,loc:{start:{line:2,column:69},end:{line:2,column:87}}}):u)+'"></li>\r\n'},compiler:[8,">= 4.3.0"],main:function(e,n,r,t,a){var u;return null!=(u=(e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]})(r,"each").call(null!=n?n:e.nullContext||{},n,{name:"each",hash:{},fn:e.program(1,a,0),inverse:e.noop,data:a,loc:{start:{line:1,column:0},end:{line:3,column:9}}}))?u:""},useData:!0})},v3zq:function(e,n,r){var t=r("mp5j");e.exports=(t.default||t).template({compiler:[8,">= 4.3.0"],main:function(e,n,r,t,a){return'<ul class="squares">\r\n</ul>'},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.b238980f17fb0e608666.js.map