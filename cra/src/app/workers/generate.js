// eslint-disable-next-line
export default()=>{var _slicedToArray=function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return function(r,t){var e=[],n=!0,a=!1,i=void 0;try{for(var o,l=r[Symbol.iterator]();!(n=(o=l.next()).done)&&(e.push(o.value),!t||e.length!==t);n=!0);}catch(r){a=!0,i=r}finally{try{!n&&l.return&&l.return()}finally{if(a)throw i}}return e}(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},generateList=function(n,r){switch(r){case 1:return Array(n).fill(1).map(function(r,t){return{height:10*(t+1),y:10*n-10*(t+1)}});case 2:return Array(n).fill(1).map(function(r,t){var e=n-t-1;return{height:10*(e+1),y:10*n-10*(e+1)}});case 3:var a=Array(n).fill(1).map(function(r,t){return t+1});return Array(n).fill(1).map(function(){var r=Math.floor(Math.random()*a.length),t=a.splice(r,1),e=_slicedToArray(t,1)[0];return{height:10*e,y:10*n-10*e}});default:return[]}};self.onmessage=function(r){var t=generateList(r.data[0],r.data[1]);self.postMessage(t)};};
