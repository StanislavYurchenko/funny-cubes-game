(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1DEj":function(t,e,n){},"7vfn":function(t,e,n){var r=n("mp5j");t.exports=(r.default||r).template({1:function(t,e,n,r,a){var i,s=null!=e?e:t.nullContext||{},o=t.hooks.helperMissing,u=t.escapeExpression,l=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return'  <li class="square col-1 rounded border" data-number="'+u("function"==typeof(i=null!=(i=l(n,"number")||(null!=e?l(e,"number"):e))?i:o)?i.call(s,{name:"number",hash:{},data:a,loc:{start:{line:2,column:55},end:{line:2,column:65}}}):i)+'" data-is-active-square="'+u("function"==typeof(i=null!=(i=l(n,"isActiveSquare")||(null!=e?l(e,"isActiveSquare"):e))?i:o)?i.call(s,{name:"isActiveSquare",hash:{},data:a,loc:{start:{line:2,column:90},end:{line:2,column:108}}}):i)+'"></li>\r\n'},compiler:[8,">= 4.3.0"],main:function(t,e,n,r,a){var i;return null!=(i=(t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]})(n,"each").call(null!=e?e:t.nullContext||{},e,{name:"each",hash:{},fn:t.program(1,a,0),inverse:t.noop,data:a,loc:{start:{line:1,column:0},end:{line:3,column:9}}}))?i:""},useData:!0})},Dc6a:function(t,e,n){var r=n("mp5j");t.exports=(r.default||r).template({compiler:[8,">= 4.3.0"],main:function(t,e,n,r,a){var i,s=null!=e?e:t.nullContext||{},o=t.hooks.helperMissing,u=t.escapeExpression,l=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return'<tr>\r\n  <th class="p-1 text-center text-primary font-weight-bold" scope="row">'+u("function"==typeof(i=null!=(i=l(n,"position")||(null!=e?l(e,"position"):e))?i:o)?i.call(s,{name:"position",hash:{},data:a,loc:{start:{line:2,column:72},end:{line:2,column:84}}}):i)+'</th>\r\n  <td class="p-1 text-center text-primary font-weight-bold text-break">'+u("function"==typeof(i=null!=(i=l(n,"name")||(null!=e?l(e,"name"):e))?i:o)?i.call(s,{name:"name",hash:{},data:a,loc:{start:{line:3,column:71},end:{line:3,column:79}}}):i)+'</td>\r\n  <td class="p-1 text-center text-primary font-weight-bold">'+u("function"==typeof(i=null!=(i=l(n,"score")||(null!=e?l(e,"score"):e))?i:o)?i.call(s,{name:"score",hash:{},data:a,loc:{start:{line:4,column:60},end:{line:4,column:69}}}):i)+"</td>\r\n</tr>"},useData:!0})},QfWi:function(t,e,n){"use strict";n.r(e);n("D/wG"),n("1DEj"),n("Omr6");var r=n("qIEf"),a=n.n(r),i=(n("7qfE"),n("RtS0"),n("4owi"),n("uQK7"),n("lmye"),n("fp7Y"),n("WoWj"),n("3dw1"),n("yuY8")),s=n.n(i),o=n("7vfn"),u=n.n(o);function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=function(){function t(t,e,n){this._callBackTimerReset=n,this._quantitySquare=144,this._minSquareValue=-1,this._maxSquareValue=10,this._minActiveSquareValue=-1,this._maxActiveSquareValue=2,this._score=0,this._rootRef=document.querySelector(t),this._scoreRef=document.querySelectorAll(e),this._squaresRef=null,this._squaresData=[],this._isGameOver=null,this._isPause=!1}var e,n,r,a=t.prototype;return a.init=function(){this._renderSquareList(),this._squaresData=this._creatSquares(!0),this._renderSquareItem(this._squaresData),this._squaresRef=this._rootRef.firstChild,this._squaresRef.addEventListener("click",this._onSquare.bind(this))},a.startNewGame=function(){this._score=0,this._renderScope(),this._isGameOver=!1,this._squaresData=this._creatSquares(),this._renderSquareItem(this._squaresData)},a.initGameOver=function(){this._isGameOver=!0,this._squaresData=this._creatSquares(!0),this._renderSquareItem(this._squaresData)},a.pause=function(){this._isPause=!0},a.resume=function(){this._isPause=!1},a._randomInteger=function(t,e){return Math.round(t-.5+Math.random()*(e-t+1))},a._creatSquares=function(t){var e=this;return void 0===t&&(t=!1),Array.from({length:this._quantitySquare},(function(){return t?0:e._randomInteger(e._minSquareValue,e._maxSquareValue)})).map((function(t){var n=t>=e._minActiveSquareValue&&t<=e._maxActiveSquareValue&&0!==t;return{number:n?t:0,isActiveSquare:n}}))},a._renderSquareList=function(){this._rootRef.insertAdjacentHTML("afterbegin",s()())},a._renderSquareItem=function(t){this._rootRef.firstChild.innerHTML=u()(t)},a._renderScope=function(){var t=this;this._scoreRef.forEach((function(e){return e.textContent=t._score}))},a._onSquare=function(t){if(!this._isGameOver&&!this._isPause){var e=t.target,n=Array.from(t.currentTarget.children),r=Number(e.dataset.number);if("true"===e.dataset.isActiveSquare){this._score+=+r,this._renderScope();var a=n.indexOf(e);this._squaresData[a]={number:0,isActiveSquare:!1};for(var i=this._randomInteger(0,2);i>0;){var s=this._randomInteger(0,this._quantitySquare-1);if("true"!==n[s].dataset.isActiveSquare){var o=this._randomInteger(this._minActiveSquareValue,this._maxActiveSquareValue);0!==o&&(this._squaresData[s]={number:o,isActiveSquare:!0},i-=1)}}if(this._renderSquareItem(this._squaresData),this._isGameOver=this._squaresData.every((function(t){return!t.isActiveSquare})),this._isGameOver)return this._callBackTimerReset(),void this.initGameOver()}}},e=t,(n=[{key:"score",get:function(){return this._score}}])&&l(e.prototype,n),r&&l(e,r),t}(),h=(n("JBxO"),n("9UJh"),n("e+qc"),function(){function t(t,e,n){this._root=document.querySelector(e),this._setPointTime=t,this._startTime=null,this._startPauseTime=null,this._stopPauseTime=null,this._totalPauseTime=0,this._callBackTimeOver=n,this._timeLeft=0,this._intervalId=null}var e=t.prototype;return e.init=function(){this._render(this._convertTime(this._setPointTime)),clearTimeout(this._intervalId),this._stopPauseTime=Date.now(),this._startPauseTime=this._stopPauseTime,this._totalPauseTime=0},e._tick=function(){var t=this;this._intervalId=setTimeout((function(){t._tick(),t._timeLeft=t._setPointTime-Date.now()+t._startTime+t._totalPauseTime,t._render(t._convertTime(t._timeLeft)),t._timeLeft<=0&&t.stop()}),1e3)},e.reset=function(){this.init()},e._render=function(t){this._root.textContent=t},e._convertTime=function(t){return Math.floor(t%864e5/36e5).toString().padStart(2,"0")+":"+Math.floor(t%36e5/6e4).toString().padStart(2,"0")+":"+Math.round(t%6e4/1e3).toString().padStart(2,"0")},e.start=function(){this.init(),this._startTime=Date.now(),this._tick()},e.pause=function(){this._startPauseTime=Date.now(),clearTimeout(this._intervalId)},e.resume=function(){this._stopPauseTime=Date.now(),this._totalPauseTime+=this._stopPauseTime-this._startPauseTime,this._tick()},e.stop=function(){this.init(),this._callBackTimeOver&&this._callBackTimeOver()},t}());n("hi3g"),n("Xlt+"),n("FdtR");function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f=function(){function t(){this._ratingList=[]}var e,n,r,a=t.prototype;return a.init=function(t){var e=this;fetch("http://localhost:3000/results").then((function(t){return t.json()})).then((function(n){var r;(r=e.ratingList).push.apply(r,n),t()})).catch((function(t){return console.log(t)}))},a.addMember=function(t,e){var n=this,r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch("http://localhost:3000/results",r).then((function(t){return t.json()})).then((function(t){var r;(r=n.ratingList).splice.apply(r,[0,n.ratingList.length].concat(t)),e()})).catch((function(t){return console.log(t)}))},e=t,(n=[{key:"ratingList",get:function(){return this._ratingList}}])&&m(e.prototype,n),r&&m(e,r),t}(),p=n("e3pj"),d=n.n(p),_=n("Dc6a"),v=n.n(_);var q=document.querySelector(".js-start"),y=document.querySelector(".js-new-game"),S=document.querySelector(".js-add-result"),b=document.querySelector(".js-pause"),T=new c(".js-box",".js-scope",(function(){g.reset(),P(q),a()(".js-result-modal").modal("show")})),g=new h(4e3,".js-timer",(function(){T.initGameOver(),P(q),a()(".js-result-modal").modal("show")})),w=new f;function P(t){t.innerHTML="Start",t.dataset.status="start"}function x(t){!function(t,e,n){if(e.length){var r=document.querySelector(t);r.innerHTML=d()(e),n&&r.insertAdjacentHTML("beforeend",v()(n))}}(".js-hall-of-fame",w.ratingList,t)}q.addEventListener("click",(function(t){var e=t.currentTarget.dataset.status;"start"===e&&(T.startNewGame(),g.start()),"pause"===e&&(g.pause(),T.pause(),b.classList.remove("invisible")),"resume"===e&&(g.resume(),T.resume(),b.classList.add("invisible")),function(t){var e=t.currentTarget,n=e.dataset.status;"start"!==n&&"resume"!==n||(e.innerHTML="Pause",e.dataset.status="pause"),"pause"===n&&(e.innerHTML="Resume",e.dataset.status="resume")}(t)})),y.addEventListener("click",(function(){var t;"resume"===q.dataset.status&&(g.resume(),T.resume(),b.classList.add("invisible")),T.startNewGame(),g.start(),(t=q).innerHTML="Pause",t.dataset.status="pause"})),S.addEventListener("submit",(function(t){t.preventDefault();var e=t.currentTarget,n={name:e.elements.name.value,score:T.score};w.addMember(n,(function(){return x(n)})),e.reset(),a()(".js-result-modal").modal("hide")})),T.init(),g.init(),w.init(x)},e3pj:function(t,e,n){var r=n("mp5j");t.exports=(r.default||r).template({1:function(t,e,n,r,a){var i,s=null!=e?e:t.nullContext||{},o=t.hooks.helperMissing,u=t.escapeExpression,l=t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]};return'  <tr>\r\n    <th class="p-1 text-center" scope="row">'+u("function"==typeof(i=null!=(i=l(n,"position")||(null!=e?l(e,"position"):e))?i:o)?i.call(s,{name:"position",hash:{},data:a,loc:{start:{line:3,column:44},end:{line:3,column:56}}}):i)+'</th>\r\n    <td class="p-1 text-center text-break">'+u("function"==typeof(i=null!=(i=l(n,"name")||(null!=e?l(e,"name"):e))?i:o)?i.call(s,{name:"name",hash:{},data:a,loc:{start:{line:4,column:43},end:{line:4,column:51}}}):i)+'</td>\r\n    <td class="p-1 text-center">'+u("function"==typeof(i=null!=(i=l(n,"score")||(null!=e?l(e,"score"):e))?i:o)?i.call(s,{name:"score",hash:{},data:a,loc:{start:{line:5,column:32},end:{line:5,column:41}}}):i)+"</td>\r\n  </tr>\r\n"},compiler:[8,">= 4.3.0"],main:function(t,e,n,r,a){var i;return null!=(i=(t.lookupProperty||function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]})(n,"each").call(null!=e?e:t.nullContext||{},e,{name:"each",hash:{},fn:t.program(1,a,0),inverse:t.noop,data:a,loc:{start:{line:1,column:0},end:{line:7,column:9}}}))?i:""},useData:!0})},yuY8:function(t,e,n){var r=n("mp5j");t.exports=(r.default||r).template({compiler:[8,">= 4.3.0"],main:function(t,e,n,r,a){return'<ul class="row border squares">\r\n</ul>'},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.794e9ed54f5cb25d414c.js.map