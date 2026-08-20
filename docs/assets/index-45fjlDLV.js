(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Le(n,t){const e=document.getElementById(n);if(!(e instanceof t))throw new Error(`#${n} is not ${t.name}`);return e}function ge(n,t,e){const i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.textContent=e),i}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oa="178",ar={ROTATE:0,DOLLY:1,PAN:2},sr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ff=0,yl=1,df=2,$c=1,pf=2,Bn=3,ai=0,on=1,kn=2,ii=0,lr=1,Sl=2,El=3,bl=4,mf=5,Ti=100,_f=101,gf=102,vf=103,xf=104,Mf=200,yf=201,Sf=202,Ef=203,Go=204,Wo=205,bf=206,Tf=207,Af=208,wf=209,Rf=210,Cf=211,Pf=212,Df=213,Lf=214,Xo=0,$o=1,qo=2,dr=3,Yo=4,jo=5,Ko=6,Zo=7,qc=0,Uf=1,If=2,ri=0,Nf=1,Ff=2,Of=3,Bf=4,kf=5,zf=6,Hf=7,Yc=300,pr=301,mr=302,Jo=303,Qo=304,Vs=306,ta=1e3,wi=1001,ea=1002,bn=1003,Vf=1004,es=1005,wn=1006,ro=1007,Ri=1008,Cn=1009,jc=1010,Kc=1011,Nr=1012,Ba=1013,Ni=1014,Hn=1015,Hr=1016,ka=1017,za=1018,Fr=1020,Zc=35902,Jc=1021,Qc=1022,En=1023,Or=1026,Br=1027,tu=1028,Ha=1029,eu=1030,Va=1031,Ga=1033,Ts=33776,As=33777,ws=33778,Rs=33779,na=35840,ia=35841,ra=35842,sa=35843,oa=36196,aa=37492,la=37496,ca=37808,ua=37809,ha=37810,fa=37811,da=37812,pa=37813,ma=37814,_a=37815,ga=37816,va=37817,xa=37818,Ma=37819,ya=37820,Sa=37821,Cs=36492,Ea=36494,ba=36495,nu=36283,Ta=36284,Aa=36285,wa=36286,Gf=3200,Wf=3201,iu=0,Xf=1,ti="",dn="srgb",_r="srgb-linear",Fs="linear",Se="srgb",Wi=7680,Tl=519,$f=512,qf=513,Yf=514,ru=515,jf=516,Kf=517,Zf=518,Jf=519,Al=35044,wl="300 es",Vn=2e3,Os=2001;class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ps=Math.PI/180,Ra=180/Math.PI;function Vr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]).toLowerCase()}function se(n,t,e){return Math.max(t,Math.min(e,n))}function Qf(n,t){return(n%t+t)%t}function so(n,t,e){return(1-e)*n+e*t}function Sr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const td={DEG2RAD:Ps};class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fi{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],v=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=v,t[e+3]=x;return}if(h!==x||l!==f||c!==p||u!==v){let g=1-a;const d=l*f+c*p+u*v+h*x,E=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){const I=Math.sqrt(w),P=Math.atan2(I,d*E);g=Math.sin(g*P)/I,a=Math.sin(a*P)/I}const b=a*E;if(l=l*g+f*b,c=c*g+p*b,u=u*g+v*b,h=h*g+x*b,g===1-a){const I=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=I,c*=I,u*=I,h*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],p=s[o+2],v=s[o+3];return t[e]=a*v+u*h+l*p-c*f,t[e+1]=l*v+u*f+c*h-a*p,t[e+2]=c*v+u*p+a*f-l*h,t[e+3]=u*v-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"YXZ":this._x=f*u*h+c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"ZXY":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h-f*p*v;break;case"ZYX":this._x=f*u*h-c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h+f*p*v;break;case"YZX":this._x=f*u*h+c*p*v,this._y=c*p*h+f*u*v,this._z=c*u*v-f*p*h,this._w=c*u*h-f*p*v;break;case"XZY":this._x=f*u*h-c*p*v,this._y=c*p*h-f*u*v,this._z=c*u*v+f*p*h,this._w=c*u*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,i=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return oo.copy(this).projectOnVector(t),this.sub(oo)}reflect(t){return this.sub(oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oo=new V,Rl=new Fi;class Qt{constructor(t,e,i,r,s,o,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],v=i[8],x=r[0],g=r[3],d=r[6],E=r[1],w=r[4],b=r[7],I=r[2],P=r[5],C=r[8];return s[0]=o*x+a*E+l*I,s[3]=o*g+a*w+l*P,s[6]=o*d+a*b+l*C,s[1]=c*x+u*E+h*I,s[4]=c*g+u*w+h*P,s[7]=c*d+u*b+h*C,s[2]=f*x+p*E+v*I,s[5]=f*g+p*w+v*P,s[8]=f*d+p*b+v*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,p=c*s-o*l,v=e*h+i*f+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=h*x,t[1]=(r*c-u*i)*x,t[2]=(a*i-r*o)*x,t[3]=f*x,t[4]=(u*e-r*l)*x,t[5]=(r*s-a*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ao.makeScale(t,e)),this}rotate(t){return this.premultiply(ao.makeRotation(-t)),this}translate(t,e){return this.premultiply(ao.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new Qt;function su(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Bs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ed(){const n=Bs("canvas");return n.style.display="block",n}const Cl={};function cr(n){n in Cl||(Cl[n]=!0,console.warn(n))}function nd(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function id(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Pl=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sd(){const n={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Se&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Se&&(r.r=ur(r.r),r.g=ur(r.g),r.b=ur(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ti?Fs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return cr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return cr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_r]:{primaries:t,whitePoint:i,transfer:Fs,toXYZ:Pl,fromXYZ:Dl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:dn},outputColorSpaceConfig:{drawingBufferColorSpace:dn}},[dn]:{primaries:t,whitePoint:i,transfer:Se,toXYZ:Pl,fromXYZ:Dl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:dn}}}),n}const pe=sd();function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ur(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class od{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Xi===void 0&&(Xi=Bs("canvas")),Xi.width=t.width,Xi.height=t.height;const r=Xi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Xi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Bs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Gn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gn(e[i]/255)*255):e[i]=Gn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ad=0;class Wa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Vr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(lo(r[o].image)):s.push(lo(r[o]))}else s=lo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function lo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?od.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ld=0;const co=new V;class an extends Bi{constructor(t=an.DEFAULT_IMAGE,e=an.DEFAULT_MAPPING,i=wi,r=wi,s=wn,o=Ri,a=En,l=Cn,c=an.DEFAULT_ANISOTROPY,u=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Vr(),this.name="",this.source=new Wa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(co).x}get height(){return this.source.getSize(co).y}get depth(){return this.source.getSize(co).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ta:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ta:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Yc;an.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,i=0,r=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],v=l[9],x=l[2],g=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,b=(p+1)/2,I=(d+1)/2,P=(u+f)/4,C=(h+x)/4,O=(v+g)/4;return w>b&&w>I?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=P/i,s=C/i):b>I?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=P/r,s=O/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=C/s,r=O/s),this.set(i,r,s,e),this}let E=Math.sqrt((g-v)*(g-v)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(g-v)/E,this.y=(h-x)/E,this.z=(f-u)/E,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(se(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cd extends Bi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new an(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Wa(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Oi extends cd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ou extends an{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=bn,this.minFilter=bn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ud extends an{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=bn,this.minFilter=bn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vr{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,_n):_n.fromBufferAttribute(s,o),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ns.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ns.copy(i.boundingBox)),ns.applyMatrix4(t.matrixWorld),this.union(ns)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Er),is.subVectors(this.max,Er),$i.subVectors(t.a,Er),qi.subVectors(t.b,Er),Yi.subVectors(t.c,Er),qn.subVectors(qi,$i),Yn.subVectors(Yi,qi),vi.subVectors($i,Yi);let e=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-vi.z,vi.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,vi.z,0,-vi.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-vi.y,vi.x,0];return!uo(e,$i,qi,Yi,is)||(e=[1,0,0,0,1,0,0,0,1],!uo(e,$i,qi,Yi,is))?!1:(rs.crossVectors(qn,Yn),e=[rs.x,rs.y,rs.z],uo(e,$i,qi,Yi,is))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Un=[new V,new V,new V,new V,new V,new V,new V,new V],_n=new V,ns=new vr,$i=new V,qi=new V,Yi=new V,qn=new V,Yn=new V,vi=new V,Er=new V,is=new V,rs=new V,xi=new V;function uo(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){xi.fromArray(n,s);const a=r.x*Math.abs(xi.x)+r.y*Math.abs(xi.y)+r.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),u=i.dot(xi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const hd=new vr,br=new V,ho=new V;class Xa{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):hd.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;br.subVectors(t,this.center);const e=br.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(br,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ho.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(br.copy(t.center).add(ho)),this.expandByPoint(br.copy(t.center).sub(ho))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const In=new V,fo=new V,ss=new V,jn=new V,po=new V,os=new V,mo=new V;class au{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){fo.copy(t).add(e).multiplyScalar(.5),ss.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(fo);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ss),a=jn.dot(this.direction),l=-jn.dot(ss),c=jn.lengthSq(),u=Math.abs(1-o*o);let h,f,p,v;if(u>0)if(h=o*l-a,f=o*a-l,v=s*u,h>=0)if(f>=-v)if(f<=v){const x=1/u;h*=x,f*=x,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(fo).addScaledVector(ss,f),p}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,r,s){po.subVectors(e,t),os.subVectors(i,t),mo.crossVectors(po,os);let o=this.direction.dot(mo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jn.subVectors(this.origin,t);const l=a*this.direction.dot(os.crossVectors(jn,os));if(l<0)return null;const c=a*this.direction.dot(po.cross(jn));if(c<0||l+c>o)return null;const u=-a*jn.dot(mo);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(t,e,i,r,s,o,a,l,c,u,h,f,p,v,x,g){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,h,f,p,v,x,g)}set(t,e,i,r,s,o,a,l,c,u,h,f,p,v,x,g){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=v,d[11]=x,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/ji.setFromMatrixColumn(t,0).length(),s=1/ji.setFromMatrixColumn(t,1).length(),o=1/ji.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,p=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+v*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=v+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,v=c*u,x=c*h;e[0]=f+x*a,e[4]=v*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-v,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,v=c*u,x=c*h;e[0]=f-x*a,e[4]=-o*h,e[8]=v+p*a,e[1]=p+v*a,e[5]=o*u,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=v*c-p,e[8]=f*c+x,e[1]=l*h,e[5]=x*c+f,e[9]=p*c-v,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=x-f*h,e[8]=v*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+v,e[10]=f-x*h}else if(t.order==="XZY"){const f=o*l,p=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+x,e[5]=o*u,e[9]=p*h-v,e[2]=v*h-p,e[6]=a*u,e[10]=x*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fd,t,dd)}lookAt(t,e,i){const r=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Kn.crossVectors(i,cn),Kn.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Kn.crossVectors(i,cn)),Kn.normalize(),as.crossVectors(cn,Kn),r[0]=Kn.x,r[4]=as.x,r[8]=cn.x,r[1]=Kn.y,r[5]=as.y,r[9]=cn.y,r[2]=Kn.z,r[6]=as.z,r[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],v=i[2],x=i[6],g=i[10],d=i[14],E=i[3],w=i[7],b=i[11],I=i[15],P=r[0],C=r[4],O=r[8],T=r[12],S=r[1],F=r[5],J=r[9],q=r[13],et=r[2],lt=r[6],Q=r[10],dt=r[14],Y=r[3],Mt=r[7],wt=r[11],Bt=r[15];return s[0]=o*P+a*S+l*et+c*Y,s[4]=o*C+a*F+l*lt+c*Mt,s[8]=o*O+a*J+l*Q+c*wt,s[12]=o*T+a*q+l*dt+c*Bt,s[1]=u*P+h*S+f*et+p*Y,s[5]=u*C+h*F+f*lt+p*Mt,s[9]=u*O+h*J+f*Q+p*wt,s[13]=u*T+h*q+f*dt+p*Bt,s[2]=v*P+x*S+g*et+d*Y,s[6]=v*C+x*F+g*lt+d*Mt,s[10]=v*O+x*J+g*Q+d*wt,s[14]=v*T+x*q+g*dt+d*Bt,s[3]=E*P+w*S+b*et+I*Y,s[7]=E*C+w*F+b*lt+I*Mt,s[11]=E*O+w*J+b*Q+I*wt,s[15]=E*T+w*q+b*dt+I*Bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],v=t[3],x=t[7],g=t[11],d=t[15];return v*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*p-i*l*p)+x*(+e*l*p-e*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+g*(+e*c*h-e*a*p-s*o*h+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-e*l*h+e*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],v=t[12],x=t[13],g=t[14],d=t[15],E=h*g*c-x*f*c+x*l*p-a*g*p-h*l*d+a*f*d,w=v*f*c-u*g*c-v*l*p+o*g*p+u*l*d-o*f*d,b=u*x*c-v*h*c+v*a*p-o*x*p-u*a*d+o*h*d,I=v*h*l-u*x*l-v*a*f+o*x*f+u*a*g-o*h*g,P=e*E+i*w+r*b+s*I;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return t[0]=E*C,t[1]=(x*f*s-h*g*s-x*r*p+i*g*p+h*r*d-i*f*d)*C,t[2]=(a*g*s-x*l*s+x*r*c-i*g*c-a*r*d+i*l*d)*C,t[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*p-i*l*p)*C,t[4]=w*C,t[5]=(u*g*s-v*f*s+v*r*p-e*g*p-u*r*d+e*f*d)*C,t[6]=(v*l*s-o*g*s-v*r*c+e*g*c+o*r*d-e*l*d)*C,t[7]=(o*f*s-u*l*s+u*r*c-e*f*c-o*r*p+e*l*p)*C,t[8]=b*C,t[9]=(v*h*s-u*x*s-v*i*p+e*x*p+u*i*d-e*h*d)*C,t[10]=(o*x*s-v*a*s+v*i*c-e*x*c-o*i*d+e*a*d)*C,t[11]=(u*a*s-o*h*s-u*i*c+e*h*c+o*i*p-e*a*p)*C,t[12]=I*C,t[13]=(u*x*r-v*h*r+v*i*f-e*x*f-u*i*g+e*h*g)*C,t[14]=(v*a*r-o*x*r-v*i*l+e*x*l+o*i*g-e*a*g)*C,t[15]=(o*h*r-u*a*r+u*i*l-e*h*l-o*i*f+e*a*f)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,p=s*u,v=s*h,x=o*u,g=o*h,d=a*h,E=l*c,w=l*u,b=l*h,I=i.x,P=i.y,C=i.z;return r[0]=(1-(x+d))*I,r[1]=(p+b)*I,r[2]=(v-w)*I,r[3]=0,r[4]=(p-b)*P,r[5]=(1-(f+d))*P,r[6]=(g+E)*P,r[7]=0,r[8]=(v+w)*C,r[9]=(g-E)*C,r[10]=(1-(f+x))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=ji.set(r[0],r[1],r[2]).length();const o=ji.set(r[4],r[5],r[6]).length(),a=ji.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],gn.copy(this);const c=1/s,u=1/o,h=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=h,gn.elements[9]*=h,gn.elements[10]*=h,e.setFromRotationMatrix(gn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Vn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),f=(i+r)/(i-r);let p,v;if(a===Vn)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Os)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Vn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(o-s),f=(e+t)*c,p=(i+r)*u;let v,x;if(a===Vn)v=(o+s)*h,x=-2*h;else if(a===Os)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ji=new V,gn=new Ne,fd=new V(0,0,0),dd=new V(1,1,1),Kn=new V,as=new V,cn=new V,Ll=new Ne,Ul=new Fi;class Pn{constructor(t=0,e=0,i=0,r=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(se(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ll.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ll,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class lu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pd=0;const Il=new V,Ki=new Fi,Nn=new Ne,ls=new V,Tr=new V,md=new V,_d=new Fi,Nl=new V(1,0,0),Fl=new V(0,1,0),Ol=new V(0,0,1),Bl={type:"added"},gd={type:"removed"},Zi={type:"childadded",child:null},_o={type:"childremoved",child:null};class $e extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Vr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new V,e=new Pn,i=new Fi,r=new V(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Qt}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.premultiply(Ki),this}rotateX(t){return this.rotateOnAxis(Nl,t)}rotateY(t){return this.rotateOnAxis(Fl,t)}rotateZ(t){return this.rotateOnAxis(Ol,t)}translateOnAxis(t,e){return Il.copy(t).applyQuaternion(this.quaternion),this.position.add(Il.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nl,t)}translateY(t){return this.translateOnAxis(Fl,t)}translateZ(t){return this.translateOnAxis(Ol,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ls.copy(t):ls.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Tr,ls,this.up):Nn.lookAt(ls,Tr,this.up),this.quaternion.setFromRotationMatrix(Nn),r&&(Nn.extractRotation(r.matrixWorld),Ki.setFromRotationMatrix(Nn),this.quaternion.premultiply(Ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gd),_o.child=t,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,t,md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,_d,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),v=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}$e.DEFAULT_UP=new V(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new V,Fn=new V,go=new V,On=new V,Ji=new V,Qi=new V,kl=new V,vo=new V,xo=new V,Mo=new V,yo=new Ie,So=new Ie,Eo=new Ie;class yn{constructor(t=new V,e=new V,i=new V){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),vn.subVectors(t,e),r.cross(vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){vn.subVectors(r,e),Fn.subVectors(i,e),go.subVectors(t,e);const o=vn.dot(vn),a=vn.dot(Fn),l=vn.dot(go),c=Fn.dot(Fn),u=Fn.dot(go),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,v=(o*u-a*l)*f;return s.set(1-p-v,v,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,On.x),l.addScaledVector(o,On.y),l.addScaledVector(a,On.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return yo.setScalar(0),So.setScalar(0),Eo.setScalar(0),yo.fromBufferAttribute(t,e),So.fromBufferAttribute(t,i),Eo.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(yo,s.x),o.addScaledVector(So,s.y),o.addScaledVector(Eo,s.z),o}static isFrontFacing(t,e,i,r){return vn.subVectors(i,e),Fn.subVectors(t,e),vn.cross(Fn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),vn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return yn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return yn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return yn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return yn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return yn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;Ji.subVectors(r,i),Qi.subVectors(s,i),vo.subVectors(t,i);const l=Ji.dot(vo),c=Qi.dot(vo);if(l<=0&&c<=0)return e.copy(i);xo.subVectors(t,r);const u=Ji.dot(xo),h=Qi.dot(xo);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Ji,o);Mo.subVectors(t,s);const p=Ji.dot(Mo),v=Qi.dot(Mo);if(v>=0&&p<=v)return e.copy(s);const x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),e.copy(i).addScaledVector(Qi,a);const g=u*v-p*h;if(g<=0&&h-u>=0&&p-v>=0)return kl.subVectors(s,r),a=(h-u)/(h-u+(p-v)),e.copy(r).addScaledVector(kl,a);const d=1/(g+x+f);return o=x*d,a=f*d,e.copy(i).addScaledVector(Ji,o).addScaledVector(Qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},cs={h:0,s:0,l:0};function bo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class me{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=dn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=pe.workingColorSpace){return this.r=t,this.g=e,this.b=i,pe.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=pe.workingColorSpace){if(t=Qf(t,1),e=se(e,0,1),i=se(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=bo(o,s,t+1/3),this.g=bo(o,s,t),this.b=bo(o,s,t-1/3)}return pe.colorSpaceToWorking(this,r),this}setStyle(t,e=dn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=dn){const i=cu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=ur(t.r),this.g=ur(t.g),this.b=ur(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=dn){return pe.workingToColorSpace(je.copy(this),t),Math.round(se(je.r*255,0,255))*65536+Math.round(se(je.g*255,0,255))*256+Math.round(se(je.b*255,0,255))}getHexString(t=dn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.workingToColorSpace(je.copy(this),e);const i=je.r,r=je.g,s=je.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=dn){pe.workingToColorSpace(je.copy(this),t);const e=je.r,i=je.g,r=je.b;return t!==dn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(cs);const i=so(Zn.h,cs.h,e),r=so(Zn.s,cs.s,e),s=so(Zn.l,cs.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const je=new me;me.NAMES=cu;let vd=0;class Gr extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Vr(),this.name="",this.type="Material",this.blending=lr,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Wo,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new me(0,0,0),this.blendAlpha=0,this.depthFunc=dr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Go&&(i.blendSrc=this.blendSrc),this.blendDst!==Wo&&(i.blendDst=this.blendDst),this.blendEquation!==Ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==dr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class uu extends Gr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new V,us=new Jt;let xd=0;class hn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Al,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)us.fromBufferAttribute(this,e),us.applyMatrix3(t),this.setXY(e,us.x,us.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Sr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Sr(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Sr(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Sr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Sr(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Al&&(t.usage=this.usage),t}}class hu extends hn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class fu extends hn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Li extends hn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Md=0;const fn=new Ne,To=new $e,tr=new V,un=new vr,Ar=new vr,Ve=new V;class ui extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Vr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(su(t)?fu:hu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Qt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,i){return fn.makeTranslation(t,e,i),this.applyMatrix4(fn),this}scale(t,e,i){return fn.makeScale(t,e,i),this.applyMatrix4(fn),this}lookAt(t){return To.lookAt(t),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Li(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ar.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(un.min,Ar.min),un.expandByPoint(Ve),Ve.addVectors(un.max,Ar.max),un.expandByPoint(Ve)):(un.expandByPoint(Ar.min),un.expandByPoint(Ar.max))}un.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ve.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ve.fromBufferAttribute(a,c),l&&(tr.fromBufferAttribute(t,c),Ve.add(tr)),r=Math.max(r,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<i.count;O++)a[O]=new V,l[O]=new V;const c=new V,u=new V,h=new V,f=new Jt,p=new Jt,v=new Jt,x=new V,g=new V;function d(O,T,S){c.fromBufferAttribute(i,O),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,S),f.fromBufferAttribute(s,O),p.fromBufferAttribute(s,T),v.fromBufferAttribute(s,S),u.sub(c),h.sub(c),p.sub(f),v.sub(f);const F=1/(p.x*v.y-v.x*p.y);isFinite(F)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(F),g.copy(h).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(F),a[O].add(x),a[T].add(x),a[S].add(x),l[O].add(g),l[T].add(g),l[S].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let O=0,T=E.length;O<T;++O){const S=E[O],F=S.start,J=S.count;for(let q=F,et=F+J;q<et;q+=3)d(t.getX(q+0),t.getX(q+1),t.getX(q+2))}const w=new V,b=new V,I=new V,P=new V;function C(O){I.fromBufferAttribute(r,O),P.copy(I);const T=a[O];w.copy(T),w.sub(I.multiplyScalar(I.dot(T))).normalize(),b.crossVectors(P,T);const F=b.dot(l[O])<0?-1:1;o.setXYZW(O,w.x,w.y,w.z,F)}for(let O=0,T=E.length;O<T;++O){const S=E[O],F=S.start,J=S.count;for(let q=F,et=F+J;q<et;q+=3)C(t.getX(q+0)),C(t.getX(q+1)),C(t.getX(q+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,h=new V;if(t)for(let f=0,p=t.count;f<p;f+=3){const v=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,v=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let d=0;d<u;d++)f[v++]=c[p++]}return new hn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ui,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zl=new Ne,Mi=new au,hs=new Xa,Hl=new V,fs=new V,ds=new V,ps=new V,Ao=new V,ms=new V,Vl=new V,_s=new V;class Rn extends $e{constructor(t=new ui,e=new uu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){ms.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Ao.fromBufferAttribute(h,t),o?ms.addScaledVector(Ao,u):ms.addScaledVector(Ao.sub(e),u))}e.add(ms)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(s),Mi.copy(t.ray).recast(t.near),!(hs.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(hs,Hl)===null||Mi.origin.distanceToSquared(Hl)>(t.far-t.near)**2))&&(zl.copy(s).invert(),Mi.copy(t.ray).applyMatrix4(zl),!(i.boundingBox!==null&&Mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],E=Math.max(g.start,p.start),w=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let b=E,I=w;b<I;b+=3){const P=a.getX(b),C=a.getX(b+1),O=a.getX(b+2);r=gs(this,d,t,i,c,u,h,P,C,O),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const E=a.getX(g),w=a.getX(g+1),b=a.getX(g+2);r=gs(this,o,t,i,c,u,h,E,w,b),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=f.length;v<x;v++){const g=f[v],d=o[g.materialIndex],E=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let b=E,I=w;b<I;b+=3){const P=b,C=b+1,O=b+2;r=gs(this,d,t,i,c,u,h,P,C,O),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,d=x;g<d;g+=3){const E=g,w=g+1,b=g+2;r=gs(this,o,t,i,c,u,h,E,w,b),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}}}function yd(n,t,e,i,r,s,o,a){let l;if(t.side===on?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===ai,a),l===null)return null;_s.copy(a),_s.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(_s);return c<e.near||c>e.far?null:{distance:c,point:_s.clone(),object:n}}function gs(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,fs),n.getVertexPosition(l,ds),n.getVertexPosition(c,ps);const u=yd(n,t,e,i,fs,ds,ps,Vl);if(u){const h=new V;yn.getBarycoord(Vl,fs,ds,ps,h),r&&(u.uv=yn.getInterpolatedAttribute(r,a,l,c,h,new Jt)),s&&(u.uv1=yn.getInterpolatedAttribute(s,a,l,c,h,new Jt)),o&&(u.normal=yn.getInterpolatedAttribute(o,a,l,c,h,new V),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new V,materialIndex:0};yn.getNormal(fs,ds,ps,f.normal),u.face=f,u.barycoord=h}return u}class Wr extends ui{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,i,e,t,o,s,0),v("z","y","x",1,-1,i,e,-t,o,s,1),v("x","z","y",1,1,t,i,e,r,o,2),v("x","z","y",1,-1,t,i,-e,r,o,3),v("x","y","z",1,-1,t,e,i,r,s,4),v("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Li(c,3)),this.setAttribute("normal",new Li(u,3)),this.setAttribute("uv",new Li(h,2));function v(x,g,d,E,w,b,I,P,C,O,T){const S=b/C,F=I/O,J=b/2,q=I/2,et=P/2,lt=C+1,Q=O+1;let dt=0,Y=0;const Mt=new V;for(let wt=0;wt<Q;wt++){const Bt=wt*F-q;for(let ee=0;ee<lt;ee++){const ve=ee*S-J;Mt[x]=ve*E,Mt[g]=Bt*w,Mt[d]=et,c.push(Mt.x,Mt.y,Mt.z),Mt[x]=0,Mt[g]=0,Mt[d]=P>0?1:-1,u.push(Mt.x,Mt.y,Mt.z),h.push(ee/C),h.push(1-wt/O),dt+=1}}for(let wt=0;wt<O;wt++)for(let Bt=0;Bt<C;Bt++){const ee=f+Bt+lt*wt,ve=f+Bt+lt*(wt+1),nt=f+(Bt+1)+lt*(wt+1),mt=f+(Bt+1)+lt*wt;l.push(ee,ve,mt),l.push(ve,nt,mt),Y+=6}a.addGroup(p,Y,T),p+=Y,f+=dt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Qe(n){const t={};for(let e=0;e<n.length;e++){const i=gr(n[e]);for(const r in i)t[r]=i[r]}return t}function Sd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function du(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const Ed={clone:gr,merge:Qe};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends Gr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=Td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gr(t.uniforms),this.uniformsGroups=Sd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class pu extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new V,Gl=new Jt,Wl=new Jt;class pn extends pu{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ra*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ra*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,Gl,Wl),e.subVectors(Wl,Gl)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ps*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const er=-90,nr=1;class Ad extends $e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new pn(er,nr,t,e);r.layers=this.layers,this.add(r);const s=new pn(er,nr,t,e);s.layers=this.layers,this.add(s);const o=new pn(er,nr,t,e);o.layers=this.layers,this.add(o);const a=new pn(er,nr,t,e);a.layers=this.layers,this.add(a);const l=new pn(er,nr,t,e);l.layers=this.layers,this.add(l);const c=new pn(er,nr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Vn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Os)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class mu extends an{constructor(t=[],e=pr,i,r,s,o,a,l,c,u){super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wd extends Oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new mu(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Wr(5,5,5),s=new li({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:ii});s.uniforms.tEquirect.value=e;const o=new Rn(r,s),a=e.minFilter;return e.minFilter===Ri&&(e.minFilter=wn),new Ad(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class Pr extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Rd={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,i),d=this._getHandJoint(c,x);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Rd)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Pr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class Cd extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ro=new V,Pd=new V,Dd=new Qt;class Qn{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=Ro.subVectors(i,e).cross(Pd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ro),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Dd.getNormalMatrix(t),r=this.coplanarPoint(Ro).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new Xa,Ld=new Jt(.5,.5),vs=new V;class $a{constructor(t=new Qn,e=new Qn,i=new Qn,r=new Qn,s=new Qn,o=new Qn){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Vn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],v=r[9],x=r[10],g=r[11],d=r[12],E=r[13],w=r[14],b=r[15];if(i[0].setComponents(l-s,f-c,g-p,b-d).normalize(),i[1].setComponents(l+s,f+c,g+p,b+d).normalize(),i[2].setComponents(l+o,f+u,g+v,b+E).normalize(),i[3].setComponents(l-o,f-u,g-v,b-E).normalize(),i[4].setComponents(l-a,f-h,g-x,b-w).normalize(),e===Vn)i[5].setComponents(l+a,f+h,g+x,b+w).normalize();else if(e===Os)i[5].setComponents(a,h,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){yi.center.set(0,0,0);const e=Ld.distanceTo(t.center);return yi.radius=.7071067811865476+e,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(vs.x=r.normal.x>0?t.max.x:t.min.x,vs.y=r.normal.y>0?t.max.y:t.min.y,vs.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(vs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _u extends an{constructor(t,e,i=Ni,r,s,o,a=bn,l=bn,c,u=Or,h=1){if(u!==Or&&u!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Gs extends ui{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=t/a,f=e/l,p=[],v=[],x=[],g=[];for(let d=0;d<u;d++){const E=d*f-o;for(let w=0;w<c;w++){const b=w*h-s;v.push(b,-E,0),x.push(0,0,1),g.push(w/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<a;E++){const w=E+c*d,b=E+c*(d+1),I=E+1+c*(d+1),P=E+1+c*d;p.push(w,b,P),p.push(b,I,P)}this.setIndex(p),this.setAttribute("position",new Li(v,3)),this.setAttribute("normal",new Li(x,3)),this.setAttribute("uv",new Li(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ud extends Gr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=iu,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Id extends Gr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nd extends Gr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class gu extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new me(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Fd extends gu{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new me(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Co=new Ne,Xl=new V,$l=new V;class Od{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $a,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xl),$l.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($l),e.updateMatrixWorld(),Co.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Co)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class vu extends pu{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Bd extends Od{constructor(){super(new vu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ql extends gu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new Bd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class kd extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Yl{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=se(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(se(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class zd extends Bi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function jl(n,t,e,i){const r=Hd(i);switch(e){case Jc:return n*t;case tu:return n*t/r.components*r.byteLength;case Ha:return n*t/r.components*r.byteLength;case eu:return n*t*2/r.components*r.byteLength;case Va:return n*t*2/r.components*r.byteLength;case Qc:return n*t*3/r.components*r.byteLength;case En:return n*t*4/r.components*r.byteLength;case Ga:return n*t*4/r.components*r.byteLength;case Ts:case As:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ws:case Rs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ia:case sa:return Math.max(n,16)*Math.max(t,8)/4;case na:case ra:return Math.max(n,8)*Math.max(t,8)/2;case oa:case aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case la:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ua:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ha:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case fa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case da:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case pa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ma:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case _a:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ga:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case va:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case xa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ma:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ya:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Sa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Cs:case Ea:case ba:return Math.ceil(n/4)*Math.ceil(t/4)*16;case nu:case Ta:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Aa:case wa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hd(n){switch(n){case Cn:case jc:return{byteLength:1,components:1};case Nr:case Kc:case Hr:return{byteLength:2,components:1};case ka:case za:return{byteLength:2,components:4};case Ni:case Ba:case Hn:return{byteLength:4,components:1};case Zc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xu(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Vd(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,v)=>p.start-v.start);let f=0;for(let p=1;p<h.length;p++){const v=h[f],x=h[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,v=h.length;p<v;p++){const x=h[p];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Gd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wd=`#ifdef USE_ALPHAHASH
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
#endif`,Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$d=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
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
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zd=`#ifdef USE_BATCHING
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
#endif`,Jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ep=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,np=`#ifdef USE_IRIDESCENCE
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
#endif`,ip=`#ifdef USE_BUMPMAP
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
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,up=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,fp=`#define PI 3.141592653589793
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
} // validated`,dp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,pp=`vec3 transformedNormal = objectNormal;
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
#endif`,mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_p=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yp=`#ifdef USE_ENVMAP
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
#endif`,Sp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ep=`#ifdef USE_ENVMAP
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
#endif`,bp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pp=`#ifdef USE_GRADIENTMAP
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
}`,Dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ip=`uniform bool receiveShadow;
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
#endif`,Np=`#ifdef USE_ENVMAP
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
#endif`,Fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zp=`PhysicalMaterial material;
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
#endif`,Hp=`struct PhysicalMaterial {
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
}`,Vp=`
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
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$p=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jp=`#if defined( USE_POINTS_UV )
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
#endif`,Qp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,em=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,im=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`#ifdef USE_MORPHTARGETS
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,um=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
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
#endif`,fm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_m=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Em=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wm=`float getShadowMask() {
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
}`,Rm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cm=`#ifdef USE_SKINNING
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
#endif`,Pm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dm=`#ifdef USE_SKINNING
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
#endif`,Lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Um=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Im=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fm=`#ifdef USE_TRANSMISSION
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
#endif`,Om=`#ifdef USE_TRANSMISSION
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
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
}`,Wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
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
}`,jm=`#if DEPTH_PACKING == 3200
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
}`,Km=`#define DISTANCE
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
}`,Zm=`#define DISTANCE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t_=`uniform float scale;
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
}`,e_=`uniform vec3 diffuse;
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
}`,n_=`#include <common>
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
}`,i_=`uniform vec3 diffuse;
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
}`,r_=`#define LAMBERT
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
}`,s_=`#define LAMBERT
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
}`,o_=`#define MATCAP
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
}`,a_=`#define MATCAP
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
}`,l_=`#define NORMAL
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
}`,c_=`#define NORMAL
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
}`,u_=`#define PHONG
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
}`,h_=`#define PHONG
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
}`,f_=`#define STANDARD
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
}`,d_=`#define STANDARD
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
}`,p_=`#define TOON
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
}`,m_=`#define TOON
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
}`,__=`uniform float size;
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
}`,g_=`uniform vec3 diffuse;
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
}`,v_=`#include <common>
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
}`,x_=`uniform vec3 color;
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
}`,M_=`uniform float rotation;
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
}`,y_=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:Gd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:$d,alphatest_fragment:qd,alphatest_pars_fragment:Yd,aomap_fragment:jd,aomap_pars_fragment:Kd,batching_pars_vertex:Zd,batching_vertex:Jd,begin_vertex:Qd,beginnormal_vertex:tp,bsdfs:ep,iridescence_fragment:np,bumpmap_pars_fragment:ip,clipping_planes_fragment:rp,clipping_planes_pars_fragment:sp,clipping_planes_pars_vertex:op,clipping_planes_vertex:ap,color_fragment:lp,color_pars_fragment:cp,color_pars_vertex:up,color_vertex:hp,common:fp,cube_uv_reflection_fragment:dp,defaultnormal_vertex:pp,displacementmap_pars_vertex:mp,displacementmap_vertex:_p,emissivemap_fragment:gp,emissivemap_pars_fragment:vp,colorspace_fragment:xp,colorspace_pars_fragment:Mp,envmap_fragment:yp,envmap_common_pars_fragment:Sp,envmap_pars_fragment:Ep,envmap_pars_vertex:bp,envmap_physical_pars_fragment:Np,envmap_vertex:Tp,fog_vertex:Ap,fog_pars_vertex:wp,fog_fragment:Rp,fog_pars_fragment:Cp,gradientmap_pars_fragment:Pp,lightmap_pars_fragment:Dp,lights_lambert_fragment:Lp,lights_lambert_pars_fragment:Up,lights_pars_begin:Ip,lights_toon_fragment:Fp,lights_toon_pars_fragment:Op,lights_phong_fragment:Bp,lights_phong_pars_fragment:kp,lights_physical_fragment:zp,lights_physical_pars_fragment:Hp,lights_fragment_begin:Vp,lights_fragment_maps:Gp,lights_fragment_end:Wp,logdepthbuf_fragment:Xp,logdepthbuf_pars_fragment:$p,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:jp,map_pars_fragment:Kp,map_particle_fragment:Zp,map_particle_pars_fragment:Jp,metalnessmap_fragment:Qp,metalnessmap_pars_fragment:tm,morphinstance_vertex:em,morphcolor_vertex:nm,morphnormal_vertex:im,morphtarget_pars_vertex:rm,morphtarget_vertex:sm,normal_fragment_begin:om,normal_fragment_maps:am,normal_pars_fragment:lm,normal_pars_vertex:cm,normal_vertex:um,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:fm,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:pm,iridescence_pars_fragment:mm,opaque_fragment:_m,packing:gm,premultiplied_alpha_fragment:vm,project_vertex:xm,dithering_fragment:Mm,dithering_pars_fragment:ym,roughnessmap_fragment:Sm,roughnessmap_pars_fragment:Em,shadowmap_pars_fragment:bm,shadowmap_pars_vertex:Tm,shadowmap_vertex:Am,shadowmask_pars_fragment:wm,skinbase_vertex:Rm,skinning_pars_vertex:Cm,skinning_vertex:Pm,skinnormal_vertex:Dm,specularmap_fragment:Lm,specularmap_pars_fragment:Um,tonemapping_fragment:Im,tonemapping_pars_fragment:Nm,transmission_fragment:Fm,transmission_pars_fragment:Om,uv_pars_fragment:Bm,uv_pars_vertex:km,uv_vertex:zm,worldpos_vertex:Hm,background_vert:Vm,background_frag:Gm,backgroundCube_vert:Wm,backgroundCube_frag:Xm,cube_vert:$m,cube_frag:qm,depth_vert:Ym,depth_frag:jm,distanceRGBA_vert:Km,distanceRGBA_frag:Zm,equirect_vert:Jm,equirect_frag:Qm,linedashed_vert:t_,linedashed_frag:e_,meshbasic_vert:n_,meshbasic_frag:i_,meshlambert_vert:r_,meshlambert_frag:s_,meshmatcap_vert:o_,meshmatcap_frag:a_,meshnormal_vert:l_,meshnormal_frag:c_,meshphong_vert:u_,meshphong_frag:h_,meshphysical_vert:f_,meshphysical_frag:d_,meshtoon_vert:p_,meshtoon_frag:m_,points_vert:__,points_frag:g_,shadow_vert:v_,shadow_frag:x_,sprite_vert:M_,sprite_frag:y_},St={common:{diffuse:{value:new me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new me(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},An={basic:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new me(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new me(0)},specular:{value:new me(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Qe([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Qe([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new me(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Qe([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Qe([St.points,St.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Qe([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Qe([St.common,St.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Qe([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Qe([St.sprite,St.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:Qe([St.common,St.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:Qe([St.lights,St.fog,{color:{value:new me(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};An.physical={uniforms:Qe([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new me(0)},specularColor:{value:new me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const xs={r:0,b:0,g:0},Si=new Pn,S_=new Ne;function E_(n,t,e,i,r,s,o){const a=new me(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function v(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?e:t).get(b)),b}function x(w){let b=!1;const I=v(w);I===null?d(a,l):I&&I.isColor&&(d(I,1),b=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(w,b){const I=v(b);I&&(I.isCubeTexture||I.mapping===Vs)?(u===void 0&&(u=new Rn(new Wr(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:gr(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,C,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Si.copy(b.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(S_.makeRotationFromEuler(Si)),u.material.toneMapped=pe.getTransfer(I.colorSpace)!==Se,(h!==I||f!==I.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=I,f=I.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(c===void 0&&(c=new Rn(new Gs(2,2),new li({name:"BackgroundMaterial",uniforms:gr(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=I,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=pe.getTransfer(I.colorSpace)!==Se,I.matrixAutoUpdate===!0&&I.updateMatrix(),c.material.uniforms.uvTransform.value.copy(I.matrix),(h!==I||f!==I.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=I,f=I.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,b){w.getRGB(xs,du(n)),i.buffers.color.setClear(xs.r,xs.g,xs.b,b,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,b=1){a.set(w),l=b,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(a,l)},render:x,addToRenderList:g,dispose:E}}function b_(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,F,J,q,et){let lt=!1;const Q=h(q,J,F);s!==Q&&(s=Q,c(s.object)),lt=p(S,q,J,et),lt&&v(S,q,J,et),et!==null&&t.update(et,n.ELEMENT_ARRAY_BUFFER),(lt||o)&&(o=!1,b(S,F,J,q),et!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(et).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function h(S,F,J){const q=J.wireframe===!0;let et=i[S.id];et===void 0&&(et={},i[S.id]=et);let lt=et[F.id];lt===void 0&&(lt={},et[F.id]=lt);let Q=lt[q];return Q===void 0&&(Q=f(l()),lt[q]=Q),Q}function f(S){const F=[],J=[],q=[];for(let et=0;et<e;et++)F[et]=0,J[et]=0,q[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:J,attributeDivisors:q,object:S,attributes:{},index:null}}function p(S,F,J,q){const et=s.attributes,lt=F.attributes;let Q=0;const dt=J.getAttributes();for(const Y in dt)if(dt[Y].location>=0){const wt=et[Y];let Bt=lt[Y];if(Bt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Bt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Bt=S.instanceColor)),wt===void 0||wt.attribute!==Bt||Bt&&wt.data!==Bt.data)return!0;Q++}return s.attributesNum!==Q||s.index!==q}function v(S,F,J,q){const et={},lt=F.attributes;let Q=0;const dt=J.getAttributes();for(const Y in dt)if(dt[Y].location>=0){let wt=lt[Y];wt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(wt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(wt=S.instanceColor));const Bt={};Bt.attribute=wt,wt&&wt.data&&(Bt.data=wt.data),et[Y]=Bt,Q++}s.attributes=et,s.attributesNum=Q,s.index=q}function x(){const S=s.newAttributes;for(let F=0,J=S.length;F<J;F++)S[F]=0}function g(S){d(S,0)}function d(S,F){const J=s.newAttributes,q=s.enabledAttributes,et=s.attributeDivisors;J[S]=1,q[S]===0&&(n.enableVertexAttribArray(S),q[S]=1),et[S]!==F&&(n.vertexAttribDivisor(S,F),et[S]=F)}function E(){const S=s.newAttributes,F=s.enabledAttributes;for(let J=0,q=F.length;J<q;J++)F[J]!==S[J]&&(n.disableVertexAttribArray(J),F[J]=0)}function w(S,F,J,q,et,lt,Q){Q===!0?n.vertexAttribIPointer(S,F,J,et,lt):n.vertexAttribPointer(S,F,J,q,et,lt)}function b(S,F,J,q){x();const et=q.attributes,lt=J.getAttributes(),Q=F.defaultAttributeValues;for(const dt in lt){const Y=lt[dt];if(Y.location>=0){let Mt=et[dt];if(Mt===void 0&&(dt==="instanceMatrix"&&S.instanceMatrix&&(Mt=S.instanceMatrix),dt==="instanceColor"&&S.instanceColor&&(Mt=S.instanceColor)),Mt!==void 0){const wt=Mt.normalized,Bt=Mt.itemSize,ee=t.get(Mt);if(ee===void 0)continue;const ve=ee.buffer,nt=ee.type,mt=ee.bytesPerElement,Nt=nt===n.INT||nt===n.UNSIGNED_INT||Mt.gpuType===Ba;if(Mt.isInterleavedBufferAttribute){const bt=Mt.data,Ft=bt.stride,ue=Mt.offset;if(bt.isInstancedInterleavedBuffer){for(let Wt=0;Wt<Y.locationSize;Wt++)d(Y.location+Wt,bt.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=bt.meshPerAttribute*bt.count)}else for(let Wt=0;Wt<Y.locationSize;Wt++)g(Y.location+Wt);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let Wt=0;Wt<Y.locationSize;Wt++)w(Y.location+Wt,Bt/Y.locationSize,nt,wt,Ft*mt,(ue+Bt/Y.locationSize*Wt)*mt,Nt)}else{if(Mt.isInstancedBufferAttribute){for(let bt=0;bt<Y.locationSize;bt++)d(Y.location+bt,Mt.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let bt=0;bt<Y.locationSize;bt++)g(Y.location+bt);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let bt=0;bt<Y.locationSize;bt++)w(Y.location+bt,Bt/Y.locationSize,nt,wt,Bt*mt,Bt/Y.locationSize*bt*mt,Nt)}}else if(Q!==void 0){const wt=Q[dt];if(wt!==void 0)switch(wt.length){case 2:n.vertexAttrib2fv(Y.location,wt);break;case 3:n.vertexAttrib3fv(Y.location,wt);break;case 4:n.vertexAttrib4fv(Y.location,wt);break;default:n.vertexAttrib1fv(Y.location,wt)}}}}E()}function I(){O();for(const S in i){const F=i[S];for(const J in F){const q=F[J];for(const et in q)u(q[et].object),delete q[et];delete F[J]}delete i[S]}}function P(S){if(i[S.id]===void 0)return;const F=i[S.id];for(const J in F){const q=F[J];for(const et in q)u(q[et].object),delete q[et];delete F[J]}delete i[S.id]}function C(S){for(const F in i){const J=i[F];if(J[S.id]===void 0)continue;const q=J[S.id];for(const et in q)u(q[et].object),delete q[et];delete J[S.id]}}function O(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:O,resetDefaultState:T,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:E}}function T_(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let v=0;v<h;v++)p+=u[v];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],u[v],f[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let v=0;for(let x=0;x<h;x++)v+=u[x]*f[x];e.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function A_(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==En&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const O=C===Hr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Cn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Hn&&!O)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=v>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:I,maxSamples:P}}function w_(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Qn,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,d=n.get(h);if(!r||v===null||v.length===0||s&&!g)s?u(null):c();else{const E=s?0:i,w=E*4;let b=d.clippingState||null;l.value=b,b=u(v,f,w,p);for(let I=0;I!==w;++I)b[I]=e[I];d.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,v){const x=h!==null?h.length:0;let g=null;if(x!==0){if(g=l.value,v!==!0||g===null){const d=p+x*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<d)&&(g=new Float32Array(d));for(let w=0,b=p;w!==x;++w,b+=4)o.copy(h[w]).applyMatrix4(E,a),o.normal.toArray(g,b),g[b+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function R_(n){let t=new WeakMap;function e(o,a){return a===Jo?o.mapping=pr:a===Qo&&(o.mapping=mr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Jo||a===Qo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new wd(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const or=4,Kl=[.125,.215,.35,.446,.526,.582],Ai=20,Po=new vu,Zl=new me;let Do=null,Lo=0,Uo=0,Io=!1;const bi=(1+Math.sqrt(5))/2,ir=1/bi,Jl=[new V(-bi,ir,0),new V(bi,ir,0),new V(-ir,0,bi),new V(ir,0,bi),new V(0,bi,-ir),new V(0,bi,ir),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],C_=new V;class Ql{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=C_}=s;Do=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Do,Lo,Uo),this._renderer.xr.enabled=Io,t.scissorTest=!1,Ms(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===pr||t.mapping===mr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Do=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Hr,format:En,colorSpace:_r,depthBuffer:!1},r=tc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P_(s)),this._blurMaterial=D_(s,t,e)}return r}_compileMaterial(t){const e=new Rn(this._lodPlanes[0],t);this._renderer.compile(e,Po)}_sceneToCubeUV(t,e,i,r,s){const l=new pn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Zl),h.toneMapping=ri,h.autoClear=!1;const v=new uu({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),x=new Rn(new Wr,v);let g=!1;const d=t.background;d?d.isColor&&(v.color.copy(d),t.background=null,g=!0):(v.color.copy(Zl),g=!0);for(let E=0;E<6;E++){const w=E%3;w===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):w===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const b=this._cubeSize;Ms(r,w*b,E>2?b:0,b,b),h.setRenderTarget(r),g&&h.render(x,l),h.render(t,l)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=p,h.autoClear=f,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===pr||t.mapping===mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ec());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Rn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ms(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Po)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Jl[(r-s-1)%Jl.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Rn(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ai-1),x=s/v,g=isFinite(s)?1+Math.floor(u*x):Ai;g>Ai&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ai}`);const d=[];let E=0;for(let C=0;C<Ai;++C){const O=C/x,T=Math.exp(-O*O/2);d.push(T),C===0?E+=T:C<g&&(E+=2*T)}for(let C=0;C<d.length;C++)d[C]=d[C]/E;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:w}=this;f.dTheta.value=v,f.mipInt.value=w-i;const b=this._sizeLods[r],I=3*b*(r>w-or?r-w+or:0),P=4*(this._cubeSize-b);Ms(e,I,P,3*b,2*b),l.setRenderTarget(e),l.render(h,Po)}}function P_(n){const t=[],e=[],i=[];let r=n;const s=n-or+1+Kl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-or?l=Kl[o-n+or-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,v=6,x=3,g=2,d=1,E=new Float32Array(x*v*p),w=new Float32Array(g*v*p),b=new Float32Array(d*v*p);for(let P=0;P<p;P++){const C=P%3*2/3-1,O=P>2?0:-1,T=[C,O,0,C+2/3,O,0,C+2/3,O+1,0,C,O,0,C+2/3,O+1,0,C,O+1,0];E.set(T,x*v*P),w.set(f,g*v*P);const S=[P,P,P,P,P,P];b.set(S,d*v*P)}const I=new ui;I.setAttribute("position",new hn(E,x)),I.setAttribute("uv",new hn(w,g)),I.setAttribute("faceIndex",new hn(b,d)),t.push(I),r>or&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function tc(n,t,e){const i=new Oi(n,t,e);return i.texture.mapping=Vs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ms(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function D_(n,t,e){const i=new Float32Array(Ai),r=new V(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:qa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ec(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function nc(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function qa(){return`

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
	`}function L_(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Jo||l===Qo,u=l===pr||l===mr;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ql(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new Ql(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function U_(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&cr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function I_(n,t,e,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const v in f.attributes)t.remove(f.attributes[v]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)t.update(f[p],n.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,v=h.attributes.position;let x=0;if(p!==null){const E=p.array;x=p.version;for(let w=0,b=E.length;w<b;w+=3){const I=E[w+0],P=E[w+1],C=E[w+2];f.push(I,P,P,C,C,I)}}else if(v!==void 0){const E=v.array;x=v.version;for(let w=0,b=E.length/3-1;w<b;w+=3){const I=w+0,P=w+1,C=w+2;f.push(I,P,P,C,C,I)}}else return;const g=new(su(f)?fu:hu)(f,1);g.version=x;const d=s.get(h);d&&t.remove(d),s.set(h,g)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function N_(n,t,e){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*o),e.update(p,i,1)}function c(f,p,v){v!==0&&(n.drawElementsInstanced(i,p,s,f*o,v),e.update(p,i,v))}function u(f,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,v);let g=0;for(let d=0;d<v;d++)g+=p[d];e.update(g,i,1)}function h(f,p,v,x){if(v===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],x[d]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,v);let d=0;for(let E=0;E<v;E++)d+=p[E]*x[E];e.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function F_(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function O_(n,t,e){const i=new WeakMap,r=new Ie;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let T=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let w=0;p===!0&&(w=1),v===!0&&(w=2),x===!0&&(w=3);let b=a.attributes.position.count*w,I=1;b>t.maxTextureSize&&(I=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const P=new Float32Array(b*I*4*h),C=new ou(P,b,I,h);C.type=Hn,C.needsUpdate=!0;const O=w*4;for(let S=0;S<h;S++){const F=g[S],J=d[S],q=E[S],et=b*I*4*S;for(let lt=0;lt<F.count;lt++){const Q=lt*O;p===!0&&(r.fromBufferAttribute(F,lt),P[et+Q+0]=r.x,P[et+Q+1]=r.y,P[et+Q+2]=r.z,P[et+Q+3]=0),v===!0&&(r.fromBufferAttribute(J,lt),P[et+Q+4]=r.x,P[et+Q+5]=r.y,P[et+Q+6]=r.z,P[et+Q+7]=0),x===!0&&(r.fromBufferAttribute(q,lt),P[et+Q+8]=r.x,P[et+Q+9]=r.y,P[et+Q+10]=r.z,P[et+Q+11]=q.itemSize===4?r.w:1)}}f={count:h,texture:C,size:new Jt(b,I)},i.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const v=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function B_(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const Mu=new an,ic=new _u(1,1),yu=new ou,Su=new ud,Eu=new mu,rc=[],sc=[],oc=new Float32Array(16),ac=new Float32Array(9),lc=new Float32Array(4);function xr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=rc[r];if(s===void 0&&(s=new Float32Array(r),rc[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ke(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ws(n,t){let e=sc[t];e===void 0&&(e=new Int32Array(t),sc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function k_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function z_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ke(e,t)}}function H_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ke(e,t)}}function V_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ke(e,t)}}function G_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;lc.set(i),n.uniformMatrix2fv(this.addr,!1,lc),ke(e,i)}}function W_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;ac.set(i),n.uniformMatrix3fv(this.addr,!1,ac),ke(e,i)}}function X_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;oc.set(i),n.uniformMatrix4fv(this.addr,!1,oc),ke(e,i)}}function $_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function q_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ke(e,t)}}function Y_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ke(e,t)}}function j_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ke(e,t)}}function K_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Z_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ke(e,t)}}function J_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ke(e,t)}}function Q_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ke(e,t)}}function tg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ic.compareFunction=ru,s=ic):s=Mu,e.setTexture2D(t||s,r)}function eg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Su,r)}function ng(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Eu,r)}function ig(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||yu,r)}function rg(n){switch(n){case 5126:return k_;case 35664:return z_;case 35665:return H_;case 35666:return V_;case 35674:return G_;case 35675:return W_;case 35676:return X_;case 5124:case 35670:return $_;case 35667:case 35671:return q_;case 35668:case 35672:return Y_;case 35669:case 35673:return j_;case 5125:return K_;case 36294:return Z_;case 36295:return J_;case 36296:return Q_;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}function sg(n,t){n.uniform1fv(this.addr,t)}function og(n,t){const e=xr(t,this.size,2);n.uniform2fv(this.addr,e)}function ag(n,t){const e=xr(t,this.size,3);n.uniform3fv(this.addr,e)}function lg(n,t){const e=xr(t,this.size,4);n.uniform4fv(this.addr,e)}function cg(n,t){const e=xr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ug(n,t){const e=xr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function hg(n,t){const e=xr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function fg(n,t){n.uniform1iv(this.addr,t)}function dg(n,t){n.uniform2iv(this.addr,t)}function pg(n,t){n.uniform3iv(this.addr,t)}function mg(n,t){n.uniform4iv(this.addr,t)}function _g(n,t){n.uniform1uiv(this.addr,t)}function gg(n,t){n.uniform2uiv(this.addr,t)}function vg(n,t){n.uniform3uiv(this.addr,t)}function xg(n,t){n.uniform4uiv(this.addr,t)}function Mg(n,t,e){const i=this.cache,r=t.length,s=Ws(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Mu,s[o])}function yg(n,t,e){const i=this.cache,r=t.length,s=Ws(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Su,s[o])}function Sg(n,t,e){const i=this.cache,r=t.length,s=Ws(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Eu,s[o])}function Eg(n,t,e){const i=this.cache,r=t.length,s=Ws(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||yu,s[o])}function bg(n){switch(n){case 5126:return sg;case 35664:return og;case 35665:return ag;case 35666:return lg;case 35674:return cg;case 35675:return ug;case 35676:return hg;case 5124:case 35670:return fg;case 35667:case 35671:return dg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return _g;case 36294:return gg;case 36295:return vg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return Eg}}class Tg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=rg(e.type)}}class Ag{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bg(e.type)}}class wg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const No=/(\w+)(\])?(\[|\.)?/g;function cc(n,t){n.seq.push(t),n.map[t.id]=t}function Rg(n,t,e){const i=n.name,r=i.length;for(No.lastIndex=0;;){const s=No.exec(i),o=No.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){cc(e,c===void 0?new Tg(a,n,t):new Ag(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new wg(a),cc(e,h)),e=h}}}class Ds{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Rg(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function uc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Cg=37297;let Pg=0;function Dg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const hc=new Qt;function Lg(n){pe._getMatrix(hc,pe.workingColorSpace,n);const t=`mat3( ${hc.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(n)){case Fs:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function fc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Dg(n.getShaderSource(t),o)}else return r}function Ug(n,t){const e=Lg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ig(n,t){let e;switch(t){case Nf:e="Linear";break;case Ff:e="Reinhard";break;case Of:e="Cineon";break;case Bf:e="ACESFilmic";break;case zf:e="AgX";break;case Hf:e="Neutral";break;case kf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ys=new V;function Ng(){pe.getLuminanceCoefficients(ys);const n=ys.x.toFixed(4),t=ys.y.toFixed(4),e=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function Og(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Bg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Dr(n){return n!==""}function dc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ca(n){return n.replace(kg,Hg)}const zg=new Map;function Hg(n,t){let e=te[t];if(e===void 0){const i=zg.get(t);if(i!==void 0)e=te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ca(e)}const Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mc(n){return n.replace(Vg,Gg)}function Gg(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _c(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Wg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===$c?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===pf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function Xg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case pr:case mr:t="ENVMAP_TYPE_CUBE";break;case Vs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $g(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mr:t="ENVMAP_MODE_REFRACTION";break}return t}function qg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case qc:t="ENVMAP_BLENDING_MULTIPLY";break;case Uf:t="ENVMAP_BLENDING_MIX";break;case If:t="ENVMAP_BLENDING_ADD";break}return t}function Yg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function jg(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Wg(e),c=Xg(e),u=$g(e),h=qg(e),f=Yg(e),p=Fg(e),v=Og(s),x=r.createProgram();let g,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Dr).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Dr).join(`
`),d.length>0&&(d+=`
`)):(g=[_c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),d=[_c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?te.tonemapping_pars_fragment:"",e.toneMapping!==ri?Ig("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Ug("linearToOutputTexel",e.outputColorSpace),Ng(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Dr).join(`
`)),o=Ca(o),o=dc(o,e),o=pc(o,e),a=Ca(a),a=dc(a,e),a=pc(a,e),o=mc(o),a=mc(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const w=E+g+o,b=E+d+a,I=uc(r,r.VERTEX_SHADER,w),P=uc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,I),r.attachShader(x,P),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function C(F){if(n.debug.checkShaderErrors){const J=r.getProgramInfoLog(x).trim(),q=r.getShaderInfoLog(I).trim(),et=r.getShaderInfoLog(P).trim();let lt=!0,Q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(lt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,I,P);else{const dt=fc(r,I,"vertex"),Y=fc(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+J+`
`+dt+`
`+Y)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(q===""||et==="")&&(Q=!1);Q&&(F.diagnostics={runnable:lt,programLog:J,vertexShader:{log:q,prefix:g},fragmentShader:{log:et,prefix:d}})}r.deleteShader(I),r.deleteShader(P),O=new Ds(r,x),T=Bg(r,x)}let O;this.getUniforms=function(){return O===void 0&&C(this),O};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,Cg)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Pg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=P,this}let Kg=0;class Zg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Jg(t),e.set(t,i)),i}}class Jg{constructor(t){this.id=Kg++,this.code=t,this.usedTimes=0}}function Qg(n,t,e,i,r,s,o){const a=new lu,l=new Zg,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,S,F,J,q){const et=J.fog,lt=q.geometry,Q=T.isMeshStandardMaterial?J.environment:null,dt=(T.isMeshStandardMaterial?e:t).get(T.envMap||Q),Y=dt&&dt.mapping===Vs?dt.image.height:null,Mt=v[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const wt=lt.morphAttributes.position||lt.morphAttributes.normal||lt.morphAttributes.color,Bt=wt!==void 0?wt.length:0;let ee=0;lt.morphAttributes.position!==void 0&&(ee=1),lt.morphAttributes.normal!==void 0&&(ee=2),lt.morphAttributes.color!==void 0&&(ee=3);let ve,nt,mt,Nt;if(Mt){const de=An[Mt];ve=de.vertexShader,nt=de.fragmentShader}else ve=T.vertexShader,nt=T.fragmentShader,l.update(T),mt=l.getVertexShaderID(T),Nt=l.getFragmentShaderID(T);const bt=n.getRenderTarget(),Ft=n.state.buffers.depth.getReversed(),ue=q.isInstancedMesh===!0,Wt=q.isBatchedMesh===!0,Te=!!T.map,Re=!!T.matcap,jt=!!dt,U=!!T.aoMap,Ge=!!T.lightMap,he=!!T.bumpMap,xe=!!T.normalMap,Lt=!!T.displacementMap,ie=!!T.emissiveMap,kt=!!T.metalnessMap,Kt=!!T.roughnessMap,Ae=T.anisotropy>0,R=T.clearcoat>0,M=T.dispersion>0,G=T.iridescence>0,tt=T.sheen>0,st=T.transmission>0,K=Ae&&!!T.anisotropyMap,gt=R&&!!T.clearcoatMap,_t=R&&!!T.clearcoatNormalMap,ft=R&&!!T.clearcoatRoughnessMap,It=G&&!!T.iridescenceMap,it=G&&!!T.iridescenceThicknessMap,Rt=tt&&!!T.sheenColorMap,Gt=tt&&!!T.sheenRoughnessMap,Vt=!!T.specularMap,vt=!!T.specularColorMap,$t=!!T.specularIntensityMap,N=st&&!!T.transmissionMap,yt=st&&!!T.thicknessMap,ct=!!T.gradientMap,Ct=!!T.alphaMap,ut=T.alphaTest>0,ot=!!T.alphaHash,Pt=!!T.extensions;let qt=ri;T.toneMapped&&(bt===null||bt.isXRRenderTarget===!0)&&(qt=n.toneMapping);const Me={shaderID:Mt,shaderType:T.type,shaderName:T.name,vertexShader:ve,fragmentShader:nt,defines:T.defines,customVertexShaderID:mt,customFragmentShaderID:Nt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Wt,batchingColor:Wt&&q._colorsTexture!==null,instancing:ue,instancingColor:ue&&q.instanceColor!==null,instancingMorph:ue&&q.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:bt===null?n.outputColorSpace:bt.isXRRenderTarget===!0?bt.texture.colorSpace:_r,alphaToCoverage:!!T.alphaToCoverage,map:Te,matcap:Re,envMap:jt,envMapMode:jt&&dt.mapping,envMapCubeUVHeight:Y,aoMap:U,lightMap:Ge,bumpMap:he,normalMap:xe,displacementMap:f&&Lt,emissiveMap:ie,normalMapObjectSpace:xe&&T.normalMapType===Xf,normalMapTangentSpace:xe&&T.normalMapType===iu,metalnessMap:kt,roughnessMap:Kt,anisotropy:Ae,anisotropyMap:K,clearcoat:R,clearcoatMap:gt,clearcoatNormalMap:_t,clearcoatRoughnessMap:ft,dispersion:M,iridescence:G,iridescenceMap:It,iridescenceThicknessMap:it,sheen:tt,sheenColorMap:Rt,sheenRoughnessMap:Gt,specularMap:Vt,specularColorMap:vt,specularIntensityMap:$t,transmission:st,transmissionMap:N,thicknessMap:yt,gradientMap:ct,opaque:T.transparent===!1&&T.blending===lr&&T.alphaToCoverage===!1,alphaMap:Ct,alphaTest:ut,alphaHash:ot,combine:T.combine,mapUv:Te&&x(T.map.channel),aoMapUv:U&&x(T.aoMap.channel),lightMapUv:Ge&&x(T.lightMap.channel),bumpMapUv:he&&x(T.bumpMap.channel),normalMapUv:xe&&x(T.normalMap.channel),displacementMapUv:Lt&&x(T.displacementMap.channel),emissiveMapUv:ie&&x(T.emissiveMap.channel),metalnessMapUv:kt&&x(T.metalnessMap.channel),roughnessMapUv:Kt&&x(T.roughnessMap.channel),anisotropyMapUv:K&&x(T.anisotropyMap.channel),clearcoatMapUv:gt&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:_t&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:it&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&x(T.sheenRoughnessMap.channel),specularMapUv:Vt&&x(T.specularMap.channel),specularColorMapUv:vt&&x(T.specularColorMap.channel),specularIntensityMapUv:$t&&x(T.specularIntensityMap.channel),transmissionMapUv:N&&x(T.transmissionMap.channel),thicknessMapUv:yt&&x(T.thicknessMap.channel),alphaMapUv:Ct&&x(T.alphaMap.channel),vertexTangents:!!lt.attributes.tangent&&(xe||Ae),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!lt.attributes.color&&lt.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!lt.attributes.uv&&(Te||Ct),fog:!!et,useFog:T.fog===!0,fogExp2:!!et&&et.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ft,skinning:q.isSkinnedMesh===!0,morphTargets:lt.morphAttributes.position!==void 0,morphNormals:lt.morphAttributes.normal!==void 0,morphColors:lt.morphAttributes.color!==void 0,morphTargetsCount:Bt,morphTextureStride:ee,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:qt,decodeVideoTexture:Te&&T.map.isVideoTexture===!0&&pe.getTransfer(T.map.colorSpace)===Se,decodeVideoTextureEmissive:ie&&T.emissiveMap.isVideoTexture===!0&&pe.getTransfer(T.emissiveMap.colorSpace)===Se,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===kn,flipSided:T.side===on,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Pt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&T.extensions.multiDraw===!0||Wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function d(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const F in T.defines)S.push(F),S.push(T.defines[F]);return T.isRawShaderMaterial===!1&&(E(S,T),w(S,T),S.push(n.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function E(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function w(T,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),T.push(a.mask)}function b(T){const S=v[T.type];let F;if(S){const J=An[S];F=Ed.clone(J.uniforms)}else F=T.uniforms;return F}function I(T,S){let F;for(let J=0,q=u.length;J<q;J++){const et=u[J];if(et.cacheKey===S){F=et,++F.usedTimes;break}}return F===void 0&&(F=new jg(n,S,T,s),u.push(F)),F}function P(T){if(--T.usedTimes===0){const S=u.indexOf(T);u[S]=u[u.length-1],u.pop(),T.destroy()}}function C(T){l.remove(T)}function O(){l.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:b,acquireProgram:I,releaseProgram:P,releaseShaderCache:C,programs:u,dispose:O}}function t0(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function e0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function gc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function vc(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,f,p,v,x,g){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:x,group:g},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=v,d.renderOrder=h.renderOrder,d.z=x,d.group=g),t++,d}function a(h,f,p,v,x,g){const d=o(h,f,p,v,x,g);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(h,f,p,v,x,g){const d=o(h,f,p,v,x,g);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||e0),i.length>1&&i.sort(f||gc),r.length>1&&r.sort(f||gc)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function n0(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new vc,n.set(i,[o])):r>=s.length?(o=new vc,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function i0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new me};break;case"SpotLight":e={position:new V,direction:new V,color:new me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new me,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new me,groundColor:new me};break;case"RectAreaLight":e={color:new me,position:new V,halfWidth:new V,halfHeight:new V};break}return n[t.id]=e,e}}}function r0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let s0=0;function o0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function a0(n){const t=new i0,e=r0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const r=new V,s=new Ne,o=new Ne;function a(c){let u=0,h=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,v=0,x=0,g=0,d=0,E=0,w=0,b=0,I=0,P=0,C=0;c.sort(o0);for(let T=0,S=c.length;T<S;T++){const F=c[T],J=F.color,q=F.intensity,et=F.distance,lt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)u+=J.r*q,h+=J.g*q,f+=J.b*q;else if(F.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(F.sh.coefficients[Q],q);C++}else if(F.isDirectionalLight){const Q=t.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const dt=F.shadow,Y=e.get(F);Y.shadowIntensity=dt.intensity,Y.shadowBias=dt.bias,Y.shadowNormalBias=dt.normalBias,Y.shadowRadius=dt.radius,Y.shadowMapSize=dt.mapSize,i.directionalShadow[p]=Y,i.directionalShadowMap[p]=lt,i.directionalShadowMatrix[p]=F.shadow.matrix,E++}i.directional[p]=Q,p++}else if(F.isSpotLight){const Q=t.get(F);Q.position.setFromMatrixPosition(F.matrixWorld),Q.color.copy(J).multiplyScalar(q),Q.distance=et,Q.coneCos=Math.cos(F.angle),Q.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Q.decay=F.decay,i.spot[x]=Q;const dt=F.shadow;if(F.map&&(i.spotLightMap[I]=F.map,I++,dt.updateMatrices(F),F.castShadow&&P++),i.spotLightMatrix[x]=dt.matrix,F.castShadow){const Y=e.get(F);Y.shadowIntensity=dt.intensity,Y.shadowBias=dt.bias,Y.shadowNormalBias=dt.normalBias,Y.shadowRadius=dt.radius,Y.shadowMapSize=dt.mapSize,i.spotShadow[x]=Y,i.spotShadowMap[x]=lt,b++}x++}else if(F.isRectAreaLight){const Q=t.get(F);Q.color.copy(J).multiplyScalar(q),Q.halfWidth.set(F.width*.5,0,0),Q.halfHeight.set(0,F.height*.5,0),i.rectArea[g]=Q,g++}else if(F.isPointLight){const Q=t.get(F);if(Q.color.copy(F.color).multiplyScalar(F.intensity),Q.distance=F.distance,Q.decay=F.decay,F.castShadow){const dt=F.shadow,Y=e.get(F);Y.shadowIntensity=dt.intensity,Y.shadowBias=dt.bias,Y.shadowNormalBias=dt.normalBias,Y.shadowRadius=dt.radius,Y.shadowMapSize=dt.mapSize,Y.shadowCameraNear=dt.camera.near,Y.shadowCameraFar=dt.camera.far,i.pointShadow[v]=Y,i.pointShadowMap[v]=lt,i.pointShadowMatrix[v]=F.shadow.matrix,w++}i.point[v]=Q,v++}else if(F.isHemisphereLight){const Q=t.get(F);Q.skyColor.copy(F.color).multiplyScalar(q),Q.groundColor.copy(F.groundColor).multiplyScalar(q),i.hemi[d]=Q,d++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const O=i.hash;(O.directionalLength!==p||O.pointLength!==v||O.spotLength!==x||O.rectAreaLength!==g||O.hemiLength!==d||O.numDirectionalShadows!==E||O.numPointShadows!==w||O.numSpotShadows!==b||O.numSpotMaps!==I||O.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+I-P,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=C,O.directionalLength=p,O.pointLength=v,O.spotLength=x,O.rectAreaLength=g,O.hemiLength=d,O.numDirectionalShadows=E,O.numPointShadows=w,O.numSpotShadows=b,O.numSpotMaps=I,O.numLightProbes=C,i.version=s0++)}function l(c,u){let h=0,f=0,p=0,v=0,x=0;const g=u.matrixWorldInverse;for(let d=0,E=c.length;d<E;d++){const w=c[d];if(w.isDirectionalLight){const b=i.directional[h];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),h++}else if(w.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(g),p++}else if(w.isRectAreaLight){const b=i.rectArea[v];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),o.identity(),s.copy(w.matrixWorld),s.premultiply(g),o.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(g),f++}else if(w.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function xc(n){const t=new a0(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function l0(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new xc(n),t.set(r,[a])):s>=o.length?(a=new xc(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const c0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u0=`uniform sampler2D shadow_pass;
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
}`;function h0(n,t,e){let i=new $a;const r=new Jt,s=new Jt,o=new Ie,a=new Id({depthPacking:Wf}),l=new Nd,c={},u=e.maxTextureSize,h={[ai]:on,[on]:ai,[kn]:kn},f=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:c0,fragmentShader:u0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new ui;v.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Rn(v,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$c;let d=this.type;this.render=function(P,C,O){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const T=n.getRenderTarget(),S=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),J=n.state;J.setBlending(ii),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const q=d!==Bn&&this.type===Bn,et=d===Bn&&this.type!==Bn;for(let lt=0,Q=P.length;lt<Q;lt++){const dt=P[lt],Y=dt.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",dt,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const Mt=Y.getFrameExtents();if(r.multiply(Mt),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Mt.x),r.x=s.x*Mt.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Mt.y),r.y=s.y*Mt.y,Y.mapSize.y=s.y)),Y.map===null||q===!0||et===!0){const Bt=this.type!==Bn?{minFilter:bn,magFilter:bn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Oi(r.x,r.y,Bt),Y.map.texture.name=dt.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const wt=Y.getViewportCount();for(let Bt=0;Bt<wt;Bt++){const ee=Y.getViewport(Bt);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),J.viewport(o),Y.updateMatrices(dt,Bt),i=Y.getFrustum(),b(C,O,Y.camera,dt,this.type)}Y.isPointLightShadow!==!0&&this.type===Bn&&E(Y,O),Y.needsUpdate=!1}d=this.type,g.needsUpdate=!1,n.setRenderTarget(T,S,F)};function E(P,C){const O=t.update(x);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Oi(r.x,r.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(C,null,O,f,x,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(C,null,O,p,x,null)}function w(P,C,O,T){let S=null;const F=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(F!==void 0)S=F;else if(S=O.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const J=S.uuid,q=C.uuid;let et=c[J];et===void 0&&(et={},c[J]=et);let lt=et[q];lt===void 0&&(lt=S.clone(),et[q]=lt,C.addEventListener("dispose",I)),S=lt}if(S.visible=C.visible,S.wireframe=C.wireframe,T===Bn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:h[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,O.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const J=n.properties.get(S);J.light=O}return S}function b(P,C,O,T,S){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===Bn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);const q=t.update(P),et=P.material;if(Array.isArray(et)){const lt=q.groups;for(let Q=0,dt=lt.length;Q<dt;Q++){const Y=lt[Q],Mt=et[Y.materialIndex];if(Mt&&Mt.visible){const wt=w(P,Mt,T,S);P.onBeforeShadow(n,P,C,O,q,wt,Y),n.renderBufferDirect(O,null,q,wt,P,Y),P.onAfterShadow(n,P,C,O,q,wt,Y)}}}else if(et.visible){const lt=w(P,et,T,S);P.onBeforeShadow(n,P,C,O,q,lt,null),n.renderBufferDirect(O,null,q,lt,P,null),P.onAfterShadow(n,P,C,O,q,lt,null)}}const J=P.children;for(let q=0,et=J.length;q<et;q++)b(J[q],C,O,T,S)}function I(P){P.target.removeEventListener("dispose",I);for(const O in c){const T=c[O],S=P.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const f0={[Xo]:$o,[qo]:Ko,[Yo]:Zo,[dr]:jo,[$o]:Xo,[Ko]:qo,[Zo]:Yo,[jo]:dr};function d0(n,t){function e(){let N=!1;const yt=new Ie;let ct=null;const Ct=new Ie(0,0,0,0);return{setMask:function(ut){ct!==ut&&!N&&(n.colorMask(ut,ut,ut,ut),ct=ut)},setLocked:function(ut){N=ut},setClear:function(ut,ot,Pt,qt,Me){Me===!0&&(ut*=qt,ot*=qt,Pt*=qt),yt.set(ut,ot,Pt,qt),Ct.equals(yt)===!1&&(n.clearColor(ut,ot,Pt,qt),Ct.copy(yt))},reset:function(){N=!1,ct=null,Ct.set(-1,0,0,0)}}}function i(){let N=!1,yt=!1,ct=null,Ct=null,ut=null;return{setReversed:function(ot){if(yt!==ot){const Pt=t.get("EXT_clip_control");ot?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),yt=ot;const qt=ut;ut=null,this.setClear(qt)}},getReversed:function(){return yt},setTest:function(ot){ot?bt(n.DEPTH_TEST):Ft(n.DEPTH_TEST)},setMask:function(ot){ct!==ot&&!N&&(n.depthMask(ot),ct=ot)},setFunc:function(ot){if(yt&&(ot=f0[ot]),Ct!==ot){switch(ot){case Xo:n.depthFunc(n.NEVER);break;case $o:n.depthFunc(n.ALWAYS);break;case qo:n.depthFunc(n.LESS);break;case dr:n.depthFunc(n.LEQUAL);break;case Yo:n.depthFunc(n.EQUAL);break;case jo:n.depthFunc(n.GEQUAL);break;case Ko:n.depthFunc(n.GREATER);break;case Zo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ct=ot}},setLocked:function(ot){N=ot},setClear:function(ot){ut!==ot&&(yt&&(ot=1-ot),n.clearDepth(ot),ut=ot)},reset:function(){N=!1,ct=null,Ct=null,ut=null,yt=!1}}}function r(){let N=!1,yt=null,ct=null,Ct=null,ut=null,ot=null,Pt=null,qt=null,Me=null;return{setTest:function(de){N||(de?bt(n.STENCIL_TEST):Ft(n.STENCIL_TEST))},setMask:function(de){yt!==de&&!N&&(n.stencilMask(de),yt=de)},setFunc:function(de,We,mn){(ct!==de||Ct!==We||ut!==mn)&&(n.stencilFunc(de,We,mn),ct=de,Ct=We,ut=mn)},setOp:function(de,We,mn){(ot!==de||Pt!==We||qt!==mn)&&(n.stencilOp(de,We,mn),ot=de,Pt=We,qt=mn)},setLocked:function(de){N=de},setClear:function(de){Me!==de&&(n.clearStencil(de),Me=de)},reset:function(){N=!1,yt=null,ct=null,Ct=null,ut=null,ot=null,Pt=null,qt=null,Me=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],v=null,x=!1,g=null,d=null,E=null,w=null,b=null,I=null,P=null,C=new me(0,0,0),O=0,T=!1,S=null,F=null,J=null,q=null,et=null;const lt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,dt=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(dt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Q=dt>=1):Y.indexOf("OpenGL ES")!==-1&&(dt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Q=dt>=2);let Mt=null,wt={};const Bt=n.getParameter(n.SCISSOR_BOX),ee=n.getParameter(n.VIEWPORT),ve=new Ie().fromArray(Bt),nt=new Ie().fromArray(ee);function mt(N,yt,ct,Ct){const ut=new Uint8Array(4),ot=n.createTexture();n.bindTexture(N,ot),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pt=0;Pt<ct;Pt++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,Ct,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(yt+Pt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return ot}const Nt={};Nt[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),Nt[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Nt[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),bt(n.DEPTH_TEST),o.setFunc(dr),he(!1),xe(yl),bt(n.CULL_FACE),U(ii);function bt(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Ft(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function ue(N,yt){return h[N]!==yt?(n.bindFramebuffer(N,yt),h[N]=yt,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=yt),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function Wt(N,yt){let ct=p,Ct=!1;if(N){ct=f.get(yt),ct===void 0&&(ct=[],f.set(yt,ct));const ut=N.textures;if(ct.length!==ut.length||ct[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Pt=ut.length;ot<Pt;ot++)ct[ot]=n.COLOR_ATTACHMENT0+ot;ct.length=ut.length,Ct=!0}}else ct[0]!==n.BACK&&(ct[0]=n.BACK,Ct=!0);Ct&&n.drawBuffers(ct)}function Te(N){return v!==N?(n.useProgram(N),v=N,!0):!1}const Re={[Ti]:n.FUNC_ADD,[_f]:n.FUNC_SUBTRACT,[gf]:n.FUNC_REVERSE_SUBTRACT};Re[vf]=n.MIN,Re[xf]=n.MAX;const jt={[Mf]:n.ZERO,[yf]:n.ONE,[Sf]:n.SRC_COLOR,[Go]:n.SRC_ALPHA,[Rf]:n.SRC_ALPHA_SATURATE,[Af]:n.DST_COLOR,[bf]:n.DST_ALPHA,[Ef]:n.ONE_MINUS_SRC_COLOR,[Wo]:n.ONE_MINUS_SRC_ALPHA,[wf]:n.ONE_MINUS_DST_COLOR,[Tf]:n.ONE_MINUS_DST_ALPHA,[Cf]:n.CONSTANT_COLOR,[Pf]:n.ONE_MINUS_CONSTANT_COLOR,[Df]:n.CONSTANT_ALPHA,[Lf]:n.ONE_MINUS_CONSTANT_ALPHA};function U(N,yt,ct,Ct,ut,ot,Pt,qt,Me,de){if(N===ii){x===!0&&(Ft(n.BLEND),x=!1);return}if(x===!1&&(bt(n.BLEND),x=!0),N!==mf){if(N!==g||de!==T){if((d!==Ti||b!==Ti)&&(n.blendEquation(n.FUNC_ADD),d=Ti,b=Ti),de)switch(N){case lr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sl:n.blendFunc(n.ONE,n.ONE);break;case El:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case bl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case lr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case El:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}E=null,w=null,I=null,P=null,C.set(0,0,0),O=0,g=N,T=de}return}ut=ut||yt,ot=ot||ct,Pt=Pt||Ct,(yt!==d||ut!==b)&&(n.blendEquationSeparate(Re[yt],Re[ut]),d=yt,b=ut),(ct!==E||Ct!==w||ot!==I||Pt!==P)&&(n.blendFuncSeparate(jt[ct],jt[Ct],jt[ot],jt[Pt]),E=ct,w=Ct,I=ot,P=Pt),(qt.equals(C)===!1||Me!==O)&&(n.blendColor(qt.r,qt.g,qt.b,Me),C.copy(qt),O=Me),g=N,T=!1}function Ge(N,yt){N.side===kn?Ft(n.CULL_FACE):bt(n.CULL_FACE);let ct=N.side===on;yt&&(ct=!ct),he(ct),N.blending===lr&&N.transparent===!1?U(ii):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ct=N.stencilWrite;a.setTest(Ct),Ct&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?bt(n.SAMPLE_ALPHA_TO_COVERAGE):Ft(n.SAMPLE_ALPHA_TO_COVERAGE)}function he(N){S!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),S=N)}function xe(N){N!==ff?(bt(n.CULL_FACE),N!==F&&(N===yl?n.cullFace(n.BACK):N===df?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ft(n.CULL_FACE),F=N}function Lt(N){N!==J&&(Q&&n.lineWidth(N),J=N)}function ie(N,yt,ct){N?(bt(n.POLYGON_OFFSET_FILL),(q!==yt||et!==ct)&&(n.polygonOffset(yt,ct),q=yt,et=ct)):Ft(n.POLYGON_OFFSET_FILL)}function kt(N){N?bt(n.SCISSOR_TEST):Ft(n.SCISSOR_TEST)}function Kt(N){N===void 0&&(N=n.TEXTURE0+lt-1),Mt!==N&&(n.activeTexture(N),Mt=N)}function Ae(N,yt,ct){ct===void 0&&(Mt===null?ct=n.TEXTURE0+lt-1:ct=Mt);let Ct=wt[ct];Ct===void 0&&(Ct={type:void 0,texture:void 0},wt[ct]=Ct),(Ct.type!==N||Ct.texture!==yt)&&(Mt!==ct&&(n.activeTexture(ct),Mt=ct),n.bindTexture(N,yt||Nt[N]),Ct.type=N,Ct.texture=yt)}function R(){const N=wt[Mt];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function M(){try{n.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{n.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{n.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{n.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{n.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{n.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ft(){try{n.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{n.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function it(){try{n.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(N){ve.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),ve.copy(N))}function Gt(N){nt.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),nt.copy(N))}function Vt(N,yt){let ct=c.get(yt);ct===void 0&&(ct=new WeakMap,c.set(yt,ct));let Ct=ct.get(N);Ct===void 0&&(Ct=n.getUniformBlockIndex(yt,N.name),ct.set(N,Ct))}function vt(N,yt){const Ct=c.get(yt).get(N);l.get(yt)!==Ct&&(n.uniformBlockBinding(yt,Ct,N.__bindingPointIndex),l.set(yt,Ct))}function $t(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Mt=null,wt={},h={},f=new WeakMap,p=[],v=null,x=!1,g=null,d=null,E=null,w=null,b=null,I=null,P=null,C=new me(0,0,0),O=0,T=!1,S=null,F=null,J=null,q=null,et=null,ve.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:bt,disable:Ft,bindFramebuffer:ue,drawBuffers:Wt,useProgram:Te,setBlending:U,setMaterial:Ge,setFlipSided:he,setCullFace:xe,setLineWidth:Lt,setPolygonOffset:ie,setScissorTest:kt,activeTexture:Kt,bindTexture:Ae,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:G,texImage2D:It,texImage3D:it,updateUBOMapping:Vt,uniformBlockBinding:vt,texStorage2D:_t,texStorage3D:ft,texSubImage2D:tt,texSubImage3D:st,compressedTexSubImage2D:K,compressedTexSubImage3D:gt,scissor:Rt,viewport:Gt,reset:$t}}function p0(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Jt,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,M){return p?new OffscreenCanvas(R,M):Bs("canvas")}function x(R,M,G){let tt=1;const st=Ae(R);if((st.width>G||st.height>G)&&(tt=G/Math.max(st.width,st.height)),tt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(tt*st.width),gt=Math.floor(tt*st.height);h===void 0&&(h=v(K,gt));const _t=M?v(K,gt):h;return _t.width=K,_t.height=gt,_t.getContext("2d").drawImage(R,0,0,K,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+K+"x"+gt+")."),_t}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),R;return R}function g(R){return R.generateMipmaps}function d(R){n.generateMipmap(R)}function E(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(R,M,G,tt,st=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=M;if(M===n.RED&&(G===n.FLOAT&&(K=n.R32F),G===n.HALF_FLOAT&&(K=n.R16F),G===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.R8UI),G===n.UNSIGNED_SHORT&&(K=n.R16UI),G===n.UNSIGNED_INT&&(K=n.R32UI),G===n.BYTE&&(K=n.R8I),G===n.SHORT&&(K=n.R16I),G===n.INT&&(K=n.R32I)),M===n.RG&&(G===n.FLOAT&&(K=n.RG32F),G===n.HALF_FLOAT&&(K=n.RG16F),G===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RG8UI),G===n.UNSIGNED_SHORT&&(K=n.RG16UI),G===n.UNSIGNED_INT&&(K=n.RG32UI),G===n.BYTE&&(K=n.RG8I),G===n.SHORT&&(K=n.RG16I),G===n.INT&&(K=n.RG32I)),M===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGB8UI),G===n.UNSIGNED_SHORT&&(K=n.RGB16UI),G===n.UNSIGNED_INT&&(K=n.RGB32UI),G===n.BYTE&&(K=n.RGB8I),G===n.SHORT&&(K=n.RGB16I),G===n.INT&&(K=n.RGB32I)),M===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),G===n.UNSIGNED_INT&&(K=n.RGBA32UI),G===n.BYTE&&(K=n.RGBA8I),G===n.SHORT&&(K=n.RGBA16I),G===n.INT&&(K=n.RGBA32I)),M===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),M===n.RGBA){const gt=st?Fs:pe.getTransfer(tt);G===n.FLOAT&&(K=n.RGBA32F),G===n.HALF_FLOAT&&(K=n.RGBA16F),G===n.UNSIGNED_BYTE&&(K=gt===Se?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function b(R,M){let G;return R?M===null||M===Ni||M===Fr?G=n.DEPTH24_STENCIL8:M===Hn?G=n.DEPTH32F_STENCIL8:M===Nr&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ni||M===Fr?G=n.DEPTH_COMPONENT24:M===Hn?G=n.DEPTH_COMPONENT32F:M===Nr&&(G=n.DEPTH_COMPONENT16),G}function I(R,M){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==bn&&R.minFilter!==wn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function P(R){const M=R.target;M.removeEventListener("dispose",P),O(M),M.isVideoTexture&&u.delete(M)}function C(R){const M=R.target;M.removeEventListener("dispose",C),S(M)}function O(R){const M=i.get(R);if(M.__webglInit===void 0)return;const G=R.source,tt=f.get(G);if(tt){const st=tt[M.__cacheKey];st.usedTimes--,st.usedTimes===0&&T(R),Object.keys(tt).length===0&&f.delete(G)}i.remove(R)}function T(R){const M=i.get(R);n.deleteTexture(M.__webglTexture);const G=R.source,tt=f.get(G);delete tt[M.__cacheKey],o.memory.textures--}function S(R){const M=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(M.__webglFramebuffer[tt]))for(let st=0;st<M.__webglFramebuffer[tt].length;st++)n.deleteFramebuffer(M.__webglFramebuffer[tt][st]);else n.deleteFramebuffer(M.__webglFramebuffer[tt]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[tt])}else{if(Array.isArray(M.__webglFramebuffer))for(let tt=0;tt<M.__webglFramebuffer.length;tt++)n.deleteFramebuffer(M.__webglFramebuffer[tt]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let tt=0;tt<M.__webglColorRenderbuffer.length;tt++)M.__webglColorRenderbuffer[tt]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[tt]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=R.textures;for(let tt=0,st=G.length;tt<st;tt++){const K=i.get(G[tt]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(G[tt])}i.remove(R)}let F=0;function J(){F=0}function q(){const R=F;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),F+=1,R}function et(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function lt(R,M){const G=i.get(R);if(R.isVideoTexture&&kt(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const tt=R.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(G,R,M);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+M)}function Q(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Nt(G,R,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+M)}function dt(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Nt(G,R,M);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+M)}function Y(R,M){const G=i.get(R);if(R.version>0&&G.__version!==R.version){bt(G,R,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+M)}const Mt={[ta]:n.REPEAT,[wi]:n.CLAMP_TO_EDGE,[ea]:n.MIRRORED_REPEAT},wt={[bn]:n.NEAREST,[Vf]:n.NEAREST_MIPMAP_NEAREST,[es]:n.NEAREST_MIPMAP_LINEAR,[wn]:n.LINEAR,[ro]:n.LINEAR_MIPMAP_NEAREST,[Ri]:n.LINEAR_MIPMAP_LINEAR},Bt={[$f]:n.NEVER,[Jf]:n.ALWAYS,[qf]:n.LESS,[ru]:n.LEQUAL,[Yf]:n.EQUAL,[Zf]:n.GEQUAL,[jf]:n.GREATER,[Kf]:n.NOTEQUAL};function ee(R,M){if(M.type===Hn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===wn||M.magFilter===ro||M.magFilter===es||M.magFilter===Ri||M.minFilter===wn||M.minFilter===ro||M.minFilter===es||M.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Mt[M.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Mt[M.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Mt[M.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,wt[M.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,wt[M.minFilter]),M.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Bt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===bn||M.minFilter!==es&&M.minFilter!==Ri||M.type===Hn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function ve(R,M){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",P));const tt=M.source;let st=f.get(tt);st===void 0&&(st={},f.set(tt,st));const K=et(M);if(K!==R.__cacheKey){st[K]===void 0&&(st[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),st[K].usedTimes++;const gt=st[R.__cacheKey];gt!==void 0&&(st[R.__cacheKey].usedTimes--,gt.usedTimes===0&&T(M)),R.__cacheKey=K,R.__webglTexture=st[K].texture}return G}function nt(R,M,G){return Math.floor(Math.floor(R/G)/M)}function mt(R,M,G,tt){const K=R.updateRanges;if(K.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,G,tt,M.data);else{K.sort((it,Rt)=>it.start-Rt.start);let gt=0;for(let it=1;it<K.length;it++){const Rt=K[gt],Gt=K[it],Vt=Rt.start+Rt.count,vt=nt(Gt.start,M.width,4),$t=nt(Rt.start,M.width,4);Gt.start<=Vt+1&&vt===$t&&nt(Gt.start+Gt.count-1,M.width,4)===vt?Rt.count=Math.max(Rt.count,Gt.start+Gt.count-Rt.start):(++gt,K[gt]=Gt)}K.length=gt+1;const _t=n.getParameter(n.UNPACK_ROW_LENGTH),ft=n.getParameter(n.UNPACK_SKIP_PIXELS),It=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let it=0,Rt=K.length;it<Rt;it++){const Gt=K[it],Vt=Math.floor(Gt.start/4),vt=Math.ceil(Gt.count/4),$t=Vt%M.width,N=Math.floor(Vt/M.width),yt=vt,ct=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$t),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),e.texSubImage2D(n.TEXTURE_2D,0,$t,N,yt,ct,G,tt,M.data)}R.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,_t),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ft),n.pixelStorei(n.UNPACK_SKIP_ROWS,It)}}function Nt(R,M,G){let tt=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(tt=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(tt=n.TEXTURE_3D);const st=ve(R,M),K=M.source;e.bindTexture(tt,R.__webglTexture,n.TEXTURE0+G);const gt=i.get(K);if(K.version!==gt.__version||st===!0){e.activeTexture(n.TEXTURE0+G);const _t=pe.getPrimaries(pe.workingColorSpace),ft=M.colorSpace===ti?null:pe.getPrimaries(M.colorSpace),It=M.colorSpace===ti||_t===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let it=x(M.image,!1,r.maxTextureSize);it=Kt(M,it);const Rt=s.convert(M.format,M.colorSpace),Gt=s.convert(M.type);let Vt=w(M.internalFormat,Rt,Gt,M.colorSpace,M.isVideoTexture);ee(tt,M);let vt;const $t=M.mipmaps,N=M.isVideoTexture!==!0,yt=gt.__version===void 0||st===!0,ct=K.dataReady,Ct=I(M,it);if(M.isDepthTexture)Vt=b(M.format===Br,M.type),yt&&(N?e.texStorage2D(n.TEXTURE_2D,1,Vt,it.width,it.height):e.texImage2D(n.TEXTURE_2D,0,Vt,it.width,it.height,0,Rt,Gt,null));else if(M.isDataTexture)if($t.length>0){N&&yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,$t[0].width,$t[0].height);for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],N?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,Gt,vt.data):e.texImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,Rt,Gt,vt.data);M.generateMipmaps=!1}else N?(yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,it.width,it.height),ct&&mt(M,it,Rt,Gt)):e.texImage2D(n.TEXTURE_2D,0,Vt,it.width,it.height,0,Rt,Gt,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Vt,$t[0].width,$t[0].height,it.depth);for(let ut=0,ot=$t.length;ut<ot;ut++)if(vt=$t[ut],M.format!==En)if(Rt!==null)if(N){if(ct)if(M.layerUpdates.size>0){const Pt=jl(vt.width,vt.height,M.format,M.type);for(const qt of M.layerUpdates){const Me=vt.data.subarray(qt*Pt/vt.data.BYTES_PER_ELEMENT,(qt+1)*Pt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,qt,vt.width,vt.height,1,Rt,Me)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,vt.width,vt.height,it.depth,Rt,vt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ut,Vt,vt.width,vt.height,it.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ct&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,vt.width,vt.height,it.depth,Rt,Gt,vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ut,Vt,vt.width,vt.height,it.depth,0,Rt,Gt,vt.data)}else{N&&yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,$t[0].width,$t[0].height);for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],M.format!==En?Rt!==null?N?ct&&e.compressedTexSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,vt.data):e.compressedTexImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,Gt,vt.data):e.texImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,Rt,Gt,vt.data)}else if(M.isDataArrayTexture)if(N){if(yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Vt,it.width,it.height,it.depth),ct)if(M.layerUpdates.size>0){const ut=jl(it.width,it.height,M.format,M.type);for(const ot of M.layerUpdates){const Pt=it.data.subarray(ot*ut/it.data.BYTES_PER_ELEMENT,(ot+1)*ut/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ot,it.width,it.height,1,Rt,Gt,Pt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Rt,Gt,it.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Vt,it.width,it.height,it.depth,0,Rt,Gt,it.data);else if(M.isData3DTexture)N?(yt&&e.texStorage3D(n.TEXTURE_3D,Ct,Vt,it.width,it.height,it.depth),ct&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Rt,Gt,it.data)):e.texImage3D(n.TEXTURE_3D,0,Vt,it.width,it.height,it.depth,0,Rt,Gt,it.data);else if(M.isFramebufferTexture){if(yt)if(N)e.texStorage2D(n.TEXTURE_2D,Ct,Vt,it.width,it.height);else{let ut=it.width,ot=it.height;for(let Pt=0;Pt<Ct;Pt++)e.texImage2D(n.TEXTURE_2D,Pt,Vt,ut,ot,0,Rt,Gt,null),ut>>=1,ot>>=1}}else if($t.length>0){if(N&&yt){const ut=Ae($t[0]);e.texStorage2D(n.TEXTURE_2D,Ct,Vt,ut.width,ut.height)}for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],N?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,Rt,Gt,vt):e.texImage2D(n.TEXTURE_2D,ut,Vt,Rt,Gt,vt);M.generateMipmaps=!1}else if(N){if(yt){const ut=Ae(it);e.texStorage2D(n.TEXTURE_2D,Ct,Vt,ut.width,ut.height)}ct&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Rt,Gt,it)}else e.texImage2D(n.TEXTURE_2D,0,Vt,Rt,Gt,it);g(M)&&d(tt),gt.__version=K.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function bt(R,M,G){if(M.image.length!==6)return;const tt=ve(R,M),st=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+G);const K=i.get(st);if(st.version!==K.__version||tt===!0){e.activeTexture(n.TEXTURE0+G);const gt=pe.getPrimaries(pe.workingColorSpace),_t=M.colorSpace===ti?null:pe.getPrimaries(M.colorSpace),ft=M.colorSpace===ti||gt===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const It=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,Rt=[];for(let ot=0;ot<6;ot++)!It&&!it?Rt[ot]=x(M.image[ot],!0,r.maxCubemapSize):Rt[ot]=it?M.image[ot].image:M.image[ot],Rt[ot]=Kt(M,Rt[ot]);const Gt=Rt[0],Vt=s.convert(M.format,M.colorSpace),vt=s.convert(M.type),$t=w(M.internalFormat,Vt,vt,M.colorSpace),N=M.isVideoTexture!==!0,yt=K.__version===void 0||tt===!0,ct=st.dataReady;let Ct=I(M,Gt);ee(n.TEXTURE_CUBE_MAP,M);let ut;if(It){N&&yt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,$t,Gt.width,Gt.height);for(let ot=0;ot<6;ot++){ut=Rt[ot].mipmaps;for(let Pt=0;Pt<ut.length;Pt++){const qt=ut[Pt];M.format!==En?Vt!==null?N?ct&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,0,0,qt.width,qt.height,Vt,qt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,$t,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,0,0,qt.width,qt.height,Vt,vt,qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,$t,qt.width,qt.height,0,Vt,vt,qt.data)}}}else{if(ut=M.mipmaps,N&&yt){ut.length>0&&Ct++;const ot=Ae(Rt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,$t,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(it){N?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Rt[ot].width,Rt[ot].height,Vt,vt,Rt[ot].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,Rt[ot].width,Rt[ot].height,0,Vt,vt,Rt[ot].data);for(let Pt=0;Pt<ut.length;Pt++){const Me=ut[Pt].image[ot].image;N?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,0,0,Me.width,Me.height,Vt,vt,Me.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,$t,Me.width,Me.height,0,Vt,vt,Me.data)}}else{N?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Vt,vt,Rt[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,Vt,vt,Rt[ot]);for(let Pt=0;Pt<ut.length;Pt++){const qt=ut[Pt];N?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,0,0,Vt,vt,qt.image[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,$t,Vt,vt,qt.image[ot])}}}g(M)&&d(n.TEXTURE_CUBE_MAP),K.__version=st.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Ft(R,M,G,tt,st,K){const gt=s.convert(G.format,G.colorSpace),_t=s.convert(G.type),ft=w(G.internalFormat,gt,_t,G.colorSpace),It=i.get(M),it=i.get(G);if(it.__renderTarget=M,!It.__hasExternalTextures){const Rt=Math.max(1,M.width>>K),Gt=Math.max(1,M.height>>K);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,K,ft,Rt,Gt,M.depth,0,gt,_t,null):e.texImage2D(st,K,ft,Rt,Gt,0,gt,_t,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),ie(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,st,it.__webglTexture,0,Lt(M)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,tt,st,it.__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(R,M,G){if(n.bindRenderbuffer(n.RENDERBUFFER,R),M.depthBuffer){const tt=M.depthTexture,st=tt&&tt.isDepthTexture?tt.type:null,K=b(M.stencilBuffer,st),gt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_t=Lt(M);ie(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t,K,M.width,M.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,K,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,K,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,R)}else{const tt=M.textures;for(let st=0;st<tt.length;st++){const K=tt[st],gt=s.convert(K.format,K.colorSpace),_t=s.convert(K.type),ft=w(K.internalFormat,gt,_t,K.colorSpace),It=Lt(M);G&&ie(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,It,ft,M.width,M.height):ie(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,It,ft,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ft,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Wt(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(M.depthTexture);tt.__renderTarget=M,(!tt.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),lt(M.depthTexture,0);const st=tt.__webglTexture,K=Lt(M);if(M.depthTexture.format===Or)ie(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0);else if(M.depthTexture.format===Br)ie(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Te(R){const M=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const tt=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),tt){const st=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,tt.removeEventListener("dispose",st)};tt.addEventListener("dispose",st),M.__depthDisposeCallback=st}M.__boundDepthTexture=tt}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const tt=R.texture.mipmaps;tt&&tt.length>0?Wt(M.__webglFramebuffer[0],R):Wt(M.__webglFramebuffer,R)}else if(G){M.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[tt]),M.__webglDepthbuffer[tt]===void 0)M.__webglDepthbuffer[tt]=n.createRenderbuffer(),ue(M.__webglDepthbuffer[tt],R,!1);else{const st=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[tt];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,K)}}else{const tt=R.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ue(M.__webglDepthbuffer,R,!1);else{const st=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,K)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(R,M,G){const tt=i.get(R);M!==void 0&&Ft(tt.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Te(R)}function jt(R){const M=R.texture,G=i.get(R),tt=i.get(M);R.addEventListener("dispose",C);const st=R.textures,K=R.isWebGLCubeRenderTarget===!0,gt=st.length>1;if(gt||(tt.__webglTexture===void 0&&(tt.__webglTexture=n.createTexture()),tt.__version=M.version,o.memory.textures++),K){G.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[_t]=[];for(let ft=0;ft<M.mipmaps.length;ft++)G.__webglFramebuffer[_t][ft]=n.createFramebuffer()}else G.__webglFramebuffer[_t]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let _t=0;_t<M.mipmaps.length;_t++)G.__webglFramebuffer[_t]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(gt)for(let _t=0,ft=st.length;_t<ft;_t++){const It=i.get(st[_t]);It.__webglTexture===void 0&&(It.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&ie(R)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let _t=0;_t<st.length;_t++){const ft=st[_t];G.__webglColorRenderbuffer[_t]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[_t]);const It=s.convert(ft.format,ft.colorSpace),it=s.convert(ft.type),Rt=w(ft.internalFormat,It,it,ft.colorSpace,R.isXRRenderTarget===!0),Gt=Lt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Gt,Rt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,G.__webglColorRenderbuffer[_t])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ue(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),ee(n.TEXTURE_CUBE_MAP,M);for(let _t=0;_t<6;_t++)if(M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Ft(G.__webglFramebuffer[_t][ft],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,ft);else Ft(G.__webglFramebuffer[_t],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);g(M)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let _t=0,ft=st.length;_t<ft;_t++){const It=st[_t],it=i.get(It);e.bindTexture(n.TEXTURE_2D,it.__webglTexture),ee(n.TEXTURE_2D,It),Ft(G.__webglFramebuffer,R,It,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,0),g(It)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let _t=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_t=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(_t,tt.__webglTexture),ee(_t,M),M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Ft(G.__webglFramebuffer[ft],R,M,n.COLOR_ATTACHMENT0,_t,ft);else Ft(G.__webglFramebuffer,R,M,n.COLOR_ATTACHMENT0,_t,0);g(M)&&d(_t),e.unbindTexture()}R.depthBuffer&&Te(R)}function U(R){const M=R.textures;for(let G=0,tt=M.length;G<tt;G++){const st=M[G];if(g(st)){const K=E(R),gt=i.get(st).__webglTexture;e.bindTexture(K,gt),d(K),e.unbindTexture()}}}const Ge=[],he=[];function xe(R){if(R.samples>0){if(ie(R)===!1){const M=R.textures,G=R.width,tt=R.height;let st=n.COLOR_BUFFER_BIT;const K=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(R),_t=M.length>1;if(_t)for(let It=0;It<M.length;It++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const ft=R.texture.mipmaps;ft&&ft.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let It=0;It<M.length;It++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),_t){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[It]);const it=i.get(M[It]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,it,0)}n.blitFramebuffer(0,0,G,tt,0,0,G,tt,st,n.NEAREST),l===!0&&(Ge.length=0,he.length=0,Ge.push(n.COLOR_ATTACHMENT0+It),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ge.push(K),he.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,he)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ge))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_t)for(let It=0;It<M.length;It++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,gt.__webglColorRenderbuffer[It]);const it=i.get(M[It]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,it,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Lt(R){return Math.min(r.maxSamples,R.samples)}function ie(R){const M=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function kt(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function Kt(R,M){const G=R.colorSpace,tt=R.format,st=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==_r&&G!==ti&&(pe.getTransfer(G)===Se?(tt!==En||st!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=J,this.setTexture2D=lt,this.setTexture2DArray=Q,this.setTexture3D=dt,this.setTextureCube=Y,this.rebindTextures=Re,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=ie}function m0(n,t){function e(i,r=ti){let s;const o=pe.getTransfer(r);if(i===Cn)return n.UNSIGNED_BYTE;if(i===ka)return n.UNSIGNED_SHORT_4_4_4_4;if(i===za)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jc)return n.BYTE;if(i===Kc)return n.SHORT;if(i===Nr)return n.UNSIGNED_SHORT;if(i===Ba)return n.INT;if(i===Ni)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Hr)return n.HALF_FLOAT;if(i===Jc)return n.ALPHA;if(i===Qc)return n.RGB;if(i===En)return n.RGBA;if(i===Or)return n.DEPTH_COMPONENT;if(i===Br)return n.DEPTH_STENCIL;if(i===tu)return n.RED;if(i===Ha)return n.RED_INTEGER;if(i===eu)return n.RG;if(i===Va)return n.RG_INTEGER;if(i===Ga)return n.RGBA_INTEGER;if(i===Ts||i===As||i===ws||i===Rs)if(o===Se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ts)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===As)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ts)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===As)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===na||i===ia||i===ra||i===sa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===na)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ia)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ra)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oa||i===aa||i===la)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===oa||i===aa)return o===Se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===la)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ca||i===ua||i===ha||i===fa||i===da||i===pa||i===ma||i===_a||i===ga||i===va||i===xa||i===Ma||i===ya||i===Sa)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ca)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ua)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ha)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===da)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===pa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ma)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_a)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ga)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===va)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ma)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ya)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cs||i===Ea||i===ba)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Cs)return o===Se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ea)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ba)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===nu||i===Ta||i===Aa||i===wa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ta)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const _0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g0=`
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

}`;class v0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new an,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new li({vertexShader:_0,fragmentShader:g0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Rn(new Gs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class x0 extends Bi{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,v=null;const x=new v0,g=e.getContextAttributes();let d=null,E=null;const w=[],b=[],I=new Jt;let P=null;const C=new pn;C.viewport=new Ie;const O=new pn;O.viewport=new Ie;const T=[C,O],S=new kd;let F=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let mt=w[nt];return mt===void 0&&(mt=new wo,w[nt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(nt){let mt=w[nt];return mt===void 0&&(mt=new wo,w[nt]=mt),mt.getGripSpace()},this.getHand=function(nt){let mt=w[nt];return mt===void 0&&(mt=new wo,w[nt]=mt),mt.getHandSpace()};function q(nt){const mt=b.indexOf(nt.inputSource);if(mt===-1)return;const Nt=w[mt];Nt!==void 0&&(Nt.update(nt.inputSource,nt.frame,c||o),Nt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function et(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",et),r.removeEventListener("inputsourceschange",lt);for(let nt=0;nt<w.length;nt++){const mt=b[nt];mt!==null&&(b[nt]=null,w[nt].disconnect(mt))}F=null,J=null,x.reset(),t.setRenderTarget(d),p=null,f=null,h=null,r=null,E=null,ve.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){s=nt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(nt){c=nt},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(nt){if(r=nt,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",et),r.addEventListener("inputsourceschange",lt),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Nt=null,bt=null,Ft=null;g.depth&&(Ft=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Nt=g.stencil?Br:Or,bt=g.stencil?Fr:Ni);const ue={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(ue),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new Oi(f.textureWidth,f.textureHeight,{format:En,type:Cn,depthTexture:new _u(f.textureWidth,f.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,Nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Nt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,Nt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Oi(p.framebufferWidth,p.framebufferHeight,{format:En,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ve.setContext(r),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function lt(nt){for(let mt=0;mt<nt.removed.length;mt++){const Nt=nt.removed[mt],bt=b.indexOf(Nt);bt>=0&&(b[bt]=null,w[bt].disconnect(Nt))}for(let mt=0;mt<nt.added.length;mt++){const Nt=nt.added[mt];let bt=b.indexOf(Nt);if(bt===-1){for(let ue=0;ue<w.length;ue++)if(ue>=b.length){b.push(Nt),bt=ue;break}else if(b[ue]===null){b[ue]=Nt,bt=ue;break}if(bt===-1)break}const Ft=w[bt];Ft&&Ft.connect(Nt)}}const Q=new V,dt=new V;function Y(nt,mt,Nt){Q.setFromMatrixPosition(mt.matrixWorld),dt.setFromMatrixPosition(Nt.matrixWorld);const bt=Q.distanceTo(dt),Ft=mt.projectionMatrix.elements,ue=Nt.projectionMatrix.elements,Wt=Ft[14]/(Ft[10]-1),Te=Ft[14]/(Ft[10]+1),Re=(Ft[9]+1)/Ft[5],jt=(Ft[9]-1)/Ft[5],U=(Ft[8]-1)/Ft[0],Ge=(ue[8]+1)/ue[0],he=Wt*U,xe=Wt*Ge,Lt=bt/(-U+Ge),ie=Lt*-U;if(mt.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(ie),nt.translateZ(Lt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Ft[10]===-1)nt.projectionMatrix.copy(mt.projectionMatrix),nt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const kt=Wt+Lt,Kt=Te+Lt,Ae=he-ie,R=xe+(bt-ie),M=Re*Te/Kt*kt,G=jt*Te/Kt*kt;nt.projectionMatrix.makePerspective(Ae,R,M,G,kt,Kt),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function Mt(nt,mt){mt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(mt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(r===null)return;let mt=nt.near,Nt=nt.far;x.texture!==null&&(x.depthNear>0&&(mt=x.depthNear),x.depthFar>0&&(Nt=x.depthFar)),S.near=O.near=C.near=mt,S.far=O.far=C.far=Nt,(F!==S.near||J!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),F=S.near,J=S.far),C.layers.mask=nt.layers.mask|2,O.layers.mask=nt.layers.mask|4,S.layers.mask=C.layers.mask|O.layers.mask;const bt=nt.parent,Ft=S.cameras;Mt(S,bt);for(let ue=0;ue<Ft.length;ue++)Mt(Ft[ue],bt);Ft.length===2?Y(S,C,O):S.projectionMatrix.copy(C.projectionMatrix),wt(nt,S,bt)};function wt(nt,mt,Nt){Nt===null?nt.matrix.copy(mt.matrixWorld):(nt.matrix.copy(Nt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(mt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(mt.projectionMatrix),nt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Ra*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(nt){l=nt,f!==null&&(f.fixedFoveation=nt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=nt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let Bt=null;function ee(nt,mt){if(u=mt.getViewerPose(c||o),v=mt,u!==null){const Nt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let bt=!1;Nt.length!==S.cameras.length&&(S.cameras.length=0,bt=!0);for(let Wt=0;Wt<Nt.length;Wt++){const Te=Nt[Wt];let Re=null;if(p!==null)Re=p.getViewport(Te);else{const U=h.getViewSubImage(f,Te);Re=U.viewport,Wt===0&&(t.setRenderTargetTextures(E,U.colorTexture,U.depthStencilTexture),t.setRenderTarget(E))}let jt=T[Wt];jt===void 0&&(jt=new pn,jt.layers.enable(Wt),jt.viewport=new Ie,T[Wt]=jt),jt.matrix.fromArray(Te.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(Te.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(Re.x,Re.y,Re.width,Re.height),Wt===0&&(S.matrix.copy(jt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),bt===!0&&S.cameras.push(jt)}const Ft=r.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Wt=h.getDepthInformation(Nt[0]);Wt&&Wt.isValid&&Wt.texture&&x.init(t,Wt,r.renderState)}}for(let Nt=0;Nt<w.length;Nt++){const bt=b[Nt],Ft=w[Nt];bt!==null&&Ft!==void 0&&Ft.update(bt,mt,c||o)}Bt&&Bt(nt,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),v=null}const ve=new xu;ve.setAnimationLoop(ee),this.setAnimationLoop=function(nt){Bt=nt},this.dispose=function(){}}}const Ei=new Pn,M0=new Ne;function y0(n,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,du(n)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,E,w,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),h(g,d)):d.isMeshPhongMaterial?(s(g,d),u(g,d)):d.isMeshStandardMaterial?(s(g,d),f(g,d),d.isMeshPhysicalMaterial&&p(g,d,b)):d.isMeshMatcapMaterial?(s(g,d),v(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),x(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,E,w):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===on&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===on&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const E=t.get(d),w=E.envMap,b=E.envMapRotation;w&&(g.envMap.value=w,Ei.copy(b),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),g.envMapRotation.value.setFromMatrix4(M0.makeRotationFromEuler(Ei)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,E,w){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*E,g.scale.value=w*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function h(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function f(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,E){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===on&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,d){d.matcap&&(g.matcap.value=d.matcap)}function x(g,d){const E=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function S0(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,w){const b=w.program;i.uniformBlockBinding(E,b)}function c(E,w){let b=r[E.id];b===void 0&&(v(E),b=u(E),r[E.id]=b,E.addEventListener("dispose",g));const I=w.program;i.updateUBOMapping(E,I);const P=t.render.frame;s[E.id]!==P&&(f(E),s[E.id]=P)}function u(E){const w=h();E.__bindingPointIndex=w;const b=n.createBuffer(),I=E.__size,P=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,I,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const w=r[E.id],b=E.uniforms,I=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let P=0,C=b.length;P<C;P++){const O=Array.isArray(b[P])?b[P]:[b[P]];for(let T=0,S=O.length;T<S;T++){const F=O[T];if(p(F,P,T,I)===!0){const J=F.__offset,q=Array.isArray(F.value)?F.value:[F.value];let et=0;for(let lt=0;lt<q.length;lt++){const Q=q[lt],dt=x(Q);typeof Q=="number"||typeof Q=="boolean"?(F.__data[0]=Q,n.bufferSubData(n.UNIFORM_BUFFER,J+et,F.__data)):Q.isMatrix3?(F.__data[0]=Q.elements[0],F.__data[1]=Q.elements[1],F.__data[2]=Q.elements[2],F.__data[3]=0,F.__data[4]=Q.elements[3],F.__data[5]=Q.elements[4],F.__data[6]=Q.elements[5],F.__data[7]=0,F.__data[8]=Q.elements[6],F.__data[9]=Q.elements[7],F.__data[10]=Q.elements[8],F.__data[11]=0):(Q.toArray(F.__data,et),et+=dt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,J,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,w,b,I){const P=E.value,C=w+"_"+b;if(I[C]===void 0)return typeof P=="number"||typeof P=="boolean"?I[C]=P:I[C]=P.clone(),!0;{const O=I[C];if(typeof P=="number"||typeof P=="boolean"){if(O!==P)return I[C]=P,!0}else if(O.equals(P)===!1)return O.copy(P),!0}return!1}function v(E){const w=E.uniforms;let b=0;const I=16;for(let C=0,O=w.length;C<O;C++){const T=Array.isArray(w[C])?w[C]:[w[C]];for(let S=0,F=T.length;S<F;S++){const J=T[S],q=Array.isArray(J.value)?J.value:[J.value];for(let et=0,lt=q.length;et<lt;et++){const Q=q[et],dt=x(Q),Y=b%I,Mt=Y%dt.boundary,wt=Y+Mt;b+=Mt,wt!==0&&I-wt<dt.storage&&(b+=I-wt),J.__data=new Float32Array(dt.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=b,b+=dt.storage}}}const P=b%I;return P>0&&(b+=I-P),E.__size=b,E.__cache={},this}function x(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function g(E){const w=E.target;w.removeEventListener("dispose",g);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function d(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class E0{constructor(t={}){const{canvas:e=ed(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Uint32Array(4),x=new Int32Array(4);let g=null,d=null;const E=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let I=!1;this._outputColorSpace=dn;let P=0,C=0,O=null,T=-1,S=null;const F=new Ie,J=new Ie;let q=null;const et=new me(0);let lt=0,Q=e.width,dt=e.height,Y=1,Mt=null,wt=null;const Bt=new Ie(0,0,Q,dt),ee=new Ie(0,0,Q,dt);let ve=!1;const nt=new $a;let mt=!1,Nt=!1;const bt=new Ne,Ft=new Ne,ue=new V,Wt=new Ie,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function jt(){return O===null?Y:1}let U=i;function Ge(y,B){return e.getContext(y,B)}try{const y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oa}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",ot,!1),U===null){const B="webgl2";if(U=Ge(B,y),U===null)throw Ge(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let he,xe,Lt,ie,kt,Kt,Ae,R,M,G,tt,st,K,gt,_t,ft,It,it,Rt,Gt,Vt,vt,$t,N;function yt(){he=new U_(U),he.init(),vt=new m0(U,he),xe=new A_(U,he,t,vt),Lt=new d0(U,he),xe.reverseDepthBuffer&&f&&Lt.buffers.depth.setReversed(!0),ie=new F_(U),kt=new t0,Kt=new p0(U,he,Lt,kt,xe,vt,ie),Ae=new R_(b),R=new L_(b),M=new Vd(U),$t=new b_(U,M),G=new I_(U,M,ie,$t),tt=new B_(U,G,M,ie),Rt=new O_(U,xe,Kt),ft=new w_(kt),st=new Qg(b,Ae,R,he,xe,$t,ft),K=new y0(b,kt),gt=new n0,_t=new l0(he),it=new E_(b,Ae,R,Lt,tt,p,l),It=new h0(b,tt,xe),N=new S0(U,ie,xe,Lt),Gt=new T_(U,he,ie),Vt=new N_(U,he,ie),ie.programs=st.programs,b.capabilities=xe,b.extensions=he,b.properties=kt,b.renderLists=gt,b.shadowMap=It,b.state=Lt,b.info=ie}yt();const ct=new x0(b,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const y=he.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=he.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize(Q,dt,!1))},this.getSize=function(y){return y.set(Q,dt)},this.setSize=function(y,B,X=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=y,dt=B,e.width=Math.floor(y*Y),e.height=Math.floor(B*Y),X===!0&&(e.style.width=y+"px",e.style.height=B+"px"),this.setViewport(0,0,y,B)},this.getDrawingBufferSize=function(y){return y.set(Q*Y,dt*Y).floor()},this.setDrawingBufferSize=function(y,B,X){Q=y,dt=B,Y=X,e.width=Math.floor(y*X),e.height=Math.floor(B*X),this.setViewport(0,0,y,B)},this.getCurrentViewport=function(y){return y.copy(F)},this.getViewport=function(y){return y.copy(Bt)},this.setViewport=function(y,B,X,W){y.isVector4?Bt.set(y.x,y.y,y.z,y.w):Bt.set(y,B,X,W),Lt.viewport(F.copy(Bt).multiplyScalar(Y).round())},this.getScissor=function(y){return y.copy(ee)},this.setScissor=function(y,B,X,W){y.isVector4?ee.set(y.x,y.y,y.z,y.w):ee.set(y,B,X,W),Lt.scissor(J.copy(ee).multiplyScalar(Y).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(y){Lt.setScissorTest(ve=y)},this.setOpaqueSort=function(y){Mt=y},this.setTransparentSort=function(y){wt=y},this.getClearColor=function(y){return y.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(y=!0,B=!0,X=!0){let W=0;if(y){let z=!1;if(O!==null){const ht=O.texture.format;z=ht===Ga||ht===Va||ht===Ha}if(z){const ht=O.texture.type,xt=ht===Cn||ht===Ni||ht===Nr||ht===Fr||ht===ka||ht===za,Dt=it.getClearColor(),Tt=it.getClearAlpha(),Xt=Dt.r,Yt=Dt.g,Ot=Dt.b;xt?(v[0]=Xt,v[1]=Yt,v[2]=Ot,v[3]=Tt,U.clearBufferuiv(U.COLOR,0,v)):(x[0]=Xt,x[1]=Yt,x[2]=Ot,x[3]=Tt,U.clearBufferiv(U.COLOR,0,x))}else W|=U.COLOR_BUFFER_BIT}B&&(W|=U.DEPTH_BUFFER_BIT),X&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),it.dispose(),gt.dispose(),_t.dispose(),kt.dispose(),Ae.dispose(),R.dispose(),tt.dispose(),$t.dispose(),N.dispose(),st.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",qr),ct.removeEventListener("sessionend",Yr),Dn.stop()};function Ct(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const y=ie.autoReset,B=It.enabled,X=It.autoUpdate,W=It.needsUpdate,z=It.type;yt(),ie.autoReset=y,It.enabled=B,It.autoUpdate=X,It.needsUpdate=W,It.type=z}function ot(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Pt(y){const B=y.target;B.removeEventListener("dispose",Pt),qt(B)}function qt(y){Me(y),kt.remove(y)}function Me(y){const B=kt.get(y).programs;B!==void 0&&(B.forEach(function(X){st.releaseProgram(X)}),y.isShaderMaterial&&st.releaseShaderCache(y))}this.renderBufferDirect=function(y,B,X,W,z,ht){B===null&&(B=Te);const xt=z.isMesh&&z.matrixWorld.determinant()<0,Dt=Ks(y,B,X,W,z);Lt.setMaterial(W,xt);let Tt=X.index,Xt=1;if(W.wireframe===!0){if(Tt=G.getWireframeAttribute(X),Tt===void 0)return;Xt=2}const Yt=X.drawRange,Ot=X.attributes.position;let ne=Yt.start*Xt,_e=(Yt.start+Yt.count)*Xt;ht!==null&&(ne=Math.max(ne,ht.start*Xt),_e=Math.min(_e,(ht.start+ht.count)*Xt)),Tt!==null?(ne=Math.max(ne,0),_e=Math.min(_e,Tt.count)):Ot!=null&&(ne=Math.max(ne,0),_e=Math.min(_e,Ot.count));const Ue=_e-ne;if(Ue<0||Ue===1/0)return;$t.setup(z,W,Dt,X,Tt);let ye,ae=Gt;if(Tt!==null&&(ye=M.get(Tt),ae=Vt,ae.setIndex(ye)),z.isMesh)W.wireframe===!0?(Lt.setLineWidth(W.wireframeLinewidth*jt()),ae.setMode(U.LINES)):ae.setMode(U.TRIANGLES);else if(z.isLine){let zt=W.linewidth;zt===void 0&&(zt=1),Lt.setLineWidth(zt*jt()),z.isLineSegments?ae.setMode(U.LINES):z.isLineLoop?ae.setMode(U.LINE_LOOP):ae.setMode(U.LINE_STRIP)}else z.isPoints?ae.setMode(U.POINTS):z.isSprite&&ae.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)cr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))ae.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const zt=z._multiDrawStarts,Zt=z._multiDrawCounts,le=z._multiDrawCount,Ke=Tt?M.get(Tt).bytesPerElement:1,Tn=kt.get(W).currentProgram.getUniforms();for(let Ze=0;Ze<le;Ze++)Tn.setValue(U,"_gl_DrawID",Ze),ae.render(zt[Ze]/Ke,Zt[Ze])}else if(z.isInstancedMesh)ae.renderInstances(ne,Ue,z.count);else if(X.isInstancedBufferGeometry){const zt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Zt=Math.min(X.instanceCount,zt);ae.renderInstances(ne,Ue,Zt)}else ae.render(ne,Ue)};function de(y,B,X){y.transparent===!0&&y.side===kn&&y.forceSinglePass===!1?(y.side=on,y.needsUpdate=!0,fi(y,B,X),y.side=ai,y.needsUpdate=!0,fi(y,B,X),y.side=kn):fi(y,B,X)}this.compile=function(y,B,X=null){X===null&&(X=y),d=_t.get(X),d.init(B),w.push(d),X.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),y!==X&&y.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights();const W=new Set;return y.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ht=z.material;if(ht)if(Array.isArray(ht))for(let xt=0;xt<ht.length;xt++){const Dt=ht[xt];de(Dt,X,z),W.add(Dt)}else de(ht,X,z),W.add(ht)}),d=w.pop(),W},this.compileAsync=function(y,B,X=null){const W=this.compile(y,B,X);return new Promise(z=>{function ht(){if(W.forEach(function(xt){kt.get(xt).currentProgram.isReady()&&W.delete(xt)}),W.size===0){z(y);return}setTimeout(ht,10)}he.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let We=null;function mn(y){We&&We(y)}function qr(){Dn.stop()}function Yr(){Dn.start()}const Dn=new xu;Dn.setAnimationLoop(mn),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(y){We=y,ct.setAnimationLoop(y),y===null?Dn.stop():Dn.start()},ct.addEventListener("sessionstart",qr),ct.addEventListener("sessionend",Yr),this.render=function(y,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(B),B=ct.getCamera()),y.isScene===!0&&y.onBeforeRender(b,y,B,O),d=_t.get(y,w.length),d.init(B),w.push(d),Ft.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),nt.setFromProjectionMatrix(Ft),Nt=this.localClippingEnabled,mt=ft.init(this.clippingPlanes,Nt),g=gt.get(y,E.length),g.init(),E.push(g),ct.enabled===!0&&ct.isPresenting===!0){const ht=b.xr.getDepthSensingMesh();ht!==null&&hi(ht,B,-1/0,b.sortObjects)}hi(y,B,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(Mt,wt),Re=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Re&&it.addToRenderList(g,y),this.info.render.frame++,mt===!0&&ft.beginShadows();const X=d.state.shadowsArray;It.render(X,y,B),mt===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,z=g.transmissive;if(d.setupLights(),B.isArrayCamera){const ht=B.cameras;if(z.length>0)for(let xt=0,Dt=ht.length;xt<Dt;xt++){const Tt=ht[xt];jr(W,z,y,Tt)}Re&&it.render(y);for(let xt=0,Dt=ht.length;xt<Dt;xt++){const Tt=ht[xt];zi(g,y,Tt,Tt.viewport)}}else z.length>0&&jr(W,z,y,B),Re&&it.render(y),zi(g,y,B);O!==null&&C===0&&(Kt.updateMultisampleRenderTarget(O),Kt.updateRenderTargetMipmap(O)),y.isScene===!0&&y.onAfterRender(b,y,B),$t.resetDefaultState(),T=-1,S=null,w.pop(),w.length>0?(d=w[w.length-1],mt===!0&&ft.setGlobalState(b.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?g=E[E.length-1]:g=null};function hi(y,B,X,W){if(y.visible===!1)return;if(y.layers.test(B.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(B);else if(y.isLight)d.pushLight(y),y.castShadow&&d.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||nt.intersectsSprite(y)){W&&Wt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Ft);const xt=tt.update(y),Dt=y.material;Dt.visible&&g.push(y,xt,Dt,X,Wt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||nt.intersectsObject(y))){const xt=tt.update(y),Dt=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Wt.copy(y.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Wt.copy(xt.boundingSphere.center)),Wt.applyMatrix4(y.matrixWorld).applyMatrix4(Ft)),Array.isArray(Dt)){const Tt=xt.groups;for(let Xt=0,Yt=Tt.length;Xt<Yt;Xt++){const Ot=Tt[Xt],ne=Dt[Ot.materialIndex];ne&&ne.visible&&g.push(y,xt,ne,X,Wt.z,Ot)}}else Dt.visible&&g.push(y,xt,Dt,X,Wt.z,null)}}const ht=y.children;for(let xt=0,Dt=ht.length;xt<Dt;xt++)hi(ht[xt],B,X,W)}function zi(y,B,X,W){const z=y.opaque,ht=y.transmissive,xt=y.transparent;d.setupLightsView(X),mt===!0&&ft.setGlobalState(b.clippingPlanes,X),W&&Lt.viewport(F.copy(W)),z.length>0&&Hi(z,B,X),ht.length>0&&Hi(ht,B,X),xt.length>0&&Hi(xt,B,X),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function jr(y,B,X,W){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[W.id]===void 0&&(d.state.transmissionRenderTarget[W.id]=new Oi(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Hr:Cn,minFilter:Ri,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace}));const ht=d.state.transmissionRenderTarget[W.id],xt=W.viewport||F;ht.setSize(xt.z*b.transmissionResolutionScale,xt.w*b.transmissionResolutionScale);const Dt=b.getRenderTarget(),Tt=b.getActiveCubeFace(),Xt=b.getActiveMipmapLevel();b.setRenderTarget(ht),b.getClearColor(et),lt=b.getClearAlpha(),lt<1&&b.setClearColor(16777215,.5),b.clear(),Re&&it.render(X);const Yt=b.toneMapping;b.toneMapping=ri;const Ot=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),d.setupLightsView(W),mt===!0&&ft.setGlobalState(b.clippingPlanes,W),Hi(y,X,W),Kt.updateMultisampleRenderTarget(ht),Kt.updateRenderTargetMipmap(ht),he.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let _e=0,Ue=B.length;_e<Ue;_e++){const ye=B[_e],ae=ye.object,zt=ye.geometry,Zt=ye.material,le=ye.group;if(Zt.side===kn&&ae.layers.test(W.layers)){const Ke=Zt.side;Zt.side=on,Zt.needsUpdate=!0,Kr(ae,X,W,zt,Zt,le),Zt.side=Ke,Zt.needsUpdate=!0,ne=!0}}ne===!0&&(Kt.updateMultisampleRenderTarget(ht),Kt.updateRenderTargetMipmap(ht))}b.setRenderTarget(Dt,Tt,Xt),b.setClearColor(et,lt),Ot!==void 0&&(W.viewport=Ot),b.toneMapping=Yt}function Hi(y,B,X){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,ht=y.length;z<ht;z++){const xt=y[z],Dt=xt.object,Tt=xt.geometry,Xt=xt.group;let Yt=xt.material;Yt.allowOverride===!0&&W!==null&&(Yt=W),Dt.layers.test(X.layers)&&Kr(Dt,B,X,Tt,Yt,Xt)}}function Kr(y,B,X,W,z,ht){y.onBeforeRender(b,B,X,W,z,ht),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),z.onBeforeRender(b,B,X,W,y,ht),z.transparent===!0&&z.side===kn&&z.forceSinglePass===!1?(z.side=on,z.needsUpdate=!0,b.renderBufferDirect(X,B,W,z,y,ht),z.side=ai,z.needsUpdate=!0,b.renderBufferDirect(X,B,W,z,y,ht),z.side=kn):b.renderBufferDirect(X,B,W,z,y,ht),y.onAfterRender(b,B,X,W,z,ht)}function fi(y,B,X){B.isScene!==!0&&(B=Te);const W=kt.get(y),z=d.state.lights,ht=d.state.shadowsArray,xt=z.state.version,Dt=st.getParameters(y,z.state,ht,B,X),Tt=st.getProgramCacheKey(Dt);let Xt=W.programs;W.environment=y.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(y.isMeshStandardMaterial?R:Ae).get(y.envMap||W.environment),W.envMapRotation=W.environment!==null&&y.envMap===null?B.environmentRotation:y.envMapRotation,Xt===void 0&&(y.addEventListener("dispose",Pt),Xt=new Map,W.programs=Xt);let Yt=Xt.get(Tt);if(Yt!==void 0){if(W.currentProgram===Yt&&W.lightsStateVersion===xt)return Jr(y,Dt),Yt}else Dt.uniforms=st.getUniforms(y),y.onBeforeCompile(Dt,b),Yt=st.acquireProgram(Dt,Tt),Xt.set(Tt,Yt),W.uniforms=Dt.uniforms;const Ot=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ot.clippingPlanes=ft.uniform),Jr(y,Dt),W.needsLights=Zs(y),W.lightsStateVersion=xt,W.needsLights&&(Ot.ambientLightColor.value=z.state.ambient,Ot.lightProbe.value=z.state.probe,Ot.directionalLights.value=z.state.directional,Ot.directionalLightShadows.value=z.state.directionalShadow,Ot.spotLights.value=z.state.spot,Ot.spotLightShadows.value=z.state.spotShadow,Ot.rectAreaLights.value=z.state.rectArea,Ot.ltc_1.value=z.state.rectAreaLTC1,Ot.ltc_2.value=z.state.rectAreaLTC2,Ot.pointLights.value=z.state.point,Ot.pointLightShadows.value=z.state.pointShadow,Ot.hemisphereLights.value=z.state.hemi,Ot.directionalShadowMap.value=z.state.directionalShadowMap,Ot.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ot.spotShadowMap.value=z.state.spotShadowMap,Ot.spotLightMatrix.value=z.state.spotLightMatrix,Ot.spotLightMap.value=z.state.spotLightMap,Ot.pointShadowMap.value=z.state.pointShadowMap,Ot.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Yt,W.uniformsList=null,Yt}function Zr(y){if(y.uniformsList===null){const B=y.currentProgram.getUniforms();y.uniformsList=Ds.seqWithValue(B.seq,y.uniforms)}return y.uniformsList}function Jr(y,B){const X=kt.get(y);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function Ks(y,B,X,W,z){B.isScene!==!0&&(B=Te),Kt.resetTextureUnits();const ht=B.fog,xt=W.isMeshStandardMaterial?B.environment:null,Dt=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:_r,Tt=(W.isMeshStandardMaterial?R:Ae).get(W.envMap||xt),Xt=W.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Yt=!!X.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ot=!!X.morphAttributes.position,ne=!!X.morphAttributes.normal,_e=!!X.morphAttributes.color;let Ue=ri;W.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ue=b.toneMapping);const ye=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ae=ye!==void 0?ye.length:0,zt=kt.get(W),Zt=d.state.lights;if(mt===!0&&(Nt===!0||y!==S)){const Xe=y===S&&W.id===T;ft.setState(W,y,Xe)}let le=!1;W.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Zt.state.version||zt.outputColorSpace!==Dt||z.isBatchedMesh&&zt.batching===!1||!z.isBatchedMesh&&zt.batching===!0||z.isBatchedMesh&&zt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&zt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&zt.instancing===!1||!z.isInstancedMesh&&zt.instancing===!0||z.isSkinnedMesh&&zt.skinning===!1||!z.isSkinnedMesh&&zt.skinning===!0||z.isInstancedMesh&&zt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&zt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&zt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&zt.instancingMorph===!1&&z.morphTexture!==null||zt.envMap!==Tt||W.fog===!0&&zt.fog!==ht||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ft.numPlanes||zt.numIntersection!==ft.numIntersection)||zt.vertexAlphas!==Xt||zt.vertexTangents!==Yt||zt.morphTargets!==Ot||zt.morphNormals!==ne||zt.morphColors!==_e||zt.toneMapping!==Ue||zt.morphTargetsCount!==ae)&&(le=!0):(le=!0,zt.__version=W.version);let Ke=zt.currentProgram;le===!0&&(Ke=fi(W,B,z));let Tn=!1,Ze=!1,di=!1;const be=Ke.getUniforms(),en=zt.uniforms;if(Lt.useProgram(Ke.program)&&(Tn=!0,Ze=!0,di=!0),W.id!==T&&(T=W.id,Ze=!0),Tn||S!==y){Lt.buffers.depth.getReversed()?(bt.copy(y.projectionMatrix),id(bt),rd(bt),be.setValue(U,"projectionMatrix",bt)):be.setValue(U,"projectionMatrix",y.projectionMatrix),be.setValue(U,"viewMatrix",y.matrixWorldInverse);const qe=be.map.cameraPosition;qe!==void 0&&qe.setValue(U,ue.setFromMatrixPosition(y.matrixWorld)),xe.logarithmicDepthBuffer&&be.setValue(U,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&be.setValue(U,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,Ze=!0,di=!0)}if(z.isSkinnedMesh){be.setOptional(U,z,"bindMatrix"),be.setOptional(U,z,"bindMatrixInverse");const Xe=z.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),be.setValue(U,"boneTexture",Xe.boneTexture,Kt))}z.isBatchedMesh&&(be.setOptional(U,z,"batchingTexture"),be.setValue(U,"batchingTexture",z._matricesTexture,Kt),be.setOptional(U,z,"batchingIdTexture"),be.setValue(U,"batchingIdTexture",z._indirectTexture,Kt),be.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&be.setValue(U,"batchingColorTexture",z._colorsTexture,Kt));const nn=X.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&Rt.update(z,X,Ke),(Ze||zt.receiveShadow!==z.receiveShadow)&&(zt.receiveShadow=z.receiveShadow,be.setValue(U,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(en.envMap.value=Tt,en.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(en.envMapIntensity.value=B.environmentIntensity),Ze&&(be.setValue(U,"toneMappingExposure",b.toneMappingExposure),zt.needsLights&&Vi(en,di),ht&&W.fog===!0&&K.refreshFogUniforms(en,ht),K.refreshMaterialUniforms(en,W,Y,dt,d.state.transmissionRenderTarget[y.id]),Ds.upload(U,Zr(zt),en,Kt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ds.upload(U,Zr(zt),en,Kt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&be.setValue(U,"center",z.center),be.setValue(U,"modelViewMatrix",z.modelViewMatrix),be.setValue(U,"normalMatrix",z.normalMatrix),be.setValue(U,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Xe=W.uniformsGroups;for(let qe=0,Mr=Xe.length;qe<Mr;qe++){const Ln=Xe[qe];N.update(Ln,Ke),N.bind(Ln,Ke)}}return Ke}function Vi(y,B){y.ambientLightColor.needsUpdate=B,y.lightProbe.needsUpdate=B,y.directionalLights.needsUpdate=B,y.directionalLightShadows.needsUpdate=B,y.pointLights.needsUpdate=B,y.pointLightShadows.needsUpdate=B,y.spotLights.needsUpdate=B,y.spotLightShadows.needsUpdate=B,y.rectAreaLights.needsUpdate=B,y.hemisphereLights.needsUpdate=B}function Zs(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(y,B,X){const W=kt.get(y);W.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),kt.get(y.texture).__webglTexture=B,kt.get(y.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:X,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,B){const X=kt.get(y);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const Js=U.createFramebuffer();this.setRenderTarget=function(y,B=0,X=0){O=y,P=B,C=X;let W=!0,z=null,ht=!1,xt=!1;if(y){const Tt=kt.get(y);if(Tt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(Tt.__webglFramebuffer===void 0)Kt.setupRenderTarget(y);else if(Tt.__hasExternalTextures)Kt.rebindTextures(y,kt.get(y.texture).__webglTexture,kt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ot=y.depthTexture;if(Tt.__boundDepthTexture!==Ot){if(Ot!==null&&kt.has(Ot)&&(y.width!==Ot.image.width||y.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(y)}}const Xt=y.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(xt=!0);const Yt=kt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Yt[B])?z=Yt[B][X]:z=Yt[B],ht=!0):y.samples>0&&Kt.useMultisampledRTT(y)===!1?z=kt.get(y).__webglMultisampledFramebuffer:Array.isArray(Yt)?z=Yt[X]:z=Yt,F.copy(y.viewport),J.copy(y.scissor),q=y.scissorTest}else F.copy(Bt).multiplyScalar(Y).floor(),J.copy(ee).multiplyScalar(Y).floor(),q=ve;if(X!==0&&(z=Js),Lt.bindFramebuffer(U.FRAMEBUFFER,z)&&W&&Lt.drawBuffers(y,z),Lt.viewport(F),Lt.scissor(J),Lt.setScissorTest(q),ht){const Tt=kt.get(y.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,Tt.__webglTexture,X)}else if(xt){const Tt=kt.get(y.texture),Xt=B;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Tt.__webglTexture,X,Xt)}else if(y!==null&&X!==0){const Tt=kt.get(y.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Tt.__webglTexture,X)}T=-1},this.readRenderTargetPixels=function(y,B,X,W,z,ht,xt,Dt=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=kt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){Lt.bindFramebuffer(U.FRAMEBUFFER,Tt);try{const Xt=y.textures[Dt],Yt=Xt.format,Ot=Xt.type;if(!xe.textureFormatReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xe.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=y.width-W&&X>=0&&X<=y.height-z&&(y.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Dt),U.readPixels(B,X,W,z,vt.convert(Yt),vt.convert(Ot),ht))}finally{const Xt=O!==null?kt.get(O).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(y,B,X,W,z,ht,xt,Dt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=kt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt)if(B>=0&&B<=y.width-W&&X>=0&&X<=y.height-z){Lt.bindFramebuffer(U.FRAMEBUFFER,Tt);const Xt=y.textures[Dt],Yt=Xt.format,Ot=Xt.type;if(!xe.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xe.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ne=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.bufferData(U.PIXEL_PACK_BUFFER,ht.byteLength,U.STREAM_READ),y.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Dt),U.readPixels(B,X,W,z,vt.convert(Yt),vt.convert(Ot),0);const _e=O!==null?kt.get(O).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,_e);const Ue=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await nd(U,Ue,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ht),U.deleteBuffer(ne),U.deleteSync(Ue),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,B=null,X=0){const W=Math.pow(2,-X),z=Math.floor(y.image.width*W),ht=Math.floor(y.image.height*W),xt=B!==null?B.x:0,Dt=B!==null?B.y:0;Kt.setTexture2D(y,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,xt,Dt,z,ht),Lt.unbindTexture()};const Gi=U.createFramebuffer(),Qr=U.createFramebuffer();this.copyTextureToTexture=function(y,B,X=null,W=null,z=0,ht=null){ht===null&&(z!==0?(cr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=z,z=0):ht=0);let xt,Dt,Tt,Xt,Yt,Ot,ne,_e,Ue;const ye=y.isCompressedTexture?y.mipmaps[ht]:y.image;if(X!==null)xt=X.max.x-X.min.x,Dt=X.max.y-X.min.y,Tt=X.isBox3?X.max.z-X.min.z:1,Xt=X.min.x,Yt=X.min.y,Ot=X.isBox3?X.min.z:0;else{const nn=Math.pow(2,-z);xt=Math.floor(ye.width*nn),Dt=Math.floor(ye.height*nn),y.isDataArrayTexture?Tt=ye.depth:y.isData3DTexture?Tt=Math.floor(ye.depth*nn):Tt=1,Xt=0,Yt=0,Ot=0}W!==null?(ne=W.x,_e=W.y,Ue=W.z):(ne=0,_e=0,Ue=0);const ae=vt.convert(B.format),zt=vt.convert(B.type);let Zt;B.isData3DTexture?(Kt.setTexture3D(B,0),Zt=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Kt.setTexture2DArray(B,0),Zt=U.TEXTURE_2D_ARRAY):(Kt.setTexture2D(B,0),Zt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const le=U.getParameter(U.UNPACK_ROW_LENGTH),Ke=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Tn=U.getParameter(U.UNPACK_SKIP_PIXELS),Ze=U.getParameter(U.UNPACK_SKIP_ROWS),di=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ye.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ye.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Xt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Yt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ot);const be=y.isDataArrayTexture||y.isData3DTexture,en=B.isDataArrayTexture||B.isData3DTexture;if(y.isDepthTexture){const nn=kt.get(y),Xe=kt.get(B),qe=kt.get(nn.__renderTarget),Mr=kt.get(Xe.__renderTarget);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,qe.__webglFramebuffer),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Mr.__webglFramebuffer);for(let Ln=0;Ln<Tt;Ln++)be&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,kt.get(y).__webglTexture,z,Ot+Ln),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,kt.get(B).__webglTexture,ht,Ue+Ln)),U.blitFramebuffer(Xt,Yt,xt,Dt,ne,_e,xt,Dt,U.DEPTH_BUFFER_BIT,U.NEAREST);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(z!==0||y.isRenderTargetTexture||kt.has(y)){const nn=kt.get(y),Xe=kt.get(B);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,Gi),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Qr);for(let qe=0;qe<Tt;qe++)be?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,nn.__webglTexture,z,Ot+qe):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,nn.__webglTexture,z),en?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xe.__webglTexture,ht,Ue+qe):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xe.__webglTexture,ht),z!==0?U.blitFramebuffer(Xt,Yt,xt,Dt,ne,_e,xt,Dt,U.COLOR_BUFFER_BIT,U.NEAREST):en?U.copyTexSubImage3D(Zt,ht,ne,_e,Ue+qe,Xt,Yt,xt,Dt):U.copyTexSubImage2D(Zt,ht,ne,_e,Xt,Yt,xt,Dt);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else en?y.isDataTexture||y.isData3DTexture?U.texSubImage3D(Zt,ht,ne,_e,Ue,xt,Dt,Tt,ae,zt,ye.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(Zt,ht,ne,_e,Ue,xt,Dt,Tt,ae,ye.data):U.texSubImage3D(Zt,ht,ne,_e,Ue,xt,Dt,Tt,ae,zt,ye):y.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ht,ne,_e,xt,Dt,ae,zt,ye.data):y.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ht,ne,_e,ye.width,ye.height,ae,ye.data):U.texSubImage2D(U.TEXTURE_2D,ht,ne,_e,xt,Dt,ae,zt,ye);U.pixelStorei(U.UNPACK_ROW_LENGTH,le),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Tn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ze),U.pixelStorei(U.UNPACK_SKIP_IMAGES,di),ht===0&&B.generateMipmaps&&U.generateMipmap(Zt),Lt.unbindTexture()},this.copyTextureToTexture3D=function(y,B,X=null,W=null,z=0){return cr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,B,X,W,z)},this.initRenderTarget=function(y){kt.get(y).__webglFramebuffer===void 0&&Kt.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Kt.setTextureCube(y,0):y.isData3DTexture?Kt.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Kt.setTexture2DArray(y,0):Kt.setTexture2D(y,0),Lt.unbindTexture()},this.resetState=function(){P=0,C=0,O=null,Lt.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}}const Mc={type:"change"},Ya={type:"start"},bu={type:"end"},Ss=new au,yc=new Qn,b0=Math.cos(70*td.DEG2RAD),Oe=new V,sn=2*Math.PI,Ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fo=1e-6;class T0 extends zd{constructor(t,e=null){super(t,e),this.state=Ee.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ar.ROTATE,MIDDLE:ar.DOLLY,RIGHT:ar.PAN},this.touches={ONE:sr.ROTATE,TWO:sr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Fi,this._lastTargetPosition=new V,this._quat=new Fi().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yl,this._sphericalDelta=new Yl,this._scale=1,this._panOffset=new V,this._rotateStart=new Jt,this._rotateEnd=new Jt,this._rotateDelta=new Jt,this._panStart=new Jt,this._panEnd=new Jt,this._panDelta=new Jt,this._dollyStart=new Jt,this._dollyEnd=new Jt,this._dollyDelta=new Jt,this._dollyDirection=new V,this._mouse=new Jt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=w0.bind(this),this._onPointerDown=A0.bind(this),this._onPointerUp=R0.bind(this),this._onContextMenu=N0.bind(this),this._onMouseWheel=D0.bind(this),this._onKeyDown=L0.bind(this),this._onTouchStart=U0.bind(this),this._onTouchMove=I0.bind(this),this._onMouseDown=C0.bind(this),this._onMouseMove=P0.bind(this),this._interceptControlDown=F0.bind(this),this._interceptControlUp=O0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mc),this.update(),this.state=Ee.NONE}update(t=null){const e=this.object.position;Oe.copy(e).sub(this.target),Oe.applyQuaternion(this._quat),this._spherical.setFromVector3(Oe),this.autoRotate&&this.state===Ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Oe.setFromSpherical(this._spherical),Oe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Oe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Oe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new V(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new V(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Oe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ss.origin.copy(this.object.position),Ss.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ss.direction))<b0?this.object.lookAt(this.target):(yc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ss.intersectPlane(yc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Fo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fo||this._lastTargetPosition.distanceToSquared(this.target)>Fo?(this.dispatchEvent(Mc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Oe.setFromMatrixColumn(e,0),Oe.multiplyScalar(-t),this._panOffset.add(Oe)}_panUp(t,e){this.screenSpacePanning===!0?Oe.setFromMatrixColumn(e,1):(Oe.setFromMatrixColumn(e,0),Oe.crossVectors(this.object.up,Oe)),Oe.multiplyScalar(t),this._panOffset.add(Oe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Oe.copy(r).sub(this.target);let s=Oe.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Jt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function A0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function w0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function R0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bu),this.state=Ee.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function C0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ar.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Ee.DOLLY;break;case ar.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ee.ROTATE}break;case ar.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ee.PAN}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Ya)}function P0(n){switch(this.state){case Ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function D0(n){this.enabled===!1||this.enableZoom===!1||this.state!==Ee.NONE||(n.preventDefault(),this.dispatchEvent(Ya),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(bu))}function L0(n){this.enabled!==!1&&this._handleKeyDown(n)}function U0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case sr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Ee.TOUCH_ROTATE;break;case sr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Ee.TOUCH_PAN;break;default:this.state=Ee.NONE}break;case 2:switch(this.touches.TWO){case sr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Ee.TOUCH_DOLLY_PAN;break;case sr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Ee.TOUCH_DOLLY_ROTATE;break;default:this.state=Ee.NONE}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Ya)}function I0(n){switch(this._trackPointer(n),this.state){case Ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Ee.NONE}}function N0(n){this.enabled!==!1&&n.preventDefault()}function F0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function O0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const B0=1512207,k0=13208418;function z0(n){const t=new E0({canvas:n,antialias:!0});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setClearColor(B0);const e=new Cd,i=new pn(45,1,1,8e3);i.position.set(50,120,240),e.add(new Fd(15786708,3812900,.9));const r=new ql(16774376,1.6);r.position.set(2,3,2),e.add(r);const s=new ql(12626068,.5);s.position.set(-2,1,-1.5),e.add(s);const o=new Pr;o.rotation.x=-Math.PI/2,e.add(o);const a=new Ud({color:k0,metalness:.05,roughness:.55}),l=new T0(i,n);l.enableDamping=!0,l.dampingFactor=.08;const c=[];let u=!1,h=0;function f(){const g=n.clientWidth,d=n.clientHeight;if(g===0||d===0)return;const E=Math.min(window.devicePixelRatio,2);(n.width!==Math.round(g*E)||n.height!==Math.round(d*E))&&(t.setSize(g,d,!1),i.aspect=g/d,i.updateProjectionMatrix())}function p(){u||(f(),l.update(),t.render(e,i),requestAnimationFrame(p))}requestAnimationFrame(p);function v(g){const d=i.fov*Math.PI/180,E=i.aspect>0?i.aspect:1,w=2*Math.atan(Math.tan(d/2)*E);return g/Math.sin(Math.min(d,w)/2)*1.12}function x(){for(const g of c)o.remove(g),g.geometry.dispose();c.length=0}return{setMesh(g){this.setMeshes([g])},setMeshes(g){x();const d=new vr;for(const P of g){const C=new ui;C.setAttribute("position",new hn(P.positions,3)),C.setAttribute("normal",new hn(P.normals,3)),C.setIndex(new hn(P.indices,1)),C.computeBoundingBox(),C.boundingBox&&d.union(C.boundingBox);const O=new Rn(C,a);o.add(O),c.push(O)}if(d.isEmpty())return;const E=new V;d.getCenter(E);for(const P of c)P.position.set(-E.x,-E.y,-E.z);l.target.set(0,0,0);const w=new V;d.getSize(w);const b=w.length()/2,I=v(b);i.near=Math.max(.1,I/500),i.far=I*20,i.updateProjectionMatrix(),Math.abs(b-h)>h*.08&&(i.position.setLength(I),h=b)},dispose(){u=!0,l.dispose(),x(),a.dispose(),t.dispose()}}}const zn=1.5,Ui=(n,t,e)=>Math.min(e,Math.max(t,n)),Ci=(n,t,e)=>n+(t-n)*e;function H0(n){const t=Ui(n,0,1);return t*t*(3-2*t)}const Sc=.14;function Tu(n,t){return 1+n*H0((t-(1-Sc))/Sc)}function Au(n,t){const e=[];for(let i=0;i<n;i++){const r=i/(n-1);e.push({t:r,r:Math.max(zn,t(r))})}return e}const wu=25,V0={id:"pot",label:"Горшок",examples:"горшок, крынка, корчага, канопка",defaultHeightMm:150,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:170,unit:"mm"},{key:"dNeck",label:"Горло",min:20,max:300,step:1,default:108,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:104,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.25,max:.8,step:.01,default:.52,unit:"x"},{key:"shoulder",label:"Плечо",min:0,max:1,step:.01,default:.45,unit:"x",hint:"резкость перехода тулово → горло"},{key:"neckH",label:"Высота горла",min:0,max:.4,step:.01,default:.16,unit:"x"},{key:"rimFlare",label:"Отгиб венчика",min:-.1,max:.6,step:.01,default:.18,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,r=n.dNeck/2,s=r*(1+n.rimFlare),o=Ui(n.bellyAt,.15,.82),a=Math.max(o+.1,1-n.neckH),l=[{t:0,r:e},{t:o,r:i}];return a<.995&&(l.push({t:Ci(o,a,Ci(.45,.72,n.shoulder)),r:Ci(r,i,Ci(.42,.78,n.shoulder))}),l.push({t:a,r})),l.push({t:1,r:s}),l.map(c=>({t:c.t,r:Math.max(zn,c.r)}))}},G0={id:"bowl",label:"Миска",examples:"миска, тарелка, пиала, килик",defaultHeightMm:80,params:[{key:"dRim",label:"Верх",min:60,max:400,step:1,default:210,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:92,unit:"mm"},{key:"curvature",label:"Округлость",min:0,max:1,step:.01,default:.6,unit:"x",hint:"0 — прямой конус, 1 — полусфера"},{key:"footH",label:"Ножка",min:0,max:60,step:1,default:8,unit:"mm"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,r=Ui(n.footH/Math.max(1,t),0,.45),s=n.curvature;return Au(wu,o=>{if(o<=r)return e;const a=(o-r)/(1-r),l=Ci(a,Math.sqrt(Math.max(0,1-(1-a)*(1-a))),s);return Ci(e,i,l)*Tu(n.rimFlare,o)})}},W0={id:"cup",label:"Чашка",examples:"чашка, стакан, кружка, скифос",defaultHeightMm:95,params:[{key:"dRim",label:"Верх",min:30,max:220,step:1,default:84,unit:"mm"},{key:"dFoot",label:"Дно",min:25,max:200,step:1,default:66,unit:"mm"},{key:"barrel",label:"Бочка",min:-.25,max:.35,step:.01,default:.06,unit:"x",hint:">0 — выпуклые бока, <0 — талия"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,r=(e+i)/2;return Au(wu,s=>(Ci(e,i,s)+n.barrel*r*Math.sin(Math.PI*s))*Tu(n.rimFlare,s))}},X0={id:"vase",label:"Ваза",examples:"ваза, амфора, кувшин, бутылка, лекиф",defaultHeightMm:260,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:156,unit:"mm"},{key:"dNeck",label:"Горло",min:12,max:200,step:1,default:54,unit:"mm"},{key:"dRim",label:"Устье",min:14,max:260,step:1,default:76,unit:"mm"},{key:"dFoot",label:"Дно",min:18,max:260,step:1,default:78,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.2,max:.7,step:.01,default:.4,unit:"x"},{key:"neckAt",label:"Высота горла",min:.5,max:.95,step:.01,default:.79,unit:"x"},{key:"footH",label:"Ножка",min:0,max:90,step:1,default:12,unit:"mm"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,r=n.dNeck/2,s=n.dRim/2,o=Ui(n.bellyAt,.12,.72),a=Ui(n.neckAt,o+.12,.96),l=Ui(n.footH/Math.max(1,t),0,o-.06),c=[{t:0,r:e}];return l>.015&&c.push({t:l,r:e}),c.push({t:o,r:i}),c.push({t:a,r}),c.push({t:1,r:s}),c.map(u=>({t:u.t,r:Math.max(zn,u.r)}))}},Xs=[V0,G0,W0,X0];Xs.map(n=>n.id);function Ru(n){return Xs.some(t=>t.id===n)}function ki(n){const t=Xs.find(e=>e.id===n);if(!t)throw new Error(`unknown vessel family: ${n}`);return t}function $0(n){const t={};for(const e of ki(n).params)t[e.key]=e.default;return t}function $s(n,t){const e={};for(const i of ki(n).params){const r=t[i.key];e[i.key]=typeof r=="number"&&Number.isFinite(r)?Ui(r,i.min,i.max):i.default}return e}function ja(n,t,e){const i=ki(n),r=$s(n,t),s=i.points(r,e);return s.sort((o,a)=>o.t-a.t),{familyId:n,heightMm:e,points:s}}function ci(n,t){const e=n.points;if(e.length===1||t<=e[0].t)return e[0].r;const i=e[e.length-1];if(t>=i.t)return i.r;let r=0;for(;r<e.length-2&&e[r+1].t<=t;)r++;const s=e[r],o=e[r+1],a=o.t-s.t;if(a<=0)return o.r;const[l,c]=q0(e,r),u=(t-s.t)/a,h=u*u,f=h*u,p=(2*f-3*h+1)*s.r+(f-2*h+u)*a*l+(-2*f+3*h)*o.r+(f-h)*a*c;return Math.max(zn,p)}function wr(n,t){const e=n[t+1].t-n[t].t;return e>0?(n[t+1].r-n[t].r)/e:0}function q0(n,t){const e=n.length,i=u=>u===0?wr(n,0):u===e-1?wr(n,e-2):(wr(n,u-1)+wr(n,u))/2,r=wr(n,t);if(r===0)return[0,0];let s=i(t),o=i(t+1);s*r<0&&(s=0),o*r<0&&(o=0);const a=s/r,l=o/r,c=a*a+l*l;if(c>9){const u=3/Math.sqrt(c);s=u*a*r,o=u*l*r}return[s,o]}const Ec="http://www.w3.org/2000/svg",Pa=30,Ls=34;function Y0(n){const t=ja(n.id,{},n.defaultHeightMm),e=40,i=[];let r=0;for(let h=0;h<=e;h++){const f=ci(t,h/e);i.push(f),f>r&&(r=f)}const s=Math.min(Pa/(2*r),Ls/t.heightMm),o=Pa/2,a=Ls-(Ls-t.heightMm*s)/2,l=(h,f)=>{const p=o+f*i[h]*s,v=a-h/e*t.heightMm*s;return`${p.toFixed(2)},${v.toFixed(2)}`},c=Array.from({length:e+1},(h,f)=>l(f,1)),u=Array.from({length:e+1},(h,f)=>l(e-f,-1));return`M${c.concat(u).join("L")}Z`}function j0(n,t,e){n.textContent="";const i=new Map;for(const r of Xs){const s=ge("button","family-btn");s.type="button",s.title=r.examples,s.setAttribute("aria-pressed",String(r.id===t));const o=document.createElementNS(Ec,"svg");o.setAttribute("viewBox",`0 0 ${Pa} ${Ls}`),o.setAttribute("aria-hidden","true");const a=document.createElementNS(Ec,"path");a.setAttribute("d",Y0(r)),o.append(a),s.append(o,ge("span",void 0,r.label)),s.addEventListener("click",()=>e(r.id)),n.append(s),i.set(r.id,s)}return{setActive(r){for(const[s,o]of i)o.setAttribute("aria-pressed",String(s===r))}}}function Oo(n,t){return n.unit==="mm"?`${Math.round(t)}`:t.toFixed(2)}function K0(n,t,e,i,r="p"){n.textContent="";const s=new Map,o=new Map;for(const a of t){const l=ge("label","row"),c=ge("span",void 0,a.label);a.hint&&(c.title=a.hint);const u=ge("input");u.type="range",u.id=`${r}_${a.key}`,u.min=String(a.min),u.max=String(a.max),u.step=String(a.step),u.value=String(e[a.key]??a.default);const h=ge("output",void 0,Oo(a,Number(u.value))),f=ge("button","adj-btn","−"),p=ge("button","adj-btn","+");for(const[v,x]of[[f,-1],[p,1]])v.type="button",v.dataset.slider=u.id,v.dataset.dir=String(x),v.tabIndex=-1;u.addEventListener("input",()=>{const v=Number(u.value);h.textContent=Oo(a,v),i(a.key,v)}),l.append(c,f,u,p,h),n.append(l),s.set(a.key,h),o.set(a.key,u)}return{setValues(a){for(const l of t){const c=a[l.key];if(typeof c!="number")continue;const u=o.get(l.key),h=s.get(l.key);u&&(u.value=String(c)),h&&(h.textContent=Oo(l,c))}}}}const Z0=["sin","tri","square","rounded"],J0=["z","theta","spiral"],ks=Math.PI*2,Cu=4,Q0=Math.tanh(Cu),Mn=(n,t,e)=>Math.min(e,Math.max(t,n)),tv=n=>n-Math.floor(n);function bc(n,t){const e=tv(t);switch(n){case"sin":return Math.sin(ks*e);case"tri":return e<.25?4*e:e<.75?2-4*e:4*e-4;case"square":return Math.tanh(Cu*Math.sin(ks*e))/Q0;case"rounded":{const i=e<.5?e:e-.5,r=Math.sqrt(Math.max(0,1-(4*i-1)*(4*i-1)));return e<.5?r:-r}}}function Tc(n,t,e,i){switch(n){case"z":return e;case"theta":return t/ks;case"spiral":return e+i*t/ks}}function Ac(n){const t=Mn(n,0,1);return t*t*(3-2*t)}function ev(n,t){const e=Math.max(n.fade,1e-6);return Ac((t-n.from)/e)*Ac((n.to-t)/e)}function nv(n,t,e){const{wave:i,wave2:r}=n;if(!i.on||i.ampMm===0)return 0;let s=i.phase,o=i.ampMm;if(r.on){const l=bc(r.shape,r.freq*Tc(r.axis,t,e,r.spiralK));s+=r.fm*l,o*=Math.max(0,1+r.am*l)}const a=bc(i.shape,i.freq*Tc(i.axis,t,e,i.spiralK)+s);return o*a*ev(n.zone,e)}function Ka(){return{wave:{on:!1,axis:"z",shape:"rounded",freq:12,ampMm:2,phase:0,spiralK:1},wave2:{on:!1,axis:"theta",shape:"sin",freq:6,fm:.2,am:.5,spiralK:1},zone:{from:.08,to:.95,fade:.06}}}function Es(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const xn=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t,wc=(n,t)=>typeof n=="boolean"?n:t;function Rc(n,t){for(const e of Z0)if(n===e)return e;return t}function Cc(n,t){for(const e of J0)if(n===e)return e;return t}const Za=64,zs=20,ni=12;function Pc(n,t){const e=Mn(t,0,Za);return n==="z"?e:Math.round(e)}function iv(n){const t=Es(n),e=Ka(),i=Es(t.wave),r=Cc(i.axis,e.wave.axis),s=Math.round(Mn(xn(i.spiralK,e.wave.spiralK),-ni,ni)),o={on:wc(i.on,e.wave.on),axis:r,shape:Rc(i.shape,e.wave.shape),freq:Pc(r,xn(i.freq,e.wave.freq)),ampMm:Mn(xn(i.ampMm,e.wave.ampMm),-zs,zs),phase:Mn(xn(i.phase,e.wave.phase),-1,1),spiralK:s},a=Es(t.wave2),l=Cc(a.axis,e.wave2.axis),c=Math.round(Mn(xn(a.spiralK,e.wave2.spiralK),-ni,ni)),u={on:wc(a.on,e.wave2.on),axis:l,shape:Rc(a.shape,e.wave2.shape),freq:Pc(l,xn(a.freq,e.wave2.freq)),fm:Mn(xn(a.fm,e.wave2.fm),-1,1),am:Mn(xn(a.am,e.wave2.am),0,1),spiralK:c},h=Es(t.zone),f=Mn(xn(h.from,e.zone.from),0,1),p=Mn(xn(h.to,e.zone.to),0,1),v={from:Math.min(f,p),to:Math.max(f,p),fade:Mn(xn(h.fade,e.zone.fade),0,.5)};return{wave:o,wave2:u,zone:v}}const rv=["rope","zigzag","dots","diamonds","dashes","lattice"],Pu=Math.PI*2,Dc=.12,ei=(n,t,e)=>Math.min(e,Math.max(t,n)),Us=n=>n-Math.floor(n);function Da(n){const t=ei(n,0,1);return t*t*(3-2*t)}function La(n,t){const e=Math.abs(n);return e<t?.5*(1+Math.cos(Math.PI*e/t)):0}function bs(n,t=.5){return La(Us(n+.5)-.5,t)}function sv(n,t,e){switch(n){case"rope":return bs(t-e);case"zigzag":{const i=.5*Math.abs(2*e-1);return bs(t-i,.4)}case"dots":{const i=(Us(t)-.5)*2,r=(e-.5)*2,s=Math.hypot(i,r);return s<1?Math.sqrt(1-s*s):0}case"diamonds":{const i=(Math.abs(Us(t)-.5)+Math.abs(e-.5))*2;return Da(1-i)}case"dashes":return La(Us(t)-.5,.22)*La(e-.5,.35);case"lattice":return Math.max(bs(t-e,.22),bs(t+e,.22))}}function Du(n,t){if(n.repeats>=3)return Math.round(n.repeats);const e=Pu*Math.max(1,t.bandRadiusMm);return ei(Math.round(e/Math.max(1,n.bandWidthMm)),3,Ja)}function ov(n,t){if(!n.on||n.depthMm===0)return()=>0;const e=Du(n,t),i=ei(n.bandWidthMm/Math.max(1,t.heightMm),1e-4,1),r=n.bandCenter-i/2;return(s,o)=>{const a=(o-r)/i;if(a<0||a>1)return 0;const l=e*(s/Pu)+n.angle*a,c=Da(a/Dc)*Da((1-a)/Dc);return sv(n.pattern,l,a)*c*n.depthMm}}const Ja=400,Hs=8,Lu=200;function Qa(){return{on:!1,pattern:"rope",bandCenter:.62,bandWidthMm:14,depthMm:1.2,repeats:0,angle:0}}function av(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const Rr=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t;function lv(n){const t=av(n),e=Qa();let i=e.pattern;for(const s of rv)t.pattern===s&&(i=s);const r=Rr(t.repeats,e.repeats);return{on:typeof t.on=="boolean"?t.on:e.on,pattern:i,bandCenter:ei(Rr(t.bandCenter,e.bandCenter),0,1),bandWidthMm:ei(Rr(t.bandWidthMm,e.bandWidthMm),1,Lu),depthMm:ei(Rr(t.depthMm,e.depthMm),-Hs,Hs),repeats:r<3?0:ei(Math.round(r),3,Ja),angle:ei(Rr(t.angle,e.angle),-2,2)}}function cv(n){return n>=1?0:n>=.1?1:2}function Bo(n,t){const e=t.toFixed(cv(n.step));return n.unit?`${e}`:e}function si(n,t,e,i,r){n.textContent="";const s=[];for(const o of t){const a=ge("label","row"),l=ge("span",void 0,o.label);if(o.hint&&(l.title=o.hint),a.append(l),o.kind==="select"){const c=ge("select");c.id=`${r}_${o.key}`;for(const u of o.options){const h=ge("option",void 0,u.label);h.value=u.value,c.append(h)}c.value=o.get(e()),c.addEventListener("change",()=>i(o.set(e(),c.value))),a.append(c),s.push(u=>{c.value=o.get(u)})}else{const c=ge("input");c.type="range",c.id=`${r}_${o.key}`,c.min=String(o.min),c.max=String(o.max),c.step=String(o.step),c.value=String(o.get(e()));const u=ge("output",void 0,Bo(o,o.get(e()))),h=ge("button","adj-btn","−"),f=ge("button","adj-btn","+");for(const[p,v]of[[h,-1],[f,1]])p.type="button",p.dataset.slider=c.id,p.dataset.dir=String(v),p.tabIndex=-1;c.addEventListener("input",()=>{const p=Number(c.value);u.textContent=Bo(o,p),i(o.set(e(),p))}),a.append(h,c,f,u),s.push(p=>{const v=o.get(p);c.value=String(v),u.textContent=Bo(o,v)})}n.append(a)}return{sync(o){for(const a of s)a(o)}}}function Lr(n,t){const e=ge("section","fcard");e.id=`card_${t.id}`;const i=ge("div","fcard-head"),r=ge("input");r.type="checkbox",r.checked=t.enabled,r.id=`on_${t.id}`;const s=ge("span","fcard-title",t.title),o=ge("span","fcard-caret",t.enabled?"▾":"▸");i.append(r,s),t.tag&&i.append(ge("span","fcard-tag",t.tag)),i.append(o);const a=ge("div","fcard-body");t.desc&&a.append(ge("p","fcard-desc",t.desc));function l(u){e.classList.toggle("collapsed",u),o.textContent=u?"▸":"▾"}l(!t.enabled),r.addEventListener("click",u=>{u.stopPropagation(),l(!r.checked),t.onToggle(r.checked)}),i.addEventListener("click",()=>l(!e.classList.contains("collapsed"))),e.append(i,a),n.append(e);let c=t.enabled;return{body:a,setEnabled(u){r.checked=u,u!==c&&(l(!u),c=u)}}}const Uu=[{value:"z",label:"по высоте"},{value:"theta",label:"вокруг оси"},{value:"spiral",label:"по спирали"}],Iu=[{value:"sin",label:"синус"},{value:"tri",label:"треугольник"},{value:"square",label:"меандр"},{value:"rounded",label:"валики"}],uv=[{value:"rope",label:"верёвочка"},{value:"zigzag",label:"зигзаг"},{value:"dots",label:"точки"},{value:"diamonds",label:"ромбы"},{value:"dashes",label:"насечки"},{value:"lattice",label:"сетка"}],Nu="работает при оси «по спирали»",hv=[{kind:"select",key:"axis",label:"Куда бежит",options:Uu,get:n=>n.wave.axis,set:(n,t)=>({...n,wave:{...n.wave,axis:Fu(t)}})},{kind:"select",key:"shape",label:"Форма",options:Iu,get:n=>n.wave.shape,set:(n,t)=>({...n,wave:{...n.wave,shape:Ou(t)}})},{kind:"range",key:"freq",label:"Гребней",min:0,max:Za,step:1,get:n=>n.wave.freq,set:(n,t)=>({...n,wave:{...n.wave,freq:t}})},{kind:"range",key:"amp",label:"Глубина",min:-zs,max:zs,step:.1,unit:"мм",get:n=>n.wave.ampMm,set:(n,t)=>({...n,wave:{...n.wave,ampMm:t}})},{kind:"range",key:"phase",label:"Фаза",min:-1,max:1,step:.01,get:n=>n.wave.phase,set:(n,t)=>({...n,wave:{...n.wave,phase:t}})},{kind:"range",key:"spiralK",label:"Шаг спирали",min:-ni,max:ni,step:1,hint:Nu,get:n=>n.wave.spiralK,set:(n,t)=>({...n,wave:{...n.wave,spiralK:t}})},{kind:"range",key:"zoneFrom",label:"Зона снизу",min:0,max:1,step:.01,hint:"ниже этой доли высоты рельефа нет",get:n=>n.zone.from,set:(n,t)=>({...n,zone:{...n.zone,from:t}})},{kind:"range",key:"zoneTo",label:"Зона сверху",min:0,max:1,step:.01,get:n=>n.zone.to,set:(n,t)=>({...n,zone:{...n.zone,to:t}})},{kind:"range",key:"zoneFade",label:"Растушёвка",min:0,max:.5,step:.01,get:n=>n.zone.fade,set:(n,t)=>({...n,zone:{...n.zone,fade:t}})}],fv=[{kind:"select",key:"axis2",label:"Куда бежит",options:Uu,get:n=>n.wave2.axis,set:(n,t)=>({...n,wave2:{...n.wave2,axis:Fu(t)}})},{kind:"select",key:"shape2",label:"Форма",options:Iu,get:n=>n.wave2.shape,set:(n,t)=>({...n,wave2:{...n.wave2,shape:Ou(t)}})},{kind:"range",key:"freq2",label:"Гребней",min:0,max:Za,step:1,get:n=>n.wave2.freq,set:(n,t)=>({...n,wave2:{...n.wave2,freq:t}})},{kind:"range",key:"fm",label:"Гнёт фазу",min:-1,max:1,step:.01,hint:"вторая волна сдвигает гребни первой",get:n=>n.wave2.fm,set:(n,t)=>({...n,wave2:{...n.wave2,fm:t}})},{kind:"range",key:"am",label:"Гнёт глубину",min:0,max:1,step:.01,hint:"вторая волна то усиливает, то гасит первую",get:n=>n.wave2.am,set:(n,t)=>({...n,wave2:{...n.wave2,am:t}})},{kind:"range",key:"spiralK2",label:"Шаг спирали",min:-ni,max:ni,step:1,hint:Nu,get:n=>n.wave2.spiralK,set:(n,t)=>({...n,wave2:{...n.wave2,spiralK:t}})}],dv=[{kind:"select",key:"pattern",label:"Узор",options:uv,get:n=>n.pattern,set:(n,t)=>({...n,pattern:pv(t)})},{kind:"range",key:"bandCenter",label:"Высота пояса",min:0,max:1,step:.01,get:n=>n.bandCenter,set:(n,t)=>({...n,bandCenter:t})},{kind:"range",key:"bandWidth",label:"Ширина",min:1,max:Lu,step:1,unit:"мм",get:n=>n.bandWidthMm,set:(n,t)=>({...n,bandWidthMm:t})},{kind:"range",key:"depth",label:"Глубина",min:-Hs,max:Hs,step:.1,unit:"мм",hint:"> 0 — выпуклый узор, < 0 — вдавленный",get:n=>n.depthMm,set:(n,t)=>({...n,depthMm:t})},{kind:"range",key:"repeats",label:"Оттисков",min:0,max:Ja,step:1,hint:"0 — подобрать по размеру изделия",get:n=>n.repeats,set:(n,t)=>({...n,repeats:t})},{kind:"range",key:"angle",label:"Наклон",min:-2,max:2,step:.05,get:n=>n.angle,set:(n,t)=>({...n,angle:t})}];function Fu(n){return n==="theta"||n==="spiral"?n:"z"}function Ou(n){return n==="tri"||n==="square"||n==="rounded"?n:"sin"}function pv(n){switch(n){case"zigzag":case"dots":case"diamonds":case"dashes":case"lattice":return n;default:return"rope"}}function mv(n,t,e,i,r){n.textContent="";const s=Lr(n,{id:"wave",title:"Волна",desc:"Смещает поверхность вдоль нормали. Глубина — в миллиметрах.",enabled:t().wave.on,onToggle:f=>i({...t(),wave:{...t().wave,on:f}})}),o=si(s.body,hv,t,i,"wave"),a=Lr(n,{id:"wave2",title:"Волна волны",tag:"2-й порядок",desc:"Вторая волна гнёт первую: сдвигает её гребни и меняет их глубину.",enabled:t().wave2.on,onToggle:f=>i({...t(),wave2:{...t().wave2,on:f}})}),l=si(a.body,fv,t,i,"wave2"),c=Lr(n,{id:"roulette",title:"Накатка роликом",desc:"Колесо-штамп прокатывается по пояску. За оборот всегда укладывается целое число оттисков.",enabled:e().on,onToggle:f=>r({...e(),on:f})}),u=si(c.body,dv,e,r,"roul"),h=ge("p","fcard-desc");return c.body.append(h),{sync(f,p){s.setEnabled(f.wave.on),a.setEnabled(f.wave2.on),c.setEnabled(p.on),o.sync(f),l.sync(f),u.sync(p)},setRepeatsNote(f){h.textContent=f}}}function _v(n){return n.wrapV?n.nv:n.nv+1}function gv(n,t,e){if(n<3||t<1)throw new Error(`sampleGrid: bad dims ${n}x${t}`);const i=new Float32Array(n*(t+1)*3),r=new Float64Array(3);for(let s=0;s<=t;s++){const o=s/t;for(let a=0;a<n;a++){const l=2*Math.PI*a/n;e(l,o,r);const c=(s*n+a)*3;i[c]=r[0],i[c+1]=r[1],i[c+2]=r[2]}}return{nu:n,nv:t,positions:i}}function vv(n,t,e=!1){const i=t,r=e?t:t+1,s=new Uint32Array(n*i*6);let o=0;for(let a=0;a<i;a++){const l=e?(a+1)%r:a+1;for(let c=0;c<n;c++){const u=(c+1)%n,h=a*n+c,f=a*n+u,p=l*n+u,v=l*n+c;s[o++]=h,s[o++]=f,s[o++]=p,s[o++]=h,s[o++]=p,s[o++]=v}}return s}function xv(n,t){const{nu:e,nv:i}=n,r=e*(i+1),s=new Float32Array((2*r+2)*3);s.set(n.positions,0),s.set(t,r*3);const o=0,a=r,l=2*r,c=2*r+1,u=e*i*2*2,h=e*2,f=e*2,p=new Uint32Array((u+h+f)*3);let v=0;for(let E=0;E<i;E++)for(let w=0;w<e;w++){const b=(w+1)%e,I=o+E*e+w,P=o+E*e+b,C=o+(E+1)*e+b,O=o+(E+1)*e+w;p[v++]=I,p[v++]=P,p[v++]=C,p[v++]=I,p[v++]=C,p[v++]=O}for(let E=0;E<i;E++)for(let w=0;w<e;w++){const b=(w+1)%e,I=a+E*e+w,P=a+(E+1)*e+w,C=a+(E+1)*e+b,O=a+E*e+b;p[v++]=I,p[v++]=P,p[v++]=C,p[v++]=I,p[v++]=C,p[v++]=O}const x=(E,w)=>{let b=0,I=0,P=0;for(let C=0;C<e;C++){const O=(E+C)*3;b+=s[O],I+=s[O+1],P+=s[O+2]}s[w*3]=b/e,s[w*3+1]=I/e,s[w*3+2]=P/e};x(o,l),x(a,c);for(let E=0;E<e;E++)p[v++]=l,p[v++]=o+(E+1)%e,p[v++]=o+E;for(let E=0;E<e;E++)p[v++]=c,p[v++]=a+E,p[v++]=a+(E+1)%e;const g=o+i*e,d=a+i*e;for(let E=0;E<e;E++){const w=(E+1)%e;p[v++]=g+E,p[v++]=g+w,p[v++]=d+w,p[v++]=g+E,p[v++]=d+w,p[v++]=d+E}return{positions:s,indices:p}}function tl(n,t){const{nu:e,nv:i,positions:r}=n,s=vv(e,i),o=2,a=e*(i+1),l=new Float32Array((a+o)*3);l.set(r);const c=e+e,u=new Uint32Array(s.length+c*3);u.set(s);let h=s.length,f=a;const p=v=>{let x=0,g=0,d=0;for(let E=0;E<e;E++){const w=(v*e+E)*3;x+=r[w],g+=r[w+1],d+=r[w+2]}return[x/e,g/e,d/e]};{const v=f++,[x,g,d]=p(0);l[v*3]=x,l[v*3+1]=g,l[v*3+2]=d;for(let E=0;E<e;E++)u[h++]=v,u[h++]=(E+1)%e,u[h++]=E}{const v=f,[x,g,d]=p(i);l[v*3]=x,l[v*3+1]=g,l[v*3+2]=d;const E=i*e;for(let w=0;w<e;w++)u[h++]=v,u[h++]=E+w,u[h++]=E+(w+1)%e}return{positions:l,indices:u}}function Mv(n){const{nu:t,nv:e,positions:i}=n,r=_v(n),s=new Float32Array(t*r*3),o=(a,l,c)=>i[(l*t+(a+t)%t)*3+c];for(let a=0;a<r;a++){const l=n.wrapV?(a-1+r)%r:Math.max(0,a-1),c=n.wrapV?(a+1)%r:Math.min(e,a+1);for(let u=0;u<t;u++){const h=o(u+1,a,0)-o(u-1,a,0),f=o(u+1,a,1)-o(u-1,a,1),p=o(u+1,a,2)-o(u-1,a,2),v=o(u,c,0)-o(u,l,0),x=o(u,c,1)-o(u,l,1),g=o(u,c,2)-o(u,l,2);let d=f*g-p*x,E=p*v-h*g,w=h*x-f*v;const b=Math.hypot(d,E,w);b>1e-12?(d/=b,E/=b,w/=b):(d=0,E=0,w=a===0?-1:1);const I=(a*t+u)*3;s[I]=d,s[I+1]=E,s[I+2]=w}}return s}function Xr(n,t){const e=new Float32Array(n.length);for(let i=0;i<t.length;i+=3){const r=t[i]*3,s=t[i+1]*3,o=t[i+2]*3,a=n[s]-n[r],l=n[s+1]-n[r+1],c=n[s+2]-n[r+2],u=n[o]-n[r],h=n[o+1]-n[r+1],f=n[o+2]-n[r+2],p=l*f-c*h,v=c*u-a*f,x=a*h-l*u;for(const g of[r,s,o])e[g]+=p,e[g+1]+=v,e[g+2]+=x}for(let i=0;i<e.length;i+=3){const r=Math.hypot(e[i],e[i+1],e[i+2]);r>1e-12&&(e[i]/=r,e[i+1]/=r,e[i+2]/=r)}return e}function Bu(n,t,e,i,r){const s=1-r,o=s*s*s,a=3*s*s*r,l=3*s*r*r,c=r*r*r;return{x:o*n.x+a*t.x+l*e.x+c*i.x,y:o*n.y+a*t.y+l*e.y+c*i.y,z:o*n.z+a*t.z+l*e.z+c*i.z}}function yv(n,t,e,i,r){const s=1-r,o=3*s*s,a=6*s*r,l=3*r*r;return{x:o*(t.x-n.x)+a*(e.x-t.x)+l*(i.x-e.x),y:o*(t.y-n.y)+a*(e.y-t.y)+l*(i.y-e.y),z:o*(t.z-n.z)+a*(e.z-t.z)+l*(i.z-e.z)}}function Sv(n,t,e,i,r){const s=i+1,o=s*r+2,a=new Float32Array(o*3);for(let v=0;v<s;v++){const x=v/i,g=n(x),d=Uc(t(x)),E={x:0,y:1,z:0},w=Uc(bv(d,E)),{halfDepth:b,halfWidth:I}=e(x);for(let P=0;P<r;P++){const C=2*Math.PI*P/r,O=Math.cos(C)*b,T=Math.sin(C)*I,S=(v*r+P)*3;a[S]=g.x+w.x*O+E.x*T,a[S+1]=g.y+w.y*O+E.y*T,a[S+2]=g.z+w.z*O+E.z*T}}const l=s*r,c=l+1;Lc(a,0,r,l),Lc(a,(s-1)*r,r,c);const u=i*r*2,h=new Uint32Array((u+r*2)*3);let f=0;for(let v=0;v<i;v++)for(let x=0;x<r;x++){const g=(x+1)%r,d=v*r+x,E=v*r+g,w=(v+1)*r+g,b=(v+1)*r+x;h[f++]=d,h[f++]=w,h[f++]=E,h[f++]=d,h[f++]=b,h[f++]=w}for(let v=0;v<r;v++){const x=(v+1)%r;h[f++]=l,h[f++]=v,h[f++]=x}const p=(s-1)*r;for(let v=0;v<r;v++){const x=(v+1)%r;h[f++]=c,h[f++]=p+x,h[f++]=p+v}return{positions:a,indices:h,normals:Xr(a,h)}}function Ev(n){const t=new Float32Array(n.positions);for(let i=0;i<t.length;i+=3)t[i]=-t[i];const e=new Uint32Array(n.indices.length);for(let i=0;i<n.indices.length;i+=3)e[i]=n.indices[i],e[i+1]=n.indices[i+2],e[i+2]=n.indices[i+1];return{positions:t,indices:e,normals:Xr(t,e)}}function Lc(n,t,e,i){let r=0,s=0,o=0;for(let a=0;a<e;a++){const l=(t+a)*3;r+=n[l],s+=n[l+1],o+=n[l+2]}n[i*3]=r/e,n[i*3+1]=s/e,n[i*3+2]=o/e}function Uc(n){const t=Math.hypot(n.x,n.y,n.z);return t<1e-12?{x:0,y:0,z:1}:{x:n.x/t,y:n.y/t,z:n.z/t}}function bv(n,t){return{x:n.y*t.z-n.z*t.y,y:n.z*t.x-n.x*t.z,z:n.x*t.y-n.y*t.x}}const ku=120,zu=40,Tv=2.5,Av=64,wv=24;function Hu(){return{on:!1,count:1,topAt:.82,bottomAt:.3,reachMm:28,thicknessMm:11,widthRatio:.7}}const Cr=(n,t,e)=>Math.min(e,Math.max(t,n));function Rv(n){const t=Hu(),e={};if(typeof n=="object"&&n!==null)for(const[s,o]of Object.entries(n))e[s]=o;const i=(s,o)=>typeof s=="number"&&Number.isFinite(s)?s:o,r=Cr(i(e.topAt,t.topAt),.15,.98);return{on:typeof e.on=="boolean"?e.on:t.on,count:i(e.count,t.count)>=2?2:1,topAt:r,bottomAt:Cr(i(e.bottomAt,t.bottomAt),.02,r-.1),reachMm:Cr(i(e.reachMm,t.reachMm),3,ku),thicknessMm:Cr(i(e.thicknessMm,t.thicknessMm),3,zu),widthRatio:Cr(i(e.widthRatio,t.widthRatio),.25,3)}}function el(n,t,e){if(!n.on)return[];const i=ci(t,n.topAt),r=ci(t,n.bottomAt),s=Math.min(Tv,i*.4,r*.4),o={x:-(i-s),y:0,z:n.topAt*e},a={x:-(r-s),y:0,z:n.bottomAt*e},l=Cv(n,o,a,i,r),c={x:-(i+l),y:0,z:o.z},u={x:-(r+l),y:0,z:a.z},h=n.thicknessMm/2,f=n.thicknessMm*n.widthRatio/2,p=Sv(v=>Bu(o,c,u,a,v),v=>yv(o,c,u,a,v),()=>({halfDepth:h,halfWidth:f}),Av,wv);return n.count>=2?[p,Ev(p)]:[p]}function Cv(n,t,e,i,r){const s=Math.max(i,r),o=c=>{const u={x:-(i+c),y:0,z:t.z},h={x:-(r+c),y:0,z:e.z};let f=0;for(let p=0;p<=64;p++)f=Math.max(f,-Bu(t,u,h,e,p/64).x);return f-s};let a=0,l=n.reachMm*4+10;for(let c=0;c<40;c++){const u=(a+l)/2;o(u)<n.reachMm?a=u:l=u}return l}const Vu=60;function nl(){return{on:!1,pullMm:14,widthDeg:60,zone:.18}}const Is=(n,t,e)=>Math.min(e,Math.max(t,n));function Pv(n){const t=nl(),e={};if(typeof n=="object"&&n!==null)for(const[r,s]of Object.entries(n))e[r]=s;const i=(r,s)=>typeof r=="number"&&Number.isFinite(r)?r:s;return{on:typeof e.on=="boolean"?e.on:t.on,pullMm:Is(i(e.pullMm,t.pullMm),0,Vu),widthDeg:Is(i(e.widthDeg,t.widthDeg),15,180),zone:Is(i(e.zone,t.zone),.03,.6)}}function Dv(n){const t=Is(n,0,1);return t*t*(3-2*t)}function Lv(n){if(!n.on||n.pullMm===0)return()=>0;const t=n.widthDeg*Math.PI/360,e=1-n.zone;return(i,r)=>{if(r<=e)return 0;const s=Math.abs((i+Math.PI)%(2*Math.PI)-Math.PI);if(s>=t)return 0;const o=.5*(1+Math.cos(Math.PI*s/t));return n.pullMm*o*Dv((r-e)/n.zone)}}const Uv=[{kind:"select",key:"count",label:"Сколько",options:[{value:"1",label:"одна (кружка)"},{value:"2",label:"две (амфора)"}],get:n=>String(n.count),set:(n,t)=>({...n,count:t==="2"?2:1})},{kind:"range",key:"topAt",label:"Верх",min:.15,max:.98,step:.01,hint:"высота верхнего крепления, доля высоты изделия",get:n=>n.topAt,set:(n,t)=>({...n,topAt:t})},{kind:"range",key:"bottomAt",label:"Низ",min:.02,max:.88,step:.01,get:n=>n.bottomAt,set:(n,t)=>({...n,bottomAt:t})},{kind:"range",key:"reach",label:"Вынос",min:3,max:ku,step:1,unit:"мм",hint:"насколько дуга отходит от стенки",get:n=>n.reachMm,set:(n,t)=>({...n,reachMm:t})},{kind:"range",key:"thickness",label:"Толщина",min:3,max:zu,step:.5,unit:"мм",get:n=>n.thicknessMm,set:(n,t)=>({...n,thicknessMm:t})},{kind:"range",key:"width",label:"Ширина",min:.25,max:3,step:.05,hint:"ширина сечения в долях толщины",get:n=>n.widthRatio,set:(n,t)=>({...n,widthRatio:t})}],Iv=[{kind:"range",key:"pull",label:"Вытяг",min:0,max:Vu,step:.5,unit:"мм",get:n=>n.pullMm,set:(n,t)=>({...n,pullMm:t})},{kind:"range",key:"width",label:"Ширина",min:15,max:180,step:1,unit:"°",get:n=>n.widthDeg,set:(n,t)=>({...n,widthDeg:t})},{kind:"range",key:"zone",label:"Высота",min:.03,max:.6,step:.01,hint:"по какой доле высоты сверху идёт оттяжка",get:n=>n.zone,set:(n,t)=>({...n,zone:t})}];function Nv(n,t,e,i,r){n.textContent="";const s=Lr(n,{id:"handle",title:"Ручка",desc:"Дуга в плоскости разъёма формы: одна ручка сзади, две — зеркально, как у амфоры.",enabled:t().on,onToggle:c=>i({...t(),on:c})}),o=si(s.body,Uv,t,i,"handle"),a=Lr(n,{id:"spout",title:"Носик",desc:"Оттянутый наружу край, как у крынки. Смотрит вперёд, напротив ручки.",enabled:e().on,onToggle:c=>r({...e(),on:c})}),l=si(a.body,Iv,e,r,"spout");return{sync(c,u){s.setEnabled(c.on),a.setEnabled(u.on),o.sync(c),l.sync(u)}}}function Gu(n,t){const e=[],i=[];if(n.finite||e.push("Mesh contains non-finite coordinates or normals."),n.indicesValid||e.push("Mesh contains invalid triangle indices."),(n.triangleCount===0||n.vertexCount===0)&&e.push("Mesh is empty."),n.extents.some(r=>!Number.isFinite(r)||r<=1e-9)&&e.push("Mesh has zero extent on at least one axis."),n.watertight||e.push("Solid mesh is not watertight."),n.volume<0&&e.push("Solid mesh is oriented inside-out."),n.degenerateTriangles>0){const r=n.triangleCount>0?n.degenerateTriangles/n.triangleCount:1,s=`${n.degenerateTriangles} degenerate triangle(s) (${(r*100).toFixed(2)}%).`;r>.01?e.push(s):i.push(s)}return{blocking:e,warnings:i}}function Fv(n,t=60){const{positions:e,indices:i}=n;let r=1/0,s=-1/0;for(let u=2;u<e.length;u+=3)e[u]<r&&(r=e[u]),e[u]>s&&(s=e[u]);const o=r+.02*(s-r),a=Math.sin(t*Math.PI/180);let l=0,c=0;for(let u=0;u<i.length;u+=3){const h=i[u]*3,f=i[u+1]*3,p=i[u+2]*3;if(e[h+2]<o&&e[f+2]<o&&e[p+2]<o)continue;const v=e[f]-e[h],x=e[f+1]-e[h+1],g=e[f+2]-e[h+2],d=e[p]-e[h],E=e[p+1]-e[h+1],w=e[p+2]-e[h+2],b=x*w-g*E,I=g*d-v*w,P=v*E-x*d,C=Math.hypot(b,I,P);C<1e-30||(l+=C,P/C<-a&&(c+=C))}return l>0?c/l:0}function il(n,t){let e=0;for(let i=0;i<t.length;i+=3){const r=t[i]*3,s=t[i+1]*3,o=t[i+2]*3;e+=n[r]*(n[s+1]*n[o+2]-n[s+2]*n[o+1])-n[r+1]*(n[s]*n[o+2]-n[s+2]*n[o])+n[r+2]*(n[s]*n[o+1]-n[s+1]*n[o])}return e/6}function rl(n,t=1e-12){const{positions:e,indices:i}=n;let r=!0;for(const v of[e,n.normals]){for(let x=0;x<v.length;x++)if(!Number.isFinite(v[x])){r=!1;break}if(!r)break}const s=[1/0,1/0,1/0],o=[-1/0,-1/0,-1/0];for(let v=0;v<e.length;v+=3)for(let x=0;x<3;x++){const g=e[v+x];g<s[x]&&(s[x]=g),g>o[x]&&(o[x]=g)}const a=new Map,l=e.length/3;let c=i.length%3===0;for(let v=0;v<i.length;v++)if(i[v]>=l){c=!1;break}const u=(v,x)=>v<x?v*l+x:x*l+v;let h=0;for(let v=0;c&&v<i.length;v+=3){const x=i[v],g=i[v+1],d=i[v+2];for(const[lt,Q]of[[x,g],[g,d],[d,x]]){const dt=u(lt,Q);let Y=a.get(dt);Y||(Y={count:0,balance:0},a.set(dt,Y)),Y.count++,Y.balance+=lt<Q?1:-1}const E=x*3,w=g*3,b=d*3,I=e[w]-e[E],P=e[w+1]-e[E+1],C=e[w+2]-e[E+2],O=e[b]-e[E],T=e[b+1]-e[E+1],S=e[b+2]-e[E+2],F=P*S-C*T,J=C*O-I*S,q=I*T-P*O;Math.hypot(F,J,q)*.5<t&&h++}let f=c&&i.length>0;for(const v of a.values())if(v.count!==2||v.balance!==0){f=!1;break}const p=[o[0]-s[0],o[1]-s[1],o[2]-s[2]];return{finite:r,indicesValid:c,watertight:f,volume:c?il(e,i):0,bbox:{min:s,max:o},degenerateTriangles:h,triangleCount:i.length/3,vertexCount:l,extents:p}}const Ov=8,Bv=1024,kv=4,zv=1024,Hv=Math.PI*2,Vv=.03,Ic=(n,t,e)=>Number.isFinite(n)?Math.min(e,Math.max(t,Math.round(n))):t;function $r(n){const t=Ic(n.nu,Ov,Bv),e=Ic(n.nv,kv,zv),i=Number.isFinite(n.heightMm)?Math.max(1,n.heightMm):100,r=ja(n.family,n.shape,i),s=n.relief??Ka(),o=n.roulette??Qa(),a=ov(o,{heightMm:i,bandRadiusMm:ci(r,o.bandCenter)}),l=!s.wave.on&&!o.on,c=Lv(n.spout??nl());return{profile:r,heightMm:i,nu:t,nv:e,depthAt(u,h){return l?0:(nv(s,u,h)+a(u,h))*Gv(h/Vv)},pullAt:c}}function Wu(n,t=-1/0){const e=$r(n),{nu:i,nv:r,profile:s,heightMm:o}=e,a=gv(i,r,(u,h,f)=>{const p=Math.max(zn,ci(s,h));f[0]=p*Math.cos(u),f[1]=p*Math.sin(u),f[2]=h*o}),l=Mv(a),c=a.positions;for(let u=0;u<=r;u++){const h=u/r;for(let f=0;f<i;f++){const p=Hv*f/i,v=Math.max(e.depthAt(p,h),t),x=e.pullAt(p,h);if(v===0&&x===0)continue;const g=(u*i+f)*3;let d=c[g]+l[g]*v,E=c[g+1]+l[g+1]*v;const w=c[g+2]+l[g+2]*v,b=Math.hypot(d,E);if(b<zn){const I=b>1e-9?zn/b:0;d=b>1e-9?d*I:zn*Math.cos(p),E=b>1e-9?E*I:zn*Math.sin(p)}if(x!==0){const I=Math.hypot(d,E),P=(I+x)/Math.max(I,1e-9);d*=P,E*=P}c[g]=d,c[g+1]=E,c[g+2]=w}}return a}function Gv(n){const t=Math.min(1,Math.max(0,n));return t*t*(3-2*t)}function sl(n){const t=tl(Wu(n));return{...t,normals:Xr(t.positions,t.indices)}}const ol=.8,al=60,Xu=1,$u=60,Wv=.6,Nc=.3,Xv=.7;function qu(){return{wallMm:3,baseMm:4}}const Ua=(n,t,e)=>Math.min(e,Math.max(t,n));function $v(n){const t=qu(),e={};if(typeof n=="object"&&n!==null)for(const[r,s]of Object.entries(n))e[r]=s;const i=(r,s)=>typeof r=="number"&&Number.isFinite(r)?r:s;return{wallMm:Ua(i(e.wallMm,t.wallMm),ol,al),baseMm:Ua(i(e.baseMm,t.baseMm),Xu,$u)}}function Ia(n,t,e,i){const s=Math.max(0,i-1e-4),o=Math.min(1,i+1e-4),a=(n(o)-n(s))/Math.max(1e-9,o-s),l=t,c=Math.hypot(a,l),u=l/c,h=-a/c;return{r:n(i)-e*u,z:i*t-e*h}}function qv(n,t,e,i){if(Ia(n,t,e,0).z>=i)return 0;let r=0,s=1;for(let o=0;o<48;o++){const a=(r+s)/2;Ia(n,t,e,a).z<i?r=a:s=a}return s}function Yu(n,t){const e=Ua(t.wallMm,ol,al),i=-(e-Wv),r=$r(n),s=Wu(n,i),{nu:o,nv:a,profile:l,heightMm:c}=r,u=E=>ci(l,E),h=Math.min(t.baseMm,c*Xv),f=qv(u,c,e,h),p=new Float32Array(s.positions.length);let v=0,x=h;for(let E=0;E<=a;E++){const w=f+(1-f)*(E/a),b=Ia(u,c,e,w),I=Math.min(Math.max(b.z,h,x),c);x=I;let P=b.r;P<Nc&&(P=Math.min(Nc,u(w)*.5));for(let C=0;C<o;C++){const O=(E*o+C)*3,T=2*Math.PI*C/o;p[O]=P*Math.cos(T),p[O+1]=P*Math.sin(T),p[O+2]=I,r.depthAt(T,w)<i&&v++}}const g=xv(s,p),d=tl({nu:o,nv:a,positions:p});return{mesh:{...g,normals:Xr(g.positions,g.indices)},innerGrid:{nu:o,nv:a,positions:p},capacityMl:il(d.positions,d.indices)/1e3,pinchedFraction:v/(o*(a+1))}}const Yv="modulepreload",jv=function(n,t){return new URL(n,t).href},Fc={},Kv=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(e.map(c=>{if(c=jv(c,i),c in Fc)return;Fc[c]=!0;const u=c.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let v=o.length-1;v>=0;v--){const x=o[v];if(x.href===c&&(!u||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":Yv,u||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((v,x)=>{p.addEventListener("load",v),p.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};async function Zv(n={}){var vl,xl,Ml;var t,e=n,i=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,s=((xl=(vl=globalThis.process)==null?void 0:vl.versions)==null?void 0:xl.node)&&((Ml=globalThis.process)==null?void 0:Ml.type)!="renderer";if(s){const{createRequire:m}=await Kv(()=>import("./__vite-browser-external-BIHI7g3E.js"),[],import.meta.url);var o=m(import.meta.url)}var a=!1;e.setup=function(){if(a)return;a=!0,e.initTBB();function m(L,k,Z=at=>at){if(k)for(let at of k)L.push_back(Z(at));return L}function _(L,k=Z=>Z){const Z=[],at=L.size();for(let Ht=0;Ht<at;Ht++)Z.push(k(L.get(Ht)));return Z}function A(L,k=Z=>Z){const Z=[],at=L.size();for(let Ht=0;Ht<at;Ht++){const oe=L.get(Ht),we=oe.size(),He=[];for(let Pe=0;Pe<we;Pe++)He.push(k(oe.get(Pe)));Z.push(He)}return Z}function D(L){return L[0].length<3&&(L=[L]),m(new e.Vector2_vec2,L,k=>m(new e.Vector_vec2,k,Z=>Z instanceof Array?{x:Z[0],y:Z[1]}:Z))}function H(L){for(let k=0;k<L.size();k++)L.get(k).delete();L.delete()}function $(L){return L[0]instanceof Array?{x:L[0][0],y:L[0][1]}:typeof L[0]=="number"?{x:L[0]||0,y:L[1]||0}:L[0]}function j(L){return L[0]instanceof Array?{x:L[0][0],y:L[0][1],z:L[0][2]}:typeof L[0]=="number"?{x:L[0]||0,y:L[1]||0,z:L[2]||0}:L[0]}function rt(L){return L=="EvenOdd"?0:L=="NonZero"?1:L=="Negative"?3:2}function pt(L){return L=="Round"?1:L=="Miter"?2:0}const At=e.CrossSection;function Ut(L,k="Positive"){if(L instanceof At)return L;{const Z=D(L),at=new At(Z,rt(k));return H(Z),at}}e.CrossSection.prototype.translate=function(...L){return this._Translate($(L))},e.CrossSection.prototype.scale=function(L){return typeof L=="number"?this._Scale({x:L,y:L}):this._Scale($([L]))},e.CrossSection.prototype.mirror=function(L){return this._Mirror($([L]))},e.CrossSection.prototype.warp=function(L){const k=mi(function(at){const Ht=jt(at,"double"),oe=jt(at+8,"double"),we=[Ht,oe];L(we),U(at,we[0],"double"),U(at+8,we[1],"double")},"vi"),Z=this._Warp(k);return _i(k),Z},e.CrossSection.prototype.decompose=function(){const L=this._Decompose(),k=_(L);return L.delete(),k},e.CrossSection.prototype.bounds=function(){const L=this._Bounds();return{min:["x","y"].map(k=>L.min[k]),max:["x","y"].map(k=>L.max[k])}},e.CrossSection.prototype.offset=function(L,k="Round",Z=2,at=0){return this._Offset(L,pt(k),Z,at)},e.CrossSection.prototype.simplify=function(L=1e-6){return this._Simplify(L)},e.CrossSection.prototype.extrude=function(L,k=0,Z=0,at=[1,1],Ht=!1){at=$([at]);const oe=e._Extrude(this._ToPolygons(),L,k,Z,at);return Ht?oe.translate([0,0,-L/2]):oe},e.CrossSection.prototype.revolve=function(L=0,k=360){return e._Revolve(this._ToPolygons(),L,k)},e.CrossSection.prototype.add=function(L){return this._add(Ut(L))},e.CrossSection.prototype.subtract=function(L){return this._subtract(Ut(L))},e.CrossSection.prototype.intersect=function(L){return this._intersect(Ut(L))},e.CrossSection.prototype.toPolygons=function(){const L=this._ToPolygons(),k=A(L,Z=>[Z.x,Z.y]);return L.delete(),k},e.Manifold.prototype.smoothOut=function(L=52.5,k=0){return this._SmoothOut(L,k)},e.Manifold.prototype.warp=function(L){const k=mi(function(Ht){const oe=jt(Ht,"double"),we=jt(Ht+8,"double"),He=jt(Ht+16,"double"),Pe=[oe,we,He];L(Pe),U(Ht,Pe[0],"double"),U(Ht+8,Pe[1],"double"),U(Ht+16,Pe[2],"double")},"vi"),Z=this._Warp(k);_i(k);const at=Z.status();if(at!=="NoError")throw new e.ManifoldError(at);return Z},e.Manifold.prototype.warpBatch=function(L){const k=mi(function(Ht,oe){const we=e.HEAPF64??F;if(!we)throw new Error("WASM heap is not initialized (HEAPF64 unavailable)");const He=new Float64Array(we.buffer,Ht,oe*3);L(He,oe)},"vii"),Z=this._WarpBatch(k);_i(k);const at=Z.status();if(at!=="NoError")throw new e.ManifoldError(at);return Z},e.Manifold.prototype.calculateNormals=function(L=0,k=52.5){return this._CalculateNormals(L,k)},e.Manifold.prototype.smoothByNormals=function(L=0){return this._SmoothByNormals(L)},e.Manifold.prototype.setProperties=function(L,k){const Z=this.numProp(),at=mi(function(oe,we,He){const Pe=[];for(let De=0;De<L;++De)Pe[De]=jt(oe+8*De,"double");const Xn=[];for(let De=0;De<3;++De)Xn[De]=jt(we+8*De,"double");const $n=[];for(let De=0;De<Z;++De)$n[De]=jt(He+8*De,"double");k(Pe,Xn,$n);for(let De=0;De<L;++De)U(oe+8*De,Pe[De],"double")},"viii"),Ht=this._SetProperties(L,at);return _i(at),Ht},e.Manifold.prototype.translate=function(...L){return this._Translate(j(L))},e.Manifold.prototype.rotate=function(L,k,Z){return Array.isArray(L)?this._Rotate(...L):this._Rotate(L,k||0,Z||0)},e.Manifold.prototype.scale=function(L){return typeof L=="number"?this._Scale({x:L,y:L,z:L}):this._Scale(j([L]))},e.Manifold.prototype.mirror=function(L){return this._Mirror(j([L]))},e.Manifold.prototype.trimByPlane=function(L,k=0){return this._TrimByPlane(j([L]),k)},e.Manifold.prototype.slice=function(L=0){const k=this._Slice(L),Z=new At(k,rt("Positive"));return H(k),Z},e.Manifold.prototype.project=function(){const L=this._Project(),k=new At(L,rt("Positive"));return H(L),k},e.Manifold.prototype.rayCast=function(L,k){const Z=this._RayCast(j([L]),j([k])),at=_(Z,Ht=>({faceID:Ht.faceID,distance:Ht.distance,position:["x","y","z"].map(oe=>Ht.position[oe]),normal:["x","y","z"].map(oe=>Ht.normal[oe])}));return Z.delete(),at},e.Manifold.prototype.split=function(L){const k=this._Split(L),Z=_(k);return k.delete(),Z},e.Manifold.prototype.splitByPlane=function(L,k=0){const Z=this._SplitByPlane(j([L]),k),at=_(Z);return Z.delete(),at},e.Manifold.prototype.decompose=function(){const L=this._Decompose(),k=_(L);return L.delete(),k},e.Manifold.prototype.boundingBox=function(){const L=this._boundingBox();return{min:["x","y","z"].map(k=>L.min[k]),max:["x","y","z"].map(k=>L.max[k])}},e.Manifold.prototype.simplify=function(L=0){return this._Simplify(L)};class re{constructor({numProp:k=3,triVerts:Z=new Uint32Array,vertProperties:at=new Float32Array,mergeFromVert:Ht,mergeToVert:oe,runIndex:we,runOriginalID:He,faceID:Pe,halfedgeTangent:Xn,runTransform:$n,runFlags:De,tolerance:io=0}={}){this.numProp=k,this.triVerts=Z,this.vertProperties=at,this.mergeFromVert=Ht,this.mergeToVert=oe,this.runIndex=we,this.runOriginalID=He,this.faceID=Pe,this.halfedgeTangent=Xn,this.runTransform=$n,this.runFlags=De,this.tolerance=io}get numTri(){return this.triVerts.length/3}get numVert(){return this.vertProperties.length/this.numProp}get numRun(){return this.runOriginalID.length}merge(){const{changed:k,mesh:Z}=e._Merge(this);return Object.assign(this,{...Z}),k}verts(k){return this.triVerts.subarray(3*k,3*(k+1))}position(k){return this.vertProperties.subarray(this.numProp*k,this.numProp*k+3)}extras(k){return this.vertProperties.subarray(this.numProp*k+3,this.numProp*(k+1))}tangent(k){return this.halfedgeTangent.subarray(4*k,4*(k+1))}transform(k){const Z=new Array(16);for(const at of[0,1,2,3])for(const Ht of[0,1,2])Z[4*at+Ht]=this.runTransform[12*k+3*at+Ht];return Z[15]=1,Z}backside(k){return this.runFlags!=null&&k<this.runFlags.length&&(this.runFlags[k]&1)!==0}hasNormals(k){return this.runFlags!=null&&k<this.runFlags.length&&(this.runFlags[k]&2)!==0}}e.Mesh=re,e.Manifold.prototype.getMesh=function(L=-1){return new re(this._GetMeshJS(L))},e.ManifoldError=function(k,...Z){let at="Unknown error";switch(k){case"NonFiniteVertex":at="Non-finite vertex";break;case"NotManifold":at="Not manifold";break;case"VertexOutOfBounds":at="Vertex index out of bounds";break;case"PropertiesWrongLength":at="Properties have wrong length";break;case"MissingPositionProperties":at="Less than three properties";break;case"MergeVectorsDifferentLengths":at="Merge vectors have different lengths";break;case"MergeIndexOutOfBounds":at="Merge index out of bounds";break;case"TransformWrongLength":at="Transform vector has wrong length";break;case"RunIndexWrongLength":at="Run index vector has wrong length";break;case"FaceIDWrongLength":at="Face ID vector has wrong length";break;case"InvalidConstruction":at="Manifold constructed with invalid parameters";break;case"ResultTooLarge":at="Result exceeds maximum size";break;case"InvalidTangents":at="Invalid halfedge tangents";break}const Ht=Error.apply(this,[at,...Z]);Ht.name=this.name="ManifoldError",this.message=Ht.message,this.stack=Ht.stack,this.code=k},e.ManifoldError.prototype=Object.create(Error.prototype,{constructor:{value:e.ManifoldError,writable:!0,configurable:!0}}),e.CrossSection=function(L,k="Positive"){const Z=D(L),at=new At(Z,rt(k));return H(Z),at},e.CrossSection.ofPolygons=function(L,k="Positive"){return new e.CrossSection(L,k)},e.CrossSection.square=function(...L){let k;L.length==0?k={x:1,y:1}:typeof L[0]=="number"?k={x:L[0],y:L[0]}:k=$(L);const Z=L[1]||!1;return e._Square(k,Z)},e.CrossSection.circle=function(L,k=0){return e._Circle(L,k)};function fe(L){return function(...k){k.length==1&&(k=k[0]);const Z=new e.Vector_crossSection;for(const Ht of k)Z.push_back(Ut(Ht));const at=e["_crossSection"+L](Z);return Z.delete(),at}}e.CrossSection.compose=fe("Compose"),e.CrossSection.union=fe("UnionN"),e.CrossSection.difference=fe("DifferenceN"),e.CrossSection.intersection=fe("IntersectionN");function ce(L,k){m(L,k,Z=>Z instanceof Array?{x:Z[0],y:Z[1]}:Z)}e.CrossSection.hull=function(...L){L.length==1&&(L=L[0]);let k=new e.Vector_vec2;for(const at of L)if(at instanceof At)e._crossSectionCollectVertices(k,at);else if(at instanceof Array&&at.length==2&&typeof at[0]=="number")k.push_back({x:at[0],y:at[1]});else if(at.x)k.push_back(at);else{const oe=at[0].length==2&&typeof at[0][0]=="number"||at[0].x?[at]:at;for(const we of oe)ce(k,we)}const Z=e._crossSectionHullPoints(k);return k.delete(),Z},e.CrossSection.prototype=Object.create(At.prototype),Object.defineProperty(e.CrossSection,Symbol.hasInstance,{get:()=>L=>L instanceof At});const Ce=e.Manifold;e.Manifold=function(L){const k=new Ce(L),Z=k.status();if(Z!=="NoError")throw new e.ManifoldError(Z);return k},e.Manifold.ofMesh=function(L){return new e.Manifold(L)},e.Manifold.tetrahedron=function(){return e._Tetrahedron()},e.Manifold.cube=function(...L){let k;L.length==0?k={x:1,y:1,z:1}:typeof L[0]=="number"?k={x:L[0],y:L[0],z:L[0]}:k=j(L);const Z=L[1]||!1;return e._Cube(k,Z)},e.Manifold.cylinder=function(L,k,Z=-1,at=0,Ht=!1){return e._Cylinder(L,k,Z,at,Ht)},e.Manifold.sphere=function(L,k=0){return e._Sphere(L,k)},e.Manifold.smooth=function(L,k=[]){const Z=new e.Vector_smoothness;m(Z,k);const at=e._Smooth(L,Z);return Z.delete(),at},e.Manifold.extrude=function(L,k,Z=0,at=0,Ht=[1,1],oe=!1){return(L instanceof At?L:e.CrossSection(L,"Positive")).extrude(k,Z,at,Ht,oe)},e.Manifold.revolve=function(L,k=0,Z=360){return(L instanceof At?L:e.CrossSection(L,"Positive")).revolve(k,Z)},e.Manifold.reserveIDs=function(L){return e._ReserveIDs(L)};function ze(L){return function(...k){k.length==1&&(k=k[0]);const Z=new e.Vector_manifold;for(const Ht of k)Z.push_back(Ht);const at=e["_manifold"+L+"N"](Z);return Z.delete(),at}}e.Manifold.union=ze("Union"),e.Manifold.compose=e.Manifold.union,e.Manifold.difference=ze("Difference"),e.Manifold.intersection=ze("Intersection"),e.Manifold.levelSet=function(L,k,Z,at=0,Ht=-1){const oe={min:{x:k.min[0],y:k.min[1],z:k.min[2]},max:{x:k.max[0],y:k.max[1],z:k.max[2]}},we=mi(function(Pe){const Xn=jt(Pe,"double"),$n=jt(Pe+8,"double"),De=jt(Pe+16,"double");return L([Xn,$n,De])},"di"),He=e._LevelSet(we,oe,Z,at,Ht);return _i(we),He},e.ExecutionContext.prototype.fromMesh=function(L){return this._FromMesh(L)},e.ExecutionContext.prototype.smooth=function(L,k=[]){const Z=new e.Vector_smoothness;m(Z,k);const at=this._Smooth(L,Z);return Z.delete(),at},e.ExecutionContext.prototype.levelSet=function(L,k,Z,at=0,Ht=-1){const oe={min:{x:k.min[0],y:k.min[1],z:k.min[2]},max:{x:k.max[0],y:k.max[1],z:k.max[2]}},we=mi(function(Pe){const Xn=jt(Pe,"double"),$n=jt(Pe+8,"double"),De=jt(Pe+16,"double");return L([Xn,$n,De])},"di"),He=this._LevelSet(we,oe,Z,at,Ht);return _i(we),He};function ln(L,k){m(L,k,Z=>Z instanceof Array?{x:Z[0],y:Z[1],z:Z[2]}:Z)}e.Manifold.hull=function(...L){L.length==1&&(L=L[0]);let k=new e.Vector_vec3;for(const at of L)at instanceof Ce?e._manifoldCollectVertices(k,at):at instanceof Array&&at.length==3&&typeof at[0]=="number"?k.push_back({x:at[0],y:at[1],z:at[2]}):at.x?k.push_back(at):ln(k,at);const Z=e._manifoldHullPoints(k);return k.delete(),Z},e.Manifold.prototype=Object.create(Ce.prototype),Object.defineProperty(e.Manifold,Symbol.hasInstance,{get:()=>L=>L instanceof Ce}),e.triangulate=function(L,k=-1,Z=!0){const at=D(L),Ht=_(e._Triangulate(at,k,Z),oe=>[oe[0],oe[1],oe[2]]);return H(at),Ht}};var l=import.meta.url,c="";function u(m){return e.locateFile?e.locateFile(m,c):c+m}var h,f;if(s){var p=o("node:fs");l.startsWith("file:")&&(c=o("node:path").dirname(o("node:url").fileURLToPath(l))+"/"),f=m=>{m=d(m)?new URL(m):m;var _=p.readFileSync(m);return _},h=async(m,_=!0)=>{m=d(m)?new URL(m):m;var A=p.readFileSync(m,_?void 0:"utf8");return A},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2)}else if(i||r){try{c=new URL(".",l).href}catch{}r&&(f=m=>{var _=new XMLHttpRequest;return _.open("GET",m,!1),_.responseType="arraybuffer",_.send(null),new Uint8Array(_.response)}),h=async m=>{if(d(m))return new Promise((A,D)=>{var H=new XMLHttpRequest;H.open("GET",m,!0),H.responseType="arraybuffer",H.onload=()=>{if(H.status==200||H.status==0&&H.response){A(H.response);return}D(H.status)},H.onerror=D,H.send(null)});var _=await fetch(m,{credentials:"same-origin"});if(_.ok)return _.arrayBuffer();throw new Error(_.status+" : "+_.url)}}console.log.bind(console);var v=console.error.bind(console),x,g=!1,d=m=>m.startsWith("file://"),E,w,b,I,P,C,O,T,S,F,J,q,et=!1;function lt(){var m=ts.buffer;b=new Int8Array(m),P=new Int16Array(m),I=new Uint8Array(m),C=new Uint16Array(m),O=new Int32Array(m),T=new Uint32Array(m),S=new Float32Array(m),F=new Float64Array(m),J=new BigInt64Array(m),q=new BigUint64Array(m)}function Q(){if(e.preRun)for(typeof e.preRun=="function"&&(e.preRun=[e.preRun]);e.preRun.length;)Re(e.preRun.shift());Ft(Te)}function dt(){et=!0,gi.J()}function Y(){if(e.postRun)for(typeof e.postRun=="function"&&(e.postRun=[e.postRun]);e.postRun.length;)Wt(e.postRun.shift());Ft(ue)}function Mt(m){var A;(A=e.onAbort)==null||A.call(e,m),m="Aborted("+m+")",v(m),g=!0,m+=". Build with -sASSERTIONS for more info.";var _=new WebAssembly.RuntimeError(m);throw w==null||w(_),_}var wt;function Bt(){return e.locateFile?u("manifold.wasm"):new URL(""+new URL("manifold-BE4c7gO-.wasm",import.meta.url).href,import.meta.url).href}function ee(m){if(m==wt&&x)return new Uint8Array(x);if(f)return f(m);throw"both async and sync fetching of the wasm failed"}async function ve(m){if(!x)try{var _=await h(m);return new Uint8Array(_)}catch{}return ee(m)}async function nt(m,_){try{var A=await ve(m),D=await WebAssembly.instantiate(A,_);return D}catch(H){v(`failed to asynchronously prepare wasm: ${H}`),Mt(H)}}async function mt(m,_,A){if(!m&&!d(_)&&!s)try{var D=fetch(_,{credentials:"same-origin"}),H=await WebAssembly.instantiateStreaming(D,A);return H}catch($){v(`wasm streaming compile failed: ${$}`),v("falling back to ArrayBuffer instantiation")}return nt(_,A)}function Nt(){var m={a:cf};return m}async function bt(){function m($,j){return gi=$.exports,gi=uf(gi),lf(gi),lt(),gi}function _($){return m($.instance)}var A=Nt();if(e.instantiateWasm)return new Promise(($,j)=>{e.instantiateWasm(A,(rt,pt)=>{$(m(rt))})});wt??(wt=Bt());var D=await mt(x,wt,A),H=_(D);return H}var Ft=m=>{for(;m.length>0;)m.shift()(e)},ue=[],Wt=m=>ue.push(m),Te=[],Re=m=>Te.push(m);function jt(m,_="i8"){switch(_.endsWith("*")&&(_="*"),_){case"i1":return b[m>>>0];case"i8":return b[m>>>0];case"i16":return P[m>>>1>>>0];case"i32":return O[m>>>2>>>0];case"i64":return J[m>>>3>>>0];case"float":return S[m>>>2>>>0];case"double":return F[m>>>3>>>0];case"*":return T[m>>>2>>>0];default:Mt(`invalid type for getValue: ${_}`)}}function U(m,_,A="i8"){switch(A.endsWith("*")&&(A="*"),A){case"i1":b[m>>>0]=_;break;case"i8":b[m>>>0]=_;break;case"i16":P[m>>>1>>>0]=_;break;case"i32":O[m>>>2>>>0]=_;break;case"i64":J[m>>>3>>>0]=BigInt(_);break;case"float":S[m>>>2>>>0]=_;break;case"double":F[m>>>3>>>0]=_;break;case"*":T[m>>>2>>>0]=_;break;default:Mt(`invalid type for setValue: ${A}`)}}class Ge{constructor(_){this.excPtr=_,this.ptr=_-24}set_type(_){T[this.ptr+4>>>2>>>0]=_}get_type(){return T[this.ptr+4>>>2>>>0]}set_destructor(_){T[this.ptr+8>>>2>>>0]=_}get_destructor(){return T[this.ptr+8>>>2>>>0]}set_caught(_){_=_?1:0,b[this.ptr+12>>>0]=_}get_caught(){return b[this.ptr+12>>>0]!=0}set_rethrown(_){_=_?1:0,b[this.ptr+13>>>0]=_}get_rethrown(){return b[this.ptr+13>>>0]!=0}init(_,A){this.set_adjusted_ptr(0),this.set_type(_),this.set_destructor(A)}set_adjusted_ptr(_){T[this.ptr+16>>>2>>>0]=_}get_adjusted_ptr(){return T[this.ptr+16>>>2>>>0]}}var he=0;function xe(m,_,A){m>>>=0,_>>>=0,A>>>=0;var D=new Ge(m);throw D.init(_,A),he=m,he}var Lt=()=>Mt(""),ie={},kt=m=>{for(;m.length;){var _=m.pop(),A=m.pop();A(_)}};function Kt(m){return this.fromWireType(T[m>>>2>>>0])}var Ae={},R={},M={},G=class extends Error{constructor(_){super(_),this.name="InternalError"}},tt=m=>{throw new G(m)},st=(m,_,A)=>{m.forEach(rt=>M[rt]=_);function D(rt){var pt=A(rt);pt.length!==m.length&&tt("Mismatched type converter count");for(var At=0;At<m.length;++At)it(m[At],pt[At])}var H=new Array(_.length),$=[],j=0;for(let[rt,pt]of _.entries())R.hasOwnProperty(pt)?H[rt]=R[pt]:($.push(pt),Ae.hasOwnProperty(pt)||(Ae[pt]=[]),Ae[pt].push(()=>{H[rt]=R[pt],++j,j===$.length&&D(H)}));$.length===0&&D(H)},K=function(m){m>>>=0;var _=ie[m];delete ie[m];var A=_.rawConstructor,D=_.rawDestructor,H=_.fields,$=H.map(j=>j.getterReturnType).concat(H.map(j=>j.setterArgumentType));st([m],$,j=>{var rt={};for(var[pt,At]of H.entries()){const Ut=j[pt],re=At.getter,fe=At.getterContext,ce=j[pt+H.length],Ce=At.setter,ze=At.setterContext;rt[At.fieldName]={read:ln=>Ut.fromWireType(re(fe,ln)),write:(ln,L)=>{var k=[];Ce(ze,ln,ce.toWireType(k,L)),kt(k)},optional:Ut.optional}}return[{name:_.name,fromWireType:Ut=>{var re={};for(var fe in rt)re[fe]=rt[fe].read(Ut);return D(Ut),re},toWireType:(Ut,re)=>{for(var fe in rt)if(!(fe in re)&&!rt[fe].optional)throw new TypeError(`Missing field: "${fe}"`);var ce=A();for(fe in rt)rt[fe].write(ce,re[fe]);return Ut!==null&&Ut.push(D,ce),ce},readValueFromPointer:Kt,destructorFunction:D}]})},gt=m=>{m>>>=0;for(var _="";;){var A=I[m++>>>0];if(!A)return _;_+=String.fromCharCode(A)}},_t=class extends Error{constructor(_){super(_),this.name="BindingError"}},ft=m=>{throw new _t(m)};function It(m,_,A={}){var D=_.name;if(m||ft(`type "${D}" must have a positive integer typeid pointer`),R.hasOwnProperty(m)){if(A.ignoreDuplicateRegistrations)return;ft(`Cannot register type '${D}' twice`)}if(R[m]=_,delete M[m],Ae.hasOwnProperty(m)){var H=Ae[m];delete Ae[m],H.forEach($=>$())}}function it(m,_,A={}){return It(m,_,A)}var Rt=(m,_,A)=>{switch(_){case 1:return A?D=>b[D>>>0]:D=>I[D>>>0];case 2:return A?D=>P[D>>>1>>>0]:D=>C[D>>>1>>>0];case 4:return A?D=>O[D>>>2>>>0]:D=>T[D>>>2>>>0];case 8:return A?D=>J[D>>>3>>>0]:D=>q[D>>>3>>>0];default:throw new TypeError(`invalid integer width (${_}): ${m}`)}},Gt=function(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const $=D===0n;let j=rt=>rt;if($){const rt=A*8;j=pt=>BigInt.asUintN(rt,pt),H=j(H)}it(m,{name:_,fromWireType:j,toWireType:(rt,pt)=>(typeof pt=="number"&&(pt=BigInt(pt)),pt),readValueFromPointer:Rt(_,A,!$),destructorFunction:null})};function Vt(m,_,A,D){m>>>=0,_>>>=0,_=gt(_),it(m,{name:_,fromWireType:function(H){return!!H},toWireType:function(H,$){return $?A:D},readValueFromPointer:function(H){return this.fromWireType(I[H>>>0])},destructorFunction:null})}var vt=m=>({count:m.count,deleteScheduled:m.deleteScheduled,preservePointerOnDelete:m.preservePointerOnDelete,ptr:m.ptr,ptrType:m.ptrType,smartPtr:m.smartPtr,smartPtrType:m.smartPtrType}),$t=m=>{function _(A){return A.$$.ptrType.registeredClass.name}ft(_(m)+" instance already deleted")},N=!1,yt=m=>{},ct=m=>{m.smartPtr?m.smartPtrType.rawDestructor(m.smartPtr):m.ptrType.registeredClass.rawDestructor(m.ptr)},Ct=m=>{m.count.value-=1;var _=m.count.value===0;_&&ct(m)},ut=m=>globalThis.FinalizationRegistry?(N=new FinalizationRegistry(_=>{Ct(_.$$)}),ut=_=>{var A=_.$$,D=!!A.smartPtr;if(D){var H={$$:A};N.register(_,H,_)}return _},yt=_=>N.unregister(_),ut(m)):(ut=_=>_,m),ot=()=>{let m=Pt.prototype;Object.assign(m,{isAliasOf(A){if(!(this instanceof Pt)||!(A instanceof Pt))return!1;var D=this.$$.ptrType.registeredClass,H=this.$$.ptr;A.$$=A.$$;for(var $=A.$$.ptrType.registeredClass,j=A.$$.ptr;D.baseClass;)H=D.upcast(H),D=D.baseClass;for(;$.baseClass;)j=$.upcast(j),$=$.baseClass;return D===$&&H===j},clone(){if(this.$$.ptr||$t(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var A=ut(Object.create(Object.getPrototypeOf(this),{$$:{value:vt(this.$$)}}));return A.$$.count.value+=1,A.$$.deleteScheduled=!1,A},delete(){this.$$.ptr||$t(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ft("Object already scheduled for deletion"),yt(this),Ct(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||$t(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ft("Object already scheduled for deletion"),this.$$.deleteScheduled=!0,this}});const _=Symbol.dispose;_&&(m[_]=m.delete)};function Pt(){}var qt=(m,_)=>Object.defineProperty(_,"name",{value:m}),Me={},de=(m,_,A)=>{if(m[_].overloadTable===void 0){var D=m[_];m[_]=function(...H){return m[_].overloadTable.hasOwnProperty(H.length)||ft(`Function '${A}' called with an invalid number of arguments (${H.length}) - expects one of (${m[_].overloadTable})!`),m[_].overloadTable[H.length].apply(this,H)},m[_].overloadTable=[],m[_].overloadTable[D.argCount]=D}},We=(m,_,A)=>{e.hasOwnProperty(m)?((A===void 0||e[m].overloadTable!==void 0&&e[m].overloadTable[A]!==void 0)&&ft(`Cannot register public name '${m}' twice`),de(e,m,m),e[m].overloadTable.hasOwnProperty(A)&&ft(`Cannot register multiple overloads of a function with the same number of arguments (${A})!`),e[m].overloadTable[A]=_):(e[m]=_,e[m].argCount=A)},mn=48,qr=57,Yr=m=>{m=m.replace(/[^a-zA-Z0-9_]/g,"$");var _=m.charCodeAt(0);return _>=mn&&_<=qr?`_${m}`:m};function Dn(m,_,A,D,H,$,j,rt){this.name=m,this.constructor=_,this.instancePrototype=A,this.rawDestructor=D,this.baseClass=H,this.getActualType=$,this.upcast=j,this.downcast=rt,this.pureVirtualFunctions=[]}var hi=(m,_,A)=>{for(;_!==A;)_.upcast||ft(`Expected null or instance of ${A.name}, got an instance of ${_.name}`),m=_.upcast(m),_=_.baseClass;return m},zi=m=>{if(m===null)return"null";var _=typeof m;return _==="object"||_==="array"||_==="function"?m.toString():""+m};function jr(m,_){if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),0;_.$$||ft(`Cannot pass "${zi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`);var A=_.$$.ptrType.registeredClass,D=hi(_.$$.ptr,A,this.registeredClass);return D}function Hi(m,_){var A;if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),this.isSmartPointer?(A=this.rawConstructor(),m!==null&&m.push(this.rawDestructor,A),A):0;(!_||!_.$$)&&ft(`Cannot pass "${zi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&_.$$.ptrType.isConst&&ft(`Cannot convert argument of type ${_.$$.smartPtrType?_.$$.smartPtrType.name:_.$$.ptrType.name} to parameter type ${this.name}`);var D=_.$$.ptrType.registeredClass;if(A=hi(_.$$.ptr,D,this.registeredClass),this.isSmartPointer)switch(_.$$.smartPtr===void 0&&ft("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:_.$$.smartPtrType===this?A=_.$$.smartPtr:ft(`Cannot convert argument of type ${_.$$.smartPtrType?_.$$.smartPtrType.name:_.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:A=_.$$.smartPtr;break;case 2:if(_.$$.smartPtrType===this)A=_.$$.smartPtr;else{var H=_.clone();A=this.rawShare(A,Zt.toHandle(()=>H.delete())),m!==null&&m.push(this.rawDestructor,A)}break;default:ft("Unsupported sharing policy")}return A}function Kr(m,_){if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),0;_.$$||ft(`Cannot pass "${zi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`),_.$$.ptrType.isConst&&ft(`Cannot convert argument of type ${_.$$.ptrType.name} to parameter type ${this.name}`);var A=_.$$.ptrType.registeredClass,D=hi(_.$$.ptr,A,this.registeredClass);return D}var fi=(m,_,A)=>{if(_===A)return m;if(A.baseClass===void 0)return null;var D=fi(m,_,A.baseClass);return D===null?null:A.downcast(D)},Zr={},Jr=(m,_)=>{for(_===void 0&&ft("ptr should not be undefined");m.baseClass;)_=m.upcast(_),m=m.baseClass;return _},Ks=(m,_)=>(_=Jr(m,_),Zr[_]),Vi=(m,_)=>{(!_.ptrType||!_.ptr)&&tt("makeClassHandle requires ptr and ptrType");var A=!!_.smartPtrType,D=!!_.smartPtr;return A!==D&&tt("Both smartPtrType and smartPtr must be specified"),_.count={value:1},ut(Object.create(m,{$$:{value:_,writable:!0}}))};function Zs(m){var _=this.getPointee(m);if(!_)return this.destructor(m),null;var A=Ks(this.registeredClass,_);if(A!==void 0){if(A.$$.count.value===0)return A.$$.ptr=_,A.$$.smartPtr=m,A.clone();var D=A.clone();return this.destructor(m),D}function H(){return this.isSmartPointer?Vi(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:_,smartPtrType:this,smartPtr:m}):Vi(this.registeredClass.instancePrototype,{ptrType:this,ptr:m})}var $=this.registeredClass.getActualType(_),j=Me[$];if(!j)return H.call(this);var rt;this.isConst?rt=j.constPointerType:rt=j.pointerType;var pt=fi(_,this.registeredClass,rt.registeredClass);return pt===null?H.call(this):this.isSmartPointer?Vi(rt.registeredClass.instancePrototype,{ptrType:rt,ptr:pt,smartPtrType:this,smartPtr:m}):Vi(rt.registeredClass.instancePrototype,{ptrType:rt,ptr:pt})}var Js=()=>{Object.assign(Gi.prototype,{getPointee(m){return this.rawGetPointee&&(m=this.rawGetPointee(m)),m},destructor(m){var _;(_=this.rawDestructor)==null||_.call(this,m)},readValueFromPointer:Kt,fromWireType:Zs})};function Gi(m,_,A,D,H,$,j,rt,pt,At,Ut){this.name=m,this.registeredClass=_,this.isReference=A,this.isConst=D,this.isSmartPointer=H,this.pointeeType=$,this.sharingPolicy=j,this.rawGetPointee=rt,this.rawConstructor=pt,this.rawShare=At,this.rawDestructor=Ut,!H&&_.baseClass===void 0?D?(this.toWireType=jr,this.destructorFunction=null):(this.toWireType=Kr,this.destructorFunction=null):this.toWireType=Hi}var Qr=(m,_,A)=>{e.hasOwnProperty(m)||tt("Replacing nonexistent public symbol"),e[m].overloadTable!==void 0&&A!==void 0?e[m].overloadTable[A]=_:(e[m]=_,e[m].argCount=A)},y=m=>yr.get(m),B=(m,_,A=[],D=!1)=>{var H=y(_),$=H(...A);function j(rt){return m[0]=="p"?rt>>>0:rt}return j($)},X=(m,_,A=!1)=>(...D)=>B(m,_,D,A),W=(m,_,A=!1)=>{m=gt(m);function D(){if(m.includes("p"))return X(m,_,A);var $=y(_);return $}var H=D();return typeof H!="function"&&ft(`unknown function pointer with signature ${m}: ${_}`),H};class z extends Error{}var ht=m=>{var _=gl(m),A=gt(_);return Wn(_),A},xt=(m,_)=>{var A=[],D={};function H($){if(!D[$]&&!R[$]){if(M[$]){M[$].forEach(H);return}A.push($),D[$]=!0}}throw _.forEach(H),new z(`${m}: `+A.map(ht).join([", "]))};function Dt(m,_,A,D,H,$,j,rt,pt,At,Ut,re,fe){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,$>>>=0,j>>>=0,rt>>>=0,pt>>>=0,At>>>=0,Ut>>>=0,re>>>=0,fe>>>=0,Ut=gt(Ut),$=W(H,$),rt&&(rt=W(j,rt)),At&&(At=W(pt,At)),fe=W(re,fe);var ce=Yr(Ut);We(ce,function(){xt(`Cannot construct ${Ut} due to unbound types`,[D])}),st([m,_,A],D?[D]:[],Ce=>{var we;Ce=Ce[0];var ze,ln;D?(ze=Ce.registeredClass,ln=ze.instancePrototype):ln=Pt.prototype;var L=qt(Ut,function(...He){if(Object.getPrototypeOf(this)!==k)throw new _t(`Use 'new' to construct ${Ut}`);if(Z.constructor_body===void 0)throw new _t(`${Ut} has no accessible constructor`);var Pe=Z.constructor_body[He.length];if(Pe===void 0)throw new _t(`Tried to invoke ctor of ${Ut} with invalid number of parameters (${He.length}) - expected (${Object.keys(Z.constructor_body).toString()}) parameters instead!`);return Pe.apply(this,He)}),k=Object.create(ln,{constructor:{value:L}});L.prototype=k;var Z=new Dn(Ut,L,k,fe,ze,$,rt,At);Z.baseClass&&((we=Z.baseClass).__derivedClasses??(we.__derivedClasses=[]),Z.baseClass.__derivedClasses.push(Z));var at=new Gi(Ut,Z,!0,!1,!1),Ht=new Gi(Ut+"*",Z,!1,!1,!1),oe=new Gi(Ut+" const*",Z,!1,!0,!1);return Me[m]={pointerType:Ht,constPointerType:oe},Qr(ce,L),[at,Ht,oe]})}var Tt=(m,_)=>{for(var A=[],D=0;D<m;D++)A.push(T[_+D*4>>>2>>>0]);return A};function Xt(m){for(var _=1;_<m.length;++_)if(m[_]!==null&&m[_].destructorFunction===void 0)return!0;return!1}function Yt(m,_,A,D){var H=Xt(m),$=m.length-2,j=[],rt=["fn"];_&&rt.push("thisWired");for(var pt=0;pt<$;++pt)j.push(`arg${pt}`),rt.push(`arg${pt}Wired`);j=j.join(","),rt=rt.join(",");var At=`return function (${j}) {
`;H&&(At+=`var destructors = [];
`);var Ut=H?"destructors":"null",re=["humanName","throwBindingError","invoker","fn","runDestructors","fromRetWire","toClassParamWire"];_&&(At+=`var thisWired = toClassParamWire(${Ut}, this);
`);for(var pt=0;pt<$;++pt){var fe=`toArg${pt}Wire`;At+=`var arg${pt}Wired = ${fe}(${Ut}, arg${pt});
`,re.push(fe)}if(At+=(A||D?"var rv = ":"")+`invoker(${rt});
`,H)At+=`runDestructors(destructors);
`;else for(var pt=_?1:2;pt<m.length;++pt){var ce=pt===1?"thisWired":"arg"+(pt-2)+"Wired";m[pt].destructorFunction!==null&&(At+=`${ce}_dtor(${ce});
`,re.push(`${ce}_dtor`))}return A&&(At+=`var ret = fromRetWire(rv);
return ret;
`),At+=`}
`,new Function(re,At)}function Ot(m,_,A,D,H,$){var j=_.length;j<2&&ft("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var rt=_[1]!==null&&A!==null,pt=Xt(_),At=!_[0].isVoid,Ut=_[0],re=_[1],fe=[m,ft,D,H,kt,Ut.fromWireType.bind(Ut),re==null?void 0:re.toWireType.bind(re)],ce=2;ce<j;++ce){var Ce=_[ce];fe.push(Ce.toWireType.bind(Ce))}if(!pt)for(var ce=rt?1:2;ce<_.length;++ce)_[ce].destructorFunction!==null&&fe.push(_[ce].destructorFunction);var ln=Yt(_,rt,At,$)(...fe);return qt(m,ln)}var ne=function(m,_,A,D,H,$){m>>>=0,A>>>=0,D>>>=0,H>>>=0,$>>>=0;var j=Tt(_,A);H=W(D,H),st([],[m],rt=>{rt=rt[0];var pt=`constructor ${rt.name}`;if(rt.registeredClass.constructor_body===void 0&&(rt.registeredClass.constructor_body=[]),rt.registeredClass.constructor_body[_-1]!==void 0)throw new _t(`Cannot register multiple constructors with identical number of parameters (${_-1}) for class '${rt.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return rt.registeredClass.constructor_body[_-1]=()=>{xt(`Cannot construct ${rt.name} due to unbound types`,j)},st([],j,At=>(At.splice(1,0,null),rt.registeredClass.constructor_body[_-1]=Ot(pt,At,null,H,$),[])),[]})},_e=m=>{m=m.trim();const _=m.indexOf("(");return _===-1?m:m.slice(0,_)},Ue=function(m,_,A,D,H,$,j,rt,pt,At){m>>>=0,_>>>=0,D>>>=0,H>>>=0,$>>>=0,j>>>=0;var Ut=Tt(A,D);_=gt(_),_=_e(_),$=W(H,$,pt),st([],[m],re=>{re=re[0];var fe=`${re.name}.${_}`;_.startsWith("@@")&&(_=Symbol[_.substring(2)]),rt&&re.registeredClass.pureVirtualFunctions.push(_);function ce(){xt(`Cannot call ${fe} due to unbound types`,Ut)}var Ce=re.registeredClass.instancePrototype,ze=Ce[_];return ze===void 0||ze.overloadTable===void 0&&ze.className!==re.name&&ze.argCount===A-2?(ce.argCount=A-2,ce.className=re.name,Ce[_]=ce):(de(Ce,_,fe),Ce[_].overloadTable[A-2]=ce),st([],Ut,ln=>{var L=Ot(fe,ln,re,$,j,pt);return Ce[_].overloadTable===void 0?(L.argCount=A-2,Ce[_]=L):Ce[_].overloadTable[A-2]=L,[]}),[]})},ye=[],ae=[0,1,,1,null,1,!0,1,!1,1];function zt(m){m>>>=0,m>9&&--ae[m+1]===0&&(ae[m]=void 0,ye.push(m))}var Zt={toValue:m=>(m||ft(`Cannot use deleted val. handle = ${m}`),ae[m]),toHandle:m=>{switch(m){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{const _=ye.pop()||ae.length;return ae[_]=m,ae[_+1]=1,_}}}},le={name:"emscripten::val",fromWireType:m=>{var _=Zt.toValue(m);return zt(m),_},toWireType:(m,_)=>Zt.toHandle(_),readValueFromPointer:Kt,destructorFunction:null};function Ke(m){return m>>>=0,it(m,le)}var Tn=(m,_,A)=>{switch(_){case 1:return A?function(D){return this.fromWireType(b[D>>>0])}:function(D){return this.fromWireType(I[D>>>0])};case 2:return A?function(D){return this.fromWireType(P[D>>>1>>>0])}:function(D){return this.fromWireType(C[D>>>1>>>0])};case 4:return A?function(D){return this.fromWireType(O[D>>>2>>>0])}:function(D){return this.fromWireType(T[D>>>2>>>0])};default:throw new TypeError(`invalid integer width (${_}): ${m}`)}};function Ze(m){return m===0?"object":m===1?"number":"string"}function di(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const $=Ze(H);switch($){case"object":{let At=function(){};At.values={},it(m,{name:_,constructor:At,valueType:$,fromWireType:function(Ut){return this.constructor.values[Ut]},toWireType:(Ut,re)=>re.value,readValueFromPointer:Tn(_,A,D),destructorFunction:null}),We(_,At);break}case"number":{var j={};it(m,{name:_,keysMap:j,valueType:$,fromWireType:At=>At,toWireType:(At,Ut)=>Ut,readValueFromPointer:Tn(_,A,D),destructorFunction:null}),We(_,j),delete e[_].argCount;break}case"string":{var rt={},pt={},j={};it(m,{name:_,valuesMap:rt,reverseMap:pt,keysMap:j,valueType:$,fromWireType:function(Ut){return this.reverseMap[Ut]},toWireType:function(Ut,re){return this.valuesMap[re]},readValueFromPointer:Tn(_,A,D),destructorFunction:null}),We(_,j),delete e[_].argCount;break}}}var be=(m,_)=>{var A=R[m];return A===void 0&&ft(`${_} has unknown type ${ht(m)}`),A};function en(m,_,A){m>>>=0,_>>>=0;var D=be(m,"enum");switch(_=gt(_),D.valueType){case"object":{var H=D.constructor,$=Object.create(D.constructor.prototype,{value:{value:A},constructor:{value:qt(`${D.name}_${_}`,function(){})}});H.values[A]=$,H[_]=$;break}case"number":{D.keysMap[_]=A;break}case"string":{D.valuesMap[_]=A,D.reverseMap[A]=_,D.keysMap[_]=_;break}}}var nn=(m,_)=>{switch(_){case 4:return function(A){return this.fromWireType(S[A>>>2>>>0])};case 8:return function(A){return this.fromWireType(F[A>>>3>>>0])};default:throw new TypeError(`invalid float width (${_}): ${m}`)}},Xe=function(m,_,A){m>>>=0,_>>>=0,A>>>=0,_=gt(_),it(m,{name:_,fromWireType:D=>D,toWireType:(D,H)=>H,readValueFromPointer:nn(_,A),destructorFunction:null})};function qe(m,_,A,D,H,$,j,rt){m>>>=0,A>>>=0,D>>>=0,H>>>=0,$>>>=0;var pt=Tt(_,A);m=gt(m),m=_e(m),H=W(D,H,j),We(m,function(){xt(`Cannot call ${m} due to unbound types`,pt)},_-1),st([],pt,At=>{var Ut=[At[0],null].concat(At.slice(1));return Qr(m,Ot(m,Ut,null,H,$,j),_-1),[]})}var Mr=function(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const $=D===0;let j=pt=>pt;if($){var rt=32-8*A;j=pt=>pt<<rt>>>rt,H=j(H)}it(m,{name:_,fromWireType:j,toWireType:(pt,At)=>At,readValueFromPointer:Rt(_,A,D!==0),destructorFunction:null})},Ln=(m,_,A)=>{const D=(H,$)=>{let j=0;return{next(){if(j>=H)return{done:!0};const rt=j;return j++,{value:$(rt),done:!1}},[Symbol.iterator](){return this}}};m[Symbol.iterator]||(m[Symbol.iterator]=function(){const H=this[_]();return D(H,$=>this[A]($))})},vh=function(m,_,A,D){m>>>=0,_>>>=0,A>>>=0,D>>>=0,A=gt(A),D=gt(D),st([],[m,_],H=>{const $=H[0];return Ln($.registeredClass.instancePrototype,A,D),[]})};function xh(m,_,A){m>>>=0,A>>>=0;var D=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array],H=D[_];function $(j){var rt=T[j>>>2>>>0],pt=T[j+4>>>2>>>0];return new H(b.buffer,pt,rt)}A=gt(A),it(m,{name:A,fromWireType:$,readValueFromPointer:$},{ignoreDuplicateRegistrations:!0})}var Mh=Object.assign({optional:!0},le);function yh(m,_){m>>>=0,it(m,Mh)}var Sh=(m,_,A,D)=>{if(A>>>=0,!(D>0))return 0;for(var H=A,$=A+D-1,j=0;j<m.length;++j){var rt=m.codePointAt(j);if(rt<=127){if(A>=$)break;_[A++>>>0]=rt}else if(rt<=2047){if(A+1>=$)break;_[A++>>>0]=192|rt>>6,_[A++>>>0]=128|rt&63}else if(rt<=65535){if(A+2>=$)break;_[A++>>>0]=224|rt>>12,_[A++>>>0]=128|rt>>6&63,_[A++>>>0]=128|rt&63}else{if(A+3>=$)break;_[A++>>>0]=240|rt>>18,_[A++>>>0]=128|rt>>12&63,_[A++>>>0]=128|rt>>6&63,_[A++>>>0]=128|rt&63,j++}}return _[A>>>0]=0,A-H},Eh=(m,_,A)=>Sh(m,I,_,A),bh=m=>{for(var _=0,A=0;A<m.length;++A){var D=m.charCodeAt(A);D<=127?_++:D<=2047?_+=2:D>=55296&&D<=57343?(_+=4,++A):_+=3}return _},hl=globalThis.TextDecoder&&new TextDecoder,fl=(m,_,A,D)=>{var H=_+A;if(D)return H;for(;m[_]&&!(_>=H);)++_;return _},Th=(m,_=0,A,D)=>{_>>>=0;var H=fl(m,_,A,D);if(H-_>16&&m.buffer&&hl)return hl.decode(m.subarray(_,H));for(var $="";_<H;){var j=m[_++];if(!(j&128)){$+=String.fromCharCode(j);continue}var rt=m[_++]&63;if((j&224)==192){$+=String.fromCharCode((j&31)<<6|rt);continue}var pt=m[_++]&63;if((j&240)==224?j=(j&15)<<12|rt<<6|pt:j=(j&7)<<18|rt<<12|pt<<6|m[_++]&63,j<65536)$+=String.fromCharCode(j);else{var At=j-65536;$+=String.fromCharCode(55296|At>>10,56320|At&1023)}}return $},Ah=(m,_,A)=>(m>>>=0,m?Th(I,m,_,A):"");function wh(m,_){m>>>=0,_>>>=0,_=gt(_),it(m,{name:_,fromWireType(A){var D=T[A>>>2>>>0],H=A+4,$;return $=Ah(H,D,!0),Wn(A),$},toWireType(A,D){D instanceof ArrayBuffer&&(D=new Uint8Array(D));var H,$=typeof D=="string";$||ArrayBuffer.isView(D)&&D.BYTES_PER_ELEMENT==1||ft("Cannot pass non-string to std::string"),$?H=bh(D):H=D.length;var j=no(4+H+1),rt=j+4;return T[j>>>2>>>0]=H,$?Eh(D,rt,H+1):I.set(D,rt>>>0),A!==null&&A.push(Wn,j),j},readValueFromPointer:Kt,destructorFunction(A){Wn(A)}})}var dl=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,Rh=(m,_,A)=>{var D=m>>>1,H=fl(C,D,_/2,A);if(H-D>16&&dl)return dl.decode(C.subarray(D>>>0,H>>>0));for(var $="",j=D;j<H;++j){var rt=C[j>>>0];$+=String.fromCharCode(rt)}return $},Ch=(m,_,A)=>{if(A??(A=2147483647),A<2)return 0;A-=2;for(var D=_,H=A<m.length*2?A/2:m.length,$=0;$<H;++$){var j=m.charCodeAt($);P[_>>>1>>>0]=j,_+=2}return P[_>>>1>>>0]=0,_-D},Ph=m=>m.length*2,Dh=(m,_,A)=>{for(var D="",H=m>>>2,$=0;!($>=_/4);$++){var j=T[H+$>>>0];if(!j&&!A)break;D+=String.fromCodePoint(j)}return D},Lh=(m,_,A)=>{if(_>>>=0,A??(A=2147483647),A<4)return 0;for(var D=_,H=D+A-4,$=0;$<m.length;++$){var j=m.codePointAt($);if(j>65535&&$++,O[_>>>2>>>0]=j,_+=4,_+4>H)break}return O[_>>>2>>>0]=0,_-D},Uh=m=>{for(var _=0,A=0;A<m.length;++A){var D=m.codePointAt(A);D>65535&&A++,_+=4}return _};function Ih(m,_,A){m>>>=0,_>>>=0,A>>>=0,A=gt(A);var D,H,$;_===2?(D=Rh,H=Ch,$=Ph):(D=Dh,H=Lh,$=Uh),it(m,{name:A,fromWireType:j=>{var rt=T[j>>>2>>>0],pt=D(j+4,rt*_,!0);return Wn(j),pt},toWireType:(j,rt)=>{typeof rt!="string"&&ft(`Cannot pass non-string to C++ string type ${A}`);var pt=$(rt),At=no(4+pt+_);return T[At>>>2>>>0]=pt/_,H(rt,At+4,pt+_),j!==null&&j.push(Wn,At),At},readValueFromPointer:Kt,destructorFunction(j){Wn(j)}})}function Nh(m,_,A,D,H,$){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,$>>>=0,ie[m]={name:gt(_),rawConstructor:W(A,D),rawDestructor:W(H,$),fields:[]}}function Fh(m,_,A,D,H,$,j,rt,pt,At){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,$>>>=0,j>>>=0,rt>>>=0,pt>>>=0,At>>>=0,ie[m].fields.push({fieldName:gt(_),getterReturnType:A,getter:W(D,H),getterContext:$,setterArgumentType:j,setter:W(rt,pt),setterContext:At})}var Oh=function(m,_){m>>>=0,_>>>=0,_=gt(_),it(m,{isVoid:!0,name:_,fromWireType:()=>{},toWireType:(A,D)=>{}})};function Bh(m,_){m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),m.set(_)}var Qs=[],kh=m=>{var _=Qs.length;return Qs.push(m),_},zh=(m,_)=>{for(var A=new Array(m),D=0;D<m;++D)A[D]=be(T[_+D*4>>>2>>>0],`parameter ${D}`);return A},Hh=(m,_,A)=>{var D=[],H=m(D,A);return D.length&&(T[_>>>2>>>0]=Zt.toHandle(D)),H},Vh={},pl=m=>{var _=Vh[m];return _===void 0?gt(m):_},Gh=function(m,_,A){_>>>=0;var D=8,[H,...$]=zh(m,_),j=H.toWireType.bind(H),rt=$.map(ce=>ce.readValueFromPointer.bind(ce));m--;var pt={toValue:Zt.toValue},At=rt.map((ce,Ce)=>{var ze=`argFromPtr${Ce}`;return pt[ze]=ce,`${ze}(args${Ce?"+"+Ce*D:""})`}),Ut;switch(A){case 0:Ut="toValue(handle)";break;case 2:Ut="new (toValue(handle))";break;case 3:Ut="";break;case 1:pt.getStringOrSymbol=pl,Ut="toValue(handle)[getStringOrSymbol(methodName)]";break}Ut+=`(${At})`,H.isVoid||(pt.toReturnWire=j,pt.emval_returnValue=Hh,Ut=`return emval_returnValue(toReturnWire, destructorsRef, ${Ut})`),Ut=`return function (handle, methodName, destructorsRef, args) {
${Ut}
}`;var re=new Function(Object.keys(pt),Ut)(...Object.values(pt)),fe=`methodCaller<(${$.map(ce=>ce.name)}) => ${H.name}>`;return kh(qt(fe,re))};function Wh(m,_){return m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),m==_}function Xh(m,_){return m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),Zt.toHandle(m[_])}function $h(m){m>>>=0,m>9&&(ae[m+1]+=1)}function qh(m,_,A,D,H){return m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,Qs[m](_,A,D,H)}function Yh(m){return m>>>=0,Zt.toHandle(pl(m))}function jh(){return Zt.toHandle({})}function Kh(m){m>>>=0;var _=Zt.toValue(m);kt(_),zt(m)}function Zh(m,_,A){m>>>=0,_>>>=0,A>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),A=Zt.toValue(A),m[_]=A}var Jh=()=>4294901760,Qh=(m,_)=>Math.ceil(m/_)*_,tf=m=>{var _=ts.buffer.byteLength,A=(m-_+65535)/65536|0;try{return ts.grow(A),lt(),1}catch{}};function ef(m){m>>>=0;var _=I.length,A=Jh();if(m>A)return!1;for(var D=1;D<=4;D*=2){var H=_*(1+.2/D);H=Math.min(H,m+100663296);var $=Math.min(A,Qh(Math.max(m,H),65536)),j=tf($);if(j)return!0}return!1}var nf=(m,_)=>{if(pi)for(var A=m;A<m+_;A++){var D=y(A);D&&pi.set(D,A)}},pi,rf=m=>(pi||(pi=new WeakMap,nf(0,yr.length)),pi.get(m)||0),to=[],sf=()=>to.length?to.pop():yr.grow(1),eo=(m,_)=>yr.set(m,_),ml=m=>{const _=m.length;return[_%128|128,_>>7,...m]},of={i:127,p:127,j:126,f:125,d:124,e:111},_l=m=>ml(Array.from(m,_=>{var A=of[_];return A})),af=(m,_)=>{var A=Uint8Array.of(0,97,115,109,1,0,0,0,1,...ml([1,96,..._l(_.slice(1)),..._l(_[0]==="v"?"":_[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),D=new WebAssembly.Module(A),H=new WebAssembly.Instance(D,{e:{f:m}}),$=H.exports.f;return $},mi=(m,_)=>{var A=rf(m);if(A)return A;var D=sf();try{eo(D,m)}catch($){if(!($ instanceof TypeError))throw $;var H=af(m,_);eo(D,H)}return pi.set(m,D),D},_i=m=>{pi.delete(y(m)),eo(m,null),to.push(m)};if(ot(),Js(),e.noExitRuntime&&e.noExitRuntime,e.print&&e.print,e.printErr&&(v=e.printErr),e.wasmBinary&&(x=e.wasmBinary),e.arguments&&e.arguments,e.thisProgram&&e.thisProgram,e.preInit)for(typeof e.preInit=="function"&&(e.preInit=[e.preInit]);e.preInit.length>0;)e.preInit.shift()();e.addFunction=mi,e.removeFunction=_i;var gl,no,Wn,ts,yr;function lf(m){gl=m.K,no=m.M,Wn=m.N,ts=m.I,yr=m.L}var cf={l:xe,C:Lt,q:K,z:Gt,G:Vt,j:Dt,i:ne,a:Ue,E:Ke,x:di,d:en,y:Xe,c:qe,p:Mr,m:vh,h:xh,n:yh,F:wh,w:Ih,r:Nh,k:Fh,H:Oh,u:Bh,g:Gh,b:zt,o:Wh,B:Xh,t:$h,f:qh,s:Yh,A:jh,e:Kh,v:Zh,D:ef};function uf(m){m=Object.assign({},m);var _=D=>H=>D(H)>>>0,A=D=>()=>D()>>>0;return m.K=_(m.K),m.M=_(m.M),m._emscripten_stack_alloc=_(m._emscripten_stack_alloc),m.emscripten_stack_get_current=A(m.emscripten_stack_get_current),m}function hf(){Q();function m(){var _;e.calledRun=!0,!g&&(dt(),E==null||E(e),(_=e.onRuntimeInitialized)==null||_.call(e),Y())}e.setStatus?(e.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>e.setStatus(""),1),m()},1)):m()}var gi;return gi=await bt(),hf(),et?t=e:t=new Promise((m,_)=>{E=m,w=_}),t}let ko=null;function Jv(){return ko||(ko=Zv().then(n=>(n.setup(),n))),ko}class qs{constructor(){this.items=[]}keep(t){return this.items.push(t),t}get size(){return this.items.length}dispose(){for(const t of this.items)t.delete();this.items=[]}}function hr(n,t){const e=new n.Mesh({numProp:3,vertProperties:new Float32Array(t.positions),triVerts:new Uint32Array(t.indices)});let i;try{i=n.Manifold.ofMesh(e)}catch(s){const o=s instanceof Error?s.message:String(s);throw new Error(`toManifold: mesh is not a closed solid (${o})`,{cause:s})}const r=i.status();if(r!=="NoError")throw i.delete(),new Error(`toManifold: mesh is not a closed solid (${r})`);return i}function Ys(n){const t=n.getMesh(),e=Qv(t),i=new Uint32Array(t.triVerts);return{positions:e,indices:i,normals:Xr(e,i)}}function Qv(n){const{numProp:t,vertProperties:e}=n;if(t===3)return new Float32Array(e);const i=e.length/t,r=new Float32Array(i*3);for(let s=0;s<i;s++)r[s*3]=e[s*t],r[s*3+1]=e[s*t+1],r[s*3+2]=e[s*t+2];return r}const tx=2,ex=96;function ju(n,t,e,i,r){const s=t.keep(e.scale(1+r.shrinkPct/100)),o=s.boundingBox(),a=Math.max(Math.abs(o.min[0]),Math.abs(o.max[0]),Math.abs(o.min[1]),Math.abs(o.max[1])),l=nx(s,o.max[2]),c=i==="dropout"?0:r.spareMm,u=o.max[2]+c,h=c+tx+1,f=t.keep(n.Manifold.cylinder(h,l,l,ex,!1).translate([0,0,o.max[2]-1]));return{solid:t.keep(n.Manifold.union([s,f])),topZ:u,maxRadius:a,bottomZ:o.min[2]}}function nx(n,t){const e=n.getMesh(),{numProp:i,vertProperties:r}=e,s=r.length/i,o=2;let a=0;for(let l=0;l<s;l++){if(r[l*i+2]<t-o)continue;const u=Math.hypot(r[l*i],r[l*i+1]);u>a&&(a=u)}return Math.max(a,1)}function ix(n,t,e,i,r){const s=e.maxRadius+r.plasterMm,o=e.bottomZ-r.plasterMm,a=e.topZ-o,l=t.keep(n.Manifold.cube([s*2,s*2,a],!0).translate([0,0,o+a/2])),c=t.keep(l.subtract(e.solid));if(i==="dropout")return[{id:"single",label:"Форма целиком",solid:c,pull:"up"}];let u=c,h=o;const f=[];if(i==="halves-bottom"){const d=Bc(t,c,[0,0,1],e.bottomZ),E=s*.72,w=Oc(n,t,r.keyMm,[[E,E,e.bottomZ],[-E,E,e.bottomZ],[E,-E,e.bottomZ],[-E,-E,e.bottomZ]]);f.push({id:"bottom",label:"Донная плита",solid:w?t.keep(n.Manifold.union([d.negative,w])):d.negative,pull:"up"}),u=w?t.keep(d.positive.subtract(w)):d.positive,h=e.bottomZ}const p=Bc(t,u,[0,1,0],0),v=Math.max(r.keyMm*3,r.plasterMm*.5),x=s*.78,g=Oc(n,t,r.keyMm,[[x,0,h+v],[-x,0,h+v],[x,0,e.topZ-v],[-x,0,e.topZ-v]]);return f.unshift({id:"half-A",label:"Половина A",solid:g?t.keep(p.positive.subtract(g)):p.positive,pull:"+y"},{id:"half-B",label:"Половина B",solid:g?t.keep(n.Manifold.union([p.negative,g])):p.negative,pull:"-y"}),f}function Oc(n,t,e,i){return e<=0||i.length===0?null:t.keep(n.Manifold.union(i.map(r=>t.keep(n.Manifold.sphere(e,32).translate(r)))))}function Bc(n,t,e,i){const[r,s]=t.splitByPlane(e,i);n.keep(r),n.keep(s);const o=e[0]!==0?0:e[1]!==0?1:2,a=e[o]>0?1:-1,l=r.boundingBox();return(l.min[o]+l.max[o])/2*a>i*a?{positive:r,negative:s}:{positive:s,negative:r}}function rx(n,t){switch(n.pull){case"up":return n.solid;case"down":return t.keep(n.solid.rotate([180,0,0]));case"+y":return t.keep(n.solid.rotate([-90,0,0]));case"-y":return t.keep(n.solid.rotate([90,0,0]))}}function sx(n,t,e,i){const r=rx(e,t),s=r.boundingBox(),o=t.keep(r.translate([-(s.min[0]+s.max[0])/2,-(s.min[1]+s.max[1])/2,-s.min[2]])),a=s.max[0]-s.min[0],l=s.max[1]-s.min[1],c=s.max[2]-s.min[2],u=i.bathClearMm,h=i.bathWallMm,f=a+2*u,p=l+2*u,v=c+u,x=t.keep(n.Manifold.cube([f+2*h,p+2*h,v+h],!0).translate([0,0,(v+h)/2-h])),g=t.keep(n.Manifold.cube([f,p,v+h],!0).translate([0,0,(v+h)/2])),d=t.keep(x.subtract(g));return t.keep(n.Manifold.union([d,o]).translate([0,0,h]))}const Ku=30,Zu=80,Ju=120;function Qu(){return{shrinkPct:12,plasterMm:28,spareMm:25,keyMm:7,bathWallMm:3,bathClearMm:12}}const rr=(n,t,e)=>Math.min(e,Math.max(t,n));function ox(n){const t=Qu(),e={};if(typeof n=="object"&&n!==null)for(const[s,o]of Object.entries(n))e[s]=o;const i=(s,o)=>typeof s=="number"&&Number.isFinite(s)?s:o,r=rr(i(e.plasterMm,t.plasterMm),5,Zu);return{shrinkPct:rr(i(e.shrinkPct,t.shrinkPct),0,Ku),plasterMm:r,spareMm:rr(i(e.spareMm,t.spareMm),0,Ju),keyMm:rr(i(e.keyMm,t.keyMm),0,r/3),bathWallMm:rr(i(e.bathWallMm,t.bathWallMm),1.2,12),bathClearMm:rr(i(e.bathClearMm,t.bathClearMm),3,60)}}const ax=.001,lx=.02,cx=.02;function kc(n,t){const{positions:e,indices:i}=n;let r=1/0,s=-1/0,o=0;for(let f=0;f<e.length;f+=3)e[f+2]<r&&(r=e[f+2]),e[f+2]>s&&(s=e[f+2]),o=Math.max(o,Math.abs(e[f]),Math.abs(e[f+1]));const a=s-lx*(s-r),l=cx*o;let c=0,u=0,h=0;for(let f=0;f<i.length;f+=3){const p=i[f]*3,v=i[f+1]*3,x=i[f+2]*3,g=e[v]-e[p],d=e[v+1]-e[p+1],E=e[v+2]-e[p+2],w=e[x]-e[p],b=e[x+1]-e[p+1],I=e[x+2]-e[p+2],P=d*I-E*b,C=E*w-g*I,O=g*b-d*w,T=Math.hypot(P,C,O);if(T<1e-18)continue;let S;if(t==="up"){const F=O/T,J=(e[p+2]+e[v+2]+e[x+2])/3;if(F>.99&&J>a)continue;S=F}else{const F=(e[p+1]+e[v+1]+e[x+1])/3;if(Math.abs(F)<l)continue;S=-(F>0?C:-C)/T}c+=T,S>ax&&(u+=T,h=Math.max(h,S))}return{fraction:c>0?u/c:0,worst:h}}const ux=.005;function hx(n){const{positions:t}=n;let e=1/0,i=-1/0;for(let a=2;a<t.length;a+=3)t[a]<e&&(e=t[a]),t[a]>i&&(i=t[a]);const r=e+ux*(i-e);let s=0,o=0;for(let a=0;a<t.length;a+=3){const l=Math.hypot(t[a],t[a+1]);l>o&&(o=l),t[a+2]<=r&&l>s&&(s=l)}return o>0?s/o:0}const fx=.002,dx=.02,px=.55,zc={id:"half-A",label:"Половина A"},Hc={id:"half-B",label:"Половина B"},mx={id:"bottom",label:"Донная плита"},_x={id:"single",label:"Форма целиком"};function th(n,t){const e=kc(n,"up"),i=kc(n,"sides"),r=[];if(i.fraction>dx){const o=Math.asin(Math.min(1,i.worst))*180/Math.PI,a=t.angularRelief?"Рельеф идёт под углом к плоскости разъёма — такую форму пришлось бы вывинчивать. Разверните волну по высоте (кольцевые валики форма отпускает свободно) или уменьшите глубину.":"Уменьшите глубину рельефа: при таком шаге валики заворачиваются по радиусу.";r.push(`Поднутрения: ${(i.fraction*100).toFixed(1)} % поверхности, самый крутой подрез ${o.toFixed(0)}°. ${a}`)}if(!t.hasHandle&&e.fraction<=fx)return{scheme:"dropout",parts:[_x],reason:"Изделие нигде не шире, чем выше: вынимается вверх, форма нужна из одной части.",dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r};const s=t.hasHandle?"Ручка делает в теле сквозное отверстие — вверх изделие не вынуть, нужен разъём вдоль оси.":`Изделие где-то шире, чем выше (${(e.fraction*100).toFixed(0)} % поверхности с зацепами) — вверх не вынуть, нужен разъём вдоль оси.`;return hx(n)>=px?{scheme:"halves-bottom",parts:[zc,Hc,mx],reason:`${s} Дно широкое и плоское: шов через него зачищать труднее всего, поэтому дно отливается отдельной плитой.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r}:{scheme:"halves",parts:[zc,Hc],reason:`${s} Дно узкое, отдельная плита не нужна.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r}}function gx(n,t,e,i){const r=new qs;try{const s=r.keep(hr(n,t)),o=ju(n,r,s,e.scheme,i),a=r.keep(o.solid.trimByPlane([0,0,-1],-o.topZ));return{id:"master",label:"Мастер-позитив",mesh:Ys(a)}}finally{r.dispose()}}function vx(n,t,e,i){const r=new qs;try{const s=r.keep(hr(n,t)),o=ju(n,r,s,e.scheme,i);return ix(n,r,o,e.scheme,i).map(a=>({id:`bath-${a.id}`,label:`Ванночка: ${a.label.toLowerCase()}`,mesh:Ys(sx(n,r,a,i))}))}finally{r.dispose()}}const xx=[{kind:"range",key:"wall",label:"Стенка",min:ol,max:al,step:.1,unit:"мм",hint:"толщина меряется по нормали к поверхности",get:n=>n.wallMm,set:(n,t)=>({...n,wallMm:t})},{kind:"range",key:"base",label:"Дно",min:Xu,max:$u,step:.5,unit:"мм",get:n=>n.baseMm,set:(n,t)=>({...n,baseMm:t})}],eh={kind:"range",key:"shrink",label:"Усадка",min:0,max:Ku,step:.5,unit:"%",hint:"шликер садится при сушке и обжиге — на столько увеличивается модель",get:n=>n.shrinkPct,set:(n,t)=>({...n,shrinkPct:t})},nh={kind:"range",key:"spare",label:"Горловина",min:0,max:Ju,step:1,unit:"мм",hint:"воротник над венчиком, куда доливают шликер",get:n=>n.spareMm,set:(n,t)=>({...n,spareMm:t})},Mx=[eh,nh],yx=[eh,nh,{kind:"range",key:"plaster",label:"Гипс",min:5,max:Zu,step:1,unit:"мм",hint:"толщина гипса вокруг полости",get:n=>n.plasterMm,set:(n,t)=>({...n,plasterMm:t})},{kind:"range",key:"key",label:"Ключи",min:0,max:25,step:.5,unit:"мм",hint:"радиус замков на плоскости разъёма; 0 — без них",get:n=>n.keyMm,set:(n,t)=>({...n,keyMm:t})},{kind:"range",key:"silicone",label:"Силикон",min:3,max:60,step:1,unit:"мм",hint:"слой силикона над блоком",get:n=>n.bathClearMm,set:(n,t)=>({...n,bathClearMm:t})},{kind:"range",key:"bathWall",label:"Борт",min:1.2,max:12,step:.2,unit:"мм",hint:"толщина стенки печатной опалубки",get:n=>n.bathWallMm,set:(n,t)=>({...n,bathWallMm:t})}];function Sx(n,t,e,i,r,s,o,a,l){for(const[x,g]of Object.entries(n))g.disabled=!1,g.addEventListener("click",()=>{(x==="vessel"||x==="master"||x==="bath")&&o(x)});const c=ge("div"),u=ge("div"),h=ge("div");t.textContent="",t.append(c,u,h);const f=si(c,xx,r,a,"print"),p=si(u,Mx,s,l,"master"),v=si(h,yx,s,l,"bath");return{sync(x,g,d){for(const[E,w]of Object.entries(n))w.setAttribute("aria-selected",String(E===x));c.hidden=x!=="vessel",u.hidden=x!=="master",h.hidden=x!=="bath",f.sync(g),p.sync(d),v.sync(d)},setParts(x){i.textContent="";for(const g of x){const d=ge("li");d.append(ge("span","part-name",g.label)),g.note&&d.append(ge("span",void 0,g.note)),i.append(d)}},setSchemeNote(x){e.textContent=x}}}function Ex(n,t=150){let e=null;function i(s){const o=s.dataset.slider,a=Number(s.dataset.dir);if(!o)return;const l=document.getElementById(o);if(!(l instanceof HTMLInputElement))return;const c=Number(l.step)||1,u=Number(l.min),h=Number(l.max);let f=Number(l.value)+a*c;f=Math.max(u,Math.min(h,f)),l.value=String(f),l.dispatchEvent(new Event("input",{bubbles:!0}))}function r(){e&&(clearInterval(e),e=null)}n.addEventListener("pointerdown",s=>{if(!(s.target instanceof Element))return;const o=s.target.closest(".adj-btn");o instanceof HTMLElement&&(s.preventDefault(),r(),i(o),e=setInterval(()=>i(o),t))}),n.addEventListener("pointerup",r),n.addEventListener("pointerleave",r),n.addEventListener("pointercancel",r),document.addEventListener("pointerup",r)}const bx="rgba(217, 139, 95, 0.20)",Tx="#d98b5f",Ax="rgba(164, 148, 138, 0.45)",wx="#a4948a";function Rx(n,t){const e=n.getContext("2d");if(!e)return;const i=Math.min(window.devicePixelRatio||1,2),r=n.clientWidth||276,s=n.clientHeight||110;(n.width!==Math.round(r*i)||n.height!==Math.round(s*i))&&(n.width=Math.round(r*i),n.height=Math.round(s*i)),e.setTransform(i,0,0,i,0,0),e.clearRect(0,0,r,s);const o=128,a=[];let l=0;for(let x=0;x<=o;x++){const g=ci(t,x/o);a.push(g),g>l&&(l=g)}const c=8,u=6,h=16,f=Math.min((r-2*c)/(2*l),(s-u-h)/t.heightMm),p=r/2,v=s-h;e.beginPath();for(let x=0;x<=o;x++){const g=v-x/o*t.heightMm*f,d=p+a[x]*f;x===0?e.moveTo(d,g):e.lineTo(d,g)}for(let x=o;x>=0;x--)e.lineTo(p-a[x]*f,v-x/o*t.heightMm*f);e.closePath(),e.fillStyle=bx,e.fill(),e.strokeStyle=Tx,e.lineWidth=1.5,e.stroke(),e.strokeStyle=Ax,e.lineWidth=1,e.setLineDash([3,3]),e.beginPath(),e.moveTo(p,v),e.lineTo(p,v-t.heightMm*f),e.stroke(),e.setLineDash([]),e.fillStyle=wx,e.font="11px system-ui, sans-serif",e.textAlign="center",e.fillText(`⌀${Math.round(l*2)} × ${Math.round(t.heightMm)} мм`,p,s-3)}function Cx(n,t){if(t.length===0)throw new Error("unionAll: нечего объединять");if(t.length===1)return t[0];const e=new qs;try{const i=t.map(r=>e.keep(hr(n,r)));return Ys(e.keep(n.Manifold.union(i)))}finally{e.dispose()}}function Px(n,t,e){const i=sl(t),r=$r(t),s=el(e,r.profile,r.heightMm);return s.length===0?i:Cx(n,[i,...s])}function Dx(n,t,e,i){const r=Yu(t,e),s=$r(t),o=el(i,s.profile,s.heightMm);if(o.length===0)return r;const a=new qs;try{const l=a.keep(hr(n,sl(t))),c=a.keep(n.Manifold.union([l,...o.map(f=>a.keep(hr(n,f)))])),u=a.keep(hr(n,tl(r.innerGrid,"both")));return{mesh:Ys(a.keep(c.subtract(u))),capacityMl:r.capacityMl,pinchedFraction:r.pinchedFraction}}finally{a.dispose()}}function Lx(n,t={}){const{positions:e,indices:i}=n,r=i.length/3,s=new ArrayBuffer(84+r*50),o=new DataView(s),a=`ClayForm ${t.name??""}`.slice(0,80);new TextEncoder().encodeInto(a,new Uint8Array(s,0,80)),o.setUint32(80,r,!0);let c=84;const u=t.scale??1;for(let h=0;h<i.length;h+=3){const f=i[h]*3,p=i[h+1]*3,v=i[h+2]*3,x=e[p]-e[f],g=e[p+1]-e[f+1],d=e[p+2]-e[f+2],E=e[v]-e[f],w=e[v+1]-e[f+1],b=e[v+2]-e[f+2];let I=g*b-d*w,P=d*E-x*b,C=x*w-g*E;const O=Math.hypot(I,P,C);O>1e-30&&(I/=O,P/=O,C/=O),o.setFloat32(c,I,!0),o.setFloat32(c+4,P,!0),o.setFloat32(c+8,C,!0),c+=12;for(const T of[f,p,v])o.setFloat32(c,e[T]*u,!0),o.setFloat32(c+4,e[T+1]*u,!0),o.setFloat32(c+8,e[T+2]*u,!0),c+=12;o.setUint16(c,0,!0),c+=2}return s}const ih=1,Ux=["vessel","master","bath"],rh=[128,192,256,384],Ix=20,Nx=400;function ll(){const n=ki("pot");return{version:ih,family:n.id,shape:$s(n.id,{}),heightMm:n.defaultHeightMm,relief:Ka(),roulette:Qa(),handle:Hu(),spout:nl(),hollow:qu(),mold:Qu(),exportMode:"vessel",resolution:192}}function Fx(n,t){if(!Ru(n))return t;const e=ki(n);return{...t,family:e.id,shape:$s(e.id,{}),heightMm:e.defaultHeightMm}}function sh(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}function Vc(n,t){return typeof n=="number"&&Number.isFinite(n)?n:t}function Ox(n){const t={};for(const[e,i]of Object.entries(sh(n)))typeof i=="number"&&Number.isFinite(i)&&(t[e]=i);return t}function js(n){const t=sh(n),e=ll(),i=typeof t.family=="string"&&Ru(t.family)?t.family:e.family,r=Math.min(Nx,Math.max(Ix,Vc(t.heightMm,ki(i).defaultHeightMm))),s=Vc(t.resolution,e.resolution),o=rh.includes(s)?s:e.resolution;return{version:ih,family:i,shape:$s(i,Ox(t.shape)),heightMm:r,relief:iv(t.relief),roulette:lv(t.roulette),handle:Rv(t.handle),spout:Pv(t.spout),hollow:$v(t.hollow),mold:ox(t.mold),exportMode:Bx(t.exportMode),resolution:o}}function Bx(n){for(const t of Ux)if(n===t)return t;return"vessel"}function cl(n,t){return{family:n.family,shape:n.shape,heightMm:n.heightMm,nu:t,nv:t,relief:n.relief,roulette:n.roulette,spout:n.spout}}function Je(n,t,e,i,r={}){return{name:n,note:t,build:()=>js({...ll(),family:e,shape:{...$0(e),...i},...r})}}const oh=[Je("Горшок","русский печной горшок","pot",{dBelly:170,dNeck:108,dFoot:104,bellyAt:.52,shoulder:.45,neckH:.16,rimFlare:.18},{heightMm:150}),Je("Крынка","узкое горло под сметану и молоко","pot",{dBelly:150,dNeck:74,dFoot:92,bellyAt:.42,shoulder:.7,neckH:.28,rimFlare:.35},{heightMm:195,spout:{on:!0,pullMm:12,widthDeg:55,zone:.14}}),Je("Корчага","большая тарная посудина","pot",{dBelly:300,dNeck:200,dFoot:160,bellyAt:.48,shoulder:.3,neckH:.1,rimFlare:.12},{heightMm:340}),Je("Горшок с накаткой","поясок, накатанный колесом по тулову","pot",{dBelly:178,dNeck:112,dFoot:100,bellyAt:.5,shoulder:.5,neckH:.15,rimFlare:.2},{heightMm:160,roulette:{on:!0,pattern:"lattice",bandCenter:.66,bandWidthMm:26,depthMm:1.5,repeats:0,angle:0}}),Je("Кувшин","носик-слив и ручка напротив","vase",{dBelly:150,dNeck:76,dRim:96,dFoot:96,bellyAt:.4,neckAt:.74,footH:6},{heightMm:230,handle:{on:!0,count:1,topAt:.88,bottomAt:.42,reachMm:34,thicknessMm:13,widthRatio:.65},spout:{on:!0,pullMm:20,widthDeg:55,zone:.16}}),Je("Амфора","две ручки, узкая ножка","vase",{dBelly:168,dNeck:62,dRim:88,dFoot:62,bellyAt:.42,neckAt:.78,footH:26},{heightMm:300,handle:{on:!0,count:2,topAt:.86,bottomAt:.54,reachMm:30,thicknessMm:14,widthRatio:.8}}),Je("Лекиф","узкий сосуд для масла","vase",{dBelly:84,dNeck:26,dRim:48,dFoot:60,bellyAt:.34,neckAt:.8,footH:14},{heightMm:210}),Je("Ваза с валиками","кольцевой рельеф по тулову","vase",{dBelly:160,dNeck:58,dRim:84,dFoot:80,bellyAt:.4,neckAt:.78,footH:12},{heightMm:265,relief:{wave:{on:!0,axis:"z",shape:"rounded",freq:18,ampMm:1.4,phase:0,spiralK:0},wave2:{on:!1,axis:"theta",shape:"sin",freq:6,fm:.2,am:.5,spiralK:1},zone:{from:.12,to:.72,fade:.08}}}),Je("Миска","столовая миска","bowl",{dRim:210,dFoot:92,curvature:.6,footH:8,rimFlare:0},{heightMm:80}),Je("Тарелка","широкая и низкая","bowl",{dRim:260,dFoot:120,curvature:.25,footH:6,rimFlare:.06},{heightMm:42}),Je("Пиала","полусфера без ножки","bowl",{dRim:130,dFoot:52,curvature:1,footH:4,rimFlare:0},{heightMm:62}),Je("Килик","плоская чаша на высокой ножке","bowl",{dRim:200,dFoot:74,curvature:.45,footH:42,rimFlare:.1},{heightMm:110}),Je("Кружка","чашка с ручкой","cup",{dRim:88,dFoot:70,barrel:.08,rimFlare:0},{heightMm:100,handle:{on:!0,count:1,topAt:.84,bottomAt:.28,reachMm:30,thicknessMm:11,widthRatio:.7}}),Je("Стакан","прямой конус, форма из одной части","cup",{dRim:78,dFoot:58,barrel:0,rimFlare:0},{heightMm:110}),Je("Канопка","бочкообразная кружка","cup",{dRim:92,dFoot:78,barrel:.28,rimFlare:.05},{heightMm:115,handle:{on:!0,count:1,topAt:.8,bottomAt:.24,reachMm:32,thicknessMm:12,widthRatio:.6}})];function kx(n){return oh.find(t=>t.name===n)??null}function zx(n){const t=new TextEncoder().encode(n);let e="";for(const i of t)e+=String.fromCharCode(i);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Hx(n){const t=n.replace(/-/g,"+").replace(/_/g,"/"),e=t.length%4?"=".repeat(4-t.length%4):"",i=atob(t+e),r=new Uint8Array(i.length);for(let s=0;s<i.length;s++)r[s]=i.charCodeAt(s);return new TextDecoder().decode(r)}function Vx(n){return zx(JSON.stringify(n))}function Gx(n){try{return js(JSON.parse(Hx(n)))}catch{return null}}function Wx(n){const t=n.match(/#s=([A-Za-z0-9\-_]+)/);return t?t[1]:null}const ah="clayform_user_presets_v1";function Xx(){try{const n=localStorage.getItem(ah);if(!n)return[];const t=JSON.parse(n);if(!Array.isArray(t))return[];const e=[];for(const i of t){if(typeof i!="object"||i===null)continue;const r=Reflect.get(i,"name");typeof r!="string"||r.length===0||e.push({name:r,state:js(Reflect.get(i,"state"))})}return e}catch{return[]}}function $x(n){try{return localStorage.setItem(ah,JSON.stringify(n)),!0}catch{return!1}}function qx(n){let t=0;for(const e of n){const i=e.name.match(/^Моё (\d+)$/);i&&(t=Math.max(t,Number(i[1])))}return t+1}class Yx{constructor(t,e=80){this.limit=e,this.past=[],this.future=[],this.current=t}get value(){return this.current}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}push(t){jx(t,this.current)||(this.past.push(this.current),this.past.length>this.limit&&this.past.shift(),this.future=[],this.current=t)}replace(t){this.current=t}undo(){const t=this.past.pop();return t===void 0?null:(this.future.push(this.current),this.current=t,t)}redo(){const t=this.future.pop();return t===void 0?null:(this.past.push(this.current),this.current=t,t)}}function jx(n,t){return JSON.stringify(n)===JSON.stringify(t)}const Kx=192,Zx=96,Jx=220,Qx=400,tM=20,eM=500,nM=Le("view",HTMLCanvasElement),iM=Le("panel",HTMLElement),rM=Le("familyGrid",HTMLDivElement),sM=Le("shapeParams",HTMLDivElement),oM=Le("reliefCards",HTMLDivElement),aM=Le("attachCards",HTMLDivElement),lM=Le("exportParams",HTMLDivElement),cM=Le("profileGraph",HTMLCanvasElement),Na=Le("heightMm",HTMLInputElement),kr=Le("resolution",HTMLSelectElement),Sn=Le("exportBtn",HTMLButtonElement),uM=Le("status",HTMLParagraphElement),zr=Le("audit",HTMLParagraphElement),Ns=Le("warnings",HTMLParagraphElement),Ii=Le("blockers",HTMLParagraphElement),Pi=Le("presetSel",HTMLSelectElement),Gc=Le("saveBtn",HTMLButtonElement),zo=Le("shareBtn",HTMLButtonElement),lh=Le("undoBtn",HTMLButtonElement),ch=Le("redoBtn",HTMLButtonElement),uh=z0(nM),hh=Jv(),oi=new Yx(hM());let Et=oi.value;function hM(){const n=Wx(location.hash);return n&&Gx(n)||ll()}const fM=j0(rM,Et.family,n=>{tn(Fx(n,Et))});Ex(iM);let Wc=dh();const fh=mv(oM,()=>Et.relief,()=>Et.roulette,n=>tn({...Et,relief:n}),n=>tn({...Et,roulette:n})),dM=Nv(aM,()=>Et.handle,()=>Et.spout,n=>tn({...Et,handle:n}),n=>tn({...Et,spout:n})),Ur=Sx({vessel:Le("tabVessel",HTMLButtonElement),master:Le("tabMaster",HTMLButtonElement),bath:Le("tabBath",HTMLButtonElement)},lM,Le("schemeNote",HTMLParagraphElement),Le("partList",HTMLUListElement),()=>Et.hollow,()=>Et.mold,n=>tn({...Et,exportMode:n}),n=>tn({...Et,hollow:n}),n=>tn({...Et,mold:n}));function dh(){return K0(sM,ki(Et.family).params,Et.shape,(n,t)=>{tn({...Et,shape:{...Et.shape,[n]:t}})})}function tn(n,t=!0){const e=n.family!==Et.family;Et=js(n),t?pM(Et):oi.replace(Et),e?(fM.setActive(Et.family),Wc=dh()):Wc.setValues(Et.shape),fh.sync(Et.relief,Et.roulette),dM.sync(Et.handle,Et.spout),Ur.sync(Et.exportMode,Et.hollow,Et.mold),Na.value=String(Math.round(Et.heightMm)),kr.value=String(Et.resolution),ph(),mM()}let fr=null;function pM(n){fr&&clearTimeout(fr),fr=setTimeout(()=>{oi.push(n),ph()},eM)}function ph(){lh.disabled=!oi.canUndo,ch.disabled=!oi.canRedo}let Ho=null,Vo=null,Ir=0;function mM(){Ir++;const n=Ir,t=ja(Et.family,Et.shape,Et.heightMm);Rx(cM,t);const e=ci(t,Et.roulette.bandCenter),i=Du(Et.roulette,{heightMm:Et.heightMm,bandRadiusMm:e}),r=2*Math.PI*e/i;fh.setRepeatsNote(`${i} оттисков за оборот, шаг ${r.toFixed(1)} мм по окружности ⌀${(e*2).toFixed(0)} мм.`);const s=cl(Et,Kx),o=Yu(s,Et.hollow),a=sl(s),l=th(a,{hasHandle:Et.handle.on,angularRelief:MM()});Ur.setSchemeNote(l.reason);const c=[...l.warnings];o.pinchedFraction>0&&c.push(`Рельеф уходит внутрь глубже стенки на ${(o.pinchedFraction*100).toFixed(1)} % поверхности — там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.`),Ns.textContent=c.join(`
`);const u=yM(a.positions),h=il(o.mesh.positions,o.mesh.indices)/1e3;if(uM.textContent=[`⌀${u.toFixed(0)} × ${Et.heightMm.toFixed(0)} мм`,`вместимость ${Xc(o.capacityMl)}`,`глины ${Xc(h)}`].join(" · "),Vo&&clearTimeout(Vo),Ho&&clearTimeout(Ho),Et.exportMode==="vessel"){const f=$r(s);uh.setMeshes([o.mesh,...el(Et.handle,f.profile,f.heightMm)]),Ur.setParts([{label:"Изделие",note:`${(h/1e3).toFixed(2)} л глины`}]),Sn.textContent="Экспорт STL",zr.textContent="проверка…",Ho=setTimeout(()=>xM(o.mesh),Jx)}else Ur.setParts(l.parts.map(f=>({label:f.label}))),Sn.textContent=Et.exportMode==="master"?"Экспорт мастера":"Экспорт ванночек",zr.textContent="собираю оснастку…",Vo=setTimeout(()=>void _M(n),Qx)}async function _M(n){try{const t=await hh;if(n!==Ir)return;const e=mh(t,Zx);if(n!==Ir)return;uh.setMeshes(gM(e.map(r=>r.mesh))),Ur.setParts(e.map(r=>({label:r.label,note:vM(r.mesh)})));const i=e.reduce((r,s)=>r+s.mesh.indices.length/3,0);zr.textContent=`${e.length} дет. · ${Math.round(i/1e3)} тыс. треугольников`,Ii.textContent="",Sn.disabled=!1}catch(t){if(n!==Ir)return;zr.textContent="",Ii.textContent=`Оснастку собрать не удалось: ${_h(t)}`,Sn.disabled=!0}}function mh(n,t){const e=cl(Et,t),i=Px(n,e,Et.handle),r=th(i,{hasHandle:Et.handle.on});return Et.exportMode==="master"?[gx(n,i,r,Et.mold)]:vx(n,i,r,Et.mold)}function gM(n){let t=0;const e=[];for(const i of n){let r=1/0,s=-1/0;for(let l=0;l<i.positions.length;l+=3)i.positions[l]<r&&(r=i.positions[l]),i.positions[l]>s&&(s=i.positions[l]);const o=t-r,a=new Float32Array(i.positions);for(let l=0;l<a.length;l+=3)a[l]+=o;e.push({...i,positions:a}),t+=s-r+tM}return e}function vM(n){const{extents:t}=rl({...n,normals:n.normals});return`${t.map(e=>Math.round(e)).join("×")} мм`}function xM(n){const t=rl(n),e=Gu(t),i=Fv(n,60);zr.textContent=t.watertight?`замкнуто ✓ · ${Math.round(t.triangleCount/1e3)} тыс. треугольников`:"меш не замкнут";const r=[...e.warnings];i>.15&&r.push(`Свесы круче 60° на ${(i*100).toFixed(0)} % поверхности — печать глиной потребует опор.`);const s=Ns.textContent?[Ns.textContent]:[];Ns.textContent=[...s,...r].join(`
`),Ii.textContent=e.blocking.join(`
`),Sn.disabled=e.blocking.length>0}function MM(){const n=t=>t!=="z";return Et.relief.wave.on&&n(Et.relief.wave.axis)||Et.relief.wave2.on&&n(Et.relief.wave2.axis)||Et.roulette.on}function yM(n){let t=0;for(let e=0;e<n.length;e+=3)t=Math.max(t,Math.hypot(n[e],n[e+1]));return t*2}function Xc(n){return n>=1e3?`${(n/1e3).toFixed(2)} л`:`${n.toFixed(0)} мл`}function _h(n){return n instanceof Error?n.message:String(n)}Na.addEventListener("input",()=>{tn({...Et,heightMm:Number(Na.value)})});kr.textContent="";for(const n of rh){const t=document.createElement("option");t.value=String(n),t.textContent=`${n} × ${n}`,kr.append(t)}kr.addEventListener("change",()=>{tn({...Et,resolution:Number(kr.value)})});Sn.addEventListener("click",()=>{SM(Et.exportMode)});async function SM(n){const t=Sn.textContent;Sn.disabled=!0,Sn.textContent="Собираю…";try{const e=await hh,i=n==="vessel"?[{id:Et.family,label:"Изделие",mesh:Dx(e,cl(Et,Et.resolution),Et.hollow,Et.handle).mesh}]:mh(e,Et.resolution),r=i.flatMap(s=>Gu(rl(s.mesh),!0).blocking);if(r.length>0){Ii.textContent=r.join(`
`);return}Ii.textContent="";for(const s of i){const o=`clayform-${Et.family}-${s.id}.stl`;EM(Lx(s.mesh,{name:s.id}),o),await new Promise(a=>setTimeout(a,250))}}catch(e){Ii.textContent=`Сборка не удалась: ${_h(e)}`}finally{Sn.textContent=t,Sn.disabled=!1}}function EM(n,t){const e=URL.createObjectURL(new Blob([n],{type:"model/stl"})),i=document.createElement("a");i.href=e,i.download=t,i.click(),URL.revokeObjectURL(e)}let Di=Xx();function gh(){Pi.textContent="";const n=document.createElement("option");n.value="",n.textContent="Пресеты…",Pi.append(n);const t=document.createElement("optgroup");t.label="Готовые";for(const e of oh){const i=document.createElement("option");i.value=`b:${e.name}`,i.textContent=e.name,i.title=e.note,t.append(i)}if(Pi.append(t),Di.length>0){const e=document.createElement("optgroup");e.label="Мои";for(const i of Di){const r=document.createElement("option");r.value=`u:${i.name}`,r.textContent=i.name,e.append(r)}Pi.append(e)}}Pi.addEventListener("change",()=>{const n=Pi.value;if(Pi.value="",n.startsWith("b:")){const t=kx(n.slice(2));t&&tn(t.build())}else if(n.startsWith("u:")){const t=Di.find(e=>e.name===n.slice(2));t&&tn(t.state)}});Gc.addEventListener("click",()=>{var e;const n=`Моё ${qx(Di)}`,t=(e=prompt("Имя пресета",n))==null?void 0:e.trim();t&&(Di=[...Di.filter(i=>i.name!==t),{name:t,state:Et}],$x(Di)?(gh(),Fa(Gc,"✓")):Ii.textContent="Не удалось сохранить пресет: браузер запретил доступ к хранилищу.")});zo.addEventListener("click",()=>{var t;const n=Vx(Et);location.hash=`s=${n}`,(t=navigator.clipboard)==null||t.writeText(`${location.origin}${location.pathname}#s=${n}`).then(()=>Fa(zo,"✓"),()=>Fa(zo,"↑"))});function Fa(n,t){const e=n.textContent;n.textContent=t,setTimeout(()=>{n.textContent=e},900)}lh.addEventListener("click",()=>ul("undo"));ch.addEventListener("click",()=>ul("redo"));function ul(n){fr&&(clearTimeout(fr),fr=null,oi.push(Et));const t=n==="undo"?oi.undo():oi.redo();t&&tn(t,!1)}window.addEventListener("keydown",n=>{!(n.ctrlKey||n.metaKey)||n.key.toLowerCase()!=="z"||(n.preventDefault(),ul(n.shiftKey?"redo":"undo"))});gh();tn(Et,!1);
