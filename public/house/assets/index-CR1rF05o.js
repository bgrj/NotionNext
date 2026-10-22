(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lc="170",hs={ROTATE:0,DOLLY:1,PAN:2},rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},df=0,Jc=1,pf=2,Ah=1,Rh=2,Nn=3,li=0,Ve=1,fn=2,si=0,us=1,Qc=2,tl=3,el=4,mf=5,Ei=100,gf=101,_f=102,xf=103,vf=104,Mf=200,yf=201,Sf=202,Ef=203,ua=204,fa=205,bf=206,Tf=207,wf=208,Af=209,Rf=210,Cf=211,Pf=212,Lf=213,Df=214,da=0,pa=1,ma=2,ms=3,ga=4,_a=5,xa=6,va=7,Ch=0,If=1,Uf=2,ri=0,Nf=1,Ff=2,Of=3,zf=4,Bf=5,kf=6,Hf=7,Ph=300,gs=301,_s=302,Ma=303,ya=304,lo=306,xn=1e3,wi=1001,Sa=1002,mn=1003,Vf=1004,mr=1005,Sn=1006,To=1007,Ai=1008,Vn=1009,Lh=1010,Dh=1011,js=1012,hc=1013,Ci=1014,On=1015,ar=1016,uc=1017,fc=1018,xs=1020,Ih=35902,Uh=1021,Nh=1022,pn=1023,Fh=1024,Oh=1025,fs=1026,vs=1027,zh=1028,dc=1029,Bh=1030,pc=1031,mc=1033,Xr=33776,Yr=33777,qr=33778,Zr=33779,Ea=35840,ba=35841,Ta=35842,wa=35843,Aa=36196,Ra=37492,Ca=37496,Pa=37808,La=37809,Da=37810,Ia=37811,Ua=37812,Na=37813,Fa=37814,Oa=37815,za=37816,Ba=37817,ka=37818,Ha=37819,Va=37820,Ga=37821,$r=36492,Wa=36494,Xa=36495,kh=36283,Ya=36284,qa=36285,Za=36286,Gf=3200,Wf=3201,Hh=0,Xf=1,ii="",be="srgb",bs="srgb-linear",ho="linear",ae="srgb",ki=7680,nl=519,Yf=512,qf=513,Zf=514,Vh=515,$f=516,Kf=517,jf=518,Jf=519,il=35044,sl="300 es",zn=2e3,Qr=2001;class Ui{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const Vs=Math.PI/180,Js=180/Math.PI;function Ni(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function De(n,t,e){return Math.max(t,Math.min(e,n))}function gc(n,t){return(n%t+t)%t}function Qf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function td(n,t,e){return n!==t?(e-n)/(t-n):0}function Gs(n,t,e){return(1-e)*n+e*t}function ed(n,t,e,i){return Gs(n,t,1-Math.exp(-e*i))}function nd(n,t=1){return t-Math.abs(gc(n,t*2)-t)}function id(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function sd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function rd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function od(n,t){return n+Math.random()*(t-n)}function ad(n){return n*(.5-Math.random())}function cd(n){n!==void 0&&(rl=n);let t=rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ld(n){return n*Vs}function hd(n){return n*Js}function ud(n){return(n&n-1)===0&&n!==0}function fd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function dd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function pd(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),p=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,c*u,c*d,a*l);break;case"YZY":n.set(c*d,a*h,c*u,a*l);break;case"ZXZ":n.set(c*u,c*d,a*h,a*l);break;case"XZX":n.set(a*h,c*g,c*p,a*l);break;case"YXY":n.set(c*p,a*h,c*g,a*l);break;case"ZYZ":n.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ns(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ke(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const _c={DEG2RAD:Vs,RAD2DEG:Js,generateUUID:Ni,clamp:De,euclideanModulo:gc,mapLinear:Qf,inverseLerp:td,lerp:Gs,damp:ed,pingpong:nd,smoothstep:id,smootherstep:sd,randInt:rd,randFloat:od,randFloatSpread:ad,seededRandom:cd,degToRad:ld,radToDeg:hd,isPowerOfTwo:ud,ceilPowerOfTwo:fd,floorPowerOfTwo:dd,setQuaternionFromProperEuler:pd,normalize:ke,denormalize:ns};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,i,s,r,o,a,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],_=s[0],m=s[3],f=s[6],y=s[1],v=s[4],x=s[7],T=s[2],A=s[5],w=s[8];return r[0]=o*_+a*y+c*T,r[3]=o*m+a*v+c*A,r[6]=o*f+a*x+c*w,r[1]=l*_+h*y+u*T,r[4]=l*m+h*v+u*A,r[7]=l*f+h*x+u*w,r[2]=d*_+p*y+g*T,r[5]=d*m+p*v+g*A,r[8]=d*f+p*x+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*i)*_,t[2]=(a*i-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*c-l*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(wo.makeScale(t,e)),this}rotate(t){return this.premultiply(wo.makeRotation(-t)),this}translate(t,e){return this.premultiply(wo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wo=new qt;function Gh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function to(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function md(){const n=to("canvas");return n.style.display="block",n}const ol={};function Bs(n){n in ol||(ol[n]=!0,console.warn(n))}function gd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function _d(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:bs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ae&&(n.r=kn(n.r),n.g=kn(n.g),n.b=kn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ae&&(n.r=ds(n.r),n.g=ds(n.g),n.b=ds(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ii?ho:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const al=[.64,.33,.3,.6,.15,.06],cl=[.2126,.7152,.0722],ll=[.3127,.329],hl=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ul=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[bs]:{primaries:al,whitePoint:ll,transfer:ho,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:cl,workingColorSpaceConfig:{unpackColorSpace:be},outputColorSpaceConfig:{drawingBufferColorSpace:be}},[be]:{primaries:al,whitePoint:ll,transfer:ae,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:cl,outputColorSpaceConfig:{drawingBufferColorSpace:be}}});let Hi;class vd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Hi===void 0&&(Hi=to("canvas")),Hi.width=t.width,Hi.height=t.height;const i=Hi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Hi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=to("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=kn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(kn(e[i]/255)*255):e[i]=kn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Md=0;class Wh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Ni(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ao(s[o].image)):r.push(Ao(s[o]))}else r=Ao(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Ao(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yd=0;class Ge extends Ui{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,i=wi,s=wi,r=Sn,o=Ai,a=pn,c=Vn,l=Ge.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Ni(),this.name="",this.source=new Wh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xn:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case Sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xn:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case Sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Ph;Ge.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,i=0,s=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,x=(p+1)/2,T=(f+1)/2,A=(h+d)/4,w=(u+_)/4,U=(g+m)/4;return v>x&&v>T?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=A/i,r=w/i):x>T?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=A/s,r=U/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=w/r,s=U/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sd extends Ui{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ge(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Wh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends Sd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Xh extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ed extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Li{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,y=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const T=Math.sqrt(v),A=Math.atan2(T,f*y);m=Math.sin(m*A)/T,a=Math.sin(a*A)/T}const x=a*y;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*p-l*d,t[e+1]=c*g+h*d+l*u-a*p,t[e+2]=l*g+h*p+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),d=c(i/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,i=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ro=new N,fl=new Li;class cr{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),gr.copy(i.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),_r.subVectors(this.max,Ls),Vi.subVectors(t.a,Ls),Gi.subVectors(t.b,Ls),Wi.subVectors(t.c,Ls),Zn.subVectors(Gi,Vi),$n.subVectors(Wi,Gi),di.subVectors(Vi,Wi);let e=[0,-Zn.z,Zn.y,0,-$n.z,$n.y,0,-di.z,di.y,Zn.z,0,-Zn.x,$n.z,0,-$n.x,di.z,0,-di.x,-Zn.y,Zn.x,0,-$n.y,$n.x,0,-di.y,di.x,0];return!Co(e,Vi,Gi,Wi,_r)||(e=[1,0,0,0,1,0,0,0,1],!Co(e,Vi,Gi,Wi,_r))?!1:(xr.crossVectors(Zn,$n),e=[xr.x,xr.y,xr.z],Co(e,Vi,Gi,Wi,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new N,new N,new N,new N,new N,new N,new N,new N],ln=new N,gr=new cr,Vi=new N,Gi=new N,Wi=new N,Zn=new N,$n=new N,di=new N,Ls=new N,_r=new N,xr=new N,pi=new N;function Co(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){pi.fromArray(n,r);const a=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),c=t.dot(pi),l=e.dot(pi),h=i.dot(pi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const bd=new cr,Ds=new N,Po=new N;class uo{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):bd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);const e=Ds.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ds,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Po.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(Po)),this.expandByPoint(Ds.copy(t.center).sub(Po))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new N,Lo=new N,vr=new N,Kn=new N,Do=new N,Mr=new N,Io=new N;class fo{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Lo.copy(t).add(e).multiplyScalar(.5),vr.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Lo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(vr),a=Kn.dot(this.direction),c=-Kn.dot(vr),l=Kn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Lo).addScaledVector(vr,d),p}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const i=Ln.dot(this.direction),s=Ln.dot(Ln)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,i,s,r){Do.subVectors(e,t),Mr.subVectors(i,t),Io.crossVectors(Do,Mr);let o=this.direction.dot(Io),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,t);const c=a*this.direction.dot(Mr.crossVectors(Kn,Mr));if(c<0)return null;const l=a*this.direction.dot(Do.cross(Kn));if(l<0||c+l>o)return null;const h=-a*Kn.dot(Io);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,i,s,r,o,a,c,l,h,u,d,p,g,_,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,d,p,g,_,m)}set(t,e,i,s,r,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Td,t,wd)}lookAt(t,e,i){const s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),jn.crossVectors(i,Ke),jn.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),jn.crossVectors(i,Ke)),jn.normalize(),yr.crossVectors(Ke,jn),s[0]=jn.x,s[4]=yr.x,s[8]=Ke.x,s[1]=jn.y,s[5]=yr.y,s[9]=Ke.y,s[2]=jn.z,s[6]=yr.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],y=i[3],v=i[7],x=i[11],T=i[15],A=s[0],w=s[4],U=s[8],E=s[12],M=s[1],L=s[5],V=s[9],C=s[13],F=s[2],P=s[6],z=s[10],O=s[14],I=s[3],W=s[7],X=s[11],et=s[15];return r[0]=o*A+a*M+c*F+l*I,r[4]=o*w+a*L+c*P+l*W,r[8]=o*U+a*V+c*z+l*X,r[12]=o*E+a*C+c*O+l*et,r[1]=h*A+u*M+d*F+p*I,r[5]=h*w+u*L+d*P+p*W,r[9]=h*U+u*V+d*z+p*X,r[13]=h*E+u*C+d*O+p*et,r[2]=g*A+_*M+m*F+f*I,r[6]=g*w+_*L+m*P+f*W,r[10]=g*U+_*V+m*z+f*X,r[14]=g*E+_*C+m*O+f*et,r[3]=y*A+v*M+x*F+T*I,r[7]=y*w+v*L+x*P+T*W,r[11]=y*U+v*V+x*z+T*X,r[15]=y*E+v*C+x*O+T*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*c*u-s*l*u-r*a*d+i*l*d+s*a*p-i*c*p)+_*(+e*c*p-e*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+m*(+e*l*u-e*a*p-r*o*u+i*o*p+r*a*h-i*l*h)+f*(-s*a*h-e*c*u+e*a*d+s*o*u-i*o*d+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],y=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,v=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,T=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,A=e*y+i*v+s*x+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return t[0]=y*w,t[1]=(_*d*r-u*m*r-_*s*p+i*m*p+u*s*f-i*d*f)*w,t[2]=(a*m*r-_*c*r+_*s*l-i*m*l-a*s*f+i*c*f)*w,t[3]=(u*c*r-a*d*r-u*s*l+i*d*l+a*s*p-i*c*p)*w,t[4]=v*w,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*w,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*f-e*c*f)*w,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*p+e*c*p)*w,t[8]=x*w,t[9]=(g*u*r-h*_*r-g*i*p+e*_*p+h*i*f-e*u*f)*w,t[10]=(o*_*r-g*a*r+g*i*l-e*_*l-o*i*f+e*a*f)*w,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*p-e*a*p)*w,t[12]=T*w,t[13]=(h*_*s-g*u*s+g*i*d-e*_*d-h*i*m+e*u*m)*w,t[14]=(g*a*s-o*_*s-g*i*c+e*_*c+o*i*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*d+e*a*d)*w,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,y=c*l,v=c*h,x=c*u,T=i.x,A=i.y,w=i.z;return s[0]=(1-(_+f))*T,s[1]=(p+x)*T,s[2]=(g-v)*T,s[3]=0,s[4]=(p-x)*A,s[5]=(1-(d+f))*A,s[6]=(m+y)*A,s[7]=0,s[8]=(g+v)*w,s[9]=(m-y)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Xi.set(s[0],s[1],s[2]).length();const o=Xi.set(s[4],s[5],s[6]).length(),a=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const l=1/r,h=1/o,u=1/a;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=zn){const c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let p,g;if(a===zn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Qr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=zn){const c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*l,p=(i+s)*h;let g,_;if(a===zn)g=(o+r)*u,_=-2*u;else if(a===Qr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Xi=new N,hn=new he,Td=new N(0,0,0),wd=new N(1,1,1),jn=new N,yr=new N,Ke=new N,dl=new he,pl=new Li;class wn{constructor(t=0,e=0,i=0,s=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-De(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(De(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return dl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pl.setFromEuler(this),this.setFromQuaternion(pl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ad=0;const ml=new N,Yi=new Li,Dn=new he,Sr=new N,Is=new N,Rd=new N,Cd=new Li,gl=new N(1,0,0),_l=new N(0,1,0),xl=new N(0,0,1),vl={type:"added"},Pd={type:"removed"},qi={type:"childadded",child:null},Uo={type:"childremoved",child:null};class we extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new N,e=new wn,i=new Li,s=new N(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new qt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(gl,t)}rotateY(t){return this.rotateOnAxis(_l,t)}rotateZ(t){return this.rotateOnAxis(xl,t)}translateOnAxis(t,e){return ml.copy(t).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gl,t)}translateY(t){return this.translateOnAxis(_l,t)}translateZ(t){return this.translateOnAxis(xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Sr.copy(t):Sr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Is,Sr,this.up):Dn.lookAt(Sr,Is,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vl),qi.child=t,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Pd),Uo.child=t,this.dispatchEvent(Uo),Uo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vl),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,Rd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,Cd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}we.DEFAULT_UP=new N(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new N,In=new N,No=new N,Un=new N,Zi=new N,$i=new N,Ml=new N,Fo=new N,Oo=new N,zo=new N,Bo=new le,ko=new le,Ho=new le;class dn{constructor(t=new N,e=new N,i=new N){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){un.subVectors(s,e),In.subVectors(i,e),No.subVectors(t,e);const o=un.dot(un),a=un.dot(In),c=un.dot(No),l=In.dot(In),h=In.dot(No),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(o,Un.y),c.addScaledVector(a,Un.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Bo.setScalar(0),ko.setScalar(0),Ho.setScalar(0),Bo.fromBufferAttribute(t,e),ko.fromBufferAttribute(t,i),Ho.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Bo,r.x),o.addScaledVector(ko,r.y),o.addScaledVector(Ho,r.z),o}static isFrontFacing(t,e,i,s){return un.subVectors(i,e),In.subVectors(t,e),un.cross(In).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),In.subVectors(this.a,this.b),un.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Zi.subVectors(s,i),$i.subVectors(r,i),Fo.subVectors(t,i);const c=Zi.dot(Fo),l=$i.dot(Fo);if(c<=0&&l<=0)return e.copy(i);Oo.subVectors(t,s);const h=Zi.dot(Oo),u=$i.dot(Oo);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Zi,o);zo.subVectors(t,r);const p=Zi.dot(zo),g=$i.dot(zo);if(g>=0&&p<=g)return e.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(i).addScaledVector($i,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ml.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(Ml,a);const f=1/(m+_+d);return o=_*f,a=d*f,e.copy(i).addScaledVector(Zi,o).addScaledVector($i,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Yh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Vo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Kt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Qt.workingColorSpace){if(t=gc(t,1),e=De(e,0,1),i=De(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Vo(o,r,t+1/3),this.g=Vo(o,r,t),this.b=Vo(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=be){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=be){const i=Yh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=be){return Qt.fromWorkingColorSpace(ze.copy(this),t),Math.round(De(ze.r*255,0,255))*65536+Math.round(De(ze.g*255,0,255))*256+Math.round(De(ze.b*255,0,255))}getHexString(t=be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(ze.copy(this),e);const i=ze.r,s=ze.g,r=ze.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=be){Qt.fromWorkingColorSpace(ze.copy(this),t);const e=ze.r,i=ze.g,s=ze.b;return t!==be?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Er);const i=Gs(Jn.h,Er.h,e),s=Gs(Jn.s,Er.s,e),r=Gs(Jn.l,Er.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new Kt;Kt.NAMES=Yh;let Ld=0;class Ts extends Ui{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Ni(),this.name="",this.blending=us,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ua,this.blendDst=fa,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ua&&(i.blendSrc=this.blendSrc),this.blendDst!==fa&&(i.blendDst=this.blendDst),this.blendEquation!==Ei&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vc extends Ts{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new N,br=new ot;class bn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=il,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)br.fromBufferAttribute(this,e),br.applyMatrix3(t),this.setXY(e,br.x,br.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ns(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ns(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ns(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ns(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ns(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==il&&(t.usage=this.usage),t}}class qh extends bn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Zh extends bn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class oe extends bn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Dd=0;const sn=new he,Go=new we,Ki=new N,je=new cr,Us=new cr,Ce=new N;class Ne extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=Ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gh(t)?Zh:qh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,i){return sn.makeTranslation(t,e,i),this.applyMatrix4(sn),this}scale(t,e,i){return sn.makeScale(t,e,i),this.applyMatrix4(sn),this}lookAt(t){return Go.lookAt(t),Go.updateMatrix(),this.applyMatrix4(Go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const i=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(je.min,Us.min),je.expandByPoint(Ce),Ce.addVectors(je.max,Us.max),je.expandByPoint(Ce)):(je.expandByPoint(Us.min),je.expandByPoint(Us.max))}je.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ce.fromBufferAttribute(a,l),c&&(Ki.fromBufferAttribute(t,l),Ce.add(Ki)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<i.count;U++)a[U]=new N,c[U]=new N;const l=new N,h=new N,u=new N,d=new ot,p=new ot,g=new ot,_=new N,m=new N;function f(U,E,M){l.fromBufferAttribute(i,U),h.fromBufferAttribute(i,E),u.fromBufferAttribute(i,M),d.fromBufferAttribute(r,U),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[U].add(_),a[E].add(_),a[M].add(_),c[U].add(m),c[E].add(m),c[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let U=0,E=y.length;U<E;++U){const M=y[U],L=M.start,V=M.count;for(let C=L,F=L+V;C<F;C+=3)f(t.getX(C+0),t.getX(C+1),t.getX(C+2))}const v=new N,x=new N,T=new N,A=new N;function w(U){T.fromBufferAttribute(s,U),A.copy(T);const E=a[U];v.copy(E),v.sub(T.multiplyScalar(T.dot(E))).normalize(),x.crossVectors(A,E);const L=x.dot(c[U])<0?-1:1;o.setXYZW(U,v.x,v.y,v.z,L)}for(let U=0,E=y.length;U<E;++U){const M=y[U],L=M.start,V=M.count;for(let C=L,F=L+V;C<F;C+=3)w(t.getX(C+0)),w(t.getX(C+1)),w(t.getX(C+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new bn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ne,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=t(d,i);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new he,mi=new fo,Tr=new uo,Sl=new N,wr=new N,Ar=new N,Rr=new N,Wo=new N,Cr=new N,El=new N,Pr=new N;class Ht extends we{constructor(t=new Ne,e=new vc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Wo.fromBufferAttribute(u,t),o?Cr.addScaledVector(Wo,h):Cr.addScaledVector(Wo.sub(e),h))}e.add(Cr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere),Tr.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(Tr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(Tr,Sl)===null||mi.origin.distanceToSquared(Sl)>(t.far-t.near)**2))&&(yl.copy(r).invert(),mi.copy(t.ray).applyMatrix4(yl),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,T=v;x<T;x+=3){const A=a.getX(x),w=a.getX(x+1),U=a.getX(x+2);s=Lr(this,f,t,i,l,h,u,A,w,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const y=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=Lr(this,o,t,i,l,h,u,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=y,T=v;x<T;x+=3){const A=x,w=x+1,U=x+2;s=Lr(this,f,t,i,l,h,u,A,w,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const y=m,v=m+1,x=m+2;s=Lr(this,o,t,i,l,h,u,y,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Id(n,t,e,i,s,r,o,a){let c;if(t.side===Ve?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===li,a),c===null)return null;Pr.copy(a),Pr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Pr);return l<e.near||l>e.far?null:{distance:l,point:Pr.clone(),object:n}}function Lr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,wr),n.getVertexPosition(c,Ar),n.getVertexPosition(l,Rr);const h=Id(n,t,e,i,wr,Ar,Rr,El);if(h){const u=new N;dn.getBarycoord(El,wr,Ar,Rr,u),s&&(h.uv=dn.getInterpolatedAttribute(s,a,c,l,u,new ot)),r&&(h.uv1=dn.getInterpolatedAttribute(r,a,c,l,u,new ot)),o&&(h.normal=dn.getInterpolatedAttribute(o,a,c,l,u,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new N,materialIndex:0};dn.getNormal(wr,Ar,Rr,d.normal),h.face=d,h.barycoord=u}return h}class We extends Ne{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(_,m,f,y,v,x,T,A,w,U,E){const M=x/w,L=T/U,V=x/2,C=T/2,F=A/2,P=w+1,z=U+1;let O=0,I=0;const W=new N;for(let X=0;X<z;X++){const et=X*L-C;for(let gt=0;gt<P;gt++){const kt=gt*M-V;W[_]=kt*y,W[m]=et*v,W[f]=F,l.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[f]=A>0?1:-1,h.push(W.x,W.y,W.z),u.push(gt/w),u.push(1-X/U),O+=1}}for(let X=0;X<U;X++)for(let et=0;et<w;et++){const gt=d+et+P*X,kt=d+et+P*(X+1),Z=d+(et+1)+P*(X+1),nt=d+(et+1)+P*X;c.push(gt,kt,nt),c.push(kt,Z,nt),I+=6}a.addGroup(p,I,E),p+=I,d+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new We(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function He(n){const t={};for(let e=0;e<n.length;e++){const i=Ms(n[e]);for(const s in i)t[s]=i[s]}return t}function Ud(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function $h(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Nd={clone:Ms,merge:He};var Fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Ts{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fd,this.fragmentShader=Od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=Ud(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Kh extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new N,bl=new ot,Tl=new ot;class tn extends Kh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,bl,Tl),e.subVectors(Tl,bl)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Vs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ji=-90,Ji=1;class zd extends we{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(ji,Ji,t,e);s.layers=this.layers,this.add(s);const r=new tn(ji,Ji,t,e);r.layers=this.layers,this.add(r);const o=new tn(ji,Ji,t,e);o.layers=this.layers,this.add(o);const a=new tn(ji,Ji,t,e);a.layers=this.layers,this.add(a);const c=new tn(ji,Ji,t,e);c.layers=this.layers,this.add(c);const l=new tn(ji,Ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===zn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Qr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class jh extends Ge{constructor(t,e,i,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:gs,super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Bd extends Pi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new jh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new We(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ve,blending:si});r.uniforms.tEquirect.value=e;const o=new Ht(s,r),a=e.minFilter;return e.minFilter===Ai&&(e.minFilter=Sn),new zd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Xo=new N,kd=new N,Hd=new qt;class ni{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Xo.subVectors(i,e).cross(kd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Xo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Hd.getNormalMatrix(t),s=this.coplanarPoint(Xo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new uo,Dr=new N;class Mc{constructor(t=new ni,e=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=zn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],y=s[13],v=s[14],x=s[15];if(i[0].setComponents(c-r,d-l,m-p,x-f).normalize(),i[1].setComponents(c+r,d+l,m+p,x+f).normalize(),i[2].setComponents(c+o,d+h,m+g,x+y).normalize(),i[3].setComponents(c-o,d-h,m-g,x-y).normalize(),i[4].setComponents(c-a,d-u,m-_,x-v).normalize(),e===zn)i[5].setComponents(c+a,d+u,m+_,x+v).normalize();else if(e===Qr)i[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Dr.x=s.normal.x>0?t.max.x:t.min.x,Dr.y=s.normal.y>0?t.max.y:t.min.y,Dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jh(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Vd(n){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class lr extends Ne{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const y=f*d-o;for(let v=0;v<l;v++){const x=v*u-r;g.push(x,-y,0),_.push(0,0,1),m.push(v/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<a;y++){const v=y+l*f,x=y+l*(f+1),T=y+1+l*(f+1),A=y+1+l*f;p.push(v,x,A),p.push(x,T,A)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lr(t.width,t.height,t.widthSegments,t.heightSegments)}}var Gd=`#ifdef USE_ALPHAHASH
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
#endif`,Yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$d=`#ifdef USE_AOMAP
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
#endif`,jd=`#ifdef USE_BATCHING
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
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,up=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
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
#endif`,wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ap=`#ifdef USE_FOG
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
}`,Lp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Up=`uniform bool receiveShadow;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kp=`PhysicalMaterial material;
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
#endif`,Yp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$p=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
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
#endif`,rm=`#ifdef USE_MORPHTARGETS
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
#endif`,cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,um=`#ifdef USE_NORMALMAP
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
#endif`,gm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vm=`vec4 mvPosition = vec4( transformed, 1.0 );
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
#endif`,wm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Am=`float getShadowMask() {
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
#endif`,Lm=`#ifdef USE_SKINNING
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
#endif`,Dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Um=`#if defined( TONE_MAPPING )
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
}`,Ym=`varying vec3 vWorldDirection;
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
}`,Zm=`#include <common>
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
}`,$m=`#if DEPTH_PACKING == 3200
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
}`,jm=`#define DISTANCE
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
}`,t0=`uniform float scale;
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
}`,e0=`uniform vec3 diffuse;
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
}`,n0=`#include <common>
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
}`,i0=`uniform vec3 diffuse;
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
}`,s0=`#define LAMBERT
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
}`,r0=`#define LAMBERT
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
}`,o0=`#define MATCAP
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
}`,a0=`#define MATCAP
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
}`,c0=`#define NORMAL
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
}`,l0=`#define NORMAL
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
}`,h0=`#define PHONG
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
}`,u0=`#define PHONG
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
}`,f0=`#define STANDARD
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
}`,d0=`#define STANDARD
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
}`,p0=`#define TOON
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
}`,m0=`#define TOON
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
}`,g0=`uniform float size;
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
}`,_0=`uniform vec3 diffuse;
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
}`,x0=`#include <common>
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
}`,v0=`uniform vec3 color;
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
}`,M0=`uniform float rotation;
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
}`,y0=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:Gd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:Yd,alphatest_fragment:qd,alphatest_pars_fragment:Zd,aomap_fragment:$d,aomap_pars_fragment:Kd,batching_pars_vertex:jd,batching_vertex:Jd,begin_vertex:Qd,beginnormal_vertex:tp,bsdfs:ep,iridescence_fragment:np,bumpmap_pars_fragment:ip,clipping_planes_fragment:sp,clipping_planes_pars_fragment:rp,clipping_planes_pars_vertex:op,clipping_planes_vertex:ap,color_fragment:cp,color_pars_fragment:lp,color_pars_vertex:hp,color_vertex:up,common:fp,cube_uv_reflection_fragment:dp,defaultnormal_vertex:pp,displacementmap_pars_vertex:mp,displacementmap_vertex:gp,emissivemap_fragment:_p,emissivemap_pars_fragment:xp,colorspace_fragment:vp,colorspace_pars_fragment:Mp,envmap_fragment:yp,envmap_common_pars_fragment:Sp,envmap_pars_fragment:Ep,envmap_pars_vertex:bp,envmap_physical_pars_fragment:Np,envmap_vertex:Tp,fog_vertex:wp,fog_pars_vertex:Ap,fog_fragment:Rp,fog_pars_fragment:Cp,gradientmap_pars_fragment:Pp,lightmap_pars_fragment:Lp,lights_lambert_fragment:Dp,lights_lambert_pars_fragment:Ip,lights_pars_begin:Up,lights_toon_fragment:Fp,lights_toon_pars_fragment:Op,lights_phong_fragment:zp,lights_phong_pars_fragment:Bp,lights_physical_fragment:kp,lights_physical_pars_fragment:Hp,lights_fragment_begin:Vp,lights_fragment_maps:Gp,lights_fragment_end:Wp,logdepthbuf_fragment:Xp,logdepthbuf_pars_fragment:Yp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Zp,map_fragment:$p,map_pars_fragment:Kp,map_particle_fragment:jp,map_particle_pars_fragment:Jp,metalnessmap_fragment:Qp,metalnessmap_pars_fragment:tm,morphinstance_vertex:em,morphcolor_vertex:nm,morphnormal_vertex:im,morphtarget_pars_vertex:sm,morphtarget_vertex:rm,normal_fragment_begin:om,normal_fragment_maps:am,normal_pars_fragment:cm,normal_pars_vertex:lm,normal_vertex:hm,normalmap_pars_fragment:um,clearcoat_normal_fragment_begin:fm,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:pm,iridescence_pars_fragment:mm,opaque_fragment:gm,packing:_m,premultiplied_alpha_fragment:xm,project_vertex:vm,dithering_fragment:Mm,dithering_pars_fragment:ym,roughnessmap_fragment:Sm,roughnessmap_pars_fragment:Em,shadowmap_pars_fragment:bm,shadowmap_pars_vertex:Tm,shadowmap_vertex:wm,shadowmask_pars_fragment:Am,skinbase_vertex:Rm,skinning_pars_vertex:Cm,skinning_vertex:Pm,skinnormal_vertex:Lm,specularmap_fragment:Dm,specularmap_pars_fragment:Im,tonemapping_fragment:Um,tonemapping_pars_fragment:Nm,transmission_fragment:Fm,transmission_pars_fragment:Om,uv_pars_fragment:zm,uv_pars_vertex:Bm,uv_vertex:km,worldpos_vertex:Hm,background_vert:Vm,background_frag:Gm,backgroundCube_vert:Wm,backgroundCube_frag:Xm,cube_vert:Ym,cube_frag:qm,depth_vert:Zm,depth_frag:$m,distanceRGBA_vert:Km,distanceRGBA_frag:jm,equirect_vert:Jm,equirect_frag:Qm,linedashed_vert:t0,linedashed_frag:e0,meshbasic_vert:n0,meshbasic_frag:i0,meshlambert_vert:s0,meshlambert_frag:r0,meshmatcap_vert:o0,meshmatcap_frag:a0,meshnormal_vert:c0,meshnormal_frag:l0,meshphong_vert:h0,meshphong_frag:u0,meshphysical_vert:f0,meshphysical_frag:d0,meshtoon_vert:p0,meshtoon_frag:m0,points_vert:g0,points_frag:_0,shadow_vert:x0,shadow_frag:v0,sprite_vert:M0,sprite_frag:y0},dt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},yn={basic:{uniforms:He([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:He([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:He([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:He([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:He([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:He([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:He([dt.points,dt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:He([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:He([dt.common,dt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:He([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:He([dt.sprite,dt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:He([dt.common,dt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:He([dt.lights,dt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};yn.physical={uniforms:He([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Ir={r:0,b:0,g:0},_i=new wn,S0=new he;function E0(n,t,e,i,s,r,o){const a=new Kt(0);let c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const x=g(y);x===null?f(a,c):x&&x.isColor&&(f(x,1),v=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,v){const x=g(v);x&&(x.isCubeTexture||x.mapping===lo)?(h===void 0&&(h=new Ht(new We(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Ms(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),_i.copy(v.backgroundRotation),_i.x*=-1,_i.y*=-1,_i.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(S0.makeRotationFromEuler(_i)),h.material.toneMapped=Qt.getTransfer(x.colorSpace)!==ae,(u!==x||d!==x.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ht(new lr(2,2),new hi({name:"BackgroundMaterial",uniforms:Ms(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(x.colorSpace)!==ae,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,p=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,v){y.getRGB(Ir,$h(n)),i.buffers.color.setClear(Ir.r,Ir.g,Ir.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,f(a,c)},render:_,addToRenderList:m}}function b0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(M,L,V,C,F){let P=!1;const z=u(C,V,L);r!==z&&(r=z,l(r.object)),P=p(M,C,V,F),P&&g(M,C,V,F),F!==null&&t.update(F,n.ELEMENT_ARRAY_BUFFER),(P||o)&&(o=!1,x(M,L,V,C),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,L,V){const C=V.wireframe===!0;let F=i[M.id];F===void 0&&(F={},i[M.id]=F);let P=F[L.id];P===void 0&&(P={},F[L.id]=P);let z=P[C];return z===void 0&&(z=d(c()),P[C]=z),z}function d(M){const L=[],V=[],C=[];for(let F=0;F<e;F++)L[F]=0,V[F]=0,C[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:C,object:M,attributes:{},index:null}}function p(M,L,V,C){const F=r.attributes,P=L.attributes;let z=0;const O=V.getAttributes();for(const I in O)if(O[I].location>=0){const X=F[I];let et=P[I];if(et===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(et=M.instanceColor)),X===void 0||X.attribute!==et||et&&X.data!==et.data)return!0;z++}return r.attributesNum!==z||r.index!==C}function g(M,L,V,C){const F={},P=L.attributes;let z=0;const O=V.getAttributes();for(const I in O)if(O[I].location>=0){let X=P[I];X===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(X=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(X=M.instanceColor));const et={};et.attribute=X,X&&X.data&&(et.data=X.data),F[I]=et,z++}r.attributes=F,r.attributesNum=z,r.index=C}function _(){const M=r.newAttributes;for(let L=0,V=M.length;L<V;L++)M[L]=0}function m(M){f(M,0)}function f(M,L){const V=r.newAttributes,C=r.enabledAttributes,F=r.attributeDivisors;V[M]=1,C[M]===0&&(n.enableVertexAttribArray(M),C[M]=1),F[M]!==L&&(n.vertexAttribDivisor(M,L),F[M]=L)}function y(){const M=r.newAttributes,L=r.enabledAttributes;for(let V=0,C=L.length;V<C;V++)L[V]!==M[V]&&(n.disableVertexAttribArray(V),L[V]=0)}function v(M,L,V,C,F,P,z){z===!0?n.vertexAttribIPointer(M,L,V,F,P):n.vertexAttribPointer(M,L,V,C,F,P)}function x(M,L,V,C){_();const F=C.attributes,P=V.getAttributes(),z=L.defaultAttributeValues;for(const O in P){const I=P[O];if(I.location>=0){let W=F[O];if(W===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(W=M.instanceColor)),W!==void 0){const X=W.normalized,et=W.itemSize,gt=t.get(W);if(gt===void 0)continue;const kt=gt.buffer,Z=gt.type,nt=gt.bytesPerElement,ft=Z===n.INT||Z===n.UNSIGNED_INT||W.gpuType===hc;if(W.isInterleavedBufferAttribute){const tt=W.data,Mt=tt.stride,Ct=W.offset;if(tt.isInstancedInterleavedBuffer){for(let wt=0;wt<I.locationSize;wt++)f(I.location+wt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let wt=0;wt<I.locationSize;wt++)m(I.location+wt);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let wt=0;wt<I.locationSize;wt++)v(I.location+wt,et/I.locationSize,Z,X,Mt*nt,(Ct+et/I.locationSize*wt)*nt,ft)}else{if(W.isInstancedBufferAttribute){for(let tt=0;tt<I.locationSize;tt++)f(I.location+tt,W.meshPerAttribute);M.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let tt=0;tt<I.locationSize;tt++)m(I.location+tt);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let tt=0;tt<I.locationSize;tt++)v(I.location+tt,et/I.locationSize,Z,X,et*nt,et/I.locationSize*tt*nt,ft)}}else if(z!==void 0){const X=z[O];if(X!==void 0)switch(X.length){case 2:n.vertexAttrib2fv(I.location,X);break;case 3:n.vertexAttrib3fv(I.location,X);break;case 4:n.vertexAttrib4fv(I.location,X);break;default:n.vertexAttrib1fv(I.location,X)}}}}y()}function T(){U();for(const M in i){const L=i[M];for(const V in L){const C=L[V];for(const F in C)h(C[F].object),delete C[F];delete L[V]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const L=i[M.id];for(const V in L){const C=L[V];for(const F in C)h(C[F].object),delete C[F];delete L[V]}delete i[M.id]}function w(M){for(const L in i){const V=i[L];if(V[M.id]===void 0)continue;const C=V[M.id];for(const F in C)h(C[F].object),delete C[F];delete V[M.id]}}function U(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function T0(n,t,e){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function c(l,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function w0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==pn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const U=w===ar&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Vn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==On&&!U)}function c(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:T,maxSamples:A}}function A0(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ni,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:i,v=y*4;let x=f.clippingState||null;c.value=x,x=h(g,d,v,p);for(let T=0;T!==v;++T)x[T]=e[T];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,x=p;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function R0(n){let t=new WeakMap;function e(o,a){return a===Ma?o.mapping=gs:a===ya&&(o.mapping=_s),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ma||a===ya)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Bd(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class yc extends Kh{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const os=4,wl=[.125,.215,.35,.446,.526,.582],bi=20,Yo=new yc,Al=new Kt;let qo=null,Zo=0,$o=0,Ko=!1;const yi=(1+Math.sqrt(5))/2,Qi=1/yi,Rl=[new N(-yi,Qi,0),new N(yi,Qi,0),new N(-Qi,0,yi),new N(Qi,0,yi),new N(0,yi,-Qi),new N(0,yi,Qi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class $a{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){qo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qo,Zo,$o),this._renderer.xr.enabled=Ko,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gs||t.mapping===_s?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:ar,format:pn,colorSpace:bs,depthBuffer:!1},s=Cl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cl(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=C0(r)),this._blurMaterial=P0(r,t,e)}return s}_compileMaterial(t){const e=new Ht(this._lodPlanes[0],t);this._renderer.compile(e,Yo)}_sceneToCubeUV(t,e,i,s){const a=new tn(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Al),h.toneMapping=ri,h.autoClear=!1;const p=new vc({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new Ht(new We,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Al),_=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):y===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const v=this._cubeSize;Ur(s,y*v,f>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===gs||t.mapping===_s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ht(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ur(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Yo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rl[(s-r-1)%Rl.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ht(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*bi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):bi;m>bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const f=[];let y=0;for(let w=0;w<bi;++w){const U=w/_,E=Math.exp(-U*U/2);f.push(E),w===0?y+=E:w<m&&(y+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const x=this._sizeLods[s],T=3*x*(s>v-os?s-v+os:0),A=4*(this._cubeSize-x);Ur(e,T,A,3*x,2*x),c.setRenderTarget(e),c.render(u,Yo)}}function C0(n){const t=[],e=[],i=[];let s=n;const r=n-os+1+wl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-os?c=wl[o-n+os-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,y=new Float32Array(_*g*p),v=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){const w=A%3*2/3-1,U=A>2?0:-1,E=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];y.set(E,_*g*A),v.set(d,m*g*A);const M=[A,A,A,A,A,A];x.set(M,f*g*A)}const T=new Ne;T.setAttribute("position",new bn(y,_)),T.setAttribute("uv",new bn(v,m)),T.setAttribute("faceIndex",new bn(x,f)),t.push(T),s>os&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Cl(n,t,e){const i=new Pi(n,t,e);return i.texture.mapping=lo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function P0(n,t,e){const i=new Float32Array(bi),s=new N(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Pl(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Ll(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Sc(){return`

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
	`}function L0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ma||c===ya,h=c===gs||c===_s;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new $a(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new $a(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function D0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Bs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function I0(n,t,e,i){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],n.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let v=0,x=y.length;v<x;v+=3){const T=y[v+0],A=y[v+1],w=y[v+2];d.push(T,A,A,w,w,T)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const T=v+0,A=v+1,w=v+2;d.push(T,A,A,w,w,T)}}else return;const m=new(Gh(d)?Zh:qh)(d,1);m.version=_;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function U0(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){n.drawElements(i,p,r,d*o),e.update(p,i,1)}function l(d,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,d*o,g),e.update(p,i,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,d,0,_,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*_[y];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function N0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function F0(n,t,e){const i=new WeakMap,s=new le;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(a);if(d===void 0||d.count!==u){let M=function(){U.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let T=a.attributes.position.count*x,A=1;T>t.maxTextureSize&&(A=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const w=new Float32Array(T*A*4*u),U=new Xh(w,T,A,u);U.type=On,U.needsUpdate=!0;const E=x*4;for(let L=0;L<u;L++){const V=f[L],C=y[L],F=v[L],P=T*A*4*L;for(let z=0;z<V.count;z++){const O=z*E;g===!0&&(s.fromBufferAttribute(V,z),w[P+O+0]=s.x,w[P+O+1]=s.y,w[P+O+2]=s.z,w[P+O+3]=0),_===!0&&(s.fromBufferAttribute(C,z),w[P+O+4]=s.x,w[P+O+5]=s.y,w[P+O+6]=s.z,w[P+O+7]=0),m===!0&&(s.fromBufferAttribute(F,z),w[P+O+8]=s.x,w[P+O+9]=s.y,w[P+O+10]=s.z,w[P+O+11]=F.itemSize===4?s.w:1)}}d={count:u,texture:U,size:new ot(T,A)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function O0(n,t,e,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Qh extends Ge{constructor(t,e,i,s,r,o,a,c,l,h=fs){if(h!==fs&&h!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===fs&&(i=Ci),i===void 0&&h===vs&&(i=xs),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:mn,this.minFilter=c!==void 0?c:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const tu=new Ge,Dl=new Qh(1,1),eu=new Xh,nu=new Ed,iu=new jh,Il=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function ws(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Il[s];if(r===void 0&&(r=new Float32Array(s),Il[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ae(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function po(n,t){let e=Ul[t];e===void 0&&(e=new Int32Array(t),Ul[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function z0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function B0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function k0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function H0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function V0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,i))return;Ol.set(i),n.uniformMatrix2fv(this.addr,!1,Ol),Re(e,i)}}function G0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,i))return;Fl.set(i),n.uniformMatrix3fv(this.addr,!1,Fl),Re(e,i)}}function W0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,i))return;Nl.set(i),n.uniformMatrix4fv(this.addr,!1,Nl),Re(e,i)}}function X0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Y0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function q0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function Z0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function $0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function K0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function j0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function J0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function Q0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Dl.compareFunction=Vh,r=Dl):r=tu,e.setTexture2D(t||r,s)}function tg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||nu,s)}function eg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||iu,s)}function ng(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||eu,s)}function ig(n){switch(n){case 5126:return z0;case 35664:return B0;case 35665:return k0;case 35666:return H0;case 35674:return V0;case 35675:return G0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return Y0;case 35668:case 35672:return q0;case 35669:case 35673:return Z0;case 5125:return $0;case 36294:return K0;case 36295:return j0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return Q0;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return ng}}function sg(n,t){n.uniform1fv(this.addr,t)}function rg(n,t){const e=ws(t,this.size,2);n.uniform2fv(this.addr,e)}function og(n,t){const e=ws(t,this.size,3);n.uniform3fv(this.addr,e)}function ag(n,t){const e=ws(t,this.size,4);n.uniform4fv(this.addr,e)}function cg(n,t){const e=ws(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function lg(n,t){const e=ws(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function hg(n,t){const e=ws(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ug(n,t){n.uniform1iv(this.addr,t)}function fg(n,t){n.uniform2iv(this.addr,t)}function dg(n,t){n.uniform3iv(this.addr,t)}function pg(n,t){n.uniform4iv(this.addr,t)}function mg(n,t){n.uniform1uiv(this.addr,t)}function gg(n,t){n.uniform2uiv(this.addr,t)}function _g(n,t){n.uniform3uiv(this.addr,t)}function xg(n,t){n.uniform4uiv(this.addr,t)}function vg(n,t,e){const i=this.cache,s=t.length,r=po(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||tu,r[o])}function Mg(n,t,e){const i=this.cache,s=t.length,r=po(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||nu,r[o])}function yg(n,t,e){const i=this.cache,s=t.length,r=po(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||iu,r[o])}function Sg(n,t,e){const i=this.cache,s=t.length,r=po(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||eu,r[o])}function Eg(n){switch(n){case 5126:return sg;case 35664:return rg;case 35665:return og;case 35666:return ag;case 35674:return cg;case 35675:return lg;case 35676:return hg;case 5124:case 35670:return ug;case 35667:case 35671:return fg;case 35668:case 35672:return dg;case 35669:case 35673:return pg;case 5125:return mg;case 36294:return gg;case 36295:return _g;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Sg}}class bg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=ig(e.type)}}class Tg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Eg(e.type)}}class wg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const jo=/(\w+)(\])?(\[|\.)?/g;function zl(n,t){n.seq.push(t),n.map[t.id]=t}function Ag(n,t,e){const i=n.name,s=i.length;for(jo.lastIndex=0;;){const r=jo.exec(i),o=jo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){zl(e,l===void 0?new bg(a,n,t):new Tg(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new wg(a),zl(e,u)),e=u}}}class Kr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ag(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Bl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Rg=37297;let Cg=0;function Pg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const kl=new qt;function Lg(n){Qt._getMatrix(kl,Qt.workingColorSpace,n);const t=`mat3( ${kl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(n)){case ho:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Hl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Pg(n.getShaderSource(t),o)}else return s}function Dg(n,t){const e=Lg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ig(n,t){let e;switch(t){case Nf:e="Linear";break;case Ff:e="Reinhard";break;case Of:e="Cineon";break;case zf:e="ACESFilmic";break;case kf:e="AgX";break;case Hf:e="Neutral";break;case Bf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Nr=new N;function Ug(){Qt.getLuminanceCoefficients(Nr);const n=Nr.x.toFixed(4),t=Nr.y.toFixed(4),e=Nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ng(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function Fg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Og(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ks(n){return n!==""}function Vl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(n){return n.replace(zg,kg)}const Bg=new Map;function kg(n,t){let e=$t[t];if(e===void 0){const i=Bg.get(t);if(i!==void 0)e=$t[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}const Hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(Hg,Vg)}function Vg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xl(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Gg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ah?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Rh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Nn&&(t="SHADOWMAP_TYPE_VSM"),t}function Wg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gs:case _s:t="ENVMAP_TYPE_CUBE";break;case lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Xg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _s:t="ENVMAP_MODE_REFRACTION";break}return t}function Yg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ch:t="ENVMAP_BLENDING_MULTIPLY";break;case If:t="ENVMAP_BLENDING_MIX";break;case Uf:t="ENVMAP_BLENDING_ADD";break}return t}function qg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Zg(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Gg(e),l=Wg(e),h=Xg(e),u=Yg(e),d=qg(e),p=Ng(e),g=Fg(r),_=s.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ks).join(`
`),f.length>0&&(f+=`
`)):(m=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),f=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?$t.tonemapping_pars_fragment:"",e.toneMapping!==ri?Ig("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Dg("linearToOutputTexel",e.outputColorSpace),Ug(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=Ka(o),o=Vl(o,e),o=Gl(o,e),a=Ka(a),a=Vl(a,e),a=Gl(a,e),o=Wl(o),a=Wl(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=y+m+o,x=y+f+a,T=Bl(s,s.VERTEX_SHADER,v),A=Bl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(L){if(n.debug.checkShaderErrors){const V=s.getProgramInfoLog(_).trim(),C=s.getShaderInfoLog(T).trim(),F=s.getShaderInfoLog(A).trim();let P=!0,z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,T,A);else{const O=Hl(s,T,"vertex"),I=Hl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+O+`
`+I)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(C===""||F==="")&&(z=!1);z&&(L.diagnostics={runnable:P,programLog:V,vertexShader:{log:C,prefix:m},fragmentShader:{log:F,prefix:f}})}s.deleteShader(T),s.deleteShader(A),U=new Kr(s,_),E=Og(s,_)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Rg)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Cg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=A,this}let $g=0;class Kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new jg(t),e.set(t,i)),i}}class jg{constructor(t){this.id=$g++,this.code=t,this.usedTimes=0}}function Jg(n,t,e,i,s,r,o){const a=new xc,c=new Kg,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,L,V,C){const F=V.fog,P=C.geometry,z=E.isMeshStandardMaterial?V.environment:null,O=(E.isMeshStandardMaterial?e:t).get(E.envMap||z),I=O&&O.mapping===lo?O.image.height:null,W=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const X=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,et=X!==void 0?X.length:0;let gt=0;P.morphAttributes.position!==void 0&&(gt=1),P.morphAttributes.normal!==void 0&&(gt=2),P.morphAttributes.color!==void 0&&(gt=3);let kt,Z,nt,ft;if(W){const se=yn[W];kt=se.vertexShader,Z=se.fragmentShader}else kt=E.vertexShader,Z=E.fragmentShader,c.update(E),nt=c.getVertexShaderID(E),ft=c.getFragmentShaderID(E);const tt=n.getRenderTarget(),Mt=n.state.buffers.depth.getReversed(),Ct=C.isInstancedMesh===!0,wt=C.isBatchedMesh===!0,Ot=!!E.map,J=!!E.matcap,st=!!O,D=!!E.aoMap,Pt=!!E.lightMap,rt=!!E.bumpMap,Tt=!!E.normalMap,ut=!!E.displacementMap,zt=!!E.emissiveMap,St=!!E.metalnessMap,R=!!E.roughnessMap,S=E.anisotropy>0,G=E.clearcoat>0,K=E.dispersion>0,it=E.iridescence>0,j=E.sheen>0,Lt=E.transmission>0,mt=S&&!!E.anisotropyMap,Et=G&&!!E.clearcoatMap,jt=G&&!!E.clearcoatNormalMap,at=G&&!!E.clearcoatRoughnessMap,At=it&&!!E.iridescenceMap,Bt=it&&!!E.iridescenceThicknessMap,Vt=j&&!!E.sheenColorMap,Rt=j&&!!E.sheenRoughnessMap,Jt=!!E.specularMap,Zt=!!E.specularColorMap,ue=!!E.specularIntensityMap,B=Lt&&!!E.transmissionMap,_t=Lt&&!!E.thicknessMap,$=!!E.gradientMap,Q=!!E.alphaMap,yt=E.alphaTest>0,xt=!!E.alphaHash,Xt=!!E.extensions;let xe=ri;E.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(xe=n.toneMapping);const Fe={shaderID:W,shaderType:E.type,shaderName:E.name,vertexShader:kt,fragmentShader:Z,defines:E.defines,customVertexShaderID:nt,customFragmentShaderID:ft,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:wt,batchingColor:wt&&C._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&C.instanceColor!==null,instancingMorph:Ct&&C.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:tt===null?n.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:bs,alphaToCoverage:!!E.alphaToCoverage,map:Ot,matcap:J,envMap:st,envMapMode:st&&O.mapping,envMapCubeUVHeight:I,aoMap:D,lightMap:Pt,bumpMap:rt,normalMap:Tt,displacementMap:d&&ut,emissiveMap:zt,normalMapObjectSpace:Tt&&E.normalMapType===Xf,normalMapTangentSpace:Tt&&E.normalMapType===Hh,metalnessMap:St,roughnessMap:R,anisotropy:S,anisotropyMap:mt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:jt,clearcoatRoughnessMap:at,dispersion:K,iridescence:it,iridescenceMap:At,iridescenceThicknessMap:Bt,sheen:j,sheenColorMap:Vt,sheenRoughnessMap:Rt,specularMap:Jt,specularColorMap:Zt,specularIntensityMap:ue,transmission:Lt,transmissionMap:B,thicknessMap:_t,gradientMap:$,opaque:E.transparent===!1&&E.blending===us&&E.alphaToCoverage===!1,alphaMap:Q,alphaTest:yt,alphaHash:xt,combine:E.combine,mapUv:Ot&&_(E.map.channel),aoMapUv:D&&_(E.aoMap.channel),lightMapUv:Pt&&_(E.lightMap.channel),bumpMapUv:rt&&_(E.bumpMap.channel),normalMapUv:Tt&&_(E.normalMap.channel),displacementMapUv:ut&&_(E.displacementMap.channel),emissiveMapUv:zt&&_(E.emissiveMap.channel),metalnessMapUv:St&&_(E.metalnessMap.channel),roughnessMapUv:R&&_(E.roughnessMap.channel),anisotropyMapUv:mt&&_(E.anisotropyMap.channel),clearcoatMapUv:Et&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:jt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(E.sheenRoughnessMap.channel),specularMapUv:Jt&&_(E.specularMap.channel),specularColorMapUv:Zt&&_(E.specularColorMap.channel),specularIntensityMapUv:ue&&_(E.specularIntensityMap.channel),transmissionMapUv:B&&_(E.transmissionMap.channel),thicknessMapUv:_t&&_(E.thicknessMap.channel),alphaMapUv:Q&&_(E.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Tt||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!P.attributes.uv&&(Ot||Q),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Mt,skinning:C.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:gt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:xe,decodeVideoTexture:Ot&&E.map.isVideoTexture===!0&&Qt.getTransfer(E.map.colorSpace)===ae,decodeVideoTextureEmissive:zt&&E.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(E.emissiveMap.colorSpace)===ae,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===fn,flipSided:E.side===Ve,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&E.extensions.multiDraw===!0||wt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Fe.vertexUv1s=l.has(1),Fe.vertexUv2s=l.has(2),Fe.vertexUv3s=l.has(3),l.clear(),Fe}function f(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)M.push(L),M.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(y(M,E),v(M,E),M.push(n.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function y(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function v(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){const M=g[E.type];let L;if(M){const V=yn[M];L=Nd.clone(V.uniforms)}else L=E.uniforms;return L}function T(E,M){let L;for(let V=0,C=h.length;V<C;V++){const F=h[V];if(F.cacheKey===M){L=F,++L.usedTimes;break}}return L===void 0&&(L=new Zg(n,M,E,r),h.push(L)),L}function A(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function w(E){c.remove(E)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:T,releaseProgram:A,releaseShaderCache:w,programs:h,dispose:U}}function Qg(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function t_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Yl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ql(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,g,_,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||t_),i.length>1&&i.sort(d||Yl),s.length>1&&s.sort(d||Yl)}function h(){for(let u=t,d=n.length;u<d;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function e_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new ql,n.set(i,[o])):s>=r.length?(o=new ql,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function n_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Kt};break;case"SpotLight":e={position:new N,direction:new N,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new N,halfWidth:new N,halfHeight:new N};break}return n[t.id]=e,e}}}function i_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let s_=0;function r_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function o_(n){const t=new n_,e=i_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new N);const s=new N,r=new he,o=new he;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,y=0,v=0,x=0,T=0,A=0,w=0;l.sort(r_);for(let E=0,M=l.length;E<M;E++){const L=l[E],V=L.color,C=L.intensity,F=L.distance,P=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=V.r*C,u+=V.g*C,d+=V.b*C;else if(L.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(L.sh.coefficients[z],C);w++}else if(L.isDirectionalLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const O=L.shadow,I=e.get(L);I.shadowIntensity=O.intensity,I.shadowBias=O.bias,I.shadowNormalBias=O.normalBias,I.shadowRadius=O.radius,I.shadowMapSize=O.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=P,i.directionalShadowMatrix[p]=L.shadow.matrix,y++}i.directional[p]=z,p++}else if(L.isSpotLight){const z=t.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(V).multiplyScalar(C),z.distance=F,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,i.spot[_]=z;const O=L.shadow;if(L.map&&(i.spotLightMap[T]=L.map,T++,O.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[_]=O.matrix,L.castShadow){const I=e.get(L);I.shadowIntensity=O.intensity,I.shadowBias=O.bias,I.shadowNormalBias=O.normalBias,I.shadowRadius=O.radius,I.shadowMapSize=O.mapSize,i.spotShadow[_]=I,i.spotShadowMap[_]=P,x++}_++}else if(L.isRectAreaLight){const z=t.get(L);z.color.copy(V).multiplyScalar(C),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=z,m++}else if(L.isPointLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity),z.distance=L.distance,z.decay=L.decay,L.castShadow){const O=L.shadow,I=e.get(L);I.shadowIntensity=O.intensity,I.shadowBias=O.bias,I.shadowNormalBias=O.normalBias,I.shadowRadius=O.radius,I.shadowMapSize=O.mapSize,I.shadowCameraNear=O.camera.near,I.shadowCameraFar=O.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=P,i.pointShadowMatrix[g]=L.shadow.matrix,v++}i.point[g]=z,g++}else if(L.isHemisphereLight){const z=t.get(L);z.skyColor.copy(L.color).multiplyScalar(C),z.groundColor.copy(L.groundColor).multiplyScalar(C),i.hemi[f]=z,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const U=i.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==y||U.numPointShadows!==v||U.numSpotShadows!==x||U.numSpotMaps!==T||U.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=x+T-A,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,U.directionalLength=p,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=y,U.numPointShadows=v,U.numSpotShadows=x,U.numSpotMaps=T,U.numLightProbes=w,i.version=s_++)}function c(l,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,y=l.length;f<y;f++){const v=l[f];if(v.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const x=i.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:i}}function Zl(n){const t=new o_(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function a_(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Zl(n),t.set(s,[a])):r>=o.length?(a=new Zl(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class c_ extends Ts{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class l_ extends Ts{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const h_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u_=`uniform sampler2D shadow_pass;
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
}`;function f_(n,t,e){let i=new Mc;const s=new ot,r=new ot,o=new le,a=new c_({depthPacking:Wf}),c=new l_,l={},h=e.maxTextureSize,u={[li]:Ve,[Ve]:li,[fn]:fn},d=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:h_,fragmentShader:u_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ne;g.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ht(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ah;let f=this.type;this.render=function(A,w,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=n.getRenderTarget(),M=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),V=n.state;V.setBlending(si),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const C=f!==Nn&&this.type===Nn,F=f===Nn&&this.type!==Nn;for(let P=0,z=A.length;P<z;P++){const O=A[P],I=O.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;s.copy(I.mapSize);const W=I.getFrameExtents();if(s.multiply(W),r.copy(I.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,I.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,I.mapSize.y=r.y)),I.map===null||C===!0||F===!0){const et=this.type!==Nn?{minFilter:mn,magFilter:mn}:{};I.map!==null&&I.map.dispose(),I.map=new Pi(s.x,s.y,et),I.map.texture.name=O.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const X=I.getViewportCount();for(let et=0;et<X;et++){const gt=I.getViewport(et);o.set(r.x*gt.x,r.y*gt.y,r.x*gt.z,r.y*gt.w),V.viewport(o),I.updateMatrices(O,et),i=I.getFrustum(),x(w,U,I.camera,O,this.type)}I.isPointLightShadow!==!0&&this.type===Nn&&y(I,U),I.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(E,M,L)};function y(A,w){const U=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Pi(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(w,null,U,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(w,null,U,p,_,null)}function v(A,w,U,E){let M=null;const L=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)M=L;else if(M=U.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=M.uuid,C=w.uuid;let F=l[V];F===void 0&&(F={},l[V]=F);let P=F[C];P===void 0&&(P=M.clone(),F[C]=P,w.addEventListener("dispose",T)),M=P}if(M.visible=w.visible,M.wireframe=w.wireframe,E===Nn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=n.properties.get(M);V.light=U}return M}function x(A,w,U,E,M){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Nn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const C=t.update(A),F=A.material;if(Array.isArray(F)){const P=C.groups;for(let z=0,O=P.length;z<O;z++){const I=P[z],W=F[I.materialIndex];if(W&&W.visible){const X=v(A,W,E,M);A.onBeforeShadow(n,A,w,U,C,X,I),n.renderBufferDirect(U,null,C,X,A,I),A.onAfterShadow(n,A,w,U,C,X,I)}}}else if(F.visible){const P=v(A,F,E,M);A.onBeforeShadow(n,A,w,U,C,P,null),n.renderBufferDirect(U,null,C,P,A,null),A.onAfterShadow(n,A,w,U,C,P,null)}}const V=A.children;for(let C=0,F=V.length;C<F;C++)x(V[C],w,U,E,M)}function T(A){A.target.removeEventListener("dispose",T);for(const U in l){const E=l[U],M=A.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const d_={[da]:pa,[ma]:xa,[ga]:va,[ms]:_a,[pa]:da,[xa]:ma,[va]:ga,[_a]:ms};function p_(n,t){function e(){let B=!1;const _t=new le;let $=null;const Q=new le(0,0,0,0);return{setMask:function(yt){$!==yt&&!B&&(n.colorMask(yt,yt,yt,yt),$=yt)},setLocked:function(yt){B=yt},setClear:function(yt,xt,Xt,xe,Fe){Fe===!0&&(yt*=xe,xt*=xe,Xt*=xe),_t.set(yt,xt,Xt,xe),Q.equals(_t)===!1&&(n.clearColor(yt,xt,Xt,xe),Q.copy(_t))},reset:function(){B=!1,$=null,Q.set(-1,0,0,0)}}}function i(){let B=!1,_t=!1,$=null,Q=null,yt=null;return{setReversed:function(xt){if(_t!==xt){const Xt=t.get("EXT_clip_control");_t?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const xe=yt;yt=null,this.setClear(xe)}_t=xt},getReversed:function(){return _t},setTest:function(xt){xt?tt(n.DEPTH_TEST):Mt(n.DEPTH_TEST)},setMask:function(xt){$!==xt&&!B&&(n.depthMask(xt),$=xt)},setFunc:function(xt){if(_t&&(xt=d_[xt]),Q!==xt){switch(xt){case da:n.depthFunc(n.NEVER);break;case pa:n.depthFunc(n.ALWAYS);break;case ma:n.depthFunc(n.LESS);break;case ms:n.depthFunc(n.LEQUAL);break;case ga:n.depthFunc(n.EQUAL);break;case _a:n.depthFunc(n.GEQUAL);break;case xa:n.depthFunc(n.GREATER);break;case va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Q=xt}},setLocked:function(xt){B=xt},setClear:function(xt){yt!==xt&&(_t&&(xt=1-xt),n.clearDepth(xt),yt=xt)},reset:function(){B=!1,$=null,Q=null,yt=null,_t=!1}}}function s(){let B=!1,_t=null,$=null,Q=null,yt=null,xt=null,Xt=null,xe=null,Fe=null;return{setTest:function(se){B||(se?tt(n.STENCIL_TEST):Mt(n.STENCIL_TEST))},setMask:function(se){_t!==se&&!B&&(n.stencilMask(se),_t=se)},setFunc:function(se,an,Rn){($!==se||Q!==an||yt!==Rn)&&(n.stencilFunc(se,an,Rn),$=se,Q=an,yt=Rn)},setOp:function(se,an,Rn){(xt!==se||Xt!==an||xe!==Rn)&&(n.stencilOp(se,an,Rn),xt=se,Xt=an,xe=Rn)},setLocked:function(se){B=se},setClear:function(se){Fe!==se&&(n.clearStencil(se),Fe=se)},reset:function(){B=!1,_t=null,$=null,Q=null,yt=null,xt=null,Xt=null,xe=null,Fe=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,y=null,v=null,x=null,T=null,A=null,w=new Kt(0,0,0),U=0,E=!1,M=null,L=null,V=null,C=null,F=null;const P=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,O=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(I)[1]),z=O>=1):I.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),z=O>=2);let W=null,X={};const et=n.getParameter(n.SCISSOR_BOX),gt=n.getParameter(n.VIEWPORT),kt=new le().fromArray(et),Z=new le().fromArray(gt);function nt(B,_t,$,Q){const yt=new Uint8Array(4),xt=n.createTexture();n.bindTexture(B,xt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xt=0;Xt<$;Xt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(_t+Xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return xt}const ft={};ft[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),ft[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ft[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(n.DEPTH_TEST),o.setFunc(ms),rt(!1),Tt(Jc),tt(n.CULL_FACE),D(si);function tt(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function Mt(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function Ct(B,_t){return u[B]!==_t?(n.bindFramebuffer(B,_t),u[B]=_t,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=_t),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function wt(B,_t){let $=p,Q=!1;if(B){$=d.get(_t),$===void 0&&($=[],d.set(_t,$));const yt=B.textures;if($.length!==yt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let xt=0,Xt=yt.length;xt<Xt;xt++)$[xt]=n.COLOR_ATTACHMENT0+xt;$.length=yt.length,Q=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,Q=!0);Q&&n.drawBuffers($)}function Ot(B){return g!==B?(n.useProgram(B),g=B,!0):!1}const J={[Ei]:n.FUNC_ADD,[gf]:n.FUNC_SUBTRACT,[_f]:n.FUNC_REVERSE_SUBTRACT};J[xf]=n.MIN,J[vf]=n.MAX;const st={[Mf]:n.ZERO,[yf]:n.ONE,[Sf]:n.SRC_COLOR,[ua]:n.SRC_ALPHA,[Rf]:n.SRC_ALPHA_SATURATE,[wf]:n.DST_COLOR,[bf]:n.DST_ALPHA,[Ef]:n.ONE_MINUS_SRC_COLOR,[fa]:n.ONE_MINUS_SRC_ALPHA,[Af]:n.ONE_MINUS_DST_COLOR,[Tf]:n.ONE_MINUS_DST_ALPHA,[Cf]:n.CONSTANT_COLOR,[Pf]:n.ONE_MINUS_CONSTANT_COLOR,[Lf]:n.CONSTANT_ALPHA,[Df]:n.ONE_MINUS_CONSTANT_ALPHA};function D(B,_t,$,Q,yt,xt,Xt,xe,Fe,se){if(B===si){_===!0&&(Mt(n.BLEND),_=!1);return}if(_===!1&&(tt(n.BLEND),_=!0),B!==mf){if(B!==m||se!==E){if((f!==Ei||x!==Ei)&&(n.blendEquation(n.FUNC_ADD),f=Ei,x=Ei),se)switch(B){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.ONE,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case el:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}y=null,v=null,T=null,A=null,w.set(0,0,0),U=0,m=B,E=se}return}yt=yt||_t,xt=xt||$,Xt=Xt||Q,(_t!==f||yt!==x)&&(n.blendEquationSeparate(J[_t],J[yt]),f=_t,x=yt),($!==y||Q!==v||xt!==T||Xt!==A)&&(n.blendFuncSeparate(st[$],st[Q],st[xt],st[Xt]),y=$,v=Q,T=xt,A=Xt),(xe.equals(w)===!1||Fe!==U)&&(n.blendColor(xe.r,xe.g,xe.b,Fe),w.copy(xe),U=Fe),m=B,E=!1}function Pt(B,_t){B.side===fn?Mt(n.CULL_FACE):tt(n.CULL_FACE);let $=B.side===Ve;_t&&($=!$),rt($),B.blending===us&&B.transparent===!1?D(si):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const Q=B.stencilWrite;a.setTest(Q),Q&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),zt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?tt(n.SAMPLE_ALPHA_TO_COVERAGE):Mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function rt(B){M!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),M=B)}function Tt(B){B!==df?(tt(n.CULL_FACE),B!==L&&(B===Jc?n.cullFace(n.BACK):B===pf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Mt(n.CULL_FACE),L=B}function ut(B){B!==V&&(z&&n.lineWidth(B),V=B)}function zt(B,_t,$){B?(tt(n.POLYGON_OFFSET_FILL),(C!==_t||F!==$)&&(n.polygonOffset(_t,$),C=_t,F=$)):Mt(n.POLYGON_OFFSET_FILL)}function St(B){B?tt(n.SCISSOR_TEST):Mt(n.SCISSOR_TEST)}function R(B){B===void 0&&(B=n.TEXTURE0+P-1),W!==B&&(n.activeTexture(B),W=B)}function S(B,_t,$){$===void 0&&(W===null?$=n.TEXTURE0+P-1:$=W);let Q=X[$];Q===void 0&&(Q={type:void 0,texture:void 0},X[$]=Q),(Q.type!==B||Q.texture!==_t)&&(W!==$&&(n.activeTexture($),W=$),n.bindTexture(B,_t||ft[B]),Q.type=B,Q.texture=_t)}function G(){const B=X[W];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function K(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function it(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function jt(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Bt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Vt(B){kt.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),kt.copy(B))}function Rt(B){Z.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),Z.copy(B))}function Jt(B,_t){let $=l.get(_t);$===void 0&&($=new WeakMap,l.set(_t,$));let Q=$.get(B);Q===void 0&&(Q=n.getUniformBlockIndex(_t,B.name),$.set(B,Q))}function Zt(B,_t){const Q=l.get(_t).get(B);c.get(_t)!==Q&&(n.uniformBlockBinding(_t,Q,B.__bindingPointIndex),c.set(_t,Q))}function ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},W=null,X={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,y=null,v=null,x=null,T=null,A=null,w=new Kt(0,0,0),U=0,E=!1,M=null,L=null,V=null,C=null,F=null,kt.set(0,0,n.canvas.width,n.canvas.height),Z.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:Mt,bindFramebuffer:Ct,drawBuffers:wt,useProgram:Ot,setBlending:D,setMaterial:Pt,setFlipSided:rt,setCullFace:Tt,setLineWidth:ut,setPolygonOffset:zt,setScissorTest:St,activeTexture:R,bindTexture:S,unbindTexture:G,compressedTexImage2D:K,compressedTexImage3D:it,texImage2D:At,texImage3D:Bt,updateUBOMapping:Jt,uniformBlockBinding:Zt,texStorage2D:jt,texStorage3D:at,texSubImage2D:j,texSubImage3D:Lt,compressedTexSubImage2D:mt,compressedTexSubImage3D:Et,scissor:Vt,viewport:Rt,reset:ue}}function $l(n,t,e,i){const s=m_(i);switch(e){case Uh:return n*t;case Fh:return n*t;case Oh:return n*t*2;case zh:return n*t/s.components*s.byteLength;case dc:return n*t/s.components*s.byteLength;case Bh:return n*t*2/s.components*s.byteLength;case pc:return n*t*2/s.components*s.byteLength;case Nh:return n*t*3/s.components*s.byteLength;case pn:return n*t*4/s.components*s.byteLength;case mc:return n*t*4/s.components*s.byteLength;case Xr:case Yr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case qr:case Zr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ba:case wa:return Math.max(n,16)*Math.max(t,8)/4;case Ea:case Ta:return Math.max(n,8)*Math.max(t,8)/2;case Aa:case Ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case La:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Da:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Na:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case za:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ka:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Va:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ga:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case $r:case Wa:case Xa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case kh:case Ya:return Math.ceil(n/4)*Math.ceil(t/4)*8;case qa:case Za:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function m_(n){switch(n){case Vn:case Lh:return{byteLength:1,components:1};case js:case Dh:case ar:return{byteLength:2,components:1};case uc:case fc:return{byteLength:2,components:4};case Ci:case hc:case On:return{byteLength:4,components:1};case Ih:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function g_(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return p?new OffscreenCanvas(R,S):to("canvas")}function _(R,S,G){let K=1;const it=St(R);if((it.width>G||it.height>G)&&(K=G/Math.max(it.width,it.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(K*it.width),Lt=Math.floor(K*it.height);u===void 0&&(u=g(j,Lt));const mt=S?g(j,Lt):u;return mt.width=j,mt.height=Lt,mt.getContext("2d").drawImage(R,0,0,j,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+j+"x"+Lt+")."),mt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){n.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(R,S,G,K,it=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=S;if(S===n.RED&&(G===n.FLOAT&&(j=n.R32F),G===n.HALF_FLOAT&&(j=n.R16F),G===n.UNSIGNED_BYTE&&(j=n.R8)),S===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.R8UI),G===n.UNSIGNED_SHORT&&(j=n.R16UI),G===n.UNSIGNED_INT&&(j=n.R32UI),G===n.BYTE&&(j=n.R8I),G===n.SHORT&&(j=n.R16I),G===n.INT&&(j=n.R32I)),S===n.RG&&(G===n.FLOAT&&(j=n.RG32F),G===n.HALF_FLOAT&&(j=n.RG16F),G===n.UNSIGNED_BYTE&&(j=n.RG8)),S===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RG8UI),G===n.UNSIGNED_SHORT&&(j=n.RG16UI),G===n.UNSIGNED_INT&&(j=n.RG32UI),G===n.BYTE&&(j=n.RG8I),G===n.SHORT&&(j=n.RG16I),G===n.INT&&(j=n.RG32I)),S===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGB8UI),G===n.UNSIGNED_SHORT&&(j=n.RGB16UI),G===n.UNSIGNED_INT&&(j=n.RGB32UI),G===n.BYTE&&(j=n.RGB8I),G===n.SHORT&&(j=n.RGB16I),G===n.INT&&(j=n.RGB32I)),S===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),G===n.UNSIGNED_INT&&(j=n.RGBA32UI),G===n.BYTE&&(j=n.RGBA8I),G===n.SHORT&&(j=n.RGBA16I),G===n.INT&&(j=n.RGBA32I)),S===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),S===n.RGBA){const Lt=it?ho:Qt.getTransfer(K);G===n.FLOAT&&(j=n.RGBA32F),G===n.HALF_FLOAT&&(j=n.RGBA16F),G===n.UNSIGNED_BYTE&&(j=Lt===ae?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(R,S){let G;return R?S===null||S===Ci||S===xs?G=n.DEPTH24_STENCIL8:S===On?G=n.DEPTH32F_STENCIL8:S===js&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ci||S===xs?G=n.DEPTH_COMPONENT24:S===On?G=n.DEPTH_COMPONENT32F:S===js&&(G=n.DEPTH_COMPONENT16),G}function T(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==mn&&R.minFilter!==Sn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function A(R){const S=R.target;S.removeEventListener("dispose",A),U(S),S.isVideoTexture&&h.delete(S)}function w(R){const S=R.target;S.removeEventListener("dispose",w),M(S)}function U(R){const S=i.get(R);if(S.__webglInit===void 0)return;const G=R.source,K=d.get(G);if(K){const it=K[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&E(R),Object.keys(K).length===0&&d.delete(G)}i.remove(R)}function E(R){const S=i.get(R);n.deleteTexture(S.__webglTexture);const G=R.source,K=d.get(G);delete K[S.__cacheKey],o.memory.textures--}function M(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let it=0;it<S.__webglFramebuffer[K].length;it++)n.deleteFramebuffer(S.__webglFramebuffer[K][it]);else n.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)n.deleteFramebuffer(S.__webglFramebuffer[K]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const G=R.textures;for(let K=0,it=G.length;K<it;K++){const j=i.get(G[K]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(G[K])}i.remove(R)}let L=0;function V(){L=0}function C(){const R=L;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function F(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function P(R,S){const G=i.get(R);if(R.isVideoTexture&&ut(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(G,R,S);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+S)}function z(R,S){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Z(G,R,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+S)}function O(R,S){const G=i.get(R);if(R.version>0&&G.__version!==R.version){Z(G,R,S);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+S)}function I(R,S){const G=i.get(R);if(R.version>0&&G.__version!==R.version){nt(G,R,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+S)}const W={[xn]:n.REPEAT,[wi]:n.CLAMP_TO_EDGE,[Sa]:n.MIRRORED_REPEAT},X={[mn]:n.NEAREST,[Vf]:n.NEAREST_MIPMAP_NEAREST,[mr]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[To]:n.LINEAR_MIPMAP_NEAREST,[Ai]:n.LINEAR_MIPMAP_LINEAR},et={[Yf]:n.NEVER,[Jf]:n.ALWAYS,[qf]:n.LESS,[Vh]:n.LEQUAL,[Zf]:n.EQUAL,[jf]:n.GEQUAL,[$f]:n.GREATER,[Kf]:n.NOTEQUAL};function gt(R,S){if(S.type===On&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Sn||S.magFilter===To||S.magFilter===mr||S.magFilter===Ai||S.minFilter===Sn||S.minFilter===To||S.minFilter===mr||S.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,W[S.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,W[S.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,W[S.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,X[S.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,X[S.minFilter]),S.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,et[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===mn||S.minFilter!==mr&&S.minFilter!==Ai||S.type===On&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function kt(R,S){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const K=S.source;let it=d.get(K);it===void 0&&(it={},d.set(K,it));const j=F(S);if(j!==R.__cacheKey){it[j]===void 0&&(it[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),it[j].usedTimes++;const Lt=it[R.__cacheKey];Lt!==void 0&&(it[R.__cacheKey].usedTimes--,Lt.usedTimes===0&&E(S)),R.__cacheKey=j,R.__webglTexture=it[j].texture}return G}function Z(R,S,G){let K=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=n.TEXTURE_3D);const it=kt(R,S),j=S.source;e.bindTexture(K,R.__webglTexture,n.TEXTURE0+G);const Lt=i.get(j);if(j.version!==Lt.__version||it===!0){e.activeTexture(n.TEXTURE0+G);const mt=Qt.getPrimaries(Qt.workingColorSpace),Et=S.colorSpace===ii?null:Qt.getPrimaries(S.colorSpace),jt=S.colorSpace===ii||mt===Et?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let at=_(S.image,!1,s.maxTextureSize);at=zt(S,at);const At=r.convert(S.format,S.colorSpace),Bt=r.convert(S.type);let Vt=v(S.internalFormat,At,Bt,S.colorSpace,S.isVideoTexture);gt(K,S);let Rt;const Jt=S.mipmaps,Zt=S.isVideoTexture!==!0,ue=Lt.__version===void 0||it===!0,B=j.dataReady,_t=T(S,at);if(S.isDepthTexture)Vt=x(S.format===vs,S.type),ue&&(Zt?e.texStorage2D(n.TEXTURE_2D,1,Vt,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,Vt,at.width,at.height,0,At,Bt,null));else if(S.isDataTexture)if(Jt.length>0){Zt&&ue&&e.texStorage2D(n.TEXTURE_2D,_t,Vt,Jt[0].width,Jt[0].height);for(let $=0,Q=Jt.length;$<Q;$++)Rt=Jt[$],Zt?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Rt.width,Rt.height,At,Bt,Rt.data):e.texImage2D(n.TEXTURE_2D,$,Vt,Rt.width,Rt.height,0,At,Bt,Rt.data);S.generateMipmaps=!1}else Zt?(ue&&e.texStorage2D(n.TEXTURE_2D,_t,Vt,at.width,at.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at.width,at.height,At,Bt,at.data)):e.texImage2D(n.TEXTURE_2D,0,Vt,at.width,at.height,0,At,Bt,at.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Zt&&ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Vt,Jt[0].width,Jt[0].height,at.depth);for(let $=0,Q=Jt.length;$<Q;$++)if(Rt=Jt[$],S.format!==pn)if(At!==null)if(Zt){if(B)if(S.layerUpdates.size>0){const yt=$l(Rt.width,Rt.height,S.format,S.type);for(const xt of S.layerUpdates){const Xt=Rt.data.subarray(xt*yt/Rt.data.BYTES_PER_ELEMENT,(xt+1)*yt/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,xt,Rt.width,Rt.height,1,At,Xt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Rt.width,Rt.height,at.depth,At,Rt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Vt,Rt.width,Rt.height,at.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Zt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Rt.width,Rt.height,at.depth,At,Bt,Rt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,Vt,Rt.width,Rt.height,at.depth,0,At,Bt,Rt.data)}else{Zt&&ue&&e.texStorage2D(n.TEXTURE_2D,_t,Vt,Jt[0].width,Jt[0].height);for(let $=0,Q=Jt.length;$<Q;$++)Rt=Jt[$],S.format!==pn?At!==null?Zt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,Rt.width,Rt.height,At,Rt.data):e.compressedTexImage2D(n.TEXTURE_2D,$,Vt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Zt?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Rt.width,Rt.height,At,Bt,Rt.data):e.texImage2D(n.TEXTURE_2D,$,Vt,Rt.width,Rt.height,0,At,Bt,Rt.data)}else if(S.isDataArrayTexture)if(Zt){if(ue&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Vt,at.width,at.height,at.depth),B)if(S.layerUpdates.size>0){const $=$l(at.width,at.height,S.format,S.type);for(const Q of S.layerUpdates){const yt=at.data.subarray(Q*$/at.data.BYTES_PER_ELEMENT,(Q+1)*$/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,at.width,at.height,1,At,Bt,yt)}S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,At,Bt,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Vt,at.width,at.height,at.depth,0,At,Bt,at.data);else if(S.isData3DTexture)Zt?(ue&&e.texStorage3D(n.TEXTURE_3D,_t,Vt,at.width,at.height,at.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,At,Bt,at.data)):e.texImage3D(n.TEXTURE_3D,0,Vt,at.width,at.height,at.depth,0,At,Bt,at.data);else if(S.isFramebufferTexture){if(ue)if(Zt)e.texStorage2D(n.TEXTURE_2D,_t,Vt,at.width,at.height);else{let $=at.width,Q=at.height;for(let yt=0;yt<_t;yt++)e.texImage2D(n.TEXTURE_2D,yt,Vt,$,Q,0,At,Bt,null),$>>=1,Q>>=1}}else if(Jt.length>0){if(Zt&&ue){const $=St(Jt[0]);e.texStorage2D(n.TEXTURE_2D,_t,Vt,$.width,$.height)}for(let $=0,Q=Jt.length;$<Q;$++)Rt=Jt[$],Zt?B&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,At,Bt,Rt):e.texImage2D(n.TEXTURE_2D,$,Vt,At,Bt,Rt);S.generateMipmaps=!1}else if(Zt){if(ue){const $=St(at);e.texStorage2D(n.TEXTURE_2D,_t,Vt,$.width,$.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,At,Bt,at)}else e.texImage2D(n.TEXTURE_2D,0,Vt,At,Bt,at);m(S)&&f(K),Lt.__version=j.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function nt(R,S,G){if(S.image.length!==6)return;const K=kt(R,S),it=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+G);const j=i.get(it);if(it.version!==j.__version||K===!0){e.activeTexture(n.TEXTURE0+G);const Lt=Qt.getPrimaries(Qt.workingColorSpace),mt=S.colorSpace===ii?null:Qt.getPrimaries(S.colorSpace),Et=S.colorSpace===ii||Lt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const jt=S.isCompressedTexture||S.image[0].isCompressedTexture,at=S.image[0]&&S.image[0].isDataTexture,At=[];for(let Q=0;Q<6;Q++)!jt&&!at?At[Q]=_(S.image[Q],!0,s.maxCubemapSize):At[Q]=at?S.image[Q].image:S.image[Q],At[Q]=zt(S,At[Q]);const Bt=At[0],Vt=r.convert(S.format,S.colorSpace),Rt=r.convert(S.type),Jt=v(S.internalFormat,Vt,Rt,S.colorSpace),Zt=S.isVideoTexture!==!0,ue=j.__version===void 0||K===!0,B=it.dataReady;let _t=T(S,Bt);gt(n.TEXTURE_CUBE_MAP,S);let $;if(jt){Zt&&ue&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Jt,Bt.width,Bt.height);for(let Q=0;Q<6;Q++){$=At[Q].mipmaps;for(let yt=0;yt<$.length;yt++){const xt=$[yt];S.format!==pn?Vt!==null?Zt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,0,0,xt.width,xt.height,Vt,xt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,Jt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,0,0,xt.width,xt.height,Vt,Rt,xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,Jt,xt.width,xt.height,0,Vt,Rt,xt.data)}}}else{if($=S.mipmaps,Zt&&ue){$.length>0&&_t++;const Q=St(At[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Jt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(at){Zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,At[Q].width,At[Q].height,Vt,Rt,At[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Jt,At[Q].width,At[Q].height,0,Vt,Rt,At[Q].data);for(let yt=0;yt<$.length;yt++){const Xt=$[yt].image[Q].image;Zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,0,0,Xt.width,Xt.height,Vt,Rt,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,Jt,Xt.width,Xt.height,0,Vt,Rt,Xt.data)}}else{Zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Vt,Rt,At[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Jt,Vt,Rt,At[Q]);for(let yt=0;yt<$.length;yt++){const xt=$[yt];Zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,0,0,Vt,Rt,xt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,Jt,Vt,Rt,xt.image[Q])}}}m(S)&&f(n.TEXTURE_CUBE_MAP),j.__version=it.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ft(R,S,G,K,it,j){const Lt=r.convert(G.format,G.colorSpace),mt=r.convert(G.type),Et=v(G.internalFormat,Lt,mt,G.colorSpace),jt=i.get(S),at=i.get(G);if(at.__renderTarget=S,!jt.__hasExternalTextures){const At=Math.max(1,S.width>>j),Bt=Math.max(1,S.height>>j);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,j,Et,At,Bt,S.depth,0,Lt,mt,null):e.texImage2D(it,j,Et,At,Bt,0,Lt,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Tt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,it,at.__webglTexture,0,rt(S)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,it,at.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(R,S,G){if(n.bindRenderbuffer(n.RENDERBUFFER,R),S.depthBuffer){const K=S.depthTexture,it=K&&K.isDepthTexture?K.type:null,j=x(S.stencilBuffer,it),Lt=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=rt(S);Tt(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,j,S.width,S.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,j,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,j,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Lt,n.RENDERBUFFER,R)}else{const K=S.textures;for(let it=0;it<K.length;it++){const j=K[it],Lt=r.convert(j.format,j.colorSpace),mt=r.convert(j.type),Et=v(j.internalFormat,Lt,mt,j.colorSpace),jt=rt(S);G&&Tt(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,jt,Et,S.width,S.height):Tt(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,jt,Et,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Et,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),P(S.depthTexture,0);const it=K.__webglTexture,j=rt(S);if(S.depthTexture.format===fs)Tt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(S.depthTexture.format===vs)Tt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Ct(R){const S=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",it)};K.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=K}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Mt(S.__webglFramebuffer,R)}else if(G){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=n.createRenderbuffer(),tt(S.__webglDepthbuffer[K],R,!1);else{const it=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),tt(S.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,it)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(R,S,G){const K=i.get(R);S!==void 0&&ft(K.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Ct(R)}function Ot(R){const S=R.texture,G=i.get(R),K=i.get(S);R.addEventListener("dispose",w);const it=R.textures,j=R.isWebGLCubeRenderTarget===!0,Lt=it.length>1;if(Lt||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=S.version,o.memory.textures++),j){G.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer[mt]=[];for(let Et=0;Et<S.mipmaps.length;Et++)G.__webglFramebuffer[mt][Et]=n.createFramebuffer()}else G.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){G.__webglFramebuffer=[];for(let mt=0;mt<S.mipmaps.length;mt++)G.__webglFramebuffer[mt]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(Lt)for(let mt=0,Et=it.length;mt<Et;mt++){const jt=i.get(it[mt]);jt.__webglTexture===void 0&&(jt.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Tt(R)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let mt=0;mt<it.length;mt++){const Et=it[mt];G.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[mt]);const jt=r.convert(Et.format,Et.colorSpace),at=r.convert(Et.type),At=v(Et.internalFormat,jt,at,Et.colorSpace,R.isXRRenderTarget===!0),Bt=rt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt,At,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,G.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),tt(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),gt(n.TEXTURE_CUBE_MAP,S);for(let mt=0;mt<6;mt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)ft(G.__webglFramebuffer[mt][Et],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Et);else ft(G.__webglFramebuffer[mt],R,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(S)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let mt=0,Et=it.length;mt<Et;mt++){const jt=it[mt],at=i.get(jt);e.bindTexture(n.TEXTURE_2D,at.__webglTexture),gt(n.TEXTURE_2D,jt),ft(G.__webglFramebuffer,R,jt,n.COLOR_ATTACHMENT0+mt,n.TEXTURE_2D,0),m(jt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(mt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,K.__webglTexture),gt(mt,S),S.mipmaps&&S.mipmaps.length>0)for(let Et=0;Et<S.mipmaps.length;Et++)ft(G.__webglFramebuffer[Et],R,S,n.COLOR_ATTACHMENT0,mt,Et);else ft(G.__webglFramebuffer,R,S,n.COLOR_ATTACHMENT0,mt,0);m(S)&&f(mt),e.unbindTexture()}R.depthBuffer&&Ct(R)}function J(R){const S=R.textures;for(let G=0,K=S.length;G<K;G++){const it=S[G];if(m(it)){const j=y(R),Lt=i.get(it).__webglTexture;e.bindTexture(j,Lt),f(j),e.unbindTexture()}}}const st=[],D=[];function Pt(R){if(R.samples>0){if(Tt(R)===!1){const S=R.textures,G=R.width,K=R.height;let it=n.COLOR_BUFFER_BIT;const j=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Lt=i.get(R),mt=S.length>1;if(mt)for(let Et=0;Et<S.length;Et++)e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Et=0;Et<S.length;Et++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Lt.__webglColorRenderbuffer[Et]);const jt=i.get(S[Et]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,jt,0)}n.blitFramebuffer(0,0,G,K,0,0,G,K,it,n.NEAREST),c===!0&&(st.length=0,D.length=0,st.push(n.COLOR_ATTACHMENT0+Et),R.depthBuffer&&R.resolveDepthBuffer===!1&&(st.push(j),D.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let Et=0;Et<S.length;Et++){e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.RENDERBUFFER,Lt.__webglColorRenderbuffer[Et]);const jt=i.get(S[Et]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Lt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Et,n.TEXTURE_2D,jt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const S=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function rt(R){return Math.min(s.maxSamples,R.samples)}function Tt(R){const S=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ut(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function zt(R,S){const G=R.colorSpace,K=R.format,it=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==bs&&G!==ii&&(Qt.getTransfer(G)===ae?(K!==pn||it!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),S}function St(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=C,this.resetTextureUnits=V,this.setTexture2D=P,this.setTexture2DArray=z,this.setTexture3D=O,this.setTextureCube=I,this.rebindTextures=wt,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=Tt}function __(n,t){function e(i,s=ii){let r;const o=Qt.getTransfer(s);if(i===Vn)return n.UNSIGNED_BYTE;if(i===uc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===fc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ih)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Lh)return n.BYTE;if(i===Dh)return n.SHORT;if(i===js)return n.UNSIGNED_SHORT;if(i===hc)return n.INT;if(i===Ci)return n.UNSIGNED_INT;if(i===On)return n.FLOAT;if(i===ar)return n.HALF_FLOAT;if(i===Uh)return n.ALPHA;if(i===Nh)return n.RGB;if(i===pn)return n.RGBA;if(i===Fh)return n.LUMINANCE;if(i===Oh)return n.LUMINANCE_ALPHA;if(i===fs)return n.DEPTH_COMPONENT;if(i===vs)return n.DEPTH_STENCIL;if(i===zh)return n.RED;if(i===dc)return n.RED_INTEGER;if(i===Bh)return n.RG;if(i===pc)return n.RG_INTEGER;if(i===mc)return n.RGBA_INTEGER;if(i===Xr||i===Yr||i===qr||i===Zr)if(o===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ea||i===ba||i===Ta||i===wa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Aa||i===Ra||i===Ca)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Aa||i===Ra)return o===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ca)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Fa||i===Oa||i===za||i===Ba||i===ka||i===Ha||i===Va||i===Ga)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Pa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===La)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Da)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ia)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ua)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Na)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Oa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===za)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ba)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ka)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ha)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Va)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ga)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===$r||i===Wa||i===Xa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===$r)return o===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Xa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===kh||i===Ya||i===qa||i===Za)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===$r)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class x_ extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ve extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const v_={type:"move"};class Jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(v_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ve;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y_=`
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

}`;class S_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ge,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new hi({vertexShader:M_,fragmentShader:y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ht(new lr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E_ extends Ui{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=new S_,m=e.getContextAttributes();let f=null,y=null;const v=[],x=[],T=new ot;let A=null;const w=new tn;w.viewport=new le;const U=new tn;U.viewport=new le;const E=[w,U],M=new x_;let L=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let nt=v[Z];return nt===void 0&&(nt=new Jo,v[Z]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Z){let nt=v[Z];return nt===void 0&&(nt=new Jo,v[Z]=nt),nt.getGripSpace()},this.getHand=function(Z){let nt=v[Z];return nt===void 0&&(nt=new Jo,v[Z]=nt),nt.getHandSpace()};function C(Z){const nt=x.indexOf(Z.inputSource);if(nt===-1)return;const ft=v[nt];ft!==void 0&&(ft.update(Z.inputSource,Z.frame,l||o),ft.dispatchEvent({type:Z.type,data:Z.inputSource}))}function F(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",P);for(let Z=0;Z<v.length;Z++){const nt=x[Z];nt!==null&&(x[Z]=null,v[Z].disconnect(nt))}L=null,V=null,_.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,y=null,kt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",F),s.addEventListener("inputsourceschange",P),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Pi(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,ft=null,tt=null;m.depth&&(tt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?vs:fs,ft=m.stencil?xs:Ci);const Mt={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Mt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Pi(d.textureWidth,d.textureHeight,{format:pn,type:Vn,depthTexture:new Qh(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),kt.setContext(s),kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function P(Z){for(let nt=0;nt<Z.removed.length;nt++){const ft=Z.removed[nt],tt=x.indexOf(ft);tt>=0&&(x[tt]=null,v[tt].disconnect(ft))}for(let nt=0;nt<Z.added.length;nt++){const ft=Z.added[nt];let tt=x.indexOf(ft);if(tt===-1){for(let Ct=0;Ct<v.length;Ct++)if(Ct>=x.length){x.push(ft),tt=Ct;break}else if(x[Ct]===null){x[Ct]=ft,tt=Ct;break}if(tt===-1)break}const Mt=v[tt];Mt&&Mt.connect(ft)}}const z=new N,O=new N;function I(Z,nt,ft){z.setFromMatrixPosition(nt.matrixWorld),O.setFromMatrixPosition(ft.matrixWorld);const tt=z.distanceTo(O),Mt=nt.projectionMatrix.elements,Ct=ft.projectionMatrix.elements,wt=Mt[14]/(Mt[10]-1),Ot=Mt[14]/(Mt[10]+1),J=(Mt[9]+1)/Mt[5],st=(Mt[9]-1)/Mt[5],D=(Mt[8]-1)/Mt[0],Pt=(Ct[8]+1)/Ct[0],rt=wt*D,Tt=wt*Pt,ut=tt/(-D+Pt),zt=ut*-D;if(nt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(zt),Z.translateZ(ut),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Mt[10]===-1)Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const St=wt+ut,R=Ot+ut,S=rt-zt,G=Tt+(tt-zt),K=J*Ot/R*St,it=st*Ot/R*St;Z.projectionMatrix.makePerspective(S,G,K,it,St,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function W(Z,nt){nt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(nt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let nt=Z.near,ft=Z.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(ft=_.depthFar)),M.near=U.near=w.near=nt,M.far=U.far=w.far=ft,(L!==M.near||V!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,V=M.far),w.layers.mask=Z.layers.mask|2,U.layers.mask=Z.layers.mask|4,M.layers.mask=w.layers.mask|U.layers.mask;const tt=Z.parent,Mt=M.cameras;W(M,tt);for(let Ct=0;Ct<Mt.length;Ct++)W(Mt[Ct],tt);Mt.length===2?I(M,w,U):M.projectionMatrix.copy(w.projectionMatrix),X(Z,M,tt)};function X(Z,nt,ft){ft===null?Z.matrix.copy(nt.matrixWorld):(Z.matrix.copy(ft.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(nt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(nt.projectionMatrix),Z.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Js*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let et=null;function gt(Z,nt){if(h=nt.getViewerPose(l||o),g=nt,h!==null){const ft=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let tt=!1;ft.length!==M.cameras.length&&(M.cameras.length=0,tt=!0);for(let Ct=0;Ct<ft.length;Ct++){const wt=ft[Ct];let Ot=null;if(p!==null)Ot=p.getViewport(wt);else{const st=u.getViewSubImage(d,wt);Ot=st.viewport,Ct===0&&(t.setRenderTargetTextures(y,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(y))}let J=E[Ct];J===void 0&&(J=new tn,J.layers.enable(Ct),J.viewport=new le,E[Ct]=J),J.matrix.fromArray(wt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(wt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),Ct===0&&(M.matrix.copy(J.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),tt===!0&&M.cameras.push(J)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")){const Ct=u.getDepthInformation(ft[0]);Ct&&Ct.isValid&&Ct.texture&&_.init(t,Ct,s.renderState)}}for(let ft=0;ft<v.length;ft++){const tt=x[ft],Mt=v[ft];tt!==null&&Mt!==void 0&&Mt.update(tt,nt,l||o)}et&&et(Z,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}const kt=new Jh;kt.setAnimationLoop(gt),this.setAnimationLoop=function(Z){et=Z},this.dispose=function(){}}}const xi=new wn,b_=new he;function T_(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,$h(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,v,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,y,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ve&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ve&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,xi.copy(x),xi.x*=-1,xi.y*=-1,xi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(xi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=v*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ve&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function w_(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const x=v.program;i.uniformBlockBinding(y,x)}function l(y,v){let x=s[y.id];x===void 0&&(g(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",m));const T=v.program;i.updateUBOMapping(y,T);const A=t.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function h(y){const v=u();y.__bindingPointIndex=v;const x=n.createBuffer(),T=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,T,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=s[y.id],x=y.uniforms,T=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,w=x.length;A<w;A++){const U=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,M=U.length;E<M;E++){const L=U[E];if(p(L,A,E,T)===!0){const V=L.__offset,C=Array.isArray(L.value)?L.value:[L.value];let F=0;for(let P=0;P<C.length;P++){const z=C[P],O=_(z);typeof z=="number"||typeof z=="boolean"?(L.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,V+F,L.__data)):z.isMatrix3?(L.__data[0]=z.elements[0],L.__data[1]=z.elements[1],L.__data[2]=z.elements[2],L.__data[3]=0,L.__data[4]=z.elements[3],L.__data[5]=z.elements[4],L.__data[6]=z.elements[5],L.__data[7]=0,L.__data[8]=z.elements[6],L.__data[9]=z.elements[7],L.__data[10]=z.elements[8],L.__data[11]=0):(z.toArray(L.__data,F),F+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,v,x,T){const A=y.value,w=v+"_"+x;if(T[w]===void 0)return typeof A=="number"||typeof A=="boolean"?T[w]=A:T[w]=A.clone(),!0;{const U=T[w];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return T[w]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function g(y){const v=y.uniforms;let x=0;const T=16;for(let w=0,U=v.length;w<U;w++){const E=Array.isArray(v[w])?v[w]:[v[w]];for(let M=0,L=E.length;M<L;M++){const V=E[M],C=Array.isArray(V.value)?V.value:[V.value];for(let F=0,P=C.length;F<P;F++){const z=C[F],O=_(z),I=x%T,W=I%O.boundary,X=I+W;x+=W,X!==0&&T-X<O.storage&&(x+=T-X),V.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=O.storage}}}const A=x%T;return A>0&&(x+=T-A),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class A_{constructor(t={}){const{canvas:e=md(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=be,this.toneMapping=ri,this.toneMappingExposure=1;const x=this;let T=!1,A=0,w=0,U=null,E=-1,M=null;const L=new le,V=new le;let C=null;const F=new Kt(0);let P=0,z=e.width,O=e.height,I=1,W=null,X=null;const et=new le(0,0,z,O),gt=new le(0,0,z,O);let kt=!1;const Z=new Mc;let nt=!1,ft=!1;const tt=new he,Mt=new he,Ct=new N,wt=new le,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function st(){return U===null?I:1}let D=i;function Pt(b,k){return e.getContext(b,k)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${lc}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const k="webgl2";if(D=Pt(k,b),D===null)throw Pt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let rt,Tt,ut,zt,St,R,S,G,K,it,j,Lt,mt,Et,jt,at,At,Bt,Vt,Rt,Jt,Zt,ue,B;function _t(){rt=new D0(D),rt.init(),Zt=new __(D,rt),Tt=new w0(D,rt,t,Zt),ut=new p_(D,rt),Tt.reverseDepthBuffer&&d&&ut.buffers.depth.setReversed(!0),zt=new N0(D),St=new Qg,R=new g_(D,rt,ut,St,Tt,Zt,zt),S=new R0(x),G=new L0(x),K=new Vd(D),ue=new b0(D,K),it=new I0(D,K,zt,ue),j=new O0(D,it,K,zt),Vt=new F0(D,Tt,R),at=new A0(St),Lt=new Jg(x,S,G,rt,Tt,ue,at),mt=new T_(x,St),Et=new e_,jt=new a_(rt),Bt=new E0(x,S,G,ut,j,p,c),At=new f_(x,j,Tt),B=new w_(D,zt,Tt,ut),Rt=new T0(D,rt,zt),Jt=new U0(D,rt,zt),zt.programs=Lt.programs,x.capabilities=Tt,x.extensions=rt,x.properties=St,x.renderLists=Et,x.shadowMap=At,x.state=ut,x.info=zt}_t();const $=new E_(x,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=rt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=rt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(b){b!==void 0&&(I=b,this.setSize(z,O,!1))},this.getSize=function(b){return b.set(z,O)},this.setSize=function(b,k,Y=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,O=k,e.width=Math.floor(b*I),e.height=Math.floor(k*I),Y===!0&&(e.style.width=b+"px",e.style.height=k+"px"),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(z*I,O*I).floor()},this.setDrawingBufferSize=function(b,k,Y){z=b,O=k,I=Y,e.width=Math.floor(b*Y),e.height=Math.floor(k*Y),this.setViewport(0,0,b,k)},this.getCurrentViewport=function(b){return b.copy(L)},this.getViewport=function(b){return b.copy(et)},this.setViewport=function(b,k,Y,q){b.isVector4?et.set(b.x,b.y,b.z,b.w):et.set(b,k,Y,q),ut.viewport(L.copy(et).multiplyScalar(I).round())},this.getScissor=function(b){return b.copy(gt)},this.setScissor=function(b,k,Y,q){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,k,Y,q),ut.scissor(V.copy(gt).multiplyScalar(I).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(b){ut.setScissorTest(kt=b)},this.setOpaqueSort=function(b){W=b},this.setTransparentSort=function(b){X=b},this.getClearColor=function(b){return b.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(b=!0,k=!0,Y=!0){let q=0;if(b){let H=!1;if(U!==null){const ct=U.texture.format;H=ct===mc||ct===pc||ct===dc}if(H){const ct=U.texture.type,vt=ct===Vn||ct===Ci||ct===js||ct===xs||ct===uc||ct===fc,Dt=Bt.getClearColor(),It=Bt.getClearAlpha(),Gt=Dt.r,Yt=Dt.g,Ut=Dt.b;vt?(g[0]=Gt,g[1]=Yt,g[2]=Ut,g[3]=It,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Gt,_[1]=Yt,_[2]=Ut,_[3]=It,D.clearBufferiv(D.COLOR,0,_))}else q|=D.COLOR_BUFFER_BIT}k&&(q|=D.DEPTH_BUFFER_BIT),Y&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Et.dispose(),jt.dispose(),St.dispose(),S.dispose(),G.dispose(),j.dispose(),ue.dispose(),B.dispose(),Lt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Wc),$.removeEventListener("sessionend",Xc),fi.stop()};function Q(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const b=zt.autoReset,k=At.enabled,Y=At.autoUpdate,q=At.needsUpdate,H=At.type;_t(),zt.autoReset=b,At.enabled=k,At.autoUpdate=Y,At.needsUpdate=q,At.type=H}function xt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Xt(b){const k=b.target;k.removeEventListener("dispose",Xt),xe(k)}function xe(b){Fe(b),St.remove(b)}function Fe(b){const k=St.get(b).programs;k!==void 0&&(k.forEach(function(Y){Lt.releaseProgram(Y)}),b.isShaderMaterial&&Lt.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,Y,q,H,ct){k===null&&(k=Ot);const vt=H.isMesh&&H.matrixWorld.determinant()<0,Dt=hf(b,k,Y,q,H);ut.setMaterial(q,vt);let It=Y.index,Gt=1;if(q.wireframe===!0){if(It=it.getWireframeAttribute(Y),It===void 0)return;Gt=2}const Yt=Y.drawRange,Ut=Y.attributes.position;let te=Yt.start*Gt,fe=(Yt.start+Yt.count)*Gt;ct!==null&&(te=Math.max(te,ct.start*Gt),fe=Math.min(fe,(ct.start+ct.count)*Gt)),It!==null?(te=Math.max(te,0),fe=Math.min(fe,It.count)):Ut!=null&&(te=Math.max(te,0),fe=Math.min(fe,Ut.count));const de=fe-te;if(de<0||de===1/0)return;ue.setup(H,q,Dt,Y,It);let Ye,ee=Rt;if(It!==null&&(Ye=K.get(It),ee=Jt,ee.setIndex(Ye)),H.isMesh)q.wireframe===!0?(ut.setLineWidth(q.wireframeLinewidth*st()),ee.setMode(D.LINES)):ee.setMode(D.TRIANGLES);else if(H.isLine){let Ft=q.linewidth;Ft===void 0&&(Ft=1),ut.setLineWidth(Ft*st()),H.isLineSegments?ee.setMode(D.LINES):H.isLineLoop?ee.setMode(D.LINE_LOOP):ee.setMode(D.LINE_STRIP)}else H.isPoints?ee.setMode(D.POINTS):H.isSprite&&ee.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ee.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(rt.get("WEBGL_multi_draw"))ee.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ft=H._multiDrawStarts,Cn=H._multiDrawCounts,ne=H._multiDrawCount,cn=It?K.get(It).bytesPerElement:1,Bi=St.get(q).currentProgram.getUniforms();for(let $e=0;$e<ne;$e++)Bi.setValue(D,"_gl_DrawID",$e),ee.render(Ft[$e]/cn,Cn[$e])}else if(H.isInstancedMesh)ee.renderInstances(te,de,H.count);else if(Y.isInstancedBufferGeometry){const Ft=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Cn=Math.min(Y.instanceCount,Ft);ee.renderInstances(te,de,Cn)}else ee.render(te,de)};function se(b,k,Y){b.transparent===!0&&b.side===fn&&b.forceSinglePass===!1?(b.side=Ve,b.needsUpdate=!0,pr(b,k,Y),b.side=li,b.needsUpdate=!0,pr(b,k,Y),b.side=fn):pr(b,k,Y)}this.compile=function(b,k,Y=null){Y===null&&(Y=b),f=jt.get(Y),f.init(k),v.push(f),Y.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),b!==Y&&b.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();const q=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ct=H.material;if(ct)if(Array.isArray(ct))for(let vt=0;vt<ct.length;vt++){const Dt=ct[vt];se(Dt,Y,H),q.add(Dt)}else se(ct,Y,H),q.add(ct)}),v.pop(),f=null,q},this.compileAsync=function(b,k,Y=null){const q=this.compile(b,k,Y);return new Promise(H=>{function ct(){if(q.forEach(function(vt){St.get(vt).currentProgram.isReady()&&q.delete(vt)}),q.size===0){H(b);return}setTimeout(ct,10)}rt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let an=null;function Rn(b){an&&an(b)}function Wc(){fi.stop()}function Xc(){fi.start()}const fi=new Jh;fi.setAnimationLoop(Rn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(b){an=b,$.setAnimationLoop(b),b===null?fi.stop():fi.start()},$.addEventListener("sessionstart",Wc),$.addEventListener("sessionend",Xc),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,k,U),f=jt.get(b,v.length),f.init(k),v.push(f),Mt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Z.setFromProjectionMatrix(Mt),ft=this.localClippingEnabled,nt=at.init(this.clippingPlanes,ft),m=Et.get(b,y.length),m.init(),y.push(m),$.enabled===!0&&$.isPresenting===!0){const ct=x.xr.getDepthSensingMesh();ct!==null&&bo(ct,k,-1/0,x.sortObjects)}bo(b,k,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(W,X),J=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,J&&Bt.addToRenderList(m,b),this.info.render.frame++,nt===!0&&at.beginShadows();const Y=f.state.shadowsArray;At.render(Y,b,k),nt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,H=m.transmissive;if(f.setupLights(),k.isArrayCamera){const ct=k.cameras;if(H.length>0)for(let vt=0,Dt=ct.length;vt<Dt;vt++){const It=ct[vt];qc(q,H,b,It)}J&&Bt.render(b);for(let vt=0,Dt=ct.length;vt<Dt;vt++){const It=ct[vt];Yc(m,b,It,It.viewport)}}else H.length>0&&qc(q,H,b,k),J&&Bt.render(b),Yc(m,b,k);U!==null&&(R.updateMultisampleRenderTarget(U),R.updateRenderTargetMipmap(U)),b.isScene===!0&&b.onAfterRender(x,b,k),ue.resetDefaultState(),E=-1,M=null,v.pop(),v.length>0?(f=v[v.length-1],nt===!0&&at.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function bo(b,k,Y,q){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Z.intersectsSprite(b)){q&&wt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Mt);const vt=j.update(b),Dt=b.material;Dt.visible&&m.push(b,vt,Dt,Y,wt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Z.intersectsObject(b))){const vt=j.update(b),Dt=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),wt.copy(b.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),wt.copy(vt.boundingSphere.center)),wt.applyMatrix4(b.matrixWorld).applyMatrix4(Mt)),Array.isArray(Dt)){const It=vt.groups;for(let Gt=0,Yt=It.length;Gt<Yt;Gt++){const Ut=It[Gt],te=Dt[Ut.materialIndex];te&&te.visible&&m.push(b,vt,te,Y,wt.z,Ut)}}else Dt.visible&&m.push(b,vt,Dt,Y,wt.z,null)}}const ct=b.children;for(let vt=0,Dt=ct.length;vt<Dt;vt++)bo(ct[vt],k,Y,q)}function Yc(b,k,Y,q){const H=b.opaque,ct=b.transmissive,vt=b.transparent;f.setupLightsView(Y),nt===!0&&at.setGlobalState(x.clippingPlanes,Y),q&&ut.viewport(L.copy(q)),H.length>0&&dr(H,k,Y),ct.length>0&&dr(ct,k,Y),vt.length>0&&dr(vt,k,Y),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function qc(b,k,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new Pi(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float")?ar:Vn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const ct=f.state.transmissionRenderTarget[q.id],vt=q.viewport||L;ct.setSize(vt.z,vt.w);const Dt=x.getRenderTarget();x.setRenderTarget(ct),x.getClearColor(F),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear(),J&&Bt.render(Y);const It=x.toneMapping;x.toneMapping=ri;const Gt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),nt===!0&&at.setGlobalState(x.clippingPlanes,q),dr(b,Y,q),R.updateMultisampleRenderTarget(ct),R.updateRenderTargetMipmap(ct),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Ut=0,te=k.length;Ut<te;Ut++){const fe=k[Ut],de=fe.object,Ye=fe.geometry,ee=fe.material,Ft=fe.group;if(ee.side===fn&&de.layers.test(q.layers)){const Cn=ee.side;ee.side=Ve,ee.needsUpdate=!0,Zc(de,Y,q,Ye,ee,Ft),ee.side=Cn,ee.needsUpdate=!0,Yt=!0}}Yt===!0&&(R.updateMultisampleRenderTarget(ct),R.updateRenderTargetMipmap(ct))}x.setRenderTarget(Dt),x.setClearColor(F,P),Gt!==void 0&&(q.viewport=Gt),x.toneMapping=It}function dr(b,k,Y){const q=k.isScene===!0?k.overrideMaterial:null;for(let H=0,ct=b.length;H<ct;H++){const vt=b[H],Dt=vt.object,It=vt.geometry,Gt=q===null?vt.material:q,Yt=vt.group;Dt.layers.test(Y.layers)&&Zc(Dt,k,Y,It,Gt,Yt)}}function Zc(b,k,Y,q,H,ct){b.onBeforeRender(x,k,Y,q,H,ct),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(x,k,Y,q,b,ct),H.transparent===!0&&H.side===fn&&H.forceSinglePass===!1?(H.side=Ve,H.needsUpdate=!0,x.renderBufferDirect(Y,k,q,H,b,ct),H.side=li,H.needsUpdate=!0,x.renderBufferDirect(Y,k,q,H,b,ct),H.side=fn):x.renderBufferDirect(Y,k,q,H,b,ct),b.onAfterRender(x,k,Y,q,H,ct)}function pr(b,k,Y){k.isScene!==!0&&(k=Ot);const q=St.get(b),H=f.state.lights,ct=f.state.shadowsArray,vt=H.state.version,Dt=Lt.getParameters(b,H.state,ct,k,Y),It=Lt.getProgramCacheKey(Dt);let Gt=q.programs;q.environment=b.isMeshStandardMaterial?k.environment:null,q.fog=k.fog,q.envMap=(b.isMeshStandardMaterial?G:S).get(b.envMap||q.environment),q.envMapRotation=q.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,Gt===void 0&&(b.addEventListener("dispose",Xt),Gt=new Map,q.programs=Gt);let Yt=Gt.get(It);if(Yt!==void 0){if(q.currentProgram===Yt&&q.lightsStateVersion===vt)return Kc(b,Dt),Yt}else Dt.uniforms=Lt.getUniforms(b),b.onBeforeCompile(Dt,x),Yt=Lt.acquireProgram(Dt,It),Gt.set(It,Yt),q.uniforms=Dt.uniforms;const Ut=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ut.clippingPlanes=at.uniform),Kc(b,Dt),q.needsLights=ff(b),q.lightsStateVersion=vt,q.needsLights&&(Ut.ambientLightColor.value=H.state.ambient,Ut.lightProbe.value=H.state.probe,Ut.directionalLights.value=H.state.directional,Ut.directionalLightShadows.value=H.state.directionalShadow,Ut.spotLights.value=H.state.spot,Ut.spotLightShadows.value=H.state.spotShadow,Ut.rectAreaLights.value=H.state.rectArea,Ut.ltc_1.value=H.state.rectAreaLTC1,Ut.ltc_2.value=H.state.rectAreaLTC2,Ut.pointLights.value=H.state.point,Ut.pointLightShadows.value=H.state.pointShadow,Ut.hemisphereLights.value=H.state.hemi,Ut.directionalShadowMap.value=H.state.directionalShadowMap,Ut.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ut.spotShadowMap.value=H.state.spotShadowMap,Ut.spotLightMatrix.value=H.state.spotLightMatrix,Ut.spotLightMap.value=H.state.spotLightMap,Ut.pointShadowMap.value=H.state.pointShadowMap,Ut.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=Yt,q.uniformsList=null,Yt}function $c(b){if(b.uniformsList===null){const k=b.currentProgram.getUniforms();b.uniformsList=Kr.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function Kc(b,k){const Y=St.get(b);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function hf(b,k,Y,q,H){k.isScene!==!0&&(k=Ot),R.resetTextureUnits();const ct=k.fog,vt=q.isMeshStandardMaterial?k.environment:null,Dt=U===null?x.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:bs,It=(q.isMeshStandardMaterial?G:S).get(q.envMap||vt),Gt=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Yt=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ut=!!Y.morphAttributes.position,te=!!Y.morphAttributes.normal,fe=!!Y.morphAttributes.color;let de=ri;q.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(de=x.toneMapping);const Ye=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ee=Ye!==void 0?Ye.length:0,Ft=St.get(q),Cn=f.state.lights;if(nt===!0&&(ft===!0||b!==M)){const nn=b===M&&q.id===E;at.setState(q,b,nn)}let ne=!1;q.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Cn.state.version||Ft.outputColorSpace!==Dt||H.isBatchedMesh&&Ft.batching===!1||!H.isBatchedMesh&&Ft.batching===!0||H.isBatchedMesh&&Ft.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ft.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ft.instancing===!1||!H.isInstancedMesh&&Ft.instancing===!0||H.isSkinnedMesh&&Ft.skinning===!1||!H.isSkinnedMesh&&Ft.skinning===!0||H.isInstancedMesh&&Ft.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ft.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ft.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ft.instancingMorph===!1&&H.morphTexture!==null||Ft.envMap!==It||q.fog===!0&&Ft.fog!==ct||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==at.numPlanes||Ft.numIntersection!==at.numIntersection)||Ft.vertexAlphas!==Gt||Ft.vertexTangents!==Yt||Ft.morphTargets!==Ut||Ft.morphNormals!==te||Ft.morphColors!==fe||Ft.toneMapping!==de||Ft.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Ft.__version=q.version);let cn=Ft.currentProgram;ne===!0&&(cn=pr(q,k,H));let Bi=!1,$e=!1,Cs=!1;const pe=cn.getUniforms(),vn=Ft.uniforms;if(ut.useProgram(cn.program)&&(Bi=!0,$e=!0,Cs=!0),q.id!==E&&(E=q.id,$e=!0),Bi||M!==b){ut.buffers.depth.getReversed()?(tt.copy(b.projectionMatrix),_d(tt),xd(tt),pe.setValue(D,"projectionMatrix",tt)):pe.setValue(D,"projectionMatrix",b.projectionMatrix),pe.setValue(D,"viewMatrix",b.matrixWorldInverse);const Yn=pe.map.cameraPosition;Yn!==void 0&&Yn.setValue(D,Ct.setFromMatrixPosition(b.matrixWorld)),Tt.logarithmicDepthBuffer&&pe.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&pe.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,$e=!0,Cs=!0)}if(H.isSkinnedMesh){pe.setOptional(D,H,"bindMatrix"),pe.setOptional(D,H,"bindMatrixInverse");const nn=H.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),pe.setValue(D,"boneTexture",nn.boneTexture,R))}H.isBatchedMesh&&(pe.setOptional(D,H,"batchingTexture"),pe.setValue(D,"batchingTexture",H._matricesTexture,R),pe.setOptional(D,H,"batchingIdTexture"),pe.setValue(D,"batchingIdTexture",H._indirectTexture,R),pe.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&pe.setValue(D,"batchingColorTexture",H._colorsTexture,R));const Ps=Y.morphAttributes;if((Ps.position!==void 0||Ps.normal!==void 0||Ps.color!==void 0)&&Vt.update(H,Y,cn),($e||Ft.receiveShadow!==H.receiveShadow)&&(Ft.receiveShadow=H.receiveShadow,pe.setValue(D,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(vn.envMap.value=It,vn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&k.environment!==null&&(vn.envMapIntensity.value=k.environmentIntensity),$e&&(pe.setValue(D,"toneMappingExposure",x.toneMappingExposure),Ft.needsLights&&uf(vn,Cs),ct&&q.fog===!0&&mt.refreshFogUniforms(vn,ct),mt.refreshMaterialUniforms(vn,q,I,O,f.state.transmissionRenderTarget[b.id]),Kr.upload(D,$c(Ft),vn,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Kr.upload(D,$c(Ft),vn,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&pe.setValue(D,"center",H.center),pe.setValue(D,"modelViewMatrix",H.modelViewMatrix),pe.setValue(D,"normalMatrix",H.normalMatrix),pe.setValue(D,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const nn=q.uniformsGroups;for(let Yn=0,qn=nn.length;Yn<qn;Yn++){const jc=nn[Yn];B.update(jc,cn),B.bind(jc,cn)}}return cn}function uf(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function ff(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,k,Y){St.get(b.texture).__webglTexture=k,St.get(b.depthTexture).__webglTexture=Y;const q=St.get(b);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,k){const Y=St.get(b);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,Y=0){U=b,A=k,w=Y;let q=!0,H=null,ct=!1,vt=!1;if(b){const It=St.get(b);if(It.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(It.__webglFramebuffer===void 0)R.setupRenderTarget(b);else if(It.__hasExternalTextures)R.rebindTextures(b,St.get(b.texture).__webglTexture,St.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ut=b.depthTexture;if(It.__boundDepthTexture!==Ut){if(Ut!==null&&St.has(Ut)&&(b.width!==Ut.image.width||b.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(b)}}const Gt=b.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(vt=!0);const Yt=St.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Yt[k])?H=Yt[k][Y]:H=Yt[k],ct=!0):b.samples>0&&R.useMultisampledRTT(b)===!1?H=St.get(b).__webglMultisampledFramebuffer:Array.isArray(Yt)?H=Yt[Y]:H=Yt,L.copy(b.viewport),V.copy(b.scissor),C=b.scissorTest}else L.copy(et).multiplyScalar(I).floor(),V.copy(gt).multiplyScalar(I).floor(),C=kt;if(ut.bindFramebuffer(D.FRAMEBUFFER,H)&&q&&ut.drawBuffers(b,H),ut.viewport(L),ut.scissor(V),ut.setScissorTest(C),ct){const It=St.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+k,It.__webglTexture,Y)}else if(vt){const It=St.get(b.texture),Gt=k||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,It.__webglTexture,Y||0,Gt)}E=-1},this.readRenderTargetPixels=function(b,k,Y,q,H,ct,vt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=St.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Dt=Dt[vt]),Dt){ut.bindFramebuffer(D.FRAMEBUFFER,Dt);try{const It=b.texture,Gt=It.format,Yt=It.type;if(!Tt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Tt.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-q&&Y>=0&&Y<=b.height-H&&D.readPixels(k,Y,q,H,Zt.convert(Gt),Zt.convert(Yt),ct)}finally{const It=U!==null?St.get(U).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(b,k,Y,q,H,ct,vt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=St.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&vt!==void 0&&(Dt=Dt[vt]),Dt){const It=b.texture,Gt=It.format,Yt=It.type;if(!Tt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Tt.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=b.width-q&&Y>=0&&Y<=b.height-H){ut.bindFramebuffer(D.FRAMEBUFFER,Dt);const Ut=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ut),D.bufferData(D.PIXEL_PACK_BUFFER,ct.byteLength,D.STREAM_READ),D.readPixels(k,Y,q,H,Zt.convert(Gt),Zt.convert(Yt),0);const te=U!==null?St.get(U).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,te);const fe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await gd(D,fe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ut),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ct),D.deleteBuffer(Ut),D.deleteSync(fe),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,k=null,Y=0){b.isTexture!==!0&&(Bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1]);const q=Math.pow(2,-Y),H=Math.floor(b.image.width*q),ct=Math.floor(b.image.height*q),vt=k!==null?k.x:0,Dt=k!==null?k.y:0;R.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,vt,Dt,H,ct),ut.unbindTexture()},this.copyTextureToTexture=function(b,k,Y=null,q=null,H=0){b.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,b=arguments[1],k=arguments[2],H=arguments[3]||0,Y=null);let ct,vt,Dt,It,Gt,Yt,Ut,te,fe;const de=b.isCompressedTexture?b.mipmaps[H]:b.image;Y!==null?(ct=Y.max.x-Y.min.x,vt=Y.max.y-Y.min.y,Dt=Y.isBox3?Y.max.z-Y.min.z:1,It=Y.min.x,Gt=Y.min.y,Yt=Y.isBox3?Y.min.z:0):(ct=de.width,vt=de.height,Dt=de.depth||1,It=0,Gt=0,Yt=0),q!==null?(Ut=q.x,te=q.y,fe=q.z):(Ut=0,te=0,fe=0);const Ye=Zt.convert(k.format),ee=Zt.convert(k.type);let Ft;k.isData3DTexture?(R.setTexture3D(k,0),Ft=D.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(R.setTexture2DArray(k,0),Ft=D.TEXTURE_2D_ARRAY):(R.setTexture2D(k,0),Ft=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const Cn=D.getParameter(D.UNPACK_ROW_LENGTH),ne=D.getParameter(D.UNPACK_IMAGE_HEIGHT),cn=D.getParameter(D.UNPACK_SKIP_PIXELS),Bi=D.getParameter(D.UNPACK_SKIP_ROWS),$e=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,It),D.pixelStorei(D.UNPACK_SKIP_ROWS,Gt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yt);const Cs=b.isDataArrayTexture||b.isData3DTexture,pe=k.isDataArrayTexture||k.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const vn=St.get(b),Ps=St.get(k),nn=St.get(vn.__renderTarget),Yn=St.get(Ps.__renderTarget);ut.bindFramebuffer(D.READ_FRAMEBUFFER,nn.__webglFramebuffer),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let qn=0;qn<Dt;qn++)Cs&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.get(b).__webglTexture,H,Yt+qn),b.isDepthTexture?(pe&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.get(k).__webglTexture,H,fe+qn),D.blitFramebuffer(It,Gt,ct,vt,Ut,te,ct,vt,D.DEPTH_BUFFER_BIT,D.NEAREST)):pe?D.copyTexSubImage3D(Ft,H,Ut,te,fe+qn,It,Gt,ct,vt):D.copyTexSubImage2D(Ft,H,Ut,te,fe+qn,It,Gt,ct,vt);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else pe?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(Ft,H,Ut,te,fe,ct,vt,Dt,Ye,ee,de.data):k.isCompressedArrayTexture?D.compressedTexSubImage3D(Ft,H,Ut,te,fe,ct,vt,Dt,Ye,de.data):D.texSubImage3D(Ft,H,Ut,te,fe,ct,vt,Dt,Ye,ee,de):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,H,Ut,te,ct,vt,Ye,ee,de.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,H,Ut,te,de.width,de.height,Ye,de.data):D.texSubImage2D(D.TEXTURE_2D,H,Ut,te,ct,vt,Ye,ee,de);D.pixelStorei(D.UNPACK_ROW_LENGTH,Cn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ne),D.pixelStorei(D.UNPACK_SKIP_PIXELS,cn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,$e),H===0&&k.generateMipmaps&&D.generateMipmap(Ft),ut.unbindTexture()},this.copyTextureToTexture3D=function(b,k,Y=null,q=null,H=0){return b.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,b=arguments[2],k=arguments[3],H=arguments[4]||0),Bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,k,Y,q,H)},this.initRenderTarget=function(b){St.get(b).__webglFramebuffer===void 0&&R.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?R.setTextureCube(b,0):b.isData3DTexture?R.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?R.setTexture2DArray(b,0):R.setTexture2D(b,0),ut.unbindTexture()},this.resetState=function(){A=0,w=0,U=null,ut.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class Ec{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Kt(t),this.near=e,this.far=i}clone(){return new Ec(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class su extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ru extends Ts{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const eo=new N,no=new N,Kl=new he,Ns=new fo,Fr=new uo,Qo=new N,jl=new N;class R_ extends we{constructor(t=new Ne,e=new ru){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)eo.fromBufferAttribute(e,s-1),no.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=eo.distanceTo(no);t.setAttribute("lineDistance",new oe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fr.copy(i.boundingSphere),Fr.applyMatrix4(s),Fr.radius+=r,t.ray.intersectsSphere(Fr)===!1)return;Kl.copy(s).invert(),Ns.copy(t.ray).applyMatrix4(Kl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=h.getX(_),y=h.getX(_+1),v=Or(this,t,Ns,c,f,y);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Or(this,t,Ns,c,_,m);f&&e.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=Or(this,t,Ns,c,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=Or(this,t,Ns,c,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Or(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(eo.fromBufferAttribute(o,s),no.fromBufferAttribute(o,r),e.distanceSqToSegment(eo,no,Qo,jl)>i)return;Qo.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Qo);if(!(c<t.near||c>t.far))return{distance:c,point:jl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class As extends Ge{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class An{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const h=i[s],d=i[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new N,s=[],r=[],o=[],a=new N,c=new he;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(De(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(De(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class bc extends An{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class C_ extends bc{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Tc(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const zr=new N,ta=new Tc,ea=new Tc,na=new Tc;class P_ extends An{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new N){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(zr.subVectors(s[0],s[1]).add(s[0]),l=zr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(zr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ta.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),ea.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),na.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ta.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ea.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),na.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(ta.calc(c),ea.calc(c),na.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jl(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function L_(n,t){const e=1-n;return e*e*t}function D_(n,t){return 2*(1-n)*n*t}function I_(n,t){return n*n*t}function Ws(n,t,e,i){return L_(n,t)+D_(n,e)+I_(n,i)}function U_(n,t){const e=1-n;return e*e*e*t}function N_(n,t){const e=1-n;return 3*e*e*n*t}function F_(n,t){return 3*(1-n)*n*n*t}function O_(n,t){return n*n*n*t}function Xs(n,t,e,i,s){return U_(n,t)+N_(n,e)+F_(n,i)+O_(n,s)}class ou extends An{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Xs(t,s.x,r.x,o.x,a.x),Xs(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class z_ extends An{constructor(t=new N,e=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Xs(t,s.x,r.x,o.x,a.x),Xs(t,s.y,r.y,o.y,a.y),Xs(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class au extends An{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class B_ extends An{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cu extends An{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ws(t,s.x,r.x,o.x),Ws(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class k_ extends An{constructor(t=new N,e=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new N){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ws(t,s.x,r.x,o.x),Ws(t,s.y,r.y,o.y),Ws(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class lu extends An{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Jl(a,c.x,l.x,h.x,u.x),Jl(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var ja=Object.freeze({__proto__:null,ArcCurve:C_,CatmullRomCurve3:P_,CubicBezierCurve:ou,CubicBezierCurve3:z_,EllipseCurve:bc,LineCurve:au,LineCurve3:B_,QuadraticBezierCurve:cu,QuadraticBezierCurve3:k_,SplineCurve:lu});class H_ extends An{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ja[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new ja[s.type]().fromJSON(s))}return this}}class Ja extends H_{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new au(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new cu(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new ou(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new lu(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new bc(t,e,i,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class wc extends Ne{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new N,h=new ot;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=i+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Fi extends Ne{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=i/2;let f=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(p,2));function y(){const x=new N,T=new N;let A=0;const w=(e-t)/i;for(let U=0;U<=r;U++){const E=[],M=U/r,L=M*(e-t)+t;for(let V=0;V<=s;V++){const C=V/s,F=C*c+a,P=Math.sin(F),z=Math.cos(F);T.x=L*P,T.y=-M*i+m,T.z=L*z,u.push(T.x,T.y,T.z),x.set(P,w,z).normalize(),d.push(x.x,x.y,x.z),p.push(C,1-M),E.push(g++)}_.push(E)}for(let U=0;U<s;U++)for(let E=0;E<r;E++){const M=_[E][U],L=_[E+1][U],V=_[E+1][U+1],C=_[E][U+1];(t>0||E!==0)&&(h.push(M,L,C),A+=3),(e>0||E!==r-1)&&(h.push(L,V,C),A+=3)}l.addGroup(f,A,0),f+=A}function v(x){const T=g,A=new ot,w=new N;let U=0;const E=x===!0?t:e,M=x===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),g++;const L=g;for(let V=0;V<=s;V++){const F=V/s*c+a,P=Math.cos(F),z=Math.sin(F);w.x=E*z,w.y=m*M,w.z=E*P,u.push(w.x,w.y,w.z),d.push(0,M,0),A.x=P*.5+.5,A.y=z*.5*M+.5,p.push(A.x,A.y),g++}for(let V=0;V<s;V++){const C=T+V,F=L+V;x===!0?h.push(F,F+1,C):h.push(F+1,F,C),U+=3}l.addGroup(f,U,x===!0?1:2),f+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ac extends Ja{constructor(t){super(t),this.uuid=Ni(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Ja().fromJSON(s))}return this}}const V_={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=hu(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,p;if(i&&(r=q_(n,t,r,e)),n.length>80*e){a=l=n[0],c=h=n[1];for(let g=e;g<s;g+=e)u=n[g],d=n[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Qs(r,o,e,a,c,p,0),o}};function hu(n,t,e,i,s){let r,o;if(s===sx(n,t,e,i)>0)for(r=t;r<e;r+=i)o=Ql(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=Ql(r,n[r],n[r+1],o);return o&&mo(o,o.next)&&(er(o),o=o.next),o}function Di(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(mo(e,e.next)||_e(e.prev,e,e.next)===0)){if(er(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Qs(n,t,e,i,s,r,o){if(!n)return;!o&&r&&J_(n,i,s,r);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?W_(n,i,s,r):G_(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),er(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=X_(Di(n),t,e),Qs(n,t,e,i,s,r,2)):o===2&&Y_(n,t,e,i,s,r):Qs(Di(n),t,e,i,s,r,1);break}}}function G_(n){const t=n.prev,e=n,i=n.next;if(_e(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&as(s,a,r,c,o,l,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function W_(n,t,e,i){const s=n.prev,r=n,o=n.next;if(_e(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,f=Qa(p,g,t,e,i),y=Qa(_,m,t,e,i);let v=n.prevZ,x=n.nextZ;for(;v&&v.z>=f&&x&&x.z<=y;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&as(a,h,c,u,l,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&as(a,h,c,u,l,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&as(a,h,c,u,l,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&as(a,h,c,u,l,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function X_(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!mo(s,r)&&uu(s,i,i.next,r)&&tr(s,r)&&tr(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),er(i),er(i.next),i=n=r),i=i.next}while(i!==n);return Di(i)}function Y_(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ex(o,a)){let c=fu(o,a);o=Di(o,o.next),c=Di(c,c.next),Qs(o,t,e,i,s,r,0),Qs(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function q_(n,t,e,i){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=hu(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(tx(l));for(s.sort(Z_),r=0;r<s.length;r++)e=$_(s[r],e);return e}function Z_(n,t){return n.x-t.x}function $_(n,t){const e=K_(n,t);if(!e)return t;const i=fu(e,n);return Di(i,i.next),Di(e,e.next)}function K_(n,t){let e=t,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>i&&(i=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&as(o<l?r:i,o,c,l,o<l?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),tr(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&j_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function j_(n,t){return _e(n.prev,n,t.prev)<0&&_e(t.next,n,n.next)<0}function J_(n,t,e,i){let s=n;do s.z===0&&(s.z=Qa(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Q_(s)}function Q_(n){let t,e,i,s,r,o,a,c,l=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(o>1);return n}function Qa(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function tx(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function as(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function ex(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!nx(n,t)&&(tr(n,t)&&tr(t,n)&&ix(n,t)&&(_e(n.prev,n,t.prev)||_e(n,t.prev,t))||mo(n,t)&&_e(n.prev,n,n.next)>0&&_e(t.prev,t,t.next)>0)}function _e(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function mo(n,t){return n.x===t.x&&n.y===t.y}function uu(n,t,e,i){const s=kr(_e(n,t,e)),r=kr(_e(n,t,i)),o=kr(_e(e,i,n)),a=kr(_e(e,i,t));return!!(s!==r&&o!==a||s===0&&Br(n,e,t)||r===0&&Br(n,i,t)||o===0&&Br(e,n,i)||a===0&&Br(e,t,i))}function Br(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function kr(n){return n>0?1:n<0?-1:0}function nx(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&uu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function tr(n,t){return _e(n.prev,n,n.next)<0?_e(n,t,n.next)>=0&&_e(n,n.prev,t)>=0:_e(n,t,n.prev)<0||_e(n,n.next,t)<0}function ix(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function fu(n,t){const e=new tc(n.i,n.x,n.y),i=new tc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Ql(n,t,e,i){const s=new tc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function er(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function tc(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function sx(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class oi{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return oi.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];th(t),eh(i,t);let o=t.length;e.forEach(th);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,eh(i,e[c]);const a=V_.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function th(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function eh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Rc extends Ne{constructor(t=new Ac([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:rx;let v,x=!1,T,A,w,U;f&&(v=f.getSpacedPoints(h),x=!0,d=!1,T=f.computeFrenetFrames(h,!1),A=new N,w=new N,U=new N),d||(m=0,p=0,g=0,_=0);const E=a.extractPoints(l);let M=E.shape;const L=E.holes;if(!oi.isClockWise(M)){M=M.reverse();for(let J=0,st=L.length;J<st;J++){const D=L[J];oi.isClockWise(D)&&(L[J]=D.reverse())}}const C=oi.triangulateShape(M,L),F=M;for(let J=0,st=L.length;J<st;J++){const D=L[J];M=M.concat(D)}function P(J,st,D){return st||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(st,D)}const z=M.length,O=C.length;function I(J,st,D){let Pt,rt,Tt;const ut=J.x-st.x,zt=J.y-st.y,St=D.x-J.x,R=D.y-J.y,S=ut*ut+zt*zt,G=ut*R-zt*St;if(Math.abs(G)>Number.EPSILON){const K=Math.sqrt(S),it=Math.sqrt(St*St+R*R),j=st.x-zt/K,Lt=st.y+ut/K,mt=D.x-R/it,Et=D.y+St/it,jt=((mt-j)*R-(Et-Lt)*St)/(ut*R-zt*St);Pt=j+ut*jt-J.x,rt=Lt+zt*jt-J.y;const at=Pt*Pt+rt*rt;if(at<=2)return new ot(Pt,rt);Tt=Math.sqrt(at/2)}else{let K=!1;ut>Number.EPSILON?St>Number.EPSILON&&(K=!0):ut<-Number.EPSILON?St<-Number.EPSILON&&(K=!0):Math.sign(zt)===Math.sign(R)&&(K=!0),K?(Pt=-zt,rt=ut,Tt=Math.sqrt(S)):(Pt=ut,rt=zt,Tt=Math.sqrt(S/2))}return new ot(Pt/Tt,rt/Tt)}const W=[];for(let J=0,st=F.length,D=st-1,Pt=J+1;J<st;J++,D++,Pt++)D===st&&(D=0),Pt===st&&(Pt=0),W[J]=I(F[J],F[D],F[Pt]);const X=[];let et,gt=W.concat();for(let J=0,st=L.length;J<st;J++){const D=L[J];et=[];for(let Pt=0,rt=D.length,Tt=rt-1,ut=Pt+1;Pt<rt;Pt++,Tt++,ut++)Tt===rt&&(Tt=0),ut===rt&&(ut=0),et[Pt]=I(D[Pt],D[Tt],D[ut]);X.push(et),gt=gt.concat(et)}for(let J=0;J<m;J++){const st=J/m,D=p*Math.cos(st*Math.PI/2),Pt=g*Math.sin(st*Math.PI/2)+_;for(let rt=0,Tt=F.length;rt<Tt;rt++){const ut=P(F[rt],W[rt],Pt);tt(ut.x,ut.y,-D)}for(let rt=0,Tt=L.length;rt<Tt;rt++){const ut=L[rt];et=X[rt];for(let zt=0,St=ut.length;zt<St;zt++){const R=P(ut[zt],et[zt],Pt);tt(R.x,R.y,-D)}}}const kt=g+_;for(let J=0;J<z;J++){const st=d?P(M[J],gt[J],kt):M[J];x?(w.copy(T.normals[0]).multiplyScalar(st.x),A.copy(T.binormals[0]).multiplyScalar(st.y),U.copy(v[0]).add(w).add(A),tt(U.x,U.y,U.z)):tt(st.x,st.y,0)}for(let J=1;J<=h;J++)for(let st=0;st<z;st++){const D=d?P(M[st],gt[st],kt):M[st];x?(w.copy(T.normals[J]).multiplyScalar(D.x),A.copy(T.binormals[J]).multiplyScalar(D.y),U.copy(v[J]).add(w).add(A),tt(U.x,U.y,U.z)):tt(D.x,D.y,u/h*J)}for(let J=m-1;J>=0;J--){const st=J/m,D=p*Math.cos(st*Math.PI/2),Pt=g*Math.sin(st*Math.PI/2)+_;for(let rt=0,Tt=F.length;rt<Tt;rt++){const ut=P(F[rt],W[rt],Pt);tt(ut.x,ut.y,u+D)}for(let rt=0,Tt=L.length;rt<Tt;rt++){const ut=L[rt];et=X[rt];for(let zt=0,St=ut.length;zt<St;zt++){const R=P(ut[zt],et[zt],Pt);x?tt(R.x,R.y+v[h-1].y,v[h-1].x+D):tt(R.x,R.y,u+D)}}}Z(),nt();function Z(){const J=s.length/3;if(d){let st=0,D=z*st;for(let Pt=0;Pt<O;Pt++){const rt=C[Pt];Mt(rt[2]+D,rt[1]+D,rt[0]+D)}st=h+m*2,D=z*st;for(let Pt=0;Pt<O;Pt++){const rt=C[Pt];Mt(rt[0]+D,rt[1]+D,rt[2]+D)}}else{for(let st=0;st<O;st++){const D=C[st];Mt(D[2],D[1],D[0])}for(let st=0;st<O;st++){const D=C[st];Mt(D[0]+z*h,D[1]+z*h,D[2]+z*h)}}i.addGroup(J,s.length/3-J,0)}function nt(){const J=s.length/3;let st=0;ft(F,st),st+=F.length;for(let D=0,Pt=L.length;D<Pt;D++){const rt=L[D];ft(rt,st),st+=rt.length}i.addGroup(J,s.length/3-J,1)}function ft(J,st){let D=J.length;for(;--D>=0;){const Pt=D;let rt=D-1;rt<0&&(rt=J.length-1);for(let Tt=0,ut=h+m*2;Tt<ut;Tt++){const zt=z*Tt,St=z*(Tt+1),R=st+Pt+zt,S=st+rt+zt,G=st+rt+St,K=st+Pt+St;Ct(R,S,G,K)}}}function tt(J,st,D){c.push(J),c.push(st),c.push(D)}function Mt(J,st,D){wt(J),wt(st),wt(D);const Pt=s.length/3,rt=y.generateTopUV(i,s,Pt-3,Pt-2,Pt-1);Ot(rt[0]),Ot(rt[1]),Ot(rt[2])}function Ct(J,st,D,Pt){wt(J),wt(st),wt(Pt),wt(st),wt(D),wt(Pt);const rt=s.length/3,Tt=y.generateSideWallUV(i,s,rt-6,rt-3,rt-2,rt-1);Ot(Tt[0]),Ot(Tt[1]),Ot(Tt[3]),Ot(Tt[1]),Ot(Tt[2]),Ot(Tt[3])}function wt(J){s.push(c[J*3+0]),s.push(c[J*3+1]),s.push(c[J*3+2])}function Ot(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return ox(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];i.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ja[s.type]().fromJSON(s)),new Rc(i,t.options)}}const rx={generateTopUV:function(n,t,e,i,s){const r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new ot(r,o),new ot(a,c),new ot(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],d=t[s*3],p=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ot(o,1-c),new ot(l,1-u),new ot(d,1-g),new ot(_,1-f)]:[new ot(a,1-c),new ot(h,1-u),new ot(p,1-g),new ot(m,1-f)]}};function ox(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class go extends Ne{constructor(t=new Ac([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new oe(s,3)),this.setAttribute("normal",new oe(r,3)),this.setAttribute("uv",new oe(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let p=d.shape;const g=d.holes;oi.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){const y=g[m];oi.isClockWise(y)===!0&&(g[m]=y.reverse())}const _=oi.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){const y=g[m];p=p.concat(y)}for(let m=0,f=p.length;m<f;m++){const y=p[m];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,f=_.length;m<f;m++){const y=_[m],v=y[0]+u,x=y[1]+u,T=y[2]+u;i.push(v,x,T),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return ax(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new go(i,t.curveSegments)}}function ax(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Cc extends Ne{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new N,d=new N,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const y=[],v=f/i;let x=0;f===0&&o===0?x=.5/e:f===i&&c===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){const A=T/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(A+x,1-v),y.push(l++)}h.push(y)}for(let f=0;f<i;f++)for(let y=0;y<e;y++){const v=h[f][y+1],x=h[f][y],T=h[f+1][y],A=h[f+1][y+1];(f!==0||o>0)&&p.push(v,x,A),(f!==i-1||c<Math.PI)&&p.push(x,T,A)}this.setIndex(p),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Pc extends Ne{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new N,u=new N,d=new N;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,y=(s+1)*p+g;o.push(_,m,y),o.push(m,f,y)}this.setIndex(o),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class nr extends Ts{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hh,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class cx extends ru{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Lc extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class lx extends Lc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ia=new he,nh=new N,ih=new N;class du{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mc,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;nh.setFromMatrixPosition(t.matrixWorld),e.position.copy(nh),ih.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ih),e.updateMatrixWorld(),ia.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ia),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ia)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const sh=new he,Fs=new N,sa=new N;class hx extends du{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Fs.setFromMatrixPosition(t.matrixWorld),i.position.copy(Fs),sa.copy(i.position),sa.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(sa),i.updateMatrixWorld(),s.makeTranslation(-Fs.x,-Fs.y,-Fs.z),sh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh)}}class ux extends Lc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new hx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class fx extends du{constructor(){super(new yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dx extends Lc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new fx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class px{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=rh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=rh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function rh(){return performance.now()}const oh=new he;class mx{constructor(t,e,i=0,s=1/0){this.ray=new fo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new xc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return oh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(oh),this}intersectObject(t,e=!0,i=[]){return ec(t,this,i,e),i.sort(ah),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)ec(t[s],this,i,e);return i.sort(ah),i}}function ah(n,t){return n.distance-t.distance}function ec(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)ec(r[o],t,e,!0)}}class ch{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(De(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gx extends Ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lc);const lh={type:"change"},Dc={type:"start"},pu={type:"end"},Hr=new fo,hh=new ni,_x=Math.cos(70*_c.DEG2RAD),Ee=new N,qe=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ra=1e-6;class xx extends gx{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:rs.ROTATE,TWO:rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Li,this._lastTargetPosition=new N,this._quat=new Li().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ch,this._sphericalDelta=new ch,this._scale=1,this._panOffset=new N,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new N,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Mx.bind(this),this._onPointerDown=vx.bind(this),this._onPointerUp=yx.bind(this),this._onContextMenu=Rx.bind(this),this._onMouseWheel=bx.bind(this),this._onKeyDown=Tx.bind(this),this._onTouchStart=wx.bind(this),this._onTouchMove=Ax.bind(this),this._onMouseDown=Sx.bind(this),this._onMouseMove=Ex.bind(this),this._interceptControlDown=Cx.bind(this),this._interceptControlUp=Px.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(lh),this.update(),this.state=ce.NONE}update(t=null){const e=this.object.position;Ee.copy(e).sub(this.target),Ee.applyQuaternion(this._quat),this._spherical.setFromVector3(Ee),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=qe:i>Math.PI&&(i-=qe),s<-Math.PI?s+=qe:s>Math.PI&&(s-=qe),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ee.setFromSpherical(this._spherical),Ee.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ee),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ee.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ee.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Hr.origin.copy(this.object.position),Hr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hr.direction))<_x?this.object.lookAt(this.target):(hh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hr.intersectPlane(hh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ra||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ra||this._lastTargetPosition.distanceToSquared(this.target)>ra?(this.dispatchEvent(lh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ee.setFromMatrixColumn(e,0),Ee.multiplyScalar(-t),this._panOffset.add(Ee)}_panUp(t,e){this.screenSpacePanning===!0?Ee.setFromMatrixColumn(e,1):(Ee.setFromMatrixColumn(e,0),Ee.crossVectors(this.object.up,Ee)),Ee.multiplyScalar(t),this._panOffset.add(Ee)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ee.copy(s).sub(this.target);let r=Ee.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function vx(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Mx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function yx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pu),this.state=ce.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Sx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ce.DOLLY;break;case hs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}break;case hs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Dc)}function Ex(n){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function bx(n){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(n.preventDefault(),this.dispatchEvent(Dc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(pu))}function Tx(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function wx(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ce.TOUCH_ROTATE;break;case rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ce.TOUCH_DOLLY_PAN;break;case rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Dc)}function Ax(n){switch(this._trackPointer(n),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ce.NONE}}function Rx(n){this.enabled!==!1&&n.preventDefault()}function Cx(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Px(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class uh extends we{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new ot(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ts=new N,fh=new he,dh=new he,ph=new N,mh=new N;class Lx{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),fh.copy(_.matrixWorldInverse),dh.multiplyMatrices(_.projectionMatrix,fh),h(g,g,_),p(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,c.style.width=g+"px",c.style.height=_+"px"};function l(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)l(g.children[_])}function h(g,_,m){if(g.visible===!1){l(g);return}if(g.isCSS2DObject){ts.setFromMatrixPosition(g.matrixWorld),ts.applyMatrix4(dh);const f=ts.z>=-1&&ts.z<=1&&g.layers.test(m.layers)===!0,y=g.element;y.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(e,_,m),y.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(ts.x*r+r)+"px,"+(-ts.y*o+o)+"px)",y.parentNode!==c&&c.appendChild(y),g.onAfterRender(e,_,m));const v={distanceToCameraSquared:u(m,g)};a.objects.set(g,v)}for(let f=0,y=g.children.length;f<y;f++)h(g.children[f],_,m)}function u(g,_){return ph.setFromMatrixPosition(g.matrixWorld),mh.setFromMatrixPosition(_.matrixWorld),ph.distanceToSquared(mh)}function d(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=d(g).sort(function(f,y){if(f.renderOrder!==y.renderOrder)return y.renderOrder-f.renderOrder;const v=a.objects.get(f).distanceToCameraSquared,x=a.objects.get(y).distanceToCameraSquared;return v-x}),m=_.length;for(let f=0,y=_.length;f<y;f++)_[f].element.style.zIndex=m-f}}}class Dx extends su{constructor(){super();const t=new We;t.deleteAttribute("uv");const e=new nr({side:Ve}),i=new nr,s=new ux(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ht(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Ht(t,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new Ht(t,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new Ht(t,i);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new Ht(t,i);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const h=new Ht(t,i);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new Ht(t,i);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const d=new Ht(t,es(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const p=new Ht(t,es(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new Ht(t,es(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new Ht(t,es(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new Ht(t,es(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const f=new Ht(t,es(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function es(n){const t=new vc;return t.color.setScalar(n),t}const mu="2026-10-22 第 30 版（柜门）",Be=[3.3,3.3,3],Wt=[0,3.3,6.6],Hs=9,Ys=.15,me=.14,gu=.62,Bn=2,_u=.85,qs=.45,Ue=[Wt[0]+Be[0]/2,Wt[1]+Be[1]/2],gn=1012,Ix=[[457,80],[1006,80],[1006,616],[1414,616],[1414,1550],[69,1550],[69,gn],[457,gn]],xu=0,Ic=xu+.9+me,Ux=Ic+.94+me,Uc=Ic+3.7+me,vu=Uc+4.77+me,Nc=vu+me/2+.925,Nx=Nc+3.26,Fx=Nx+me/2,Ox=Uc+2.925+me,Mu=Nc,zx=Mu-me/2-1.96-me/2,Bx=[[80,xu],[208,Ic],[325,Ux],[616,Uc],[906,Ox],[gn,zx],[1100,vu],[1248,Mu],[1272,Nc],[1550,Fx]],yu=0,Fc=yu+3.85+me,Su=Fc+4.27+me,Eu=Su+5.115+me,kx=Eu-1.14-me,Hx=Fc+1.065+me,En=.9,bu=[[69,Eu],[224,kx],[457,Su],[876,Hx],[1006,Fc],[1414,yu]];function Tu(n,t){if(t<=n[0][0])return n[0][1];const e=n[n.length-1];if(t>=e[0])return e[1];for(let i=1;i<n.length;i++){const[s,r]=n[i];if(t<=s){const[o,a]=n[i-1],c=(t-o)/(s-o||1);return a+c*(r-a)}}return e[1]}function Vx(n,t){for(let o=1;o<n.length;o++){const[a,c]=n[o-1],[l,h]=n[o],u=Math.min(c,h),d=Math.max(c,h);if(t>=u-1e-6&&t<=d+1e-6){const p=(t-c)/(h-c||1);return a+p*(l-a)}}const[e,i]=n[0],[s,r]=n[n.length-1];return t<Math.min(i,r)?i<r?e:s:i>r?e:s}const bt=n=>Tu(Bx,n),lt=n=>Tu(bu,n),gh=n=>Vx(bu,n);function Gx(n,t,e=0){const i=Math.min(lt(n),lt(t)),s=Math.max(lt(n),lt(t));return[i+e,s-e]}function Vr(n){const t=bt(1550)||1,e=Math.min(1,Math.max(0,n/t));return Wt[2]+Be[2]+.06+gu*e}const Le=Ix.map(([n,t])=>({x:bt(t),z:lt(n)}));{const n=Le.findIndex(e=>Math.abs(e.x-bt(616))<.02&&Math.abs(e.z-lt(1006))<.02),t=lt(1006)-En;Le.splice(n,1,{x:bt(325),z:lt(1006)},{x:bt(325),z:t},{x:bt(616),z:t})}function Wx(n){let t=0;for(let e=0;e<n.length;e++){const i=n[e],s=n[(e+1)%n.length];t+=i.x*s.z-s.x*i.z}return Math.abs(t)/2}const Je=me/2,Te=(()=>{const n=bt(gn)+Je,t=bt(1248)-Je,e=lt(457)+Je,i=lt(69)-Je,s=(n+t)/2,r=i-.08,o=r-.7,a=1.05,c=i-a,l=e+a;return{x0:n,x1:t,xm:s,well:.03,z0:e,z1:i,zL:c,zP:l,zStart:l,door:[o,r],wallX:bt(1248)}})(),ir=[{id:"f1-wc",floorY:Ue[0],ceilY:Ue[0]+2.7,x0:bt(1248)+Je,x1:bt(1550)-Je,z0:lt(224)+Je,z1:lt(69)-Je,soffit:.3,tile:"diamond"},{id:"f2-wc",floorY:Ue[1],ceilY:Ue[1]+2.7,x0:bt(1248)+Je,x1:bt(1550)-Je,z0:lt(224)+Je,z1:lt(69)-Je,zFill:lt(240)+Je,tile:"beige"}];function _h(n,t,e,i){const s=bt(Math.min(t,i)),r=Math.min(lt(n),lt(e));return{x:s,z:r,w:Math.abs(bt(i)-bt(t)),d:Math.abs(lt(e)-lt(n))}}const Me=(n,t,e={})=>({a:n,b:t,kind:"door",y0:0,y1:Bn,leaf:"wood",transom:!1,hinge:"a",swing:1,open:1.5,...e}),vi=(n,t,e,i,s={})=>({a:n,b:t,kind:"window",y0:e,y1:i,cols:2,rows:2,...s}),xh=(n,t,e,i)=>({a:n,b:t,kind:"hole",y0:e,y1:i});function wu(n){return Array.isArray(n)?Me(n[0],n[1],{y0:n[2]??0,y1:n[3]??Bn}):n}function Au(n,t,e){const i=Math.min(_u,Math.max(.45,e-.08));let s=(n+t)/2-i/2,r=s+i;return s<.03&&(r+=.03-s,s=.03),r>e-.03&&(s-=r-(e-.03),r=e-.03),[s,r]}function rn(n,t,e,i=[]){const s=Math.min(t,e),r=Math.max(t,e),o=lt(r),a=lt(s),c=a-o;return{axis:"x",c:bt(n),x1:bt(n),z1:o,x2:bt(n),z2:a,openings:i.map(l=>{const h=wu(l),u=lt(r);let d=lt(Math.max(h.a,h.b))-u,p=lt(Math.min(h.a,h.b))-u;d>p&&([d,p]=[p,d]),(h.kind==="door"||h.kind==="hole")&&([d,p]=Au(d,p,c));const g=h.hinge==="a"?"b":"a",_=h.y1+(h.transom?qs:0);return{...h,a:d,b:p,hinge:g,wallY1:_}})}}function Mn(n,t,e,i=[]){const s=Math.min(t,e),r=Math.max(t,e),o=bt(r)-bt(s);return{axis:"z",c:lt(n),x1:bt(s),z1:lt(n),x2:bt(r),z2:lt(n),openings:i.map(a=>{const c=wu(a),l=bt(s);let h=bt(Math.min(c.a,c.b))-l,u=bt(Math.max(c.a,c.b))-l;(c.kind==="door"||c.kind==="hole")&&([h,u]=Au(h,u,o));const d=c.y1+(c.transom?qs:0);return{...c,a:h,b:u,wallY1:d}})}}function Xx(n,t,e,i,s,r,o,a={}){return{x1:n,z1:t,x2:e,z2:i,y0:s,y1:r,kind:o,...a}}function Yx(){return{outline:Le,area:Wx(Le),stairW:Math.abs(lt(457)-lt(69))}}const qx=13947083,ti=[Math.round(gh(Te.door[1])),Math.round(gh(Te.door[0]))],jr=588;function Zx(){const n=Te,t=r=>({x:n.x0,z:n.z0,w:n.x1-n.x0,d:n.zP-n.z0,level:Wt[r]}),e=[{id:"f1-shop",floor:1,name:"临街商铺",rects:[[457,80,1006,1100]],finish:"terrazzo",note:"临街通间。水磨石地面，东墙有门和内窗通向室内，北墙有门通健身房。"},{id:"f1-gym",floor:1,name:"健身房",rects:[[1006,616,1414,1100]],finish:"rubber",note:"商铺北侧。橡胶地面，白墙。东墙有门和内窗通大厅。"},{id:"f1-hall",floor:1,name:"大厅",rects:[[457,1100,1414,1550]],finish:"cement",note:"东侧通间。水泥地面。北墙两樘门通巷道，东墙北段为厨房操作区，南墙通储藏间和楼梯间。"},{id:"f1-cook",floor:1,name:"厨房操作区",rects:[[975,1440,1395,1550]],zone:!0,labelAt:[1185,1462],edges:{ns:!1,west:!1},note:"大厅东北角。墙面为白瓷砖，上方两樘窗。"},{id:"f1-stair",floor:1,name:"楼梯间",rects:[[69,gn,457,1248]],finish:"cementRough",note:"双跑楼梯。北端为水泥地面，踏步和转角平台为同色地砖。东侧半层有卫生间。"},{id:"f1-fridge",floor:1,name:"储藏间",rects:[[224,1248,457,1550]],finish:"cementRough",note:"大厅南侧。水泥地面。北墙有门和窗与大厅相通。"},{id:"f1-wc",floor:1,name:"半层卫生间",rects:[[69,1248,224,1550]],level:Ue[0],wc:0,where:"一、二层之间",note:"由下层转角平台进入。花砖地面，墙面贴瓷砖，南墙有小窗。"},{id:"f2-balcony",floor:2,name:"阳台",rects:[[457,80,1006,208]],note:"临街。西侧为通长窗，东墙有窗通卧室。"},{id:"f2-bed1",floor:2,name:"卧室1",rects:[[457,208,876,616],[876,208,1006,325]],parts:[[876,208,1006,325,"北头"]],note:"阳台以东，北侧带套内卫生间。"},{id:"f2-bath",floor:2,name:"套内卫生间",rects:[[876,325,1006,616]],note:"卧室1北侧。北墙有高窗。"},{id:"f2-living",floor:2,name:"客厅",rects:[[457,616,1006,1100]],note:"西侧中部。东墙有门和带防盗条的内窗通过道。"},{id:"f2-store",floor:2,name:"储物间",rects:[[1006,616,1414,906]],note:"北侧靠西。北墙有窗，朝向巷道。"},{id:"f2-bed2",floor:2,name:"卧室2",rects:[[1006,906,1414,1272]],note:"北侧中部。与卧室3之间为一排内窗。"},{id:"f2-hall",floor:2,name:"过道",rects:[[457,1100,1006,1272]],edges:{east:!1},note:"南端为不锈钢栅栏门，通向楼梯间。东侧与公共区域相连，西侧内窗带防盗条。"},{id:"f2-public",floor:2,name:"公共区域",rects:[[457,1272,1006,1550]],edges:{west:!1},note:"过道以东。东墙有窗。"},{id:"f2-bed3",floor:2,name:"卧室3",rects:[[1006,1272,1414,1550]],note:"北侧靠东。西墙为内窗，东墙有窗。"},{id:"f2-stair",floor:2,name:"楼梯间",pads:[t(1)],rects:[[69,gn,457,1248]],finish:"stairBeige",note:"地砖地面。北侧栅栏门通过道，南侧为转角平台，东侧进入半层卫生间。"},{id:"f2-wc",floor:2,name:"半层卫生间",rects:[[69,1248,224,1550]],level:Ue[1],wc:1,where:"二、三层之间",note:"由上层转角平台进入。地砖地面，墙面贴瓷砖，南墙有小窗。"},{id:"f2-bed4",floor:2,name:"卧室4",rects:[[224,1248,457,1550]],note:"楼梯间以东。北墙有门和内窗通向公共区域。"},{id:"f3-balcony",floor:3,name:"公共阳台",rects:[[457,80,1006,616]],note:"三层临街。西侧和北侧为矮墙，东侧有门通客厅。"},{id:"f3-living",floor:3,name:"客厅",rects:[[457,616,1414,1224]],note:"公共阳台以东的通间。南墙有门通楼梯间，东墙分别通厨房和卧室。"},{id:"f3-stair",floor:3,name:"楼梯间",pads:[t(2)],rects:[[69,gn,457,1248]],finish:"stairBeige",note:"地砖地面。北侧为银色铁门，通向客厅。其下为转角平台和半层卫生间。"},{id:"f3-kitchen",floor:3,name:"厨房",rects:[[240,1248,457,1550],[457,1224,jr,1550]],parts:[[240,1248,457,1550,"西间"],[457,1224,jr,1550,"北头"]],note:"客厅以东。北侧有门通客厅。"},{id:"f3-bed1",floor:3,name:"卧室1",rects:[[jr,1224,1414,1550]],note:"厨房以东。东墙有一樘铝合金窗。"}],i=r=>((r<0?-1:1)*Math.round((Math.abs(r)+1e-8)*100)/100).toFixed(2),s=(r,o={})=>{let a=1/0,c=-1/0,l=1/0,h=-1/0;r.forEach(([_,m,f,y])=>{a=Math.min(a,_,f),c=Math.max(c,_,f),l=Math.min(l,m,y),h=Math.max(h,m,y)});const u=Math.abs(lt(c)-lt(a))-(o.ns===!1?0:me),d=o.west===!1?0:me/2,p=o.east===!1?0:me/2,g=Math.abs(bt(h)-bt(l))-d-p;return{ns:u,ew:g}};return e.map(r=>{const o=(r.pads||r.rects.map(x=>_h(...x))).map(x=>({...x}));(r.id==="f2-bath"||r.id==="f1-shop"||r.id==="f3-balcony")&&o.push({x:bt(325),z:lt(1006)-En,w:bt(616)-bt(325),d:En});let a=0,c=0,l=0;o.forEach(x=>{const T=x.w*x.d;a+=(x.x+x.w/2)*T,c+=(x.z+x.d/2)*T,l+=T});const h=r.level??Wt[r.floor-1],u=r.rects.map(x=>_h(...x)),d=s(r.rects,r.edges),p=d.ns+(r.id==="f2-bath"?En:0),g=d.ew,_=r.wc!=null?ir[r.wc].ceilY-ir[r.wc].floorY:Be[r.floor-1],m=`约 ${i(p)} × ${i(g)} × ${i(_)} m`,f=(r.parts||[]).map(([x,T,A,w,U])=>{const E=s([[x,T,A,w]]);return`${U}约 ${i(E.ns)} × ${i(E.ew)} m`}).join("，"),y=r.id==="f2-bath"||r.id==="f1-shop"||r.id==="f3-balcony",v=u.reduce((x,T)=>x+T.w*T.d,0)+(y?(bt(616)-bt(325))*En:0);return{...r,level:h,color:qx,pads:o,ns:p,ew:g,h:_,sizeText:m,dimsNote:f,area:v,label:r.labelAt?{x:bt(r.labelAt[1]),z:lt(r.labelAt[0])}:{x:a/l,z:c/l}}})}const $x=[{floor:3,room:"f2-wc"}],Kx=[{floor:1,dashed:!0,rect:[975,1440,1395,1550]},{floor:2,dashed:!0,line:[[457,1272],[1006,1272]]}];function oa(n){const t=lt(1006)-En,e=lt(1006),i=bt(616),s=[];if(n===1){const r=t+me/2+.015,o=e-me/2-.015;s.push({a:r-t,b:o-t,kind:"hole",y0:.08,y1:2.42})}return{axis:"x",c:i,x1:i,z1:t,x2:i,z2:e,openings:s}}function jx(n){if(n===0){const e=Ue[0];return[Mn(1006,616,1100,[Me(895,976,{transom:!0,hinge:"b",swing:-1})]),rn(1100,457,1414,[Me(871,992,{transom:!0,hinge:"b",swing:-1}),Me(1022,1138,{transom:!0,hinge:"a",swing:-1}),vi(640,840,.95,2.2,{cols:3,rows:2,glass:["pattern","pattern"],frame:"wood",inner:!0}),vi(1235,1370,.9,2.25,{cols:2,rows:2,glass:["clear","clear"],frame:"wood",inner:!0})]),Mn(457,gn,1550,[Me(1120,1236,{transom:!0,hinge:"b",swing:1}),Me(1262,1352,{transom:!0,hinge:"a",swing:1}),vi(1380,1510,.9,2.15,{cols:2,rows:1,inner:!0})]),rn(1248,69,457,[Me(ti[0],ti[1],{y0:e,y1:e+Bn,hinge:"a",swing:1,leaf:"wc"})]),Mn(224,1248,1550),oa(0)]}if(n===1){const e=Ue[1]-Wt[1];return[rn(208,457,1006,[Me(461,547,{hinge:"a",swing:1}),vi(850,990,.85,2.15,{cols:2,rows:2,glass:["clear","clear"],inner:!0})]),rn(325,876,1006,[Me(889,992,{hinge:"b",swing:1,leaf:"wc"})]),Mn(876,325,616),rn(616,457,1006,[Me(474,568,{hinge:"a",swing:-1})]),Mn(1006,616,1550,[Me(808,888,{hinge:"a",swing:-1}),Me(936,1016,{hinge:"a",swing:-1}),Me(1288,1368,{hinge:"a",swing:-1})]),rn(906,1006,1414),rn(1100,457,1006,[Me(880,988,{hinge:"a",swing:1}),vi(665,854,.88,2.22,{cols:2,rows:3,bars:!0,frame:"alu",inner:!0})]),Mn(457,gn,1550,[Me(1132,1240,{hinge:"a",swing:-1,leaf:"bars"}),Me(1292,1388,{hinge:"b",swing:1}),vi(1407,1528,.85,2.2,{cols:2,rows:2,glass:["clear","clear"],inner:!0})]),rn(1248,69,457,[xh(ti[0],ti[1],Ue[0]-Wt[1],Ue[0]+Bn-Wt[1]),Me(ti[0],ti[1],{y0:e,y1:e+Bn,hinge:"a",swing:1,leaf:"wc"})]),rn(1272,1006,1414,[vi(1022,1398,.8,2.35,{cols:5,rows:2,glass:["clear","clear"],inner:!0})]),Mn(224,1248,1550),oa(1)]}const t=Ue[1]-Wt[2];return[rn(616,457,1006,[Me(461,555,{hinge:"a",swing:1})]),Mn(457,gn,1248,[Me(1120,1176,{hinge:"a",swing:1,leaf:"steel"})]),rn(1248,69,457,[xh(ti[0],ti[1],t,t+Bn)]),rn(1224,457,1414,[Me(478,570,{hinge:"a",swing:1}),Me(700,800,{hinge:"b",swing:1})]),Mn(240,1248,1550),Mn(jr,1224,1550),oa(2)]}function Jx(){const n=[],t=(h,u,d,p,g,_,m,f,y)=>{n.push({...Xx(u,d,p,g,_,m,f,y),floor:h})},[e,i]=Gx(457,1006);t(0,0,e+.12,0,i-.12,.05,2.75,"shutter",{color:"gold"}),t(1,0,e+.1,0,i-.1,.68,2.68,"window",{panes:4,rows:2}),t(2,0,e,0,i,1.02,3.6,"open"),t(2,0,lt(457),.45,lt(457),1.02,3.6,"open");const s=lt(1414);t(0,9.95,s,10.8,s,0,Bn,"door",{leaf:"wood"}),t(0,11.45,s,12.3,s,0,Bn,"door",{leaf:"steel",canopy:!0}),t(1,5.5,s,6.7,s,.95,2.15,"window",{panes:2,rows:2});{const h=lt(1006)-En,u=bt(616)-me-.7;t(1,u-.75,h,u,h,2.3,2.85,"window",{panes:2,rows:1})}const r=lt(1006)-En;t(2,0,lt(1006),bt(325),lt(1006),1.2,3.6,"open"),t(2,bt(325),lt(1006),bt(325),r,1.2,3.6,"open"),t(2,bt(325),r,bt(616)-.2,r,1.2,3.6,"open"),t(2,bt(616),1,bt(616),2.9,.85,2.15,"window",{panes:2,rows:2});{const h=lt(457),u=bt(616),d=bt(gn),p=1.8,g=u+(d-u-p)/2;t(2,g,h,g+p,h,.9,2.15,"window",{panes:2,rows:2})}const o=bt(1550);t(0,o,.75,o,3.15,1.72,2.92,"window",{panes:3,rows:1});{const h=lt(1006)+.95;t(0,o,h,o,h+1.3,1.72,2.92,"window",{panes:2,rows:1})}t(1,o,5.3,o,6.9,.85,2.2,"window",{panes:2,rows:2}),t(1,o,1.15,o,3.05,.95,2.15,"window",{panes:2,rows:2}),t(2,o,1.2,o,3.8,1.25,2.45,"window",{panes:3,rows:1});const a=lt(69),c=Ue[0],l=Ue[1]-Wt[1];return t(0,12.55,a,13.05,a,c+1.85,c+2.55,"window",{panes:2,rows:1}),t(1,12.55,a,13.05,a,l+1.85,l+2.55,"window",{panes:2,rows:1}),n.slice().forEach(h=>{const u=h.y1-Be[h.floor];h.floor<2&&u>.02&&n.push({...h,floor:h.floor+1,kind:"hole",y0:h.y0-Be[h.floor],y1:u})}),n}function Qx(n){const t=Te;if(n===0)return[];const e=ir[n-1],i=lt(69)-.003;return[[{x:t.x0,z:t.zP},{x:t.x1,z:t.zP},{x:t.x1,z:e.z0},{x:e.x1,z:e.z0},{x:e.x1,z:i},{x:t.x0,z:i}]]}const nc={center:{x:bt(830),z:lt(760)},spawn:[{x:bt(1290),z:lt(900),yaw:2.89},{x:bt(1186),z:lt(800),yaw:Math.PI},{x:bt(760),z:lt(720),yaw:-Math.PI/2}]},Os=.07;function tv(n,t,{box:e,makeMat:i,terrainY:s}){const r=new ve,o=i(9348276,{roughness:.18,metalness:.05,transparent:!0,opacity:.78}),a=i(3948870,{roughness:.68,metalness:.16}),c=i(14144198,{roughness:.86}),l=i(9275520,{roughness:.9}),h=i(7238776,{roughness:.84}),u=bt(616)-Os,d=lt(457)+Os,p=lt(69)+Os,g=bt(1550)+Os;function _(f){const y=Math.min(f.x0,f.x1),v=Math.max(f.x0,f.x1),x=Math.min(f.z0,f.z1),T=Math.max(f.z0,f.z1),A=f.floors,w=f.story??3.12,U=f.front??"west",E=i(f.color,{roughness:.94}),M=s(U==="west"?y:v),L=s(U==="west"?v:y),V=M+A*w,C=Math.min(M,L)-.08,F=(y+v)/2,P=(x+T)/2;e(r,F,(C+V)/2,P,v-y,V-C,T-x,E);const z=.36,O=.12,I=V+z/2;if(e(r,F,I,x+O/2,v-y,z,O,E),e(r,F,I,T-O/2,v-y,z,O,E),e(r,y+O/2,I,P,O,z,Math.max(.2,T-x-O*2),E),e(r,v-O/2,I,P,O,z,Math.max(.2,T-x-O*2),E),f.roof==="open"){for(const[Mt,Ct]of[[y+.38,x+.38],[y+.38,T-.38],[v-.38,x+.38],[v-.38,T-.38]])e(r,Mt,V+.78/2,Ct,.12,.78,.12,l);const tt=V+.78;e(r,y+.38,tt,P,.1,.1,T-x-.38*2,l),e(r,v-.38,tt,P,.1,.1,T-x-.38*2,l),e(r,F,tt,x+.38,v-y-.38*2,.1,.1,l),e(r,F,tt,T-.38,v-y-.38*2,.1,.1,l)}else e(r,F,V-.03,P,Math.max(.3,v-y-.28),.07,Math.max(.3,T-x-.28),h);const W=U==="west"?-1:1,X=U==="west"?y:v,et=T-x,gt=v-y,kt=(nt,ft,tt,Mt,Ct,wt)=>{e(r,X+W*(.025+Ct/2),ft,nt,Ct,Mt,tt,wt)};if(f.facade!==!1){const nt=Math.min(f.shutterW??2.45,et*.58),ft=2.46,tt=f.shutterShift??0;kt(P+tt,M+.06+ft/2,nt,ft,.07,a),f.awning&&e(r,X+W*(.03+.72/2),M+2.64,P+tt,.72,.07,nt+.3,c);const Mt=et>7.2?3:2,Ct=.5,wt=(et-Ct*2)/Mt,Ot=Math.min(1.12,wt*.68),J=1.26;for(let st=1;st<A;st++){const D=M+st*w+.84+J/2;for(let Pt=0;Pt<Mt;Pt++)kt(x+Ct+wt*(Pt+.5),D,Ot,J,.06,o)}}if(f.side&&gt>3){const nt=f.side==="south",ft=nt?T:x,tt=nt?1:-1,Mt=gt>7.5?2:1;for(let Ct=1;Ct<A;Ct++){const wt=M+Ct*w+.95+.55;for(let Ot=0;Ot<Mt;Ot++){const J=y+gt*(Ot+1)/(Mt+1);e(r,J,wt,ft+tt*.05,.86,1.1,.06,o)}}}const Z=V+1.4;t.colliders.push({x1:y,z1:x,x2:v,z2:x,yb:C,yt:Z},{x1:v,z1:x,x2:v,z2:T,yb:C,yt:Z},{x1:v,z1:T,x2:y,z2:T,yb:C,yt:Z},{x1:y,z1:T,x2:y,z2:x,yb:C,yt:Z})}_({x0:-.02,x1:u-.32,z0:.1,z1:lt(1006)-En-Os-.22,floors:2,story:3.2,color:11907754,roof:"open",shutterW:2.05,side:"north"}),_({x0:-.04,x1:6.55,z0:-7.2,z1:-1.78,floors:3,color:14210246,side:"south"}),_({x0:6.4,x1:g-.7,z0:-6.15,z1:-1.78,floors:2,color:13552062,facade:!1,side:"south"}),_({x0:-.04,x1:5.6,z0:-13.4,z1:-7.95,floors:2,color:14932168,side:"south"}),_({x0:-.02,x1:8.12,z0:d+.32,z1:p-.5,floors:2,color:15262681,awning:!0,shutterW:2.35,side:"south"}),_({x0:-.05,x1:7.5,z0:p+.7,z1:p+5.6,floors:3,color:14538444}),_({x0:-.05,x1:6.3,z0:p+6.4,z1:p+11.2,floors:2,color:14012358}),_({x0:-.05,x1:8.1,z0:p+12,z1:p+18.2,floors:3,color:15130836});const m=[[-26.2,-19.4,3,7.2,15196888],[-18.6,-11.2,2,6.4,14015715],[-10.4,-2.6,4,7.6,15789028],[-1.7,6.4,3,6.8,15129032],[7.3,14.6,2,7,14275528],[15.5,22.8,3,6.5,15327700],[23.6,30.8,2,7.4,13683392],[31.6,38.4,3,6.2,14604496]];for(const[f,y,v,x,T]of m)_({x0:-13.28-x,x1:-13.28,z0:f,z1:y,floors:v,color:T,front:"east",side:"north"});return _({x0:g+4.1,x1:g+10.4,z0:-1,z1:6.6,floors:2,color:13881029,side:"north"}),_({x0:g+4.4,x1:g+11.6,z0:8,z1:15.6,floors:3,color:13223097}),_({x0:g+5.2,x1:g+12.2,z0:-9.4,z1:-3.5,floors:2,color:14275787,side:"south"}),n.add(r),r}const on=new Map;function _o(n,t){const e=document.createElement("canvas");return e.width=n,e.height=t,e}function xo(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function aa(n,t){const e=new Kt(n);return e.multiplyScalar(t),`#${e.getHexString()}`}function Fn(n,t,e,i,s,r,o=1){for(let a=0;a<r;a++){const c=i()<.5?0:255;n.fillStyle=`rgba(${c},${c},${c},${s*i()})`,n.fillRect(i()*t,i()*e,o,o)}}function Mi(n,t,e,i,s,r,o,a,c){for(let l=0;l<s;l++){const h=i()*t,u=i()*e,d=r+i()*(o-r),p=i()<.55,g=(p?a:c)*(.4+i()*.6),_=n.createRadialGradient(h,u,0,h,u,d),m=p?"0,0,0":"255,255,255";_.addColorStop(0,`rgba(${m},${g})`),_.addColorStop(1,`rgba(${m},0)`),n.fillStyle=_;for(const f of[-t,0,t])for(const y of[-e,0,e])n.save(),n.translate(f,y),n.fillRect(h-d,u-d,d*2,d*2),n.restore()}}function ev(n,t,e){const i=new As(n);return i.wrapS=xn,i.wrapT=xn,i.colorSpace=be,i.anisotropy=8,i.repeat.set(1/t,1/e),i}const nv={terrazzo(n,t,e,i){n.fillStyle="#a9a7a1",n.fillRect(0,0,t,e),Mi(n,t,e,i,18,40,120,.05,.05);const s=["#f4f3ef","#e1dfd8","#c9c6bd","#77746e","#4a4845","#2b2a29","#b8ab96"];for(let r=0;r<9e3;r++){n.fillStyle=s[Math.floor(i()*s.length)];const o=.6+i()*i()*3.2;n.beginPath(),n.ellipse(i()*t,i()*e,o,o*(.6+i()*.4),i()*Math.PI,0,Math.PI*2),n.fill()}n.fillStyle="rgba(90,88,84,0.55)",n.fillRect(0,0,t,2),n.fillRect(0,0,2,e)},terrazzoDark(n,t,e,i){n.fillStyle="#4d4b48",n.fillRect(0,0,t,e);const s=["#d9d6cf","#a29e96","#2a2928","#6e6a64"];for(let r=0;r<2600;r++){n.fillStyle=s[Math.floor(i()*s.length)];const o=.5+i()*1.6;n.fillRect(i()*t,i()*e,o,o)}},cement(n,t,e,i){n.fillStyle="#8d8e8a",n.fillRect(0,0,t,e),Mi(n,t,e,i,40,30,140,.13,.1),Fn(n,t,e,i,.18,14e3),n.strokeStyle="rgba(255,255,255,0.05)",n.lineWidth=6;for(let s=0;s<14;s++){n.beginPath();const r=i()*t,o=i()*e;n.arc(r,o,60+i()*120,i()*6,i()*6+1.2),n.stroke()}},cementRough(n,t,e,i){n.fillStyle="#9a9790",n.fillRect(0,0,t,e),Mi(n,t,e,i,30,14,70,.16,.08),Fn(n,t,e,i,.28,9e3),Fn(n,t,e,i,.2,1500,2)},rubber(n,t,e,i){const r=t/2;for(let o=0;o<2;o++)for(let a=0;a<2;a++)n.fillStyle=(o+a)%2?"#6f7274":"#393b3d",n.fillRect(o*r,a*r,r,r);Fn(n,t,e,i,.22,12e3),n.fillStyle="rgba(0,0,0,0.5)";for(let o=0;o<=2;o++)n.fillRect(o*r-1,0,2,e),n.fillRect(0,o*r-1,t,2)},diamond(n,t,e,i){const s=t/2;for(let r=0;r<2;r++)for(let o=0;o<2;o++){const a=r*s,c=o*s;n.fillStyle="#ece8da",n.fillRect(a,c,s,s);const l=a+s/2,h=c+s/2,u=(p,g)=>{n.fillStyle=g,n.beginPath(),n.moveTo(l,h-p),n.lineTo(l+p,h),n.lineTo(l,h+p),n.lineTo(l-p,h),n.closePath(),n.fill()};u(s*.36,"#28539a"),u(s*.2,"#e9eef4"),u(s*.1,"#3a6fb8"),n.fillStyle="#9fae86";const d=s*.16;for(const[p,g]of[[a,c],[a+s,c],[a,c+s],[a+s,c+s]])n.beginPath(),n.moveTo(p-d,g),n.lineTo(p,g-d),n.lineTo(p+d,g),n.lineTo(p,g+d),n.closePath(),n.fill();n.strokeStyle="rgba(40,83,154,0.55)",n.lineWidth=2,n.strokeRect(a+s*.08,c+s*.08,s*.84,s*.84)}Fn(n,t,e,i,.06,3e3),n.fillStyle="#b9b4a6";for(let r=0;r<=2;r++)n.fillRect(r*s-1,0,2,e),n.fillRect(0,r*s-1,t,2)},beige(n,t,e,i){const s=t/2;for(let r=0;r<2;r++)for(let o=0;o<2;o++)n.fillStyle=aa("#d8cdbb",.96+i()*.06),n.fillRect(r*s,o*s,s,s);Mi(n,t,e,i,10,10,40,.05,.05),Fn(n,t,e,i,.06,2500),n.fillStyle="#b5aa97";for(let r=0;r<=2;r++)n.fillRect(r*s-1,0,2,e),n.fillRect(0,r*s-1,t,2)},wallTile(n,t,e,i){const s=t/2,r=e/2;for(let o=0;o<2;o++)for(let a=0;a<2;a++)n.fillStyle=aa("#f2f1ec",.97+i()*.04),n.fillRect(o*s,a*r,s,r);n.fillStyle="#c9c8c1";for(let o=0;o<=2;o++)n.fillRect(o*s-1,0,2,e),n.fillRect(0,o*r-1,t,2)},pvcWood(n,t,e,i){const r=e/6;for(let o=0;o<6;o++){n.fillStyle=aa("#e6dfd0",.98+i()*.04),n.fillRect(0,o*r,t,r);for(let a=0;a<40;a++)n.fillStyle=`rgba(140,120,95,${.12+i()*.2})`,n.fillRect(i()*t,o*r+2+i()*(r-4),1+i()*3,1+i()*1.5);for(let a=0;a<10;a++){n.strokeStyle=`rgba(150,128,96,${.05+i()*.08})`,n.lineWidth=1+i()*1.5,n.beginPath();let c=o*r+i()*r;n.moveTo(0,c);for(let l=0;l<=t;l+=32)c+=(i()-.5)*3,c=Math.min(o*r+r-2,Math.max(o*r+2,c)),n.lineTo(l,c);n.stroke()}n.fillStyle="rgba(120,104,84,0.4)",n.fillRect(0,o*r,t,2)}},stairTile(n,t,e,i){const s=t/2;for(let r=0;r<2;r++)for(let o=0;o<2;o++){const a=230+Math.floor(i()*20);n.fillStyle=`rgb(${a},${a},${a})`,n.fillRect(r*s,o*s,s,s)}Mi(n,t,e,i,10,8,30,.08,.06),Fn(n,t,e,i,.08,2500),n.fillStyle="rgba(0,0,0,0.35)";for(let r=0;r<=2;r++)n.fillRect(r*s-1,0,2,e),n.fillRect(0,r*s-1,t,2)},plaster(n,t,e,i){n.fillStyle="#efede7",n.fillRect(0,0,t,e),Mi(n,t,e,i,24,20,90,.035,.03),Fn(n,t,e,i,.04,5e3)},stained(n,t,e,i){n.fillStyle="#ecebe5",n.fillRect(0,0,t,e),Mi(n,t,e,i,16,20,80,.04,.03);for(let s=0;s<9;s++){const r=i()*t,o=e*(.15+i()*.35),a=n.createLinearGradient(0,0,0,o);a.addColorStop(0,"rgba(120,100,70,0.22)"),a.addColorStop(1,"rgba(120,100,70,0)"),n.fillStyle=a,n.fillRect(r,0,6+i()*18,o)}}};function iv(n,t=1,e=t,i=512){const s=`${n}|${t}|${e}|${i}`;if(on.has(s))return on.get(s);const r=e/t,o=_o(i,Math.round(i*r)),a=o.getContext("2d");nv[n](a,o.width,o.height,xo(n.length*7919+i));const c=ev(o,t,e);return on.set(s,c),c}function sv(n="wood"){const t=`leaf|${n}`;if(on.has(t))return on.get(t);const e=_o(128,300),i=e.getContext("2d"),s=xo(n.length*31),r=n==="light"?"#7a3b2a":"#5a271d";i.fillStyle=r,i.fillRect(0,0,128,300);for(let c=0;c<70;c++){i.strokeStyle=`rgba(${s()<.5?"0,0,0":"150,80,60"},${.08+s()*.12})`,i.lineWidth=1+s()*2,i.beginPath();let l=s()*128;i.moveTo(l,0);for(let h=0;h<=300;h+=30)l+=(s()-.5)*4,i.lineTo(l,h);i.stroke()}const o=(c,l,h,u)=>{i.strokeStyle="rgba(0,0,0,0.45)",i.lineWidth=3,i.strokeRect(c,l,h,u),i.strokeStyle="rgba(255,200,170,0.12)",i.lineWidth=2,i.strokeRect(c+3,l+3,h-6,u-6)};o(18,20,92,120),o(18,166,92,112),i.fillStyle="rgba(0,0,0,0.25)",i.fillRect(0,0,4,300),i.fillRect(124,0,4,300);const a=new As(e);return a.colorSpace=be,on.set(t,a),a}function rv(){const n="glass|pattern";if(on.has(n))return on.get(n);const t=_o(128,128),e=t.getContext("2d"),i=xo(77);e.fillStyle="#e9e3cf",e.fillRect(0,0,128,128);for(let r=0;r<160;r++)e.fillStyle=`rgba(${i()<.5?"255,255,255":"150,140,110"},${.25+i()*.3})`,e.beginPath(),e.arc(i()*128,i()*128,1+i()*4,0,Math.PI*2),e.fill();const s=new As(t);return s.colorSpace=be,s.wrapS=xn,s.wrapT=xn,s.repeat.set(3,3),on.set(n,s),s}function ov(){const n="leaf|grille";if(on.has(n))return on.get(n);const t=160,e=360,i=_o(t,e),s=i.getContext("2d"),r=xo(911);s.fillStyle="#b4b6b1",s.fillRect(0,0,t,e);const o=14,a=16,c=t-28,l=214;s.fillStyle="#4b4d4a",s.fillRect(o,a,c,l);const h=6,u=10;s.fillStyle="#c3c5c0";for(let g=0;g<=h;g++)s.fillRect(o+c*g/h-2,a,4,l);for(let g=0;g<=u;g++)s.fillRect(o,a+l*g/u-2,c,4);s.strokeStyle="rgba(0,0,0,0.35)",s.lineWidth=2,s.strokeRect(o,a,c,l);const d=(g,_,m,f)=>{s.fillStyle="#babcb7",s.fillRect(g,_,m,f),s.strokeStyle="rgba(0,0,0,0.35)",s.lineWidth=3,s.strokeRect(g,_,m,f),s.strokeStyle="rgba(255,255,255,0.35)",s.lineWidth=2,s.strokeRect(g+4,_+4,m-8,f-8)};d(14,244,t-28,46),d(14,298,t-28,46),Fn(s,t,e,r,.06,900,2),s.fillStyle="rgba(0,0,0,0.22)",s.fillRect(0,0,5,e),s.fillRect(t-5,0,5,e);const p=new As(i);return p.colorSpace=be,on.set(n,p),p}const ie=me/2,Ii=[];function Nt(n,t={}){return new nr({color:n,roughness:.86,metalness:0,side:fn,...t})}const ca=new Map;function Qe(n,t,e={},i=t){const s=`${n}|${t}|${i}|${JSON.stringify(e)}`;if(ca.has(s))return ca.get(s);const r=Nt(e.color??16777215,{roughness:.8,...e,map:iv(n,t,i)});return ca.set(s,r),r}const Se=Nt(15855593,{roughness:.94}),ic=Nt(15921386,{roughness:.93}),Pe=Nt(4858393,{roughness:.6}),ps=Nt(2039325,{roughness:.5}),ai=Nt(13949147,{roughness:.22,metalness:.85});Ii.push(ai);const sc=Nt(14014424,{roughness:.45,metalness:.25}),Ru=Nt(12965084,{transparent:!0,opacity:.38,roughness:.08,metalness:.05}),av=Nt(15987953,{transparent:!0,opacity:.82,roughness:.5}),rc=Nt(16777215,{map:rv(),transparent:!0,opacity:.9,roughness:.35}),cv=Nt(15129016,{transparent:!0,opacity:.85,roughness:.45}),Cu=Nt(10988198,{roughness:.55,metalness:.35}),Pu=Nt(14210510,{roughness:.55}),Lu=Nt(13157564,{roughness:.58}),Du=Nt(13947080,{roughness:.5}),Oc=Nt(6185832,{roughness:.35,metalness:.7}),Iu=Nt(11569733,{roughness:.4,metalness:.65}),Si=Nt(12962254,{roughness:.32,metalness:.72});Ii.push(Cu,Pu,Lu,Du,Oc,Iu,Si);const vh={terrazzo:()=>Qe("terrazzo",1,{roughness:.42}),rubber:()=>Qe("rubber",1,{roughness:.96}),cement:()=>Qe("cement",2.6,{roughness:.5}),cementRough:()=>Qe("cementRough",1.3,{roughness:.95}),diamond:()=>Qe("diamond",.6,{roughness:.35}),beige:()=>Qe("beige",.6,{roughness:.4}),stairBeige:()=>Qe("stairTile",.6,{color:14135434,roughness:.4}),stairDark:()=>Qe("stairTile",.6,{color:14135434,roughness:.4})},cs=14464150,Uu=Nt(2893346,{roughness:.48}),Gr=[cs,cs,cs,cs],Mh=[cs,cs];function lv(){const n=document.createElement("canvas");n.width=32,n.height=128;const t=n.getContext("2d");for(let i=0;i<128;i+=6)t.fillStyle=i%12===0?"#5c656c":"#7d868d",t.fillRect(0,i,32,6);const e=new As(n);return e.wrapS=xn,e.wrapT=xn,e.repeat.set(3,6),e.colorSpace=be,e}function Jr(n){const t=new Ac;t.moveTo(n[0].x,n[0].z);for(let e=1;e<n.length;e++)t.lineTo(n[e].x,n[e].z);return t.closePath(),t}function Nu(n,t){const e=new go(n);return e.rotateX(Math.PI/2),e.translate(0,t,0),e}function Fu(n,t,e,i,s){return Nu(Jr([{x:n,z:t},{x:e,z:t},{x:e,z:i},{x:n,z:i}]),s)}function io(n,t,e,i){const s=n.attributes.uv,r=[[i,e],[i,e],[t,i],[t,i],[t,e],[t,e]];for(let o=0;o<6;o++)for(let a=0;a<4;a++){const c=o*4+a;s.setXY(c,s.getX(c)*r[o][0],s.getY(c)*r[o][1])}return n}function ht(n,t,e,i,s,r,o,a,c={}){if(s<=.001||r<=.001||o<=.001)return null;const l=io(new We(s,r,o),s,r,o),h=new Ht(l,a);return h.position.set(t,e,i),c.rotY&&(h.rotation.y=c.rotY),h.castShadow=c.shadow!==!1,h.receiveShadow=!0,n.add(h),h}function hr(n,t,e,i,s,r=10){const o=new N().subVectors(e,t),a=o.length();if(a<1e-4)return null;const c=new Ht(new Fi(i,i,a,r),s);return c.position.copy(t).addScaledVector(o,.5),c.quaternion.setFromUnitVectors(new N(0,1,0),o.normalize()),c.castShadow=!0,n.add(c),c}function Zs(n,t,e,i,s,r,o,a,c,l=.004){const h=s-i,u=o-r;if(h<.01||u<.01)return;const d=new lr(h,u),p=d.attributes.uv;for(let m=0;m<p.count;m++)p.setXY(m,p.getX(m)*h+i,p.getY(m)*u+r);const g=new Ht(d,c),_=(i+s)/2;t==="x"?(g.position.set(e+a*l,(r+o)/2,_),g.rotation.y=a>0?Math.PI/2:-Math.PI/2):(g.position.set(_,(r+o)/2,e+a*l),g.rotation.y=a>0?0:Math.PI),g.receiveShadow=!0,n.add(g)}function vo(n,t,e,i,s,r){const o=s-e,a=r-i,c=o*o+a*a;if(c<1e-8)return Math.hypot(n-e,t-i);let l=((n-e)*o+(t-i)*a)/c;return l=Math.max(0,Math.min(1,l)),Math.hypot(n-(e+o*l),t-(i+a*l))}function ls(n,t,e){let i=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const o=e[s].x,a=e[s].z,c=e[r].x,l=e[r].z;a>t!=l>t&&n<(c-o)*(t-a)/(l-a+1e-12)+o&&(i=!i)}return i}function Gn(n){const t=n.x2-n.x1,e=n.z2-n.z1,i=Math.hypot(t,e)||1;return{ux:t/i,uz:e/i,len:i}}function Tn(n,t){const{ux:e,uz:i}=Gn(n);return{x:n.x1+e*t,z:n.z1+i*t}}function hv(n,t,e,i,s,r,o,a){const c=e-n,l=i-t,h=Math.hypot(c,l)||1,u=-l/h*(a/2),d=c/h*(a/2),p=[],g=(E,M,L)=>p.push(E,M,L),_=[n+u,s,t+d],m=[e+u,s,i+d],f=[e+u,o,i+d],y=[n+u,r,t+d],v=[n-u,s,t-d],x=[e-u,s,i-d],T=[e-u,o,i-d],A=[n-u,r,t-d],w=(E,M,L,V)=>{g(...E),g(...M),g(...L),g(...E),g(...L),g(...V)};w(_,m,f,y),w(x,v,A,T),w(v,_,y,A),w(m,x,T,f),w(y,f,T,A),w(v,x,m,_);const U=new Ne;return U.setAttribute("position",new oe(p,3)),U.computeVertexNormals(),U}function yh(n,t,e,i,s,r,o,a,c,l){const h=s-e,u=r-i,d=Math.hypot(h,u);if(d<.05)return;const p=h/d,g=u/d,_=Math.abs(p)<.5?"x":"z",m=_==="x"?e:i,f=_==="x"?i:e,y=Math.sign(_==="x"?g:p);c.forEach(T=>{const A=f+y*T.a,w=f+y*T.b;n.openings.push({axis:_,c:m,s0:Math.min(A,w),s1:Math.max(A,w),y0:o+T.y0,y1:o+(T.wallY1??T.y1)}),T.kind!=="door"&&T.kind!=="hole"?n.colliders.push({x1:e+p*T.a,z1:i+g*T.a,x2:e+p*T.b,z2:i+g*T.b,yb:o+T.y0,yt:o+T.y1}):T.closed&&n.colliders.push({x1:e+p*T.a,z1:i+g*T.a,x2:e+p*T.b,z2:i+g*T.b,yb:o+T.y0,yt:o+T.y1})});const v=[0,d];c.forEach(T=>v.push(Math.max(0,T.a),Math.min(d,T.b))),v.sort((T,A)=>T-A);const x=v.filter((T,A,w)=>A===0||T-w[A-1]>.02);for(let T=0;T<x.length-1;T++){const A=x[T],w=x[T+1];if(w-A<.04)continue;const U=(A+w)/2,E=c.filter(C=>C.a<U&&C.b>U),M=a(A),L=a(w);let V=[[o,null]];for(const C of E){const F=[];for(const P of V){const z=P[1]==null?Math.max(M,L)+1:P[1],O=P[0],I=o+C.y0,W=o+(C.wallY1??C.y1);if(W<=O||I>=z){F.push(P);continue}I>O&&F.push([O,I]),W<z&&F.push([W,P[1]])}V=F}for(const[C,F]of V){const P=F==null,z=P?M:F,O=P?L:F;if(Math.min(z,O)-C<.02)continue;const I=hv(e+p*A,i+g*A,e+p*w,i+g*w,C,z,O,me),W=new Ht(I,l);W.castShadow=!0,W.receiveShadow=!0,t.add(W),n.colliders.push({x1:e+p*A,z1:i+g*A,x2:e+p*w,z2:i+g*w,yb:C,yt:Math.max(z,O)})}}}function uv(n){if(n==="grille"){const e=Nt(10988198,{roughness:.55,metalness:.35});Ii.push(e);const i=Nt(16777215,{map:ov(),roughness:.55,metalness:.3});return Ii.push(i),[e,e,e,e,i,i]}const t=Nt(16777215,{map:sv("wood"),roughness:.62});return[Pe,Pe,Pe,Pe,t,t]}function fv(n,t,e,i,s=Oc){for(const l of[.22,.78]){const h=new Ht(new Fi(.014,.014,.11,10),s);h.position.set(-t/2+.022,-e/2+e*l,i/2+.012),n.add(h);const u=h.clone();u.position.z=-.032,n.add(u)}const r=-e/2+Math.min(1.02,e*.52),o=new Ht(new We(.028,.07,i+.01),s);o.position.set(t/2-.012,r,0),n.add(o);const a=new Ht(new We(.08,.014,.016),s);a.position.set(t/2-.055,r,i/2+.01),n.add(a);const c=a.clone();c.position.z=-.03,n.add(c)}function Ou(n,t,e,i,s,r=!1){const{ux:o,uz:a}=Gn(e),c=Math.abs(o)<.5,l=me+.03,h=s+i.y0,u=s+i.y1,d=.05,p=I=>Tn(e,I),g=Math.atan2(-a,o),_=p(i.a+d/2),m=p(i.b-d/2),f=u+(i.transom?qs:0),y=i.leaf==="plain"?Du:i.leaf==="grille"?Cu:i.leaf==="steel"?Si:Pe;ht(n,_.x,(h+f)/2,_.z,d,f-h,l,y,{rotY:g}),ht(n,m.x,(h+f)/2,m.z,d,f-h,l,y,{rotY:g});const v=p((i.a+i.b)/2),x=i.b-i.a;if(ht(n,v.x,u+.025,v.z,x,.05,l,y,{rotY:g}),i.transom&&(ht(n,v.x,f-.025,v.z,x,.05,l,Pe,{rotY:g}),ht(n,v.x,(u+f)/2,v.z,.035,qs-.05,.05,Pe,{rotY:g}),ht(n,v.x,(u+f)/2,v.z,x-.1,qs-.1,.012,cv,{rotY:g,shadow:!1})),!i.leaf)return;const T=x-d*2-.01,A=u-h-.03,w=.04,U=i.hinge==="a",E=p(U?i.a+d:i.b-d),M=U?{x:o,z:a}:{x:-o,z:-a},L=c?{x:i.swing||1,z:0}:{x:0,z:i.swing||1},V=r?0:i.open??1.5,C=-M.z*L.x+M.x*L.z>=0?.02:-.02,F=new ve;F.position.set(E.x,h+.01,E.z),n.add(F);const P=new ve;if(P.position.set(T/2,A/2,C),F.add(P),i.leaf==="glass")ht(P,-T/2+.07/2,0,0,.07,A,w,Pe),ht(P,T/2-.07/2,0,0,.07,A,w,Pe),ht(P,0,A/2-.07/2,0,T,.07,w,Pe),ht(P,0,-A/2+.17,0,T,.34,w,Pe),ht(P,0,.17,0,T-.07*2,A-.34-.07,.01,rc,{shadow:!1});else if(i.leaf==="bars"){const I=Nt(14211798,{roughness:.32,metalness:.78});Ii.push(I);const W=.02,X=.03;ht(P,0,A/2-X/2,0,T,X,W,I),ht(P,0,-A/2+X/2,0,T,X,W,I),ht(P,0,A*.06,0,T,.02,W,I),ht(P,-T/2+X/2,0,0,X,A,W,I),ht(P,T/2-X/2,0,0,X,A,W,I);const et=7,gt=T-X*2,kt=A-X*2;for(let Z=0;Z<et;Z++){const nt=-gt/2+gt*(Z+.5)/et;ht(P,nt,0,0,.014,kt,.014,I)}}else if(i.leaf==="plain")ht(P,0,0,0,T,A,w,Pu),ht(P,0,.02,w/2+.003,T*.72,A*.62,.008,Lu);else if(i.leaf==="wc"){const W=-A*.16;ht(P,-T/2+.055/2,0,0,.055,A,w,Pe),ht(P,T/2-.055/2,0,0,.055,A,w,Pe),ht(P,0,A/2-.055/2,0,T,.055,w,Pe),ht(P,0,-A/2+.055/2,0,T,.055,w,Pe),ht(P,0,W,0,T,.07,w,Pe);const X=A/2-W-.055-.02,et=(A/2-.055/2+W)/2;ht(P,0,et,0,T-.055*2,X,.008,rc,{shadow:!1});const gt=W+A/2-.055-.02,kt=(-A/2+.055/2+W)/2;ht(P,0,kt,0,T-.055*2,gt,w*.7,Pe)}else i.leaf==="steel"?(ht(P,0,0,0,T,A,w*.72,Si),ht(P,-T/2+.05/2,0,0,.05,A,w,Si),ht(P,T/2-.05/2,0,0,.05,A,w,Si),ht(P,0,A/2-.05/2,0,T,.05,w,Si),ht(P,0,-A/2+.05/2,0,T,.05,w,Si)):ht(P,0,0,0,T,A,w,uv(i.leaf));if(fv(P,T,A,w,i.leaf==="wc"?Iu:Oc),i.grille){const I={x:-M.x*Math.cos(1.45)-L.x*Math.sin(1.45),z:-M.z*Math.cos(1.45)-L.z*Math.sin(1.45)},W=p(U?i.b-d:i.a+d),X=new ve;X.position.set(W.x+I.x*(T/2),h+A/2+.02,W.z+I.z*(T/2)),X.rotation.y=Math.atan2(-I.z,I.x),n.add(X);const et=Nt(15921902,{roughness:.5,metalness:.2});ht(X,0,A/2-.015,0,T,.03,.03,et),ht(X,0,-A/2+.015,0,T,.03,.03,et),ht(X,0,0,0,T,.025,.02,et);for(let gt=0;gt<=7;gt++)ht(X,-T/2+T*gt/7,0,0,.016,A,.016,et)}const z={x1:E.x,z1:E.z,x2:E.x,z2:E.z,yb:h,yt:h+A};t.colliders.push(z);const O={leaf:P,hingePt:E,closedDir:M,side:L,leafW:T,y0:h,y1:u,ax:E.x,az:E.z,bx:E.x+M.x*T,bz:E.z+M.z*T,angle:V,target:V,openTheta:r?1.45:i.open??1.5,collider:z,setAngle(I){const W=Math.cos(I),X=Math.sin(I),et=M.x*W+L.x*X,gt=M.z*W+L.z*X;F.rotation.y=Math.atan2(-gt,et),z.x2=E.x+et*T,z.z2=E.z+gt*T,this.angle=I},tick(I){const W=this.target-this.angle;if(Math.abs(W)<.001){this.angle!==this.target&&this.setAngle(this.target);return}this.setAngle(this.angle+Math.sign(W)*Math.min(Math.abs(W),2.4*I))},distanceTo(I,W){return vo(I,W,this.ax,this.az,this.bx,this.bz)},toggle(){this.target=this.target>this.openTheta*.45?0:this.openTheta}};O.setAngle(V),P.traverse(I=>{I.userData.door=O}),t.doors.push(O)}function dv(n,t,e,i){const{ux:s,uz:r}=Gn(t),o=Math.atan2(-r,s),a=x=>Tn(t,x),c=i+e.y0,l=i+e.y1,h=e.b-e.a,u=.055,d=.09,p=a((e.a+e.b)/2),g=e.frame==="wood"?Pe:sc;ht(n,p.x,c+u/2,p.z,h,u,d,g,{rotY:o}),ht(n,p.x,l-u/2,p.z,h,u,d,g,{rotY:o});const _=a(e.a+u/2),m=a(e.b-u/2);ht(n,_.x,(c+l)/2,_.z,u,l-c,d,g,{rotY:o}),ht(n,m.x,(c+l)/2,m.z,u,l-c,d,g,{rotY:o});const f=e.cols||2,y=e.rows||2;for(let x=1;x<f;x++){const T=a(e.a+h*x/f);ht(n,T.x,(c+l)/2,T.z,.035,l-c,.06,g,{rotY:o})}const v=(l-c)/y;for(let x=1;x<y;x++)ht(n,p.x,c+v*x,p.z,h,.035,.06,g,{rotY:o});for(let x=0;x<y;x++){const A=(e.glass&&e.glass[x]||"clear")==="pattern"?rc:Ru;ht(n,p.x,c+v*(x+.5),p.z,h-u*2,v-.04,.008,A,{rotY:o,shadow:!1})}if(e.bars){const x=Nt(15987695,{roughness:.5}),T=Math.max(2,Math.round(h/.12));for(let A=1;A<T;A++){const w=a(e.a+h*A/T);ht(n,w.x,(c+l)/2,w.z,.018,l-c,.018,x,{rotY:o})}}}function pv(n,t,e,i,s,r,o){const{ux:a,uz:c}=Gn(t),l=Math.atan2(-c,a),h=_=>Tn(t,_),u=h((e+i)/2),d=o.glass==="frosted"?av:Ru;ht(n,u.x,(s+r)/2,u.z,i-e,r-s,.03,d,{rotY:l,shadow:!1});const p=o.panes||1,g=o.rows||1;for(let _=0;_<=p;_++){const m=Math.min(i-.0225,Math.max(e+.0225,e+(i-e)*_/p)),f=h(m);ht(n,f.x,(s+r)/2,f.z,.045,r-s,.07,sc,{rotY:l})}for(let _=0;_<=g;_++){const m=Math.min(r-.025,Math.max(s+.025,s+(r-s)*_/g));ht(n,u.x,m,u.z,i-e,.05,.07,sc,{rotY:l})}if(o.bars){const _=Nt(15987695,{roughness:.5}),m=Math.max(2,Math.round((i-e)/.12));for(let f=1;f<m;f++){const y=h(e+(i-e)*f/m);ht(n,y.x,(s+r)/2,y.z,.018,r-s,.018,_,{rotY:l})}}}function zu(n){const t=document.createElement("canvas");t.width=8,t.height=48;const e=t.getContext("2d"),i=new Kt(n);e.fillStyle=`#${i.getHexString()}`,e.fillRect(0,0,8,48),e.fillStyle="rgba(255,255,255,0.42)";for(let r=0;r<48;r+=6)e.fillRect(0,r,8,2);e.fillStyle="rgba(0,0,0,0.45)";for(let r=4;r<48;r+=6)e.fillRect(0,r,8,2);const s=new As(t);return s.wrapS=xn,s.wrapT=xn,s.repeat.set(1,18),s.colorSpace=be,new nr({map:s,color:16777215,roughness:.55,metalness:.12})}function la(n,t,e,i,s,r,o,a,c=.05){const l=i-t,h=s-e,u=Math.hypot(l,h);return u<.02||o-r<.02?null:ht(n,(t+i)/2,(r+o)/2,(e+s)/2,u,o-r,c,a,{rotY:Math.atan2(-h,l)})}function mv(n,t,e,i,s){const r=Tn(t,e-.08),o=Tn(t,i+.08),a=(r.x+o.x)/2,c=(r.z+o.z)/2,{ux:l,uz:h}=Gn(t);let u=-h,d=l;ls(a+u*.4,c+d*.4,Le)&&(u=-u,d=-d);const p=Math.hypot(o.x-r.x,o.z-r.z),g=.46;ht(n,a+u*g*.45,s+.08,c+d*g*.45,p,.1,g,Nt(12038824),{rotY:Math.atan2(-h,l)})}function gv(n,t,e,i,s,r){const o=zu(i.color==="gold"?12882490:10722964),a=Tn(e,i.a),c=Tn(e,i.b),l=c.x-a.x,h=c.z-a.z,u=Math.hypot(l,h),d=r-s,p=Math.atan2(-h,l),g=Nt(14263585,{roughness:.5,metalness:.2});la(n,a.x+.06,a.z-.04,a.x+.06,a.z+.04,s,r,g,.06),la(n,c.x+.06,c.z-.04,c.x+.06,c.z+.04,s,r,g,.06),la(n,a.x+.2,a.z,c.x+.2,c.z,r,r+.32,Nt(6181192,{roughness:.5,metalness:.3}),.3);const _=new ve;_.position.set((a.x+c.x)/2,r,(a.z+c.z)/2),_.rotation.y=p,n.add(_);const m=ht(_,0,-d/2,0,u,d,.08,o),f={x1:a.x,z1:a.z,x2:c.x,z2:c.z,yb:s,yt:r};t.colliders.push(f);const y={leaf:_,shutter:!0,y0:s,y1:r,ax:a.x,az:a.z,bx:c.x,bz:c.z,angle:0,target:0,openTheta:1,collider:f,setOpen(v){const x=Math.max(.02,1-v);m.scale.y=x,m.position.y=-(d*x)/2,f.yt=v>.98?s:s+d*x,this.angle=v},tick(v){const x=this.target-this.angle;if(Math.abs(x)<.001){this.angle!==this.target&&this.setOpen(this.target);return}this.setOpen(this.angle+Math.sign(x)*Math.min(Math.abs(x),1.4*v))},distanceTo(v,x){return vo(v,x,this.ax,this.az,this.bx,this.bz)},toggle(){this.target=this.target>this.openTheta*.45?0:this.openTheta}};y.setOpen(0),_.traverse(v=>{v.userData.door=y}),t.doors.push(y)}function _v(n){const t=Math.min(lt(457),lt(1006))+.06,e=Math.max(lt(457),lt(1006))-.06,i=.45,s=2.5,r=Wt[1]-.03;ht(n,-i*.42,(s+r)/2,(t+e)/2,i,r-s,e-t,zu(3115634))}function xv(n,t,e,i,s){const r=s+i.y0,o=s+i.y1;if(i.kind==="door"){Ou(n,t,e,{...i,transom:!1,open:0},s,!0),i.canopy&&mv(n,e,i.a,i.b,o);return}if(!(i.kind==="open"||i.kind==="hole")){if(i.kind==="shutter"){gv(n,t,e,i,r,o);return}pv(n,e,i.a,i.b,r,o,i)}}function vv(n,t,e){const{ux:i,uz:s,len:r}=Gn(n),o=[];return e.forEach(a=>{if(a.floor!==t)return;const c=(a.x1+a.x2)/2,l=(a.z1+a.z2)/2;if(Math.abs((c-n.x1)*s-(l-n.z1)*i)>.22)return;let u=(a.x1-n.x1)*i+(a.z1-n.z1)*s,d=(a.x2-n.x1)*i+(a.z2-n.z1)*s;d<u&&([u,d]=[d,u]),!(d<.05||u>r-.05)&&(u=Math.max(0,u),d=Math.min(r,d),!(d-u<.2)&&o.push({...a,a:u,b:d}))}),o}function Mv(n,t){const e=(n.x1+n.x2)/2,i=(n.z1+n.z2)/2,s=Le.reduce((l,h)=>Math.min(l,h.z),1/0),r=Le.reduce((l,h)=>Math.max(l,h.z),0),o=Le.reduce((l,h)=>Math.max(l,h.x),0),a=bt(616),c=lt(1006);return e<.25?Nt(15131096):i<s+.3?Nt(13617599):e>o-.3?Nt(t===0?13157562:8026740):Math.abs(e-a)<.3&&i<c+.25?Nt(14012616):i>r-.3?Nt(13157564):Nt(14012616)}function Bu(n){const t=[];for(let e=0;e<n.length;e++){const i=n[e],s=n[(e+1)%n.length];t.push({x1:i.x,z1:i.z,x2:s.x,z2:s.z})}return t}function is(n,t,e,i,s,r,o=.004){[{axis:"z",c:e.z0,s0:e.x0,s1:e.x1,n:1},{axis:"z",c:e.z1,s0:e.x0,s1:e.x1,n:-1},{axis:"x",c:e.x0,s0:e.z0,s1:e.z1,n:1},{axis:"x",c:e.x1,s0:e.z0,s1:e.z1,n:-1}].forEach(c=>so(n,t,c,i,s,r,o))}function so(n,t,e,i,s,r,o=.004){const a=e.s0+(e.inset0??ie),c=e.s1-(e.inset1??ie),l=t.openings.filter(d=>d.axis===e.axis&&Math.abs(d.c-e.c)<.05&&d.s1>a&&d.s0<c&&d.y1>i&&d.y0<s),h=[a,c];l.forEach(d=>h.push(Math.max(a,d.s0),Math.min(c,d.s1))),h.sort((d,p)=>d-p);const u=e.c+e.n*ie;for(let d=0;d<h.length-1;d++){const p=h[d],g=h[d+1];if(g-p<.01)continue;const _=(p+g)/2;let m=[[i,s]];l.filter(f=>f.s0<_&&f.s1>_).forEach(f=>{const y=[];m.forEach(([v,x])=>{f.y1<=v||f.y0>=x?y.push([v,x]):(f.y0>v&&y.push([v,f.y0]),f.y1<x&&y.push([f.y1,x]))}),m=y}),m.forEach(([f,y])=>Zs(n,e.axis,u,p,g,f,y,e.n,r,o))}}function ku(n){return Qe("stairTile",.6,{color:n,roughness:.4})}function yv(n,t,e){const i=Math.sign(e.zt-e.zb),s=Math.abs(e.zt-e.zb),r=e.n-1,o=s/r,a=e.rise/e.n,c=e.x1-e.x0,l=(e.x0+e.x1)/2,h=ku(e.color),u=i<0,d=[Se,Se,h,Se,u?h:Se,u?Se:h],p=[];for(let g=0;g<r;g++){const _=e.zb+i*g*o,m=_+i*o/2,f=e.yb+(g+1)*a,y=e.solid?e.base:f-a-.005,v=f-y,x=io(new We(c,v,o+.002),c,v,o),T=new Ht(x,d);T.position.set(l,(f+y)/2,m),T.castShadow=!0,T.receiveShadow=!0,n.add(T),p.push(T);const A=.036,w=_-i*.016,U=ht(n,l,f-.008,w+i*(A/2),c,.016,A,Uu,{shadow:!1});U&&p.push(U)}{const g=e.yb+a,_=e.yb+r*a,m=Math.hypot(s,_-g),f=Math.atan2(_-g,s),y=new Ht(new We(.012,.08,m),ps);y.position.set(e.wallX-e.wallSide*.01,(g+_)/2+.04,(e.zb+e.zt)/2),y.rotation.x=i>0?-f:f,y.castShadow=!1,n.add(y),p.push(y)}if(!e.solid){const g=r*a,_=Math.hypot(s,g),m=Math.atan2(g,s),f=.15,y=new Ht(new We(c,f,_),Se),v=(e.zb+e.zt)/2,x=e.yb+g/2;y.position.set(l,x-f/2*Math.cos(m),v+i*(f/2)*Math.sin(m)),y.rotation.x=i>0?-m:m,y.castShadow=!0,y.receiveShadow=!0,n.add(y),p.push(y)}return p.forEach(g=>{g.userData.roomId=e.roomId,t.pickables.push(g)}),t.surfaces.push({x0:e.x0,x1:e.x1,z0:Math.min(e.zb,e.zt),z1:Math.max(e.zb,e.zt),thick:e.solid?99:.35,h:(g,_)=>e.yb+Math.abs(_-e.zb)/s*e.rise}),{t:o,r:a,dir:i,treads:r}}const ys=.9,Sv=.022,Hu=.008;function sr(n,t,e,i){const s=e+ys+.018;hr(n,new N(t,e,i),new N(t,s,i),.026,ai,16);const r=new Ht(new Fi(.04,.046,.014,16),ai);r.position.set(t,e+.007,i),r.castShadow=!0,n.add(r);const o=new Ht(new Cc(.048,20,14),ai);o.position.set(t,s+.04,i),o.castShadow=!0,n.add(o)}function Vu(n,t,e,i,s,r=.026){const o=r*.55;for(const a of[-1,1]){const c=new Ht(new Pc(r,.0036,8,18),ai);s==="z"?(c.position.set(t,e,i+a*o),c.rotation.y=Math.PI/2):c.position.set(t+a*o,e,i),n.add(c)}}function zc(n,t,e){hr(n,new N(t.x,t.y+ys,t.z),new N(e.x,e.y+ys,e.z),Sv,ai,14)}function Gu(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=Math.hypot(i,s),o=Math.abs(i)>=Math.abs(s)?"x":"z",a=Math.max(2,Math.round(r/.11));let c=0;for(let l=1;l<a;l++){const h=l/a,u=t.x+i*h,d=t.z+s*h,p=t.y+(e.y-t.y)*h;Math.hypot(u-t.x,d-t.z)<.05||Math.hypot(u-e.x,d-e.z)<.05||(hr(n,new N(u,p,d),new N(u,p+ys-.012,d),Hu,ai,8),c++,(c%4===2||r<.2&&c===1)&&Vu(n,u,p+ys*.58,d,o,r<.2?.018:.026))}}function Ev(n,t,e){const i=(e-n.zb)*t.dir,s=Math.abs(n.zt-n.zb);if(i>=s-.02)return n.yb+n.rise;if(i<=.02)return n.yb+t.r;const r=Math.min(t.treads-1,Math.floor(i/t.t));return n.yb+(r+1)*t.r}function bv(n,t,e){const i=Te,s=t.wallSide<0?i.xm-i.well-.03:i.xm+i.well+.03,r=i.zL+.05,o=Math.abs(t.zb-i.zL)<Math.abs(t.zt-i.zL),a=o?t.yb:t.yb+t.rise,c=Math.abs(t.yb+t.rise-Wt[2])<.05;let l=o?t.zt-e.dir*.05:t.zb+e.dir*.05,h=o?t.yb+e.treads*e.r:t.yb+e.r,u=!0;c&&(l=i.zP+.03,h=Wt[2],u=!1);const d={x:s,y:h,z:l};zc(n,d,{x:s,y:a,z:r}),u&&sr(n,d.x,d.y,d.z);const g=Math.min(l,r),_=Math.max(l,r),m=Math.max(2,Math.round((_-g)/.11));let f=0;for(let y=1;y<m;y++){const v=g+(_-g)*y/m;if(Math.abs(v-l)<.06||Math.abs(v-r)<.06)continue;const x=(v-l)/(r-l||1),T=h+(a-h)*x+ys,A=Math.min(Ev(t,e,v),T-.35);hr(n,new N(s,A,v),new N(s,T-.012,v),Hu,ai,8),f++,f%4===2&&Vu(n,s,A+(T-A)*.58,v,"z")}}function Tv(n,t){const e=Te,i=e.xm-e.well-.03,s=e.xm+e.well+.03,r=e.zL+.05;sr(n,i,t,r),sr(n,s,t,r);const o={x:i,y:t,z:r},a={x:s,y:t,z:r};zc(n,o,a),Gu(n,o,a)}function wv(n,t,e,i,s){const r={x:t,y:s,z:i},o={x:e,y:s,z:i};sr(n,t,s,i),sr(n,e,s,i),zc(n,r,o),Gu(n,r,o)}function Av(n,t){const e=Te,i=e.well,s={x0:e.x0,x1:e.xm-i,wallX:e.x0,wallSide:-1},r={x0:e.xm+i,x1:e.x1,wallX:e.x1,wallSide:1},o=Ue[0],a=Ue[1];[{...s,group:n[0],zb:e.zStart,zt:e.zL,yb:Wt[0],rise:o-Wt[0],n:Hs,solid:!0,base:Wt[0],color:Gr[0],roomId:"f1-stair"},{...r,group:n[0],zb:e.zL,zt:e.zP,yb:o,rise:Wt[1]-o,n:Hs,color:Gr[1],roomId:"f1-stair"},{...s,group:n[1],zb:e.zP,zt:e.zL,yb:Wt[1],rise:a-Wt[1],n:Hs,color:Gr[2],roomId:"f2-stair"},{...r,group:n[1],zb:e.zL,zt:e.zP,yb:a,rise:Wt[2]-a,n:Hs,color:Gr[3],roomId:"f2-stair"}].forEach(h=>{const u=yv(h.group,t,h);bv(h.group,h,u)}),[{y:o,group:n[0],color:Mh[0],roomId:"f1-stair",zA:e.zL},{y:a,group:n[1],color:Mh[1],roomId:"f2-stair",zA:e.zL}].forEach(h=>{const d=e.x1-e.x0,p=e.z1-h.zA,g=ku(h.color),_=io(new We(d,.18,p),d,.18,p),m=new Ht(_,[Se,Se,g,Se,Se,g]);m.position.set((e.x0+e.x1)/2,h.y-.18/2,(h.zA+e.z1)/2),m.castShadow=!0,m.receiveShadow=!0,h.group.add(m),m.userData.roomId=h.roomId,t.pickables.push(m),t.surfaces.push({x0:e.x0,x1:e.x1,z0:h.zA,z1:e.z1,thick:.18,h:()=>h.y}),Zs(h.group,"z",e.z1,e.x0,e.x1,h.y,h.y+.1,-1,ps,.006),Zs(h.group,"x",e.x0,h.zA,e.z1,h.y,h.y+.1,1,ps,.006),Zs(h.group,"x",e.x1,h.zA,e.door[0]-.03,h.y,h.y+.1,-1,ps,.006)});function l(h,u,d,p,g,_,m,f,y){const v=d-u,x=g-p,T=m-_;if(v<.02||x<.02||T<.02)return;const A=new Ht(io(new We(v,x,T),v,x,T),f);A.position.set((u+d)/2,(p+g)/2,(_+m)/2),A.castShadow=!0,A.receiveShadow=!0,A.userData.roomId=y,h.add(A),t.pickables.push(A)}l(n[0],e.x0,e.x1,Wt[0],o-.16,e.zL,e.z1,Se,"f1-stair"),[{group:n[0],y1:o,room:"f1-stair"},{group:n[1],y1:a,room:"f2-stair"}].forEach(h=>{const u=ht(h.group,(e.x0+e.x1)/2,h.y1-.008,e.zL-.002,e.x1-e.x0,.016,.036,Uu,{shadow:!1});u&&(u.userData.roomId=h.room,t.pickables.push(u)),Tv(h.group,h.y1)}),wv(n[2],e.x0+.03,e.xm+i+.03,e.zP+.03,Wt[2]),t.colliders.push({x1:e.x0,z1:e.zP,x2:e.xm,z2:e.zP,yb:Wt[2]-.5,yt:Wt[2]+1}),t.colliders.push({x1:e.xm,z1:e.zStart+.02,x2:e.xm,z2:e.zL-.02,yb:-1,yt:Wt[2]+1.2})}function Rv(n,t,e){const i=Qe("wallTile",.5,{roughness:.25},.66);ir.forEach((c,l)=>{const h=n[l],u=.15,d=c.x1-c.x0,p=c.z1-c.z0;ht(h,(c.x0+c.x1)/2,c.floorY-u/2,(c.z0+c.z1)/2,d,u,p,Se),e.surfaces.push({x0:c.x0,x1:c.x1,z0:c.z0,z1:c.z1,thick:u,h:()=>c.floorY});const g=Nt(10263188,{roughness:.5}),[_,m]=Te.door;ht(h,(Te.x1+c.x0)/2,c.floorY-.04,(_+m)/2,c.x0-Te.x1+.02,.08,m-_,g),e.surfaces.push({x0:Te.x1-.02,x1:c.x0+.02,z0:_,z1:m,thick:.08,h:()=>c.floorY});const f={x0:c.x0-ie,x1:c.x1+ie,z0:c.z0-ie,z1:c.z1+ie};is(h,e,f,c.floorY,c.floorY+1.8,i,.005);const y=c.zFill??c.z0,v=l===0?n[1]:t[2];if(ht(v,(c.x0+c.x1)/2,c.ceilY+.04,(y+c.z1)/2,d,.08,c.z1-y,Se),c.soffit){const x=c.floorY+2.45;ht(v,(c.x0+c.x1)/2,(x+c.ceilY)/2,c.z0+c.soffit/2,d,c.ceilY-x,c.soffit,Se)}l===1&&ht(n[2],(c.x0+c.x1)/2,(Wt[2]+c.ceilY)/2,(c.zFill+c.z0-ie)/2,d,c.ceilY-Wt[2],c.z0-ie-c.zFill,Se),Sh(h,c.floorY,c.x1-.78,(c.z0+c.z1)/2,c.x1,16053746)});const s=bt(616)-ie,r=(lt(1006)+ie+lt(876)-ie)/2,o=Wt[1],a=1.05;ht(n[1],s-a/2,o+.07,r,a,.14,lt(876)-ie-(lt(1006)+ie),Nt(14015446,{roughness:.55})),Sh(n[1],o+.14,s-.58,r,s,15914122)}function Sh(n,t,e,i,s,r){const o=Nt(16251126,{roughness:.32}),a=Nt(2895924,{roughness:.5}),c=Nt(r,{roughness:.4}),l=Nt(16250869,{roughness:.35});ht(n,e,t+.04,i,.52,.08,.38,o);const h=new Ht(new Fi(.075,.075,.02,16),a);h.scale.set(1.55,1,1.15),h.position.set(e-.02,t+.085,i),n.add(h);const u=s-.08,d=t+1.02;ht(n,u,d,i,.15,.34,.4,c),ht(n,u-.01,d+.185,i,.16,.03,.42,c),ht(n,u-.09,d-.02,i,.02,.05,.07,c);const p=d-.17,g=t+.06,_=u-.1;ht(n,_,(p+g)/2,i,.045,p-g,.045,l)}function Eh(n,t,e){const i=t.indexOf("（");if(n.textContent=i>0?t.slice(0,i):t,i>0){const s=document.createElement("span");s.className="sub",s.textContent=t.slice(i),n.appendChild(s),n.classList.add("two")}}function Wr(n,t=0){const e=n.pads[t];return{x0:e.x,x1:e.x+e.w,z0:e.z,z1:e.z+e.d}}function Cv(n,t){const i=lt(1006)-En+ie+.015,s=lt(1006)-ie-.015,r=bt(616)+ie,o=bt(616)-ie,a=o+.02,c=Wt[1]+.1,l=Wt[1]+2.38,h=Nt(14131310,{roughness:.48,emissive:5910552,emissiveIntensity:.22}),u=Nt(4007966,{roughness:.86}),d=Nt(15001578,{roughness:.22,metalness:.8}),p=.028,g=(a+r)/2,_=(c+l)/2,m=(i+s)/2,f=r-a,y=l-c,v=s-i;ht(n,o-.004,_,m,.012,y,v,ic),ht(n,a+.008,_,m,.016,y,v,u),ht(n,g,_,i+p/2,f,y,p,h),ht(n,g,_,s-p/2,f,y,p,h),ht(n,g,l-p/2,m,f,p,v,h),ht(n,g,c+p/2,m,f,p,v,h);const x=c+1.22;ht(n,g,x,m,f-.01,.04,v-p*2,h);const A=(v-p*2-.012)/2,w=.02,U=(P,z,O,I,W)=>{const X=Math.abs(z-P),et=I-O,gt=Math.sign(z-P)||1,kt=new ve;kt.position.set(r,O,P),n.add(kt);const Z=new ve;Z.position.set(X/2,et/2,0),kt.add(Z),ht(Z,0,0,0,X-.008,et-.012,w,h);const nt=gt>0?-.018000000000000002:w/2+.008;ht(Z,gt*(X*.32),0,nt,.012,Math.min(.16,et*.22),.012,d);const ft={x:0,z:gt},tt={x:1,z:0},Mt={x1:r,z1:P,x2:r+0,z2:P+gt*X,yb:O,yt:I};t.colliders.push(Mt);const Ct={leaf:Z,hingePt:{x:r,z:P},closedDir:ft,side:tt,leafW:X,y0:O,y1:I,ax:r+1.2,az:P,bx:r+1.2,bz:P+gt*X,angle:W,target:W,openTheta:1.35,collider:Mt,setAngle(wt){const Ot=Math.cos(wt),J=Math.sin(wt),st=ft.x*Ot+tt.x*J,D=ft.z*Ot+tt.z*J;kt.rotation.y=Math.atan2(-D,st),Mt.x2=r+st*X,Mt.z2=P+D*X,this.angle=wt},tick(wt){const Ot=this.target-this.angle;if(Math.abs(Ot)<.001){this.angle!==this.target&&this.setAngle(this.target);return}this.setAngle(this.angle+Math.sign(Ot)*Math.min(Math.abs(Ot),2.4*wt))},distanceTo(wt,Ot){return vo(wt,Ot,this.ax,this.az,this.bx,this.bz)},toggle(){this.target=this.target>this.openTheta*.45?0:this.openTheta}};Ct.setAngle(W),Z.traverse(wt=>{wt.userData.door=Ct}),t.doors.push(Ct)},E=i+p,M=s-p,L=x+.028,V=l-p,C=c+p,F=x-.02;U(E,E+A,L,V,0),U(M,M-A,L,V,0),U(E,E+A,C,F,1.05),U(M,M-A,C,F,1.05),hr(n,new N(g,x-.06,i+p+.04),new N(g,x-.06,s-p-.04),.01,d,8),t.colliders.push({x1:a,z1:i,x2:r,z2:i,yb:c,yt:l}),t.colliders.push({x1:a,z1:s,x2:r,z2:s,yb:c,yt:l}),t.colliders.push({x1:a,z1:i,x2:a,z2:s,yb:c,yt:l})}function Pv(n,t,e,i,s){const r=n[0],o=M=>s.find(L=>L.id===M),a=Wr(o("f1-shop"));is(r,i,a,0,.1,Qe("terrazzoDark",.5,{roughness:.4}),.012);const c=Qe("pvcWood",1.2,{roughness:.3,color:16447214}),l=Be[0]-Ys-.2,h=a.x0+ie,u=a.x1-ie,d=a.z0+ie,p=a.z1-ie,g=new Ht(Fu(h,d,u,p,l),c);g.receiveShadow=!0,e.add(g);const _=Nt(16053231,{roughness:.7});ht(e,(h+u)/2,l-.03,d+.025,u-h,.06,.05,_),ht(e,(h+u)/2,l-.03,p-.025,u-h,.06,.05,_),ht(e,u-.13,l-.12,(d+p)/2,.26,.24,p-d,_);const m=Wr(o("f1-gym"));is(r,i,m,0,.1,ps,.01),ht(t[0],(m.x0+m.x1)/2,Be[0]-Ys-.17,(m.z0+m.z1)/2,.24,.34,m.z1-m.z0-me,Se);const f=Wr(o("f1-hall"));is(r,i,f,0,.08,Nt(7763311,{roughness:.8}),.01);const y=Be[0]-Ys-.2,v=f.x0+ie,x=bt(1550)-ie-.06,T=x-v,A=(v+x)/2;ht(t[0],A,y,lt(1006),T,.4,.26,Se),ht(t[0],A,y,lt(457)-.2,T,.4,.26,Se);const w=Qe("wallTile",.5,{roughness:.25},.66),U=o("f1-cook").pads[0];so(r,i,{axis:"x",c:bt(1550),s0:U.z,s1:U.z+U.d,n:-1,inset0:0,inset1:0},.85,2.1,w,.006),so(r,i,{axis:"z",c:lt(1414),s0:bt(1454),s1:bt(1550),n:1,inset0:0},.9,2,w,.006);const E=Wr(o("f1-fridge"));is(r,i,E,0,1.2,Nt(14605524,{roughness:.95}),.004),is(r,i,E,1.19,1.21,Nt(12170925,{roughness:.9}),.006),Zs(r,"x",Te.x1,Te.z0,Te.zL,0,.1,-1,ps,.006)}const ss=n=>-.065*n;function Lv(n,t){const s=-ie-4.2,o=s-8.2,a=Math.min(lt(457),lt(1006))-ie,c=Math.max(lt(457),lt(1006))+ie,l=-30,h=46,u=[],d=[],p=[];function g(w,U,E){const M=U[0]-w[0],L=U[1]-w[1],V=U[2]-w[2],C=E[0]-w[0],F=E[1]-w[1],P=E[2]-w[2];return[L*P-V*F,V*C-M*P,M*F-L*C]}function _(w,U,E,M,L){const V=g(w,U,E),C=g(w,E,M);let F=V[0]+C[0],P=V[1]+C[1],z=V[2]+C[2];L?F*L[0]+P*L[1]+z*L[2]<0&&(F=-F,P=-P,z=-z):P<0&&(F=-F,P=-P,z=-z);const O=Math.hypot(F,P,z)||1;F/=O,P/=O,z/=O;for(const I of[w,U,E,w,E,M])u.push(I[0],I[1],I[2]),d.push(F,P,z),p.push(I[0],I[2])}function m(w,U){const E=new Ne;E.setAttribute("position",new oe(u.splice(0),3)),E.setAttribute("normal",new oe(d.splice(0),3)),E.setAttribute("uv",new oe(p.splice(0),2));const M=new Ht(E,w);return M.receiveShadow=!0,M.castShadow=!1,U&&(w.polygonOffset=!0,w.polygonOffsetFactor=U,w.polygonOffsetUnits=U),n.add(M),M}const f=(w,U=0)=>ss(w)+U,y=new wc(72,80);y.rotateX(-Math.PI/2);const v=y.attributes.position;for(let w=0;w<v.count;w++)v.setY(w,ss(v.getX(w)));y.computeVertexNormals();const x=new Ht(y,Nt(12894388,{roughness:.96}));x.receiveShadow=!0,x.castShadow=!1,n.add(x),_([o,f(o,.012),l],[s,f(s,.012),l],[s,f(s,.012),h],[o,f(o,.012),h]),m(Nt(9278362,{roughness:.98}),-1),_([s,f(s,.028),a],[-.012,f(-.012,.028),a],[-.012,f(-.012,.028),c],[s,f(s,.028),c]),m(Nt(14012612,{roughness:.93}),-2);const T=-.04;_([s,f(s,.02),l],[T,f(T,.02),l],[T,f(T,.02),a],[s,f(s,.02),a]),_([s,f(s,.02),c],[T,f(T,.02),c],[T,f(T,.02),h],[s,f(s,.02),h]);const A=-13.12;_([A,f(A,.02),l],[o,f(o,.02),l],[o,f(o,.02),h],[A,f(A,.02),h]),m(Nt(13552061,{roughness:.94}),-2);for(const w of Bu(Le)){const{ux:U,uz:E,len:M}=Gn(w);let L=-E,V=U;const C=Tn(w,M/2);ls(C.x+L*.4,C.z+V*.4,Le)&&(L=-L,V=-V);const F=Math.max(1,Math.ceil(M/1.4));for(let P=0;P<F;P++){const z=Tn(w,M*P/F),O=Tn(w,M*(P+1)/F),I=ss(z.x),W=ss(O.x);if(Math.min(I,W)>-.08)continue;const X=L*(ie+.008),et=V*(ie+.008);_([z.x+X,.01,z.z+et],[z.x+X,I-.02,z.z+et],[O.x+X,W-.02,O.z+et],[O.x+X,.01,O.z+et],[L,0,V])}}u.length&&m(Nt(11775652,{roughness:.95})),t.surfaces.push({x0:-40,x1:40,z0:-40,z1:40,thick:1.2,h:w=>ss(w)})}function Dv(){const n=Yx(),t=Zx(),e=Bu(Le),i=Jx(),s=new ve,r=[new ve,new ve,new ve],o=[new ve,new ve,new ve],a=new ve;a.visible=!1;const c=new ve,l=new ve,h={colliders:[],openings:[],surfaces:[],pickables:[],doors:[]};r.forEach(C=>s.add(C)),o.forEach(C=>{C.visible=!1,s.add(C)}),s.add(a),s.add(c),s.add(l),r.forEach((C,F)=>{const P=Jr(Le),z=Qx(F);z.forEach(W=>P.holes.push(new Ja(W.map(X=>new ot(X.x,X.z)))));const O=new Rc(P,{depth:Ys,bevelEnabled:!1});O.rotateX(Math.PI/2),O.translate(0,Wt[F],0);const I=new Ht(O,Se);I.receiveShadow=!0,I.castShadow=!1,C.add(I),h.surfaces.push({poly:Le,holes:z,thick:Ys,h:()=>Wt[F]})});{const C=bt(616)-ie,F=Le.findIndex(O=>Math.abs(O.x-bt(616))<.02&&O.z<.05),P=[{x:C,z:lt(1006)},...Le.slice(F),{x:C,z:lt(457)}],z=new Ht(Nu(Jr(P),Wt[2]+Be[2]-.02),Se);z.receiveShadow=!0,o[2].add(z)}r.forEach((C,F)=>{const P=Wt[F],z=(O,I)=>{if(F<2)return P+Be[F];const{ux:W}=Gn(I);return Vr(I.x1+W*O)};for(const O of e){const I=vv(O,F,i);yh(h,C,O.x1,O.z1,O.x2,O.z2,P,W=>z(W,O),I,Mv(O,F)),I.forEach(W=>xv(C,h,O,W,P))}F===0&&_v(C);for(const O of jx(F)){yh(h,C,O.x1,O.z1,O.x2,O.z2,P,()=>P+Be[F],O.openings,ic);const I={x1:O.x1,z1:O.z1,x2:O.x2,z2:O.z2};O.openings.forEach(W=>{W.kind==="door"?Ou(C,h,I,W,P):W.kind==="window"&&dv(C,I,W,P)})}}),r.forEach((C,F)=>{const P=Wt[F],z=P+Be[F];for(const O of e){const{ux:I,uz:W,len:X}=Gn(O),et=Math.abs(I)<.5?"x":"z",gt=O.x1+I*X*.5,kt=O.z1+W*X*.5,Z=.3,ft=(et==="x"?ls(gt+Z,kt,Le):ls(gt,kt+Z,Le))?1:-1,tt=et==="x"?O.x1:O.z1,Mt=et==="x"?Math.min(O.z1,O.z2):Math.min(O.x1,O.x2),Ct=et==="x"?Math.max(O.z1,O.z2):Math.max(O.x1,O.x2);so(C,h,{axis:et,c:tt,s0:Mt,s1:Ct,n:ft,inset0:0,inset1:0},P,z,ic,.002)}}),Av(r,h),Rv(r,o,h);const u={};t.forEach(C=>{const F=r[C.floor-1];let P;C.zone?P=Nt(16777215,{visible:!1}):C.wc!=null?P=vh[ir[C.wc].tile]():C.finish?P=u[C.finish]||(u[C.finish]=vh[C.finish]()):P=Nt(C.color),P=P.clone(),P.polygonOffset=!0,P.polygonOffsetFactor=-1,P.polygonOffsetUnits=-1,C.pads.forEach(I=>{const W=(I.level??C.level)+(C.zone?.012:.004),X=new Ht(Fu(I.x,I.z,I.x+I.w,I.z+I.d,W),P);X.userData.roomId=C.id,X.receiveShadow=!0,F.add(X),h.pickables.push(X)});const z=document.createElement("div");z.className=C.zone?"label zone":"label",Eh(z,C.name);const O=new uh(z);O.position.set(C.label.x,C.level+.06,C.label.z),O.userData.floor=C.floor,c.add(O)}),$x.forEach(C=>{const F=t.find(O=>O.id===C.room),P=document.createElement("div");P.className="label",Eh(P,F.name);const z=new uh(P);z.position.set(F.label.x,F.level+.06,F.label.z),z.userData.floor=C.floor,c.add(z)}),Pv(r,o,a,h,t),Cv(r[1],h),Kx.forEach(C=>{const F=Wt[C.floor-1]+.03;let P;if(C.rect){const[I,W,X,et]=C.rect;P=[[I,W],[X,W],[X,et],[I,et],[I,W]]}else P=C.line;const z=new Ne().setFromPoints(P.map(([I,W])=>new N(bt(W),F,lt(I)))),O=new R_(z,new cx({color:4014408,dashSize:.18,gapSize:.12}));O.computeLineDistances(),O.userData.floor=C.floor,l.add(O)});const d=new nr({color:16777215,map:lv(),roughness:.7,metalness:.22,side:fn}),p=new ve,g=new go(Jr(Le));g.rotateX(Math.PI/2);const _=g.attributes.position;for(let C=0;C<_.count;C++)_.setY(C,Vr(_.getX(C))+.04);g.computeVertexNormals();const m=new Ht(g,d);m.castShadow=!0,p.add(m);const f=Math.min(lt(457),lt(1006)),y=Math.max(lt(457),lt(1006)),v=new Ht(new We(.62,.05,y-f),d);v.position.set(-.28,Vr(0)+.05,(f+y)/2),v.castShadow=!0,p.add(v);{const C=Nt(5133916,{roughness:.34,metalness:.78});Ii.push(C);const F=.18,P=Math.max(lt(457),lt(1006))-.25,z=Math.min(lt(457),lt(1006))+.25,O=Wt[2];for(const I of[P,z]){const W=Vr(F)-O,X=new Ht(new Fi(.032,.032,W,12),C);X.position.set(F,O+W/2,I),X.castShadow=!0,p.add(X)}}s.add(p),Lv(s,h);const x=tv(s,h,{box:ht,makeMat:Nt,terrainY:ss}),T=.14;function A(C,F,P){return C>P.x0&&C<P.x1&&F>P.z0&&F<P.z1}function w(C,F,P){return C.poly?ls(F,P,C.poly)?!C.holes.some(z=>ls(F,P,z)):!1:F>=C.x0&&F<=C.x1&&P>=C.z0&&P<=C.z1}function U(C,F,P){let z=null;for(const O of h.surfaces){if(!w(O,C,F))continue;const I=O.h(C,F);I<=P+.45&&(z==null||I>z)&&(z=I)}return z}function E(C,F,P){const z=P+.4,O=P+1.75;for(const I of h.colliders)if(!(I.yt<=z||I.yb>=O)&&vo(C,F,I.x1,I.z1,I.x2,I.z2)<T)return!0;for(const I of h.surfaces){if(!w(I,C,F))continue;const W=I.h(C,F);if(W>P+.45&&W-I.thick<P+1.8)return!0}return!1}function M(C,F,P,z=.06){const O=P+.4,I=P+1.75,W=[];for(const X of h.colliders){if(X.yt<=O||X.yb>=I)continue;const et=X.x2-X.x1,gt=X.z2-X.z1,kt=et*et+gt*gt||1e-9,Z=Math.max(0,Math.min(1,((C-X.x1)*et+(F-X.z1)*gt)/kt)),nt=X.x1+et*Z,ft=X.z1+gt*Z,tt=Math.hypot(C-nt,F-ft);tt<T+z&&tt>1e-6&&W.push({d:tt,x:(C-nt)/tt,z:(F-ft)/tt})}return W.sort((X,et)=>X.d-et.d)}const L=t.map(C=>({room:C,rects:C.rects.map(([F,P,z,O])=>({x0:bt(Math.min(P,O)),x1:bt(Math.max(P,O)),z0:lt(Math.max(F,z)),z1:lt(Math.min(F,z))}))}));function V(C,F,P){let z=null,O=null;for(const{room:I,rects:W}of L)if(W.some(X=>A(C,F,X))&&!(I.level>P+.3)){if(I.zone){O=I;continue}(!z||I.level>z.level)&&(z=I)}return{room:z,zone:O}}return{root:s,floors:r,ceilings:o,pvc:a,roof:p,context:x,labels:c,overlays:l,pickables:h.pickables,rooms:t,layout:n,metals:Ii,stairW:n.stairW,doors:h.doors,walk:{floorAt:U,blockedAt:E,roomAt:V,contactNormals:M}}}const Wu=document.getElementById("view"),rr=document.getElementById("side"),oc=document.getElementById("card"),Mo=document.getElementById("hint"),Ti=document.getElementById("walk"),Iv=document.getElementById("hud"),Ss=document.getElementById("stick"),Xu=document.getElementById("knob"),ac=document.getElementById("useDoor"),cc=document.getElementById("compass"),Uv=["一楼","二楼","三楼"];document.title=`临街房屋 · ${mu}`;const ui=()=>window.matchMedia("(pointer: coarse)").matches||window.innerWidth<900,en=new A_({antialias:!0});en.setPixelRatio(Math.min(window.devicePixelRatio,ui()?1.5:2));en.setSize(window.innerWidth,window.innerHeight);en.shadowMap.enabled=!0;en.shadowMap.type=Rh;en.outputColorSpace=be;Wu.appendChild(en.domElement);const Oi=new Lx;Oi.setSize(window.innerWidth,window.innerHeight);Oi.domElement.style.position="absolute";Oi.domElement.style.inset="0";Oi.domElement.style.pointerEvents="none";Wu.appendChild(Oi.domElement);const Wn=new su;Wn.background=new Kt(14015974);Wn.fog=new Ec(14015974,70,160);const _n=new tn(50,window.innerWidth/window.innerHeight,.05,200),ro=new yc(-1,1,1,-1,.5,300);let Xn=_n;const Xe=new xx(_n,en.domElement);Xe.enableDamping=!0;Xe.maxPolarAngle=Math.PI*.49;Xe.minDistance=3;Xe.maxDistance=110;Xe.minZoom=.6;Xe.maxZoom=6;function Bc(n){Xn=n,Xe.object=n}function Yu(){const n=window.innerWidth/window.innerHeight,t=Math.max(8.8,7.8/n);Object.assign(ro,{left:-t*n,right:t*n,top:t,bottom:-t,zoom:1})}const qu=new lx(16777215,12103068,1.4);Wn.add(qu);const zi=new dx(16777215,2);zi.position.set(-14,26,-10);zi.castShadow=!0;zi.shadow.mapSize.set(2048,2048);zi.shadow.bias=-.0012;zi.shadow.normalBias=.06;Object.assign(zi.shadow.camera,{left:-36,right:36,top:36,bottom:-36,near:1,far:120});Wn.add(zi);const ge=Dv();Wn.add(ge.root);const Nv=new $a(en),Zu=Nv.fromScene(new Dx,.04).texture;ge.metals.forEach(n=>{n.envMap=Zu,n.envMapIntensity=.8,n.needsUpdate=!0});const Ri=new N(nc.center.x,0,nc.center.z);Ri.clone().setY(5);function Fv(){return _c.clamp(1.4/_n.aspect,1,2.2)}let re="orbit",Ie=0,$s=null;function Rs(){const n=window.innerWidth,t=window.innerHeight,e=!rr.classList.contains("collapsed")&&n>900;[_n,ro].forEach(i=>{re!=="walk"&&e?i.setViewOffset(n,t,(rr.offsetWidth+12)/2,0,n,t):i.clearViewOffset(),i.updateProjectionMatrix()})}function Ov(){Bc(_n);const n=Fv(),t=Math.max(-11.8,-11.2-.8*(n-1));Xn.position.set(t,8.2+1.1*n,Ri.z+.5),Xe.target.set(2.4,4.4,Ri.z),Xe.update()}const bh=.1;function zv(n){Bc(ro),Yu(),Rs();const t=Wt[n-1],e=40;Xe.target.set(Ri.x,t,Ri.z),ro.position.set(Ri.x+e*Math.sin(bh),t+e*Math.cos(bh),Ri.z),Xe.update()}let yo=!1;const ei={1:!0,2:!0,3:!0,roof:!0,context:!0,pvc:!1};function ur(){const n=re!=="walk"&&Ie>0,t=re!=="walk"&&Ie===0;ge.floors.forEach((e,i)=>{const s=i+1;re==="walk"?e.visible=!0:n?e.visible=s<=Ie:e.visible=ei[s]}),ge.roof.visible=(re==="walk"||t)&&ei.roof,ge.context.visible=(re==="walk"||t)&&ei.context,ge.ceilings.forEach((e,i)=>{re==="walk"?e.visible=!0:n?e.visible=!1:e.visible=ei[i+1]}),ge.pvc.visible=ei.pvc&&(re==="walk"||t&&ei[1]),ge.labels.visible=re!=="walk",ge.labels.children.forEach(e=>{const i=e.userData.floor;e.visible=i==null?Ie===0:yo&&n&&i===Ie}),ge.overlays.children.forEach(e=>{e.visible=n&&e.userData.floor===Ie}),cc.hidden=re==="walk"}function fr(){document.querySelectorAll("#bar button[data-floor], #bar button[data-mode]").forEach(n=>{const t=Number(n.dataset.floor||0),e=n.dataset.mode==="orbit",i=re==="walk"?t===or:e&&Ie===0||t&&t===Ie;n.classList.toggle("active",!!i)}),Ti.classList.toggle("active",re==="walk"),Ti.textContent=re==="walk"?"退出走动":"走进当前层",Ti.disabled=Ie===0&&re!=="walk",Ti.style.opacity=Ti.disabled?.5:1}function So(){$s&&$s.forEach(n=>n.material.emissive.setHex(0)),$s=null,oc.hidden=!0}function $u(){const n=document.getElementById("layerPanel"),t=document.getElementById("toggleLayers");!n||n.hidden||(n.hidden=!0,t.classList.remove("active"))}function kc(n){re==="walk"&&ef(),Ie=n,$u(),So(),Rs(),zv(n),ur(),fr(),Mo.textContent=ui()?"点地面进入该房间。":yo?"点地面查看房间。再点「名称」可收起标注。":"点地面查看房间名称和尺寸。"}function Ku(){re==="walk"&&ef(),Ie=0,$u(),So(),Rs(),Ov(),ur(),fr(),Mo.textContent=ui()?"点地面进入该房间。可用「显示」开关各层和周边楼栋。":"拖拽旋转，滚轮缩放。点地面查看房间，可用「显示」开关各层和周边楼栋。"}document.querySelectorAll("#bar button[data-floor]").forEach(n=>{n.addEventListener("click",()=>{const t=Number(n.dataset.floor);re==="walk"?Vv(t):kc(t),n.blur()})});document.querySelector("#bar button[data-mode='orbit']").addEventListener("click",Ku);const Bv=1.6,zs=40,pt={x:0,z:0,feet:0,yaw:0,pitch:0,keys:new Set,lookId:null,lastX:0,lastY:0,downX:0,downY:0},Ze={id:null,x:0,y:0};let oo="",Th="",or=0,ju=0,ao=!1;function Eo(n){return n>=Wt[2]-.3?3:n>=Wt[1]-.3?2:1}function Ju(n){Wn.environment=n?Zu:null,Wn.environmentIntensity=.55,qu.intensity=n?.9:1.4}function Hc(n){Iv.hidden=!n,document.body.classList.toggle("walking",n),n||Vc()}function Qu(){re="walk",Ju(!0),Xe.enabled=!1,So(),pt.keys.clear(),ao||(ju=performance.now()+4e3),Bc(_n),_n.fov=ui()?68:62,_n.updateProjectionMatrix(),Rs(),ur(),Hc(!0),fr()}function kv(){Ie!==0&&(tf(Ie),Qu())}function Hv(n){Ie=n.floor,Object.assign(pt,{x:n.label.x,z:n.label.z,yaw:0,pitch:-.06,feet:n.level}),oo="",or=Eo(n.level),Qu()}function tf(n){const t=nc.spawn[n-1];Object.assign(pt,{x:t.x,z:t.z,yaw:t.yaw,pitch:-.05,feet:Wt[n-1]}),oo="",or=n,fr()}function Vv(n){Ie=n,tf(n)}function ef(){re="orbit",Ju(!1),Xe.enabled=!0,pt.keys.clear(),pt.lookId=null,Hc(!1),_n.fov=50,_n.updateProjectionMatrix()}Ti.addEventListener("click",()=>{re==="walk"?kc(Eo(pt.feet)):kv(),Ti.blur()});const nf={KeyW:"fwd",ArrowUp:"fwd",KeyS:"back",ArrowDown:"back",KeyA:"left",KeyD:"right",ArrowLeft:"turnL",KeyQ:"turnL",ArrowRight:"turnR",KeyE:"turnR",ShiftLeft:"run",ShiftRight:"run"};window.addEventListener("keydown",n=>{if(re!=="walk")return;if(n.code==="Escape"){kc(Eo(pt.feet));return}if((n.code==="KeyF"||n.code==="Space")&&!n.repeat){const e=Gc();e&&(n.preventDefault(),e.toggle())}const t=nf[n.code];t&&(n.preventDefault(),!(n.ctrlKey||n.metaKey||n.altKey)&&pt.keys.add(t))});window.addEventListener("keyup",n=>{const t=nf[n.code];t&&pt.keys.delete(t),(n.key==="Meta"||n.key==="Control"||n.key==="Alt")&&pt.keys.clear()});window.addEventListener("blur",()=>{pt.keys.clear(),Vc()});document.addEventListener("visibilitychange",()=>pt.keys.clear());window.addEventListener("contextmenu",()=>pt.keys.clear());function Gv(n){return re!=="walk"||!ui()?!0:n.clientX>window.innerWidth*.42}en.domElement.addEventListener("pointerdown",n=>{Gv(n)&&(pt.lookId=n.pointerId,pt.lastX=pt.downX=n.clientX,pt.lastY=pt.downY=n.clientY)});window.addEventListener("pointerup",n=>{if(n.pointerId!==pt.lookId)return;const t=Math.hypot(n.clientX-pt.downX,n.clientY-pt.downY)<8;pt.lookId=null,!(!t||n.target!==en.domElement)&&(re==="walk"&&Wv(n)||re!=="walk"&&Xv(n)||re!=="walk"&&Kv(n))});window.addEventListener("pointermove",n=>{if(re!=="walk"||n.pointerId!==pt.lookId)return;const t=ui()?.0042:.005;pt.yaw-=(n.clientX-pt.lastX)*t,pt.pitch=_c.clamp(pt.pitch-(n.clientY-pt.lastY)*t*.8,-1.15,1.15),pt.lastX=n.clientX,pt.lastY=n.clientY});function Vc(){Ze.id=null,Ze.x=0,Ze.y=0,Xu.style.transform="translate(0px, 0px)"}function sf(n){const t=Ss.getBoundingClientRect();let e=n.clientX-(t.left+t.width/2),i=n.clientY-(t.top+t.height/2);const s=Math.hypot(e,i)||1;s>zs&&(e=e/s*zs,i=i/s*zs),Ze.x=e/zs,Ze.y=i/zs,Xu.style.transform=`translate(${e}px, ${i}px)`}Ss.addEventListener("pointerdown",n=>{Ze.id=n.pointerId,Ss.setPointerCapture(n.pointerId),sf(n),n.preventDefault()});Ss.addEventListener("pointermove",n=>{n.pointerId===Ze.id&&sf(n)});function rf(n){n.pointerId===Ze.id&&Vc()}Ss.addEventListener("pointerup",rf);Ss.addEventListener("pointercancel",rf);function Gc(){const n=-Math.sin(pt.yaw),t=-Math.cos(pt.yaw);let e=null,i=1.45;for(const s of ge.doors){const r=s.distanceTo(pt.x,pt.z);if(r>i)continue;const o=(s.ax+s.bx)/2-pt.x,a=(s.az+s.bz)/2-pt.z,c=Math.hypot(o,a)||1;(o*n+a*t)/c<.15||pt.feet+1.35<s.y0-.2||pt.feet+.15>s.y1||(e=s,i=r)}return e}function of(n){const t=[];return ge.doors.forEach(e=>{n&&!e.shutter||e.leaf.traverse(i=>{if(i.isMesh){for(let s=i;s;s=s.parent)if(!s.visible)return;t.push(i)}})}),t}function Wv(n){Hn.x=n.clientX/window.innerWidth*2-1,Hn.y=-(n.clientY/window.innerHeight)*2+1,Es.setFromCamera(Hn,Xn);const t=Es.intersectObjects(of(!1),!1)[0],e=t&&t.object.userData.door;return!e||e.distanceTo(pt.x,pt.z)>2.2?!1:(e.toggle(),!0)}function Xv(n){Hn.x=n.clientX/window.innerWidth*2-1,Hn.y=-(n.clientY/window.innerHeight)*2+1,Es.setFromCamera(Hn,Xn);const t=Es.intersectObjects(of(!0),!1)[0],e=t&&t.object.userData.door;return e?(e.toggle(),!0):!1}ac.addEventListener("click",()=>{const n=Gc();n&&n.toggle()});function Yv(n,t){const e=ge.walk.floorAt(n,t,pt.feet);return e==null||e<pt.feet-.6?!1:!ge.walk.blockedAt(n,t,Math.max(e,pt.feet))}function qv(){const{room:n,zone:t}=ge.walk.roomAt(pt.x,pt.z,pt.feet),e=n?n.name+(t?` · ${t.name}`:""):"楼梯",i=t||n,s=Gc(),r=i?i.sizeText:"";let o=r?`${e}　${r}`:e;!ao&&performance.now()<ju?o+=ui()?"　左摇杆移动，右侧滑动转头":"　拖动画面转头":ao=!0,o!==oo&&(Mo.textContent=o,oo=o);const a=s&&s.target>s.openTheta*.45?"关门":"开门",c=a+(s?"1":"0");c!==Th&&(ac.textContent=a,ac.disabled=!s,Th=c);const l=Eo(pt.feet);l!==or&&(or=l,Ie=l,fr())}function Zv(n,t){const e=(s,r)=>Yv(pt.x+s,pt.z+r)?(pt.x+=s,pt.z+=r,!0):!1;if(e(n,t))return;const i=Math.hypot(n,t);for(const s of ge.walk.contactNormals(pt.x,pt.z,pt.feet)){const r=n*s.x+t*s.z;if(r>=0)continue;const o=n-r*s.x,a=t-r*s.z,c=Math.hypot(o,a);if(c<1e-5)continue;const l=Math.max(c,.5*i)/c;if(e(o*l,a*l))return}Math.abs(n)>1e-6&&e(n,0)||Math.abs(t)>1e-6&&e(0,t)}function $v(n){const t=pt.keys;t.has("turnL")&&(pt.yaw+=1.8*n),t.has("turnR")&&(pt.yaw-=1.8*n);const e=Math.hypot(Ze.x,Ze.y),i=["fwd","back","left","right"].some(g=>t.has(g)),s=(t.has("run")?3:1.6)*n*(i?1:Math.min(1,e)),r=-Math.sin(pt.yaw),o=-Math.cos(pt.yaw),a=-o,c=r;let l=0,h=0;t.has("fwd")&&(l+=r,h+=o),t.has("back")&&(l-=r,h-=o),t.has("right")&&(l+=a,h+=c),t.has("left")&&(l-=a,h-=c),e>.16&&(l+=r*-Ze.y+a*Ze.x,h+=o*-Ze.y+c*Ze.x);const u=Math.hypot(l,h);if(u>0){ao=!0;const g=Math.max(1,Math.ceil(s/.04));for(let _=0;_<g;_++)Zv(l/u*(s/g),h/u*(s/g))}const d=ge.walk.floorAt(pt.x,pt.z,pt.feet);d!=null&&(pt.feet=d>=pt.feet?d:Math.max(d,pt.feet-5*n));const p=pt.feet+Bv;Xn.position.set(pt.x,p,pt.z),Xn.lookAt(pt.x-Math.sin(pt.yaw)*Math.cos(pt.pitch),p+Math.sin(pt.pitch),pt.z-Math.cos(pt.yaw)*Math.cos(pt.pitch)),qv()}const Es=new mx,Hn=new ot;function Kv(n){Hn.x=n.clientX/window.innerWidth*2-1,Hn.y=-(n.clientY/window.innerHeight)*2+1,Es.setFromCamera(Hn,Xn);const t=ge.pickables.filter(r=>{for(let o=r;o;o=o.parent)if(!o.visible)return!1;return!0}),e=Es.intersectObjects(t,!1)[0];if(So(),!e)return;const i=ge.rooms.find(r=>r.id===e.object.userData.roomId);if(!i)return;if($s=ge.pickables.filter(r=>r.userData.roomId===i.id),$s.forEach(r=>r.material.emissive.setHex(3811856)),ui()){Hv(i);return}const s=i.where||Uv[i.floor-1];oc.innerHTML=`<strong>${i.name}</strong> · ${s}<br>${i.sizeText}<br>${i.note}`,oc.hidden=!1}const jv=Wt[2]+Be[2]+gu,wh=ge.rooms.find(n=>n.id==="f1-shop"),af=Te.x1-Te.x0,Jv=Te.z1-Te.z0,Qv=af/2-Te.well,ha=n=>ge.rooms.filter(t=>t.floor===n&&!t.zone).reduce((t,e)=>t+e.area,0);rr.innerHTML=`
  <h1>临街房屋</h1>
  <p class="ver">${mu}</p>
  <p>三层临街房屋，东西向面宽 ${bt(1550).toFixed(2)} 米。一、二层层高 ${Be[0].toFixed(2)} 米，三层层高 ${Be[2].toFixed(2)} 米，檐口约 ${jv.toFixed(1)} 米。外墙中线占地 ${ge.layout.area.toFixed(2)} 平方米。</p>
  <h2>空间布局</h2>
  <ul class="area">
    <li>一楼约 ${ha(1).toFixed(1)} 平方米：临街商铺、健身房、大厅、厨房操作区、储藏间，南侧为楼梯间和半层卫生间。商铺吊顶为浅色 PVC 条板。</li>
    <li>二楼约 ${ha(2).toFixed(1)} 平方米：临街阳台、卧室、套内卫生间、客厅、储物间、过道和公共区域，另有楼梯间和半层卫生间。</li>
    <li>三楼约 ${ha(3).toFixed(1)} 平方米：公共阳台、客厅、厨房和卧室。客厅南墙有铝合金窗。</li>
    <li>室内双跑楼梯，楼梯间 ${Jv.toFixed(2)} × ${af.toFixed(2)} 米，每跑 ${Hs} 级，梯段宽 ${Qv.toFixed(2)} 米。转角平台在 ${Ue[0].toFixed(2)} 米和 ${Ue[1].toFixed(2)} 米。</li>
    <li>人行门约 ${_u.toFixed(2)} × ${Bn.toFixed(2)} 米。临街商铺内空 ${wh.ns.toFixed(2)} × ${wh.ew.toFixed(2)} 米（南北 × 东西）。</li>
  </ul>
  <h2>权属</h2>
  <p>土地性质为国有出让。使用权年限、权利人及证载面积以不动产权证记载为准。</p>
`;const co=document.getElementById("toggleLabels");function tM(n){yo=n,co.classList.toggle("active",n),co.textContent=n?"隐藏名称":"名称",ur(),re!=="walk"&&Ie>0&&(Mo.textContent=n?"名称已显示。点地面查看房间。":"名称已收起。点地面查看房间。")}co.addEventListener("click",()=>{tM(!yo),co.blur()});const ci=document.getElementById("layerPanel"),Ks=document.getElementById("toggleLayers");Ks.addEventListener("click",n=>{n.stopPropagation(),ci.hidden=!ci.hidden,Ks.classList.toggle("active",!ci.hidden),Ks.blur()});ci.addEventListener("click",n=>n.stopPropagation());ci.addEventListener("change",n=>{const t=n.target.dataset.layer;t&&(ei[t]=n.target.checked,ur())});window.addEventListener("pointerdown",n=>{ci.hidden||Ks.contains(n.target)||ci.contains(n.target)||(ci.hidden=!0,Ks.classList.remove("active"))});const cf=document.getElementById("toggleSide");function lf(n){rr.classList.toggle("collapsed",!n),cf.classList.toggle("active",n),Rs()}lf(window.innerWidth>900);cf.addEventListener("click",()=>lf(rr.classList.contains("collapsed")));function eM(){if(cc.hidden)return;const n=Xe.getAzimuthalAngle(),t=Math.atan2(-Math.cos(n),Math.sin(n));cc.style.setProperty("--a",`${t}rad`)}Ku();window.addEventListener("resize",()=>{_n.aspect=window.innerWidth/window.innerHeight,Yu(),en.setSize(window.innerWidth,window.innerHeight),Oi.setSize(window.innerWidth,window.innerHeight),re==="walk"&&Hc(!0),Rs()});const nM=new px;en.setAnimationLoop(()=>{const n=Math.min(nM.getDelta(),.05);ge.doors.forEach(t=>t.tick(n)),re==="walk"?$v(n):Xe.update(),eM(),en.render(Wn,Xn),Oi.render(Wn,Xn)});
