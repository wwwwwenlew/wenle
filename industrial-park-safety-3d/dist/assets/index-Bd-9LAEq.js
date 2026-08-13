(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function e_(i,t){const e=new Set(i.split(","));return n=>e.has(n)}const n_=()=>{},i_=Object.prototype.hasOwnProperty,co=(i,t)=>i_.call(i,t),cr=Array.isArray,Ja=i=>id(i)==="[object Map]",r_=i=>typeof i=="function",s_=i=>typeof i=="string",ca=i=>typeof i=="symbol",Po=i=>i!==null&&typeof i=="object",a_=Object.prototype.toString,id=i=>a_.call(i),o_=i=>id(i).slice(8,-1),Ic=i=>s_(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,bs=(i,t)=>!Object.is(i,t),l_=(i,t,e,n=!1)=>{Object.defineProperty(i,t,{configurable:!0,enumerable:!1,writable:n,value:e})};/**
* @vue/reactivity v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Nn;class c_{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Nn,!t&&Nn&&(this.index=(Nn.scopes||(Nn.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=Nn;try{return Nn=this,t()}finally{Nn=e}}}on(){Nn=this}off(){Nn=this.parent}stop(t){if(this._active){let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this._active=!1}}}function u_(i,t=Nn){t&&t.active&&t.effects.push(i)}function f_(){return Nn}let ur;class Uc{constructor(t,e,n,r){this.fn=t,this.trigger=e,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,u_(this,r)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,ki();for(let t=0;t<this._depsLength;t++){const e=this.deps[t];if(e.computed&&(h_(e.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),Vi()}return this._dirtyLevel>=4}set dirty(t){this._dirtyLevel=t?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=Li,e=ur;try{return Li=!0,ur=this,this._runnings++,Cu(this),this.fn()}finally{Pu(this),this._runnings--,ur=e,Li=t}}stop(){this.active&&(Cu(this),Pu(this),this.onStop&&this.onStop(),this.active=!1)}}function h_(i){return i.value}function Cu(i){i._trackId++,i._depsLength=0}function Pu(i){if(i.deps.length>i._depsLength){for(let t=i._depsLength;t<i.deps.length;t++)rd(i.deps[t],i);i.deps.length=i._depsLength}}function rd(i,t){const e=i.get(t);e!==void 0&&t._trackId!==e&&(i.delete(t),i.size===0&&i.cleanup())}let Li=!0,$l=0;const sd=[];function ki(){sd.push(Li),Li=!1}function Vi(){const i=sd.pop();Li=i===void 0?!0:i}function Nc(){$l++}function Oc(){for($l--;!$l&&Kl.length;)Kl.shift()()}function ad(i,t,e){if(t.get(i)!==i._trackId){t.set(i,i._trackId);const n=i.deps[i._depsLength];n!==t?(n&&rd(n,i),i.deps[i._depsLength++]=t):i._depsLength++}}const Kl=[];function od(i,t,e){Nc();for(const n of i.keys()){let r;n._dirtyLevel<t&&(r??(r=i.get(n)===n._trackId))&&(n._shouldSchedule||(n._shouldSchedule=n._dirtyLevel===0),n._dirtyLevel=t),n._shouldSchedule&&(r??(r=i.get(n)===n._trackId))&&(n.trigger(),(!n._runnings||n.allowRecurse)&&n._dirtyLevel!==2&&(n._shouldSchedule=!1,n.scheduler&&Kl.push(n.scheduler)))}Oc()}const ld=(i,t)=>{const e=new Map;return e.cleanup=i,e.computed=t,e},Zl=new WeakMap,fr=Symbol(""),Jl=Symbol("");function nn(i,t,e){if(Li&&ur){let n=Zl.get(i);n||Zl.set(i,n=new Map);let r=n.get(e);r||n.set(e,r=ld(()=>n.delete(e))),ad(ur,r)}}function ci(i,t,e,n,r,s){const a=Zl.get(i);if(!a)return;let o=[];if(t==="clear")o=[...a.values()];else if(e==="length"&&cr(i)){const l=Number(n);a.forEach((c,u)=>{(u==="length"||!ca(u)&&u>=l)&&o.push(c)})}else switch(e!==void 0&&o.push(a.get(e)),t){case"add":cr(i)?Ic(e)&&o.push(a.get("length")):(o.push(a.get(fr)),Ja(i)&&o.push(a.get(Jl)));break;case"delete":cr(i)||(o.push(a.get(fr)),Ja(i)&&o.push(a.get(Jl)));break;case"set":Ja(i)&&o.push(a.get(fr));break}Nc();for(const l of o)l&&od(l,4);Oc()}const d_=e_("__proto__,__v_isRef,__isVue"),cd=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(ca)),Lu=p_();function p_(){const i={};return["includes","indexOf","lastIndexOf"].forEach(t=>{i[t]=function(...e){const n=te(this);for(let s=0,a=this.length;s<a;s++)nn(n,"get",s+"");const r=n[t](...e);return r===-1||r===!1?n[t](...e.map(te)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{i[t]=function(...e){ki(),Nc();const n=te(this)[t].apply(this,e);return Oc(),Vi(),n}}),i}function m_(i){ca(i)||(i=String(i));const t=te(this);return nn(t,"has",i),t.hasOwnProperty(i)}class ud{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){const r=this._isReadonly,s=this._isShallow;if(e==="__v_isReactive")return!r;if(e==="__v_isReadonly")return r;if(e==="__v_isShallow")return s;if(e==="__v_raw")return n===(r?s?R_:pd:s?dd:hd).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const a=cr(t);if(!r){if(a&&co(Lu,e))return Reflect.get(Lu,e,n);if(e==="hasOwnProperty")return m_}const o=Reflect.get(t,e,n);return(ca(e)?cd.has(e):d_(e))||(r||nn(t,"get",e),s)?o:rn(o)?a&&Ic(e)?o:o.value:Po(o)?r?md(o):zc(o):o}}class fd extends ud{constructor(t=!1){super(!1,t)}set(t,e,n,r){let s=t[e];if(!this._isShallow){const l=xr(s);if(!ds(n)&&!xr(n)&&(s=te(s),n=te(n)),!cr(t)&&rn(s)&&!rn(n))return l?!1:(s.value=n,!0)}const a=cr(t)&&Ic(e)?Number(e)<t.length:co(t,e),o=Reflect.set(t,e,n,r);return t===te(r)&&(a?bs(n,s)&&ci(t,"set",e,n):ci(t,"add",e,n)),o}deleteProperty(t,e){const n=co(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&ci(t,"delete",e,void 0),r}has(t,e){const n=Reflect.has(t,e);return(!ca(e)||!cd.has(e))&&nn(t,"has",e),n}ownKeys(t){return nn(t,"iterate",cr(t)?"length":fr),Reflect.ownKeys(t)}}class __ extends ud{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const g_=new fd,v_=new __,x_=new fd(!0);const Fc=i=>i,Lo=i=>Reflect.getPrototypeOf(i);function _a(i,t,e=!1,n=!1){i=i.__v_raw;const r=te(i),s=te(t);e||(bs(t,s)&&nn(r,"get",t),nn(r,"get",s));const{has:a}=Lo(r),o=n?Fc:e?Gc:Ks;if(a.call(r,t))return o(i.get(t));if(a.call(r,s))return o(i.get(s));i!==r&&i.get(t)}function ga(i,t=!1){const e=this.__v_raw,n=te(e),r=te(i);return t||(bs(i,r)&&nn(n,"has",i),nn(n,"has",r)),i===r?e.has(i):e.has(i)||e.has(r)}function va(i,t=!1){return i=i.__v_raw,!t&&nn(te(i),"iterate",fr),Reflect.get(i,"size",i)}function Du(i,t=!1){!t&&!ds(i)&&!xr(i)&&(i=te(i));const e=te(this);return Lo(e).has.call(e,i)||(e.add(i),ci(e,"add",i,i)),this}function Iu(i,t,e=!1){!e&&!ds(t)&&!xr(t)&&(t=te(t));const n=te(this),{has:r,get:s}=Lo(n);let a=r.call(n,i);a||(i=te(i),a=r.call(n,i));const o=s.call(n,i);return n.set(i,t),a?bs(t,o)&&ci(n,"set",i,t):ci(n,"add",i,t),this}function Uu(i){const t=te(this),{has:e,get:n}=Lo(t);let r=e.call(t,i);r||(i=te(i),r=e.call(t,i)),n&&n.call(t,i);const s=t.delete(i);return r&&ci(t,"delete",i,void 0),s}function Nu(){const i=te(this),t=i.size!==0,e=i.clear();return t&&ci(i,"clear",void 0,void 0),e}function xa(i,t){return function(n,r){const s=this,a=s.__v_raw,o=te(a),l=t?Fc:i?Gc:Ks;return!i&&nn(o,"iterate",fr),a.forEach((c,u)=>n.call(r,l(c),l(u),s))}}function Ma(i,t,e){return function(...n){const r=this.__v_raw,s=te(r),a=Ja(s),o=i==="entries"||i===Symbol.iterator&&a,l=i==="keys"&&a,c=r[i](...n),u=e?Fc:t?Gc:Ks;return!t&&nn(s,"iterate",l?Jl:fr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:o?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function mi(i){return function(...t){return i==="delete"?!1:i==="clear"?void 0:this}}function M_(){const i={get(s){return _a(this,s)},get size(){return va(this)},has:ga,add:Du,set:Iu,delete:Uu,clear:Nu,forEach:xa(!1,!1)},t={get(s){return _a(this,s,!1,!0)},get size(){return va(this)},has:ga,add(s){return Du.call(this,s,!0)},set(s,a){return Iu.call(this,s,a,!0)},delete:Uu,clear:Nu,forEach:xa(!1,!0)},e={get(s){return _a(this,s,!0)},get size(){return va(this,!0)},has(s){return ga.call(this,s,!0)},add:mi("add"),set:mi("set"),delete:mi("delete"),clear:mi("clear"),forEach:xa(!0,!1)},n={get(s){return _a(this,s,!0,!0)},get size(){return va(this,!0)},has(s){return ga.call(this,s,!0)},add:mi("add"),set:mi("set"),delete:mi("delete"),clear:mi("clear"),forEach:xa(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{i[s]=Ma(s,!1,!1),e[s]=Ma(s,!0,!1),t[s]=Ma(s,!1,!0),n[s]=Ma(s,!0,!0)}),[i,e,t,n]}const[y_,S_,E_,T_]=M_();function Bc(i,t){const e=t?i?T_:E_:i?S_:y_;return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(co(e,r)&&r in n?e:n,r,s)}const b_={get:Bc(!1,!1)},A_={get:Bc(!1,!0)},w_={get:Bc(!0,!1)};const hd=new WeakMap,dd=new WeakMap,pd=new WeakMap,R_=new WeakMap;function C_(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function P_(i){return i.__v_skip||!Object.isExtensible(i)?0:C_(o_(i))}function zc(i){return xr(i)?i:Hc(i,!1,g_,b_,hd)}function L_(i){return Hc(i,!1,x_,A_,dd)}function md(i){return Hc(i,!0,v_,w_,pd)}function Hc(i,t,e,n,r){if(!Po(i)||i.__v_raw&&!(t&&i.__v_isReactive))return i;const s=r.get(i);if(s)return s;const a=P_(i);if(a===0)return i;const o=new Proxy(i,a===2?n:e);return r.set(i,o),o}function Gs(i){return xr(i)?Gs(i.__v_raw):!!(i&&i.__v_isReactive)}function xr(i){return!!(i&&i.__v_isReadonly)}function ds(i){return!!(i&&i.__v_isShallow)}function _d(i){return i?!!i.__v_raw:!1}function te(i){const t=i&&i.__v_raw;return t?te(t):i}function D_(i){return Object.isExtensible(i)&&l_(i,"__v_skip",!0),i}const Ks=i=>Po(i)?zc(i):i,Gc=i=>Po(i)?md(i):i;class gd{constructor(t,e,n,r){this.getter=t,this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new Uc(()=>t(this._value),()=>Qa(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=n}get value(){const t=te(this);return(!t._cacheable||t.effect.dirty)&&bs(t._value,t._value=t.effect.run())&&Qa(t,4),vd(t),t.effect._dirtyLevel>=2&&Qa(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function I_(i,t,e=!1){let n,r;const s=r_(i);return s?(n=i,r=n_):(n=i.get,r=i.set),new gd(n,r,s||!r,e)}function vd(i){var t;Li&&ur&&(i=te(i),ad(ur,(t=i.dep)!=null?t:i.dep=ld(()=>i.dep=void 0,i instanceof gd?i:void 0)))}function Qa(i,t=4,e,n){i=te(i);const r=i.dep;r&&od(r,t)}function rn(i){return!!(i&&i.__v_isRef===!0)}function Cr(i){return U_(i,!1)}function U_(i,t){return rn(i)?i:new N_(i,t)}class N_{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:te(t),this._value=e?t:Ks(t)}get value(){return vd(this),this._value}set value(t){const e=this.__v_isShallow||ds(t)||xr(t);t=e?t:te(t),bs(t,this._rawValue)&&(this._rawValue,this._rawValue=t,this._value=e?t:Ks(t),Qa(this,4))}}function O_(i){return rn(i)?i.value:i}const F_={get:(i,t,e)=>O_(Reflect.get(i,t,e)),set:(i,t,e,n)=>{const r=i[t];return rn(r)&&!rn(e)?(r.value=e,!0):Reflect.set(i,t,e,n)}};function xd(i){return Gs(i)?i:new Proxy(i,F_)}/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function B_(i,t){const e=new Set(i.split(","));return t?n=>e.has(n.toLowerCase()):n=>e.has(n)}const ce={},rs=[],Bn=()=>{},z_=()=>!1,kc=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Md=i=>i.startsWith("onUpdate:"),xn=Object.assign,Vc=(i,t)=>{const e=i.indexOf(t);e>-1&&i.splice(e,1)},H_=Object.prototype.hasOwnProperty,ee=(i,t)=>H_.call(i,t),Zt=Array.isArray,yd=i=>Wc(i)==="[object Map]",Sd=i=>Wc(i)==="[object Set]",qt=i=>typeof i=="function",sn=i=>typeof i=="string",Ed=i=>typeof i=="symbol",be=i=>i!==null&&typeof i=="object",Td=i=>(be(i)||qt(i))&&qt(i.then)&&qt(i.catch),bd=Object.prototype.toString,Wc=i=>bd.call(i),Ad=i=>Wc(i)==="[object Object]",ks=B_(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Do=i=>{const t=Object.create(null);return e=>t[e]||(t[e]=i(e))},G_=/-(\w)/g,Mr=Do(i=>i.replace(G_,(t,e)=>e?e.toUpperCase():"")),k_=/\B([A-Z])/g,ua=Do(i=>i.replace(k_,"-$1").toLowerCase()),V_=Do(i=>i.charAt(0).toUpperCase()+i.slice(1)),Jo=Do(i=>i?`on${V_(i)}`:""),Ou=(i,t)=>!Object.is(i,t),Qo=(i,...t)=>{for(let e=0;e<i.length;e++)i[e](...t)},W_=(i,t,e,n=!1)=>{Object.defineProperty(i,t,{configurable:!0,enumerable:!1,writable:n,value:e})},X_=i=>{const t=parseFloat(i);return isNaN(t)?i:t};let Fu;const wd=()=>Fu||(Fu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Io(i){if(Zt(i)){const t={};for(let e=0;e<i.length;e++){const n=i[e],r=sn(n)?$_(n):Io(n);if(r)for(const s in r)t[s]=r[s]}return t}else if(sn(i)||be(i))return i}const Y_=/;(?![^(]*\))/g,q_=/:([^]+)/,j_=/\/\*[^]*?\*\//g;function $_(i){const t={};return i.replace(j_,"").split(Y_).forEach(e=>{if(e){const n=e.split(q_);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function ss(i){let t="";if(sn(i))t=i;else if(Zt(i))for(let e=0;e<i.length;e++){const n=ss(i[e]);n&&(t+=n+" ")}else if(be(i))for(const e in i)i[e]&&(t+=e+" ");return t.trim()}const Rd=i=>!!(i&&i.__v_isRef===!0),Pe=i=>sn(i)?i:i==null?"":Zt(i)||be(i)&&(i.toString===bd||!qt(i.toString))?Rd(i)?Pe(i.value):JSON.stringify(i,Cd,2):String(i),Cd=(i,t)=>Rd(t)?Cd(i,t.value):yd(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[n,r],s)=>(e[tl(n,s)+" =>"]=r,e),{})}:Sd(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>tl(e))}:Ed(t)?tl(t):be(t)&&!Zt(t)&&!Ad(t)?String(t):t,tl=(i,t="")=>{var e;return Ed(i)?`Symbol(${(e=i.description)!=null?e:t})`:i};/**
* @vue/runtime-core v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Di(i,t,e,n){try{return n?i(...n):i()}catch(r){Uo(r,t,e)}}function zn(i,t,e,n){if(qt(i)){const r=Di(i,t,e,n);return r&&Td(r)&&r.catch(s=>{Uo(s,t,e)}),r}if(Zt(i)){const r=[];for(let s=0;s<i.length;s++)r.push(zn(i[s],t,e,n));return r}}function Uo(i,t,e,n=!0){const r=t?t.vnode:null;if(t){let s=t.parent;const a=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${e}`;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](i,a,o)===!1)return}s=s.parent}const l=t.appContext.config.errorHandler;if(l){ki(),Di(l,null,10,[i,a,o]),Vi();return}}K_(i,e,r,n)}function K_(i,t,e,n=!0){console.error(i)}let Zs=!1,Ql=!1;const ze=[];let Yn=0;const as=[];let Si=null,rr=0;const Pd=Promise.resolve();let Xc=null;function Ld(i){const t=Xc||Pd;return i?t.then(this?i.bind(this):i):t}function Z_(i){let t=Yn+1,e=ze.length;for(;t<e;){const n=t+e>>>1,r=ze[n],s=Js(r);s<i||s===i&&r.pre?t=n+1:e=n}return t}function Yc(i){(!ze.length||!ze.includes(i,Zs&&i.allowRecurse?Yn+1:Yn))&&(i.id==null?ze.push(i):ze.splice(Z_(i.id),0,i),Dd())}function Dd(){!Zs&&!Ql&&(Ql=!0,Xc=Pd.then(Ud))}function J_(i){const t=ze.indexOf(i);t>Yn&&ze.splice(t,1)}function Q_(i){Zt(i)?as.push(...i):(!Si||!Si.includes(i,i.allowRecurse?rr+1:rr))&&as.push(i),Dd()}function Bu(i,t,e=Zs?Yn+1:0){for(;e<ze.length;e++){const n=ze[e];if(n&&n.pre){if(i&&n.id!==i.uid)continue;ze.splice(e,1),e--,n()}}}function Id(i){if(as.length){const t=[...new Set(as)].sort((e,n)=>Js(e)-Js(n));if(as.length=0,Si){Si.push(...t);return}for(Si=t,rr=0;rr<Si.length;rr++){const e=Si[rr];e.active!==!1&&e()}Si=null,rr=0}}const Js=i=>i.id==null?1/0:i.id,tg=(i,t)=>{const e=Js(i)-Js(t);if(e===0){if(i.pre&&!t.pre)return-1;if(t.pre&&!i.pre)return 1}return e};function Ud(i){Ql=!1,Zs=!0,ze.sort(tg);try{for(Yn=0;Yn<ze.length;Yn++){const t=ze[Yn];t&&t.active!==!1&&Di(t,t.i,t.i?15:14)}}finally{Yn=0,ze.length=0,Id(),Zs=!1,Xc=null,(ze.length||as.length)&&Ud()}}let jn=null,Nd=null;function uo(i){const t=jn;return jn=i,Nd=i&&i.type.__scopeId||null,t}function eg(i,t=jn,e){if(!t||i._n)return i;const n=(...r)=>{n._d&&qu(-1);const s=uo(t);let a;try{a=i(...r)}finally{uo(s),n._d&&qu(1)}return a};return n._n=!0,n._c=!0,n._d=!0,n}function qi(i,t,e,n){const r=i.dirs,s=t&&t.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[n];l&&(ki(),zn(l,e,8,[i.el,o,i,t]),Vi())}}function Od(i,t){i.shapeFlag&6&&i.component?Od(i.component.subTree,t):i.shapeFlag&128?(i.ssContent.transition=t.clone(i.ssContent),i.ssFallback.transition=t.clone(i.ssFallback)):i.transition=t}/*! #__NO_SIDE_EFFECTS__ */function ng(i,t){return qt(i)?xn({name:i.name},t,{setup:i}):i}const to=i=>!!i.type.__asyncLoader,Fd=i=>i.type.__isKeepAlive;function ig(i,t){Bd(i,"a",t)}function rg(i,t){Bd(i,"da",t)}function Bd(i,t,e=qe){const n=i.__wdc||(i.__wdc=()=>{let r=e;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(No(t,n,e),e){let r=e.parent;for(;r&&r.parent;)Fd(r.parent.vnode)&&sg(n,t,e,r),r=r.parent}}function sg(i,t,e,n){const r=No(t,i,n,!0);Gd(()=>{Vc(n[t],r)},e)}function No(i,t,e=qe,n=!1){if(e){const r=e[i]||(e[i]=[]),s=t.__weh||(t.__weh=(...a)=>{ki();const o=fa(e),l=zn(t,e,i,a);return o(),Vi(),l});return n?r.unshift(s):r.push(s),s}}const pi=i=>(t,e=qe)=>{(!Bo||i==="sp")&&No(i,(...n)=>t(...n),e)},ag=pi("bm"),zd=pi("m"),og=pi("bu"),lg=pi("u"),Hd=pi("bum"),Gd=pi("um"),cg=pi("sp"),ug=pi("rtg"),fg=pi("rtc");function hg(i,t=qe){No("ec",i,t)}const dg=Symbol.for("v-ndc");function ya(i,t,e,n){let r;const s=e;if(Zt(i)||sn(i)){r=new Array(i.length);for(let a=0,o=i.length;a<o;a++)r[a]=t(i[a],a,void 0,s)}else if(typeof i=="number"){r=new Array(i);for(let a=0;a<i;a++)r[a]=t(a+1,a,void 0,s)}else if(be(i))if(i[Symbol.iterator])r=Array.from(i,(a,o)=>t(a,o,void 0,s));else{const a=Object.keys(i);r=new Array(a.length);for(let o=0,l=a.length;o<l;o++){const c=a[o];r[o]=t(i[c],c,o,s)}}else r=[];return r}const tc=i=>i?op(i)?$c(i):tc(i.parent):null,Vs=xn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>tc(i.parent),$root:i=>tc(i.root),$emit:i=>i.emit,$options:i=>Vd(i),$forceUpdate:i=>i.f||(i.f=()=>{i.effect.dirty=!0,Yc(i.update)}),$nextTick:i=>i.n||(i.n=Ld.bind(i.proxy)),$watch:i=>Fg.bind(i)}),el=(i,t)=>i!==ce&&!i.__isScriptSetup&&ee(i,t),pg={get({_:i},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:n,data:r,props:s,accessCache:a,type:o,appContext:l}=i;let c;if(t[0]!=="$"){const p=a[t];if(p!==void 0)switch(p){case 1:return n[t];case 2:return r[t];case 4:return e[t];case 3:return s[t]}else{if(el(n,t))return a[t]=1,n[t];if(r!==ce&&ee(r,t))return a[t]=2,r[t];if((c=i.propsOptions[0])&&ee(c,t))return a[t]=3,s[t];if(e!==ce&&ee(e,t))return a[t]=4,e[t];ec&&(a[t]=0)}}const u=Vs[t];let f,h;if(u)return t==="$attrs"&&nn(i.attrs,"get",""),u(i);if((f=o.__cssModules)&&(f=f[t]))return f;if(e!==ce&&ee(e,t))return a[t]=4,e[t];if(h=l.config.globalProperties,ee(h,t))return h[t]},set({_:i},t,e){const{data:n,setupState:r,ctx:s}=i;return el(r,t)?(r[t]=e,!0):n!==ce&&ee(n,t)?(n[t]=e,!0):ee(i.props,t)||t[0]==="$"&&t.slice(1)in i?!1:(s[t]=e,!0)},has({_:{data:i,setupState:t,accessCache:e,ctx:n,appContext:r,propsOptions:s}},a){let o;return!!e[a]||i!==ce&&ee(i,a)||el(t,a)||(o=s[0])&&ee(o,a)||ee(n,a)||ee(Vs,a)||ee(r.config.globalProperties,a)},defineProperty(i,t,e){return e.get!=null?i._.accessCache[t]=0:ee(e,"value")&&this.set(i,t,e.value,null),Reflect.defineProperty(i,t,e)}};function zu(i){return Zt(i)?i.reduce((t,e)=>(t[e]=null,t),{}):i}let ec=!0;function mg(i){const t=Vd(i),e=i.proxy,n=i.ctx;ec=!1,t.beforeCreate&&Hu(t.beforeCreate,i,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:S,destroyed:v,unmounted:T,render:R,renderTracked:b,renderTriggered:A,errorCaptured:O,serverPrefetch:M,expose:w,inheritAttrs:G,components:V,directives:it,filters:U}=t;if(c&&_g(c,n,null),a)for(const Y in a){const q=a[Y];qt(q)&&(n[Y]=q.bind(e))}if(r){const Y=r.call(e,e);be(Y)&&(i.data=zc(Y))}if(ec=!0,s)for(const Y in s){const q=s[Y],rt=qt(q)?q.bind(e,e):qt(q.get)?q.get.bind(e,e):Bn,at=!qt(q)&&qt(q.set)?q.set.bind(e):Bn,dt=cp({get:rt,set:at});Object.defineProperty(n,Y,{enumerable:!0,configurable:!0,get:()=>dt.value,set:ft=>dt.value=ft})}if(o)for(const Y in o)kd(o[Y],n,e,Y);if(l){const Y=qt(l)?l.call(e):l;Reflect.ownKeys(Y).forEach(q=>{Sg(q,Y[q])})}u&&Hu(u,i,"c");function z(Y,q){Zt(q)?q.forEach(rt=>Y(rt.bind(e))):q&&Y(q.bind(e))}if(z(ag,f),z(zd,h),z(og,p),z(lg,g),z(ig,_),z(rg,m),z(hg,O),z(fg,b),z(ug,A),z(Hd,S),z(Gd,T),z(cg,M),Zt(w))if(w.length){const Y=i.exposed||(i.exposed={});w.forEach(q=>{Object.defineProperty(Y,q,{get:()=>e[q],set:rt=>e[q]=rt})})}else i.exposed||(i.exposed={});R&&i.render===Bn&&(i.render=R),G!=null&&(i.inheritAttrs=G),V&&(i.components=V),it&&(i.directives=it)}function _g(i,t,e=Bn){Zt(i)&&(i=nc(i));for(const n in i){const r=i[n];let s;be(r)?"default"in r?s=eo(r.from||n,r.default,!0):s=eo(r.from||n):s=eo(r),rn(s)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):t[n]=s}}function Hu(i,t,e){zn(Zt(i)?i.map(n=>n.bind(t.proxy)):i.bind(t.proxy),t,e)}function kd(i,t,e,n){const r=n.includes(".")?ip(e,n):()=>e[n];if(sn(i)){const s=t[i];qt(s)&&il(r,s)}else if(qt(i))il(r,i.bind(e));else if(be(i))if(Zt(i))i.forEach(s=>kd(s,t,e,n));else{const s=qt(i.handler)?i.handler.bind(e):t[i.handler];qt(s)&&il(r,s,i)}}function Vd(i){const t=i.type,{mixins:e,extends:n}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=i.appContext,o=s.get(t);let l;return o?l=o:!r.length&&!e&&!n?l=t:(l={},r.length&&r.forEach(c=>fo(l,c,a,!0)),fo(l,t,a)),be(t)&&s.set(t,l),l}function fo(i,t,e,n=!1){const{mixins:r,extends:s}=t;s&&fo(i,s,e,!0),r&&r.forEach(a=>fo(i,a,e,!0));for(const a in t)if(!(n&&a==="expose")){const o=gg[a]||e&&e[a];i[a]=o?o(i[a],t[a]):t[a]}return i}const gg={data:Gu,props:ku,emits:ku,methods:Bs,computed:Bs,beforeCreate:Ve,created:Ve,beforeMount:Ve,mounted:Ve,beforeUpdate:Ve,updated:Ve,beforeDestroy:Ve,beforeUnmount:Ve,destroyed:Ve,unmounted:Ve,activated:Ve,deactivated:Ve,errorCaptured:Ve,serverPrefetch:Ve,components:Bs,directives:Bs,watch:xg,provide:Gu,inject:vg};function Gu(i,t){return t?i?function(){return xn(qt(i)?i.call(this,this):i,qt(t)?t.call(this,this):t)}:t:i}function vg(i,t){return Bs(nc(i),nc(t))}function nc(i){if(Zt(i)){const t={};for(let e=0;e<i.length;e++)t[i[e]]=i[e];return t}return i}function Ve(i,t){return i?[...new Set([].concat(i,t))]:t}function Bs(i,t){return i?xn(Object.create(null),i,t):t}function ku(i,t){return i?Zt(i)&&Zt(t)?[...new Set([...i,...t])]:xn(Object.create(null),zu(i),zu(t??{})):t}function xg(i,t){if(!i)return t;if(!t)return i;const e=xn(Object.create(null),i);for(const n in t)e[n]=Ve(i[n],t[n]);return e}function Wd(){return{app:null,config:{isNativeTag:z_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Mg=0;function yg(i,t){return function(n,r=null){qt(n)||(n=xn({},n)),r!=null&&!be(r)&&(r=null);const s=Wd(),a=new WeakSet;let o=!1;const l=s.app={_uid:Mg++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:l0,get config(){return s.config},set config(c){},use(c,...u){return a.has(c)||(c&&qt(c.install)?(a.add(c),c.install(l,...u)):qt(c)&&(a.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,f){if(!o){const h=ui(n,r);return h.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),i(h,c,f),o=!0,l._container=c,c.__vue_app__=l,$c(h.component)}},unmount(){o&&(i(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){const u=os;os=l;try{return c()}finally{os=u}}};return l}}let os=null;function Sg(i,t){if(qe){let e=qe.provides;const n=qe.parent&&qe.parent.provides;n===e&&(e=qe.provides=Object.create(n)),e[i]=t}}function eo(i,t,e=!1){const n=qe||jn;if(n||os){const r=os?os._context.provides:n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return e&&qt(t)?t.call(n&&n.proxy):t}}const Xd={},Yd=()=>Object.create(Xd),qd=i=>Object.getPrototypeOf(i)===Xd;function Eg(i,t,e,n=!1){const r={},s=Yd();i.propsDefaults=Object.create(null),jd(i,t,r,s);for(const a in i.propsOptions[0])a in r||(r[a]=void 0);e?i.props=n?r:L_(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function Tg(i,t,e,n){const{props:r,attrs:s,vnode:{patchFlag:a}}=i,o=te(r),[l]=i.propsOptions;let c=!1;if((n||a>0)&&!(a&16)){if(a&8){const u=i.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Oo(i.emitsOptions,h))continue;const p=t[h];if(l)if(ee(s,h))p!==s[h]&&(s[h]=p,c=!0);else{const g=Mr(h);r[g]=ic(l,o,g,p,i,!1)}else p!==s[h]&&(s[h]=p,c=!0)}}}else{jd(i,t,r,s)&&(c=!0);let u;for(const f in o)(!t||!ee(t,f)&&((u=ua(f))===f||!ee(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(r[f]=ic(l,o,f,void 0,i,!0)):delete r[f]);if(s!==o)for(const f in s)(!t||!ee(t,f))&&(delete s[f],c=!0)}c&&ci(i.attrs,"set","")}function jd(i,t,e,n){const[r,s]=i.propsOptions;let a=!1,o;if(t)for(let l in t){if(ks(l))continue;const c=t[l];let u;r&&ee(r,u=Mr(l))?!s||!s.includes(u)?e[u]=c:(o||(o={}))[u]=c:Oo(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,a=!0)}if(s){const l=te(e),c=o||ce;for(let u=0;u<s.length;u++){const f=s[u];e[f]=ic(r,l,f,c[f],i,!ee(c,f))}}return a}function ic(i,t,e,n,r,s){const a=i[e];if(a!=null){const o=ee(a,"default");if(o&&n===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&qt(l)){const{propsDefaults:c}=r;if(e in c)n=c[e];else{const u=fa(r);n=c[e]=l.call(null,t),u()}}else n=l}a[0]&&(s&&!o?n=!1:a[1]&&(n===""||n===ua(e))&&(n=!0))}return n}const bg=new WeakMap;function $d(i,t,e=!1){const n=e?bg:t.propsCache,r=n.get(i);if(r)return r;const s=i.props,a={},o=[];let l=!1;if(!qt(i)){const u=f=>{l=!0;const[h,p]=$d(f,t,!0);xn(a,h),p&&o.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return be(i)&&n.set(i,rs),rs;if(Zt(s))for(let u=0;u<s.length;u++){const f=Mr(s[u]);Vu(f)&&(a[f]=ce)}else if(s)for(const u in s){const f=Mr(u);if(Vu(f)){const h=s[u],p=a[f]=Zt(h)||qt(h)?{type:h}:xn({},h),g=p.type;let _=!1,m=!0;if(Zt(g))for(let d=0;d<g.length;++d){const S=g[d],v=qt(S)&&S.name;if(v==="Boolean"){_=!0;break}else v==="String"&&(m=!1)}else _=qt(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||ee(p,"default"))&&o.push(f)}}const c=[a,o];return be(i)&&n.set(i,c),c}function Vu(i){return i[0]!=="$"&&!ks(i)}const Kd=i=>i[0]==="_"||i==="$stable",qc=i=>Zt(i)?i.map(Wn):[Wn(i)],Ag=(i,t,e)=>{if(t._n)return t;const n=eg((...r)=>qc(t(...r)),e);return n._c=!1,n},Zd=(i,t,e)=>{const n=i._ctx;for(const r in i){if(Kd(r))continue;const s=i[r];if(qt(s))t[r]=Ag(r,s,n);else if(s!=null){const a=qc(s);t[r]=()=>a}}},Jd=(i,t)=>{const e=qc(t);i.slots.default=()=>e},Qd=(i,t,e)=>{for(const n in t)(e||n!=="_")&&(i[n]=t[n])},wg=(i,t,e)=>{const n=i.slots=Yd();if(i.vnode.shapeFlag&32){const r=t._;r?(Qd(n,t,e),e&&W_(n,"_",r,!0)):Zd(t,n)}else t&&Jd(i,t)},Rg=(i,t,e)=>{const{vnode:n,slots:r}=i;let s=!0,a=ce;if(n.shapeFlag&32){const o=t._;o?e&&o===1?s=!1:Qd(r,t,e):(s=!t.$stable,Zd(t,r)),a=t}else t&&(Jd(i,t),a={default:1});if(s)for(const o in r)!Kd(o)&&a[o]==null&&delete r[o]};function rc(i,t,e,n,r=!1){if(Zt(i)){i.forEach((h,p)=>rc(h,t&&(Zt(t)?t[p]:t),e,n,r));return}if(to(n)&&!r)return;const s=n.shapeFlag&4?$c(n.component):n.el,a=r?null:s,{i:o,r:l}=i,c=t&&t.r,u=o.refs===ce?o.refs={}:o.refs,f=o.setupState;if(c!=null&&c!==l&&(sn(c)?(u[c]=null,ee(f,c)&&(f[c]=null)):rn(c)&&(c.value=null)),qt(l))Di(l,o,12,[a,u]);else{const h=sn(l),p=rn(l);if(h||p){const g=()=>{if(i.f){const _=h?ee(f,l)?f[l]:u[l]:l.value;r?Zt(_)&&Vc(_,s):Zt(_)?_.includes(s)||_.push(s):h?(u[l]=[s],ee(f,l)&&(f[l]=u[l])):(l.value=[s],i.k&&(u[i.k]=l.value))}else h?(u[l]=a,ee(f,l)&&(f[l]=a)):p&&(l.value=a,i.k&&(u[i.k]=a))};a?(g.id=-1,$e(g,e)):g()}}}const Cg=Symbol("_vte"),Pg=i=>i.__isTeleport,$e=Xg;function Lg(i){return Dg(i)}function Dg(i,t){const e=wd();e.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:p=Bn,insertStaticContent:g}=i,_=(y,D,F,$=null,W=null,st=null,ot=void 0,E=null,x=!!D.dynamicChildren)=>{if(y===D)return;y&&!Cs(y,D)&&($=ut(y),ft(y,W,st,!0),y=null),D.patchFlag===-2&&(x=!1,D.dynamicChildren=null);const{type:L,ref:X,shapeFlag:K}=D;switch(L){case Fo:m(y,D,F,$);break;case yr:d(y,D,F,$);break;case rl:y==null&&S(D,F,$,ot);break;case dn:V(y,D,F,$,W,st,ot,E,x);break;default:K&1?R(y,D,F,$,W,st,ot,E,x):K&6?it(y,D,F,$,W,st,ot,E,x):(K&64||K&128)&&L.process(y,D,F,$,W,st,ot,E,x,yt)}X!=null&&W&&rc(X,y&&y.ref,st,D||y,!D)},m=(y,D,F,$)=>{if(y==null)n(D.el=o(D.children),F,$);else{const W=D.el=y.el;D.children!==y.children&&c(W,D.children)}},d=(y,D,F,$)=>{y==null?n(D.el=l(D.children||""),F,$):D.el=y.el},S=(y,D,F,$)=>{[y.el,y.anchor]=g(y.children,D,F,$,y.el,y.anchor)},v=({el:y,anchor:D},F,$)=>{let W;for(;y&&y!==D;)W=h(y),n(y,F,$),y=W;n(D,F,$)},T=({el:y,anchor:D})=>{let F;for(;y&&y!==D;)F=h(y),r(y),y=F;r(D)},R=(y,D,F,$,W,st,ot,E,x)=>{D.type==="svg"?ot="svg":D.type==="math"&&(ot="mathml"),y==null?b(D,F,$,W,st,ot,E,x):M(y,D,W,st,ot,E,x)},b=(y,D,F,$,W,st,ot,E)=>{let x,L;const{props:X,shapeFlag:K,transition:j,dirs:ht}=y;if(x=y.el=a(y.type,st,X&&X.is,X),K&8?u(x,y.children):K&16&&O(y.children,x,null,$,W,nl(y,st),ot,E),ht&&qi(y,null,$,"created"),A(x,y,y.scopeId,ot,$),X){for(const _t in X)_t!=="value"&&!ks(_t)&&s(x,_t,null,X[_t],st,$);"value"in X&&s(x,"value",null,X.value,st),(L=X.onVnodeBeforeMount)&&kn(L,$,y)}ht&&qi(y,null,$,"beforeMount");const lt=Ig(W,j);lt&&j.beforeEnter(x),n(x,D,F),((L=X&&X.onVnodeMounted)||lt||ht)&&$e(()=>{L&&kn(L,$,y),lt&&j.enter(x),ht&&qi(y,null,$,"mounted")},W)},A=(y,D,F,$,W)=>{if(F&&p(y,F),$)for(let st=0;st<$.length;st++)p(y,$[st]);if(W){let st=W.subTree;if(D===st){const ot=W.vnode;A(y,ot,ot.scopeId,ot.slotScopeIds,W.parent)}}},O=(y,D,F,$,W,st,ot,E,x=0)=>{for(let L=x;L<y.length;L++){const X=y[L]=E?Ei(y[L]):Wn(y[L]);_(null,X,D,F,$,W,st,ot,E)}},M=(y,D,F,$,W,st,ot)=>{const E=D.el=y.el;let{patchFlag:x,dynamicChildren:L,dirs:X}=D;x|=y.patchFlag&16;const K=y.props||ce,j=D.props||ce;let ht;if(F&&ji(F,!1),(ht=j.onVnodeBeforeUpdate)&&kn(ht,F,D,y),X&&qi(D,y,F,"beforeUpdate"),F&&ji(F,!0),(K.innerHTML&&j.innerHTML==null||K.textContent&&j.textContent==null)&&u(E,""),L?w(y.dynamicChildren,L,E,F,$,nl(D,W),st):ot||q(y,D,E,null,F,$,nl(D,W),st,!1),x>0){if(x&16)G(E,K,j,F,W);else if(x&2&&K.class!==j.class&&s(E,"class",null,j.class,W),x&4&&s(E,"style",K.style,j.style,W),x&8){const lt=D.dynamicProps;for(let _t=0;_t<lt.length;_t++){const xt=lt[_t],wt=K[xt],ct=j[xt];(ct!==wt||xt==="value")&&s(E,xt,wt,ct,W,F)}}x&1&&y.children!==D.children&&u(E,D.children)}else!ot&&L==null&&G(E,K,j,F,W);((ht=j.onVnodeUpdated)||X)&&$e(()=>{ht&&kn(ht,F,D,y),X&&qi(D,y,F,"updated")},$)},w=(y,D,F,$,W,st,ot)=>{for(let E=0;E<D.length;E++){const x=y[E],L=D[E],X=x.el&&(x.type===dn||!Cs(x,L)||x.shapeFlag&70)?f(x.el):F;_(x,L,X,null,$,W,st,ot,!0)}},G=(y,D,F,$,W)=>{if(D!==F){if(D!==ce)for(const st in D)!ks(st)&&!(st in F)&&s(y,st,D[st],null,W,$);for(const st in F){if(ks(st))continue;const ot=F[st],E=D[st];ot!==E&&st!=="value"&&s(y,st,E,ot,W,$)}"value"in F&&s(y,"value",D.value,F.value,W)}},V=(y,D,F,$,W,st,ot,E,x)=>{const L=D.el=y?y.el:o(""),X=D.anchor=y?y.anchor:o("");let{patchFlag:K,dynamicChildren:j,slotScopeIds:ht}=D;ht&&(E=E?E.concat(ht):ht),y==null?(n(L,F,$),n(X,F,$),O(D.children||[],F,X,W,st,ot,E,x)):K>0&&K&64&&j&&y.dynamicChildren?(w(y.dynamicChildren,j,F,W,st,ot,E),(D.key!=null||W&&D===W.subTree)&&tp(y,D,!0)):q(y,D,F,X,W,st,ot,E,x)},it=(y,D,F,$,W,st,ot,E,x)=>{D.slotScopeIds=E,y==null?D.shapeFlag&512?W.ctx.activate(D,F,$,ot,x):U(D,F,$,W,st,ot,x):H(y,D,x)},U=(y,D,F,$,W,st,ot)=>{const E=y.component=n0(y,$,W);if(Fd(y)&&(E.ctx.renderer=yt),i0(E,!1,ot),E.asyncDep){if(W&&W.registerDep(E,z,ot),!y.el){const x=E.subTree=ui(yr);d(null,x,D,F)}}else z(E,y,D,F,W,st,ot)},H=(y,D,F)=>{const $=D.component=y.component;if(kg(y,D,F))if($.asyncDep&&!$.asyncResolved){Y($,D,F);return}else $.next=D,J_($.update),$.effect.dirty=!0,$.update();else D.el=y.el,$.vnode=D},z=(y,D,F,$,W,st,ot)=>{const E=()=>{if(y.isMounted){let{next:X,bu:K,u:j,parent:ht,vnode:lt}=y;{const Wt=ep(y);if(Wt){X&&(X.el=lt.el,Y(y,X,ot)),Wt.asyncDep.then(()=>{y.isUnmounted||E()});return}}let _t=X,xt;ji(y,!1),X?(X.el=lt.el,Y(y,X,ot)):X=lt,K&&Qo(K),(xt=X.props&&X.props.onVnodeBeforeUpdate)&&kn(xt,ht,X,lt),ji(y,!0);const wt=Xu(y),ct=y.subTree;y.subTree=wt,_(ct,wt,f(ct.el),ut(ct),y,W,st),X.el=wt.el,_t===null&&Vg(y,wt.el),j&&$e(j,W),(xt=X.props&&X.props.onVnodeUpdated)&&$e(()=>kn(xt,ht,X,lt),W)}else{let X;const{el:K,props:j}=D,{bm:ht,m:lt,parent:_t}=y,xt=to(D);ji(y,!1),ht&&Qo(ht),!xt&&(X=j&&j.onVnodeBeforeMount)&&kn(X,_t,D),ji(y,!0);{const wt=y.subTree=Xu(y);_(null,wt,F,$,y,W,st),D.el=wt.el}if(lt&&$e(lt,W),!xt&&(X=j&&j.onVnodeMounted)){const wt=D;$e(()=>kn(X,_t,wt),W)}(D.shapeFlag&256||_t&&to(_t.vnode)&&_t.vnode.shapeFlag&256)&&y.a&&$e(y.a,W),y.isMounted=!0,D=F=$=null}},x=y.effect=new Uc(E,Bn,()=>Yc(L),y.scope),L=y.update=()=>{x.dirty&&x.run()};L.i=y,L.id=y.uid,ji(y,!0),L()},Y=(y,D,F)=>{D.component=y;const $=y.vnode.props;y.vnode=D,y.next=null,Tg(y,D.props,$,F),Rg(y,D.children,F),ki(),Bu(y),Vi()},q=(y,D,F,$,W,st,ot,E,x=!1)=>{const L=y&&y.children,X=y?y.shapeFlag:0,K=D.children,{patchFlag:j,shapeFlag:ht}=D;if(j>0){if(j&128){at(L,K,F,$,W,st,ot,E,x);return}else if(j&256){rt(L,K,F,$,W,st,ot,E,x);return}}ht&8?(X&16&&tt(L,W,st),K!==L&&u(F,K)):X&16?ht&16?at(L,K,F,$,W,st,ot,E,x):tt(L,W,st,!0):(X&8&&u(F,""),ht&16&&O(K,F,$,W,st,ot,E,x))},rt=(y,D,F,$,W,st,ot,E,x)=>{y=y||rs,D=D||rs;const L=y.length,X=D.length,K=Math.min(L,X);let j;for(j=0;j<K;j++){const ht=D[j]=x?Ei(D[j]):Wn(D[j]);_(y[j],ht,F,null,W,st,ot,E,x)}L>X?tt(y,W,st,!0,!1,K):O(D,F,$,W,st,ot,E,x,K)},at=(y,D,F,$,W,st,ot,E,x)=>{let L=0;const X=D.length;let K=y.length-1,j=X-1;for(;L<=K&&L<=j;){const ht=y[L],lt=D[L]=x?Ei(D[L]):Wn(D[L]);if(Cs(ht,lt))_(ht,lt,F,null,W,st,ot,E,x);else break;L++}for(;L<=K&&L<=j;){const ht=y[K],lt=D[j]=x?Ei(D[j]):Wn(D[j]);if(Cs(ht,lt))_(ht,lt,F,null,W,st,ot,E,x);else break;K--,j--}if(L>K){if(L<=j){const ht=j+1,lt=ht<X?D[ht].el:$;for(;L<=j;)_(null,D[L]=x?Ei(D[L]):Wn(D[L]),F,lt,W,st,ot,E,x),L++}}else if(L>j)for(;L<=K;)ft(y[L],W,st,!0),L++;else{const ht=L,lt=L,_t=new Map;for(L=lt;L<=j;L++){const vt=D[L]=x?Ei(D[L]):Wn(D[L]);vt.key!=null&&_t.set(vt.key,L)}let xt,wt=0;const ct=j-lt+1;let Wt=!1,zt=0;const It=new Array(ct);for(L=0;L<ct;L++)It[L]=0;for(L=ht;L<=K;L++){const vt=y[L];if(wt>=ct){ft(vt,W,st,!0);continue}let P;if(vt.key!=null)P=_t.get(vt.key);else for(xt=lt;xt<=j;xt++)if(It[xt-lt]===0&&Cs(vt,D[xt])){P=xt;break}P===void 0?ft(vt,W,st,!0):(It[P-lt]=L+1,P>=zt?zt=P:Wt=!0,_(vt,D[P],F,null,W,st,ot,E,x),wt++)}const Rt=Wt?Ug(It):rs;for(xt=Rt.length-1,L=ct-1;L>=0;L--){const vt=lt+L,P=D[vt],mt=vt+1<X?D[vt+1].el:$;It[L]===0?_(null,P,F,mt,W,st,ot,E,x):Wt&&(xt<0||L!==Rt[xt]?dt(P,F,mt,2):xt--)}}},dt=(y,D,F,$,W=null)=>{const{el:st,type:ot,transition:E,children:x,shapeFlag:L}=y;if(L&6){dt(y.component.subTree,D,F,$);return}if(L&128){y.suspense.move(D,F,$);return}if(L&64){ot.move(y,D,F,yt);return}if(ot===dn){n(st,D,F);for(let K=0;K<x.length;K++)dt(x[K],D,F,$);n(y.anchor,D,F);return}if(ot===rl){v(y,D,F);return}if($!==2&&L&1&&E)if($===0)E.beforeEnter(st),n(st,D,F),$e(()=>E.enter(st),W);else{const{leave:K,delayLeave:j,afterLeave:ht}=E,lt=()=>n(st,D,F),_t=()=>{K(st,()=>{lt(),ht&&ht()})};j?j(st,lt,_t):_t()}else n(st,D,F)},ft=(y,D,F,$=!1,W=!1)=>{const{type:st,props:ot,ref:E,children:x,dynamicChildren:L,shapeFlag:X,patchFlag:K,dirs:j,cacheIndex:ht}=y;if(K===-2&&(W=!1),E!=null&&rc(E,null,F,y,!0),ht!=null&&(D.renderCache[ht]=void 0),X&256){D.ctx.deactivate(y);return}const lt=X&1&&j,_t=!to(y);let xt;if(_t&&(xt=ot&&ot.onVnodeBeforeUnmount)&&kn(xt,D,y),X&6)Z(y.component,F,$);else{if(X&128){y.suspense.unmount(F,$);return}lt&&qi(y,null,D,"beforeUnmount"),X&64?y.type.remove(y,D,F,yt,$):L&&!L.hasOnce&&(st!==dn||K>0&&K&64)?tt(L,D,F,!1,!0):(st===dn&&K&384||!W&&X&16)&&tt(x,D,F),$&&et(y)}(_t&&(xt=ot&&ot.onVnodeUnmounted)||lt)&&$e(()=>{xt&&kn(xt,D,y),lt&&qi(y,null,D,"unmounted")},F)},et=y=>{const{type:D,el:F,anchor:$,transition:W}=y;if(D===dn){I(F,$);return}if(D===rl){T(y);return}const st=()=>{r(F),W&&!W.persisted&&W.afterLeave&&W.afterLeave()};if(y.shapeFlag&1&&W&&!W.persisted){const{leave:ot,delayLeave:E}=W,x=()=>ot(F,st);E?E(y.el,st,x):x()}else st()},I=(y,D)=>{let F;for(;y!==D;)F=h(y),r(y),y=F;r(D)},Z=(y,D,F)=>{const{bum:$,scope:W,update:st,subTree:ot,um:E,m:x,a:L}=y;Wu(x),Wu(L),$&&Qo($),W.stop(),st&&(st.active=!1,ft(ot,y,D,F)),E&&$e(E,D),$e(()=>{y.isUnmounted=!0},D),D&&D.pendingBranch&&!D.isUnmounted&&y.asyncDep&&!y.asyncResolved&&y.suspenseId===D.pendingId&&(D.deps--,D.deps===0&&D.resolve())},tt=(y,D,F,$=!1,W=!1,st=0)=>{for(let ot=st;ot<y.length;ot++)ft(y[ot],D,F,$,W)},ut=y=>{if(y.shapeFlag&6)return ut(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const D=h(y.anchor||y.el),F=D&&D[Cg];return F?h(F):D};let Et=!1;const Tt=(y,D,F)=>{y==null?D._vnode&&ft(D._vnode,null,null,!0):_(D._vnode||null,y,D,null,null,null,F),D._vnode=y,Et||(Et=!0,Bu(),Id(),Et=!1)},yt={p:_,um:ft,m:dt,r:et,mt:U,mc:O,pc:q,pbc:w,n:ut,o:i};return{render:Tt,hydrate:void 0,createApp:yg(Tt)}}function nl({type:i,props:t},e){return e==="svg"&&i==="foreignObject"||e==="mathml"&&i==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function ji({effect:i,update:t},e){i.allowRecurse=t.allowRecurse=e}function Ig(i,t){return(!i||i&&!i.pendingBranch)&&t&&!t.persisted}function tp(i,t,e=!1){const n=i.children,r=t.children;if(Zt(n)&&Zt(r))for(let s=0;s<n.length;s++){const a=n[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=Ei(r[s]),o.el=a.el),!e&&o.patchFlag!==-2&&tp(a,o)),o.type===Fo&&(o.el=a.el)}}function Ug(i){const t=i.slice(),e=[0];let n,r,s,a,o;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=e[e.length-1],i[r]<c){t[n]=r,e.push(n);continue}for(s=0,a=e.length-1;s<a;)o=s+a>>1,i[e[o]]<c?s=o+1:a=o;c<i[e[s]]&&(s>0&&(t[n]=e[s-1]),e[s]=n)}}for(s=e.length,a=e[s-1];s-- >0;)e[s]=a,a=t[a];return e}function ep(i){const t=i.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ep(t)}function Wu(i){if(i)for(let t=0;t<i.length;t++)i[t].active=!1}const Ng=Symbol.for("v-scx"),Og=()=>eo(Ng),Sa={};function il(i,t,e){return np(i,t,e)}function np(i,t,{immediate:e,deep:n,flush:r,once:s,onTrack:a,onTrigger:o}=ce){if(t&&s){const b=t;t=(...A)=>{b(...A),R()}}const l=qe,c=b=>n===!0?b:sr(b,n===!1?1:void 0);let u,f=!1,h=!1;if(rn(i)?(u=()=>i.value,f=ds(i)):Gs(i)?(u=()=>c(i),f=!0):Zt(i)?(h=!0,f=i.some(b=>Gs(b)||ds(b)),u=()=>i.map(b=>{if(rn(b))return b.value;if(Gs(b))return c(b);if(qt(b))return Di(b,l,2)})):qt(i)?t?u=()=>Di(i,l,2):u=()=>(p&&p(),zn(i,l,3,[g])):u=Bn,t&&n){const b=u;u=()=>sr(b())}let p,g=b=>{p=v.onStop=()=>{Di(b,l,4),p=v.onStop=void 0}},_;if(Bo)if(g=Bn,t?e&&zn(t,l,3,[u(),h?[]:void 0,g]):u(),r==="sync"){const b=Og();_=b.__watcherHandles||(b.__watcherHandles=[])}else return Bn;let m=h?new Array(i.length).fill(Sa):Sa;const d=()=>{if(!(!v.active||!v.dirty))if(t){const b=v.run();(n||f||(h?b.some((A,O)=>Ou(A,m[O])):Ou(b,m)))&&(p&&p(),zn(t,l,3,[b,m===Sa?void 0:h&&m[0]===Sa?[]:m,g]),m=b)}else v.run()};d.allowRecurse=!!t;let S;r==="sync"?S=d:r==="post"?S=()=>$e(d,l&&l.suspense):(d.pre=!0,l&&(d.id=l.uid),S=()=>Yc(d));const v=new Uc(u,Bn,S),T=f_(),R=()=>{v.stop(),T&&Vc(T.effects,v)};return t?e?d():m=v.run():r==="post"?$e(v.run.bind(v),l&&l.suspense):v.run(),_&&_.push(R),R}function Fg(i,t,e){const n=this.proxy,r=sn(i)?i.includes(".")?ip(n,i):()=>n[i]:i.bind(n,n);let s;qt(t)?s=t:(s=t.handler,e=t);const a=fa(this),o=np(r,s.bind(n),e);return a(),o}function ip(i,t){const e=t.split(".");return()=>{let n=i;for(let r=0;r<e.length&&n;r++)n=n[e[r]];return n}}function sr(i,t=1/0,e){if(t<=0||!be(i)||i.__v_skip||(e=e||new Set,e.has(i)))return i;if(e.add(i),t--,rn(i))sr(i.value,t,e);else if(Zt(i))for(let n=0;n<i.length;n++)sr(i[n],t,e);else if(Sd(i)||yd(i))i.forEach(n=>{sr(n,t,e)});else if(Ad(i)){for(const n in i)sr(i[n],t,e);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&sr(i[n],t,e)}return i}const Bg=(i,t)=>t==="modelValue"||t==="model-value"?i.modelModifiers:i[`${t}Modifiers`]||i[`${Mr(t)}Modifiers`]||i[`${ua(t)}Modifiers`];function zg(i,t,...e){if(i.isUnmounted)return;const n=i.vnode.props||ce;let r=e;const s=t.startsWith("update:"),a=s&&Bg(n,t.slice(7));a&&(a.trim&&(r=e.map(u=>sn(u)?u.trim():u)),a.number&&(r=e.map(X_)));let o,l=n[o=Jo(t)]||n[o=Jo(Mr(t))];!l&&s&&(l=n[o=Jo(ua(t))]),l&&zn(l,i,6,r);const c=n[o+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[o])return;i.emitted[o]=!0,zn(c,i,6,r)}}function rp(i,t,e=!1){const n=t.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let a={},o=!1;if(!qt(i)){const l=c=>{const u=rp(c,t,!0);u&&(o=!0,xn(a,u))};!e&&t.mixins.length&&t.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!o?(be(i)&&n.set(i,null),null):(Zt(s)?s.forEach(l=>a[l]=null):xn(a,s),be(i)&&n.set(i,a),a)}function Oo(i,t){return!i||!kc(t)?!1:(t=t.slice(2).replace(/Once$/,""),ee(i,t[0].toLowerCase()+t.slice(1))||ee(i,ua(t))||ee(i,t))}function Xu(i){const{type:t,vnode:e,proxy:n,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:f,data:h,setupState:p,ctx:g,inheritAttrs:_}=i,m=uo(i);let d,S;try{if(e.shapeFlag&4){const T=r||n,R=T;d=Wn(c.call(R,T,u,f,p,h,g)),S=o}else{const T=t;d=Wn(T.length>1?T(f,{attrs:o,slots:a,emit:l}):T(f,null)),S=t.props?o:Hg(o)}}catch(T){Ws.length=0,Uo(T,i,1),d=ui(yr)}let v=d;if(S&&_!==!1){const T=Object.keys(S),{shapeFlag:R}=v;T.length&&R&7&&(s&&T.some(Md)&&(S=Gg(S,s)),v=ps(v,S,!1,!0))}return e.dirs&&(v=ps(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(e.dirs):e.dirs),e.transition&&(v.transition=e.transition),d=v,uo(m),d}const Hg=i=>{let t;for(const e in i)(e==="class"||e==="style"||kc(e))&&((t||(t={}))[e]=i[e]);return t},Gg=(i,t)=>{const e={};for(const n in i)(!Md(n)||!(n.slice(9)in t))&&(e[n]=i[n]);return e};function kg(i,t,e){const{props:n,children:r,component:s}=i,{props:a,children:o,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return n?Yu(n,a,c):!!a;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(a[h]!==n[h]&&!Oo(c,h))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:n===a?!1:n?a?Yu(n,a,c):!0:!!a;return!1}function Yu(i,t,e){const n=Object.keys(t);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(t[s]!==i[s]&&!Oo(e,s))return!0}return!1}function Vg({vnode:i,parent:t},e){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=t.vnode).el=e,t=t.parent;else break}}const Wg=i=>i.__isSuspense;function Xg(i,t){t&&t.pendingBranch?Zt(i)?t.effects.push(...i):t.effects.push(i):Q_(i)}const dn=Symbol.for("v-fgt"),Fo=Symbol.for("v-txt"),yr=Symbol.for("v-cmt"),rl=Symbol.for("v-stc"),Ws=[];let _n=null;function yi(i=!1){Ws.push(_n=i?null:[])}function Yg(){Ws.pop(),_n=Ws[Ws.length-1]||null}let Qs=1;function qu(i){Qs+=i,i<0&&_n&&(_n.hasOnce=!0)}function sp(i){return i.dynamicChildren=Qs>0?_n||rs:null,Yg(),Qs>0&&_n&&_n.push(i),i}function $i(i,t,e,n,r,s){return sp(Bt(i,t,e,n,r,s,!0))}function qg(i,t,e,n,r){return sp(ui(i,t,e,n,r,!0))}function jg(i){return i?i.__v_isVNode===!0:!1}function Cs(i,t){return i.type===t.type&&i.key===t.key}const ap=({key:i})=>i??null,no=({ref:i,ref_key:t,ref_for:e})=>(typeof i=="number"&&(i=""+i),i!=null?sn(i)||rn(i)||qt(i)?{i:jn,r:i,k:t,f:!!e}:i:null);function Bt(i,t=null,e=null,n=0,r=null,s=i===dn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:t,key:t&&ap(t),ref:t&&no(t),scopeId:Nd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:jn};return o?(jc(l,e),s&128&&i.normalize(l)):e&&(l.shapeFlag|=sn(e)?8:16),Qs>0&&!a&&_n&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&_n.push(l),l}const ui=$g;function $g(i,t=null,e=null,n=0,r=null,s=!1){if((!i||i===dg)&&(i=yr),jg(i)){const o=ps(i,t,!0);return e&&jc(o,e),Qs>0&&!s&&_n&&(o.shapeFlag&6?_n[_n.indexOf(i)]=o:_n.push(o)),o.patchFlag=-2,o}if(o0(i)&&(i=i.__vccOpts),t){t=Kg(t);let{class:o,style:l}=t;o&&!sn(o)&&(t.class=ss(o)),be(l)&&(_d(l)&&!Zt(l)&&(l=xn({},l)),t.style=Io(l))}const a=sn(i)?1:Wg(i)?128:Pg(i)?64:be(i)?4:qt(i)?2:0;return Bt(i,t,e,n,r,a,s,!0)}function Kg(i){return i?_d(i)||qd(i)?xn({},i):i:null}function ps(i,t,e=!1,n=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=i,c=t?Qg(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&ap(c),ref:t&&t.ref?e&&s?Zt(s)?s.concat(no(t)):[s,no(t)]:no(t):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:o,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:t&&i.type!==dn?a===-1?16:a|16:a,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&ps(i.ssContent),ssFallback:i.ssFallback&&ps(i.ssFallback),el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce};return l&&n&&Od(u,l.clone(u)),u}function Zg(i=" ",t=0){return ui(Fo,null,i,t)}function Jg(i="",t=!1){return t?(yi(),qg(yr,null,i)):ui(yr,null,i)}function Wn(i){return i==null||typeof i=="boolean"?ui(yr):Zt(i)?ui(dn,null,i.slice()):typeof i=="object"?Ei(i):ui(Fo,null,String(i))}function Ei(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:ps(i)}function jc(i,t){let e=0;const{shapeFlag:n}=i;if(t==null)t=null;else if(Zt(t))e=16;else if(typeof t=="object")if(n&65){const r=t.default;r&&(r._c&&(r._d=!1),jc(i,r()),r._c&&(r._d=!0));return}else{e=32;const r=t._;!r&&!qd(t)?t._ctx=jn:r===3&&jn&&(jn.slots._===1?t._=1:(t._=2,i.patchFlag|=1024))}else qt(t)?(t={default:t,_ctx:jn},e=32):(t=String(t),n&64?(e=16,t=[Zg(t)]):e=8);i.children=t,i.shapeFlag|=e}function Qg(...i){const t={};for(let e=0;e<i.length;e++){const n=i[e];for(const r in n)if(r==="class")t.class!==n.class&&(t.class=ss([t.class,n.class]));else if(r==="style")t.style=Io([t.style,n.style]);else if(kc(r)){const s=t[r],a=n[r];a&&s!==a&&!(Zt(s)&&s.includes(a))&&(t[r]=s?[].concat(s,a):a)}else r!==""&&(t[r]=n[r])}return t}function kn(i,t,e,n=null){zn(i,t,7,[e,n])}const t0=Wd();let e0=0;function n0(i,t,e){const n=i.type,r=(t?t.appContext:i.appContext)||t0,s={uid:e0++,vnode:i,type:n,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new c_(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$d(n,r),emitsOptions:rp(n,r),emit:null,emitted:null,propsDefaults:ce,inheritAttrs:n.inheritAttrs,ctx:ce,data:ce,props:ce,attrs:ce,slots:ce,refs:ce,setupState:ce,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=zg.bind(null,s),i.ce&&i.ce(s),s}let qe=null,ho,sc;{const i=wd(),t=(e,n)=>{let r;return(r=i[e])||(r=i[e]=[]),r.push(n),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};ho=t("__VUE_INSTANCE_SETTERS__",e=>qe=e),sc=t("__VUE_SSR_SETTERS__",e=>Bo=e)}const fa=i=>{const t=qe;return ho(i),i.scope.on(),()=>{i.scope.off(),ho(t)}},ju=()=>{qe&&qe.scope.off(),ho(null)};function op(i){return i.vnode.shapeFlag&4}let Bo=!1;function i0(i,t=!1,e=!1){t&&sc(t);const{props:n,children:r}=i.vnode,s=op(i);Eg(i,n,s,t),wg(i,r,e);const a=s?r0(i,t):void 0;return t&&sc(!1),a}function r0(i,t){const e=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,pg);const{setup:n}=e;if(n){const r=i.setupContext=n.length>1?a0(i):null,s=fa(i);ki();const a=Di(n,i,0,[i.props,r]);if(Vi(),s(),Td(a)){if(a.then(ju,ju),t)return a.then(o=>{$u(i,o)}).catch(o=>{Uo(o,i,0)});i.asyncDep=a}else $u(i,a)}else lp(i)}function $u(i,t,e){qt(t)?i.type.__ssrInlineRender?i.ssrRender=t:i.render=t:be(t)&&(i.setupState=xd(t)),lp(i)}function lp(i,t,e){const n=i.type;i.render||(i.render=n.render||Bn);{const r=fa(i);ki();try{mg(i)}finally{Vi(),r()}}}const s0={get(i,t){return nn(i,"get",""),i[t]}};function a0(i){const t=e=>{i.exposed=e||{}};return{attrs:new Proxy(i.attrs,s0),slots:i.slots,emit:i.emit,expose:t}}function $c(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(xd(D_(i.exposed)),{get(t,e){if(e in t)return t[e];if(e in Vs)return Vs[e](i)},has(t,e){return e in t||e in Vs}})):i.proxy}function o0(i){return qt(i)&&"__vccOpts"in i}const cp=(i,t)=>I_(i,t,Bo),l0="3.4.38";/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function c0(i,t){const e=new Set(i.split(","));return n=>e.has(n)}const u0=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),f0=i=>i.startsWith("onUpdate:"),h0=Object.assign,up=Array.isArray,fp=i=>typeof i=="function",po=i=>typeof i=="string",d0=i=>typeof i=="symbol",hp=i=>{const t=Object.create(null);return e=>t[e]||(t[e]=i(e))},p0=/\B([A-Z])/g,dp=hp(i=>i.replace(p0,"-$1").toLowerCase()),m0=hp(i=>i.charAt(0).toUpperCase()+i.slice(1)),_0="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",g0=c0(_0);function pp(i){return!!i||i===""}/**
* @vue/runtime-dom v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const v0="http://www.w3.org/2000/svg",x0="http://www.w3.org/1998/Math/MathML",ri=typeof document<"u"?document:null,Ku=ri&&ri.createElement("template"),M0={insert:(i,t,e)=>{t.insertBefore(i,e||null)},remove:i=>{const t=i.parentNode;t&&t.removeChild(i)},createElement:(i,t,e,n)=>{const r=t==="svg"?ri.createElementNS(v0,i):t==="mathml"?ri.createElementNS(x0,i):e?ri.createElement(i,{is:e}):ri.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>ri.createTextNode(i),createComment:i=>ri.createComment(i),setText:(i,t)=>{i.nodeValue=t},setElementText:(i,t)=>{i.textContent=t},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>ri.querySelector(i),setScopeId(i,t){i.setAttribute(t,"")},insertStaticContent(i,t,e,n,r,s){const a=e?e.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),e),!(r===s||!(r=r.nextSibling)););else{Ku.innerHTML=n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i;const o=Ku.content;if(n==="svg"||n==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}t.insertBefore(o,e)}return[a?a.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},y0=Symbol("_vtc");function S0(i,t,e){const n=i[y0];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?i.removeAttribute("class"):e?i.setAttribute("class",t):i.className=t}const Zu=Symbol("_vod"),E0=Symbol("_vsh"),T0=Symbol(""),b0=/(^|;)\s*display\s*:/;function A0(i,t,e){const n=i.style,r=po(e);let s=!1;if(e&&!r){if(t)if(po(t))for(const a of t.split(";")){const o=a.slice(0,a.indexOf(":")).trim();e[o]==null&&io(n,o,"")}else for(const a in t)e[a]==null&&io(n,a,"");for(const a in e)a==="display"&&(s=!0),io(n,a,e[a])}else if(r){if(t!==e){const a=n[T0];a&&(e+=";"+a),n.cssText=e,s=b0.test(e)}}else t&&i.removeAttribute("style");Zu in i&&(i[Zu]=s?n.display:"",i[E0]&&(n.display="none"))}const Ju=/\s*!important$/;function io(i,t,e){if(up(e))e.forEach(n=>io(i,t,n));else if(e==null&&(e=""),t.startsWith("--"))i.setProperty(t,e);else{const n=w0(i,t);Ju.test(e)?i.setProperty(dp(n),e.replace(Ju,""),"important"):i[n]=e}}const Qu=["Webkit","Moz","ms"],sl={};function w0(i,t){const e=sl[t];if(e)return e;let n=Mr(t);if(n!=="filter"&&n in i)return sl[t]=n;n=m0(n);for(let r=0;r<Qu.length;r++){const s=Qu[r]+n;if(s in i)return sl[t]=s}return t}const tf="http://www.w3.org/1999/xlink";function ef(i,t,e,n,r,s=g0(t)){n&&t.startsWith("xlink:")?e==null?i.removeAttributeNS(tf,t.slice(6,t.length)):i.setAttributeNS(tf,t,e):e==null||s&&!pp(e)?i.removeAttribute(t):i.setAttribute(t,s?"":d0(e)?String(e):e)}function R0(i,t,e,n){if(t==="innerHTML"||t==="textContent"){if(e==null)return;i[t]=e;return}const r=i.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?i.getAttribute("value")||"":i.value,o=e==null?"":String(e);(a!==o||!("_value"in i))&&(i.value=o),e==null&&i.removeAttribute(t),i._value=e;return}let s=!1;if(e===""||e==null){const a=typeof i[t];a==="boolean"?e=pp(e):e==null&&a==="string"?(e="",s=!0):a==="number"&&(e=0,s=!0)}try{i[t]=e}catch{}s&&i.removeAttribute(t)}function C0(i,t,e,n){i.addEventListener(t,e,n)}function P0(i,t,e,n){i.removeEventListener(t,e,n)}const nf=Symbol("_vei");function L0(i,t,e,n,r=null){const s=i[nf]||(i[nf]={}),a=s[t];if(n&&a)a.value=n;else{const[o,l]=D0(t);if(n){const c=s[t]=N0(n,r);C0(i,o,c,l)}else a&&(P0(i,o,a,l),s[t]=void 0)}}const rf=/(?:Once|Passive|Capture)$/;function D0(i){let t;if(rf.test(i)){t={};let n;for(;n=i.match(rf);)i=i.slice(0,i.length-n[0].length),t[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):dp(i.slice(2)),t]}let al=0;const I0=Promise.resolve(),U0=()=>al||(I0.then(()=>al=0),al=Date.now());function N0(i,t){const e=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=e.attached)return;zn(O0(n,e.value),t,5,[n])};return e.value=i,e.attached=U0(),e}function O0(i,t){if(up(t)){const e=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{e.call(i),i._stopped=!0},t.map(n=>r=>!r._stopped&&n&&n(r))}else return t}const sf=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,F0=(i,t,e,n,r,s)=>{const a=r==="svg";t==="class"?S0(i,n,a):t==="style"?A0(i,e,n):u0(t)?f0(t)||L0(i,t,e,n,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):B0(i,t,n,a))?(R0(i,t,n),!i.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&ef(i,t,n,a,s,t!=="value")):(t==="true-value"?i._trueValue=n:t==="false-value"&&(i._falseValue=n),ef(i,t,n,a))};function B0(i,t,e,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in i&&sf(t)&&fp(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&i.tagName==="INPUT"||t==="type"&&i.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return sf(t)&&po(e)?!1:t in i}const z0=h0({patchProp:F0},M0);let af;function H0(){return af||(af=Lg(z0))}const G0=(...i)=>{const t=H0().createApp(...i),{mount:e}=t;return t.mount=n=>{const r=V0(n);if(!r)return;const s=t._component;!fp(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const a=e(r,!1,k0(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},t};function k0(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function V0(i){return po(i)?document.querySelector(i):i}function si(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function mp(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var vn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ms={duration:.5,overwrite:!1,delay:0},Kc,Ne,oe,Cn=1e8,se=1/Cn,ac=Math.PI*2,W0=ac/4,X0=0,_p=Math.sqrt,Y0=Math.cos,q0=Math.sin,Ie=function(t){return typeof t=="string"},me=function(t){return typeof t=="function"},fi=function(t){return typeof t=="number"},Zc=function(t){return typeof t>"u"},Kn=function(t){return typeof t=="object"},Ke=function(t){return t!==!1},Jc=function(){return typeof window<"u"},Ea=function(t){return me(t)||Ie(t)},gp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ge=Array.isArray,oc=/(?:-?\.?\d|\.)+/gi,vp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ts=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ol=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,xp=/[+-]=-?[.\d]+/,Mp=/[^,'"\[\]\s]+/gi,j0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ue,Vn,lc,Qc,Mn={},mo={},yp,Sp=function(t){return(mo=_s(t,Mn))&&an},tu=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ta=function(t,e){return!e&&console.warn(t)},Ep=function(t,e){return t&&(Mn[t]=e)&&mo&&(mo[t]=e)||Mn},ea=function(){return 0},$0={suppressEvents:!0,isStart:!0,kill:!1},ro={suppressEvents:!0,kill:!1},K0={suppressEvents:!0},eu={},Ii=[],cc={},Tp,hn={},ll={},of=30,so=[],nu="",iu=function(t){var e=t[0],n,r;if(Kn(e)||me(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=so.length;r--&&!so[r].targetTest(e););n=so[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new jp(t[r],n)))||t.splice(r,1);return t},hr=function(t){return t._gsap||iu(Pn(t))[0]._gsap},bp=function(t,e,n){return(n=t[e])&&me(n)?t[e]():Zc(n)&&t.getAttribute&&t.getAttribute(e)||n},Ze=function(t,e){return(t=t.split(",")).forEach(e)||t},ve=function(t){return Math.round(t*1e5)/1e5||0},Te=function(t){return Math.round(t*1e7)/1e7||0},ls=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},Z0=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},_o=function(){var t=Ii.length,e=Ii.slice(0),n,r;for(cc={},Ii.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ru=function(t){return!!(t._initted||t._startAt||t.add)},Ap=function(t,e,n,r){Ii.length&&!Ne&&_o(),t.render(e,n,!!(Ne&&e<0&&ru(t))),Ii.length&&!Ne&&_o()},wp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Mp).length<2?e:Ie(t)?t.trim():t},Rp=function(t){return t},yn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},J0=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},_s=function(t,e){for(var n in e)t[n]=e[n];return t},lf=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Kn(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},go=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},Xs=function(t){var e=t.parent||ue,n=t.keyframes?J0(Ge(t.keyframes)):yn;if(Ke(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Q0=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},Cp=function(t,e,n,r,s){var a=t[r],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=a,e.parent=e._dp=t,e},zo=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},zi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},dr=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},tv=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},uc=function(t,e,n,r){return t._startAt&&(Ne?t._startAt.revert(ro):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},ev=function i(t){return!t||t._ts&&i(t.parent)},cf=function(t){return t._repeat?gs(t._tTime,t=t.duration()+t._rDelay)*t:0},gs=function(t,e){var n=Math.floor(t=Te(t/e));return t&&n===t?n-1:n},vo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Ho=function(t){return t._end=Te(t._start+(t._tDur/Math.abs(t._ts||t._rts||se)||0))},Go=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Te(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ho(t),n._dirty||dr(n,t)),t},Pp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=vo(t.rawTime(),e),(!e._dur||ha(0,e.totalDuration(),n)-e._tTime>se)&&e.render(n,!0)),dr(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-se}},qn=function(t,e,n,r){return e.parent&&zi(e),e._start=Te((fi(n)?n:n||t!==ue?Tn(t,n,e):t._time)+e._delay),e._end=Te(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Cp(t,e,"_first","_last",t._sort?"_start":0),fc(e)||(t._recent=e),r||Pp(t,e),t._ts<0&&Go(t,t._tTime),t},Lp=function(t,e){return(Mn.ScrollTrigger||tu("scrollTrigger",e))&&Mn.ScrollTrigger.create(e,t)},Dp=function(t,e,n,r,s){if(au(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Ne&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Tp!==pn.frame)return Ii.push(t),t._lazy=[s,r],1},nv=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},fc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},iv=function(t,e,n,r){var s=t.ratio,a=e<0||!e&&(!t._start&&nv(t)&&!(!t._initted&&fc(t))||(t._ts<0||t._dp._ts<0)&&!fc(t))?0:1,o=t._rDelay,l=0,c,u,f;if(o&&t._repeat&&(l=ha(0,t._tDur,e),u=gs(l,o),t._yoyo&&u&1&&(a=1-a),u!==gs(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Ne||r||t._zTime===se||!e&&t._zTime){if(!t._initted&&Dp(t,e,r,n,l))return;for(f=t._zTime,t._zTime=e||(n?se:0),n||(n=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&uc(t,e,n,!0),t._onUpdate&&!n&&gn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&gn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&zi(t,1),!n&&!Ne&&(gn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},rv=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},vs=function(t,e,n,r){var s=t._repeat,a=Te(e)||0,o=t._tTime/t._tDur;return o&&!r&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:Te(a*(s+1)+t._rDelay*s):a,o>0&&!r&&Go(t,t._tTime=t._tDur*o),t.parent&&Ho(t),n||dr(t.parent,t),t},uf=function(t){return t instanceof je?dr(t):vs(t,t._dur)},sv={_start:0,endTime:ea,totalDuration:ea},Tn=function i(t,e,n){var r=t.labels,s=t._recent||sv,a=t.duration()>=Cn?s.endTime(!1):t._dur,o,l,c;return Ie(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(e in r||(r[e]=a),r[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&n&&(l=l/100*(Ge(n)?n[0]:n).totalDuration()),o>1?i(t,e.substr(0,o-1),n)+l:a+l)):e==null?a:+e},Ys=function(t,e,n){var r=fi(e[1]),s=(r?2:1)+(t<2?0:1),a=e[s],o,l;if(r&&(a.duration=e[1]),a.parent=n,t){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Ke(l.vars.inherit)&&l.parent;a.immediateRender=Ke(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Ee(e[0],a,e[s+1])},Wi=function(t,e){return t||t===0?e(t):e},ha=function(t,e,n){return n<t?t:n>e?e:n},He=function(t,e){return!Ie(t)||!(e=j0.exec(t))?"":e[1]},av=function(t,e,n){return Wi(n,function(r){return ha(t,e,r)})},hc=[].slice,Ip=function(t,e){return t&&Kn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Kn(t[0]))&&!t.nodeType&&t!==Vn},ov=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return Ie(r)&&!e||Ip(r,1)?(s=n).push.apply(s,Pn(r)):n.push(r)})||n},Pn=function(t,e,n){return oe&&!e&&oe.selector?oe.selector(t):Ie(t)&&!n&&(lc||!xs())?hc.call((e||Qc).querySelectorAll(t),0):Ge(t)?ov(t,n):Ip(t)?hc.call(t,0):t?[t]:[]},dc=function(t){return t=Pn(t)[0]||ta("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Pn(e,n.querySelectorAll?n:n===t?ta("Invalid scope")||Qc.createElement("div"):t)}},Up=function(t){return t.sort(function(){return .5-Math.random()})},Np=function(t){if(me(t))return t;var e=Kn(t)?t:{each:t},n=pr(e.ease),r=e.from||0,s=parseFloat(e.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=e.axis,u=r,f=r;return Ie(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],f=r[1]),function(h,p,g){var _=(g||e).length,m=a[_],d,S,v,T,R,b,A,O,M;if(!m){if(M=e.grid==="auto"?0:(e.grid||[1,Cn])[1],!M){for(A=-Cn;A<(A=g[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(m=a[_]=[],d=l?Math.min(M,_)*u-.5:r%M,S=M===Cn?0:l?_*f/M-.5:r/M|0,A=0,O=Cn,b=0;b<_;b++)v=b%M-d,T=S-(b/M|0),m[b]=R=c?Math.abs(c==="y"?T:v):_p(v*v+T*T),R>A&&(A=R),R<O&&(O=R);r==="random"&&Up(m),m.max=A-O,m.min=O,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(M>_?_-1:c?c==="y"?_/M:M:Math.max(M,_/M))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=He(e.amount||e.each)||0,n=n&&_<0?Xp(n):n}return _=(m[h]-m.min)/m.max||0,Te(m.b+(n?n(_):_)*m.v)+m.u}},pc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=Te(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(fi(n)?0:He(n))}},Op=function(t,e){var n=Ge(t),r,s;return!n&&Kn(t)&&(r=n=t.radius||Cn,t.values?(t=Pn(t.values),(s=!fi(t[0]))&&(r*=r)):t=pc(t.increment)),Wi(e,n?me(t)?function(a){return s=t(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Cn,u=0,f=t.length,h,p;f--;)s?(h=t[f].x-o,p=t[f].y-l,h=h*h+p*p):h=Math.abs(t[f]-o),h<c&&(c=h,u=f);return u=!r||c<=r?t[u]:a,s||u===a||fi(a)?u:u+He(a)}:pc(t))},Fp=function(t,e,n,r){return Wi(Ge(t)?!e:n===!0?!!(n=0):!r,function(){return Ge(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},lv=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,a){return a(s)},r)}},cv=function(t,e){return function(n){return t(parseFloat(n))+(e||He(n))}},uv=function(t,e,n){return zp(t,e,0,1,n)},Bp=function(t,e,n){return Wi(n,function(r){return t[~~e(r)]})},fv=function i(t,e,n){var r=e-t;return Ge(t)?Bp(t,i(0,t.length),e):Wi(n,function(s){return(r+(s-t)%r)%r+t})},hv=function i(t,e,n){var r=e-t,s=r*2;return Ge(t)?Bp(t,i(0,t.length-1),e):Wi(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>r?s-a:a)})},na=function(t){for(var e=0,n="",r,s,a,o;~(r=t.indexOf("random(",e));)a=t.indexOf(")",r),o=t.charAt(r+7)==="[",s=t.substr(r+7,a-r-7).match(o?Mp:oc),n+=t.substr(e,r-e)+Fp(o?s:+s[0],o?0:+s[1],+s[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},zp=function(t,e,n,r,s){var a=e-t,o=r-n;return Wi(s,function(l){return n+((l-t)/a*o||0)})},dv=function i(t,e,n,r){var s=isNaN(t+e)?0:function(p){return(1-p)*t+p*e};if(!s){var a=Ie(t),o={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),a)t={p:t},e={p:e};else if(Ge(t)&&!Ge(e)){for(u=[],f=t.length,h=f-2,c=1;c<f;c++)u.push(i(t[c-1],t[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=e}else r||(t=_s(Ge(t)?[]:{},t));if(!u){for(l in e)su.call(o,t,l,"get",e[l]);s=function(g){return cu(g,o)||(a?t.p:t)}}}return Wi(n,s)},ff=function(t,e,n){var r=t.labels,s=Cn,a,o,l;for(a in r)o=r[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},gn=function(t,e,n){var r=t.vars,s=r[e],a=oe,o=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&Ii.length&&_o(),o&&(oe=o),u=l?s.apply(c,l):s.call(c),oe=a,u},zs=function(t){return zi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ne),t.progress()<1&&gn(t,"onInterrupt"),t},es,Hp=[],Gp=function(t){if(t)if(t=!t.name&&t.default||t,Jc()||t.headless){var e=t.name,n=me(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:ea,render:cu,add:su,kill:Cv,modifier:Rv,rawVars:0},a={targetTest:0,get:0,getSetter:lu,aliases:{},register:0};if(xs(),t!==r){if(hn[e])return;yn(r,yn(go(t,s),a)),_s(r.prototype,_s(s,go(t,a))),hn[r.prop=e]=r,t.targetTest&&(so.push(r),eu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Ep(e,r),t.register&&t.register(an,r,Je)}else Hp.push(t)},ie=255,Hs={aqua:[0,ie,ie],lime:[0,ie,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ie],navy:[0,0,128],white:[ie,ie,ie],olive:[128,128,0],yellow:[ie,ie,0],orange:[ie,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ie,0,0],pink:[ie,192,203],cyan:[0,ie,ie],transparent:[ie,ie,ie,0]},cl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ie+.5|0},kp=function(t,e,n){var r=t?fi(t)?[t>>16,t>>8&ie,t&ie]:0:Hs.black,s,a,o,l,c,u,f,h,p,g;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Hs[t])r=Hs[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&ie,r&ie,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&ie,t&ie]}else if(t.substr(0,3)==="hsl"){if(r=g=t.match(oc),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=cl(l+1/3,s,a),r[1]=cl(l,s,a),r[2]=cl(l-1/3,s,a);else if(~t.indexOf("="))return r=t.match(vp),n&&r.length<4&&(r[3]=1),r}else r=t.match(oc)||Hs.transparent;r=r.map(Number)}return e&&!g&&(s=r[0]/ie,a=r[1]/ie,o=r[2]/ie,f=Math.max(s,a,o),h=Math.min(s,a,o),u=(f+h)/2,f===h?l=c=0:(p=f-h,c=u>.5?p/(2-f-h):p/(f+h),l=f===s?(a-o)/p+(a<o?6:0):f===a?(o-s)/p+2:(s-a)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Vp=function(t){var e=[],n=[],r=-1;return t.split(Ui).forEach(function(s){var a=s.match(ts)||[];e.push.apply(e,a),n.push(r+=a.length+1)}),e.c=n,e},hf=function(t,e,n){var r="",s=(t+r).match(Ui),a=e?"hsla(":"rgba(",o=0,l,c,u,f;if(!s)return t;if(s=s.map(function(h){return(h=kp(h,e,1))&&a+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Vp(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace(Ui,"1").split(ts),f=c.length-1;o<f;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(Ui),f=c.length-1;o<f;o++)r+=c[o]+s[o];return r+c[f]},Ui=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Hs)i+="|"+t+"\\b";return new RegExp(i+")","gi")}(),pv=/hsl[a]?\(/,Wp=function(t){var e=t.join(" "),n;if(Ui.lastIndex=0,Ui.test(e))return n=pv.test(e),t[1]=hf(t[1],n),t[0]=hf(t[0],n,Vp(t[1])),!0},ia,pn=function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,f,h,p,g=function _(m){var d=i()-r,S=m===!0,v,T,R,b;if((d>t||d<0)&&(n+=d-e),r+=d,R=r-n,v=R-a,(v>0||S)&&(b=++f.frame,h=R-f.time*1e3,f.time=R=R/1e3,a+=v+(v>=s?4:s-v),T=1),S||(l=c(_)),T)for(p=0;p<o.length;p++)o[p](R,h,b,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){yp&&(!lc&&Jc()&&(Vn=lc=window,Qc=Vn.document||{},Mn.gsap=an,(Vn.gsapVersions||(Vn.gsapVersions=[])).push(an.version),Sp(mo||Vn.GreenSockGlobals||!Vn.gsap&&Vn||{}),Hp.forEach(Gp)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,a-f.time*1e3+1|0)},ia=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ia=0,c=ea},lagSmoothing:function(m,d){t=m||1/0,e=Math.min(d||33,t)},fps:function(m){s=1e3/(m||240),a=f.time*1e3+s},add:function(m,d,S){var v=d?function(T,R,b,A){m(T,R,b,A),f.remove(v)}:m;return f.remove(m),o[S?"unshift":"push"](v),xs(),v},remove:function(m,d){~(d=o.indexOf(m))&&o.splice(d,1)&&p>=d&&p--},_listeners:o},f}(),xs=function(){return!ia&&pn.wake()},Jt={},mv=/^[\d.\-M][\d.\-,\s]/,_v=/["']/g,gv=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[r]=isNaN(c)?c.replace(_v,"").trim():+c,r=l.substr(o+1).trim();return e},vv=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},xv=function(t){var e=(t+"").split("("),n=Jt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[gv(e[1])]:vv(t).split(",").map(wp)):Jt._CE&&mv.test(t)?Jt._CE("",t):n},Xp=function(t){return function(e){return 1-t(1-e)}},Yp=function i(t,e){for(var n=t._first,r;n;)n instanceof je?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},pr=function(t,e){return t&&(me(t)?t:Jt[t]||xv(t))||e},Ar=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},a;return Ze(t,function(o){Jt[o]=Mn[o]=s,Jt[a=o.toLowerCase()]=n;for(var l in s)Jt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Jt[o+"."+l]=s[l]}),s},qp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ul=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/ac*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*q0((u-a)*s)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:qp(o);return s=ac/s,l.config=function(c,u){return i(t,c,u)},l},fl=function i(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:qp(n);return r.config=function(s){return i(t,s)},r};Ze("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;Ar(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Jt.Linear.easeNone=Jt.none=Jt.Linear.easeIn;Ar("Elastic",ul("in"),ul("out"),ul());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(o){return o<e?i*o*o:o<n?i*Math.pow(o-1.5/t,2)+.75:o<r?i*(o-=2.25/t)*o+.9375:i*Math.pow(o-2.625/t,2)+.984375};Ar("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Ar("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Ar("Circ",function(i){return-(_p(1-i*i)-1)});Ar("Sine",function(i){return i===1?1:-Y0(i*W0)+1});Ar("Back",fl("in"),fl("out"),fl());Jt.SteppedEase=Jt.steps=Mn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,a=1-se;return function(o){return((r*ha(0,a,o)|0)+s)*n}}};ms.ease=Jt["quad.out"];Ze("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return nu+=i+","+i+"Params,"});var jp=function(t,e){this.id=X0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:bp,this.set=e?e.getSetter:lu},ra=function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,vs(this,+e.duration,1,1),this.data=e.data,oe&&(this._ctx=oe,oe.data.push(this)),ia||pn.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,vs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(xs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Go(this,n),!s._dp||s.parent||Pp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&qn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===se||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Ap(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+cf(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+cf(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?gs(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-se?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?vo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-se?0:this._rts,this.totalTime(ha(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Ho(this),tv(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==se&&(this._tTime-=se)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&qn(r,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Ke(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?vo(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=K0);var r=Ne;return Ne=n,ru(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ne=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,uf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,uf(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(Tn(this,n),Ke(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Ke(r)),this._dur||(this._zTime=-se),this},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-se:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-se,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-se)},t.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},t.then=function(n){var r=this;return new Promise(function(s){var a=me(n)?n:Rp,o=function(){var c=r.then;r.then=null,me(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=c),s(a),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?o():r._prom=o})},t.kill=function(){zs(this)},i}();yn(ra.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-se,_prom:0,_ps:!1,_rts:1});var je=function(i){mp(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Ke(n.sortChildren),ue&&qn(n.parent||ue,si(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Lp(si(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,a){return Ys(0,arguments,this),this},e.from=function(r,s,a){return Ys(1,arguments,this),this},e.fromTo=function(r,s,a,o){return Ys(2,arguments,this),this},e.set=function(r,s,a){return s.duration=0,s.parent=this,Xs(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ee(r,s,Tn(this,a),1),this},e.call=function(r,s,a){return qn(this,Ee.delayedCall(0,r,s),a)},e.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Ee(r,a,Tn(this,l)),this},e.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,Xs(a).immediateRender=Ke(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},e.staggerFromTo=function(r,s,a,o,l,c,u,f){return o.startAt=a,Xs(o).immediateRender=Ke(o.immediateRender),this.staggerTo(r,s,o,l,c,u,f)},e.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Te(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,p,g,_,m,d,S,v,T,R,b,A;if(this!==ue&&u>l&&r>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),h=u,T=this._start,v=this._ts,d=!v,f&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(b=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,a);if(h=Te(u%m),u===l?(_=this._repeat,h=c):(R=Te(u/m),_=~~R,_&&_===R&&(h=c,_--),h>c&&(h=c)),R=gs(this._tTime,m),!o&&this._tTime&&R!==_&&this._tTime-R*m-this._dur<=0&&(R=_),b&&_&1&&(h=c-h,A=1),_!==R&&!this._lock){var O=b&&R&1,M=O===(b&&_&1);if(_<R&&(O=!O),o=O?0:u%c?c:u,this._lock=1,this.render(o||(A?0:Te(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&gn(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),o&&o!==this._time||d!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,o=O?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!d)return this;Yp(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=rv(this,Te(o),Te(h)),S&&(u-=h-(h=S._start))),this._tTime=u,this._time=h,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&!s&&!R&&(gn(this,"onStart"),this._tTime!==u))return this;if(h>=o&&r>=0)for(p=this._first;p;){if(g=p._next,(p._act||h>=p._start)&&p._ts&&S!==p){if(p.parent!==this)return this.render(r,s,a);if(p.render(p._ts>0?(h-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(h-p._start)*p._ts,s,a),h!==this._time||!this._ts&&!d){S=0,g&&(u+=this._zTime=-se);break}}p=g}else{p=this._last;for(var w=r<0?r:h;p;){if(g=p._prev,(p._act||w<=p._end)&&p._ts&&S!==p){if(p.parent!==this)return this.render(r,s,a);if(p.render(p._ts>0?(w-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(w-p._start)*p._ts,s,a||Ne&&ru(p)),h!==this._time||!this._ts&&!d){S=0,g&&(u+=this._zTime=w?-se:se);break}}p=g}}if(S&&!s&&(this.pause(),S.render(h>=o?0:-se)._zTime=h>=o?1:-1,this._ts))return this._start=T,Ho(this),this.render(r,s,a);this._onUpdate&&!s&&gn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(T===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&zi(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(gn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var a=this;if(fi(s)||(s=Tn(this,s,r)),!(r instanceof ra)){if(Ge(r))return r.forEach(function(o){return a.add(o,s)}),this;if(Ie(r))return this.addLabel(r,s);if(me(r))r=Ee.delayedCall(0,r);else return this}return this!==r?qn(this,r,s):this},e.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Cn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ee?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},e.remove=function(r){return Ie(r)?this.removeLabel(r):me(r)?this.killTweensOf(r):(r.parent===this&&zo(this,r),r===this._recent&&(this._recent=this._last),dr(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Te(pn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=Tn(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,a){var o=Ee.delayedCall(0,s||ea,a);return o.data="isPause",this._hasPause=1,qn(this,o,Tn(this,r))},e.removePause=function(r){var s=this._first;for(r=Tn(this,r);s;)s._start===r&&s.data==="isPause"&&zi(s),s=s._next},e.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)bi!==o[l]&&o[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var a=[],o=Pn(r),l=this._first,c=fi(s),u;l;)l instanceof Ee?Z0(l._targets,o)&&(c?(!bi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(r,s){s=s||{};var a=this,o=Tn(a,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,p,g=Ee.to(a,yn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||se,onStart:function(){if(a.pause(),!p){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==m&&vs(g,m,0,1).render(g._time,!0,!0),p=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},e.tweenFromTo=function(r,s,a){return this.tweenTo(s,yn({startAt:{time:Tn(this,r)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),ff(this,Tn(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),ff(this,Tn(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+se)},e.shiftChildren=function(r,s,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return dr(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),dr(this)},e.totalDuration=function(r){var s=0,a=this,o=a._last,l=Cn,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,qn(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=u/a._ts,a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;vs(a,a===ue&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(r){if(ue._ts&&(Ap(ue,vo(r,ue)),Tp=pn.frame),pn.frame>=of){of+=vn.autoSleep||120;var s=ue._first;if((!s||!s._ts)&&vn.autoSleep&&pn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||pn.sleep()}}},t}(ra);yn(je.prototype,{_lock:0,_hasPause:0,_forcing:0});var Mv=function(t,e,n,r,s,a,o){var l=new Je(this._pt,t,e,0,1,tm,null,s),c=0,u=0,f,h,p,g,_,m,d,S;for(l.b=n,l.e=r,n+="",r+="",(d=~r.indexOf("random("))&&(r=na(r)),a&&(S=[n,r],a(S,t,e),n=S[0],r=S[1]),h=n.match(ol)||[];f=ol.exec(r);)g=f[0],_=r.substring(c,f.index),p?p=(p+1)%5:_.substr(-5)==="rgba("&&(p=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?ls(m,g)-m:parseFloat(g)-m,m:p&&p<4?Math.round:0},c=ol.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(xp.test(r)||d)&&(l.e=0),this._pt=l,l},su=function(t,e,n,r,s,a,o,l,c,u){me(r)&&(r=r(s||0,t,a));var f=t[e],h=n!=="get"?n:me(f)?c?t[e.indexOf("set")||!me(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,p=me(f)?c?bv:Jp:ou,g;if(Ie(r)&&(~r.indexOf("random(")&&(r=na(r)),r.charAt(1)==="="&&(g=ls(h,r)+(He(h)||0),(g||g===0)&&(r=g))),!u||h!==r||mc)return!isNaN(h*r)&&r!==""?(g=new Je(this._pt,t,e,+h||0,r-(h||0),typeof f=="boolean"?wv:Qp,0,p),c&&(g.fp=c),o&&g.modifier(o,this,t),this._pt=g):(!f&&!(e in t)&&tu(e,r),Mv.call(this,t,e,h,r,p,l||vn.stringFilter,c))},yv=function(t,e,n,r,s){if(me(t)&&(t=qs(t,s,e,n,r)),!Kn(t)||t.style&&t.nodeType||Ge(t)||gp(t))return Ie(t)?qs(t,s,e,n,r):t;var a={},o;for(o in t)a[o]=qs(t[o],s,e,n,r);return a},$p=function(t,e,n,r,s,a){var o,l,c,u;if(hn[t]&&(o=new hn[t]).init(s,o.rawVars?e[t]:yv(e[t],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new Je(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==es))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},bi,mc,au=function i(t,e,n){var r=t.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,p=r.autoRevert,g=t._dur,_=t._startAt,m=t._targets,d=t.parent,S=d&&d.data==="nested"?d.vars.targets:m,v=t._overwrite==="auto"&&!Kc,T=t.timeline,R,b,A,O,M,w,G,V,it,U,H,z,Y;if(T&&(!h||!s)&&(s="none"),t._ease=pr(s,ms.ease),t._yEase=f?Xp(pr(f===!0?s:f,ms.ease)):0,f&&t._yoyo&&!t._repeat&&(f=t._yEase,t._yEase=t._ease,t._ease=f),t._from=!T&&!!r.runBackwards,!T||h&&!r.stagger){if(V=m[0]?hr(m[0]).harness:0,z=V&&r[V.prop],R=go(r,eu),_&&(_._zTime<0&&_.progress(1),e<0&&u&&o&&!p?_.render(-1,!0):_.revert(u&&g?ro:$0),_._lazy=0),a){if(zi(t._startAt=Ee.set(m,yn({data:"isStart",overwrite:!1,parent:d,immediateRender:!0,lazy:!_&&Ke(l),startAt:null,delay:0,onUpdate:c&&function(){return gn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ne||!o&&!p)&&t._startAt.revert(ro),o&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(o=!1),A=yn({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Ke(l),immediateRender:o,stagger:0,parent:d},R),z&&(A[V.prop]=z),zi(t._startAt=Ee.set(m,A)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ne?t._startAt.revert(ro):t._startAt.render(-1,!0)),t._zTime=e,!o)i(t._startAt,se,se);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&Ke(l)||l&&!g,b=0;b<m.length;b++){if(M=m[b],G=M._gsap||iu(m)[b]._gsap,t._ptLookup[b]=U={},cc[G.id]&&Ii.length&&_o(),H=S===m?b:S.indexOf(M),V&&(it=new V).init(M,z||R,t,H,S)!==!1&&(t._pt=O=new Je(t._pt,M,it.name,0,1,it.render,it,0,it.priority),it._props.forEach(function(q){U[q]=O}),it.priority&&(w=1)),!V||z)for(A in R)hn[A]&&(it=$p(A,R,t,H,M,S))?it.priority&&(w=1):U[A]=O=su.call(t,M,A,"get",R[A],H,S,0,r.stringFilter);t._op&&t._op[b]&&t.kill(M,t._op[b]),v&&t._pt&&(bi=t,ue.killTweensOf(M,U,t.globalTime(e)),Y=!t.parent,bi=0),t._pt&&l&&(cc[G.id]=1)}w&&em(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!Y,h&&e<=0&&T.render(Cn,!0,!0)},Sv=function(t,e,n,r,s,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,f,h,p;if(!c)for(c=t._ptCache[e]=[],h=t._ptLookup,p=t._targets.length;p--;){if(u=h[p][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return mc=1,t.vars[e]="+=0",au(t,o),mc=0,l?ta(e+" not eligible for reset"):1;c.push(u)}for(p=c.length;p--;)f=c[p],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,f.e&&(f.e=ve(n)+He(f.e)),f.b&&(f.b=u.s+He(f.b))},Ev=function(t,e){var n=t[0]?hr(t[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return e;s=_s({},e);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Tv=function(t,e,n,r){var s=e.ease||r||"power1.inOut",a,o;if(Ge(e))o=n[t]||(n[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},qs=function(t,e,n,r,s){return me(t)?t.call(e,n,r,s):Ie(t)&&~t.indexOf("random(")?na(t):t},Kp=nu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Zp={};Ze(Kp+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Zp[i]=1});var Ee=function(i){mp(t,i);function t(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:Xs(r))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,p=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,d=l.yoyoEase,S=r.parent||ue,v=(Ge(n)||gp(n)?fi(n[0]):"length"in r)?[n]:Pn(n),T,R,b,A,O,M,w,G;if(o._targets=v.length?iu(v):ta("GSAP target "+n+" not found. https://gsap.com",!vn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=p,g||h||Ea(c)||Ea(u)){if(r=o.vars,T=o.timeline=new je({data:"nested",defaults:_||{},targets:S&&S.data==="nested"?S.vars.targets:v}),T.kill(),T.parent=T._dp=si(o),T._start=0,h||Ea(c)||Ea(u)){if(A=v.length,w=h&&Np(h),Kn(h))for(O in h)~Kp.indexOf(O)&&(G||(G={}),G[O]=h[O]);for(R=0;R<A;R++)b=go(r,Zp),b.stagger=0,d&&(b.yoyoEase=d),G&&_s(b,G),M=v[R],b.duration=+qs(c,si(o),R,M,v),b.delay=(+qs(u,si(o),R,M,v)||0)-o._delay,!h&&A===1&&b.delay&&(o._delay=u=b.delay,o._start+=u,b.delay=0),T.to(M,b,w?w(R,M,v):0),T._ease=Jt.none;T.duration()?c=u=0:o.timeline=0}else if(g){Xs(yn(T.vars.defaults,{ease:"none"})),T._ease=pr(g.ease||r.ease||"none");var V=0,it,U,H;if(Ge(g))g.forEach(function(z){return T.to(v,z,">")}),T.duration();else{b={};for(O in g)O==="ease"||O==="easeEach"||Tv(O,g[O],b,g.easeEach);for(O in b)for(it=b[O].sort(function(z,Y){return z.t-Y.t}),V=0,R=0;R<it.length;R++)U=it[R],H={ease:U.e,duration:(U.t-(R?it[R-1].t:0))/100*c},H[O]=U.v,T.to(v,H,V),V+=H.duration;T.duration()<c&&T.to({},{duration:c-T.duration()})}}c||o.duration(c=T.duration())}else o.timeline=0;return p===!0&&!Kc&&(bi=si(o),ue.killTweensOf(v),bi=0),qn(S,si(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(f||!c&&!g&&o._start===Te(S._time)&&Ke(f)&&ev(si(o))&&S.data!=="nested")&&(o._tTime=-se,o.render(Math.max(0,-u)||0)),m&&Lp(si(o),m),o}var e=t.prototype;return e.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-se&&!u?l:r<se?0:r,h,p,g,_,m,d,S,v,T;if(!c)iv(this,r,s,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,v=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,a);if(h=Te(f%_),f===l?(g=this._repeat,h=c):(m=Te(f/_),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),d=this._yoyo&&g&1,d&&(T=this._yEase,h=c-h),m=gs(this._tTime,_),h===o&&!a&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(v&&this._yEase&&Yp(v,d),this.vars.repeatRefresh&&!d&&!this._lock&&h!==_&&this._initted&&(this._lock=a=1,this.render(Te(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Dp(this,u?r:h,a,s,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=S=(T||this._ease)(h/c),this._from&&(this.ratio=S=1-S),!o&&f&&!s&&!m&&(gn(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(S,p.d),p=p._next;v&&v.render(r<0?r:v._dur*v._ease(h/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&uc(this,r,s,a),gn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&gn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&uc(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&zi(this,1),!s&&!(u&&!o)&&(f||o||d)&&(gn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,a,o,l){ia||pn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||au(this,c),u=this._ease(c/this._dur),Sv(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Go(this,0),this.parent||Cp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?zs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ne),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,bi&&bi.vars.overwrite!==!0)._first||zs(this),this.parent&&a!==this.timeline.totalDuration()&&vs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?Pn(r):o,c=this._ptLookup,u=this._pt,f,h,p,g,_,m,d;if((!s||s==="all")&&Q0(o,l))return s==="all"&&(this._pt=0),zs(this);for(f=this._op=this._op||[],s!=="all"&&(Ie(s)&&(_={},Ze(s,function(S){return _[S]=1}),s=_),s=Ev(o,s)),d=o.length;d--;)if(~l.indexOf(o[d])){h=c[d],s==="all"?(f[d]=s,g=h,p={}):(p=f[d]=f[d]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&zo(this,m,"_pt"),delete h[_]),p!=="all"&&(p[_]=1)}return this._initted&&!this._pt&&u&&zs(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return Ys(1,arguments)},t.delayedCall=function(r,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(r,s,a){return Ys(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,a){return ue.killTweensOf(r,s,a)},t}(ra);yn(Ee.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ze("staggerTo,staggerFrom,staggerFromTo",function(i){Ee[i]=function(){var t=new je,e=hc.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var ou=function(t,e,n){return t[e]=n},Jp=function(t,e,n){return t[e](n)},bv=function(t,e,n,r){return t[e](r.fp,n)},Av=function(t,e,n){return t.setAttribute(e,n)},lu=function(t,e){return me(t[e])?Jp:Zc(t[e])&&t.setAttribute?Av:ou},Qp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},wv=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},tm=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},cu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Rv=function(t,e,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(t,e,n),s=a},Cv=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?zo(this,e,"_pt"):e.dep||(n=1),e=r;return!n},Pv=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},em=function(t){for(var e=t._pt,n,r,s,a;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:a)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:a=e,e=n}t._pt=s},Je=function(){function i(e,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||Qp,this.d=l||this,this.set=c||ou,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=Pv,this.m=n,this.mt=s,this.tween=r},i}();Ze(nu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return eu[i]=1});Mn.TweenMax=Mn.TweenLite=Ee;Mn.TimelineLite=Mn.TimelineMax=je;ue=new je({sortChildren:!1,defaults:ms,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});vn.stringFilter=Wp;var mr=[],ao={},Lv=[],df=0,Dv=0,hl=function(t){return(ao[t]||Lv).map(function(e){return e()})},_c=function(){var t=Date.now(),e=[];t-df>2&&(hl("matchMediaInit"),mr.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=Vn.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&e.push(n))}),hl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),df=t,hl("matchMedia"))},nm=function(){function i(e,n){this.selector=n&&dc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Dv++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){me(n)&&(s=r,r=n,n=me);var a=this,o=function(){var c=oe,u=a.selector,f;return c&&c!==a&&c.data.push(a),s&&(a.selector=dc(s)),oe=a,f=r.apply(a,arguments),me(f)&&a._r.push(f),oe=c,a.selector=u,a.isReverted=!1,f};return a.last=o,n===me?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},t.ignore=function(n){var r=oe;oe=null,n(this),oe=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Ee&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof je?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ee)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=mr.length;a--;)mr[a].id===this.id&&mr.splice(a,1)},t.revert=function(n){this.kill(n||{})},i}(),Iv=function(){function i(e){this.contexts=[],this.scope=e,oe&&oe.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){Kn(n)||(n={matches:n});var a=new nm(0,s||this.scope),o=a.conditions={},l,c,u;oe&&!a.selector&&(a.selector=oe.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=Vn.matchMedia(n[c]),l&&(mr.indexOf(a)<0&&mr.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(_c):l.addEventListener("change",_c)));return u&&r(a,function(f){return a.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),xo={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Gp(r)})},timeline:function(t){return new je(t)},getTweensOf:function(t,e){return ue.getTweensOf(t,e)},getProperty:function(t,e,n,r){Ie(t)&&(t=Pn(t)[0]);var s=hr(t||{}).get,a=n?Rp:wp;return n==="native"&&(n=""),t&&(e?a((hn[e]&&hn[e].get||s)(t,e,n,r)):function(o,l,c){return a((hn[o]&&hn[o].get||s)(t,o,l,c))})},quickSetter:function(t,e,n){if(t=Pn(t),t.length>1){var r=t.map(function(u){return an.quickSetter(u,e,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}t=t[0]||{};var a=hn[e],o=hr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var f=new a;es._pt=0,f.init(t,n?u+n:u,es,0,[t]),f.render(1,f),es._pt&&cu(1,es)}:o.set(t,l);return a?c:function(u){return c(t,l,n?u+n:u,o,1)}},quickTo:function(t,e,n){var r,s=an.to(t,yn((r={},r[e]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(e,l,c,u)};return a.tween=s,a},isTweening:function(t){return ue.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=pr(t.ease,ms.ease)),lf(ms,t||{})},config:function(t){return lf(vn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,a=t.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!hn[o]&&!Mn[o]&&ta(e+" effect requires "+o+" plugin.")}),ll[e]=function(o,l,c){return n(Pn(o),yn(l||{},s),c)},a&&(je.prototype[e]=function(o,l,c){return this.add(ll[e](o,Kn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){Jt[t]=pr(e)},parseEase:function(t,e){return arguments.length?pr(t,e):Jt},getById:function(t){return ue.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new je(t),r,s;for(n.smoothChildTiming=Ke(t.smoothChildTiming),ue.remove(n),n._dp=0,n._time=n._tTime=ue._time,r=ue._first;r;)s=r._next,(e||!(!r._dur&&r instanceof Ee&&r.vars.onComplete===r._targets[0]))&&qn(n,r,r._start-r._delay),r=s;return qn(ue,n,0),n},context:function(t,e){return t?new nm(t,e):oe},matchMedia:function(t){return new Iv(t)},matchMediaRefresh:function(){return mr.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||_c()},addEventListener:function(t,e){var n=ao[t]||(ao[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=ao[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:fv,wrapYoyo:hv,distribute:Np,random:Fp,snap:Op,normalize:uv,getUnit:He,clamp:av,splitColor:kp,toArray:Pn,selector:dc,mapRange:zp,pipe:lv,unitize:cv,interpolate:dv,shuffle:Up},install:Sp,effects:ll,ticker:pn,updateRoot:je.updateRoot,plugins:hn,globalTimeline:ue,core:{PropTween:Je,globals:Ep,Tween:Ee,Timeline:je,Animation:ra,getCache:hr,_removeLinkedListItem:zo,reverting:function(){return Ne},context:function(t){return t&&oe&&(oe.data.push(t),t._ctx=oe),oe},suppressOverwrites:function(t){return Kc=t}}};Ze("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return xo[i]=Ee[i]});pn.add(je.updateRoot);es=xo.to({},{duration:0});var Uv=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Nv=function(t,e){var n=t._targets,r,s,a;for(r in e)for(s=n.length;s--;)a=t._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=Uv(a,r)),a&&a.modifier&&a.modifier(e[r],t,n[s],r))},dl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(Ie(s)&&(l={},Ze(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}Nv(o,s)}}}},an=xo.registerPlugin({name:"attr",init:function(t,e,n,r,s){var a,o,l;this.tween=n;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ne?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},dl("roundProps",pc),dl("modifiers"),dl("snap",Op))||xo;Ee.version=je.version=an.version="3.13.0";yp=1;Jc()&&xs();Jt.Power0;Jt.Power1;Jt.Power2;Jt.Power3;Jt.Power4;Jt.Linear;Jt.Quad;Jt.Cubic;Jt.Quart;Jt.Quint;Jt.Strong;Jt.Elastic;Jt.Back;Jt.SteppedEase;Jt.Bounce;Jt.Sine;Jt.Expo;Jt.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var pf,Ai,cs,uu,lr,mf,fu,Ov=function(){return typeof window<"u"},hi={},nr=180/Math.PI,us=Math.PI/180,Pr=Math.atan2,_f=1e8,hu=/([A-Z])/g,Fv=/(left|right|width|margin|padding|x)/i,Bv=/[\s,\(]\S/,$n={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},gc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},zv=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Hv=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Gv=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},im=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},rm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},kv=function(t,e,n){return t.style[e]=n},Vv=function(t,e,n){return t.style.setProperty(e,n)},Wv=function(t,e,n){return t._gsap[e]=n},Xv=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},Yv=function(t,e,n,r,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},qv=function(t,e,n,r,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},fe="transform",Qe=fe+"Origin",jv=function i(t,e){var n=this,r=this.target,s=r.style,a=r._gsap;if(t in hi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=$n[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=ai(r,o)}):this.tfm[t]=a.x?a[t]:ai(r,t),t===Qe&&(this.tfm.zOrigin=a.zOrigin);else return $n.transform.split(",").forEach(function(o){return i.call(n,o,e)});if(this.props.indexOf(fe)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Qe,e,"")),t=fe}(s||e)&&this.props.push(t,e,s[t])},sm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},$v=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(hu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=fu(),(!s||!s.isStart)&&!n[fe]&&(sm(n),r.zOrigin&&n[Qe]&&(n[Qe]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},am=function(t,e){var n={target:t,props:[],revert:$v,save:jv};return t._gsap||an.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(r){return n.save(r)}),n},om,vc=function(t,e){var n=Ai.createElementNS?Ai.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ai.createElement(t);return n&&n.style?n:Ai.createElement(t)},Ln=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(hu,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,Ms(e)||e,1)||""},gf="O,Moz,ms,Ms,Webkit".split(","),Ms=function(t,e,n){var r=e||lr,s=r.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(gf[a]+t in s););return a<0?null:(a===3?"ms":a>=0?gf[a]:"")+t},xc=function(){Ov()&&window.document&&(pf=window,Ai=pf.document,cs=Ai.documentElement,lr=vc("div")||{style:{}},vc("div"),fe=Ms(fe),Qe=fe+"Origin",lr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",om=!!Ms("perspective"),fu=an.core.reverting,uu=1)},vf=function(t){var e=t.ownerSVGElement,n=vc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=t.cloneNode(!0),s;r.style.display="block",n.appendChild(r),cs.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),cs.removeChild(n),s},xf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},lm=function(t){var e,n;try{e=t.getBBox()}catch{e=vf(t),n=1}return e&&(e.width||e.height)||n||(e=vf(t)),e&&!e.width&&!e.x&&!e.y?{x:+xf(t,["x","cx","x1"])||0,y:+xf(t,["y","cy","y1"])||0,width:0,height:0}:e},cm=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&lm(t))},Sr=function(t,e){if(e){var n=t.style,r;e in hi&&e!==Qe&&(e=fe),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(hu,"-$1").toLowerCase())):n.removeAttribute(e)}},wi=function(t,e,n,r,s,a){var o=new Je(t._pt,e,n,0,1,a?rm:im);return t._pt=o,o.b=r,o.e=s,t._props.push(n),o},Mf={deg:1,rad:1,turn:1},Kv={grid:1,flex:1},Hi=function i(t,e,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=lr.style,l=Fv.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",p=r==="%",g,_,m,d;if(r===a||!s||Mf[r]||Mf[a])return s;if(a!=="px"&&!h&&(s=i(t,e,n,"px")),d=t.getCTM&&cm(t),(p||a==="%")&&(hi[e]||~e.indexOf("adius")))return g=d?t.getBBox()[l?"width":"height"]:t[u],ve(p?s/g*f:s/100*g);if(o[l?"width":"height"]=f+(h?a:r),_=r!=="rem"&&~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,d&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Ai||!_.appendChild)&&(_=Ai.body),m=_._gsap,m&&p&&m.width&&l&&m.time===pn.time&&!m.uncache)return ve(s/m.width*f);if(p&&(e==="height"||e==="width")){var S=t.style[e];t.style[e]=f+r,g=t[u],S?t.style[e]=S:Sr(t,e)}else(p||a==="%")&&!Kv[Ln(_,"display")]&&(o.position=Ln(t,"position")),_===t&&(o.position="static"),_.appendChild(lr),g=lr[u],_.removeChild(lr),o.position="absolute";return l&&p&&(m=hr(_),m.time=pn.time,m.width=_[u]),ve(h?g*s/f:g&&s?f/g*s:0)},ai=function(t,e,n,r){var s;return uu||xc(),e in $n&&e!=="transform"&&(e=$n[e],~e.indexOf(",")&&(e=e.split(",")[0])),hi[e]&&e!=="transform"?(s=aa(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:yo(Ln(t,Qe))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Mo[e]&&Mo[e](t,e,n)||Ln(t,e)||bp(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Hi(t,e,s,n)+n:s},Zv=function(t,e,n,r){if(!n||n==="none"){var s=Ms(e,t,1),a=s&&Ln(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=Ln(t,"borderTopColor"))}var o=new Je(this._pt,t.style,e,0,1,tm),l=0,c=0,u,f,h,p,g,_,m,d,S,v,T,R;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Ln(t,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=t.style[e],t.style[e]=r,r=Ln(t,e)||r,_?t.style[e]=_:Sr(t,e)),u=[n,r],Wp(u),n=u[0],r=u[1],h=n.match(ts)||[],R=r.match(ts)||[],R.length){for(;f=ts.exec(r);)m=f[0],S=r.substring(l,f.index),g?g=(g+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(p=parseFloat(_)||0,T=_.substr((p+"").length),m.charAt(1)==="="&&(m=ls(p,m)+T),d=parseFloat(m),v=m.substr((d+"").length),l=ts.lastIndex-v.length,v||(v=v||vn.units[e]||T,l===r.length&&(r+=v,o.e+=v)),T!==v&&(p=Hi(t,e,_,v)||0),o._pt={_next:o._pt,p:S||c===1?S:",",s:p,c:d-p,m:g&&g<4||e==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=e==="display"&&r==="none"?rm:im;return xp.test(r)&&(o.e=0),this._pt=o,o},yf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Jv=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=yf[n]||n,e[1]=yf[r]||r,e.join(" ")},Qv=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],hi[o]&&(l=1,o=o==="transformOrigin"?Qe:fe),Sr(n,o);l&&(Sr(n,fe),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",aa(n,1),a.uncache=1,sm(r)))}},Mo={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var a=t._pt=new Je(t._pt,e,n,0,0,Qv);return a.u=r,a.pr=-10,a.tween=s,t._props.push(n),1}}},sa=[1,0,0,1,0,0],um={},fm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Sf=function(t){var e=Ln(t,fe);return fm(e)?sa:e.substr(7).match(vp).map(ve)},du=function(t,e){var n=t._gsap||hr(t),r=t.style,s=Sf(t),a,o,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?sa:s):(s===sa&&!t.offsetParent&&t!==cs&&!n.svg&&(l=r.display,r.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,cs.appendChild(t)),s=Sf(t),l?r.display=l:Sr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):cs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Mc=function(t,e,n,r,s,a){var o=t._gsap,l=s||du(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,p=l[0],g=l[1],_=l[2],m=l[3],d=l[4],S=l[5],v=e.split(" "),T=parseFloat(v[0])||0,R=parseFloat(v[1])||0,b,A,O,M;n?l!==sa&&(A=p*m-g*_)&&(O=T*(m/A)+R*(-_/A)+(_*S-m*d)/A,M=T*(-g/A)+R*(p/A)-(p*S-g*d)/A,T=O,R=M):(b=lm(t),T=b.x+(~v[0].indexOf("%")?T/100*b.width:T),R=b.y+(~(v[1]||v[0]).indexOf("%")?R/100*b.height:R)),r||r!==!1&&o.smooth?(d=T-c,S=R-u,o.xOffset=f+(d*p+S*_)-d,o.yOffset=h+(d*g+S*m)-S):o.xOffset=o.yOffset=0,o.xOrigin=T,o.yOrigin=R,o.smooth=!!r,o.origin=e,o.originIsAbsolute=!!n,t.style[Qe]="0px 0px",a&&(wi(a,o,"xOrigin",c,T),wi(a,o,"yOrigin",u,R),wi(a,o,"xOffset",f,o.xOffset),wi(a,o,"yOffset",h,o.yOffset)),t.setAttribute("data-svg-origin",T+" "+R)},aa=function(t,e){var n=t._gsap||new jp(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Ln(t,Qe)||"0",u,f,h,p,g,_,m,d,S,v,T,R,b,A,O,M,w,G,V,it,U,H,z,Y,q,rt,at,dt,ft,et,I,Z;return u=f=h=_=m=d=S=v=T=0,p=g=1,n.svg=!!(t.getCTM&&cm(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[fe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[fe]!=="none"?l[fe]:"")),r.scale=r.rotate=r.translate="none"),A=du(t,n.svg),n.svg&&(n.uncache?(q=t.getBBox(),c=n.xOrigin-q.x+"px "+(n.yOrigin-q.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),Mc(t,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,A)),R=n.xOrigin||0,b=n.yOrigin||0,A!==sa&&(G=A[0],V=A[1],it=A[2],U=A[3],u=H=A[4],f=z=A[5],A.length===6?(p=Math.sqrt(G*G+V*V),g=Math.sqrt(U*U+it*it),_=G||V?Pr(V,G)*nr:0,S=it||U?Pr(it,U)*nr+_:0,S&&(g*=Math.abs(Math.cos(S*us))),n.svg&&(u-=R-(R*G+b*it),f-=b-(R*V+b*U))):(Z=A[6],et=A[7],at=A[8],dt=A[9],ft=A[10],I=A[11],u=A[12],f=A[13],h=A[14],O=Pr(Z,ft),m=O*nr,O&&(M=Math.cos(-O),w=Math.sin(-O),Y=H*M+at*w,q=z*M+dt*w,rt=Z*M+ft*w,at=H*-w+at*M,dt=z*-w+dt*M,ft=Z*-w+ft*M,I=et*-w+I*M,H=Y,z=q,Z=rt),O=Pr(-it,ft),d=O*nr,O&&(M=Math.cos(-O),w=Math.sin(-O),Y=G*M-at*w,q=V*M-dt*w,rt=it*M-ft*w,I=U*w+I*M,G=Y,V=q,it=rt),O=Pr(V,G),_=O*nr,O&&(M=Math.cos(O),w=Math.sin(O),Y=G*M+V*w,q=H*M+z*w,V=V*M-G*w,z=z*M-H*w,G=Y,H=q),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,d=180-d),p=ve(Math.sqrt(G*G+V*V+it*it)),g=ve(Math.sqrt(z*z+Z*Z)),O=Pr(H,z),S=Math.abs(O)>2e-4?O*nr:0,T=I?1/(I<0?-I:I):0),n.svg&&(Y=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!fm(Ln(t,fe)),Y&&t.setAttribute("transform",Y))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(p*=-1,S+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,S+=S<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=ve(p),n.scaleY=ve(g),n.rotation=ve(_)+o,n.rotationX=ve(m)+o,n.rotationY=ve(d)+o,n.skewX=S+o,n.skewY=v+o,n.transformPerspective=T+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[Qe]=yo(c)),n.xOffset=n.yOffset=0,n.force3D=vn.force3D,n.renderTransform=n.svg?ex:om?hm:tx,n.uncache=0,n},yo=function(t){return(t=t.split(" "))[0]+" "+t[1]},pl=function(t,e,n){var r=He(e);return ve(parseFloat(e)+parseFloat(Hi(t,"x",n+"px",r)))+r},tx=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,hm(t,e)},Ki="0deg",Ps="0px",Zi=") ",hm=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,p=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,d=n.force3D,S=n.target,v=n.zOrigin,T="",R=d==="auto"&&t&&t!==1||d===!0;if(v&&(f!==Ki||u!==Ki)){var b=parseFloat(u)*us,A=Math.sin(b),O=Math.cos(b),M;b=parseFloat(f)*us,M=Math.cos(b),a=pl(S,a,A*M*-v),o=pl(S,o,-Math.sin(b)*-v),l=pl(S,l,O*M*-v+v)}m!==Ps&&(T+="perspective("+m+Zi),(r||s)&&(T+="translate("+r+"%, "+s+"%) "),(R||a!==Ps||o!==Ps||l!==Ps)&&(T+=l!==Ps||R?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Zi),c!==Ki&&(T+="rotate("+c+Zi),u!==Ki&&(T+="rotateY("+u+Zi),f!==Ki&&(T+="rotateX("+f+Zi),(h!==Ki||p!==Ki)&&(T+="skew("+h+", "+p+Zi),(g!==1||_!==1)&&(T+="scale("+g+", "+_+Zi),S.style[fe]=T||"translate(0, 0)"},ex=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,p=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,d=n.yOffset,S=n.forceCSS,v=parseFloat(a),T=parseFloat(o),R,b,A,O,M;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=us,c*=us,R=Math.cos(l)*f,b=Math.sin(l)*f,A=Math.sin(l-c)*-h,O=Math.cos(l-c)*h,c&&(u*=us,M=Math.tan(c-u),M=Math.sqrt(1+M*M),A*=M,O*=M,u&&(M=Math.tan(u),M=Math.sqrt(1+M*M),R*=M,b*=M)),R=ve(R),b=ve(b),A=ve(A),O=ve(O)):(R=f,O=h,b=A=0),(v&&!~(a+"").indexOf("px")||T&&!~(o+"").indexOf("px"))&&(v=Hi(p,"x",a,"px"),T=Hi(p,"y",o,"px")),(g||_||m||d)&&(v=ve(v+g-(g*R+_*A)+m),T=ve(T+_-(g*b+_*O)+d)),(r||s)&&(M=p.getBBox(),v=ve(v+r/100*M.width),T=ve(T+s/100*M.height)),M="matrix("+R+","+b+","+A+","+O+","+v+","+T+")",p.setAttribute("transform",M),S&&(p.style[fe]=M)},nx=function(t,e,n,r,s){var a=360,o=Ie(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?nr:1),c=l-r,u=r+c+"deg",f,h;return o&&(f=s.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*_f)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*_f)%a-~~(c/a)*a)),t._pt=h=new Je(t._pt,e,n,r,c,zv),h.e=u,h.u="deg",t._props.push(n),h},Ef=function(t,e){for(var n in e)t[n]=e[n];return t},ix=function(t,e,n){var r=Ef({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,f,h,p,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[fe]=e,o=aa(n,1),Sr(n,fe),n.setAttribute("transform",c)):(c=getComputedStyle(n)[fe],a[fe]=e,o=aa(n,1),a[fe]=c);for(l in hi)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(p=He(c),g=He(u),f=p!==g?Hi(n,l,c,g):parseFloat(c),h=parseFloat(u),t._pt=new Je(t._pt,o,l,f,h-f,gc),t._pt.u=g||0,t._props.push(l));Ef(o,r)};Ze("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",a=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(o){return t<2?i+o:"border"+o+i});Mo[t>1?"border"+i:i]=function(o,l,c,u,f){var h,p;if(arguments.length<4)return h=a.map(function(g){return ai(o,g,c)}),p=h.join(" "),p.split(h[0]).length===5?h[0]:p;h=(u+"").split(" "),p={},a.forEach(function(g,_){return p[g]=h[_]=h[_]||h[(_-1)/2|0]}),o.init(l,p,f)}});var dm={name:"css",register:xc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var a=this._props,o=t.style,l=n.vars.startAt,c,u,f,h,p,g,_,m,d,S,v,T,R,b,A,O;uu||xc(),this.styles=this.styles||am(t),O=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(hn[_]&&$p(_,e,n,r,t,s)))){if(p=typeof u,g=Mo[_],p==="function"&&(u=u.call(n,r,t,s),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=na(u)),g)g(this,t,_,u,n)&&(A=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",Ui.lastIndex=0,Ui.test(c)||(m=He(c),d=He(u)),d?m!==d&&(c=Hi(t,_,c,d)+d):m&&(u+=m),this.add(o,"setProperty",c,u,r,s,0,0,_),a.push(_),O.push(_,0,o[_]);else if(p!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,t,s):l[_],Ie(c)&&~c.indexOf("random(")&&(c=na(c)),He(c+"")||c==="auto"||(c+=vn.units[_]||He(ai(t,_))||""),(c+"").charAt(1)==="="&&(c=ai(t,_))):c=ai(t,_),h=parseFloat(c),S=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),f=parseFloat(u),_ in $n&&(_==="autoAlpha"&&(h===1&&ai(t,"visibility")==="hidden"&&f&&(h=0),O.push("visibility",0,o.visibility),wi(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=$n[_],~_.indexOf(",")&&(_=_.split(",")[0]))),v=_ in hi,v){if(this.styles.save(_),p==="string"&&u.substring(0,6)==="var(--"&&(u=Ln(t,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),T||(R=t._gsap,R.renderTransform&&!e.parseTransform||aa(t,e.parseTransform),b=e.smoothOrigin!==!1&&R.smooth,T=this._pt=new Je(this._pt,o,fe,0,1,R.renderTransform,R,0,-1),T.dep=1),_==="scale")this._pt=new Je(this._pt,R,"scaleY",R.scaleY,(S?ls(R.scaleY,S+f):f)-R.scaleY||0,gc),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){O.push(Qe,0,o[Qe]),u=Jv(u),R.svg?Mc(t,u,0,b,0,this):(d=parseFloat(u.split(" ")[2])||0,d!==R.zOrigin&&wi(this,R,"zOrigin",R.zOrigin,d),wi(this,o,_,yo(c),yo(u)));continue}else if(_==="svgOrigin"){Mc(t,u,1,b,0,this);continue}else if(_ in um){nx(this,R,_,h,S?ls(h,S+u):u);continue}else if(_==="smoothOrigin"){wi(this,R,"smooth",R.smooth,u);continue}else if(_==="force3D"){R[_]=u;continue}else if(_==="transform"){ix(this,u,t);continue}}else _ in o||(_=Ms(_)||_);if(v||(f||f===0)&&(h||h===0)&&!Bv.test(u)&&_ in o)m=(c+"").substr((h+"").length),f||(f=0),d=He(u)||(_ in vn.units?vn.units[_]:m),m!==d&&(h=Hi(t,_,c,d)),this._pt=new Je(this._pt,v?R:o,_,h,(S?ls(h,S+f):f)-h,!v&&(d==="px"||_==="zIndex")&&e.autoRound!==!1?Gv:gc),this._pt.u=d||0,m!==d&&d!=="%"&&(this._pt.b=c,this._pt.r=Hv);else if(_ in o)Zv.call(this,t,_,c,S?S+u:u);else if(_ in t)this.add(t,_,c||t[_],S?S+u:u,r,s);else if(_!=="parseTransform"){tu(_,u);continue}v||(_ in o?O.push(_,0,o[_]):typeof t[_]=="function"?O.push(_,2,t[_]()):O.push(_,1,c||t[_])),a.push(_)}}A&&em(this)},render:function(t,e){if(e.tween._time||!fu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:ai,aliases:$n,getSetter:function(t,e,n){var r=$n[e];return r&&r.indexOf(",")<0&&(e=r),e in hi&&e!==Qe&&(t._gsap.x||ai(t,"x"))?n&&mf===n?e==="scale"?Xv:Wv:(mf=n||{})&&(e==="scale"?Yv:qv):t.style&&!Zc(t.style[e])?kv:~e.indexOf("-")?Vv:lu(t,e)},core:{_removeProperty:Sr,_getMatrix:du}};an.utils.checkPrefix=Ms;an.core.getStyleSaver=am;(function(i,t,e,n){var r=Ze(i+","+t+","+e,function(s){hi[s]=1});Ze(t,function(s){vn.units[s]="deg",um[s]=1}),$n[r[13]]=i+","+t,Ze(n,function(s){var a=s.split(":");$n[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ze("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){vn.units[i]="px"});an.registerPlugin(dm);var Qr=an.registerPlugin(dm)||an;Qr.core.Tween;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pu="160",Lr={ROTATE:0,DOLLY:1,PAN:2},Dr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rx=0,Tf=1,sx=2,pm=1,ax=2,ii=3,Gi=0,tn=1,mn=2,Ni=0,fs=1,bf=2,Af=3,wf=4,ox=5,ar=100,lx=101,cx=102,Rf=103,Cf=104,ux=200,fx=201,hx=202,dx=203,yc=204,Sc=205,px=206,mx=207,_x=208,gx=209,vx=210,xx=211,Mx=212,yx=213,Sx=214,Ex=0,Tx=1,bx=2,So=3,Ax=4,wx=5,Rx=6,Cx=7,mm=0,Px=1,Lx=2,Oi=0,Dx=1,Ix=2,Ux=3,Nx=4,Ox=5,Fx=6,_m=300,ys=301,Ss=302,Ec=303,Tc=304,ko=306,bc=1e3,On=1001,Ac=1002,Xe=1003,Pf=1004,ml=1005,bn=1006,Bx=1007,oa=1008,Fi=1009,zx=1010,Hx=1011,mu=1012,gm=1013,Ri=1014,Ci=1015,la=1016,vm=1017,xm=1018,_r=1020,Gx=1021,Fn=1023,kx=1024,Vx=1025,gr=1026,Es=1027,Wx=1028,Mm=1029,Xx=1030,ym=1031,Sm=1033,_l=33776,gl=33777,vl=33778,xl=33779,Lf=35840,Df=35841,If=35842,Uf=35843,Em=36196,Nf=37492,Of=37496,Ff=37808,Bf=37809,zf=37810,Hf=37811,Gf=37812,kf=37813,Vf=37814,Wf=37815,Xf=37816,Yf=37817,qf=37818,jf=37819,$f=37820,Kf=37821,Ml=36492,Zf=36494,Jf=36495,Yx=36283,Qf=36284,th=36285,eh=36286,Tm=3e3,vr=3001,qx=3200,jx=3201,bm=0,$x=1,Rn="",Ue="srgb",di="srgb-linear",_u="display-p3",Vo="display-p3-linear",Eo="linear",ae="srgb",To="rec709",bo="p3",Ir=7680,nh=519,Kx=512,Zx=513,Jx=514,Am=515,Qx=516,tM=517,eM=518,nM=519,wc=35044,ih="300 es",Rc=1035,li=2e3,Ao=2001;class wr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oo=Math.PI/180,Cc=180/Math.PI;function Bi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Ye(i,t,e){return Math.max(t,Math.min(e,i))}function iM(i,t){return(i%t+t)%t}function yl(i,t,e){return(1-e)*i+e*t}function rh(i){return(i&i-1)===0&&i!==0}function Pc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function oi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const rM={DEG2RAD:oo};class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,r,s,a,o,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],p=n[5],g=n[8],_=r[0],m=r[3],d=r[6],S=r[1],v=r[4],T=r[7],R=r[2],b=r[5],A=r[8];return s[0]=a*_+o*S+l*R,s[3]=a*m+o*v+l*b,s[6]=a*d+o*T+l*A,s[1]=c*_+u*S+f*R,s[4]=c*m+u*v+f*b,s[7]=c*d+u*T+f*A,s[2]=h*_+p*S+g*R,s[5]=h*m+p*v+g*b,s[8]=h*d+p*T+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*s,p=c*s-a*l,g=e*f+n*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*c-u*n)*_,t[2]=(o*n-r*a)*_,t[3]=h*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Sl.makeScale(t,e)),this}rotate(t){return this.premultiply(Sl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Sl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Sl=new Yt;function wm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sM(){const i=wo("canvas");return i.style.display="block",i}const sh={};function js(i){i in sh||(sh[i]=!0,console.warn(i))}const ah=new Yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),oh=new Yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ta={[di]:{transfer:Eo,primaries:To,toReference:i=>i,fromReference:i=>i},[Ue]:{transfer:ae,primaries:To,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Vo]:{transfer:Eo,primaries:bo,toReference:i=>i.applyMatrix3(oh),fromReference:i=>i.applyMatrix3(ah)},[_u]:{transfer:ae,primaries:bo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(oh),fromReference:i=>i.applyMatrix3(ah).convertLinearToSRGB()}},aM=new Set([di,Vo]),ne={enabled:!0,_workingColorSpace:di,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!aM.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ta[t].toReference,r=Ta[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ta[i].primaries},getTransfer:function(i){return i===Rn?Eo:Ta[i].transfer}};function hs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function El(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ur;class Rm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ur===void 0&&(Ur=wo("canvas")),Ur.width=t.width,Ur.height=t.height;const n=Ur.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ur}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=hs(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hs(e[n]/255)*255):e[n]=hs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let oM=0;class Cm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:oM++}),this.uuid=Bi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Tl(r[a].image)):s.push(Tl(r[a]))}else s=Tl(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lM=0;class en extends wr{constructor(t=en.DEFAULT_IMAGE,e=en.DEFAULT_MAPPING,n=On,r=On,s=bn,a=oa,o=Fn,l=Fi,c=en.DEFAULT_ANISOTROPY,u=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lM++}),this.uuid=Bi(),this.name="",this.source=new Cm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===vr?Ue:Rn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_m)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bc:t.x=t.x-Math.floor(t.x);break;case On:t.x=t.x<0?0:1;break;case Ac:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bc:t.y=t.y-Math.floor(t.y);break;case On:t.y=t.y<0?0:1;break;case Ac:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ue?vr:Tm}set encoding(t){js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===vr?Ue:Rn}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=_m;en.DEFAULT_ANISOTROPY=1;class Le{constructor(t=0,e=0,n=0,r=1){Le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,T=(p+1)/2,R=(d+1)/2,b=(u+h)/4,A=(f+_)/4,O=(g+m)/4;return v>T&&v>R?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=b/n,s=A/n):T>R?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=b/r,s=O/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=A/s,r=O/s),this.set(n,r,s,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-_)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cM extends wr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);const r={width:t,height:e,depth:1};n.encoding!==void 0&&(js("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===vr?Ue:Rn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new en(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Cm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Er extends cM{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Pm extends en{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class uM extends en{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const h=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(o===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==p||u!==g){let m=1-o;const d=l*h+c*p+u*g+f*_,S=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const R=Math.sqrt(v),b=Math.atan2(R,d*S);m=Math.sin(m*b)/R,o=Math.sin(o*b)/R}const T=o*S;if(l=l*m+h*T,c=c*m+p*T,u=u*m+g*T,f=f*m+_*T,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+u*f+l*p-c*h,t[e+1]=l*g+u*h+c*f-o*p,t[e+2]=c*g+u*p+o*h-l*f,t[e+3]=u*g-o*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),h=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=a*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(r),n*Math.sin(s),n*Math.cos(s),e*Math.sin(r))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),f=2*(s*n-a*e);return this.x=e+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return bl.copy(this).projectOnVector(t),this.sub(bl)}reflect(t){return this.sub(bl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bl=new B,lh=new Tr;class da{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Dn):Dn.fromBufferAttribute(s,a),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ba.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ba.copy(n.boundingBox)),ba.applyMatrix4(t.matrixWorld),this.union(ba)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),Aa.subVectors(this.max,Ls),Nr.subVectors(t.a,Ls),Or.subVectors(t.b,Ls),Fr.subVectors(t.c,Ls),_i.subVectors(Or,Nr),gi.subVectors(Fr,Or),Ji.subVectors(Nr,Fr);let e=[0,-_i.z,_i.y,0,-gi.z,gi.y,0,-Ji.z,Ji.y,_i.z,0,-_i.x,gi.z,0,-gi.x,Ji.z,0,-Ji.x,-_i.y,_i.x,0,-gi.y,gi.x,0,-Ji.y,Ji.x,0];return!Al(e,Nr,Or,Fr,Aa)||(e=[1,0,0,0,1,0,0,0,1],!Al(e,Nr,Or,Fr,Aa))?!1:(wa.crossVectors(_i,gi),e=[wa.x,wa.y,wa.z],Al(e,Nr,Or,Fr,Aa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Jn=[new B,new B,new B,new B,new B,new B,new B,new B],Dn=new B,ba=new da,Nr=new B,Or=new B,Fr=new B,_i=new B,gi=new B,Ji=new B,Ls=new B,Aa=new B,wa=new B,Qi=new B;function Al(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Qi.fromArray(i,s);const o=r.x*Math.abs(Qi.x)+r.y*Math.abs(Qi.y)+r.z*Math.abs(Qi.z),l=t.dot(Qi),c=e.dot(Qi),u=n.dot(Qi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const fM=new da,Ds=new B,wl=new B;class Wo{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):fM.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);const e=Ds.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ds,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(wl)),this.expandByPoint(Ds.copy(t.center).sub(wl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new B,Rl=new B,Ra=new B,vi=new B,Cl=new B,Ca=new B,Pl=new B;class Xo{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Rl.copy(t).add(e).multiplyScalar(.5),Ra.copy(e).sub(t).normalize(),vi.copy(this.origin).sub(Rl);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ra),o=vi.dot(this.direction),l=-vi.dot(Ra),c=vi.lengthSq(),u=Math.abs(1-a*a);let f,h,p,g;if(u>0)if(f=a*l-o,h=a*o-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Rl).addScaledVector(Ra,h),p}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const n=Qn.dot(this.direction),r=Qn.dot(Qn)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,n,r,s){Cl.subVectors(e,t),Ca.subVectors(n,t),Pl.crossVectors(Cl,Ca);let a=this.direction.dot(Pl),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;vi.subVectors(this.origin,t);const l=o*this.direction.dot(Ca.crossVectors(vi,Ca));if(l<0)return null;const c=o*this.direction.dot(Cl.cross(vi));if(c<0||l+c>a)return null;const u=-o*vi.dot(Pl);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,r,s,a,o,l,c,u,f,h,p,g,_,m){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,f,h,p,g,_,m)}set(t,e,n,r,s,a,o,l,c,u,f,h,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Br.setFromMatrixColumn(t,0).length(),s=1/Br.setFromMatrixColumn(t,1).length(),a=1/Br.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=a*u,p=a*f,g=o*u,_=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=h-_*c,e[9]=-o*l,e[2]=_-h*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=_+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h-_*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=_-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,p=a*f,g=o*u,_=o*f;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+p,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=a*u,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hM,t,dM)}lookAt(t,e,n){const r=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),xi.crossVectors(n,cn),xi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),xi.crossVectors(n,cn)),xi.normalize(),Pa.crossVectors(cn,xi),r[0]=xi.x,r[4]=Pa.x,r[8]=cn.x,r[1]=xi.y,r[5]=Pa.y,r[9]=cn.y,r[2]=xi.z,r[6]=Pa.z,r[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],S=n[3],v=n[7],T=n[11],R=n[15],b=r[0],A=r[4],O=r[8],M=r[12],w=r[1],G=r[5],V=r[9],it=r[13],U=r[2],H=r[6],z=r[10],Y=r[14],q=r[3],rt=r[7],at=r[11],dt=r[15];return s[0]=a*b+o*w+l*U+c*q,s[4]=a*A+o*G+l*H+c*rt,s[8]=a*O+o*V+l*z+c*at,s[12]=a*M+o*it+l*Y+c*dt,s[1]=u*b+f*w+h*U+p*q,s[5]=u*A+f*G+h*H+p*rt,s[9]=u*O+f*V+h*z+p*at,s[13]=u*M+f*it+h*Y+p*dt,s[2]=g*b+_*w+m*U+d*q,s[6]=g*A+_*G+m*H+d*rt,s[10]=g*O+_*V+m*z+d*at,s[14]=g*M+_*it+m*Y+d*dt,s[3]=S*b+v*w+T*U+R*q,s[7]=S*A+v*G+T*H+R*rt,s[11]=S*O+v*V+T*z+R*at,s[15]=S*M+v*it+T*Y+R*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*l*f-r*c*f-s*o*h+n*c*h+r*o*p-n*l*p)+_*(+e*l*p-e*c*h+s*a*h-r*a*p+r*c*u-s*l*u)+m*(+e*c*f-e*o*p-s*a*f+n*a*p+s*o*u-n*c*u)+d*(-r*o*u-e*l*f+e*o*h+r*a*f-n*a*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],S=f*m*c-_*h*c+_*l*p-o*m*p-f*l*d+o*h*d,v=g*h*c-u*m*c-g*l*p+a*m*p+u*l*d-a*h*d,T=u*_*c-g*f*c+g*o*p-a*_*p-u*o*d+a*f*d,R=g*f*l-u*_*l-g*o*h+a*_*h+u*o*m-a*f*m,b=e*S+n*v+r*T+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=S*A,t[1]=(_*h*s-f*m*s-_*r*p+n*m*p+f*r*d-n*h*d)*A,t[2]=(o*m*s-_*l*s+_*r*c-n*m*c-o*r*d+n*l*d)*A,t[3]=(f*l*s-o*h*s-f*r*c+n*h*c+o*r*p-n*l*p)*A,t[4]=v*A,t[5]=(u*m*s-g*h*s+g*r*p-e*m*p-u*r*d+e*h*d)*A,t[6]=(g*l*s-a*m*s-g*r*c+e*m*c+a*r*d-e*l*d)*A,t[7]=(a*h*s-u*l*s+u*r*c-e*h*c-a*r*p+e*l*p)*A,t[8]=T*A,t[9]=(g*f*s-u*_*s-g*n*p+e*_*p+u*n*d-e*f*d)*A,t[10]=(a*_*s-g*o*s+g*n*c-e*_*c-a*n*d+e*o*d)*A,t[11]=(u*o*s-a*f*s-u*n*c+e*f*c+a*n*p-e*o*p)*A,t[12]=R*A,t[13]=(u*_*r-g*f*r+g*n*h-e*_*h-u*n*m+e*f*m)*A,t[14]=(g*o*r-a*_*r-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*f*r-u*o*r+u*n*l-e*f*l-a*n*h+e*o*h)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,f=o+o,h=s*c,p=s*u,g=s*f,_=a*u,m=a*f,d=o*f,S=l*c,v=l*u,T=l*f,R=n.x,b=n.y,A=n.z;return r[0]=(1-(_+d))*R,r[1]=(p+T)*R,r[2]=(g-v)*R,r[3]=0,r[4]=(p-T)*b,r[5]=(1-(h+d))*b,r[6]=(m+S)*b,r[7]=0,r[8]=(g+v)*A,r[9]=(m-S)*A,r[10]=(1-(h+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Br.set(r[0],r[1],r[2]).length();const a=Br.set(r[4],r[5],r[6]).length(),o=Br.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],In.copy(this);const c=1/s,u=1/a,f=1/o;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=u,In.elements[5]*=u,In.elements[6]*=u,In.elements[8]*=f,In.elements[9]*=f,In.elements[10]*=f,e.setFromRotationMatrix(In),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=li){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),h=(n+r)/(n-r);let p,g;if(o===li)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Ao)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=li){const l=this.elements,c=1/(e-t),u=1/(n-r),f=1/(a-s),h=(e+t)*c,p=(n+r)*u;let g,_;if(o===li)g=(a+s)*f,_=-2*f;else if(o===Ao)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Br=new B,In=new xe,hM=new B(0,0,0),dM=new B(1,1,1),xi=new B,Pa=new B,cn=new B,ch=new xe,uh=new Tr;class Yo{constructor(t=0,e=0,n=0,r=Yo.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ch.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ch,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uh.setFromEuler(this),this.setFromQuaternion(uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yo.DEFAULT_ORDER="XYZ";class gu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pM=0;const fh=new B,zr=new Tr,ti=new xe,La=new B,Is=new B,mM=new B,_M=new Tr,hh=new B(1,0,0),dh=new B(0,1,0),ph=new B(0,0,1),gM={type:"added"},vM={type:"removed"};class De extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pM++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new B,e=new Yo,n=new Tr,r=new B(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xe},normalMatrix:{value:new Yt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zr.setFromAxisAngle(t,e),this.quaternion.multiply(zr),this}rotateOnWorldAxis(t,e){return zr.setFromAxisAngle(t,e),this.quaternion.premultiply(zr),this}rotateX(t){return this.rotateOnAxis(hh,t)}rotateY(t){return this.rotateOnAxis(dh,t)}rotateZ(t){return this.rotateOnAxis(ph,t)}translateOnAxis(t,e){return fh.copy(t).applyQuaternion(this.quaternion),this.position.add(fh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hh,t)}translateY(t){return this.translateOnAxis(dh,t)}translateZ(t){return this.translateOnAxis(ph,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?La.copy(t):La.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Is,La,this.up):ti.lookAt(La,Is,this.up),this.quaternion.setFromRotationMatrix(ti),r&&(ti.extractRotation(r.matrixWorld),zr.setFromRotationMatrix(ti),this.quaternion.premultiply(zr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(gM)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vM)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(ti),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,mM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,_M,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}De.DEFAULT_UP=new B(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new B,ei=new B,Ll=new B,ni=new B,Hr=new B,Gr=new B,mh=new B,Dl=new B,Il=new B,Ul=new B;let Da=!1;class An{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Un.subVectors(t,e),r.cross(Un);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Un.subVectors(r,e),ei.subVectors(n,e),Ll.subVectors(t,e);const a=Un.dot(Un),o=Un.dot(ei),l=Un.dot(Ll),c=ei.dot(ei),u=ei.dot(Ll),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,g=(a*u-o*l)*h;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getUV(t,e,n,r,s,a,o,l){return Da===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Da=!0),this.getInterpolation(t,e,n,r,s,a,o,l)}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ni.x),l.addScaledVector(a,ni.y),l.addScaledVector(o,ni.z),l)}static isFrontFacing(t,e,n,r){return Un.subVectors(n,e),ei.subVectors(t,e),Un.cross(ei).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Un.cross(ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return An.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return An.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,r,s){return Da===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Da=!0),An.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}getInterpolation(t,e,n,r,s){return An.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return An.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return An.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;Hr.subVectors(r,n),Gr.subVectors(s,n),Dl.subVectors(t,n);const l=Hr.dot(Dl),c=Gr.dot(Dl);if(l<=0&&c<=0)return e.copy(n);Il.subVectors(t,r);const u=Hr.dot(Il),f=Gr.dot(Il);if(u>=0&&f<=u)return e.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Hr,a);Ul.subVectors(t,s);const p=Hr.dot(Ul),g=Gr.dot(Ul);if(g>=0&&p<=g)return e.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Gr,o);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return mh.subVectors(s,r),o=(f-u)/(f-u+(p-g)),e.copy(r).addScaledVector(mh,o);const d=1/(m+_+h);return a=_*d,o=h*d,e.copy(n).addScaledVector(Hr,a).addScaledVector(Gr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Lm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function Nl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=ne.workingColorSpace){if(t=iM(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Nl(a,s,t+1/3),this.g=Nl(a,s,t),this.b=Nl(a,s,t-1/3)}return ne.toWorkingColorSpace(this,r),this}setStyle(t,e=Ue){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const n=Lm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}copyLinearToSRGB(t){return this.r=El(t.r),this.g=El(t.g),this.b=El(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return ne.fromWorkingColorSpace(Be.copy(this),t),Math.round(Ye(Be.r*255,0,255))*65536+Math.round(Ye(Be.g*255,0,255))*256+Math.round(Ye(Be.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Be.copy(this),e);const n=Be.r,r=Be.g,s=Be.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Ue){ne.fromWorkingColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,r=Be.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Mi),this.setHSL(Mi.h+t,Mi.s+e,Mi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mi),t.getHSL(Ia);const n=yl(Mi.h,Ia.h,e),r=yl(Mi.s,Ia.s,e),s=yl(Mi.l,Ia.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Kt;Kt.NAMES=Lm;let xM=0;class Rr extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xM++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=fs,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=Sc,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=So,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==Gi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yc&&(n.blendSrc=this.blendSrc),this.blendDst!==Sc&&(n.blendDst=this.blendDst),this.blendEquation!==ar&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==So&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ir&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ir&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ir&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class fn extends Rr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new B,Ua=new Dt;class Hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=wc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ua.fromBufferAttribute(this,e),Ua.applyMatrix3(t),this.setXY(e,Ua.x,Ua.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=oi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=oi(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=oi(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=oi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=oi(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wc&&(t.usage=this.usage),t}}class Dm extends Hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Im extends Hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends Hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let MM=0;const En=new xe,Ol=new De,kr=new B,un=new da,Us=new da,Ce=new B;class on extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:MM++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wm(t)?Im:Dm)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Yt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return En.makeRotationFromQuaternion(t),this.applyMatrix4(En),this}rotateX(t){return En.makeRotationX(t),this.applyMatrix4(En),this}rotateY(t){return En.makeRotationY(t),this.applyMatrix4(En),this}rotateZ(t){return En.makeRotationZ(t),this.applyMatrix4(En),this}translate(t,e,n){return En.makeTranslation(t,e,n),this.applyMatrix4(En),this}scale(t,e,n){return En.makeScale(t,e,n),this.applyMatrix4(En),this}lookAt(t){return Ol.lookAt(t),Ol.updateMatrix(),this.applyMatrix4(Ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new he(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new da);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(un.min,Us.min),un.expandByPoint(Ce),Ce.addVectors(un.max,Us.max),un.expandByPoint(Ce)):(un.expandByPoint(Us.min),un.expandByPoint(Us.max))}un.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)Ce.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Ce));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ce.fromBufferAttribute(o,c),l&&(kr.fromBufferAttribute(t,c),Ce.add(kr)),r=Math.max(r,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,r=e.position.array,s=e.normal.array,a=e.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Hn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let w=0;w<o;w++)c[w]=new B,u[w]=new B;const f=new B,h=new B,p=new B,g=new Dt,_=new Dt,m=new Dt,d=new B,S=new B;function v(w,G,V){f.fromArray(r,w*3),h.fromArray(r,G*3),p.fromArray(r,V*3),g.fromArray(a,w*2),_.fromArray(a,G*2),m.fromArray(a,V*2),h.sub(f),p.sub(f),_.sub(g),m.sub(g);const it=1/(_.x*m.y-m.x*_.y);isFinite(it)&&(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(it),S.copy(p).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar(it),c[w].add(d),c[G].add(d),c[V].add(d),u[w].add(S),u[G].add(S),u[V].add(S))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let w=0,G=T.length;w<G;++w){const V=T[w],it=V.start,U=V.count;for(let H=it,z=it+U;H<z;H+=3)v(n[H+0],n[H+1],n[H+2])}const R=new B,b=new B,A=new B,O=new B;function M(w){A.fromArray(s,w*3),O.copy(A);const G=c[w];R.copy(G),R.sub(A.multiplyScalar(A.dot(G))).normalize(),b.crossVectors(O,G);const it=b.dot(u[w])<0?-1:1;l[w*4]=R.x,l[w*4+1]=R.y,l[w*4+2]=R.z,l[w*4+3]=it}for(let w=0,G=T.length;w<G;++w){const V=T[w],it=V.start,U=V.count;for(let H=it,z=it+U;H<z;H+=3)M(n[H+0]),M(n[H+1]),M(n[H+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,u=new B,f=new B;if(t)for(let h=0,p=t.count;h<p;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new Hn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=t(h,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _h=new xe,tr=new Xo,Na=new Wo,gh=new B,Vr=new B,Wr=new B,Xr=new B,Fl=new B,Oa=new B,Fa=new Dt,Ba=new Dt,za=new Dt,vh=new B,xh=new B,Mh=new B,Ha=new B,Ga=new B;class Se extends De{constructor(t=new on,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Oa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Fl.fromBufferAttribute(f,t),a?Oa.addScaledVector(Fl,u):Oa.addScaledVector(Fl.sub(e),u))}e.add(Oa)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(s),tr.copy(t.ray).recast(t.near),!(Na.containsPoint(tr.origin)===!1&&(tr.intersectSphere(Na,gh)===null||tr.origin.distanceToSquared(gh)>(t.far-t.near)**2))&&(_h.copy(s).invert(),tr.copy(t.ray).applyMatrix4(_h),!(n.boundingBox!==null&&tr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,tr)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let T=S,R=v;T<R;T+=3){const b=o.getX(T),A=o.getX(T+1),O=o.getX(T+2);r=ka(this,d,t,n,c,u,f,b,A,O),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=o.getX(m),v=o.getX(m+1),T=o.getX(m+2);r=ka(this,a,t,n,c,u,f,S,v,T),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=S,R=v;T<R;T+=3){const b=T,A=T+1,O=T+2;r=ka(this,d,t,n,c,u,f,b,A,O),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=m,v=m+1,T=m+2;r=ka(this,a,t,n,c,u,f,S,v,T),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function yM(i,t,e,n,r,s,a,o){let l;if(t.side===tn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===Gi,o),l===null)return null;Ga.copy(o),Ga.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ga);return c<e.near||c>e.far?null:{distance:c,point:Ga.clone(),object:i}}function ka(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Vr),i.getVertexPosition(l,Wr),i.getVertexPosition(c,Xr);const u=yM(i,t,e,n,Vr,Wr,Xr,Ha);if(u){r&&(Fa.fromBufferAttribute(r,o),Ba.fromBufferAttribute(r,l),za.fromBufferAttribute(r,c),u.uv=An.getInterpolation(Ha,Vr,Wr,Xr,Fa,Ba,za,new Dt)),s&&(Fa.fromBufferAttribute(s,o),Ba.fromBufferAttribute(s,l),za.fromBufferAttribute(s,c),u.uv1=An.getInterpolation(Ha,Vr,Wr,Xr,Fa,Ba,za,new Dt),u.uv2=u.uv1),a&&(vh.fromBufferAttribute(a,o),xh.fromBufferAttribute(a,l),Mh.fromBufferAttribute(a,c),u.normal=An.getInterpolation(Ha,Vr,Wr,Xr,vh,xh,Mh,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new B,materialIndex:0};An.getNormal(Vr,Wr,Xr,f.normal),u.face=f}return u}class As extends on{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(f,2));function g(_,m,d,S,v,T,R,b,A,O,M){const w=T/A,G=R/O,V=T/2,it=R/2,U=b/2,H=A+1,z=O+1;let Y=0,q=0;const rt=new B;for(let at=0;at<z;at++){const dt=at*G-it;for(let ft=0;ft<H;ft++){const et=ft*w-V;rt[_]=et*S,rt[m]=dt*v,rt[d]=U,c.push(rt.x,rt.y,rt.z),rt[_]=0,rt[m]=0,rt[d]=b>0?1:-1,u.push(rt.x,rt.y,rt.z),f.push(ft/A),f.push(1-at/O),Y+=1}}for(let at=0;at<O;at++)for(let dt=0;dt<A;dt++){const ft=h+dt+H*at,et=h+dt+H*(at+1),I=h+(dt+1)+H*(at+1),Z=h+(dt+1)+H*at;l.push(ft,et,Z),l.push(et,I,Z),q+=6}o.addGroup(p,q,M),p+=q,h+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ts(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function We(i){const t={};for(let e=0;e<i.length;e++){const n=Ts(i[e]);for(const r in n)t[r]=n[r]}return t}function SM(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Um(i){return i.getRenderTarget()===null?i.outputColorSpace:ne.workingColorSpace}const EM={clone:Ts,merge:We};var TM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class br extends Rr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=TM,this.fragmentShader=bM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ts(t.uniforms),this.uniformsGroups=SM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Nm extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class wn extends Nm{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(oo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cc*2*Math.atan(Math.tan(oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(oo*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Yr=-90,qr=1;class AM extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(Yr,qr,t,e);r.layers=this.layers,this.add(r);const s=new wn(Yr,qr,t,e);s.layers=this.layers,this.add(s);const a=new wn(Yr,qr,t,e);a.layers=this.layers,this.add(a);const o=new wn(Yr,qr,t,e);o.layers=this.layers,this.add(o);const l=new wn(Yr,qr,t,e);l.layers=this.layers,this.add(l);const c=new wn(Yr,qr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ao)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Om extends en{constructor(t,e,n,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ys,super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wM extends Er{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];e.encoding!==void 0&&(js("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===vr?Ue:Rn),this.texture=new Om(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new As(5,5,5),s=new br({name:"CubemapFromEquirect",uniforms:Ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Ni});s.uniforms.tEquirect.value=e;const a=new Se(r,s),o=e.minFilter;return e.minFilter===oa&&(e.minFilter=bn),new AM(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const Bl=new B,RM=new B,CM=new Yt;class Ti{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Bl.subVectors(n,e).cross(RM.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Bl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||CM.getNormalMatrix(t),r=this.coplanarPoint(Bl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const er=new Wo,Va=new B;class vu{constructor(t=new Ti,e=new Ti,n=new Ti,r=new Ti,s=new Ti,a=new Ti){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],d=r[12],S=r[13],v=r[14],T=r[15];if(n[0].setComponents(l-s,h-c,m-p,T-d).normalize(),n[1].setComponents(l+s,h+c,m+p,T+d).normalize(),n[2].setComponents(l+a,h+u,m+g,T+S).normalize(),n[3].setComponents(l-a,h-u,m-g,T-S).normalize(),n[4].setComponents(l-o,h-f,m-_,T-v).normalize(),e===li)n[5].setComponents(l+o,h+f,m+_,T+v).normalize();else if(e===Ao)n[5].setComponents(o,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),er.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),er.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(er)}intersectsSprite(t){return er.center.set(0,0,0),er.radius=.7071067811865476,er.applyMatrix4(t.matrixWorld),this.intersectsSphere(er)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Va.x=r.normal.x>0?t.max.x:t.min.x,Va.y=r.normal.y>0?t.max.y:t.min.y,Va.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Va)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fm(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function PM(i,t){const e=t.isWebGL2,n=new WeakMap;function r(c,u){const f=c.array,h=c.usage,p=f.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=i.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=i.SHORT;else if(f instanceof Uint32Array)_=i.UNSIGNED_INT;else if(f instanceof Int32Array)_=i.INT;else if(f instanceof Int8Array)_=i.BYTE;else if(f instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,f){const h=u.array,p=u._updateRange,g=u.updateRanges;if(i.bindBuffer(f,c),p.count===-1&&g.length===0&&i.bufferSubData(f,0,h),g.length!==0){for(let _=0,m=g.length;_<m;_++){const d=g[_];e?i.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):i.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(e?i.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):i.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=n.get(c);(!h||h.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=n.get(c);if(f===void 0)n.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:a,remove:o,update:l}}class xu extends on{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=t/o,h=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const S=d*h-a;for(let v=0;v<c;v++){const T=v*f-s;g.push(T,-S,0),_.push(0,0,1),m.push(v/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<o;S++){const v=S+c*d,T=S+c*(d+1),R=S+1+c*(d+1),b=S+1+c*d;p.push(v,T,b),p.push(T,R,b)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xu(t.width,t.height,t.widthSegments,t.heightSegments)}}var LM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,DM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,IM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NM=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,OM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,FM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,BM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zM=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,HM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,GM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,VM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,WM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,XM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,YM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,qM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$M=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,KM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ZM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,JM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,QM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ty=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ey=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ny=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,iy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ry=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ay=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oy="gl_FragColor = linearToOutputTexel( gl_FragColor );",ly=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,cy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,uy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,py=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,my=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_y=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,My=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ey=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ty=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,by=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ay=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ry=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Py=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ly=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Iy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uy=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ny=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Oy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Fy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,By=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ky=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Yy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,qy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$y=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,eS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,aS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,dS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_S=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,MS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,SS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ES=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,TS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,AS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,RS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,CS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const PS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,US=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,FS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,BS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,HS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,GS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,VS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,WS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,XS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$S=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ZS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,JS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,eE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:LM,alphahash_pars_fragment:DM,alphamap_fragment:IM,alphamap_pars_fragment:UM,alphatest_fragment:NM,alphatest_pars_fragment:OM,aomap_fragment:FM,aomap_pars_fragment:BM,batching_pars_vertex:zM,batching_vertex:HM,begin_vertex:GM,beginnormal_vertex:kM,bsdfs:VM,iridescence_fragment:WM,bumpmap_pars_fragment:XM,clipping_planes_fragment:YM,clipping_planes_pars_fragment:qM,clipping_planes_pars_vertex:jM,clipping_planes_vertex:$M,color_fragment:KM,color_pars_fragment:ZM,color_pars_vertex:JM,color_vertex:QM,common:ty,cube_uv_reflection_fragment:ey,defaultnormal_vertex:ny,displacementmap_pars_vertex:iy,displacementmap_vertex:ry,emissivemap_fragment:sy,emissivemap_pars_fragment:ay,colorspace_fragment:oy,colorspace_pars_fragment:ly,envmap_fragment:cy,envmap_common_pars_fragment:uy,envmap_pars_fragment:fy,envmap_pars_vertex:hy,envmap_physical_pars_fragment:Ty,envmap_vertex:dy,fog_vertex:py,fog_pars_vertex:my,fog_fragment:_y,fog_pars_fragment:gy,gradientmap_pars_fragment:vy,lightmap_fragment:xy,lightmap_pars_fragment:My,lights_lambert_fragment:yy,lights_lambert_pars_fragment:Sy,lights_pars_begin:Ey,lights_toon_fragment:by,lights_toon_pars_fragment:Ay,lights_phong_fragment:wy,lights_phong_pars_fragment:Ry,lights_physical_fragment:Cy,lights_physical_pars_fragment:Py,lights_fragment_begin:Ly,lights_fragment_maps:Dy,lights_fragment_end:Iy,logdepthbuf_fragment:Uy,logdepthbuf_pars_fragment:Ny,logdepthbuf_pars_vertex:Oy,logdepthbuf_vertex:Fy,map_fragment:By,map_pars_fragment:zy,map_particle_fragment:Hy,map_particle_pars_fragment:Gy,metalnessmap_fragment:ky,metalnessmap_pars_fragment:Vy,morphcolor_vertex:Wy,morphnormal_vertex:Xy,morphtarget_pars_vertex:Yy,morphtarget_vertex:qy,normal_fragment_begin:jy,normal_fragment_maps:$y,normal_pars_fragment:Ky,normal_pars_vertex:Zy,normal_vertex:Jy,normalmap_pars_fragment:Qy,clearcoat_normal_fragment_begin:tS,clearcoat_normal_fragment_maps:eS,clearcoat_pars_fragment:nS,iridescence_pars_fragment:iS,opaque_fragment:rS,packing:sS,premultiplied_alpha_fragment:aS,project_vertex:oS,dithering_fragment:lS,dithering_pars_fragment:cS,roughnessmap_fragment:uS,roughnessmap_pars_fragment:fS,shadowmap_pars_fragment:hS,shadowmap_pars_vertex:dS,shadowmap_vertex:pS,shadowmask_pars_fragment:mS,skinbase_vertex:_S,skinning_pars_vertex:gS,skinning_vertex:vS,skinnormal_vertex:xS,specularmap_fragment:MS,specularmap_pars_fragment:yS,tonemapping_fragment:SS,tonemapping_pars_fragment:ES,transmission_fragment:TS,transmission_pars_fragment:bS,uv_pars_fragment:AS,uv_pars_vertex:wS,uv_vertex:RS,worldpos_vertex:CS,background_vert:PS,background_frag:LS,backgroundCube_vert:DS,backgroundCube_frag:IS,cube_vert:US,cube_frag:NS,depth_vert:OS,depth_frag:FS,distanceRGBA_vert:BS,distanceRGBA_frag:zS,equirect_vert:HS,equirect_frag:GS,linedashed_vert:kS,linedashed_frag:VS,meshbasic_vert:WS,meshbasic_frag:XS,meshlambert_vert:YS,meshlambert_frag:qS,meshmatcap_vert:jS,meshmatcap_frag:$S,meshnormal_vert:KS,meshnormal_frag:ZS,meshphong_vert:JS,meshphong_frag:QS,meshphysical_vert:tE,meshphysical_frag:eE,meshtoon_vert:nE,meshtoon_frag:iE,points_vert:rE,points_frag:sE,shadow_vert:aE,shadow_frag:oE,sprite_vert:lE,sprite_frag:cE},Mt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Xn={basic:{uniforms:We([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:We([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:We([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:We([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:We([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:We([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:We([Mt.points,Mt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:We([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:We([Mt.common,Mt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:We([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:We([Mt.sprite,Mt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:We([Mt.common,Mt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:We([Mt.lights,Mt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Xn.physical={uniforms:We([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const Wa={r:0,b:0,g:0};function uE(i,t,e,n,r,s,a){const o=new Kt(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function g(m,d){let S=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?e:t).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),S=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ko)?(u===void 0&&(u=new Se(new As(1,1,1),new br({name:"BackgroundCubeMaterial",uniforms:Ts(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=ne.getTransfer(v.colorSpace)!==ae,(f!==v||h!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Se(new xu(2,2),new br({name:"BackgroundMaterial",uniforms:Ts(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=ne.getTransfer(v.colorSpace)!==ae,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,d){m.getRGB(Wa,Um(i)),n.buffers.color.setClear(Wa.r,Wa.g,Wa.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function fE(i,t,e,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,u=!1;function f(U,H,z,Y,q){let rt=!1;if(a){const at=_(Y,z,H);c!==at&&(c=at,p(c.object)),rt=d(U,Y,z,q),rt&&S(U,Y,z,q)}else{const at=H.wireframe===!0;(c.geometry!==Y.id||c.program!==z.id||c.wireframe!==at)&&(c.geometry=Y.id,c.program=z.id,c.wireframe=at,rt=!0)}q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(rt||u)&&(u=!1,O(U,H,z,Y),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function h(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(U){return n.isWebGL2?i.bindVertexArray(U):s.bindVertexArrayOES(U)}function g(U){return n.isWebGL2?i.deleteVertexArray(U):s.deleteVertexArrayOES(U)}function _(U,H,z){const Y=z.wireframe===!0;let q=o[U.id];q===void 0&&(q={},o[U.id]=q);let rt=q[H.id];rt===void 0&&(rt={},q[H.id]=rt);let at=rt[Y];return at===void 0&&(at=m(h()),rt[Y]=at),at}function m(U){const H=[],z=[],Y=[];for(let q=0;q<r;q++)H[q]=0,z[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:z,attributeDivisors:Y,object:U,attributes:{},index:null}}function d(U,H,z,Y){const q=c.attributes,rt=H.attributes;let at=0;const dt=z.getAttributes();for(const ft in dt)if(dt[ft].location>=0){const I=q[ft];let Z=rt[ft];if(Z===void 0&&(ft==="instanceMatrix"&&U.instanceMatrix&&(Z=U.instanceMatrix),ft==="instanceColor"&&U.instanceColor&&(Z=U.instanceColor)),I===void 0||I.attribute!==Z||Z&&I.data!==Z.data)return!0;at++}return c.attributesNum!==at||c.index!==Y}function S(U,H,z,Y){const q={},rt=H.attributes;let at=0;const dt=z.getAttributes();for(const ft in dt)if(dt[ft].location>=0){let I=rt[ft];I===void 0&&(ft==="instanceMatrix"&&U.instanceMatrix&&(I=U.instanceMatrix),ft==="instanceColor"&&U.instanceColor&&(I=U.instanceColor));const Z={};Z.attribute=I,I&&I.data&&(Z.data=I.data),q[ft]=Z,at++}c.attributes=q,c.attributesNum=at,c.index=Y}function v(){const U=c.newAttributes;for(let H=0,z=U.length;H<z;H++)U[H]=0}function T(U){R(U,0)}function R(U,H){const z=c.newAttributes,Y=c.enabledAttributes,q=c.attributeDivisors;z[U]=1,Y[U]===0&&(i.enableVertexAttribArray(U),Y[U]=1),q[U]!==H&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,H),q[U]=H)}function b(){const U=c.newAttributes,H=c.enabledAttributes;for(let z=0,Y=H.length;z<Y;z++)H[z]!==U[z]&&(i.disableVertexAttribArray(z),H[z]=0)}function A(U,H,z,Y,q,rt,at){at===!0?i.vertexAttribIPointer(U,H,z,q,rt):i.vertexAttribPointer(U,H,z,Y,q,rt)}function O(U,H,z,Y){if(n.isWebGL2===!1&&(U.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const q=Y.attributes,rt=z.getAttributes(),at=H.defaultAttributeValues;for(const dt in rt){const ft=rt[dt];if(ft.location>=0){let et=q[dt];if(et===void 0&&(dt==="instanceMatrix"&&U.instanceMatrix&&(et=U.instanceMatrix),dt==="instanceColor"&&U.instanceColor&&(et=U.instanceColor)),et!==void 0){const I=et.normalized,Z=et.itemSize,tt=e.get(et);if(tt===void 0)continue;const ut=tt.buffer,Et=tt.type,Tt=tt.bytesPerElement,yt=n.isWebGL2===!0&&(Et===i.INT||Et===i.UNSIGNED_INT||et.gpuType===gm);if(et.isInterleavedBufferAttribute){const Ot=et.data,y=Ot.stride,D=et.offset;if(Ot.isInstancedInterleavedBuffer){for(let F=0;F<ft.locationSize;F++)R(ft.location+F,Ot.meshPerAttribute);U.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Ot.meshPerAttribute*Ot.count)}else for(let F=0;F<ft.locationSize;F++)T(ft.location+F);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let F=0;F<ft.locationSize;F++)A(ft.location+F,Z/ft.locationSize,Et,I,y*Tt,(D+Z/ft.locationSize*F)*Tt,yt)}else{if(et.isInstancedBufferAttribute){for(let Ot=0;Ot<ft.locationSize;Ot++)R(ft.location+Ot,et.meshPerAttribute);U.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Ot=0;Ot<ft.locationSize;Ot++)T(ft.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,ut);for(let Ot=0;Ot<ft.locationSize;Ot++)A(ft.location+Ot,Z/ft.locationSize,Et,I,Z*Tt,Z/ft.locationSize*Ot*Tt,yt)}}else if(at!==void 0){const I=at[dt];if(I!==void 0)switch(I.length){case 2:i.vertexAttrib2fv(ft.location,I);break;case 3:i.vertexAttrib3fv(ft.location,I);break;case 4:i.vertexAttrib4fv(ft.location,I);break;default:i.vertexAttrib1fv(ft.location,I)}}}}b()}function M(){V();for(const U in o){const H=o[U];for(const z in H){const Y=H[z];for(const q in Y)g(Y[q].object),delete Y[q];delete H[z]}delete o[U]}}function w(U){if(o[U.id]===void 0)return;const H=o[U.id];for(const z in H){const Y=H[z];for(const q in Y)g(Y[q].object),delete Y[q];delete H[z]}delete o[U.id]}function G(U){for(const H in o){const z=o[H];if(z[U.id]===void 0)continue;const Y=z[U.id];for(const q in Y)g(Y[q].object),delete Y[q];delete z[U.id]}}function V(){it(),u=!0,c!==l&&(c=l,p(c.object))}function it(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:V,resetDefaultState:it,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:G,initAttributes:v,enableAttribute:T,disableUnusedAttributes:b}}function hE(i,t,e,n){const r=n.isWebGL2;let s;function a(u){s=u}function o(u,f){i.drawArrays(s,u,f),e.update(f,s,1)}function l(u,f,h){if(h===0)return;let p,g;if(r)p=i,g="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,u,f,h),e.update(f,s,h)}function c(u,f,h){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h;g++)this.render(u[g],f[g]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=f[_];e.update(g,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function dE(i,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,T=a||t.has("OES_texture_float"),R=v&&T,b=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:S,vertexTextures:v,floatFragmentTextures:T,floatVertexTextures:R,maxSamples:b}}function pE(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new Ti,o=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||n!==0||r;return r=h,n=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,v=S*4;let T=d.clippingState||null;l.value=T,T=u(g,h,v,p);for(let R=0;R!==v;++R)T[R]=e[R];d.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,T=p;v!==_;++v,T+=4)a.copy(f[v]).applyMatrix4(S,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function mE(i){let t=new WeakMap;function e(a,o){return o===Ec?a.mapping=ys:o===Tc&&(a.mapping=Ss),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ec||o===Tc)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new wM(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Bm extends Nm{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ns=4,yh=[.125,.215,.35,.446,.526,.582],or=20,zl=new Bm,Sh=new Kt;let Hl=null,Gl=0,kl=0;const ir=(1+Math.sqrt(5))/2,jr=1/ir,Eh=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,ir,jr),new B(0,ir,-jr),new B(jr,0,ir),new B(-jr,0,ir),new B(ir,jr,0),new B(-ir,jr,0)];class Th{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Hl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),kl=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ah(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Hl,Gl,kl),t.scissorTest=!1,Xa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ys||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Hl=this._renderer.getRenderTarget(),Gl=this._renderer.getActiveCubeFace(),kl=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:la,format:Fn,colorSpace:di,depthBuffer:!1},r=bh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_E(s)),this._blurMaterial=gE(s,t,e)}return r}_compileMaterial(t){const e=new Se(this._lodPlanes[0],t);this._renderer.compile(e,zl)}_sceneToCubeUV(t,e,n,r){const o=new wn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Sh),u.toneMapping=Oi,u.autoClear=!1;const p=new fn({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new Se(new As,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Sh),_=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):S===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const v=this._cubeSize;Xa(r,S*v,d>2?v:0,v,v),u.setRenderTarget(r),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===ys||t.mapping===Ss;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ah());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Se(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Xa(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,zl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Eh[(r-1)%Eh.length];this._blur(t,r-1,r,s,a)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Se(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*or-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):or;m>or&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${or}`);const d=[];let S=0;for(let A=0;A<or;++A){const O=A/_,M=Math.exp(-O*O/2);d.push(M),A===0?S+=M:A<m&&(S+=2*M)}for(let A=0;A<d.length;A++)d[A]=d[A]/S;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-n;const T=this._sizeLods[r],R=3*T*(r>v-ns?r-v+ns:0),b=4*(this._cubeSize-T);Xa(e,R,b,3*T,2*T),l.setRenderTarget(e),l.render(f,zl)}}function _E(i){const t=[],e=[],n=[];let r=i;const s=i-ns+1+yh.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-ns?l=yh[a-i+ns-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,_=3,m=2,d=1,S=new Float32Array(_*g*p),v=new Float32Array(m*g*p),T=new Float32Array(d*g*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,O=b>2?0:-1,M=[A,O,0,A+2/3,O,0,A+2/3,O+1,0,A,O,0,A+2/3,O+1,0,A,O+1,0];S.set(M,_*g*b),v.set(h,m*g*b);const w=[b,b,b,b,b,b];T.set(w,d*g*b)}const R=new on;R.setAttribute("position",new Hn(S,_)),R.setAttribute("uv",new Hn(v,m)),R.setAttribute("faceIndex",new Hn(T,d)),t.push(R),r>ns&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bh(i,t,e){const n=new Er(i,t,e);return n.texture.mapping=ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xa(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function gE(i,t,e){const n=new Float32Array(or),r=new B(0,1,0);return new br({name:"SphericalGaussianBlur",defines:{n:or,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Ah(){return new br({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function wh(){return new br({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Mu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vE(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ec||l===Tc,u=l===ys||l===Ss;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=t.get(o);return e===null&&(e=new Th(i)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),t.set(o,f),f.texture}else{if(t.has(o))return t.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||u&&f&&r(f)){e===null&&(e=new Th(i));const h=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,h),o.addEventListener("dispose",s),h.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function xE(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ME(i,t,e,n){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(t.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let v=0,T=S.length;v<T;v+=3){const R=S[v+0],b=S[v+1],A=S[v+2];h.push(R,b,b,A,A,R)}}else if(g!==void 0){const S=g.array;_=g.version;for(let v=0,T=S.length/3-1;v<T;v+=3){const R=v+0,b=v+1,A=v+2;h.push(R,b,b,A,A,R)}}else return;const m=new(wm(h)?Im:Dm)(h,1);m.version=_;const d=s.get(f);d&&t.remove(d),s.set(f,m)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function yE(i,t,e,n){const r=n.isWebGL2;let s;function a(p){s=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,g){i.drawElements(s,g,o,p*l),e.update(g,s,1)}function f(p,g,_){if(_===0)return;let m,d;if(r)m=i,d="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,g,o,p*l,_),e.update(g,s,_)}function h(p,g,_){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<_;d++)this.render(p[d]/l,g[d]);else{m.multiDrawElementsWEBGL(s,g,0,o,p,0,_);let d=0;for(let S=0;S<_;S++)d+=g[S];e.update(d,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function SE(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function EE(i,t){return i[0]-t[0]}function TE(i,t){return Math.abs(t[1])-Math.abs(i[1])}function bE(i,t,e){const n={},r=new Float32Array(8),s=new WeakMap,a=new Le,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==_){let H=function(){it.dispose(),s.delete(u),u.removeEventListener("dispose",H)};var p=H;m!==void 0&&m.texture.dispose();const v=u.morphAttributes.position!==void 0,T=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],O=u.morphAttributes.color||[];let M=0;v===!0&&(M=1),T===!0&&(M=2),R===!0&&(M=3);let w=u.attributes.position.count*M,G=1;w>t.maxTextureSize&&(G=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const V=new Float32Array(w*G*4*_),it=new Pm(V,w,G,_);it.type=Ci,it.needsUpdate=!0;const U=M*4;for(let z=0;z<_;z++){const Y=b[z],q=A[z],rt=O[z],at=w*G*4*z;for(let dt=0;dt<Y.count;dt++){const ft=dt*U;v===!0&&(a.fromBufferAttribute(Y,dt),V[at+ft+0]=a.x,V[at+ft+1]=a.y,V[at+ft+2]=a.z,V[at+ft+3]=0),T===!0&&(a.fromBufferAttribute(q,dt),V[at+ft+4]=a.x,V[at+ft+5]=a.y,V[at+ft+6]=a.z,V[at+ft+7]=0),R===!0&&(a.fromBufferAttribute(rt,dt),V[at+ft+8]=a.x,V[at+ft+9]=a.y,V[at+ft+10]=a.z,V[at+ft+11]=rt.itemSize===4?a.w:1)}}m={count:_,texture:it,size:new Dt(w,G)},s.set(u,m),u.addEventListener("dispose",H)}let d=0;for(let v=0;v<h.length;v++)d+=h[v];const S=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(i,"morphTargetBaseInfluence",S),f.getUniforms().setValue(i,"morphTargetInfluences",h),f.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),f.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=h===void 0?0:h.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let T=0;T<g;T++)_[T]=[T,0];n[u.id]=_}for(let T=0;T<g;T++){const R=_[T];R[0]=T,R[1]=h[T]}_.sort(TE);for(let T=0;T<8;T++)T<g&&_[T][1]?(o[T][0]=_[T][0],o[T][1]=_[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(EE);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let S=0;for(let T=0;T<8;T++){const R=o[T],b=R[0],A=R[1];b!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+T)!==m[b]&&u.setAttribute("morphTarget"+T,m[b]),d&&u.getAttribute("morphNormal"+T)!==d[b]&&u.setAttribute("morphNormal"+T,d[b]),r[T]=A,S+=A):(m&&u.hasAttribute("morphTarget"+T)===!0&&u.deleteAttribute("morphTarget"+T),d&&u.hasAttribute("morphNormal"+T)===!0&&u.deleteAttribute("morphNormal"+T),r[T]=0)}const v=u.morphTargetsRelative?1:1-S;f.getUniforms().setValue(i,"morphTargetBaseInfluence",v),f.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function AE(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class zm extends en{constructor(t,e,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:gr,u!==gr&&u!==Es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===gr&&(n=Ri),n===void 0&&u===Es&&(n=_r),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hm=new en,Gm=new zm(1,1);Gm.compareFunction=Am;const km=new Pm,Vm=new uM,Wm=new Om,Rh=[],Ch=[],Ph=new Float32Array(16),Lh=new Float32Array(9),Dh=new Float32Array(4);function ws(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Rh[r];if(s===void 0&&(s=new Float32Array(r),Rh[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function qo(i,t){let e=Ch[t];e===void 0&&(e=new Int32Array(t),Ch[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wE(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function RE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function CE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function PE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function LE(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;Dh.set(n),i.uniformMatrix2fv(this.addr,!1,Dh),we(e,n)}}function DE(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;Lh.set(n),i.uniformMatrix3fv(this.addr,!1,Lh),we(e,n)}}function IE(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ae(e,n))return;Ph.set(n),i.uniformMatrix4fv(this.addr,!1,Ph),we(e,n)}}function UE(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function NE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function OE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function FE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function BE(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function HE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function GE(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function kE(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Gm:Hm;e.setTexture2D(t||s,r)}function VE(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Vm,r)}function WE(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Wm,r)}function XE(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||km,r)}function YE(i){switch(i){case 5126:return wE;case 35664:return RE;case 35665:return CE;case 35666:return PE;case 35674:return LE;case 35675:return DE;case 35676:return IE;case 5124:case 35670:return UE;case 35667:case 35671:return NE;case 35668:case 35672:return OE;case 35669:case 35673:return FE;case 5125:return BE;case 36294:return zE;case 36295:return HE;case 36296:return GE;case 35678:case 36198:case 36298:case 36306:case 35682:return kE;case 35679:case 36299:case 36307:return VE;case 35680:case 36300:case 36308:case 36293:return WE;case 36289:case 36303:case 36311:case 36292:return XE}}function qE(i,t){i.uniform1fv(this.addr,t)}function jE(i,t){const e=ws(t,this.size,2);i.uniform2fv(this.addr,e)}function $E(i,t){const e=ws(t,this.size,3);i.uniform3fv(this.addr,e)}function KE(i,t){const e=ws(t,this.size,4);i.uniform4fv(this.addr,e)}function ZE(i,t){const e=ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function JE(i,t){const e=ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function QE(i,t){const e=ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function tT(i,t){i.uniform1iv(this.addr,t)}function eT(i,t){i.uniform2iv(this.addr,t)}function nT(i,t){i.uniform3iv(this.addr,t)}function iT(i,t){i.uniform4iv(this.addr,t)}function rT(i,t){i.uniform1uiv(this.addr,t)}function sT(i,t){i.uniform2uiv(this.addr,t)}function aT(i,t){i.uniform3uiv(this.addr,t)}function oT(i,t){i.uniform4uiv(this.addr,t)}function lT(i,t,e){const n=this.cache,r=t.length,s=qo(e,r);Ae(n,s)||(i.uniform1iv(this.addr,s),we(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Hm,s[a])}function cT(i,t,e){const n=this.cache,r=t.length,s=qo(e,r);Ae(n,s)||(i.uniform1iv(this.addr,s),we(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Vm,s[a])}function uT(i,t,e){const n=this.cache,r=t.length,s=qo(e,r);Ae(n,s)||(i.uniform1iv(this.addr,s),we(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Wm,s[a])}function fT(i,t,e){const n=this.cache,r=t.length,s=qo(e,r);Ae(n,s)||(i.uniform1iv(this.addr,s),we(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||km,s[a])}function hT(i){switch(i){case 5126:return qE;case 35664:return jE;case 35665:return $E;case 35666:return KE;case 35674:return ZE;case 35675:return JE;case 35676:return QE;case 5124:case 35670:return tT;case 35667:case 35671:return eT;case 35668:case 35672:return nT;case 35669:case 35673:return iT;case 5125:return rT;case 36294:return sT;case 36295:return aT;case 36296:return oT;case 35678:case 36198:case 36298:case 36306:case 35682:return lT;case 35679:case 36299:case 36307:return cT;case 35680:case 36300:case 36308:case 36293:return uT;case 36289:case 36303:case 36311:case 36292:return fT}}class dT{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=YE(e.type)}}class pT{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hT(e.type)}}class mT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Vl=/(\w+)(\])?(\[|\.)?/g;function Ih(i,t){i.seq.push(t),i.map[t.id]=t}function _T(i,t,e){const n=i.name,r=n.length;for(Vl.lastIndex=0;;){const s=Vl.exec(n),a=Vl.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ih(e,c===void 0?new dT(o,i,t):new pT(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new mT(o),Ih(e,f)),e=f}}}class lo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);_T(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Uh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const gT=37297;let vT=0;function xT(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function MT(i){const t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(i);let n;switch(t===e?n="":t===bo&&e===To?n="LinearDisplayP3ToLinearSRGB":t===To&&e===bo&&(n="LinearSRGBToLinearDisplayP3"),i){case di:case Vo:return[n,"LinearTransferOETF"];case Ue:case _u:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Nh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+xT(i.getShaderSource(t),a)}else return r}function yT(i,t){const e=MT(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function ST(i,t){let e;switch(t){case Dx:e="Linear";break;case Ix:e="Reinhard";break;case Ux:e="OptimizedCineon";break;case Nx:e="ACESFilmic";break;case Fx:e="AgX";break;case Ox:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ET(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(is).join(`
`)}function TT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(is).join(`
`)}function bT(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function AT(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function is(i){return i!==""}function Oh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const wT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(i){return i.replace(wT,CT)}const RT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function CT(i,t){let e=kt[t];if(e===void 0){const n=RT.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Lc(e)}const PT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bh(i){return i.replace(PT,LT)}function LT(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zh(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function DT(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===pm?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ax?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ii&&(t="SHADOWMAP_TYPE_VSM"),t}function IT(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case Ss:t="ENVMAP_TYPE_CUBE";break;case ko:t="ENVMAP_TYPE_CUBE_UV";break}return t}function UT(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function NT(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mm:t="ENVMAP_BLENDING_MULTIPLY";break;case Px:t="ENVMAP_BLENDING_MIX";break;case Lx:t="ENVMAP_BLENDING_ADD";break}return t}function OT(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function FT(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=DT(e),c=IT(e),u=UT(e),f=NT(e),h=OT(e),p=e.isWebGL2?"":ET(e),g=TT(e),_=bT(s),m=r.createProgram();let d,S,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(is).join(`
`),d.length>0&&(d+=`
`),S=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(is).join(`
`),S.length>0&&(S+=`
`)):(d=[zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),S=[p,zh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?kt.tonemapping_pars_fragment:"",e.toneMapping!==Oi?ST("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,yT("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(is).join(`
`)),a=Lc(a),a=Oh(a,e),a=Fh(a,e),o=Lc(o),o=Oh(o,e),o=Fh(o,e),a=Bh(a),o=Bh(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,S=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const T=v+d+a,R=v+S+o,b=Uh(r,r.VERTEX_SHADER,T),A=Uh(r,r.FRAGMENT_SHADER,R);r.attachShader(m,b),r.attachShader(m,A),e.index0AttributeName!==void 0?r.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function O(V){if(i.debug.checkShaderErrors){const it=r.getProgramInfoLog(m).trim(),U=r.getShaderInfoLog(b).trim(),H=r.getShaderInfoLog(A).trim();let z=!0,Y=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,b,A);else{const q=Nh(r,b,"vertex"),rt=Nh(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+it+`
`+q+`
`+rt)}else it!==""?console.warn("THREE.WebGLProgram: Program Info Log:",it):(U===""||H==="")&&(Y=!1);Y&&(V.diagnostics={runnable:z,programLog:it,vertexShader:{log:U,prefix:d},fragmentShader:{log:H,prefix:S}})}r.deleteShader(b),r.deleteShader(A),M=new lo(r,m),w=AT(r,m)}let M;this.getUniforms=function(){return M===void 0&&O(this),M};let w;this.getAttributes=function(){return w===void 0&&O(this),w};let G=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=r.getProgramParameter(m,gT)),G},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vT++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=A,this}let BT=0;class zT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new HT(t),e.set(t,n)),n}}class HT{constructor(t){this.id=BT++,this.code=t,this.usedTimes=0}}function GT(i,t,e,n,r,s,a){const o=new gu,l=new zT,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,w,G,V,it){const U=V.fog,H=it.geometry,z=M.isMeshStandardMaterial?V.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||z),q=Y&&Y.mapping===ko?Y.image.height:null,rt=g[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const at=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,dt=at!==void 0?at.length:0;let ft=0;H.morphAttributes.position!==void 0&&(ft=1),H.morphAttributes.normal!==void 0&&(ft=2),H.morphAttributes.color!==void 0&&(ft=3);let et,I,Z,tt;if(rt){const _e=Xn[rt];et=_e.vertexShader,I=_e.fragmentShader}else et=M.vertexShader,I=M.fragmentShader,l.update(M),Z=l.getVertexShaderID(M),tt=l.getFragmentShaderID(M);const ut=i.getRenderTarget(),Et=it.isInstancedMesh===!0,Tt=it.isBatchedMesh===!0,yt=!!M.map,Ot=!!M.matcap,y=!!Y,D=!!M.aoMap,F=!!M.lightMap,$=!!M.bumpMap,W=!!M.normalMap,st=!!M.displacementMap,ot=!!M.emissiveMap,E=!!M.metalnessMap,x=!!M.roughnessMap,L=M.anisotropy>0,X=M.clearcoat>0,K=M.iridescence>0,j=M.sheen>0,ht=M.transmission>0,lt=L&&!!M.anisotropyMap,_t=X&&!!M.clearcoatMap,xt=X&&!!M.clearcoatNormalMap,wt=X&&!!M.clearcoatRoughnessMap,ct=K&&!!M.iridescenceMap,Wt=K&&!!M.iridescenceThicknessMap,zt=j&&!!M.sheenColorMap,It=j&&!!M.sheenRoughnessMap,Rt=!!M.specularMap,vt=!!M.specularColorMap,P=!!M.specularIntensityMap,mt=ht&&!!M.transmissionMap,Ct=ht&&!!M.thicknessMap,At=!!M.gradientMap,pt=!!M.alphaMap,N=M.alphaTest>0,gt=!!M.alphaHash,St=!!M.extensions,Ut=!!H.attributes.uv1,Lt=!!H.attributes.uv2,jt=!!H.attributes.uv3;let $t=Oi;return M.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&($t=i.toneMapping),{isWebGL2:u,shaderID:rt,shaderType:M.type,shaderName:M.name,vertexShader:et,fragmentShader:I,defines:M.defines,customVertexShaderID:Z,customFragmentShaderID:tt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Tt,instancing:Et,instancingColor:Et&&it.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:ut===null?i.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:di,map:yt,matcap:Ot,envMap:y,envMapMode:y&&Y.mapping,envMapCubeUVHeight:q,aoMap:D,lightMap:F,bumpMap:$,normalMap:W,displacementMap:h&&st,emissiveMap:ot,normalMapObjectSpace:W&&M.normalMapType===$x,normalMapTangentSpace:W&&M.normalMapType===bm,metalnessMap:E,roughnessMap:x,anisotropy:L,anisotropyMap:lt,clearcoat:X,clearcoatMap:_t,clearcoatNormalMap:xt,clearcoatRoughnessMap:wt,iridescence:K,iridescenceMap:ct,iridescenceThicknessMap:Wt,sheen:j,sheenColorMap:zt,sheenRoughnessMap:It,specularMap:Rt,specularColorMap:vt,specularIntensityMap:P,transmission:ht,transmissionMap:mt,thicknessMap:Ct,gradientMap:At,opaque:M.transparent===!1&&M.blending===fs,alphaMap:pt,alphaTest:N,alphaHash:gt,combine:M.combine,mapUv:yt&&_(M.map.channel),aoMapUv:D&&_(M.aoMap.channel),lightMapUv:F&&_(M.lightMap.channel),bumpMapUv:$&&_(M.bumpMap.channel),normalMapUv:W&&_(M.normalMap.channel),displacementMapUv:st&&_(M.displacementMap.channel),emissiveMapUv:ot&&_(M.emissiveMap.channel),metalnessMapUv:E&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:lt&&_(M.anisotropyMap.channel),clearcoatMapUv:_t&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:xt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:It&&_(M.sheenRoughnessMap.channel),specularMapUv:Rt&&_(M.specularMap.channel),specularColorMapUv:vt&&_(M.specularColorMap.channel),specularIntensityMapUv:P&&_(M.specularIntensityMap.channel),transmissionMapUv:mt&&_(M.transmissionMap.channel),thicknessMapUv:Ct&&_(M.thicknessMap.channel),alphaMapUv:pt&&_(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(W||L),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:Ut,vertexUv2s:Lt,vertexUv3s:jt,pointsUvs:it.isPoints===!0&&!!H.attributes.uv&&(yt||pt),fog:!!U,useFog:M.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:it.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:ft,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&G.length>0,shadowMapType:i.shadowMap.type,toneMapping:$t,useLegacyLights:i._useLegacyLights,decodeVideoTexture:yt&&M.map.isVideoTexture===!0&&ne.getTransfer(M.map.colorSpace)===ae,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===mn,flipSided:M.side===tn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:St&&M.extensions.derivatives===!0,extensionFragDepth:St&&M.extensions.fragDepth===!0,extensionDrawBuffers:St&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:St&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:St&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const G in M.defines)w.push(G),w.push(M.defines[G]);return M.isRawShaderMaterial===!1&&(S(w,M),v(w,M),w.push(i.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function S(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function v(M,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function T(M){const w=g[M.type];let G;if(w){const V=Xn[w];G=EM.clone(V.uniforms)}else G=M.uniforms;return G}function R(M,w){let G;for(let V=0,it=c.length;V<it;V++){const U=c[V];if(U.cacheKey===w){G=U,++G.usedTimes;break}}return G===void 0&&(G=new FT(i,w,M,s),c.push(G)),G}function b(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:T,acquireProgram:R,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:O}}function kT(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function VT(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Hh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Gh(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(f,h,p,g,_,m){let d=i[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function o(f,h,p,g,_,m){const d=a(f,h,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(f,h,p,g,_,m){const d=a(f,h,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(f,h){e.length>1&&e.sort(f||VT),n.length>1&&n.sort(h||Hh),r.length>1&&r.sort(h||Hh)}function u(){for(let f=t,h=i.length;f<h;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function WT(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new Gh,i.set(n,[a])):r>=s.length?(a=new Gh,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function XT(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Kt};break;case"SpotLight":e={position:new B,direction:new B,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new B,halfWidth:new B,halfHeight:new B};break}return i[t.id]=e,e}}}function YT(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let qT=0;function jT(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $T(i,t){const e=new XT,n=YT(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new B);const s=new B,a=new xe,o=new xe;function l(u,f){let h=0,p=0,g=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let _=0,m=0,d=0,S=0,v=0,T=0,R=0,b=0,A=0,O=0,M=0;u.sort(jT);const w=f===!0?Math.PI:1;for(let V=0,it=u.length;V<it;V++){const U=u[V],H=U.color,z=U.intensity,Y=U.distance,q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=H.r*z*w,p+=H.g*z*w,g+=H.b*z*w;else if(U.isLightProbe){for(let rt=0;rt<9;rt++)r.probe[rt].addScaledVector(U.sh.coefficients[rt],z);M++}else if(U.isDirectionalLight){const rt=e.get(U);if(rt.color.copy(U.color).multiplyScalar(U.intensity*w),U.castShadow){const at=U.shadow,dt=n.get(U);dt.shadowBias=at.bias,dt.shadowNormalBias=at.normalBias,dt.shadowRadius=at.radius,dt.shadowMapSize=at.mapSize,r.directionalShadow[_]=dt,r.directionalShadowMap[_]=q,r.directionalShadowMatrix[_]=U.shadow.matrix,T++}r.directional[_]=rt,_++}else if(U.isSpotLight){const rt=e.get(U);rt.position.setFromMatrixPosition(U.matrixWorld),rt.color.copy(H).multiplyScalar(z*w),rt.distance=Y,rt.coneCos=Math.cos(U.angle),rt.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),rt.decay=U.decay,r.spot[d]=rt;const at=U.shadow;if(U.map&&(r.spotLightMap[A]=U.map,A++,at.updateMatrices(U),U.castShadow&&O++),r.spotLightMatrix[d]=at.matrix,U.castShadow){const dt=n.get(U);dt.shadowBias=at.bias,dt.shadowNormalBias=at.normalBias,dt.shadowRadius=at.radius,dt.shadowMapSize=at.mapSize,r.spotShadow[d]=dt,r.spotShadowMap[d]=q,b++}d++}else if(U.isRectAreaLight){const rt=e.get(U);rt.color.copy(H).multiplyScalar(z),rt.halfWidth.set(U.width*.5,0,0),rt.halfHeight.set(0,U.height*.5,0),r.rectArea[S]=rt,S++}else if(U.isPointLight){const rt=e.get(U);if(rt.color.copy(U.color).multiplyScalar(U.intensity*w),rt.distance=U.distance,rt.decay=U.decay,U.castShadow){const at=U.shadow,dt=n.get(U);dt.shadowBias=at.bias,dt.shadowNormalBias=at.normalBias,dt.shadowRadius=at.radius,dt.shadowMapSize=at.mapSize,dt.shadowCameraNear=at.camera.near,dt.shadowCameraFar=at.camera.far,r.pointShadow[m]=dt,r.pointShadowMap[m]=q,r.pointShadowMatrix[m]=U.shadow.matrix,R++}r.point[m]=rt,m++}else if(U.isHemisphereLight){const rt=e.get(U);rt.skyColor.copy(U.color).multiplyScalar(z*w),rt.groundColor.copy(U.groundColor).multiplyScalar(z*w),r.hemi[v]=rt,v++}}S>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Mt.LTC_FLOAT_1,r.rectAreaLTC2=Mt.LTC_FLOAT_2):(r.rectAreaLTC1=Mt.LTC_HALF_1,r.rectAreaLTC2=Mt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Mt.LTC_FLOAT_1,r.rectAreaLTC2=Mt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Mt.LTC_HALF_1,r.rectAreaLTC2=Mt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=g;const G=r.hash;(G.directionalLength!==_||G.pointLength!==m||G.spotLength!==d||G.rectAreaLength!==S||G.hemiLength!==v||G.numDirectionalShadows!==T||G.numPointShadows!==R||G.numSpotShadows!==b||G.numSpotMaps!==A||G.numLightProbes!==M)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=S,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=b+A-O,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=M,G.directionalLength=_,G.pointLength=m,G.spotLength=d,G.rectAreaLength=S,G.hemiLength=v,G.numDirectionalShadows=T,G.numPointShadows=R,G.numSpotShadows=b,G.numSpotMaps=A,G.numLightProbes=M,r.version=qT++)}function c(u,f){let h=0,p=0,g=0,_=0,m=0;const d=f.matrixWorldInverse;for(let S=0,v=u.length;S<v;S++){const T=u[S];if(T.isDirectionalLight){const R=r.directional[h];R.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(d),h++}else if(T.isSpotLight){const R=r.spot[g];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(d),g++}else if(T.isRectAreaLight){const R=r.rectArea[_];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),o.identity(),a.copy(T.matrixWorld),a.premultiply(d),o.extractRotation(a),R.halfWidth.set(T.width*.5,0,0),R.halfHeight.set(0,T.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const R=r.point[p];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),p++}else if(T.isHemisphereLight){const R=r.hemi[m];R.direction.setFromMatrixPosition(T.matrixWorld),R.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function kh(i,t){const e=new $T(i,t),n=[],r=[];function s(){n.length=0,r.length=0}function a(f){n.push(f)}function o(f){r.push(f)}function l(f){e.setup(n,f)}function c(f){e.setupView(n,f)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function KT(i,t){let e=new WeakMap;function n(s,a=0){const o=e.get(s);let l;return o===void 0?(l=new kh(i,t),e.set(s,[l])):a>=o.length?(l=new kh(i,t),o.push(l)):l=o[a],l}function r(){e=new WeakMap}return{get:n,dispose:r}}class ZT extends Rr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class JT extends Rr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const QT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function eb(i,t,e){let n=new vu;const r=new Dt,s=new Dt,a=new Le,o=new ZT({depthPacking:jx}),l=new JT,c={},u=e.maxTextureSize,f={[Gi]:tn,[tn]:Gi,[mn]:mn},h=new br({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:QT,fragmentShader:tb}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Se(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pm;let d=this.type;this.render=function(b,A,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const M=i.getRenderTarget(),w=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Ni),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const it=d!==ii&&this.type===ii,U=d===ii&&this.type!==ii;for(let H=0,z=b.length;H<z;H++){const Y=b[H],q=Y.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const rt=q.getFrameExtents();if(r.multiply(rt),s.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/rt.x),r.x=s.x*rt.x,q.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/rt.y),r.y=s.y*rt.y,q.mapSize.y=s.y)),q.map===null||it===!0||U===!0){const dt=this.type!==ii?{minFilter:Xe,magFilter:Xe}:{};q.map!==null&&q.map.dispose(),q.map=new Er(r.x,r.y,dt),q.map.texture.name=Y.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const at=q.getViewportCount();for(let dt=0;dt<at;dt++){const ft=q.getViewport(dt);a.set(s.x*ft.x,s.y*ft.y,s.x*ft.z,s.y*ft.w),V.viewport(a),q.updateMatrices(Y,dt),n=q.getFrustum(),T(A,O,q.camera,Y,this.type)}q.isPointLightShadow!==!0&&this.type===ii&&S(q,O),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(M,w,G)};function S(b,A){const O=t.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Er(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,O,h,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,O,p,_,null)}function v(b,A,O,M){let w=null;const G=O.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(G!==void 0)w=G;else if(w=O.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=w.uuid,it=A.uuid;let U=c[V];U===void 0&&(U={},c[V]=U);let H=U[it];H===void 0&&(H=w.clone(),U[it]=H,A.addEventListener("dispose",R)),w=H}if(w.visible=A.visible,w.wireframe=A.wireframe,M===ii?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:f[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,O.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const V=i.properties.get(w);V.light=O}return w}function T(b,A,O,M,w){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&w===ii)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld);const it=t.update(b),U=b.material;if(Array.isArray(U)){const H=it.groups;for(let z=0,Y=H.length;z<Y;z++){const q=H[z],rt=U[q.materialIndex];if(rt&&rt.visible){const at=v(b,rt,M,w);b.onBeforeShadow(i,b,A,O,it,at,q),i.renderBufferDirect(O,null,it,at,b,q),b.onAfterShadow(i,b,A,O,it,at,q)}}}else if(U.visible){const H=v(b,U,M,w);b.onBeforeShadow(i,b,A,O,it,H,null),i.renderBufferDirect(O,null,it,H,b,null),b.onAfterShadow(i,b,A,O,it,H,null)}}const V=b.children;for(let it=0,U=V.length;it<U;it++)T(V[it],A,O,M,w)}function R(b){b.target.removeEventListener("dispose",R);for(const O in c){const M=c[O],w=b.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function nb(i,t,e){const n=e.isWebGL2;function r(){let N=!1;const gt=new Le;let St=null;const Ut=new Le(0,0,0,0);return{setMask:function(Lt){St!==Lt&&!N&&(i.colorMask(Lt,Lt,Lt,Lt),St=Lt)},setLocked:function(Lt){N=Lt},setClear:function(Lt,jt,$t,de,_e){_e===!0&&(Lt*=de,jt*=de,$t*=de),gt.set(Lt,jt,$t,de),Ut.equals(gt)===!1&&(i.clearColor(Lt,jt,$t,de),Ut.copy(gt))},reset:function(){N=!1,St=null,Ut.set(-1,0,0,0)}}}function s(){let N=!1,gt=null,St=null,Ut=null;return{setTest:function(Lt){Lt?Tt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(Lt){gt!==Lt&&!N&&(i.depthMask(Lt),gt=Lt)},setFunc:function(Lt){if(St!==Lt){switch(Lt){case Ex:i.depthFunc(i.NEVER);break;case Tx:i.depthFunc(i.ALWAYS);break;case bx:i.depthFunc(i.LESS);break;case So:i.depthFunc(i.LEQUAL);break;case Ax:i.depthFunc(i.EQUAL);break;case wx:i.depthFunc(i.GEQUAL);break;case Rx:i.depthFunc(i.GREATER);break;case Cx:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=Lt}},setLocked:function(Lt){N=Lt},setClear:function(Lt){Ut!==Lt&&(i.clearDepth(Lt),Ut=Lt)},reset:function(){N=!1,gt=null,St=null,Ut=null}}}function a(){let N=!1,gt=null,St=null,Ut=null,Lt=null,jt=null,$t=null,de=null,_e=null;return{setTest:function(Qt){N||(Qt?Tt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(Qt){gt!==Qt&&!N&&(i.stencilMask(Qt),gt=Qt)},setFunc:function(Qt,Me,Gn){(St!==Qt||Ut!==Me||Lt!==Gn)&&(i.stencilFunc(Qt,Me,Gn),St=Qt,Ut=Me,Lt=Gn)},setOp:function(Qt,Me,Gn){(jt!==Qt||$t!==Me||de!==Gn)&&(i.stencilOp(Qt,Me,Gn),jt=Qt,$t=Me,de=Gn)},setLocked:function(Qt){N=Qt},setClear:function(Qt){_e!==Qt&&(i.clearStencil(Qt),_e=Qt)},reset:function(){N=!1,gt=null,St=null,Ut=null,Lt=null,jt=null,$t=null,de=null,_e=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,f=new WeakMap;let h={},p={},g=new WeakMap,_=[],m=null,d=!1,S=null,v=null,T=null,R=null,b=null,A=null,O=null,M=new Kt(0,0,0),w=0,G=!1,V=null,it=null,U=null,H=null,z=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,rt=0;const at=i.getParameter(i.VERSION);at.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(at)[1]),q=rt>=1):at.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(at)[1]),q=rt>=2);let dt=null,ft={};const et=i.getParameter(i.SCISSOR_BOX),I=i.getParameter(i.VIEWPORT),Z=new Le().fromArray(et),tt=new Le().fromArray(I);function ut(N,gt,St,Ut){const Lt=new Uint8Array(4),jt=i.createTexture();i.bindTexture(N,jt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $t=0;$t<St;$t++)n&&(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)?i.texImage3D(gt,0,i.RGBA,1,1,Ut,0,i.RGBA,i.UNSIGNED_BYTE,Lt):i.texImage2D(gt+$t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Lt);return jt}const Et={};Et[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Et[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Tt(i.DEPTH_TEST),l.setFunc(So),ot(!1),E(Tf),Tt(i.CULL_FACE),W(Ni);function Tt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function yt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ot(N,gt){return p[N]!==gt?(i.bindFramebuffer(N,gt),p[N]=gt,n&&(N===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=gt),N===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=gt)),!0):!1}function y(N,gt){let St=_,Ut=!1;if(N)if(St=g.get(gt),St===void 0&&(St=[],g.set(gt,St)),N.isWebGLMultipleRenderTargets){const Lt=N.texture;if(St.length!==Lt.length||St[0]!==i.COLOR_ATTACHMENT0){for(let jt=0,$t=Lt.length;jt<$t;jt++)St[jt]=i.COLOR_ATTACHMENT0+jt;St.length=Lt.length,Ut=!0}}else St[0]!==i.COLOR_ATTACHMENT0&&(St[0]=i.COLOR_ATTACHMENT0,Ut=!0);else St[0]!==i.BACK&&(St[0]=i.BACK,Ut=!0);Ut&&(e.isWebGL2?i.drawBuffers(St):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(St))}function D(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const F={[ar]:i.FUNC_ADD,[lx]:i.FUNC_SUBTRACT,[cx]:i.FUNC_REVERSE_SUBTRACT};if(n)F[Rf]=i.MIN,F[Cf]=i.MAX;else{const N=t.get("EXT_blend_minmax");N!==null&&(F[Rf]=N.MIN_EXT,F[Cf]=N.MAX_EXT)}const $={[ux]:i.ZERO,[fx]:i.ONE,[hx]:i.SRC_COLOR,[yc]:i.SRC_ALPHA,[vx]:i.SRC_ALPHA_SATURATE,[_x]:i.DST_COLOR,[px]:i.DST_ALPHA,[dx]:i.ONE_MINUS_SRC_COLOR,[Sc]:i.ONE_MINUS_SRC_ALPHA,[gx]:i.ONE_MINUS_DST_COLOR,[mx]:i.ONE_MINUS_DST_ALPHA,[xx]:i.CONSTANT_COLOR,[Mx]:i.ONE_MINUS_CONSTANT_COLOR,[yx]:i.CONSTANT_ALPHA,[Sx]:i.ONE_MINUS_CONSTANT_ALPHA};function W(N,gt,St,Ut,Lt,jt,$t,de,_e,Qt){if(N===Ni){d===!0&&(yt(i.BLEND),d=!1);return}if(d===!1&&(Tt(i.BLEND),d=!0),N!==ox){if(N!==S||Qt!==G){if((v!==ar||b!==ar)&&(i.blendEquation(i.FUNC_ADD),v=ar,b=ar),Qt)switch(N){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bf:i.blendFunc(i.ONE,i.ONE);break;case Af:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wf:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bf:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Af:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wf:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}T=null,R=null,A=null,O=null,M.set(0,0,0),w=0,S=N,G=Qt}return}Lt=Lt||gt,jt=jt||St,$t=$t||Ut,(gt!==v||Lt!==b)&&(i.blendEquationSeparate(F[gt],F[Lt]),v=gt,b=Lt),(St!==T||Ut!==R||jt!==A||$t!==O)&&(i.blendFuncSeparate($[St],$[Ut],$[jt],$[$t]),T=St,R=Ut,A=jt,O=$t),(de.equals(M)===!1||_e!==w)&&(i.blendColor(de.r,de.g,de.b,_e),M.copy(de),w=_e),S=N,G=!1}function st(N,gt){N.side===mn?yt(i.CULL_FACE):Tt(i.CULL_FACE);let St=N.side===tn;gt&&(St=!St),ot(St),N.blending===fs&&N.transparent===!1?W(Ni):W(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),o.setMask(N.colorWrite);const Ut=N.stencilWrite;c.setTest(Ut),Ut&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),L(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Tt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(N){V!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),V=N)}function E(N){N!==rx?(Tt(i.CULL_FACE),N!==it&&(N===Tf?i.cullFace(i.BACK):N===sx?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),it=N}function x(N){N!==U&&(q&&i.lineWidth(N),U=N)}function L(N,gt,St){N?(Tt(i.POLYGON_OFFSET_FILL),(H!==gt||z!==St)&&(i.polygonOffset(gt,St),H=gt,z=St)):yt(i.POLYGON_OFFSET_FILL)}function X(N){N?Tt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function K(N){N===void 0&&(N=i.TEXTURE0+Y-1),dt!==N&&(i.activeTexture(N),dt=N)}function j(N,gt,St){St===void 0&&(dt===null?St=i.TEXTURE0+Y-1:St=dt);let Ut=ft[St];Ut===void 0&&(Ut={type:void 0,texture:void 0},ft[St]=Ut),(Ut.type!==N||Ut.texture!==gt)&&(dt!==St&&(i.activeTexture(St),dt=St),i.bindTexture(N,gt||Et[N]),Ut.type=N,Ut.texture=gt)}function ht(){const N=ft[dt];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function lt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function P(N){Z.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Z.copy(N))}function mt(N){tt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),tt.copy(N))}function Ct(N,gt){let St=f.get(gt);St===void 0&&(St=new WeakMap,f.set(gt,St));let Ut=St.get(N);Ut===void 0&&(Ut=i.getUniformBlockIndex(gt,N.name),St.set(N,Ut))}function At(N,gt){const Ut=f.get(gt).get(N);u.get(gt)!==Ut&&(i.uniformBlockBinding(gt,Ut,N.__bindingPointIndex),u.set(gt,Ut))}function pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},dt=null,ft={},p={},g=new WeakMap,_=[],m=null,d=!1,S=null,v=null,T=null,R=null,b=null,A=null,O=null,M=new Kt(0,0,0),w=0,G=!1,V=null,it=null,U=null,H=null,z=null,Z.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Tt,disable:yt,bindFramebuffer:Ot,drawBuffers:y,useProgram:D,setBlending:W,setMaterial:st,setFlipSided:ot,setCullFace:E,setLineWidth:x,setPolygonOffset:L,setScissorTest:X,activeTexture:K,bindTexture:j,unbindTexture:ht,compressedTexImage2D:lt,compressedTexImage3D:_t,texImage2D:Rt,texImage3D:vt,updateUBOMapping:Ct,uniformBlockBinding:At,texStorage2D:zt,texStorage3D:It,texSubImage2D:xt,texSubImage3D:wt,compressedTexSubImage2D:ct,compressedTexSubImage3D:Wt,scissor:P,viewport:mt,reset:pt}}function ib(i,t,e,n,r,s,a){const o=r.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):wo("canvas")}function _(E,x,L,X){let K=1;if((E.width>X||E.height>X)&&(K=X/Math.max(E.width,E.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const j=x?Pc:Math.floor,ht=j(K*E.width),lt=j(K*E.height);f===void 0&&(f=g(ht,lt));const _t=L?g(ht,lt):f;return _t.width=ht,_t.height=lt,_t.getContext("2d").drawImage(E,0,0,ht,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+ht+"x"+lt+")."),_t}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return rh(E.width)&&rh(E.height)}function d(E){return o?!1:E.wrapS!==On||E.wrapT!==On||E.minFilter!==Xe&&E.minFilter!==bn}function S(E,x){return E.generateMipmaps&&x&&E.minFilter!==Xe&&E.minFilter!==bn}function v(E){i.generateMipmap(E)}function T(E,x,L,X,K=!1){if(o===!1)return x;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=x;if(x===i.RED&&(L===i.FLOAT&&(j=i.R32F),L===i.HALF_FLOAT&&(j=i.R16F),L===i.UNSIGNED_BYTE&&(j=i.R8)),x===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(j=i.R8UI),L===i.UNSIGNED_SHORT&&(j=i.R16UI),L===i.UNSIGNED_INT&&(j=i.R32UI),L===i.BYTE&&(j=i.R8I),L===i.SHORT&&(j=i.R16I),L===i.INT&&(j=i.R32I)),x===i.RG&&(L===i.FLOAT&&(j=i.RG32F),L===i.HALF_FLOAT&&(j=i.RG16F),L===i.UNSIGNED_BYTE&&(j=i.RG8)),x===i.RGBA){const ht=K?Eo:ne.getTransfer(X);L===i.FLOAT&&(j=i.RGBA32F),L===i.HALF_FLOAT&&(j=i.RGBA16F),L===i.UNSIGNED_BYTE&&(j=ht===ae?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function R(E,x,L){return S(E,L)===!0||E.isFramebufferTexture&&E.minFilter!==Xe&&E.minFilter!==bn?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function b(E){return E===Xe||E===Pf||E===ml?i.NEAREST:i.LINEAR}function A(E){const x=E.target;x.removeEventListener("dispose",A),M(x),x.isVideoTexture&&u.delete(x)}function O(E){const x=E.target;x.removeEventListener("dispose",O),G(x)}function M(E){const x=n.get(E);if(x.__webglInit===void 0)return;const L=E.source,X=h.get(L);if(X){const K=X[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&w(E),Object.keys(X).length===0&&h.delete(L)}n.remove(E)}function w(E){const x=n.get(E);i.deleteTexture(x.__webglTexture);const L=E.source,X=h.get(L);delete X[x.__cacheKey],a.memory.textures--}function G(E){const x=E.texture,L=n.get(E),X=n.get(x);if(X.__webglTexture!==void 0&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(L.__webglFramebuffer[K]))for(let j=0;j<L.__webglFramebuffer[K].length;j++)i.deleteFramebuffer(L.__webglFramebuffer[K][j]);else i.deleteFramebuffer(L.__webglFramebuffer[K]);L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer[K])}else{if(Array.isArray(L.__webglFramebuffer))for(let K=0;K<L.__webglFramebuffer.length;K++)i.deleteFramebuffer(L.__webglFramebuffer[K]);else i.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&i.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let K=0;K<L.__webglColorRenderbuffer.length;K++)L.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(L.__webglColorRenderbuffer[K]);L.__webglDepthRenderbuffer&&i.deleteRenderbuffer(L.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let K=0,j=x.length;K<j;K++){const ht=n.get(x[K]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(x[K])}n.remove(x),n.remove(E)}let V=0;function it(){V=0}function U(){const E=V;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),V+=1,E}function H(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function z(E,x){const L=n.get(E);if(E.isVideoTexture&&st(E),E.isRenderTargetTexture===!1&&E.version>0&&L.__version!==E.version){const X=E.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(L,E,x);return}}e.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+x)}function Y(E,x){const L=n.get(E);if(E.version>0&&L.__version!==E.version){Z(L,E,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+x)}function q(E,x){const L=n.get(E);if(E.version>0&&L.__version!==E.version){Z(L,E,x);return}e.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+x)}function rt(E,x){const L=n.get(E);if(E.version>0&&L.__version!==E.version){tt(L,E,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+x)}const at={[bc]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[Ac]:i.MIRRORED_REPEAT},dt={[Xe]:i.NEAREST,[Pf]:i.NEAREST_MIPMAP_NEAREST,[ml]:i.NEAREST_MIPMAP_LINEAR,[bn]:i.LINEAR,[Bx]:i.LINEAR_MIPMAP_NEAREST,[oa]:i.LINEAR_MIPMAP_LINEAR},ft={[Kx]:i.NEVER,[nM]:i.ALWAYS,[Zx]:i.LESS,[Am]:i.LEQUAL,[Jx]:i.EQUAL,[eM]:i.GEQUAL,[Qx]:i.GREATER,[tM]:i.NOTEQUAL};function et(E,x,L){if(L?(i.texParameteri(E,i.TEXTURE_WRAP_S,at[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,at[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,at[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,dt[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,dt[x.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==On||x.wrapT!==On)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,b(x.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,b(x.minFilter)),x.minFilter!==Xe&&x.minFilter!==bn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ft[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const X=t.get("EXT_texture_filter_anisotropic");if(x.magFilter===Xe||x.minFilter!==ml&&x.minFilter!==oa||x.type===Ci&&t.has("OES_texture_float_linear")===!1||o===!1&&x.type===la&&t.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(E,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function I(E,x){let L=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",A));const X=x.source;let K=h.get(X);K===void 0&&(K={},h.set(X,K));const j=H(x);if(j!==E.__cacheKey){K[j]===void 0&&(K[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),K[j].usedTimes++;const ht=K[E.__cacheKey];ht!==void 0&&(K[E.__cacheKey].usedTimes--,ht.usedTimes===0&&w(x)),E.__cacheKey=j,E.__webglTexture=K[j].texture}return L}function Z(E,x,L){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);const K=I(E,x),j=x.source;e.bindTexture(X,E.__webglTexture,i.TEXTURE0+L);const ht=n.get(j);if(j.version!==ht.__version||K===!0){e.activeTexture(i.TEXTURE0+L);const lt=ne.getPrimaries(ne.workingColorSpace),_t=x.colorSpace===Rn?null:ne.getPrimaries(x.colorSpace),xt=x.colorSpace===Rn||lt===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const wt=d(x)&&m(x.image)===!1;let ct=_(x.image,wt,!1,r.maxTextureSize);ct=ot(x,ct);const Wt=m(ct)||o,zt=s.convert(x.format,x.colorSpace);let It=s.convert(x.type),Rt=T(x.internalFormat,zt,It,x.colorSpace,x.isVideoTexture);et(X,x,Wt);let vt;const P=x.mipmaps,mt=o&&x.isVideoTexture!==!0&&Rt!==Em,Ct=ht.__version===void 0||K===!0,At=R(x,ct,Wt);if(x.isDepthTexture)Rt=i.DEPTH_COMPONENT,o?x.type===Ci?Rt=i.DEPTH_COMPONENT32F:x.type===Ri?Rt=i.DEPTH_COMPONENT24:x.type===_r?Rt=i.DEPTH24_STENCIL8:Rt=i.DEPTH_COMPONENT16:x.type===Ci&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===gr&&Rt===i.DEPTH_COMPONENT&&x.type!==mu&&x.type!==Ri&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Ri,It=s.convert(x.type)),x.format===Es&&Rt===i.DEPTH_COMPONENT&&(Rt=i.DEPTH_STENCIL,x.type!==_r&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=_r,It=s.convert(x.type))),Ct&&(mt?e.texStorage2D(i.TEXTURE_2D,1,Rt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,Rt,ct.width,ct.height,0,zt,It,null));else if(x.isDataTexture)if(P.length>0&&Wt){mt&&Ct&&e.texStorage2D(i.TEXTURE_2D,At,Rt,P[0].width,P[0].height);for(let pt=0,N=P.length;pt<N;pt++)vt=P[pt],mt?e.texSubImage2D(i.TEXTURE_2D,pt,0,0,vt.width,vt.height,zt,It,vt.data):e.texImage2D(i.TEXTURE_2D,pt,Rt,vt.width,vt.height,0,zt,It,vt.data);x.generateMipmaps=!1}else mt?(Ct&&e.texStorage2D(i.TEXTURE_2D,At,Rt,ct.width,ct.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct.width,ct.height,zt,It,ct.data)):e.texImage2D(i.TEXTURE_2D,0,Rt,ct.width,ct.height,0,zt,It,ct.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){mt&&Ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Rt,P[0].width,P[0].height,ct.depth);for(let pt=0,N=P.length;pt<N;pt++)vt=P[pt],x.format!==Fn?zt!==null?mt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,vt.width,vt.height,ct.depth,zt,vt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pt,Rt,vt.width,vt.height,ct.depth,0,vt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,pt,0,0,0,vt.width,vt.height,ct.depth,zt,It,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,pt,Rt,vt.width,vt.height,ct.depth,0,zt,It,vt.data)}else{mt&&Ct&&e.texStorage2D(i.TEXTURE_2D,At,Rt,P[0].width,P[0].height);for(let pt=0,N=P.length;pt<N;pt++)vt=P[pt],x.format!==Fn?zt!==null?mt?e.compressedTexSubImage2D(i.TEXTURE_2D,pt,0,0,vt.width,vt.height,zt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,pt,Rt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mt?e.texSubImage2D(i.TEXTURE_2D,pt,0,0,vt.width,vt.height,zt,It,vt.data):e.texImage2D(i.TEXTURE_2D,pt,Rt,vt.width,vt.height,0,zt,It,vt.data)}else if(x.isDataArrayTexture)mt?(Ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Rt,ct.width,ct.height,ct.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,zt,It,ct.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,ct.width,ct.height,ct.depth,0,zt,It,ct.data);else if(x.isData3DTexture)mt?(Ct&&e.texStorage3D(i.TEXTURE_3D,At,Rt,ct.width,ct.height,ct.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,zt,It,ct.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,ct.width,ct.height,ct.depth,0,zt,It,ct.data);else if(x.isFramebufferTexture){if(Ct)if(mt)e.texStorage2D(i.TEXTURE_2D,At,Rt,ct.width,ct.height);else{let pt=ct.width,N=ct.height;for(let gt=0;gt<At;gt++)e.texImage2D(i.TEXTURE_2D,gt,Rt,pt,N,0,zt,It,null),pt>>=1,N>>=1}}else if(P.length>0&&Wt){mt&&Ct&&e.texStorage2D(i.TEXTURE_2D,At,Rt,P[0].width,P[0].height);for(let pt=0,N=P.length;pt<N;pt++)vt=P[pt],mt?e.texSubImage2D(i.TEXTURE_2D,pt,0,0,zt,It,vt):e.texImage2D(i.TEXTURE_2D,pt,Rt,zt,It,vt);x.generateMipmaps=!1}else mt?(Ct&&e.texStorage2D(i.TEXTURE_2D,At,Rt,ct.width,ct.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,zt,It,ct)):e.texImage2D(i.TEXTURE_2D,0,Rt,zt,It,ct);S(x,Wt)&&v(X),ht.__version=j.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function tt(E,x,L){if(x.image.length!==6)return;const X=I(E,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+L);const j=n.get(K);if(K.version!==j.__version||X===!0){e.activeTexture(i.TEXTURE0+L);const ht=ne.getPrimaries(ne.workingColorSpace),lt=x.colorSpace===Rn?null:ne.getPrimaries(x.colorSpace),_t=x.colorSpace===Rn||ht===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const xt=x.isCompressedTexture||x.image[0].isCompressedTexture,wt=x.image[0]&&x.image[0].isDataTexture,ct=[];for(let pt=0;pt<6;pt++)!xt&&!wt?ct[pt]=_(x.image[pt],!1,!0,r.maxCubemapSize):ct[pt]=wt?x.image[pt].image:x.image[pt],ct[pt]=ot(x,ct[pt]);const Wt=ct[0],zt=m(Wt)||o,It=s.convert(x.format,x.colorSpace),Rt=s.convert(x.type),vt=T(x.internalFormat,It,Rt,x.colorSpace),P=o&&x.isVideoTexture!==!0,mt=j.__version===void 0||X===!0;let Ct=R(x,Wt,zt);et(i.TEXTURE_CUBE_MAP,x,zt);let At;if(xt){P&&mt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,vt,Wt.width,Wt.height);for(let pt=0;pt<6;pt++){At=ct[pt].mipmaps;for(let N=0;N<At.length;N++){const gt=At[N];x.format!==Fn?It!==null?P?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N,0,0,gt.width,gt.height,It,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N,vt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N,0,0,gt.width,gt.height,It,Rt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N,vt,gt.width,gt.height,0,It,Rt,gt.data)}}}else{At=x.mipmaps,P&&mt&&(At.length>0&&Ct++,e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,vt,ct[0].width,ct[0].height));for(let pt=0;pt<6;pt++)if(wt){P?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,ct[pt].width,ct[pt].height,It,Rt,ct[pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,vt,ct[pt].width,ct[pt].height,0,It,Rt,ct[pt].data);for(let N=0;N<At.length;N++){const St=At[N].image[pt].image;P?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N+1,0,0,St.width,St.height,It,Rt,St.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N+1,vt,St.width,St.height,0,It,Rt,St.data)}}else{P?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,It,Rt,ct[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,vt,It,Rt,ct[pt]);for(let N=0;N<At.length;N++){const gt=At[N];P?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N+1,0,0,It,Rt,gt.image[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,N+1,vt,It,Rt,gt.image[pt])}}}S(x,zt)&&v(i.TEXTURE_CUBE_MAP),j.__version=K.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function ut(E,x,L,X,K,j){const ht=s.convert(L.format,L.colorSpace),lt=s.convert(L.type),_t=T(L.internalFormat,ht,lt,L.colorSpace);if(!n.get(x).__hasExternalTextures){const wt=Math.max(1,x.width>>j),ct=Math.max(1,x.height>>j);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,j,_t,wt,ct,x.depth,0,ht,lt,null):e.texImage2D(K,j,_t,wt,ct,0,ht,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),W(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,n.get(L).__webglTexture,0,$(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,n.get(L).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Et(E,x,L){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer&&!x.stencilBuffer){let X=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(L||W(x)){const K=x.depthTexture;K&&K.isDepthTexture&&(K.type===Ci?X=i.DEPTH_COMPONENT32F:K.type===Ri&&(X=i.DEPTH_COMPONENT24));const j=$(x);W(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,X,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,j,X,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,X,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(x.depthBuffer&&x.stencilBuffer){const X=$(x);L&&W(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,x.width,x.height):W(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const X=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<X.length;K++){const j=X[K],ht=s.convert(j.format,j.colorSpace),lt=s.convert(j.type),_t=T(j.internalFormat,ht,lt,j.colorSpace),xt=$(x);L&&W(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,_t,x.width,x.height):W(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,_t,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,_t,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Tt(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),z(x.depthTexture,0);const X=n.get(x.depthTexture).__webglTexture,K=$(x);if(x.depthTexture.format===gr)W(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(x.depthTexture.format===Es)W(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function yt(E){const x=n.get(E),L=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");Tt(x.__webglFramebuffer,E)}else if(L){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]=i.createRenderbuffer(),Et(x.__webglDepthbuffer[X],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Et(x.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(E,x,L){const X=n.get(E);x!==void 0&&ut(X.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&yt(E)}function y(E){const x=E.texture,L=n.get(E),X=n.get(x);E.addEventListener("dispose",O),E.isWebGLMultipleRenderTargets!==!0&&(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,a.memory.textures++);const K=E.isWebGLCubeRenderTarget===!0,j=E.isWebGLMultipleRenderTargets===!0,ht=m(E)||o;if(K){L.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(o&&x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer[lt]=[];for(let _t=0;_t<x.mipmaps.length;_t++)L.__webglFramebuffer[lt][_t]=i.createFramebuffer()}else L.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){L.__webglFramebuffer=[];for(let lt=0;lt<x.mipmaps.length;lt++)L.__webglFramebuffer[lt]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(j)if(r.drawBuffers){const lt=E.texture;for(let _t=0,xt=lt.length;_t<xt;_t++){const wt=n.get(lt[_t]);wt.__webglTexture===void 0&&(wt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&W(E)===!1){const lt=j?x:[x];L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let _t=0;_t<lt.length;_t++){const xt=lt[_t];L.__webglColorRenderbuffer[_t]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[_t]);const wt=s.convert(xt.format,xt.colorSpace),ct=s.convert(xt.type),Wt=T(xt.internalFormat,wt,ct,xt.colorSpace,E.isXRRenderTarget===!0),zt=$(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,Wt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,L.__webglColorRenderbuffer[_t])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Et(L.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),et(i.TEXTURE_CUBE_MAP,x,ht);for(let lt=0;lt<6;lt++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let _t=0;_t<x.mipmaps.length;_t++)ut(L.__webglFramebuffer[lt][_t],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,_t);else ut(L.__webglFramebuffer[lt],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);S(x,ht)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(j){const lt=E.texture;for(let _t=0,xt=lt.length;_t<xt;_t++){const wt=lt[_t],ct=n.get(wt);e.bindTexture(i.TEXTURE_2D,ct.__webglTexture),et(i.TEXTURE_2D,wt,ht),ut(L.__webglFramebuffer,E,wt,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,0),S(wt,ht)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?lt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,X.__webglTexture),et(lt,x,ht),o&&x.mipmaps&&x.mipmaps.length>0)for(let _t=0;_t<x.mipmaps.length;_t++)ut(L.__webglFramebuffer[_t],E,x,i.COLOR_ATTACHMENT0,lt,_t);else ut(L.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,lt,0);S(x,ht)&&v(lt),e.unbindTexture()}E.depthBuffer&&yt(E)}function D(E){const x=m(E)||o,L=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let X=0,K=L.length;X<K;X++){const j=L[X];if(S(j,x)){const ht=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,lt=n.get(j).__webglTexture;e.bindTexture(ht,lt),v(ht),e.unbindTexture()}}}function F(E){if(o&&E.samples>0&&W(E)===!1){const x=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],L=E.width,X=E.height;let K=i.COLOR_BUFFER_BIT;const j=[],ht=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(E),_t=E.isWebGLMultipleRenderTargets===!0;if(_t)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){j.push(i.COLOR_ATTACHMENT0+xt),E.depthBuffer&&j.push(ht);const wt=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(wt===!1&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),_t&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[xt]),wt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ht]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ht])),_t){const ct=n.get(x[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,L,X,0,0,L,X,K,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_t)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,lt.__webglColorRenderbuffer[xt]);const wt=n.get(x[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function $(E){return Math.min(r.maxSamples,E.samples)}function W(E){const x=n.get(E);return o&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function st(E){const x=a.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function ot(E,x){const L=E.colorSpace,X=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Rc||L!==di&&L!==Rn&&(ne.getTransfer(L)===ae?o===!1?t.has("EXT_sRGB")===!0&&X===Fn?(E.format=Rc,E.minFilter=bn,E.generateMipmaps=!1):x=Rm.sRGBToLinear(x):(X!==Fn||K!==Fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),x}this.allocateTextureUnit=U,this.resetTextureUnits=it,this.setTexture2D=z,this.setTexture2DArray=Y,this.setTexture3D=q,this.setTextureCube=rt,this.rebindTextures=Ot,this.setupRenderTarget=y,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=yt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=W}function rb(i,t,e){const n=e.isWebGL2;function r(s,a=Rn){let o;const l=ne.getTransfer(a);if(s===Fi)return i.UNSIGNED_BYTE;if(s===vm)return i.UNSIGNED_SHORT_4_4_4_4;if(s===xm)return i.UNSIGNED_SHORT_5_5_5_1;if(s===zx)return i.BYTE;if(s===Hx)return i.SHORT;if(s===mu)return i.UNSIGNED_SHORT;if(s===gm)return i.INT;if(s===Ri)return i.UNSIGNED_INT;if(s===Ci)return i.FLOAT;if(s===la)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Gx)return i.ALPHA;if(s===Fn)return i.RGBA;if(s===kx)return i.LUMINANCE;if(s===Vx)return i.LUMINANCE_ALPHA;if(s===gr)return i.DEPTH_COMPONENT;if(s===Es)return i.DEPTH_STENCIL;if(s===Rc)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Wx)return i.RED;if(s===Mm)return i.RED_INTEGER;if(s===Xx)return i.RG;if(s===ym)return i.RG_INTEGER;if(s===Sm)return i.RGBA_INTEGER;if(s===_l||s===gl||s===vl||s===xl)if(l===ae)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===_l)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===gl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===vl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===xl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===_l)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===gl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===vl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===xl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Lf||s===Df||s===If||s===Uf)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Lf)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Df)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===If)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Uf)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Em)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Nf||s===Of)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Nf)return l===ae?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Of)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ff||s===Bf||s===zf||s===Hf||s===Gf||s===kf||s===Vf||s===Wf||s===Xf||s===Yf||s===qf||s===jf||s===$f||s===Kf)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Ff)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Bf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===zf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Hf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Gf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===kf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Vf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Wf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Xf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Yf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===qf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===jf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===$f)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Kf)return l===ae?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ml||s===Zf||s===Jf)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===Ml)return l===ae?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Zf)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Jf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Yx||s===Qf||s===th||s===eh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===Ml)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Qf)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===th)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===eh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===_r?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class sb extends wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pi extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ab={type:"move"};class Wl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ab)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ob extends wr{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const _=e.getContextAttributes();let m=null,d=null;const S=[],v=[],T=new Dt;let R=null;const b=new wn;b.layers.enable(1),b.viewport=new Le;const A=new wn;A.layers.enable(2),A.viewport=new Le;const O=[b,A],M=new sb;M.layers.enable(1),M.layers.enable(2);let w=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let I=S[et];return I===void 0&&(I=new Wl,S[et]=I),I.getTargetRaySpace()},this.getControllerGrip=function(et){let I=S[et];return I===void 0&&(I=new Wl,S[et]=I),I.getGripSpace()},this.getHand=function(et){let I=S[et];return I===void 0&&(I=new Wl,S[et]=I),I.getHandSpace()};function V(et){const I=v.indexOf(et.inputSource);if(I===-1)return;const Z=S[I];Z!==void 0&&(Z.update(et.inputSource,et.frame,c||a),Z.dispatchEvent({type:et.type,data:et.inputSource}))}function it(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",it),r.removeEventListener("inputsourceschange",U);for(let et=0;et<S.length;et++){const I=v[et];I!==null&&(v[et]=null,S[et].disconnect(I))}w=null,G=null,t.setRenderTarget(m),p=null,h=null,f=null,r=null,d=null,ft.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){s=et,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){o=et,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(et){c=et},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(et){if(r=et,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",it),r.addEventListener("inputsourceschange",U),_.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(T),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const I={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,I),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Er(p.framebufferWidth,p.framebufferHeight,{format:Fn,type:Fi,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let I=null,Z=null,tt=null;_.depth&&(tt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,I=_.stencil?Es:gr,Z=_.stencil?_r:Ri);const ut={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:s};f=new XRWebGLBinding(r,e),h=f.createProjectionLayer(ut),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),d=new Er(h.textureWidth,h.textureHeight,{format:Fn,type:Fi,depthTexture:new zm(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Et=t.properties.get(d);Et.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ft.setContext(r),ft.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function U(et){for(let I=0;I<et.removed.length;I++){const Z=et.removed[I],tt=v.indexOf(Z);tt>=0&&(v[tt]=null,S[tt].disconnect(Z))}for(let I=0;I<et.added.length;I++){const Z=et.added[I];let tt=v.indexOf(Z);if(tt===-1){for(let Et=0;Et<S.length;Et++)if(Et>=v.length){v.push(Z),tt=Et;break}else if(v[Et]===null){v[Et]=Z,tt=Et;break}if(tt===-1)break}const ut=S[tt];ut&&ut.connect(Z)}}const H=new B,z=new B;function Y(et,I,Z){H.setFromMatrixPosition(I.matrixWorld),z.setFromMatrixPosition(Z.matrixWorld);const tt=H.distanceTo(z),ut=I.projectionMatrix.elements,Et=Z.projectionMatrix.elements,Tt=ut[14]/(ut[10]-1),yt=ut[14]/(ut[10]+1),Ot=(ut[9]+1)/ut[5],y=(ut[9]-1)/ut[5],D=(ut[8]-1)/ut[0],F=(Et[8]+1)/Et[0],$=Tt*D,W=Tt*F,st=tt/(-D+F),ot=st*-D;I.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(ot),et.translateZ(st),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert();const E=Tt+st,x=yt+st,L=$-ot,X=W+(tt-ot),K=Ot*yt/x*E,j=y*yt/x*E;et.projectionMatrix.makePerspective(L,X,K,j,E,x),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}function q(et,I){I===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(I.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(r===null)return;M.near=A.near=b.near=et.near,M.far=A.far=b.far=et.far,(w!==M.near||G!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,G=M.far);const I=et.parent,Z=M.cameras;q(M,I);for(let tt=0;tt<Z.length;tt++)q(Z[tt],I);Z.length===2?Y(M,b,A):M.projectionMatrix.copy(b.projectionMatrix),rt(et,M,I)};function rt(et,I,Z){Z===null?et.matrix.copy(I.matrixWorld):(et.matrix.copy(Z.matrixWorld),et.matrix.invert(),et.matrix.multiply(I.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(I.projectionMatrix),et.projectionMatrixInverse.copy(I.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=Cc*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(et){l=et,h!==null&&(h.fixedFoveation=et),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=et)};let at=null;function dt(et,I){if(u=I.getViewerPose(c||a),g=I,u!==null){const Z=u.views;p!==null&&(t.setRenderTargetFramebuffer(d,p.framebuffer),t.setRenderTarget(d));let tt=!1;Z.length!==M.cameras.length&&(M.cameras.length=0,tt=!0);for(let ut=0;ut<Z.length;ut++){const Et=Z[ut];let Tt=null;if(p!==null)Tt=p.getViewport(Et);else{const Ot=f.getViewSubImage(h,Et);Tt=Ot.viewport,ut===0&&(t.setRenderTargetTextures(d,Ot.colorTexture,h.ignoreDepthValues?void 0:Ot.depthStencilTexture),t.setRenderTarget(d))}let yt=O[ut];yt===void 0&&(yt=new wn,yt.layers.enable(ut),yt.viewport=new Le,O[ut]=yt),yt.matrix.fromArray(Et.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(Et.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),ut===0&&(M.matrix.copy(yt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),tt===!0&&M.cameras.push(yt)}}for(let Z=0;Z<S.length;Z++){const tt=v[Z],ut=S[Z];tt!==null&&ut!==void 0&&ut.update(tt,I,c||a)}at&&at(et,I),I.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:I}),g=null}const ft=new Fm;ft.setAnimationLoop(dt),this.setAnimationLoop=function(et){at=et},this.dispose=function(){}}}function lb(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Um(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,S,v,T){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,T)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,S,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===tn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===tn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=t.get(d).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,e(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=v*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),t.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===tn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const S=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function cb(i,t,e,n){let r={},s={},a=[];const o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,v){const T=v.program;n.uniformBlockBinding(S,T)}function c(S,v){let T=r[S.id];T===void 0&&(g(S),T=u(S),r[S.id]=T,S.addEventListener("dispose",m));const R=v.program;n.updateUBOMapping(S,R);const b=t.render.frame;s[S.id]!==b&&(h(S),s[S.id]=b)}function u(S){const v=f();S.__bindingPointIndex=v;const T=i.createBuffer(),R=S.__size,b=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,T),T}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const v=r[S.id],T=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let b=0,A=T.length;b<A;b++){const O=Array.isArray(T[b])?T[b]:[T[b]];for(let M=0,w=O.length;M<w;M++){const G=O[M];if(p(G,b,M,R)===!0){const V=G.__offset,it=Array.isArray(G.value)?G.value:[G.value];let U=0;for(let H=0;H<it.length;H++){const z=it[H],Y=_(z);typeof z=="number"||typeof z=="boolean"?(G.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,V+U,G.__data)):z.isMatrix3?(G.__data[0]=z.elements[0],G.__data[1]=z.elements[1],G.__data[2]=z.elements[2],G.__data[3]=0,G.__data[4]=z.elements[3],G.__data[5]=z.elements[4],G.__data[6]=z.elements[5],G.__data[7]=0,G.__data[8]=z.elements[6],G.__data[9]=z.elements[7],G.__data[10]=z.elements[8],G.__data[11]=0):(z.toArray(G.__data,U),U+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,G.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,v,T,R){const b=S.value,A=v+"_"+T;if(R[A]===void 0)return typeof b=="number"||typeof b=="boolean"?R[A]=b:R[A]=b.clone(),!0;{const O=R[A];if(typeof b=="number"||typeof b=="boolean"){if(O!==b)return R[A]=b,!0}else if(O.equals(b)===!1)return O.copy(b),!0}return!1}function g(S){const v=S.uniforms;let T=0;const R=16;for(let A=0,O=v.length;A<O;A++){const M=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,G=M.length;w<G;w++){const V=M[w],it=Array.isArray(V.value)?V.value:[V.value];for(let U=0,H=it.length;U<H;U++){const z=it[U],Y=_(z),q=T%R;q!==0&&R-q<Y.boundary&&(T+=R-q),V.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=T,T+=Y.storage}}}const b=T%R;return b>0&&(T+=R-b),S.__size=T,S.__cache={},this}function _(S){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function m(S){const v=S.target;v.removeEventListener("dispose",m);const T=a.indexOf(v.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Xm{constructor(t={}){const{canvas:e=sM(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=a;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const d=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this._useLegacyLights=!1,this.toneMapping=Oi,this.toneMappingExposure=1;const v=this;let T=!1,R=0,b=0,A=null,O=-1,M=null;const w=new Le,G=new Le;let V=null;const it=new Kt(0);let U=0,H=e.width,z=e.height,Y=1,q=null,rt=null;const at=new Le(0,0,H,z),dt=new Le(0,0,H,z);let ft=!1;const et=new vu;let I=!1,Z=!1,tt=null;const ut=new xe,Et=new Dt,Tt=new B,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ot(){return A===null?Y:1}let y=n;function D(C,k){for(let Q=0;Q<C.length;Q++){const nt=C[Q],J=e.getContext(nt,k);if(J!==null)return J}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pu}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",gt,!1),y===null){const k=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&k.shift(),y=D(k,C),y===null)throw D(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&y instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),y.getShaderPrecisionFormat===void 0&&(y.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let F,$,W,st,ot,E,x,L,X,K,j,ht,lt,_t,xt,wt,ct,Wt,zt,It,Rt,vt,P,mt;function Ct(){F=new xE(y),$=new dE(y,F,t),F.init($),vt=new rb(y,F,$),W=new nb(y,F,$),st=new SE(y),ot=new kT,E=new ib(y,F,W,ot,$,vt,st),x=new mE(v),L=new vE(v),X=new PM(y,$),P=new fE(y,F,X,$),K=new ME(y,X,st,P),j=new AE(y,K,X,st),zt=new bE(y,$,E),wt=new pE(ot),ht=new GT(v,x,L,F,$,P,wt),lt=new lb(v,ot),_t=new WT,xt=new KT(F,$),Wt=new uE(v,x,L,W,j,h,l),ct=new eb(v,j,$),mt=new cb(y,st,$,W),It=new hE(y,F,st,$),Rt=new yE(y,F,st,$),st.programs=ht.programs,v.capabilities=$,v.extensions=F,v.properties=ot,v.renderLists=_t,v.shadowMap=ct,v.state=W,v.info=st}Ct();const At=new ob(v,y);this.xr=At,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const C=F.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=F.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(C){C!==void 0&&(Y=C,this.setSize(H,z,!1))},this.getSize=function(C){return C.set(H,z)},this.setSize=function(C,k,Q=!0){if(At.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=C,z=k,e.width=Math.floor(C*Y),e.height=Math.floor(k*Y),Q===!0&&(e.style.width=C+"px",e.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(H*Y,z*Y).floor()},this.setDrawingBufferSize=function(C,k,Q){H=C,z=k,Y=Q,e.width=Math.floor(C*Q),e.height=Math.floor(k*Q),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(at)},this.setViewport=function(C,k,Q,nt){C.isVector4?at.set(C.x,C.y,C.z,C.w):at.set(C,k,Q,nt),W.viewport(w.copy(at).multiplyScalar(Y).floor())},this.getScissor=function(C){return C.copy(dt)},this.setScissor=function(C,k,Q,nt){C.isVector4?dt.set(C.x,C.y,C.z,C.w):dt.set(C,k,Q,nt),W.scissor(G.copy(dt).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ft},this.setScissorTest=function(C){W.setScissorTest(ft=C)},this.setOpaqueSort=function(C){q=C},this.setTransparentSort=function(C){rt=C},this.getClearColor=function(C){return C.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor.apply(Wt,arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha.apply(Wt,arguments)},this.clear=function(C=!0,k=!0,Q=!0){let nt=0;if(C){let J=!1;if(A!==null){const bt=A.texture.format;J=bt===Sm||bt===ym||bt===Mm}if(J){const bt=A.texture.type,Pt=bt===Fi||bt===Ri||bt===mu||bt===_r||bt===vm||bt===xm,Nt=Wt.getClearColor(),Ft=Wt.getClearAlpha(),Vt=Nt.r,Ht=Nt.g,Gt=Nt.b;Pt?(p[0]=Vt,p[1]=Ht,p[2]=Gt,p[3]=Ft,y.clearBufferuiv(y.COLOR,0,p)):(g[0]=Vt,g[1]=Ht,g[2]=Gt,g[3]=Ft,y.clearBufferiv(y.COLOR,0,g))}else nt|=y.COLOR_BUFFER_BIT}k&&(nt|=y.DEPTH_BUFFER_BIT),Q&&(nt|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),_t.dispose(),xt.dispose(),ot.dispose(),x.dispose(),L.dispose(),j.dispose(),P.dispose(),mt.dispose(),ht.dispose(),At.dispose(),At.removeEventListener("sessionstart",_e),At.removeEventListener("sessionend",Qt),tt&&(tt.dispose(),tt=null),Me.stop()};function pt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=st.autoReset,k=ct.enabled,Q=ct.autoUpdate,nt=ct.needsUpdate,J=ct.type;Ct(),st.autoReset=C,ct.enabled=k,ct.autoUpdate=Q,ct.needsUpdate=nt,ct.type=J}function gt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function St(C){const k=C.target;k.removeEventListener("dispose",St),Ut(k)}function Ut(C){Lt(C),ot.remove(C)}function Lt(C){const k=ot.get(C).programs;k!==void 0&&(k.forEach(function(Q){ht.releaseProgram(Q)}),C.isShaderMaterial&&ht.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,Q,nt,J,bt){k===null&&(k=yt);const Pt=J.isMesh&&J.matrixWorld.determinant()<0,Nt=Zm(C,k,Q,nt,J);W.setMaterial(nt,Pt);let Ft=Q.index,Vt=1;if(nt.wireframe===!0){if(Ft=K.getWireframeAttribute(Q),Ft===void 0)return;Vt=2}const Ht=Q.drawRange,Gt=Q.attributes.position;let ge=Ht.start*Vt,ln=(Ht.start+Ht.count)*Vt;bt!==null&&(ge=Math.max(ge,bt.start*Vt),ln=Math.min(ln,(bt.start+bt.count)*Vt)),Ft!==null?(ge=Math.max(ge,0),ln=Math.min(ln,Ft.count)):Gt!=null&&(ge=Math.max(ge,0),ln=Math.min(ln,Gt.count));const Re=ln-ge;if(Re<0||Re===1/0)return;P.setup(J,nt,Nt,Q,Ft);let Zn,le=It;if(Ft!==null&&(Zn=X.get(Ft),le=Rt,le.setIndex(Zn)),J.isMesh)nt.wireframe===!0?(W.setLineWidth(nt.wireframeLinewidth*Ot()),le.setMode(y.LINES)):le.setMode(y.TRIANGLES);else if(J.isLine){let Xt=nt.linewidth;Xt===void 0&&(Xt=1),W.setLineWidth(Xt*Ot()),J.isLineSegments?le.setMode(y.LINES):J.isLineLoop?le.setMode(y.LINE_LOOP):le.setMode(y.LINE_STRIP)}else J.isPoints?le.setMode(y.POINTS):J.isSprite&&le.setMode(y.TRIANGLES);if(J.isBatchedMesh)le.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)le.renderInstances(ge,Re,J.count);else if(Q.isInstancedBufferGeometry){const Xt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,jo=Math.min(Q.instanceCount,Xt);le.renderInstances(ge,Re,jo)}else le.render(ge,Re)};function jt(C,k,Q){C.transparent===!0&&C.side===mn&&C.forceSinglePass===!1?(C.side=tn,C.needsUpdate=!0,ma(C,k,Q),C.side=Gi,C.needsUpdate=!0,ma(C,k,Q),C.side=mn):ma(C,k,Q)}this.compile=function(C,k,Q=null){Q===null&&(Q=C),m=xt.get(Q),m.init(),S.push(m),Q.traverseVisible(function(J){J.isLight&&J.layers.test(k.layers)&&(m.pushLight(J),J.castShadow&&m.pushShadow(J))}),C!==Q&&C.traverseVisible(function(J){J.isLight&&J.layers.test(k.layers)&&(m.pushLight(J),J.castShadow&&m.pushShadow(J))}),m.setupLights(v._useLegacyLights);const nt=new Set;return C.traverse(function(J){const bt=J.material;if(bt)if(Array.isArray(bt))for(let Pt=0;Pt<bt.length;Pt++){const Nt=bt[Pt];jt(Nt,Q,J),nt.add(Nt)}else jt(bt,Q,J),nt.add(bt)}),S.pop(),m=null,nt},this.compileAsync=function(C,k,Q=null){const nt=this.compile(C,k,Q);return new Promise(J=>{function bt(){if(nt.forEach(function(Pt){ot.get(Pt).currentProgram.isReady()&&nt.delete(Pt)}),nt.size===0){J(C);return}setTimeout(bt,10)}F.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let $t=null;function de(C){$t&&$t(C)}function _e(){Me.stop()}function Qt(){Me.start()}const Me=new Fm;Me.setAnimationLoop(de),typeof self<"u"&&Me.setContext(self),this.setAnimationLoop=function(C){$t=C,At.setAnimationLoop(C),C===null?Me.stop():Me.start()},At.addEventListener("sessionstart",_e),At.addEventListener("sessionend",Qt),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),At.enabled===!0&&At.isPresenting===!0&&(At.cameraAutoUpdate===!0&&At.updateCamera(k),k=At.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,k,A),m=xt.get(C,S.length),m.init(),S.push(m),ut.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),et.setFromProjectionMatrix(ut),Z=this.localClippingEnabled,I=wt.init(this.clippingPlanes,Z),_=_t.get(C,d.length),_.init(),d.push(_),Gn(C,k,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,rt),this.info.render.frame++,I===!0&&wt.beginShadows();const Q=m.state.shadowsArray;if(ct.render(Q,C,k),I===!0&&wt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Wt.render(_,C),m.setupLights(v._useLegacyLights),k.isArrayCamera){const nt=k.cameras;for(let J=0,bt=nt.length;J<bt;J++){const Pt=nt[J];Eu(_,C,Pt,Pt.viewport)}}else Eu(_,C,k);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),C.isScene===!0&&C.onAfterRender(v,C,k),P.resetDefaultState(),O=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function Gn(C,k,Q,nt){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||et.intersectsSprite(C)){nt&&Tt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ut);const Pt=j.update(C),Nt=C.material;Nt.visible&&_.push(C,Pt,Nt,Q,Tt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||et.intersectsObject(C))){const Pt=j.update(C),Nt=C.material;if(nt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Tt.copy(C.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Tt.copy(Pt.boundingSphere.center)),Tt.applyMatrix4(C.matrixWorld).applyMatrix4(ut)),Array.isArray(Nt)){const Ft=Pt.groups;for(let Vt=0,Ht=Ft.length;Vt<Ht;Vt++){const Gt=Ft[Vt],ge=Nt[Gt.materialIndex];ge&&ge.visible&&_.push(C,Pt,ge,Q,Tt.z,Gt)}}else Nt.visible&&_.push(C,Pt,Nt,Q,Tt.z,null)}}const bt=C.children;for(let Pt=0,Nt=bt.length;Pt<Nt;Pt++)Gn(bt[Pt],k,Q,nt)}function Eu(C,k,Q,nt){const J=C.opaque,bt=C.transmissive,Pt=C.transparent;m.setupLightsView(Q),I===!0&&wt.setGlobalState(v.clippingPlanes,Q),bt.length>0&&Km(J,bt,k,Q),nt&&W.viewport(w.copy(nt)),J.length>0&&pa(J,k,Q),bt.length>0&&pa(bt,k,Q),Pt.length>0&&pa(Pt,k,Q),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function Km(C,k,Q,nt){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const bt=$.isWebGL2;tt===null&&(tt=new Er(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")?la:Fi,minFilter:oa,samples:bt?4:0})),v.getDrawingBufferSize(Et),bt?tt.setSize(Et.x,Et.y):tt.setSize(Pc(Et.x),Pc(Et.y));const Pt=v.getRenderTarget();v.setRenderTarget(tt),v.getClearColor(it),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear();const Nt=v.toneMapping;v.toneMapping=Oi,pa(C,Q,nt),E.updateMultisampleRenderTarget(tt),E.updateRenderTargetMipmap(tt);let Ft=!1;for(let Vt=0,Ht=k.length;Vt<Ht;Vt++){const Gt=k[Vt],ge=Gt.object,ln=Gt.geometry,Re=Gt.material,Zn=Gt.group;if(Re.side===mn&&ge.layers.test(nt.layers)){const le=Re.side;Re.side=tn,Re.needsUpdate=!0,Tu(ge,Q,nt,ln,Re,Zn),Re.side=le,Re.needsUpdate=!0,Ft=!0}}Ft===!0&&(E.updateMultisampleRenderTarget(tt),E.updateRenderTargetMipmap(tt)),v.setRenderTarget(Pt),v.setClearColor(it,U),v.toneMapping=Nt}function pa(C,k,Q){const nt=k.isScene===!0?k.overrideMaterial:null;for(let J=0,bt=C.length;J<bt;J++){const Pt=C[J],Nt=Pt.object,Ft=Pt.geometry,Vt=nt===null?Pt.material:nt,Ht=Pt.group;Nt.layers.test(Q.layers)&&Tu(Nt,k,Q,Ft,Vt,Ht)}}function Tu(C,k,Q,nt,J,bt){C.onBeforeRender(v,k,Q,nt,J,bt),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),J.onBeforeRender(v,k,Q,nt,C,bt),J.transparent===!0&&J.side===mn&&J.forceSinglePass===!1?(J.side=tn,J.needsUpdate=!0,v.renderBufferDirect(Q,k,nt,J,C,bt),J.side=Gi,J.needsUpdate=!0,v.renderBufferDirect(Q,k,nt,J,C,bt),J.side=mn):v.renderBufferDirect(Q,k,nt,J,C,bt),C.onAfterRender(v,k,Q,nt,J,bt)}function ma(C,k,Q){k.isScene!==!0&&(k=yt);const nt=ot.get(C),J=m.state.lights,bt=m.state.shadowsArray,Pt=J.state.version,Nt=ht.getParameters(C,J.state,bt,k,Q),Ft=ht.getProgramCacheKey(Nt);let Vt=nt.programs;nt.environment=C.isMeshStandardMaterial?k.environment:null,nt.fog=k.fog,nt.envMap=(C.isMeshStandardMaterial?L:x).get(C.envMap||nt.environment),Vt===void 0&&(C.addEventListener("dispose",St),Vt=new Map,nt.programs=Vt);let Ht=Vt.get(Ft);if(Ht!==void 0){if(nt.currentProgram===Ht&&nt.lightsStateVersion===Pt)return Au(C,Nt),Ht}else Nt.uniforms=ht.getUniforms(C),C.onBuild(Q,Nt,v),C.onBeforeCompile(Nt,v),Ht=ht.acquireProgram(Nt,Ft),Vt.set(Ft,Ht),nt.uniforms=Nt.uniforms;const Gt=nt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Gt.clippingPlanes=wt.uniform),Au(C,Nt),nt.needsLights=Qm(C),nt.lightsStateVersion=Pt,nt.needsLights&&(Gt.ambientLightColor.value=J.state.ambient,Gt.lightProbe.value=J.state.probe,Gt.directionalLights.value=J.state.directional,Gt.directionalLightShadows.value=J.state.directionalShadow,Gt.spotLights.value=J.state.spot,Gt.spotLightShadows.value=J.state.spotShadow,Gt.rectAreaLights.value=J.state.rectArea,Gt.ltc_1.value=J.state.rectAreaLTC1,Gt.ltc_2.value=J.state.rectAreaLTC2,Gt.pointLights.value=J.state.point,Gt.pointLightShadows.value=J.state.pointShadow,Gt.hemisphereLights.value=J.state.hemi,Gt.directionalShadowMap.value=J.state.directionalShadowMap,Gt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Gt.spotShadowMap.value=J.state.spotShadowMap,Gt.spotLightMatrix.value=J.state.spotLightMatrix,Gt.spotLightMap.value=J.state.spotLightMap,Gt.pointShadowMap.value=J.state.pointShadowMap,Gt.pointShadowMatrix.value=J.state.pointShadowMatrix),nt.currentProgram=Ht,nt.uniformsList=null,Ht}function bu(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=lo.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Au(C,k){const Q=ot.get(C);Q.outputColorSpace=k.outputColorSpace,Q.batching=k.batching,Q.instancing=k.instancing,Q.instancingColor=k.instancingColor,Q.skinning=k.skinning,Q.morphTargets=k.morphTargets,Q.morphNormals=k.morphNormals,Q.morphColors=k.morphColors,Q.morphTargetsCount=k.morphTargetsCount,Q.numClippingPlanes=k.numClippingPlanes,Q.numIntersection=k.numClipIntersection,Q.vertexAlphas=k.vertexAlphas,Q.vertexTangents=k.vertexTangents,Q.toneMapping=k.toneMapping}function Zm(C,k,Q,nt,J){k.isScene!==!0&&(k=yt),E.resetTextureUnits();const bt=k.fog,Pt=nt.isMeshStandardMaterial?k.environment:null,Nt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:di,Ft=(nt.isMeshStandardMaterial?L:x).get(nt.envMap||Pt),Vt=nt.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Ht=!!Q.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Gt=!!Q.morphAttributes.position,ge=!!Q.morphAttributes.normal,ln=!!Q.morphAttributes.color;let Re=Oi;nt.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Re=v.toneMapping);const Zn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,le=Zn!==void 0?Zn.length:0,Xt=ot.get(nt),jo=m.state.lights;if(I===!0&&(Z===!0||C!==M)){const Sn=C===M&&nt.id===O;wt.setState(nt,C,Sn)}let pe=!1;nt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==jo.state.version||Xt.outputColorSpace!==Nt||J.isBatchedMesh&&Xt.batching===!1||!J.isBatchedMesh&&Xt.batching===!0||J.isInstancedMesh&&Xt.instancing===!1||!J.isInstancedMesh&&Xt.instancing===!0||J.isSkinnedMesh&&Xt.skinning===!1||!J.isSkinnedMesh&&Xt.skinning===!0||J.isInstancedMesh&&Xt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Xt.instancingColor===!1&&J.instanceColor!==null||Xt.envMap!==Ft||nt.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==wt.numPlanes||Xt.numIntersection!==wt.numIntersection)||Xt.vertexAlphas!==Vt||Xt.vertexTangents!==Ht||Xt.morphTargets!==Gt||Xt.morphNormals!==ge||Xt.morphColors!==ln||Xt.toneMapping!==Re||$.isWebGL2===!0&&Xt.morphTargetsCount!==le)&&(pe=!0):(pe=!0,Xt.__version=nt.version);let Xi=Xt.currentProgram;pe===!0&&(Xi=ma(nt,k,J));let wu=!1,Rs=!1,$o=!1;const Oe=Xi.getUniforms(),Yi=Xt.uniforms;if(W.useProgram(Xi.program)&&(wu=!0,Rs=!0,$o=!0),nt.id!==O&&(O=nt.id,Rs=!0),wu||M!==C){Oe.setValue(y,"projectionMatrix",C.projectionMatrix),Oe.setValue(y,"viewMatrix",C.matrixWorldInverse);const Sn=Oe.map.cameraPosition;Sn!==void 0&&Sn.setValue(y,Tt.setFromMatrixPosition(C.matrixWorld)),$.logarithmicDepthBuffer&&Oe.setValue(y,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Oe.setValue(y,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,Rs=!0,$o=!0)}if(J.isSkinnedMesh){Oe.setOptional(y,J,"bindMatrix"),Oe.setOptional(y,J,"bindMatrixInverse");const Sn=J.skeleton;Sn&&($.floatVertexTextures?(Sn.boneTexture===null&&Sn.computeBoneTexture(),Oe.setValue(y,"boneTexture",Sn.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(Oe.setOptional(y,J,"batchingTexture"),Oe.setValue(y,"batchingTexture",J._matricesTexture,E));const Ko=Q.morphAttributes;if((Ko.position!==void 0||Ko.normal!==void 0||Ko.color!==void 0&&$.isWebGL2===!0)&&zt.update(J,Q,Xi),(Rs||Xt.receiveShadow!==J.receiveShadow)&&(Xt.receiveShadow=J.receiveShadow,Oe.setValue(y,"receiveShadow",J.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(Yi.envMap.value=Ft,Yi.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),Rs&&(Oe.setValue(y,"toneMappingExposure",v.toneMappingExposure),Xt.needsLights&&Jm(Yi,$o),bt&&nt.fog===!0&&lt.refreshFogUniforms(Yi,bt),lt.refreshMaterialUniforms(Yi,nt,Y,z,tt),lo.upload(y,bu(Xt),Yi,E)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(lo.upload(y,bu(Xt),Yi,E),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Oe.setValue(y,"center",J.center),Oe.setValue(y,"modelViewMatrix",J.modelViewMatrix),Oe.setValue(y,"normalMatrix",J.normalMatrix),Oe.setValue(y,"modelMatrix",J.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Sn=nt.uniformsGroups;for(let Zo=0,t_=Sn.length;Zo<t_;Zo++)if($.isWebGL2){const Ru=Sn[Zo];mt.update(Ru,Xi),mt.bind(Ru,Xi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Xi}function Jm(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function Qm(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(C,k,Q){ot.get(C.texture).__webglTexture=k,ot.get(C.depthTexture).__webglTexture=Q;const nt=ot.get(C);nt.__hasExternalTextures=!0,nt.__hasExternalTextures&&(nt.__autoAllocateDepthBuffer=Q===void 0,nt.__autoAllocateDepthBuffer||F.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),nt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,k){const Q=ot.get(C);Q.__webglFramebuffer=k,Q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,Q=0){A=C,R=k,b=Q;let nt=!0,J=null,bt=!1,Pt=!1;if(C){const Ft=ot.get(C);Ft.__useDefaultFramebuffer!==void 0?(W.bindFramebuffer(y.FRAMEBUFFER,null),nt=!1):Ft.__webglFramebuffer===void 0?E.setupRenderTarget(C):Ft.__hasExternalTextures&&E.rebindTextures(C,ot.get(C.texture).__webglTexture,ot.get(C.depthTexture).__webglTexture);const Vt=C.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Pt=!0);const Ht=ot.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ht[k])?J=Ht[k][Q]:J=Ht[k],bt=!0):$.isWebGL2&&C.samples>0&&E.useMultisampledRTT(C)===!1?J=ot.get(C).__webglMultisampledFramebuffer:Array.isArray(Ht)?J=Ht[Q]:J=Ht,w.copy(C.viewport),G.copy(C.scissor),V=C.scissorTest}else w.copy(at).multiplyScalar(Y).floor(),G.copy(dt).multiplyScalar(Y).floor(),V=ft;if(W.bindFramebuffer(y.FRAMEBUFFER,J)&&$.drawBuffers&&nt&&W.drawBuffers(C,J),W.viewport(w),W.scissor(G),W.setScissorTest(V),bt){const Ft=ot.get(C.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ft.__webglTexture,Q)}else if(Pt){const Ft=ot.get(C.texture),Vt=k||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Ft.__webglTexture,Q||0,Vt)}O=-1},this.readRenderTargetPixels=function(C,k,Q,nt,J,bt,Pt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=ot.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pt!==void 0&&(Nt=Nt[Pt]),Nt){W.bindFramebuffer(y.FRAMEBUFFER,Nt);try{const Ft=C.texture,Vt=Ft.format,Ht=Ft.type;if(Vt!==Fn&&vt.convert(Vt)!==y.getParameter(y.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Gt=Ht===la&&(F.has("EXT_color_buffer_half_float")||$.isWebGL2&&F.has("EXT_color_buffer_float"));if(Ht!==Fi&&vt.convert(Ht)!==y.getParameter(y.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ht===Ci&&($.isWebGL2||F.has("OES_texture_float")||F.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-nt&&Q>=0&&Q<=C.height-J&&y.readPixels(k,Q,nt,J,vt.convert(Vt),vt.convert(Ht),bt)}finally{const Ft=A!==null?ot.get(A).__webglFramebuffer:null;W.bindFramebuffer(y.FRAMEBUFFER,Ft)}}},this.copyFramebufferToTexture=function(C,k,Q=0){const nt=Math.pow(2,-Q),J=Math.floor(k.image.width*nt),bt=Math.floor(k.image.height*nt);E.setTexture2D(k,0),y.copyTexSubImage2D(y.TEXTURE_2D,Q,0,0,C.x,C.y,J,bt),W.unbindTexture()},this.copyTextureToTexture=function(C,k,Q,nt=0){const J=k.image.width,bt=k.image.height,Pt=vt.convert(Q.format),Nt=vt.convert(Q.type);E.setTexture2D(Q,0),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,Q.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,Q.unpackAlignment),k.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,nt,C.x,C.y,J,bt,Pt,Nt,k.image.data):k.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,nt,C.x,C.y,k.mipmaps[0].width,k.mipmaps[0].height,Pt,k.mipmaps[0].data):y.texSubImage2D(y.TEXTURE_2D,nt,C.x,C.y,Pt,Nt,k.image),nt===0&&Q.generateMipmaps&&y.generateMipmap(y.TEXTURE_2D),W.unbindTexture()},this.copyTextureToTexture3D=function(C,k,Q,nt,J=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const bt=C.max.x-C.min.x+1,Pt=C.max.y-C.min.y+1,Nt=C.max.z-C.min.z+1,Ft=vt.convert(nt.format),Vt=vt.convert(nt.type);let Ht;if(nt.isData3DTexture)E.setTexture3D(nt,0),Ht=y.TEXTURE_3D;else if(nt.isDataArrayTexture||nt.isCompressedArrayTexture)E.setTexture2DArray(nt,0),Ht=y.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,nt.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,nt.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,nt.unpackAlignment);const Gt=y.getParameter(y.UNPACK_ROW_LENGTH),ge=y.getParameter(y.UNPACK_IMAGE_HEIGHT),ln=y.getParameter(y.UNPACK_SKIP_PIXELS),Re=y.getParameter(y.UNPACK_SKIP_ROWS),Zn=y.getParameter(y.UNPACK_SKIP_IMAGES),le=Q.isCompressedTexture?Q.mipmaps[J]:Q.image;y.pixelStorei(y.UNPACK_ROW_LENGTH,le.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,le.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,C.min.x),y.pixelStorei(y.UNPACK_SKIP_ROWS,C.min.y),y.pixelStorei(y.UNPACK_SKIP_IMAGES,C.min.z),Q.isDataTexture||Q.isData3DTexture?y.texSubImage3D(Ht,J,k.x,k.y,k.z,bt,Pt,Nt,Ft,Vt,le.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),y.compressedTexSubImage3D(Ht,J,k.x,k.y,k.z,bt,Pt,Nt,Ft,le.data)):y.texSubImage3D(Ht,J,k.x,k.y,k.z,bt,Pt,Nt,Ft,Vt,le),y.pixelStorei(y.UNPACK_ROW_LENGTH,Gt),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,ge),y.pixelStorei(y.UNPACK_SKIP_PIXELS,ln),y.pixelStorei(y.UNPACK_SKIP_ROWS,Re),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Zn),J===0&&nt.generateMipmaps&&y.generateMipmap(Ht),W.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?E.setTextureCube(C,0):C.isData3DTexture?E.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?E.setTexture2DArray(C,0):E.setTexture2D(C,0),W.unbindTexture()},this.resetState=function(){R=0,b=0,A=null,W.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===_u?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===Vo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ue?vr:Tm}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===vr?Ue:di}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class ub extends Xm{}ub.prototype.isWebGL1Renderer=!0;class fb extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class hb{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=wc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Bi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new B;class Ro{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=oi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=oi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=oi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=oi(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),r=re(r,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Hn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ro(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ym extends Rr{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let $r;const Ns=new B,Kr=new B,Zr=new B,Jr=new Dt,Os=new Dt,qm=new xe,Ya=new B,Fs=new B,qa=new B,Vh=new Dt,Xl=new Dt,Wh=new Dt;class db extends De{constructor(t=new Ym){if(super(),this.isSprite=!0,this.type="Sprite",$r===void 0){$r=new on;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hb(e,5);$r.setIndex([0,1,2,0,2,3]),$r.setAttribute("position",new Ro(n,3,0,!1)),$r.setAttribute("uv",new Ro(n,2,3,!1))}this.geometry=$r,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Kr.setFromMatrixScale(this.matrixWorld),qm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Zr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Kr.multiplyScalar(-Zr.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;ja(Ya.set(-.5,-.5,0),Zr,a,Kr,r,s),ja(Fs.set(.5,-.5,0),Zr,a,Kr,r,s),ja(qa.set(.5,.5,0),Zr,a,Kr,r,s),Vh.set(0,0),Xl.set(1,0),Wh.set(1,1);let o=t.ray.intersectTriangle(Ya,Fs,qa,!1,Ns);if(o===null&&(ja(Fs.set(-.5,.5,0),Zr,a,Kr,r,s),Xl.set(0,1),o=t.ray.intersectTriangle(Ya,qa,Fs,!1,Ns),o===null))return;const l=t.ray.origin.distanceTo(Ns);l<t.near||l>t.far||e.push({distance:l,point:Ns.clone(),uv:An.getInterpolation(Ns,Ya,Fs,qa,Vh,Xl,Wh,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ja(i,t,e,n,r,s){Jr.subVectors(i,e).addScalar(.5).multiply(n),r!==void 0?(Os.x=s*Jr.x-r*Jr.y,Os.y=r*Jr.x+s*Jr.y):Os.copy(Jr),i.copy(t),i.x+=Os.x,i.y+=Os.y,i.applyMatrix4(qm)}class jm extends Rr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Xh=new B,Yh=new B,qh=new xe,Yl=new Xo,$a=new Wo;class pb extends De{constructor(t=new on,e=new jm){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Xh.fromBufferAttribute(e,r-1),Yh.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Xh.distanceTo(Yh);t.setAttribute("lineDistance",new he(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(r),$a.radius+=s,t.ray.intersectsSphere($a)===!1)return;qh.copy(r).invert(),Yl.copy(t.ray).applyMatrix4(qh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new B,u=new B,f=new B,h=new B,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const d=Math.max(0,a.start),S=Math.min(g.count,a.start+a.count);for(let v=d,T=S-1;v<T;v+=p){const R=g.getX(v),b=g.getX(v+1);if(c.fromBufferAttribute(m,R),u.fromBufferAttribute(m,b),Yl.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(h);O<t.near||O>t.far||e.push({distance:O,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),S=Math.min(m.count,a.start+a.count);for(let v=d,T=S-1;v<T;v+=p){if(c.fromBufferAttribute(m,v),u.fromBufferAttribute(m,v+1),Yl.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const b=t.ray.origin.distanceTo(h);b<t.near||b>t.far||e.push({distance:b,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const jh=new B,$h=new B;class mb extends pb{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)jh.fromBufferAttribute(e,r),$h.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+jh.distanceTo($h);t.setAttribute("lineDistance",new he(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _b extends en{constructor(t,e,n,r,s,a,o,l,c){super(t,e,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Co extends on{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],p=[];let g=0;const _=[],m=n/2;let d=0;S(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(p,2));function S(){const T=new B,R=new B;let b=0;const A=(e-t)/n;for(let O=0;O<=s;O++){const M=[],w=O/s,G=w*(e-t)+t;for(let V=0;V<=r;V++){const it=V/r,U=it*l+o,H=Math.sin(U),z=Math.cos(U);R.x=G*H,R.y=-w*n+m,R.z=G*z,f.push(R.x,R.y,R.z),T.set(H,A,z).normalize(),h.push(T.x,T.y,T.z),p.push(it,1-w),M.push(g++)}_.push(M)}for(let O=0;O<r;O++)for(let M=0;M<s;M++){const w=_[M][O],G=_[M+1][O],V=_[M+1][O+1],it=_[M][O+1];u.push(w,G,it),u.push(G,V,it),b+=6}c.addGroup(d,b,0),d+=b}function v(T){const R=g,b=new Dt,A=new B;let O=0;const M=T===!0?t:e,w=T===!0?1:-1;for(let V=1;V<=r;V++)f.push(0,m*w,0),h.push(0,w,0),p.push(.5,.5),g++;const G=g;for(let V=0;V<=r;V++){const U=V/r*l+o,H=Math.cos(U),z=Math.sin(U);A.x=M*z,A.y=m*w,A.z=M*H,f.push(A.x,A.y,A.z),h.push(0,w,0),b.x=H*.5+.5,b.y=z*.5*w+.5,p.push(b.x,b.y),g++}for(let V=0;V<r;V++){const it=R+V,U=G+V;T===!0?u.push(U,U+1,it):u.push(U+1,U,it),O+=3}c.addGroup(d,O,T===!0?1:2),d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $s extends on{constructor(t=.5,e=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let f=t;const h=(e-t)/r,p=new B,g=new Dt;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const d=s+m/n*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<r;_++){const m=_*(n+1);for(let d=0;d<n;d++){const S=d+m,v=S,T=S+n+1,R=S+n+2,b=S+1;o.push(v,T,b),o.push(T,R,b)}}this.setIndex(o),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class yu extends on{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new B,h=new B,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const S=[],v=d/n;let T=0;d===0&&a===0?T=.5/e:d===n&&l===Math.PI&&(T=-.5/e);for(let R=0;R<=e;R++){const b=R/e;f.x=-t*Math.cos(r+b*s)*Math.sin(a+v*o),f.y=t*Math.cos(a+v*o),f.z=t*Math.sin(r+b*s)*Math.sin(a+v*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(b+T,1-v),S.push(c++)}u.push(S)}for(let d=0;d<n;d++)for(let S=0;S<e;S++){const v=u[d][S+1],T=u[d][S],R=u[d+1][S],b=u[d+1][S+1];(d!==0||a>0)&&p.push(v,T,b),(d!==n-1||l<Math.PI)&&p.push(T,R,b)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Su extends on{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new B,f=new B,h=new B;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/n*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),o.push(f.x,f.y,f.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,S=(r+1)*p+g;a.push(_,m,S),a.push(m,d,S)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Su(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ka extends Rr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bm,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $m extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const ql=new xe,Kh=new B,Zh=new B;class gb{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vu,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kh),Zh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zh),e.updateMatrixWorld(),ql.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ql),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ql)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class vb extends gb{constructor(){super(new Bm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xb extends $m{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new vb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Mb extends $m{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class yb{constructor(t,e,n=0,r=1/0){this.ray=new Xo(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new gu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return Dc(t,this,n,e),n.sort(Jh),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)Dc(t[r],this,n,e);return n.sort(Jh),n}}function Jh(i,t){return i.distance-t.distance}function Dc(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)Dc(r[s],t,e,!0)}}class Qh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Sb extends mb{constructor(t=10,e=10,n=4473924,r=8947848){n=new Kt(n),r=new Kt(r);const s=e/2,a=t/e,o=t/2,l=[],c=[];for(let h=0,p=0,g=-o;h<=e;h++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const _=h===s?n:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const u=new on;u.setAttribute("position",new he(l,3)),u.setAttribute("color",new he(c,3));const f=new jm({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pu);const td={type:"change"},jl={type:"start"},ed={type:"end"},Za=new Xo,nd=new Ti,Eb=Math.cos(70*rM.DEG2RAD);class Tb extends wr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Lr.ROTATE,MIDDLE:Lr.DOLLY,RIGHT:Lr.PAN},this.touches={ONE:Dr.ROTATE,TWO:Dr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(P){P.addEventListener("keydown",xt),this._domElementKeyEvents=P},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",xt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(td),n.update(),s=r.NONE},this.update=function(){const P=new B,mt=new Tr().setFromUnitVectors(t.up,new B(0,1,0)),Ct=mt.clone().invert(),At=new B,pt=new Tr,N=new B,gt=2*Math.PI;return function(Ut=null){const Lt=n.object.position;P.copy(Lt).sub(n.target),P.applyQuaternion(mt),o.setFromVector3(P),n.autoRotate&&s===r.NONE&&V(w(Ut)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let jt=n.minAzimuthAngle,$t=n.maxAzimuthAngle;isFinite(jt)&&isFinite($t)&&(jt<-Math.PI?jt+=gt:jt>Math.PI&&(jt-=gt),$t<-Math.PI?$t+=gt:$t>Math.PI&&($t-=gt),jt<=$t?o.theta=Math.max(jt,Math.min($t,o.theta)):o.theta=o.theta>(jt+$t)/2?Math.max(jt,o.theta):Math.min($t,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&b||n.object.isOrthographicCamera?o.radius=at(o.radius):o.radius=at(o.radius*c),P.setFromSpherical(o),P.applyQuaternion(Ct),Lt.copy(n.target).add(P),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let de=!1;if(n.zoomToCursor&&b){let _e=null;if(n.object.isPerspectiveCamera){const Qt=P.length();_e=at(Qt*c);const Me=Qt-_e;n.object.position.addScaledVector(T,Me),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qt=new B(R.x,R.y,0);Qt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),de=!0;const Me=new B(R.x,R.y,0);Me.unproject(n.object),n.object.position.sub(Me).add(Qt),n.object.updateMatrixWorld(),_e=P.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;_e!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(_e).add(n.object.position):(Za.origin.copy(n.object.position),Za.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Za.direction))<Eb?t.lookAt(n.target):(nd.setFromNormalAndCoplanarPoint(n.object.up,n.target),Za.intersectPlane(nd,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),de=!0);return c=1,b=!1,de||At.distanceToSquared(n.object.position)>a||8*(1-pt.dot(n.object.quaternion))>a||N.distanceToSquared(n.target)>0?(n.dispatchEvent(td),At.copy(n.object.position),pt.copy(n.object.quaternion),N.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Wt),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",L),n.domElement.removeEventListener("wheel",j),n.domElement.removeEventListener("pointermove",x),n.domElement.removeEventListener("pointerup",L),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",xt),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new Qh,l=new Qh;let c=1;const u=new B,f=new Dt,h=new Dt,p=new Dt,g=new Dt,_=new Dt,m=new Dt,d=new Dt,S=new Dt,v=new Dt,T=new B,R=new Dt;let b=!1;const A=[],O={};let M=!1;function w(P){return P!==null?2*Math.PI/60*n.autoRotateSpeed*P:2*Math.PI/60/60*n.autoRotateSpeed}function G(P){const mt=Math.abs(P*.01);return Math.pow(.95,n.zoomSpeed*mt)}function V(P){l.theta-=P}function it(P){l.phi-=P}const U=function(){const P=new B;return function(Ct,At){P.setFromMatrixColumn(At,0),P.multiplyScalar(-Ct),u.add(P)}}(),H=function(){const P=new B;return function(Ct,At){n.screenSpacePanning===!0?P.setFromMatrixColumn(At,1):(P.setFromMatrixColumn(At,0),P.crossVectors(n.object.up,P)),P.multiplyScalar(Ct),u.add(P)}}(),z=function(){const P=new B;return function(Ct,At){const pt=n.domElement;if(n.object.isPerspectiveCamera){const N=n.object.position;P.copy(N).sub(n.target);let gt=P.length();gt*=Math.tan(n.object.fov/2*Math.PI/180),U(2*Ct*gt/pt.clientHeight,n.object.matrix),H(2*At*gt/pt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(U(Ct*(n.object.right-n.object.left)/n.object.zoom/pt.clientWidth,n.object.matrix),H(At*(n.object.top-n.object.bottom)/n.object.zoom/pt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function Y(P){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(P){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=P:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function rt(P,mt){if(!n.zoomToCursor)return;b=!0;const Ct=n.domElement.getBoundingClientRect(),At=P-Ct.left,pt=mt-Ct.top,N=Ct.width,gt=Ct.height;R.x=At/N*2-1,R.y=-(pt/gt)*2+1,T.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function at(P){return Math.max(n.minDistance,Math.min(n.maxDistance,P))}function dt(P){f.set(P.clientX,P.clientY)}function ft(P){rt(P.clientX,P.clientX),d.set(P.clientX,P.clientY)}function et(P){g.set(P.clientX,P.clientY)}function I(P){h.set(P.clientX,P.clientY),p.subVectors(h,f).multiplyScalar(n.rotateSpeed);const mt=n.domElement;V(2*Math.PI*p.x/mt.clientHeight),it(2*Math.PI*p.y/mt.clientHeight),f.copy(h),n.update()}function Z(P){S.set(P.clientX,P.clientY),v.subVectors(S,d),v.y>0?Y(G(v.y)):v.y<0&&q(G(v.y)),d.copy(S),n.update()}function tt(P){_.set(P.clientX,P.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(_),n.update()}function ut(P){rt(P.clientX,P.clientY),P.deltaY<0?q(G(P.deltaY)):P.deltaY>0&&Y(G(P.deltaY)),n.update()}function Et(P){let mt=!1;switch(P.code){case n.keys.UP:P.ctrlKey||P.metaKey||P.shiftKey?it(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,n.keyPanSpeed),mt=!0;break;case n.keys.BOTTOM:P.ctrlKey||P.metaKey||P.shiftKey?it(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,-n.keyPanSpeed),mt=!0;break;case n.keys.LEFT:P.ctrlKey||P.metaKey||P.shiftKey?V(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(n.keyPanSpeed,0),mt=!0;break;case n.keys.RIGHT:P.ctrlKey||P.metaKey||P.shiftKey?V(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(-n.keyPanSpeed,0),mt=!0;break}mt&&(P.preventDefault(),n.update())}function Tt(P){if(A.length===1)f.set(P.pageX,P.pageY);else{const mt=vt(P),Ct=.5*(P.pageX+mt.x),At=.5*(P.pageY+mt.y);f.set(Ct,At)}}function yt(P){if(A.length===1)g.set(P.pageX,P.pageY);else{const mt=vt(P),Ct=.5*(P.pageX+mt.x),At=.5*(P.pageY+mt.y);g.set(Ct,At)}}function Ot(P){const mt=vt(P),Ct=P.pageX-mt.x,At=P.pageY-mt.y,pt=Math.sqrt(Ct*Ct+At*At);d.set(0,pt)}function y(P){n.enableZoom&&Ot(P),n.enablePan&&yt(P)}function D(P){n.enableZoom&&Ot(P),n.enableRotate&&Tt(P)}function F(P){if(A.length==1)h.set(P.pageX,P.pageY);else{const Ct=vt(P),At=.5*(P.pageX+Ct.x),pt=.5*(P.pageY+Ct.y);h.set(At,pt)}p.subVectors(h,f).multiplyScalar(n.rotateSpeed);const mt=n.domElement;V(2*Math.PI*p.x/mt.clientHeight),it(2*Math.PI*p.y/mt.clientHeight),f.copy(h)}function $(P){if(A.length===1)_.set(P.pageX,P.pageY);else{const mt=vt(P),Ct=.5*(P.pageX+mt.x),At=.5*(P.pageY+mt.y);_.set(Ct,At)}m.subVectors(_,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(_)}function W(P){const mt=vt(P),Ct=P.pageX-mt.x,At=P.pageY-mt.y,pt=Math.sqrt(Ct*Ct+At*At);S.set(0,pt),v.set(0,Math.pow(S.y/d.y,n.zoomSpeed)),Y(v.y),d.copy(S);const N=(P.pageX+mt.x)*.5,gt=(P.pageY+mt.y)*.5;rt(N,gt)}function st(P){n.enableZoom&&W(P),n.enablePan&&$(P)}function ot(P){n.enableZoom&&W(P),n.enableRotate&&F(P)}function E(P){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(P.pointerId),n.domElement.addEventListener("pointermove",x),n.domElement.addEventListener("pointerup",L)),zt(P),P.pointerType==="touch"?wt(P):X(P))}function x(P){n.enabled!==!1&&(P.pointerType==="touch"?ct(P):K(P))}function L(P){It(P),A.length===0&&(n.domElement.releasePointerCapture(P.pointerId),n.domElement.removeEventListener("pointermove",x),n.domElement.removeEventListener("pointerup",L)),n.dispatchEvent(ed),s=r.NONE}function X(P){let mt;switch(P.button){case 0:mt=n.mouseButtons.LEFT;break;case 1:mt=n.mouseButtons.MIDDLE;break;case 2:mt=n.mouseButtons.RIGHT;break;default:mt=-1}switch(mt){case Lr.DOLLY:if(n.enableZoom===!1)return;ft(P),s=r.DOLLY;break;case Lr.ROTATE:if(P.ctrlKey||P.metaKey||P.shiftKey){if(n.enablePan===!1)return;et(P),s=r.PAN}else{if(n.enableRotate===!1)return;dt(P),s=r.ROTATE}break;case Lr.PAN:if(P.ctrlKey||P.metaKey||P.shiftKey){if(n.enableRotate===!1)return;dt(P),s=r.ROTATE}else{if(n.enablePan===!1)return;et(P),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(jl)}function K(P){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;I(P);break;case r.DOLLY:if(n.enableZoom===!1)return;Z(P);break;case r.PAN:if(n.enablePan===!1)return;tt(P);break}}function j(P){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(P.preventDefault(),n.dispatchEvent(jl),ut(ht(P)),n.dispatchEvent(ed))}function ht(P){const mt=P.deltaMode,Ct={clientX:P.clientX,clientY:P.clientY,deltaY:P.deltaY};switch(mt){case 1:Ct.deltaY*=16;break;case 2:Ct.deltaY*=100;break}return P.ctrlKey&&!M&&(Ct.deltaY*=10),Ct}function lt(P){P.key==="Control"&&(M=!0,document.addEventListener("keyup",_t,{passive:!0,capture:!0}))}function _t(P){P.key==="Control"&&(M=!1,document.removeEventListener("keyup",_t,{passive:!0,capture:!0}))}function xt(P){n.enabled===!1||n.enablePan===!1||Et(P)}function wt(P){switch(Rt(P),A.length){case 1:switch(n.touches.ONE){case Dr.ROTATE:if(n.enableRotate===!1)return;Tt(P),s=r.TOUCH_ROTATE;break;case Dr.PAN:if(n.enablePan===!1)return;yt(P),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case Dr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;y(P),s=r.TOUCH_DOLLY_PAN;break;case Dr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;D(P),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(jl)}function ct(P){switch(Rt(P),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;F(P),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;$(P),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;st(P),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ot(P),n.update();break;default:s=r.NONE}}function Wt(P){n.enabled!==!1&&P.preventDefault()}function zt(P){A.push(P.pointerId)}function It(P){delete O[P.pointerId];for(let mt=0;mt<A.length;mt++)if(A[mt]==P.pointerId){A.splice(mt,1);return}}function Rt(P){let mt=O[P.pointerId];mt===void 0&&(mt=new Dt,O[P.pointerId]=mt),mt.set(P.pageX,P.pageY)}function vt(P){const mt=P.pointerId===A[0]?A[1]:A[0];return O[mt]}n.domElement.addEventListener("contextmenu",Wt),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",L),n.domElement.addEventListener("wheel",j,{passive:!1}),document.addEventListener("keydown",lt,{passive:!0,capture:!0}),this.update()}}const bb={class:"screen-shell"},Ab=Bt("div",null,[Bt("p",{class:"eyebrow"},"Industrial Safety Operation Center"),Bt("h1",null,"工业园区人员定位安全监管平台")],-1),wb={class:"dashboard-grid"},Rb={class:"panel left-panel"},Cb=Bt("h2",null,"运行概览",-1),Pb={class:"metric-grid"},Lb=Bt("h2",null,"子园区状态",-1),Db=["onClick"],Ib=Bt("h2",null,"楼层剖切",-1),Ub={class:"floor-tabs"},Nb=["disabled","onClick"],Ob={class:"scene-card"},Fb=Bt("div",{class:"scene-hint"}," 点击子园区进入内部视角，点击楼层实现楼层显隐，报警园区会出现红色安全围栏 ",-1),Bb={class:"panel right-panel"},zb={class:"right-section"},Hb=Bt("h2",null,"报警事件",-1),Gb={class:"alarm-card"},kb=Bt("span",{class:"alarm-level"},"一级报警",-1),Vb={class:"right-section person-section"},Wb=Bt("h2",null,"人员定位",-1),Xb={class:"person-list"},Yb=ng({__name:"App",setup(i){const t=Cr(null),e=Cr("park-a"),n=Cr("floor-1"),r=Cr(!1),s=Cr({visible:!1,x:0,y:0,name:"",statusText:"",parkName:"",floorName:"",activityRange:""}),a=Cr([{id:"park-a",name:"A区危化品仓储园区",status:"alarm",x:-8,z:-2},{id:"park-b",name:"B区精密制造园区",status:"normal",x:2,z:-2},{id:"park-c",name:"C区能源动力园区",status:"normal",x:-3,z:7}]),o=[{id:"floor-1",name:"一层"},{id:"floor-2",name:"二层"},{id:"floor-3",name:"三层"}],l=[{label:"在线人员",value:"326"},{label:"危险区域",value:"12"},{label:"今日报警",value:"7"},{label:"处置率",value:"96%"}],c=[{id:"p1",name:"人员A",status:"danger",statusText:"危险区报警",activityRange:"A区一层危化品仓库北侧",parkId:"park-a",floorId:"floor-1",x:-1.15,z:-.65},{id:"p2",name:"人员B",status:"normal",statusText:"在线",activityRange:"B区二层装配线东侧",parkId:"park-b",floorId:"floor-2",x:.7,z:.25},{id:"p3",name:"人员C",status:"normal",statusText:"巡检中",activityRange:"C区一层动力设备间",parkId:"park-c",floorId:"floor-1",x:.95,z:.55},{id:"p4",name:"人员D",status:"normal",statusText:"在线",activityRange:"C区三层值守通道",parkId:"park-c",floorId:"floor-3",x:-.75,z:.75},{id:"p5",name:"人员E",status:"normal",statusText:"在线",activityRange:"A区一层入库通道",parkId:"park-a",floorId:"floor-1",x:.85,z:.55},{id:"p6",name:"人员F",status:"normal",statusText:"巡检中",activityRange:"A区二层巡检走廊",parkId:"park-a",floorId:"floor-2",x:-.4,z:.85},{id:"p7",name:"人员G",status:"normal",statusText:"在线",activityRange:"A区三层设备平台",parkId:"park-a",floorId:"floor-3",x:1.15,z:-.45},{id:"p8",name:"人员H",status:"normal",statusText:"在线",activityRange:"B区一层物料暂存区",parkId:"park-b",floorId:"floor-1",x:-1.05,z:.7},{id:"p9",name:"人员I",status:"normal",statusText:"巡检中",activityRange:"B区二层质检工位",parkId:"park-b",floorId:"floor-2",x:-.25,z:-.75},{id:"p10",name:"人员J",status:"normal",statusText:"在线",activityRange:"B区三层维修间",parkId:"park-b",floorId:"floor-3",x:1.2,z:.75},{id:"p11",name:"人员K",status:"normal",statusText:"巡检中",activityRange:"C区二层动力管廊",parkId:"park-c",floorId:"floor-2",x:.1,z:-.85},{id:"p12",name:"人员L",status:"normal",statusText:"在线",activityRange:"C区三层控制室",parkId:"park-c",floorId:"floor-3",x:1.15,z:-.2}],u=cp(()=>{var I,Z;return{personName:"人员A",parkName:((I=a.value.find(tt=>tt.id===e.value))==null?void 0:I.name)??"A区危化品仓储园区",buildingName:"1号危化品仓库",floorName:((Z=o.find(tt=>tt.id===n.value))==null?void 0:Z.name)??"一层",time:"2026-08-12 14:30:21"}});let f,h,p,g,_,m,d=0;const S=[],v=new Map,T=new Map,R=new Map,b=[],A=[];function O(I,Z={}){const tt=document.createElement("canvas");tt.width=320,tt.height=96;const ut=tt.getContext("2d");ut&&(ut.fillStyle=Z.background??"rgba(5, 14, 32, 0.72)",ut.fillRect(0,0,tt.width,tt.height),ut.fillStyle=Z.color??"#ffffff",ut.font=`${Z.fontSize??30}px Microsoft YaHei, sans-serif`,ut.textAlign="center",ut.fillText(I,tt.width/2,58));const Et=new _b(tt),Tt=new Ym({map:Et,transparent:!0}),yt=new db(Tt);return yt.scale.set(4.6,1.35,1),yt}function M(I,Z,tt,ut,Et=1){const Tt=new As(I,Z,tt),yt=new Ka({color:ut,transparent:Et<1,opacity:Et,roughness:.55,metalness:.08});return new Se(Tt,yt)}function w(I,Z){I.userData={type:"person",id:Z.id},S.push(I)}function G(I,Z){const tt=new Pi;tt.position.set(I.x,1.1+Z*1.05,I.z),tt.userData={type:"person",id:I.id,parkId:I.parkId,floorId:I.floorId};const ut=I.status==="danger"?"#ff3b5c":"#50e3a4",Et=new Se(new yu(.16,24,24),new Ka({color:ut,emissive:ut,emissiveIntensity:.35}));w(Et,I),tt.add(Et);const Tt=new Se(new Co(.035,.035,.45,16),new Ka({color:ut,emissive:ut,emissiveIntensity:.2}));Tt.position.y=-.29,w(Tt,I),tt.add(Tt);const yt=new Se(new $s(.22,.32,32),new fn({color:ut,transparent:!0,opacity:.9,side:mn}));if(yt.rotation.x=Math.PI/2,yt.position.y=-.52,w(yt,I),tt.add(yt),I.status==="danger"){const F=new Se(new $s(.38,.5,40),new fn({color:"#ff2d55",transparent:!0,opacity:.9,side:mn}));F.rotation.x=Math.PI/2,F.position.y=-.5,F.userData={type:"person",id:I.id,pulse:!0},S.push(F),tt.add(F)}const Ot=I.status==="danger"?"#ff3b5c":"#66b7ff",y=I.status==="danger"?"rgba(74, 11, 27, 0.78)":"rgba(12, 50, 96, 0.78)",D=O(I.name,{background:y,color:Ot,fontSize:34});return D.position.set(0,.72,0),D.scale.set(1.45,.42,1),tt.add(D),b.push(tt),tt}function V(){const I=new Pi,Z=new Se(new Co(.18,.42,3.2,32,1,!0),new fn({color:"#ff2d55",transparent:!0,opacity:.38,side:mn,depthWrite:!1}));Z.position.y=1.95,Z.userData={alarmEffect:"beam"},I.add(Z);const tt=new Se(new $s(.45,1.05,64),new fn({color:"#ff2d55",transparent:!0,opacity:.72,side:mn,depthWrite:!1}));return tt.rotation.x=Math.PI/2,tt.position.y=.08,tt.userData={alarmEffect:"halo"},I.add(tt),A.push(Z,tt),I}function it(I){const Z=new Pi;Z.position.set(I.x,0,I.z),Z.userData={type:"park",id:I.id};const tt=M(7.4,.18,5.4,"#1a4268",.92);tt.position.y=.09,tt.userData={type:"park",id:I.id},Z.add(tt),S.push(tt);const ut=[];o.forEach((yt,Ot)=>{const y=new Pi;y.userData={type:"floor",id:yt.id,parkId:I.id};const D=M(4.5,.38,3.2,Ot===0?"#4a8fca":"#2f6ea5",.9);D.position.set(0,.7+Ot*1.05,0),D.userData={type:"floor",id:yt.id,parkId:I.id},y.add(D),S.push(D);const F=M(1.1,.08,1.1,"#ef4444",.68);if(F.position.set(-1.15,.93+Ot*1.05,-.65),F.userData={alarmEffect:"dangerZone"},y.add(F),I.status==="alarm"&&A.push(F),I.status==="alarm"&&Ot===0){const $=V();$.position.set(-1.15,.98+Ot*1.05,-.65),y.add($)}c.filter($=>$.parkId===I.id&&$.floorId===yt.id).forEach($=>{y.add(G($,Ot))}),Z.add(y),ut.push(y)});const Et=O(I.name);Et.position.set(0,4.5,0),Z.add(Et);const Tt=new Se(new Su(4.5,.06,12,96),new fn({color:"#ff2d55",transparent:!0,opacity:I.status==="alarm"?1:0}));Tt.rotation.x=Math.PI/2,Tt.position.y=.36,Z.add(Tt),v.set(I.id,Z),T.set(I.id,ut),R.set(I.id,Tt),f.add(Z)}function U(){if(!t.value)return;f=new fb,f.background=new Kt("#06101f"),h=new wn(48,t.value.clientWidth/t.value.clientHeight,.1,1e3),h.position.set(10,12,17),p=new Xm({antialias:!0}),p.setPixelRatio(Math.min(window.devicePixelRatio,2)),p.setSize(t.value.clientWidth,t.value.clientHeight),t.value.appendChild(p.domElement),g=new Tb(h,p.domElement),g.enableDamping=!0,g.target.set(-2,1.2,1.5),_=new yb,m=new Dt,f.add(new Mb("#9fc7ff",1.5));const I=new xb("#ffffff",2.6);I.position.set(8,16,8),f.add(I);const Z=new Sb(34,34,"#2e5d87","#12304f");f.add(Z),a.value.forEach(it),rt(n.value),p.domElement.addEventListener("pointerdown",H),p.domElement.addEventListener("pointermove",z),p.domElement.addEventListener("pointerleave",Y),window.addEventListener("resize",et),ft()}function H(I){const Z=p.domElement.getBoundingClientRect();m.x=(I.clientX-Z.left)/Z.width*2-1,m.y=-((I.clientY-Z.top)/Z.height)*2+1,_.setFromCamera(m,h);const tt=_.intersectObjects(S,!0)[0];if(!tt)return;const ut=tt.object.userData;ut.type==="park"&&q(ut.id),ut.type==="floor"&&r.value&&(e.value=ut.parkId,rt(ut.id))}function z(I){var Et,Tt;const Z=p.domElement.getBoundingClientRect();m.x=(I.clientX-Z.left)/Z.width*2-1,m.y=-((I.clientY-Z.top)/Z.height)*2+1,_.setFromCamera(m,h);const tt=_.intersectObjects(S,!0).find(yt=>yt.object.userData.type==="person");if(!tt){Y();return}const ut=c.find(yt=>yt.id===tt.object.userData.id);if(!ut){Y();return}s.value={visible:!0,x:I.clientX-Z.left+16,y:I.clientY-Z.top+16,name:ut.name,statusText:ut.statusText,parkName:((Et=a.value.find(yt=>yt.id===ut.parkId))==null?void 0:Et.name)??"",floorName:((Tt=o.find(yt=>yt.id===ut.floorId))==null?void 0:Tt.name)??"",activityRange:ut.activityRange}}function Y(){s.value.visible=!1}function q(I){e.value=I,r.value=!0,v.forEach((Et,Tt)=>{Et.visible=Tt===I});const Z=T.get(I);Z==null||Z.forEach(Et=>{Et.visible=!0});const tt=v.get(I);if(!tt)return;const ut=new B;tt.getWorldPosition(ut),Qr.to(h.position,{x:ut.x+5.5,y:7.2,z:ut.z+7,duration:.8,ease:"power2.out"}),Qr.to(g.target,{x:ut.x,y:1.7,z:ut.z,duration:.8,ease:"power2.out"})}function rt(I){if(!r.value)return;n.value=I;const Z=T.get(e.value);Z==null||Z.forEach(tt=>{const ut=tt.userData.id===I;tt.visible=ut})}function at(){e.value="park-a",r.value=!1,v.forEach(I=>{I.visible=!0}),T.forEach(I=>{I.forEach(Z=>{Z.visible=!0})}),Qr.to(h.position,{x:10,y:12,z:17,duration:.8,ease:"power2.out"}),Qr.to(g.target,{x:-2,y:1.2,z:1.5,duration:.8,ease:"power2.out"})}function dt(){const I=R.get(e.value),Z=a.value.find(tt=>tt.id===e.value);Z&&(Z.status="alarm"),I&&I.material instanceof fn&&Qr.to(I.material,{opacity:1,duration:.2})}function ft(){d=requestAnimationFrame(ft),g.update(),R.forEach(I=>{var Et;const Z=(Et=I.parent)==null?void 0:Et.userData.id;if(!a.value.some(Tt=>Tt.id===Z&&Tt.status==="alarm")){I.scale.set(1,1,1),I.material instanceof fn&&(I.material.opacity=0);return}I.rotation.z+=.01;const ut=1+Math.sin(Date.now()*.004)*.08;I.scale.set(ut,ut,ut),I.material instanceof fn&&(I.material.opacity=.72+Math.sin(Date.now()*.006)*.26)}),b.forEach(I=>{const Z=I.children.find(tt=>tt.userData.pulse);if(Z){const tt=1+Math.sin(Date.now()*.006)*.18;Z.scale.set(tt,tt,tt),Z instanceof Se&&Z.material instanceof fn&&(Z.material.opacity=.45+Math.sin(Date.now()*.008)*.35)}}),A.forEach(I=>{if(I.userData.alarmEffect==="beam"&&(I.rotation.y+=.018,I instanceof Se&&I.material instanceof fn&&(I.material.opacity=.24+Math.sin(Date.now()*.007)*.18)),I.userData.alarmEffect==="halo"){const Z=1.1+Math.sin(Date.now()*.007)*.28;I.scale.set(Z,Z,Z),I instanceof Se&&I.material instanceof fn&&(I.material.opacity=.45+Math.sin(Date.now()*.009)*.25)}I.userData.alarmEffect==="dangerZone"&&I instanceof Se&&I.material instanceof Ka&&(I.material.opacity=.55+Math.sin(Date.now()*.01)*.25,I.material.emissive.set("#ff2d55"),I.material.emissiveIntensity=.65+Math.sin(Date.now()*.012)*.35)}),p.render(f,h)}function et(){t.value&&(h.aspect=t.value.clientWidth/t.value.clientHeight,h.updateProjectionMatrix(),p.setSize(t.value.clientWidth,t.value.clientHeight))}return zd(async()=>{await Ld(),U()}),Hd(()=>{cancelAnimationFrame(d),window.removeEventListener("resize",et),p==null||p.domElement.removeEventListener("pointerdown",H),p==null||p.domElement.removeEventListener("pointermove",z),p==null||p.domElement.removeEventListener("pointerleave",Y),p==null||p.dispose()}),(I,Z)=>(yi(),$i("main",bb,[Bt("header",{class:"topbar"},[Ab,Bt("div",{class:"top-actions"},[Bt("button",{onClick:at},"园区总览"),Bt("button",{onClick:dt},"模拟危险品报警")])]),Bt("section",wb,[Bt("aside",Rb,[Cb,Bt("div",Pb,[(yi(),$i(dn,null,ya(l,tt=>Bt("article",{key:tt.label,class:"metric-card"},[Bt("span",null,Pe(tt.label),1),Bt("strong",null,Pe(tt.value),1)])),64))]),Lb,(yi(!0),$i(dn,null,ya(a.value,tt=>(yi(),$i("button",{key:tt.id,class:ss(["park-row",{active:e.value===tt.id,alarm:tt.status==="alarm"}]),onClick:ut=>q(tt.id)},[Bt("span",null,Pe(tt.name),1),Bt("b",null,Pe(tt.status==="alarm"?"高危报警":"运行正常"),1)],10,Db))),128)),Ib,Bt("div",Ub,[(yi(),$i(dn,null,ya(o,tt=>Bt("button",{key:tt.id,class:ss({active:n.value===tt.id}),disabled:!r.value,onClick:ut=>rt(tt.id)},Pe(tt.name),11,Nb)),64))])]),Bt("section",Ob,[Bt("div",{ref_key:"sceneRoot",ref:t,class:"scene-root"},null,512),s.value.visible?(yi(),$i("div",{key:0,class:"person-tooltip",style:Io({left:`${s.value.x}px`,top:`${s.value.y}px`})},[Bt("strong",null,Pe(s.value.name),1),Bt("span",null,"状态："+Pe(s.value.statusText),1),Bt("span",null,"位置："+Pe(s.value.parkName)+" / "+Pe(s.value.floorName),1),Bt("span",null,"活动范围："+Pe(s.value.activityRange),1)],4)):Jg("",!0),Fb]),Bt("aside",Bb,[Bt("section",zb,[Hb,Bt("article",Gb,[kb,Bt("h3",null,Pe(u.value.personName)+" 触发危险品区域报警",1),Bt("p",null,"位置："+Pe(u.value.parkName)+" / "+Pe(u.value.buildingName)+" / "+Pe(u.value.floorName),1),Bt("p",null,"时间："+Pe(u.value.time),1)])]),Bt("section",Vb,[Wb,Bt("div",Xb,[(yi(),$i(dn,null,ya(c,tt=>Bt("div",{key:tt.id,class:"person-row"},[Bt("span",null,Pe(tt.name),1),Bt("b",{class:ss(tt.status)},Pe(tt.statusText),3)])),64))])])])])]))}});G0(Yb).mount("#app");
