(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Le(n,t){const e=document.getElementById(n);if(!(e instanceof t))throw new Error(`#${n} is not ${t.name}`);return e}function ne(n,t,e){const i=document.createElement(n);return t&&(i.className=t),e!==void 0&&(i.textContent=e),i}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ha="178",cr={ROTATE:0,DOLLY:1,PAN:2},ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ef=0,Tl=1,bf=2,Jc=1,Tf=2,kn=3,li=0,on=1,zn=2,si=0,ur=1,Al=2,wl=3,Rl=4,Af=5,Ai=100,wf=101,Rf=102,Cf=103,Pf=104,Df=200,Lf=201,Uf=202,If=203,qo=204,Yo=205,Nf=206,Ff=207,Of=208,Bf=209,kf=210,zf=211,Hf=212,Vf=213,Gf=214,jo=0,Ko=1,Zo=2,_r=3,Jo=4,Qo=5,ta=6,ea=7,Qc=0,Wf=1,Xf=2,oi=0,$f=1,qf=2,Yf=3,jf=4,Kf=5,Zf=6,Jf=7,tu=300,gr=301,vr=302,na=303,ia=304,Xs=306,ra=1e3,Ri=1001,sa=1002,Tn=1003,Qf=1004,is=1005,Rn=1006,ao=1007,Ci=1008,Pn=1009,eu=1010,nu=1011,Or=1012,Va=1013,Fi=1014,Vn=1015,Gr=1016,Ga=1017,Wa=1018,Br=1020,iu=35902,ru=1021,su=1022,bn=1023,kr=1026,zr=1027,ou=1028,Xa=1029,au=1030,$a=1031,qa=1033,ws=33776,Rs=33777,Cs=33778,Ps=33779,oa=35840,aa=35841,la=35842,ca=35843,ua=36196,ha=37492,fa=37496,da=37808,pa=37809,ma=37810,_a=37811,ga=37812,va=37813,xa=37814,Ma=37815,ya=37816,Sa=37817,Ea=37818,ba=37819,Ta=37820,Aa=37821,Ds=36492,wa=36494,Ra=36495,lu=36283,Ca=36284,Pa=36285,Da=36286,td=3200,ed=3201,cu=0,nd=1,ii="",pn="srgb",xr="srgb-linear",ks="linear",Se="srgb",Xi=7680,Cl=519,id=512,rd=513,sd=514,uu=515,od=516,ad=517,ld=518,cd=519,Pl=35044,Dl="300 es",Gn=2e3,zs=2001;class ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ls=Math.PI/180,La=180/Math.PI;function Wr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]).toLowerCase()}function oe(n,t,e){return Math.max(t,Math.min(e,n))}function ud(n,t){return(n%t+t)%t}function lo(n,t,e){return(1-e)*n+e*t}function Ar(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const hd={DEG2RAD:Ls};class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oi{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const d=s[o+0],g=s[o+1],v=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=g,t[e+2]=v,t[e+3]=x;return}if(h!==x||l!==d||c!==g||u!==v){let p=1-a;const f=l*d+c*g+u*v+h*x,T=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const F=Math.sqrt(w),P=Math.atan2(F,f*T);p=Math.sin(p*P)/F,a=Math.sin(a*P)/F}const b=a*T;if(l=l*p+d*b,c=c*p+g*b,u=u*p+v*b,h=h*p+x*b,p===1-a){const F=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=F,c*=F,u*=F,h*=F}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],g=s[o+2],v=s[o+3];return t[e]=a*v+u*h+l*g-c*d,t[e+1]=l*v+u*d+c*h-a*g,t[e+2]=c*v+u*g+a*d-l*h,t[e+3]=u*v-a*h-l*d-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),g=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*g*v,this._y=c*g*h-d*u*v,this._z=c*u*v+d*g*h,this._w=c*u*h-d*g*v;break;case"YXZ":this._x=d*u*h+c*g*v,this._y=c*g*h-d*u*v,this._z=c*u*v-d*g*h,this._w=c*u*h+d*g*v;break;case"ZXY":this._x=d*u*h-c*g*v,this._y=c*g*h+d*u*v,this._z=c*u*v+d*g*h,this._w=c*u*h-d*g*v;break;case"ZYX":this._x=d*u*h-c*g*v,this._y=c*g*h+d*u*v,this._z=c*u*v-d*g*h,this._w=c*u*h+d*g*v;break;case"YZX":this._x=d*u*h+c*g*v,this._y=c*g*h+d*u*v,this._z=c*u*v-d*g*h,this._w=c*u*h-d*g*v;break;case"XZY":this._x=d*u*h-c*g*v,this._y=c*g*h-d*u*v,this._z=c*u*v+d*g*h,this._w=c*u*h+d*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=i+a+h;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-l)*g,this._y=(s-c)*g,this._z=(o-r)*g}else if(i>a&&i>h){const g=2*Math.sqrt(1+i-a-h);this._w=(u-l)/g,this._x=.25*g,this._y=(r+o)/g,this._z=(s+c)/g}else if(a>h){const g=2*Math.sqrt(1+a-i-h);this._w=(s-c)/g,this._x=(r+o)/g,this._y=.25*g,this._z=(l+u)/g}else{const g=2*Math.sqrt(1+h-i-a);this._w=(o-r)/g,this._x=(s+c)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(oe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-e;return this._w=g*o+e*this._w,this._x=g*i+e*this._x,this._y=g*r+e*this._y,this._z=g*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,i=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return co.copy(this).projectOnVector(t),this.sub(co)}reflect(t){return this.sub(co.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(oe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const co=new V,Ll=new Oi;class Qt{constructor(t,e,i,r,s,o,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],g=i[5],v=i[8],x=r[0],p=r[3],f=r[6],T=r[1],w=r[4],b=r[7],F=r[2],P=r[5],R=r[8];return s[0]=o*x+a*T+l*F,s[3]=o*p+a*w+l*P,s[6]=o*f+a*b+l*R,s[1]=c*x+u*T+h*F,s[4]=c*p+u*w+h*P,s[7]=c*f+u*b+h*R,s[2]=d*x+g*T+v*F,s[5]=d*p+g*w+v*P,s[8]=d*f+g*b+v*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,d=a*l-u*s,g=c*s-o*l,v=e*h+i*d+r*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=h*x,t[1]=(r*c-u*i)*x,t[2]=(a*i-r*o)*x,t[3]=d*x,t[4]=(u*e-r*l)*x,t[5]=(r*s-a*e)*x,t[6]=g*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(uo.makeScale(t,e)),this}rotate(t){return this.premultiply(uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const uo=new Qt;function hu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function fd(){const n=Hs("canvas");return n.style.display="block",n}const Ul={};function hr(n){n in Ul||(Ul[n]=!0,console.warn(n))}function dd(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function pd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function md(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Il=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _d(){const n={enabled:!0,workingColorSpace:xr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Se&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Se&&(r.r=fr(r.r),r.g=fr(r.g),r.b=fr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ii?ks:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[xr]:{primaries:t,whitePoint:i,transfer:ks,toXYZ:Il,fromXYZ:Nl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:t,whitePoint:i,transfer:Se,toXYZ:Il,fromXYZ:Nl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),n}const me=_d();function Wn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let $i;class gd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{$i===void 0&&($i=Hs("canvas")),$i.width=t.width,$i.height=t.height;const r=$i.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=$i}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Wn(e[i]/255)*255):e[i]=Wn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vd=0;class Ya{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Wr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ho(r[o].image)):s.push(ho(r[o]))}else s=ho(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function ho(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?gd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xd=0;const fo=new V;class an extends ki{constructor(t=an.DEFAULT_IMAGE,e=an.DEFAULT_MAPPING,i=Ri,r=Ri,s=Rn,o=Ci,a=bn,l=Pn,c=an.DEFAULT_ANISOTROPY,u=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Wr(),this.name="",this.source=new Ya(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fo).x}get height(){return this.source.getSize(fo).y}get depth(){return this.source.getSize(fo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==tu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ra:t.x=t.x-Math.floor(t.x);break;case Ri:t.x=t.x<0?0:1;break;case sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ra:t.y=t.y-Math.floor(t.y);break;case Ri:t.y=t.y<0?0:1;break;case sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=tu;an.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,i=0,r=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],g=l[5],v=l[9],x=l[2],p=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(v-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(v+p)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,b=(g+1)/2,F=(f+1)/2,P=(u+d)/4,R=(h+x)/4,I=(v+p)/4;return w>b&&w>F?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=P/i,s=R/i):b>F?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=P/r,s=I/r):F<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(F),i=R/s,r=I/s),this.set(i,r,s,e),this}let T=Math.sqrt((p-v)*(p-v)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(p-v)/T,this.y=(h-x)/T,this.z=(d-u)/T,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=oe(this.x,t.x,e.x),this.y=oe(this.y,t.y,e.y),this.z=oe(this.z,t.z,e.z),this.w=oe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=oe(this.x,t,e),this.y=oe(this.y,t,e),this.z=oe(this.z,t,e),this.w=oe(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(oe(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Md extends ki{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new an(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Ya(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends Md{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class fu extends an{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yd extends an{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sr{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,vn):vn.fromBufferAttribute(s,o),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),rs.copy(i.boundingBox)),rs.applyMatrix4(t.matrixWorld),this.union(rs)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wr),ss.subVectors(this.max,wr),qi.subVectors(t.a,wr),Yi.subVectors(t.b,wr),ji.subVectors(t.c,wr),Kn.subVectors(Yi,qi),Zn.subVectors(ji,Yi),vi.subVectors(qi,ji);let e=[0,-Kn.z,Kn.y,0,-Zn.z,Zn.y,0,-vi.z,vi.y,Kn.z,0,-Kn.x,Zn.z,0,-Zn.x,vi.z,0,-vi.x,-Kn.y,Kn.x,0,-Zn.y,Zn.x,0,-vi.y,vi.x,0];return!po(e,qi,Yi,ji,ss)||(e=[1,0,0,0,1,0,0,0,1],!po(e,qi,Yi,ji,ss))?!1:(os.crossVectors(Kn,Zn),e=[os.x,os.y,os.z],po(e,qi,Yi,ji,ss))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new V,new V,new V,new V,new V,new V,new V,new V],vn=new V,rs=new Sr,qi=new V,Yi=new V,ji=new V,Kn=new V,Zn=new V,vi=new V,wr=new V,ss=new V,os=new V,xi=new V;function po(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){xi.fromArray(n,s);const a=r.x*Math.abs(xi.x)+r.y*Math.abs(xi.y)+r.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),u=i.dot(xi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Sd=new Sr,Rr=new V,mo=new V;class ja{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Sd.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rr.subVectors(t,this.center);const e=Rr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Rr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(mo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rr.copy(t.center).add(mo)),this.expandByPoint(Rr.copy(t.center).sub(mo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Nn=new V,_o=new V,as=new V,Jn=new V,go=new V,ls=new V,vo=new V;class du{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){_o.copy(t).add(e).multiplyScalar(.5),as.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(_o);const s=t.distanceTo(e)*.5,o=-this.direction.dot(as),a=Jn.dot(this.direction),l=-Jn.dot(as),c=Jn.lengthSq(),u=Math.abs(1-o*o);let h,d,g,v;if(u>0)if(h=o*l-a,d=o*a-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const x=1/u;h*=x,d*=x,g=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),g=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),g=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),g=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),g=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),g=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),g=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(_o).addScaledVector(as,d),g}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const i=Nn.dot(this.direction),r=Nn.dot(Nn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,i,r,s){go.subVectors(e,t),ls.subVectors(i,t),vo.crossVectors(go,ls);let o=this.direction.dot(vo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,t);const l=a*this.direction.dot(ls.crossVectors(Jn,ls));if(l<0)return null;const c=a*this.direction.dot(go.cross(Jn));if(c<0||l+c>o)return null;const u=-a*Jn.dot(vo);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(t,e,i,r,s,o,a,l,c,u,h,d,g,v,x,p){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,h,d,g,v,x,p)}set(t,e,i,r,s,o,a,l,c,u,h,d,g,v,x,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=g,f[7]=v,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Ki.setFromMatrixColumn(t,0).length(),s=1/Ki.setFromMatrixColumn(t,1).length(),o=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const d=o*u,g=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=g+v*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=v+g*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,g=l*h,v=c*u,x=c*h;e[0]=d+x*a,e[4]=v*a-g,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=g*a-v,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,g=l*h,v=c*u,x=c*h;e[0]=d-x*a,e[4]=-o*h,e[8]=v+g*a,e[1]=g+v*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,g=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=v*c-g,e[8]=d*c+x,e[1]=l*h,e[5]=x*c+d,e[9]=g*c-v,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,g=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=x-d*h,e[8]=v*h+g,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=g*h+v,e[10]=d-x*h}else if(t.order==="XZY"){const d=o*l,g=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+x,e[5]=o*u,e[9]=g*h-v,e[2]=v*h-g,e[6]=a*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ed,t,bd)}lookAt(t,e,i){const r=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Qn.crossVectors(i,cn),Qn.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Qn.crossVectors(i,cn)),Qn.normalize(),cs.crossVectors(cn,Qn),r[0]=Qn.x,r[4]=cs.x,r[8]=cn.x,r[1]=Qn.y,r[5]=cs.y,r[9]=cn.y,r[2]=Qn.z,r[6]=cs.z,r[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],g=i[13],v=i[2],x=i[6],p=i[10],f=i[14],T=i[3],w=i[7],b=i[11],F=i[15],P=r[0],R=r[4],I=r[8],S=r[12],y=r[1],N=r[5],Y=r[9],X=r[13],et=r[2],lt=r[6],Q=r[10],dt=r[14],j=r[3],Mt=r[7],wt=r[11],Bt=r[15];return s[0]=o*P+a*y+l*et+c*j,s[4]=o*R+a*N+l*lt+c*Mt,s[8]=o*I+a*Y+l*Q+c*wt,s[12]=o*S+a*X+l*dt+c*Bt,s[1]=u*P+h*y+d*et+g*j,s[5]=u*R+h*N+d*lt+g*Mt,s[9]=u*I+h*Y+d*Q+g*wt,s[13]=u*S+h*X+d*dt+g*Bt,s[2]=v*P+x*y+p*et+f*j,s[6]=v*R+x*N+p*lt+f*Mt,s[10]=v*I+x*Y+p*Q+f*wt,s[14]=v*S+x*X+p*dt+f*Bt,s[3]=T*P+w*y+b*et+F*j,s[7]=T*R+w*N+b*lt+F*Mt,s[11]=T*I+w*Y+b*Q+F*wt,s[15]=T*S+w*X+b*dt+F*Bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],g=t[14],v=t[3],x=t[7],p=t[11],f=t[15];return v*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*g-i*l*g)+x*(+e*l*g-e*c*d+s*o*d-r*o*g+r*c*u-s*l*u)+p*(+e*c*h-e*a*g-s*o*h+i*o*g+s*a*u-i*c*u)+f*(-r*a*u-e*l*h+e*a*d+r*o*h-i*o*d+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],g=t[11],v=t[12],x=t[13],p=t[14],f=t[15],T=h*p*c-x*d*c+x*l*g-a*p*g-h*l*f+a*d*f,w=v*d*c-u*p*c-v*l*g+o*p*g+u*l*f-o*d*f,b=u*x*c-v*h*c+v*a*g-o*x*g-u*a*f+o*h*f,F=v*h*l-u*x*l-v*a*d+o*x*d+u*a*p-o*h*p,P=e*T+i*w+r*b+s*F;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return t[0]=T*R,t[1]=(x*d*s-h*p*s-x*r*g+i*p*g+h*r*f-i*d*f)*R,t[2]=(a*p*s-x*l*s+x*r*c-i*p*c-a*r*f+i*l*f)*R,t[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*g-i*l*g)*R,t[4]=w*R,t[5]=(u*p*s-v*d*s+v*r*g-e*p*g-u*r*f+e*d*f)*R,t[6]=(v*l*s-o*p*s-v*r*c+e*p*c+o*r*f-e*l*f)*R,t[7]=(o*d*s-u*l*s+u*r*c-e*d*c-o*r*g+e*l*g)*R,t[8]=b*R,t[9]=(v*h*s-u*x*s-v*i*g+e*x*g+u*i*f-e*h*f)*R,t[10]=(o*x*s-v*a*s+v*i*c-e*x*c-o*i*f+e*a*f)*R,t[11]=(u*a*s-o*h*s-u*i*c+e*h*c+o*i*g-e*a*g)*R,t[12]=F*R,t[13]=(u*x*r-v*h*r+v*i*d-e*x*d-u*i*p+e*h*p)*R,t[14]=(v*a*r-o*x*r-v*i*l+e*x*l+o*i*p-e*a*p)*R,t[15]=(o*h*r-u*a*r+u*i*l-e*h*l-o*i*d+e*a*d)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,d=s*c,g=s*u,v=s*h,x=o*u,p=o*h,f=a*h,T=l*c,w=l*u,b=l*h,F=i.x,P=i.y,R=i.z;return r[0]=(1-(x+f))*F,r[1]=(g+b)*F,r[2]=(v-w)*F,r[3]=0,r[4]=(g-b)*P,r[5]=(1-(d+f))*P,r[6]=(p+T)*P,r[7]=0,r[8]=(v+w)*R,r[9]=(p-T)*R,r[10]=(1-(d+x))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=Ki.set(r[0],r[1],r[2]).length();const o=Ki.set(r[4],r[5],r[6]).length(),a=Ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],xn.copy(this);const c=1/s,u=1/o,h=1/a;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=h,xn.elements[9]*=h,xn.elements[10]*=h,e.setFromRotationMatrix(xn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Gn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),d=(i+r)/(i-r);let g,v;if(a===Gn)g=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===zs)g=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Gn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(o-s),d=(e+t)*c,g=(i+r)*u;let v,x;if(a===Gn)v=(o+s)*h,x=-2*h;else if(a===zs)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ki=new V,xn=new Ne,Ed=new V(0,0,0),bd=new V(1,1,1),Qn=new V,cs=new V,cn=new V,Fl=new Ne,Ol=new Oi;class Dn{constructor(t=0,e=0,i=0,r=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],g=r[10];switch(e){case"XYZ":this._y=Math.asin(oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-oe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ol.setFromEuler(this),this.setFromQuaternion(Ol,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class pu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Td=0;const Bl=new V,Zi=new Oi,Fn=new Ne,us=new V,Cr=new V,Ad=new V,wd=new Oi,kl=new V(1,0,0),zl=new V(0,1,0),Hl=new V(0,0,1),Vl={type:"added"},Rd={type:"removed"},Ji={type:"childadded",child:null},xo={type:"childremoved",child:null};class $e extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=Wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new V,e=new Dn,i=new Oi,r=new V(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Qt}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(kl,t)}rotateY(t){return this.rotateOnAxis(zl,t)}rotateZ(t){return this.rotateOnAxis(Hl,t)}translateOnAxis(t,e){return Bl.copy(t).applyQuaternion(this.quaternion),this.position.add(Bl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kl,t)}translateY(t){return this.translateOnAxis(zl,t)}translateZ(t){return this.translateOnAxis(Hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?us.copy(t):us.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Cr,us,this.up):Fn.lookAt(us,Cr,this.up),this.quaternion.setFromRotationMatrix(Fn),r&&(Fn.extractRotation(r.matrixWorld),Zi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rd),xo.child=t,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,t,Ad),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),g=o(t.animations),v=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}$e.DEFAULT_UP=new V(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new V,On=new V,Mo=new V,Bn=new V,Qi=new V,tr=new V,Gl=new V,yo=new V,So=new V,Eo=new V,bo=new Ie,To=new Ie,Ao=new Ie;class Sn{constructor(t=new V,e=new V,i=new V){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Mn.subVectors(t,e),r.cross(Mn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Mn.subVectors(r,e),On.subVectors(i,e),Mo.subVectors(t,e);const o=Mn.dot(Mn),a=Mn.dot(On),l=Mn.dot(Mo),c=On.dot(On),u=On.dot(Mo),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,g=(c*l-a*u)*d,v=(o*u-a*l)*d;return s.set(1-g-v,v,g)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bn.x),l.addScaledVector(o,Bn.y),l.addScaledVector(a,Bn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return bo.setScalar(0),To.setScalar(0),Ao.setScalar(0),bo.fromBufferAttribute(t,e),To.fromBufferAttribute(t,i),Ao.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(bo,s.x),o.addScaledVector(To,s.y),o.addScaledVector(Ao,s.z),o}static isFrontFacing(t,e,i,r){return Mn.subVectors(i,e),On.subVectors(t,e),Mn.cross(On).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),Mn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;Qi.subVectors(r,i),tr.subVectors(s,i),yo.subVectors(t,i);const l=Qi.dot(yo),c=tr.dot(yo);if(l<=0&&c<=0)return e.copy(i);So.subVectors(t,r);const u=Qi.dot(So),h=tr.dot(So);if(u>=0&&h<=u)return e.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Qi,o);Eo.subVectors(t,s);const g=Qi.dot(Eo),v=tr.dot(Eo);if(v>=0&&g<=v)return e.copy(s);const x=g*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),e.copy(i).addScaledVector(tr,a);const p=u*v-g*h;if(p<=0&&h-u>=0&&g-v>=0)return Gl.subVectors(s,r),a=(h-u)/(h-u+(g-v)),e.copy(r).addScaledVector(Gl,a);const f=1/(p+x+d);return o=x*f,a=d*f,e.copy(i).addScaledVector(Qi,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},hs={h:0,s:0,l:0};function wo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class _e{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,me.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=me.workingColorSpace){return this.r=t,this.g=e,this.b=i,me.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=me.workingColorSpace){if(t=ud(t,1),e=oe(e,0,1),i=oe(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=wo(o,s,t+1/3),this.g=wo(o,s,t),this.b=wo(o,s,t-1/3)}return me.colorSpaceToWorking(this,r),this}setStyle(t,e=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pn){const i=mu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pn){return me.workingToColorSpace(je.copy(this),t),Math.round(oe(je.r*255,0,255))*65536+Math.round(oe(je.g*255,0,255))*256+Math.round(oe(je.b*255,0,255))}getHexString(t=pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=me.workingColorSpace){me.workingToColorSpace(je.copy(this),e);const i=je.r,r=je.g,s=je.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=me.workingColorSpace){return me.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=pn){me.workingToColorSpace(je.copy(this),t);const e=je.r,i=je.g,r=je.b;return t!==pn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(hs);const i=lo(ti.h,hs.h,e),r=lo(ti.s,hs.s,e),s=lo(ti.l,hs.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const je=new _e;_e.NAMES=mu;let Cd=0;class Xr extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Wr(),this.name="",this.type="Material",this.blending=ur,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qo,this.blendDst=Yo,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _e(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qo&&(i.blendSrc=this.blendSrc),this.blendDst!==Yo&&(i.blendDst=this.blendDst),this.blendEquation!==Ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _u extends Xr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new V,fs=new Jt;let Pd=0;class hn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Pl,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)fs.fromBufferAttribute(this,e),fs.applyMatrix3(t),this.setXY(e,fs.x,fs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ar(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ar(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ar(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ar(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ar(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pl&&(t.usage=this.usage),t}}class gu extends hn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class vu extends hn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ui extends hn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Dd=0;const fn=new Ne,Ro=new $e,er=new V,un=new Sr,Pr=new Sr,Ve=new V;class ui extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=Wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hu(t)?vu:gu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Qt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,i){return fn.makeTranslation(t,e,i),this.applyMatrix4(fn),this}scale(t,e,i){return fn.makeScale(t,e,i),this.applyMatrix4(fn),this}lookAt(t){return Ro.lookAt(t),Ro.updateMatrix(),this.applyMatrix4(Ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ui(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ja);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Pr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(un.min,Pr.min),un.expandByPoint(Ve),Ve.addVectors(un.max,Pr.max),un.expandByPoint(Ve)):(un.expandByPoint(Pr.min),un.expandByPoint(Pr.max))}un.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Ve.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ve.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(t,c),Ve.add(er)),r=Math.max(r,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new V,l[I]=new V;const c=new V,u=new V,h=new V,d=new Jt,g=new Jt,v=new Jt,x=new V,p=new V;function f(I,S,y){c.fromBufferAttribute(i,I),u.fromBufferAttribute(i,S),h.fromBufferAttribute(i,y),d.fromBufferAttribute(s,I),g.fromBufferAttribute(s,S),v.fromBufferAttribute(s,y),u.sub(c),h.sub(c),g.sub(d),v.sub(d);const N=1/(g.x*v.y-v.x*g.y);isFinite(N)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(h,-g.y).multiplyScalar(N),p.copy(h).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(N),a[I].add(x),a[S].add(x),a[y].add(x),l[I].add(p),l[S].add(p),l[y].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let I=0,S=T.length;I<S;++I){const y=T[I],N=y.start,Y=y.count;for(let X=N,et=N+Y;X<et;X+=3)f(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const w=new V,b=new V,F=new V,P=new V;function R(I){F.fromBufferAttribute(r,I),P.copy(F);const S=a[I];w.copy(S),w.sub(F.multiplyScalar(F.dot(S))).normalize(),b.crossVectors(P,S);const N=b.dot(l[I])<0?-1:1;o.setXYZW(I,w.x,w.y,w.z,N)}for(let I=0,S=T.length;I<S;++I){const y=T[I],N=y.start,Y=y.count;for(let X=N,et=N+Y;X<et;X+=3)R(t.getX(X+0)),R(t.getX(X+1)),R(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const r=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,h=new V;if(t)for(let d=0,g=t.count;d<g;d+=3){const v=t.getX(d+0),x=t.getX(d+1),p=t.getX(d+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,p),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,g=e.count;d<g;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let g=0,v=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?g=l[x]*a.data.stride+a.offset:g=l[x]*u;for(let f=0;f<u;f++)d[v++]=c[g++]}return new hn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ui,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],g=t(d,i);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const g=c[h];u.push(g.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,g=h.length;d<g;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wl=new Ne,Mi=new du,ds=new ja,Xl=new V,ps=new V,ms=new V,_s=new V,Co=new V,gs=new V,$l=new V,vs=new V;class Cn extends $e{constructor(t=new ui,e=new _u){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){gs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Co.fromBufferAttribute(h,t),o?gs.addScaledVector(Co,u):gs.addScaledVector(Co.sub(e),u))}e.add(gs)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ds.copy(i.boundingSphere),ds.applyMatrix4(s),Mi.copy(t.ray).recast(t.near),!(ds.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(ds,Xl)===null||Mi.origin.distanceToSquared(Xl)>(t.far-t.near)**2))&&(Wl.copy(s).invert(),Mi.copy(t.ray).applyMatrix4(Wl),!(i.boundingBox!==null&&Mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,g=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const p=d[v],f=o[p.materialIndex],T=Math.max(p.start,g.start),w=Math.min(a.count,Math.min(p.start+p.count,g.start+g.count));for(let b=T,F=w;b<F;b+=3){const P=a.getX(b),R=a.getX(b+1),I=a.getX(b+2);r=xs(this,f,t,i,c,u,h,P,R,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const v=Math.max(0,g.start),x=Math.min(a.count,g.start+g.count);for(let p=v,f=x;p<f;p+=3){const T=a.getX(p),w=a.getX(p+1),b=a.getX(p+2);r=xs(this,o,t,i,c,u,h,T,w,b),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const p=d[v],f=o[p.materialIndex],T=Math.max(p.start,g.start),w=Math.min(l.count,Math.min(p.start+p.count,g.start+g.count));for(let b=T,F=w;b<F;b+=3){const P=b,R=b+1,I=b+2;r=xs(this,f,t,i,c,u,h,P,R,I),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const v=Math.max(0,g.start),x=Math.min(l.count,g.start+g.count);for(let p=v,f=x;p<f;p+=3){const T=p,w=p+1,b=p+2;r=xs(this,o,t,i,c,u,h,T,w,b),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function Ld(n,t,e,i,r,s,o,a){let l;if(t.side===on?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===li,a),l===null)return null;vs.copy(a),vs.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(vs);return c<e.near||c>e.far?null:{distance:c,point:vs.clone(),object:n}}function xs(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,ps),n.getVertexPosition(l,ms),n.getVertexPosition(c,_s);const u=Ld(n,t,e,i,ps,ms,_s,$l);if(u){const h=new V;Sn.getBarycoord($l,ps,ms,_s,h),r&&(u.uv=Sn.getInterpolatedAttribute(r,a,l,c,h,new Jt)),s&&(u.uv1=Sn.getInterpolatedAttribute(s,a,l,c,h,new Jt)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,h,new V),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new V,materialIndex:0};Sn.getNormal(ps,ms,_s,d.normal),u.face=d,u.barycoord=h}return u}class $r extends ui{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,g=0;v("z","y","x",-1,-1,i,e,t,o,s,0),v("z","y","x",1,-1,i,e,-t,o,s,1),v("x","z","y",1,1,t,i,e,r,o,2),v("x","z","y",1,-1,t,i,-e,r,o,3),v("x","y","z",1,-1,t,e,i,r,s,4),v("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ui(c,3)),this.setAttribute("normal",new Ui(u,3)),this.setAttribute("uv",new Ui(h,2));function v(x,p,f,T,w,b,F,P,R,I,S){const y=b/R,N=F/I,Y=b/2,X=F/2,et=P/2,lt=R+1,Q=I+1;let dt=0,j=0;const Mt=new V;for(let wt=0;wt<Q;wt++){const Bt=wt*N-X;for(let ee=0;ee<lt;ee++){const ve=ee*y-Y;Mt[x]=ve*T,Mt[p]=Bt*w,Mt[f]=et,c.push(Mt.x,Mt.y,Mt.z),Mt[x]=0,Mt[p]=0,Mt[f]=P>0?1:-1,u.push(Mt.x,Mt.y,Mt.z),h.push(ee/R),h.push(1-wt/I),dt+=1}}for(let wt=0;wt<I;wt++)for(let Bt=0;Bt<R;Bt++){const ee=d+Bt+lt*wt,ve=d+Bt+lt*(wt+1),nt=d+(Bt+1)+lt*(wt+1),mt=d+(Bt+1)+lt*wt;l.push(ee,ve,mt),l.push(ve,nt,mt),j+=6}a.addGroup(g,j,S),g+=j,d+=dt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Mr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Qe(n){const t={};for(let e=0;e<n.length;e++){const i=Mr(n[e]);for(const r in i)t[r]=i[r]}return t}function Ud(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function xu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:me.workingColorSpace}const Id={clone:Mr,merge:Qe};var Nd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends Xr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nd,this.fragmentShader=Fd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mr(t.uniforms),this.uniformsGroups=Ud(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Mu extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new V,ql=new Jt,Yl=new Jt;class mn extends Mu{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=La*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return La*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,ql,Yl),e.subVectors(Yl,ql)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ls*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const nr=-90,ir=1;class Od extends $e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(nr,ir,t,e);r.layers=this.layers,this.add(r);const s=new mn(nr,ir,t,e);s.layers=this.layers,this.add(s);const o=new mn(nr,ir,t,e);o.layers=this.layers,this.add(o);const a=new mn(nr,ir,t,e);a.layers=this.layers,this.add(a);const l=new mn(nr,ir,t,e);l.layers=this.layers,this.add(l);const c=new mn(nr,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===zs)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,d,g),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class yu extends an{constructor(t=[],e=gr,i,r,s,o,a,l,c,u){super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Bd extends Bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new yu(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $r(5,5,5),s=new ci({name:"CubemapFromEquirect",uniforms:Mr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:si});s.uniforms.tEquirect.value=e;const o=new Cn(r,s),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=Rn),new Od(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class Lr extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kd={type:"move"};class Po{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,i),f=this._getHandJoint(c,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),g=.02,v=.005;c.inputState.pinching&&d>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kd)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Lr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class zd extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Do=new V,Hd=new V,Vd=new Qt;class ni{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=Do.subVectors(i,e).cross(Hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Do),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Vd.getNormalMatrix(t),r=this.coplanarPoint(Do).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new ja,Gd=new Jt(.5,.5),Ms=new V;class Ka{constructor(t=new ni,e=new ni,i=new ni,r=new ni,s=new ni,o=new ni){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Gn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],g=r[8],v=r[9],x=r[10],p=r[11],f=r[12],T=r[13],w=r[14],b=r[15];if(i[0].setComponents(l-s,d-c,p-g,b-f).normalize(),i[1].setComponents(l+s,d+c,p+g,b+f).normalize(),i[2].setComponents(l+o,d+u,p+v,b+T).normalize(),i[3].setComponents(l-o,d-u,p-v,b-T).normalize(),i[4].setComponents(l-a,d-h,p-x,b-w).normalize(),e===Gn)i[5].setComponents(l+a,d+h,p+x,b+w).normalize();else if(e===zs)i[5].setComponents(a,h,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){yi.center.set(0,0,0);const e=Gd.distanceTo(t.center);return yi.radius=.7071067811865476+e,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Ms.x=r.normal.x>0?t.max.x:t.min.x,Ms.y=r.normal.y>0?t.max.y:t.min.y,Ms.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Ms)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Su extends an{constructor(t,e,i=Fi,r,s,o,a=Tn,l=Tn,c,u=kr,h=1){if(u!==kr&&u!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:h};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ya(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class $s extends ui{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=t/a,d=e/l,g=[],v=[],x=[],p=[];for(let f=0;f<u;f++){const T=f*d-o;for(let w=0;w<c;w++){const b=w*h-s;v.push(b,-T,0),x.push(0,0,1),p.push(w/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<a;T++){const w=T+c*f,b=T+c*(f+1),F=T+1+c*(f+1),P=T+1+c*f;g.push(w,b,P),g.push(b,F,P)}this.setIndex(g),this.setAttribute("position",new Ui(v,3)),this.setAttribute("normal",new Ui(x,3)),this.setAttribute("uv",new Ui(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.width,t.height,t.widthSegments,t.heightSegments)}}class Wd extends Xr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cu,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xd extends Xr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=td,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class $d extends Xr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Eu extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new _e(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class qd extends Eu{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _e(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Lo=new Ne,jl=new V,Kl=new V;class Yd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(jl),Kl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kl),e.updateMatrixWorld(),Lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class bu extends Mu{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class jd extends Yd{constructor(){super(new bu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zl extends Eu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new jd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Kd extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Jl{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(oe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Zd extends ki{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Ql(n,t,e,i){const r=Jd(i);switch(e){case ru:return n*t;case ou:return n*t/r.components*r.byteLength;case Xa:return n*t/r.components*r.byteLength;case au:return n*t*2/r.components*r.byteLength;case $a:return n*t*2/r.components*r.byteLength;case su:return n*t*3/r.components*r.byteLength;case bn:return n*t*4/r.components*r.byteLength;case qa:return n*t*4/r.components*r.byteLength;case ws:case Rs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Cs:case Ps:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case aa:case ca:return Math.max(n,16)*Math.max(t,8)/4;case oa:case la:return Math.max(n,8)*Math.max(t,8)/2;case ua:case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case da:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case pa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ma:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _a:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case va:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case xa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ya:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ba:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Aa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ds:case wa:case Ra:return Math.ceil(n/4)*Math.ceil(t/4)*16;case lu:case Ca:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Pa:case Da:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jd(n){switch(n){case Pn:case eu:return{byteLength:1,components:1};case Or:case nu:case Gr:return{byteLength:2,components:1};case Ga:case Wa:return{byteLength:2,components:4};case Fi:case Va:case Vn:return{byteLength:4,components:1};case iu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Tu(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Qd(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<h.length;g++){const v=h[d],x=h[g];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++d,h[d]=x)}h.length=d+1;for(let g=0,v=h.length;g<v;g++){const x=h[g];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,op=`#ifdef USE_AOMAP
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
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
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
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dp=`#ifdef USE_IRIDESCENCE
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
#endif`,pp=`#ifdef USE_BUMPMAP
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ep=`#define PI 3.141592653589793
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
} // validated`,bp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tp=`vec3 transformedNormal = objectNormal;
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
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Up=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ip=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
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
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hp=`#ifdef USE_GRADIENTMAP
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
}`,Vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xp=`uniform bool receiveShadow;
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
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zp=`PhysicalMaterial material;
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
#endif`,Jp=`struct PhysicalMaterial {
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
}`,Qp=`
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
#endif`,tm=`#if defined( RE_IndirectDiffuse )
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
#endif`,em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cm=`#if defined( USE_POINTS_UV )
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
#endif`,um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
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
#endif`,_m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sm=`#ifdef USE_NORMALMAP
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
#endif`,Em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bm=`float getShadowMask() {
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
}`,km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zm=`#ifdef USE_SKINNING
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
#endif`,Hm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vm=`#ifdef USE_SKINNING
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
#endif`,Gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$m=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qm=`#ifdef USE_TRANSMISSION
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
#endif`,Ym=`#ifdef USE_TRANSMISSION
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
#endif`,jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,t_=`uniform sampler2D t2D;
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
}`,e_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,i_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s_=`#include <common>
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
}`,o_=`#if DEPTH_PACKING == 3200
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
}`,a_=`#define DISTANCE
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
}`,l_=`#define DISTANCE
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
}`,c_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h_=`uniform float scale;
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
}`,f_=`uniform vec3 diffuse;
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
}`,d_=`#include <common>
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
}`,p_=`uniform vec3 diffuse;
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
}`,m_=`#define LAMBERT
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
}`,__=`#define LAMBERT
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
}`,g_=`#define MATCAP
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
}`,v_=`#define MATCAP
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
}`,x_=`#define NORMAL
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
}`,M_=`#define NORMAL
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
}`,y_=`#define PHONG
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
}`,S_=`#define PHONG
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
}`,E_=`#define STANDARD
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
}`,b_=`#define STANDARD
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
}`,T_=`#define TOON
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
}`,A_=`#define TOON
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
}`,w_=`uniform float size;
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
}`,R_=`uniform vec3 diffuse;
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
}`,C_=`#include <common>
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
}`,P_=`uniform vec3 color;
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
}`,D_=`uniform float rotation;
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
}`,L_=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:tp,alphahash_pars_fragment:ep,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:rp,alphatest_pars_fragment:sp,aomap_fragment:op,aomap_pars_fragment:ap,batching_pars_vertex:lp,batching_vertex:cp,begin_vertex:up,beginnormal_vertex:hp,bsdfs:fp,iridescence_fragment:dp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:_p,clipping_planes_pars_vertex:gp,clipping_planes_vertex:vp,color_fragment:xp,color_pars_fragment:Mp,color_pars_vertex:yp,color_vertex:Sp,common:Ep,cube_uv_reflection_fragment:bp,defaultnormal_vertex:Tp,displacementmap_pars_vertex:Ap,displacementmap_vertex:wp,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Pp,colorspace_pars_fragment:Dp,envmap_fragment:Lp,envmap_common_pars_fragment:Up,envmap_pars_fragment:Ip,envmap_pars_vertex:Np,envmap_physical_pars_fragment:$p,envmap_vertex:Fp,fog_vertex:Op,fog_pars_vertex:Bp,fog_fragment:kp,fog_pars_fragment:zp,gradientmap_pars_fragment:Hp,lightmap_pars_fragment:Vp,lights_lambert_fragment:Gp,lights_lambert_pars_fragment:Wp,lights_pars_begin:Xp,lights_toon_fragment:qp,lights_toon_pars_fragment:Yp,lights_phong_fragment:jp,lights_phong_pars_fragment:Kp,lights_physical_fragment:Zp,lights_physical_pars_fragment:Jp,lights_fragment_begin:Qp,lights_fragment_maps:tm,lights_fragment_end:em,logdepthbuf_fragment:nm,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:rm,logdepthbuf_vertex:sm,map_fragment:om,map_pars_fragment:am,map_particle_fragment:lm,map_particle_pars_fragment:cm,metalnessmap_fragment:um,metalnessmap_pars_fragment:hm,morphinstance_vertex:fm,morphcolor_vertex:dm,morphnormal_vertex:pm,morphtarget_pars_vertex:mm,morphtarget_vertex:_m,normal_fragment_begin:gm,normal_fragment_maps:vm,normal_pars_fragment:xm,normal_pars_vertex:Mm,normal_vertex:ym,normalmap_pars_fragment:Sm,clearcoat_normal_fragment_begin:Em,clearcoat_normal_fragment_maps:bm,clearcoat_pars_fragment:Tm,iridescence_pars_fragment:Am,opaque_fragment:wm,packing:Rm,premultiplied_alpha_fragment:Cm,project_vertex:Pm,dithering_fragment:Dm,dithering_pars_fragment:Lm,roughnessmap_fragment:Um,roughnessmap_pars_fragment:Im,shadowmap_pars_fragment:Nm,shadowmap_pars_vertex:Fm,shadowmap_vertex:Om,shadowmask_pars_fragment:Bm,skinbase_vertex:km,skinning_pars_vertex:zm,skinning_vertex:Hm,skinnormal_vertex:Vm,specularmap_fragment:Gm,specularmap_pars_fragment:Wm,tonemapping_fragment:Xm,tonemapping_pars_fragment:$m,transmission_fragment:qm,transmission_pars_fragment:Ym,uv_pars_fragment:jm,uv_pars_vertex:Km,uv_vertex:Zm,worldpos_vertex:Jm,background_vert:Qm,background_frag:t_,backgroundCube_vert:e_,backgroundCube_frag:n_,cube_vert:i_,cube_frag:r_,depth_vert:s_,depth_frag:o_,distanceRGBA_vert:a_,distanceRGBA_frag:l_,equirect_vert:c_,equirect_frag:u_,linedashed_vert:h_,linedashed_frag:f_,meshbasic_vert:d_,meshbasic_frag:p_,meshlambert_vert:m_,meshlambert_frag:__,meshmatcap_vert:g_,meshmatcap_frag:v_,meshnormal_vert:x_,meshnormal_frag:M_,meshphong_vert:y_,meshphong_frag:S_,meshphysical_vert:E_,meshphysical_frag:b_,meshtoon_vert:T_,meshtoon_frag:A_,points_vert:w_,points_frag:R_,shadow_vert:C_,shadow_frag:P_,sprite_vert:D_,sprite_frag:L_},St={common:{diffuse:{value:new _e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new _e(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},wn={basic:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new _e(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Qe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new _e(0)},specular:{value:new _e(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Qe([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new _e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Qe([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new _e(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Qe([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Qe([St.points,St.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Qe([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Qe([St.common,St.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Qe([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Qe([St.sprite,St.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:Qe([St.common,St.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:Qe([St.lights,St.fog,{color:{value:new _e(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};wn.physical={uniforms:Qe([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new _e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new _e(0)},specularColor:{value:new _e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const ys={r:0,b:0,g:0},Si=new Dn,U_=new Ne;function I_(n,t,e,i,r,s,o){const a=new _e(0);let l=s===!0?0:1,c,u,h=null,d=0,g=null;function v(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?e:t).get(b)),b}function x(w){let b=!1;const F=v(w);F===null?f(a,l):F&&F.isColor&&(f(F,1),b=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(w,b){const F=v(b);F&&(F.isCubeTexture||F.mapping===Xs)?(u===void 0&&(u=new Cn(new $r(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:Mr(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Si.copy(b.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,F.isCubeTexture&&F.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),u.material.uniforms.envMap.value=F,u.material.uniforms.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(U_.makeRotationFromEuler(Si)),u.material.toneMapped=me.getTransfer(F.colorSpace)!==Se,(h!==F||d!==F.version||g!==n.toneMapping)&&(u.material.needsUpdate=!0,h=F,d=F.version,g=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):F&&F.isTexture&&(c===void 0&&(c=new Cn(new $s(2,2),new ci({name:"BackgroundMaterial",uniforms:Mr(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=F,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=me.getTransfer(F.colorSpace)!==Se,F.matrixAutoUpdate===!0&&F.updateMatrix(),c.material.uniforms.uvTransform.value.copy(F.matrix),(h!==F||d!==F.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,h=F,d=F.version,g=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,b){w.getRGB(ys,xu(n)),i.buffers.color.setClear(ys.r,ys.g,ys.b,b,o)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,b=1){a.set(w),l=b,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(a,l)},render:x,addToRenderList:p,dispose:T}}function N_(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(y,N,Y,X,et){let lt=!1;const Q=h(X,Y,N);s!==Q&&(s=Q,c(s.object)),lt=g(y,X,Y,et),lt&&v(y,X,Y,et),et!==null&&t.update(et,n.ELEMENT_ARRAY_BUFFER),(lt||o)&&(o=!1,b(y,N,Y,X),et!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(et).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,N,Y){const X=Y.wireframe===!0;let et=i[y.id];et===void 0&&(et={},i[y.id]=et);let lt=et[N.id];lt===void 0&&(lt={},et[N.id]=lt);let Q=lt[X];return Q===void 0&&(Q=d(l()),lt[X]=Q),Q}function d(y){const N=[],Y=[],X=[];for(let et=0;et<e;et++)N[et]=0,Y[et]=0,X[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:Y,attributeDivisors:X,object:y,attributes:{},index:null}}function g(y,N,Y,X){const et=s.attributes,lt=N.attributes;let Q=0;const dt=Y.getAttributes();for(const j in dt)if(dt[j].location>=0){const wt=et[j];let Bt=lt[j];if(Bt===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(Bt=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(Bt=y.instanceColor)),wt===void 0||wt.attribute!==Bt||Bt&&wt.data!==Bt.data)return!0;Q++}return s.attributesNum!==Q||s.index!==X}function v(y,N,Y,X){const et={},lt=N.attributes;let Q=0;const dt=Y.getAttributes();for(const j in dt)if(dt[j].location>=0){let wt=lt[j];wt===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor));const Bt={};Bt.attribute=wt,wt&&wt.data&&(Bt.data=wt.data),et[j]=Bt,Q++}s.attributes=et,s.attributesNum=Q,s.index=X}function x(){const y=s.newAttributes;for(let N=0,Y=y.length;N<Y;N++)y[N]=0}function p(y){f(y,0)}function f(y,N){const Y=s.newAttributes,X=s.enabledAttributes,et=s.attributeDivisors;Y[y]=1,X[y]===0&&(n.enableVertexAttribArray(y),X[y]=1),et[y]!==N&&(n.vertexAttribDivisor(y,N),et[y]=N)}function T(){const y=s.newAttributes,N=s.enabledAttributes;for(let Y=0,X=N.length;Y<X;Y++)N[Y]!==y[Y]&&(n.disableVertexAttribArray(Y),N[Y]=0)}function w(y,N,Y,X,et,lt,Q){Q===!0?n.vertexAttribIPointer(y,N,Y,et,lt):n.vertexAttribPointer(y,N,Y,X,et,lt)}function b(y,N,Y,X){x();const et=X.attributes,lt=Y.getAttributes(),Q=N.defaultAttributeValues;for(const dt in lt){const j=lt[dt];if(j.location>=0){let Mt=et[dt];if(Mt===void 0&&(dt==="instanceMatrix"&&y.instanceMatrix&&(Mt=y.instanceMatrix),dt==="instanceColor"&&y.instanceColor&&(Mt=y.instanceColor)),Mt!==void 0){const wt=Mt.normalized,Bt=Mt.itemSize,ee=t.get(Mt);if(ee===void 0)continue;const ve=ee.buffer,nt=ee.type,mt=ee.bytesPerElement,Nt=nt===n.INT||nt===n.UNSIGNED_INT||Mt.gpuType===Va;if(Mt.isInterleavedBufferAttribute){const Et=Mt.data,Ft=Et.stride,he=Mt.offset;if(Et.isInstancedInterleavedBuffer){for(let Wt=0;Wt<j.locationSize;Wt++)f(j.location+Wt,Et.meshPerAttribute);y.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Et.meshPerAttribute*Et.count)}else for(let Wt=0;Wt<j.locationSize;Wt++)p(j.location+Wt);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let Wt=0;Wt<j.locationSize;Wt++)w(j.location+Wt,Bt/j.locationSize,nt,wt,Ft*mt,(he+Bt/j.locationSize*Wt)*mt,Nt)}else{if(Mt.isInstancedBufferAttribute){for(let Et=0;Et<j.locationSize;Et++)f(j.location+Et,Mt.meshPerAttribute);y.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Et=0;Et<j.locationSize;Et++)p(j.location+Et);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let Et=0;Et<j.locationSize;Et++)w(j.location+Et,Bt/j.locationSize,nt,wt,Bt*mt,Bt/j.locationSize*Et*mt,Nt)}}else if(Q!==void 0){const wt=Q[dt];if(wt!==void 0)switch(wt.length){case 2:n.vertexAttrib2fv(j.location,wt);break;case 3:n.vertexAttrib3fv(j.location,wt);break;case 4:n.vertexAttrib4fv(j.location,wt);break;default:n.vertexAttrib1fv(j.location,wt)}}}}T()}function F(){I();for(const y in i){const N=i[y];for(const Y in N){const X=N[Y];for(const et in X)u(X[et].object),delete X[et];delete N[Y]}delete i[y]}}function P(y){if(i[y.id]===void 0)return;const N=i[y.id];for(const Y in N){const X=N[Y];for(const et in X)u(X[et].object),delete X[et];delete N[Y]}delete i[y.id]}function R(y){for(const N in i){const Y=i[N];if(Y[y.id]===void 0)continue;const X=Y[y.id];for(const et in X)u(X[et].object),delete X[et];delete Y[y.id]}}function I(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:F,releaseStatesOfGeometry:P,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:p,disableUnusedAttributes:T}}function F_(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v];e.update(g,i,1)}function l(c,u,h,d){if(h===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<c.length;v++)o(c[v],u[v],d[v]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,h);let v=0;for(let x=0;x<h;x++)v+=u[x]*d[x];e.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function O_(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==bn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const I=R===Gr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Pn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Vn&&!I)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),F=v>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:F,maxSamples:P}}function B_(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new ni,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const g=h.length!==0||d||i!==0||r;return r=d,i=h.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,g){const v=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,f=n.get(h);if(!r||v===null||v.length===0||s&&!p)s?u(null):c();else{const T=s?0:i,w=T*4;let b=f.clippingState||null;l.value=b,b=u(v,d,w,g);for(let F=0;F!==w;++F)b[F]=e[F];f.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,d,g,v){const x=h!==null?h.length:0;let p=null;if(x!==0){if(p=l.value,v!==!0||p===null){const f=g+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(p===null||p.length<f)&&(p=new Float32Array(f));for(let w=0,b=g;w!==x;++w,b+=4)o.copy(h[w]).applyMatrix4(T,a),o.normal.toArray(p,b),p[b+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function k_(n){let t=new WeakMap;function e(o,a){return a===na?o.mapping=gr:a===ia&&(o.mapping=vr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===na||a===ia)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Bd(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const lr=4,tc=[.125,.215,.35,.446,.526,.582],wi=20,Uo=new bu,ec=new _e;let Io=null,No=0,Fo=0,Oo=!1;const Ti=(1+Math.sqrt(5))/2,rr=1/Ti,nc=[new V(-Ti,rr,0),new V(Ti,rr,0),new V(-rr,0,Ti),new V(rr,0,Ti),new V(0,Ti,-rr),new V(0,Ti,rr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],z_=new V;class ic{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=z_}=s;Io=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Io,No,Fo),this._renderer.xr.enabled=Oo,t.scissorTest=!1,Ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gr||t.mapping===vr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Io=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Gr,format:bn,colorSpace:xr,depthBuffer:!1},r=rc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=H_(s)),this._blurMaterial=V_(s,t,e)}return r}_compileMaterial(t){const e=new Cn(this._lodPlanes[0],t);this._renderer.compile(e,Uo)}_sceneToCubeUV(t,e,i,r,s){const l=new mn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,g=h.toneMapping;h.getClearColor(ec),h.toneMapping=oi,h.autoClear=!1;const v=new _u({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),x=new Cn(new $r,v);let p=!1;const f=t.background;f?f.isColor&&(v.color.copy(f),t.background=null,p=!0):(v.color.copy(ec),p=!0);for(let T=0;T<6;T++){const w=T%3;w===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[T],s.y,s.z)):w===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[T]));const b=this._cubeSize;Ss(r,w*b,T>2?b:0,b,b),h.setRenderTarget(r),p&&h.render(x,l),h.render(t,l)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=g,h.autoClear=d,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===gr||t.mapping===vr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Cn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Ss(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Uo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=nc[(r-s-1)%nc.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Cn(this._lodPlanes[r],c),d=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*wi-1),x=s/v,p=isFinite(s)?1+Math.floor(u*x):wi;p>wi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${wi}`);const f=[];let T=0;for(let R=0;R<wi;++R){const I=R/x,S=Math.exp(-I*I/2);f.push(S),R===0?T+=S:R<p&&(T+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/T;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:w}=this;d.dTheta.value=v,d.mipInt.value=w-i;const b=this._sizeLods[r],F=3*b*(r>w-lr?r-w+lr:0),P=4*(this._cubeSize-b);Ss(e,F,P,3*b,2*b),l.setRenderTarget(e),l.render(h,Uo)}}function H_(n){const t=[],e=[],i=[];let r=n;const s=n-lr+1+tc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-lr?l=tc[o-n+lr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],g=6,v=6,x=3,p=2,f=1,T=new Float32Array(x*v*g),w=new Float32Array(p*v*g),b=new Float32Array(f*v*g);for(let P=0;P<g;P++){const R=P%3*2/3-1,I=P>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];T.set(S,x*v*P),w.set(d,p*v*P);const y=[P,P,P,P,P,P];b.set(y,f*v*P)}const F=new ui;F.setAttribute("position",new hn(T,x)),F.setAttribute("uv",new hn(w,p)),F.setAttribute("faceIndex",new hn(b,f)),t.push(F),r>lr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function rc(n,t,e){const i=new Bi(n,t,e);return i.texture.mapping=Xs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ss(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function V_(n,t,e){const i=new Float32Array(wi),r=new V(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Za(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function sc(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function oc(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}function G_(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===na||l===ia,u=l===gr||l===vr;if(c||u){let h=t.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ic(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const g=a.image;return c&&g&&g.height>0||u&&g&&r(g)?(e===null&&(e=new ic(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function W_(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&hr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function X_(n,t,e,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const v in d.attributes)t.remove(d.attributes[v]);d.removeEventListener("dispose",o),delete r[d.id];const g=s.get(d);g&&(t.remove(g),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(h){const d=h.attributes;for(const g in d)t.update(d[g],n.ARRAY_BUFFER)}function c(h){const d=[],g=h.index,v=h.attributes.position;let x=0;if(g!==null){const T=g.array;x=g.version;for(let w=0,b=T.length;w<b;w+=3){const F=T[w+0],P=T[w+1],R=T[w+2];d.push(F,P,P,R,R,F)}}else if(v!==void 0){const T=v.array;x=v.version;for(let w=0,b=T.length/3-1;w<b;w+=3){const F=w+0,P=w+1,R=w+2;d.push(F,P,P,R,R,F)}}else return;const p=new(hu(d)?vu:gu)(d,1);p.version=x;const f=s.get(h);f&&t.remove(f),s.set(h,p)}function u(h){const d=s.get(h);if(d){const g=h.index;g!==null&&d.version<g.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function $_(n,t,e){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,g){n.drawElements(i,g,s,d*o),e.update(g,i,1)}function c(d,g,v){v!==0&&(n.drawElementsInstanced(i,g,s,d*o,v),e.update(g,i,v))}function u(d,g,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,s,d,0,v);let p=0;for(let f=0;f<v;f++)p+=g[f];e.update(p,i,1)}function h(d,g,v,x){if(v===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)c(d[f]/o,g[f],x[f]);else{p.multiDrawElementsInstancedWEBGL(i,g,0,s,d,0,x,0,v);let f=0;for(let T=0;T<v;T++)f+=g[T]*x[T];e.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function q_(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function Y_(n,t,e){const i=new WeakMap,r=new Ie;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let S=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let w=0;g===!0&&(w=1),v===!0&&(w=2),x===!0&&(w=3);let b=a.attributes.position.count*w,F=1;b>t.maxTextureSize&&(F=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const P=new Float32Array(b*F*4*h),R=new fu(P,b,F,h);R.type=Vn,R.needsUpdate=!0;const I=w*4;for(let y=0;y<h;y++){const N=p[y],Y=f[y],X=T[y],et=b*F*4*y;for(let lt=0;lt<N.count;lt++){const Q=lt*I;g===!0&&(r.fromBufferAttribute(N,lt),P[et+Q+0]=r.x,P[et+Q+1]=r.y,P[et+Q+2]=r.z,P[et+Q+3]=0),v===!0&&(r.fromBufferAttribute(Y,lt),P[et+Q+4]=r.x,P[et+Q+5]=r.y,P[et+Q+6]=r.z,P[et+Q+7]=0),x===!0&&(r.fromBufferAttribute(X,lt),P[et+Q+8]=r.x,P[et+Q+9]=r.y,P[et+Q+10]=r.z,P[et+Q+11]=X.itemSize===4?r.w:1)}}d={count:h,texture:R,size:new Jt(b,F)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let x=0;x<c.length;x++)g+=c[x];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function j_(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const Au=new an,ac=new Su(1,1),wu=new fu,Ru=new yd,Cu=new yu,lc=[],cc=[],uc=new Float32Array(16),hc=new Float32Array(9),fc=new Float32Array(4);function Er(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=lc[r];if(s===void 0&&(s=new Float32Array(r),lc[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Be(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ke(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function qs(n,t){let e=cc[t];e===void 0&&(e=new Int32Array(t),cc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function K_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Z_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2fv(this.addr,t),ke(e,t)}}function J_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;n.uniform3fv(this.addr,t),ke(e,t)}}function Q_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4fv(this.addr,t),ke(e,t)}}function tg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;fc.set(i),n.uniformMatrix2fv(this.addr,!1,fc),ke(e,i)}}function eg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;hc.set(i),n.uniformMatrix3fv(this.addr,!1,hc),ke(e,i)}}function ng(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Be(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Be(e,i))return;uc.set(i),n.uniformMatrix4fv(this.addr,!1,uc),ke(e,i)}}function ig(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function rg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2iv(this.addr,t),ke(e,t)}}function sg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3iv(this.addr,t),ke(e,t)}}function og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4iv(this.addr,t),ke(e,t)}}function ag(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;n.uniform2uiv(this.addr,t),ke(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;n.uniform3uiv(this.addr,t),ke(e,t)}}function ug(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;n.uniform4uiv(this.addr,t),ke(e,t)}}function hg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ac.compareFunction=uu,s=ac):s=Au,e.setTexture2D(t||s,r)}function fg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Ru,r)}function dg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Cu,r)}function pg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||wu,r)}function mg(n){switch(n){case 5126:return K_;case 35664:return Z_;case 35665:return J_;case 35666:return Q_;case 35674:return tg;case 35675:return eg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return rg;case 35668:case 35672:return sg;case 35669:case 35673:return og;case 5125:return ag;case 36294:return lg;case 36295:return cg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return dg;case 36289:case 36303:case 36311:case 36292:return pg}}function _g(n,t){n.uniform1fv(this.addr,t)}function gg(n,t){const e=Er(t,this.size,2);n.uniform2fv(this.addr,e)}function vg(n,t){const e=Er(t,this.size,3);n.uniform3fv(this.addr,e)}function xg(n,t){const e=Er(t,this.size,4);n.uniform4fv(this.addr,e)}function Mg(n,t){const e=Er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function yg(n,t){const e=Er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Sg(n,t){const e=Er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Eg(n,t){n.uniform1iv(this.addr,t)}function bg(n,t){n.uniform2iv(this.addr,t)}function Tg(n,t){n.uniform3iv(this.addr,t)}function Ag(n,t){n.uniform4iv(this.addr,t)}function wg(n,t){n.uniform1uiv(this.addr,t)}function Rg(n,t){n.uniform2uiv(this.addr,t)}function Cg(n,t){n.uniform3uiv(this.addr,t)}function Pg(n,t){n.uniform4uiv(this.addr,t)}function Dg(n,t,e){const i=this.cache,r=t.length,s=qs(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Au,s[o])}function Lg(n,t,e){const i=this.cache,r=t.length,s=qs(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Ru,s[o])}function Ug(n,t,e){const i=this.cache,r=t.length,s=qs(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Cu,s[o])}function Ig(n,t,e){const i=this.cache,r=t.length,s=qs(e,r);Be(i,s)||(n.uniform1iv(this.addr,s),ke(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||wu,s[o])}function Ng(n){switch(n){case 5126:return _g;case 35664:return gg;case 35665:return vg;case 35666:return xg;case 35674:return Mg;case 35675:return yg;case 35676:return Sg;case 5124:case 35670:return Eg;case 35667:case 35671:return bg;case 35668:case 35672:return Tg;case 35669:case 35673:return Ag;case 5125:return wg;case 36294:return Rg;case 36295:return Cg;case 36296:return Pg;case 35678:case 36198:case 36298:case 36306:case 35682:return Dg;case 35679:case 36299:case 36307:return Lg;case 35680:case 36300:case 36308:case 36293:return Ug;case 36289:case 36303:case 36311:case 36292:return Ig}}class Fg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=mg(e.type)}}class Og{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ng(e.type)}}class Bg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Bo=/(\w+)(\])?(\[|\.)?/g;function dc(n,t){n.seq.push(t),n.map[t.id]=t}function kg(n,t,e){const i=n.name,r=i.length;for(Bo.lastIndex=0;;){const s=Bo.exec(i),o=Bo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){dc(e,c===void 0?new Fg(a,n,t):new Og(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Bg(a),dc(e,h)),e=h}}}class Us{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);kg(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function pc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const zg=37297;let Hg=0;function Vg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const mc=new Qt;function Gg(n){me._getMatrix(mc,me.workingColorSpace,n);const t=`mat3( ${mc.elements.map(e=>e.toFixed(4))} )`;switch(me.getTransfer(n)){case ks:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function _c(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Vg(n.getShaderSource(t),o)}else return r}function Wg(n,t){const e=Gg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xg(n,t){let e;switch(t){case $f:e="Linear";break;case qf:e="Reinhard";break;case Yf:e="Cineon";break;case jf:e="ACESFilmic";break;case Zf:e="AgX";break;case Jf:e="Neutral";break;case Kf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Es=new V;function $g(){me.getLuminanceCoefficients(Es);const n=Es.x.toFixed(4),t=Es.y.toFixed(4),e=Es.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function Yg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function jg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ur(n){return n!==""}function gc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ua(n){return n.replace(Kg,Jg)}const Zg=new Map;function Jg(n,t){let e=te[t];if(e===void 0){const i=Zg.get(t);if(i!==void 0)e=te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ua(e)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xc(n){return n.replace(Qg,t0)}function t0(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Mc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function e0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Jc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function n0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gr:case vr:t="ENVMAP_TYPE_CUBE";break;case Xs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function i0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case vr:t="ENVMAP_MODE_REFRACTION";break}return t}function r0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Qc:t="ENVMAP_BLENDING_MULTIPLY";break;case Wf:t="ENVMAP_BLENDING_MIX";break;case Xf:t="ENVMAP_BLENDING_ADD";break}return t}function s0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function o0(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=e0(e),c=n0(e),u=i0(e),h=r0(e),d=s0(e),g=qg(e),v=Yg(s),x=r.createProgram();let p,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ur).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ur).join(`
`),f.length>0&&(f+=`
`)):(p=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),f=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?te.tonemapping_pars_fragment:"",e.toneMapping!==oi?Xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Wg("linearToOutputTexel",e.outputColorSpace),$g(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ur).join(`
`)),o=Ua(o),o=gc(o,e),o=vc(o,e),a=Ua(a),a=gc(a,e),a=vc(a,e),o=xc(o),a=xc(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=T+p+o,b=T+f+a,F=pc(r,r.VERTEX_SHADER,w),P=pc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,F),r.attachShader(x,P),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(N){if(n.debug.checkShaderErrors){const Y=r.getProgramInfoLog(x).trim(),X=r.getShaderInfoLog(F).trim(),et=r.getShaderInfoLog(P).trim();let lt=!0,Q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(lt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,F,P);else{const dt=_c(r,F,"vertex"),j=_c(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+Y+`
`+dt+`
`+j)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||et==="")&&(Q=!1);Q&&(N.diagnostics={runnable:lt,programLog:Y,vertexShader:{log:X,prefix:p},fragmentShader:{log:et,prefix:f}})}r.deleteShader(F),r.deleteShader(P),I=new Us(r,x),S=jg(r,x)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,zg)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=F,this.fragmentShader=P,this}let a0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new c0(t),e.set(t,i)),i}}class c0{constructor(t){this.id=a0++,this.code=t,this.usedTimes=0}}function u0(n,t,e,i,r,s,o){const a=new pu,l=new l0,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,y,N,Y,X){const et=Y.fog,lt=X.geometry,Q=S.isMeshStandardMaterial?Y.environment:null,dt=(S.isMeshStandardMaterial?e:t).get(S.envMap||Q),j=dt&&dt.mapping===Xs?dt.image.height:null,Mt=v[S.type];S.precision!==null&&(g=r.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));const wt=lt.morphAttributes.position||lt.morphAttributes.normal||lt.morphAttributes.color,Bt=wt!==void 0?wt.length:0;let ee=0;lt.morphAttributes.position!==void 0&&(ee=1),lt.morphAttributes.normal!==void 0&&(ee=2),lt.morphAttributes.color!==void 0&&(ee=3);let ve,nt,mt,Nt;if(Mt){const pe=wn[Mt];ve=pe.vertexShader,nt=pe.fragmentShader}else ve=S.vertexShader,nt=S.fragmentShader,l.update(S),mt=l.getVertexShaderID(S),Nt=l.getFragmentShaderID(S);const Et=n.getRenderTarget(),Ft=n.state.buffers.depth.getReversed(),he=X.isInstancedMesh===!0,Wt=X.isBatchedMesh===!0,Te=!!S.map,Re=!!S.matcap,jt=!!dt,U=!!S.aoMap,Ge=!!S.lightMap,fe=!!S.bumpMap,xe=!!S.normalMap,Lt=!!S.displacementMap,re=!!S.emissiveMap,kt=!!S.metalnessMap,Kt=!!S.roughnessMap,Ae=S.anisotropy>0,C=S.clearcoat>0,M=S.dispersion>0,G=S.iridescence>0,tt=S.sheen>0,st=S.transmission>0,Z=Ae&&!!S.anisotropyMap,gt=C&&!!S.clearcoatMap,_t=C&&!!S.clearcoatNormalMap,ft=C&&!!S.clearcoatRoughnessMap,It=G&&!!S.iridescenceMap,it=G&&!!S.iridescenceThicknessMap,Rt=tt&&!!S.sheenColorMap,Gt=tt&&!!S.sheenRoughnessMap,Vt=!!S.specularMap,vt=!!S.specularColorMap,$t=!!S.specularIntensityMap,O=st&&!!S.transmissionMap,yt=st&&!!S.thicknessMap,ct=!!S.gradientMap,Ct=!!S.alphaMap,ut=S.alphaTest>0,ot=!!S.alphaHash,Pt=!!S.extensions;let qt=oi;S.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(qt=n.toneMapping);const Me={shaderID:Mt,shaderType:S.type,shaderName:S.name,vertexShader:ve,fragmentShader:nt,defines:S.defines,customVertexShaderID:mt,customFragmentShaderID:Nt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Wt,batchingColor:Wt&&X._colorsTexture!==null,instancing:he,instancingColor:he&&X.instanceColor!==null,instancingMorph:he&&X.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Et===null?n.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:xr,alphaToCoverage:!!S.alphaToCoverage,map:Te,matcap:Re,envMap:jt,envMapMode:jt&&dt.mapping,envMapCubeUVHeight:j,aoMap:U,lightMap:Ge,bumpMap:fe,normalMap:xe,displacementMap:d&&Lt,emissiveMap:re,normalMapObjectSpace:xe&&S.normalMapType===nd,normalMapTangentSpace:xe&&S.normalMapType===cu,metalnessMap:kt,roughnessMap:Kt,anisotropy:Ae,anisotropyMap:Z,clearcoat:C,clearcoatMap:gt,clearcoatNormalMap:_t,clearcoatRoughnessMap:ft,dispersion:M,iridescence:G,iridescenceMap:It,iridescenceThicknessMap:it,sheen:tt,sheenColorMap:Rt,sheenRoughnessMap:Gt,specularMap:Vt,specularColorMap:vt,specularIntensityMap:$t,transmission:st,transmissionMap:O,thicknessMap:yt,gradientMap:ct,opaque:S.transparent===!1&&S.blending===ur&&S.alphaToCoverage===!1,alphaMap:Ct,alphaTest:ut,alphaHash:ot,combine:S.combine,mapUv:Te&&x(S.map.channel),aoMapUv:U&&x(S.aoMap.channel),lightMapUv:Ge&&x(S.lightMap.channel),bumpMapUv:fe&&x(S.bumpMap.channel),normalMapUv:xe&&x(S.normalMap.channel),displacementMapUv:Lt&&x(S.displacementMap.channel),emissiveMapUv:re&&x(S.emissiveMap.channel),metalnessMapUv:kt&&x(S.metalnessMap.channel),roughnessMapUv:Kt&&x(S.roughnessMap.channel),anisotropyMapUv:Z&&x(S.anisotropyMap.channel),clearcoatMapUv:gt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:_t&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:it&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&x(S.sheenRoughnessMap.channel),specularMapUv:Vt&&x(S.specularMap.channel),specularColorMapUv:vt&&x(S.specularColorMap.channel),specularIntensityMapUv:$t&&x(S.specularIntensityMap.channel),transmissionMapUv:O&&x(S.transmissionMap.channel),thicknessMapUv:yt&&x(S.thicknessMap.channel),alphaMapUv:Ct&&x(S.alphaMap.channel),vertexTangents:!!lt.attributes.tangent&&(xe||Ae),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!lt.attributes.color&&lt.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!lt.attributes.uv&&(Te||Ct),fog:!!et,useFog:S.fog===!0,fogExp2:!!et&&et.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ft,skinning:X.isSkinnedMesh===!0,morphTargets:lt.morphAttributes.position!==void 0,morphNormals:lt.morphAttributes.normal!==void 0,morphColors:lt.morphAttributes.color!==void 0,morphTargetsCount:Bt,morphTextureStride:ee,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:qt,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&me.getTransfer(S.map.colorSpace)===Se,decodeVideoTextureEmissive:re&&S.emissiveMap.isVideoTexture===!0&&me.getTransfer(S.emissiveMap.colorSpace)===Se,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===zn,flipSided:S.side===on,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Pt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&S.extensions.multiDraw===!0||Wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function f(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)y.push(N),y.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(T(y,S),w(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function T(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function w(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function b(S){const y=v[S.type];let N;if(y){const Y=wn[y];N=Id.clone(Y.uniforms)}else N=S.uniforms;return N}function F(S,y){let N;for(let Y=0,X=u.length;Y<X;Y++){const et=u[Y];if(et.cacheKey===y){N=et,++N.usedTimes;break}}return N===void 0&&(N=new o0(n,y,S,s),u.push(N)),N}function P(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:b,acquireProgram:F,releaseProgram:P,releaseShaderCache:R,programs:u,dispose:I}}function h0(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function f0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function yc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Sc(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,d,g,v,x,p){let f=n[t];return f===void 0?(f={id:h.id,object:h,geometry:d,material:g,groupOrder:v,renderOrder:h.renderOrder,z:x,group:p},n[t]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=g,f.groupOrder=v,f.renderOrder=h.renderOrder,f.z=x,f.group=p),t++,f}function a(h,d,g,v,x,p){const f=o(h,d,g,v,x,p);g.transmission>0?i.push(f):g.transparent===!0?r.push(f):e.push(f)}function l(h,d,g,v,x,p){const f=o(h,d,g,v,x,p);g.transmission>0?i.unshift(f):g.transparent===!0?r.unshift(f):e.unshift(f)}function c(h,d){e.length>1&&e.sort(h||f0),i.length>1&&i.sort(d||yc),r.length>1&&r.sort(d||yc)}function u(){for(let h=t,d=n.length;h<d;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function d0(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new Sc,n.set(i,[o])):r>=s.length?(o=new Sc,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function p0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new _e};break;case"SpotLight":e={position:new V,direction:new V,color:new _e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new _e,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new _e,groundColor:new _e};break;case"RectAreaLight":e={color:new _e,position:new V,halfWidth:new V,halfHeight:new V};break}return n[t.id]=e,e}}}function m0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let _0=0;function g0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function v0(n){const t=new p0,e=m0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const r=new V,s=new Ne,o=new Ne;function a(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let g=0,v=0,x=0,p=0,f=0,T=0,w=0,b=0,F=0,P=0,R=0;c.sort(g0);for(let S=0,y=c.length;S<y;S++){const N=c[S],Y=N.color,X=N.intensity,et=N.distance,lt=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=Y.r*X,h+=Y.g*X,d+=Y.b*X;else if(N.isLightProbe){for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(N.sh.coefficients[Q],X);R++}else if(N.isDirectionalLight){const Q=t.get(N);if(Q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const dt=N.shadow,j=e.get(N);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=lt,i.directionalShadowMatrix[g]=N.shadow.matrix,T++}i.directional[g]=Q,g++}else if(N.isSpotLight){const Q=t.get(N);Q.position.setFromMatrixPosition(N.matrixWorld),Q.color.copy(Y).multiplyScalar(X),Q.distance=et,Q.coneCos=Math.cos(N.angle),Q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Q.decay=N.decay,i.spot[x]=Q;const dt=N.shadow;if(N.map&&(i.spotLightMap[F]=N.map,F++,dt.updateMatrices(N),N.castShadow&&P++),i.spotLightMatrix[x]=dt.matrix,N.castShadow){const j=e.get(N);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,i.spotShadow[x]=j,i.spotShadowMap[x]=lt,b++}x++}else if(N.isRectAreaLight){const Q=t.get(N);Q.color.copy(Y).multiplyScalar(X),Q.halfWidth.set(N.width*.5,0,0),Q.halfHeight.set(0,N.height*.5,0),i.rectArea[p]=Q,p++}else if(N.isPointLight){const Q=t.get(N);if(Q.color.copy(N.color).multiplyScalar(N.intensity),Q.distance=N.distance,Q.decay=N.decay,N.castShadow){const dt=N.shadow,j=e.get(N);j.shadowIntensity=dt.intensity,j.shadowBias=dt.bias,j.shadowNormalBias=dt.normalBias,j.shadowRadius=dt.radius,j.shadowMapSize=dt.mapSize,j.shadowCameraNear=dt.camera.near,j.shadowCameraFar=dt.camera.far,i.pointShadow[v]=j,i.pointShadowMap[v]=lt,i.pointShadowMatrix[v]=N.shadow.matrix,w++}i.point[v]=Q,v++}else if(N.isHemisphereLight){const Q=t.get(N);Q.skyColor.copy(N.color).multiplyScalar(X),Q.groundColor.copy(N.groundColor).multiplyScalar(X),i.hemi[f]=Q,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==g||I.pointLength!==v||I.spotLength!==x||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==T||I.numPointShadows!==w||I.numSpotShadows!==b||I.numSpotMaps!==F||I.numLightProbes!==R)&&(i.directional.length=g,i.spot.length=x,i.rectArea.length=p,i.point.length=v,i.hemi.length=f,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+F-P,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=R,I.directionalLength=g,I.pointLength=v,I.spotLength=x,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=T,I.numPointShadows=w,I.numSpotShadows=b,I.numSpotMaps=F,I.numLightProbes=R,i.version=_0++)}function l(c,u){let h=0,d=0,g=0,v=0,x=0;const p=u.matrixWorldInverse;for(let f=0,T=c.length;f<T;f++){const w=c[f];if(w.isDirectionalLight){const b=i.directional[h];b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),h++}else if(w.isSpotLight){const b=i.spot[g];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(p),g++}else if(w.isRectAreaLight){const b=i.rectArea[v];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),o.identity(),s.copy(w.matrixWorld),s.premultiply(p),o.extractRotation(s),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(p),d++}else if(w.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(p),x++}}}return{setup:a,setupView:l,state:i}}function Ec(n){const t=new v0(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function x0(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Ec(n),t.set(r,[a])):s>=o.length?(a=new Ec(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const M0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y0=`uniform sampler2D shadow_pass;
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
}`;function S0(n,t,e){let i=new Ka;const r=new Jt,s=new Jt,o=new Ie,a=new Xd({depthPacking:ed}),l=new $d,c={},u=e.maxTextureSize,h={[li]:on,[on]:li,[zn]:zn},d=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:M0,fragmentShader:y0}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const v=new ui;v.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Cn(v,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jc;let f=this.type;this.render=function(P,R,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;const S=n.getRenderTarget(),y=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(si),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const X=f!==kn&&this.type===kn,et=f===kn&&this.type!==kn;for(let lt=0,Q=P.length;lt<Q;lt++){const dt=P[lt],j=dt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",dt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const Mt=j.getFrameExtents();if(r.multiply(Mt),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Mt.x),r.x=s.x*Mt.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Mt.y),r.y=s.y*Mt.y,j.mapSize.y=s.y)),j.map===null||X===!0||et===!0){const Bt=this.type!==kn?{minFilter:Tn,magFilter:Tn}:{};j.map!==null&&j.map.dispose(),j.map=new Bi(r.x,r.y,Bt),j.map.texture.name=dt.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const wt=j.getViewportCount();for(let Bt=0;Bt<wt;Bt++){const ee=j.getViewport(Bt);o.set(s.x*ee.x,s.y*ee.y,s.x*ee.z,s.y*ee.w),Y.viewport(o),j.updateMatrices(dt,Bt),i=j.getFrustum(),b(R,I,j.camera,dt,this.type)}j.isPointLightShadow!==!0&&this.type===kn&&T(j,I),j.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,y,N)};function T(P,R){const I=t.update(x);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,g.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Bi(r.x,r.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(R,null,I,d,x,null),g.uniforms.shadow_pass.value=P.mapPass.texture,g.uniforms.resolution.value=P.mapSize,g.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(R,null,I,g,x,null)}function w(P,R,I,S){let y=null;const N=I.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(N!==void 0)y=N;else if(y=I.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const Y=y.uuid,X=R.uuid;let et=c[Y];et===void 0&&(et={},c[Y]=et);let lt=et[X];lt===void 0&&(lt=y.clone(),et[X]=lt,R.addEventListener("dispose",F)),y=lt}if(y.visible=R.visible,y.wireframe=R.wireframe,S===kn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const Y=n.properties.get(y);Y.light=I}return y}function b(P,R,I,S,y){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&y===kn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,P.matrixWorld);const X=t.update(P),et=P.material;if(Array.isArray(et)){const lt=X.groups;for(let Q=0,dt=lt.length;Q<dt;Q++){const j=lt[Q],Mt=et[j.materialIndex];if(Mt&&Mt.visible){const wt=w(P,Mt,S,y);P.onBeforeShadow(n,P,R,I,X,wt,j),n.renderBufferDirect(I,null,X,wt,P,j),P.onAfterShadow(n,P,R,I,X,wt,j)}}}else if(et.visible){const lt=w(P,et,S,y);P.onBeforeShadow(n,P,R,I,X,lt,null),n.renderBufferDirect(I,null,X,lt,P,null),P.onAfterShadow(n,P,R,I,X,lt,null)}}const Y=P.children;for(let X=0,et=Y.length;X<et;X++)b(Y[X],R,I,S,y)}function F(P){P.target.removeEventListener("dispose",F);for(const I in c){const S=c[I],y=P.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const E0={[jo]:Ko,[Zo]:ta,[Jo]:ea,[_r]:Qo,[Ko]:jo,[ta]:Zo,[ea]:Jo,[Qo]:_r};function b0(n,t){function e(){let O=!1;const yt=new Ie;let ct=null;const Ct=new Ie(0,0,0,0);return{setMask:function(ut){ct!==ut&&!O&&(n.colorMask(ut,ut,ut,ut),ct=ut)},setLocked:function(ut){O=ut},setClear:function(ut,ot,Pt,qt,Me){Me===!0&&(ut*=qt,ot*=qt,Pt*=qt),yt.set(ut,ot,Pt,qt),Ct.equals(yt)===!1&&(n.clearColor(ut,ot,Pt,qt),Ct.copy(yt))},reset:function(){O=!1,ct=null,Ct.set(-1,0,0,0)}}}function i(){let O=!1,yt=!1,ct=null,Ct=null,ut=null;return{setReversed:function(ot){if(yt!==ot){const Pt=t.get("EXT_clip_control");ot?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),yt=ot;const qt=ut;ut=null,this.setClear(qt)}},getReversed:function(){return yt},setTest:function(ot){ot?Et(n.DEPTH_TEST):Ft(n.DEPTH_TEST)},setMask:function(ot){ct!==ot&&!O&&(n.depthMask(ot),ct=ot)},setFunc:function(ot){if(yt&&(ot=E0[ot]),Ct!==ot){switch(ot){case jo:n.depthFunc(n.NEVER);break;case Ko:n.depthFunc(n.ALWAYS);break;case Zo:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case Jo:n.depthFunc(n.EQUAL);break;case Qo:n.depthFunc(n.GEQUAL);break;case ta:n.depthFunc(n.GREATER);break;case ea:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ct=ot}},setLocked:function(ot){O=ot},setClear:function(ot){ut!==ot&&(yt&&(ot=1-ot),n.clearDepth(ot),ut=ot)},reset:function(){O=!1,ct=null,Ct=null,ut=null,yt=!1}}}function r(){let O=!1,yt=null,ct=null,Ct=null,ut=null,ot=null,Pt=null,qt=null,Me=null;return{setTest:function(pe){O||(pe?Et(n.STENCIL_TEST):Ft(n.STENCIL_TEST))},setMask:function(pe){yt!==pe&&!O&&(n.stencilMask(pe),yt=pe)},setFunc:function(pe,We,gn){(ct!==pe||Ct!==We||ut!==gn)&&(n.stencilFunc(pe,We,gn),ct=pe,Ct=We,ut=gn)},setOp:function(pe,We,gn){(ot!==pe||Pt!==We||qt!==gn)&&(n.stencilOp(pe,We,gn),ot=pe,Pt=We,qt=gn)},setLocked:function(pe){O=pe},setClear:function(pe){Me!==pe&&(n.clearStencil(pe),Me=pe)},reset:function(){O=!1,yt=null,ct=null,Ct=null,ut=null,ot=null,Pt=null,qt=null,Me=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,g=[],v=null,x=!1,p=null,f=null,T=null,w=null,b=null,F=null,P=null,R=new _e(0,0,0),I=0,S=!1,y=null,N=null,Y=null,X=null,et=null;const lt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,dt=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(dt=parseFloat(/^WebGL (\d)/.exec(j)[1]),Q=dt>=1):j.indexOf("OpenGL ES")!==-1&&(dt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),Q=dt>=2);let Mt=null,wt={};const Bt=n.getParameter(n.SCISSOR_BOX),ee=n.getParameter(n.VIEWPORT),ve=new Ie().fromArray(Bt),nt=new Ie().fromArray(ee);function mt(O,yt,ct,Ct){const ut=new Uint8Array(4),ot=n.createTexture();n.bindTexture(O,ot),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pt=0;Pt<ct;Pt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,Ct,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(yt+Pt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return ot}const Nt={};Nt[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),Nt[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Nt[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Nt[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Et(n.DEPTH_TEST),o.setFunc(_r),fe(!1),xe(Tl),Et(n.CULL_FACE),U(si);function Et(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function Ft(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function he(O,yt){return h[O]!==yt?(n.bindFramebuffer(O,yt),h[O]=yt,O===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=yt),O===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function Wt(O,yt){let ct=g,Ct=!1;if(O){ct=d.get(yt),ct===void 0&&(ct=[],d.set(yt,ct));const ut=O.textures;if(ct.length!==ut.length||ct[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Pt=ut.length;ot<Pt;ot++)ct[ot]=n.COLOR_ATTACHMENT0+ot;ct.length=ut.length,Ct=!0}}else ct[0]!==n.BACK&&(ct[0]=n.BACK,Ct=!0);Ct&&n.drawBuffers(ct)}function Te(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const Re={[Ai]:n.FUNC_ADD,[wf]:n.FUNC_SUBTRACT,[Rf]:n.FUNC_REVERSE_SUBTRACT};Re[Cf]=n.MIN,Re[Pf]=n.MAX;const jt={[Df]:n.ZERO,[Lf]:n.ONE,[Uf]:n.SRC_COLOR,[qo]:n.SRC_ALPHA,[kf]:n.SRC_ALPHA_SATURATE,[Of]:n.DST_COLOR,[Nf]:n.DST_ALPHA,[If]:n.ONE_MINUS_SRC_COLOR,[Yo]:n.ONE_MINUS_SRC_ALPHA,[Bf]:n.ONE_MINUS_DST_COLOR,[Ff]:n.ONE_MINUS_DST_ALPHA,[zf]:n.CONSTANT_COLOR,[Hf]:n.ONE_MINUS_CONSTANT_COLOR,[Vf]:n.CONSTANT_ALPHA,[Gf]:n.ONE_MINUS_CONSTANT_ALPHA};function U(O,yt,ct,Ct,ut,ot,Pt,qt,Me,pe){if(O===si){x===!0&&(Ft(n.BLEND),x=!1);return}if(x===!1&&(Et(n.BLEND),x=!0),O!==Af){if(O!==p||pe!==S){if((f!==Ai||b!==Ai)&&(n.blendEquation(n.FUNC_ADD),f=Ai,b=Ai),pe)switch(O){case ur:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Al:n.blendFunc(n.ONE,n.ONE);break;case wl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ur:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Al:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case wl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}T=null,w=null,F=null,P=null,R.set(0,0,0),I=0,p=O,S=pe}return}ut=ut||yt,ot=ot||ct,Pt=Pt||Ct,(yt!==f||ut!==b)&&(n.blendEquationSeparate(Re[yt],Re[ut]),f=yt,b=ut),(ct!==T||Ct!==w||ot!==F||Pt!==P)&&(n.blendFuncSeparate(jt[ct],jt[Ct],jt[ot],jt[Pt]),T=ct,w=Ct,F=ot,P=Pt),(qt.equals(R)===!1||Me!==I)&&(n.blendColor(qt.r,qt.g,qt.b,Me),R.copy(qt),I=Me),p=O,S=!1}function Ge(O,yt){O.side===zn?Ft(n.CULL_FACE):Et(n.CULL_FACE);let ct=O.side===on;yt&&(ct=!ct),fe(ct),O.blending===ur&&O.transparent===!1?U(si):U(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const Ct=O.stencilWrite;a.setTest(Ct),Ct&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),re(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Et(n.SAMPLE_ALPHA_TO_COVERAGE):Ft(n.SAMPLE_ALPHA_TO_COVERAGE)}function fe(O){y!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),y=O)}function xe(O){O!==Ef?(Et(n.CULL_FACE),O!==N&&(O===Tl?n.cullFace(n.BACK):O===bf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ft(n.CULL_FACE),N=O}function Lt(O){O!==Y&&(Q&&n.lineWidth(O),Y=O)}function re(O,yt,ct){O?(Et(n.POLYGON_OFFSET_FILL),(X!==yt||et!==ct)&&(n.polygonOffset(yt,ct),X=yt,et=ct)):Ft(n.POLYGON_OFFSET_FILL)}function kt(O){O?Et(n.SCISSOR_TEST):Ft(n.SCISSOR_TEST)}function Kt(O){O===void 0&&(O=n.TEXTURE0+lt-1),Mt!==O&&(n.activeTexture(O),Mt=O)}function Ae(O,yt,ct){ct===void 0&&(Mt===null?ct=n.TEXTURE0+lt-1:ct=Mt);let Ct=wt[ct];Ct===void 0&&(Ct={type:void 0,texture:void 0},wt[ct]=Ct),(Ct.type!==O||Ct.texture!==yt)&&(Mt!==ct&&(n.activeTexture(ct),Mt=ct),n.bindTexture(O,yt||Nt[O]),Ct.type=O,Ct.texture=yt)}function C(){const O=wt[Mt];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function M(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function G(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function st(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function It(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Rt(O){ve.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),ve.copy(O))}function Gt(O){nt.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),nt.copy(O))}function Vt(O,yt){let ct=c.get(yt);ct===void 0&&(ct=new WeakMap,c.set(yt,ct));let Ct=ct.get(O);Ct===void 0&&(Ct=n.getUniformBlockIndex(yt,O.name),ct.set(O,Ct))}function vt(O,yt){const Ct=c.get(yt).get(O);l.get(yt)!==Ct&&(n.uniformBlockBinding(yt,Ct,O.__bindingPointIndex),l.set(yt,Ct))}function $t(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Mt=null,wt={},h={},d=new WeakMap,g=[],v=null,x=!1,p=null,f=null,T=null,w=null,b=null,F=null,P=null,R=new _e(0,0,0),I=0,S=!1,y=null,N=null,Y=null,X=null,et=null,ve.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:Et,disable:Ft,bindFramebuffer:he,drawBuffers:Wt,useProgram:Te,setBlending:U,setMaterial:Ge,setFlipSided:fe,setCullFace:xe,setLineWidth:Lt,setPolygonOffset:re,setScissorTest:kt,activeTexture:Kt,bindTexture:Ae,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:G,texImage2D:It,texImage3D:it,updateUBOMapping:Vt,uniformBlockBinding:vt,texStorage2D:_t,texStorage3D:ft,texSubImage2D:tt,texSubImage3D:st,compressedTexSubImage2D:Z,compressedTexSubImage3D:gt,scissor:Rt,viewport:Gt,reset:$t}}function T0(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Jt,u=new WeakMap;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,M){return g?new OffscreenCanvas(C,M):Hs("canvas")}function x(C,M,G){let tt=1;const st=Ae(C);if((st.width>G||st.height>G)&&(tt=G/Math.max(st.width,st.height)),tt<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(tt*st.width),gt=Math.floor(tt*st.height);h===void 0&&(h=v(Z,gt));const _t=M?v(Z,gt):h;return _t.width=Z,_t.height=gt,_t.getContext("2d").drawImage(C,0,0,Z,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+Z+"x"+gt+")."),_t}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function p(C){return C.generateMipmaps}function f(C){n.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(C,M,G,tt,st=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=M;if(M===n.RED&&(G===n.FLOAT&&(Z=n.R32F),G===n.HALF_FLOAT&&(Z=n.R16F),G===n.UNSIGNED_BYTE&&(Z=n.R8)),M===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(Z=n.R8UI),G===n.UNSIGNED_SHORT&&(Z=n.R16UI),G===n.UNSIGNED_INT&&(Z=n.R32UI),G===n.BYTE&&(Z=n.R8I),G===n.SHORT&&(Z=n.R16I),G===n.INT&&(Z=n.R32I)),M===n.RG&&(G===n.FLOAT&&(Z=n.RG32F),G===n.HALF_FLOAT&&(Z=n.RG16F),G===n.UNSIGNED_BYTE&&(Z=n.RG8)),M===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(Z=n.RG8UI),G===n.UNSIGNED_SHORT&&(Z=n.RG16UI),G===n.UNSIGNED_INT&&(Z=n.RG32UI),G===n.BYTE&&(Z=n.RG8I),G===n.SHORT&&(Z=n.RG16I),G===n.INT&&(Z=n.RG32I)),M===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),G===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),G===n.UNSIGNED_INT&&(Z=n.RGB32UI),G===n.BYTE&&(Z=n.RGB8I),G===n.SHORT&&(Z=n.RGB16I),G===n.INT&&(Z=n.RGB32I)),M===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),G===n.UNSIGNED_INT&&(Z=n.RGBA32UI),G===n.BYTE&&(Z=n.RGBA8I),G===n.SHORT&&(Z=n.RGBA16I),G===n.INT&&(Z=n.RGBA32I)),M===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),M===n.RGBA){const gt=st?ks:me.getTransfer(tt);G===n.FLOAT&&(Z=n.RGBA32F),G===n.HALF_FLOAT&&(Z=n.RGBA16F),G===n.UNSIGNED_BYTE&&(Z=gt===Se?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function b(C,M){let G;return C?M===null||M===Fi||M===Br?G=n.DEPTH24_STENCIL8:M===Vn?G=n.DEPTH32F_STENCIL8:M===Or&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Fi||M===Br?G=n.DEPTH_COMPONENT24:M===Vn?G=n.DEPTH_COMPONENT32F:M===Or&&(G=n.DEPTH_COMPONENT16),G}function F(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Tn&&C.minFilter!==Rn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function P(C){const M=C.target;M.removeEventListener("dispose",P),I(M),M.isVideoTexture&&u.delete(M)}function R(C){const M=C.target;M.removeEventListener("dispose",R),y(M)}function I(C){const M=i.get(C);if(M.__webglInit===void 0)return;const G=C.source,tt=d.get(G);if(tt){const st=tt[M.__cacheKey];st.usedTimes--,st.usedTimes===0&&S(C),Object.keys(tt).length===0&&d.delete(G)}i.remove(C)}function S(C){const M=i.get(C);n.deleteTexture(M.__webglTexture);const G=C.source,tt=d.get(G);delete tt[M.__cacheKey],o.memory.textures--}function y(C){const M=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(M.__webglFramebuffer[tt]))for(let st=0;st<M.__webglFramebuffer[tt].length;st++)n.deleteFramebuffer(M.__webglFramebuffer[tt][st]);else n.deleteFramebuffer(M.__webglFramebuffer[tt]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[tt])}else{if(Array.isArray(M.__webglFramebuffer))for(let tt=0;tt<M.__webglFramebuffer.length;tt++)n.deleteFramebuffer(M.__webglFramebuffer[tt]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let tt=0;tt<M.__webglColorRenderbuffer.length;tt++)M.__webglColorRenderbuffer[tt]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[tt]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=C.textures;for(let tt=0,st=G.length;tt<st;tt++){const Z=i.get(G[tt]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(G[tt])}i.remove(C)}let N=0;function Y(){N=0}function X(){const C=N;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),N+=1,C}function et(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function lt(C,M){const G=i.get(C);if(C.isVideoTexture&&kt(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){const tt=C.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(G,C,M);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+M)}function Q(C,M){const G=i.get(C);if(C.version>0&&G.__version!==C.version){Nt(G,C,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+M)}function dt(C,M){const G=i.get(C);if(C.version>0&&G.__version!==C.version){Nt(G,C,M);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+M)}function j(C,M){const G=i.get(C);if(C.version>0&&G.__version!==C.version){Et(G,C,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+M)}const Mt={[ra]:n.REPEAT,[Ri]:n.CLAMP_TO_EDGE,[sa]:n.MIRRORED_REPEAT},wt={[Tn]:n.NEAREST,[Qf]:n.NEAREST_MIPMAP_NEAREST,[is]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[ao]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},Bt={[id]:n.NEVER,[cd]:n.ALWAYS,[rd]:n.LESS,[uu]:n.LEQUAL,[sd]:n.EQUAL,[ld]:n.GEQUAL,[od]:n.GREATER,[ad]:n.NOTEQUAL};function ee(C,M){if(M.type===Vn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Rn||M.magFilter===ao||M.magFilter===is||M.magFilter===Ci||M.minFilter===Rn||M.minFilter===ao||M.minFilter===is||M.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Mt[M.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Mt[M.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Mt[M.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,wt[M.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,wt[M.minFilter]),M.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Bt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Tn||M.minFilter!==is&&M.minFilter!==Ci||M.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function ve(C,M){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",P));const tt=M.source;let st=d.get(tt);st===void 0&&(st={},d.set(tt,st));const Z=et(M);if(Z!==C.__cacheKey){st[Z]===void 0&&(st[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),st[Z].usedTimes++;const gt=st[C.__cacheKey];gt!==void 0&&(st[C.__cacheKey].usedTimes--,gt.usedTimes===0&&S(M)),C.__cacheKey=Z,C.__webglTexture=st[Z].texture}return G}function nt(C,M,G){return Math.floor(Math.floor(C/G)/M)}function mt(C,M,G,tt){const Z=C.updateRanges;if(Z.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,G,tt,M.data);else{Z.sort((it,Rt)=>it.start-Rt.start);let gt=0;for(let it=1;it<Z.length;it++){const Rt=Z[gt],Gt=Z[it],Vt=Rt.start+Rt.count,vt=nt(Gt.start,M.width,4),$t=nt(Rt.start,M.width,4);Gt.start<=Vt+1&&vt===$t&&nt(Gt.start+Gt.count-1,M.width,4)===vt?Rt.count=Math.max(Rt.count,Gt.start+Gt.count-Rt.start):(++gt,Z[gt]=Gt)}Z.length=gt+1;const _t=n.getParameter(n.UNPACK_ROW_LENGTH),ft=n.getParameter(n.UNPACK_SKIP_PIXELS),It=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let it=0,Rt=Z.length;it<Rt;it++){const Gt=Z[it],Vt=Math.floor(Gt.start/4),vt=Math.ceil(Gt.count/4),$t=Vt%M.width,O=Math.floor(Vt/M.width),yt=vt,ct=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$t),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,$t,O,yt,ct,G,tt,M.data)}C.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,_t),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ft),n.pixelStorei(n.UNPACK_SKIP_ROWS,It)}}function Nt(C,M,G){let tt=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(tt=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(tt=n.TEXTURE_3D);const st=ve(C,M),Z=M.source;e.bindTexture(tt,C.__webglTexture,n.TEXTURE0+G);const gt=i.get(Z);if(Z.version!==gt.__version||st===!0){e.activeTexture(n.TEXTURE0+G);const _t=me.getPrimaries(me.workingColorSpace),ft=M.colorSpace===ii?null:me.getPrimaries(M.colorSpace),It=M.colorSpace===ii||_t===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let it=x(M.image,!1,r.maxTextureSize);it=Kt(M,it);const Rt=s.convert(M.format,M.colorSpace),Gt=s.convert(M.type);let Vt=w(M.internalFormat,Rt,Gt,M.colorSpace,M.isVideoTexture);ee(tt,M);let vt;const $t=M.mipmaps,O=M.isVideoTexture!==!0,yt=gt.__version===void 0||st===!0,ct=Z.dataReady,Ct=F(M,it);if(M.isDepthTexture)Vt=b(M.format===zr,M.type),yt&&(O?e.texStorage2D(n.TEXTURE_2D,1,Vt,it.width,it.height):e.texImage2D(n.TEXTURE_2D,0,Vt,it.width,it.height,0,Rt,Gt,null));else if(M.isDataTexture)if($t.length>0){O&&yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,$t[0].width,$t[0].height);for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],O?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,Gt,vt.data):e.texImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,Rt,Gt,vt.data);M.generateMipmaps=!1}else O?(yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,it.width,it.height),ct&&mt(M,it,Rt,Gt)):e.texImage2D(n.TEXTURE_2D,0,Vt,it.width,it.height,0,Rt,Gt,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){O&&yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Vt,$t[0].width,$t[0].height,it.depth);for(let ut=0,ot=$t.length;ut<ot;ut++)if(vt=$t[ut],M.format!==bn)if(Rt!==null)if(O){if(ct)if(M.layerUpdates.size>0){const Pt=Ql(vt.width,vt.height,M.format,M.type);for(const qt of M.layerUpdates){const Me=vt.data.subarray(qt*Pt/vt.data.BYTES_PER_ELEMENT,(qt+1)*Pt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,qt,vt.width,vt.height,1,Rt,Me)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,vt.width,vt.height,it.depth,Rt,vt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ut,Vt,vt.width,vt.height,it.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ct&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,vt.width,vt.height,it.depth,Rt,Gt,vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ut,Vt,vt.width,vt.height,it.depth,0,Rt,Gt,vt.data)}else{O&&yt&&e.texStorage2D(n.TEXTURE_2D,Ct,Vt,$t[0].width,$t[0].height);for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],M.format!==bn?Rt!==null?O?ct&&e.compressedTexSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,vt.data):e.compressedTexImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,vt.width,vt.height,Rt,Gt,vt.data):e.texImage2D(n.TEXTURE_2D,ut,Vt,vt.width,vt.height,0,Rt,Gt,vt.data)}else if(M.isDataArrayTexture)if(O){if(yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,Vt,it.width,it.height,it.depth),ct)if(M.layerUpdates.size>0){const ut=Ql(it.width,it.height,M.format,M.type);for(const ot of M.layerUpdates){const Pt=it.data.subarray(ot*ut/it.data.BYTES_PER_ELEMENT,(ot+1)*ut/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ot,it.width,it.height,1,Rt,Gt,Pt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Rt,Gt,it.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Vt,it.width,it.height,it.depth,0,Rt,Gt,it.data);else if(M.isData3DTexture)O?(yt&&e.texStorage3D(n.TEXTURE_3D,Ct,Vt,it.width,it.height,it.depth),ct&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Rt,Gt,it.data)):e.texImage3D(n.TEXTURE_3D,0,Vt,it.width,it.height,it.depth,0,Rt,Gt,it.data);else if(M.isFramebufferTexture){if(yt)if(O)e.texStorage2D(n.TEXTURE_2D,Ct,Vt,it.width,it.height);else{let ut=it.width,ot=it.height;for(let Pt=0;Pt<Ct;Pt++)e.texImage2D(n.TEXTURE_2D,Pt,Vt,ut,ot,0,Rt,Gt,null),ut>>=1,ot>>=1}}else if($t.length>0){if(O&&yt){const ut=Ae($t[0]);e.texStorage2D(n.TEXTURE_2D,Ct,Vt,ut.width,ut.height)}for(let ut=0,ot=$t.length;ut<ot;ut++)vt=$t[ut],O?ct&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,Rt,Gt,vt):e.texImage2D(n.TEXTURE_2D,ut,Vt,Rt,Gt,vt);M.generateMipmaps=!1}else if(O){if(yt){const ut=Ae(it);e.texStorage2D(n.TEXTURE_2D,Ct,Vt,ut.width,ut.height)}ct&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Rt,Gt,it)}else e.texImage2D(n.TEXTURE_2D,0,Vt,Rt,Gt,it);p(M)&&f(tt),gt.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Et(C,M,G){if(M.image.length!==6)return;const tt=ve(C,M),st=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+G);const Z=i.get(st);if(st.version!==Z.__version||tt===!0){e.activeTexture(n.TEXTURE0+G);const gt=me.getPrimaries(me.workingColorSpace),_t=M.colorSpace===ii?null:me.getPrimaries(M.colorSpace),ft=M.colorSpace===ii||gt===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const It=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,Rt=[];for(let ot=0;ot<6;ot++)!It&&!it?Rt[ot]=x(M.image[ot],!0,r.maxCubemapSize):Rt[ot]=it?M.image[ot].image:M.image[ot],Rt[ot]=Kt(M,Rt[ot]);const Gt=Rt[0],Vt=s.convert(M.format,M.colorSpace),vt=s.convert(M.type),$t=w(M.internalFormat,Vt,vt,M.colorSpace),O=M.isVideoTexture!==!0,yt=Z.__version===void 0||tt===!0,ct=st.dataReady;let Ct=F(M,Gt);ee(n.TEXTURE_CUBE_MAP,M);let ut;if(It){O&&yt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,$t,Gt.width,Gt.height);for(let ot=0;ot<6;ot++){ut=Rt[ot].mipmaps;for(let Pt=0;Pt<ut.length;Pt++){const qt=ut[Pt];M.format!==bn?Vt!==null?O?ct&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,0,0,qt.width,qt.height,Vt,qt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,$t,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,0,0,qt.width,qt.height,Vt,vt,qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt,$t,qt.width,qt.height,0,Vt,vt,qt.data)}}}else{if(ut=M.mipmaps,O&&yt){ut.length>0&&Ct++;const ot=Ae(Rt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,$t,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(it){O?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Rt[ot].width,Rt[ot].height,Vt,vt,Rt[ot].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,Rt[ot].width,Rt[ot].height,0,Vt,vt,Rt[ot].data);for(let Pt=0;Pt<ut.length;Pt++){const Me=ut[Pt].image[ot].image;O?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,0,0,Me.width,Me.height,Vt,vt,Me.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,$t,Me.width,Me.height,0,Vt,vt,Me.data)}}else{O?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Vt,vt,Rt[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,$t,Vt,vt,Rt[ot]);for(let Pt=0;Pt<ut.length;Pt++){const qt=ut[Pt];O?ct&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,0,0,Vt,vt,qt.image[ot]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Pt+1,$t,Vt,vt,qt.image[ot])}}}p(M)&&f(n.TEXTURE_CUBE_MAP),Z.__version=st.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ft(C,M,G,tt,st,Z){const gt=s.convert(G.format,G.colorSpace),_t=s.convert(G.type),ft=w(G.internalFormat,gt,_t,G.colorSpace),It=i.get(M),it=i.get(G);if(it.__renderTarget=M,!It.__hasExternalTextures){const Rt=Math.max(1,M.width>>Z),Gt=Math.max(1,M.height>>Z);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,Z,ft,Rt,Gt,M.depth,0,gt,_t,null):e.texImage2D(st,Z,ft,Rt,Gt,0,gt,_t,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),re(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,st,it.__webglTexture,0,Lt(M)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,tt,st,it.__webglTexture,Z),e.bindFramebuffer(n.FRAMEBUFFER,null)}function he(C,M,G){if(n.bindRenderbuffer(n.RENDERBUFFER,C),M.depthBuffer){const tt=M.depthTexture,st=tt&&tt.isDepthTexture?tt.type:null,Z=b(M.stencilBuffer,st),gt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_t=Lt(M);re(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t,Z,M.width,M.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,Z,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,Z,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,C)}else{const tt=M.textures;for(let st=0;st<tt.length;st++){const Z=tt[st],gt=s.convert(Z.format,Z.colorSpace),_t=s.convert(Z.type),ft=w(Z.internalFormat,gt,_t,Z.colorSpace),It=Lt(M);G&&re(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,It,ft,M.width,M.height):re(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,It,ft,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ft,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Wt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(M.depthTexture);tt.__renderTarget=M,(!tt.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),lt(M.depthTexture,0);const st=tt.__webglTexture,Z=Lt(M);if(M.depthTexture.format===kr)re(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0);else if(M.depthTexture.format===zr)re(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Te(C){const M=i.get(C),G=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const tt=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),tt){const st=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,tt.removeEventListener("dispose",st)};tt.addEventListener("dispose",st),M.__depthDisposeCallback=st}M.__boundDepthTexture=tt}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const tt=C.texture.mipmaps;tt&&tt.length>0?Wt(M.__webglFramebuffer[0],C):Wt(M.__webglFramebuffer,C)}else if(G){M.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[tt]),M.__webglDepthbuffer[tt]===void 0)M.__webglDepthbuffer[tt]=n.createRenderbuffer(),he(M.__webglDepthbuffer[tt],C,!1);else{const st=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[tt];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,Z)}}else{const tt=C.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),he(M.__webglDepthbuffer,C,!1);else{const st=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,Z)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(C,M,G){const tt=i.get(C);M!==void 0&&Ft(tt.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Te(C)}function jt(C){const M=C.texture,G=i.get(C),tt=i.get(M);C.addEventListener("dispose",R);const st=C.textures,Z=C.isWebGLCubeRenderTarget===!0,gt=st.length>1;if(gt||(tt.__webglTexture===void 0&&(tt.__webglTexture=n.createTexture()),tt.__version=M.version,o.memory.textures++),Z){G.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[_t]=[];for(let ft=0;ft<M.mipmaps.length;ft++)G.__webglFramebuffer[_t][ft]=n.createFramebuffer()}else G.__webglFramebuffer[_t]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let _t=0;_t<M.mipmaps.length;_t++)G.__webglFramebuffer[_t]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(gt)for(let _t=0,ft=st.length;_t<ft;_t++){const It=i.get(st[_t]);It.__webglTexture===void 0&&(It.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&re(C)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let _t=0;_t<st.length;_t++){const ft=st[_t];G.__webglColorRenderbuffer[_t]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[_t]);const It=s.convert(ft.format,ft.colorSpace),it=s.convert(ft.type),Rt=w(ft.internalFormat,It,it,ft.colorSpace,C.isXRRenderTarget===!0),Gt=Lt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Gt,Rt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_t,n.RENDERBUFFER,G.__webglColorRenderbuffer[_t])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),he(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),ee(n.TEXTURE_CUBE_MAP,M);for(let _t=0;_t<6;_t++)if(M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Ft(G.__webglFramebuffer[_t][ft],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,ft);else Ft(G.__webglFramebuffer[_t],C,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);p(M)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let _t=0,ft=st.length;_t<ft;_t++){const It=st[_t],it=i.get(It);e.bindTexture(n.TEXTURE_2D,it.__webglTexture),ee(n.TEXTURE_2D,It),Ft(G.__webglFramebuffer,C,It,n.COLOR_ATTACHMENT0+_t,n.TEXTURE_2D,0),p(It)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let _t=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(_t=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(_t,tt.__webglTexture),ee(_t,M),M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Ft(G.__webglFramebuffer[ft],C,M,n.COLOR_ATTACHMENT0,_t,ft);else Ft(G.__webglFramebuffer,C,M,n.COLOR_ATTACHMENT0,_t,0);p(M)&&f(_t),e.unbindTexture()}C.depthBuffer&&Te(C)}function U(C){const M=C.textures;for(let G=0,tt=M.length;G<tt;G++){const st=M[G];if(p(st)){const Z=T(C),gt=i.get(st).__webglTexture;e.bindTexture(Z,gt),f(Z),e.unbindTexture()}}}const Ge=[],fe=[];function xe(C){if(C.samples>0){if(re(C)===!1){const M=C.textures,G=C.width,tt=C.height;let st=n.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(C),_t=M.length>1;if(_t)for(let It=0;It<M.length;It++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const ft=C.texture.mipmaps;ft&&ft.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let It=0;It<M.length;It++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),_t){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[It]);const it=i.get(M[It]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,it,0)}n.blitFramebuffer(0,0,G,tt,0,0,G,tt,st,n.NEAREST),l===!0&&(Ge.length=0,fe.length=0,Ge.push(n.COLOR_ATTACHMENT0+It),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ge.push(Z),fe.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ge))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_t)for(let It=0;It<M.length;It++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,gt.__webglColorRenderbuffer[It]);const it=i.get(M[It]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,it,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const M=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Lt(C){return Math.min(r.maxSamples,C.samples)}function re(C){const M=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function kt(C){const M=o.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Kt(C,M){const G=C.colorSpace,tt=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==xr&&G!==ii&&(me.getTransfer(G)===Se?(tt!==bn||st!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function Ae(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=Y,this.setTexture2D=lt,this.setTexture2DArray=Q,this.setTexture3D=dt,this.setTextureCube=j,this.rebindTextures=Re,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=re}function A0(n,t){function e(i,r=ii){let s;const o=me.getTransfer(r);if(i===Pn)return n.UNSIGNED_BYTE;if(i===Ga)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===iu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===eu)return n.BYTE;if(i===nu)return n.SHORT;if(i===Or)return n.UNSIGNED_SHORT;if(i===Va)return n.INT;if(i===Fi)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===Gr)return n.HALF_FLOAT;if(i===ru)return n.ALPHA;if(i===su)return n.RGB;if(i===bn)return n.RGBA;if(i===kr)return n.DEPTH_COMPONENT;if(i===zr)return n.DEPTH_STENCIL;if(i===ou)return n.RED;if(i===Xa)return n.RED_INTEGER;if(i===au)return n.RG;if(i===$a)return n.RG_INTEGER;if(i===qa)return n.RGBA_INTEGER;if(i===ws||i===Rs||i===Cs||i===Ps)if(o===Se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ws)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ws)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ps)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===oa||i===aa||i===la||i===ca)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===oa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===aa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===la)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ca)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ua||i===ha||i===fa)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ua||i===ha)return o===Se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===fa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===da||i===pa||i===ma||i===_a||i===ga||i===va||i===xa||i===Ma||i===ya||i===Sa||i===Ea||i===ba||i===Ta||i===Aa)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===da)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ma)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_a)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ga)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===va)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ma)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ya)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Sa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ea)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ba)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ta)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Aa)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ds||i===wa||i===Ra)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Ds)return o===Se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ra)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lu||i===Ca||i===Pa||i===Da)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ds)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ca)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Da)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Br?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const w0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R0=`
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

}`;class C0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new an,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ci({vertexShader:w0,fragmentShader:R0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Cn(new $s(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class P0 extends ki{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,g=null,v=null;const x=new C0,p=e.getContextAttributes();let f=null,T=null;const w=[],b=[],F=new Jt;let P=null;const R=new mn;R.viewport=new Ie;const I=new mn;I.viewport=new Ie;const S=[R,I],y=new Kd;let N=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let mt=w[nt];return mt===void 0&&(mt=new Po,w[nt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(nt){let mt=w[nt];return mt===void 0&&(mt=new Po,w[nt]=mt),mt.getGripSpace()},this.getHand=function(nt){let mt=w[nt];return mt===void 0&&(mt=new Po,w[nt]=mt),mt.getHandSpace()};function X(nt){const mt=b.indexOf(nt.inputSource);if(mt===-1)return;const Nt=w[mt];Nt!==void 0&&(Nt.update(nt.inputSource,nt.frame,c||o),Nt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function et(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",et),r.removeEventListener("inputsourceschange",lt);for(let nt=0;nt<w.length;nt++){const mt=b[nt];mt!==null&&(b[nt]=null,w[nt].disconnect(mt))}N=null,Y=null,x.reset(),t.setRenderTarget(f),g=null,d=null,h=null,r=null,T=null,ve.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){s=nt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(nt){c=nt},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(nt){if(r=nt,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",et),r.addEventListener("inputsourceschange",lt),p.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(F),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Nt=null,Et=null,Ft=null;p.depth&&(Ft=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Nt=p.stencil?zr:kr,Et=p.stencil?Br:Fi);const he={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:s};h=new XRWebGLBinding(r,e),d=h.createProjectionLayer(he),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new Bi(d.textureWidth,d.textureHeight,{format:bn,type:Pn,depthTexture:new Su(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,Nt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Nt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(r,e,Nt),r.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),T=new Bi(g.framebufferWidth,g.framebufferHeight,{format:bn,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ve.setContext(r),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function lt(nt){for(let mt=0;mt<nt.removed.length;mt++){const Nt=nt.removed[mt],Et=b.indexOf(Nt);Et>=0&&(b[Et]=null,w[Et].disconnect(Nt))}for(let mt=0;mt<nt.added.length;mt++){const Nt=nt.added[mt];let Et=b.indexOf(Nt);if(Et===-1){for(let he=0;he<w.length;he++)if(he>=b.length){b.push(Nt),Et=he;break}else if(b[he]===null){b[he]=Nt,Et=he;break}if(Et===-1)break}const Ft=w[Et];Ft&&Ft.connect(Nt)}}const Q=new V,dt=new V;function j(nt,mt,Nt){Q.setFromMatrixPosition(mt.matrixWorld),dt.setFromMatrixPosition(Nt.matrixWorld);const Et=Q.distanceTo(dt),Ft=mt.projectionMatrix.elements,he=Nt.projectionMatrix.elements,Wt=Ft[14]/(Ft[10]-1),Te=Ft[14]/(Ft[10]+1),Re=(Ft[9]+1)/Ft[5],jt=(Ft[9]-1)/Ft[5],U=(Ft[8]-1)/Ft[0],Ge=(he[8]+1)/he[0],fe=Wt*U,xe=Wt*Ge,Lt=Et/(-U+Ge),re=Lt*-U;if(mt.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(re),nt.translateZ(Lt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Ft[10]===-1)nt.projectionMatrix.copy(mt.projectionMatrix),nt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const kt=Wt+Lt,Kt=Te+Lt,Ae=fe-re,C=xe+(Et-re),M=Re*Te/Kt*kt,G=jt*Te/Kt*kt;nt.projectionMatrix.makePerspective(Ae,C,M,G,kt,Kt),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function Mt(nt,mt){mt===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(mt.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(r===null)return;let mt=nt.near,Nt=nt.far;x.texture!==null&&(x.depthNear>0&&(mt=x.depthNear),x.depthFar>0&&(Nt=x.depthFar)),y.near=I.near=R.near=mt,y.far=I.far=R.far=Nt,(N!==y.near||Y!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),N=y.near,Y=y.far),R.layers.mask=nt.layers.mask|2,I.layers.mask=nt.layers.mask|4,y.layers.mask=R.layers.mask|I.layers.mask;const Et=nt.parent,Ft=y.cameras;Mt(y,Et);for(let he=0;he<Ft.length;he++)Mt(Ft[he],Et);Ft.length===2?j(y,R,I):y.projectionMatrix.copy(R.projectionMatrix),wt(nt,y,Et)};function wt(nt,mt,Nt){Nt===null?nt.matrix.copy(mt.matrixWorld):(nt.matrix.copy(Nt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(mt.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(mt.projectionMatrix),nt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=La*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(nt){l=nt,d!==null&&(d.fixedFoveation=nt),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=nt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Bt=null;function ee(nt,mt){if(u=mt.getViewerPose(c||o),v=mt,u!==null){const Nt=u.views;g!==null&&(t.setRenderTargetFramebuffer(T,g.framebuffer),t.setRenderTarget(T));let Et=!1;Nt.length!==y.cameras.length&&(y.cameras.length=0,Et=!0);for(let Wt=0;Wt<Nt.length;Wt++){const Te=Nt[Wt];let Re=null;if(g!==null)Re=g.getViewport(Te);else{const U=h.getViewSubImage(d,Te);Re=U.viewport,Wt===0&&(t.setRenderTargetTextures(T,U.colorTexture,U.depthStencilTexture),t.setRenderTarget(T))}let jt=S[Wt];jt===void 0&&(jt=new mn,jt.layers.enable(Wt),jt.viewport=new Ie,S[Wt]=jt),jt.matrix.fromArray(Te.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(Te.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(Re.x,Re.y,Re.width,Re.height),Wt===0&&(y.matrix.copy(jt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Et===!0&&y.cameras.push(jt)}const Ft=r.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Wt=h.getDepthInformation(Nt[0]);Wt&&Wt.isValid&&Wt.texture&&x.init(t,Wt,r.renderState)}}for(let Nt=0;Nt<w.length;Nt++){const Et=b[Nt],Ft=w[Nt];Et!==null&&Ft!==void 0&&Ft.update(Et,mt,c||o)}Bt&&Bt(nt,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),v=null}const ve=new Tu;ve.setAnimationLoop(ee),this.setAnimationLoop=function(nt){Bt=nt},this.dispose=function(){}}}const Ei=new Dn,D0=new Ne;function L0(n,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,xu(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,T,w,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),h(p,f)):f.isMeshPhongMaterial?(s(p,f),u(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&g(p,f,b)):f.isMeshMatcapMaterial?(s(p,f),v(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),x(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,T,w):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===on&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===on&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const T=t.get(f),w=T.envMap,b=T.envMapRotation;w&&(p.envMap.value=w,Ei.copy(b),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),p.envMapRotation.value.setFromMatrix4(D0.makeRotationFromEuler(Ei)),p.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,T,w){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*T,p.scale.value=w*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function g(p,f,T){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===on&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const T=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function U0(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,w){const b=w.program;i.uniformBlockBinding(T,b)}function c(T,w){let b=r[T.id];b===void 0&&(v(T),b=u(T),r[T.id]=b,T.addEventListener("dispose",p));const F=w.program;i.updateUBOMapping(T,F);const P=t.render.frame;s[T.id]!==P&&(d(T),s[T.id]=P)}function u(T){const w=h();T.__bindingPointIndex=w;const b=n.createBuffer(),F=T.__size,P=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,F,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function h(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const w=r[T.id],b=T.uniforms,F=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let P=0,R=b.length;P<R;P++){const I=Array.isArray(b[P])?b[P]:[b[P]];for(let S=0,y=I.length;S<y;S++){const N=I[S];if(g(N,P,S,F)===!0){const Y=N.__offset,X=Array.isArray(N.value)?N.value:[N.value];let et=0;for(let lt=0;lt<X.length;lt++){const Q=X[lt],dt=x(Q);typeof Q=="number"||typeof Q=="boolean"?(N.__data[0]=Q,n.bufferSubData(n.UNIFORM_BUFFER,Y+et,N.__data)):Q.isMatrix3?(N.__data[0]=Q.elements[0],N.__data[1]=Q.elements[1],N.__data[2]=Q.elements[2],N.__data[3]=0,N.__data[4]=Q.elements[3],N.__data[5]=Q.elements[4],N.__data[6]=Q.elements[5],N.__data[7]=0,N.__data[8]=Q.elements[6],N.__data[9]=Q.elements[7],N.__data[10]=Q.elements[8],N.__data[11]=0):(Q.toArray(N.__data,et),et+=dt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(T,w,b,F){const P=T.value,R=w+"_"+b;if(F[R]===void 0)return typeof P=="number"||typeof P=="boolean"?F[R]=P:F[R]=P.clone(),!0;{const I=F[R];if(typeof P=="number"||typeof P=="boolean"){if(I!==P)return F[R]=P,!0}else if(I.equals(P)===!1)return I.copy(P),!0}return!1}function v(T){const w=T.uniforms;let b=0;const F=16;for(let R=0,I=w.length;R<I;R++){const S=Array.isArray(w[R])?w[R]:[w[R]];for(let y=0,N=S.length;y<N;y++){const Y=S[y],X=Array.isArray(Y.value)?Y.value:[Y.value];for(let et=0,lt=X.length;et<lt;et++){const Q=X[et],dt=x(Q),j=b%F,Mt=j%dt.boundary,wt=j+Mt;b+=Mt,wt!==0&&F-wt<dt.storage&&(b+=F-wt),Y.__data=new Float32Array(dt.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=b,b+=dt.storage}}}const P=b%F;return P>0&&(b+=F-P),T.__size=b,T.__cache={},this}function x(T){const w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),w}function p(T){const w=T.target;w.removeEventListener("dispose",p);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function f(){for(const T in r)n.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class I0{constructor(t={}){const{canvas:e=fd(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const v=new Uint32Array(4),x=new Int32Array(4);let p=null,f=null;const T=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let F=!1;this._outputColorSpace=pn;let P=0,R=0,I=null,S=-1,y=null;const N=new Ie,Y=new Ie;let X=null;const et=new _e(0);let lt=0,Q=e.width,dt=e.height,j=1,Mt=null,wt=null;const Bt=new Ie(0,0,Q,dt),ee=new Ie(0,0,Q,dt);let ve=!1;const nt=new Ka;let mt=!1,Nt=!1;const Et=new Ne,Ft=new Ne,he=new V,Wt=new Ie,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function jt(){return I===null?j:1}let U=i;function Ge(E,B){return e.getContext(E,B)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ha}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",ot,!1),U===null){const B="webgl2";if(U=Ge(B,E),U===null)throw Ge(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let fe,xe,Lt,re,kt,Kt,Ae,C,M,G,tt,st,Z,gt,_t,ft,It,it,Rt,Gt,Vt,vt,$t,O;function yt(){fe=new W_(U),fe.init(),vt=new A0(U,fe),xe=new O_(U,fe,t,vt),Lt=new b0(U,fe),xe.reverseDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),re=new q_(U),kt=new h0,Kt=new T0(U,fe,Lt,kt,xe,vt,re),Ae=new k_(b),C=new G_(b),M=new Qd(U),$t=new N_(U,M),G=new X_(U,M,re,$t),tt=new j_(U,G,M,re),Rt=new Y_(U,xe,Kt),ft=new B_(kt),st=new u0(b,Ae,C,fe,xe,$t,ft),Z=new L0(b,kt),gt=new d0,_t=new x0(fe),it=new I_(b,Ae,C,Lt,tt,g,l),It=new S0(b,tt,xe),O=new U0(U,re,xe,Lt),Gt=new F_(U,fe,re),Vt=new $_(U,fe,re),re.programs=st.programs,b.capabilities=xe,b.extensions=fe,b.properties=kt,b.renderLists=gt,b.shadowMap=It,b.state=Lt,b.info=re}yt();const ct=new P0(b,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const E=fe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=fe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(Q,dt,!1))},this.getSize=function(E){return E.set(Q,dt)},this.setSize=function(E,B,$=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=E,dt=B,e.width=Math.floor(E*j),e.height=Math.floor(B*j),$===!0&&(e.style.width=E+"px",e.style.height=B+"px"),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(Q*j,dt*j).floor()},this.setDrawingBufferSize=function(E,B,$){Q=E,dt=B,j=$,e.width=Math.floor(E*$),e.height=Math.floor(B*$),this.setViewport(0,0,E,B)},this.getCurrentViewport=function(E){return E.copy(N)},this.getViewport=function(E){return E.copy(Bt)},this.setViewport=function(E,B,$,W){E.isVector4?Bt.set(E.x,E.y,E.z,E.w):Bt.set(E,B,$,W),Lt.viewport(N.copy(Bt).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy(ee)},this.setScissor=function(E,B,$,W){E.isVector4?ee.set(E.x,E.y,E.z,E.w):ee.set(E,B,$,W),Lt.scissor(Y.copy(ee).multiplyScalar(j).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(E){Lt.setScissorTest(ve=E)},this.setOpaqueSort=function(E){Mt=E},this.setTransparentSort=function(E){wt=E},this.getClearColor=function(E){return E.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,$=!0){let W=0;if(E){let z=!1;if(I!==null){const ht=I.texture.format;z=ht===qa||ht===$a||ht===Xa}if(z){const ht=I.texture.type,xt=ht===Pn||ht===Fi||ht===Or||ht===Br||ht===Ga||ht===Wa,Dt=it.getClearColor(),Tt=it.getClearAlpha(),Xt=Dt.r,Yt=Dt.g,Ot=Dt.b;xt?(v[0]=Xt,v[1]=Yt,v[2]=Ot,v[3]=Tt,U.clearBufferuiv(U.COLOR,0,v)):(x[0]=Xt,x[1]=Yt,x[2]=Ot,x[3]=Tt,U.clearBufferiv(U.COLOR,0,x))}else W|=U.COLOR_BUFFER_BIT}B&&(W|=U.DEPTH_BUFFER_BIT),$&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),it.dispose(),gt.dispose(),_t.dispose(),kt.dispose(),Ae.dispose(),C.dispose(),tt.dispose(),$t.dispose(),O.dispose(),st.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",jr),ct.removeEventListener("sessionend",Kr),Ln.stop()};function Ct(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const E=re.autoReset,B=It.enabled,$=It.autoUpdate,W=It.needsUpdate,z=It.type;yt(),re.autoReset=E,It.enabled=B,It.autoUpdate=$,It.needsUpdate=W,It.type=z}function ot(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Pt(E){const B=E.target;B.removeEventListener("dispose",Pt),qt(B)}function qt(E){Me(E),kt.remove(E)}function Me(E){const B=kt.get(E).programs;B!==void 0&&(B.forEach(function($){st.releaseProgram($)}),E.isShaderMaterial&&st.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,$,W,z,ht){B===null&&(B=Te);const xt=z.isMesh&&z.matrixWorld.determinant()<0,Dt=Qs(E,B,$,W,z);Lt.setMaterial(W,xt);let Tt=$.index,Xt=1;if(W.wireframe===!0){if(Tt=G.getWireframeAttribute($),Tt===void 0)return;Xt=2}const Yt=$.drawRange,Ot=$.attributes.position;let ie=Yt.start*Xt,ge=(Yt.start+Yt.count)*Xt;ht!==null&&(ie=Math.max(ie,ht.start*Xt),ge=Math.min(ge,(ht.start+ht.count)*Xt)),Tt!==null?(ie=Math.max(ie,0),ge=Math.min(ge,Tt.count)):Ot!=null&&(ie=Math.max(ie,0),ge=Math.min(ge,Ot.count));const Ue=ge-ie;if(Ue<0||Ue===1/0)return;$t.setup(z,W,Dt,$,Tt);let ye,le=Gt;if(Tt!==null&&(ye=M.get(Tt),le=Vt,le.setIndex(ye)),z.isMesh)W.wireframe===!0?(Lt.setLineWidth(W.wireframeLinewidth*jt()),le.setMode(U.LINES)):le.setMode(U.TRIANGLES);else if(z.isLine){let zt=W.linewidth;zt===void 0&&(zt=1),Lt.setLineWidth(zt*jt()),z.isLineSegments?le.setMode(U.LINES):z.isLineLoop?le.setMode(U.LINE_LOOP):le.setMode(U.LINE_STRIP)}else z.isPoints?le.setMode(U.POINTS):z.isSprite&&le.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))le.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const zt=z._multiDrawStarts,Zt=z._multiDrawCounts,ce=z._multiDrawCount,Ze=Tt?M.get(Tt).bytesPerElement:1,An=kt.get(W).currentProgram.getUniforms();for(let Je=0;Je<ce;Je++)An.setValue(U,"_gl_DrawID",Je),le.render(zt[Je]/Ze,Zt[Je])}else if(z.isInstancedMesh)le.renderInstances(ie,Ue,z.count);else if($.isInstancedBufferGeometry){const zt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Zt=Math.min($.instanceCount,zt);le.renderInstances(ie,Ue,Zt)}else le.render(ie,Ue)};function pe(E,B,$){E.transparent===!0&&E.side===zn&&E.forceSinglePass===!1?(E.side=on,E.needsUpdate=!0,fi(E,B,$),E.side=li,E.needsUpdate=!0,fi(E,B,$),E.side=zn):fi(E,B,$)}this.compile=function(E,B,$=null){$===null&&($=E),f=_t.get($),f.init(B),w.push(f),$.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),E!==$&&E.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights();const W=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ht=z.material;if(ht)if(Array.isArray(ht))for(let xt=0;xt<ht.length;xt++){const Dt=ht[xt];pe(Dt,$,z),W.add(Dt)}else pe(ht,$,z),W.add(ht)}),f=w.pop(),W},this.compileAsync=function(E,B,$=null){const W=this.compile(E,B,$);return new Promise(z=>{function ht(){if(W.forEach(function(xt){kt.get(xt).currentProgram.isReady()&&W.delete(xt)}),W.size===0){z(E);return}setTimeout(ht,10)}fe.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let We=null;function gn(E){We&&We(E)}function jr(){Ln.stop()}function Kr(){Ln.start()}const Ln=new Tu;Ln.setAnimationLoop(gn),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(E){We=E,ct.setAnimationLoop(E),E===null?Ln.stop():Ln.start()},ct.addEventListener("sessionstart",jr),ct.addEventListener("sessionend",Kr),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(B),B=ct.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,B,I),f=_t.get(E,w.length),f.init(B),w.push(f),Ft.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),nt.setFromProjectionMatrix(Ft),Nt=this.localClippingEnabled,mt=ft.init(this.clippingPlanes,Nt),p=gt.get(E,T.length),p.init(),T.push(p),ct.enabled===!0&&ct.isPresenting===!0){const ht=b.xr.getDepthSensingMesh();ht!==null&&hi(ht,B,-1/0,b.sortObjects)}hi(E,B,0,b.sortObjects),p.finish(),b.sortObjects===!0&&p.sort(Mt,wt),Re=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Re&&it.addToRenderList(p,E),this.info.render.frame++,mt===!0&&ft.beginShadows();const $=f.state.shadowsArray;It.render($,E,B),mt===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=p.opaque,z=p.transmissive;if(f.setupLights(),B.isArrayCamera){const ht=B.cameras;if(z.length>0)for(let xt=0,Dt=ht.length;xt<Dt;xt++){const Tt=ht[xt];Zr(W,z,E,Tt)}Re&&it.render(E);for(let xt=0,Dt=ht.length;xt<Dt;xt++){const Tt=ht[xt];Hi(p,E,Tt,Tt.viewport)}}else z.length>0&&Zr(W,z,E,B),Re&&it.render(E),Hi(p,E,B);I!==null&&R===0&&(Kt.updateMultisampleRenderTarget(I),Kt.updateRenderTargetMipmap(I)),E.isScene===!0&&E.onAfterRender(b,E,B),$t.resetDefaultState(),S=-1,y=null,w.pop(),w.length>0?(f=w[w.length-1],mt===!0&&ft.setGlobalState(b.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?p=T[T.length-1]:p=null};function hi(E,B,$,W){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||nt.intersectsSprite(E)){W&&Wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ft);const xt=tt.update(E),Dt=E.material;Dt.visible&&p.push(E,xt,Dt,$,Wt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||nt.intersectsObject(E))){const xt=tt.update(E),Dt=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Wt.copy(E.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Wt.copy(xt.boundingSphere.center)),Wt.applyMatrix4(E.matrixWorld).applyMatrix4(Ft)),Array.isArray(Dt)){const Tt=xt.groups;for(let Xt=0,Yt=Tt.length;Xt<Yt;Xt++){const Ot=Tt[Xt],ie=Dt[Ot.materialIndex];ie&&ie.visible&&p.push(E,xt,ie,$,Wt.z,Ot)}}else Dt.visible&&p.push(E,xt,Dt,$,Wt.z,null)}}const ht=E.children;for(let xt=0,Dt=ht.length;xt<Dt;xt++)hi(ht[xt],B,$,W)}function Hi(E,B,$,W){const z=E.opaque,ht=E.transmissive,xt=E.transparent;f.setupLightsView($),mt===!0&&ft.setGlobalState(b.clippingPlanes,$),W&&Lt.viewport(N.copy(W)),z.length>0&&Vi(z,B,$),ht.length>0&&Vi(ht,B,$),xt.length>0&&Vi(xt,B,$),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Zr(E,B,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new Bi(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?Gr:Pn,minFilter:Ci,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:me.workingColorSpace}));const ht=f.state.transmissionRenderTarget[W.id],xt=W.viewport||N;ht.setSize(xt.z*b.transmissionResolutionScale,xt.w*b.transmissionResolutionScale);const Dt=b.getRenderTarget(),Tt=b.getActiveCubeFace(),Xt=b.getActiveMipmapLevel();b.setRenderTarget(ht),b.getClearColor(et),lt=b.getClearAlpha(),lt<1&&b.setClearColor(16777215,.5),b.clear(),Re&&it.render($);const Yt=b.toneMapping;b.toneMapping=oi;const Ot=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),mt===!0&&ft.setGlobalState(b.clippingPlanes,W),Vi(E,$,W),Kt.updateMultisampleRenderTarget(ht),Kt.updateRenderTargetMipmap(ht),fe.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let ge=0,Ue=B.length;ge<Ue;ge++){const ye=B[ge],le=ye.object,zt=ye.geometry,Zt=ye.material,ce=ye.group;if(Zt.side===zn&&le.layers.test(W.layers)){const Ze=Zt.side;Zt.side=on,Zt.needsUpdate=!0,Jr(le,$,W,zt,Zt,ce),Zt.side=Ze,Zt.needsUpdate=!0,ie=!0}}ie===!0&&(Kt.updateMultisampleRenderTarget(ht),Kt.updateRenderTargetMipmap(ht))}b.setRenderTarget(Dt,Tt,Xt),b.setClearColor(et,lt),Ot!==void 0&&(W.viewport=Ot),b.toneMapping=Yt}function Vi(E,B,$){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,ht=E.length;z<ht;z++){const xt=E[z],Dt=xt.object,Tt=xt.geometry,Xt=xt.group;let Yt=xt.material;Yt.allowOverride===!0&&W!==null&&(Yt=W),Dt.layers.test($.layers)&&Jr(Dt,B,$,Tt,Yt,Xt)}}function Jr(E,B,$,W,z,ht){E.onBeforeRender(b,B,$,W,z,ht),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(b,B,$,W,E,ht),z.transparent===!0&&z.side===zn&&z.forceSinglePass===!1?(z.side=on,z.needsUpdate=!0,b.renderBufferDirect($,B,W,z,E,ht),z.side=li,z.needsUpdate=!0,b.renderBufferDirect($,B,W,z,E,ht),z.side=zn):b.renderBufferDirect($,B,W,z,E,ht),E.onAfterRender(b,B,$,W,z,ht)}function fi(E,B,$){B.isScene!==!0&&(B=Te);const W=kt.get(E),z=f.state.lights,ht=f.state.shadowsArray,xt=z.state.version,Dt=st.getParameters(E,z.state,ht,B,$),Tt=st.getProgramCacheKey(Dt);let Xt=W.programs;W.environment=E.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(E.isMeshStandardMaterial?C:Ae).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Xt===void 0&&(E.addEventListener("dispose",Pt),Xt=new Map,W.programs=Xt);let Yt=Xt.get(Tt);if(Yt!==void 0){if(W.currentProgram===Yt&&W.lightsStateVersion===xt)return ts(E,Dt),Yt}else Dt.uniforms=st.getUniforms(E),E.onBeforeCompile(Dt,b),Yt=st.acquireProgram(Dt,Tt),Xt.set(Tt,Yt),W.uniforms=Dt.uniforms;const Ot=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ot.clippingPlanes=ft.uniform),ts(E,Dt),W.needsLights=to(E),W.lightsStateVersion=xt,W.needsLights&&(Ot.ambientLightColor.value=z.state.ambient,Ot.lightProbe.value=z.state.probe,Ot.directionalLights.value=z.state.directional,Ot.directionalLightShadows.value=z.state.directionalShadow,Ot.spotLights.value=z.state.spot,Ot.spotLightShadows.value=z.state.spotShadow,Ot.rectAreaLights.value=z.state.rectArea,Ot.ltc_1.value=z.state.rectAreaLTC1,Ot.ltc_2.value=z.state.rectAreaLTC2,Ot.pointLights.value=z.state.point,Ot.pointLightShadows.value=z.state.pointShadow,Ot.hemisphereLights.value=z.state.hemi,Ot.directionalShadowMap.value=z.state.directionalShadowMap,Ot.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ot.spotShadowMap.value=z.state.spotShadowMap,Ot.spotLightMatrix.value=z.state.spotLightMatrix,Ot.spotLightMap.value=z.state.spotLightMap,Ot.pointShadowMap.value=z.state.pointShadowMap,Ot.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Yt,W.uniformsList=null,Yt}function Qr(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=Us.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function ts(E,B){const $=kt.get(E);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function Qs(E,B,$,W,z){B.isScene!==!0&&(B=Te),Kt.resetTextureUnits();const ht=B.fog,xt=W.isMeshStandardMaterial?B.environment:null,Dt=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:xr,Tt=(W.isMeshStandardMaterial?C:Ae).get(W.envMap||xt),Xt=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Yt=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ot=!!$.morphAttributes.position,ie=!!$.morphAttributes.normal,ge=!!$.morphAttributes.color;let Ue=oi;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ue=b.toneMapping);const ye=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,le=ye!==void 0?ye.length:0,zt=kt.get(W),Zt=f.state.lights;if(mt===!0&&(Nt===!0||E!==y)){const Xe=E===y&&W.id===S;ft.setState(W,E,Xe)}let ce=!1;W.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==Zt.state.version||zt.outputColorSpace!==Dt||z.isBatchedMesh&&zt.batching===!1||!z.isBatchedMesh&&zt.batching===!0||z.isBatchedMesh&&zt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&zt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&zt.instancing===!1||!z.isInstancedMesh&&zt.instancing===!0||z.isSkinnedMesh&&zt.skinning===!1||!z.isSkinnedMesh&&zt.skinning===!0||z.isInstancedMesh&&zt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&zt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&zt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&zt.instancingMorph===!1&&z.morphTexture!==null||zt.envMap!==Tt||W.fog===!0&&zt.fog!==ht||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ft.numPlanes||zt.numIntersection!==ft.numIntersection)||zt.vertexAlphas!==Xt||zt.vertexTangents!==Yt||zt.morphTargets!==Ot||zt.morphNormals!==ie||zt.morphColors!==ge||zt.toneMapping!==Ue||zt.morphTargetsCount!==le)&&(ce=!0):(ce=!0,zt.__version=W.version);let Ze=zt.currentProgram;ce===!0&&(Ze=fi(W,B,z));let An=!1,Je=!1,di=!1;const be=Ze.getUniforms(),en=zt.uniforms;if(Lt.useProgram(Ze.program)&&(An=!0,Je=!0,di=!0),W.id!==S&&(S=W.id,Je=!0),An||y!==E){Lt.buffers.depth.getReversed()?(Et.copy(E.projectionMatrix),pd(Et),md(Et),be.setValue(U,"projectionMatrix",Et)):be.setValue(U,"projectionMatrix",E.projectionMatrix),be.setValue(U,"viewMatrix",E.matrixWorldInverse);const qe=be.map.cameraPosition;qe!==void 0&&qe.setValue(U,he.setFromMatrixPosition(E.matrixWorld)),xe.logarithmicDepthBuffer&&be.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&be.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Je=!0,di=!0)}if(z.isSkinnedMesh){be.setOptional(U,z,"bindMatrix"),be.setOptional(U,z,"bindMatrixInverse");const Xe=z.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),be.setValue(U,"boneTexture",Xe.boneTexture,Kt))}z.isBatchedMesh&&(be.setOptional(U,z,"batchingTexture"),be.setValue(U,"batchingTexture",z._matricesTexture,Kt),be.setOptional(U,z,"batchingIdTexture"),be.setValue(U,"batchingIdTexture",z._indirectTexture,Kt),be.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&be.setValue(U,"batchingColorTexture",z._colorsTexture,Kt));const nn=$.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&Rt.update(z,$,Ze),(Je||zt.receiveShadow!==z.receiveShadow)&&(zt.receiveShadow=z.receiveShadow,be.setValue(U,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(en.envMap.value=Tt,en.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(en.envMapIntensity.value=B.environmentIntensity),Je&&(be.setValue(U,"toneMappingExposure",b.toneMappingExposure),zt.needsLights&&Gi(en,di),ht&&W.fog===!0&&Z.refreshFogUniforms(en,ht),Z.refreshMaterialUniforms(en,W,j,dt,f.state.transmissionRenderTarget[E.id]),Us.upload(U,Qr(zt),en,Kt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Us.upload(U,Qr(zt),en,Kt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&be.setValue(U,"center",z.center),be.setValue(U,"modelViewMatrix",z.modelViewMatrix),be.setValue(U,"normalMatrix",z.normalMatrix),be.setValue(U,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Xe=W.uniformsGroups;for(let qe=0,br=Xe.length;qe<br;qe++){const Un=Xe[qe];O.update(Un,Ze),O.bind(Un,Ze)}}return Ze}function Gi(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function to(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,B,$){const W=kt.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),kt.get(E.texture).__webglTexture=B,kt.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const $=kt.get(E);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0};const eo=U.createFramebuffer();this.setRenderTarget=function(E,B=0,$=0){I=E,P=B,R=$;let W=!0,z=null,ht=!1,xt=!1;if(E){const Tt=kt.get(E);if(Tt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(Tt.__webglFramebuffer===void 0)Kt.setupRenderTarget(E);else if(Tt.__hasExternalTextures)Kt.rebindTextures(E,kt.get(E.texture).__webglTexture,kt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ot=E.depthTexture;if(Tt.__boundDepthTexture!==Ot){if(Ot!==null&&kt.has(Ot)&&(E.width!==Ot.image.width||E.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(E)}}const Xt=E.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(xt=!0);const Yt=kt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Yt[B])?z=Yt[B][$]:z=Yt[B],ht=!0):E.samples>0&&Kt.useMultisampledRTT(E)===!1?z=kt.get(E).__webglMultisampledFramebuffer:Array.isArray(Yt)?z=Yt[$]:z=Yt,N.copy(E.viewport),Y.copy(E.scissor),X=E.scissorTest}else N.copy(Bt).multiplyScalar(j).floor(),Y.copy(ee).multiplyScalar(j).floor(),X=ve;if($!==0&&(z=eo),Lt.bindFramebuffer(U.FRAMEBUFFER,z)&&W&&Lt.drawBuffers(E,z),Lt.viewport(N),Lt.scissor(Y),Lt.setScissorTest(X),ht){const Tt=kt.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,Tt.__webglTexture,$)}else if(xt){const Tt=kt.get(E.texture),Xt=B;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Tt.__webglTexture,$,Xt)}else if(E!==null&&$!==0){const Tt=kt.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Tt.__webglTexture,$)}S=-1},this.readRenderTargetPixels=function(E,B,$,W,z,ht,xt,Dt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=kt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){Lt.bindFramebuffer(U.FRAMEBUFFER,Tt);try{const Xt=E.textures[Dt],Yt=Xt.format,Ot=Xt.type;if(!xe.textureFormatReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xe.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-W&&$>=0&&$<=E.height-z&&(E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Dt),U.readPixels(B,$,W,z,vt.convert(Yt),vt.convert(Ot),ht))}finally{const Xt=I!==null?kt.get(I).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(E,B,$,W,z,ht,xt,Dt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=kt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt)if(B>=0&&B<=E.width-W&&$>=0&&$<=E.height-z){Lt.bindFramebuffer(U.FRAMEBUFFER,Tt);const Xt=E.textures[Dt],Yt=Xt.format,Ot=Xt.type;if(!xe.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xe.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ie=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.bufferData(U.PIXEL_PACK_BUFFER,ht.byteLength,U.STREAM_READ),E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Dt),U.readPixels(B,$,W,z,vt.convert(Yt),vt.convert(Ot),0);const ge=I!==null?kt.get(I).__webglFramebuffer:null;Lt.bindFramebuffer(U.FRAMEBUFFER,ge);const Ue=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await dd(U,Ue,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ie),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ht),U.deleteBuffer(ie),U.deleteSync(Ue),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,$=0){const W=Math.pow(2,-$),z=Math.floor(E.image.width*W),ht=Math.floor(E.image.height*W),xt=B!==null?B.x:0,Dt=B!==null?B.y:0;Kt.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,xt,Dt,z,ht),Lt.unbindTexture()};const Wi=U.createFramebuffer(),es=U.createFramebuffer();this.copyTextureToTexture=function(E,B,$=null,W=null,z=0,ht=null){ht===null&&(z!==0?(hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=z,z=0):ht=0);let xt,Dt,Tt,Xt,Yt,Ot,ie,ge,Ue;const ye=E.isCompressedTexture?E.mipmaps[ht]:E.image;if($!==null)xt=$.max.x-$.min.x,Dt=$.max.y-$.min.y,Tt=$.isBox3?$.max.z-$.min.z:1,Xt=$.min.x,Yt=$.min.y,Ot=$.isBox3?$.min.z:0;else{const nn=Math.pow(2,-z);xt=Math.floor(ye.width*nn),Dt=Math.floor(ye.height*nn),E.isDataArrayTexture?Tt=ye.depth:E.isData3DTexture?Tt=Math.floor(ye.depth*nn):Tt=1,Xt=0,Yt=0,Ot=0}W!==null?(ie=W.x,ge=W.y,Ue=W.z):(ie=0,ge=0,Ue=0);const le=vt.convert(B.format),zt=vt.convert(B.type);let Zt;B.isData3DTexture?(Kt.setTexture3D(B,0),Zt=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Kt.setTexture2DArray(B,0),Zt=U.TEXTURE_2D_ARRAY):(Kt.setTexture2D(B,0),Zt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const ce=U.getParameter(U.UNPACK_ROW_LENGTH),Ze=U.getParameter(U.UNPACK_IMAGE_HEIGHT),An=U.getParameter(U.UNPACK_SKIP_PIXELS),Je=U.getParameter(U.UNPACK_SKIP_ROWS),di=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ye.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ye.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Xt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Yt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ot);const be=E.isDataArrayTexture||E.isData3DTexture,en=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const nn=kt.get(E),Xe=kt.get(B),qe=kt.get(nn.__renderTarget),br=kt.get(Xe.__renderTarget);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,qe.__webglFramebuffer),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,br.__webglFramebuffer);for(let Un=0;Un<Tt;Un++)be&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,kt.get(E).__webglTexture,z,Ot+Un),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,kt.get(B).__webglTexture,ht,Ue+Un)),U.blitFramebuffer(Xt,Yt,xt,Dt,ie,ge,xt,Dt,U.DEPTH_BUFFER_BIT,U.NEAREST);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(z!==0||E.isRenderTargetTexture||kt.has(E)){const nn=kt.get(E),Xe=kt.get(B);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,Wi),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,es);for(let qe=0;qe<Tt;qe++)be?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,nn.__webglTexture,z,Ot+qe):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,nn.__webglTexture,z),en?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Xe.__webglTexture,ht,Ue+qe):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Xe.__webglTexture,ht),z!==0?U.blitFramebuffer(Xt,Yt,xt,Dt,ie,ge,xt,Dt,U.COLOR_BUFFER_BIT,U.NEAREST):en?U.copyTexSubImage3D(Zt,ht,ie,ge,Ue+qe,Xt,Yt,xt,Dt):U.copyTexSubImage2D(Zt,ht,ie,ge,Xt,Yt,xt,Dt);Lt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else en?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Zt,ht,ie,ge,Ue,xt,Dt,Tt,le,zt,ye.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(Zt,ht,ie,ge,Ue,xt,Dt,Tt,le,ye.data):U.texSubImage3D(Zt,ht,ie,ge,Ue,xt,Dt,Tt,le,zt,ye):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ht,ie,ge,xt,Dt,le,zt,ye.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ht,ie,ge,ye.width,ye.height,le,ye.data):U.texSubImage2D(U.TEXTURE_2D,ht,ie,ge,xt,Dt,le,zt,ye);U.pixelStorei(U.UNPACK_ROW_LENGTH,ce),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ze),U.pixelStorei(U.UNPACK_SKIP_PIXELS,An),U.pixelStorei(U.UNPACK_SKIP_ROWS,Je),U.pixelStorei(U.UNPACK_SKIP_IMAGES,di),ht===0&&B.generateMipmaps&&U.generateMipmap(Zt),Lt.unbindTexture()},this.copyTextureToTexture3D=function(E,B,$=null,W=null,z=0){return hr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,B,$,W,z)},this.initRenderTarget=function(E){kt.get(E).__webglFramebuffer===void 0&&Kt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Kt.setTextureCube(E,0):E.isData3DTexture?Kt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Kt.setTexture2DArray(E,0):Kt.setTexture2D(E,0),Lt.unbindTexture()},this.resetState=function(){P=0,R=0,I=null,Lt.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=me._getDrawingBufferColorSpace(t),e.unpackColorSpace=me._getUnpackColorSpace()}}const bc={type:"change"},Ja={type:"start"},Pu={type:"end"},bs=new du,Tc=new ni,N0=Math.cos(70*hd.DEG2RAD),Oe=new V,sn=2*Math.PI,Ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ko=1e-6;class F0 extends Zd{constructor(t,e=null){super(t,e),this.state=Ee.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:cr.ROTATE,MIDDLE:cr.DOLLY,RIGHT:cr.PAN},this.touches={ONE:ar.ROTATE,TWO:ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Oi,this._lastTargetPosition=new V,this._quat=new Oi().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Jl,this._sphericalDelta=new Jl,this._scale=1,this._panOffset=new V,this._rotateStart=new Jt,this._rotateEnd=new Jt,this._rotateDelta=new Jt,this._panStart=new Jt,this._panEnd=new Jt,this._panDelta=new Jt,this._dollyStart=new Jt,this._dollyEnd=new Jt,this._dollyDelta=new Jt,this._dollyDirection=new V,this._mouse=new Jt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=B0.bind(this),this._onPointerDown=O0.bind(this),this._onPointerUp=k0.bind(this),this._onContextMenu=$0.bind(this),this._onMouseWheel=V0.bind(this),this._onKeyDown=G0.bind(this),this._onTouchStart=W0.bind(this),this._onTouchMove=X0.bind(this),this._onMouseDown=z0.bind(this),this._onMouseMove=H0.bind(this),this._interceptControlDown=q0.bind(this),this._interceptControlUp=Y0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(bc),this.update(),this.state=Ee.NONE}update(t=null){const e=this.object.position;Oe.copy(e).sub(this.target),Oe.applyQuaternion(this._quat),this._spherical.setFromVector3(Oe),this.autoRotate&&this.state===Ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Oe.setFromSpherical(this._spherical),Oe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Oe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Oe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new V(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new V(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Oe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(bs.origin.copy(this.object.position),bs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bs.direction))<N0?this.object.lookAt(this.target):(Tc.setFromNormalAndCoplanarPoint(this.object.up,this.target),bs.intersectPlane(Tc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ko||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ko||this._lastTargetPosition.distanceToSquared(this.target)>ko?(this.dispatchEvent(bc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Oe.setFromMatrixColumn(e,0),Oe.multiplyScalar(-t),this._panOffset.add(Oe)}_panUp(t,e){this.screenSpacePanning===!0?Oe.setFromMatrixColumn(e,1):(Oe.setFromMatrixColumn(e,0),Oe.crossVectors(this.object.up,Oe)),Oe.multiplyScalar(t),this._panOffset.add(Oe)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Oe.copy(r).sub(this.target);let s=Oe.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Jt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function O0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function B0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function k0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pu),this.state=Ee.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function z0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case cr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Ee.DOLLY;break;case cr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ee.ROTATE}break;case cr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ee.PAN}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Ja)}function H0(n){switch(this.state){case Ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function V0(n){this.enabled===!1||this.enableZoom===!1||this.state!==Ee.NONE||(n.preventDefault(),this.dispatchEvent(Ja),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Pu))}function G0(n){this.enabled!==!1&&this._handleKeyDown(n)}function W0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Ee.TOUCH_ROTATE;break;case ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Ee.TOUCH_PAN;break;default:this.state=Ee.NONE}break;case 2:switch(this.touches.TWO){case ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Ee.TOUCH_DOLLY_PAN;break;case ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Ee.TOUCH_DOLLY_ROTATE;break;default:this.state=Ee.NONE}break;default:this.state=Ee.NONE}this.state!==Ee.NONE&&this.dispatchEvent(Ja)}function X0(n){switch(this._trackPointer(n),this.state){case Ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Ee.NONE}}function $0(n){this.enabled!==!1&&n.preventDefault()}function q0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Y0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const j0=1512207,K0=13208418;function Z0(n){const t=new I0({canvas:n,antialias:!0});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setClearColor(j0);const e=new zd,i=new mn(45,1,1,8e3);i.position.set(50,120,240),e.add(new qd(15786708,3812900,.9));const r=new Zl(16774376,1.6);r.position.set(2,3,2),e.add(r);const s=new Zl(12626068,.5);s.position.set(-2,1,-1.5),e.add(s);const o=new Lr;o.rotation.x=-Math.PI/2,e.add(o);const a=new Wd({color:K0,metalness:.05,roughness:.55}),l=new F0(i,n);l.enableDamping=!0,l.dampingFactor=.08;const c=[];let u=!1,h=0;function d(){const p=n.clientWidth,f=n.clientHeight;if(p===0||f===0)return;const T=Math.min(window.devicePixelRatio,2);(n.width!==Math.round(p*T)||n.height!==Math.round(f*T))&&(t.setSize(p,f,!1),i.aspect=p/f,i.updateProjectionMatrix())}function g(){u||(d(),l.update(),t.render(e,i),requestAnimationFrame(g))}requestAnimationFrame(g);function v(p){const f=i.fov*Math.PI/180,T=i.aspect>0?i.aspect:1,w=2*Math.atan(Math.tan(f/2)*T);return p/Math.sin(Math.min(f,w)/2)*1.12}function x(){for(const p of c)o.remove(p),p.geometry.dispose();c.length=0}return{setMesh(p){this.setMeshes([p])},setMeshes(p){x();const f=new Sr;for(const P of p){const R=new ui;R.setAttribute("position",new hn(P.positions,3)),R.setAttribute("normal",new hn(P.normals,3)),R.setIndex(new hn(P.indices,1)),R.computeBoundingBox(),R.boundingBox&&f.union(R.boundingBox);const I=new Cn(R,a);o.add(I),c.push(I)}if(f.isEmpty())return;const T=new V;f.getCenter(T);for(const P of c)P.position.set(-T.x,-T.y,-T.z);l.target.set(0,0,0);const w=new V;f.getSize(w);const b=w.length()/2,F=v(b);i.near=Math.max(.1,F/500),i.far=F*20,i.updateProjectionMatrix(),Math.abs(b-h)>h*.08&&(i.position.setLength(F),h=b)},dispose(){u=!0,l.dispose(),x(),a.dispose(),t.dispose()}}}const Hn=1.5,Ii=(n,t,e)=>Math.min(e,Math.max(t,n)),Pi=(n,t,e)=>n+(t-n)*e;function J0(n){const t=Ii(n,0,1);return t*t*(3-2*t)}const Ac=.14;function Du(n,t){return 1+n*J0((t-(1-Ac))/Ac)}function Lu(n,t){const e=[];for(let i=0;i<n;i++){const r=i/(n-1);e.push({t:r,r:Math.max(Hn,t(r))})}return e}const Uu=25,Q0={id:"pot",label:"Горшок",examples:"горшок, крынка, корчага, канопка",defaultHeightMm:150,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:170,unit:"mm"},{key:"dNeck",label:"Горло",min:20,max:300,step:1,default:108,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:104,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.25,max:.8,step:.01,default:.52,unit:"x"},{key:"shoulder",label:"Плечо",min:0,max:1,step:.01,default:.45,unit:"x",hint:"резкость перехода тулово → горло"},{key:"neckH",label:"Высота горла",min:0,max:.4,step:.01,default:.16,unit:"x"},{key:"rimFlare",label:"Отгиб венчика",min:-.1,max:.6,step:.01,default:.18,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,r=n.dNeck/2,s=r*(1+n.rimFlare),o=Ii(n.bellyAt,.15,.82),a=Math.max(o+.1,1-n.neckH),l=[{t:0,r:e},{t:o,r:i}];return a<.995&&(l.push({t:Pi(o,a,Pi(.45,.72,n.shoulder)),r:Pi(r,i,Pi(.42,.78,n.shoulder))}),l.push({t:a,r})),l.push({t:1,r:s}),l.map(c=>({t:c.t,r:Math.max(Hn,c.r)}))}},tv={id:"bowl",label:"Миска",examples:"миска, тарелка, пиала, килик",defaultHeightMm:80,params:[{key:"dRim",label:"Верх",min:60,max:400,step:1,default:210,unit:"mm"},{key:"dFoot",label:"Дно",min:20,max:300,step:1,default:92,unit:"mm"},{key:"curvature",label:"Округлость",min:0,max:1,step:.01,default:.6,unit:"x",hint:"0 — прямой конус, 1 — полусфера"},{key:"footH",label:"Ножка",min:0,max:60,step:1,default:8,unit:"mm"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,r=Ii(n.footH/Math.max(1,t),0,.45),s=n.curvature;return Lu(Uu,o=>{if(o<=r)return e;const a=(o-r)/(1-r),l=Pi(a,Math.sqrt(Math.max(0,1-(1-a)*(1-a))),s);return Pi(e,i,l)*Du(n.rimFlare,o)})}},ev={id:"cup",label:"Чашка",examples:"чашка, стакан, кружка, скифос",defaultHeightMm:95,params:[{key:"dRim",label:"Верх",min:30,max:220,step:1,default:84,unit:"mm"},{key:"dFoot",label:"Дно",min:25,max:200,step:1,default:66,unit:"mm"},{key:"barrel",label:"Бочка",min:-.25,max:.35,step:.01,default:.06,unit:"x",hint:">0 — выпуклые бока, <0 — талия"},{key:"rimFlare",label:"Отгиб края",min:-.08,max:.4,step:.01,default:0,unit:"x"}],points(n,t){const e=n.dFoot/2,i=n.dRim/2,r=(e+i)/2;return Lu(Uu,s=>(Pi(e,i,s)+n.barrel*r*Math.sin(Math.PI*s))*Du(n.rimFlare,s))}},nv={id:"vase",label:"Ваза",examples:"ваза, амфора, кувшин, бутылка, лекиф",defaultHeightMm:260,params:[{key:"dBelly",label:"Тулово",min:40,max:320,step:1,default:156,unit:"mm"},{key:"dNeck",label:"Горло",min:12,max:200,step:1,default:54,unit:"mm"},{key:"dRim",label:"Устье",min:14,max:260,step:1,default:76,unit:"mm"},{key:"dFoot",label:"Дно",min:18,max:260,step:1,default:78,unit:"mm"},{key:"bellyAt",label:"Высота тулова",min:.2,max:.7,step:.01,default:.4,unit:"x"},{key:"neckAt",label:"Высота горла",min:.5,max:.95,step:.01,default:.79,unit:"x"},{key:"footH",label:"Ножка",min:0,max:90,step:1,default:12,unit:"mm"},{key:"rimFlare",label:"Отгиб венчика",min:-.2,max:.8,step:.01,default:0,unit:"x",hint:"раструб сверх диаметра устья"}],points(n,t){const e=n.dFoot/2,i=n.dBelly/2,r=n.dNeck/2,s=n.dRim/2*(1+n.rimFlare),o=Ii(n.bellyAt,.12,.72),a=Ii(n.neckAt,o+.12,.96),l=Ii(n.footH/Math.max(1,t),0,o-.06),c=[{t:0,r:e}];return l>.015&&c.push({t:l,r:e}),c.push({t:o,r:i}),c.push({t:a,r}),c.push({t:1,r:s}),c.map(u=>({t:u.t,r:Math.max(Hn,u.r)}))}},Ys=[Q0,tv,ev,nv];Ys.map(n=>n.id);function Iu(n){return Ys.some(t=>t.id===n)}function zi(n){const t=Ys.find(e=>e.id===n);if(!t)throw new Error(`unknown vessel family: ${n}`);return t}function iv(n){const t={};for(const e of zi(n).params)t[e.key]=e.default;return t}function js(n,t){const e={};for(const i of zi(n).params){const r=t[i.key];e[i.key]=typeof r=="number"&&Number.isFinite(r)?Ii(r,i.min,i.max):i.default}return e}function Qa(n,t,e){const i=zi(n),r=js(n,t),s=i.points(r,e);return s.sort((o,a)=>o.t-a.t),{familyId:n,heightMm:e,points:s}}function $n(n,t){const e=n.points;if(e.length===1||t<=e[0].t)return e[0].r;const i=e[e.length-1];if(t>=i.t)return i.r;let r=0;for(;r<e.length-2&&e[r+1].t<=t;)r++;const s=e[r],o=e[r+1],a=o.t-s.t;if(a<=0)return o.r;const[l,c]=rv(e,r),u=(t-s.t)/a,h=u*u,d=h*u,g=(2*d-3*h+1)*s.r+(d-2*h+u)*a*l+(-2*d+3*h)*o.r+(d-h)*a*c;return Math.max(Hn,g)}function Dr(n,t){const e=n[t+1].t-n[t].t;return e>0?(n[t+1].r-n[t].r)/e:0}function rv(n,t){const e=n.length,i=u=>u===0?Dr(n,0):u===e-1?Dr(n,e-2):(Dr(n,u-1)+Dr(n,u))/2,r=Dr(n,t);if(r===0)return[0,0];let s=i(t),o=i(t+1);s*r<0&&(s=0),o*r<0&&(o=0);const a=s/r,l=o/r,c=a*a+l*l;if(c>9){const u=3/Math.sqrt(c);s=u*a*r,o=u*l*r}return[s,o]}const wc="http://www.w3.org/2000/svg",Ia=30,Is=34;function sv(n){const t=Qa(n.id,{},n.defaultHeightMm),e=40,i=[];let r=0;for(let h=0;h<=e;h++){const d=$n(t,h/e);i.push(d),d>r&&(r=d)}const s=Math.min(Ia/(2*r),Is/t.heightMm),o=Ia/2,a=Is-(Is-t.heightMm*s)/2,l=(h,d)=>{const g=o+d*i[h]*s,v=a-h/e*t.heightMm*s;return`${g.toFixed(2)},${v.toFixed(2)}`},c=Array.from({length:e+1},(h,d)=>l(d,1)),u=Array.from({length:e+1},(h,d)=>l(e-d,-1));return`M${c.concat(u).join("L")}Z`}function ov(n,t,e){n.textContent="";const i=new Map;for(const r of Ys){const s=ne("button","family-btn");s.type="button",s.title=r.examples,s.setAttribute("aria-pressed",String(r.id===t));const o=document.createElementNS(wc,"svg");o.setAttribute("viewBox",`0 0 ${Ia} ${Is}`),o.setAttribute("aria-hidden","true");const a=document.createElementNS(wc,"path");a.setAttribute("d",sv(r)),o.append(a),s.append(o,ne("span",void 0,r.label)),s.addEventListener("click",()=>e(r.id)),n.append(s),i.set(r.id,s)}return{setActive(r){for(const[s,o]of i)o.setAttribute("aria-pressed",String(s===r))}}}function zo(n,t){return n.unit==="mm"?`${Math.round(t)}`:t.toFixed(2)}function av(n,t,e,i,r="p"){n.textContent="";const s=new Map,o=new Map;for(const a of t){const l=ne("label","row"),c=ne("span",void 0,a.label);a.hint&&(c.title=a.hint);const u=ne("input");u.type="range",u.id=`${r}_${a.key}`,u.min=String(a.min),u.max=String(a.max),u.step=String(a.step),u.value=String(e[a.key]??a.default);const h=ne("output",void 0,zo(a,Number(u.value))),d=ne("button","adj-btn","−"),g=ne("button","adj-btn","+");for(const[v,x]of[[d,-1],[g,1]])v.type="button",v.dataset.slider=u.id,v.dataset.dir=String(x),v.tabIndex=-1;u.addEventListener("input",()=>{const v=Number(u.value);h.textContent=zo(a,v),i(a.key,v)}),l.append(c,d,u,g,h),n.append(l),s.set(a.key,h),o.set(a.key,u)}return{setValues(a){for(const l of t){const c=a[l.key];if(typeof c!="number")continue;const u=o.get(l.key),h=s.get(l.key);u&&(u.value=String(c)),h&&(h.textContent=zo(l,c))}}}}const lv=["sin","tri","square","rounded"],cv=["z","theta","spiral"],uv=["weave","modulate"],Vs=Math.PI*2,Nu=4,hv=Math.tanh(Nu),yn=(n,t,e)=>Math.min(e,Math.max(t,n)),fv=n=>n-Math.floor(n);function Rc(n,t){const e=fv(t);switch(n){case"sin":return Math.sin(Vs*e);case"tri":return e<.25?4*e:e<.75?2-4*e:4*e-4;case"square":return Math.tanh(Nu*Math.sin(Vs*e))/hv;case"rounded":{const i=e<.5?e:e-.5,r=Math.sqrt(Math.max(0,1-(4*i-1)*(4*i-1)));return e<.5?r:-r}}}function Cc(n,t,e,i){switch(n){case"z":return e;case"theta":return t/Vs;case"spiral":return e+i*t/Vs}}function Pc(n){const t=yn(n,0,1);return t*t*(3-2*t)}function dv(n,t){const e=Math.max(n.fade,1e-6);return Pc((t-n.from)/e)*Pc((n.to-t)/e)}function pv(n,t,e){const{wave:i,wave2:r}=n;if(!i.on||i.ampMm===0)return 0;const s=r.on?Rc(r.shape,r.freq*Cc(r.axis,t,e,r.spiralK)+r.phase):0;let o=i.phase,a=i.ampMm;r.on&&r.mode==="modulate"&&(o+=r.fm*s,a*=Math.max(0,1+r.am*s));const l=Rc(i.shape,i.freq*Cc(i.axis,t,e,i.spiralK)+o),c=r.on&&r.mode==="weave"?l*s:l;return a*c*dv(n.zone,e)}function tl(){return{wave:{on:!1,axis:"z",shape:"rounded",freq:12,ampMm:2,phase:0,spiralK:1},wave2:{on:!1,mode:"weave",axis:"theta",shape:"sin",freq:8,phase:0,fm:.2,am:.5,spiralK:1},zone:{from:.08,to:.95,fade:.06}}}function Ts(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const dn=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t,Dc=(n,t)=>typeof n=="boolean"?n:t;function Lc(n,t){for(const e of lv)if(n===e)return e;return t}function Uc(n,t){for(const e of cv)if(n===e)return e;return t}function mv(n,t){for(const e of uv)if(n===e)return e;return t}const el=64,Gs=20,yr=12;function Ic(n,t){const e=yn(t,0,el);return n==="z"?e:Math.round(e)}function Nc(n,t,e){const i=yn(e,-yr,yr);return n!=="spiral"||t<1?i:Math.round(t*i)/t}function _v(n){const t=Ts(n),e=tl(),i=Ts(t.wave),r=Uc(i.axis,e.wave.axis),s=Ic(r,dn(i.freq,e.wave.freq)),o={on:Dc(i.on,e.wave.on),axis:r,shape:Lc(i.shape,e.wave.shape),freq:s,ampMm:yn(dn(i.ampMm,e.wave.ampMm),-Gs,Gs),phase:yn(dn(i.phase,e.wave.phase),-1,1),spiralK:Nc(r,s,dn(i.spiralK,e.wave.spiralK))},a=Ts(t.wave2),l=Uc(a.axis,e.wave2.axis),c=Ic(l,dn(a.freq,e.wave2.freq)),u={on:Dc(a.on,e.wave2.on),mode:mv(a.mode,e.wave2.mode),axis:l,shape:Lc(a.shape,e.wave2.shape),freq:c,phase:yn(dn(a.phase,e.wave2.phase),-1,1),fm:yn(dn(a.fm,e.wave2.fm),-1,1),am:yn(dn(a.am,e.wave2.am),0,1),spiralK:Nc(l,c,dn(a.spiralK,e.wave2.spiralK))},h=Ts(t.zone),d=yn(dn(h.from,e.zone.from),0,1),g=yn(dn(h.to,e.zone.to),0,1),v={from:Math.min(d,g),to:Math.max(d,g),fade:yn(dn(h.fade,e.zone.fade),0,.5)};return{wave:o,wave2:u,zone:v}}const Fu=["rope","zigzag","dots","diamonds","dashes","lattice","meander","band"],Na=Math.PI*2,Fc=.12,gv=.075,_n=(n,t,e)=>Math.min(e,Math.max(t,n)),dr=n=>n-Math.floor(n);function Fa(n){const t=_n(n,0,1);return t*t*(3-2*t)}function Ns(n,t){const e=Math.abs(n);return e<t?.5*(1+Math.cos(Math.PI*e/t)):0}function As(n,t=.5){return Ns(dr(n+.5)-.5,t)}const vv=[[0,.15,1,.15],[.95,.15,.95,.85],[.95,.85,.15,.85],[.15,.85,.15,.45],[.15,.45,.55,.45]];function xv(n,t,e,i,r,s,o){const a=(n-e)*o.elementMm,l=(t-i)*o.bandMm,c=(r-e)*o.elementMm,u=(s-i)*o.bandMm,h=c*c+u*u,d=h>1e-12?_n((a*c+l*u)/h,0,1):0;return Math.hypot(a-d*c,l-d*u)}function Mv(n,t,e,i){switch(n){case"rope":return As(t-e);case"zigzag":{const r=.5*Math.abs(2*e-1);return As(t-r,.4)}case"dots":return yv(t,e,i);case"diamonds":{const r=(Math.abs(dr(t)-.5)+Math.abs(e-.5))*2;return Fa(1-r)}case"dashes":return Ns(dr(t)-.5,.22)*Ns(e-.5,.35);case"lattice":return Math.max(As(t-e,.22),As(t+e,.22));case"meander":{const r=gv*Math.min(i.elementMm,i.bandMm);let s=1/0;const o=dr(t);for(const[a,l,c,u]of vv)s=Math.min(s,xv(o,e,a,l,c,u,i));return Ns(s,r)}case"band":return Math.sqrt(Math.max(0,1-(2*e-1)*(2*e-1)))}}function yv(n,t,e){const i=Math.min(e.elementMm,e.bandMm)/2;if(i<=0)return 0;const r=(dr(n)-.5)*e.elementMm,s=(t-.5)*e.bandMm,o=Math.hypot(r,s);if(o>=i)return 0;const a=Math.max(e.depthMm,1e-6),l=(i*i+a*a)/(2*a),c=Math.sqrt(Math.max(0,l*l-o*o))-(l-a);return _n(c/a,0,1)}function Ou(n,t){if(n.repeats>=3)return Math.round(n.repeats);const e=Na*Math.max(1,t.radiusAt(n.bandCenter));return _n(Math.round(e/Math.max(1,n.bandWidthMm)),3,nl)}function Sv(n,t){const e=[];for(const i of n.bands){if(!i.on||i.depthMm===0)continue;const r=Ou(i,t),s=Na*Math.max(1,t.radiusAt(i.bandCenter))/r,o=_n(1-i.gapMm/s,.15,1),a=_n(i.bandWidthMm/Math.max(1,t.heightMm),1e-4,1);e.push({pattern:i.pattern,bottom:i.bandCenter-a/2,bandH:a,repeats:r,fill:o,depthMm:i.depthMm,angle:i.angle,tile:{elementMm:s*o,bandMm:i.bandWidthMm,depthMm:Math.abs(i.depthMm)}})}return e.length===0?()=>0:(i,r)=>{let s=0;for(const o of e){const a=(r-o.bottom)/o.bandH;if(a<0||a>1)continue;const l=o.repeats*(i/Na)+o.angle*a,c=(dr(l)-.5)/o.fill+.5;if(c<0||c>1)continue;const u=Fa(a/Fc)*Fa((1-a)/Fc);s+=Mv(o.pattern,c,a,o.tile)*u*o.depthMm}return s}}const nl=400,Ws=8,Bu=200,ku=100,Oa=4;function il(){return{on:!1,pattern:"rope",bandCenter:.62,bandWidthMm:14,depthMm:1.2,repeats:0,gapMm:0,angle:0}}function rl(){return{bands:[il()]}}function zu(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}const sr=(n,t)=>typeof n=="number"&&Number.isFinite(n)?n:t;function Oc(n){const t=zu(n),e=il();let i=e.pattern;for(const s of Fu)t.pattern===s&&(i=s);const r=sr(t.repeats,e.repeats);return{on:typeof t.on=="boolean"?t.on:e.on,pattern:i,bandCenter:_n(sr(t.bandCenter,e.bandCenter),0,1),bandWidthMm:_n(sr(t.bandWidthMm,e.bandWidthMm),1,Bu),depthMm:_n(sr(t.depthMm,e.depthMm),-Ws,Ws),repeats:r<3?0:_n(Math.round(r),3,nl),gapMm:_n(sr(t.gapMm,e.gapMm),0,ku),angle:_n(sr(t.angle,e.angle),-2,2)}}function Ev(n){const t=zu(n);return Array.isArray(t.bands)?{bands:t.bands.slice(0,Oa).map(Oc)}:Object.keys(t).length>0?{bands:[Oc(t)]}:rl()}function bv(n){return n>=1?0:n>=.1?1:2}function Ho(n,t){const e=t.toFixed(bv(n.step));return n.unit?`${e}`:e}function Xn(n,t,e,i,r){n.textContent="";const s=[];for(const o of t){const a=ne("label","row"),l=ne("span",void 0,o.label);if(o.hint&&(l.title=o.hint),a.append(l),o.kind==="select"){const c=ne("select");c.id=`${r}_${o.key}`;for(const u of o.options){const h=ne("option",void 0,u.label);h.value=u.value,c.append(h)}c.value=o.get(e()),c.addEventListener("change",()=>i(o.set(e(),c.value))),a.append(c),s.push(u=>{c.value=o.get(u)})}else{const c=ne("input");c.type="range",c.id=`${r}_${o.key}`,c.min=String(o.min),c.max=String(o.max),c.step=String(o.step),c.value=String(o.get(e()));const u=ne("output",void 0,Ho(o,o.get(e()))),h=ne("button","adj-btn","−"),d=ne("button","adj-btn","+");for(const[g,v]of[[h,-1],[d,1]])g.type="button",g.dataset.slider=c.id,g.dataset.dir=String(v),g.tabIndex=-1;c.addEventListener("input",()=>{const g=Number(c.value);u.textContent=Ho(o,g),i(o.set(e(),g))}),a.append(h,c,d,u),s.push(g=>{const v=o.get(g);c.value=String(v),u.textContent=Ho(o,v)})}n.append(a)}return{sync(o){for(const a of s)a(o)}}}function Ir(n,t){const e=ne("section","fcard");e.id=`card_${t.id}`;const i=ne("div","fcard-head"),r=ne("input");r.type="checkbox",r.checked=t.enabled,r.id=`on_${t.id}`;const s=ne("span","fcard-title",t.title),o=ne("span","fcard-caret",t.enabled?"▾":"▸");i.append(r,s),t.tag&&i.append(ne("span","fcard-tag",t.tag)),i.append(o);const a=ne("div","fcard-body");t.desc&&a.append(ne("p","fcard-desc",t.desc));const l=ne("div");a.append(l);function c(h){e.classList.toggle("collapsed",h),o.textContent=h?"▸":"▾"}c(!t.enabled),r.addEventListener("click",h=>{h.stopPropagation(),c(!r.checked),t.onToggle(r.checked)}),i.addEventListener("click",()=>c(!e.classList.contains("collapsed"))),e.append(i,a),n.append(e);let u=t.enabled;return{body:l,setEnabled(h){r.checked=h,h!==u&&(c(!h),u=h)}}}const Hu=[{value:"z",label:"по высоте"},{value:"theta",label:"вокруг оси"},{value:"spiral",label:"по спирали"}],Vu=[{value:"sin",label:"синус"},{value:"tri",label:"треугольник"},{value:"square",label:"меандр"},{value:"rounded",label:"валики"}],Tv=[{value:"band",label:"полоса"},{value:"rope",label:"верёвочка"},{value:"meander",label:"греческий меандр"},{value:"zigzag",label:"зигзаг"},{value:"dots",label:"точки"},{value:"diamonds",label:"ромбы"},{value:"dashes",label:"насечки"},{value:"lattice",label:"сетка"}],Av=[{value:"weave",label:"плетение (w₁ × w₂)"},{value:"modulate",label:"модуляция (w₂ гнёт w₁)"}],Gu="работает при оси «по спирали»",wv=[{kind:"select",key:"axis",label:"Куда бежит",options:Hu,get:n=>n.wave.axis,set:(n,t)=>({...n,wave:{...n.wave,axis:Wu(t)}})},{kind:"select",key:"shape",label:"Форма",options:Vu,get:n=>n.wave.shape,set:(n,t)=>({...n,wave:{...n.wave,shape:Xu(t)}})},{kind:"range",key:"freq",label:"Гребней",min:0,max:el,step:1,get:n=>n.wave.freq,set:(n,t)=>({...n,wave:{...n.wave,freq:t}})},{kind:"range",key:"amp",label:"Глубина",min:-Gs,max:Gs,step:.1,unit:"мм",get:n=>n.wave.ampMm,set:(n,t)=>({...n,wave:{...n.wave,ampMm:t}})},{kind:"range",key:"phase",label:"Фаза",min:-1,max:1,step:.01,get:n=>n.wave.phase,set:(n,t)=>({...n,wave:{...n.wave,phase:t}})},{kind:"range",key:"spiralK",label:"Шаг спирали",min:-yr,max:yr,step:.05,hint:Gu,get:n=>n.wave.spiralK,set:(n,t)=>({...n,wave:{...n.wave,spiralK:t}})},{kind:"range",key:"zoneFrom",label:"Зона снизу",min:0,max:1,step:.01,hint:"ниже этой доли высоты рельефа нет",get:n=>n.zone.from,set:(n,t)=>({...n,zone:{...n.zone,from:t}})},{kind:"range",key:"zoneTo",label:"Зона сверху",min:0,max:1,step:.01,get:n=>n.zone.to,set:(n,t)=>({...n,zone:{...n.zone,to:t}})},{kind:"range",key:"zoneFade",label:"Растушёвка",min:0,max:.5,step:.01,get:n=>n.zone.fade,set:(n,t)=>({...n,zone:{...n.zone,fade:t}})}],Rv=[{kind:"select",key:"mode",label:"Как связаны",options:Av,hint:"плетение — простое произведение волн: корзинка, вафля",get:n=>n.wave2.mode,set:(n,t)=>({...n,wave2:{...n.wave2,mode:t==="modulate"?"modulate":"weave"}})},{kind:"select",key:"axis2",label:"Куда бежит",options:Hu,get:n=>n.wave2.axis,set:(n,t)=>({...n,wave2:{...n.wave2,axis:Wu(t)}})},{kind:"select",key:"shape2",label:"Форма",options:Vu,get:n=>n.wave2.shape,set:(n,t)=>({...n,wave2:{...n.wave2,shape:Xu(t)}})},{kind:"range",key:"freq2",label:"Гребней",min:0,max:el,step:1,get:n=>n.wave2.freq,set:(n,t)=>({...n,wave2:{...n.wave2,freq:t}})},{kind:"range",key:"phase2",label:"Фаза",min:-1,max:1,step:.01,get:n=>n.wave2.phase,set:(n,t)=>({...n,wave2:{...n.wave2,phase:t}})},{kind:"range",key:"spiralK2",label:"Шаг спирали",min:-yr,max:yr,step:.05,hint:Gu,get:n=>n.wave2.spiralK,set:(n,t)=>({...n,wave2:{...n.wave2,spiralK:t}})}],Cv=[{kind:"range",key:"fm",label:"Гнёт фазу",min:-1,max:1,step:.01,hint:"вторая волна сдвигает гребни первой",get:n=>n.wave2.fm,set:(n,t)=>({...n,wave2:{...n.wave2,fm:t}})},{kind:"range",key:"am",label:"Гнёт глубину",min:0,max:1,step:.01,hint:"вторая волна то усиливает, то гасит первую",get:n=>n.wave2.am,set:(n,t)=>({...n,wave2:{...n.wave2,am:t}})}];function Pv(n){const t=i=>i.bands[n],e=(i,r)=>({bands:i.bands.map((s,o)=>o===n?r:s)});return[{kind:"select",key:"pattern",label:"Узор",options:Tv,get:i=>t(i).pattern,set:(i,r)=>e(i,{...t(i),pattern:Dv(r)})},{kind:"range",key:"bandCenter",label:"Высота пояса",min:0,max:1,step:.01,get:i=>t(i).bandCenter,set:(i,r)=>e(i,{...t(i),bandCenter:r})},{kind:"range",key:"bandWidth",label:"Ширина",min:1,max:Bu,step:1,unit:"мм",get:i=>t(i).bandWidthMm,set:(i,r)=>e(i,{...t(i),bandWidthMm:r})},{kind:"range",key:"depth",label:"Глубина",min:-Ws,max:Ws,step:.1,unit:"мм",hint:"> 0 — выпуклый узор, < 0 — вдавленный",get:i=>t(i).depthMm,set:(i,r)=>e(i,{...t(i),depthMm:r})},{kind:"range",key:"repeats",label:"Оттисков",min:0,max:nl,step:1,hint:"0 — подобрать по размеру изделия",get:i=>t(i).repeats,set:(i,r)=>e(i,{...t(i),repeats:r})},{kind:"range",key:"gap",label:"Просвет",min:0,max:ku,step:.5,unit:"мм",hint:"гладкая полоска между соседними оттисками",get:i=>t(i).gapMm,set:(i,r)=>e(i,{...t(i),gapMm:r})},{kind:"range",key:"angle",label:"Наклон",min:-2,max:2,step:.05,get:i=>t(i).angle,set:(i,r)=>e(i,{...t(i),angle:r})}]}function Wu(n){return n==="theta"||n==="spiral"?n:"z"}function Xu(n){return n==="tri"||n==="square"||n==="rounded"?n:"sin"}function Dv(n){for(const t of Fu)if(n===t)return t;return"rope"}function Lv(n,t,e){let i=[],r=[],s=-1;const o=ne("button","tb-btn","+ Полоса");o.type="button",o.addEventListener("click",()=>{const c=t().bands;c.length>=Oa||e({bands:[...c,{...il(),on:!0,bandCenter:a(c)}]})});function a(c){for(const u of[.62,.3,.85,.46])if(c.every(h=>Math.abs(h.bandCenter-u)>.08))return u;return .5}function l(c){n.textContent="",i=[],r=[];for(let u=0;u<c;u++){const h=ne("div","band-box"),d=ne("div","band-head");d.append(ne("span",void 0,`Полоса ${u+1}`));const g=ne("button","adj-btn band-del","✕");g.type="button",g.title="Убрать полосу",g.addEventListener("click",()=>{e({bands:t().bands.filter((p,f)=>f!==u)})}),d.append(g),h.append(d);const v=ne("div");h.append(v),i.push(Xn(v,Pv(u),t,e,`roul${u}`));const x=ne("p","fcard-desc");h.append(x),r.push(x),n.append(h)}n.append(o),s=c}return{sync(c,u){c.bands.length!==s&&l(c.bands.length),o.hidden=c.bands.length>=Oa;for(let h=0;h<c.bands.length;h++)i[h].sync(c),r[h].textContent=u(c.bands[h])}}}function Uv(n,t,e,i,r){n.textContent="";const s=Ir(n,{id:"wave",title:"Волна",desc:"Смещает поверхность вдоль нормали. Глубина — в миллиметрах.",enabled:t().wave.on,onToggle:v=>i({...t(),wave:{...t().wave,on:v}})}),o=Xn(s.body,wv,t,i,"wave"),a=Ir(n,{id:"wave2",title:"Волна волны",tag:"2-й порядок",desc:"Плетение — произведение двух волн: корзинка, вафля. Модуляция — вторая волна гнёт первую.",enabled:t().wave2.on,onToggle:v=>i({...t(),wave2:{...t().wave2,on:v}})}),l=Xn(a.body,Rv,t,i,"wave2"),c=ne("div");a.body.append(c);const u=Xn(c,Cv,t,i,"wave2"),h=Ir(n,{id:"roulette",title:"Накатка роликом",desc:"Колесо-штамп прокатывается по пояску. За оборот всегда укладывается целое число оттисков.",enabled:e().bands.some(v=>v.on),onToggle:v=>r({bands:e().bands.map(x=>({...x,on:v}))})}),d=Lv(h.body,e,r);let g=()=>"";return{sync(v,x){s.setEnabled(v.wave.on),a.setEnabled(v.wave2.on),h.setEnabled(x.bands.some(p=>p.on)),o.sync(v),l.sync(v),c.hidden=v.wave2.mode!=="modulate",u.sync(v),d.sync(x,g)},setBandNote(v){g=v}}}function Iv(n){return n.wrapV?n.nv:n.nv+1}function Nv(n,t,e){if(n<3||t<1)throw new Error(`sampleGrid: bad dims ${n}x${t}`);const i=new Float32Array(n*(t+1)*3),r=new Float64Array(3);for(let s=0;s<=t;s++){const o=s/t;for(let a=0;a<n;a++){const l=2*Math.PI*a/n;e(l,o,r);const c=(s*n+a)*3;i[c]=r[0],i[c+1]=r[1],i[c+2]=r[2]}}return{nu:n,nv:t,positions:i}}function Fv(n,t,e=!1){const i=t,r=e?t:t+1,s=new Uint32Array(n*i*6);let o=0;for(let a=0;a<i;a++){const l=e?(a+1)%r:a+1;for(let c=0;c<n;c++){const u=(c+1)%n,h=a*n+c,d=a*n+u,g=l*n+u,v=l*n+c;s[o++]=h,s[o++]=d,s[o++]=g,s[o++]=h,s[o++]=g,s[o++]=v}}return s}function Ov(n,t,e=[]){const{nu:i,nv:r}=n,s=i*(r+1),o=e.length,a=2*s+o*i+2,l=new Float32Array(a*3);l.set(n.positions,0),l.set(t,s*3);const c=0,u=s,h=2*s;for(let R=0;R<o;R++)l.set(e[R],(h+R*i)*3);const d=h+o*i,g=d+1,v=i*r*2*2,x=i*2,p=i*2*(o+1),f=new Uint32Array((v+x+p)*3);let T=0;for(let R=0;R<r;R++)for(let I=0;I<i;I++){const S=(I+1)%i,y=c+R*i+I,N=c+R*i+S,Y=c+(R+1)*i+S,X=c+(R+1)*i+I;f[T++]=y,f[T++]=N,f[T++]=Y,f[T++]=y,f[T++]=Y,f[T++]=X}for(let R=0;R<r;R++)for(let I=0;I<i;I++){const S=(I+1)%i,y=u+R*i+I,N=u+(R+1)*i+I,Y=u+(R+1)*i+S,X=u+R*i+S;f[T++]=y,f[T++]=N,f[T++]=Y,f[T++]=y,f[T++]=Y,f[T++]=X}const w=(R,I)=>{let S=0,y=0,N=0;for(let Y=0;Y<i;Y++){const X=(R+Y)*3;S+=l[X],y+=l[X+1],N+=l[X+2]}l[I*3]=S/i,l[I*3+1]=y/i,l[I*3+2]=N/i};w(c,d),w(u,g);for(let R=0;R<i;R++)f[T++]=d,f[T++]=c+(R+1)%i,f[T++]=c+R;for(let R=0;R<i;R++)f[T++]=g,f[T++]=u+R,f[T++]=u+(R+1)%i;const b=c+r*i,F=u+r*i,P=R=>R<0?b:R>=o?F:h+R*i;for(let R=-1;R<o;R++){const I=P(R),S=P(R+1);for(let y=0;y<i;y++){const N=(y+1)%i;f[T++]=I+y,f[T++]=I+N,f[T++]=S+N,f[T++]=I+y,f[T++]=S+N,f[T++]=S+y}}return{positions:l,indices:f}}function sl(n,t){const{nu:e,nv:i,positions:r}=n,s=Fv(e,i),o=2,a=e*(i+1),l=new Float32Array((a+o)*3);l.set(r);const c=e+e,u=new Uint32Array(s.length+c*3);u.set(s);let h=s.length,d=a;const g=v=>{let x=0,p=0,f=0;for(let T=0;T<e;T++){const w=(v*e+T)*3;x+=r[w],p+=r[w+1],f+=r[w+2]}return[x/e,p/e,f/e]};{const v=d++,[x,p,f]=g(0);l[v*3]=x,l[v*3+1]=p,l[v*3+2]=f;for(let T=0;T<e;T++)u[h++]=v,u[h++]=(T+1)%e,u[h++]=T}{const v=d,[x,p,f]=g(i);l[v*3]=x,l[v*3+1]=p,l[v*3+2]=f;const T=i*e;for(let w=0;w<e;w++)u[h++]=v,u[h++]=T+w,u[h++]=T+(w+1)%e}return{positions:l,indices:u}}function Bv(n){const{nu:t,nv:e,positions:i}=n,r=Iv(n),s=new Float32Array(t*r*3),o=(a,l,c)=>i[(l*t+(a+t)%t)*3+c];for(let a=0;a<r;a++){const l=n.wrapV?(a-1+r)%r:Math.max(0,a-1),c=n.wrapV?(a+1)%r:Math.min(e,a+1);for(let u=0;u<t;u++){const h=o(u+1,a,0)-o(u-1,a,0),d=o(u+1,a,1)-o(u-1,a,1),g=o(u+1,a,2)-o(u-1,a,2),v=o(u,c,0)-o(u,l,0),x=o(u,c,1)-o(u,l,1),p=o(u,c,2)-o(u,l,2);let f=d*p-g*x,T=g*v-h*p,w=h*x-d*v;const b=Math.hypot(f,T,w);b>1e-12?(f/=b,T/=b,w/=b):(f=0,T=0,w=a===0?-1:1);const F=(a*t+u)*3;s[F]=f,s[F+1]=T,s[F+2]=w}}return s}function qr(n,t){const e=new Float32Array(n.length);for(let i=0;i<t.length;i+=3){const r=t[i]*3,s=t[i+1]*3,o=t[i+2]*3,a=n[s]-n[r],l=n[s+1]-n[r+1],c=n[s+2]-n[r+2],u=n[o]-n[r],h=n[o+1]-n[r+1],d=n[o+2]-n[r+2],g=l*d-c*h,v=c*u-a*d,x=a*h-l*u;for(const p of[r,s,o])e[p]+=g,e[p+1]+=v,e[p+2]+=x}for(let i=0;i<e.length;i+=3){const r=Math.hypot(e[i],e[i+1],e[i+2]);r>1e-12&&(e[i]/=r,e[i+1]/=r,e[i+2]/=r)}return e}function $u(n,t,e,i,r){const s=1-r,o=s*s*s,a=3*s*s*r,l=3*s*r*r,c=r*r*r;return{x:o*n.x+a*t.x+l*e.x+c*i.x,y:o*n.y+a*t.y+l*e.y+c*i.y,z:o*n.z+a*t.z+l*e.z+c*i.z}}function kv(n,t,e,i,r){const s=1-r,o=3*s*s,a=6*s*r,l=3*r*r;return{x:o*(t.x-n.x)+a*(e.x-t.x)+l*(i.x-e.x),y:o*(t.y-n.y)+a*(e.y-t.y)+l*(i.y-e.y),z:o*(t.z-n.z)+a*(e.z-t.z)+l*(i.z-e.z)}}function zv(n,t,e,i,r){const s=i+1,o=s*r+2,a=new Float32Array(o*3);for(let v=0;v<s;v++){const x=v/i,p=n(x),f=kc(t(x)),T={x:0,y:1,z:0},w=kc(Vv(f,T)),{halfDepth:b,halfWidth:F}=e(x);for(let P=0;P<r;P++){const R=2*Math.PI*P/r,I=Math.cos(R)*b,S=Math.sin(R)*F,y=(v*r+P)*3;a[y]=p.x+w.x*I+T.x*S,a[y+1]=p.y+w.y*I+T.y*S,a[y+2]=p.z+w.z*I+T.z*S}}const l=s*r,c=l+1;Bc(a,0,r,l),Bc(a,(s-1)*r,r,c);const u=i*r*2,h=new Uint32Array((u+r*2)*3);let d=0;for(let v=0;v<i;v++)for(let x=0;x<r;x++){const p=(x+1)%r,f=v*r+x,T=v*r+p,w=(v+1)*r+p,b=(v+1)*r+x;h[d++]=f,h[d++]=w,h[d++]=T,h[d++]=f,h[d++]=b,h[d++]=w}for(let v=0;v<r;v++){const x=(v+1)%r;h[d++]=l,h[d++]=v,h[d++]=x}const g=(s-1)*r;for(let v=0;v<r;v++){const x=(v+1)%r;h[d++]=c,h[d++]=g+x,h[d++]=g+v}return{positions:a,indices:h,normals:qr(a,h)}}function Hv(n){const t=new Float32Array(n.positions);for(let i=0;i<t.length;i+=3)t[i]=-t[i];const e=new Uint32Array(n.indices.length);for(let i=0;i<n.indices.length;i+=3)e[i]=n.indices[i],e[i+1]=n.indices[i+2],e[i+2]=n.indices[i+1];return{positions:t,indices:e,normals:qr(t,e)}}function Bc(n,t,e,i){let r=0,s=0,o=0;for(let a=0;a<e;a++){const l=(t+a)*3;r+=n[l],s+=n[l+1],o+=n[l+2]}n[i*3]=r/e,n[i*3+1]=s/e,n[i*3+2]=o/e}function kc(n){const t=Math.hypot(n.x,n.y,n.z);return t<1e-12?{x:0,y:0,z:1}:{x:n.x/t,y:n.y/t,z:n.z/t}}function Vv(n,t){return{x:n.y*t.z-n.z*t.y,y:n.z*t.x-n.x*t.z,z:n.x*t.y-n.y*t.x}}const qu=120,Yu=40,ri=75,Gv=2.5,Wv=64,Xv=24;function ju(){return{on:!1,count:1,topAt:.82,bottomAt:.3,reachMm:28,thicknessMm:11,widthRatio:.7,topAngleDeg:0,bottomAngleDeg:0}}const bi=(n,t,e)=>Math.min(e,Math.max(t,n));function $v(n){const t=ju(),e={};if(typeof n=="object"&&n!==null)for(const[s,o]of Object.entries(n))e[s]=o;const i=(s,o)=>typeof s=="number"&&Number.isFinite(s)?s:o,r=bi(i(e.topAt,t.topAt),.15,.98);return{on:typeof e.on=="boolean"?e.on:t.on,count:i(e.count,t.count)>=2?2:1,topAt:r,bottomAt:bi(i(e.bottomAt,t.bottomAt),.02,r-.1),reachMm:bi(i(e.reachMm,t.reachMm),3,qu),thicknessMm:bi(i(e.thicknessMm,t.thicknessMm),3,Yu),widthRatio:bi(i(e.widthRatio,t.widthRatio),.25,3),topAngleDeg:bi(i(e.topAngleDeg,t.topAngleDeg),-ri,ri),bottomAngleDeg:bi(i(e.bottomAngleDeg,t.bottomAngleDeg),-ri,ri)}}function ol(n,t,e){if(!n.on)return[];const i=$n(t,n.topAt),r=$n(t,n.bottomAt),s=Math.min(Gv,i*.4,r*.4),o={x:-(i-s),y:0,z:n.topAt*e},a={x:-(r-s),y:0,z:n.bottomAt*e},l=qv(n,o,a,i,r),[c,u]=Ku(n,o,a,i,r,l),h=n.thicknessMm/2,d=n.thicknessMm*n.widthRatio/2,g=zv(v=>$u(o,c,u,a,v),v=>kv(o,c,u,a,v),()=>({halfDepth:h,halfWidth:d}),Wv,Xv);return n.count>=2?[g,Hv(g)]:[g]}function Ku(n,t,e,i,r,s){const o=n.topAngleDeg*Math.PI/180,a=n.bottomAngleDeg*Math.PI/180;return[{x:-(i+s*Math.cos(o)),y:0,z:t.z+s*Math.sin(o)},{x:-(r+s*Math.cos(a)),y:0,z:e.z+s*Math.sin(a)}]}function qv(n,t,e,i,r){const s=Math.max(i,r),o=c=>{const[u,h]=Ku(n,t,e,i,r,c);let d=0;for(let g=0;g<=64;g++)d=Math.max(d,-$u(t,u,h,e,g/64).x);return d-s};let a=0,l=n.reachMm*4+10;for(let c=0;c<40;c++){const u=(a+l)/2;o(u)<n.reachMm?a=u:l=u}return l}const Zu=60;function al(){return{on:!1,pullMm:14,widthDeg:60,zone:.18}}const Fs=(n,t,e)=>Math.min(e,Math.max(t,n));function Yv(n){const t=al(),e={};if(typeof n=="object"&&n!==null)for(const[r,s]of Object.entries(n))e[r]=s;const i=(r,s)=>typeof r=="number"&&Number.isFinite(r)?r:s;return{on:typeof e.on=="boolean"?e.on:t.on,pullMm:Fs(i(e.pullMm,t.pullMm),0,Zu),widthDeg:Fs(i(e.widthDeg,t.widthDeg),15,180),zone:Fs(i(e.zone,t.zone),.03,.6)}}function jv(n){const t=Fs(n,0,1);return t*t*(3-2*t)}function Kv(n){if(!n.on||n.pullMm===0)return()=>0;const t=n.widthDeg*Math.PI/360,e=1-n.zone;return(i,r)=>{if(r<=e)return 0;const s=Math.abs((i+Math.PI)%(2*Math.PI)-Math.PI);if(s>=t)return 0;const o=.5*(1+Math.cos(Math.PI*s/t));return n.pullMm*o*jv((r-e)/n.zone)}}const Zv=[{kind:"select",key:"count",label:"Сколько",options:[{value:"1",label:"одна (кружка)"},{value:"2",label:"две (амфора)"}],get:n=>String(n.count),set:(n,t)=>({...n,count:t==="2"?2:1})},{kind:"range",key:"topAt",label:"Верх",min:.15,max:.98,step:.01,hint:"высота верхнего крепления, доля высоты изделия",get:n=>n.topAt,set:(n,t)=>({...n,topAt:t})},{kind:"range",key:"bottomAt",label:"Низ",min:.02,max:.88,step:.01,get:n=>n.bottomAt,set:(n,t)=>({...n,bottomAt:t})},{kind:"range",key:"reach",label:"Вынос",min:3,max:qu,step:1,unit:"мм",hint:"насколько дуга отходит от стенки",get:n=>n.reachMm,set:(n,t)=>({...n,reachMm:t})},{kind:"range",key:"thickness",label:"Толщина",min:3,max:Yu,step:.5,unit:"мм",get:n=>n.thicknessMm,set:(n,t)=>({...n,thicknessMm:t})},{kind:"range",key:"width",label:"Ширина",min:.25,max:3,step:.05,hint:"ширина сечения в долях толщины",get:n=>n.widthRatio,set:(n,t)=>({...n,widthRatio:t})},{kind:"range",key:"topAngle",label:"Угол вверху",min:-ri,max:ri,step:1,unit:"°",hint:"под каким наклоном дуга отходит от стенки; 0 — под прямым углом",get:n=>n.topAngleDeg,set:(n,t)=>({...n,topAngleDeg:t})},{kind:"range",key:"bottomAngle",label:"Угол внизу",min:-ri,max:ri,step:1,unit:"°",hint:"отрицательный уводит нижний конец дуги вниз",get:n=>n.bottomAngleDeg,set:(n,t)=>({...n,bottomAngleDeg:t})}],Jv=[{kind:"range",key:"pull",label:"Вытяг",min:0,max:Zu,step:.5,unit:"мм",get:n=>n.pullMm,set:(n,t)=>({...n,pullMm:t})},{kind:"range",key:"width",label:"Ширина",min:15,max:180,step:1,unit:"°",get:n=>n.widthDeg,set:(n,t)=>({...n,widthDeg:t})},{kind:"range",key:"zone",label:"Высота",min:.03,max:.6,step:.01,hint:"по какой доле высоты сверху идёт оттяжка",get:n=>n.zone,set:(n,t)=>({...n,zone:t})}];function Qv(n,t,e,i,r){n.textContent="";const s=Ir(n,{id:"handle",title:"Ручка",desc:"Дуга в плоскости разъёма формы: одна ручка сзади, две — зеркально, как у амфоры.",enabled:t().on,onToggle:c=>i({...t(),on:c})}),o=Xn(s.body,Zv,t,i,"handle"),a=Ir(n,{id:"spout",title:"Носик",desc:"Оттянутый наружу край, как у крынки. Смотрит вперёд, напротив ручки.",enabled:e().on,onToggle:c=>r({...e(),on:c})}),l=Xn(a.body,Jv,e,r,"spout");return{sync(c,u){s.setEnabled(c.on),a.setEnabled(u.on),o.sync(c),l.sync(u)}}}function Ju(n,t){const e=[],i=[];if(n.finite||e.push("Mesh contains non-finite coordinates or normals."),n.indicesValid||e.push("Mesh contains invalid triangle indices."),(n.triangleCount===0||n.vertexCount===0)&&e.push("Mesh is empty."),n.extents.some(r=>!Number.isFinite(r)||r<=1e-9)&&e.push("Mesh has zero extent on at least one axis."),n.watertight||e.push("Solid mesh is not watertight."),n.volume<0&&e.push("Solid mesh is oriented inside-out."),n.degenerateTriangles>0){const r=n.triangleCount>0?n.degenerateTriangles/n.triangleCount:1,s=`${n.degenerateTriangles} degenerate triangle(s) (${(r*100).toFixed(2)}%).`;r>.01?e.push(s):i.push(s)}return{blocking:e,warnings:i}}function tx(n,t=60){const{positions:e,indices:i}=n;let r=1/0,s=-1/0;for(let u=2;u<e.length;u+=3)e[u]<r&&(r=e[u]),e[u]>s&&(s=e[u]);const o=r+.02*(s-r),a=Math.sin(t*Math.PI/180);let l=0,c=0;for(let u=0;u<i.length;u+=3){const h=i[u]*3,d=i[u+1]*3,g=i[u+2]*3;if(e[h+2]<o&&e[d+2]<o&&e[g+2]<o)continue;const v=e[d]-e[h],x=e[d+1]-e[h+1],p=e[d+2]-e[h+2],f=e[g]-e[h],T=e[g+1]-e[h+1],w=e[g+2]-e[h+2],b=x*w-p*T,F=p*f-v*w,P=v*T-x*f,R=Math.hypot(b,F,P);R<1e-30||(l+=R,P/R<-a&&(c+=R))}return l>0?c/l:0}function ll(n,t){let e=0;for(let i=0;i<t.length;i+=3){const r=t[i]*3,s=t[i+1]*3,o=t[i+2]*3;e+=n[r]*(n[s+1]*n[o+2]-n[s+2]*n[o+1])-n[r+1]*(n[s]*n[o+2]-n[s+2]*n[o])+n[r+2]*(n[s]*n[o+1]-n[s+1]*n[o])}return e/6}function cl(n,t=1e-12){const{positions:e,indices:i}=n;let r=!0;for(const v of[e,n.normals]){for(let x=0;x<v.length;x++)if(!Number.isFinite(v[x])){r=!1;break}if(!r)break}const s=[1/0,1/0,1/0],o=[-1/0,-1/0,-1/0];for(let v=0;v<e.length;v+=3)for(let x=0;x<3;x++){const p=e[v+x];p<s[x]&&(s[x]=p),p>o[x]&&(o[x]=p)}const a=new Map,l=e.length/3;let c=i.length%3===0;for(let v=0;v<i.length;v++)if(i[v]>=l){c=!1;break}const u=(v,x)=>v<x?v*l+x:x*l+v;let h=0;for(let v=0;c&&v<i.length;v+=3){const x=i[v],p=i[v+1],f=i[v+2];for(const[lt,Q]of[[x,p],[p,f],[f,x]]){const dt=u(lt,Q);let j=a.get(dt);j||(j={count:0,balance:0},a.set(dt,j)),j.count++,j.balance+=lt<Q?1:-1}const T=x*3,w=p*3,b=f*3,F=e[w]-e[T],P=e[w+1]-e[T+1],R=e[w+2]-e[T+2],I=e[b]-e[T],S=e[b+1]-e[T+1],y=e[b+2]-e[T+2],N=P*y-R*S,Y=R*I-F*y,X=F*S-P*I;Math.hypot(N,Y,X)*.5<t&&h++}let d=c&&i.length>0;for(const v of a.values())if(v.count!==2||v.balance!==0){d=!1;break}const g=[o[0]-s[0],o[1]-s[1],o[2]-s[2]];return{finite:r,indicesValid:c,watertight:d,volume:c?ll(e,i):0,bbox:{min:s,max:o},degenerateTriangles:h,triangleCount:i.length/3,vertexCount:l,extents:g}}const ex=8,nx=1024,ix=4,rx=1024,sx=Math.PI*2,ox=.03,zc=(n,t,e)=>Number.isFinite(n)?Math.min(e,Math.max(t,Math.round(n))):t;function Yr(n){const t=zc(n.nu,ex,nx),e=zc(n.nv,ix,rx),i=Number.isFinite(n.heightMm)?Math.max(1,n.heightMm):100,r=Qa(n.family,n.shape,i),s=n.relief??tl(),o=n.roulette??rl(),a=Sv(o,{heightMm:i,radiusAt:u=>$n(r,u)}),l=!s.wave.on&&!o.bands.some(u=>u.on),c=Kv(n.spout??al());return{profile:r,heightMm:i,nu:t,nv:e,depthAt(u,h){return l?0:(pv(s,u,h)+a(u,h))*ax(h/ox)},pullAt:c}}function Qu(n,t={}){const e=Yr(n),{nu:i,nv:r,profile:s,heightMm:o}=e,a=t.minDepthMm??-1/0,l=lx(t.vMax??1),c=g=>g/r*l,u=Nv(i,r,(g,v,x)=>{const p=v*l,f=Math.max(Hn,$n(s,p));x[0]=f*Math.cos(g),x[1]=f*Math.sin(g),x[2]=p*o}),h=Bv(u),d=u.positions;for(let g=0;g<=r;g++){const v=c(g);for(let x=0;x<i;x++){const p=sx*x/i,f=Math.max(e.depthAt(p,v),a),T=e.pullAt(p,v);if(f===0&&T===0)continue;const w=(g*i+x)*3;let b=d[w]+h[w]*f,F=d[w+1]+h[w+1]*f;const P=d[w+2]+h[w+2]*f,R=Math.hypot(b,F);if(R<Hn){const I=R>1e-9?Hn/R:0;b=R>1e-9?b*I:Hn*Math.cos(p),F=R>1e-9?F*I:Hn*Math.sin(p)}if(T!==0){const I=Math.hypot(b,F),S=(I+T)/Math.max(I,1e-9);b*=S,F*=S}d[w]=b,d[w+1]=F,d[w+2]=P}}return u}function ax(n){const t=Math.min(1,Math.max(0,n));return t*t*(3-2*t)}function lx(n){return Number.isFinite(n)?Math.min(1,Math.max(.05,n)):1}function th(n){const t=sl(Qu(n));return{...t,normals:qr(t.positions,t.indices)}}const ul=.8,hl=60,eh=1,nh=60,cx=.6,Hc=.3,ux=.7,ih=8,Vo=8;function rh(){return{wallMm:3,baseMm:4,rimRadiusMm:1.5}}const Os=(n,t,e)=>Math.min(e,Math.max(t,n));function hx(n){const t=rh(),e={};if(typeof n=="object"&&n!==null)for(const[r,s]of Object.entries(n))e[r]=s;const i=(r,s)=>typeof r=="number"&&Number.isFinite(r)?r:s;return{wallMm:Os(i(e.wallMm,t.wallMm),ul,hl),baseMm:Os(i(e.baseMm,t.baseMm),eh,nh),rimRadiusMm:Os(i(e.rimRadiusMm,t.rimRadiusMm),0,ih)}}function fx(n,t,e,i,r){if(r<1e-6)return[];const s=[];for(let a=1;a<Vo;a++)s.push(new Float32Array(e*3));const o=i*e;for(let a=0;a<e;a++){const l=(o+a)*3,c=Math.hypot(n.positions[l],n.positions[l+1]),u=n.positions[l+2],h=Math.hypot(t[l],t[l+1]),d=t[l+2],g=c>1e-9?n.positions[l]/c:1,v=c>1e-9?n.positions[l+1]/c:0,x=c-h,p=Math.min(r,x/2),f=p*Math.PI/2,T=Math.hypot(x-2*p,u-d),w=2*f+T;for(let b=1;b<Vo;b++){const F=w*b/Vo;let P,R;if(F<f){const S=F/Math.max(p,1e-9);P=c-p+p*Math.cos(S),R=u+p*Math.sin(S)}else if(F<f+T){const S=T>1e-9?(F-f)/T:0;P=c-p+S*(h+p-(c-p)),R=u+p+S*(d+p-(u+p))}else{const S=Math.PI/2+(F-f-T)/Math.max(p,1e-9);P=h+p+p*Math.cos(S),R=d+p*Math.sin(S)}const I=s[b-1];I[a*3]=P*g,I[a*3+1]=P*v,I[a*3+2]=R}}return s}function Ba(n,t,e,i){const s=Math.max(0,i-1e-4),o=Math.min(1,i+1e-4),a=(n(o)-n(s))/Math.max(1e-9,o-s),l=t,c=Math.hypot(a,l),u=l/c,h=-a/c;return{r:n(i)-e*u,z:i*t-e*h}}function dx(n,t,e,i){if(Ba(n,t,e,0).z>=i)return 0;let r=0,s=1;for(let o=0;o<48;o++){const a=(r+s)/2;Ba(n,t,e,a).z<i?r=a:s=a}return s}function sh(n,t){const e=Os(t.wallMm,ul,hl),i=-(e-cx),r=Yr(n),{nu:s,nv:o,profile:a,heightMm:l}=r,c=F=>$n(a,F),u=Math.min(t.rimRadiusMm,e/2),h=l-u,d=h/l,g=Qu(n,{minDepthMm:i,vMax:d}),v=Math.min(t.baseMm,h*ux),x=dx(c,l,e,v),p=new Float32Array(g.positions.length);let f=0,T=v;for(let F=0;F<=o;F++){const P=x+(d-x)*(F/o),R=Ba(c,l,e,P),I=Math.min(Math.max(R.z,v,T),h);T=I;let S=R.r;S<Hc&&(S=Math.min(Hc,c(P)*.5));for(let y=0;y<s;y++){const N=(F*s+y)*3,Y=2*Math.PI*y/s,X=S+r.pullAt(Y,I/l);p[N]=X*Math.cos(Y),p[N+1]=X*Math.sin(Y),p[N+2]=I,r.depthAt(Y,P)<i&&f++}}const w=Ov(g,p,fx(g,p,s,o,u)),b=sl({nu:s,nv:o,positions:p});return{mesh:{...w,normals:qr(w.positions,w.indices)},innerGrid:{nu:s,nv:o,positions:p},capacityMl:ll(b.positions,b.indices)/1e3,pinchedFraction:f/(s*(o+1))}}const px="modulepreload",mx=function(n,t){return new URL(n,t).href},Vc={},_x=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(e.map(c=>{if(c=mx(c,i),c in Vc)return;Vc[c]=!0;const u=c.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let v=o.length-1;v>=0;v--){const x=o[v];if(x.href===c&&(!u||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":px,u||(g.as="script"),g.crossOrigin="",g.href=c,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((v,x)=>{g.addEventListener("load",v),g.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};async function gx(n={}){var Sl,El,bl;var t,e=n,i=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,s=((El=(Sl=globalThis.process)==null?void 0:Sl.versions)==null?void 0:El.node)&&((bl=globalThis.process)==null?void 0:bl.type)!="renderer";if(s){const{createRequire:m}=await _x(()=>import("./__vite-browser-external-BIHI7g3E.js"),[],import.meta.url);var o=m(import.meta.url)}var a=!1;e.setup=function(){if(a)return;a=!0,e.initTBB();function m(L,k,J=at=>at){if(k)for(let at of k)L.push_back(J(at));return L}function _(L,k=J=>J){const J=[],at=L.size();for(let Ht=0;Ht<at;Ht++)J.push(k(L.get(Ht)));return J}function A(L,k=J=>J){const J=[],at=L.size();for(let Ht=0;Ht<at;Ht++){const ae=L.get(Ht),we=ae.size(),He=[];for(let Pe=0;Pe<we;Pe++)He.push(k(ae.get(Pe)));J.push(He)}return J}function D(L){return L[0].length<3&&(L=[L]),m(new e.Vector2_vec2,L,k=>m(new e.Vector_vec2,k,J=>J instanceof Array?{x:J[0],y:J[1]}:J))}function H(L){for(let k=0;k<L.size();k++)L.get(k).delete();L.delete()}function q(L){return L[0]instanceof Array?{x:L[0][0],y:L[0][1]}:typeof L[0]=="number"?{x:L[0]||0,y:L[1]||0}:L[0]}function K(L){return L[0]instanceof Array?{x:L[0][0],y:L[0][1],z:L[0][2]}:typeof L[0]=="number"?{x:L[0]||0,y:L[1]||0,z:L[2]||0}:L[0]}function rt(L){return L=="EvenOdd"?0:L=="NonZero"?1:L=="Negative"?3:2}function pt(L){return L=="Round"?1:L=="Miter"?2:0}const At=e.CrossSection;function Ut(L,k="Positive"){if(L instanceof At)return L;{const J=D(L),at=new At(J,rt(k));return H(J),at}}e.CrossSection.prototype.translate=function(...L){return this._Translate(q(L))},e.CrossSection.prototype.scale=function(L){return typeof L=="number"?this._Scale({x:L,y:L}):this._Scale(q([L]))},e.CrossSection.prototype.mirror=function(L){return this._Mirror(q([L]))},e.CrossSection.prototype.warp=function(L){const k=mi(function(at){const Ht=jt(at,"double"),ae=jt(at+8,"double"),we=[Ht,ae];L(we),U(at,we[0],"double"),U(at+8,we[1],"double")},"vi"),J=this._Warp(k);return _i(k),J},e.CrossSection.prototype.decompose=function(){const L=this._Decompose(),k=_(L);return L.delete(),k},e.CrossSection.prototype.bounds=function(){const L=this._Bounds();return{min:["x","y"].map(k=>L.min[k]),max:["x","y"].map(k=>L.max[k])}},e.CrossSection.prototype.offset=function(L,k="Round",J=2,at=0){return this._Offset(L,pt(k),J,at)},e.CrossSection.prototype.simplify=function(L=1e-6){return this._Simplify(L)},e.CrossSection.prototype.extrude=function(L,k=0,J=0,at=[1,1],Ht=!1){at=q([at]);const ae=e._Extrude(this._ToPolygons(),L,k,J,at);return Ht?ae.translate([0,0,-L/2]):ae},e.CrossSection.prototype.revolve=function(L=0,k=360){return e._Revolve(this._ToPolygons(),L,k)},e.CrossSection.prototype.add=function(L){return this._add(Ut(L))},e.CrossSection.prototype.subtract=function(L){return this._subtract(Ut(L))},e.CrossSection.prototype.intersect=function(L){return this._intersect(Ut(L))},e.CrossSection.prototype.toPolygons=function(){const L=this._ToPolygons(),k=A(L,J=>[J.x,J.y]);return L.delete(),k},e.Manifold.prototype.smoothOut=function(L=52.5,k=0){return this._SmoothOut(L,k)},e.Manifold.prototype.warp=function(L){const k=mi(function(Ht){const ae=jt(Ht,"double"),we=jt(Ht+8,"double"),He=jt(Ht+16,"double"),Pe=[ae,we,He];L(Pe),U(Ht,Pe[0],"double"),U(Ht+8,Pe[1],"double"),U(Ht+16,Pe[2],"double")},"vi"),J=this._Warp(k);_i(k);const at=J.status();if(at!=="NoError")throw new e.ManifoldError(at);return J},e.Manifold.prototype.warpBatch=function(L){const k=mi(function(Ht,ae){const we=e.HEAPF64??N;if(!we)throw new Error("WASM heap is not initialized (HEAPF64 unavailable)");const He=new Float64Array(we.buffer,Ht,ae*3);L(He,ae)},"vii"),J=this._WarpBatch(k);_i(k);const at=J.status();if(at!=="NoError")throw new e.ManifoldError(at);return J},e.Manifold.prototype.calculateNormals=function(L=0,k=52.5){return this._CalculateNormals(L,k)},e.Manifold.prototype.smoothByNormals=function(L=0){return this._SmoothByNormals(L)},e.Manifold.prototype.setProperties=function(L,k){const J=this.numProp(),at=mi(function(ae,we,He){const Pe=[];for(let De=0;De<L;++De)Pe[De]=jt(ae+8*De,"double");const Yn=[];for(let De=0;De<3;++De)Yn[De]=jt(we+8*De,"double");const jn=[];for(let De=0;De<J;++De)jn[De]=jt(He+8*De,"double");k(Pe,Yn,jn);for(let De=0;De<L;++De)U(ae+8*De,Pe[De],"double")},"viii"),Ht=this._SetProperties(L,at);return _i(at),Ht},e.Manifold.prototype.translate=function(...L){return this._Translate(K(L))},e.Manifold.prototype.rotate=function(L,k,J){return Array.isArray(L)?this._Rotate(...L):this._Rotate(L,k||0,J||0)},e.Manifold.prototype.scale=function(L){return typeof L=="number"?this._Scale({x:L,y:L,z:L}):this._Scale(K([L]))},e.Manifold.prototype.mirror=function(L){return this._Mirror(K([L]))},e.Manifold.prototype.trimByPlane=function(L,k=0){return this._TrimByPlane(K([L]),k)},e.Manifold.prototype.slice=function(L=0){const k=this._Slice(L),J=new At(k,rt("Positive"));return H(k),J},e.Manifold.prototype.project=function(){const L=this._Project(),k=new At(L,rt("Positive"));return H(L),k},e.Manifold.prototype.rayCast=function(L,k){const J=this._RayCast(K([L]),K([k])),at=_(J,Ht=>({faceID:Ht.faceID,distance:Ht.distance,position:["x","y","z"].map(ae=>Ht.position[ae]),normal:["x","y","z"].map(ae=>Ht.normal[ae])}));return J.delete(),at},e.Manifold.prototype.split=function(L){const k=this._Split(L),J=_(k);return k.delete(),J},e.Manifold.prototype.splitByPlane=function(L,k=0){const J=this._SplitByPlane(K([L]),k),at=_(J);return J.delete(),at},e.Manifold.prototype.decompose=function(){const L=this._Decompose(),k=_(L);return L.delete(),k},e.Manifold.prototype.boundingBox=function(){const L=this._boundingBox();return{min:["x","y","z"].map(k=>L.min[k]),max:["x","y","z"].map(k=>L.max[k])}},e.Manifold.prototype.simplify=function(L=0){return this._Simplify(L)};class se{constructor({numProp:k=3,triVerts:J=new Uint32Array,vertProperties:at=new Float32Array,mergeFromVert:Ht,mergeToVert:ae,runIndex:we,runOriginalID:He,faceID:Pe,halfedgeTangent:Yn,runTransform:jn,runFlags:De,tolerance:oo=0}={}){this.numProp=k,this.triVerts=J,this.vertProperties=at,this.mergeFromVert=Ht,this.mergeToVert=ae,this.runIndex=we,this.runOriginalID=He,this.faceID=Pe,this.halfedgeTangent=Yn,this.runTransform=jn,this.runFlags=De,this.tolerance=oo}get numTri(){return this.triVerts.length/3}get numVert(){return this.vertProperties.length/this.numProp}get numRun(){return this.runOriginalID.length}merge(){const{changed:k,mesh:J}=e._Merge(this);return Object.assign(this,{...J}),k}verts(k){return this.triVerts.subarray(3*k,3*(k+1))}position(k){return this.vertProperties.subarray(this.numProp*k,this.numProp*k+3)}extras(k){return this.vertProperties.subarray(this.numProp*k+3,this.numProp*(k+1))}tangent(k){return this.halfedgeTangent.subarray(4*k,4*(k+1))}transform(k){const J=new Array(16);for(const at of[0,1,2,3])for(const Ht of[0,1,2])J[4*at+Ht]=this.runTransform[12*k+3*at+Ht];return J[15]=1,J}backside(k){return this.runFlags!=null&&k<this.runFlags.length&&(this.runFlags[k]&1)!==0}hasNormals(k){return this.runFlags!=null&&k<this.runFlags.length&&(this.runFlags[k]&2)!==0}}e.Mesh=se,e.Manifold.prototype.getMesh=function(L=-1){return new se(this._GetMeshJS(L))},e.ManifoldError=function(k,...J){let at="Unknown error";switch(k){case"NonFiniteVertex":at="Non-finite vertex";break;case"NotManifold":at="Not manifold";break;case"VertexOutOfBounds":at="Vertex index out of bounds";break;case"PropertiesWrongLength":at="Properties have wrong length";break;case"MissingPositionProperties":at="Less than three properties";break;case"MergeVectorsDifferentLengths":at="Merge vectors have different lengths";break;case"MergeIndexOutOfBounds":at="Merge index out of bounds";break;case"TransformWrongLength":at="Transform vector has wrong length";break;case"RunIndexWrongLength":at="Run index vector has wrong length";break;case"FaceIDWrongLength":at="Face ID vector has wrong length";break;case"InvalidConstruction":at="Manifold constructed with invalid parameters";break;case"ResultTooLarge":at="Result exceeds maximum size";break;case"InvalidTangents":at="Invalid halfedge tangents";break}const Ht=Error.apply(this,[at,...J]);Ht.name=this.name="ManifoldError",this.message=Ht.message,this.stack=Ht.stack,this.code=k},e.ManifoldError.prototype=Object.create(Error.prototype,{constructor:{value:e.ManifoldError,writable:!0,configurable:!0}}),e.CrossSection=function(L,k="Positive"){const J=D(L),at=new At(J,rt(k));return H(J),at},e.CrossSection.ofPolygons=function(L,k="Positive"){return new e.CrossSection(L,k)},e.CrossSection.square=function(...L){let k;L.length==0?k={x:1,y:1}:typeof L[0]=="number"?k={x:L[0],y:L[0]}:k=q(L);const J=L[1]||!1;return e._Square(k,J)},e.CrossSection.circle=function(L,k=0){return e._Circle(L,k)};function de(L){return function(...k){k.length==1&&(k=k[0]);const J=new e.Vector_crossSection;for(const Ht of k)J.push_back(Ut(Ht));const at=e["_crossSection"+L](J);return J.delete(),at}}e.CrossSection.compose=de("Compose"),e.CrossSection.union=de("UnionN"),e.CrossSection.difference=de("DifferenceN"),e.CrossSection.intersection=de("IntersectionN");function ue(L,k){m(L,k,J=>J instanceof Array?{x:J[0],y:J[1]}:J)}e.CrossSection.hull=function(...L){L.length==1&&(L=L[0]);let k=new e.Vector_vec2;for(const at of L)if(at instanceof At)e._crossSectionCollectVertices(k,at);else if(at instanceof Array&&at.length==2&&typeof at[0]=="number")k.push_back({x:at[0],y:at[1]});else if(at.x)k.push_back(at);else{const ae=at[0].length==2&&typeof at[0][0]=="number"||at[0].x?[at]:at;for(const we of ae)ue(k,we)}const J=e._crossSectionHullPoints(k);return k.delete(),J},e.CrossSection.prototype=Object.create(At.prototype),Object.defineProperty(e.CrossSection,Symbol.hasInstance,{get:()=>L=>L instanceof At});const Ce=e.Manifold;e.Manifold=function(L){const k=new Ce(L),J=k.status();if(J!=="NoError")throw new e.ManifoldError(J);return k},e.Manifold.ofMesh=function(L){return new e.Manifold(L)},e.Manifold.tetrahedron=function(){return e._Tetrahedron()},e.Manifold.cube=function(...L){let k;L.length==0?k={x:1,y:1,z:1}:typeof L[0]=="number"?k={x:L[0],y:L[0],z:L[0]}:k=K(L);const J=L[1]||!1;return e._Cube(k,J)},e.Manifold.cylinder=function(L,k,J=-1,at=0,Ht=!1){return e._Cylinder(L,k,J,at,Ht)},e.Manifold.sphere=function(L,k=0){return e._Sphere(L,k)},e.Manifold.smooth=function(L,k=[]){const J=new e.Vector_smoothness;m(J,k);const at=e._Smooth(L,J);return J.delete(),at},e.Manifold.extrude=function(L,k,J=0,at=0,Ht=[1,1],ae=!1){return(L instanceof At?L:e.CrossSection(L,"Positive")).extrude(k,J,at,Ht,ae)},e.Manifold.revolve=function(L,k=0,J=360){return(L instanceof At?L:e.CrossSection(L,"Positive")).revolve(k,J)},e.Manifold.reserveIDs=function(L){return e._ReserveIDs(L)};function ze(L){return function(...k){k.length==1&&(k=k[0]);const J=new e.Vector_manifold;for(const Ht of k)J.push_back(Ht);const at=e["_manifold"+L+"N"](J);return J.delete(),at}}e.Manifold.union=ze("Union"),e.Manifold.compose=e.Manifold.union,e.Manifold.difference=ze("Difference"),e.Manifold.intersection=ze("Intersection"),e.Manifold.levelSet=function(L,k,J,at=0,Ht=-1){const ae={min:{x:k.min[0],y:k.min[1],z:k.min[2]},max:{x:k.max[0],y:k.max[1],z:k.max[2]}},we=mi(function(Pe){const Yn=jt(Pe,"double"),jn=jt(Pe+8,"double"),De=jt(Pe+16,"double");return L([Yn,jn,De])},"di"),He=e._LevelSet(we,ae,J,at,Ht);return _i(we),He},e.ExecutionContext.prototype.fromMesh=function(L){return this._FromMesh(L)},e.ExecutionContext.prototype.smooth=function(L,k=[]){const J=new e.Vector_smoothness;m(J,k);const at=this._Smooth(L,J);return J.delete(),at},e.ExecutionContext.prototype.levelSet=function(L,k,J,at=0,Ht=-1){const ae={min:{x:k.min[0],y:k.min[1],z:k.min[2]},max:{x:k.max[0],y:k.max[1],z:k.max[2]}},we=mi(function(Pe){const Yn=jt(Pe,"double"),jn=jt(Pe+8,"double"),De=jt(Pe+16,"double");return L([Yn,jn,De])},"di"),He=this._LevelSet(we,ae,J,at,Ht);return _i(we),He};function ln(L,k){m(L,k,J=>J instanceof Array?{x:J[0],y:J[1],z:J[2]}:J)}e.Manifold.hull=function(...L){L.length==1&&(L=L[0]);let k=new e.Vector_vec3;for(const at of L)at instanceof Ce?e._manifoldCollectVertices(k,at):at instanceof Array&&at.length==3&&typeof at[0]=="number"?k.push_back({x:at[0],y:at[1],z:at[2]}):at.x?k.push_back(at):ln(k,at);const J=e._manifoldHullPoints(k);return k.delete(),J},e.Manifold.prototype=Object.create(Ce.prototype),Object.defineProperty(e.Manifold,Symbol.hasInstance,{get:()=>L=>L instanceof Ce}),e.triangulate=function(L,k=-1,J=!0){const at=D(L),Ht=_(e._Triangulate(at,k,J),ae=>[ae[0],ae[1],ae[2]]);return H(at),Ht}};var l=import.meta.url,c="";function u(m){return e.locateFile?e.locateFile(m,c):c+m}var h,d;if(s){var g=o("node:fs");l.startsWith("file:")&&(c=o("node:path").dirname(o("node:url").fileURLToPath(l))+"/"),d=m=>{m=f(m)?new URL(m):m;var _=g.readFileSync(m);return _},h=async(m,_=!0)=>{m=f(m)?new URL(m):m;var A=g.readFileSync(m,_?void 0:"utf8");return A},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2)}else if(i||r){try{c=new URL(".",l).href}catch{}r&&(d=m=>{var _=new XMLHttpRequest;return _.open("GET",m,!1),_.responseType="arraybuffer",_.send(null),new Uint8Array(_.response)}),h=async m=>{if(f(m))return new Promise((A,D)=>{var H=new XMLHttpRequest;H.open("GET",m,!0),H.responseType="arraybuffer",H.onload=()=>{if(H.status==200||H.status==0&&H.response){A(H.response);return}D(H.status)},H.onerror=D,H.send(null)});var _=await fetch(m,{credentials:"same-origin"});if(_.ok)return _.arrayBuffer();throw new Error(_.status+" : "+_.url)}}console.log.bind(console);var v=console.error.bind(console),x,p=!1,f=m=>m.startsWith("file://"),T,w,b,F,P,R,I,S,y,N,Y,X,et=!1;function lt(){var m=ns.buffer;b=new Int8Array(m),P=new Int16Array(m),F=new Uint8Array(m),R=new Uint16Array(m),I=new Int32Array(m),S=new Uint32Array(m),y=new Float32Array(m),N=new Float64Array(m),Y=new BigInt64Array(m),X=new BigUint64Array(m)}function Q(){if(e.preRun)for(typeof e.preRun=="function"&&(e.preRun=[e.preRun]);e.preRun.length;)Re(e.preRun.shift());Ft(Te)}function dt(){et=!0,gi.J()}function j(){if(e.postRun)for(typeof e.postRun=="function"&&(e.postRun=[e.postRun]);e.postRun.length;)Wt(e.postRun.shift());Ft(he)}function Mt(m){var A;(A=e.onAbort)==null||A.call(e,m),m="Aborted("+m+")",v(m),p=!0,m+=". Build with -sASSERTIONS for more info.";var _=new WebAssembly.RuntimeError(m);throw w==null||w(_),_}var wt;function Bt(){return e.locateFile?u("manifold.wasm"):new URL(""+new URL("manifold-BE4c7gO-.wasm",import.meta.url).href,import.meta.url).href}function ee(m){if(m==wt&&x)return new Uint8Array(x);if(d)return d(m);throw"both async and sync fetching of the wasm failed"}async function ve(m){if(!x)try{var _=await h(m);return new Uint8Array(_)}catch{}return ee(m)}async function nt(m,_){try{var A=await ve(m),D=await WebAssembly.instantiate(A,_);return D}catch(H){v(`failed to asynchronously prepare wasm: ${H}`),Mt(H)}}async function mt(m,_,A){if(!m&&!f(_)&&!s)try{var D=fetch(_,{credentials:"same-origin"}),H=await WebAssembly.instantiateStreaming(D,A);return H}catch(q){v(`wasm streaming compile failed: ${q}`),v("falling back to ArrayBuffer instantiation")}return nt(_,A)}function Nt(){var m={a:Mf};return m}async function Et(){function m(q,K){return gi=q.exports,gi=yf(gi),xf(gi),lt(),gi}function _(q){return m(q.instance)}var A=Nt();if(e.instantiateWasm)return new Promise((q,K)=>{e.instantiateWasm(A,(rt,pt)=>{q(m(rt))})});wt??(wt=Bt());var D=await mt(x,wt,A),H=_(D);return H}var Ft=m=>{for(;m.length>0;)m.shift()(e)},he=[],Wt=m=>he.push(m),Te=[],Re=m=>Te.push(m);function jt(m,_="i8"){switch(_.endsWith("*")&&(_="*"),_){case"i1":return b[m>>>0];case"i8":return b[m>>>0];case"i16":return P[m>>>1>>>0];case"i32":return I[m>>>2>>>0];case"i64":return Y[m>>>3>>>0];case"float":return y[m>>>2>>>0];case"double":return N[m>>>3>>>0];case"*":return S[m>>>2>>>0];default:Mt(`invalid type for getValue: ${_}`)}}function U(m,_,A="i8"){switch(A.endsWith("*")&&(A="*"),A){case"i1":b[m>>>0]=_;break;case"i8":b[m>>>0]=_;break;case"i16":P[m>>>1>>>0]=_;break;case"i32":I[m>>>2>>>0]=_;break;case"i64":Y[m>>>3>>>0]=BigInt(_);break;case"float":y[m>>>2>>>0]=_;break;case"double":N[m>>>3>>>0]=_;break;case"*":S[m>>>2>>>0]=_;break;default:Mt(`invalid type for setValue: ${A}`)}}class Ge{constructor(_){this.excPtr=_,this.ptr=_-24}set_type(_){S[this.ptr+4>>>2>>>0]=_}get_type(){return S[this.ptr+4>>>2>>>0]}set_destructor(_){S[this.ptr+8>>>2>>>0]=_}get_destructor(){return S[this.ptr+8>>>2>>>0]}set_caught(_){_=_?1:0,b[this.ptr+12>>>0]=_}get_caught(){return b[this.ptr+12>>>0]!=0}set_rethrown(_){_=_?1:0,b[this.ptr+13>>>0]=_}get_rethrown(){return b[this.ptr+13>>>0]!=0}init(_,A){this.set_adjusted_ptr(0),this.set_type(_),this.set_destructor(A)}set_adjusted_ptr(_){S[this.ptr+16>>>2>>>0]=_}get_adjusted_ptr(){return S[this.ptr+16>>>2>>>0]}}var fe=0;function xe(m,_,A){m>>>=0,_>>>=0,A>>>=0;var D=new Ge(m);throw D.init(_,A),fe=m,fe}var Lt=()=>Mt(""),re={},kt=m=>{for(;m.length;){var _=m.pop(),A=m.pop();A(_)}};function Kt(m){return this.fromWireType(S[m>>>2>>>0])}var Ae={},C={},M={},G=class extends Error{constructor(_){super(_),this.name="InternalError"}},tt=m=>{throw new G(m)},st=(m,_,A)=>{m.forEach(rt=>M[rt]=_);function D(rt){var pt=A(rt);pt.length!==m.length&&tt("Mismatched type converter count");for(var At=0;At<m.length;++At)it(m[At],pt[At])}var H=new Array(_.length),q=[],K=0;for(let[rt,pt]of _.entries())C.hasOwnProperty(pt)?H[rt]=C[pt]:(q.push(pt),Ae.hasOwnProperty(pt)||(Ae[pt]=[]),Ae[pt].push(()=>{H[rt]=C[pt],++K,K===q.length&&D(H)}));q.length===0&&D(H)},Z=function(m){m>>>=0;var _=re[m];delete re[m];var A=_.rawConstructor,D=_.rawDestructor,H=_.fields,q=H.map(K=>K.getterReturnType).concat(H.map(K=>K.setterArgumentType));st([m],q,K=>{var rt={};for(var[pt,At]of H.entries()){const Ut=K[pt],se=At.getter,de=At.getterContext,ue=K[pt+H.length],Ce=At.setter,ze=At.setterContext;rt[At.fieldName]={read:ln=>Ut.fromWireType(se(de,ln)),write:(ln,L)=>{var k=[];Ce(ze,ln,ue.toWireType(k,L)),kt(k)},optional:Ut.optional}}return[{name:_.name,fromWireType:Ut=>{var se={};for(var de in rt)se[de]=rt[de].read(Ut);return D(Ut),se},toWireType:(Ut,se)=>{for(var de in rt)if(!(de in se)&&!rt[de].optional)throw new TypeError(`Missing field: "${de}"`);var ue=A();for(de in rt)rt[de].write(ue,se[de]);return Ut!==null&&Ut.push(D,ue),ue},readValueFromPointer:Kt,destructorFunction:D}]})},gt=m=>{m>>>=0;for(var _="";;){var A=F[m++>>>0];if(!A)return _;_+=String.fromCharCode(A)}},_t=class extends Error{constructor(_){super(_),this.name="BindingError"}},ft=m=>{throw new _t(m)};function It(m,_,A={}){var D=_.name;if(m||ft(`type "${D}" must have a positive integer typeid pointer`),C.hasOwnProperty(m)){if(A.ignoreDuplicateRegistrations)return;ft(`Cannot register type '${D}' twice`)}if(C[m]=_,delete M[m],Ae.hasOwnProperty(m)){var H=Ae[m];delete Ae[m],H.forEach(q=>q())}}function it(m,_,A={}){return It(m,_,A)}var Rt=(m,_,A)=>{switch(_){case 1:return A?D=>b[D>>>0]:D=>F[D>>>0];case 2:return A?D=>P[D>>>1>>>0]:D=>R[D>>>1>>>0];case 4:return A?D=>I[D>>>2>>>0]:D=>S[D>>>2>>>0];case 8:return A?D=>Y[D>>>3>>>0]:D=>X[D>>>3>>>0];default:throw new TypeError(`invalid integer width (${_}): ${m}`)}},Gt=function(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const q=D===0n;let K=rt=>rt;if(q){const rt=A*8;K=pt=>BigInt.asUintN(rt,pt),H=K(H)}it(m,{name:_,fromWireType:K,toWireType:(rt,pt)=>(typeof pt=="number"&&(pt=BigInt(pt)),pt),readValueFromPointer:Rt(_,A,!q),destructorFunction:null})};function Vt(m,_,A,D){m>>>=0,_>>>=0,_=gt(_),it(m,{name:_,fromWireType:function(H){return!!H},toWireType:function(H,q){return q?A:D},readValueFromPointer:function(H){return this.fromWireType(F[H>>>0])},destructorFunction:null})}var vt=m=>({count:m.count,deleteScheduled:m.deleteScheduled,preservePointerOnDelete:m.preservePointerOnDelete,ptr:m.ptr,ptrType:m.ptrType,smartPtr:m.smartPtr,smartPtrType:m.smartPtrType}),$t=m=>{function _(A){return A.$$.ptrType.registeredClass.name}ft(_(m)+" instance already deleted")},O=!1,yt=m=>{},ct=m=>{m.smartPtr?m.smartPtrType.rawDestructor(m.smartPtr):m.ptrType.registeredClass.rawDestructor(m.ptr)},Ct=m=>{m.count.value-=1;var _=m.count.value===0;_&&ct(m)},ut=m=>globalThis.FinalizationRegistry?(O=new FinalizationRegistry(_=>{Ct(_.$$)}),ut=_=>{var A=_.$$,D=!!A.smartPtr;if(D){var H={$$:A};O.register(_,H,_)}return _},yt=_=>O.unregister(_),ut(m)):(ut=_=>_,m),ot=()=>{let m=Pt.prototype;Object.assign(m,{isAliasOf(A){if(!(this instanceof Pt)||!(A instanceof Pt))return!1;var D=this.$$.ptrType.registeredClass,H=this.$$.ptr;A.$$=A.$$;for(var q=A.$$.ptrType.registeredClass,K=A.$$.ptr;D.baseClass;)H=D.upcast(H),D=D.baseClass;for(;q.baseClass;)K=q.upcast(K),q=q.baseClass;return D===q&&H===K},clone(){if(this.$$.ptr||$t(this),this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var A=ut(Object.create(Object.getPrototypeOf(this),{$$:{value:vt(this.$$)}}));return A.$$.count.value+=1,A.$$.deleteScheduled=!1,A},delete(){this.$$.ptr||$t(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ft("Object already scheduled for deletion"),yt(this),Ct(this.$$),this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},isDeleted(){return!this.$$.ptr},deleteLater(){return this.$$.ptr||$t(this),this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&ft("Object already scheduled for deletion"),this.$$.deleteScheduled=!0,this}});const _=Symbol.dispose;_&&(m[_]=m.delete)};function Pt(){}var qt=(m,_)=>Object.defineProperty(_,"name",{value:m}),Me={},pe=(m,_,A)=>{if(m[_].overloadTable===void 0){var D=m[_];m[_]=function(...H){return m[_].overloadTable.hasOwnProperty(H.length)||ft(`Function '${A}' called with an invalid number of arguments (${H.length}) - expects one of (${m[_].overloadTable})!`),m[_].overloadTable[H.length].apply(this,H)},m[_].overloadTable=[],m[_].overloadTable[D.argCount]=D}},We=(m,_,A)=>{e.hasOwnProperty(m)?((A===void 0||e[m].overloadTable!==void 0&&e[m].overloadTable[A]!==void 0)&&ft(`Cannot register public name '${m}' twice`),pe(e,m,m),e[m].overloadTable.hasOwnProperty(A)&&ft(`Cannot register multiple overloads of a function with the same number of arguments (${A})!`),e[m].overloadTable[A]=_):(e[m]=_,e[m].argCount=A)},gn=48,jr=57,Kr=m=>{m=m.replace(/[^a-zA-Z0-9_]/g,"$");var _=m.charCodeAt(0);return _>=gn&&_<=jr?`_${m}`:m};function Ln(m,_,A,D,H,q,K,rt){this.name=m,this.constructor=_,this.instancePrototype=A,this.rawDestructor=D,this.baseClass=H,this.getActualType=q,this.upcast=K,this.downcast=rt,this.pureVirtualFunctions=[]}var hi=(m,_,A)=>{for(;_!==A;)_.upcast||ft(`Expected null or instance of ${A.name}, got an instance of ${_.name}`),m=_.upcast(m),_=_.baseClass;return m},Hi=m=>{if(m===null)return"null";var _=typeof m;return _==="object"||_==="array"||_==="function"?m.toString():""+m};function Zr(m,_){if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),0;_.$$||ft(`Cannot pass "${Hi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`);var A=_.$$.ptrType.registeredClass,D=hi(_.$$.ptr,A,this.registeredClass);return D}function Vi(m,_){var A;if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),this.isSmartPointer?(A=this.rawConstructor(),m!==null&&m.push(this.rawDestructor,A),A):0;(!_||!_.$$)&&ft(`Cannot pass "${Hi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`),!this.isConst&&_.$$.ptrType.isConst&&ft(`Cannot convert argument of type ${_.$$.smartPtrType?_.$$.smartPtrType.name:_.$$.ptrType.name} to parameter type ${this.name}`);var D=_.$$.ptrType.registeredClass;if(A=hi(_.$$.ptr,D,this.registeredClass),this.isSmartPointer)switch(_.$$.smartPtr===void 0&&ft("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:_.$$.smartPtrType===this?A=_.$$.smartPtr:ft(`Cannot convert argument of type ${_.$$.smartPtrType?_.$$.smartPtrType.name:_.$$.ptrType.name} to parameter type ${this.name}`);break;case 1:A=_.$$.smartPtr;break;case 2:if(_.$$.smartPtrType===this)A=_.$$.smartPtr;else{var H=_.clone();A=this.rawShare(A,Zt.toHandle(()=>H.delete())),m!==null&&m.push(this.rawDestructor,A)}break;default:ft("Unsupported sharing policy")}return A}function Jr(m,_){if(_===null)return this.isReference&&ft(`null is not a valid ${this.name}`),0;_.$$||ft(`Cannot pass "${Hi(_)}" as a ${this.name}`),_.$$.ptr||ft(`Cannot pass deleted object as a pointer of type ${this.name}`),_.$$.ptrType.isConst&&ft(`Cannot convert argument of type ${_.$$.ptrType.name} to parameter type ${this.name}`);var A=_.$$.ptrType.registeredClass,D=hi(_.$$.ptr,A,this.registeredClass);return D}var fi=(m,_,A)=>{if(_===A)return m;if(A.baseClass===void 0)return null;var D=fi(m,_,A.baseClass);return D===null?null:A.downcast(D)},Qr={},ts=(m,_)=>{for(_===void 0&&ft("ptr should not be undefined");m.baseClass;)_=m.upcast(_),m=m.baseClass;return _},Qs=(m,_)=>(_=ts(m,_),Qr[_]),Gi=(m,_)=>{(!_.ptrType||!_.ptr)&&tt("makeClassHandle requires ptr and ptrType");var A=!!_.smartPtrType,D=!!_.smartPtr;return A!==D&&tt("Both smartPtrType and smartPtr must be specified"),_.count={value:1},ut(Object.create(m,{$$:{value:_,writable:!0}}))};function to(m){var _=this.getPointee(m);if(!_)return this.destructor(m),null;var A=Qs(this.registeredClass,_);if(A!==void 0){if(A.$$.count.value===0)return A.$$.ptr=_,A.$$.smartPtr=m,A.clone();var D=A.clone();return this.destructor(m),D}function H(){return this.isSmartPointer?Gi(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:_,smartPtrType:this,smartPtr:m}):Gi(this.registeredClass.instancePrototype,{ptrType:this,ptr:m})}var q=this.registeredClass.getActualType(_),K=Me[q];if(!K)return H.call(this);var rt;this.isConst?rt=K.constPointerType:rt=K.pointerType;var pt=fi(_,this.registeredClass,rt.registeredClass);return pt===null?H.call(this):this.isSmartPointer?Gi(rt.registeredClass.instancePrototype,{ptrType:rt,ptr:pt,smartPtrType:this,smartPtr:m}):Gi(rt.registeredClass.instancePrototype,{ptrType:rt,ptr:pt})}var eo=()=>{Object.assign(Wi.prototype,{getPointee(m){return this.rawGetPointee&&(m=this.rawGetPointee(m)),m},destructor(m){var _;(_=this.rawDestructor)==null||_.call(this,m)},readValueFromPointer:Kt,fromWireType:to})};function Wi(m,_,A,D,H,q,K,rt,pt,At,Ut){this.name=m,this.registeredClass=_,this.isReference=A,this.isConst=D,this.isSmartPointer=H,this.pointeeType=q,this.sharingPolicy=K,this.rawGetPointee=rt,this.rawConstructor=pt,this.rawShare=At,this.rawDestructor=Ut,!H&&_.baseClass===void 0?D?(this.toWireType=Zr,this.destructorFunction=null):(this.toWireType=Jr,this.destructorFunction=null):this.toWireType=Vi}var es=(m,_,A)=>{e.hasOwnProperty(m)||tt("Replacing nonexistent public symbol"),e[m].overloadTable!==void 0&&A!==void 0?e[m].overloadTable[A]=_:(e[m]=_,e[m].argCount=A)},E=m=>Tr.get(m),B=(m,_,A=[],D=!1)=>{var H=E(_),q=H(...A);function K(rt){return m[0]=="p"?rt>>>0:rt}return K(q)},$=(m,_,A=!1)=>(...D)=>B(m,_,D,A),W=(m,_,A=!1)=>{m=gt(m);function D(){if(m.includes("p"))return $(m,_,A);var q=E(_);return q}var H=D();return typeof H!="function"&&ft(`unknown function pointer with signature ${m}: ${_}`),H};class z extends Error{}var ht=m=>{var _=yl(m),A=gt(_);return qn(_),A},xt=(m,_)=>{var A=[],D={};function H(q){if(!D[q]&&!C[q]){if(M[q]){M[q].forEach(H);return}A.push(q),D[q]=!0}}throw _.forEach(H),new z(`${m}: `+A.map(ht).join([", "]))};function Dt(m,_,A,D,H,q,K,rt,pt,At,Ut,se,de){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,q>>>=0,K>>>=0,rt>>>=0,pt>>>=0,At>>>=0,Ut>>>=0,se>>>=0,de>>>=0,Ut=gt(Ut),q=W(H,q),rt&&(rt=W(K,rt)),At&&(At=W(pt,At)),de=W(se,de);var ue=Kr(Ut);We(ue,function(){xt(`Cannot construct ${Ut} due to unbound types`,[D])}),st([m,_,A],D?[D]:[],Ce=>{var we;Ce=Ce[0];var ze,ln;D?(ze=Ce.registeredClass,ln=ze.instancePrototype):ln=Pt.prototype;var L=qt(Ut,function(...He){if(Object.getPrototypeOf(this)!==k)throw new _t(`Use 'new' to construct ${Ut}`);if(J.constructor_body===void 0)throw new _t(`${Ut} has no accessible constructor`);var Pe=J.constructor_body[He.length];if(Pe===void 0)throw new _t(`Tried to invoke ctor of ${Ut} with invalid number of parameters (${He.length}) - expected (${Object.keys(J.constructor_body).toString()}) parameters instead!`);return Pe.apply(this,He)}),k=Object.create(ln,{constructor:{value:L}});L.prototype=k;var J=new Ln(Ut,L,k,de,ze,q,rt,At);J.baseClass&&((we=J.baseClass).__derivedClasses??(we.__derivedClasses=[]),J.baseClass.__derivedClasses.push(J));var at=new Wi(Ut,J,!0,!1,!1),Ht=new Wi(Ut+"*",J,!1,!1,!1),ae=new Wi(Ut+" const*",J,!1,!0,!1);return Me[m]={pointerType:Ht,constPointerType:ae},es(ue,L),[at,Ht,ae]})}var Tt=(m,_)=>{for(var A=[],D=0;D<m;D++)A.push(S[_+D*4>>>2>>>0]);return A};function Xt(m){for(var _=1;_<m.length;++_)if(m[_]!==null&&m[_].destructorFunction===void 0)return!0;return!1}function Yt(m,_,A,D){var H=Xt(m),q=m.length-2,K=[],rt=["fn"];_&&rt.push("thisWired");for(var pt=0;pt<q;++pt)K.push(`arg${pt}`),rt.push(`arg${pt}Wired`);K=K.join(","),rt=rt.join(",");var At=`return function (${K}) {
`;H&&(At+=`var destructors = [];
`);var Ut=H?"destructors":"null",se=["humanName","throwBindingError","invoker","fn","runDestructors","fromRetWire","toClassParamWire"];_&&(At+=`var thisWired = toClassParamWire(${Ut}, this);
`);for(var pt=0;pt<q;++pt){var de=`toArg${pt}Wire`;At+=`var arg${pt}Wired = ${de}(${Ut}, arg${pt});
`,se.push(de)}if(At+=(A||D?"var rv = ":"")+`invoker(${rt});
`,H)At+=`runDestructors(destructors);
`;else for(var pt=_?1:2;pt<m.length;++pt){var ue=pt===1?"thisWired":"arg"+(pt-2)+"Wired";m[pt].destructorFunction!==null&&(At+=`${ue}_dtor(${ue});
`,se.push(`${ue}_dtor`))}return A&&(At+=`var ret = fromRetWire(rv);
return ret;
`),At+=`}
`,new Function(se,At)}function Ot(m,_,A,D,H,q){var K=_.length;K<2&&ft("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var rt=_[1]!==null&&A!==null,pt=Xt(_),At=!_[0].isVoid,Ut=_[0],se=_[1],de=[m,ft,D,H,kt,Ut.fromWireType.bind(Ut),se==null?void 0:se.toWireType.bind(se)],ue=2;ue<K;++ue){var Ce=_[ue];de.push(Ce.toWireType.bind(Ce))}if(!pt)for(var ue=rt?1:2;ue<_.length;++ue)_[ue].destructorFunction!==null&&de.push(_[ue].destructorFunction);var ln=Yt(_,rt,At,q)(...de);return qt(m,ln)}var ie=function(m,_,A,D,H,q){m>>>=0,A>>>=0,D>>>=0,H>>>=0,q>>>=0;var K=Tt(_,A);H=W(D,H),st([],[m],rt=>{rt=rt[0];var pt=`constructor ${rt.name}`;if(rt.registeredClass.constructor_body===void 0&&(rt.registeredClass.constructor_body=[]),rt.registeredClass.constructor_body[_-1]!==void 0)throw new _t(`Cannot register multiple constructors with identical number of parameters (${_-1}) for class '${rt.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);return rt.registeredClass.constructor_body[_-1]=()=>{xt(`Cannot construct ${rt.name} due to unbound types`,K)},st([],K,At=>(At.splice(1,0,null),rt.registeredClass.constructor_body[_-1]=Ot(pt,At,null,H,q),[])),[]})},ge=m=>{m=m.trim();const _=m.indexOf("(");return _===-1?m:m.slice(0,_)},Ue=function(m,_,A,D,H,q,K,rt,pt,At){m>>>=0,_>>>=0,D>>>=0,H>>>=0,q>>>=0,K>>>=0;var Ut=Tt(A,D);_=gt(_),_=ge(_),q=W(H,q,pt),st([],[m],se=>{se=se[0];var de=`${se.name}.${_}`;_.startsWith("@@")&&(_=Symbol[_.substring(2)]),rt&&se.registeredClass.pureVirtualFunctions.push(_);function ue(){xt(`Cannot call ${de} due to unbound types`,Ut)}var Ce=se.registeredClass.instancePrototype,ze=Ce[_];return ze===void 0||ze.overloadTable===void 0&&ze.className!==se.name&&ze.argCount===A-2?(ue.argCount=A-2,ue.className=se.name,Ce[_]=ue):(pe(Ce,_,de),Ce[_].overloadTable[A-2]=ue),st([],Ut,ln=>{var L=Ot(de,ln,se,q,K,pt);return Ce[_].overloadTable===void 0?(L.argCount=A-2,Ce[_]=L):Ce[_].overloadTable[A-2]=L,[]}),[]})},ye=[],le=[0,1,,1,null,1,!0,1,!1,1];function zt(m){m>>>=0,m>9&&--le[m+1]===0&&(le[m]=void 0,ye.push(m))}var Zt={toValue:m=>(m||ft(`Cannot use deleted val. handle = ${m}`),le[m]),toHandle:m=>{switch(m){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:{const _=ye.pop()||le.length;return le[_]=m,le[_+1]=1,_}}}},ce={name:"emscripten::val",fromWireType:m=>{var _=Zt.toValue(m);return zt(m),_},toWireType:(m,_)=>Zt.toHandle(_),readValueFromPointer:Kt,destructorFunction:null};function Ze(m){return m>>>=0,it(m,ce)}var An=(m,_,A)=>{switch(_){case 1:return A?function(D){return this.fromWireType(b[D>>>0])}:function(D){return this.fromWireType(F[D>>>0])};case 2:return A?function(D){return this.fromWireType(P[D>>>1>>>0])}:function(D){return this.fromWireType(R[D>>>1>>>0])};case 4:return A?function(D){return this.fromWireType(I[D>>>2>>>0])}:function(D){return this.fromWireType(S[D>>>2>>>0])};default:throw new TypeError(`invalid integer width (${_}): ${m}`)}};function Je(m){return m===0?"object":m===1?"number":"string"}function di(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const q=Je(H);switch(q){case"object":{let At=function(){};At.values={},it(m,{name:_,constructor:At,valueType:q,fromWireType:function(Ut){return this.constructor.values[Ut]},toWireType:(Ut,se)=>se.value,readValueFromPointer:An(_,A,D),destructorFunction:null}),We(_,At);break}case"number":{var K={};it(m,{name:_,keysMap:K,valueType:q,fromWireType:At=>At,toWireType:(At,Ut)=>Ut,readValueFromPointer:An(_,A,D),destructorFunction:null}),We(_,K),delete e[_].argCount;break}case"string":{var rt={},pt={},K={};it(m,{name:_,valuesMap:rt,reverseMap:pt,keysMap:K,valueType:q,fromWireType:function(Ut){return this.reverseMap[Ut]},toWireType:function(Ut,se){return this.valuesMap[se]},readValueFromPointer:An(_,A,D),destructorFunction:null}),We(_,K),delete e[_].argCount;break}}}var be=(m,_)=>{var A=C[m];return A===void 0&&ft(`${_} has unknown type ${ht(m)}`),A};function en(m,_,A){m>>>=0,_>>>=0;var D=be(m,"enum");switch(_=gt(_),D.valueType){case"object":{var H=D.constructor,q=Object.create(D.constructor.prototype,{value:{value:A},constructor:{value:qt(`${D.name}_${_}`,function(){})}});H.values[A]=q,H[_]=q;break}case"number":{D.keysMap[_]=A;break}case"string":{D.valuesMap[_]=A,D.reverseMap[A]=_,D.keysMap[_]=_;break}}}var nn=(m,_)=>{switch(_){case 4:return function(A){return this.fromWireType(y[A>>>2>>>0])};case 8:return function(A){return this.fromWireType(N[A>>>3>>>0])};default:throw new TypeError(`invalid float width (${_}): ${m}`)}},Xe=function(m,_,A){m>>>=0,_>>>=0,A>>>=0,_=gt(_),it(m,{name:_,fromWireType:D=>D,toWireType:(D,H)=>H,readValueFromPointer:nn(_,A),destructorFunction:null})};function qe(m,_,A,D,H,q,K,rt){m>>>=0,A>>>=0,D>>>=0,H>>>=0,q>>>=0;var pt=Tt(_,A);m=gt(m),m=ge(m),H=W(D,H,K),We(m,function(){xt(`Cannot call ${m} due to unbound types`,pt)},_-1),st([],pt,At=>{var Ut=[At[0],null].concat(At.slice(1));return es(m,Ot(m,Ut,null,H,q,K),_-1),[]})}var br=function(m,_,A,D,H){m>>>=0,_>>>=0,A>>>=0,_=gt(_);const q=D===0;let K=pt=>pt;if(q){var rt=32-8*A;K=pt=>pt<<rt>>>rt,H=K(H)}it(m,{name:_,fromWireType:K,toWireType:(pt,At)=>At,readValueFromPointer:Rt(_,A,D!==0),destructorFunction:null})},Un=(m,_,A)=>{const D=(H,q)=>{let K=0;return{next(){if(K>=H)return{done:!0};const rt=K;return K++,{value:q(rt),done:!1}},[Symbol.iterator](){return this}}};m[Symbol.iterator]||(m[Symbol.iterator]=function(){const H=this[_]();return D(H,q=>this[A](q))})},Ch=function(m,_,A,D){m>>>=0,_>>>=0,A>>>=0,D>>>=0,A=gt(A),D=gt(D),st([],[m,_],H=>{const q=H[0];return Un(q.registeredClass.instancePrototype,A,D),[]})};function Ph(m,_,A){m>>>=0,A>>>=0;var D=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array],H=D[_];function q(K){var rt=S[K>>>2>>>0],pt=S[K+4>>>2>>>0];return new H(b.buffer,pt,rt)}A=gt(A),it(m,{name:A,fromWireType:q,readValueFromPointer:q},{ignoreDuplicateRegistrations:!0})}var Dh=Object.assign({optional:!0},ce);function Lh(m,_){m>>>=0,it(m,Dh)}var Uh=(m,_,A,D)=>{if(A>>>=0,!(D>0))return 0;for(var H=A,q=A+D-1,K=0;K<m.length;++K){var rt=m.codePointAt(K);if(rt<=127){if(A>=q)break;_[A++>>>0]=rt}else if(rt<=2047){if(A+1>=q)break;_[A++>>>0]=192|rt>>6,_[A++>>>0]=128|rt&63}else if(rt<=65535){if(A+2>=q)break;_[A++>>>0]=224|rt>>12,_[A++>>>0]=128|rt>>6&63,_[A++>>>0]=128|rt&63}else{if(A+3>=q)break;_[A++>>>0]=240|rt>>18,_[A++>>>0]=128|rt>>12&63,_[A++>>>0]=128|rt>>6&63,_[A++>>>0]=128|rt&63,K++}}return _[A>>>0]=0,A-H},Ih=(m,_,A)=>Uh(m,F,_,A),Nh=m=>{for(var _=0,A=0;A<m.length;++A){var D=m.charCodeAt(A);D<=127?_++:D<=2047?_+=2:D>=55296&&D<=57343?(_+=4,++A):_+=3}return _},ml=globalThis.TextDecoder&&new TextDecoder,_l=(m,_,A,D)=>{var H=_+A;if(D)return H;for(;m[_]&&!(_>=H);)++_;return _},Fh=(m,_=0,A,D)=>{_>>>=0;var H=_l(m,_,A,D);if(H-_>16&&m.buffer&&ml)return ml.decode(m.subarray(_,H));for(var q="";_<H;){var K=m[_++];if(!(K&128)){q+=String.fromCharCode(K);continue}var rt=m[_++]&63;if((K&224)==192){q+=String.fromCharCode((K&31)<<6|rt);continue}var pt=m[_++]&63;if((K&240)==224?K=(K&15)<<12|rt<<6|pt:K=(K&7)<<18|rt<<12|pt<<6|m[_++]&63,K<65536)q+=String.fromCharCode(K);else{var At=K-65536;q+=String.fromCharCode(55296|At>>10,56320|At&1023)}}return q},Oh=(m,_,A)=>(m>>>=0,m?Fh(F,m,_,A):"");function Bh(m,_){m>>>=0,_>>>=0,_=gt(_),it(m,{name:_,fromWireType(A){var D=S[A>>>2>>>0],H=A+4,q;return q=Oh(H,D,!0),qn(A),q},toWireType(A,D){D instanceof ArrayBuffer&&(D=new Uint8Array(D));var H,q=typeof D=="string";q||ArrayBuffer.isView(D)&&D.BYTES_PER_ELEMENT==1||ft("Cannot pass non-string to std::string"),q?H=Nh(D):H=D.length;var K=so(4+H+1),rt=K+4;return S[K>>>2>>>0]=H,q?Ih(D,rt,H+1):F.set(D,rt>>>0),A!==null&&A.push(qn,K),K},readValueFromPointer:Kt,destructorFunction(A){qn(A)}})}var gl=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,kh=(m,_,A)=>{var D=m>>>1,H=_l(R,D,_/2,A);if(H-D>16&&gl)return gl.decode(R.subarray(D>>>0,H>>>0));for(var q="",K=D;K<H;++K){var rt=R[K>>>0];q+=String.fromCharCode(rt)}return q},zh=(m,_,A)=>{if(A??(A=2147483647),A<2)return 0;A-=2;for(var D=_,H=A<m.length*2?A/2:m.length,q=0;q<H;++q){var K=m.charCodeAt(q);P[_>>>1>>>0]=K,_+=2}return P[_>>>1>>>0]=0,_-D},Hh=m=>m.length*2,Vh=(m,_,A)=>{for(var D="",H=m>>>2,q=0;!(q>=_/4);q++){var K=S[H+q>>>0];if(!K&&!A)break;D+=String.fromCodePoint(K)}return D},Gh=(m,_,A)=>{if(_>>>=0,A??(A=2147483647),A<4)return 0;for(var D=_,H=D+A-4,q=0;q<m.length;++q){var K=m.codePointAt(q);if(K>65535&&q++,I[_>>>2>>>0]=K,_+=4,_+4>H)break}return I[_>>>2>>>0]=0,_-D},Wh=m=>{for(var _=0,A=0;A<m.length;++A){var D=m.codePointAt(A);D>65535&&A++,_+=4}return _};function Xh(m,_,A){m>>>=0,_>>>=0,A>>>=0,A=gt(A);var D,H,q;_===2?(D=kh,H=zh,q=Hh):(D=Vh,H=Gh,q=Wh),it(m,{name:A,fromWireType:K=>{var rt=S[K>>>2>>>0],pt=D(K+4,rt*_,!0);return qn(K),pt},toWireType:(K,rt)=>{typeof rt!="string"&&ft(`Cannot pass non-string to C++ string type ${A}`);var pt=q(rt),At=so(4+pt+_);return S[At>>>2>>>0]=pt/_,H(rt,At+4,pt+_),K!==null&&K.push(qn,At),At},readValueFromPointer:Kt,destructorFunction(K){qn(K)}})}function $h(m,_,A,D,H,q){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,q>>>=0,re[m]={name:gt(_),rawConstructor:W(A,D),rawDestructor:W(H,q),fields:[]}}function qh(m,_,A,D,H,q,K,rt,pt,At){m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,q>>>=0,K>>>=0,rt>>>=0,pt>>>=0,At>>>=0,re[m].fields.push({fieldName:gt(_),getterReturnType:A,getter:W(D,H),getterContext:q,setterArgumentType:K,setter:W(rt,pt),setterContext:At})}var Yh=function(m,_){m>>>=0,_>>>=0,_=gt(_),it(m,{isVoid:!0,name:_,fromWireType:()=>{},toWireType:(A,D)=>{}})};function jh(m,_){m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),m.set(_)}var no=[],Kh=m=>{var _=no.length;return no.push(m),_},Zh=(m,_)=>{for(var A=new Array(m),D=0;D<m;++D)A[D]=be(S[_+D*4>>>2>>>0],`parameter ${D}`);return A},Jh=(m,_,A)=>{var D=[],H=m(D,A);return D.length&&(S[_>>>2>>>0]=Zt.toHandle(D)),H},Qh={},vl=m=>{var _=Qh[m];return _===void 0?gt(m):_},tf=function(m,_,A){_>>>=0;var D=8,[H,...q]=Zh(m,_),K=H.toWireType.bind(H),rt=q.map(ue=>ue.readValueFromPointer.bind(ue));m--;var pt={toValue:Zt.toValue},At=rt.map((ue,Ce)=>{var ze=`argFromPtr${Ce}`;return pt[ze]=ue,`${ze}(args${Ce?"+"+Ce*D:""})`}),Ut;switch(A){case 0:Ut="toValue(handle)";break;case 2:Ut="new (toValue(handle))";break;case 3:Ut="";break;case 1:pt.getStringOrSymbol=vl,Ut="toValue(handle)[getStringOrSymbol(methodName)]";break}Ut+=`(${At})`,H.isVoid||(pt.toReturnWire=K,pt.emval_returnValue=Jh,Ut=`return emval_returnValue(toReturnWire, destructorsRef, ${Ut})`),Ut=`return function (handle, methodName, destructorsRef, args) {
${Ut}
}`;var se=new Function(Object.keys(pt),Ut)(...Object.values(pt)),de=`methodCaller<(${q.map(ue=>ue.name)}) => ${H.name}>`;return Kh(qt(de,se))};function ef(m,_){return m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),m==_}function nf(m,_){return m>>>=0,_>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),Zt.toHandle(m[_])}function rf(m){m>>>=0,m>9&&(le[m+1]+=1)}function sf(m,_,A,D,H){return m>>>=0,_>>>=0,A>>>=0,D>>>=0,H>>>=0,no[m](_,A,D,H)}function of(m){return m>>>=0,Zt.toHandle(vl(m))}function af(){return Zt.toHandle({})}function lf(m){m>>>=0;var _=Zt.toValue(m);kt(_),zt(m)}function cf(m,_,A){m>>>=0,_>>>=0,A>>>=0,m=Zt.toValue(m),_=Zt.toValue(_),A=Zt.toValue(A),m[_]=A}var uf=()=>4294901760,hf=(m,_)=>Math.ceil(m/_)*_,ff=m=>{var _=ns.buffer.byteLength,A=(m-_+65535)/65536|0;try{return ns.grow(A),lt(),1}catch{}};function df(m){m>>>=0;var _=F.length,A=uf();if(m>A)return!1;for(var D=1;D<=4;D*=2){var H=_*(1+.2/D);H=Math.min(H,m+100663296);var q=Math.min(A,hf(Math.max(m,H),65536)),K=ff(q);if(K)return!0}return!1}var pf=(m,_)=>{if(pi)for(var A=m;A<m+_;A++){var D=E(A);D&&pi.set(D,A)}},pi,mf=m=>(pi||(pi=new WeakMap,pf(0,Tr.length)),pi.get(m)||0),io=[],_f=()=>io.length?io.pop():Tr.grow(1),ro=(m,_)=>Tr.set(m,_),xl=m=>{const _=m.length;return[_%128|128,_>>7,...m]},gf={i:127,p:127,j:126,f:125,d:124,e:111},Ml=m=>xl(Array.from(m,_=>{var A=gf[_];return A})),vf=(m,_)=>{var A=Uint8Array.of(0,97,115,109,1,0,0,0,1,...xl([1,96,...Ml(_.slice(1)),...Ml(_[0]==="v"?"":_[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),D=new WebAssembly.Module(A),H=new WebAssembly.Instance(D,{e:{f:m}}),q=H.exports.f;return q},mi=(m,_)=>{var A=mf(m);if(A)return A;var D=_f();try{ro(D,m)}catch(q){if(!(q instanceof TypeError))throw q;var H=vf(m,_);ro(D,H)}return pi.set(m,D),D},_i=m=>{pi.delete(E(m)),ro(m,null),io.push(m)};if(ot(),eo(),e.noExitRuntime&&e.noExitRuntime,e.print&&e.print,e.printErr&&(v=e.printErr),e.wasmBinary&&(x=e.wasmBinary),e.arguments&&e.arguments,e.thisProgram&&e.thisProgram,e.preInit)for(typeof e.preInit=="function"&&(e.preInit=[e.preInit]);e.preInit.length>0;)e.preInit.shift()();e.addFunction=mi,e.removeFunction=_i;var yl,so,qn,ns,Tr;function xf(m){yl=m.K,so=m.M,qn=m.N,ns=m.I,Tr=m.L}var Mf={l:xe,C:Lt,q:Z,z:Gt,G:Vt,j:Dt,i:ie,a:Ue,E:Ze,x:di,d:en,y:Xe,c:qe,p:br,m:Ch,h:Ph,n:Lh,F:Bh,w:Xh,r:$h,k:qh,H:Yh,u:jh,g:tf,b:zt,o:ef,B:nf,t:rf,f:sf,s:of,A:af,e:lf,v:cf,D:df};function yf(m){m=Object.assign({},m);var _=D=>H=>D(H)>>>0,A=D=>()=>D()>>>0;return m.K=_(m.K),m.M=_(m.M),m._emscripten_stack_alloc=_(m._emscripten_stack_alloc),m.emscripten_stack_get_current=A(m.emscripten_stack_get_current),m}function Sf(){Q();function m(){var _;e.calledRun=!0,!p&&(dt(),T==null||T(e),(_=e.onRuntimeInitialized)==null||_.call(e),j())}e.setStatus?(e.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>e.setStatus(""),1),m()},1)):m()}var gi;return gi=await Et(),Sf(),et?t=e:t=new Promise((m,_)=>{T=m,w=_}),t}let Go=null;function vx(){return Go||(Go=gx().then(n=>(n.setup(),n))),Go}class Ks{constructor(){this.items=[]}keep(t){return this.items.push(t),t}get size(){return this.items.length}dispose(){for(const t of this.items)t.delete();this.items=[]}}function pr(n,t){const e=new n.Mesh({numProp:3,vertProperties:new Float32Array(t.positions),triVerts:new Uint32Array(t.indices)});let i;try{i=n.Manifold.ofMesh(e)}catch(s){const o=s instanceof Error?s.message:String(s);throw new Error(`toManifold: mesh is not a closed solid (${o})`,{cause:s})}const r=i.status();if(r!=="NoError")throw i.delete(),new Error(`toManifold: mesh is not a closed solid (${r})`);return i}function Zs(n){const t=n.getMesh(),e=xx(t),i=new Uint32Array(t.triVerts);return{positions:e,indices:i,normals:qr(e,i)}}function xx(n){const{numProp:t,vertProperties:e}=n;if(t===3)return new Float32Array(e);const i=e.length/t,r=new Float32Array(i*3);for(let s=0;s<i;s++)r[s*3]=e[s*t],r[s*3+1]=e[s*t+1],r[s*3+2]=e[s*t+2];return r}const Mx=2,yx=96;function oh(n,t,e,i,r){const s=t.keep(e.scale(1+r.shrinkPct/100)),o=s.boundingBox(),a=Math.max(Math.abs(o.min[0]),Math.abs(o.max[0]),Math.abs(o.min[1]),Math.abs(o.max[1])),l=Sx(s,o.max[2]),c=i==="dropout"?0:r.spareMm,u=o.max[2]+c,h=c+Mx+1,d=t.keep(n.Manifold.cylinder(h,l,l,yx,!1).translate([0,0,o.max[2]-1]));return{solid:t.keep(n.Manifold.union([s,d])),topZ:u,maxRadius:a,bottomZ:o.min[2]}}function Sx(n,t){const e=n.getMesh(),{numProp:i,vertProperties:r}=e,s=r.length/i,o=2;let a=0;for(let l=0;l<s;l++){if(r[l*i+2]<t-o)continue;const u=Math.hypot(r[l*i],r[l*i+1]);u>a&&(a=u)}return Math.max(a,1)}function Ex(n,t,e,i,r){const s=e.maxRadius+r.plasterMm,o=e.bottomZ-r.plasterMm,a=e.topZ-o,l=t.keep(n.Manifold.cube([s*2,s*2,a],!0).translate([0,0,o+a/2])),c=t.keep(l.subtract(e.solid));if(i==="dropout")return[{id:"single",label:"Форма целиком",solid:c,pull:"up"}];let u=c,h=o;const d=[];if(i==="halves-bottom"){const f=Wc(t,c,[0,0,1],e.bottomZ),T=s*.72,w=Gc(n,t,r.keyMm,[[T,T,e.bottomZ],[-T,T,e.bottomZ],[T,-T,e.bottomZ],[-T,-T,e.bottomZ]]);d.push({id:"bottom",label:"Донная плита",solid:w?t.keep(n.Manifold.union([f.negative,w])):f.negative,pull:"up"}),u=w?t.keep(f.positive.subtract(w)):f.positive,h=e.bottomZ}const g=Wc(t,u,[0,1,0],0),v=Math.max(r.keyMm*3,r.plasterMm*.5),x=s*.78,p=Gc(n,t,r.keyMm,[[x,0,h+v],[-x,0,h+v],[x,0,e.topZ-v],[-x,0,e.topZ-v]]);return d.unshift({id:"half-A",label:"Половина A",solid:p?t.keep(g.positive.subtract(p)):g.positive,pull:"+y"},{id:"half-B",label:"Половина B",solid:p?t.keep(n.Manifold.union([g.negative,p])):g.negative,pull:"-y"}),d}function Gc(n,t,e,i){return e<=0||i.length===0?null:t.keep(n.Manifold.union(i.map(r=>t.keep(n.Manifold.sphere(e,32).translate(r)))))}function Wc(n,t,e,i){const[r,s]=t.splitByPlane(e,i);n.keep(r),n.keep(s);const o=e[0]!==0?0:e[1]!==0?1:2,a=e[o]>0?1:-1,l=r.boundingBox();return(l.min[o]+l.max[o])/2*a>i*a?{positive:r,negative:s}:{positive:s,negative:r}}function bx(n,t){switch(n.pull){case"up":return n.solid;case"down":return t.keep(n.solid.rotate([180,0,0]));case"+y":return t.keep(n.solid.rotate([-90,0,0]));case"-y":return t.keep(n.solid.rotate([90,0,0]))}}function Tx(n,t,e,i){const r=bx(e,t),s=r.boundingBox(),o=t.keep(r.translate([-(s.min[0]+s.max[0])/2,-(s.min[1]+s.max[1])/2,-s.min[2]])),a=s.max[0]-s.min[0],l=s.max[1]-s.min[1],c=s.max[2]-s.min[2],u=i.bathClearMm,h=i.bathWallMm,d=a+2*u,g=l+2*u,v=c+u,x=t.keep(n.Manifold.cube([d+2*h,g+2*h,v+h],!0).translate([0,0,(v+h)/2-h])),p=t.keep(n.Manifold.cube([d,g,v+h],!0).translate([0,0,(v+h)/2])),f=t.keep(x.subtract(p));return t.keep(n.Manifold.union([f,o]).translate([0,0,h]))}const ah=30,lh=80,ch=120;function uh(){return{shrinkPct:12,plasterMm:28,spareMm:25,keyMm:7,bathWallMm:3,bathClearMm:12}}const or=(n,t,e)=>Math.min(e,Math.max(t,n));function Ax(n){const t=uh(),e={};if(typeof n=="object"&&n!==null)for(const[s,o]of Object.entries(n))e[s]=o;const i=(s,o)=>typeof s=="number"&&Number.isFinite(s)?s:o,r=or(i(e.plasterMm,t.plasterMm),5,lh);return{shrinkPct:or(i(e.shrinkPct,t.shrinkPct),0,ah),plasterMm:r,spareMm:or(i(e.spareMm,t.spareMm),0,ch),keyMm:or(i(e.keyMm,t.keyMm),0,r/3),bathWallMm:or(i(e.bathWallMm,t.bathWallMm),1.2,12),bathClearMm:or(i(e.bathClearMm,t.bathClearMm),3,60)}}const wx=.001,Rx=.02,Cx=.02;function Xc(n,t){const{positions:e,indices:i}=n;let r=1/0,s=-1/0,o=0;for(let d=0;d<e.length;d+=3)e[d+2]<r&&(r=e[d+2]),e[d+2]>s&&(s=e[d+2]),o=Math.max(o,Math.abs(e[d]),Math.abs(e[d+1]));const a=s-Rx*(s-r),l=Cx*o;let c=0,u=0,h=0;for(let d=0;d<i.length;d+=3){const g=i[d]*3,v=i[d+1]*3,x=i[d+2]*3,p=e[v]-e[g],f=e[v+1]-e[g+1],T=e[v+2]-e[g+2],w=e[x]-e[g],b=e[x+1]-e[g+1],F=e[x+2]-e[g+2],P=f*F-T*b,R=T*w-p*F,I=p*b-f*w,S=Math.hypot(P,R,I);if(S<1e-18)continue;let y;if(t==="up"){const N=I/S,Y=(e[g+2]+e[v+2]+e[x+2])/3;if(N>.99&&Y>a)continue;y=N}else{const N=(e[g+1]+e[v+1]+e[x+1])/3;if(Math.abs(N)<l)continue;y=-(N>0?R:-R)/S}c+=S,y>wx&&(u+=S,h=Math.max(h,y))}return{fraction:c>0?u/c:0,worst:h}}const Px=.005;function Dx(n){const{positions:t}=n;let e=1/0,i=-1/0;for(let a=2;a<t.length;a+=3)t[a]<e&&(e=t[a]),t[a]>i&&(i=t[a]);const r=e+Px*(i-e);let s=0,o=0;for(let a=0;a<t.length;a+=3){const l=Math.hypot(t[a],t[a+1]);l>o&&(o=l),t[a+2]<=r&&l>s&&(s=l)}return o>0?s/o:0}const Lx=.002,Ux=.02,Ix=.55,$c={id:"half-A",label:"Половина A"},qc={id:"half-B",label:"Половина B"},Nx={id:"bottom",label:"Донная плита"},Fx={id:"single",label:"Форма целиком"};function hh(n,t){const e=Xc(n,"up"),i=Xc(n,"sides"),r=[];if(i.fraction>Ux){const o=Math.asin(Math.min(1,i.worst))*180/Math.PI,a=t.angularRelief?"Рельеф идёт под углом к плоскости разъёма — такую форму пришлось бы вывинчивать. Разверните волну по высоте (кольцевые валики форма отпускает свободно) или уменьшите глубину.":"Уменьшите глубину рельефа: при таком шаге валики заворачиваются по радиусу.";r.push(`Поднутрения: ${(i.fraction*100).toFixed(1)} % поверхности, самый крутой подрез ${o.toFixed(0)}°. ${a}`)}if(!t.hasHandle&&e.fraction<=Lx)return{scheme:"dropout",parts:[Fx],reason:"Изделие нигде не шире, чем выше: вынимается вверх, форма нужна из одной части.",dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r};const s=t.hasHandle?"Ручка делает в теле сквозное отверстие — вверх изделие не вынуть, нужен разъём вдоль оси.":`Изделие где-то шире, чем выше (${(e.fraction*100).toFixed(0)} % поверхности с зацепами) — вверх не вынуть, нужен разъём вдоль оси.`;return Dx(n)>=Ix?{scheme:"halves-bottom",parts:[$c,qc,Nx],reason:`${s} Дно широкое и плоское: шов через него зачищать труднее всего, поэтому дно отливается отдельной плитой.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r}:{scheme:"halves",parts:[$c,qc],reason:`${s} Дно узкое, отдельная плита не нужна.`,dropoutUndercut:e.fraction,halvesUndercut:i.fraction,warnings:r}}function Ox(n,t,e,i){const r=new Ks;try{const s=r.keep(pr(n,t)),o=oh(n,r,s,e.scheme,i),a=r.keep(o.solid.trimByPlane([0,0,-1],-o.topZ));return{id:"master",label:"Мастер-позитив",mesh:Zs(a)}}finally{r.dispose()}}function Bx(n,t,e,i){const r=new Ks;try{const s=r.keep(pr(n,t)),o=oh(n,r,s,e.scheme,i);return Ex(n,r,o,e.scheme,i).map(a=>({id:`bath-${a.id}`,label:`Ванночка: ${a.label.toLowerCase()}`,mesh:Zs(Tx(n,r,a,i))}))}finally{r.dispose()}}const kx=[{kind:"range",key:"wall",label:"Стенка",min:ul,max:hl,step:.1,unit:"мм",hint:"толщина меряется по нормали к поверхности",get:n=>n.wallMm,set:(n,t)=>({...n,wallMm:t})},{kind:"range",key:"base",label:"Дно",min:eh,max:nh,step:.5,unit:"мм",get:n=>n.baseMm,set:(n,t)=>({...n,baseMm:t})},{kind:"range",key:"rim",label:"Радиус края",min:0,max:ih,step:.1,unit:"мм",hint:"0 — плоский срез; больше половины стенки не бывает — это уже поднутрение",get:n=>n.rimRadiusMm,set:(n,t)=>({...n,rimRadiusMm:t})}],fh={kind:"range",key:"shrink",label:"Усадка",min:0,max:ah,step:.5,unit:"%",hint:"шликер садится при сушке и обжиге — на столько увеличивается модель",get:n=>n.shrinkPct,set:(n,t)=>({...n,shrinkPct:t})},dh={kind:"range",key:"spare",label:"Горловина",min:0,max:ch,step:1,unit:"мм",hint:"воротник над венчиком, куда доливают шликер",get:n=>n.spareMm,set:(n,t)=>({...n,spareMm:t})},zx=[fh,dh],Hx=[fh,dh,{kind:"range",key:"plaster",label:"Гипс",min:5,max:lh,step:1,unit:"мм",hint:"толщина гипса вокруг полости",get:n=>n.plasterMm,set:(n,t)=>({...n,plasterMm:t})},{kind:"range",key:"key",label:"Ключи",min:0,max:25,step:.5,unit:"мм",hint:"радиус замков на плоскости разъёма; 0 — без них",get:n=>n.keyMm,set:(n,t)=>({...n,keyMm:t})},{kind:"range",key:"silicone",label:"Силикон",min:3,max:60,step:1,unit:"мм",hint:"слой силикона над блоком",get:n=>n.bathClearMm,set:(n,t)=>({...n,bathClearMm:t})},{kind:"range",key:"bathWall",label:"Борт",min:1.2,max:12,step:.2,unit:"мм",hint:"толщина стенки печатной опалубки",get:n=>n.bathWallMm,set:(n,t)=>({...n,bathWallMm:t})}];function Vx(n,t,e,i,r,s,o,a,l){for(const[x,p]of Object.entries(n))p.disabled=!1,p.addEventListener("click",()=>{(x==="vessel"||x==="master"||x==="bath")&&o(x)});const c=ne("div"),u=ne("div"),h=ne("div");t.textContent="",t.append(c,u,h);const d=Xn(c,kx,r,a,"print"),g=Xn(u,zx,s,l,"master"),v=Xn(h,Hx,s,l,"bath");return{sync(x,p,f){for(const[T,w]of Object.entries(n))w.setAttribute("aria-selected",String(T===x));c.hidden=x!=="vessel",u.hidden=x!=="master",h.hidden=x!=="bath",d.sync(p),g.sync(f),v.sync(f)},setParts(x){i.textContent="";for(const p of x){const f=ne("li");f.append(ne("span","part-name",p.label)),p.note&&f.append(ne("span",void 0,p.note)),i.append(f)}},setSchemeNote(x){e.textContent=x}}}function Gx(n,t=150){let e=null;function i(s){const o=s.dataset.slider,a=Number(s.dataset.dir);if(!o)return;const l=document.getElementById(o);if(!(l instanceof HTMLInputElement))return;const c=Number(l.step)||1,u=Number(l.min),h=Number(l.max);let d=Number(l.value)+a*c;d=Math.max(u,Math.min(h,d)),l.value=String(d),l.dispatchEvent(new Event("input",{bubbles:!0}))}function r(){e&&(clearInterval(e),e=null)}n.addEventListener("pointerdown",s=>{if(!(s.target instanceof Element))return;const o=s.target.closest(".adj-btn");o instanceof HTMLElement&&(s.preventDefault(),r(),i(o),e=setInterval(()=>i(o),t))}),n.addEventListener("pointerup",r),n.addEventListener("pointerleave",r),n.addEventListener("pointercancel",r),document.addEventListener("pointerup",r)}const Wx="rgba(217, 139, 95, 0.20)",Xx="#d98b5f",$x="rgba(164, 148, 138, 0.45)",qx="#a4948a";function Yx(n,t){const e=n.getContext("2d");if(!e)return;const i=Math.min(window.devicePixelRatio||1,2),r=n.clientWidth||276,s=n.clientHeight||110;(n.width!==Math.round(r*i)||n.height!==Math.round(s*i))&&(n.width=Math.round(r*i),n.height=Math.round(s*i)),e.setTransform(i,0,0,i,0,0),e.clearRect(0,0,r,s);const o=128,a=[];let l=0;for(let x=0;x<=o;x++){const p=$n(t,x/o);a.push(p),p>l&&(l=p)}const c=8,u=6,h=16,d=Math.min((r-2*c)/(2*l),(s-u-h)/t.heightMm),g=r/2,v=s-h;e.beginPath();for(let x=0;x<=o;x++){const p=v-x/o*t.heightMm*d,f=g+a[x]*d;x===0?e.moveTo(f,p):e.lineTo(f,p)}for(let x=o;x>=0;x--)e.lineTo(g-a[x]*d,v-x/o*t.heightMm*d);e.closePath(),e.fillStyle=Wx,e.fill(),e.strokeStyle=Xx,e.lineWidth=1.5,e.stroke(),e.strokeStyle=$x,e.lineWidth=1,e.setLineDash([3,3]),e.beginPath(),e.moveTo(g,v),e.lineTo(g,v-t.heightMm*d),e.stroke(),e.setLineDash([]),e.fillStyle=qx,e.font="11px system-ui, sans-serif",e.textAlign="center",e.fillText(`⌀${Math.round(l*2)} × ${Math.round(t.heightMm)} мм`,g,s-3)}function jx(n,t){if(t.length===0)throw new Error("unionAll: нечего объединять");if(t.length===1)return t[0];const e=new Ks;try{const i=t.map(r=>e.keep(pr(n,r)));return Zs(e.keep(n.Manifold.union(i)))}finally{e.dispose()}}function Kx(n,t,e){const i=th(t),r=Yr(t),s=ol(e,r.profile,r.heightMm);return s.length===0?i:jx(n,[i,...s])}function Zx(n,t,e,i){const r=sh(t,e),s=Yr(t),o=ol(i,s.profile,s.heightMm);if(o.length===0)return r;const a=new Ks;try{const l=a.keep(pr(n,r.mesh)),c=a.keep(n.Manifold.union([l,...o.map(d=>a.keep(pr(n,d)))])),u=a.keep(pr(n,sl(r.innerGrid,"both")));return{mesh:Zs(a.keep(c.subtract(u))),capacityMl:r.capacityMl,pinchedFraction:r.pinchedFraction}}finally{a.dispose()}}function Jx(n,t={}){const{positions:e,indices:i}=n,r=i.length/3,s=new ArrayBuffer(84+r*50),o=new DataView(s),a=`ClayForm ${t.name??""}`.slice(0,80);new TextEncoder().encodeInto(a,new Uint8Array(s,0,80)),o.setUint32(80,r,!0);let c=84;const u=t.scale??1;for(let h=0;h<i.length;h+=3){const d=i[h]*3,g=i[h+1]*3,v=i[h+2]*3,x=e[g]-e[d],p=e[g+1]-e[d+1],f=e[g+2]-e[d+2],T=e[v]-e[d],w=e[v+1]-e[d+1],b=e[v+2]-e[d+2];let F=p*b-f*w,P=f*T-x*b,R=x*w-p*T;const I=Math.hypot(F,P,R);I>1e-30&&(F/=I,P/=I,R/=I),o.setFloat32(c,F,!0),o.setFloat32(c+4,P,!0),o.setFloat32(c+8,R,!0),c+=12;for(const S of[d,g,v])o.setFloat32(c,e[S]*u,!0),o.setFloat32(c+4,e[S+1]*u,!0),o.setFloat32(c+8,e[S+2]*u,!0),c+=12;o.setUint16(c,0,!0),c+=2}return s}const ph=1,Qx=["vessel","master","bath"],mh=[128,192,256,384],tM=20,eM=400;function fl(){const n=zi("pot");return{version:ph,family:n.id,shape:js(n.id,{}),heightMm:n.defaultHeightMm,relief:tl(),roulette:rl(),handle:ju(),spout:al(),hollow:rh(),mold:uh(),exportMode:"vessel",resolution:192}}function nM(n,t){if(!Iu(n))return t;const e=zi(n);return{...t,family:e.id,shape:js(e.id,{}),heightMm:e.defaultHeightMm}}function _h(n){const t={};if(typeof n=="object"&&n!==null)for(const[e,i]of Object.entries(n))t[e]=i;return t}function Yc(n,t){return typeof n=="number"&&Number.isFinite(n)?n:t}function iM(n){const t={};for(const[e,i]of Object.entries(_h(n)))typeof i=="number"&&Number.isFinite(i)&&(t[e]=i);return t}function Js(n){const t=_h(n),e=fl(),i=typeof t.family=="string"&&Iu(t.family)?t.family:e.family,r=Math.min(eM,Math.max(tM,Yc(t.heightMm,zi(i).defaultHeightMm))),s=Yc(t.resolution,e.resolution),o=mh.includes(s)?s:e.resolution;return{version:ph,family:i,shape:js(i,iM(t.shape)),heightMm:r,relief:_v(t.relief),roulette:Ev(t.roulette),handle:$v(t.handle),spout:Yv(t.spout),hollow:hx(t.hollow),mold:Ax(t.mold),exportMode:rM(t.exportMode),resolution:o}}function rM(n){for(const t of Qx)if(n===t)return t;return"vessel"}function dl(n,t){return{family:n.family,shape:n.shape,heightMm:n.heightMm,nu:t,nv:t,relief:n.relief,roulette:n.roulette,spout:n.spout}}function Ke(n,t,e,i,r={}){return{name:n,note:t,build:()=>Js({...fl(),family:e,shape:{...iv(e),...i},...r})}}const gh=[Ke("Горшок","русский печной горшок","pot",{dBelly:170,dNeck:108,dFoot:104,bellyAt:.52,shoulder:.45,neckH:.16,rimFlare:.18},{heightMm:150}),Ke("Крынка","узкое горло под сметану и молоко","pot",{dBelly:150,dNeck:74,dFoot:92,bellyAt:.42,shoulder:.7,neckH:.28,rimFlare:.35},{heightMm:195,spout:{on:!0,pullMm:12,widthDeg:55,zone:.14}}),Ke("Корчага","большая тарная посудина","pot",{dBelly:300,dNeck:200,dFoot:160,bellyAt:.48,shoulder:.3,neckH:.1,rimFlare:.12},{heightMm:340}),Ke("Горшок с накаткой","поясок, накатанный колесом по тулову","pot",{dBelly:178,dNeck:112,dFoot:100,bellyAt:.5,shoulder:.5,neckH:.15,rimFlare:.2},{heightMm:160,roulette:{bands:[{on:!0,pattern:"lattice",bandCenter:.66,bandWidthMm:26,depthMm:1.5,repeats:0,gapMm:0,angle:0}]}}),Ke("Кувшин","носик-слив и ручка напротив","vase",{dBelly:150,dNeck:76,dRim:96,dFoot:96,bellyAt:.4,neckAt:.74,footH:6},{heightMm:230,handle:{on:!0,count:1,topAt:.88,bottomAt:.42,reachMm:34,thicknessMm:13,widthRatio:.65},spout:{on:!0,pullMm:20,widthDeg:55,zone:.16}}),Ke("Амфора","две ручки, узкая ножка","vase",{dBelly:168,dNeck:62,dRim:88,dFoot:62,bellyAt:.42,neckAt:.78,footH:26},{heightMm:300,handle:{on:!0,count:2,topAt:.86,bottomAt:.54,reachMm:30,thicknessMm:14,widthRatio:.8}}),Ke("Лекиф","узкий сосуд для масла","vase",{dBelly:84,dNeck:26,dRim:48,dFoot:60,bellyAt:.34,neckAt:.8,footH:14},{heightMm:210}),Ke("Ваза с валиками","кольцевой рельеф по тулову","vase",{dBelly:160,dNeck:58,dRim:84,dFoot:80,bellyAt:.4,neckAt:.78,footH:12},{heightMm:265,relief:{wave:{on:!0,axis:"z",shape:"rounded",freq:18,ampMm:1.4,phase:0,spiralK:0},wave2:{on:!1,axis:"theta",shape:"sin",freq:6,fm:.2,am:.5,spiralK:1},zone:{from:.12,to:.72,fade:.08}}}),Ke("Кратер с меандром","широкое устье, античный ключ по тулову","vase",{dBelly:190,dNeck:150,dRim:168,dFoot:92,bellyAt:.55,neckAt:.82,footH:22,rimFlare:.12},{heightMm:240,roulette:{bands:[{on:!0,pattern:"meander",bandCenter:.6,bandWidthMm:30,depthMm:1.3,repeats:0,gapMm:0,angle:0},{on:!0,pattern:"band",bandCenter:.36,bandWidthMm:7,depthMm:1.1,repeats:0,gapMm:0,angle:0}]}}),Ke("Миска","столовая миска","bowl",{dRim:210,dFoot:92,curvature:.6,footH:8,rimFlare:0},{heightMm:80}),Ke("Тарелка","широкая и низкая","bowl",{dRim:260,dFoot:120,curvature:.25,footH:6,rimFlare:.06},{heightMm:42}),Ke("Пиала","полусфера без ножки","bowl",{dRim:130,dFoot:52,curvature:1,footH:4,rimFlare:0},{heightMm:62}),Ke("Килик","плоская чаша на высокой ножке","bowl",{dRim:200,dFoot:74,curvature:.45,footH:42,rimFlare:.1},{heightMm:110}),Ke("Кружка","чашка с ручкой","cup",{dRim:88,dFoot:70,barrel:.08,rimFlare:0},{heightMm:100,handle:{on:!0,count:1,topAt:.84,bottomAt:.28,reachMm:30,thicknessMm:11,widthRatio:.7}}),Ke("Стакан","прямой конус, форма из одной части","cup",{dRim:78,dFoot:58,barrel:0,rimFlare:0},{heightMm:110}),Ke("Канопка","бочкообразная кружка","cup",{dRim:92,dFoot:78,barrel:.28,rimFlare:.05},{heightMm:115,handle:{on:!0,count:1,topAt:.8,bottomAt:.24,reachMm:32,thicknessMm:12,widthRatio:.6}})];function sM(n){return gh.find(t=>t.name===n)??null}function oM(n){const t=new TextEncoder().encode(n);let e="";for(const i of t)e+=String.fromCharCode(i);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function aM(n){const t=n.replace(/-/g,"+").replace(/_/g,"/"),e=t.length%4?"=".repeat(4-t.length%4):"",i=atob(t+e),r=new Uint8Array(i.length);for(let s=0;s<i.length;s++)r[s]=i.charCodeAt(s);return new TextDecoder().decode(r)}function lM(n){return oM(JSON.stringify(n))}function cM(n){try{return Js(JSON.parse(aM(n)))}catch{return null}}function uM(n){const t=n.match(/#s=([A-Za-z0-9\-_]+)/);return t?t[1]:null}const vh="clayform_user_presets_v1";function hM(){try{const n=localStorage.getItem(vh);if(!n)return[];const t=JSON.parse(n);if(!Array.isArray(t))return[];const e=[];for(const i of t){if(typeof i!="object"||i===null)continue;const r=Reflect.get(i,"name");typeof r!="string"||r.length===0||e.push({name:r,state:Js(Reflect.get(i,"state"))})}return e}catch{return[]}}function fM(n){try{return localStorage.setItem(vh,JSON.stringify(n)),!0}catch{return!1}}function dM(n){let t=0;for(const e of n){const i=e.name.match(/^Моё (\d+)$/);i&&(t=Math.max(t,Number(i[1])))}return t+1}class pM{constructor(t,e=80){this.limit=e,this.past=[],this.future=[],this.current=t}get value(){return this.current}get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}push(t){mM(t,this.current)||(this.past.push(this.current),this.past.length>this.limit&&this.past.shift(),this.future=[],this.current=t)}replace(t){this.current=t}undo(){const t=this.past.pop();return t===void 0?null:(this.future.push(this.current),this.current=t,t)}redo(){const t=this.future.pop();return t===void 0?null:(this.past.push(this.current),this.current=t,t)}}function mM(n,t){return JSON.stringify(n)===JSON.stringify(t)}const _M=192,gM=96,vM=220,xM=400,MM=20,yM=500,SM=Le("view",HTMLCanvasElement),EM=Le("panel",HTMLElement),bM=Le("familyGrid",HTMLDivElement),TM=Le("shapeParams",HTMLDivElement),AM=Le("reliefCards",HTMLDivElement),wM=Le("attachCards",HTMLDivElement),RM=Le("exportParams",HTMLDivElement),CM=Le("profileGraph",HTMLCanvasElement),ka=Le("heightMm",HTMLInputElement),Hr=Le("resolution",HTMLSelectElement),En=Le("exportBtn",HTMLButtonElement),PM=Le("status",HTMLParagraphElement),Vr=Le("audit",HTMLParagraphElement),Bs=Le("warnings",HTMLParagraphElement),Ni=Le("blockers",HTMLParagraphElement),Di=Le("presetSel",HTMLSelectElement),jc=Le("saveBtn",HTMLButtonElement),Wo=Le("shareBtn",HTMLButtonElement),xh=Le("undoBtn",HTMLButtonElement),Mh=Le("redoBtn",HTMLButtonElement),yh=Z0(SM),Sh=vx(),ai=new pM(DM());let bt=ai.value;function DM(){const n=uM(location.hash);return n&&cM(n)||fl()}const LM=ov(bM,bt.family,n=>{tn(nM(n,bt))});Gx(EM);let Kc=bh();const Eh=Uv(AM,()=>bt.relief,()=>bt.roulette,n=>tn({...bt,relief:n}),n=>tn({...bt,roulette:n})),UM=Qv(wM,()=>bt.handle,()=>bt.spout,n=>tn({...bt,handle:n}),n=>tn({...bt,spout:n})),Nr=Vx({vessel:Le("tabVessel",HTMLButtonElement),master:Le("tabMaster",HTMLButtonElement),bath:Le("tabBath",HTMLButtonElement)},RM,Le("schemeNote",HTMLParagraphElement),Le("partList",HTMLUListElement),()=>bt.hollow,()=>bt.mold,n=>tn({...bt,exportMode:n}),n=>tn({...bt,hollow:n}),n=>tn({...bt,mold:n}));function bh(){return av(TM,zi(bt.family).params,bt.shape,(n,t)=>{tn({...bt,shape:{...bt.shape,[n]:t}})})}function tn(n,t=!0){const e=n.family!==bt.family;bt=Js(n),t?IM(bt):ai.replace(bt),e?(LM.setActive(bt.family),Kc=bh()):Kc.setValues(bt.shape),Eh.sync(bt.relief,bt.roulette),UM.sync(bt.handle,bt.spout),Nr.sync(bt.exportMode,bt.hollow,bt.mold),ka.value=String(Math.round(bt.heightMm)),Hr.value=String(bt.resolution),Th(),NM()}let mr=null;function IM(n){mr&&clearTimeout(mr),mr=setTimeout(()=>{ai.push(n),Th()},yM)}function Th(){xh.disabled=!ai.canUndo,Mh.disabled=!ai.canRedo}let Xo=null,$o=null,Fr=0;function NM(){Fr++;const n=Fr,t=Qa(bt.family,bt.shape,bt.heightMm);Yx(CM,t),Eh.setBandNote(c=>{const u=$n(t,c.bandCenter),h=Ou(c,{heightMm:bt.heightMm,radiusAt:v=>$n(t,v)}),d=2*Math.PI*u/h,g=Math.max(0,d-c.gapMm);return`${h} оттисков за оборот по ⌀${(u*2).toFixed(0)} мм: шаг ${d.toFixed(1)} мм, элемент ${g.toFixed(1)} мм.`});const e=dl(bt,_M),i=sh(e,bt.hollow),r=th(e),s=hh(r,{hasHandle:bt.handle.on,angularRelief:zM()});Nr.setSchemeNote(s.reason);const o=[...s.warnings];i.pinchedFraction>0&&o.push(`Рельеф уходит внутрь глубже стенки на ${(i.pinchedFraction*100).toFixed(1)} % поверхности — там стенка тоньше заданной. Уменьшите глубину волны или увеличьте стенку.`),Bs.textContent=o.join(`
`);const a=HM(r.positions),l=ll(i.mesh.positions,i.mesh.indices)/1e3;if(PM.textContent=[`⌀${a.toFixed(0)} × ${bt.heightMm.toFixed(0)} мм`,`вместимость ${Zc(i.capacityMl)}`,`глины ${Zc(l)}`].join(" · "),$o&&clearTimeout($o),Xo&&clearTimeout(Xo),bt.exportMode==="vessel"){const c=Yr(e);yh.setMeshes([i.mesh,...ol(bt.handle,c.profile,c.heightMm)]),Nr.setParts([{label:"Изделие",note:`${(l/1e3).toFixed(2)} л глины`}]),En.textContent="Экспорт STL",Vr.textContent="проверка…",Xo=setTimeout(()=>kM(i.mesh),vM)}else Nr.setParts(s.parts.map(c=>({label:c.label}))),En.textContent=bt.exportMode==="master"?"Экспорт мастера":"Экспорт ванночек",Vr.textContent="собираю оснастку…",$o=setTimeout(()=>void FM(n),xM)}async function FM(n){try{const t=await Sh;if(n!==Fr)return;const e=Ah(t,gM);if(n!==Fr)return;yh.setMeshes(OM(e.map(r=>r.mesh))),Nr.setParts(e.map(r=>({label:r.label,note:BM(r.mesh)})));const i=e.reduce((r,s)=>r+s.mesh.indices.length/3,0);Vr.textContent=`${e.length} дет. · ${Math.round(i/1e3)} тыс. треугольников`,Ni.textContent="",En.disabled=!1}catch(t){if(n!==Fr)return;Vr.textContent="",Ni.textContent=`Оснастку собрать не удалось: ${wh(t)}`,En.disabled=!0}}function Ah(n,t){const e=dl(bt,t),i=Kx(n,e,bt.handle),r=hh(i,{hasHandle:bt.handle.on});return bt.exportMode==="master"?[Ox(n,i,r,bt.mold)]:Bx(n,i,r,bt.mold)}function OM(n){let t=0;const e=[];for(const i of n){let r=1/0,s=-1/0;for(let l=0;l<i.positions.length;l+=3)i.positions[l]<r&&(r=i.positions[l]),i.positions[l]>s&&(s=i.positions[l]);const o=t-r,a=new Float32Array(i.positions);for(let l=0;l<a.length;l+=3)a[l]+=o;e.push({...i,positions:a}),t+=s-r+MM}return e}function BM(n){const{extents:t}=cl({...n,normals:n.normals});return`${t.map(e=>Math.round(e)).join("×")} мм`}function kM(n){const t=cl(n),e=Ju(t),i=tx(n,60);Vr.textContent=t.watertight?`замкнуто ✓ · ${Math.round(t.triangleCount/1e3)} тыс. треугольников`:"меш не замкнут";const r=[...e.warnings];i>.15&&r.push(`Свесы круче 60° на ${(i*100).toFixed(0)} % поверхности — печать глиной потребует опор.`);const s=Bs.textContent?[Bs.textContent]:[];Bs.textContent=[...s,...r].join(`
`),Ni.textContent=e.blocking.join(`
`),En.disabled=e.blocking.length>0}function zM(){const n=t=>t!=="z";return bt.relief.wave.on&&n(bt.relief.wave.axis)||bt.relief.wave2.on&&n(bt.relief.wave2.axis)||bt.roulette.bands.some(t=>t.on)}function HM(n){let t=0;for(let e=0;e<n.length;e+=3)t=Math.max(t,Math.hypot(n[e],n[e+1]));return t*2}function Zc(n){return n>=1e3?`${(n/1e3).toFixed(2)} л`:`${n.toFixed(0)} мл`}function wh(n){return n instanceof Error?n.message:String(n)}ka.addEventListener("input",()=>{tn({...bt,heightMm:Number(ka.value)})});Hr.textContent="";for(const n of mh){const t=document.createElement("option");t.value=String(n),t.textContent=`${n} × ${n}`,Hr.append(t)}Hr.addEventListener("change",()=>{tn({...bt,resolution:Number(Hr.value)})});En.addEventListener("click",()=>{VM(bt.exportMode)});async function VM(n){const t=En.textContent;En.disabled=!0,En.textContent="Собираю…";try{const e=await Sh,i=n==="vessel"?[{id:bt.family,label:"Изделие",mesh:Zx(e,dl(bt,bt.resolution),bt.hollow,bt.handle).mesh}]:Ah(e,bt.resolution),r=i.flatMap(s=>Ju(cl(s.mesh),!0).blocking);if(r.length>0){Ni.textContent=r.join(`
`);return}Ni.textContent="";for(const s of i){const o=`clayform-${bt.family}-${s.id}.stl`;GM(Jx(s.mesh,{name:s.id}),o),await new Promise(a=>setTimeout(a,250))}}catch(e){Ni.textContent=`Сборка не удалась: ${wh(e)}`}finally{En.textContent=t,En.disabled=!1}}function GM(n,t){const e=URL.createObjectURL(new Blob([n],{type:"model/stl"})),i=document.createElement("a");i.href=e,i.download=t,i.click(),URL.revokeObjectURL(e)}let Li=hM();function Rh(){Di.textContent="";const n=document.createElement("option");n.value="",n.textContent="Пресеты…",Di.append(n);const t=document.createElement("optgroup");t.label="Готовые";for(const e of gh){const i=document.createElement("option");i.value=`b:${e.name}`,i.textContent=e.name,i.title=e.note,t.append(i)}if(Di.append(t),Li.length>0){const e=document.createElement("optgroup");e.label="Мои";for(const i of Li){const r=document.createElement("option");r.value=`u:${i.name}`,r.textContent=i.name,e.append(r)}Di.append(e)}}Di.addEventListener("change",()=>{const n=Di.value;if(Di.value="",n.startsWith("b:")){const t=sM(n.slice(2));t&&tn(t.build())}else if(n.startsWith("u:")){const t=Li.find(e=>e.name===n.slice(2));t&&tn(t.state)}});jc.addEventListener("click",()=>{var e;const n=`Моё ${dM(Li)}`,t=(e=prompt("Имя пресета",n))==null?void 0:e.trim();t&&(Li=[...Li.filter(i=>i.name!==t),{name:t,state:bt}],fM(Li)?(Rh(),za(jc,"✓")):Ni.textContent="Не удалось сохранить пресет: браузер запретил доступ к хранилищу.")});Wo.addEventListener("click",()=>{var t;const n=lM(bt);location.hash=`s=${n}`,(t=navigator.clipboard)==null||t.writeText(`${location.origin}${location.pathname}#s=${n}`).then(()=>za(Wo,"✓"),()=>za(Wo,"↑"))});function za(n,t){const e=n.textContent;n.textContent=t,setTimeout(()=>{n.textContent=e},900)}xh.addEventListener("click",()=>pl("undo"));Mh.addEventListener("click",()=>pl("redo"));function pl(n){mr&&(clearTimeout(mr),mr=null,ai.push(bt));const t=n==="undo"?ai.undo():ai.redo();t&&tn(t,!1)}window.addEventListener("keydown",n=>{!(n.ctrlKey||n.metaKey)||n.key.toLowerCase()!=="z"||(n.preventDefault(),pl(n.shiftKey?"redo":"undo"))});Rh();tn(bt,!1);
