!function(t){function e(t){return null===t?!1:"function"==typeof t||"object"==typeof t}function n(t){return t.charAt(0).toUpperCase()+t.slice(1)}function i(t,e){for(var i=e.length;i--;){var r=n(e[i].name);t["is"+r]=function(t){return function(){return t.name===this._getState()}}(e[i]),t["if"+r]=function(t){return function(e,n){t.name===this._getState()&&e.call(n)}}(e[i])}}function r(t,e){for(var i in e)if(e.hasOwnProperty(i)){var r=n(e[i]);t["is"+r]=function(t){return function(){return t===this._getState()}}(e[i]),t["if"+r]=function(t){return function(e,n){t===this._getState()&&e.call(null,n)}}(e[i])}}function o(e){return function(){(this._JQ||(this._JQ=t(this)))[e].apply(this._JQ,arguments)}}var s=t(window),a={breakpoints:[{name:"mobile",value:0},{name:"tablet",value:768},{name:"desktop",value:992},{name:"largeDesktop",value:1200}],resize:!0,proxy:null,interval:100,indicator:document.body},u={emit:o("trigger"),once:o("one"),on:o("on"),off:o("off")},f=function(t){this.settings=t,this.state=this.getBreakpoint(),this.settings.resize&&(this.settings.proxy?s.on("resize",this.settings.proxy(g,this.settings.interval).bind(this)):s.on("resize",g.bind(this)))};t.responsive=function(n){var o=f.prototype={},s=t.extend({},a,n),g=s.breakpoints;return t.isArray(g)?(g=c(g),o.getBreakpoint=l,i(o,g)):e(g)?(o.getBreakpoint=h,r(o,g)):(g=a.breakpoints,o.getBreakpoint=l,i(o,g)),s.resize?(t.extend(o,u),o._getState=function(){return this.state}):o._getState=function(){return this.getBreakpoint()},o["if"]=function(t,e,n){-1!==t.indexOf(this._getState())&&e.call(null,n)},o.not=function(t,e,n){-1===t.indexOf(this._getState())&&e.call(null,n)},new f(s)};var c=function(t){return t.sort(function(t,e){return t.value-e.value})},l=function(){for(var t=this.settings.breakpoints,e=s.width(),n=null,i=t.length;i--;)if(n=t[i].name,e>=t[i].value)return n;return n},h=function(){var t=this.settings.indicator;return getComputedStyle(t,":after").content.replace(/"|'/gi,"")},g=function(){var t=this,e=this.getBreakpoint();this.state!==e&&(this.emit("change."+e),this.emit("change",{prev:t.state,cur:e}),this.state=e),this.emit("resize")}}(jQuery);