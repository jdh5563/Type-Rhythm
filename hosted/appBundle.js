(()=>{var __webpack_modules__={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),o=r(26),a=r(372),i=r(327),s=r(97),c=r(109),l=r(985),u=r(61),p=r(655),f=r(263);e.exports=function(e){return new Promise((function(t,r){var d,h=e.data,m=e.headers,g=e.responseType;function y(){e.cancelToken&&e.cancelToken.unsubscribe(d),e.signal&&e.signal.removeEventListener("abort",d)}n.isFormData(h)&&delete m["Content-Type"];var b=new XMLHttpRequest;if(e.auth){var v=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(v+":"+w)}var _=s(e.baseURL,e.url);function x(){if(b){var n="getAllResponseHeaders"in b?c(b.getAllResponseHeaders()):null,a={data:g&&"text"!==g&&"json"!==g?b.response:b.responseText,status:b.status,statusText:b.statusText,headers:n,config:e,request:b};o((function(e){t(e),y()}),(function(e){r(e),y()}),a),b=null}}if(b.open(e.method.toUpperCase(),i(_,e.params,e.paramsSerializer),!0),b.timeout=e.timeout,"onloadend"in b?b.onloadend=x:b.onreadystatechange=function(){b&&4===b.readyState&&(0!==b.status||b.responseURL&&0===b.responseURL.indexOf("file:"))&&setTimeout(x)},b.onabort=function(){b&&(r(u("Request aborted",e,"ECONNABORTED",b)),b=null)},b.onerror=function(){r(u("Network Error",e,null,b)),b=null},b.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",n=e.transitional||p.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(u(t,e,n.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",b)),b=null},n.isStandardBrowserEnv()){var E=(e.withCredentials||l(_))&&e.xsrfCookieName?a.read(e.xsrfCookieName):void 0;E&&(m[e.xsrfHeaderName]=E)}"setRequestHeader"in b&&n.forEach(m,(function(e,t){void 0===h&&"content-type"===t.toLowerCase()?delete m[t]:b.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(b.withCredentials=!!e.withCredentials),g&&"json"!==g&&(b.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&b.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&b.upload&&b.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(d=function(e){b&&(r(!e||e&&e.type?new f("canceled"):e),b.abort(),b=null)},e.cancelToken&&e.cancelToken.subscribe(d),e.signal&&(e.signal.aborted?d():e.signal.addEventListener("abort",d))),h||(h=null),b.send(h)}))}},609:(e,t,r)=>{"use strict";var n=r(867),o=r(607),a=r(321),i=r(185),s=function e(t){var r=new a(t),s=o(a.prototype.request,r);return n.extend(s,a.prototype,r),n.extend(s,r),s.create=function(r){return e(i(t,r))},s}(r(655));s.Axios=a,s.Cancel=r(263),s.CancelToken=r(972),s.isCancel=r(502),s.VERSION=r(288).version,s.all=function(e){return Promise.all(e)},s.spread=r(713),s.isAxiosError=r(268),e.exports=s,e.exports.default=s},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;this.promise.then((function(e){if(r._listeners){var t,n=r._listeners.length;for(t=0;t<n;t++)r._listeners[t](e);r._listeners=null}})),this.promise.then=function(e){var t,n=new Promise((function(e){r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),o=r(327),a=r(782),i=r(572),s=r(185),c=r(875),l=c.validators;function u(e){this.defaults=e,this.interceptors={request:new a,response:new a}}u.prototype.request=function(e,t){if("string"==typeof e?(t=t||{}).url=e:t=e||{},!t.url)throw new Error("Provided config url is not valid");(t=s(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var r=t.transitional;void 0!==r&&c.assertOptions(r,{silentJSONParsing:l.transitional(l.boolean),forcedJSONParsing:l.transitional(l.boolean),clarifyTimeoutError:l.transitional(l.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,n.unshift(e.fulfilled,e.rejected))}));var a,u=[];if(this.interceptors.response.forEach((function(e){u.push(e.fulfilled,e.rejected)})),!o){var p=[i,void 0];for(Array.prototype.unshift.apply(p,n),p=p.concat(u),a=Promise.resolve(t);p.length;)a=a.then(p.shift(),p.shift());return a}for(var f=t;n.length;){var d=n.shift(),h=n.shift();try{f=d(f)}catch(e){h(e);break}}try{a=i(f)}catch(e){return Promise.reject(e)}for(;u.length;)a=a.then(u.shift(),u.shift());return a},u.prototype.getUri=function(e){if(!e.url)throw new Error("Provided config url is not valid");return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){u.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){u.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=u},782:(e,t,r)=>{"use strict";var n=r(867);function o(){this.handlers=[]}o.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,r)=>{"use strict";var n=r(793),o=r(303);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,o,a){var i=new Error(e);return n(i,t,r,o,a)}},572:(e,t,r)=>{"use strict";var n=r(867),o=r(527),a=r(502),i=r(655),s=r(263);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new s("canceled")}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return c(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return a(t)||(c(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={};function o(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function a(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(e[r],t[r])}function i(e){if(!n.isUndefined(t[e]))return o(void 0,t[e])}function s(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(void 0,t[r])}function c(r){return r in t?o(e[r],t[r]):r in e?o(void 0,e[r]):void 0}var l={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:c};return n.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=l[e]||a,o=t(e);n.isUndefined(o)&&t!==c||(r[e]=o)})),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867),o=r(655);e.exports=function(e,t,r){var a=this||o;return n.forEach(r,(function(r){e=r.call(a,e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),o=r(16),a=r(481),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,l={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(c=r(448)),c),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(s(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(0,JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||l.transitional,r=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||o&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw a(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){l.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){l.headers[e]=n.merge(i)})),e.exports=l},288:e=>{e.exports={version:"0.25.0"}},607:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var a;if(r)a=r(t);else if(n.isURLSearchParams(t))a=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),a=i.join("&")}if(a){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+a}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,a,i){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(a)&&s.push("domain="+a),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},268:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e){return n.isObject(e)&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,a,i={};return e?(n.forEach(e.split("\n"),(function(e){if(a=e.indexOf(":"),t=n.trim(e.substr(0,a)).toLowerCase(),r=n.trim(e.substr(a+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,r)=>{"use strict";var n=r(288).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var a={};o.transitional=function(e,t,r){function o(e,t){return"[Axios v"+n+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,i){if(!1===e)throw new Error(o(n," has been removed"+(t?" in "+t:"")));return t&&!a[n]&&(a[n]=!0,console.warn(o(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,i)}},e.exports={assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),o=n.length;o-- >0;){var a=n[o],i=t[a];if(i){var s=e[a],c=void 0===s||i(s,a,e);if(!0!==c)throw new TypeError("option "+a+" must be "+c)}else if(!0!==r)throw Error("Unknown option "+a)}},validators:o}},867:(e,t,r)=>{"use strict";var n=r(607),o=Object.prototype.toString;function a(e){return Array.isArray(e)}function i(e){return void 0===e}function s(e){return"[object ArrayBuffer]"===o.call(e)}function c(e){return null!==e&&"object"==typeof e}function l(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:s,isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"[object FormData]"===o.call(e)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&s(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isPlainObject:l,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return c(e)&&u(e.pipe)},isURLSearchParams:function(e){return"[object URLSearchParams]"===o.call(e)},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:p,merge:function e(){var t={};function r(r,n){l(t[n])&&l(r)?t[n]=e(t[n],r):l(r)?t[n]=e({},r):a(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)p(arguments[n],r);return t},extend:function(e,t,r){return p(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},982:(e,t,r)=>{const n=r(501);let o;n.setApiKey("ae1a7157-817d-4344-973c-260402dda431");const a=e=>{o=e},i=io();let s,c,l;const u=[];e.exports={init:async()=>{s=document.getElementById("canvas"),c=s.getContext("2d"),s.width=.6*window.innerWidth,s.height=.69*s.clientWidth,c.save(),c.fillStyle="white",c.fillRect(0,0,s.clientWidth,s.height),c.restore(),l=document.getElementById("paragraph");let e="";do{const t=(await n.callStandardApi("text-generator",{text:"The"})).output.split("\n");for(let e=1;e<t.length;e++)t.splice(e,1);for(let r of t)r.length>300&&r.length>e.length&&(e=r)}while(""===e);console.log(e),l.textContent=e;const t=Object.keys(o.players);for(let e=0;e<t.length;e++)u.push(new Image),u[e].onload=()=>{c.drawImage(u[e],0,e*s.height/t.length,50,50)},u[e].src=o.players[t[e]].skin;window.addEventListener("resize",(()=>{s.width=.6*window.innerWidth,s.height=.69*s.clientWidth;for(let e=0;e<t.length;e++)u.push(new Image),u[e].onload=()=>{c.drawImage(u[e],0,e*s.height/t.length,50,50)},u[e].src=o.players[t[e]].skin}))},createLobby:async e=>{const t=await fetch("/getUsername"),r=await t.json().then((e=>e)),n=await fetch("/getCar"),a=await n.json().then((e=>e)),s="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let c="";for(let e=0;e<4;e++)c+=s[Math.floor(Math.random()*s.length)];const l={username:r.username,skin:a.skin,raceCode:c,_csrf:e},u=await fetch("/createLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});return o=await u.json(),i.emit("createdLobby",o.raceCode),o},joinLobby:async(e,t)=>{const r=await fetch("/getUsername"),n=await r.json().then((e=>e)),s=await fetch("/getCar"),c=await s.json().then((e=>e)),l={username:n.username,skin:c.skin,raceCode:e,_csrf:t},u=await fetch("/joinLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});o=await u.json(),a(o),i.emit("changedLobby",o,!0)},leaveLobby:async e=>{const t=await fetch("/getUsername"),r={username:(await t.json().then((e=>e))).username,raceCode:o.raceCode,_csrf:e},n=await fetch("/leaveLobby",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});o=await n.json(),i.emit("changedLobby",o,!1),o={}},setLobby:a,socket:i}},501:(e,t,r)=>{e.exports=r(849)},925:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";const axios=__webpack_require__(669),apiBaseUrl=__webpack_require__(41).baseUrl,resultRendering=__webpack_require__(753),globalObject=Function("return this")();if(globalObject.FormData)var formData=globalObject.FormData;else var formData=eval('require("form-data")');function DeepAI(){this.axiosInstance=axios.create({headers:{"client-library":"deepai-js-client"}})}function urlForModel(e){return apiBaseUrl+"/api/"+e}DeepAI.prototype.setApiKey=function(e){this.apiKey=e,this.axiosInstance.defaults.headers.common["api-key"]=e},DeepAI.prototype.callStandardApi=async function(e,t){const r=new formData;for(var n of Object.keys(t))if(null!==t[n]&&void 0!==t[n])if("string"==typeof t[n])r.append(n,t[n]);else if(globalObject.Element&&t[n]instanceof globalObject.Element){var o=t[n];if("IMG"===o.tagName){if(!o.src)throw new Error("DeepAI error: Image element has no SRC: "+n);r.append(n,o.src)}else{if("INPUT"!==o.tagName||void 0===o.files)throw new Error("DeepAI error: DOM Element type for key: "+n);if(!(o.files.length>0))throw new Error("DeepAI error: File picker has no file picked: "+n);r.append(n,o.files[0],"file.jpeg")}}else if(t[n].hasOwnProperty("fd"))r.append(n,t[n]);else{if(!globalObject.Buffer||!Buffer.isBuffer(t[n]))throw new Error("DeepAI error: unknown input type for key: "+n);r.append(n,t[n],"file.jpeg")}var a={withCredentials:!0};return void 0!==r.getHeaders&&(a.headers=r.getHeaders()),(await this.axiosInstance.post(urlForModel(e),r,a)).data},DeepAI.prototype.renderResultIntoElement=resultRendering.renderResultIntoElement,DeepAI.prototype.renderAnnotatedResultIntoElement=resultRendering.renderAnnotatedResultIntoElement,module.exports=DeepAI},41:e=>{"use strict";e.exports={baseUrl:"https://api.deepai.org"}},753:(e,t,r)=>{"use strict";const n=r(41).baseUrl;var o=["rgb(173, 35, 35)","rgb(42, 75, 215)","rgb(87, 87, 87)","rgb(29, 105, 20)","rgb(129, 74, 25)","rgb(129, 38, 192)","rgb(160, 160, 160)","rgb(129, 197, 122)","rgb(157, 175, 255)","rgb(41, 208, 208)","rgb(255, 146, 51)","rgb(199, 183, 0)","rgb(233, 222, 187)","rgb(255, 205, 243)"],a=new RegExp("^([a-z]+://|//)","i"),i=new RegExp("^(data|blob):","i");function s(e){return a.test(e)||i.test(e)?e:n+e}function c(e,t,r){var n=[];for(var o of e)if(!(o.length<2)){n.push("M");var a=!0;for(var i of o){if(n.push(i[0]-t+","+(i[1]-r)),isNaN(i[0])||isNaN(i[1]))return console.log("not showing invalid polygon, found NaN"),"";a&&(n.push("L"),a=!1)}n.push("z")}return n.join(" ")}function l(e,t){if(t.innerHTML="",e.err)return t.innerHTML=err,!1;if(e.output){if(console.log("got json or text output"),"string"==typeof e.output){(i=document.createElement("div")).style.width="100%",i.style.height="100%",i.style.overflow="auto",i.style.display="flex",i.style.alignItems="center",i.style.flexDirection="column",t.appendChild(i);var r=document.createElement("pre");for(var n of(r.textContent=e.output,r.style.whiteSpace="pre-wrap",r.style.margin="0px",i.appendChild(r),e.inputs))n.is_img&&((l=document.createElement("img")).src=s(n.url),l.style.position="relative",l.style.width="100%",l.style.height="100%%",l.style.objectFit="contain",i.appendChild(l));return!0}if("object"==typeof e.output){if(1==e.inputs.length&&e.inputs[0].is_img&&e.visualizer_data){console.log("have visualizer for result JSON");var a=document.createElement("iframe");return a.onload=function(){var t=a.contentDocument.body;t.style.margin="0px",t.style.overflow="hidden";var r=document.createElement("boundingboxcontainer");r.style.position="relative",r.style.opacity="0.001",t.appendChild(r);var n=document.createElement("img");n.src=s(e.inputs[0].url),n.style.position="absolute",r.appendChild(n);var i=function(){console.log("iframe resize"),a.contentDocument.body.style.transform=null;var e=a.contentDocument.body.scrollWidth,t=a.contentDocument.body.scrollHeight,o=n.offsetWidth,i=n.offsetHeight,s=a.offsetWidth,c=a.offsetHeight,l=0,u=0;if(o<e&&i<t){var p=s/o,f=c/i;l=s-o*(d=Math.min(p,f)),u=c-i*d}else{var d;p=s/e,f=c/t,l=s-e*(d=Math.min(p,f)),u=c-t*d}l/=d,u/=d,a.contentDocument.body.style.transformOrigin="top left",a.contentDocument.body.style.transform="scale("+d+")",r.style.setProperty("--scaleapplied",d),r.style.setProperty("--fontscale",100/d+"%"),r.style.left=l/2+"px",r.style.top=u/2+"px",r.style.opacity="1"};a.contentWindow.onresize=i,n.onload=i;var l=function(e,t,r){var n,o=(e=JSON.parse(JSON.stringify(e)))[t.list_key];o.sort((function(e,t){return t.confidence-e.confidence}));for(var a=o.length,i=[],s=0;s<a;s++){var c,l=o[s];if("demographic"==t.label_key)c=l[t.label_key]?l[t.label_key]:l.cultural_appearance+" "+l.gender+", "+l.age_range[0]+"-"+l.age_range[1];else if("people"==t.label_key){var u=[];l["facial-expression-recognition"]&&null!=l["facial-expression-recognition"].emotion&&u.push((n=l["facial-expression-recognition"].emotion).charAt(0).toUpperCase()+n.slice(1)),l["demographic-recognition"]&&null!=l["demographic-recognition"].cultural_appearance&&u.push(l["demographic-recognition"].cultural_appearance+" "+l["demographic-recognition"].gender+", "+l["demographic-recognition"].age_range[0]+"-"+l["demographic-recognition"].age_range[1]),l["celebrity-recognition"]&&null!=l["celebrity-recognition"].name&&"unknown"!=l["celebrity-recognition"].name&&u.push(l["celebrity-recognition"].name.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))),c=u.length>0?u.join(", "):"Face"}else if("pose"==t.label_key){const e=[["nose","right_eye"],["nose","left_eye"],["right_eye","right_ear"],["left_eye","left_ear"],["right_shoulder","right_elbow"],["left_shoulder","left_elbow"],["right_elbow","right_hand"],["left_elbow","left_hand"],["right_hip","right_knee"],["left_hip","left_knee"],["right_knee","right_foot"],["left_knee","left_foot"]];c="";var p=[];for(var f of e){var d=l[t.label_key][f[0]],h=l[t.label_key][f[1]];if(d&&h){var m=[d=JSON.parse(JSON.stringify(d)),h=JSON.parse(JSON.stringify(h))];p.push(m)}}l.mask_vertices=p}else if((c=l[t.label_key])&&c.constructor===String);else{var g=Object.keys(c);c=1==g.length?c[g[0]]:JSON.stringify(c)}if(l.bounding_box&&(l.bounding_box[0]*=r,l.bounding_box[1]*=r,l.bounding_box[2]*=r,l.bounding_box[3]*=r),l.mask_vertices)for(var y of l.mask_vertices)for(var b of y)b[0]*=r,b[1]*=r;i.push({bounding_box:l.bounding_box,mask_vertices:l.mask_vertices,caption:c})}return i}(e.output,e.visualizer_data,e.scale_applied);console.log("processed annotations",l);var u=0;for(var p of l){var f,d,h,m,g=document.createElement("boundingbox");g.style.position="absolute";var y=o[u++%o.length];if(p.mask_vertices){var b=null,v=null,w=null,_=null;for(var x of p.mask_vertices)for(var E of x){var R=E[0],S=E[1];(null===b||R<b)&&(b=R),(null===v||S<v)&&(v=S),(null===w||R>w)&&(w=R),(null===_||S>_)&&(_=S)}h=w-b,m=_-v,f=b,d=v;var k=document.createElementNS("http://www.w3.org/2000/svg","svg");k.style.position="absolute",k.style.overflow="visible",k.style.width=h+"px",k.style.height=m+"px";var O=document.createElementNS("http://www.w3.org/2000/svg","path");O.setAttributeNS(null,"d",c(p.mask_vertices,f,d)),O.style.fill="none",O.style.stroke=y,O.style.strokeWidth="calc(2px / var(--scaleapplied))",k.appendChild(O),g.appendChild(k),g.style.border="none"}else{if(!p.bounding_box)throw new Exception("Neither mask_vertices or bounding_box is passed, unknown annotation format");f=p.bounding_box[0],d=p.bounding_box[1],h=p.bounding_box[2],m=p.bounding_box[3],g.style.border="calc(2px / var(--scaleapplied)) solid "+y}g.style.left=f+"px",g.style.top=d+"px",g.style.width=h+"px",g.style.height=m+"px",r.appendChild(g);var C=document.createElement("boundingboxlabel");C.textContent=p.caption,C.style.color="white",C.style.fontFamily="arial",C.style.backgroundColor=y,C.style.fontSize="var(--fontscale)",C.style.position="absolute",g.appendChild(C)}},a.src="about:blank",a.style.border="none",a.style.width="100%",a.style.height="100%",t.appendChild(a),!0}var i;for(var n of(console.log("no visualizer for result JSON"),(i=document.createElement("div")).style.width="100%",i.style.height="100%",i.style.overflow="auto",i.style.display="flex",i.style.alignItems="center",i.style.flexDirection="column",t.appendChild(i),(r=document.createElement("pre")).style.margin="0px",r.textContent=JSON.stringify(e.output,null,4),i.appendChild(r),e.inputs))n.is_img&&((l=document.createElement("img")).src=s(n.url),l.style.width="100%",l.style.height="79%",l.style.objectFit="contain",i.appendChild(l));return!0}return t.innerHTML="Model returned an unknown data type.",!1}var l;return e.output_url?(console.log("got image output"),(l=document.createElement("img")).src=e.output_url,l.style.position="relative",l.style.width="100%",l.style.height="100%",l.style.objectFit="contain",t.appendChild(l),!0):(t.innerHTML="Model did not return an output or an error.",!1)}e.exports={renderResultIntoElement:async function(e,t){console.log("getting result page data");var r=await async function(e){if(e.err)return console.log("cannot get result page data for error result"),e;var t=await fetch(n+"/get_standard_api_result_data/"+e.id,{credentials:"include"}),r=(t=await t.json()).result_data;return{err:e.err,output:e.output,output_url:e.output_url,id:e.id,inputs:r.inputs,visualizer_data:r.visualizer_data,scale_applied:r.scale_applied}}(e);return console.log("got result page data"),l(r,t)},renderAnnotatedResultIntoElement:l}},849:(e,t,r)=>{"use strict";const n=new(r(925));e.exports=n}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}var __webpack_exports__={};(()=>{const e=__webpack_require__(982);e.socket.on("changedLobby",(async t=>{if(t.error){const e=e=>React.createElement("h1",null,e.error);ReactDOM.render(React.createElement(e,{error:t.error}))}else e.setLobby(t),a(t.players,t.raceCode)})),e.socket.on("startedRace",(async()=>{await ReactDOM.render(React.createElement(c,null),document.getElementById("game-content")),await e.init()}));const t=async t=>{t.preventDefault();const r=await e.createLobby(t.target.querySelector("#_csrf").value);a(r.players,r.raceCode)},r=async t=>{t.preventDefault(),await e.joinLobby(t.target.querySelector("#raceCode").value,t.target.querySelector("#_csrf").value),lobbyJSON.error?ReactDOM.render(React.createElement(Error,{error:lobbyJSON.error})):a(lobbyJSON.players,lobbyJSON.raceCode)},n=async t=>{t.preventDefault(),await e.leaveLobby(t.target.querySelector("#_csrf").value),ReactDOM.render(React.createElement(i,{csrf:t.target.querySelector("#_csrf").value}),document.getElementById("game-content"))},o=t=>{t.preventDefault(),e.socket.emit("startedRace")},a=async(e,t)=>{const r=await fetch("/getToken"),n=await r.json();ReactDOM.render(React.createElement(s,{players:e,raceCode:t,csrf:n.csrfToken}),document.getElementById("game-content"));const o=await fetch("/getUsername");e[(await o.json().then((e=>e))).username].owner||(document.getElementById("startButton").type="hidden")},i=e=>React.createElement("div",null,React.createElement("h1",null,"Join a Race!"),React.createElement("form",{id:"createForm",name:"createForm",onSubmit:t,action:"/createRace",method:"POST"},React.createElement("div",null,React.createElement("input",{type:"submit",value:"Create Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf})),React.createElement("form",{id:"joinForm",name:"joinForm",onSubmit:r,action:"/joinRace",method:"POST"},React.createElement("div",null,React.createElement("input",{id:"raceCode",type:"text",placeholder:"Race Code"}),React.createElement("input",{type:"submit",value:"Join Race"})),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}))),s=e=>{const t=[];for(let r of Object.keys(e.players))t.push(React.createElement("div",{key:r},React.createElement("h3",null,e.players[r].username)));return React.createElement("div",null,t,React.createElement("div",null,"Race Code: ",e.raceCode),React.createElement("form",{id:"raceForm",name:"raceForm",onSubmit:o,action:"/startRace",method:"POST"},React.createElement("input",{id:"startButton",type:"submit",value:"Start Race"})),React.createElement("form",{id:"leaveForm",name:"leaveForm",onSubmit:n,action:"/leaveRace",method:"POST"},React.createElement("input",{id:"leaveButton",type:"submit",value:"Leave Lobby"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf})))},c=e=>React.createElement("div",null,React.createElement("canvas",{id:"canvas"}),React.createElement("p",{id:"paragraph"}));window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),r=await fetch("/premium").then((e=>e.json())).then((e=>e.premium)),n=document.getElementById("premiumButton");r?n.textContent="Premium Member!":n.addEventListener("click",(async e=>(e.preventDefault(),await fetch("/premium",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_csrf:t.csrfToken})}),e.target.textContent="Premium Member!",!1))),ReactDOM.render(React.createElement(i,{csrf:t.csrfToken}),document.getElementById("game-content"))}})()})();