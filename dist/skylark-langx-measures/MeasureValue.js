/**
 * skylark-langx-measures - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","skylark-langx-klass","./measures","./MeasureType","./MeasureUnit"],function(n,e,u,i,r){var a=e({klassName:"MeasureValue",mtype:{get:function(){return this._.mtype},set:function(t){var n=this._;switch(n.mtype=t,t){case i.auto:n.unit=null,n.value=null;break;case i.percent:n.unit=null}}},unit:{get:function(){return this._.unit},set:function(n){var e=this._;switch(t=e.mtype,t){case i.unit:e.unit=n}}},value:{get:function(){return this._.value},set:function(n){var e=this._;switch(t=e.mtype,t){case i.unit:case i.percent:e.value=n}}},clone:function(){var t=this._;return new a(t.mtype,t.unit,t.value)},notEqual:function(t){return!t||t.mtype!=this.mtype||t.unit!=this.unit||t.value!=this.value},equal:function(t){return!this.notEqual(t)},toString:function(){switch(this.mtype){case i.auto:case i.min:case i.max:case i.mid:return this.mtype.toString();case i.unit:return this.value+r[this.unit];case i.percent:return this.value+"%"}},_construct:function(t,n,e){var u={};void 0!=t&&(u.mtype=t),void 0!=n&&(u.value=n),void 0!=e&&(u.unit=e),this._=u}});return a.fromNumber=function(t){return new a(i.unit,t,r.px)},a.fromString=function(t){if("auto"==t)return a.auto;if("min"==t)return a.min;if("max"==t)return a.max;if("mid"==t)return a.mid;for(var n,e,u,s=r.map(function(t){return t}).concat("%"),c=0;c<s.length;c++)if(-1!=t.indexOf(s[c])){e=parseInt(t.substring(0,t.length-s[c].length),10),"%"==s[c]?n=i.percent:(n=i.unit,u=r[s[c]]);break}return new a(n,e,u)},a.fromPlain=function(t){return new a(t.mtype,t.value,t.unit)},a.fromArray=function(t){return new a(t[0],t.length>1?t[1]:"undefined",t.length>1?t[2]:void 0)},a.auto=new a(i.auto),a.mid=new a(i.mid),a.min=new a(i.min),a.max=new a(i.max),u.MeasureValue=a});
//# sourceMappingURL=sourcemaps/MeasureValue.js.map
