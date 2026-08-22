(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function Jt(n,t){const e=document.getElementById(n);if(!(e instanceof t))throw new Error(`#${n} is not ${t.name}`);return e}function Ot(n,t,e){const i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.textContent=e),i}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ba="178",Ti={ROTATE:0,DOLLY:1,PAN:2},yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ah=0,vo=1,wh=2,Gl=1,Rh=2,un=3,Pn=0,Ce=1,dn=2,wn=0,Ai=1,xo=2,Mo=3,So=4,Ch=5,Gn=100,Ph=101,Dh=102,Lh=103,Uh=104,Ih=200,Nh=201,Fh=202,Oh=203,Wr=204,Xr=205,Bh=206,zh=207,kh=208,Hh=209,Vh=210,Gh=211,Wh=212,Xh=213,qh=214,qr=0,Yr=1,jr=2,Li=3,$r=4,Kr=5,Zr=6,Jr=7,Wl=0,Yh=1,jh=2,Rn=0,$h=1,Kh=2,Zh=3,Jh=4,Qh=5,tu=6,eu=7,Xl=300,Ui=301,Ii=302,Qr=303,ta=304,Ks=306,ea=1e3,Xn=1001,na=1002,Ze=1003,nu=1004,cs=1005,Qe=1006,rr=1007,qn=1008,en=1009,ql=1010,Yl=1011,Ji=1012,za=1013,Qn=1014,pn=1015,is=1016,ka=1017,Ha=1018,Qi=1020,jl=35902,$l=1021,Kl=1022,Ke=1023,ts=1026,es=1027,Zl=1028,Va=1029,Jl=1030,Ga=1031,Wa=1033,Us=33776,Is=33777,Ns=33778,Fs=33779,ia=35840,sa=35841,ra=35842,aa=35843,oa=36196,la=37492,ca=37496,ha=37808,ua=37809,da=37810,fa=37811,pa=37812,ma=37813,_a=37814,ga=37815,va=37816,xa=37817,Ma=37818,Sa=37819,Ea=37820,ya=37821,Os=36492,ba=36494,Ta=36495,Ql=36283,Aa=36284,wa=36285,Ra=36286,iu=3200,su=3201,tc=0,ru=1,Tn="",ke="srgb",Ni="srgb-linear",Ws="linear",Kt="srgb",ri=7680,Eo=519,au=512,ou=513,lu=514,ec=515,cu=516,hu=517,uu=518,du=519,yo=35044,bo="300 es",mn=2e3,Xs=2001;class ni{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bs=Math.PI/180,Ca=180/Math.PI;function ss(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xe[n&255]+xe[n>>8&255]+xe[n>>16&255]+xe[n>>24&255]+"-"+xe[t&255]+xe[t>>8&255]+"-"+xe[t>>16&15|64]+xe[t>>24&255]+"-"+xe[e&63|128]+xe[e>>8&255]+"-"+xe[e>>16&255]+xe[e>>24&255]+xe[i&255]+xe[i>>8&255]+xe[i>>16&255]+xe[i>>24&255]).toLowerCase()}function zt(n,t,e){return Math.max(t,Math.min(e,n))}function fu(n,t){return(n%t+t)%t}function ar(n,t,e){return(1-e)*n+e*t}function Hi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function we(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const pu={DEG2RAD:Bs};class Ut{constructor(t=0,e=0){Ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ti{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[a+0],m=r[a+1],_=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==f||c!==m||h!==_){let p=1-o;const d=l*f+c*m+h*_+u*g,y=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const D=Math.sqrt(b),w=Math.atan2(D,d*y);p=Math.sin(p*w)/D,o=Math.sin(o*w)/D}const E=o*y;if(l=l*p+f*E,c=c*p+m*E,h=h*p+_*E,u=u*p+g*E,p===1-o){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+h*u+l*m-c*f,t[e+1]=l*_+h*f+c*u-o*m,t[e+2]=c*_+h*m+o*f-l*u,t[e+3]=h*_-o*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*m*_,this._y=c*m*u-f*h*_,this._z=c*h*_+f*m*u,this._w=c*h*u-f*m*_;break;case"YXZ":this._x=f*h*u+c*m*_,this._y=c*m*u-f*h*_,this._z=c*h*_-f*m*u,this._w=c*h*u+f*m*_;break;case"ZXY":this._x=f*h*u-c*m*_,this._y=c*m*u+f*h*_,this._z=c*h*_+f*m*u,this._w=c*h*u-f*m*_;break;case"ZYX":this._x=f*h*u-c*m*_,this._y=c*m*u+f*h*_,this._z=c*h*_-f*m*u,this._w=c*h*u+f*m*_;break;case"YZX":this._x=f*h*u+c*m*_,this._y=c*m*u+f*h*_,this._z=c*h*_-f*m*u,this._w=c*h*u-f*m*_;break;case"XZY":this._x=f*h*u-c*m*_,this._y=c*m*u-f*h*_,this._z=c*h*_+f*m*u,this._w=c*h*u+f*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,i=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(To.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(To.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return or.copy(this).projectOnVector(t),this.sub(or)}reflect(t){return this.sub(or.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const or=new N,To=new ti;class It{constructor(t,e,i,s,r,a,o,l,c){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],m=i[5],_=i[8],g=s[0],p=s[3],d=s[6],y=s[1],b=s[4],E=s[7],D=s[2],w=s[5],T=s[8];return r[0]=a*g+o*y+l*D,r[3]=a*p+o*b+l*w,r[6]=a*d+o*E+l*T,r[1]=c*g+h*y+u*D,r[4]=c*p+h*b+u*w,r[7]=c*d+h*E+u*T,r[2]=f*g+m*y+_*D,r[5]=f*p+m*b+_*w,r[8]=f*d+m*E+_*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,m=c*r-a*l,_=e*u+i*f+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(s*c-h*i)*g,t[2]=(o*i-s*a)*g,t[3]=f*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=m*g,t[7]=(i*l-c*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(lr.makeScale(t,e)),this}rotate(t){return this.premultiply(lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const lr=new It;function nc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function qs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mu(){const n=qs("canvas");return n.style.display="block",n}const Ao={};function wi(n){n in Ao||(Ao[n]=!0,console.warn(n))}function _u(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function gu(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function vu(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const wo=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ro=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xu(){const n={enabled:!0,workingColorSpace:Ni,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Kt&&(s.r=_n(s.r),s.g=_n(s.g),s.b=_n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Kt&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Tn?Ws:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ni]:{primaries:t,whitePoint:i,transfer:Ws,toXYZ:wo,fromXYZ:Ro,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:i,transfer:Kt,toXYZ:wo,fromXYZ:Ro,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),n}const Gt=xu();function _n(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ri(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ai;class Mu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ai===void 0&&(ai=qs("canvas")),ai.width=t.width,ai.height=t.height;const s=ai.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ai}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=_n(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(_n(e[i]/255)*255):e[i]=_n(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Su=0;class Xa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=ss(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cr(s[a].image)):r.push(cr(s[a]))}else r=cr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function cr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Mu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eu=0;const hr=new N;class Pe extends ni{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,i=Xn,s=Xn,r=Qe,a=qn,o=Ke,l=en,c=Pe.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=ss(),this.name="",this.source=new Xa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hr).x}get height(){return this.source.getSize(hr).y}get depth(){return this.source.getSize(hr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ea:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case na:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ea:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case na:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Xl;Pe.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,i=0,s=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],_=l[9],g=l[2],p=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,E=(m+1)/2,D=(d+1)/2,w=(h+f)/4,T=(u+g)/4,P=(_+p)/4;return b>E&&b>D?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=w/i,r=T/i):E>D?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=w/s,r=P/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=T/r,s=P/r),this.set(i,s,r,e),this}let y=Math.sqrt((p-_)*(p-_)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-_)/y,this.y=(u-g)/y,this.z=(f-h)/y,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yu extends ni{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new Pe(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Xa(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends yu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ic extends Pe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bu extends Pe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bi{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,We):We.fromBufferAttribute(r,a),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),hs.copy(i.boundingBox)),hs.applyMatrix4(t.matrixWorld),this.union(hs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vi),us.subVectors(this.max,Vi),oi.subVectors(t.a,Vi),li.subVectors(t.b,Vi),ci.subVectors(t.c,Vi),vn.subVectors(li,oi),xn.subVectors(ci,li),Nn.subVectors(oi,ci);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Nn.z,Nn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Nn.z,0,-Nn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Nn.y,Nn.x,0];return!ur(e,oi,li,ci,us)||(e=[1,0,0,0,1,0,0,0,1],!ur(e,oi,li,ci,us))?!1:(ds.crossVectors(vn,xn),e=[ds.x,ds.y,ds.z],ur(e,oi,li,ci,us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const an=[new N,new N,new N,new N,new N,new N,new N,new N],We=new N,hs=new Bi,oi=new N,li=new N,ci=new N,vn=new N,xn=new N,Nn=new N,Vi=new N,us=new N,ds=new N,Fn=new N;function ur(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Fn.fromArray(n,r);const o=s.x*Math.abs(Fn.x)+s.y*Math.abs(Fn.y)+s.z*Math.abs(Fn.z),l=t.dot(Fn),c=e.dot(Fn),h=i.dot(Fn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Tu=new Bi,Gi=new N,dr=new N;class qa{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Tu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gi.subVectors(t,this.center);const e=Gi.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Gi,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gi.copy(t.center).add(dr)),this.expandByPoint(Gi.copy(t.center).sub(dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const on=new N,fr=new N,fs=new N,Mn=new N,pr=new N,ps=new N,mr=new N;class sc{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){fr.copy(t).add(e).multiplyScalar(.5),fs.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(fr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(fs),o=Mn.dot(this.direction),l=-Mn.dot(fs),c=Mn.lengthSq(),h=Math.abs(1-a*a);let u,f,m,_;if(h>0)if(u=a*l-o,f=a*o-l,_=r*h,u>=0)if(f>=-_)if(f<=_){const g=1/h;u*=g,f*=g,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-_?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=_?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fr).addScaledVector(fs,f),m}intersectSphere(t,e){on.subVectors(t.center,this.origin);const i=on.dot(this.direction),s=on.dot(on)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,i,s,r){pr.subVectors(e,t),ps.subVectors(i,t),mr.crossVectors(pr,ps);let a=this.direction.dot(mr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,t);const l=o*this.direction.dot(ps.crossVectors(Mn,ps));if(l<0)return null;const c=o*this.direction.dot(pr.cross(Mn));if(c<0||l+c>a)return null;const h=-o*Mn.dot(mr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,i,s,r,a,o,l,c,h,u,f,m,_,g,p){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,m,_,g,p)}set(t,e,i,s,r,a,o,l,c,h,u,f,m,_,g,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=_,d[11]=g,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/hi.setFromMatrixColumn(t,0).length(),r=1/hi.setFromMatrixColumn(t,1).length(),a=1/hi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*u,_=o*h,g=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+_*c,e[5]=f-g*c,e[9]=-o*l,e[2]=g-f*c,e[6]=_+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*u,_=c*h,g=c*u;e[0]=f+g*o,e[4]=_*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-_,e[6]=g+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*u,_=c*h,g=c*u;e[0]=f-g*o,e[4]=-a*u,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*h,e[9]=g-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*u,_=o*h,g=o*u;e[0]=l*h,e[4]=_*c-m,e[8]=f*c+g,e[1]=l*u,e[5]=g*c+f,e[9]=m*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,_=o*l,g=o*c;e[0]=l*h,e[4]=g-f*u,e[8]=_*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*u+_,e[10]=f-g*u}else if(t.order==="XZY"){const f=a*l,m=a*c,_=o*l,g=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+g,e[5]=a*h,e[9]=m*u-_,e[2]=_*u-m,e[6]=o*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Au,t,wu)}lookAt(t,e,i){const s=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),Sn.crossVectors(i,Ue),Sn.lengthSq()===0&&(Math.abs(i.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),Sn.crossVectors(i,Ue)),Sn.normalize(),ms.crossVectors(Ue,Sn),s[0]=Sn.x,s[4]=ms.x,s[8]=Ue.x,s[1]=Sn.y,s[5]=ms.y,s[9]=Ue.y,s[2]=Sn.z,s[6]=ms.z,s[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],m=i[13],_=i[2],g=i[6],p=i[10],d=i[14],y=i[3],b=i[7],E=i[11],D=i[15],w=s[0],T=s[4],P=s[8],S=s[12],x=s[1],C=s[5],H=s[9],O=s[13],X=s[2],K=s[6],G=s[10],tt=s[14],k=s[3],ot=s[7],ut=s[11],Et=s[15];return r[0]=a*w+o*x+l*X+c*k,r[4]=a*T+o*C+l*K+c*ot,r[8]=a*P+o*H+l*G+c*ut,r[12]=a*S+o*O+l*tt+c*Et,r[1]=h*w+u*x+f*X+m*k,r[5]=h*T+u*C+f*K+m*ot,r[9]=h*P+u*H+f*G+m*ut,r[13]=h*S+u*O+f*tt+m*Et,r[2]=_*w+g*x+p*X+d*k,r[6]=_*T+g*C+p*K+d*ot,r[10]=_*P+g*H+p*G+d*ut,r[14]=_*S+g*O+p*tt+d*Et,r[3]=y*w+b*x+E*X+D*k,r[7]=y*T+b*C+E*K+D*ot,r[11]=y*P+b*H+E*G+D*ut,r[15]=y*S+b*O+E*tt+D*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],_=t[3],g=t[7],p=t[11],d=t[15];return _*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*m-i*l*m)+g*(+e*l*m-e*c*f+r*a*f-s*a*m+s*c*h-r*l*h)+p*(+e*c*u-e*o*m-r*a*u+i*a*m+r*o*h-i*c*h)+d*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],_=t[12],g=t[13],p=t[14],d=t[15],y=u*p*c-g*f*c+g*l*m-o*p*m-u*l*d+o*f*d,b=_*f*c-h*p*c-_*l*m+a*p*m+h*l*d-a*f*d,E=h*g*c-_*u*c+_*o*m-a*g*m-h*o*d+a*u*d,D=_*u*l-h*g*l-_*o*f+a*g*f+h*o*p-a*u*p,w=e*y+i*b+s*E+r*D;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return t[0]=y*T,t[1]=(g*f*r-u*p*r-g*s*m+i*p*m+u*s*d-i*f*d)*T,t[2]=(o*p*r-g*l*r+g*s*c-i*p*c-o*s*d+i*l*d)*T,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*m-i*l*m)*T,t[4]=b*T,t[5]=(h*p*r-_*f*r+_*s*m-e*p*m-h*s*d+e*f*d)*T,t[6]=(_*l*r-a*p*r-_*s*c+e*p*c+a*s*d-e*l*d)*T,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*m+e*l*m)*T,t[8]=E*T,t[9]=(_*u*r-h*g*r-_*i*m+e*g*m+h*i*d-e*u*d)*T,t[10]=(a*g*r-_*o*r+_*i*c-e*g*c-a*i*d+e*o*d)*T,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*m-e*o*m)*T,t[12]=D*T,t[13]=(h*g*s-_*u*s+_*i*f-e*g*f-h*i*p+e*u*p)*T,t[14]=(_*o*s-a*g*s-_*i*l+e*g*l+a*i*p-e*o*p)*T,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*T,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,m=r*h,_=r*u,g=a*h,p=a*u,d=o*u,y=l*c,b=l*h,E=l*u,D=i.x,w=i.y,T=i.z;return s[0]=(1-(g+d))*D,s[1]=(m+E)*D,s[2]=(_-b)*D,s[3]=0,s[4]=(m-E)*w,s[5]=(1-(f+d))*w,s[6]=(p+y)*w,s[7]=0,s[8]=(_+b)*T,s[9]=(p-y)*T,s[10]=(1-(f+g))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=hi.set(s[0],s[1],s[2]).length();const a=hi.set(s[4],s[5],s[6]).length(),o=hi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Xe.copy(this);const c=1/r,h=1/a,u=1/o;return Xe.elements[0]*=c,Xe.elements[1]*=c,Xe.elements[2]*=c,Xe.elements[4]*=h,Xe.elements[5]*=h,Xe.elements[6]*=h,Xe.elements[8]*=u,Xe.elements[9]*=u,Xe.elements[10]*=u,e.setFromRotationMatrix(Xe),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=mn){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let m,_;if(o===mn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Xs)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=mn){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,m=(i+s)*h;let _,g;if(o===mn)_=(a+r)*u,g=-2*u;else if(o===Xs)_=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const hi=new N,Xe=new he,Au=new N(0,0,0),wu=new N(1,1,1),Sn=new N,ms=new N,Ue=new N,Co=new he,Po=new ti;class nn{constructor(t=0,e=0,i=0,s=nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Co.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Co,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Po.setFromEuler(this),this.setFromQuaternion(Po,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nn.DEFAULT_ORDER="XYZ";class rc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ru=0;const Do=new N,ui=new ti,ln=new he,_s=new N,Wi=new N,Cu=new N,Pu=new ti,Lo=new N(1,0,0),Uo=new N(0,1,0),Io=new N(0,0,1),No={type:"added"},Du={type:"removed"},di={type:"childadded",child:null},_r={type:"childremoved",child:null};class ve extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=ss(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new N,e=new nn,i=new ti,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new It}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ui.setFromAxisAngle(t,e),this.quaternion.multiply(ui),this}rotateOnWorldAxis(t,e){return ui.setFromAxisAngle(t,e),this.quaternion.premultiply(ui),this}rotateX(t){return this.rotateOnAxis(Lo,t)}rotateY(t){return this.rotateOnAxis(Uo,t)}rotateZ(t){return this.rotateOnAxis(Io,t)}translateOnAxis(t,e){return Do.copy(t).applyQuaternion(this.quaternion),this.position.add(Do.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lo,t)}translateY(t){return this.translateOnAxis(Uo,t)}translateZ(t){return this.translateOnAxis(Io,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?_s.copy(t):_s.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Wi,_s,this.up):ln.lookAt(_s,Wi,this.up),this.quaternion.setFromRotationMatrix(ln),s&&(ln.extractRotation(s.matrixWorld),ui.setFromRotationMatrix(ln),this.quaternion.premultiply(ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(No),di.child=t,this.dispatchEvent(di),di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),_r.child=t,this.dispatchEvent(_r),_r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(No),di.child=t,this.dispatchEvent(di),di.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,Cu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,Pu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}ve.DEFAULT_UP=new N(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qe=new N,cn=new N,gr=new N,hn=new N,fi=new N,pi=new N,Fo=new N,vr=new N,xr=new N,Mr=new N,Sr=new ce,Er=new ce,yr=new ce;class je{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),qe.subVectors(t,e),s.cross(qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){qe.subVectors(s,e),cn.subVectors(i,e),gr.subVectors(t,e);const a=qe.dot(qe),o=qe.dot(cn),l=qe.dot(gr),c=cn.dot(cn),h=cn.dot(gr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(c*l-o*h)*f,_=(a*h-o*l)*f;return r.set(1-m-_,_,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,hn)===null?!1:hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hn.x),l.addScaledVector(a,hn.y),l.addScaledVector(o,hn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Sr.setScalar(0),Er.setScalar(0),yr.setScalar(0),Sr.fromBufferAttribute(t,e),Er.fromBufferAttribute(t,i),yr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Sr,r.x),a.addScaledVector(Er,r.y),a.addScaledVector(yr,r.z),a}static isFrontFacing(t,e,i,s){return qe.subVectors(i,e),cn.subVectors(t,e),qe.cross(cn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qe.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),qe.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;fi.subVectors(s,i),pi.subVectors(r,i),vr.subVectors(t,i);const l=fi.dot(vr),c=pi.dot(vr);if(l<=0&&c<=0)return e.copy(i);xr.subVectors(t,s);const h=fi.dot(xr),u=pi.dot(xr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(fi,a);Mr.subVectors(t,r);const m=fi.dot(Mr),_=pi.dot(Mr);if(_>=0&&m<=_)return e.copy(r);const g=m*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(pi,o);const p=h*_-m*u;if(p<=0&&u-h>=0&&m-_>=0)return Fo.subVectors(r,s),o=(u-h)/(u-h+(m-_)),e.copy(s).addScaledVector(Fo,o);const d=1/(p+g+f);return a=g*d,o=f*d,e.copy(i).addScaledVector(fi,a).addScaledVector(pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},gs={h:0,s:0,l:0};function br(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Wt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Gt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Gt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Gt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Gt.workingColorSpace){if(t=fu(t,1),e=zt(e,0,1),i=zt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=br(a,r,t+1/3),this.g=br(a,r,t),this.b=br(a,r,t-1/3)}return Gt.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const i=ac[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_n(t.r),this.g=_n(t.g),this.b=_n(t.b),this}copyLinearToSRGB(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Gt.workingToColorSpace(Me.copy(this),t),Math.round(zt(Me.r*255,0,255))*65536+Math.round(zt(Me.g*255,0,255))*256+Math.round(zt(Me.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Gt.workingColorSpace){Gt.workingToColorSpace(Me.copy(this),e);const i=Me.r,s=Me.g,r=Me.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Gt.workingColorSpace){return Gt.workingToColorSpace(Me.copy(this),e),t.r=Me.r,t.g=Me.g,t.b=Me.b,t}getStyle(t=ke){Gt.workingToColorSpace(Me.copy(this),t);const e=Me.r,i=Me.g,s=Me.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(En),this.setHSL(En.h+t,En.s+e,En.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(En),t.getHSL(gs);const i=ar(En.h,gs.h,e),s=ar(En.s,gs.s,e),r=ar(En.l,gs.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Me=new Wt;Wt.NAMES=ac;let Lu=0;class rs extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=ss(),this.name="",this.type="Material",this.blending=Ai,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wr,this.blendDst=Xr,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(i.blending=this.blending),this.side!==Pn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wr&&(i.blendSrc=this.blendSrc),this.blendDst!==Xr&&(i.blendDst=this.blendDst),this.blendEquation!==Gn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Li&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class oc extends rs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new N,vs=new Ut;let Uu=0;class Ne{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Uu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=yo,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)vs.fromBufferAttribute(this,e),vs.applyMatrix3(t),this.setXY(e,vs.x,vs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Hi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==yo&&(t.usage=this.usage),t}}class lc extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class cc extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Kn extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Iu=0;const Be=new he,Tr=new ve,mi=new N,Ie=new Bi,Xi=new Bi,_e=new N;class Ln extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=ss(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nc(t)?cc:lc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new It().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Be.makeRotationFromQuaternion(t),this.applyMatrix4(Be),this}rotateX(t){return Be.makeRotationX(t),this.applyMatrix4(Be),this}rotateY(t){return Be.makeRotationY(t),this.applyMatrix4(Be),this}rotateZ(t){return Be.makeRotationZ(t),this.applyMatrix4(Be),this}translate(t,e,i){return Be.makeTranslation(t,e,i),this.applyMatrix4(Be),this}scale(t,e,i){return Be.makeScale(t,e,i),this.applyMatrix4(Be),this}lookAt(t){return Tr.lookAt(t),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mi).negate(),this.translate(mi.x,mi.y,mi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kn(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ie.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(Ie.min,Xi.min),Ie.expandByPoint(_e),_e.addVectors(Ie.max,Xi.max),Ie.expandByPoint(_e)):(Ie.expandByPoint(Xi.min),Ie.expandByPoint(Xi.max))}Ie.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(mi.fromBufferAttribute(t,c),_e.add(mi)),s=Math.max(s,i.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new N,l[P]=new N;const c=new N,h=new N,u=new N,f=new Ut,m=new Ut,_=new Ut,g=new N,p=new N;function d(P,S,x){c.fromBufferAttribute(i,P),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,x),f.fromBufferAttribute(r,P),m.fromBufferAttribute(r,S),_.fromBufferAttribute(r,x),h.sub(c),u.sub(c),m.sub(f),_.sub(f);const C=1/(m.x*_.y-_.x*m.y);isFinite(C)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-m.y).multiplyScalar(C),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(C),o[P].add(g),o[S].add(g),o[x].add(g),l[P].add(p),l[S].add(p),l[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let P=0,S=y.length;P<S;++P){const x=y[P],C=x.start,H=x.count;for(let O=C,X=C+H;O<X;O+=3)d(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const b=new N,E=new N,D=new N,w=new N;function T(P){D.fromBufferAttribute(s,P),w.copy(D);const S=o[P];b.copy(S),b.sub(D.multiplyScalar(D.dot(S))).normalize(),E.crossVectors(w,S);const C=E.dot(l[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,C)}for(let P=0,S=y.length;P<S;++P){const x=y[P],C=x.start,H=x.count;for(let O=C,X=C+H;O<X;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let f=0,m=t.count;f<m;f+=3){const _=t.getX(f+0),g=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,_=0;for(let g=0,p=l.length;g<p;g++){o.isInterleavedBufferAttribute?m=l[g]*o.data.stride+o.offset:m=l[g]*h;for(let d=0;d<h;d++)f[_++]=c[m++]}return new Ne(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ln,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=t(f,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oo=new he,On=new sc,xs=new qa,Bo=new N,Ms=new N,Ss=new N,Es=new N,Ar=new N,ys=new N,zo=new N,bs=new N;class tn extends ve{constructor(t=new Ln,e=new oc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ys.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ar.fromBufferAttribute(u,t),a?ys.addScaledVector(Ar,h):ys.addScaledVector(Ar.sub(e),h))}e.add(ys)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(r),On.copy(t.ray).recast(t.near),!(xs.containsPoint(On.origin)===!1&&(On.intersectSphere(xs,Bo)===null||On.origin.distanceToSquared(Bo)>(t.far-t.near)**2))&&(Oo.copy(r).invert(),On.copy(t.ray).applyMatrix4(Oo),!(i.boundingBox!==null&&On.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,On)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const p=f[_],d=a[p.materialIndex],y=Math.max(p.start,m.start),b=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=y,D=b;E<D;E+=3){const w=o.getX(E),T=o.getX(E+1),P=o.getX(E+2);s=Ts(this,d,t,i,c,h,u,w,T,P),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let p=_,d=g;p<d;p+=3){const y=o.getX(p),b=o.getX(p+1),E=o.getX(p+2);s=Ts(this,a,t,i,c,h,u,y,b,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const p=f[_],d=a[p.materialIndex],y=Math.max(p.start,m.start),b=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let E=y,D=b;E<D;E+=3){const w=E,T=E+1,P=E+2;s=Ts(this,d,t,i,c,h,u,w,T,P),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let p=_,d=g;p<d;p+=3){const y=p,b=p+1,E=p+2;s=Ts(this,a,t,i,c,h,u,y,b,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Nu(n,t,e,i,s,r,a,o){let l;if(t.side===Ce?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Pn,o),l===null)return null;bs.copy(o),bs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(bs);return c<e.near||c>e.far?null:{distance:c,point:bs.clone(),object:n}}function Ts(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Ms),n.getVertexPosition(l,Ss),n.getVertexPosition(c,Es);const h=Nu(n,t,e,i,Ms,Ss,Es,zo);if(h){const u=new N;je.getBarycoord(zo,Ms,Ss,Es,u),s&&(h.uv=je.getInterpolatedAttribute(s,o,l,c,u,new Ut)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,l,c,u,new Ut)),a&&(h.normal=je.getInterpolatedAttribute(a,o,l,c,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new N,materialIndex:0};je.getNormal(Ms,Ss,Es,f.normal),h.face=f,h.barycoord=u}return h}class as extends Ln{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Kn(c,3)),this.setAttribute("normal",new Kn(h,3)),this.setAttribute("uv",new Kn(u,2));function _(g,p,d,y,b,E,D,w,T,P,S){const x=E/T,C=D/P,H=E/2,O=D/2,X=w/2,K=T+1,G=P+1;let tt=0,k=0;const ot=new N;for(let ut=0;ut<G;ut++){const Et=ut*C-O;for(let Bt=0;Bt<K;Bt++){const Qt=Bt*x-H;ot[g]=Qt*y,ot[p]=Et*b,ot[d]=X,c.push(ot.x,ot.y,ot.z),ot[g]=0,ot[p]=0,ot[d]=w>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(Bt/T),u.push(1-ut/P),tt+=1}}for(let ut=0;ut<P;ut++)for(let Et=0;Et<T;Et++){const Bt=f+Et+K*ut,Qt=f+Et+K*(ut+1),q=f+(Et+1)+K*(ut+1),et=f+(Et+1)+K*ut;l.push(Bt,Qt,et),l.push(Qt,q,et),k+=6}o.addGroup(m,k,S),m+=k,f+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Fi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ye(n){const t={};for(let e=0;e<n.length;e++){const i=Fi(n[e]);for(const s in i)t[s]=i[s]}return t}function Fu(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function hc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gt.workingColorSpace}const Ou={clone:Fi,merge:ye};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends rs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fi(t.uniforms),this.uniformsGroups=Fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class uc extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yn=new N,ko=new Ut,Ho=new Ut;class He extends uc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ca*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ca*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yn.x,yn.y).multiplyScalar(-t/yn.z),yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yn.x,yn.y).multiplyScalar(-t/yn.z)}getViewSize(t,e){return this.getViewBounds(t,ko,Ho),e.subVectors(Ho,ko)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Bs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _i=-90,gi=1;class ku extends ve{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new He(_i,gi,t,e);s.layers=this.layers,this.add(s);const r=new He(_i,gi,t,e);r.layers=this.layers,this.add(r);const a=new He(_i,gi,t,e);a.layers=this.layers,this.add(a);const o=new He(_i,gi,t,e);o.layers=this.layers,this.add(o);const l=new He(_i,gi,t,e);l.layers=this.layers,this.add(l);const c=new He(_i,gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===mn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,m),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class dc extends Pe{constructor(t=[],e=Ui,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hu extends ei{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new dc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new as(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:Fi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ce,blending:wn});r.uniforms.tEquirect.value=e;const a=new tn(s,r),o=e.minFilter;return e.minFilter===qn&&(e.minFilter=Qe),new ku(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}class Yi extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vu={type:"move"};class wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const p=e.getJointPose(g,i),d=this._getHandJoint(c,g);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,_=.005;c.inputState.pinching&&f>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Yi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Gu extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Rr=new N,Wu=new N,Xu=new It;class bn{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Rr.subVectors(i,e).cross(Wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Rr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Xu.getNormalMatrix(t),s=this.coplanarPoint(Rr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bn=new qa,qu=new Ut(.5,.5),As=new N;class Ya{constructor(t=new bn,e=new bn,i=new bn,s=new bn,r=new bn,a=new bn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=mn){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],m=s[8],_=s[9],g=s[10],p=s[11],d=s[12],y=s[13],b=s[14],E=s[15];if(i[0].setComponents(l-r,f-c,p-m,E-d).normalize(),i[1].setComponents(l+r,f+c,p+m,E+d).normalize(),i[2].setComponents(l+a,f+h,p+_,E+y).normalize(),i[3].setComponents(l-a,f-h,p-_,E-y).normalize(),i[4].setComponents(l-o,f-u,p-g,E-b).normalize(),e===mn)i[5].setComponents(l+o,f+u,p+g,E+b).normalize();else if(e===Xs)i[5].setComponents(o,u,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(t){Bn.center.set(0,0,0);const e=qu.distanceTo(t.center);return Bn.radius=.7071067811865476+e,Bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(As.x=s.normal.x>0?t.max.x:t.min.x,As.y=s.normal.y>0?t.max.y:t.min.y,As.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(As)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fc extends Pe{constructor(t,e,i=Qn,s,r,a,o=Ze,l=Ze,c,h=ts,u=1){if(h!==ts&&h!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Zs extends Ln{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,m=[],_=[],g=[],p=[];for(let d=0;d<h;d++){const y=d*f-a;for(let b=0;b<c;b++){const E=b*u-r;_.push(E,-y,0),g.push(0,0,1),p.push(b/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const b=y+c*d,E=y+c*(d+1),D=y+1+c*(d+1),w=y+1+c*d;m.push(b,E,w),m.push(E,D,w)}this.setIndex(m),this.setAttribute("position",new Kn(_,3)),this.setAttribute("normal",new Kn(g,3)),this.setAttribute("uv",new Kn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Yu extends rs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tc,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ju extends rs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class $u extends rs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class pc extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ku extends pc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Cr=new he,Vo=new N,Go=new N;class Zu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ya,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Vo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vo),Go.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Go),e.updateMatrixWorld(),Cr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Cr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class mc extends uc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ju extends Zu{constructor(){super(new mc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wo extends pc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new Ju}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Qu extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Xo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class td extends ni{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function qo(n,t,e,i){const s=ed(i);switch(e){case $l:return n*t;case Zl:return n*t/s.components*s.byteLength;case Va:return n*t/s.components*s.byteLength;case Jl:return n*t*2/s.components*s.byteLength;case Ga:return n*t*2/s.components*s.byteLength;case Kl:return n*t*3/s.components*s.byteLength;case Ke:return n*t*4/s.components*s.byteLength;case Wa:return n*t*4/s.components*s.byteLength;case Us:case Is:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ns:case Fs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sa:case aa:return Math.max(n,16)*Math.max(t,8)/4;case ia:case ra:return Math.max(n,8)*Math.max(t,8)/2;case oa:case la:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ua:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case da:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case fa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case pa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ma:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case _a:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ga:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case va:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case xa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ea:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ya:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Os:case ba:case Ta:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ql:case Aa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case wa:case Ra:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ed(n){switch(n){case en:case ql:return{byteLength:1,components:1};case Ji:case Yl:case is:return{byteLength:2,components:1};case ka:case Ha:return{byteLength:2,components:4};case Qn:case za:case pn:return{byteLength:4,components:1};case jl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ba}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ba);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _c(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function nd(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((m,_)=>m.start-_.start);let f=0;for(let m=1;m<u.length;m++){const _=u[f],g=u[m];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,u[f]=g)}u.length=f+1;for(let m=0,_=u.length;m<_;m++){const g=u[m];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var id=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sd=`#ifdef USE_ALPHAHASH
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
#endif`,rd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ad=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ld=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cd=`#ifdef USE_AOMAP
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
#endif`,hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ud=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,md=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_d=`#ifdef USE_IRIDESCENCE
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
#endif`,gd=`#ifdef USE_BUMPMAP
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ad=`#define PI 3.141592653589793
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
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rd=`vec3 transformedNormal = objectNormal;
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
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ud="gl_FragColor = linearToOutputTexel( gl_FragColor );",Id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nd=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,Fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wd=`#ifdef USE_GRADIENTMAP
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
}`,Xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jd=`uniform bool receiveShadow;
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
#endif`,$d=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
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
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
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
#endif`,Kd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
#endif`,ef=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
}`,nf=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,sf=`#if defined( RE_IndirectDiffuse )
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
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,of=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ff=`#if defined( USE_POINTS_UV )
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
#endif`,pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_f=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Mf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Af=`#ifdef USE_NORMALMAP
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
#endif`,wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Df=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,Uf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,If=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ff=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Of=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wf=`#ifdef USE_SKINNING
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
#endif`,Xf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qf=`#ifdef USE_SKINNING
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
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$f=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kf=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zf=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jf=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sp=`uniform sampler2D t2D;
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
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,hp=`#if DEPTH_PACKING == 3200
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
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
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,up=`#define DISTANCE
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
	#include <morphinstance_vertex>
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
}`,dp=`#define DISTANCE
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gp=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,vp=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,xp=`#define LAMBERT
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
	#include <morphinstance_vertex>
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
}`,Mp=`#define LAMBERT
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Sp=`#define MATCAP
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
	#include <morphinstance_vertex>
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
}`,Ep=`#define MATCAP
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,yp=`#define NORMAL
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
	#include <morphinstance_vertex>
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
}`,bp=`#define NORMAL
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
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tp=`#define PHONG
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
	#include <morphinstance_vertex>
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
}`,Ap=`#define PHONG
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,wp=`#define STANDARD
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
	#include <morphinstance_vertex>
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
}`,Rp=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Cp=`#define TOON
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
	#include <morphinstance_vertex>
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
}`,Pp=`#define TOON
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Dp=`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,Lp=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,Up=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,Ip=`uniform vec3 color;
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
}`,Np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,Fp=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,Ft={alphahash_fragment:id,alphahash_pars_fragment:sd,alphamap_fragment:rd,alphamap_pars_fragment:ad,alphatest_fragment:od,alphatest_pars_fragment:ld,aomap_fragment:cd,aomap_pars_fragment:hd,batching_pars_vertex:ud,batching_vertex:dd,begin_vertex:fd,beginnormal_vertex:pd,bsdfs:md,iridescence_fragment:_d,bumpmap_pars_fragment:gd,clipping_planes_fragment:vd,clipping_planes_pars_fragment:xd,clipping_planes_pars_vertex:Md,clipping_planes_vertex:Sd,color_fragment:Ed,color_pars_fragment:yd,color_pars_vertex:bd,color_vertex:Td,common:Ad,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Rd,displacementmap_pars_vertex:Cd,displacementmap_vertex:Pd,emissivemap_fragment:Dd,emissivemap_pars_fragment:Ld,colorspace_fragment:Ud,colorspace_pars_fragment:Id,envmap_fragment:Nd,envmap_common_pars_fragment:Fd,envmap_pars_fragment:Od,envmap_pars_vertex:Bd,envmap_physical_pars_fragment:$d,envmap_vertex:zd,fog_vertex:kd,fog_pars_vertex:Hd,fog_fragment:Vd,fog_pars_fragment:Gd,gradientmap_pars_fragment:Wd,lightmap_pars_fragment:Xd,lights_lambert_fragment:qd,lights_lambert_pars_fragment:Yd,lights_pars_begin:jd,lights_toon_fragment:Kd,lights_toon_pars_fragment:Zd,lights_phong_fragment:Jd,lights_phong_pars_fragment:Qd,lights_physical_fragment:tf,lights_physical_pars_fragment:ef,lights_fragment_begin:nf,lights_fragment_maps:sf,lights_fragment_end:rf,logdepthbuf_fragment:af,logdepthbuf_pars_fragment:of,logdepthbuf_pars_vertex:lf,logdepthbuf_vertex:cf,map_fragment:hf,map_pars_fragment:uf,map_particle_fragment:df,map_particle_pars_fragment:ff,metalnessmap_fragment:pf,metalnessmap_pars_fragment:mf,morphinstance_vertex:_f,morphcolor_vertex:gf,morphnormal_vertex:vf,morphtarget_pars_vertex:xf,morphtarget_vertex:Mf,normal_fragment_begin:Sf,normal_fragment_maps:Ef,normal_pars_fragment:yf,normal_pars_vertex:bf,normal_vertex:Tf,normalmap_pars_fragment:Af,clearcoat_normal_fragment_begin:wf,clearcoat_normal_fragment_maps:Rf,clearcoat_pars_fragment:Cf,iridescence_pars_fragment:Pf,opaque_fragment:Df,packing:Lf,premultiplied_alpha_fragment:Uf,project_vertex:If,dithering_fragment:Nf,dithering_pars_fragment:Ff,roughnessmap_fragment:Of,roughnessmap_pars_fragment:Bf,shadowmap_pars_fragment:zf,shadowmap_pars_vertex:kf,shadowmap_vertex:Hf,shadowmask_pars_fragment:Vf,skinbase_vertex:Gf,skinning_pars_vertex:Wf,skinning_vertex:Xf,skinnormal_vertex:qf,specularmap_fragment:Yf,specularmap_pars_fragment:jf,tonemapping_fragment:$f,tonemapping_pars_fragment:Kf,transmission_fragment:Zf,transmission_pars_fragment:Jf,uv_pars_fragment:Qf,uv_pars_vertex:tp,uv_vertex:ep,worldpos_vertex:np,background_vert:ip,background_frag:sp,backgroundCube_vert:rp,backgroundCube_frag:ap,cube_vert:op,cube_frag:lp,depth_vert:cp,depth_frag:hp,distanceRGBA_vert:up,distanceRGBA_frag:dp,equirect_vert:fp,equirect_frag:pp,linedashed_vert:mp,linedashed_frag:_p,meshbasic_vert:gp,meshbasic_frag:vp,meshlambert_vert:xp,meshlambert_frag:Mp,meshmatcap_vert:Sp,meshmatcap_frag:Ep,meshnormal_vert:yp,meshnormal_frag:bp,meshphong_vert:Tp,meshphong_frag:Ap,meshphysical_vert:wp,meshphysical_frag:Rp,meshtoon_vert:Cp,meshtoon_frag:Pp,points_vert:Dp,points_frag:Lp,shadow_vert:Up,shadow_frag:Ip,sprite_vert:Np,sprite_frag:Fp},it={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},Je={basic:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:ye([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:ye([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:ye([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:ye([it.points,it.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:ye([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:ye([it.common,it.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:ye([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:ye([it.sprite,it.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:ye([it.common,it.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:ye([it.lights,it.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Je.physical={uniforms:ye([Je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const ws={r:0,b:0,g:0},zn=new nn,Op=new he;function Bp(n,t,e,i,s,r,a){const o=new Wt(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function _(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function g(b){let E=!1;const D=_(b);D===null?d(o,l):D&&D.isColor&&(d(D,1),E=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(b,E){const D=_(E);D&&(D.isCubeTexture||D.mapping===Ks)?(h===void 0&&(h=new tn(new as(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:Fi(Je.backgroundCube.uniforms),vertexShader:Je.backgroundCube.vertexShader,fragmentShader:Je.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),zn.copy(E.backgroundRotation),zn.x*=-1,zn.y*=-1,zn.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),h.material.uniforms.envMap.value=D,h.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Op.makeRotationFromEuler(zn)),h.material.toneMapped=Gt.getTransfer(D.colorSpace)!==Kt,(u!==D||f!==D.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=D,f=D.version,m=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):D&&D.isTexture&&(c===void 0&&(c=new tn(new Zs(2,2),new Dn({name:"BackgroundMaterial",uniforms:Fi(Je.background.uniforms),vertexShader:Je.background.vertexShader,fragmentShader:Je.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=D,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Gt.getTransfer(D.colorSpace)!==Kt,D.matrixAutoUpdate===!0&&D.updateMatrix(),c.material.uniforms.uvTransform.value.copy(D.matrix),(u!==D||f!==D.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,u=D,f=D.version,m=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,E){b.getRGB(ws,hc(n)),i.buffers.color.setClear(ws.r,ws.g,ws.b,E,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),l=E,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:g,addToRenderList:p,dispose:y}}function zp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(x,C,H,O,X){let K=!1;const G=u(O,H,C);r!==G&&(r=G,c(r.object)),K=m(x,O,H,X),K&&_(x,O,H,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,E(x,C,H,O),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,C,H){const O=H.wireframe===!0;let X=i[x.id];X===void 0&&(X={},i[x.id]=X);let K=X[C.id];K===void 0&&(K={},X[C.id]=K);let G=K[O];return G===void 0&&(G=f(l()),K[O]=G),G}function f(x){const C=[],H=[],O=[];for(let X=0;X<e;X++)C[X]=0,H[X]=0,O[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:H,attributeDivisors:O,object:x,attributes:{},index:null}}function m(x,C,H,O){const X=r.attributes,K=C.attributes;let G=0;const tt=H.getAttributes();for(const k in tt)if(tt[k].location>=0){const ut=X[k];let Et=K[k];if(Et===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(Et=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(Et=x.instanceColor)),ut===void 0||ut.attribute!==Et||Et&&ut.data!==Et.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function _(x,C,H,O){const X={},K=C.attributes;let G=0;const tt=H.getAttributes();for(const k in tt)if(tt[k].location>=0){let ut=K[k];ut===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor));const Et={};Et.attribute=ut,ut&&ut.data&&(Et.data=ut.data),X[k]=Et,G++}r.attributes=X,r.attributesNum=G,r.index=O}function g(){const x=r.newAttributes;for(let C=0,H=x.length;C<H;C++)x[C]=0}function p(x){d(x,0)}function d(x,C){const H=r.newAttributes,O=r.enabledAttributes,X=r.attributeDivisors;H[x]=1,O[x]===0&&(n.enableVertexAttribArray(x),O[x]=1),X[x]!==C&&(n.vertexAttribDivisor(x,C),X[x]=C)}function y(){const x=r.newAttributes,C=r.enabledAttributes;for(let H=0,O=C.length;H<O;H++)C[H]!==x[H]&&(n.disableVertexAttribArray(H),C[H]=0)}function b(x,C,H,O,X,K,G){G===!0?n.vertexAttribIPointer(x,C,H,X,K):n.vertexAttribPointer(x,C,H,O,X,K)}function E(x,C,H,O){g();const X=O.attributes,K=H.getAttributes(),G=C.defaultAttributeValues;for(const tt in K){const k=K[tt];if(k.location>=0){let ot=X[tt];if(ot===void 0&&(tt==="instanceMatrix"&&x.instanceMatrix&&(ot=x.instanceMatrix),tt==="instanceColor"&&x.instanceColor&&(ot=x.instanceColor)),ot!==void 0){const ut=ot.normalized,Et=ot.itemSize,Bt=t.get(ot);if(Bt===void 0)continue;const Qt=Bt.buffer,q=Bt.type,et=Bt.bytesPerElement,Mt=q===n.INT||q===n.UNSIGNED_INT||ot.gpuType===za;if(ot.isInterleavedBufferAttribute){const lt=ot.data,St=lt.stride,Xt=ot.offset;if(lt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<k.locationSize;Rt++)d(k.location+Rt,lt.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Rt=0;Rt<k.locationSize;Rt++)p(k.location+Rt);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let Rt=0;Rt<k.locationSize;Rt++)b(k.location+Rt,Et/k.locationSize,q,ut,St*et,(Xt+Et/k.locationSize*Rt)*et,Mt)}else{if(ot.isInstancedBufferAttribute){for(let lt=0;lt<k.locationSize;lt++)d(k.location+lt,ot.meshPerAttribute);x.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let lt=0;lt<k.locationSize;lt++)p(k.location+lt);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let lt=0;lt<k.locationSize;lt++)b(k.location+lt,Et/k.locationSize,q,ut,Et*et,Et/k.locationSize*lt*et,Mt)}}else if(G!==void 0){const ut=G[tt];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(k.location,ut);break;case 3:n.vertexAttrib3fv(k.location,ut);break;case 4:n.vertexAttrib4fv(k.location,ut);break;default:n.vertexAttrib1fv(k.location,ut)}}}}y()}function D(){P();for(const x in i){const C=i[x];for(const H in C){const O=C[H];for(const X in O)h(O[X].object),delete O[X];delete C[H]}delete i[x]}}function w(x){if(i[x.id]===void 0)return;const C=i[x.id];for(const H in C){const O=C[H];for(const X in O)h(O[X].object),delete O[X];delete C[H]}delete i[x.id]}function T(x){for(const C in i){const H=i[C];if(H[x.id]===void 0)continue;const O=H[x.id];for(const X in O)h(O[X].object),delete O[X];delete H[x.id]}}function P(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:p,disableUnusedAttributes:y}}function kp(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_];e.update(m,i,1)}function l(c,h,u,f){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)a(c[_],h[_],f[_]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let _=0;for(let g=0;g<u;g++)_+=h[g]*f[g];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Hp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==Ke&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const P=T===is&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==en&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==pn&&!P)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=_>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:E,vertexTextures:D,maxSamples:w}}function Vp(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new bn,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||s;return s=f,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,m){const _=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,d=n.get(u);if(!s||_===null||_.length===0||r&&!p)r?h(null):c();else{const y=r?0:i,b=y*4;let E=d.clippingState||null;l.value=E,E=h(_,f,b,m);for(let D=0;D!==b;++D)E[D]=e[D];d.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,m,_){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const d=m+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<d)&&(p=new Float32Array(d));for(let b=0,E=m;b!==g;++b,E+=4)a.copy(u[b]).applyMatrix4(y,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,p}}function Gp(n){let t=new WeakMap;function e(a,o){return o===Qr?a.mapping=Ui:o===ta&&(a.mapping=Ii),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Qr||o===ta)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Hu(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const bi=4,Yo=[.125,.215,.35,.446,.526,.582],Wn=20,Pr=new mc,jo=new Wt;let Dr=null,Lr=0,Ur=0,Ir=!1;const Vn=(1+Math.sqrt(5))/2,vi=1/Vn,$o=[new N(-Vn,vi,0),new N(Vn,vi,0),new N(-vi,0,Vn),new N(vi,0,Vn),new N(0,Vn,-vi),new N(0,Vn,vi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Wp=new N;class Ko{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=Wp}=r;Dr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Dr,Lr,Ur),this._renderer.xr.enabled=Ir,t.scissorTest=!1,Rs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ui||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Dr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Ur=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:is,format:Ke,colorSpace:Ni,depthBuffer:!1},s=Zo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zo(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xp(r)),this._blurMaterial=qp(r,t,e)}return s}_compileMaterial(t){const e=new tn(this._lodPlanes[0],t);this._renderer.compile(e,Pr)}_sceneToCubeUV(t,e,i,s,r){const l=new He(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,m=u.toneMapping;u.getClearColor(jo),u.toneMapping=Rn,u.autoClear=!1;const _=new oc({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new tn(new as,_);let p=!1;const d=t.background;d?d.isColor&&(_.color.copy(d),t.background=null,p=!0):(_.color.copy(jo),p=!0);for(let y=0;y<6;y++){const b=y%3;b===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):b===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const E=this._cubeSize;Rs(s,b*E,y>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=m,u.autoClear=f,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ui||t.mapping===Ii;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new tn(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Rs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Pr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$o[(s-r-1)%$o.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new tn(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Wn-1),g=r/_,p=isFinite(r)?1+Math.floor(h*g):Wn;p>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Wn}`);const d=[];let y=0;for(let T=0;T<Wn;++T){const P=T/g,S=Math.exp(-P*P/2);d.push(S),T===0?y+=S:T<p&&(y+=2*S)}for(let T=0;T<d.length;T++)d[T]=d[T]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:b}=this;f.dTheta.value=_,f.mipInt.value=b-i;const E=this._sizeLods[s],D=3*E*(s>b-bi?s-b+bi:0),w=4*(this._cubeSize-E);Rs(e,D,w,3*E,2*E),l.setRenderTarget(e),l.render(u,Pr)}}function Xp(n){const t=[],e=[],i=[];let s=n;const r=n-bi+1+Yo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-bi?l=Yo[a-n+bi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,_=6,g=3,p=2,d=1,y=new Float32Array(g*_*m),b=new Float32Array(p*_*m),E=new Float32Array(d*_*m);for(let w=0;w<m;w++){const T=w%3*2/3-1,P=w>2?0:-1,S=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set(S,g*_*w),b.set(f,p*_*w);const x=[w,w,w,w,w,w];E.set(x,d*_*w)}const D=new Ln;D.setAttribute("position",new Ne(y,g)),D.setAttribute("uv",new Ne(b,p)),D.setAttribute("faceIndex",new Ne(E,d)),t.push(D),s>bi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Zo(n,t,e){const i=new ei(n,t,e);return i.texture.mapping=Ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Rs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function qp(n,t,e){const i=new Float32Array(Wn),s=new N(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ja(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Jo(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Qo(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ja(){return`

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
	`}function Yp(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Qr||l===ta,h=l===Ui||l===Ii;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ko(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Ko(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function jp(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&wi("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function $p(n,t,e,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const m in f)t.update(f[m],n.ARRAY_BUFFER)}function c(u){const f=[],m=u.index,_=u.attributes.position;let g=0;if(m!==null){const y=m.array;g=m.version;for(let b=0,E=y.length;b<E;b+=3){const D=y[b+0],w=y[b+1],T=y[b+2];f.push(D,w,w,T,T,D)}}else if(_!==void 0){const y=_.array;g=_.version;for(let b=0,E=y.length/3-1;b<E;b+=3){const D=b+0,w=b+1,T=b+2;f.push(D,w,w,T,T,D)}}else return;const p=new(nc(f)?cc:lc)(f,1);p.version=g;const d=r.get(u);d&&t.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Kp(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,m){n.drawElements(i,m,r,f*a),e.update(m,i,1)}function c(f,m,_){_!==0&&(n.drawElementsInstanced(i,m,r,f*a,_),e.update(m,i,_))}function h(f,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,f,0,_);let p=0;for(let d=0;d<_;d++)p+=m[d];e.update(p,i,1)}function u(f,m,_,g){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)c(f[d]/a,m[d],g[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,g,0,_);let d=0;for(let y=0;y<_;y++)d+=m[y]*g[y];e.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Zp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Jp(n,t,e){const i=new WeakMap,s=new ce;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let S=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),_===!0&&(b=2),g===!0&&(b=3);let E=o.attributes.position.count*b,D=1;E>t.maxTextureSize&&(D=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const w=new Float32Array(E*D*4*u),T=new ic(w,E,D,u);T.type=pn,T.needsUpdate=!0;const P=b*4;for(let x=0;x<u;x++){const C=p[x],H=d[x],O=y[x],X=E*D*4*x;for(let K=0;K<C.count;K++){const G=K*P;m===!0&&(s.fromBufferAttribute(C,K),w[X+G+0]=s.x,w[X+G+1]=s.y,w[X+G+2]=s.z,w[X+G+3]=0),_===!0&&(s.fromBufferAttribute(H,K),w[X+G+4]=s.x,w[X+G+5]=s.y,w[X+G+6]=s.z,w[X+G+7]=0),g===!0&&(s.fromBufferAttribute(O,K),w[X+G+8]=s.x,w[X+G+9]=s.y,w[X+G+10]=s.z,w[X+G+11]=O.itemSize===4?s.w:1)}}f={count:u,texture:T,size:new Ut(E,D)},i.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Qp(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const gc=new Pe,tl=new fc(1,1),vc=new ic,xc=new bu,Mc=new dc,el=[],nl=[],il=new Float32Array(16),sl=new Float32Array(9),rl=new Float32Array(4);function zi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=el[s];if(r===void 0&&(r=new Float32Array(s),el[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function me(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Js(n,t){let e=nl[t];e===void 0&&(e=new Int32Array(t),nl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function tm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;n.uniform2fv(this.addr,t),me(e,t)}}function nm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(pe(e,t))return;n.uniform3fv(this.addr,t),me(e,t)}}function im(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;n.uniform4fv(this.addr,t),me(e,t)}}function sm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(pe(e,i))return;rl.set(i),n.uniformMatrix2fv(this.addr,!1,rl),me(e,i)}}function rm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(pe(e,i))return;sl.set(i),n.uniformMatrix3fv(this.addr,!1,sl),me(e,i)}}function am(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(pe(e,i))return;il.set(i),n.uniformMatrix4fv(this.addr,!1,il),me(e,i)}}function om(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function lm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;n.uniform2iv(this.addr,t),me(e,t)}}function cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;n.uniform3iv(this.addr,t),me(e,t)}}function hm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;n.uniform4iv(this.addr,t),me(e,t)}}function um(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;n.uniform2uiv(this.addr,t),me(e,t)}}function fm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;n.uniform3uiv(this.addr,t),me(e,t)}}function pm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;n.uniform4uiv(this.addr,t),me(e,t)}}function mm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(tl.compareFunction=ec,r=tl):r=gc,e.setTexture2D(t||r,s)}function _m(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||xc,s)}function gm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Mc,s)}function vm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||vc,s)}function xm(n){switch(n){case 5126:return tm;case 35664:return em;case 35665:return nm;case 35666:return im;case 35674:return sm;case 35675:return rm;case 35676:return am;case 5124:case 35670:return om;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return hm;case 5125:return um;case 36294:return dm;case 36295:return fm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return _m;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return vm}}function Mm(n,t){n.uniform1fv(this.addr,t)}function Sm(n,t){const e=zi(t,this.size,2);n.uniform2fv(this.addr,e)}function Em(n,t){const e=zi(t,this.size,3);n.uniform3fv(this.addr,e)}function ym(n,t){const e=zi(t,this.size,4);n.uniform4fv(this.addr,e)}function bm(n,t){const e=zi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Tm(n,t){const e=zi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Am(n,t){const e=zi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wm(n,t){n.uniform1iv(this.addr,t)}function Rm(n,t){n.uniform2iv(this.addr,t)}function Cm(n,t){n.uniform3iv(this.addr,t)}function Pm(n,t){n.uniform4iv(this.addr,t)}function Dm(n,t){n.uniform1uiv(this.addr,t)}function Lm(n,t){n.uniform2uiv(this.addr,t)}function Um(n,t){n.uniform3uiv(this.addr,t)}function Im(n,t){n.uniform4uiv(this.addr,t)}function Nm(n,t,e){const i=this.cache,s=t.length,r=Js(e,s);pe(i,r)||(n.uniform1iv(this.addr,r),me(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||gc,r[a])}function Fm(n,t,e){const i=this.cache,s=t.length,r=Js(e,s);pe(i,r)||(n.uniform1iv(this.addr,r),me(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||xc,r[a])}function Om(n,t,e){const i=this.cache,s=t.length,r=Js(e,s);pe(i,r)||(n.uniform1iv(this.addr,r),me(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Mc,r[a])}function Bm(n,t,e){const i=this.cache,s=t.length,r=Js(e,s);pe(i,r)||(n.uniform1iv(this.addr,r),me(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||vc,r[a])}function zm(n){switch(n){case 5126:return Mm;case 35664:return Sm;case 35665:return Em;case 35666:return ym;case 35674:return bm;case 35675:return Tm;case 35676:return Am;case 5124:case 35670:return wm;case 35667:case 35671:return Rm;case 35668:case 35672:return Cm;case 35669:case 35673:return Pm;case 5125:return Dm;case 36294:return Lm;case 36295:return Um;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Bm}}class km{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xm(e.type)}}class Hm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zm(e.type)}}class Vm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function al(n,t){n.seq.push(t),n.map[t.id]=t}function Gm(n,t,e){const i=n.name,s=i.length;for(Nr.lastIndex=0;;){const r=Nr.exec(i),a=Nr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){al(e,c===void 0?new km(o,n,t):new Hm(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Vm(o),al(e,u)),e=u}}}class zs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Gm(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function ol(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Wm=37297;let Xm=0;function qm(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const ll=new It;function Ym(n){Gt._getMatrix(ll,Gt.workingColorSpace,n);const t=`mat3( ${ll.elements.map(e=>e.toFixed(4))} )`;switch(Gt.getTransfer(n)){case Ws:return[t,"LinearTransferOETF"];case Kt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function cl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+qm(n.getShaderSource(t),a)}else return s}function jm(n,t){const e=Ym(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $m(n,t){let e;switch(t){case $h:e="Linear";break;case Kh:e="Reinhard";break;case Zh:e="Cineon";break;case Jh:e="ACESFilmic";break;case tu:e="AgX";break;case eu:e="Neutral";break;case Qh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Cs=new N;function Km(){Gt.getLuminanceCoefficients(Cs);const n=Cs.x.toFixed(4),t=Cs.y.toFixed(4),e=Cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ji).join(`
`)}function Jm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Qm(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ji(n){return n!==""}function hl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ul(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const t_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pa(n){return n.replace(t_,n_)}const e_=new Map;function n_(n,t){let e=Ft[t];if(e===void 0){const i=e_.get(t);if(i!==void 0)e=Ft[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Pa(e)}const i_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dl(n){return n.replace(i_,s_)}function s_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function fl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function r_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Gl?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function a_(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ui:case Ii:t="ENVMAP_TYPE_CUBE";break;case Ks:t="ENVMAP_TYPE_CUBE_UV";break}return t}function o_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function l_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wl:t="ENVMAP_BLENDING_MULTIPLY";break;case Yh:t="ENVMAP_BLENDING_MIX";break;case jh:t="ENVMAP_BLENDING_ADD";break}return t}function c_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function h_(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=r_(e),c=a_(e),h=o_(e),u=l_(e),f=c_(e),m=Zm(e),_=Jm(r),g=s.createProgram();let p,d,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ji).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ji).join(`
`),d.length>0&&(d+=`
`)):(p=[fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ji).join(`
`),d=[fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Rn?$m("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,jm("linearToOutputTexel",e.outputColorSpace),Km(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ji).join(`
`)),a=Pa(a),a=hl(a,e),a=ul(a,e),o=Pa(o),o=hl(o,e),o=ul(o,e),a=dl(a),o=dl(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=y+p+a,E=y+d+o,D=ol(s,s.VERTEX_SHADER,b),w=ol(s,s.FRAGMENT_SHADER,E);s.attachShader(g,D),s.attachShader(g,w),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(C){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(g).trim(),O=s.getShaderInfoLog(D).trim(),X=s.getShaderInfoLog(w).trim();let K=!0,G=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,D,w);else{const tt=cl(s,D,"vertex"),k=cl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+tt+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(O===""||X==="")&&(G=!1);G&&(C.diagnostics={runnable:K,programLog:H,vertexShader:{log:O,prefix:p},fragmentShader:{log:X,prefix:d}})}s.deleteShader(D),s.deleteShader(w),P=new zs(s,g),S=Qm(s,g)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(g,Wm)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xm++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=D,this.fragmentShader=w,this}let u_=0;class d_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new f_(t),e.set(t,i)),i}}class f_{constructor(t){this.id=u_++,this.code=t,this.usedTimes=0}}function p_(n,t,e,i,s,r,a){const o=new rc,l=new d_,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,x,C,H,O){const X=H.fog,K=O.geometry,G=S.isMeshStandardMaterial?H.environment:null,tt=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),k=tt&&tt.mapping===Ks?tt.image.height:null,ot=_[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const ut=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Et=ut!==void 0?ut.length:0;let Bt=0;K.morphAttributes.position!==void 0&&(Bt=1),K.morphAttributes.normal!==void 0&&(Bt=2),K.morphAttributes.color!==void 0&&(Bt=3);let Qt,q,et,Mt;if(ot){const jt=Je[ot];Qt=jt.vertexShader,q=jt.fragmentShader}else Qt=S.vertexShader,q=S.fragmentShader,l.update(S),et=l.getVertexShaderID(S),Mt=l.getFragmentShaderID(S);const lt=n.getRenderTarget(),St=n.state.buffers.depth.getReversed(),Xt=O.isInstancedMesh===!0,Rt=O.isBatchedMesh===!0,re=!!S.map,ae=!!S.matcap,qt=!!tt,R=!!S.aoMap,Se=!!S.lightMap,Yt=!!S.bumpMap,ee=!!S.normalMap,gt=!!S.displacementMap,Ht=!!S.emissiveMap,bt=!!S.metalnessMap,Nt=!!S.roughnessMap,de=S.anisotropy>0,A=S.clearcoat>0,v=S.dispersion>0,F=S.iridescence>0,W=S.sheen>0,j=S.transmission>0,V=de&&!!S.anisotropyMap,vt=A&&!!S.clearcoatMap,st=A&&!!S.clearcoatNormalMap,_t=A&&!!S.clearcoatRoughnessMap,xt=F&&!!S.iridescenceMap,$=F&&!!S.iridescenceThicknessMap,ct=W&&!!S.sheenColorMap,wt=W&&!!S.sheenRoughnessMap,At=!!S.specularMap,nt=!!S.specularColorMap,Dt=!!S.specularIntensityMap,L=j&&!!S.transmissionMap,rt=j&&!!S.thicknessMap,Z=!!S.gradientMap,dt=!!S.alphaMap,J=S.alphaTest>0,Y=!!S.alphaHash,pt=!!S.extensions;let Lt=Rn;S.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Lt=n.toneMapping);const ne={shaderID:ot,shaderType:S.type,shaderName:S.name,vertexShader:Qt,fragmentShader:q,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:Mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Rt,batchingColor:Rt&&O._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&O.instanceColor!==null,instancingMorph:Xt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:lt===null?n.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Ni,alphaToCoverage:!!S.alphaToCoverage,map:re,matcap:ae,envMap:qt,envMapMode:qt&&tt.mapping,envMapCubeUVHeight:k,aoMap:R,lightMap:Se,bumpMap:Yt,normalMap:ee,displacementMap:f&&gt,emissiveMap:Ht,normalMapObjectSpace:ee&&S.normalMapType===ru,normalMapTangentSpace:ee&&S.normalMapType===tc,metalnessMap:bt,roughnessMap:Nt,anisotropy:de,anisotropyMap:V,clearcoat:A,clearcoatMap:vt,clearcoatNormalMap:st,clearcoatRoughnessMap:_t,dispersion:v,iridescence:F,iridescenceMap:xt,iridescenceThicknessMap:$,sheen:W,sheenColorMap:ct,sheenRoughnessMap:wt,specularMap:At,specularColorMap:nt,specularIntensityMap:Dt,transmission:j,transmissionMap:L,thicknessMap:rt,gradientMap:Z,opaque:S.transparent===!1&&S.blending===Ai&&S.alphaToCoverage===!1,alphaMap:dt,alphaTest:J,alphaHash:Y,combine:S.combine,mapUv:re&&g(S.map.channel),aoMapUv:R&&g(S.aoMap.channel),lightMapUv:Se&&g(S.lightMap.channel),bumpMapUv:Yt&&g(S.bumpMap.channel),normalMapUv:ee&&g(S.normalMap.channel),displacementMapUv:gt&&g(S.displacementMap.channel),emissiveMapUv:Ht&&g(S.emissiveMap.channel),metalnessMapUv:bt&&g(S.metalnessMap.channel),roughnessMapUv:Nt&&g(S.roughnessMap.channel),anisotropyMapUv:V&&g(S.anisotropyMap.channel),clearcoatMapUv:vt&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:st&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:$&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:wt&&g(S.sheenRoughnessMap.channel),specularMapUv:At&&g(S.specularMap.channel),specularColorMapUv:nt&&g(S.specularColorMap.channel),specularIntensityMapUv:Dt&&g(S.specularIntensityMap.channel),transmissionMapUv:L&&g(S.transmissionMap.channel),thicknessMapUv:rt&&g(S.thicknessMap.channel),alphaMapUv:dt&&g(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ee||de),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!K.attributes.uv&&(re||dt),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:O.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Bt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Lt,decodeVideoTexture:re&&S.map.isVideoTexture===!0&&Gt.getTransfer(S.map.colorSpace)===Kt,decodeVideoTextureEmissive:Ht&&S.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(S.emissiveMap.colorSpace)===Kt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===dn,flipSided:S.side===Ce,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:pt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&S.extensions.multiDraw===!0||Rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function d(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)x.push(C),x.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(y(x,S),b(x,S),x.push(n.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function y(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function b(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function E(S){const x=_[S.type];let C;if(x){const H=Je[x];C=Ou.clone(H.uniforms)}else C=S.uniforms;return C}function D(S,x){let C;for(let H=0,O=h.length;H<O;H++){const X=h[H];if(X.cacheKey===x){C=X,++C.usedTimes;break}}return C===void 0&&(C=new h_(n,x,S,r),h.push(C)),C}function w(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function T(S){l.remove(S)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:E,acquireProgram:D,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:P}}function m_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function __(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function pl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ml(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,m,_,g,p){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:_,renderOrder:u.renderOrder,z:g,group:p},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=_,d.renderOrder=u.renderOrder,d.z=g,d.group=p),t++,d}function o(u,f,m,_,g,p){const d=a(u,f,m,_,g,p);m.transmission>0?i.push(d):m.transparent===!0?s.push(d):e.push(d)}function l(u,f,m,_,g,p){const d=a(u,f,m,_,g,p);m.transmission>0?i.unshift(d):m.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||__),i.length>1&&i.sort(f||pl),s.length>1&&s.sort(f||pl)}function h(){for(let u=t,f=n.length;u<f;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function g_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new ml,n.set(i,[a])):s>=r.length?(a=new ml,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function v_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Wt};break;case"SpotLight":e={position:new N,direction:new N,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function x_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let M_=0;function S_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function E_(n){const t=new v_,e=x_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const s=new N,r=new he,a=new he;function o(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,_=0,g=0,p=0,d=0,y=0,b=0,E=0,D=0,w=0,T=0;c.sort(S_);for(let S=0,x=c.length;S<x;S++){const C=c[S],H=C.color,O=C.intensity,X=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=H.r*O,u+=H.g*O,f+=H.b*O;else if(C.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(C.sh.coefficients[G],O);T++}else if(C.isDirectionalLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const tt=C.shadow,k=e.get(C);k.shadowIntensity=tt.intensity,k.shadowBias=tt.bias,k.shadowNormalBias=tt.normalBias,k.shadowRadius=tt.radius,k.shadowMapSize=tt.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=K,i.directionalShadowMatrix[m]=C.shadow.matrix,y++}i.directional[m]=G,m++}else if(C.isSpotLight){const G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(H).multiplyScalar(O),G.distance=X,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,i.spot[g]=G;const tt=C.shadow;if(C.map&&(i.spotLightMap[D]=C.map,D++,tt.updateMatrices(C),C.castShadow&&w++),i.spotLightMatrix[g]=tt.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=tt.intensity,k.shadowBias=tt.bias,k.shadowNormalBias=tt.normalBias,k.shadowRadius=tt.radius,k.shadowMapSize=tt.mapSize,i.spotShadow[g]=k,i.spotShadowMap[g]=K,E++}g++}else if(C.isRectAreaLight){const G=t.get(C);G.color.copy(H).multiplyScalar(O),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=G,p++}else if(C.isPointLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const tt=C.shadow,k=e.get(C);k.shadowIntensity=tt.intensity,k.shadowBias=tt.bias,k.shadowNormalBias=tt.normalBias,k.shadowRadius=tt.radius,k.shadowMapSize=tt.mapSize,k.shadowCameraNear=tt.camera.near,k.shadowCameraFar=tt.camera.far,i.pointShadow[_]=k,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=C.shadow.matrix,b++}i.point[_]=G,_++}else if(C.isHemisphereLight){const G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(O),G.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[d]=G,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=it.LTC_FLOAT_1,i.rectAreaLTC2=it.LTC_FLOAT_2):(i.rectAreaLTC1=it.LTC_HALF_1,i.rectAreaLTC2=it.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==m||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==p||P.hemiLength!==d||P.numDirectionalShadows!==y||P.numPointShadows!==b||P.numSpotShadows!==E||P.numSpotMaps!==D||P.numLightProbes!==T)&&(i.directional.length=m,i.spot.length=g,i.rectArea.length=p,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=E+D-w,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=T,P.directionalLength=m,P.pointLength=_,P.spotLength=g,P.rectAreaLength=p,P.hemiLength=d,P.numDirectionalShadows=y,P.numPointShadows=b,P.numSpotShadows=E,P.numSpotMaps=D,P.numLightProbes=T,i.version=M_++)}function l(c,h){let u=0,f=0,m=0,_=0,g=0;const p=h.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const b=c[d];if(b.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),u++}else if(b.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),m++}else if(b.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:i}}function _l(n){const t=new E_(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function y_(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new _l(n),t.set(s,[o])):r>=a.length?(o=new _l(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const b_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
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
}`;function A_(n,t,e){let i=new Ya;const s=new Ut,r=new Ut,a=new ce,o=new ju({depthPacking:su}),l=new $u,c={},h=e.maxTextureSize,u={[Pn]:Ce,[Ce]:Pn,[dn]:dn},f=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:b_,fragmentShader:T_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const _=new Ln;_.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new tn(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gl;let d=this.type;this.render=function(w,T,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=n.getRenderTarget(),x=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),H=n.state;H.setBlending(wn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const O=d!==un&&this.type===un,X=d===un&&this.type!==un;for(let K=0,G=w.length;K<G;K++){const tt=w[K],k=tt.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const ot=k.getFrameExtents();if(s.multiply(ot),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ot.x),s.x=r.x*ot.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ot.y),s.y=r.y*ot.y,k.mapSize.y=r.y)),k.map===null||O===!0||X===!0){const Et=this.type!==un?{minFilter:Ze,magFilter:Ze}:{};k.map!==null&&k.map.dispose(),k.map=new ei(s.x,s.y,Et),k.map.texture.name=tt.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const ut=k.getViewportCount();for(let Et=0;Et<ut;Et++){const Bt=k.getViewport(Et);a.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),H.viewport(a),k.updateMatrices(tt,Et),i=k.getFrustum(),E(T,P,k.camera,tt,this.type)}k.isPointLightShadow!==!0&&this.type===un&&y(k,P),k.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(S,x,C)};function y(w,T){const P=t.update(g);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ei(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,P,f,g,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,P,m,g,null)}function b(w,T,P,S){let x=null;const C=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)x=C;else if(x=P.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const H=x.uuid,O=T.uuid;let X=c[H];X===void 0&&(X={},c[H]=X);let K=X[O];K===void 0&&(K=x.clone(),X[O]=K,T.addEventListener("dispose",D)),x=K}if(x.visible=T.visible,x.wireframe=T.wireframe,S===un?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:u[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const H=n.properties.get(x);H.light=P}return x}function E(w,T,P,S,x){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===un)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const O=t.update(w),X=w.material;if(Array.isArray(X)){const K=O.groups;for(let G=0,tt=K.length;G<tt;G++){const k=K[G],ot=X[k.materialIndex];if(ot&&ot.visible){const ut=b(w,ot,S,x);w.onBeforeShadow(n,w,T,P,O,ut,k),n.renderBufferDirect(P,null,O,ut,w,k),w.onAfterShadow(n,w,T,P,O,ut,k)}}}else if(X.visible){const K=b(w,X,S,x);w.onBeforeShadow(n,w,T,P,O,K,null),n.renderBufferDirect(P,null,O,K,w,null),w.onAfterShadow(n,w,T,P,O,K,null)}}const H=w.children;for(let O=0,X=H.length;O<X;O++)E(H[O],T,P,S,x)}function D(w){w.target.removeEventListener("dispose",D);for(const P in c){const S=c[P],x=w.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const w_={[qr]:Yr,[jr]:Zr,[$r]:Jr,[Li]:Kr,[Yr]:qr,[Zr]:jr,[Jr]:$r,[Kr]:Li};function R_(n,t){function e(){let L=!1;const rt=new ce;let Z=null;const dt=new ce(0,0,0,0);return{setMask:function(J){Z!==J&&!L&&(n.colorMask(J,J,J,J),Z=J)},setLocked:function(J){L=J},setClear:function(J,Y,pt,Lt,ne){ne===!0&&(J*=Lt,Y*=Lt,pt*=Lt),rt.set(J,Y,pt,Lt),dt.equals(rt)===!1&&(n.clearColor(J,Y,pt,Lt),dt.copy(rt))},reset:function(){L=!1,Z=null,dt.set(-1,0,0,0)}}}function i(){let L=!1,rt=!1,Z=null,dt=null,J=null;return{setReversed:function(Y){if(rt!==Y){const pt=t.get("EXT_clip_control");Y?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT),rt=Y;const Lt=J;J=null,this.setClear(Lt)}},getReversed:function(){return rt},setTest:function(Y){Y?lt(n.DEPTH_TEST):St(n.DEPTH_TEST)},setMask:function(Y){Z!==Y&&!L&&(n.depthMask(Y),Z=Y)},setFunc:function(Y){if(rt&&(Y=w_[Y]),dt!==Y){switch(Y){case qr:n.depthFunc(n.NEVER);break;case Yr:n.depthFunc(n.ALWAYS);break;case jr:n.depthFunc(n.LESS);break;case Li:n.depthFunc(n.LEQUAL);break;case $r:n.depthFunc(n.EQUAL);break;case Kr:n.depthFunc(n.GEQUAL);break;case Zr:n.depthFunc(n.GREATER);break;case Jr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=Y}},setLocked:function(Y){L=Y},setClear:function(Y){J!==Y&&(rt&&(Y=1-Y),n.clearDepth(Y),J=Y)},reset:function(){L=!1,Z=null,dt=null,J=null,rt=!1}}}function s(){let L=!1,rt=null,Z=null,dt=null,J=null,Y=null,pt=null,Lt=null,ne=null;return{setTest:function(jt){L||(jt?lt(n.STENCIL_TEST):St(n.STENCIL_TEST))},setMask:function(jt){rt!==jt&&!L&&(n.stencilMask(jt),rt=jt)},setFunc:function(jt,Ge,rn){(Z!==jt||dt!==Ge||J!==rn)&&(n.stencilFunc(jt,Ge,rn),Z=jt,dt=Ge,J=rn)},setOp:function(jt,Ge,rn){(Y!==jt||pt!==Ge||Lt!==rn)&&(n.stencilOp(jt,Ge,rn),Y=jt,pt=Ge,Lt=rn)},setLocked:function(jt){L=jt},setClear:function(jt){ne!==jt&&(n.clearStencil(jt),ne=jt)},reset:function(){L=!1,rt=null,Z=null,dt=null,J=null,Y=null,pt=null,Lt=null,ne=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,m=[],_=null,g=!1,p=null,d=null,y=null,b=null,E=null,D=null,w=null,T=new Wt(0,0,0),P=0,S=!1,x=null,C=null,H=null,O=null,X=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,tt=0;const k=n.getParameter(n.VERSION);k.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(k)[1]),G=tt>=1):k.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),G=tt>=2);let ot=null,ut={};const Et=n.getParameter(n.SCISSOR_BOX),Bt=n.getParameter(n.VIEWPORT),Qt=new ce().fromArray(Et),q=new ce().fromArray(Bt);function et(L,rt,Z,dt){const J=new Uint8Array(4),Y=n.createTexture();n.bindTexture(L,Y),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let pt=0;pt<Z;pt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,J):n.texImage2D(rt+pt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,J);return Y}const Mt={};Mt[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),Mt[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Mt[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(n.DEPTH_TEST),a.setFunc(Li),Yt(!1),ee(vo),lt(n.CULL_FACE),R(wn);function lt(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function St(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function Xt(L,rt){return u[L]!==rt?(n.bindFramebuffer(L,rt),u[L]=rt,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=rt),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function Rt(L,rt){let Z=m,dt=!1;if(L){Z=f.get(rt),Z===void 0&&(Z=[],f.set(rt,Z));const J=L.textures;if(Z.length!==J.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,pt=J.length;Y<pt;Y++)Z[Y]=n.COLOR_ATTACHMENT0+Y;Z.length=J.length,dt=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,dt=!0);dt&&n.drawBuffers(Z)}function re(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const ae={[Gn]:n.FUNC_ADD,[Ph]:n.FUNC_SUBTRACT,[Dh]:n.FUNC_REVERSE_SUBTRACT};ae[Lh]=n.MIN,ae[Uh]=n.MAX;const qt={[Ih]:n.ZERO,[Nh]:n.ONE,[Fh]:n.SRC_COLOR,[Wr]:n.SRC_ALPHA,[Vh]:n.SRC_ALPHA_SATURATE,[kh]:n.DST_COLOR,[Bh]:n.DST_ALPHA,[Oh]:n.ONE_MINUS_SRC_COLOR,[Xr]:n.ONE_MINUS_SRC_ALPHA,[Hh]:n.ONE_MINUS_DST_COLOR,[zh]:n.ONE_MINUS_DST_ALPHA,[Gh]:n.CONSTANT_COLOR,[Wh]:n.ONE_MINUS_CONSTANT_COLOR,[Xh]:n.CONSTANT_ALPHA,[qh]:n.ONE_MINUS_CONSTANT_ALPHA};function R(L,rt,Z,dt,J,Y,pt,Lt,ne,jt){if(L===wn){g===!0&&(St(n.BLEND),g=!1);return}if(g===!1&&(lt(n.BLEND),g=!0),L!==Ch){if(L!==p||jt!==S){if((d!==Gn||E!==Gn)&&(n.blendEquation(n.FUNC_ADD),d=Gn,E=Gn),jt)switch(L){case Ai:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xo:n.blendFunc(n.ONE,n.ONE);break;case Mo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case So:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Mo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case So:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}y=null,b=null,D=null,w=null,T.set(0,0,0),P=0,p=L,S=jt}return}J=J||rt,Y=Y||Z,pt=pt||dt,(rt!==d||J!==E)&&(n.blendEquationSeparate(ae[rt],ae[J]),d=rt,E=J),(Z!==y||dt!==b||Y!==D||pt!==w)&&(n.blendFuncSeparate(qt[Z],qt[dt],qt[Y],qt[pt]),y=Z,b=dt,D=Y,w=pt),(Lt.equals(T)===!1||ne!==P)&&(n.blendColor(Lt.r,Lt.g,Lt.b,ne),T.copy(Lt),P=ne),p=L,S=!1}function Se(L,rt){L.side===dn?St(n.CULL_FACE):lt(n.CULL_FACE);let Z=L.side===Ce;rt&&(Z=!Z),Yt(Z),L.blending===Ai&&L.transparent===!1?R(wn):R(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const dt=L.stencilWrite;o.setTest(dt),dt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ht(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?lt(n.SAMPLE_ALPHA_TO_COVERAGE):St(n.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(L){x!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),x=L)}function ee(L){L!==Ah?(lt(n.CULL_FACE),L!==C&&(L===vo?n.cullFace(n.BACK):L===wh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):St(n.CULL_FACE),C=L}function gt(L){L!==H&&(G&&n.lineWidth(L),H=L)}function Ht(L,rt,Z){L?(lt(n.POLYGON_OFFSET_FILL),(O!==rt||X!==Z)&&(n.polygonOffset(rt,Z),O=rt,X=Z)):St(n.POLYGON_OFFSET_FILL)}function bt(L){L?lt(n.SCISSOR_TEST):St(n.SCISSOR_TEST)}function Nt(L){L===void 0&&(L=n.TEXTURE0+K-1),ot!==L&&(n.activeTexture(L),ot=L)}function de(L,rt,Z){Z===void 0&&(ot===null?Z=n.TEXTURE0+K-1:Z=ot);let dt=ut[Z];dt===void 0&&(dt={type:void 0,texture:void 0},ut[Z]=dt),(dt.type!==L||dt.texture!==rt)&&(ot!==Z&&(n.activeTexture(Z),ot=Z),n.bindTexture(L,rt||Mt[L]),dt.type=L,dt.texture=rt)}function A(){const L=ut[ot];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function W(){try{n.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{n.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function vt(){try{n.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function st(){try{n.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _t(){try{n.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{n.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{n.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ct(L){Qt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Qt.copy(L))}function wt(L){q.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function At(L,rt){let Z=c.get(rt);Z===void 0&&(Z=new WeakMap,c.set(rt,Z));let dt=Z.get(L);dt===void 0&&(dt=n.getUniformBlockIndex(rt,L.name),Z.set(L,dt))}function nt(L,rt){const dt=c.get(rt).get(L);l.get(rt)!==dt&&(n.uniformBlockBinding(rt,dt,L.__bindingPointIndex),l.set(rt,dt))}function Dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ot=null,ut={},u={},f=new WeakMap,m=[],_=null,g=!1,p=null,d=null,y=null,b=null,E=null,D=null,w=null,T=new Wt(0,0,0),P=0,S=!1,x=null,C=null,H=null,O=null,X=null,Qt.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:lt,disable:St,bindFramebuffer:Xt,drawBuffers:Rt,useProgram:re,setBlending:R,setMaterial:Se,setFlipSided:Yt,setCullFace:ee,setLineWidth:gt,setPolygonOffset:Ht,setScissorTest:bt,activeTexture:Nt,bindTexture:de,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:xt,texImage3D:$,updateUBOMapping:At,uniformBlockBinding:nt,texStorage2D:st,texStorage3D:_t,texSubImage2D:W,texSubImage3D:j,compressedTexSubImage2D:V,compressedTexSubImage3D:vt,scissor:ct,viewport:wt,reset:Dt}}function C_(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ut,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,v){return m?new OffscreenCanvas(A,v):qs("canvas")}function g(A,v,F){let W=1;const j=de(A);if((j.width>F||j.height>F)&&(W=F/Math.max(j.width,j.height)),W<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const V=Math.floor(W*j.width),vt=Math.floor(W*j.height);u===void 0&&(u=_(V,vt));const st=v?_(V,vt):u;return st.width=V,st.height=vt,st.getContext("2d").drawImage(A,0,0,V,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+vt+")."),st}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function p(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(A,v,F,W,j=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let V=v;if(v===n.RED&&(F===n.FLOAT&&(V=n.R32F),F===n.HALF_FLOAT&&(V=n.R16F),F===n.UNSIGNED_BYTE&&(V=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.R8UI),F===n.UNSIGNED_SHORT&&(V=n.R16UI),F===n.UNSIGNED_INT&&(V=n.R32UI),F===n.BYTE&&(V=n.R8I),F===n.SHORT&&(V=n.R16I),F===n.INT&&(V=n.R32I)),v===n.RG&&(F===n.FLOAT&&(V=n.RG32F),F===n.HALF_FLOAT&&(V=n.RG16F),F===n.UNSIGNED_BYTE&&(V=n.RG8)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RG8UI),F===n.UNSIGNED_SHORT&&(V=n.RG16UI),F===n.UNSIGNED_INT&&(V=n.RG32UI),F===n.BYTE&&(V=n.RG8I),F===n.SHORT&&(V=n.RG16I),F===n.INT&&(V=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RGB8UI),F===n.UNSIGNED_SHORT&&(V=n.RGB16UI),F===n.UNSIGNED_INT&&(V=n.RGB32UI),F===n.BYTE&&(V=n.RGB8I),F===n.SHORT&&(V=n.RGB16I),F===n.INT&&(V=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),F===n.UNSIGNED_INT&&(V=n.RGBA32UI),F===n.BYTE&&(V=n.RGBA8I),F===n.SHORT&&(V=n.RGBA16I),F===n.INT&&(V=n.RGBA32I)),v===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),v===n.RGBA){const vt=j?Ws:Gt.getTransfer(W);F===n.FLOAT&&(V=n.RGBA32F),F===n.HALF_FLOAT&&(V=n.RGBA16F),F===n.UNSIGNED_BYTE&&(V=vt===Kt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function E(A,v){let F;return A?v===null||v===Qn||v===Qi?F=n.DEPTH24_STENCIL8:v===pn?F=n.DEPTH32F_STENCIL8:v===Ji&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Qn||v===Qi?F=n.DEPTH_COMPONENT24:v===pn?F=n.DEPTH_COMPONENT32F:v===Ji&&(F=n.DEPTH_COMPONENT16),F}function D(A,v){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ze&&A.minFilter!==Qe?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function w(A){const v=A.target;v.removeEventListener("dispose",w),P(v),v.isVideoTexture&&h.delete(v)}function T(A){const v=A.target;v.removeEventListener("dispose",T),x(v)}function P(A){const v=i.get(A);if(v.__webglInit===void 0)return;const F=A.source,W=f.get(F);if(W){const j=W[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(A),Object.keys(W).length===0&&f.delete(F)}i.remove(A)}function S(A){const v=i.get(A);n.deleteTexture(v.__webglTexture);const F=A.source,W=f.get(F);delete W[v.__cacheKey],a.memory.textures--}function x(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let j=0;j<v.__webglFramebuffer[W].length;j++)n.deleteFramebuffer(v.__webglFramebuffer[W][j]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=A.textures;for(let W=0,j=F.length;W<j;W++){const V=i.get(F[W]);V.__webglTexture&&(n.deleteTexture(V.__webglTexture),a.memory.textures--),i.remove(F[W])}i.remove(A)}let C=0;function H(){C=0}function O(){const A=C;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),C+=1,A}function X(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function K(A,v){const F=i.get(A);if(A.isVideoTexture&&bt(A),A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){const W=A.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(F,A,v);return}}e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function G(A,v){const F=i.get(A);if(A.version>0&&F.__version!==A.version){Mt(F,A,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function tt(A,v){const F=i.get(A);if(A.version>0&&F.__version!==A.version){Mt(F,A,v);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function k(A,v){const F=i.get(A);if(A.version>0&&F.__version!==A.version){lt(F,A,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const ot={[ea]:n.REPEAT,[Xn]:n.CLAMP_TO_EDGE,[na]:n.MIRRORED_REPEAT},ut={[Ze]:n.NEAREST,[nu]:n.NEAREST_MIPMAP_NEAREST,[cs]:n.NEAREST_MIPMAP_LINEAR,[Qe]:n.LINEAR,[rr]:n.LINEAR_MIPMAP_NEAREST,[qn]:n.LINEAR_MIPMAP_LINEAR},Et={[au]:n.NEVER,[du]:n.ALWAYS,[ou]:n.LESS,[ec]:n.LEQUAL,[lu]:n.EQUAL,[uu]:n.GEQUAL,[cu]:n.GREATER,[hu]:n.NOTEQUAL};function Bt(A,v){if(v.type===pn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Qe||v.magFilter===rr||v.magFilter===cs||v.magFilter===qn||v.minFilter===Qe||v.minFilter===rr||v.minFilter===cs||v.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ot[v.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ot[v.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ot[v.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ut[v.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ut[v.minFilter]),v.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Et[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ze||v.minFilter!==cs&&v.minFilter!==qn||v.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Qt(A,v){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",w));const W=v.source;let j=f.get(W);j===void 0&&(j={},f.set(W,j));const V=X(v);if(V!==A.__cacheKey){j[V]===void 0&&(j[V]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),j[V].usedTimes++;const vt=j[A.__cacheKey];vt!==void 0&&(j[A.__cacheKey].usedTimes--,vt.usedTimes===0&&S(v)),A.__cacheKey=V,A.__webglTexture=j[V].texture}return F}function q(A,v,F){return Math.floor(Math.floor(A/F)/v)}function et(A,v,F,W){const V=A.updateRanges;if(V.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,F,W,v.data);else{V.sort(($,ct)=>$.start-ct.start);let vt=0;for(let $=1;$<V.length;$++){const ct=V[vt],wt=V[$],At=ct.start+ct.count,nt=q(wt.start,v.width,4),Dt=q(ct.start,v.width,4);wt.start<=At+1&&nt===Dt&&q(wt.start+wt.count-1,v.width,4)===nt?ct.count=Math.max(ct.count,wt.start+wt.count-ct.start):(++vt,V[vt]=wt)}V.length=vt+1;const st=n.getParameter(n.UNPACK_ROW_LENGTH),_t=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let $=0,ct=V.length;$<ct;$++){const wt=V[$],At=Math.floor(wt.start/4),nt=Math.ceil(wt.count/4),Dt=At%v.width,L=Math.floor(At/v.width),rt=nt,Z=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Dt),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),e.texSubImage2D(n.TEXTURE_2D,0,Dt,L,rt,Z,F,W,v.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,st),n.pixelStorei(n.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function Mt(A,v,F){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const j=Qt(A,v),V=v.source;e.bindTexture(W,A.__webglTexture,n.TEXTURE0+F);const vt=i.get(V);if(V.version!==vt.__version||j===!0){e.activeTexture(n.TEXTURE0+F);const st=Gt.getPrimaries(Gt.workingColorSpace),_t=v.colorSpace===Tn?null:Gt.getPrimaries(v.colorSpace),xt=v.colorSpace===Tn||st===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let $=g(v.image,!1,s.maxTextureSize);$=Nt(v,$);const ct=r.convert(v.format,v.colorSpace),wt=r.convert(v.type);let At=b(v.internalFormat,ct,wt,v.colorSpace,v.isVideoTexture);Bt(W,v);let nt;const Dt=v.mipmaps,L=v.isVideoTexture!==!0,rt=vt.__version===void 0||j===!0,Z=V.dataReady,dt=D(v,$);if(v.isDepthTexture)At=E(v.format===es,v.type),rt&&(L?e.texStorage2D(n.TEXTURE_2D,1,At,$.width,$.height):e.texImage2D(n.TEXTURE_2D,0,At,$.width,$.height,0,ct,wt,null));else if(v.isDataTexture)if(Dt.length>0){L&&rt&&e.texStorage2D(n.TEXTURE_2D,dt,At,Dt[0].width,Dt[0].height);for(let J=0,Y=Dt.length;J<Y;J++)nt=Dt[J],L?Z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,nt.width,nt.height,ct,wt,nt.data):e.texImage2D(n.TEXTURE_2D,J,At,nt.width,nt.height,0,ct,wt,nt.data);v.generateMipmaps=!1}else L?(rt&&e.texStorage2D(n.TEXTURE_2D,dt,At,$.width,$.height),Z&&et(v,$,ct,wt)):e.texImage2D(n.TEXTURE_2D,0,At,$.width,$.height,0,ct,wt,$.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){L&&rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,At,Dt[0].width,Dt[0].height,$.depth);for(let J=0,Y=Dt.length;J<Y;J++)if(nt=Dt[J],v.format!==Ke)if(ct!==null)if(L){if(Z)if(v.layerUpdates.size>0){const pt=qo(nt.width,nt.height,v.format,v.type);for(const Lt of v.layerUpdates){const ne=nt.data.subarray(Lt*pt/nt.data.BYTES_PER_ELEMENT,(Lt+1)*pt/nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Lt,nt.width,nt.height,1,ct,ne)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,nt.width,nt.height,$.depth,ct,nt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,At,nt.width,nt.height,$.depth,0,nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?Z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,nt.width,nt.height,$.depth,ct,wt,nt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,At,nt.width,nt.height,$.depth,0,ct,wt,nt.data)}else{L&&rt&&e.texStorage2D(n.TEXTURE_2D,dt,At,Dt[0].width,Dt[0].height);for(let J=0,Y=Dt.length;J<Y;J++)nt=Dt[J],v.format!==Ke?ct!==null?L?Z&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,nt.width,nt.height,ct,nt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,At,nt.width,nt.height,0,nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?Z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,nt.width,nt.height,ct,wt,nt.data):e.texImage2D(n.TEXTURE_2D,J,At,nt.width,nt.height,0,ct,wt,nt.data)}else if(v.isDataArrayTexture)if(L){if(rt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,At,$.width,$.height,$.depth),Z)if(v.layerUpdates.size>0){const J=qo($.width,$.height,v.format,v.type);for(const Y of v.layerUpdates){const pt=$.data.subarray(Y*J/$.data.BYTES_PER_ELEMENT,(Y+1)*J/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,$.width,$.height,1,ct,wt,pt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ct,wt,$.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,At,$.width,$.height,$.depth,0,ct,wt,$.data);else if(v.isData3DTexture)L?(rt&&e.texStorage3D(n.TEXTURE_3D,dt,At,$.width,$.height,$.depth),Z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ct,wt,$.data)):e.texImage3D(n.TEXTURE_3D,0,At,$.width,$.height,$.depth,0,ct,wt,$.data);else if(v.isFramebufferTexture){if(rt)if(L)e.texStorage2D(n.TEXTURE_2D,dt,At,$.width,$.height);else{let J=$.width,Y=$.height;for(let pt=0;pt<dt;pt++)e.texImage2D(n.TEXTURE_2D,pt,At,J,Y,0,ct,wt,null),J>>=1,Y>>=1}}else if(Dt.length>0){if(L&&rt){const J=de(Dt[0]);e.texStorage2D(n.TEXTURE_2D,dt,At,J.width,J.height)}for(let J=0,Y=Dt.length;J<Y;J++)nt=Dt[J],L?Z&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,ct,wt,nt):e.texImage2D(n.TEXTURE_2D,J,At,ct,wt,nt);v.generateMipmaps=!1}else if(L){if(rt){const J=de($);e.texStorage2D(n.TEXTURE_2D,dt,At,J.width,J.height)}Z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,wt,$)}else e.texImage2D(n.TEXTURE_2D,0,At,ct,wt,$);p(v)&&d(W),vt.__version=V.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function lt(A,v,F){if(v.image.length!==6)return;const W=Qt(A,v),j=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+F);const V=i.get(j);if(j.version!==V.__version||W===!0){e.activeTexture(n.TEXTURE0+F);const vt=Gt.getPrimaries(Gt.workingColorSpace),st=v.colorSpace===Tn?null:Gt.getPrimaries(v.colorSpace),_t=v.colorSpace===Tn||vt===st?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const xt=v.isCompressedTexture||v.image[0].isCompressedTexture,$=v.image[0]&&v.image[0].isDataTexture,ct=[];for(let Y=0;Y<6;Y++)!xt&&!$?ct[Y]=g(v.image[Y],!0,s.maxCubemapSize):ct[Y]=$?v.image[Y].image:v.image[Y],ct[Y]=Nt(v,ct[Y]);const wt=ct[0],At=r.convert(v.format,v.colorSpace),nt=r.convert(v.type),Dt=b(v.internalFormat,At,nt,v.colorSpace),L=v.isVideoTexture!==!0,rt=V.__version===void 0||W===!0,Z=j.dataReady;let dt=D(v,wt);Bt(n.TEXTURE_CUBE_MAP,v);let J;if(xt){L&&rt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Dt,wt.width,wt.height);for(let Y=0;Y<6;Y++){J=ct[Y].mipmaps;for(let pt=0;pt<J.length;pt++){const Lt=J[pt];v.format!==Ke?At!==null?L?Z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt,0,0,Lt.width,Lt.height,At,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt,Dt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt,0,0,Lt.width,Lt.height,At,nt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt,Dt,Lt.width,Lt.height,0,At,nt,Lt.data)}}}else{if(J=v.mipmaps,L&&rt){J.length>0&&dt++;const Y=de(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Dt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if($){L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ct[Y].width,ct[Y].height,At,nt,ct[Y].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Dt,ct[Y].width,ct[Y].height,0,At,nt,ct[Y].data);for(let pt=0;pt<J.length;pt++){const ne=J[pt].image[Y].image;L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt+1,0,0,ne.width,ne.height,At,nt,ne.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt+1,Dt,ne.width,ne.height,0,At,nt,ne.data)}}else{L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,At,nt,ct[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Dt,At,nt,ct[Y]);for(let pt=0;pt<J.length;pt++){const Lt=J[pt];L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt+1,0,0,At,nt,Lt.image[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,pt+1,Dt,At,nt,Lt.image[Y])}}}p(v)&&d(n.TEXTURE_CUBE_MAP),V.__version=j.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function St(A,v,F,W,j,V){const vt=r.convert(F.format,F.colorSpace),st=r.convert(F.type),_t=b(F.internalFormat,vt,st,F.colorSpace),xt=i.get(v),$=i.get(F);if($.__renderTarget=v,!xt.__hasExternalTextures){const ct=Math.max(1,v.width>>V),wt=Math.max(1,v.height>>V);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?e.texImage3D(j,V,_t,ct,wt,v.depth,0,vt,st,null):e.texImage2D(j,V,_t,ct,wt,0,vt,st,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),Ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,j,$.__webglTexture,0,gt(v)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,j,$.__webglTexture,V),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(A,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,A),v.depthBuffer){const W=v.depthTexture,j=W&&W.isDepthTexture?W.type:null,V=E(v.stencilBuffer,j),vt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=gt(v);Ht(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st,V,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,st,V,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,V,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,A)}else{const W=v.textures;for(let j=0;j<W.length;j++){const V=W[j],vt=r.convert(V.format,V.colorSpace),st=r.convert(V.type),_t=b(V.internalFormat,vt,st,V.colorSpace),xt=gt(v);F&&Ht(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,_t,v.width,v.height):Ht(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,_t,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,_t,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Rt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(v.depthTexture);W.__renderTarget=v,(!W.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const j=W.__webglTexture,V=gt(v);if(v.depthTexture.format===ts)Ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(v.depthTexture.format===es)Ht(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,V):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function re(A){const v=i.get(A),F=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const W=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",j)};W.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=W}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const W=A.texture.mipmaps;W&&W.length>0?Rt(v.__webglFramebuffer[0],A):Rt(v.__webglFramebuffer,A)}else if(F){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),Xt(v.__webglDepthbuffer[W],A,!1);else{const j=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,V)}}else{const W=A.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Xt(v.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,V)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(A,v,F){const W=i.get(A);v!==void 0&&St(W.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&re(A)}function qt(A){const v=A.texture,F=i.get(A),W=i.get(v);A.addEventListener("dispose",T);const j=A.textures,V=A.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,a.memory.textures++),V){F.__webglFramebuffer=[];for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[st]=[];for(let _t=0;_t<v.mipmaps.length;_t++)F.__webglFramebuffer[st][_t]=n.createFramebuffer()}else F.__webglFramebuffer[st]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let st=0;st<v.mipmaps.length;st++)F.__webglFramebuffer[st]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(vt)for(let st=0,_t=j.length;st<_t;st++){const xt=i.get(j[st]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&Ht(A)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){const _t=j[st];F.__webglColorRenderbuffer[st]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[st]);const xt=r.convert(_t.format,_t.colorSpace),$=r.convert(_t.type),ct=b(_t.internalFormat,xt,$,_t.colorSpace,A.isXRRenderTarget===!0),wt=gt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,wt,ct,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+st,n.RENDERBUFFER,F.__webglColorRenderbuffer[st])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Xt(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(V){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Bt(n.TEXTURE_CUBE_MAP,v);for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)St(F.__webglFramebuffer[st][_t],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,_t);else St(F.__webglFramebuffer[st],A,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);p(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let st=0,_t=j.length;st<_t;st++){const xt=j[st],$=i.get(xt);e.bindTexture(n.TEXTURE_2D,$.__webglTexture),Bt(n.TEXTURE_2D,xt),St(F.__webglFramebuffer,A,xt,n.COLOR_ATTACHMENT0+st,n.TEXTURE_2D,0),p(xt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let st=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(st=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(st,W.__webglTexture),Bt(st,v),v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)St(F.__webglFramebuffer[_t],A,v,n.COLOR_ATTACHMENT0,st,_t);else St(F.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0,st,0);p(v)&&d(st),e.unbindTexture()}A.depthBuffer&&re(A)}function R(A){const v=A.textures;for(let F=0,W=v.length;F<W;F++){const j=v[F];if(p(j)){const V=y(A),vt=i.get(j).__webglTexture;e.bindTexture(V,vt),d(V),e.unbindTexture()}}}const Se=[],Yt=[];function ee(A){if(A.samples>0){if(Ht(A)===!1){const v=A.textures,F=A.width,W=A.height;let j=n.COLOR_BUFFER_BIT;const V=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(A),st=v.length>1;if(st)for(let xt=0;xt<v.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const _t=A.texture.mipmaps;_t&&_t.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let xt=0;xt<v.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),st){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[xt]);const $=i.get(v[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$,0)}n.blitFramebuffer(0,0,F,W,0,0,F,W,j,n.NEAREST),l===!0&&(Se.length=0,Yt.length=0,Se.push(n.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Se.push(V),Yt.push(V),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Yt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),st)for(let xt=0;xt<v.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[xt]);const $=i.get(v[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,$,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function gt(A){return Math.min(s.maxSamples,A.samples)}function Ht(A){const v=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function bt(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Nt(A,v){const F=A.colorSpace,W=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==Ni&&F!==Tn&&(Gt.getTransfer(F)===Kt?(W!==Ke||j!==en)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function de(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=H,this.setTexture2D=K,this.setTexture2DArray=G,this.setTexture3D=tt,this.setTextureCube=k,this.rebindTextures=ae,this.setupRenderTarget=qt,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Ht}function P_(n,t){function e(i,s=Tn){let r;const a=Gt.getTransfer(s);if(i===en)return n.UNSIGNED_BYTE;if(i===ka)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ha)return n.UNSIGNED_SHORT_5_5_5_1;if(i===jl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ql)return n.BYTE;if(i===Yl)return n.SHORT;if(i===Ji)return n.UNSIGNED_SHORT;if(i===za)return n.INT;if(i===Qn)return n.UNSIGNED_INT;if(i===pn)return n.FLOAT;if(i===is)return n.HALF_FLOAT;if(i===$l)return n.ALPHA;if(i===Kl)return n.RGB;if(i===Ke)return n.RGBA;if(i===ts)return n.DEPTH_COMPONENT;if(i===es)return n.DEPTH_STENCIL;if(i===Zl)return n.RED;if(i===Va)return n.RED_INTEGER;if(i===Jl)return n.RG;if(i===Ga)return n.RG_INTEGER;if(i===Wa)return n.RGBA_INTEGER;if(i===Us||i===Is||i===Ns||i===Fs)if(a===Kt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Us)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Us)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ia||i===sa||i===ra||i===aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oa||i===la||i===ca)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oa||i===la)return a===Kt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ca)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ha||i===ua||i===da||i===fa||i===pa||i===ma||i===_a||i===ga||i===va||i===xa||i===Ma||i===Sa||i===Ea||i===ya)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ha)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ua)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===da)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ma)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_a)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ga)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===va)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ma)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ea)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ya)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Os||i===ba||i===Ta)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Os)return a===Kt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ta)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ql||i===Aa||i===wa||i===Ra)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Os)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Aa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ra)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const D_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class U_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Pe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Dn({vertexShader:D_,fragmentShader:L_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new tn(new Zs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class I_ extends ni{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,_=null;const g=new U_,p=e.getContextAttributes();let d=null,y=null;const b=[],E=[],D=new Ut;let w=null;const T=new He;T.viewport=new ce;const P=new He;P.viewport=new ce;const S=[T,P],x=new Qu;let C=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=b[q];return et===void 0&&(et=new wr,b[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=b[q];return et===void 0&&(et=new wr,b[q]=et),et.getGripSpace()},this.getHand=function(q){let et=b[q];return et===void 0&&(et=new wr,b[q]=et),et.getHandSpace()};function O(q){const et=E.indexOf(q.inputSource);if(et===-1)return;const Mt=b[et];Mt!==void 0&&(Mt.update(q.inputSource,q.frame,c||a),Mt.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",K);for(let q=0;q<b.length;q++){const et=E[q];et!==null&&(E[q]=null,b[q].disconnect(et))}C=null,H=null,g.reset(),t.setRenderTarget(d),m=null,f=null,u=null,s=null,y=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",X),s.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(D),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,lt=null,St=null;p.depth&&(St=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=p.stencil?es:ts,lt=p.stencil?Qi:Qn);const Xt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Xt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new ei(f.textureWidth,f.textureHeight,{format:Ke,type:en,depthTexture:new fc(f.textureWidth,f.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Mt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new ei(m.framebufferWidth,m.framebufferHeight,{format:Ke,type:en,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Qt.setContext(s),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(q){for(let et=0;et<q.removed.length;et++){const Mt=q.removed[et],lt=E.indexOf(Mt);lt>=0&&(E[lt]=null,b[lt].disconnect(Mt))}for(let et=0;et<q.added.length;et++){const Mt=q.added[et];let lt=E.indexOf(Mt);if(lt===-1){for(let Xt=0;Xt<b.length;Xt++)if(Xt>=E.length){E.push(Mt),lt=Xt;break}else if(E[Xt]===null){E[Xt]=Mt,lt=Xt;break}if(lt===-1)break}const St=b[lt];St&&St.connect(Mt)}}const G=new N,tt=new N;function k(q,et,Mt){G.setFromMatrixPosition(et.matrixWorld),tt.setFromMatrixPosition(Mt.matrixWorld);const lt=G.distanceTo(tt),St=et.projectionMatrix.elements,Xt=Mt.projectionMatrix.elements,Rt=St[14]/(St[10]-1),re=St[14]/(St[10]+1),ae=(St[9]+1)/St[5],qt=(St[9]-1)/St[5],R=(St[8]-1)/St[0],Se=(Xt[8]+1)/Xt[0],Yt=Rt*R,ee=Rt*Se,gt=lt/(-R+Se),Ht=gt*-R;if(et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ht),q.translateZ(gt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),St[10]===-1)q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const bt=Rt+gt,Nt=re+gt,de=Yt-Ht,A=ee+(lt-Ht),v=ae*re/Nt*bt,F=qt*re/Nt*bt;q.projectionMatrix.makePerspective(de,A,v,F,bt,Nt),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ot(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let et=q.near,Mt=q.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(Mt=g.depthFar)),x.near=P.near=T.near=et,x.far=P.far=T.far=Mt,(C!==x.near||H!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,H=x.far),T.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,x.layers.mask=T.layers.mask|P.layers.mask;const lt=q.parent,St=x.cameras;ot(x,lt);for(let Xt=0;Xt<St.length;Xt++)ot(St[Xt],lt);St.length===2?k(x,T,P):x.projectionMatrix.copy(T.projectionMatrix),ut(q,x,lt)};function ut(q,et,Mt){Mt===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(Mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ca*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let Et=null;function Bt(q,et){if(h=et.getViewerPose(c||a),_=et,h!==null){const Mt=h.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let lt=!1;Mt.length!==x.cameras.length&&(x.cameras.length=0,lt=!0);for(let Rt=0;Rt<Mt.length;Rt++){const re=Mt[Rt];let ae=null;if(m!==null)ae=m.getViewport(re);else{const R=u.getViewSubImage(f,re);ae=R.viewport,Rt===0&&(t.setRenderTargetTextures(y,R.colorTexture,R.depthStencilTexture),t.setRenderTarget(y))}let qt=S[Rt];qt===void 0&&(qt=new He,qt.layers.enable(Rt),qt.viewport=new ce,S[Rt]=qt),qt.matrix.fromArray(re.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(re.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(ae.x,ae.y,ae.width,ae.height),Rt===0&&(x.matrix.copy(qt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),lt===!0&&x.cameras.push(qt)}const St=s.enabledFeatures;if(St&&St.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&u){const Rt=u.getDepthInformation(Mt[0]);Rt&&Rt.isValid&&Rt.texture&&g.init(t,Rt,s.renderState)}}for(let Mt=0;Mt<b.length;Mt++){const lt=E[Mt],St=b[Mt];lt!==null&&St!==void 0&&St.update(lt,et,c||a)}Et&&Et(q,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),_=null}const Qt=new _c;Qt.setAnimationLoop(Bt),this.setAnimationLoop=function(q){Et=q},this.dispose=function(){}}}const kn=new nn,N_=new he;function F_(n,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,hc(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,y,b,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,E)):d.isMeshMatcapMaterial?(r(p,d),_(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),g(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,y,b):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Ce&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Ce&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const y=t.get(d),b=y.envMap,E=y.envMapRotation;b&&(p.envMap.value=b,kn.copy(E),kn.x*=-1,kn.y*=-1,kn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),p.envMapRotation.value.setFromMatrix4(N_.makeRotationFromEuler(kn)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,y,b){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*y,p.scale.value=b*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,y){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ce&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){const y=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function O_(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){const E=b.program;i.uniformBlockBinding(y,E)}function c(y,b){let E=s[y.id];E===void 0&&(_(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",p));const D=b.program;i.updateUBOMapping(y,D);const w=t.render.frame;r[y.id]!==w&&(f(y),r[y.id]=w)}function h(y){const b=u();y.__bindingPointIndex=b;const E=n.createBuffer(),D=y.__size,w=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,D,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,E),E}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const b=s[y.id],E=y.uniforms,D=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let w=0,T=E.length;w<T;w++){const P=Array.isArray(E[w])?E[w]:[E[w]];for(let S=0,x=P.length;S<x;S++){const C=P[S];if(m(C,w,S,D)===!0){const H=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let K=0;K<O.length;K++){const G=O[K],tt=g(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,H+X,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,X),X+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(y,b,E,D){const w=y.value,T=b+"_"+E;if(D[T]===void 0)return typeof w=="number"||typeof w=="boolean"?D[T]=w:D[T]=w.clone(),!0;{const P=D[T];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return D[T]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function _(y){const b=y.uniforms;let E=0;const D=16;for(let T=0,P=b.length;T<P;T++){const S=Array.isArray(b[T])?b[T]:[b[T]];for(let x=0,C=S.length;x<C;x++){const H=S[x],O=Array.isArray(H.value)?H.value:[H.value];for(let X=0,K=O.length;X<K;X++){const G=O[X],tt=g(G),k=E%D,ot=k%tt.boundary,ut=k+ot;E+=ot,ut!==0&&D-ut<tt.storage&&(E+=D-ut),H.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=tt.storage}}}const w=E%D;return w>0&&(E+=D-w),y.__size=E,y.__cache={},this}function g(y){const b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),b}function p(y){const b=y.target;b.removeEventListener("dispose",p);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class B_{constructor(t={}){const{canvas:e=mu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const _=new Uint32Array(4),g=new Int32Array(4);let p=null,d=null;const y=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let D=!1;this._outputColorSpace=ke;let w=0,T=0,P=null,S=-1,x=null;const C=new ce,H=new ce;let O=null;const X=new Wt(0);let K=0,G=e.width,tt=e.height,k=1,ot=null,ut=null;const Et=new ce(0,0,G,tt),Bt=new ce(0,0,G,tt);let Qt=!1;const q=new Ya;let et=!1,Mt=!1;const lt=new he,St=new he,Xt=new N,Rt=new ce,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ae=!1;function qt(){return P===null?k:1}let R=i;function Se(M,U){return e.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ba}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",J,!1),e.addEventListener("webglcontextcreationerror",Y,!1),R===null){const U="webgl2";if(R=Se(U,M),R===null)throw Se(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Yt,ee,gt,Ht,bt,Nt,de,A,v,F,W,j,V,vt,st,_t,xt,$,ct,wt,At,nt,Dt,L;function rt(){Yt=new jp(R),Yt.init(),nt=new P_(R,Yt),ee=new Hp(R,Yt,t,nt),gt=new R_(R,Yt),ee.reverseDepthBuffer&&f&&gt.buffers.depth.setReversed(!0),Ht=new Zp(R),bt=new m_,Nt=new C_(R,Yt,gt,bt,ee,nt,Ht),de=new Gp(E),A=new Yp(E),v=new nd(R),Dt=new zp(R,v),F=new $p(R,v,Ht,Dt),W=new Qp(R,F,v,Ht),ct=new Jp(R,ee,Nt),_t=new Vp(bt),j=new p_(E,de,A,Yt,ee,Dt,_t),V=new F_(E,bt),vt=new g_,st=new y_(Yt),$=new Bp(E,de,A,gt,W,m,l),xt=new A_(E,W,ee),L=new O_(R,Ht,ee,gt),wt=new kp(R,Yt,Ht),At=new Kp(R,Yt,Ht),Ht.programs=j.programs,E.capabilities=ee,E.extensions=Yt,E.properties=bt,E.renderLists=vt,E.shadowMap=xt,E.state=gt,E.info=Ht}rt();const Z=new I_(E,R);this.xr=Z,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const M=Yt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Yt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(M){M!==void 0&&(k=M,this.setSize(G,tt,!1))},this.getSize=function(M){return M.set(G,tt)},this.setSize=function(M,U,B=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,tt=U,e.width=Math.floor(M*k),e.height=Math.floor(U*k),B===!0&&(e.style.width=M+"px",e.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(G*k,tt*k).floor()},this.setDrawingBufferSize=function(M,U,B){G=M,tt=U,k=B,e.width=Math.floor(M*B),e.height=Math.floor(U*B),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(Et)},this.setViewport=function(M,U,B,z){M.isVector4?Et.set(M.x,M.y,M.z,M.w):Et.set(M,U,B,z),gt.viewport(C.copy(Et).multiplyScalar(k).round())},this.getScissor=function(M){return M.copy(Bt)},this.setScissor=function(M,U,B,z){M.isVector4?Bt.set(M.x,M.y,M.z,M.w):Bt.set(M,U,B,z),gt.scissor(H.copy(Bt).multiplyScalar(k).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(M){gt.setScissorTest(Qt=M)},this.setOpaqueSort=function(M){ot=M},this.setTransparentSort=function(M){ut=M},this.getClearColor=function(M){return M.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor(...arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,B=!0){let z=0;if(M){let I=!1;if(P!==null){const Q=P.texture.format;I=Q===Wa||Q===Ga||Q===Va}if(I){const Q=P.texture.type,at=Q===en||Q===Qn||Q===Ji||Q===Qi||Q===ka||Q===Ha,mt=$.getClearColor(),ht=$.getClearAlpha(),Ct=mt.r,Pt=mt.g,yt=mt.b;at?(_[0]=Ct,_[1]=Pt,_[2]=yt,_[3]=ht,R.clearBufferuiv(R.COLOR,0,_)):(g[0]=Ct,g[1]=Pt,g[2]=yt,g[3]=ht,R.clearBufferiv(R.COLOR,0,g))}else z|=R.COLOR_BUFFER_BIT}U&&(z|=R.DEPTH_BUFFER_BIT),B&&(z|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",J,!1),e.removeEventListener("webglcontextcreationerror",Y,!1),$.dispose(),vt.dispose(),st.dispose(),bt.dispose(),de.dispose(),A.dispose(),W.dispose(),Dt.dispose(),L.dispose(),j.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ho),Z.removeEventListener("sessionend",uo),Un.stop()};function dt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function J(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const M=Ht.autoReset,U=xt.enabled,B=xt.autoUpdate,z=xt.needsUpdate,I=xt.type;rt(),Ht.autoReset=M,xt.enabled=U,xt.autoUpdate=B,xt.needsUpdate=z,xt.type=I}function Y(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function pt(M){const U=M.target;U.removeEventListener("dispose",pt),Lt(U)}function Lt(M){ne(M),bt.remove(M)}function ne(M){const U=bt.get(M).programs;U!==void 0&&(U.forEach(function(B){j.releaseProgram(B)}),M.isShaderMaterial&&j.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,B,z,I,Q){U===null&&(U=re);const at=I.isMesh&&I.matrixWorld.determinant()<0,mt=Mh(M,U,B,z,I);gt.setMaterial(z,at);let ht=B.index,Ct=1;if(z.wireframe===!0){if(ht=F.getWireframeAttribute(B),ht===void 0)return;Ct=2}const Pt=B.drawRange,yt=B.attributes.position;let kt=Pt.start*Ct,$t=(Pt.start+Pt.count)*Ct;Q!==null&&(kt=Math.max(kt,Q.start*Ct),$t=Math.min($t,(Q.start+Q.count)*Ct)),ht!==null?(kt=Math.max(kt,0),$t=Math.min($t,ht.count)):yt!=null&&(kt=Math.max(kt,0),$t=Math.min($t,yt.count));const le=$t-kt;if(le<0||le===1/0)return;Dt.setup(I,z,mt,B,ht);let ie,te=wt;if(ht!==null&&(ie=v.get(ht),te=At,te.setIndex(ie)),I.isMesh)z.wireframe===!0?(gt.setLineWidth(z.wireframeLinewidth*qt()),te.setMode(R.LINES)):te.setMode(R.TRIANGLES);else if(I.isLine){let Tt=z.linewidth;Tt===void 0&&(Tt=1),gt.setLineWidth(Tt*qt()),I.isLineSegments?te.setMode(R.LINES):I.isLineLoop?te.setMode(R.LINE_LOOP):te.setMode(R.LINE_STRIP)}else I.isPoints?te.setMode(R.POINTS):I.isSprite&&te.setMode(R.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)wi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),te.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))te.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Tt=I._multiDrawStarts,oe=I._multiDrawCounts,Vt=I._multiDrawCount,De=ht?v.get(ht).bytesPerElement:1,si=bt.get(z).currentProgram.getUniforms();for(let Le=0;Le<Vt;Le++)si.setValue(R,"_gl_DrawID",Le),te.render(Tt[Le]/De,oe[Le])}else if(I.isInstancedMesh)te.renderInstances(kt,le,I.count);else if(B.isInstancedBufferGeometry){const Tt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,oe=Math.min(B.instanceCount,Tt);te.renderInstances(kt,le,oe)}else te.render(kt,le)};function jt(M,U,B){M.transparent===!0&&M.side===dn&&M.forceSinglePass===!1?(M.side=Ce,M.needsUpdate=!0,ls(M,U,B),M.side=Pn,M.needsUpdate=!0,ls(M,U,B),M.side=dn):ls(M,U,B)}this.compile=function(M,U,B=null){B===null&&(B=M),d=st.get(B),d.init(U),b.push(d),B.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),M!==B&&M.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const z=new Set;return M.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const Q=I.material;if(Q)if(Array.isArray(Q))for(let at=0;at<Q.length;at++){const mt=Q[at];jt(mt,B,I),z.add(mt)}else jt(Q,B,I),z.add(Q)}),d=b.pop(),z},this.compileAsync=function(M,U,B=null){const z=this.compile(M,U,B);return new Promise(I=>{function Q(){if(z.forEach(function(at){bt.get(at).currentProgram.isReady()&&z.delete(at)}),z.size===0){I(M);return}setTimeout(Q,10)}Yt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ge=null;function rn(M){Ge&&Ge(M)}function ho(){Un.stop()}function uo(){Un.start()}const Un=new _c;Un.setAnimationLoop(rn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(M){Ge=M,Z.setAnimationLoop(M),M===null?Un.stop():Un.start()},Z.addEventListener("sessionstart",ho),Z.addEventListener("sessionend",uo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(U),U=Z.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,U,P),d=st.get(M,b.length),d.init(U),b.push(d),St.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(St),Mt=this.localClippingEnabled,et=_t.init(this.clippingPlanes,Mt),p=vt.get(M,y.length),p.init(),y.push(p),Z.enabled===!0&&Z.isPresenting===!0){const Q=E.xr.getDepthSensingMesh();Q!==null&&ir(Q,U,-1/0,E.sortObjects)}ir(M,U,0,E.sortObjects),p.finish(),E.sortObjects===!0&&p.sort(ot,ut),ae=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,ae&&$.addToRenderList(p,M),this.info.render.frame++,et===!0&&_t.beginShadows();const B=d.state.shadowsArray;xt.render(B,M,U),et===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=p.opaque,I=p.transmissive;if(d.setupLights(),U.isArrayCamera){const Q=U.cameras;if(I.length>0)for(let at=0,mt=Q.length;at<mt;at++){const ht=Q[at];po(z,I,M,ht)}ae&&$.render(M);for(let at=0,mt=Q.length;at<mt;at++){const ht=Q[at];fo(p,M,ht,ht.viewport)}}else I.length>0&&po(z,I,M,U),ae&&$.render(M),fo(p,M,U);P!==null&&T===0&&(Nt.updateMultisampleRenderTarget(P),Nt.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(E,M,U),Dt.resetDefaultState(),S=-1,x=null,b.pop(),b.length>0?(d=b[b.length-1],et===!0&&_t.setGlobalState(E.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function ir(M,U,B,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){z&&Rt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(St);const at=W.update(M),mt=M.material;mt.visible&&p.push(M,at,mt,B,Rt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||q.intersectsObject(M))){const at=W.update(M),mt=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Rt.copy(M.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),Rt.copy(at.boundingSphere.center)),Rt.applyMatrix4(M.matrixWorld).applyMatrix4(St)),Array.isArray(mt)){const ht=at.groups;for(let Ct=0,Pt=ht.length;Ct<Pt;Ct++){const yt=ht[Ct],kt=mt[yt.materialIndex];kt&&kt.visible&&p.push(M,at,kt,B,Rt.z,yt)}}else mt.visible&&p.push(M,at,mt,B,Rt.z,null)}}const Q=M.children;for(let at=0,mt=Q.length;at<mt;at++)ir(Q[at],U,B,z)}function fo(M,U,B,z){const I=M.opaque,Q=M.transmissive,at=M.transparent;d.setupLightsView(B),et===!0&&_t.setGlobalState(E.clippingPlanes,B),z&&gt.viewport(C.copy(z)),I.length>0&&os(I,U,B),Q.length>0&&os(Q,U,B),at.length>0&&os(at,U,B),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function po(M,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[z.id]===void 0&&(d.state.transmissionRenderTarget[z.id]=new ei(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?is:en,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace}));const Q=d.state.transmissionRenderTarget[z.id],at=z.viewport||C;Q.setSize(at.z*E.transmissionResolutionScale,at.w*E.transmissionResolutionScale);const mt=E.getRenderTarget(),ht=E.getActiveCubeFace(),Ct=E.getActiveMipmapLevel();E.setRenderTarget(Q),E.getClearColor(X),K=E.getClearAlpha(),K<1&&E.setClearColor(16777215,.5),E.clear(),ae&&$.render(B);const Pt=E.toneMapping;E.toneMapping=Rn;const yt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),d.setupLightsView(z),et===!0&&_t.setGlobalState(E.clippingPlanes,z),os(M,B,z),Nt.updateMultisampleRenderTarget(Q),Nt.updateRenderTargetMipmap(Q),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let $t=0,le=U.length;$t<le;$t++){const ie=U[$t],te=ie.object,Tt=ie.geometry,oe=ie.material,Vt=ie.group;if(oe.side===dn&&te.layers.test(z.layers)){const De=oe.side;oe.side=Ce,oe.needsUpdate=!0,mo(te,B,z,Tt,oe,Vt),oe.side=De,oe.needsUpdate=!0,kt=!0}}kt===!0&&(Nt.updateMultisampleRenderTarget(Q),Nt.updateRenderTargetMipmap(Q))}E.setRenderTarget(mt,ht,Ct),E.setClearColor(X,K),yt!==void 0&&(z.viewport=yt),E.toneMapping=Pt}function os(M,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let I=0,Q=M.length;I<Q;I++){const at=M[I],mt=at.object,ht=at.geometry,Ct=at.group;let Pt=at.material;Pt.allowOverride===!0&&z!==null&&(Pt=z),mt.layers.test(B.layers)&&mo(mt,U,B,ht,Pt,Ct)}}function mo(M,U,B,z,I,Q){M.onBeforeRender(E,U,B,z,I,Q),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),I.onBeforeRender(E,U,B,z,M,Q),I.transparent===!0&&I.side===dn&&I.forceSinglePass===!1?(I.side=Ce,I.needsUpdate=!0,E.renderBufferDirect(B,U,z,I,M,Q),I.side=Pn,I.needsUpdate=!0,E.renderBufferDirect(B,U,z,I,M,Q),I.side=dn):E.renderBufferDirect(B,U,z,I,M,Q),M.onAfterRender(E,U,B,z,I,Q)}function ls(M,U,B){U.isScene!==!0&&(U=re);const z=bt.get(M),I=d.state.lights,Q=d.state.shadowsArray,at=I.state.version,mt=j.getParameters(M,I.state,Q,U,B),ht=j.getProgramCacheKey(mt);let Ct=z.programs;z.environment=M.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(M.isMeshStandardMaterial?A:de).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ct===void 0&&(M.addEventListener("dispose",pt),Ct=new Map,z.programs=Ct);let Pt=Ct.get(ht);if(Pt!==void 0){if(z.currentProgram===Pt&&z.lightsStateVersion===at)return go(M,mt),Pt}else mt.uniforms=j.getUniforms(M),M.onBeforeCompile(mt,E),Pt=j.acquireProgram(mt,ht),Ct.set(ht,Pt),z.uniforms=mt.uniforms;const yt=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(yt.clippingPlanes=_t.uniform),go(M,mt),z.needsLights=Eh(M),z.lightsStateVersion=at,z.needsLights&&(yt.ambientLightColor.value=I.state.ambient,yt.lightProbe.value=I.state.probe,yt.directionalLights.value=I.state.directional,yt.directionalLightShadows.value=I.state.directionalShadow,yt.spotLights.value=I.state.spot,yt.spotLightShadows.value=I.state.spotShadow,yt.rectAreaLights.value=I.state.rectArea,yt.ltc_1.value=I.state.rectAreaLTC1,yt.ltc_2.value=I.state.rectAreaLTC2,yt.pointLights.value=I.state.point,yt.pointLightShadows.value=I.state.pointShadow,yt.hemisphereLights.value=I.state.hemi,yt.directionalShadowMap.value=I.state.directionalShadowMap,yt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,yt.spotShadowMap.value=I.state.spotShadowMap,yt.spotLightMatrix.value=I.state.spotLightMatrix,yt.spotLightMap.value=I.state.spotLightMap,yt.pointShadowMap.value=I.state.pointShadowMap,yt.pointShadowMatrix.value=I.state.pointShadowMatrix),z.currentProgram=Pt,z.uniformsList=null,Pt}function _o(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=zs.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function go(M,U){const B=bt.get(M);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Mh(M,U,B,z,I){U.isScene!==!0&&(U=re),Nt.resetTextureUnits();const Q=U.fog,at=z.isMeshStandardMaterial?U.environment:null,mt=P===null?E.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ni,ht=(z.isMeshStandardMaterial?A:de).get(z.envMap||at),Ct=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Pt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),yt=!!B.morphAttributes.position,kt=!!B.morphAttributes.normal,$t=!!B.morphAttributes.color;let le=Rn;z.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(le=E.toneMapping);const ie=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,te=ie!==void 0?ie.length:0,Tt=bt.get(z),oe=d.state.lights;if(et===!0&&(Mt===!0||M!==x)){const Ee=M===x&&z.id===S;_t.setState(z,M,Ee)}let Vt=!1;z.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==oe.state.version||Tt.outputColorSpace!==mt||I.isBatchedMesh&&Tt.batching===!1||!I.isBatchedMesh&&Tt.batching===!0||I.isBatchedMesh&&Tt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Tt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Tt.instancing===!1||!I.isInstancedMesh&&Tt.instancing===!0||I.isSkinnedMesh&&Tt.skinning===!1||!I.isSkinnedMesh&&Tt.skinning===!0||I.isInstancedMesh&&Tt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Tt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Tt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Tt.instancingMorph===!1&&I.morphTexture!==null||Tt.envMap!==ht||z.fog===!0&&Tt.fog!==Q||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==_t.numPlanes||Tt.numIntersection!==_t.numIntersection)||Tt.vertexAlphas!==Ct||Tt.vertexTangents!==Pt||Tt.morphTargets!==yt||Tt.morphNormals!==kt||Tt.morphColors!==$t||Tt.toneMapping!==le||Tt.morphTargetsCount!==te)&&(Vt=!0):(Vt=!0,Tt.__version=z.version);let De=Tt.currentProgram;Vt===!0&&(De=ls(z,U,I));let si=!1,Le=!1,ki=!1;const se=De.getUniforms(),Fe=Tt.uniforms;if(gt.useProgram(De.program)&&(si=!0,Le=!0,ki=!0),z.id!==S&&(S=z.id,Le=!0),si||x!==M){gt.buffers.depth.getReversed()?(lt.copy(M.projectionMatrix),gu(lt),vu(lt),se.setValue(R,"projectionMatrix",lt)):se.setValue(R,"projectionMatrix",M.projectionMatrix),se.setValue(R,"viewMatrix",M.matrixWorldInverse);const Ae=se.map.cameraPosition;Ae!==void 0&&Ae.setValue(R,Xt.setFromMatrixPosition(M.matrixWorld)),ee.logarithmicDepthBuffer&&se.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&se.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),x!==M&&(x=M,Le=!0,ki=!0)}if(I.isSkinnedMesh){se.setOptional(R,I,"bindMatrix"),se.setOptional(R,I,"bindMatrixInverse");const Ee=I.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),se.setValue(R,"boneTexture",Ee.boneTexture,Nt))}I.isBatchedMesh&&(se.setOptional(R,I,"batchingTexture"),se.setValue(R,"batchingTexture",I._matricesTexture,Nt),se.setOptional(R,I,"batchingIdTexture"),se.setValue(R,"batchingIdTexture",I._indirectTexture,Nt),se.setOptional(R,I,"batchingColorTexture"),I._colorsTexture!==null&&se.setValue(R,"batchingColorTexture",I._colorsTexture,Nt));const Oe=B.morphAttributes;if((Oe.position!==void 0||Oe.normal!==void 0||Oe.color!==void 0)&&ct.update(I,B,De),(Le||Tt.receiveShadow!==I.receiveShadow)&&(Tt.receiveShadow=I.receiveShadow,se.setValue(R,"receiveShadow",I.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Fe.envMap.value=ht,Fe.flipEnvMap.value=ht.isCubeTexture&&ht.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Fe.envMapIntensity.value=U.environmentIntensity),Le&&(se.setValue(R,"toneMappingExposure",E.toneMappingExposure),Tt.needsLights&&Sh(Fe,ki),Q&&z.fog===!0&&V.refreshFogUniforms(Fe,Q),V.refreshMaterialUniforms(Fe,z,k,tt,d.state.transmissionRenderTarget[M.id]),zs.upload(R,_o(Tt),Fe,Nt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(zs.upload(R,_o(Tt),Fe,Nt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&se.setValue(R,"center",I.center),se.setValue(R,"modelViewMatrix",I.modelViewMatrix),se.setValue(R,"normalMatrix",I.normalMatrix),se.setValue(R,"modelMatrix",I.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ee=z.uniformsGroups;for(let Ae=0,sr=Ee.length;Ae<sr;Ae++){const In=Ee[Ae];L.update(In,De),L.bind(In,De)}}return De}function Sh(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Eh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,U,B){const z=bt.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),bt.get(M.texture).__webglTexture=U,bt.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const B=bt.get(M);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const yh=R.createFramebuffer();this.setRenderTarget=function(M,U=0,B=0){P=M,w=U,T=B;let z=!0,I=null,Q=!1,at=!1;if(M){const ht=bt.get(M);if(ht.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(R.FRAMEBUFFER,null),z=!1;else if(ht.__webglFramebuffer===void 0)Nt.setupRenderTarget(M);else if(ht.__hasExternalTextures)Nt.rebindTextures(M,bt.get(M.texture).__webglTexture,bt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const yt=M.depthTexture;if(ht.__boundDepthTexture!==yt){if(yt!==null&&bt.has(yt)&&(M.width!==yt.image.width||M.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(M)}}const Ct=M.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(at=!0);const Pt=bt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Pt[U])?I=Pt[U][B]:I=Pt[U],Q=!0):M.samples>0&&Nt.useMultisampledRTT(M)===!1?I=bt.get(M).__webglMultisampledFramebuffer:Array.isArray(Pt)?I=Pt[B]:I=Pt,C.copy(M.viewport),H.copy(M.scissor),O=M.scissorTest}else C.copy(Et).multiplyScalar(k).floor(),H.copy(Bt).multiplyScalar(k).floor(),O=Qt;if(B!==0&&(I=yh),gt.bindFramebuffer(R.FRAMEBUFFER,I)&&z&&gt.drawBuffers(M,I),gt.viewport(C),gt.scissor(H),gt.setScissorTest(O),Q){const ht=bt.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,ht.__webglTexture,B)}else if(at){const ht=bt.get(M.texture),Ct=U;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,ht.__webglTexture,B,Ct)}else if(M!==null&&B!==0){const ht=bt.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ht.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(M,U,B,z,I,Q,at,mt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=bt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&at!==void 0&&(ht=ht[at]),ht){gt.bindFramebuffer(R.FRAMEBUFFER,ht);try{const Ct=M.textures[mt],Pt=Ct.format,yt=Ct.type;if(!ee.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ee.textureTypeReadable(yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&B>=0&&B<=M.height-I&&(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+mt),R.readPixels(U,B,z,I,nt.convert(Pt),nt.convert(yt),Q))}finally{const Ct=P!==null?bt.get(P).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(M,U,B,z,I,Q,at,mt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=bt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&at!==void 0&&(ht=ht[at]),ht)if(U>=0&&U<=M.width-z&&B>=0&&B<=M.height-I){gt.bindFramebuffer(R.FRAMEBUFFER,ht);const Ct=M.textures[mt],Pt=Ct.format,yt=Ct.type;if(!ee.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const kt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,kt),R.bufferData(R.PIXEL_PACK_BUFFER,Q.byteLength,R.STREAM_READ),M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+mt),R.readPixels(U,B,z,I,nt.convert(Pt),nt.convert(yt),0);const $t=P!==null?bt.get(P).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,$t);const le=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await _u(R,le,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,kt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Q),R.deleteBuffer(kt),R.deleteSync(le),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,B=0){const z=Math.pow(2,-B),I=Math.floor(M.image.width*z),Q=Math.floor(M.image.height*z),at=U!==null?U.x:0,mt=U!==null?U.y:0;Nt.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,B,0,0,at,mt,I,Q),gt.unbindTexture()};const bh=R.createFramebuffer(),Th=R.createFramebuffer();this.copyTextureToTexture=function(M,U,B=null,z=null,I=0,Q=null){Q===null&&(I!==0?(wi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=I,I=0):Q=0);let at,mt,ht,Ct,Pt,yt,kt,$t,le;const ie=M.isCompressedTexture?M.mipmaps[Q]:M.image;if(B!==null)at=B.max.x-B.min.x,mt=B.max.y-B.min.y,ht=B.isBox3?B.max.z-B.min.z:1,Ct=B.min.x,Pt=B.min.y,yt=B.isBox3?B.min.z:0;else{const Oe=Math.pow(2,-I);at=Math.floor(ie.width*Oe),mt=Math.floor(ie.height*Oe),M.isDataArrayTexture?ht=ie.depth:M.isData3DTexture?ht=Math.floor(ie.depth*Oe):ht=1,Ct=0,Pt=0,yt=0}z!==null?(kt=z.x,$t=z.y,le=z.z):(kt=0,$t=0,le=0);const te=nt.convert(U.format),Tt=nt.convert(U.type);let oe;U.isData3DTexture?(Nt.setTexture3D(U,0),oe=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Nt.setTexture2DArray(U,0),oe=R.TEXTURE_2D_ARRAY):(Nt.setTexture2D(U,0),oe=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const Vt=R.getParameter(R.UNPACK_ROW_LENGTH),De=R.getParameter(R.UNPACK_IMAGE_HEIGHT),si=R.getParameter(R.UNPACK_SKIP_PIXELS),Le=R.getParameter(R.UNPACK_SKIP_ROWS),ki=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ie.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ie.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ct),R.pixelStorei(R.UNPACK_SKIP_ROWS,Pt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,yt);const se=M.isDataArrayTexture||M.isData3DTexture,Fe=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Oe=bt.get(M),Ee=bt.get(U),Ae=bt.get(Oe.__renderTarget),sr=bt.get(Ee.__renderTarget);gt.bindFramebuffer(R.READ_FRAMEBUFFER,Ae.__webglFramebuffer),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,sr.__webglFramebuffer);for(let In=0;In<ht;In++)se&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(M).__webglTexture,I,yt+In),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(U).__webglTexture,Q,le+In)),R.blitFramebuffer(Ct,Pt,at,mt,kt,$t,at,mt,R.DEPTH_BUFFER_BIT,R.NEAREST);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(I!==0||M.isRenderTargetTexture||bt.has(M)){const Oe=bt.get(M),Ee=bt.get(U);gt.bindFramebuffer(R.READ_FRAMEBUFFER,bh),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Th);for(let Ae=0;Ae<ht;Ae++)se?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Oe.__webglTexture,I,yt+Ae):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Oe.__webglTexture,I),Fe?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ee.__webglTexture,Q,le+Ae):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ee.__webglTexture,Q),I!==0?R.blitFramebuffer(Ct,Pt,at,mt,kt,$t,at,mt,R.COLOR_BUFFER_BIT,R.NEAREST):Fe?R.copyTexSubImage3D(oe,Q,kt,$t,le+Ae,Ct,Pt,at,mt):R.copyTexSubImage2D(oe,Q,kt,$t,Ct,Pt,at,mt);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Fe?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(oe,Q,kt,$t,le,at,mt,ht,te,Tt,ie.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(oe,Q,kt,$t,le,at,mt,ht,te,ie.data):R.texSubImage3D(oe,Q,kt,$t,le,at,mt,ht,te,Tt,ie):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Q,kt,$t,at,mt,te,Tt,ie.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Q,kt,$t,ie.width,ie.height,te,ie.data):R.texSubImage2D(R.TEXTURE_2D,Q,kt,$t,at,mt,te,Tt,ie);R.pixelStorei(R.UNPACK_ROW_LENGTH,Vt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,De),R.pixelStorei(R.UNPACK_SKIP_PIXELS,si),R.pixelStorei(R.UNPACK_SKIP_ROWS,Le),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ki),Q===0&&U.generateMipmaps&&R.generateMipmap(oe),gt.unbindTexture()},this.copyTextureToTexture3D=function(M,U,B=null,z=null,I=0){return wi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,U,B,z,I)},this.initRenderTarget=function(M){bt.get(M).__webglFramebuffer===void 0&&Nt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Nt.setTextureCube(M,0):M.isData3DTexture?Nt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Nt.setTexture2DArray(M,0):Nt.setTexture2D(M,0),gt.unbindTexture()},this.resetState=function(){w=0,T=0,P=null,gt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Gt._getUnpackColorSpace()}}const gl={type:"change"},$a={type:"start"},Sc={type:"end"},Ps=new sc,vl=new bn,z_=Math.cos(70*pu.DEG2RAD),fe=new N,Re=2*Math.PI,Zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fr=1e-6;class k_ extends td{constructor(t,e=null){super(t,e),this.state=Zt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ti.ROTATE,MIDDLE:Ti.DOLLY,RIGHT:Ti.PAN},this.touches={ONE:yi.ROTATE,TWO:yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new ti,this._lastTargetPosition=new N,this._quat=new ti().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xo,this._sphericalDelta=new Xo,this._scale=1,this._panOffset=new N,this._rotateStart=new Ut,this._rotateEnd=new Ut,this._rotateDelta=new Ut,this._panStart=new Ut,this._panEnd=new Ut,this._panDelta=new Ut,this._dollyStart=new Ut,this._dollyEnd=new Ut,this._dollyDelta=new Ut,this._dollyDirection=new N,this._mouse=new Ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=V_.bind(this),this._onPointerDown=H_.bind(this),this._onPointerUp=G_.bind(this),this._onContextMenu=K_.bind(this),this._onMouseWheel=q_.bind(this),this._onKeyDown=Y_.bind(this),this._onTouchStart=j_.bind(this),this._onTouchMove=$_.bind(this),this._onMouseDown=W_.bind(this),this._onMouseMove=X_.bind(this),this._interceptControlDown=Z_.bind(this),this._interceptControlUp=J_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gl),this.update(),this.state=Zt.NONE}update(t=null){const e=this.object.position;fe.copy(e).sub(this.target),fe.applyQuaternion(this._quat),this._spherical.setFromVector3(fe),this.autoRotate&&this.state===Zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Re:i>Math.PI&&(i-=Re),s<-Math.PI?s+=Re:s>Math.PI&&(s-=Re),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(fe.setFromSpherical(this._spherical),fe.applyQuaternion(this._quatInverse),e.copy(this.target).add(fe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=fe.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=fe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ps.origin.copy(this.object.position),Ps.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ps.direction))<z_?this.object.lookAt(this.target):(vl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ps.intersectPlane(vl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fr||this._lastTargetPosition.distanceToSquared(this.target)>Fr?(this.dispatchEvent(gl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Re/60*this.autoRotateSpeed*t:Re/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){fe.setFromMatrixColumn(e,0),fe.multiplyScalar(-t),this._panOffset.add(fe)}_panUp(t,e){this.screenSpacePanning===!0?fe.setFromMatrixColumn(e,1):(fe.setFromMatrixColumn(e,0),fe.crossVectors(this.object.up,fe)),fe.multiplyScalar(t),this._panOffset.add(fe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;fe.copy(s).sub(this.target);let r=fe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function H_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function V_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function G_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sc),this.state=Zt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function W_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Zt.DOLLY;break;case Ti.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Zt.ROTATE}break;case Ti.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Zt.PAN}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent($a)}function X_(n){switch(this.state){case Zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function q_(n){this.enabled===!1||this.enableZoom===!1||this.state!==Zt.NONE||(n.preventDefault(),this.dispatchEvent($a),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Sc))}function Y_(n){this.enabled!==!1&&this._handleKeyDown(n)}function j_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Zt.TOUCH_ROTATE;break;case yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Zt.TOUCH_PAN;break;default:this.state=Zt.NONE}break;case 2:switch(this.touches.TWO){case yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Zt.TOUCH_DOLLY_PAN;break;case yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Zt.TOUCH_DOLLY_ROTATE;break;default:this.state=Zt.NONE}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent($a)}function $_(n){switch(this._trackPointer(n),this.state){case Zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Zt.NONE}}function K_(n){this.enabled!==!1&&n.preventDefault()}function Z_(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function J_(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Q_=1512207,tg=13208418;function eg(n){const t=new B_({canvas:n,antialias:!0});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setClearColor(Q_);const e=new Gu,i=new He(45,1,1,8e3);i.position.set(50,120,240),e.add(new Ku(15786708,3812900,.9));const s=new Wo(16774376,1.6);s.position.set(2,3,2),e.add(s);const r=new Wo(12626068,.5);r.position.set(-2,1,-1.5),e.add(r);const a=new Yi;a.rotation.x=-Math.PI/2,e.add(a);const o=new Yu({color:tg,metalness:.05,roughness:.55}),l=new k_(i,n);l.enableDamping=!0,l.dampingFactor=.08;const c=[];let h=!1,u=0;function f(){const p=n.clientWidth,d=n.clientHeight;if(p===0||d===0)return;const y=Math.min(window.devicePixelRatio,2);(n.width!==Math.round(p*y)||n.height!==Math.round(d*y))&&(t.setSize(p,d,!1),i.aspect=p/d,i.updateProjectionMatrix())}function m(){h||(f(),l.update(),t.render(e,i),requestAnimationFrame(m))}requestAnimationFrame(m);function _(p){const d=i.fov*Math.PI/180,y=i.aspect>0?i.aspect:1,b=2*Math.atan(Math.tan(d/2)*y);return p/Math.sin(Math.min(d,b)/2)*1.12}function g(){for(const p of c)a.remove(p),p.geometry.dispose();c.length=0}return{setMesh(p){this.setMeshes([p])},setMeshes(p){g();const d=new Bi;for(const w of p){const T=new Ln;T.setAttribute("position",new Ne(w.positions,3)),T.setAttribute("normal",new Ne(w.normals,3)),T.setIndex(new Ne(w.indices,1)),T.computeBoundingBox(),T.boundingBox&&d.union(T.boundingBox);const P=new tn(T,o);a.add(P),c.push(P)}if(d.isEmpty())return;const y=new N;d.getCenter(y);for(const w of c)w.position.set(-y.x,-y.y,-y.z);l.target.set(0,0,0);const b=new N;d.getSize(b);const E=b.length()/2,D=_(E);i.near=Math.max(.1,D/500),i.far=D*20,i.updateProjectionMatrix(),Math.abs(E-u)>u*.08&&(i.position.setLength(D),u=E)},dispose(){h=!0,l.dispose(),g(),o.dispose(),t.dispose()}}}const fn=1.5,Zn=(n,t,e)=>Math.min(e,Math.max(t,n)),Yn=(n,t,e)=>n+(t-n)*e;function ng(n){const t=Zn(n,0,1);return t*t*(3-2*t)}const xl=.14;function Ec(n,t){return 1+n*ng((t-(1-xl))/xl)}function yc(n,t){const e=[];for(let i=0;i<n;i++){const s=i/(n-1);e.push({t:s,r:Math.max(fn,t(s))})}return e}const bc=25,ig={id:"pot",label:"Горшок",examples:"горшок, крынка, корчага, канопка",defaultHeightMm:150,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:170,unit:"mm"},{key:"dNeck",label:"Горло",min:20,max:300,step:1,default:108,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:104,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.25,max:.8,step:.01,default:.52,unit:"x"},{key:"shoulder",label:"Плечо",min:0,max:1,step:.01,default:.45,unit:"x",hint:"резкость перехода тулово → горло"},{key:"neckH",label:"Высота горла",min:0,max:.4,step:.01,default:.16,unit:"x"},{key:"rimFlare",label:"Отгиб венчика",min:-.1,max:.6,step:.01,default:.18,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,s=n.dNeck/2,r=s*(1+n.rimFlare),a=Zn(n.bellyAt,.15,.82),o=Math.max(a+.1,1-n.neckH),l=[{t:0,r:e},{t:a,r:i}];return o<.995&&(l.push({t:Yn(a,o,Yn(.45,.72,n.shoulder)),r:Yn(s,i,Yn(.42,.78,n.shoulder))}),l.push({t:o,r:s})),l.push({t:1,r}),l.map(c=>({t:c.t,r:Math.max(fn,c.r)}))}},sg={id:"bowl",label:"Миска",examples:"миска, тарелка, пиала, килик",defaultHeightMm:80,params:[{key:"dRim",label:"Верх",min:60,max:400,step:1,default:210,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:92,unit:"mm"},{key:"curvature",label:"Округлость",min:0,max:1,step:.01,default:.6,unit:"x",hint:"0 — прямой конус, 1 — полусфера"},{key:"footH",label:"Ножка",min:0,max:60,step:1,default:8,unit:"mm"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,s=Zn(n.footH/Math.max(1,t),0,.45),r=n.curvature;return yc(bc,a=>{if(a<=s)return e;const o=(a-s)/(1-s),l=Yn(o,Math.sqrt(Math.max(0,1-(1-o)*(1-o))),r);return Yn(e,i,l)*Ec(n.rimFlare,a)})}},rg={id:"cup",label:"Чашка",examples:"чашка, стакан, кружка, скифос",defaultHeightMm:95,params:[{key:"dRim",label:"Верх",min:30,max:220,step:1,default:84,unit:"mm"},{key:"dFoot",label:"Дно",min:25,max:200,step:1,default:66,unit:"mm"},{key:"barrel",label:"Бочка",min:-.25,max:.35,step:.01,default:.06,unit:"x",hint:">0 — выпуклые бока, <0 — талия"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,s=(e+i)/2;return yc(bc,r=>(Yn(e,i,r)+n.barrel*s*Math.sin(Math.PI*r))*Ec(n.rimFlare,r))}},ag={id:"vase",label:"Ваза",examples:"ваза, амфора, кувшин, бутылка, лекиф",defaultHeightMm:260,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:156,unit:"mm"},{key:"dNeck",label:"Горло",min:12,max:200,step:1,default:54,unit:"mm"},{key:"dRim",label:"Устье",min:14,max:260,step:1,default:76,unit:"mm"},{key:"dFoot",label:"Дно",min:18,max:260,step:1,default:78,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.2,max:.7,step:.01,default:.4,unit:"x"},{key:"neckAt",label:"Высота горла",min:.5,max:.95,step:.01,default:.79,unit:"x"},{key:"footH",label:"Ножка",min:0,max:90,step:1,default:12,unit:"mm"},{key:"rimFlare",label:"Отгиб венчика",min:-.2,max:.8,step:.01,default:0,unit:"x",hint:"раструб сверх диаметра устья"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,s=n.dNeck/2,r=n.dRim/2*(1+n.rimFlare),a=Zn(n.bellyAt,.12,.72),o=Zn(n.neckAt,a+.12,.96),l=Zn(n.footH/Math.max(1,t),0,a-.06),c=[{t:0,r:e}];return l>.015&&c.push({t:l,r:e}),c.push({t:a,r:i}),c.push({t:o,r:s}),c.push({t:1,r}),c.map(h=>({t:h.t,r:Math.max(fn,h.r)}))}},Qs=[ig,sg,rg,ag];Qs.map(n=>n.id);function Tc(n){return Qs.some(t=>t.id===n)}function ii(n){const t=Qs.find(e=>e.id===n);if(!t)throw new Error(`unknown vessel family: ${n}`);return t}function og(n){const t={};for(const e of ii(n).params)t[e.key]=e.default;return t}function tr(n,t){const e={};for(const i of ii(n).params){const s=t[i.key];e[i.key]=typeof s=="number"&&Number.isFinite(s)?Zn(s,i.min,i.max):i.default}return e}function Ka(n,t,e){const i=ii(n),s=tr(n,t),r=i.points(s,e);return r.sort((a,o)=>a.t-o.t),{familyId:n,heightMm:e,points:r}}function sn(n,t){const e=n.points;if(e.length===1||t<=e[0].t)return e[0].r;const i=e[e.length-1];if(t>=i.t)return i.r;let s=0;for(;s<e.length-2&&e[s+1].t<=t;)s++;const r=e[s],a=e[s+1],o=a.t-r.t;if(o<=0)return a.r;const[l,c]=lg(e,s),h=(t-r.t)/o,u=h*h,f=u*h,m=(2*f-3*u+1)*r.r+(f-2*u+h)*o*l+(-2*f+3*u)*a.r+(f-u)*o*c;return Math.max(fn,m)}function qi(n,t){const e=n[t+1].t-n[t].t;return e>0?(n[t+1].r-n[t].r)/e:0}function lg(n,t){const e=n.length,i=h=>h===0?qi(n,0):h===e-1?qi(n,e-2):(qi(n,h-1)+qi(n,h))/2,s=qi(n,t);if(s===0)return[0,0];let r=i(t),a=i(t+1);r*s<0&&(r=0),a*s<0&&(a=0);const o=r/s,l=a/s,c=o*o+l*l;if(c>9){const h=3/Math.sqrt(c);r=h*o*s,a=h*l*s}return[r,a]}const Ml="http://www.w3.org/2000/svg",Da=30,ks=34;function cg(n){const t=Ka(n.id,{},n.defaultHeightMm),e=40,i=[];let s=0;for(let u=0;u<=e;u++){const f=sn(t,u/e);i.push(f),f>s&&(s=f)}const r=Math.min(Da/(2*s),ks/t.heightMm),a=Da/2,o=ks-(ks-t.heightMm*r)/2,l=(u,f)=>{const m=a+f*i[u]*r,_=o-u/e*t.heightMm*r;return`${m.toFixed(2)},${_.toFixed(2)}`},c=Array.from({length:e+1},(u,f)=>l(f,1)),h=Array.from({length:e+1},(u,f)=>l(e-f,-1));return`M${c.concat(h).join("L")}Z`}function hg(n,t,e){n.textContent="";const i=new Map;for(const s of Qs){const r=Ot("button","family-btn");r.type="button",r.title=s.examples,r.setAttribute("aria-pressed",String(s.id===t));const a=document.createElementNS(Ml,"svg");a.setAttribute("viewBox",`0 0 ${Da} ${ks}`),a.setAttribute("aria-hidden","true");const o=document.createElementNS(Ml,"path");o.setAttribute("d",cg(s)),a.append(o),r.append(a,Ot("span",void 0,s.label)),r.addEventListener("click",()=>e(s.id)),n.append(r),i.set(s.id,r)}return{setActive(s){for(const[r,a]of i)a.setAttribute("aria-pressed",String(r===s))}}}function Or(n,t){return n.unit==="mm"?`${Math.round(t)}`:t.toFixed(2)}function ug(n,t,e,i,s="p"){n.textContent="";const r=new Map,a=new Map;for(const o of t){const l=Ot("label","row"),c=Ot("span",void 0,o.label);o.hint&&(c.title=o.hint);const h=Ot("input");h.type="range",h.id=`${s}_${o.key}`,h.min=String(o.min),h.max=String(o.max),h.step=String(o.step),h.value=String(e[o.key]??o.default);const u=Ot("output",void 0,Or(o,Number(h.value))),f=Ot("button","adj-btn","−"),m=Ot("button","adj-btn","+");for(const[_,g]of[[f,-1],[m,1]])_.type="button",_.dataset.slider=h.id,_.dataset.dir=String(g),_.tabIndex=-1;h.addEventListener("input",()=>{const _=Number(h.value);u.textContent=Or(o,_),i(o.key,_)}),l.append(c,f,h,m,u),n.append(l),r.set(o.key,u),a.set(o.key,h)}return{setValues(o){for(const l of t){const c=o[l.key];if(typeof c!="number")continue;const h=a.get(l.key),u=r.get(l.key);h&&(h.value=String(c)),u&&(u.textContent=Or(l,c))}}}}const dg=["sin","tri","square","rounded"],fg=["z","theta","spiral"],pg=["weave","modulate"],Ys=Math.PI*2,Ac=4,mg=Math.tanh(Ac),Ye=(n,t,e)=>Math.min(e,Math.max(t,n)),_g=n=>n-Math.floor(n);function Sl(n,t){const e=_g(t);switch(n){case"sin":return Math.sin(Ys*e);case"tri":return e<.25?4*e:e<.75?2-4*e:4*e-4;case"square":return Math.tanh(Ac*Math.sin(Ys*e))/mg;case"rounded":{const i=e<.5?e:e-.5,s=Math.sqrt(Math.max(0,1-(4*i-1)*(4*i-1)));return e<.5?s:-s}}}function El(n,t,e,i){switch(n){case"z":return e;case"theta":return t/Ys;case"spiral":return e+i*t/Ys}}function yl(n){const t=Ye(n,0,1);return t*t*(3-2*t)}function gg(n,t){const e=Math.max(n.fade,1e-6);return yl((t-n.from)/e)*yl((n.to-t)/e)}function vg(n,t,e){const{wave:i,wave2:s}=n;if(!i.on||i.ampMm===0)return 0;const r=s.on?Sl(s.shape,s.freq*El(s.axis,t,e,s.spiralK)+s.phase):0;let a=i.phase,o=i.ampMm;s.on&&s.mode==="modulate"&&(a+=s.fm*r,o*=Math.max(0,1+s.am*r));const l=Sl(i.shape,i.freq*El(i.axis,t,e,i.spiralK)+a),c=s.on&&s.mode==="weave"?l*r:l;return o*c*gg(n.zone,e)}function Za(){return{wave:{on:!1,axis:"z",shape:"rounded",freq:12,ampMm:2,phase:0,spiralK:1},wave2:{on:!1,mode:"weave",axis:"theta",shape:"sin",freq:8,phase:0,fm:.2,am:.5,spiralK:1},zone:{from:.08,to:.95,fade:.06}}}function Ds(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const ze=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t,bl=(n,t)=>typeof n=="boolean"?n:t;function Tl(n,t){for(const e of dg)if(n===e)return e;return t}function Al(n,t){for(const e of fg)if(n===e)return e;return t}function xg(n,t){for(const e of pg)if(n===e)return e;return t}const Ja=64,js=20,Oi=12;function wl(n,t){const e=Ye(t,0,Ja);return n==="z"?e:Math.round(e)}function Rl(n,t,e){const i=Ye(e,-Oi,Oi);return n!=="spiral"||t<1?i:Math.round(t*i)/t}function Mg(n){const t=Ds(n),e=Za(),i=Ds(t.wave),s=Al(i.axis,e.wave.axis),r=wl(s,ze(i.freq,e.wave.freq)),a={on:bl(i.on,e.wave.on),axis:s,shape:Tl(i.shape,e.wave.shape),freq:r,ampMm:Ye(ze(i.ampMm,e.wave.ampMm),-js,js),phase:Ye(ze(i.phase,e.wave.phase),-1,1),spiralK:Rl(s,r,ze(i.spiralK,e.wave.spiralK))},o=Ds(t.wave2),l=Al(o.axis,e.wave2.axis),c=wl(l,ze(o.freq,e.wave2.freq)),h={on:bl(o.on,e.wave2.on),mode:xg(o.mode,e.wave2.mode),axis:l,shape:Tl(o.shape,e.wave2.shape),freq:c,phase:Ye(ze(o.phase,e.wave2.phase),-1,1),fm:Ye(ze(o.fm,e.wave2.fm),-1,1),am:Ye(ze(o.am,e.wave2.am),0,1),spiralK:Rl(l,c,ze(o.spiralK,e.wave2.spiralK))},u=Ds(t.zone),f=Ye(ze(u.from,e.zone.from),0,1),m=Ye(ze(u.to,e.zone.to),0,1),_={from:Math.min(f,m),to:Math.max(f,m),fade:Ye(ze(u.fade,e.zone.fade),0,.5)};return{wave:a,wave2:h,zone:_}}const wc=["rope","zigzag","dots","diamonds","dashes","lattice","meander","band"],La=Math.PI*2,Cl=.12,Sg=.075,Ve=(n,t,e)=>Math.min(e,Math.max(t,n)),Ci=n=>n-Math.floor(n);function Ua(n){const t=Ve(n,0,1);return t*t*(3-2*t)}function Hs(n,t){const e=Math.abs(n);return e<t?.5*(1+Math.cos(Math.PI*e/t)):0}function Ls(n,t=.5){return Hs(Ci(n+.5)-.5,t)}const Eg=[[0,.15,1,.15],[.95,.15,.95,.85],[.95,.85,.15,.85],[.15,.85,.15,.45],[.15,.45,.55,.45]];function yg(n,t,e,i,s,r,a){const o=(n-e)*a.elementMm,l=(t-i)*a.bandMm,c=(s-e)*a.elementMm,h=(r-i)*a.bandMm,u=c*c+h*h,f=u>1e-12?Ve((o*c+l*h)/u,0,1):0;return Math.hypot(o-f*c,l-f*h)}function bg(n,t,e,i){switch(n){case"rope":return Ls(t-e);case"zigzag":{const s=.5*Math.abs(2*e-1);return Ls(t-s,.4)}case"dots":return Tg(t,e,i);case"diamonds":{const s=(Math.abs(Ci(t)-.5)+Math.abs(e-.5))*2;return Ua(1-s)}case"dashes":return Hs(Ci(t)-.5,.22)*Hs(e-.5,.35);case"lattice":return Math.max(Ls(t-e,.22),Ls(t+e,.22));case"meander":{const s=Sg*Math.min(i.elementMm,i.bandMm);let r=1/0;const a=Ci(t);for(const[o,l,c,h]of Eg)r=Math.min(r,yg(a,e,o,l,c,h,i));return Hs(r,s)}case"band":return Math.sqrt(Math.max(0,1-(2*e-1)*(2*e-1)))}}function Tg(n,t,e){const i=Math.min(e.elementMm,e.bandMm)/2;if(i<=0)return 0;const s=(Ci(n)-.5)*e.elementMm,r=(t-.5)*e.bandMm,a=Math.hypot(s,r);if(a>=i)return 0;const o=Math.max(e.depthMm,1e-6),l=(i*i+o*o)/(2*o),c=Math.sqrt(Math.max(0,l*l-a*a))-(l-o);return Ve(c/o,0,1)}function Rc(n,t){if(n.repeats>=3)return Math.round(n.repeats);const e=La*Math.max(1,t.radiusAt(n.bandCenter));return Ve(Math.round(e/Math.max(1,n.bandWidthMm)),3,Qa)}function Ag(n,t){const e=[];for(const i of n.bands){if(!i.on||i.depthMm===0)continue;const s=Rc(i,t),r=La*Math.max(1,t.radiusAt(i.bandCenter))/s,a=Ve(1-i.gapMm/r,.15,1),o=Ve(i.bandWidthMm/Math.max(1,t.heightMm),1e-4,1);e.push({pattern:i.pattern,bottom:i.bandCenter-o/2,bandH:o,repeats:s,fill:a,depthMm:i.depthMm,angle:i.angle,tile:{elementMm:r*a,bandMm:i.bandWidthMm,depthMm:Math.abs(i.depthMm)}})}return e.length===0?()=>0:(i,s)=>{let r=0;for(const a of e){const o=(s-a.bottom)/a.bandH;if(o<0||o>1)continue;const l=a.repeats*(i/La)+a.angle*o,c=(Ci(l)-.5)/a.fill+.5;if(c<0||c>1)continue;const h=Ua(o/Cl)*Ua((1-o)/Cl);r+=bg(a.pattern,c,o,a.tile)*h*a.depthMm}return r}}const Qa=400,$s=8,Cc=200,Pc=100,Ia=4;function to(){return{on:!1,pattern:"rope",bandCenter:.62,bandWidthMm:14,depthMm:1.2,repeats:0,gapMm:0,angle:0}}function eo(){return{bands:[to()]}}function Dc(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const xi=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t;function Pl(n){const t=Dc(n),e=to();let i=e.pattern;for(const r of wc)t.pattern===r&&(i=r);const s=xi(t.repeats,e.repeats);return{on:typeof t.on=="boolean"?t.on:e.on,pattern:i,bandCenter:Ve(xi(t.bandCenter,e.bandCenter),0,1),bandWidthMm:Ve(xi(t.bandWidthMm,e.bandWidthMm),1,Cc),depthMm:Ve(xi(t.depthMm,e.depthMm),-$s,$s),repeats:s<3?0:Ve(Math.round(s),3,Qa),gapMm:Ve(xi(t.gapMm,e.gapMm),0,Pc),angle:Ve(xi(t.angle,e.angle),-2,2)}}function wg(n){const t=Dc(n);return Array.isArray(t.bands)?{bands:t.bands.slice(0,Ia).map(Pl)}:Object.keys(t).length>0?{bands:[Pl(t)]}:eo()}function Rg(n){return n>=1?0:n>=.1?1:2}function Br(n,t){const e=t.toFixed(Rg(n.step));return n.unit?`${e}`:e}function gn(n,t,e,i,s){n.textContent="";const r=[];for(const a of t){const o=Ot("label","row"),l=Ot("span",void 0,a.label);if(a.hint&&(l.title=a.hint),o.append(l),a.kind==="select"){const h=Ot("select");h.id=`${s}_${a.key}`;for(const u of a.options){const f=Ot("option",void 0,u.label);f.value=u.value,h.append(f)}h.value=a.get(e()),h.addEventListener("change",()=>i(a.set(e(),h.value))),o.append(h),r.push(u=>{h.value=a.get(u)})}else{const h=Ot("input");h.type="range",h.id=`${s}_${a.key}`,h.min=String(a.min),h.max=String(a.max),h.step=String(a.step),h.value=String(a.get(e()));const u=Ot("output",void 0,Br(a,a.get(e()))),f=Ot("button","adj-btn","−"),m=Ot("button","adj-btn","+");for(const[_,g]of[[f,-1],[m,1]])_.type="button",_.dataset.slider=h.id,_.dataset.dir=String(g),_.tabIndex=-1;h.addEventListener("input",()=>{const _=Number(h.value);u.textContent=Br(a,_),i(a.set(e(),_))}),o.append(f,h,m,u),r.push(_=>{const g=a.get(_);h.value=String(g),u.textContent=Br(a,g)})}const c=a.when;if(c){const h=u=>{o.hidden=!c(u)};h(e()),r.push(h)}n.append(o)}return{sync(a){for(const o of r)o(a)}}}function $i(n,t){const e=Ot("section","fcard");e.id=`card_${t.id}`;const i=Ot("div","fcard-head"),s=Ot("input");s.type="checkbox",s.checked=t.enabled,s.id=`on_${t.id}`;const r=Ot("span","fcard-title",t.title),a=Ot("span","fcard-caret",t.enabled?"▾":"▸");i.append(s,r),t.tag&&i.append(Ot("span","fcard-tag",t.tag)),i.append(a);const o=Ot("div","fcard-body");t.desc&&o.append(Ot("p","fcard-desc",t.desc));const l=Ot("div");o.append(l);function c(u){e.classList.toggle("collapsed",u),a.textContent=u?"▸":"▾"}c(!t.enabled),s.addEventListener("click",u=>{u.stopPropagation(),c(!s.checked),t.onToggle(s.checked)}),i.addEventListener("click",()=>c(!e.classList.contains("collapsed"))),e.append(i,o),n.append(e);let h=t.enabled;return{body:l,setEnabled(u){s.checked=u,u!==h&&(c(!u),h=u)}}}const Lc=[{value:"z",label:"по высоте"},{value:"theta",label:"вокруг оси"},{value:"spiral",label:"по спирали"}],Uc=[{value:"sin",label:"синус"},{value:"tri",label:"треугольник"},{value:"square",label:"меандр"},{value:"rounded",label:"валики"}],Cg=[{value:"band",label:"полоса"},{value:"rope",label:"верёвочка"},{value:"meander",label:"греческий меандр"},{value:"zigzag",label:"зигзаг"},{value:"dots",label:"точки"},{value:"diamonds",label:"ромбы"},{value:"dashes",label:"насечки"},{value:"lattice",label:"сетка"}],Pg=[{value:"weave",label:"плетение (w₁ × w₂)"},{value:"modulate",label:"модуляция (w₂ гнёт w₁)"}],Ic="работает при оси «по спирали»",Dg=[{kind:"select",key:"axis",label:"Куда бежит",options:Lc,get:n=>n.wave.axis,set:(n,t)=>({...n,wave:{...n.wave,axis:Nc(t)}})},{kind:"select",key:"shape",label:"Форма",options:Uc,get:n=>n.wave.shape,set:(n,t)=>({...n,wave:{...n.wave,shape:Fc(t)}})},{kind:"range",key:"freq",label:"Гребней",min:0,max:Ja,step:1,get:n=>n.wave.freq,set:(n,t)=>({...n,wave:{...n.wave,freq:t}})},{kind:"range",key:"amp",label:"Глубина",min:-js,max:js,step:.1,unit:"мм",get:n=>n.wave.ampMm,set:(n,t)=>({...n,wave:{...n.wave,ampMm:t}})},{kind:"range",key:"phase",label:"Фаза",min:-1,max:1,step:.01,get:n=>n.wave.phase,set:(n,t)=>({...n,wave:{...n.wave,phase:t}})},{kind:"range",key:"spiralK",label:"Шаг спирали",min:-Oi,max:Oi,step:.05,hint:Ic,get:n=>n.wave.spiralK,set:(n,t)=>({...n,wave:{...n.wave,spiralK:t}})},{kind:"range",key:"zoneFrom",label:"Зона снизу",min:0,max:1,step:.01,hint:"ниже этой доли высоты рельефа нет",get:n=>n.zone.from,set:(n,t)=>({...n,zone:{...n.zone,from:t}})},{kind:"range",key:"zoneTo",label:"Зона сверху",min:0,max:1,step:.01,get:n=>n.zone.to,set:(n,t)=>({...n,zone:{...n.zone,to:t}})},{kind:"range",key:"zoneFade",label:"Растушёвка",min:0,max:.5,step:.01,get:n=>n.zone.fade,set:(n,t)=>({...n,zone:{...n.zone,fade:t}})}],Lg=[{kind:"select",key:"mode",label:"Как связаны",options:Pg,hint:"плетение — простое произведение волн: корзинка, вафля",get:n=>n.wave2.mode,set:(n,t)=>({...n,wave2:{...n.wave2,mode:t==="modulate"?"modulate":"weave"}})},{kind:"select",key:"axis2",label:"Куда бежит",options:Lc,get:n=>n.wave2.axis,set:(n,t)=>({...n,wave2:{...n.wave2,axis:Nc(t)}})},{kind:"select",key:"shape2",label:"Форма",options:Uc,get:n=>n.wave2.shape,set:(n,t)=>({...n,wave2:{...n.wave2,shape:Fc(t)}})},{kind:"range",key:"freq2",label:"Гребней",min:0,max:Ja,step:1,get:n=>n.wave2.freq,set:(n,t)=>({...n,wave2:{...n.wave2,freq:t}})},{kind:"range",key:"phase2",label:"Фаза",min:-1,max:1,step:.01,get:n=>n.wave2.phase,set:(n,t)=>({...n,wave2:{...n.wave2,phase:t}})},{kind:"range",key:"spiralK2",label:"Шаг спирали",min:-Oi,max:Oi,step:.05,hint:Ic,get:n=>n.wave2.spiralK,set:(n,t)=>({...n,wave2:{...n.wave2,spiralK:t}})}],Ug=[{kind:"range",key:"fm",label:"Гнёт фазу",min:-1,max:1,step:.01,hint:"вторая волна сдвигает гребни первой",get:n=>n.wave2.fm,set:(n,t)=>({...n,wave2:{...n.wave2,fm:t}})},{kind:"range",key:"am",label:"Гнёт глубину",min:0,max:1,step:.01,hint:"вторая волна то усиливает, то гасит первую",get:n=>n.wave2.am,set:(n,t)=>({...n,wave2:{...n.wave2,am:t}})}];function Ig(n){const t=i=>i.bands[n],e=(i,s)=>({bands:i.bands.map((r,a)=>a===n?s:r)});return[{kind:"select",key:"pattern",label:"Узор",options:Cg,get:i=>t(i).pattern,set:(i,s)=>e(i,{...t(i),pattern:Ng(s)})},{kind:"range",key:"bandCenter",label:"Высота пояса",min:0,max:1,step:.01,get:i=>t(i).bandCenter,set:(i,s)=>e(i,{...t(i),bandCenter:s})},{kind:"range",key:"bandWidth",label:"Ширина",min:1,max:Cc,step:1,unit:"мм",get:i=>t(i).bandWidthMm,set:(i,s)=>e(i,{...t(i),bandWidthMm:s})},{kind:"range",key:"depth",label:"Глубина",min:-$s,max:$s,step:.1,unit:"мм",hint:"> 0 — выпуклый узор, < 0 — вдавленный",get:i=>t(i).depthMm,set:(i,s)=>e(i,{...t(i),depthMm:s})},{kind:"range",key:"repeats",label:"Оттисков",min:0,max:Qa,step:1,hint:"0 — подобрать по размеру изделия",get:i=>t(i).repeats,set:(i,s)=>e(i,{...t(i),repeats:s})},{kind:"range",key:"gap",label:"Просвет",min:0,max:Pc,step:.5,unit:"мм",hint:"гладкая полоска между соседними оттисками",get:i=>t(i).gapMm,set:(i,s)=>e(i,{...t(i),gapMm:s})},{kind:"range",key:"angle",label:"Наклон",min:-2,max:2,step:.05,get:i=>t(i).angle,set:(i,s)=>e(i,{...t(i),angle:s})}]}function Nc(n){return n==="theta"||n==="spiral"?n:"z"}function Fc(n){return n==="tri"||n==="square"||n==="rounded"?n:"sin"}function Ng(n){for(const t of wc)if(n===t)return t;return"rope"}function Fg(n,t,e){let i=[],s=[],r=-1;const a=Ot("button","tb-btn","+ Полоса");a.type="button",a.addEventListener("click",()=>{const c=t().bands;c.length>=Ia||e({bands:[...c,{...to(),on:!0,bandCenter:o(c)}]})});function o(c){for(const h of[.62,.3,.85,.46])if(c.every(u=>Math.abs(u.bandCenter-h)>.08))return h;return .5}function l(c){n.textContent="",i=[],s=[];for(let h=0;h<c;h++){const u=Ot("div","band-box"),f=Ot("div","band-head");f.append(Ot("span",void 0,`Полоса ${h+1}`));const m=Ot("button","adj-btn band-del","✕");m.type="button",m.title="Убрать полосу",m.addEventListener("click",()=>{e({bands:t().bands.filter((p,d)=>d!==h)})}),f.append(m),u.append(f);const _=Ot("div");u.append(_),i.push(gn(_,Ig(h),t,e,`roul${h}`));const g=Ot("p","fcard-desc");u.append(g),s.push(g),n.append(u)}n.append(a),r=c}return{sync(c,h){c.bands.length!==r&&l(c.bands.length),a.hidden=c.bands.length>=Ia;for(let u=0;u<c.bands.length;u++)i[u].sync(c),s[u].textContent=h(c.bands[u])}}}function Og(n,t,e,i,s){n.textContent="";const r=$i(n,{id:"wave",title:"Волна",desc:"Смещает поверхность вдоль нормали. Глубина — в миллиметрах.",enabled:t().wave.on,onToggle:_=>i({...t(),wave:{...t().wave,on:_}})}),a=gn(r.body,Dg,t,i,"wave"),o=$i(n,{id:"wave2",title:"Волна волны",tag:"2-й порядок",desc:"Плетение — произведение двух волн: корзинка, вафля. Модуляция — вторая волна гнёт первую.",enabled:t().wave2.on,onToggle:_=>i({...t(),wave2:{...t().wave2,on:_}})}),l=gn(o.body,Lg,t,i,"wave2"),c=Ot("div");o.body.append(c);const h=gn(c,Ug,t,i,"wave2"),u=$i(n,{id:"roulette",title:"Накатка роликом",desc:"Колесо-штамп прокатывается по пояску. За оборот всегда укладывается целое число оттисков.",enabled:e().bands.some(_=>_.on),onToggle:_=>s({bands:e().bands.map(g=>({...g,on:_}))})}),f=Fg(u.body,e,s);let m=()=>"";return{sync(_,g){r.setEnabled(_.wave.on),o.setEnabled(_.wave2.on),u.setEnabled(g.bands.some(p=>p.on)),a.sync(_),l.sync(_),c.hidden=_.wave2.mode!=="modulate",h.sync(_),f.sync(g,m)},setBandNote(_){m=_}}}function Bg(n){return n.wrapV?n.nv:n.nv+1}function zg(n,t,e){if(n<3||t<1)throw new Error(`sampleGrid: bad dims ${n}x${t}`);const i=new Float32Array(n*(t+1)*3),s=new Float64Array(3);for(let r=0;r<=t;r++){const a=r/t;for(let o=0;o<n;o++){const l=2*Math.PI*o/n;e(l,a,s);const c=(r*n+o)*3;i[c]=s[0],i[c+1]=s[1],i[c+2]=s[2]}}return{nu:n,nv:t,positions:i}}function kg(n,t,e=!1){const i=t,s=e?t:t+1,r=new Uint32Array(n*i*6);let a=0;for(let o=0;o<i;o++){const l=e?(o+1)%s:o+1;for(let c=0;c<n;c++){const h=(c+1)%n,u=o*n+c,f=o*n+h,m=l*n+h,_=l*n+c;r[a++]=u,r[a++]=f,r[a++]=m,r[a++]=u,r[a++]=m,r[a++]=_}}return r}function Hg(n,t,e=[]){const{nu:i,nv:s}=n,r=i*(s+1),a=e.length,o=2*r+a*i+2,l=new Float32Array(o*3);l.set(n.positions,0),l.set(t,r*3);const c=0,h=r,u=2*r;for(let T=0;T<a;T++)l.set(e[T],(u+T*i)*3);const f=u+a*i,m=f+1,_=i*s*2*2,g=i*2,p=i*2*(a+1),d=new Uint32Array((_+g+p)*3);let y=0;for(let T=0;T<s;T++)for(let P=0;P<i;P++){const S=(P+1)%i,x=c+T*i+P,C=c+T*i+S,H=c+(T+1)*i+S,O=c+(T+1)*i+P;d[y++]=x,d[y++]=C,d[y++]=H,d[y++]=x,d[y++]=H,d[y++]=O}for(let T=0;T<s;T++)for(let P=0;P<i;P++){const S=(P+1)%i,x=h+T*i+P,C=h+(T+1)*i+P,H=h+(T+1)*i+S,O=h+T*i+S;d[y++]=x,d[y++]=C,d[y++]=H,d[y++]=x,d[y++]=H,d[y++]=O}const b=(T,P)=>{let S=0,x=0,C=0;for(let H=0;H<i;H++){const O=(T+H)*3;S+=l[O],x+=l[O+1],C+=l[O+2]}l[P*3]=S/i,l[P*3+1]=x/i,l[P*3+2]=C/i};b(c,f),b(h,m);for(let T=0;T<i;T++)d[y++]=f,d[y++]=c+(T+1)%i,d[y++]=c+T;for(let T=0;T<i;T++)d[y++]=m,d[y++]=h+T,d[y++]=h+(T+1)%i;const E=c+s*i,D=h+s*i,w=T=>T<0?E:T>=a?D:u+T*i;for(let T=-1;T<a;T++){const P=w(T),S=w(T+1);for(let x=0;x<i;x++){const C=(x+1)%i;d[y++]=P+x,d[y++]=P+C,d[y++]=S+C,d[y++]=P+x,d[y++]=S+C,d[y++]=S+x}}return{positions:l,indices:d}}function Oc(n,t){const{nu:e,nv:i,positions:s}=n,r=kg(e,i),a=2,o=e*(i+1),l=new Float32Array((o+a)*3);l.set(s);const c=e+e,h=new Uint32Array(r.length+c*3);h.set(r);let u=r.length,f=o;const m=_=>{let g=0,p=0,d=0;for(let y=0;y<e;y++){const b=(_*e+y)*3;g+=s[b],p+=s[b+1],d+=s[b+2]}return[g/e,p/e,d/e]};{const _=f++,[g,p,d]=m(0);l[_*3]=g,l[_*3+1]=p,l[_*3+2]=d;for(let y=0;y<e;y++)h[u++]=_,h[u++]=(y+1)%e,h[u++]=y}{const _=f,[g,p,d]=m(i);l[_*3]=g,l[_*3+1]=p,l[_*3+2]=d;const y=i*e;for(let b=0;b<e;b++)h[u++]=_,h[u++]=y+b,h[u++]=y+(b+1)%e}return{positions:l,indices:h}}function Vg(n){const{nu:t,nv:e,positions:i}=n,s=Bg(n),r=new Float32Array(t*s*3),a=(o,l,c)=>i[(l*t+(o+t)%t)*3+c];for(let o=0;o<s;o++){const l=n.wrapV?(o-1+s)%s:Math.max(0,o-1),c=n.wrapV?(o+1)%s:Math.min(e,o+1);for(let h=0;h<t;h++){const u=a(h+1,o,0)-a(h-1,o,0),f=a(h+1,o,1)-a(h-1,o,1),m=a(h+1,o,2)-a(h-1,o,2),_=a(h,c,0)-a(h,l,0),g=a(h,c,1)-a(h,l,1),p=a(h,c,2)-a(h,l,2);let d=f*p-m*g,y=m*_-u*p,b=u*g-f*_;const E=Math.hypot(d,y,b);E>1e-12?(d/=E,y/=E,b/=E):(d=0,y=0,b=o===0?-1:1);const D=(o*t+h)*3;r[D]=d,r[D+1]=y,r[D+2]=b}}return r}function er(n,t){const e=new Float32Array(n.length);for(let i=0;i<t.length;i+=3){const s=t[i]*3,r=t[i+1]*3,a=t[i+2]*3,o=n[r]-n[s],l=n[r+1]-n[s+1],c=n[r+2]-n[s+2],h=n[a]-n[s],u=n[a+1]-n[s+1],f=n[a+2]-n[s+2],m=l*f-c*u,_=c*h-o*f,g=o*u-l*h;for(const p of[s,r,a])e[p]+=m,e[p+1]+=_,e[p+2]+=g}for(let i=0;i<e.length;i+=3){const s=Math.hypot(e[i],e[i+1],e[i+2]);s>1e-12&&(e[i]/=s,e[i+1]/=s,e[i+2]/=s)}return e}function no(n,t,e,i,s){const r=1-s,a=r*r*r,o=3*r*r*s,l=3*r*s*s,c=s*s*s;return{x:a*n.x+o*t.x+l*e.x+c*i.x,y:a*n.y+o*t.y+l*e.y+c*i.y,z:a*n.z+o*t.z+l*e.z+c*i.z}}function Bc(n,t,e,i,s){const r=1-s,a=3*r*r,o=6*r*s,l=3*s*s;return{x:a*(t.x-n.x)+o*(e.x-t.x)+l*(i.x-e.x),y:a*(t.y-n.y)+o*(e.y-t.y)+l*(i.y-e.y),z:a*(t.z-n.z)+o*(e.z-t.z)+l*(i.z-e.z)}}function zc(n,t,e,i,s){const r=i+1,a=r*s+2,o=new Float32Array(a*3);for(let _=0;_<r;_++){const g=_/i,p=n(g),d=Ll(t(g)),y={x:0,y:1,z:0},b=Ll(Wg(d,y)),{halfDepth:E,halfWidth:D}=e(g);for(let w=0;w<s;w++){const T=2*Math.PI*w/s,P=Math.cos(T)*E,S=Math.sin(T)*D,x=(_*s+w)*3;o[x]=p.x+b.x*P+y.x*S,o[x+1]=p.y+b.y*P+y.y*S,o[x+2]=p.z+b.z*P+y.z*S}}const l=r*s,c=l+1;Dl(o,0,s,l),Dl(o,(r-1)*s,s,c);const h=i*s*2,u=new Uint32Array((h+s*2)*3);let f=0;for(let _=0;_<i;_++)for(let g=0;g<s;g++){const p=(g+1)%s,d=_*s+g,y=_*s+p,b=(_+1)*s+p,E=(_+1)*s+g;u[f++]=d,u[f++]=b,u[f++]=y,u[f++]=d,u[f++]=E,u[f++]=b}for(let _=0;_<s;_++){const g=(_+1)%s;u[f++]=l,u[f++]=_,u[f++]=g}const m=(r-1)*s;for(let _=0;_<s;_++){const g=(_+1)%s;u[f++]=c,u[f++]=m+g,u[f++]=m+_}return{positions:o,indices:u,normals:er(o,u)}}function Gg(n){const t=new Float32Array(n.positions);for(let i=0;i<t.length;i+=3)t[i]=-t[i];const e=new Uint32Array(n.indices.length);for(let i=0;i<n.indices.length;i+=3)e[i]=n.indices[i],e[i+1]=n.indices[i+2],e[i+2]=n.indices[i+1];return{positions:t,indices:e,normals:er(t,e)}}function Dl(n,t,e,i){let s=0,r=0,a=0;for(let o=0;o<e;o++){const l=(t+o)*3;s+=n[l],r+=n[l+1],a+=n[l+2]}n[i*3]=s/e,n[i*3+1]=r/e,n[i*3+2]=a/e}function Ll(n){const t=Math.hypot(n.x,n.y,n.z);return t<1e-12?{x:0,y:0,z:1}:{x:n.x/t,y:n.y/t,z:n.z/t}}function Wg(n,t){return{x:n.y*t.z-n.z*t.y,y:n.z*t.x-n.x*t.z,z:n.x*t.y-n.y*t.x}}const kc=120,Hc=40,An=75,Xg=2.5,qg=64,Yg=24;function Vc(){return{on:!1,count:1,topAt:.82,bottomAt:.3,reachMm:28,thicknessMm:11,widthRatio:.7,topAngleDeg:0,bottomAngleDeg:0}}const Hn=(n,t,e)=>Math.min(e,Math.max(t,n));function jg(n){const t=Vc(),e={};if(typeof n=="object"&&n!==null)for(const[r,a]of Object.entries(n))e[r]=a;const i=(r,a)=>typeof r=="number"&&Number.isFinite(r)?r:a,s=Hn(i(e.topAt,t.topAt),.15,.98);return{on:typeof e.on=="boolean"?e.on:t.on,count:i(e.count,t.count)>=2?2:1,topAt:s,bottomAt:Hn(i(e.bottomAt,t.bottomAt),.02,s-.1),reachMm:Hn(i(e.reachMm,t.reachMm),3,kc),thicknessMm:Hn(i(e.thicknessMm,t.thicknessMm),3,Hc),widthRatio:Hn(i(e.widthRatio,t.widthRatio),.25,3),topAngleDeg:Hn(i(e.topAngleDeg,t.topAngleDeg),-An,An),bottomAngleDeg:Hn(i(e.bottomAngleDeg,t.bottomAngleDeg),-An,An)}}function $g(n,t,e){if(!n.on)return[];const i=sn(t,n.topAt),s=sn(t,n.bottomAt),r=Math.min(Xg,i*.4,s*.4),a={x:-(i-r),y:0,z:n.topAt*e},o={x:-(s-r),y:0,z:n.bottomAt*e},l=Kg(n,a,o,i,s),[c,h]=Gc(n,a,o,i,s,l),u=n.thicknessMm/2,f=n.thicknessMm*n.widthRatio/2,m=zc(_=>no(a,c,h,o,_),_=>Bc(a,c,h,o,_),()=>({halfDepth:u,halfWidth:f}),qg,Yg);return n.count>=2?[m,Gg(m)]:[m]}function Gc(n,t,e,i,s,r){const a=n.topAngleDeg*Math.PI/180,o=n.bottomAngleDeg*Math.PI/180;return[{x:-(i+r*Math.cos(a)),y:0,z:t.z+r*Math.sin(a)},{x:-(s+r*Math.cos(o)),y:0,z:e.z+r*Math.sin(o)}]}function Kg(n,t,e,i,s){const r=Math.max(i,s),a=c=>{const[h,u]=Gc(n,t,e,i,s,c);let f=0;for(let m=0;m<=64;m++)f=Math.max(f,-no(t,h,u,e,m/64).x);return f-r};let o=0,l=n.reachMm*4+10;for(let c=0;c<40;c++){const h=(o+l)/2;a(h)<n.reachMm?o=h:l=h}return l}const Wc=60,be={attachAt:{min:.2,max:.85},lengthMm:{min:15,max:150},tipAt:{min:.5,max:1.3},baseMm:{min:12,max:80},tipMm:{min:6,max:40},tipAngleDeg:{min:20,max:85}},Zg=.1;function io(){return{on:!1,kind:"lip",pullMm:14,widthDeg:60,zone:.18,attachAt:.45,lengthMm:70,tipAt:1,baseMm:34,tipMm:16,tipAngleDeg:55}}const Ei=(n,t,e)=>Math.min(e,Math.max(t,n)),Jg=(n,t,e)=>n+(t-n)*e;function Qg(n){const t=io(),e={};if(typeof n=="object"&&n!==null)for(const[o,l]of Object.entries(n))e[o]=l;const i=(o,l)=>typeof o=="number"&&Number.isFinite(o)?o:l,s=(o,l)=>{const c=be[o];return Ei(i(l,t[o]),c.min,c.max)},r=s("attachAt",e.attachAt),a=s("baseMm",e.baseMm);return{on:typeof e.on=="boolean"?e.on:t.on,kind:e.kind==="applied"?"applied":"lip",pullMm:Ei(i(e.pullMm,t.pullMm),0,Wc),widthDeg:Ei(i(e.widthDeg,t.widthDeg),15,180),zone:Ei(i(e.zone,t.zone),.03,.6),attachAt:r,lengthMm:s("lengthMm",e.lengthMm),tipAt:Ei(i(e.tipAt,t.tipAt),Math.max(be.tipAt.min,r+Zg),be.tipAt.max),baseMm:a,tipMm:Math.min(s("tipMm",e.tipMm),a),tipAngleDeg:s("tipAngleDeg",e.tipAngleDeg)}}function t0(n){const t=Ei(n,0,1);return t*t*(3-2*t)}function e0(n){if(!n.on||n.kind!=="lip"||n.pullMm===0)return()=>0;const t=n.widthDeg*Math.PI/360,e=1-n.zone;return(i,s)=>{if(s<=e)return 0;const r=Math.abs((i+Math.PI)%(2*Math.PI)-Math.PI);if(r>=t)return 0;const a=.5*(1+Math.cos(Math.PI*r/t));return n.pullMm*a*t0((s-e)/n.zone)}}const n0=2.5,i0=.35,s0=64,r0=24;function a0(n,t,e){const i=sn(t,n.attachAt),s=Math.min(n0,i*.4),r=n.tipAngleDeg*Math.PI/180,a={x:i-s,y:0,z:n.attachAt*e},o={x:i+n.lengthMm,y:0,z:n.tipAt*e},l={x:1,y:0,z:0},c={x:Math.cos(r),y:0,z:Math.sin(r)},h=i0*Math.hypot(o.x-a.x,o.z-a.z);return{p0:a,p1:o,c0:{x:a.x+l.x*h,y:0,z:a.z+l.z*h},c1:{x:o.x-c.x*h,y:0,z:o.z-c.z*h},tan0:l,tan1:c,d:h,baseR:n.baseMm/2,tipR:n.tipMm/2}}function o0(n){return n.on&&n.kind==="applied"}function l0(n,t,e){if(!o0(n))return null;const i=a0(n,t,e);return zc(s=>no(i.p0,i.c0,i.c1,i.p1,s),s=>Bc(i.p0,i.c0,i.c1,i.p1,s),s=>{const r=Jg(i.baseR,i.tipR,s);return{halfDepth:r,halfWidth:r}},s0,r0)}const c0=[{kind:"select",key:"count",label:"Сколько",options:[{value:"1",label:"одна (кружка)"},{value:"2",label:"две (амфора)"}],get:n=>String(n.count),set:(n,t)=>({...n,count:t==="2"?2:1})},{kind:"range",key:"topAt",label:"Верх",min:.15,max:.98,step:.01,hint:"высота верхнего крепления, доля высоты изделия",get:n=>n.topAt,set:(n,t)=>({...n,topAt:t})},{kind:"range",key:"bottomAt",label:"Низ",min:.02,max:.88,step:.01,get:n=>n.bottomAt,set:(n,t)=>({...n,bottomAt:t})},{kind:"range",key:"reach",label:"Вынос",min:3,max:kc,step:1,unit:"мм",hint:"насколько дуга отходит от стенки",get:n=>n.reachMm,set:(n,t)=>({...n,reachMm:t})},{kind:"range",key:"thickness",label:"Толщина",min:3,max:Hc,step:.5,unit:"мм",get:n=>n.thicknessMm,set:(n,t)=>({...n,thicknessMm:t})},{kind:"range",key:"width",label:"Ширина",min:.25,max:3,step:.05,hint:"ширина сечения в долях толщины",get:n=>n.widthRatio,set:(n,t)=>({...n,widthRatio:t})},{kind:"range",key:"topAngle",label:"Угол вверху",min:-An,max:An,step:1,unit:"°",hint:"под каким наклоном дуга отходит от стенки; 0 — под прямым углом",get:n=>n.topAngleDeg,set:(n,t)=>({...n,topAngleDeg:t})},{kind:"range",key:"bottomAngle",label:"Угол внизу",min:-An,max:An,step:1,unit:"°",hint:"отрицательный уводит нижний конец дуги вниз",get:n=>n.bottomAngleDeg,set:(n,t)=>({...n,bottomAngleDeg:t})}],zr=n=>n.kind==="lip",Mi=n=>n.kind==="applied",h0=[{kind:"select",key:"kind",label:"Какой",options:[{value:"lip",label:"оттянутый край (крынка)"},{value:"applied",label:"трубчатый (чайник)"}],get:n=>n.kind,set:(n,t)=>({...n,kind:t==="applied"?"applied":"lip"})},{kind:"range",key:"pull",label:"Вытяг",min:0,max:Wc,step:.5,unit:"мм",when:zr,get:n=>n.pullMm,set:(n,t)=>({...n,pullMm:t})},{kind:"range",key:"width",label:"Ширина",min:15,max:180,step:1,unit:"°",when:zr,get:n=>n.widthDeg,set:(n,t)=>({...n,widthDeg:t})},{kind:"range",key:"zone",label:"Высота",min:.03,max:.6,step:.01,hint:"по какой доле высоты сверху идёт оттяжка",when:zr,get:n=>n.zone,set:(n,t)=>({...n,zone:t})},{kind:"range",key:"attach",label:"Крепление",min:be.attachAt.min,max:be.attachAt.max,step:.01,hint:"на какой доле высоты трубка выходит из стенки",when:Mi,get:n=>n.attachAt,set:(n,t)=>({...n,attachAt:t})},{kind:"range",key:"length",label:"Длина",min:be.lengthMm.min,max:be.lengthMm.max,step:1,unit:"мм",hint:"вынос кончика от стенки по горизонтали",when:Mi,get:n=>n.lengthMm,set:(n,t)=>({...n,lengthMm:t})},{kind:"range",key:"tip",label:"Высота кончика",min:be.tipAt.min,max:be.tipAt.max,step:.01,hint:"доля высоты изделия; ниже венчика — изделие не налить доверху",when:Mi,get:n=>n.tipAt,set:(n,t)=>({...n,tipAt:t})},{kind:"range",key:"base",label:"⌀ основания",min:be.baseMm.min,max:be.baseMm.max,step:1,unit:"мм",when:Mi,get:n=>n.baseMm,set:(n,t)=>({...n,baseMm:t})},{kind:"range",key:"tipD",label:"⌀ кончика",min:be.tipMm.min,max:be.tipMm.max,step:1,unit:"мм",hint:"толще основания не бывает — трубка сужается к устью",when:Mi,get:n=>n.tipMm,set:(n,t)=>({...n,tipMm:t})},{kind:"range",key:"angle",label:"Наклон кончика",min:be.tipAngleDeg.min,max:be.tipAngleDeg.max,step:1,unit:"°",when:Mi,get:n=>n.tipAngleDeg,set:(n,t)=>({...n,tipAngleDeg:t})}];function u0(n,t,e,i,s){n.textContent="";const r=$i(n,{id:"handle",title:"Ручка",desc:"Дуга в плоскости разъёма формы: одна ручка сзади, две — зеркально, как у амфоры.",enabled:t().on,onToggle:c=>i({...t(),on:c})}),a=gn(r.body,c0,t,i,"handle"),o=$i(n,{id:"spout",title:"Носик",desc:"Оттянутый наружу край, как у крынки, или приставная трубка, как у чайника. Смотрит вперёд, напротив ручки.",enabled:e().on,onToggle:c=>s({...e(),on:c})}),l=gn(o.body,h0,e,s,"spout");return{sync(c,h){r.setEnabled(c.on),o.setEnabled(h.on),a.sync(c),l.sync(h)}}}function d0(n,t){const e=[],i=[];if(n.finite||e.push("Mesh contains non-finite coordinates or normals."),n.indicesValid||e.push("Mesh contains invalid triangle indices."),(n.triangleCount===0||n.vertexCount===0)&&e.push("Mesh is empty."),n.extents.some(s=>!Number.isFinite(s)||s<=1e-9)&&e.push("Mesh has zero extent on at least one axis."),n.watertight||e.push("Solid mesh is not watertight."),n.volume<0&&e.push("Solid mesh is oriented inside-out."),n.degenerateTriangles>0){const s=n.triangleCount>0?n.degenerateTriangles/n.triangleCount:1,r=`${n.degenerateTriangles} degenerate triangle(s) (${(s*100).toFixed(2)}%).`;s>.01?e.push(r):i.push(r)}return{blocking:e,warnings:i}}function f0(n,t=60){const{positions:e,indices:i}=n;let s=1/0,r=-1/0;for(let h=2;h<e.length;h+=3)e[h]<s&&(s=e[h]),e[h]>r&&(r=e[h]);const a=s+.02*(r-s),o=Math.sin(t*Math.PI/180);let l=0,c=0;for(let h=0;h<i.length;h+=3){const u=i[h]*3,f=i[h+1]*3,m=i[h+2]*3;if(e[u+2]<a&&e[f+2]<a&&e[m+2]<a)continue;const _=e[f]-e[u],g=e[f+1]-e[u+1],p=e[f+2]-e[u+2],d=e[m]-e[u],y=e[m+1]-e[u+1],b=e[m+2]-e[u+2],E=g*b-p*y,D=p*d-_*b,w=_*y-g*d,T=Math.hypot(E,D,w);T<1e-30||(l+=T,w/T<-o&&(c+=T))}return l>0?c/l:0}function so(n,t){let e=0;for(let i=0;i<t.length;i+=3){const s=t[i]*3,r=t[i+1]*3,a=t[i+2]*3;e+=n[s]*(n[r+1]*n[a+2]-n[r+2]*n[a+1])-n[s+1]*(n[r]*n[a+2]-n[r+2]*n[a])+n[s+2]*(n[r]*n[a+1]-n[r+1]*n[a])}return e/6}function p0(n,t=1e-12){const{positions:e,indices:i}=n;let s=!0;for(const _ of[e,n.normals]){for(let g=0;g<_.length;g++)if(!Number.isFinite(_[g])){s=!1;break}if(!s)break}const r=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(let _=0;_<e.length;_+=3)for(let g=0;g<3;g++){const p=e[_+g];p<r[g]&&(r[g]=p),p>a[g]&&(a[g]=p)}const o=new Map,l=e.length/3;let c=i.length%3===0;for(let _=0;_<i.length;_++)if(i[_]>=l){c=!1;break}const h=(_,g)=>_<g?_*l+g:g*l+_;let u=0;for(let _=0;c&&_<i.length;_+=3){const g=i[_],p=i[_+1],d=i[_+2];for(const[K,G]of[[g,p],[p,d],[d,g]]){const tt=h(K,G);let k=o.get(tt);k||(k={count:0,balance:0},o.set(tt,k)),k.count++,k.balance+=K<G?1:-1}const y=g*3,b=p*3,E=d*3,D=e[b]-e[y],w=e[b+1]-e[y+1],T=e[b+2]-e[y+2],P=e[E]-e[y],S=e[E+1]-e[y+1],x=e[E+2]-e[y+2],C=w*x-T*S,H=T*P-D*x,O=D*S-w*P;Math.hypot(C,H,O)*.5<t&&u++}let f=c&&i.length>0;for(const _ of o.values())if(_.count!==2||_.balance!==0){f=!1;break}const m=[a[0]-r[0],a[1]-r[1],a[2]-r[2]];return{finite:s,indicesValid:c,watertight:f,volume:c?so(e,i):0,bbox:{min:r,max:a},degenerateTriangles:u,triangleCount:i.length/3,vertexCount:l,extents:m}}const m0=8,_0=1024,g0=4,v0=1024,x0=Math.PI*2,M0=.03,Ul=(n,t,e)=>Number.isFinite(n)?Math.min(e,Math.max(t,Math.round(n))):t;function ro(n){const t=Ul(n.nu,m0,_0),e=Ul(n.nv,g0,v0),i=Number.isFinite(n.heightMm)?Math.max(1,n.heightMm):100,s=Ka(n.family,n.shape,i),r=n.relief??Za(),a=n.roulette??eo(),o=Ag(a,{heightMm:i,radiusAt:h=>sn(s,h)}),l=!r.wave.on&&!a.bands.some(h=>h.on),c=e0(n.spout??io());return{profile:s,heightMm:i,nu:t,nv:e,depthAt(h,u){return l?0:(vg(r,h,u)+o(h,u))*S0(u/M0)},pullAt:c}}function Xc(n,t={}){const e=ro(n),{nu:i,nv:s,profile:r,heightMm:a}=e,o=t.minDepthMm??-1/0,l=E0(t.vMax??1),c=m=>m/s*l,h=zg(i,s,(m,_,g)=>{const p=_*l,d=Math.max(fn,sn(r,p));g[0]=d*Math.cos(m),g[1]=d*Math.sin(m),g[2]=p*a}),u=Vg(h),f=h.positions;for(let m=0;m<=s;m++){const _=c(m);for(let g=0;g<i;g++){const p=x0*g/i,d=Math.max(e.depthAt(p,_),o),y=e.pullAt(p,_);if(d===0&&y===0)continue;const b=(m*i+g)*3;let E=f[b]+u[b]*d,D=f[b+1]+u[b+1]*d;const w=f[b+2]+u[b+2]*d,T=Math.hypot(E,D);if(T<fn){const P=T>1e-9?fn/T:0;E=T>1e-9?E*P:fn*Math.cos(p),D=T>1e-9?D*P:fn*Math.sin(p)}if(y!==0){const P=Math.hypot(E,D),S=(P+y)/Math.max(P,1e-9);E*=S,D*=S}f[b]=E,f[b+1]=D,f[b+2]=w}}return h}function S0(n){const t=Math.min(1,Math.max(0,n));return t*t*(3-2*t)}function E0(n){return Number.isFinite(n)?Math.min(1,Math.max(.05,n)):1}function y0(n){const t=Oc(Xc(n));return{...t,normals:er(t.positions,t.indices)}}const ao=.8,oo=60,qc=1,Yc=60,b0=.6,Il=.3,T0=.7,jc=8,kr=8;function $c(){return{wallMm:3,baseMm:4,rimRadiusMm:1.5}}const Vs=(n,t,e)=>Math.min(e,Math.max(t,n));function A0(n){const t=$c(),e={};if(typeof n=="object"&&n!==null)for(const[s,r]of Object.entries(n))e[s]=r;const i=(s,r)=>typeof s=="number"&&Number.isFinite(s)?s:r;return{wallMm:Vs(i(e.wallMm,t.wallMm),ao,oo),baseMm:Vs(i(e.baseMm,t.baseMm),qc,Yc),rimRadiusMm:Vs(i(e.rimRadiusMm,t.rimRadiusMm),0,jc)}}function w0(n,t,e,i,s){if(s<1e-6)return[];const r=[];for(let o=1;o<kr;o++)r.push(new Float32Array(e*3));const a=i*e;for(let o=0;o<e;o++){const l=(a+o)*3,c=Math.hypot(n.positions[l],n.positions[l+1]),h=n.positions[l+2],u=Math.hypot(t[l],t[l+1]),f=t[l+2],m=c>1e-9?n.positions[l]/c:1,_=c>1e-9?n.positions[l+1]/c:0,g=c-u,p=Math.min(s,g/2),d=p*Math.PI/2,y=Math.hypot(g-2*p,h-f),b=2*d+y;for(let E=1;E<kr;E++){const D=b*E/kr;let w,T;if(D<d){const S=D/Math.max(p,1e-9);w=c-p+p*Math.cos(S),T=h+p*Math.sin(S)}else if(D<d+y){const S=y>1e-9?(D-d)/y:0;w=c-p+S*(u+p-(c-p)),T=h+p+S*(f+p-(h+p))}else{const S=Math.PI/2+(D-d-y)/Math.max(p,1e-9);w=u+p+p*Math.cos(S),T=f+p*Math.sin(S)}const P=r[E-1];P[o*3]=w*m,P[o*3+1]=w*_,P[o*3+2]=T}}return r}function Na(n,t,e,i){const r=Math.max(0,i-1e-4),a=Math.min(1,i+1e-4),o=(n(a)-n(r))/Math.max(1e-9,a-r),l=t,c=Math.hypot(o,l),h=l/c,u=-o/c;return{r:n(i)-e*h,z:i*t-e*u}}function R0(n,t,e,i){if(Na(n,t,e,0).z>=i)return 0;let s=0,r=1;for(let a=0;a<48;a++){const o=(s+r)/2;Na(n,t,e,o).z<i?s=o:r=o}return r}function C0(n,t){const e=Vs(t.wallMm,ao,oo),i=-(e-b0),s=ro(n),{nu:r,nv:a,profile:o,heightMm:l}=s,c=D=>sn(o,D),h=Math.min(t.rimRadiusMm,e/2),u=l-h,f=u/l,m=Xc(n,{minDepthMm:i,vMax:f}),_=Math.min(t.baseMm,u*T0),g=R0(c,l,e,_),p=new Float32Array(m.positions.length);let d=0,y=_;for(let D=0;D<=a;D++){const w=g+(f-g)*(D/a),T=Na(c,l,e,w),P=Math.min(Math.max(T.z,_,y),u);y=P;let S=T.r;S<Il&&(S=Math.min(Il,c(w)*.5));for(let x=0;x<r;x++){const C=(D*r+x)*3,H=2*Math.PI*x/r,O=S+s.pullAt(H,P/l);p[C]=O*Math.cos(H),p[C+1]=O*Math.sin(H),p[C+2]=P,s.depthAt(H,w)<i&&d++}}const b=Hg(m,p,w0(m,p,r,a,h)),E=Oc({nu:r,nv:a,positions:p});return{mesh:{...b,normals:er(b.positions,b.indices)},innerGrid:{nu:r,nv:a,positions:p},capacityMl:so(E.positions,E.indices)/1e3,pinchedFraction:d/(r*(a+1))}}const Kc=30,Zc=80,Jc=120;function Qc(){return{shrinkPct:12,plasterMm:28,spareMm:25,keyMm:7,bathWallMm:3,bathClearMm:12}}const Si=(n,t,e)=>Math.min(e,Math.max(t,n));function P0(n){const t=Qc(),e={};if(typeof n=="object"&&n!==null)for(const[r,a]of Object.entries(n))e[r]=a;const i=(r,a)=>typeof r=="number"&&Number.isFinite(r)?r:a,s=Si(i(e.plasterMm,t.plasterMm),5,Zc);return{shrinkPct:Si(i(e.shrinkPct,t.shrinkPct),0,Kc),plasterMm:s,spareMm:Si(i(e.spareMm,t.spareMm),0,Jc),keyMm:Si(i(e.keyMm,t.keyMm),0,s/3),bathWallMm:Si(i(e.bathWallMm,t.bathWallMm),1.2,12),bathClearMm:Si(i(e.bathClearMm,t.bathClearMm),3,60)}}const D0=[{kind:"range",key:"wall",label:"Стенка",min:ao,max:oo,step:.1,unit:"мм",hint:"толщина меряется по нормали к поверхности",get:n=>n.wallMm,set:(n,t)=>({...n,wallMm:t})},{kind:"range",key:"base",label:"Дно",min:qc,max:Yc,step:.5,unit:"мм",get:n=>n.baseMm,set:(n,t)=>({...n,baseMm:t})},{kind:"range",key:"rim",label:"Радиус края",min:0,max:jc,step:.1,unit:"мм",hint:"0 — плоский срез; больше половины стенки не бывает — это уже поднутрение",get:n=>n.rimRadiusMm,set:(n,t)=>({...n,rimRadiusMm:t})}],th={kind:"range",key:"shrink",label:"Усадка",min:0,max:Kc,step:.5,unit:"%",hint:"шликер садится при сушке и обжиге — на столько увеличивается модель",get:n=>n.shrinkPct,set:(n,t)=>({...n,shrinkPct:t})},eh={kind:"range",key:"spare",label:"Горловина",min:0,max:Jc,step:1,unit:"мм",hint:"воротник над венчиком, куда доливают шликер",get:n=>n.spareMm,set:(n,t)=>({...n,spareMm:t})},L0=[th,eh],U0=[th,eh,{kind:"range",key:"plaster",label:"Гипс",min:5,max:Zc,step:1,unit:"мм",hint:"толщина гипса вокруг полости",get:n=>n.plasterMm,set:(n,t)=>({...n,plasterMm:t})},{kind:"range",key:"key",label:"Ключи",min:0,max:25,step:.5,unit:"мм",hint:"радиус замков на плоскости разъёма; 0 — без них",get:n=>n.keyMm,set:(n,t)=>({...n,keyMm:t})},{kind:"range",key:"silicone",label:"Силикон",min:3,max:60,step:1,unit:"мм",hint:"слой силикона над блоком",get:n=>n.bathClearMm,set:(n,t)=>({...n,bathClearMm:t})},{kind:"range",key:"bathWall",label:"Борт",min:1.2,max:12,step:.2,unit:"мм",hint:"толщина стенки печатной опалубки",get:n=>n.bathWallMm,set:(n,t)=>({...n,bathWallMm:t})}];function I0(n,t,e,i,s,r,a,o,l){for(const[g,p]of Object.entries(n))p.disabled=!1,p.addEventListener("click",()=>{(g==="vessel"||g==="master"||g==="bath")&&a(g)});const c=Ot("div"),h=Ot("div"),u=Ot("div");t.textContent="",t.append(c,h,u);const f=gn(c,D0,s,o,"print"),m=gn(h,L0,r,l,"master"),_=gn(u,U0,r,l,"bath");return{sync(g,p,d){for(const[y,b]of Object.entries(n))b.setAttribute("aria-selected",String(y===g));c.hidden=g!=="vessel",h.hidden=g!=="master",u.hidden=g!=="bath",f.sync(p),m.sync(d),_.sync(d)},setParts(g){i.textContent="";for(const p of g){const d=Ot("li");d.append(Ot("span","part-name",p.label)),p.note&&d.append(Ot("span",void 0,p.note)),i.append(d)}},setSchemeNote(g){e.textContent=g}}}function N0(n,t=150){let e=null;function i(r){const a=r.dataset.slider,o=Number(r.dataset.dir);if(!a)return;const l=document.getElementById(a);if(!(l instanceof HTMLInputElement))return;const c=Number(l.step)||1,h=Number(l.min),u=Number(l.max);let f=Number(l.value)+o*c;f=Math.max(h,Math.min(u,f)),l.value=String(f),l.dispatchEvent(new Event("input",{bubbles:!0}))}function s(){e&&(clearInterval(e),e=null)}n.addEventListener("pointerdown",r=>{if(!(r.target instanceof Element))return;const a=r.target.closest(".adj-btn");a instanceof HTMLElement&&(r.preventDefault(),s(),i(a),e=setInterval(()=>i(a),t))}),n.addEventListener("pointerup",s),n.addEventListener("pointerleave",s),n.addEventListener("pointercancel",s),document.addEventListener("pointerup",s)}const F0="rgba(217, 139, 95, 0.20)",O0="#d98b5f",B0="rgba(164, 148, 138, 0.45)",z0="#a4948a";function k0(n,t){const e=n.getContext("2d");if(!e)return;const i=Math.min(window.devicePixelRatio||1,2),s=n.clientWidth||276,r=n.clientHeight||110;(n.width!==Math.round(s*i)||n.height!==Math.round(r*i))&&(n.width=Math.round(s*i),n.height=Math.round(r*i)),e.setTransform(i,0,0,i,0,0),e.clearRect(0,0,s,r);const a=128,o=[];let l=0;for(let g=0;g<=a;g++){const p=sn(t,g/a);o.push(p),p>l&&(l=p)}const c=8,h=6,u=16,f=Math.min((s-2*c)/(2*l),(r-h-u)/t.heightMm),m=s/2,_=r-u;e.beginPath();for(let g=0;g<=a;g++){const p=_-g/a*t.heightMm*f,d=m+o[g]*f;g===0?e.moveTo(d,p):e.lineTo(d,p)}for(let g=a;g>=0;g--)e.lineTo(m-o[g]*f,_-g/a*t.heightMm*f);e.closePath(),e.fillStyle=F0,e.fill(),e.strokeStyle=O0,e.lineWidth=1.5,e.stroke(),e.strokeStyle=B0,e.lineWidth=1,e.setLineDash([3,3]),e.beginPath(),e.moveTo(m,_),e.lineTo(m,_-t.heightMm*f),e.stroke(),e.setLineDash([]),e.fillStyle=z0,e.font="11px system-ui, sans-serif",e.textAlign="center",e.fillText(`⌀${Math.round(l*2)} × ${Math.round(t.heightMm)} мм`,m,r-3)}const H0=.001,V0=.02,G0=.02;function Nl(n,t){const{positions:e,indices:i}=n;let s=1/0,r=-1/0,a=0;for(let f=0;f<e.length;f+=3)e[f+2]<s&&(s=e[f+2]),e[f+2]>r&&(r=e[f+2]),a=Math.max(a,Math.abs(e[f]),Math.abs(e[f+1]));const o=r-V0*(r-s),l=G0*a;let c=0,h=0,u=0;for(let f=0;f<i.length;f+=3){const m=i[f]*3,_=i[f+1]*3,g=i[f+2]*3,p=e[_]-e[m],d=e[_+1]-e[m+1],y=e[_+2]-e[m+2],b=e[g]-e[m],E=e[g+1]-e[m+1],D=e[g+2]-e[m+2],w=d*D-y*E,T=y*b-p*D,P=p*E-d*b,S=Math.hypot(w,T,P);if(S<1e-18)continue;let x;if(t==="up"){const C=P/S,H=(e[m+2]+e[_+2]+e[g+2])/3;if(C>.99&&H>o)continue;x=C}else{const C=(e[m+1]+e[_+1]+e[g+1])/3;if(Math.abs(C)<l)continue;x=-(C>0?T:-T)/S}c+=S,x>H0&&(h+=S,u=Math.max(u,x))}return{fraction:c>0?h/c:0,worst:u}}const W0=.005;function X0(n){const{positions:t}=n;let e=1/0,i=-1/0;for(let o=2;o<t.length;o+=3)t[o]<e&&(e=t[o]),t[o]>i&&(i=t[o]);const s=e+W0*(i-e);let r=0,a=0;for(let o=0;o<t.length;o+=3){const l=Math.hypot(t[o],t[o+1]);l>a&&(a=l),t[o+2]<=s&&l>r&&(r=l)}return a>0?r/a:0}const q0=.002,Y0=.02,j0=.55,Fl={id:"half-A",label:"Половина A"},Ol={id:"half-B",label:"Половина B"},$0={id:"bottom",label:"Донная плита"},K0={id:"single",label:"Форма целиком"};function Z0(n,t){return n.hasHandle?"Ручка делает в теле сквозное отверстие — вверх изделие не вынуть, нужен разъём вдоль оси.":n.hasSpout?"Приставной носик торчит вбок — вверх изделие не вынуть, нужен разъём вдоль оси.":`Изделие где-то шире, чем выше (${(t*100).toFixed(0)} % поверхности с зацепами) — вверх не вынуть, нужен разъём вдоль оси.`}function J0(n,t){const e=Nl(n,"up"),i=Nl(n,"sides"),s=[];if(i.fraction>Y0){const a=Math.asin(Math.min(1,i.worst))*180/Math.PI,o=t.angularRelief?"Рельеф идёт под углом к плоскости разъёма — такую форму пришлось бы вывинчивать. Разверните волну по высоте (кольцевые валики форма отпускает свободно) или уменьшите глубину.":"Уменьшите глубину рельефа: при таком шаге валики заворачиваются по радиусу.";s.push(`Поднутрения: ${(i.fraction*100).toFixed(1)} % поверхности, самый крутой подрез ${a.toFixed(0)}°. ${o}`)}if(!t.hasHandle&&!t.hasSpout&&e.fraction<=q0)return{scheme:"dropout",parts:[K0],reason:"Изделие нигде не шире, чем выше: вынимается вверх, форма нужна из одной части.",dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:s};const r=Z0(t,e.fraction);return X0(n)>=j0?{scheme:"halves-bottom",parts:[Fl,Ol,$0],reason:`${r} Дно широкое и плоское: шов через него зачищать труднее всего, поэтому дно отливается отдельной плитой.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:s}:{scheme:"halves",parts:[Fl,Ol],reason:`${r} Дно узкое, отдельная плита не нужна.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:s}}function Q0(n,t={}){const{positions:e,indices:i}=n,s=i.length/3,r=new ArrayBuffer(84+s*50),a=new DataView(r),o=`ClayForm ${t.name??""}`.slice(0,80);new TextEncoder().encodeInto(o,new Uint8Array(r,0,80)),a.setUint32(80,s,!0);let c=84;const h=t.scale??1;for(let u=0;u<i.length;u+=3){const f=i[u]*3,m=i[u+1]*3,_=i[u+2]*3,g=e[m]-e[f],p=e[m+1]-e[f+1],d=e[m+2]-e[f+2],y=e[_]-e[f],b=e[_+1]-e[f+1],E=e[_+2]-e[f+2];let D=p*E-d*b,w=d*y-g*E,T=g*b-p*y;const P=Math.hypot(D,w,T);P>1e-30&&(D/=P,w/=P,T/=P),a.setFloat32(c,D,!0),a.setFloat32(c+4,w,!0),a.setFloat32(c+8,T,!0),c+=12;for(const S of[f,m,_])a.setFloat32(c,e[S]*h,!0),a.setFloat32(c+4,e[S+1]*h,!0),a.setFloat32(c+8,e[S+2]*h,!0),c+=12;a.setUint16(c,0,!0),c+=2}return r}const nh=1,tv=["vessel","master","bath"],ih=[128,192,256,384],ev=20,nv=400;function lo(){const n=ii("pot");return{version:nh,family:n.id,shape:tr(n.id,{}),heightMm:n.defaultHeightMm,relief:Za(),roulette:eo(),handle:Vc(),spout:io(),hollow:$c(),mold:Qc(),exportMode:"vessel",resolution:192}}function iv(n,t){if(!Tc(n))return t;const e=ii(n);return{...t,family:e.id,shape:tr(e.id,{}),heightMm:e.defaultHeightMm}}function sh(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}function Bl(n,t){return typeof n=="number"&&Number.isFinite(n)?n:t}function sv(n){const t={};for(const[e,i]of Object.entries(sh(n)))typeof i=="number"&&Number.isFinite(i)&&(t[e]=i);return t}function nr(n){const t=sh(n),e=lo(),i=typeof t.family=="string"&&Tc(t.family)?t.family:e.family,s=Math.min(nv,Math.max(ev,Bl(t.heightMm,ii(i).defaultHeightMm))),r=Bl(t.resolution,e.resolution),a=ih.includes(r)?r:e.resolution;return{version:nh,family:i,shape:tr(i,sv(t.shape)),heightMm:s,relief:Mg(t.relief),roulette:wg(t.roulette),handle:jg(t.handle),spout:Qg(t.spout),hollow:A0(t.hollow),mold:P0(t.mold),exportMode:rv(t.exportMode),resolution:a}}function rv(n){for(const t of tv)if(n===t)return t;return"vessel"}function av(n,t){return{family:n.family,shape:n.shape,heightMm:n.heightMm,nu:t,nv:t,relief:n.relief,roulette:n.roulette,spout:n.spout}}function ge(n,t,e,i,s={}){return{name:n,note:t,build:()=>nr({...lo(),family:e,shape:{...og(e),...i},...s})}}const rh=[ge("Горшок","русский печной горшок","pot",{dBelly:170,dNeck:108,dFoot:104,bellyAt:.52,shoulder:.45,neckH:.16,rimFlare:.18},{heightMm:150}),ge("Крынка","узкое горло под сметану и молоко","pot",{dBelly:150,dNeck:74,dFoot:92,bellyAt:.42,shoulder:.7,neckH:.28,rimFlare:.35},{heightMm:195,spout:{on:!0,pullMm:12,widthDeg:55,zone:.14}}),ge("Чайник","приземистый, с трубчатым носиком","pot",{dBelly:150,dNeck:90,dFoot:90,bellyAt:.5,shoulder:.5,neckH:.12,rimFlare:.1},{heightMm:120,handle:{on:!0,count:1,topAt:.8,bottomAt:.3,reachMm:30,thicknessMm:12},spout:{on:!0,kind:"applied",attachAt:.4,lengthMm:70,tipAt:1,baseMm:32,tipMm:15,tipAngleDeg:55}}),ge("Корчага","большая тарная посудина","pot",{dBelly:300,dNeck:200,dFoot:160,bellyAt:.48,shoulder:.3,neckH:.1,rimFlare:.12},{heightMm:340}),ge("Горшок с накаткой","поясок, накатанный колесом по тулову","pot",{dBelly:178,dNeck:112,dFoot:100,bellyAt:.5,shoulder:.5,neckH:.15,rimFlare:.2},{heightMm:160,roulette:{bands:[{on:!0,pattern:"lattice",bandCenter:.66,bandWidthMm:26,depthMm:1.5,repeats:0,gapMm:0,angle:0}]}}),ge("Кувшин","носик-слив и ручка напротив","vase",{dBelly:150,dNeck:76,dRim:96,dFoot:96,bellyAt:.4,neckAt:.74,footH:6},{heightMm:230,handle:{on:!0,count:1,topAt:.88,bottomAt:.42,reachMm:34,thicknessMm:13,widthRatio:.65},spout:{on:!0,pullMm:20,widthDeg:55,zone:.16}}),ge("Амфора","две ручки, узкая ножка","vase",{dBelly:168,dNeck:62,dRim:88,dFoot:62,bellyAt:.42,neckAt:.78,footH:26},{heightMm:300,handle:{on:!0,count:2,topAt:.86,bottomAt:.54,reachMm:30,thicknessMm:14,widthRatio:.8}}),ge("Лекиф","узкий сосуд для масла","vase",{dBelly:84,dNeck:26,dRim:48,dFoot:60,bellyAt:.34,neckAt:.8,footH:14},{heightMm:210}),ge("Ваза с валиками","кольцевой рельеф по тулову","vase",{dBelly:160,dNeck:58,dRim:84,dFoot:80,bellyAt:.4,neckAt:.78,footH:12},{heightMm:265,relief:{wave:{on:!0,axis:"z",shape:"rounded",freq:18,ampMm:1.4,phase:0,spiralK:0},wave2:{on:!1,axis:"theta",shape:"sin",freq:6,fm:.2,am:.5,spiralK:1},zone:{from:.12,to:.72,fade:.08}}}),ge("Кратер с меандром","широкое устье, античный ключ по тулову","vase",{dBelly:190,dNeck:150,dRim:168,dFoot:92,bellyAt:.55,neckAt:.82,footH:22,rimFlare:.12},{heightMm:240,roulette:{bands:[{on:!0,pattern:"meander",bandCenter:.6,bandWidthMm:30,depthMm:1.3,repeats:0,gapMm:0,angle:0},{on:!0,pattern:"band",bandCenter:.36,bandWidthMm:7,depthMm:1.1,repeats:0,gapMm:0,angle:0}]}}),ge("Миска","столовая миска","bowl",{dRim:210,dFoot:92,curvature:.6,footH:8,rimFlare:0},{heightMm:80}),ge("Тарелка","широкая и низкая","bowl",{dRim:260,dFoot:120,curvature:.25,footH:6,rimFlare:.06},{heightMm:42}),ge("Пиала","полусфера без ножки","bowl",{dRim:130,dFoot:52,curvature:1,footH:4,rimFlare:0},{heightMm:62}),ge("Килик","плоская чаша на высокой ножке","bowl",{dRim:200,dFoot:74,curvature:.45,footH:42,rimFlare:.1},{heightMm:110}),ge("Кружка","чашка с ручкой","cup",{dRim:88,dFoot:70,barrel:.08,rimFlare:0},{heightMm:100,handle:{on:!0,count:1,topAt:.84,bottomAt:.28,reachMm:30,thicknessMm:11,widthRatio:.7}}),ge("Стакан","прямой конус, форма из одной части","cup",{dRim:78,dFoot:58,barrel:0,rimFlare:0},{heightMm:110}),ge("Скифос","широкая чаша с двумя ручками","cup",{dRim:120,dFoot:60,barrel:.12,rimFlare:.08},{heightMm:90,handle:{on:!0,count:2,topAt:.8,bottomAt:.55,reachMm:26,thicknessMm:10,widthRatio:1.2}}),ge("Канопка","бочкообразная кружка","cup",{dRim:92,dFoot:78,barrel:.28,rimFlare:.05},{heightMm:115,handle:{on:!0,count:1,topAt:.8,bottomAt:.24,reachMm:32,thicknessMm:12,widthRatio:.6}})];function ov(n){return rh.find(t=>t.name===n)??null}function lv(n){const t=new TextEncoder().encode(n);let e="";for(const i of t)e+=String.fromCharCode(i);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function cv(n){const t=n.replace(/-/g,"+").replace(/_/g,"/"),e=t.length%4?"=".repeat(4-t.length%4):"",i=atob(t+e),s=new Uint8Array(i.length);for(let r=0;r<i.length;r++)s[r]=i.charCodeAt(r);return new TextDecoder().decode(s)}function hv(n){return lv(JSON.stringify(n))}function uv(n){try{return nr(JSON.parse(cv(n)))}catch{return null}}function dv(n){const t=n.match(/#s=([A-Za-z0-9\-_]+)/);return t?t[1]:null}const ah="clayform_user_presets_v1";function fv(){try{const n=localStorage.getItem(ah);if(!n)return[];const t=JSON.parse(n);if(!Array.isArray(t))return[];const e=[];for(const i of t){if(typeof i!="object"||i===null)continue;const s=Reflect.get(i,"name");typeof s!="string"||s.length===0||e.push({name:s,state:nr(Reflect.get(i,"state"))})}return e}catch{return[]}}function pv(n){try{return localStorage.setItem(ah,JSON.stringify(n)),!0}catch{return!1}}function mv(n){let t=0;for(const e of n){const i=e.name.match(/^Моё (\d+)$/);i&&(t=Math.max(t,Number(i[1])))}return t+1}class _v{constructor(t,e=80){this.limit=e,this.past=[],this.future=[],this.current=t}get value(){return this.current}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}push(t){gv(t,this.current)||(this.past.push(this.current),this.past.length>this.limit&&this.past.shift(),this.future=[],this.current=t)}replace(t){this.current=t}undo(){const t=this.past.pop();return t===void 0?null:(this.future.push(this.current),this.current=t,t)}redo(){const t=this.future.pop();return t===void 0?null:(this.past.push(this.current),this.current=t,t)}}function gv(n,t){return JSON.stringify(n)===JSON.stringify(t)}class vv{constructor(){this.worker=null,this.nextId=1,this.running=null,this.waiting=null}run(t,e){return new Promise((i,s)=>{var a,o;const r={id:this.nextId++,job:t,onProgress:e,settle:i,fail:l=>s(new Error(l))};if(!this.running){this.start(r);return}if(((a=this.waiting)==null?void 0:a.job.kind)==="export"&&t.kind!=="export"){i(null);return}(o=this.waiting)==null||o.settle(null),this.waiting=r})}start(t){this.running=t;const e={jobId:t.id,job:t.job};this.ensure().postMessage(e)}next(){this.running=null;const t=this.waiting;this.waiting=null,t&&this.start(t)}receive(t){var i;if(!xv(t))return;const e=this.running;if(!(!e||e.id!==t.jobId)){if(t.type==="progress"){(i=e.onProgress)==null||i.call(e,{step:t.step,total:t.total,label:t.label});return}t.type==="done"?e.settle(t.parts):e.fail(t.message),this.next()}}broke(t){var e,i,s;(e=this.running)==null||e.fail(t),(i=this.waiting)==null||i.fail(t),this.waiting=null,this.running=null,(s=this.worker)==null||s.terminate(),this.worker=null}ensure(){if(!this.worker){const t=new Worker(new URL(""+new URL("csg.worker-oHgsp7I2.js",import.meta.url).href,import.meta.url),{type:"module"});t.addEventListener("message",e=>this.receive(e.data)),t.addEventListener("error",e=>this.broke(e.message||"воркер не запустился")),t.addEventListener("messageerror",()=>this.broke("ответ воркера не читается")),this.worker=t}return this.worker}}function xv(n){return typeof n!="object"||n===null||!("jobId"in n)||typeof n.jobId!="number"||!("type"in n)?!1:n.type==="progress"||n.type==="done"||n.type==="error"}const Mv=192,Sv=96,Ev=220,yv=400,bv=20,Tv=500,Av=.92,wv=Jt("view",HTMLCanvasElement),Rv=Jt("panel",HTMLElement),Cv=Jt("familyGrid",HTMLDivElement),Pv=Jt("shapeParams",HTMLDivElement),Dv=Jt("reliefCards",HTMLDivElement),Lv=Jt("attachCards",HTMLDivElement),Uv=Jt("exportParams",HTMLDivElement),Iv=Jt("profileGraph",HTMLCanvasElement),Fa=Jt("heightMm",HTMLInputElement),ns=Jt("resolution",HTMLSelectElement),$e=Jt("exportBtn",HTMLButtonElement),Nv=Jt("status",HTMLParagraphElement),Pi=Jt("audit",HTMLParagraphElement),Gs=Jt("warnings",HTMLParagraphElement),Jn=Jt("blockers",HTMLParagraphElement),jn=Jt("presetSel",HTMLSelectElement),zl=Jt("saveBtn",HTMLButtonElement),Hr=Jt("shareBtn",HTMLButtonElement),oh=Jt("undoBtn",HTMLButtonElement),lh=Jt("redoBtn",HTMLButtonElement),ch=Jt("progressWrap",HTMLDivElement),hh=Jt("progressFill",HTMLDivElement),uh=Jt("progressLabel",HTMLSpanElement),dh=eg(wv),fh=new vv,Cn=new _v(Fv());let ft=Cn.value;function Fv(){const n=dv(location.hash);return n&&uv(n)||lo()}const Ov=hg(Cv,ft.family,n=>{Te(iv(n,ft))});N0(Rv);let kl=mh();const ph=Og(Dv,()=>ft.relief,()=>ft.roulette,n=>Te({...ft,relief:n}),n=>Te({...ft,roulette:n})),Bv=u0(Lv,()=>ft.handle,()=>ft.spout,n=>Te({...ft,handle:n}),n=>Te({...ft,spout:n})),Ki=I0({vessel:Jt("tabVessel",HTMLButtonElement),master:Jt("tabMaster",HTMLButtonElement),bath:Jt("tabBath",HTMLButtonElement)},Uv,Jt("schemeNote",HTMLParagraphElement),Jt("partList",HTMLUListElement),()=>ft.hollow,()=>ft.mold,n=>Te({...ft,exportMode:n}),n=>Te({...ft,hollow:n}),n=>Te({...ft,mold:n}));function mh(){return ug(Pv,ii(ft.family).params,ft.shape,(n,t)=>{Te({...ft,shape:{...ft.shape,[n]:t}})})}function Te(n,t=!0){const e=n.family!==ft.family;ft=nr(n),t?zv(ft):Cn.replace(ft),e?(Ov.setActive(ft.family),kl=mh()):kl.setValues(ft.shape),ph.sync(ft.relief,ft.roulette),Bv.sync(ft.handle,ft.spout),Ki.sync(ft.exportMode,ft.hollow,ft.mold),Fa.value=String(Math.round(ft.heightMm)),ns.value=String(ft.resolution),_h(),kv()}let Di=null;function zv(n){Di&&clearTimeout(Di),Di=setTimeout(()=>{Cn.push(n),_h()},Tv)}function _h(){oh.disabled=!Cn.canUndo,lh.disabled=!Cn.canRedo}let Vr=null,Gr=null,Zi=0;function kv(){Zi++;const n=Zi,t=Ka(ft.family,ft.shape,ft.heightMm);k0(Iv,t),ph.setBandNote(c=>{const h=sn(t,c.bandCenter),u=Rc(c,{heightMm:ft.heightMm,radiusAt:_=>sn(t,_)}),f=2*Math.PI*h/u,m=Math.max(0,f-c.gapMm);return`${u} оттисков за оборот по ⌀${(h*2).toFixed(0)} мм: шаг ${f.toFixed(1)} мм, элемент ${m.toFixed(1)} мм.`});const e=av(ft,Mv),i=C0(e,ft.hollow),s=y0(e),r=J0(s,{hasHandle:ft.handle.on,hasSpout:Hl(),angularRelief:Wv()});Ki.setSchemeNote(r.reason);const a=[...r.warnings];Hl()&&ft.spout.tipAt<Av&&a.push("Кончик носика ниже венчика: наполнить изделие выше носика не выйдет."),i.pinchedFraction>0&&a.push(`Рельеф уходит внутрь глубже стенки на ${(i.pinchedFraction*100).toFixed(1)} % поверхности — там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.`),Gs.textContent=a.join(`
`);const o=Xv(s.positions),l=so(i.mesh.positions,i.mesh.indices)/1e3;if(Nv.textContent=[`⌀${o.toFixed(0)} × ${ft.heightMm.toFixed(0)} мм`,`вместимость ${Vl(i.capacityMl)}`,`глины ${Vl(l)}`].join(" · "),Gr&&clearTimeout(Gr),Vr&&clearTimeout(Vr),ft.exportMode==="vessel"){const c=ro(e),h=l0(ft.spout,c.profile,c.heightMm);dh.setMeshes([i.mesh,...$g(ft.handle,c.profile,c.heightMm),...h?[h]:[]]),Ki.setParts([{label:"Изделие",note:`${(l/1e3).toFixed(2)} л глины`}]),$e.textContent="Экспорт STL",Pi.textContent="проверка…",Vr=setTimeout(()=>Gv(i.mesh),Ev)}else Ki.setParts(r.parts.map(c=>({label:c.label}))),$e.textContent=ft.exportMode==="master"?"Экспорт мастера":"Экспорт ванночек",Pi.textContent="собираю оснастку…",Gr=setTimeout(()=>void Hv(n),yv)}async function Hv(n){try{const t=await fh.run({kind:"mold-preview",state:ft,segments:Sv},({step:i,total:s,label:r})=>{n===Zi&&(Pi.textContent=`собираю: ${r} (${i+1} из ${s})`)});if(!t||n!==Zi)return;dh.setMeshes(Vv(t.map(gh))),Ki.setParts(t.map(i=>({label:i.label,note:i.note})));const e=t.reduce((i,s)=>i+s.indices.length/3,0);Pi.textContent=`${t.length} дет. · ${Math.round(e/1e3)} тыс. треугольников`,Jn.textContent="",$e.disabled=!1}catch(t){if(n!==Zi)return;Pi.textContent="",Jn.textContent=`Оснастку собрать не удалось: ${vh(t)}`,$e.disabled=!0}}function gh(n){return{positions:n.positions,indices:n.indices,normals:n.normals}}function Vv(n){let t=0;const e=[];for(const i of n){let s=1/0,r=-1/0;for(let l=0;l<i.positions.length;l+=3)i.positions[l]<s&&(s=i.positions[l]),i.positions[l]>r&&(r=i.positions[l]);const a=t-s,o=new Float32Array(i.positions);for(let l=0;l<o.length;l+=3)o[l]+=a;e.push({...i,positions:o}),t+=r-s+bv}return e}function Gv(n){const t=p0(n),e=d0(t),i=f0(n,60);Pi.textContent=t.watertight?`замкнуто ✓ · ${Math.round(t.triangleCount/1e3)} тыс. треугольников`:"меш не замкнут";const s=[...e.warnings];i>.15&&s.push(`Свесы круче 60° на ${(i*100).toFixed(0)} % поверхности — печать глиной потребует опор.`);const r=Gs.textContent?[Gs.textContent]:[];Gs.textContent=[...r,...s].join(`
`),Jn.textContent=e.blocking.join(`
`),$e.disabled=e.blocking.length>0}function Hl(){return ft.spout.on&&ft.spout.kind==="applied"}function Wv(){const n=t=>t!=="z";return ft.relief.wave.on&&n(ft.relief.wave.axis)||ft.relief.wave2.on&&n(ft.relief.wave2.axis)||ft.roulette.bands.some(t=>t.on)}function Xv(n){let t=0;for(let e=0;e<n.length;e+=3)t=Math.max(t,Math.hypot(n[e],n[e+1]));return t*2}function Vl(n){return n>=1e3?`${(n/1e3).toFixed(2)} л`:`${n.toFixed(0)} мл`}function vh(n){return n instanceof Error?n.message:String(n)}Fa.addEventListener("input",()=>{Te({...ft,heightMm:Number(Fa.value)})});ns.textContent="";for(const n of ih){const t=document.createElement("option");t.value=String(n),t.textContent=`${n} × ${n}`,ns.append(t)}ns.addEventListener("change",()=>{Te({...ft,resolution:Number(ns.value)})});$e.addEventListener("click",()=>{qv()});async function qv(){const n=$e.textContent;$e.disabled=!0,$e.textContent="Собираю…";try{const t=await fh.run({kind:"export",state:ft},Yv);if(!t)return;const e=t.flatMap(i=>i.blocking);if(e.length>0){Jn.textContent=e.join(`
`);return}Jn.textContent="";for(const i of t){const s=`clayform-${ft.family}-${i.id}.stl`;$v(Q0(gh(i),{name:i.id}),s),await new Promise(r=>setTimeout(r,250))}}catch(t){Jn.textContent=`Сборка не удалась: ${vh(t)}`}finally{jv(),$e.textContent=n,$e.disabled=!1}}function Yv({step:n,total:t,label:e}){ch.hidden=!1,hh.style.width=`${Math.round(n/Math.max(1,t)*100)}%`,uh.textContent=e}function jv(){ch.hidden=!0,hh.style.width="0%",uh.textContent=""}function $v(n,t){const e=URL.createObjectURL(new Blob([n],{type:"model/stl"})),i=document.createElement("a");i.href=e,i.download=t,i.click(),URL.revokeObjectURL(e)}let $n=fv();function xh(){jn.textContent="";const n=document.createElement("option");n.value="",n.textContent="Пресеты…",jn.append(n);const t=document.createElement("optgroup");t.label="Готовые";for(const e of rh){const i=document.createElement("option");i.value=`b:${e.name}`,i.textContent=e.name,i.title=e.note,t.append(i)}if(jn.append(t),$n.length>0){const e=document.createElement("optgroup");e.label="Мои";for(const i of $n){const s=document.createElement("option");s.value=`u:${i.name}`,s.textContent=i.name,e.append(s)}jn.append(e)}}jn.addEventListener("change",()=>{const n=jn.value;if(jn.value="",n.startsWith("b:")){const t=ov(n.slice(2));t&&Te(t.build())}else if(n.startsWith("u:")){const t=$n.find(e=>e.name===n.slice(2));t&&Te(t.state)}});zl.addEventListener("click",()=>{var e;const n=`Моё ${mv($n)}`,t=(e=prompt("Имя пресета",n))==null?void 0:e.trim();t&&($n=[...$n.filter(i=>i.name!==t),{name:t,state:ft}],pv($n)?(xh(),Oa(zl,"✓")):Jn.textContent="Не удалось сохранить пресет: браузер запретил доступ к хранилищу.")});Hr.addEventListener("click",()=>{var t;const n=hv(ft);location.hash=`s=${n}`,(t=navigator.clipboard)==null||t.writeText(`${location.origin}${location.pathname}#s=${n}`).then(()=>Oa(Hr,"✓"),()=>Oa(Hr,"↑"))});function Oa(n,t){const e=n.textContent;n.textContent=t,setTimeout(()=>{n.textContent=e},900)}oh.addEventListener("click",()=>co("undo"));lh.addEventListener("click",()=>co("redo"));function co(n){Di&&(clearTimeout(Di),Di=null,Cn.push(ft));const t=n==="undo"?Cn.undo():Cn.redo();t&&Te(t,!1)}window.addEventListener("keydown",n=>{!(n.ctrlKey||n.metaKey)||n.key.toLowerCase()!=="z"||(n.preventDefault(),co(n.shiftKey?"redo":"undo"))});xh();Te(ft,!1);
