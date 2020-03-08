// eslint-disable-next-line 
export default()=>{var _createClass=function(){function e(t,i){for(var s=0;s<i.length;s++){var e=i[s];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var List=function(){function i(t){_classCallCheck(this,i);try{0===arguments.length?this._list=[]:this.list=t}catch(t){throw t}}return _createClass(i,[{key:"swap",value:function(t,i){var s=this.list.length;if(s<=t||s<=i)throw new TypeError("The values passed don't lie within the list length");var e=this._list[t];this._list[t]=this._list[i],this._list[i]=e}},{key:"at",value:function(t){return this.list.length<=t?void 0:this._list[t]}},{key:"storeAt",value:function(t,i){this._list[t]=i}},{key:"list",get:function(){return this._list},set:function(t){if(console.log(),!(t instanceof Array))throw new TypeError("Invalid Argument type. Array or No Args Expected.");this._list=t}}]),i}(),QuickSort=function(){function i(t){_classCallCheck(this,i),this._list=new List(t)}return _createClass(i,[{key:"sort",value:function(t){var i=this._list.list.length;return this.compare=t,this.action=[],this.quickSort(0,i-1),this.action}},{key:"quickSort",value:function(t,i){if(t<i){var s=this.partition(t,i);this.quickSort(t,s-1),this.quickSort(s+1,i)}}},{key:"partition",value:function(t,i){for(var s=this._list.at(i),e=t-1,a=t;a<i;a++)this.compare(s,this._list.at(a))&&(e++,this._list.swap(e,a),this.action.push({type:"LIST_SWAP",payload:{pos:[e,a],boundary:[t,i],pivot:e}}));return e++,this.action.push({type:"LIST_SWAP",payload:{pos:[e,i],boundary:[t,i],pivot:e}}),this._list.swap(e,i),e}}]),i}(),MergeSort=function(){function i(t){_classCallCheck(this,i),this._list=new List(t)}return _createClass(i,[{key:"sort",value:function(t){var i=this._list.list.length;return this.value=t,this.action=[],this.mergeSort(0,i-1),this.action}},{key:"mergeSort",value:function(t,i){if(t<i){var s=parseInt((t+i)/2,10);this.mergeSort(t,s),this.mergeSort(s+1,i),this.merge(t,s,i)}}},{key:"merge",value:function(t,i,s){for(var e=i-t+1,a=s-i,r=[],n=[],h=0;h<e;h++)r[h]={item:this._list.at(t+h),val:this.value(this._list.at(t+h))};for(var l=0;l<a;l++)n[l]={item:this._list.at(i+l+1),val:this.value(this._list.at(i+l+1))};r[e]={val:1/0},n[a]={val:1/0};for(var o=0,u=0,c=t;c<=s;c++)r[o].val<=n[u].val?(this.action.push({type:"LIST_STORE",payload:{i:c,val:r[o].item,boundary:[t,s],pivot:c}}),this._list.storeAt(c,r[o].item),o++):(this.action.push({type:"LIST_STORE",payload:{i:c,val:n[u].item,boundary:[t,s],pivot:c}}),this._list.storeAt(c,n[u].item),u++)}}]),i}(),HeapSort=function(){function i(t){_classCallCheck(this,i),this._list=new List(t),this.action=[]}return _createClass(i,[{key:"sort",value:function(t){this.value=t,this.length=this._list.list.length,this.heapSize=this.length,this.buildMaxHeap();for(var i=this.length-1;1<=i;i--)this.heapExtractMax();return this.action}},{key:"buildMaxHeap",value:function(){for(var t=parseInt(this.length/2,10)-1;0<=t;t--)this.maxHeapify(t)}},{key:"maxHeapify",value:function(t){var i=2*t+1,s=2*t+2,e=t;i<this.heapSize&&this.value(this._list.at(i))>this.value(this._list.at(e))&&(e=i),s<this.heapSize&&this.value(this._list.at(s))>this.value(this._list.at(e))&&(e=s),e!==t&&(this.action.push({type:"LIST_SWAP",payload:{pos:[t,e]}}),this._list.swap(t,e),this.maxHeapify(e))}},{key:"heapExtractMax",value:function(){if(this.heapSize<1)throw new TypeError("Heap empty");var t=this._list.at(0);return this.action.push({type:"LIST_SWAP",payload:{pos:[0,this.heapSize-1]}}),this._list.swap(0,this.heapSize-1),this.heapSize--,this.maxHeapify(0),t}}]),i}(),BubbleSort=function(){function i(t){_classCallCheck(this,i),this._list=new List(t)}return _createClass(i,[{key:"sort",value:function(t){for(var i=[],s=this._list.list.length-1;0<s;s--)for(var e=0;e<s;e++)t(this._list.at(e),this._list.at(e+1))&&(this._list.swap(e,e+1),i.push({type:"LIST_SWAP",payload:{pos:[e,e+1]}}));return i}}]),i}(),SelectionSort=function(){function i(t){_classCallCheck(this,i),this._list=new List(t)}return _createClass(i,[{key:"sort",value:function(t){for(var i=this._list.list.length,s=[],e=0;e<i;e++)for(var a=e+1;a<i;a++)t(this._list.at(e),this._list.at(a))&&(this._list.swap(e,a),s.push({type:"LIST_SWAP",payload:{pos:[e,a]}}));return s}}]),i}();self.onmessage=function(t){var i=void 0,s=void 0;switch(t.data[0]){case"selection-sort":i=new SelectionSort(t.data[1]),s=function(t,i){return t.height>i.height};break;case"quick-sort":i=new QuickSort(t.data[1]),s=function(t,i){return t.height>i.height};break;case"merge-sort":i=new MergeSort(t.data[1]),s=function(t){return t.height};break;case"heap-sort":i=new HeapSort(t.data[1]),s=function(t){return t.height};break;default:i=new BubbleSort(t.data[1]),s=function(t,i){return t.height>i.height}}var e=i.sort(s);self.postMessage(e)};};// eslint-disable-line no-restricted-globals