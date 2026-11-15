(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const al="180",nu=0,Pl=1,iu=2,Qc=1,th=2,Yn=3,pi=0,Ge=1,Qe=2,di=0,Pi=1,Xs=2,Ll=3,Il=4,su=5,Ai=100,ru=101,au=102,ou=103,lu=104,cu=200,hu=201,uu=202,du=203,co=204,ho=205,fu=206,pu=207,mu=208,gu=209,vu=210,_u=211,xu=212,Mu=213,Su=214,uo=0,fo=1,po=2,fs=3,mo=4,go=5,vo=6,_o=7,eh=0,yu=1,Tu=2,Zn=0,bu=1,Eu=2,Au=3,nh=4,wu=5,Ru=6,Cu=7,ih=300,ps=301,ms=302,xo=303,Mo=304,oa=306,qs=1e3,hi=1001,So=1002,dn=1003,Pu=1004,ar=1005,Be=1006,fa=1007,Ri=1008,Nn=1009,sh=1010,rh=1011,Ys=1012,ol=1013,Ii=1014,Ln=1015,xs=1016,ll=1017,cl=1018,Ks=1020,ah=35902,oh=35899,lh=1021,ch=1022,En=1023,$s=1026,Zs=1027,hl=1028,ul=1029,hh=1030,dl=1031,fl=1033,zr=33776,Hr=33777,Vr=33778,Wr=33779,yo=35840,To=35841,bo=35842,Eo=35843,Ao=36196,wo=37492,Ro=37496,Co=37808,Po=37809,Lo=37810,Io=37811,Do=37812,Uo=37813,Fo=37814,No=37815,Oo=37816,ko=37817,Bo=37818,Go=37819,zo=37820,Ho=37821,Vo=36492,Wo=36494,Xo=36495,qo=36283,Yo=36284,Ko=36285,$o=36286,Lu=3200,Iu=3201,uh=0,Du=1,ai="",Re="srgb",Di="srgb-linear",Zr="linear",le="srgb",Vi=7680,Dl=519,Uu=512,Fu=513,Nu=514,dh=515,Ou=516,ku=517,Bu=518,Gu=519,Zo=35044,zu=35048,Ul="300 es",In=2e3,Jr=2001;class Ms{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pa=Math.PI/180,jr=180/Math.PI;function Jn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Qt(s,t,e){return Math.max(t,Math.min(e,s))}function Hu(s,t){return(s%t+t)%t}function ma(s,t,e){return(1-e)*s+e*t}function Pn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ce(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class sr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==m){let g=1-o;const p=l*d+c*f+h*m+u*v,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const w=Math.sqrt(S),A=Math.atan2(w,p*b);g=Math.sin(g*A)/w,o=Math.sin(o*A)/w}const x=o*b;if(l=l*g+d*x,c=c*g+f*x,h=h*g+m*x,u=u*g+v*x,g===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-o*f,t[e+2]=c*m+h*f+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ga.copy(this).projectOnVector(t),this.sub(ga)}reflect(t){return this.sub(ga.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ga=new I,Fl=new sr;class Kt{constructor(t,e,n,i,r,a,o,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],b=i[1],S=i[4],x=i[7],w=i[2],A=i[5],R=i[8];return r[0]=a*v+o*b+l*w,r[3]=a*g+o*S+l*A,r[6]=a*p+o*x+l*R,r[1]=c*v+h*b+u*w,r[4]=c*g+h*S+u*A,r[7]=c*p+h*x+u*R,r[2]=d*v+f*b+m*w,r[5]=d*g+f*S+m*A,r[8]=d*p+f*x+m*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(va.makeScale(t,e)),this}rotate(t){return this.premultiply(va.makeRotation(-t)),this}translate(t,e){return this.premultiply(va.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const va=new Kt;function fh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vu(){const s=Qr("canvas");return s.style.display="block",s}const Nl={};function Js(s){s in Nl||(Nl[s]=!0,console.warn(s))}function Wu(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ol=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xu(){const s={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===le&&(i.r=jn(i.r),i.g=jn(i.g),i.b=jn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===le&&(i.r=ds(i.r),i.g=ds(i.g),i.b=ds(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ai?Zr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Js("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Js("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Di]:{primaries:t,whitePoint:n,transfer:Zr,toXYZ:Ol,fromXYZ:kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:n,transfer:le,toXYZ:Ol,fromXYZ:kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),s}const re=Xu();function jn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Wi;class qu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=Qr("canvas")),Wi.width=t.width,Wi.height=t.height;const i=Wi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=jn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(jn(e[n]/255)*255):e[n]=jn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yu=0;class pl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Jn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(_a(i[a].image)):r.push(_a(i[a]))}else r=_a(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function _a(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?qu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ku=0;const xa=new I;class ze extends Ms{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=hi,i=hi,r=Be,a=Ri,o=En,l=Nn,c=ze.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Jn(),this.name="",this.source=new pl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xa).x}get height(){return this.source.getSize(xa).y}get depth(){return this.source.getSize(xa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ih)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qs:t.x=t.x-Math.floor(t.x);break;case hi:t.x=t.x<0?0:1;break;case So:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qs:t.y=t.y-Math.floor(t.y);break;case hi:t.y=t.y<0?0:1;break;case So:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=ih;ze.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,i=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(f+1)/2,w=(p+1)/2,A=(h+d)/4,R=(u+v)/4,C=(m+g)/4;return S>x&&S>w?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=A/n,r=R/n):x>w?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=C/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=C/r),this.set(n,i,r,e),this}let b=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(u-v)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $u extends Ms{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new ze(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new pl(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends $u{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ph extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zu extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oi{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Sn):Sn.fromBufferAttribute(r,a),Sn.applyMatrix4(t.matrixWorld),this.expandByPoint(Sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Sn),Sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bs),lr.subVectors(this.max,bs),Xi.subVectors(t.a,bs),qi.subVectors(t.b,bs),Yi.subVectors(t.c,bs),ti.subVectors(qi,Xi),ei.subVectors(Yi,qi),_i.subVectors(Xi,Yi);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-_i.z,_i.y,ti.z,0,-ti.x,ei.z,0,-ei.x,_i.z,0,-_i.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-_i.y,_i.x,0];return!Ma(e,Xi,qi,Yi,lr)||(e=[1,0,0,0,1,0,0,0,1],!Ma(e,Xi,qi,Yi,lr))?!1:(cr.crossVectors(ti,ei),e=[cr.x,cr.y,cr.z],Ma(e,Xi,qi,Yi,lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Bn=[new I,new I,new I,new I,new I,new I,new I,new I],Sn=new I,or=new Oi,Xi=new I,qi=new I,Yi=new I,ti=new I,ei=new I,_i=new I,bs=new I,lr=new I,cr=new I,xi=new I;function Ma(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){xi.fromArray(s,r);const o=i.x*Math.abs(xi.x)+i.y*Math.abs(xi.y)+i.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ju=new Oi,Es=new I,Sa=new I;class Ss{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ju.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Es.subVectors(t,this.center);const e=Es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Es,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Es.copy(t.center).add(Sa)),this.expandByPoint(Es.copy(t.center).sub(Sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Gn=new I,ya=new I,hr=new I,ni=new I,Ta=new I,ur=new I,ba=new I;class mh{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ya.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,a=-this.direction.dot(hr),o=ni.dot(this.direction),l=-ni.dot(hr),c=ni.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ya).addScaledVector(hr,d),f}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,i,r){Ta.subVectors(e,t),ur.subVectors(n,t),ba.crossVectors(Ta,ur);let a=this.direction.dot(ba),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,t);const l=o*this.direction.dot(ur.crossVectors(ni,ur));if(l<0)return null;const c=o*this.direction.dot(Ta.cross(ni));if(c<0||l+c>a)return null;const h=-o*ni.dot(ba);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,n,i,r,a,o,l,c,h,u,d,f,m,v,g){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,f,m,v,g)}set(t,e,n,i,r,a,o,l,c,h,u,d,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ki.setFromMatrixColumn(t,0).length(),r=1/Ki.setFromMatrixColumn(t,1).length(),a=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d+v*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,m=o*h,v=o*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ju,t,Qu)}lookAt(t,e,n){const i=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ii.crossVectors(n,rn),ii.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ii.crossVectors(n,rn)),ii.normalize(),dr.crossVectors(rn,ii),i[0]=ii.x,i[4]=dr.x,i[8]=rn.x,i[1]=ii.y,i[5]=dr.y,i[9]=rn.y,i[2]=ii.z,i[6]=dr.z,i[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],b=n[3],S=n[7],x=n[11],w=n[15],A=i[0],R=i[4],C=i[8],y=i[12],M=i[1],L=i[5],N=i[9],V=i[13],q=i[2],H=i[6],Y=i[10],G=i[14],D=i[3],rt=i[7],et=i[11],ct=i[15];return r[0]=a*A+o*M+l*q+c*D,r[4]=a*R+o*L+l*H+c*rt,r[8]=a*C+o*N+l*Y+c*et,r[12]=a*y+o*V+l*G+c*ct,r[1]=h*A+u*M+d*q+f*D,r[5]=h*R+u*L+d*H+f*rt,r[9]=h*C+u*N+d*Y+f*et,r[13]=h*y+u*V+d*G+f*ct,r[2]=m*A+v*M+g*q+p*D,r[6]=m*R+v*L+g*H+p*rt,r[10]=m*C+v*N+g*Y+p*et,r[14]=m*y+v*V+g*G+p*ct,r[3]=b*A+S*M+x*q+w*D,r[7]=b*R+S*L+x*H+w*rt,r[11]=b*C+S*N+x*Y+w*et,r[15]=b*y+S*V+x*G+w*ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+v*(+e*l*f-e*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+g*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],b=u*g*c-v*d*c+v*l*f-o*g*f-u*l*p+o*d*p,S=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,x=h*v*c-m*u*c+m*o*f-a*v*f-h*o*p+a*u*p,w=m*u*l-h*v*l-m*o*d+a*v*d+h*o*g-a*u*g,A=e*b+n*S+i*x+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=b*R,t[1]=(v*d*r-u*g*r-v*i*f+n*g*f+u*i*p-n*d*p)*R,t[2]=(o*g*r-v*l*r+v*i*c-n*g*c-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*R,t[4]=S*R,t[5]=(h*g*r-m*d*r+m*i*f-e*g*f-h*i*p+e*d*p)*R,t[6]=(m*l*r-a*g*r-m*i*c+e*g*c+a*i*p-e*l*p)*R,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*f+e*l*f)*R,t[8]=x*R,t[9]=(m*u*r-h*v*r-m*n*f+e*v*f+h*n*p-e*u*p)*R,t[10]=(a*v*r-m*o*r+m*n*c-e*v*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*R,t[12]=w*R,t[13]=(h*v*i-m*u*i+m*n*d-e*v*d-h*n*g+e*u*g)*R,t[14]=(m*o*i-a*v*i-m*n*l+e*v*l+a*n*g-e*o*g)*R,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,m=r*u,v=a*h,g=a*u,p=o*u,b=l*c,S=l*h,x=l*u,w=n.x,A=n.y,R=n.z;return i[0]=(1-(v+p))*w,i[1]=(f+x)*w,i[2]=(m-S)*w,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(g+b)*A,i[7]=0,i[8]=(m+S)*R,i[9]=(g-b)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ki.set(i[0],i[1],i[2]).length();const a=Ki.set(i[4],i[5],i[6]).length(),o=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],yn.copy(this);const c=1/r,h=1/a,u=1/o;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,e.setFromRotationMatrix(yn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=In,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===In)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Jr)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=In,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),f=-(n+i)/(n-i);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===In)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===Jr)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ki=new I,yn=new de,ju=new I(0,0,0),Qu=new I(1,1,1),ii=new I,dr=new I,rn=new I,Bl=new de,Gl=new sr;class On{constructor(t=0,e=0,n=0,i=On.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}On.DEFAULT_ORDER="XYZ";class gh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let td=0;const zl=new I,$i=new sr,zn=new de,fr=new I,As=new I,ed=new I,nd=new sr,Hl=new I(1,0,0),Vl=new I(0,1,0),Wl=new I(0,0,1),Xl={type:"added"},id={type:"removed"},Zi={type:"childadded",child:null},Ea={type:"childremoved",child:null};class ve extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new I,e=new On,n=new sr,i=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new Kt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Hl,t)}rotateY(t){return this.rotateOnAxis(Vl,t)}rotateZ(t){return this.rotateOnAxis(Wl,t)}translateOnAxis(t,e){return zl.copy(t).applyQuaternion(this.quaternion),this.position.add(zl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hl,t)}translateY(t){return this.translateOnAxis(Vl,t)}translateZ(t){return this.translateOnAxis(Wl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(As,fr,this.up):zn.lookAt(fr,As,this.up),this.quaternion.setFromRotationMatrix(zn),i&&(zn.extractRotation(i.matrixWorld),$i.setFromRotationMatrix(zn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(id),Ea.child=t,this.dispatchEvent(Ea),Ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,ed),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,nd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ve.DEFAULT_UP=new I(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new I,Hn=new I,Aa=new I,Vn=new I,Ji=new I,ji=new I,ql=new I,wa=new I,Ra=new I,Ca=new I,Pa=new ue,La=new ue,Ia=new ue;class _n{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Tn.subVectors(t,e),i.cross(Tn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Tn.subVectors(i,e),Hn.subVectors(n,e),Aa.subVectors(t,e);const a=Tn.dot(Tn),o=Tn.dot(Hn),l=Tn.dot(Aa),c=Hn.dot(Hn),h=Hn.dot(Aa),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Vn.x),l.addScaledVector(a,Vn.y),l.addScaledVector(o,Vn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Pa.setScalar(0),La.setScalar(0),Ia.setScalar(0),Pa.fromBufferAttribute(t,e),La.fromBufferAttribute(t,n),Ia.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Pa,r.x),a.addScaledVector(La,r.y),a.addScaledVector(Ia,r.z),a}static isFrontFacing(t,e,n,i){return Tn.subVectors(n,e),Hn.subVectors(t,e),Tn.cross(Hn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),Tn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return _n.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return _n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Ji.subVectors(i,n),ji.subVectors(r,n),wa.subVectors(t,n);const l=Ji.dot(wa),c=ji.dot(wa);if(l<=0&&c<=0)return e.copy(n);Ra.subVectors(t,i);const h=Ji.dot(Ra),u=ji.dot(Ra);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ji,a);Ca.subVectors(t,r);const f=Ji.dot(Ca),m=ji.dot(Ca);if(m>=0&&f<=m)return e.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(ji,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return ql.subVectors(r,i),o=(u-h)/(u-h+(f-m)),e.copy(i).addScaledVector(ql,o);const p=1/(g+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Ji,a).addScaledVector(ji,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Da(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=re.workingColorSpace){if(t=Hu(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Da(a,r,t+1/3),this.g=Da(a,r,t),this.b=Da(a,r,t-1/3)}return re.colorSpaceToWorking(this,i),this}setStyle(t,e=Re){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const n=vh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=jn(t.r),this.g=jn(t.g),this.b=jn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return re.workingToColorSpace(Oe.copy(this),t),Math.round(Qt(Oe.r*255,0,255))*65536+Math.round(Qt(Oe.g*255,0,255))*256+Math.round(Qt(Oe.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,i=Oe.g,r=Oe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=Re){re.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,i=Oe.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(pr);const n=ma(si.h,pr.h,e),i=ma(si.s,pr.s,e),r=ma(si.l,pr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Xt;Xt.NAMES=vh;let sd=0;class ki extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=Pi,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=ho,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==co&&(n.blendSrc=this.blendSrc),this.blendDst!==ho&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class cn extends ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new I,mr=new ut;let rd=0;class be{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Zo,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Zo&&(t.usage=this.usage),t}}class _h extends be{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends be{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends be{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ad=0;const mn=new de,Ua=new ve,Qi=new I,an=new Oi,ws=new Oi,Le=new I;class Ae extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fh(t)?xh:_h)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return Ua.lookAt(t),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _e(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Le.addVectors(an.min,ws.min),an.expandByPoint(Le),Le.addVectors(an.max,ws.max),an.expandByPoint(Le)):(an.expandByPoint(ws.min),an.expandByPoint(ws.max))}an.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Le.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Le));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Le.fromBufferAttribute(o,c),l&&(Qi.fromBufferAttribute(t,c),Le.add(Qi)),i=Math.max(i,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new be(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new I,l[C]=new I;const c=new I,h=new I,u=new I,d=new ut,f=new ut,m=new ut,v=new I,g=new I;function p(C,y,M){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,y),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(L),o[C].add(v),o[y].add(v),o[M].add(v),l[C].add(g),l[y].add(g),l[M].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let C=0,y=b.length;C<y;++C){const M=b[C],L=M.start,N=M.count;for(let V=L,q=L+N;V<q;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const S=new I,x=new I,w=new I,A=new I;function R(C){w.fromBufferAttribute(i,C),A.copy(w);const y=o[C];S.copy(y),S.sub(w.multiplyScalar(w.dot(y))).normalize(),x.crossVectors(A,y);const L=x.dot(l[C])<0?-1:1;a.setXYZW(C,S.x,S.y,S.z,L)}for(let C=0,y=b.length;C<y;++C){const M=b[C],L=M.start,N=M.count;for(let V=L,q=L+N;V<q;V+=3)R(t.getX(V+0)),R(t.getX(V+1)),R(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new be(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yl=new de,Mi=new mh,gr=new Ss,Kl=new I,vr=new I,_r=new I,xr=new I,Fa=new I,Mr=new I,$l=new I,Sr=new I;class ee extends ve{constructor(t=new Ae,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Mr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Fa.fromBufferAttribute(u,t),a?Mr.addScaledVector(Fa,h):Mr.addScaledVector(Fa.sub(e),h))}e.add(Mr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(gr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(gr,Kl)===null||Mi.origin.distanceToSquared(Kl)>(t.far-t.near)**2))&&(Yl.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(Yl),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),S=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=b,w=S;x<w;x+=3){const A=o.getX(x),R=o.getX(x+1),C=o.getX(x+2);i=yr(this,p,t,n,c,h,u,A,R,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const b=o.getX(g),S=o.getX(g+1),x=o.getX(g+2);i=yr(this,a,t,n,c,h,u,b,S,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),S=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=b,w=S;x<w;x+=3){const A=x,R=x+1,C=x+2;i=yr(this,p,t,n,c,h,u,A,R,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const b=g,S=g+1,x=g+2;i=yr(this,a,t,n,c,h,u,b,S,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function od(s,t,e,n,i,r,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===pi,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:s}}function yr(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,vr),s.getVertexPosition(l,_r),s.getVertexPosition(c,xr);const h=od(s,t,e,n,vr,_r,xr,$l);if(h){const u=new I;_n.getBarycoord($l,vr,_r,xr,u),i&&(h.uv=_n.getInterpolatedAttribute(i,o,l,c,u,new ut)),r&&(h.uv1=_n.getInterpolatedAttribute(r,o,l,c,u,new ut)),a&&(h.normal=_n.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};_n.getNormal(vr,_r,xr,d.normal),h.face=d,h.barycoord=u}return h}class Ue extends Ae{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(u,2));function m(v,g,p,b,S,x,w,A,R,C,y){const M=x/R,L=w/C,N=x/2,V=w/2,q=A/2,H=R+1,Y=C+1;let G=0,D=0;const rt=new I;for(let et=0;et<Y;et++){const ct=et*L-V;for(let yt=0;yt<H;yt++){const bt=yt*M-N;rt[v]=bt*b,rt[g]=ct*S,rt[p]=q,c.push(rt.x,rt.y,rt.z),rt[v]=0,rt[g]=0,rt[p]=A>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(yt/R),u.push(1-et/C),G+=1}}for(let et=0;et<C;et++)for(let ct=0;ct<R;ct++){const yt=d+ct+H*et,bt=d+ct+H*(et+1),Jt=d+(ct+1)+H*(et+1),Ht=d+(ct+1)+H*et;l.push(yt,bt,Ht),l.push(bt,Jt,Ht),D+=6}o.addGroup(f,D,y),f+=D,d+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ue(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function We(s){const t={};for(let e=0;e<s.length;e++){const n=gs(s[e]);for(const i in n)t[i]=n[i]}return t}function ld(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Mh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const cd={clone:gs,merge:We};var hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ye extends ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hd,this.fragmentShader=ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gs(t.uniforms),this.uniformsGroups=ld(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sh extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new I,Zl=new ut,Jl=new ut;class je extends Sh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=jr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return jr*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,Zl,Jl),e.subVectors(Jl,Zl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ts=-90,es=1;class dd extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new je(ts,es,t,e);i.layers=this.layers,this.add(i);const r=new je(ts,es,t,e);r.layers=this.layers,this.add(r);const a=new je(ts,es,t,e);a.layers=this.layers,this.add(a);const o=new je(ts,es,t,e);o.layers=this.layers,this.add(o);const l=new je(ts,es,t,e);l.layers=this.layers,this.add(l);const c=new je(ts,es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===In)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class yh extends ze{constructor(t=[],e=ps,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fd extends Fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new yh(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ue(5,5,5),r=new Ye({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:di});r.uniforms.tEquirect.value=e;const a=new ee(i,r),o=e.minFilter;return e.minFilter===Ri&&(e.minFilter=Be),new dd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class Dn extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pd={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pd)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Dn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ml{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xt(t),this.density=e}clone(){return new ml(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Th extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class md{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Zo,this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new I;class ta{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Pn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ta(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ea extends ki{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ns;const Rs=new I,is=new I,ss=new I,rs=new ut,Cs=new ut,bh=new de,Tr=new I,Ps=new I,br=new I,jl=new ut,Oa=new ut,Ql=new ut;class Jo extends ve{constructor(t=new ea){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new md(e,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new ta(n,3,0,!1)),ns.setAttribute("uv",new ta(n,2,3,!1))}this.geometry=ns,this.material=t,this.center=new ut(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),bh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Er(Tr.set(-.5,-.5,0),ss,a,is,i,r),Er(Ps.set(.5,-.5,0),ss,a,is,i,r),Er(br.set(.5,.5,0),ss,a,is,i,r),jl.set(0,0),Oa.set(1,0),Ql.set(1,1);let o=t.ray.intersectTriangle(Tr,Ps,br,!1,Rs);if(o===null&&(Er(Ps.set(-.5,.5,0),ss,a,is,i,r),Oa.set(0,1),o=t.ray.intersectTriangle(Tr,br,Ps,!1,Rs),o===null))return;const l=t.ray.origin.distanceTo(Rs);l<t.near||l>t.far||e.push({distance:l,point:Rs.clone(),uv:_n.getInterpolation(Rs,Tr,Ps,br,jl,Oa,Ql,new ut),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Er(s,t,e,n,i,r){rs.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Cs.x=r*rs.x-i*rs.y,Cs.y=i*rs.x+r*rs.y):Cs.copy(rs),s.copy(t),s.x+=Cs.x,s.y+=Cs.y,s.applyMatrix4(bh)}class gd extends ze{constructor(t=null,e=1,n=1,i,r,a,o,l,c=dn,h=dn,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tc extends be{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const as=new de,ec=new de,Ar=[],nc=new Oi,vd=new de,Ls=new ee,Is=new Ss;class ln extends ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new tc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,vd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Oi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),nc.copy(t.boundingBox).applyMatrix4(as),this.boundingBox.union(nc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Is.copy(t.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Is)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(n),t.ray.intersectsSphere(Is)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,as),ec.multiplyMatrices(n,as),Ls.matrixWorld=ec,Ls.raycast(t,Ar);for(let a=0,o=Ar.length;a<o;a++){const l=Ar[a];l.instanceId=r,l.object=this,e.push(l)}Ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new gd(new Float32Array(i*this.count),i,this.count,hl,Ln));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ka=new I,_d=new I,xd=new Kt;class bi{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ka.subVectors(n,e).cross(_d.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ka),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||xd.getNormalMatrix(t),i=this.coplanarPoint(ka).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Si=new Ss,Md=new ut(.5,.5),wr=new I;class gl{constructor(t=new bi,e=new bi,n=new bi,i=new bi,r=new bi,a=new bi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=In,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],b=r[12],S=r[13],x=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,p-m,w-b).normalize(),i[1].setComponents(c+a,f+h,p+m,w+b).normalize(),i[2].setComponents(c+o,f+u,p+v,w+S).normalize(),i[3].setComponents(c-o,f-u,p-v,w-S).normalize(),n)i[4].setComponents(l,d,g,x).normalize(),i[5].setComponents(c-l,f-d,p-g,w-x).normalize();else if(i[4].setComponents(c-l,f-d,p-g,w-x).normalize(),e===In)i[5].setComponents(c+l,f+d,p+g,w+x).normalize();else if(e===Jr)i[5].setComponents(l,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(t){Si.center.set(0,0,0);const e=Md.distanceTo(t.center);return Si.radius=.7071067811865476+e,Si.applyMatrix4(t.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(wr.x=i.normal.x>0?t.max.x:t.min.x,wr.y=i.normal.y>0?t.max.y:t.min.y,wr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Eh extends ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const na=new I,ia=new I,ic=new de,Ds=new mh,Rr=new Ss,Ba=new I,sc=new I;class Sd extends ve{constructor(t=new Ae,e=new Eh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)na.fromBufferAttribute(e,i-1),ia.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=na.distanceTo(ia);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(i),Rr.radius+=r,t.ray.intersectsSphere(Rr)===!1)return;ic.copy(i).invert(),Ds.copy(t.ray).applyMatrix4(ic);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){const p=h.getX(v),b=h.getX(v+1),S=Cr(this,t,Ds,l,p,b,v);S&&e.push(S)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(f),p=Cr(this,t,Ds,l,v,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let v=f,g=m-1;v<g;v+=c){const p=Cr(this,t,Ds,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=Cr(this,t,Ds,l,m-1,f,m-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Cr(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(na.fromBufferAttribute(o,i),ia.fromBufferAttribute(o,r),e.distanceSqToSegment(na,ia,Ba,sc)>n)return;Ba.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ba);if(!(c<t.near||c>t.far))return{distance:c,point:sc.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const rc=new I,ac=new I;class yd extends Sd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)rc.fromBufferAttribute(e,i),ac.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rc.distanceTo(ac);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qn extends ze{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ah extends ze{constructor(t,e,n=Ii,i,r,a,o=dn,l=dn,c,h=$s,u=1){if(h!==$s&&h!==Zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new pl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class wh extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class vl extends Ae{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new I,h=new ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new _e(a,3)),this.setAttribute("normal",new _e(o,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Kn extends Ae{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;b(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new _e(u,3)),this.setAttribute("normal",new _e(d,3)),this.setAttribute("uv",new _e(f,2));function b(){const x=new I,w=new I;let A=0;const R=(e-t)/n;for(let C=0;C<=r;C++){const y=[],M=C/r,L=M*(e-t)+t;for(let N=0;N<=i;N++){const V=N/i,q=V*l+o,H=Math.sin(q),Y=Math.cos(q);w.x=L*H,w.y=-M*n+g,w.z=L*Y,u.push(w.x,w.y,w.z),x.set(H,R,Y).normalize(),d.push(x.x,x.y,x.z),f.push(V,1-M),y.push(m++)}v.push(y)}for(let C=0;C<i;C++)for(let y=0;y<r;y++){const M=v[y][C],L=v[y+1][C],N=v[y+1][C+1],V=v[y][C+1];(t>0||y!==0)&&(h.push(M,L,V),A+=3),(e>0||y!==r-1)&&(h.push(L,N,V),A+=3)}c.addGroup(p,A,0),p+=A}function S(x){const w=m,A=new ut,R=new I;let C=0;const y=x===!0?t:e,M=x===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const L=m;for(let N=0;N<=i;N++){const q=N/i*l+o,H=Math.cos(q),Y=Math.sin(q);R.x=y*Y,R.y=g*M,R.z=y*H,u.push(R.x,R.y,R.z),d.push(0,M,0),A.x=H*.5+.5,A.y=Y*.5*M+.5,f.push(A.x,A.y),m++}for(let N=0;N<i;N++){const V=w+N,q=L+N;x===!0?h.push(q,q+1,V):h.push(q+1,q,V),C+=3}c.addGroup(p,C,x===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sa extends Kn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new sa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _l extends Ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(r.slice(),3)),this.setAttribute("uv",new _e(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const S=new I,x=new I,w=new I;for(let A=0;A<e.length;A+=3)f(e[A+0],S),f(e[A+1],x),f(e[A+2],w),l(S,x,w,b)}function l(b,S,x,w){const A=w+1,R=[];for(let C=0;C<=A;C++){R[C]=[];const y=b.clone().lerp(x,C/A),M=S.clone().lerp(x,C/A),L=A-C;for(let N=0;N<=L;N++)N===0&&C===A?R[C][N]=y:R[C][N]=y.clone().lerp(M,N/L)}for(let C=0;C<A;C++)for(let y=0;y<2*(A-C)-1;y++){const M=Math.floor(y/2);y%2===0?(d(R[C][M+1]),d(R[C+1][M]),d(R[C][M])):(d(R[C][M+1]),d(R[C+1][M+1]),d(R[C+1][M]))}}function c(b){const S=new I;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(b),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const b=new I;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];const x=g(b)/2/Math.PI+.5,w=p(b)/Math.PI+.5;a.push(x,1-w)}m(),u()}function u(){for(let b=0;b<a.length;b+=6){const S=a[b+0],x=a[b+2],w=a[b+4],A=Math.max(S,x,w),R=Math.min(S,x,w);A>.9&&R<.1&&(S<.2&&(a[b+0]+=1),x<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,S){const x=b*3;S.x=t[x+0],S.y=t[x+1],S.z=t[x+2]}function m(){const b=new I,S=new I,x=new I,w=new I,A=new ut,R=new ut,C=new ut;for(let y=0,M=0;y<r.length;y+=9,M+=6){b.set(r[y+0],r[y+1],r[y+2]),S.set(r[y+3],r[y+4],r[y+5]),x.set(r[y+6],r[y+7],r[y+8]),A.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),C.set(a[M+4],a[M+5]),w.copy(b).add(S).add(x).divideScalar(3);const L=g(w);v(A,M+0,b,L),v(R,M+2,S,L),v(C,M+4,x,L)}}function v(b,S,x,w){w<0&&b.x===1&&(a[S]=b.x-1),x.x===0&&x.z===0&&(a[S]=w/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _l(t.vertices,t.indices,t.radius,t.details)}}class kn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ut:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new I,i=[],r=[],a=[],o=new I,l=new de;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Qt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Qt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class xl extends kn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ut){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Td extends xl{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ml(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Pr=new I,Ga=new Ml,za=new Ml,Ha=new Ml;class bd extends kn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Pr.subVectors(i[0],i[1]).add(i[0]),c=Pr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Pr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Pr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Ga.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),za.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),Ha.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(Ga.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),za.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ha.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ga.calc(l),za.calc(l),Ha.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function oc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Ed(s,t){const e=1-s;return e*e*t}function Ad(s,t){return 2*(1-s)*s*t}function wd(s,t){return s*s*t}function zs(s,t,e,n){return Ed(s,t)+Ad(s,e)+wd(s,n)}function Rd(s,t){const e=1-s;return e*e*e*t}function Cd(s,t){const e=1-s;return 3*e*e*s*t}function Pd(s,t){return 3*(1-s)*s*s*t}function Ld(s,t){return s*s*s*t}function Hs(s,t,e,n,i){return Rd(s,t)+Cd(s,e)+Pd(s,n)+Ld(s,i)}class Rh extends kn{constructor(t=new ut,e=new ut,n=new ut,i=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,i.x,r.x,a.x,o.x),Hs(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Id extends kn{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hs(t,i.x,r.x,a.x,o.x),Hs(t,i.y,r.y,a.y,o.y),Hs(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ch extends kn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dd extends kn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ph extends kn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(zs(t,i.x,r.x,a.x),zs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ud extends kn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(zs(t,i.x,r.x,a.x),zs(t,i.y,r.y,a.y),zs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lh extends kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(oc(o,l.x,c.x,h.x,u.x),oc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ut().fromArray(i))}return this}}var jo=Object.freeze({__proto__:null,ArcCurve:Td,CatmullRomCurve3:bd,CubicBezierCurve:Rh,CubicBezierCurve3:Id,EllipseCurve:xl,LineCurve:Ch,LineCurve3:Dd,QuadraticBezierCurve:Ph,QuadraticBezierCurve3:Ud,SplineCurve:Lh});class Fd extends kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new jo[i.type]().fromJSON(i))}return this}}class lc extends Fd{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ch(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Ph(this.currentPoint.clone(),new ut(t,e),new ut(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Rh(this.currentPoint.clone(),new ut(t,e),new ut(n,i),new ut(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Lh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new xl(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ih extends lc{constructor(t){super(t),this.uuid=Jn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new lc().fromJSON(i))}return this}}function Nd(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Dh(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=zd(s,t,r,e)),s.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=e;d<i;d+=e){const f=s[d],m=s[d+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return js(r,a,e,o,l,c,0),a}function Dh(s,t,e,n,i){let r;if(i===jd(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=cc(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=cc(a/n|0,s[a],s[a+1],r);return r&&vs(r,r.next)&&(tr(r),r=r.next),r}function Ui(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(vs(e,e.next)||ye(e.prev,e,e.next)===0)){if(tr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function js(s,t,e,n,i,r,a){if(!s)return;!a&&r&&qd(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?kd(s,n,i,r):Od(s)){t.push(l.i,s.i,c.i),tr(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Bd(Ui(s),t),js(s,t,e,n,i,r,2)):a===2&&Gd(s,t,e,n,i,r):js(Ui(s),t,e,n,i,r,1);break}}}function Od(s){const t=s.prev,e=s,n=s.next;if(ye(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),d=Math.max(i,r,a),f=Math.max(o,l,c);let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Bs(i,o,r,l,a,c,m.x,m.y)&&ye(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function kd(s,t,e,n){const i=s.prev,r=s,a=s.next;if(ye(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=Math.min(o,l,c),m=Math.min(h,u,d),v=Math.max(o,l,c),g=Math.max(h,u,d),p=Qo(f,m,t,e,n),b=Qo(v,g,t,e,n);let S=s.prevZ,x=s.nextZ;for(;S&&S.z>=p&&x&&x.z<=b;){if(S.x>=f&&S.x<=v&&S.y>=m&&S.y<=g&&S!==i&&S!==a&&Bs(o,h,l,u,c,d,S.x,S.y)&&ye(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Bs(o,h,l,u,c,d,x.x,x.y)&&ye(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=v&&S.y>=m&&S.y<=g&&S!==i&&S!==a&&Bs(o,h,l,u,c,d,S.x,S.y)&&ye(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=b;){if(x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&Bs(o,h,l,u,c,d,x.x,x.y)&&ye(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Bd(s,t){let e=s;do{const n=e.prev,i=e.next.next;!vs(n,i)&&Fh(n,e,e.next,i)&&Qs(n,i)&&Qs(i,n)&&(t.push(n.i,e.i,i.i),tr(e),tr(e.next),e=s=i),e=e.next}while(e!==s);return Ui(e)}function Gd(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&$d(a,o)){let l=Nh(a,o);a=Ui(a,a.next),l=Ui(l,l.next),js(a,t,e,n,i,r,0),js(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function zd(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Dh(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Kd(c))}i.sort(Hd);for(let r=0;r<i.length;r++)e=Vd(i[r],e);return e}function Hd(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Vd(s,t){const e=Wd(s,t);if(!e)return t;const n=Nh(e,s);return Ui(n,n.next),Ui(e,e.next)}function Wd(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(vs(s,e))return e;do{if(vs(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Uh(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);Qs(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Xd(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Xd(s,t){return ye(s.prev,s,t.prev)<0&&ye(t.next,s,s.next)<0}function qd(s,t,e,n){let i=s;do i.z===0&&(i.z=Qo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Yd(i)}function Yd(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Qo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Kd(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Uh(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Bs(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Uh(s,t,e,n,i,r,a,o)}function $d(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Zd(s,t)&&(Qs(s,t)&&Qs(t,s)&&Jd(s,t)&&(ye(s.prev,s,t.prev)||ye(s,t.prev,t))||vs(s,t)&&ye(s.prev,s,s.next)>0&&ye(t.prev,t,t.next)>0)}function ye(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function vs(s,t){return s.x===t.x&&s.y===t.y}function Fh(s,t,e,n){const i=Ir(ye(s,t,e)),r=Ir(ye(s,t,n)),a=Ir(ye(e,n,s)),o=Ir(ye(e,n,t));return!!(i!==r&&a!==o||i===0&&Lr(s,e,t)||r===0&&Lr(s,n,t)||a===0&&Lr(e,s,n)||o===0&&Lr(e,t,n))}function Lr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ir(s){return s>0?1:s<0?-1:0}function Zd(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Fh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Qs(s,t){return ye(s.prev,s,s.next)<0?ye(s,t,s.next)>=0&&ye(s,s.prev,t)>=0:ye(s,t,s.prev)<0||ye(s,s.next,t)<0}function Jd(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Nh(s,t){const e=tl(s.i,s.x,s.y),n=tl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function cc(s,t,e,n){const i=tl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function tr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function tl(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function jd(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Qd{static triangulate(t,e,n=2){return Nd(t,e,n)}}class hs{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return hs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];hc(t),uc(n,t);let a=t.length;e.forEach(hc);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,uc(n,e[l]);const o=Qd.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function hc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function uc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Sl extends Ae{constructor(t=new Ih([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new _e(i,3)),this.setAttribute("uv",new _e(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:tf;let S,x=!1,w,A,R,C;p&&(S=p.getSpacedPoints(h),x=!0,d=!1,w=p.computeFrenetFrames(h,!1),A=new I,R=new I,C=new I),d||(g=0,f=0,m=0,v=0);const y=o.extractPoints(c);let M=y.shape;const L=y.holes;if(!hs.isClockWise(M)){M=M.reverse();for(let it=0,J=L.length;it<J;it++){const j=L[it];hs.isClockWise(j)&&(L[it]=j.reverse())}}function V(it){const j=10000000000000001e-36;let Q=it[0];for(let mt=1;mt<=it.length;mt++){const at=mt%it.length,gt=it[at],Wt=gt.x-Q.x,zt=gt.y-Q.y,E=Wt*Wt+zt*zt,_=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs(Q.x),Math.abs(Q.y)),k=j*_*_;if(E<=k){it.splice(at,1),mt--;continue}Q=gt}}V(M),L.forEach(V);const q=L.length,H=M;for(let it=0;it<q;it++){const J=L[it];M=M.concat(J)}function Y(it,J,j){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(J,j)}const G=M.length;function D(it,J,j){let Q,mt,at;const gt=it.x-J.x,Wt=it.y-J.y,zt=j.x-it.x,E=j.y-it.y,_=gt*gt+Wt*Wt,k=gt*E-Wt*zt;if(Math.abs(k)>Number.EPSILON){const K=Math.sqrt(_),st=Math.sqrt(zt*zt+E*E),$=J.x-Wt/K,Ct=J.y+gt/K,dt=j.x-E/st,Pt=j.y+zt/st,Lt=((dt-$)*E-(Pt-Ct)*zt)/(gt*E-Wt*zt);Q=$+gt*Lt-it.x,mt=Ct+Wt*Lt-it.y;const ot=Q*Q+mt*mt;if(ot<=2)return new ut(Q,mt);at=Math.sqrt(ot/2)}else{let K=!1;gt>Number.EPSILON?zt>Number.EPSILON&&(K=!0):gt<-Number.EPSILON?zt<-Number.EPSILON&&(K=!0):Math.sign(Wt)===Math.sign(E)&&(K=!0),K?(Q=-Wt,mt=gt,at=Math.sqrt(_)):(Q=gt,mt=Wt,at=Math.sqrt(_/2))}return new ut(Q/at,mt/at)}const rt=[];for(let it=0,J=H.length,j=J-1,Q=it+1;it<J;it++,j++,Q++)j===J&&(j=0),Q===J&&(Q=0),rt[it]=D(H[it],H[j],H[Q]);const et=[];let ct,yt=rt.concat();for(let it=0,J=q;it<J;it++){const j=L[it];ct=[];for(let Q=0,mt=j.length,at=mt-1,gt=Q+1;Q<mt;Q++,at++,gt++)at===mt&&(at=0),gt===mt&&(gt=0),ct[Q]=D(j[Q],j[at],j[gt]);et.push(ct),yt=yt.concat(ct)}let bt;if(g===0)bt=hs.triangulateShape(H,L);else{const it=[],J=[];for(let j=0;j<g;j++){const Q=j/g,mt=f*Math.cos(Q*Math.PI/2),at=m*Math.sin(Q*Math.PI/2)+v;for(let gt=0,Wt=H.length;gt<Wt;gt++){const zt=Y(H[gt],rt[gt],at);Dt(zt.x,zt.y,-mt),Q===0&&it.push(zt)}for(let gt=0,Wt=q;gt<Wt;gt++){const zt=L[gt];ct=et[gt];const E=[];for(let _=0,k=zt.length;_<k;_++){const K=Y(zt[_],ct[_],at);Dt(K.x,K.y,-mt),Q===0&&E.push(K)}Q===0&&J.push(E)}}bt=hs.triangulateShape(it,J)}const Jt=bt.length,Ht=m+v;for(let it=0;it<G;it++){const J=d?Y(M[it],yt[it],Ht):M[it];x?(R.copy(w.normals[0]).multiplyScalar(J.x),A.copy(w.binormals[0]).multiplyScalar(J.y),C.copy(S[0]).add(R).add(A),Dt(C.x,C.y,C.z)):Dt(J.x,J.y,0)}for(let it=1;it<=h;it++)for(let J=0;J<G;J++){const j=d?Y(M[J],yt[J],Ht):M[J];x?(R.copy(w.normals[it]).multiplyScalar(j.x),A.copy(w.binormals[it]).multiplyScalar(j.y),C.copy(S[it]).add(R).add(A),Dt(C.x,C.y,C.z)):Dt(j.x,j.y,u/h*it)}for(let it=g-1;it>=0;it--){const J=it/g,j=f*Math.cos(J*Math.PI/2),Q=m*Math.sin(J*Math.PI/2)+v;for(let mt=0,at=H.length;mt<at;mt++){const gt=Y(H[mt],rt[mt],Q);Dt(gt.x,gt.y,u+j)}for(let mt=0,at=L.length;mt<at;mt++){const gt=L[mt];ct=et[mt];for(let Wt=0,zt=gt.length;Wt<zt;Wt++){const E=Y(gt[Wt],ct[Wt],Q);x?Dt(E.x,E.y+S[h-1].y,S[h-1].x+j):Dt(E.x,E.y,u+j)}}}Z(),tt();function Z(){const it=i.length/3;if(d){let J=0,j=G*J;for(let Q=0;Q<Jt;Q++){const mt=bt[Q];xt(mt[2]+j,mt[1]+j,mt[0]+j)}J=h+g*2,j=G*J;for(let Q=0;Q<Jt;Q++){const mt=bt[Q];xt(mt[0]+j,mt[1]+j,mt[2]+j)}}else{for(let J=0;J<Jt;J++){const j=bt[J];xt(j[2],j[1],j[0])}for(let J=0;J<Jt;J++){const j=bt[J];xt(j[0]+G*h,j[1]+G*h,j[2]+G*h)}}n.addGroup(it,i.length/3-it,0)}function tt(){const it=i.length/3;let J=0;pt(H,J),J+=H.length;for(let j=0,Q=L.length;j<Q;j++){const mt=L[j];pt(mt,J),J+=mt.length}n.addGroup(it,i.length/3-it,1)}function pt(it,J){let j=it.length;for(;--j>=0;){const Q=j;let mt=j-1;mt<0&&(mt=it.length-1);for(let at=0,gt=h+g*2;at<gt;at++){const Wt=G*at,zt=G*(at+1),E=J+Q+Wt,_=J+mt+Wt,k=J+mt+zt,K=J+Q+zt;qt(E,_,k,K)}}}function Dt(it,J,j){l.push(it),l.push(J),l.push(j)}function xt(it,J,j){ne(it),ne(J),ne(j);const Q=i.length/3,mt=b.generateTopUV(n,i,Q-3,Q-2,Q-1);P(mt[0]),P(mt[1]),P(mt[2])}function qt(it,J,j,Q){ne(it),ne(J),ne(Q),ne(J),ne(j),ne(Q);const mt=i.length/3,at=b.generateSideWallUV(n,i,mt-6,mt-3,mt-2,mt-1);P(at[0]),P(at[1]),P(at[3]),P(at[1]),P(at[2]),P(at[3])}function ne(it){i.push(l[it*3+0]),i.push(l[it*3+1]),i.push(l[it*3+2])}function P(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return ef(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new jo[i.type]().fromJSON(i)),new Sl(n,t.options)}}const tf={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new ut(r,a),new ut(o,l),new ut(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],m=t[i*3+2],v=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ut(a,1-l),new ut(c,1-u),new ut(d,1-m),new ut(v,1-p)]:[new ut(o,1-l),new ut(h,1-u),new ut(f,1-m),new ut(g,1-p)]}};function ef(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class yl extends _l{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new yl(t.radius,t.detail)}}class Un extends Ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const b=p*d-a;for(let S=0;S<c;S++){const x=S*u-r;m.push(x,-b,0),v.push(0,0,1),g.push(S/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const S=b+c*p,x=b+c*(p+1),w=b+1+c*(p+1),A=b+1+c*p;f.push(S,x,A),f.push(x,w,A)}this.setIndex(f),this.setAttribute("position",new _e(m,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Un(t.width,t.height,t.widthSegments,t.heightSegments)}}class la extends Ae{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new I,d=new I,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const b=[],S=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let w=0;w<=e;w++){const A=w/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+S*o),u.y=t*Math.cos(a+S*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+S*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(A+x,1-S),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const S=h[p][b+1],x=h[p][b],w=h[p+1][b],A=h[p+1][b+1];(p!==0||a>0)&&f.push(S,x,A),(p!==n-1||l<Math.PI)&&f.push(x,w,A)}this.setIndex(f),this.setAttribute("position",new _e(m,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new la(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class De extends ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nf extends ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sf extends ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ca extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Va=new de,dc=new I,fc=new I;class Tl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gl,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;dc.setFromMatrixPosition(t.matrixWorld),e.position.copy(dc),fc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fc),e.updateMatrixWorld(),Va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Va,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class rf extends Tl{constructor(){super(new je(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=jr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class af extends ca{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new rf}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const pc=new de,Us=new I,Wa=new I;class of extends Tl{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new ue(2,1,1,1),new ue(0,1,1,1),new ue(3,1,1,1),new ue(1,1,1,1),new ue(3,0,1,1),new ue(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Us.setFromMatrixPosition(t.matrixWorld),n.position.copy(Us),Wa.copy(n.position),Wa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Wa),n.updateMatrixWorld(),i.makeTranslation(-Us.x,-Us.y,-Us.z),pc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pc,n.coordinateSystem,n.reversedDepth)}}class lf extends ca{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new of}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class bl extends Sh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class cf extends Tl{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hf extends ca{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new cf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class uf extends ca{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class df extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function mc(s,t,e,n){const i=ff(n);switch(e){case lh:return s*t;case hl:return s*t/i.components*i.byteLength;case ul:return s*t/i.components*i.byteLength;case hh:return s*t*2/i.components*i.byteLength;case dl:return s*t*2/i.components*i.byteLength;case ch:return s*t*3/i.components*i.byteLength;case En:return s*t*4/i.components*i.byteLength;case fl:return s*t*4/i.components*i.byteLength;case zr:case Hr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Vr:case Wr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case To:case Eo:return Math.max(s,16)*Math.max(t,8)/4;case yo:case bo:return Math.max(s,8)*Math.max(t,8)/2;case Ao:case wo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Io:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Do:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case No:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ko:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Go:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Wo:case Xo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case qo:case Yo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ko:case $o:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ff(s){switch(s){case Nn:case sh:return{byteLength:1,components:1};case Ys:case rh:case xs:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case Ii:case ol:case Ln:return{byteLength:4,components:1};case ah:case oh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function Oh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function pf(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gf=`#ifdef USE_ALPHAHASH
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
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sf=`#ifdef USE_AOMAP
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
#endif`,yf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tf=`#ifdef USE_BATCHING
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
#endif`,bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rf=`#ifdef USE_IRIDESCENCE
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
#endif`,Cf=`#ifdef USE_BUMPMAP
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
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
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
#endif`,kf=`#define PI 3.141592653589793
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
} // validated`,Bf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gf=`vec3 transformedNormal = objectNormal;
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
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xf="gl_FragColor = linearToOutputTexel( gl_FragColor );",qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yf=`#ifdef USE_ENVMAP
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
#endif`,Kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,np=`#ifdef USE_GRADIENTMAP
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
}`,ip=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ap=`uniform bool receiveShadow;
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
#endif`,op=`#ifdef USE_ENVMAP
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
#endif`,lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dp=`PhysicalMaterial material;
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
#endif`,fp=`struct PhysicalMaterial {
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
}`,pp=`
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
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
#endif`,gp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bp=`#if defined( USE_POINTS_UV )
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
#endif`,Ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ap=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`#ifdef USE_MORPHTARGETS
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
#endif`,Lp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Np=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Op=`#ifdef USE_NORMALMAP
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
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
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
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qp=`float getShadowMask() {
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
}`,tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,em=`#ifdef USE_SKINNING
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
#endif`,nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
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
#endif`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mm=`uniform sampler2D t2D;
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`#include <common>
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
}`,Sm=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ym=`#define DISTANCE
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
}`,Tm=`#define DISTANCE
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
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`uniform float scale;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Pm=`#define LAMBERT
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
}`,Lm=`#define LAMBERT
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
}`,Im=`#define MATCAP
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
}`,Dm=`#define MATCAP
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
}`,Um=`#define NORMAL
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
}`,Fm=`#define NORMAL
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
}`,Nm=`#define PHONG
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
}`,Om=`#define PHONG
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
}`,km=`#define STANDARD
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
}`,Bm=`#define STANDARD
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
}`,Gm=`#define TOON
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
}`,zm=`#define TOON
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
}`,Hm=`uniform float size;
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
}`,Vm=`uniform vec3 diffuse;
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
}`,Wm=`#include <common>
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
}`,Xm=`uniform vec3 color;
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
}`,qm=`uniform float rotation;
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
}`,Ym=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:mf,alphahash_pars_fragment:gf,alphamap_fragment:vf,alphamap_pars_fragment:_f,alphatest_fragment:xf,alphatest_pars_fragment:Mf,aomap_fragment:Sf,aomap_pars_fragment:yf,batching_pars_vertex:Tf,batching_vertex:bf,begin_vertex:Ef,beginnormal_vertex:Af,bsdfs:wf,iridescence_fragment:Rf,bumpmap_pars_fragment:Cf,clipping_planes_fragment:Pf,clipping_planes_pars_fragment:Lf,clipping_planes_pars_vertex:If,clipping_planes_vertex:Df,color_fragment:Uf,color_pars_fragment:Ff,color_pars_vertex:Nf,color_vertex:Of,common:kf,cube_uv_reflection_fragment:Bf,defaultnormal_vertex:Gf,displacementmap_pars_vertex:zf,displacementmap_vertex:Hf,emissivemap_fragment:Vf,emissivemap_pars_fragment:Wf,colorspace_fragment:Xf,colorspace_pars_fragment:qf,envmap_fragment:Yf,envmap_common_pars_fragment:Kf,envmap_pars_fragment:$f,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:op,envmap_vertex:Jf,fog_vertex:jf,fog_pars_vertex:Qf,fog_fragment:tp,fog_pars_fragment:ep,gradientmap_pars_fragment:np,lightmap_pars_fragment:ip,lights_lambert_fragment:sp,lights_lambert_pars_fragment:rp,lights_pars_begin:ap,lights_toon_fragment:lp,lights_toon_pars_fragment:cp,lights_phong_fragment:hp,lights_phong_pars_fragment:up,lights_physical_fragment:dp,lights_physical_pars_fragment:fp,lights_fragment_begin:pp,lights_fragment_maps:mp,lights_fragment_end:gp,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:_p,logdepthbuf_pars_vertex:xp,logdepthbuf_vertex:Mp,map_fragment:Sp,map_pars_fragment:yp,map_particle_fragment:Tp,map_particle_pars_fragment:bp,metalnessmap_fragment:Ep,metalnessmap_pars_fragment:Ap,morphinstance_vertex:wp,morphcolor_vertex:Rp,morphnormal_vertex:Cp,morphtarget_pars_vertex:Pp,morphtarget_vertex:Lp,normal_fragment_begin:Ip,normal_fragment_maps:Dp,normal_pars_fragment:Up,normal_pars_vertex:Fp,normal_vertex:Np,normalmap_pars_fragment:Op,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Bp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:zp,opaque_fragment:Hp,packing:Vp,premultiplied_alpha_fragment:Wp,project_vertex:Xp,dithering_fragment:qp,dithering_pars_fragment:Yp,roughnessmap_fragment:Kp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:Jp,shadowmap_vertex:jp,shadowmask_pars_fragment:Qp,skinbase_vertex:tm,skinning_pars_vertex:em,skinning_vertex:nm,skinnormal_vertex:im,specularmap_fragment:sm,specularmap_pars_fragment:rm,tonemapping_fragment:am,tonemapping_pars_fragment:om,transmission_fragment:lm,transmission_pars_fragment:cm,uv_pars_fragment:hm,uv_pars_vertex:um,uv_vertex:dm,worldpos_vertex:fm,background_vert:pm,background_frag:mm,backgroundCube_vert:gm,backgroundCube_frag:vm,cube_vert:_m,cube_frag:xm,depth_vert:Mm,depth_frag:Sm,distanceRGBA_vert:ym,distanceRGBA_frag:Tm,equirect_vert:bm,equirect_frag:Em,linedashed_vert:Am,linedashed_frag:wm,meshbasic_vert:Rm,meshbasic_frag:Cm,meshlambert_vert:Pm,meshlambert_frag:Lm,meshmatcap_vert:Im,meshmatcap_frag:Dm,meshnormal_vert:Um,meshnormal_frag:Fm,meshphong_vert:Nm,meshphong_frag:Om,meshphysical_vert:km,meshphysical_frag:Bm,meshtoon_vert:Gm,meshtoon_frag:zm,points_vert:Hm,points_frag:Vm,shadow_vert:Wm,shadow_frag:Xm,sprite_vert:qm,sprite_frag:Ym},St={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Rn={basic:{uniforms:We([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:We([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Xt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:We([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:We([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:We([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Xt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:We([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:We([St.points,St.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:We([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:We([St.common,St.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:We([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:We([St.sprite,St.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:We([St.common,St.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:We([St.lights,St.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Rn.physical={uniforms:We([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Dr={r:0,b:0,g:0},yi=new On,Km=new de;function $m(s,t,e,n,i,r,a){const o=new Xt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function v(S){let x=!1;const w=m(S);w===null?p(o,l):w&&w.isColor&&(p(w,1),x=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(S,x){const w=m(x);w&&(w.isCubeTexture||w.mapping===oa)?(h===void 0&&(h=new ee(new Ue(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:gs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),yi.copy(x.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Km.makeRotationFromEuler(yi)),h.material.toneMapped=re.getTransfer(w.colorSpace)!==le,(u!==w||d!==w.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ee(new Un(2,2),new Ye({name:"BackgroundMaterial",uniforms:gs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=re.getTransfer(w.colorSpace)!==le,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=w,d=w.version,f=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB(Dr,Mh(s)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,x,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,x=1){o.set(S),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:v,addToRenderList:g,dispose:b}}function Zm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(M,L,N,V,q){let H=!1;const Y=u(V,N,L);r!==Y&&(r=Y,c(r.object)),H=f(M,V,N,q),H&&m(M,V,N,q),q!==null&&t.update(q,s.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,x(M,L,N,V),q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,L,N){const V=N.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let H=q[L.id];H===void 0&&(H={},q[L.id]=H);let Y=H[V];return Y===void 0&&(Y=d(l()),H[V]=Y),Y}function d(M){const L=[],N=[],V=[];for(let q=0;q<e;q++)L[q]=0,N[q]=0,V[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,L,N,V){const q=r.attributes,H=L.attributes;let Y=0;const G=N.getAttributes();for(const D in G)if(G[D].location>=0){const et=q[D];let ct=H[D];if(ct===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),et===void 0||et.attribute!==ct||ct&&et.data!==ct.data)return!0;Y++}return r.attributesNum!==Y||r.index!==V}function m(M,L,N,V){const q={},H=L.attributes;let Y=0;const G=N.getAttributes();for(const D in G)if(G[D].location>=0){let et=H[D];et===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(et=M.instanceColor));const ct={};ct.attribute=et,et&&et.data&&(ct.data=et.data),q[D]=ct,Y++}r.attributes=q,r.attributesNum=Y,r.index=V}function v(){const M=r.newAttributes;for(let L=0,N=M.length;L<N;L++)M[L]=0}function g(M){p(M,0)}function p(M,L){const N=r.newAttributes,V=r.enabledAttributes,q=r.attributeDivisors;N[M]=1,V[M]===0&&(s.enableVertexAttribArray(M),V[M]=1),q[M]!==L&&(s.vertexAttribDivisor(M,L),q[M]=L)}function b(){const M=r.newAttributes,L=r.enabledAttributes;for(let N=0,V=L.length;N<V;N++)L[N]!==M[N]&&(s.disableVertexAttribArray(N),L[N]=0)}function S(M,L,N,V,q,H,Y){Y===!0?s.vertexAttribIPointer(M,L,N,q,H):s.vertexAttribPointer(M,L,N,V,q,H)}function x(M,L,N,V){v();const q=V.attributes,H=N.getAttributes(),Y=L.defaultAttributeValues;for(const G in H){const D=H[G];if(D.location>=0){let rt=q[G];if(rt===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const et=rt.normalized,ct=rt.itemSize,yt=t.get(rt);if(yt===void 0)continue;const bt=yt.buffer,Jt=yt.type,Ht=yt.bytesPerElement,Z=Jt===s.INT||Jt===s.UNSIGNED_INT||rt.gpuType===ol;if(rt.isInterleavedBufferAttribute){const tt=rt.data,pt=tt.stride,Dt=rt.offset;if(tt.isInstancedInterleavedBuffer){for(let xt=0;xt<D.locationSize;xt++)p(D.location+xt,tt.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let xt=0;xt<D.locationSize;xt++)g(D.location+xt);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let xt=0;xt<D.locationSize;xt++)S(D.location+xt,ct/D.locationSize,Jt,et,pt*Ht,(Dt+ct/D.locationSize*xt)*Ht,Z)}else{if(rt.isInstancedBufferAttribute){for(let tt=0;tt<D.locationSize;tt++)p(D.location+tt,rt.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let tt=0;tt<D.locationSize;tt++)g(D.location+tt);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let tt=0;tt<D.locationSize;tt++)S(D.location+tt,ct/D.locationSize,Jt,et,ct*Ht,ct/D.locationSize*tt*Ht,Z)}}else if(Y!==void 0){const et=Y[G];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(D.location,et);break;case 3:s.vertexAttrib3fv(D.location,et);break;case 4:s.vertexAttrib4fv(D.location,et);break;default:s.vertexAttrib1fv(D.location,et)}}}}b()}function w(){C();for(const M in n){const L=n[M];for(const N in L){const V=L[N];for(const q in V)h(V[q].object),delete V[q];delete L[N]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const N in L){const V=L[N];for(const q in V)h(V[q].object),delete V[q];delete L[N]}delete n[M.id]}function R(M){for(const L in n){const N=n[L];if(N[M.id]===void 0)continue;const V=N[M.id];for(const q in V)h(V[q].object),delete V[q];delete N[M.id]}}function C(){y(),a=!0,r!==i&&(r=i,c(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:b}}function Jm(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function jm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==En&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const C=R===xs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Nn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!C)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=m>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:w,maxSamples:A}}function Qm(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new bi,o=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{const b=r?0:n,S=b*4;let x=p.clippingState||null;l.value=x,x=h(m,d,S,f);for(let w=0;w!==S;++w)x[w]=e[w];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,x=f;S!==v;++S,x+=4)a.copy(u[S]).applyMatrix4(b,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function tg(s){let t=new WeakMap;function e(a,o){return o===xo?a.mapping=ps:o===Mo&&(a.mapping=ms),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===xo||o===Mo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new fd(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const us=4,gc=[.125,.215,.35,.446,.526,.582],wi=20,Xa=new bl,vc=new Xt;let qa=null,Ya=0,Ka=0,$a=!1;const Ei=(1+Math.sqrt(5))/2,os=1/Ei,_c=[new I(-Ei,os,0),new I(Ei,os,0),new I(-os,0,Ei),new I(os,0,Ei),new I(0,Ei,-os),new I(0,Ei,os),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],eg=new I;class xc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=eg}=r;qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qa,Ya,Ka),this._renderer.xr.enabled=$a,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ps||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:xs,format:En,colorSpace:Di,depthBuffer:!1},i=Mc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ng(r)),this._blurMaterial=ig(r,t,e)}return i}_compileMaterial(t){const e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,Xa)}_sceneToCubeUV(t,e,n,i,r){const l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(vc),u.toneMapping=Zn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const v=new cn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),g=new ee(new Ue,v);let p=!1;const b=t.background;b?b.isColor&&(v.color.copy(b),t.background=null,p=!0):(v.color.copy(vc),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const w=this._cubeSize;Ur(i,x*w,S>2?w:0,w,w),u.setRenderTarget(i),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ps||t.mapping===ms;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new ee(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ur(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Xa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=_c[(i-r-1)%_c.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ee(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):wi;g>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${wi}`);const p=[];let b=0;for(let R=0;R<wi;++R){const C=R/v,y=Math.exp(-C*C/2);p.push(y),R===0?b+=y:R<g&&(b+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=m,d.mipInt.value=S-n;const x=this._sizeLods[i],w=3*x*(i>S-us?i-S+us:0),A=4*(this._cubeSize-x);Ur(e,w,A,3*x,2*x),l.setRenderTarget(e),l.render(u,Xa)}}function ng(s){const t=[],e=[],n=[];let i=s;const r=s-us+1+gc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-us?l=gc[a-s+us-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,b=new Float32Array(v*m*f),S=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,C=A>2?0:-1,y=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];b.set(y,v*m*A),S.set(d,g*m*A);const M=[A,A,A,A,A,A];x.set(M,p*m*A)}const w=new Ae;w.setAttribute("position",new be(b,v)),w.setAttribute("uv",new be(S,g)),w.setAttribute("faceIndex",new be(x,p)),t.push(w),i>us&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Mc(s,t,e){const n=new Fn(s,t,e);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ur(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function ig(s,t,e){const n=new Float32Array(wi),i=new I(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:El(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Sc(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:El(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function yc(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function El(){return`

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
	`}function sg(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===xo||l===Mo,h=l===ps||l===ms;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new xc(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new xc(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function rg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Js("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ag(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(f!==null){const b=f.array;v=f.version;for(let S=0,x=b.length;S<x;S+=3){const w=b[S+0],A=b[S+1],R=b[S+2];d.push(w,A,A,R,R,w)}}else if(m!==void 0){const b=m.array;v=m.version;for(let S=0,x=b.length/3-1;S<x;S+=3){const w=S+0,A=S+1,R=S+2;d.push(w,A,A,R,R,w)}}else return;const g=new(fh(d)?xh:_h)(d,1);g.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function og(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*a,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,m);let p=0;for(let b=0;b<m;b++)p+=f[b]*v[b];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function lg(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function cg(s,t,e){const n=new WeakMap,i=new ue;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),v===!0&&(x=2),g===!0&&(x=3);let w=o.attributes.position.count*x,A=1;w>t.maxTextureSize&&(A=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const R=new Float32Array(w*A*4*u),C=new ph(R,w,A,u);C.type=Ln,C.needsUpdate=!0;const y=x*4;for(let L=0;L<u;L++){const N=p[L],V=b[L],q=S[L],H=w*A*4*L;for(let Y=0;Y<N.count;Y++){const G=Y*y;m===!0&&(i.fromBufferAttribute(N,Y),R[H+G+0]=i.x,R[H+G+1]=i.y,R[H+G+2]=i.z,R[H+G+3]=0),v===!0&&(i.fromBufferAttribute(V,Y),R[H+G+4]=i.x,R[H+G+5]=i.y,R[H+G+6]=i.z,R[H+G+7]=0),g===!0&&(i.fromBufferAttribute(q,Y),R[H+G+8]=i.x,R[H+G+9]=i.y,R[H+G+10]=i.z,R[H+G+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new ut(w,A)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function hg(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const kh=new ze,Tc=new Ah(1,1),Bh=new ph,Gh=new Zu,zh=new yh,bc=[],Ec=[],Ac=new Float32Array(16),wc=new Float32Array(9),Rc=new Float32Array(4);function ys(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=bc[i];if(r===void 0&&(r=new Float32Array(i),bc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ce(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Pe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ha(s,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function ug(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function dg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2fv(this.addr,t),Pe(e,t)}}function fg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;s.uniform3fv(this.addr,t),Pe(e,t)}}function pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4fv(this.addr,t),Pe(e,t)}}function mg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Rc.set(n),s.uniformMatrix2fv(this.addr,!1,Rc),Pe(e,n)}}function gg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;wc.set(n),s.uniformMatrix3fv(this.addr,!1,wc),Pe(e,n)}}function vg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Ac.set(n),s.uniformMatrix4fv(this.addr,!1,Ac),Pe(e,n)}}function _g(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function xg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2iv(this.addr,t),Pe(e,t)}}function Mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;s.uniform3iv(this.addr,t),Pe(e,t)}}function Sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4iv(this.addr,t),Pe(e,t)}}function yg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Tg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;s.uniform2uiv(this.addr,t),Pe(e,t)}}function bg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;s.uniform3uiv(this.addr,t),Pe(e,t)}}function Eg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;s.uniform4uiv(this.addr,t),Pe(e,t)}}function Ag(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Tc.compareFunction=dh,r=Tc):r=kh,e.setTexture2D(t||r,i)}function wg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Gh,i)}function Rg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||zh,i)}function Cg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Bh,i)}function Pg(s){switch(s){case 5126:return ug;case 35664:return dg;case 35665:return fg;case 35666:return pg;case 35674:return mg;case 35675:return gg;case 35676:return vg;case 5124:case 35670:return _g;case 35667:case 35671:return xg;case 35668:case 35672:return Mg;case 35669:case 35673:return Sg;case 5125:return yg;case 36294:return Tg;case 36295:return bg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ag;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Rg;case 36289:case 36303:case 36311:case 36292:return Cg}}function Lg(s,t){s.uniform1fv(this.addr,t)}function Ig(s,t){const e=ys(t,this.size,2);s.uniform2fv(this.addr,e)}function Dg(s,t){const e=ys(t,this.size,3);s.uniform3fv(this.addr,e)}function Ug(s,t){const e=ys(t,this.size,4);s.uniform4fv(this.addr,e)}function Fg(s,t){const e=ys(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ng(s,t){const e=ys(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Og(s,t){const e=ys(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function kg(s,t){s.uniform1iv(this.addr,t)}function Bg(s,t){s.uniform2iv(this.addr,t)}function Gg(s,t){s.uniform3iv(this.addr,t)}function zg(s,t){s.uniform4iv(this.addr,t)}function Hg(s,t){s.uniform1uiv(this.addr,t)}function Vg(s,t){s.uniform2uiv(this.addr,t)}function Wg(s,t){s.uniform3uiv(this.addr,t)}function Xg(s,t){s.uniform4uiv(this.addr,t)}function qg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||kh,r[a])}function Yg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Gh,r[a])}function Kg(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||zh,r[a])}function $g(s,t,e){const n=this.cache,i=t.length,r=ha(e,i);Ce(n,r)||(s.uniform1iv(this.addr,r),Pe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Bh,r[a])}function Zg(s){switch(s){case 5126:return Lg;case 35664:return Ig;case 35665:return Dg;case 35666:return Ug;case 35674:return Fg;case 35675:return Ng;case 35676:return Og;case 5124:case 35670:return kg;case 35667:case 35671:return Bg;case 35668:case 35672:return Gg;case 35669:case 35673:return zg;case 5125:return Hg;case 36294:return Vg;case 36295:return Wg;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return $g}}class Jg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Pg(e.type)}}class jg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zg(e.type)}}class Qg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Cc(s,t){s.seq.push(t),s.map[t.id]=t}function t0(s,t,e){const n=s.name,i=n.length;for(Za.lastIndex=0;;){const r=Za.exec(n),a=Za.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Cc(e,c===void 0?new Jg(o,s,t):new jg(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Qg(o),Cc(e,u)),e=u}}}class Xr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);t0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Pc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const e0=37297;let n0=0;function i0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Lc=new Kt;function s0(s){re._getMatrix(Lc,re.workingColorSpace,s);const t=`mat3( ${Lc.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(s)){case Zr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ic(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+i0(s.getShaderSource(t),o)}else return r}function r0(s,t){const e=s0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function a0(s,t){let e;switch(t){case bu:e="Linear";break;case Eu:e="Reinhard";break;case Au:e="Cineon";break;case nh:e="ACESFilmic";break;case Ru:e="AgX";break;case Cu:e="Neutral";break;case wu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fr=new I;function o0(){re.getLuminanceCoefficients(Fr);const s=Fr.x.toFixed(4),t=Fr.y.toFixed(4),e=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function l0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function c0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function h0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Gs(s){return s!==""}function Dc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const u0=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(s){return s.replace(u0,f0)}const d0=new Map;function f0(s,t){let e=$t[t];if(e===void 0){const n=d0.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return el(e)}const p0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(s){return s.replace(p0,m0)}function m0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Nc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function g0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Qc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===th?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Yn&&(t="SHADOWMAP_TYPE_VSM"),t}function v0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ps:case ms:t="ENVMAP_TYPE_CUBE";break;case oa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _0(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===ms&&(t="ENVMAP_MODE_REFRACTION"),t}function x0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case eh:t="ENVMAP_BLENDING_MULTIPLY";break;case yu:t="ENVMAP_BLENDING_MIX";break;case Tu:t="ENVMAP_BLENDING_ADD";break}return t}function M0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function S0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=g0(e),c=v0(e),h=_0(e),u=x0(e),d=M0(e),f=l0(e),m=c0(r),v=i.createProgram();let g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Gs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Gs).join(`
`),p.length>0&&(p+=`
`)):(g=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),p=[Nc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Zn?a0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,r0("linearToOutputTexel",e.outputColorSpace),o0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),a=el(a),a=Dc(a,e),a=Uc(a,e),o=el(o),o=Dc(o,e),o=Uc(o,e),a=Fc(a),o=Fc(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+g+a,x=b+p+o,w=Pc(i,i.VERTEX_SHADER,S),A=Pc(i,i.FRAGMENT_SHADER,x);i.attachShader(v,w),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(L){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(v)||"",V=i.getShaderInfoLog(w)||"",q=i.getShaderInfoLog(A)||"",H=N.trim(),Y=V.trim(),G=q.trim();let D=!0,rt=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(D=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,w,A);else{const et=Ic(i,w,"vertex"),ct=Ic(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+et+`
`+ct)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(Y===""||G==="")&&(rt=!1);rt&&(L.diagnostics={runnable:D,programLog:H,vertexShader:{log:Y,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(w),i.deleteShader(A),C=new Xr(i,v),y=h0(i,v)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,e0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=n0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=A,this}let y0=0;class T0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new b0(t),e.set(t,n)),n}}class b0{constructor(t){this.id=y0++,this.code=t,this.usedTimes=0}}function E0(s,t,e,n,i,r,a){const o=new gh,l=new T0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,M,L,N,V){const q=N.fog,H=V.geometry,Y=y.isMeshStandardMaterial?N.environment:null,G=(y.isMeshStandardMaterial?e:t).get(y.envMap||Y),D=G&&G.mapping===oa?G.image.height:null,rt=m[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=et!==void 0?et.length:0;let yt=0;H.morphAttributes.position!==void 0&&(yt=1),H.morphAttributes.normal!==void 0&&(yt=2),H.morphAttributes.color!==void 0&&(yt=3);let bt,Jt,Ht,Z;if(rt){const Ot=Rn[rt];bt=Ot.vertexShader,Jt=Ot.fragmentShader}else bt=y.vertexShader,Jt=y.fragmentShader,l.update(y),Ht=l.getVertexShaderID(y),Z=l.getFragmentShaderID(y);const tt=s.getRenderTarget(),pt=s.state.buffers.depth.getReversed(),Dt=V.isInstancedMesh===!0,xt=V.isBatchedMesh===!0,qt=!!y.map,ne=!!y.matcap,P=!!G,it=!!y.aoMap,J=!!y.lightMap,j=!!y.bumpMap,Q=!!y.normalMap,mt=!!y.displacementMap,at=!!y.emissiveMap,gt=!!y.metalnessMap,Wt=!!y.roughnessMap,zt=y.anisotropy>0,E=y.clearcoat>0,_=y.dispersion>0,k=y.iridescence>0,K=y.sheen>0,st=y.transmission>0,$=zt&&!!y.anisotropyMap,Ct=E&&!!y.clearcoatMap,dt=E&&!!y.clearcoatNormalMap,Pt=E&&!!y.clearcoatRoughnessMap,Lt=k&&!!y.iridescenceMap,ot=k&&!!y.iridescenceThicknessMap,_t=K&&!!y.sheenColorMap,Nt=K&&!!y.sheenRoughnessMap,Et=!!y.specularMap,Mt=!!y.specularColorMap,Yt=!!y.specularIntensityMap,U=st&&!!y.transmissionMap,lt=st&&!!y.thicknessMap,vt=!!y.gradientMap,At=!!y.alphaMap,B=y.alphaTest>0,z=!!y.alphaHash,nt=!!y.extensions;let ft=Zn;y.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(ft=s.toneMapping);const Ut={shaderID:rt,shaderType:y.type,shaderName:y.name,vertexShader:bt,fragmentShader:Jt,defines:y.defines,customVertexShaderID:Ht,customFragmentShaderID:Z,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:xt,batchingColor:xt&&V._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&V.instanceColor!==null,instancingMorph:Dt&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Di,alphaToCoverage:!!y.alphaToCoverage,map:qt,matcap:ne,envMap:P,envMapMode:P&&G.mapping,envMapCubeUVHeight:D,aoMap:it,lightMap:J,bumpMap:j,normalMap:Q,displacementMap:d&&mt,emissiveMap:at,normalMapObjectSpace:Q&&y.normalMapType===Du,normalMapTangentSpace:Q&&y.normalMapType===uh,metalnessMap:gt,roughnessMap:Wt,anisotropy:zt,anisotropyMap:$,clearcoat:E,clearcoatMap:Ct,clearcoatNormalMap:dt,clearcoatRoughnessMap:Pt,dispersion:_,iridescence:k,iridescenceMap:Lt,iridescenceThicknessMap:ot,sheen:K,sheenColorMap:_t,sheenRoughnessMap:Nt,specularMap:Et,specularColorMap:Mt,specularIntensityMap:Yt,transmission:st,transmissionMap:U,thicknessMap:lt,gradientMap:vt,opaque:y.transparent===!1&&y.blending===Pi&&y.alphaToCoverage===!1,alphaMap:At,alphaTest:B,alphaHash:z,combine:y.combine,mapUv:qt&&v(y.map.channel),aoMapUv:it&&v(y.aoMap.channel),lightMapUv:J&&v(y.lightMap.channel),bumpMapUv:j&&v(y.bumpMap.channel),normalMapUv:Q&&v(y.normalMap.channel),displacementMapUv:mt&&v(y.displacementMap.channel),emissiveMapUv:at&&v(y.emissiveMap.channel),metalnessMapUv:gt&&v(y.metalnessMap.channel),roughnessMapUv:Wt&&v(y.roughnessMap.channel),anisotropyMapUv:$&&v(y.anisotropyMap.channel),clearcoatMapUv:Ct&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:dt&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&v(y.sheenRoughnessMap.channel),specularMapUv:Et&&v(y.specularMap.channel),specularColorMapUv:Mt&&v(y.specularColorMap.channel),specularIntensityMapUv:Yt&&v(y.specularIntensityMap.channel),transmissionMapUv:U&&v(y.transmissionMap.channel),thicknessMapUv:lt&&v(y.thicknessMap.channel),alphaMapUv:At&&v(y.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Q||zt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!H.attributes.uv&&(qt||At),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pt,skinning:V.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:yt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:ft,decodeVideoTexture:qt&&y.map.isVideoTexture===!0&&re.getTransfer(y.map.colorSpace)===le,decodeVideoTextureEmissive:at&&y.emissiveMap.isVideoTexture===!0&&re.getTransfer(y.emissiveMap.colorSpace)===le,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Qe,flipSided:y.side===Ge,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:nt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&y.extensions.multiDraw===!0||xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function p(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)M.push(L),M.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(b(M,y),S(M,y),M.push(s.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function b(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function S(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const M=m[y.type];let L;if(M){const N=Rn[M];L=cd.clone(N.uniforms)}else L=y.uniforms;return L}function w(y,M){let L;for(let N=0,V=h.length;N<V;N++){const q=h[N];if(q.cacheKey===M){L=q,++L.usedTimes;break}}return L===void 0&&(L=new S0(s,M,y,r),h.push(L)),L}function A(y){if(--y.usedTimes===0){const M=h.indexOf(y);h[M]=h[h.length-1],h.pop(),y.destroy()}}function R(y){l.remove(y)}function C(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:C}}function A0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function w0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Oc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function kc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,m,v,g){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),t++,p}function o(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||w0),n.length>1&&n.sort(d||Oc),i.length>1&&i.sort(d||Oc)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function R0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new kc,s.set(n,[a])):i>=r.length?(a=new kc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function C0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Xt};break;case"SpotLight":e={position:new I,direction:new I,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function P0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let L0=0;function I0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function D0(s){const t=new C0,e=P0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new de,a=new de;function o(c){let h=0,u=0,d=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,b=0,S=0,x=0,w=0,A=0,R=0;c.sort(I0);for(let y=0,M=c.length;y<M;y++){const L=c[y],N=L.color,V=L.intensity,q=L.distance,H=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=N.r*V,u+=N.g*V,d+=N.b*V;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],V);R++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const G=L.shadow,D=e.get(L);D.shadowIntensity=G.intensity,D.shadowBias=G.bias,D.shadowNormalBias=G.normalBias,D.shadowRadius=G.radius,D.shadowMapSize=G.mapSize,n.directionalShadow[f]=D,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=L.shadow.matrix,b++}n.directional[f]=Y,f++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(N).multiplyScalar(V),Y.distance=q,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[v]=Y;const G=L.shadow;if(L.map&&(n.spotLightMap[w]=L.map,w++,G.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[v]=G.matrix,L.castShadow){const D=e.get(L);D.shadowIntensity=G.intensity,D.shadowBias=G.bias,D.shadowNormalBias=G.normalBias,D.shadowRadius=G.radius,D.shadowMapSize=G.mapSize,n.spotShadow[v]=D,n.spotShadowMap[v]=H,x++}v++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(N).multiplyScalar(V),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=Y,g++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const G=L.shadow,D=e.get(L);D.shadowIntensity=G.intensity,D.shadowBias=G.bias,D.shadowNormalBias=G.normalBias,D.shadowRadius=G.radius,D.shadowMapSize=G.mapSize,D.shadowCameraNear=G.camera.near,D.shadowCameraFar=G.camera.far,n.pointShadow[m]=D,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=L.shadow.matrix,S++}n.point[m]=Y,m++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(V),Y.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[p]=Y,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==m||C.spotLength!==v||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==b||C.numPointShadows!==S||C.numSpotShadows!==x||C.numSpotMaps!==w||C.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,C.directionalLength=f,C.pointLength=m,C.spotLength=v,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=b,C.numPointShadows=S,C.numSpotShadows=x,C.numSpotMaps=w,C.numLightProbes=R,n.version=L0++)}function l(c,h){let u=0,d=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(S.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(S.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(S.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(g),d++}else if(S.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Bc(s){const t=new D0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function U0(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Bc(s),t.set(i,[o])):r>=a.length?(o=new Bc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const F0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N0=`uniform sampler2D shadow_pass;
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
}`;function O0(s,t,e){let n=new gl;const i=new ut,r=new ut,a=new ue,o=new nf({depthPacking:Iu}),l=new sf,c={},h=e.maxTextureSize,u={[pi]:Ge,[Ge]:pi,[Qe]:Qe},d=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:F0,fragmentShader:N0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ae;m.setAttribute("position",new be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ee(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qc;let p=this.type;this.render=function(A,R,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const y=s.getRenderTarget(),M=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),N=s.state;N.setBlending(di),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const V=p!==Yn&&this.type===Yn,q=p===Yn&&this.type!==Yn;for(let H=0,Y=A.length;H<Y;H++){const G=A[H],D=G.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const rt=D.getFrameExtents();if(i.multiply(rt),r.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/rt.x),i.x=r.x*rt.x,D.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/rt.y),i.y=r.y*rt.y,D.mapSize.y=r.y)),D.map===null||V===!0||q===!0){const ct=this.type!==Yn?{minFilter:dn,magFilter:dn}:{};D.map!==null&&D.map.dispose(),D.map=new Fn(i.x,i.y,ct),D.map.texture.name=G.name+".shadowMap",D.camera.updateProjectionMatrix()}s.setRenderTarget(D.map),s.clear();const et=D.getViewportCount();for(let ct=0;ct<et;ct++){const yt=D.getViewport(ct);a.set(r.x*yt.x,r.y*yt.y,r.x*yt.z,r.y*yt.w),N.viewport(a),D.updateMatrices(G,ct),n=D.getFrustum(),x(R,C,D.camera,G,this.type)}D.isPointLightShadow!==!0&&this.type===Yn&&b(D,C),D.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(y,M,L)};function b(A,R){const C=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Fn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,C,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,C,f,v,null)}function S(A,R,C,y){let M=null;const L=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)M=L;else if(M=C.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=M.uuid,V=R.uuid;let q=c[N];q===void 0&&(q={},c[N]=q);let H=q[V];H===void 0&&(H=M.clone(),q[V]=H,R.addEventListener("dispose",w)),M=H}if(M.visible=R.visible,M.wireframe=R.wireframe,y===Yn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const N=s.properties.get(M);N.light=C}return M}function x(A,R,C,y,M){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Yn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const V=t.update(A),q=A.material;if(Array.isArray(q)){const H=V.groups;for(let Y=0,G=H.length;Y<G;Y++){const D=H[Y],rt=q[D.materialIndex];if(rt&&rt.visible){const et=S(A,rt,y,M);A.onBeforeShadow(s,A,R,C,V,et,D),s.renderBufferDirect(C,null,V,et,A,D),A.onAfterShadow(s,A,R,C,V,et,D)}}}else if(q.visible){const H=S(A,q,y,M);A.onBeforeShadow(s,A,R,C,V,H,null),s.renderBufferDirect(C,null,V,H,A,null),A.onAfterShadow(s,A,R,C,V,H,null)}}const N=A.children;for(let V=0,q=N.length;V<q;V++)x(N[V],R,C,y,M)}function w(A){A.target.removeEventListener("dispose",w);for(const C in c){const y=c[C],M=A.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const k0={[uo]:fo,[po]:vo,[mo]:_o,[fs]:go,[fo]:uo,[vo]:po,[_o]:mo,[go]:fs};function B0(s,t){function e(){let U=!1;const lt=new ue;let vt=null;const At=new ue(0,0,0,0);return{setMask:function(B){vt!==B&&!U&&(s.colorMask(B,B,B,B),vt=B)},setLocked:function(B){U=B},setClear:function(B,z,nt,ft,Ut){Ut===!0&&(B*=ft,z*=ft,nt*=ft),lt.set(B,z,nt,ft),At.equals(lt)===!1&&(s.clearColor(B,z,nt,ft),At.copy(lt))},reset:function(){U=!1,vt=null,At.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,vt=null,At=null,B=null;return{setReversed:function(z){if(lt!==z){const nt=t.get("EXT_clip_control");z?nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.ZERO_TO_ONE_EXT):nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.NEGATIVE_ONE_TO_ONE_EXT),lt=z;const ft=B;B=null,this.setClear(ft)}},getReversed:function(){return lt},setTest:function(z){z?tt(s.DEPTH_TEST):pt(s.DEPTH_TEST)},setMask:function(z){vt!==z&&!U&&(s.depthMask(z),vt=z)},setFunc:function(z){if(lt&&(z=k0[z]),At!==z){switch(z){case uo:s.depthFunc(s.NEVER);break;case fo:s.depthFunc(s.ALWAYS);break;case po:s.depthFunc(s.LESS);break;case fs:s.depthFunc(s.LEQUAL);break;case mo:s.depthFunc(s.EQUAL);break;case go:s.depthFunc(s.GEQUAL);break;case vo:s.depthFunc(s.GREATER);break;case _o:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}At=z}},setLocked:function(z){U=z},setClear:function(z){B!==z&&(lt&&(z=1-z),s.clearDepth(z),B=z)},reset:function(){U=!1,vt=null,At=null,B=null,lt=!1}}}function i(){let U=!1,lt=null,vt=null,At=null,B=null,z=null,nt=null,ft=null,Ut=null;return{setTest:function(Ot){U||(Ot?tt(s.STENCIL_TEST):pt(s.STENCIL_TEST))},setMask:function(Ot){lt!==Ot&&!U&&(s.stencilMask(Ot),lt=Ot)},setFunc:function(Ot,Zt,ae){(vt!==Ot||At!==Zt||B!==ae)&&(s.stencilFunc(Ot,Zt,ae),vt=Ot,At=Zt,B=ae)},setOp:function(Ot,Zt,ae){(z!==Ot||nt!==Zt||ft!==ae)&&(s.stencilOp(Ot,Zt,ae),z=Ot,nt=Zt,ft=ae)},setLocked:function(Ot){U=Ot},setClear:function(Ot){Ut!==Ot&&(s.clearStencil(Ot),Ut=Ot)},reset:function(){U=!1,lt=null,vt=null,At=null,B=null,z=null,nt=null,ft=null,Ut=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,b=null,S=null,x=null,w=null,A=null,R=new Xt(0,0,0),C=0,y=!1,M=null,L=null,N=null,V=null,q=null;const H=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,G=0;const D=s.getParameter(s.VERSION);D.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(D)[1]),Y=G>=1):D.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),Y=G>=2);let rt=null,et={};const ct=s.getParameter(s.SCISSOR_BOX),yt=s.getParameter(s.VIEWPORT),bt=new ue().fromArray(ct),Jt=new ue().fromArray(yt);function Ht(U,lt,vt,At){const B=new Uint8Array(4),z=s.createTexture();s.bindTexture(U,z),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let nt=0;nt<vt;nt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,At,0,s.RGBA,s.UNSIGNED_BYTE,B):s.texImage2D(lt+nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,B);return z}const Z={};Z[s.TEXTURE_2D]=Ht(s.TEXTURE_2D,s.TEXTURE_2D,1),Z[s.TEXTURE_CUBE_MAP]=Ht(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[s.TEXTURE_2D_ARRAY]=Ht(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Z[s.TEXTURE_3D]=Ht(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(s.DEPTH_TEST),a.setFunc(fs),j(!1),Q(Pl),tt(s.CULL_FACE),it(di);function tt(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function pt(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Dt(U,lt){return u[U]!==lt?(s.bindFramebuffer(U,lt),u[U]=lt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=lt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function xt(U,lt){let vt=f,At=!1;if(U){vt=d.get(lt),vt===void 0&&(vt=[],d.set(lt,vt));const B=U.textures;if(vt.length!==B.length||vt[0]!==s.COLOR_ATTACHMENT0){for(let z=0,nt=B.length;z<nt;z++)vt[z]=s.COLOR_ATTACHMENT0+z;vt.length=B.length,At=!0}}else vt[0]!==s.BACK&&(vt[0]=s.BACK,At=!0);At&&s.drawBuffers(vt)}function qt(U){return m!==U?(s.useProgram(U),m=U,!0):!1}const ne={[Ai]:s.FUNC_ADD,[ru]:s.FUNC_SUBTRACT,[au]:s.FUNC_REVERSE_SUBTRACT};ne[ou]=s.MIN,ne[lu]=s.MAX;const P={[cu]:s.ZERO,[hu]:s.ONE,[uu]:s.SRC_COLOR,[co]:s.SRC_ALPHA,[vu]:s.SRC_ALPHA_SATURATE,[mu]:s.DST_COLOR,[fu]:s.DST_ALPHA,[du]:s.ONE_MINUS_SRC_COLOR,[ho]:s.ONE_MINUS_SRC_ALPHA,[gu]:s.ONE_MINUS_DST_COLOR,[pu]:s.ONE_MINUS_DST_ALPHA,[_u]:s.CONSTANT_COLOR,[xu]:s.ONE_MINUS_CONSTANT_COLOR,[Mu]:s.CONSTANT_ALPHA,[Su]:s.ONE_MINUS_CONSTANT_ALPHA};function it(U,lt,vt,At,B,z,nt,ft,Ut,Ot){if(U===di){v===!0&&(pt(s.BLEND),v=!1);return}if(v===!1&&(tt(s.BLEND),v=!0),U!==su){if(U!==g||Ot!==y){if((p!==Ai||x!==Ai)&&(s.blendEquation(s.FUNC_ADD),p=Ai,x=Ai),Ot)switch(U){case Pi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xs:s.blendFunc(s.ONE,s.ONE);break;case Ll:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Il:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Pi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ll:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,S=null,w=null,A=null,R.set(0,0,0),C=0,g=U,y=Ot}return}B=B||lt,z=z||vt,nt=nt||At,(lt!==p||B!==x)&&(s.blendEquationSeparate(ne[lt],ne[B]),p=lt,x=B),(vt!==b||At!==S||z!==w||nt!==A)&&(s.blendFuncSeparate(P[vt],P[At],P[z],P[nt]),b=vt,S=At,w=z,A=nt),(ft.equals(R)===!1||Ut!==C)&&(s.blendColor(ft.r,ft.g,ft.b,Ut),R.copy(ft),C=Ut),g=U,y=!1}function J(U,lt){U.side===Qe?pt(s.CULL_FACE):tt(s.CULL_FACE);let vt=U.side===Ge;lt&&(vt=!vt),j(vt),U.blending===Pi&&U.transparent===!1?it(di):it(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const At=U.stencilWrite;o.setTest(At),At&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),at(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):pt(s.SAMPLE_ALPHA_TO_COVERAGE)}function j(U){M!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),M=U)}function Q(U){U!==nu?(tt(s.CULL_FACE),U!==L&&(U===Pl?s.cullFace(s.BACK):U===iu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pt(s.CULL_FACE),L=U}function mt(U){U!==N&&(Y&&s.lineWidth(U),N=U)}function at(U,lt,vt){U?(tt(s.POLYGON_OFFSET_FILL),(V!==lt||q!==vt)&&(s.polygonOffset(lt,vt),V=lt,q=vt)):pt(s.POLYGON_OFFSET_FILL)}function gt(U){U?tt(s.SCISSOR_TEST):pt(s.SCISSOR_TEST)}function Wt(U){U===void 0&&(U=s.TEXTURE0+H-1),rt!==U&&(s.activeTexture(U),rt=U)}function zt(U,lt,vt){vt===void 0&&(rt===null?vt=s.TEXTURE0+H-1:vt=rt);let At=et[vt];At===void 0&&(At={type:void 0,texture:void 0},et[vt]=At),(At.type!==U||At.texture!==lt)&&(rt!==vt&&(s.activeTexture(vt),rt=vt),s.bindTexture(U,lt||Z[U]),At.type=U,At.texture=lt)}function E(){const U=et[rt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{s.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{s.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{s.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{s.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{s.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{s.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{s.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ot(){try{s.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(U){bt.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),bt.copy(U))}function Nt(U){Jt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Jt.copy(U))}function Et(U,lt){let vt=c.get(lt);vt===void 0&&(vt=new WeakMap,c.set(lt,vt));let At=vt.get(U);At===void 0&&(At=s.getUniformBlockIndex(lt,U.name),vt.set(U,At))}function Mt(U,lt){const At=c.get(lt).get(U);l.get(lt)!==At&&(s.uniformBlockBinding(lt,At,U.__bindingPointIndex),l.set(lt,At))}function Yt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},rt=null,et={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,b=null,S=null,x=null,w=null,A=null,R=new Xt(0,0,0),C=0,y=!1,M=null,L=null,N=null,V=null,q=null,bt.set(0,0,s.canvas.width,s.canvas.height),Jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:pt,bindFramebuffer:Dt,drawBuffers:xt,useProgram:qt,setBlending:it,setMaterial:J,setFlipSided:j,setCullFace:Q,setLineWidth:mt,setPolygonOffset:at,setScissorTest:gt,activeTexture:Wt,bindTexture:zt,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:k,texImage2D:Lt,texImage3D:ot,updateUBOMapping:Et,uniformBlockBinding:Mt,texStorage2D:dt,texStorage3D:Pt,texSubImage2D:K,texSubImage3D:st,compressedTexSubImage2D:$,compressedTexSubImage3D:Ct,scissor:_t,viewport:Nt,reset:Yt}}function G0(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,_){return f?new OffscreenCanvas(E,_):Qr("canvas")}function v(E,_,k){let K=1;const st=zt(E);if((st.width>k||st.height>k)&&(K=k/Math.max(st.width,st.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(K*st.width),Ct=Math.floor(K*st.height);u===void 0&&(u=m($,Ct));const dt=_?m($,Ct):u;return dt.width=$,dt.height=Ct,dt.getContext("2d").drawImage(E,0,0,$,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+$+"x"+Ct+")."),dt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(E,_,k,K,st=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=_;if(_===s.RED&&(k===s.FLOAT&&($=s.R32F),k===s.HALF_FLOAT&&($=s.R16F),k===s.UNSIGNED_BYTE&&($=s.R8)),_===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.R8UI),k===s.UNSIGNED_SHORT&&($=s.R16UI),k===s.UNSIGNED_INT&&($=s.R32UI),k===s.BYTE&&($=s.R8I),k===s.SHORT&&($=s.R16I),k===s.INT&&($=s.R32I)),_===s.RG&&(k===s.FLOAT&&($=s.RG32F),k===s.HALF_FLOAT&&($=s.RG16F),k===s.UNSIGNED_BYTE&&($=s.RG8)),_===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RG8UI),k===s.UNSIGNED_SHORT&&($=s.RG16UI),k===s.UNSIGNED_INT&&($=s.RG32UI),k===s.BYTE&&($=s.RG8I),k===s.SHORT&&($=s.RG16I),k===s.INT&&($=s.RG32I)),_===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGB8UI),k===s.UNSIGNED_SHORT&&($=s.RGB16UI),k===s.UNSIGNED_INT&&($=s.RGB32UI),k===s.BYTE&&($=s.RGB8I),k===s.SHORT&&($=s.RGB16I),k===s.INT&&($=s.RGB32I)),_===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGBA8UI),k===s.UNSIGNED_SHORT&&($=s.RGBA16UI),k===s.UNSIGNED_INT&&($=s.RGBA32UI),k===s.BYTE&&($=s.RGBA8I),k===s.SHORT&&($=s.RGBA16I),k===s.INT&&($=s.RGBA32I)),_===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),_===s.RGBA){const Ct=st?Zr:re.getTransfer(K);k===s.FLOAT&&($=s.RGBA32F),k===s.HALF_FLOAT&&($=s.RGBA16F),k===s.UNSIGNED_BYTE&&($=Ct===le?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(E,_){let k;return E?_===null||_===Ii||_===Ks?k=s.DEPTH24_STENCIL8:_===Ln?k=s.DEPTH32F_STENCIL8:_===Ys&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ii||_===Ks?k=s.DEPTH_COMPONENT24:_===Ln?k=s.DEPTH_COMPONENT32F:_===Ys&&(k=s.DEPTH_COMPONENT16),k}function w(E,_){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==dn&&E.minFilter!==Be?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),C(_),_.isVideoTexture&&h.delete(_)}function R(E){const _=E.target;_.removeEventListener("dispose",R),M(_)}function C(E){const _=n.get(E);if(_.__webglInit===void 0)return;const k=E.source,K=d.get(k);if(K){const st=K[_.__cacheKey];st.usedTimes--,st.usedTimes===0&&y(E),Object.keys(K).length===0&&d.delete(k)}n.remove(E)}function y(E){const _=n.get(E);s.deleteTexture(_.__webglTexture);const k=E.source,K=d.get(k);delete K[_.__cacheKey],a.memory.textures--}function M(E){const _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let st=0;st<_.__webglFramebuffer[K].length;st++)s.deleteFramebuffer(_.__webglFramebuffer[K][st]);else s.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)s.deleteFramebuffer(_.__webglFramebuffer[K]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=E.textures;for(let K=0,st=k.length;K<st;K++){const $=n.get(k[K]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(k[K])}n.remove(E)}let L=0;function N(){L=0}function V(){const E=L;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),L+=1,E}function q(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function H(E,_){const k=n.get(E);if(E.isVideoTexture&&gt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&k.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,E,_);return}}else E.isExternalTexture&&(k.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+_)}function Y(E,_){const k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){Z(k,E,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+_)}function G(E,_){const k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){Z(k,E,_);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+_)}function D(E,_){const k=n.get(E);if(E.version>0&&k.__version!==E.version){tt(k,E,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+_)}const rt={[qs]:s.REPEAT,[hi]:s.CLAMP_TO_EDGE,[So]:s.MIRRORED_REPEAT},et={[dn]:s.NEAREST,[Pu]:s.NEAREST_MIPMAP_NEAREST,[ar]:s.NEAREST_MIPMAP_LINEAR,[Be]:s.LINEAR,[fa]:s.LINEAR_MIPMAP_NEAREST,[Ri]:s.LINEAR_MIPMAP_LINEAR},ct={[Uu]:s.NEVER,[Gu]:s.ALWAYS,[Fu]:s.LESS,[dh]:s.LEQUAL,[Nu]:s.EQUAL,[Bu]:s.GEQUAL,[Ou]:s.GREATER,[ku]:s.NOTEQUAL};function yt(E,_){if(_.type===Ln&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Be||_.magFilter===fa||_.magFilter===ar||_.magFilter===Ri||_.minFilter===Be||_.minFilter===fa||_.minFilter===ar||_.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,rt[_.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,rt[_.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,rt[_.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,et[_.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,et[_.minFilter]),_.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,ct[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===dn||_.minFilter!==ar&&_.minFilter!==Ri||_.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function bt(E,_){let k=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const K=_.source;let st=d.get(K);st===void 0&&(st={},d.set(K,st));const $=q(_);if($!==E.__cacheKey){st[$]===void 0&&(st[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),st[$].usedTimes++;const Ct=st[E.__cacheKey];Ct!==void 0&&(st[E.__cacheKey].usedTimes--,Ct.usedTimes===0&&y(_)),E.__cacheKey=$,E.__webglTexture=st[$].texture}return k}function Jt(E,_,k){return Math.floor(Math.floor(E/k)/_)}function Ht(E,_,k,K){const $=E.updateRanges;if($.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,k,K,_.data);else{$.sort((ot,_t)=>ot.start-_t.start);let Ct=0;for(let ot=1;ot<$.length;ot++){const _t=$[Ct],Nt=$[ot],Et=_t.start+_t.count,Mt=Jt(Nt.start,_.width,4),Yt=Jt(_t.start,_.width,4);Nt.start<=Et+1&&Mt===Yt&&Jt(Nt.start+Nt.count-1,_.width,4)===Mt?_t.count=Math.max(_t.count,Nt.start+Nt.count-_t.start):(++Ct,$[Ct]=Nt)}$.length=Ct+1;const dt=s.getParameter(s.UNPACK_ROW_LENGTH),Pt=s.getParameter(s.UNPACK_SKIP_PIXELS),Lt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let ot=0,_t=$.length;ot<_t;ot++){const Nt=$[ot],Et=Math.floor(Nt.start/4),Mt=Math.ceil(Nt.count/4),Yt=Et%_.width,U=Math.floor(Et/_.width),lt=Mt,vt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Yt),s.pixelStorei(s.UNPACK_SKIP_ROWS,U),e.texSubImage2D(s.TEXTURE_2D,0,Yt,U,lt,vt,k,K,_.data)}E.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,dt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Pt),s.pixelStorei(s.UNPACK_SKIP_ROWS,Lt)}}function Z(E,_,k){let K=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=s.TEXTURE_3D);const st=bt(E,_),$=_.source;e.bindTexture(K,E.__webglTexture,s.TEXTURE0+k);const Ct=n.get($);if($.version!==Ct.__version||st===!0){e.activeTexture(s.TEXTURE0+k);const dt=re.getPrimaries(re.workingColorSpace),Pt=_.colorSpace===ai?null:re.getPrimaries(_.colorSpace),Lt=_.colorSpace===ai||dt===Pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let ot=v(_.image,!1,i.maxTextureSize);ot=Wt(_,ot);const _t=r.convert(_.format,_.colorSpace),Nt=r.convert(_.type);let Et=S(_.internalFormat,_t,Nt,_.colorSpace,_.isVideoTexture);yt(K,_);let Mt;const Yt=_.mipmaps,U=_.isVideoTexture!==!0,lt=Ct.__version===void 0||st===!0,vt=$.dataReady,At=w(_,ot);if(_.isDepthTexture)Et=x(_.format===Zs,_.type),lt&&(U?e.texStorage2D(s.TEXTURE_2D,1,Et,ot.width,ot.height):e.texImage2D(s.TEXTURE_2D,0,Et,ot.width,ot.height,0,_t,Nt,null));else if(_.isDataTexture)if(Yt.length>0){U&&lt&&e.texStorage2D(s.TEXTURE_2D,At,Et,Yt[0].width,Yt[0].height);for(let B=0,z=Yt.length;B<z;B++)Mt=Yt[B],U?vt&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,Mt.width,Mt.height,_t,Nt,Mt.data):e.texImage2D(s.TEXTURE_2D,B,Et,Mt.width,Mt.height,0,_t,Nt,Mt.data);_.generateMipmaps=!1}else U?(lt&&e.texStorage2D(s.TEXTURE_2D,At,Et,ot.width,ot.height),vt&&Ht(_,ot,_t,Nt)):e.texImage2D(s.TEXTURE_2D,0,Et,ot.width,ot.height,0,_t,Nt,ot.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&lt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,Et,Yt[0].width,Yt[0].height,ot.depth);for(let B=0,z=Yt.length;B<z;B++)if(Mt=Yt[B],_.format!==En)if(_t!==null)if(U){if(vt)if(_.layerUpdates.size>0){const nt=mc(Mt.width,Mt.height,_.format,_.type);for(const ft of _.layerUpdates){const Ut=Mt.data.subarray(ft*nt/Mt.data.BYTES_PER_ELEMENT,(ft+1)*nt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,B,0,0,ft,Mt.width,Mt.height,1,_t,Ut)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,B,0,0,0,Mt.width,Mt.height,ot.depth,_t,Mt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,B,Et,Mt.width,Mt.height,ot.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?vt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,B,0,0,0,Mt.width,Mt.height,ot.depth,_t,Nt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,B,Et,Mt.width,Mt.height,ot.depth,0,_t,Nt,Mt.data)}else{U&&lt&&e.texStorage2D(s.TEXTURE_2D,At,Et,Yt[0].width,Yt[0].height);for(let B=0,z=Yt.length;B<z;B++)Mt=Yt[B],_.format!==En?_t!==null?U?vt&&e.compressedTexSubImage2D(s.TEXTURE_2D,B,0,0,Mt.width,Mt.height,_t,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,B,Et,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?vt&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,Mt.width,Mt.height,_t,Nt,Mt.data):e.texImage2D(s.TEXTURE_2D,B,Et,Mt.width,Mt.height,0,_t,Nt,Mt.data)}else if(_.isDataArrayTexture)if(U){if(lt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,Et,ot.width,ot.height,ot.depth),vt)if(_.layerUpdates.size>0){const B=mc(ot.width,ot.height,_.format,_.type);for(const z of _.layerUpdates){const nt=ot.data.subarray(z*B/ot.data.BYTES_PER_ELEMENT,(z+1)*B/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,z,ot.width,ot.height,1,_t,Nt,nt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,_t,Nt,ot.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,ot.width,ot.height,ot.depth,0,_t,Nt,ot.data);else if(_.isData3DTexture)U?(lt&&e.texStorage3D(s.TEXTURE_3D,At,Et,ot.width,ot.height,ot.depth),vt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,_t,Nt,ot.data)):e.texImage3D(s.TEXTURE_3D,0,Et,ot.width,ot.height,ot.depth,0,_t,Nt,ot.data);else if(_.isFramebufferTexture){if(lt)if(U)e.texStorage2D(s.TEXTURE_2D,At,Et,ot.width,ot.height);else{let B=ot.width,z=ot.height;for(let nt=0;nt<At;nt++)e.texImage2D(s.TEXTURE_2D,nt,Et,B,z,0,_t,Nt,null),B>>=1,z>>=1}}else if(Yt.length>0){if(U&&lt){const B=zt(Yt[0]);e.texStorage2D(s.TEXTURE_2D,At,Et,B.width,B.height)}for(let B=0,z=Yt.length;B<z;B++)Mt=Yt[B],U?vt&&e.texSubImage2D(s.TEXTURE_2D,B,0,0,_t,Nt,Mt):e.texImage2D(s.TEXTURE_2D,B,Et,_t,Nt,Mt);_.generateMipmaps=!1}else if(U){if(lt){const B=zt(ot);e.texStorage2D(s.TEXTURE_2D,At,Et,B.width,B.height)}vt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,Nt,ot)}else e.texImage2D(s.TEXTURE_2D,0,Et,_t,Nt,ot);g(_)&&p(K),Ct.__version=$.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function tt(E,_,k){if(_.image.length!==6)return;const K=bt(E,_),st=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+k);const $=n.get(st);if(st.version!==$.__version||K===!0){e.activeTexture(s.TEXTURE0+k);const Ct=re.getPrimaries(re.workingColorSpace),dt=_.colorSpace===ai?null:re.getPrimaries(_.colorSpace),Pt=_.colorSpace===ai||Ct===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Lt=_.isCompressedTexture||_.image[0].isCompressedTexture,ot=_.image[0]&&_.image[0].isDataTexture,_t=[];for(let z=0;z<6;z++)!Lt&&!ot?_t[z]=v(_.image[z],!0,i.maxCubemapSize):_t[z]=ot?_.image[z].image:_.image[z],_t[z]=Wt(_,_t[z]);const Nt=_t[0],Et=r.convert(_.format,_.colorSpace),Mt=r.convert(_.type),Yt=S(_.internalFormat,Et,Mt,_.colorSpace),U=_.isVideoTexture!==!0,lt=$.__version===void 0||K===!0,vt=st.dataReady;let At=w(_,Nt);yt(s.TEXTURE_CUBE_MAP,_);let B;if(Lt){U&&lt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Yt,Nt.width,Nt.height);for(let z=0;z<6;z++){B=_t[z].mipmaps;for(let nt=0;nt<B.length;nt++){const ft=B[nt];_.format!==En?Et!==null?U?vt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt,0,0,ft.width,ft.height,Et,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt,Yt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt,0,0,ft.width,ft.height,Et,Mt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt,Yt,ft.width,ft.height,0,Et,Mt,ft.data)}}}else{if(B=_.mipmaps,U&&lt){B.length>0&&At++;const z=zt(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Yt,z.width,z.height)}for(let z=0;z<6;z++)if(ot){U?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,_t[z].width,_t[z].height,Et,Mt,_t[z].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Yt,_t[z].width,_t[z].height,0,Et,Mt,_t[z].data);for(let nt=0;nt<B.length;nt++){const Ut=B[nt].image[z].image;U?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt+1,0,0,Ut.width,Ut.height,Et,Mt,Ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt+1,Yt,Ut.width,Ut.height,0,Et,Mt,Ut.data)}}else{U?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Et,Mt,_t[z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,Yt,Et,Mt,_t[z]);for(let nt=0;nt<B.length;nt++){const ft=B[nt];U?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt+1,0,0,Et,Mt,ft.image[z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+z,nt+1,Yt,Et,Mt,ft.image[z])}}}g(_)&&p(s.TEXTURE_CUBE_MAP),$.__version=st.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function pt(E,_,k,K,st,$){const Ct=r.convert(k.format,k.colorSpace),dt=r.convert(k.type),Pt=S(k.internalFormat,Ct,dt,k.colorSpace),Lt=n.get(_),ot=n.get(k);if(ot.__renderTarget=_,!Lt.__hasExternalTextures){const _t=Math.max(1,_.width>>$),Nt=Math.max(1,_.height>>$);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,$,Pt,_t,Nt,_.depth,0,Ct,dt,null):e.texImage2D(st,$,Pt,_t,Nt,0,Ct,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),at(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,st,ot.__webglTexture,0,mt(_)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,st,ot.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(E,_,k){if(s.bindRenderbuffer(s.RENDERBUFFER,E),_.depthBuffer){const K=_.depthTexture,st=K&&K.isDepthTexture?K.type:null,$=x(_.stencilBuffer,st),Ct=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=mt(_);at(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,$,_.width,_.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,$,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,$,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,E)}else{const K=_.textures;for(let st=0;st<K.length;st++){const $=K[st],Ct=r.convert($.format,$.colorSpace),dt=r.convert($.type),Pt=S($.internalFormat,Ct,dt,$.colorSpace),Lt=mt(_);k&&at(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Lt,Pt,_.width,_.height):at(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Lt,Pt,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Pt,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xt(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(_.depthTexture);K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H(_.depthTexture,0);const st=K.__webglTexture,$=mt(_);if(_.depthTexture.format===$s)at(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0);else if(_.depthTexture.format===Zs)at(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function qt(E){const _=n.get(E),k=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),K){const st=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,K.removeEventListener("dispose",st)};K.addEventListener("dispose",st),_.__depthDisposeCallback=st}_.__boundDepthTexture=K}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=E.texture.mipmaps;K&&K.length>0?xt(_.__webglFramebuffer[0],E):xt(_.__webglFramebuffer,E)}else if(k){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]===void 0)_.__webglDepthbuffer[K]=s.createRenderbuffer(),Dt(_.__webglDepthbuffer[K],E,!1);else{const st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,$)}}else{const K=E.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Dt(_.__webglDepthbuffer,E,!1);else{const st=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,$)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ne(E,_,k){const K=n.get(E);_!==void 0&&pt(K.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&qt(E)}function P(E){const _=E.texture,k=n.get(E),K=n.get(_);E.addEventListener("dispose",R);const st=E.textures,$=E.isWebGLCubeRenderTarget===!0,Ct=st.length>1;if(Ct||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=_.version,a.memory.textures++),$){k.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[dt]=[];for(let Pt=0;Pt<_.mipmaps.length;Pt++)k.__webglFramebuffer[dt][Pt]=s.createFramebuffer()}else k.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let dt=0;dt<_.mipmaps.length;dt++)k.__webglFramebuffer[dt]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let dt=0,Pt=st.length;dt<Pt;dt++){const Lt=n.get(st[dt]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&at(E)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let dt=0;dt<st.length;dt++){const Pt=st[dt];k.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[dt]);const Lt=r.convert(Pt.format,Pt.colorSpace),ot=r.convert(Pt.type),_t=S(Pt.internalFormat,Lt,ot,Pt.colorSpace,E.isXRRenderTarget===!0),Nt=mt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,_t,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,k.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Dt(k.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),yt(s.TEXTURE_CUBE_MAP,_);for(let dt=0;dt<6;dt++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)pt(k.__webglFramebuffer[dt][Pt],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Pt);else pt(k.__webglFramebuffer[dt],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(_)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let dt=0,Pt=st.length;dt<Pt;dt++){const Lt=st[dt],ot=n.get(Lt);let _t=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(_t=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,ot.__webglTexture),yt(_t,Lt),pt(k.__webglFramebuffer,E,Lt,s.COLOR_ATTACHMENT0+dt,_t,0),g(Lt)&&p(_t)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,K.__webglTexture),yt(dt,_),_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)pt(k.__webglFramebuffer[Pt],E,_,s.COLOR_ATTACHMENT0,dt,Pt);else pt(k.__webglFramebuffer,E,_,s.COLOR_ATTACHMENT0,dt,0);g(_)&&p(dt),e.unbindTexture()}E.depthBuffer&&qt(E)}function it(E){const _=E.textures;for(let k=0,K=_.length;k<K;k++){const st=_[k];if(g(st)){const $=b(E),Ct=n.get(st).__webglTexture;e.bindTexture($,Ct),p($),e.unbindTexture()}}}const J=[],j=[];function Q(E){if(E.samples>0){if(at(E)===!1){const _=E.textures,k=E.width,K=E.height;let st=s.COLOR_BUFFER_BIT;const $=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(E),dt=_.length>1;if(dt)for(let Lt=0;Lt<_.length;Lt++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Lt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Lt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const Pt=E.texture.mipmaps;Pt&&Pt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Lt=0;Lt<_.length;Lt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[Lt]);const ot=n.get(_[Lt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ot,0)}s.blitFramebuffer(0,0,k,K,0,0,k,K,st,s.NEAREST),l===!0&&(J.length=0,j.length=0,J.push(s.COLOR_ATTACHMENT0+Lt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(J.push($),j.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,j)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,J))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let Lt=0;Lt<_.length;Lt++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Lt,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[Lt]);const ot=n.get(_[Lt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Lt,s.TEXTURE_2D,ot,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function mt(E){return Math.min(i.maxSamples,E.samples)}function at(E){const _=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function gt(E){const _=a.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Wt(E,_){const k=E.colorSpace,K=E.format,st=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||k!==Di&&k!==ai&&(re.getTransfer(k)===le?(K!==En||st!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function zt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=N,this.setTexture2D=H,this.setTexture2DArray=Y,this.setTexture3D=G,this.setTextureCube=D,this.rebindTextures=ne,this.setupRenderTarget=P,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=at}function z0(s,t){function e(n,i=ai){let r;const a=re.getTransfer(i);if(n===Nn)return s.UNSIGNED_BYTE;if(n===ll)return s.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ah)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===oh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===sh)return s.BYTE;if(n===rh)return s.SHORT;if(n===Ys)return s.UNSIGNED_SHORT;if(n===ol)return s.INT;if(n===Ii)return s.UNSIGNED_INT;if(n===Ln)return s.FLOAT;if(n===xs)return s.HALF_FLOAT;if(n===lh)return s.ALPHA;if(n===ch)return s.RGB;if(n===En)return s.RGBA;if(n===$s)return s.DEPTH_COMPONENT;if(n===Zs)return s.DEPTH_STENCIL;if(n===hl)return s.RED;if(n===ul)return s.RED_INTEGER;if(n===hh)return s.RG;if(n===dl)return s.RG_INTEGER;if(n===fl)return s.RGBA_INTEGER;if(n===zr||n===Hr||n===Vr||n===Wr)if(a===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===yo||n===To||n===bo||n===Eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===To)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ao||n===wo||n===Ro)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ao||n===wo)return a===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ro)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Co||n===Po||n===Lo||n===Io||n===Do||n===Uo||n===Fo||n===No||n===Oo||n===ko||n===Bo||n===Go||n===zo||n===Ho)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Co)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Po)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Io)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Do)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Uo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===No)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Go)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zo)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return a===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return a===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qo||n===Yo||n===Ko||n===$o)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ko)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ks?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V0=`
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

}`;class W0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new wh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ye({vertexShader:H0,fragmentShader:V0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new Un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class X0 extends Ms{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",g=new W0,p={},b=e.getContextAttributes();let S=null,x=null;const w=[],A=[],R=new ut;let C=null;const y=new je;y.viewport=new ue;const M=new je;M.viewport=new ue;const L=[y,M],N=new df;let V=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let tt=w[Z];return tt===void 0&&(tt=new Na,w[Z]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Z){let tt=w[Z];return tt===void 0&&(tt=new Na,w[Z]=tt),tt.getGripSpace()},this.getHand=function(Z){let tt=w[Z];return tt===void 0&&(tt=new Na,w[Z]=tt),tt.getHandSpace()};function H(Z){const tt=A.indexOf(Z.inputSource);if(tt===-1)return;const pt=w[tt];pt!==void 0&&(pt.update(Z.inputSource,Z.frame,c||a),pt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",G);for(let Z=0;Z<w.length;Z++){const tt=A[Z];tt!==null&&(A[Z]=null,w[Z].disconnect(tt))}V=null,q=null,g.reset();for(const Z in p)delete p[Z];t.setRenderTarget(S),f=null,d=null,u=null,i=null,x=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(S=t.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",G),b.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Dt=null,xt=null;b.depth&&(xt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=b.stencil?Zs:$s,Dt=b.stencil?Ks:Ii);const qt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(qt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new Fn(d.textureWidth,d.textureHeight,{format:En,type:Nn,depthTexture:new Ah(d.textureWidth,d.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const pt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Fn(f.framebufferWidth,f.framebufferHeight,{format:En,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ht.setContext(i),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(Z){for(let tt=0;tt<Z.removed.length;tt++){const pt=Z.removed[tt],Dt=A.indexOf(pt);Dt>=0&&(A[Dt]=null,w[Dt].disconnect(pt))}for(let tt=0;tt<Z.added.length;tt++){const pt=Z.added[tt];let Dt=A.indexOf(pt);if(Dt===-1){for(let qt=0;qt<w.length;qt++)if(qt>=A.length){A.push(pt),Dt=qt;break}else if(A[qt]===null){A[qt]=pt,Dt=qt;break}if(Dt===-1)break}const xt=w[Dt];xt&&xt.connect(pt)}}const D=new I,rt=new I;function et(Z,tt,pt){D.setFromMatrixPosition(tt.matrixWorld),rt.setFromMatrixPosition(pt.matrixWorld);const Dt=D.distanceTo(rt),xt=tt.projectionMatrix.elements,qt=pt.projectionMatrix.elements,ne=xt[14]/(xt[10]-1),P=xt[14]/(xt[10]+1),it=(xt[9]+1)/xt[5],J=(xt[9]-1)/xt[5],j=(xt[8]-1)/xt[0],Q=(qt[8]+1)/qt[0],mt=ne*j,at=ne*Q,gt=Dt/(-j+Q),Wt=gt*-j;if(tt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Wt),Z.translateZ(gt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xt[10]===-1)Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const zt=ne+gt,E=P+gt,_=mt-Wt,k=at+(Dt-Wt),K=it*P/E*zt,st=J*P/E*zt;Z.projectionMatrix.makePerspective(_,k,K,st,zt,E),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ct(Z,tt){tt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(tt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let tt=Z.near,pt=Z.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),N.near=M.near=y.near=tt,N.far=M.far=y.far=pt,(V!==N.near||q!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),V=N.near,q=N.far),N.layers.mask=Z.layers.mask|6,y.layers.mask=N.layers.mask&3,M.layers.mask=N.layers.mask&5;const Dt=Z.parent,xt=N.cameras;ct(N,Dt);for(let qt=0;qt<xt.length;qt++)ct(xt[qt],Dt);xt.length===2?et(N,y,M):N.projectionMatrix.copy(y.projectionMatrix),yt(Z,N,Dt)};function yt(Z,tt,pt){pt===null?Z.matrix.copy(tt.matrixWorld):(Z.matrix.copy(pt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(tt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(tt.projectionMatrix),Z.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=jr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(Z){return p[Z]};let bt=null;function Jt(Z,tt){if(h=tt.getViewerPose(c||a),m=tt,h!==null){const pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Dt=!1;pt.length!==N.cameras.length&&(N.cameras.length=0,Dt=!0);for(let P=0;P<pt.length;P++){const it=pt[P];let J=null;if(f!==null)J=f.getViewport(it);else{const Q=u.getViewSubImage(d,it);J=Q.viewport,P===0&&(t.setRenderTargetTextures(x,Q.colorTexture,Q.depthStencilTexture),t.setRenderTarget(x))}let j=L[P];j===void 0&&(j=new je,j.layers.enable(P),j.viewport=new ue,L[P]=j),j.matrix.fromArray(it.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(it.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(J.x,J.y,J.width,J.height),P===0&&(N.matrix.copy(j.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Dt===!0&&N.cameras.push(j)}const xt=i.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const P=u.getDepthInformation(pt[0]);P&&P.isValid&&P.texture&&g.init(P,i.renderState)}if(xt&&xt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<pt.length;P++){const it=pt[P].camera;if(it){let J=p[it];J||(J=new wh,p[it]=J);const j=u.getCameraImage(it);J.sourceTexture=j}}}}for(let pt=0;pt<w.length;pt++){const Dt=A[pt],xt=w[pt];Dt!==null&&xt!==void 0&&xt.update(Dt,tt,c||a)}bt&&bt(Z,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),m=null}const Ht=new Oh;Ht.setAnimationLoop(Jt),this.setAnimationLoop=function(Z){bt=Z},this.dispose=function(){}}}const Ti=new On,q0=new de;function Y0(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Mh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,b,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,b,S):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ge&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ge&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=t.get(p),S=b.envMap,x=b.envMapRotation;S&&(g.envMap.value=S,Ti.copy(x),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),g.envMapRotation.value.setFromMatrix4(q0.makeRotationFromEuler(Ti)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=S*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ge&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function K0(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const x=S.program;n.uniformBlockBinding(b,x)}function c(b,S){let x=i[b.id];x===void 0&&(m(b),x=h(b),i[b.id]=x,b.addEventListener("dispose",g));const w=S.program;n.updateUBOMapping(b,w);const A=t.render.frame;r[b.id]!==A&&(d(b),r[b.id]=A)}function h(b){const S=u();b.__bindingPointIndex=S;const x=s.createBuffer(),w=b.__size,A=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,w,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,x),x}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=i[b.id],x=b.uniforms,w=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let A=0,R=x.length;A<R;A++){const C=Array.isArray(x[A])?x[A]:[x[A]];for(let y=0,M=C.length;y<M;y++){const L=C[y];if(f(L,A,y,w)===!0){const N=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let H=0;H<V.length;H++){const Y=V[H],G=v(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,N+q,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,q),q+=G.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(b,S,x,w){const A=b.value,R=S+"_"+x;if(w[R]===void 0)return typeof A=="number"||typeof A=="boolean"?w[R]=A:w[R]=A.clone(),!0;{const C=w[R];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return w[R]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function m(b){const S=b.uniforms;let x=0;const w=16;for(let R=0,C=S.length;R<C;R++){const y=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,L=y.length;M<L;M++){const N=y[M],V=Array.isArray(N.value)?N.value:[N.value];for(let q=0,H=V.length;q<H;q++){const Y=V[q],G=v(Y),D=x%w,rt=D%G.boundary,et=D+rt;x+=rt,et!==0&&w-et<G.storage&&(x+=w-et),N.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=G.storage}}}const A=x%w;return A>0&&(x+=w-A),b.__size=x,b.__cache={},this}function v(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function g(b){const S=b.target;S.removeEventListener("dispose",g);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function p(){for(const b in i)s.deleteBuffer(i[b]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class $0{constructor(t={}){const{canvas:e=Vu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=Re;let A=0,R=0,C=null,y=-1,M=null;const L=new ue,N=new ue;let V=null;const q=new Xt(0);let H=0,Y=e.width,G=e.height,D=1,rt=null,et=null;const ct=new ue(0,0,Y,G),yt=new ue(0,0,Y,G);let bt=!1;const Jt=new gl;let Ht=!1,Z=!1;const tt=new de,pt=new I,Dt=new ue,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function ne(){return C===null?D:1}let P=n;function it(T,F){return e.getContext(T,F)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${al}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",B,!1),P===null){const F="webgl2";if(P=it(F,T),P===null)throw it(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let J,j,Q,mt,at,gt,Wt,zt,E,_,k,K,st,$,Ct,dt,Pt,Lt,ot,_t,Nt,Et,Mt,Yt;function U(){J=new rg(P),J.init(),Et=new z0(P,J),j=new jm(P,J,t,Et),Q=new B0(P,J),j.reversedDepthBuffer&&d&&Q.buffers.depth.setReversed(!0),mt=new lg(P),at=new A0,gt=new G0(P,J,Q,at,j,Et,mt),Wt=new tg(x),zt=new sg(x),E=new pf(P),Mt=new Zm(P,E),_=new ag(P,E,mt,Mt),k=new hg(P,_,E,mt),ot=new cg(P,j,gt),dt=new Qm(at),K=new E0(x,Wt,zt,J,j,Mt,dt),st=new Y0(x,at),$=new R0,Ct=new U0(J),Lt=new $m(x,Wt,zt,Q,k,f,l),Pt=new O0(x,k,j),Yt=new K0(P,mt,j,Q),_t=new Jm(P,J,mt),Nt=new og(P,J,mt),mt.programs=K.programs,x.capabilities=j,x.extensions=J,x.properties=at,x.renderLists=$,x.shadowMap=Pt,x.state=Q,x.info=mt}U();const lt=new X0(x,P);this.xr=lt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=J.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=J.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(T){T!==void 0&&(D=T,this.setSize(Y,G,!1))},this.getSize=function(T){return T.set(Y,G)},this.setSize=function(T,F,W=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,G=F,e.width=Math.floor(T*D),e.height=Math.floor(F*D),W===!0&&(e.style.width=T+"px",e.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(Y*D,G*D).floor()},this.setDrawingBufferSize=function(T,F,W){Y=T,G=F,D=W,e.width=Math.floor(T*W),e.height=Math.floor(F*W),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(ct)},this.setViewport=function(T,F,W,X){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,F,W,X),Q.viewport(L.copy(ct).multiplyScalar(D).round())},this.getScissor=function(T){return T.copy(yt)},this.setScissor=function(T,F,W,X){T.isVector4?yt.set(T.x,T.y,T.z,T.w):yt.set(T,F,W,X),Q.scissor(N.copy(yt).multiplyScalar(D).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(T){Q.setScissorTest(bt=T)},this.setOpaqueSort=function(T){rt=T},this.setTransparentSort=function(T){et=T},this.getClearColor=function(T){return T.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor(...arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,W=!0){let X=0;if(T){let O=!1;if(C!==null){const ht=C.texture.format;O=ht===fl||ht===dl||ht===ul}if(O){const ht=C.texture.type,Tt=ht===Nn||ht===Ii||ht===Ys||ht===Ks||ht===ll||ht===cl,It=Lt.getClearColor(),Rt=Lt.getClearAlpha(),Gt=It.r,Vt=It.g,kt=It.b;Tt?(m[0]=Gt,m[1]=Vt,m[2]=kt,m[3]=Rt,P.clearBufferuiv(P.COLOR,0,m)):(v[0]=Gt,v[1]=Vt,v[2]=kt,v[3]=Rt,P.clearBufferiv(P.COLOR,0,v))}else X|=P.COLOR_BUFFER_BIT}F&&(X|=P.DEPTH_BUFFER_BIT),W&&(X|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",B,!1),Lt.dispose(),$.dispose(),Ct.dispose(),at.dispose(),Wt.dispose(),zt.dispose(),k.dispose(),Mt.dispose(),Yt.dispose(),K.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",ae),lt.removeEventListener("sessionend",me),Ke.stop()};function vt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=mt.autoReset,F=Pt.enabled,W=Pt.autoUpdate,X=Pt.needsUpdate,O=Pt.type;U(),mt.autoReset=T,Pt.enabled=F,Pt.autoUpdate=W,Pt.needsUpdate=X,Pt.type=O}function B(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function z(T){const F=T.target;F.removeEventListener("dispose",z),nt(F)}function nt(T){ft(T),at.remove(T)}function ft(T){const F=at.get(T).programs;F!==void 0&&(F.forEach(function(W){K.releaseProgram(W)}),T.isShaderMaterial&&K.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,W,X,O,ht){F===null&&(F=xt);const Tt=O.isMesh&&O.matrixWorld.determinant()<0,It=Zh(T,F,W,X,O);Q.setMaterial(X,Tt);let Rt=W.index,Gt=1;if(X.wireframe===!0){if(Rt=_.getWireframeAttribute(W),Rt===void 0)return;Gt=2}const Vt=W.drawRange,kt=W.attributes.position;let te=Vt.start*Gt,oe=(Vt.start+Vt.count)*Gt;ht!==null&&(te=Math.max(te,ht.start*Gt),oe=Math.min(oe,(ht.start+ht.count)*Gt)),Rt!==null?(te=Math.max(te,0),oe=Math.min(oe,Rt.count)):kt!=null&&(te=Math.max(te,0),oe=Math.min(oe,kt.count));const Te=oe-te;if(Te<0||Te===1/0)return;Mt.setup(O,X,It,W,Rt);let ge,fe=_t;if(Rt!==null&&(ge=E.get(Rt),fe=Nt,fe.setIndex(ge)),O.isMesh)X.wireframe===!0?(Q.setLineWidth(X.wireframeLinewidth*ne()),fe.setMode(P.LINES)):fe.setMode(P.TRIANGLES);else if(O.isLine){let Bt=X.linewidth;Bt===void 0&&(Bt=1),Q.setLineWidth(Bt*ne()),O.isLineSegments?fe.setMode(P.LINES):O.isLineLoop?fe.setMode(P.LINE_LOOP):fe.setMode(P.LINE_STRIP)}else O.isPoints?fe.setMode(P.POINTS):O.isSprite&&fe.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Js("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))fe.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Bt=O._multiDrawStarts,xe=O._multiDrawCounts,se=O._multiDrawCount,nn=Rt?E.get(Rt).bytesPerElement:1,Hi=at.get(X).currentProgram.getUniforms();for(let sn=0;sn<se;sn++)Hi.setValue(P,"_gl_DrawID",sn),fe.render(Bt[sn]/nn,xe[sn])}else if(O.isInstancedMesh)fe.renderInstances(te,Te,O.count);else if(W.isInstancedBufferGeometry){const Bt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,xe=Math.min(W.instanceCount,Bt);fe.renderInstances(te,Te,xe)}else fe.render(te,Te)};function Ut(T,F,W){T.transparent===!0&&T.side===Qe&&T.forceSinglePass===!1?(T.side=Ge,T.needsUpdate=!0,rr(T,F,W),T.side=pi,T.needsUpdate=!0,rr(T,F,W),T.side=Qe):rr(T,F,W)}this.compile=function(T,F,W=null){W===null&&(W=T),p=Ct.get(W),p.init(F),S.push(p),W.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==W&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const X=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ht=O.material;if(ht)if(Array.isArray(ht))for(let Tt=0;Tt<ht.length;Tt++){const It=ht[Tt];Ut(It,W,O),X.add(It)}else Ut(ht,W,O),X.add(ht)}),p=S.pop(),X},this.compileAsync=function(T,F,W=null){const X=this.compile(T,F,W);return new Promise(O=>{function ht(){if(X.forEach(function(Tt){at.get(Tt).currentProgram.isReady()&&X.delete(Tt)}),X.size===0){O(T);return}setTimeout(ht,10)}J.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Ot=null;function Zt(T){Ot&&Ot(T)}function ae(){Ke.stop()}function me(){Ke.start()}const Ke=new Oh;Ke.setAnimationLoop(Zt),typeof self<"u"&&Ke.setContext(self),this.setAnimationLoop=function(T){Ot=T,lt.setAnimationLoop(T),T===null?Ke.stop():Ke.start()},lt.addEventListener("sessionstart",ae),lt.addEventListener("sessionend",me),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(F),F=lt.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,F,C),p=Ct.get(T,S.length),p.init(F),S.push(p),tt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Jt.setFromProjectionMatrix(tt,In,F.reversedDepth),Z=this.localClippingEnabled,Ht=dt.init(this.clippingPlanes,Z),g=$.get(T,b.length),g.init(),b.push(g),lt.enabled===!0&&lt.isPresenting===!0){const ht=x.xr.getDepthSensingMesh();ht!==null&&mi(ht,F,-1/0,x.sortObjects)}mi(T,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(rt,et),qt=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,qt&&Lt.addToRenderList(g,T),this.info.render.frame++,Ht===!0&&dt.beginShadows();const W=p.state.shadowsArray;Pt.render(W,T,F),Ht===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const ht=F.cameras;if(O.length>0)for(let Tt=0,It=ht.length;Tt<It;Tt++){const Rt=ht[Tt];gi(X,O,T,Rt)}qt&&Lt.render(T);for(let Tt=0,It=ht.length;Tt<It;Tt++){const Rt=ht[Tt];Bi(g,T,Rt,Rt.viewport)}}else O.length>0&&gi(X,O,T,F),qt&&Lt.render(T),Bi(g,T,F);C!==null&&R===0&&(gt.updateMultisampleRenderTarget(C),gt.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(x,T,F),Mt.resetDefaultState(),y=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],Ht===!0&&dt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function mi(T,F,W,X){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Jt.intersectsSprite(T)){X&&Dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(tt);const Tt=k.update(T),It=T.material;It.visible&&g.push(T,Tt,It,W,Dt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Jt.intersectsObject(T))){const Tt=k.update(T),It=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Dt.copy(T.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Dt.copy(Tt.boundingSphere.center)),Dt.applyMatrix4(T.matrixWorld).applyMatrix4(tt)),Array.isArray(It)){const Rt=Tt.groups;for(let Gt=0,Vt=Rt.length;Gt<Vt;Gt++){const kt=Rt[Gt],te=It[kt.materialIndex];te&&te.visible&&g.push(T,Tt,te,W,Dt.z,kt)}}else It.visible&&g.push(T,Tt,It,W,Dt.z,null)}}const ht=T.children;for(let Tt=0,It=ht.length;Tt<It;Tt++)mi(ht[Tt],F,W,X)}function Bi(T,F,W,X){const O=T.opaque,ht=T.transmissive,Tt=T.transparent;p.setupLightsView(W),Ht===!0&&dt.setGlobalState(x.clippingPlanes,W),X&&Q.viewport(L.copy(X)),O.length>0&&Gi(O,F,W),ht.length>0&&Gi(ht,F,W),Tt.length>0&&Gi(Tt,F,W),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function gi(T,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Fn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?xs:Nn,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const ht=p.state.transmissionRenderTarget[X.id],Tt=X.viewport||L;ht.setSize(Tt.z*x.transmissionResolutionScale,Tt.w*x.transmissionResolutionScale);const It=x.getRenderTarget(),Rt=x.getActiveCubeFace(),Gt=x.getActiveMipmapLevel();x.setRenderTarget(ht),x.getClearColor(q),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),qt&&Lt.render(W);const Vt=x.toneMapping;x.toneMapping=Zn;const kt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),Ht===!0&&dt.setGlobalState(x.clippingPlanes,X),Gi(T,W,X),gt.updateMultisampleRenderTarget(ht),gt.updateRenderTargetMipmap(ht),J.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let oe=0,Te=F.length;oe<Te;oe++){const ge=F[oe],fe=ge.object,Bt=ge.geometry,xe=ge.material,se=ge.group;if(xe.side===Qe&&fe.layers.test(X.layers)){const nn=xe.side;xe.side=Ge,xe.needsUpdate=!0,zi(fe,W,X,Bt,xe,se),xe.side=nn,xe.needsUpdate=!0,te=!0}}te===!0&&(gt.updateMultisampleRenderTarget(ht),gt.updateRenderTargetMipmap(ht))}x.setRenderTarget(It,Rt,Gt),x.setClearColor(q,H),kt!==void 0&&(X.viewport=kt),x.toneMapping=Vt}function Gi(T,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ht=T.length;O<ht;O++){const Tt=T[O],It=Tt.object,Rt=Tt.geometry,Gt=Tt.group;let Vt=Tt.material;Vt.allowOverride===!0&&X!==null&&(Vt=X),It.layers.test(W.layers)&&zi(It,F,W,Rt,Vt,Gt)}}function zi(T,F,W,X,O,ht){T.onBeforeRender(x,F,W,X,O,ht),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(x,F,W,X,T,ht),O.transparent===!0&&O.side===Qe&&O.forceSinglePass===!1?(O.side=Ge,O.needsUpdate=!0,x.renderBufferDirect(W,F,X,O,T,ht),O.side=pi,O.needsUpdate=!0,x.renderBufferDirect(W,F,X,O,T,ht),O.side=Qe):x.renderBufferDirect(W,F,X,O,T,ht),T.onAfterRender(x,F,W,X,O,ht)}function rr(T,F,W){F.isScene!==!0&&(F=xt);const X=at.get(T),O=p.state.lights,ht=p.state.shadowsArray,Tt=O.state.version,It=K.getParameters(T,O.state,ht,F,W),Rt=K.getProgramCacheKey(It);let Gt=X.programs;X.environment=T.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(T.isMeshStandardMaterial?zt:Wt).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Gt===void 0&&(T.addEventListener("dispose",z),Gt=new Map,X.programs=Gt);let Vt=Gt.get(Rt);if(Vt!==void 0){if(X.currentProgram===Vt&&X.lightsStateVersion===Tt)return Cl(T,It),Vt}else It.uniforms=K.getUniforms(T),T.onBeforeCompile(It,x),Vt=K.acquireProgram(It,Rt),Gt.set(Rt,Vt),X.uniforms=It.uniforms;const kt=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(kt.clippingPlanes=dt.uniform),Cl(T,It),X.needsLights=jh(T),X.lightsStateVersion=Tt,X.needsLights&&(kt.ambientLightColor.value=O.state.ambient,kt.lightProbe.value=O.state.probe,kt.directionalLights.value=O.state.directional,kt.directionalLightShadows.value=O.state.directionalShadow,kt.spotLights.value=O.state.spot,kt.spotLightShadows.value=O.state.spotShadow,kt.rectAreaLights.value=O.state.rectArea,kt.ltc_1.value=O.state.rectAreaLTC1,kt.ltc_2.value=O.state.rectAreaLTC2,kt.pointLights.value=O.state.point,kt.pointLightShadows.value=O.state.pointShadow,kt.hemisphereLights.value=O.state.hemi,kt.directionalShadowMap.value=O.state.directionalShadowMap,kt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,kt.spotShadowMap.value=O.state.spotShadowMap,kt.spotLightMatrix.value=O.state.spotLightMatrix,kt.spotLightMap.value=O.state.spotLightMap,kt.pointShadowMap.value=O.state.pointShadowMap,kt.pointShadowMatrix.value=O.state.pointShadowMatrix),X.currentProgram=Vt,X.uniformsList=null,Vt}function Rl(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=Xr.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Cl(T,F){const W=at.get(T);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Zh(T,F,W,X,O){F.isScene!==!0&&(F=xt),gt.resetTextureUnits();const ht=F.fog,Tt=X.isMeshStandardMaterial?F.environment:null,It=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Di,Rt=(X.isMeshStandardMaterial?zt:Wt).get(X.envMap||Tt),Gt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),kt=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,oe=!!W.morphAttributes.color;let Te=Zn;X.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Te=x.toneMapping);const ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,fe=ge!==void 0?ge.length:0,Bt=at.get(X),xe=p.state.lights;if(Ht===!0&&(Z===!0||T!==M)){const He=T===M&&X.id===y;dt.setState(X,T,He)}let se=!1;X.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==xe.state.version||Bt.outputColorSpace!==It||O.isBatchedMesh&&Bt.batching===!1||!O.isBatchedMesh&&Bt.batching===!0||O.isBatchedMesh&&Bt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Bt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Bt.instancing===!1||!O.isInstancedMesh&&Bt.instancing===!0||O.isSkinnedMesh&&Bt.skinning===!1||!O.isSkinnedMesh&&Bt.skinning===!0||O.isInstancedMesh&&Bt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Bt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Bt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Bt.instancingMorph===!1&&O.morphTexture!==null||Bt.envMap!==Rt||X.fog===!0&&Bt.fog!==ht||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==dt.numPlanes||Bt.numIntersection!==dt.numIntersection)||Bt.vertexAlphas!==Gt||Bt.vertexTangents!==Vt||Bt.morphTargets!==kt||Bt.morphNormals!==te||Bt.morphColors!==oe||Bt.toneMapping!==Te||Bt.morphTargetsCount!==fe)&&(se=!0):(se=!0,Bt.__version=X.version);let nn=Bt.currentProgram;se===!0&&(nn=rr(X,F,O));let Hi=!1,sn=!1,Ts=!1;const Me=nn.getUniforms(),fn=Bt.uniforms;if(Q.useProgram(nn.program)&&(Hi=!0,sn=!0,Ts=!0),X.id!==y&&(y=X.id,sn=!0),Hi||M!==T){Q.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Me.setValue(P,"projectionMatrix",T.projectionMatrix),Me.setValue(P,"viewMatrix",T.matrixWorldInverse);const $e=Me.map.cameraPosition;$e!==void 0&&$e.setValue(P,pt.setFromMatrixPosition(T.matrixWorld)),j.logarithmicDepthBuffer&&Me.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Me.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,sn=!0,Ts=!0)}if(O.isSkinnedMesh){Me.setOptional(P,O,"bindMatrix"),Me.setOptional(P,O,"bindMatrixInverse");const He=O.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Me.setValue(P,"boneTexture",He.boneTexture,gt))}O.isBatchedMesh&&(Me.setOptional(P,O,"batchingTexture"),Me.setValue(P,"batchingTexture",O._matricesTexture,gt),Me.setOptional(P,O,"batchingIdTexture"),Me.setValue(P,"batchingIdTexture",O._indirectTexture,gt),Me.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&Me.setValue(P,"batchingColorTexture",O._colorsTexture,gt));const pn=W.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&ot.update(O,W,nn),(sn||Bt.receiveShadow!==O.receiveShadow)&&(Bt.receiveShadow=O.receiveShadow,Me.setValue(P,"receiveShadow",O.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(fn.envMap.value=Rt,fn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(fn.envMapIntensity.value=F.environmentIntensity),sn&&(Me.setValue(P,"toneMappingExposure",x.toneMappingExposure),Bt.needsLights&&Jh(fn,Ts),ht&&X.fog===!0&&st.refreshFogUniforms(fn,ht),st.refreshMaterialUniforms(fn,X,D,G,p.state.transmissionRenderTarget[T.id]),Xr.upload(P,Rl(Bt),fn,gt)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Xr.upload(P,Rl(Bt),fn,gt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Me.setValue(P,"center",O.center),Me.setValue(P,"modelViewMatrix",O.modelViewMatrix),Me.setValue(P,"normalMatrix",O.normalMatrix),Me.setValue(P,"modelMatrix",O.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const He=X.uniformsGroups;for(let $e=0,da=He.length;$e<da;$e++){const vi=He[$e];Yt.update(vi,nn),Yt.bind(vi,nn)}}return nn}function Jh(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function jh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,F,W){const X=at.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),at.get(T.texture).__webglTexture=F,at.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:W,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const W=at.get(T);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const Qh=P.createFramebuffer();this.setRenderTarget=function(T,F=0,W=0){C=T,A=F,R=W;let X=!0,O=null,ht=!1,Tt=!1;if(T){const Rt=at.get(T);if(Rt.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(P.FRAMEBUFFER,null),X=!1;else if(Rt.__webglFramebuffer===void 0)gt.setupRenderTarget(T);else if(Rt.__hasExternalTextures)gt.rebindTextures(T,at.get(T.texture).__webglTexture,at.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const kt=T.depthTexture;if(Rt.__boundDepthTexture!==kt){if(kt!==null&&at.has(kt)&&(T.width!==kt.image.width||T.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(T)}}const Gt=T.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Tt=!0);const Vt=at.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Vt[F])?O=Vt[F][W]:O=Vt[F],ht=!0):T.samples>0&&gt.useMultisampledRTT(T)===!1?O=at.get(T).__webglMultisampledFramebuffer:Array.isArray(Vt)?O=Vt[W]:O=Vt,L.copy(T.viewport),N.copy(T.scissor),V=T.scissorTest}else L.copy(ct).multiplyScalar(D).floor(),N.copy(yt).multiplyScalar(D).floor(),V=bt;if(W!==0&&(O=Qh),Q.bindFramebuffer(P.FRAMEBUFFER,O)&&X&&Q.drawBuffers(T,O),Q.viewport(L),Q.scissor(N),Q.setScissorTest(V),ht){const Rt=at.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Rt.__webglTexture,W)}else if(Tt){const Rt=F;for(let Gt=0;Gt<T.textures.length;Gt++){const Vt=at.get(T.textures[Gt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Gt,Vt.__webglTexture,W,Rt)}}else if(T!==null&&W!==0){const Rt=at.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Rt.__webglTexture,W)}y=-1},this.readRenderTargetPixels=function(T,F,W,X,O,ht,Tt,It=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){Q.bindFramebuffer(P.FRAMEBUFFER,Rt);try{const Gt=T.textures[It],Vt=Gt.format,kt=Gt.type;if(!j.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-X&&W>=0&&W<=T.height-O&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+It),P.readPixels(F,W,X,O,Et.convert(Vt),Et.convert(kt),ht))}finally{const Gt=C!==null?at.get(C).__webglFramebuffer:null;Q.bindFramebuffer(P.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(T,F,W,X,O,ht,Tt,It=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(F>=0&&F<=T.width-X&&W>=0&&W<=T.height-O){Q.bindFramebuffer(P.FRAMEBUFFER,Rt);const Gt=T.textures[It],Vt=Gt.format,kt=Gt.type;if(!j.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const te=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,te),P.bufferData(P.PIXEL_PACK_BUFFER,ht.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+It),P.readPixels(F,W,X,O,Et.convert(Vt),Et.convert(kt),0);const oe=C!==null?at.get(C).__webglFramebuffer:null;Q.bindFramebuffer(P.FRAMEBUFFER,oe);const Te=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Wu(P,Te,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,te),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ht),P.deleteBuffer(te),P.deleteSync(Te),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,W=0){const X=Math.pow(2,-W),O=Math.floor(T.image.width*X),ht=Math.floor(T.image.height*X),Tt=F!==null?F.x:0,It=F!==null?F.y:0;gt.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,Tt,It,O,ht),Q.unbindTexture()};const tu=P.createFramebuffer(),eu=P.createFramebuffer();this.copyTextureToTexture=function(T,F,W=null,X=null,O=0,ht=null){ht===null&&(O!==0?(Js("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=O,O=0):ht=0);let Tt,It,Rt,Gt,Vt,kt,te,oe,Te;const ge=T.isCompressedTexture?T.mipmaps[ht]:T.image;if(W!==null)Tt=W.max.x-W.min.x,It=W.max.y-W.min.y,Rt=W.isBox3?W.max.z-W.min.z:1,Gt=W.min.x,Vt=W.min.y,kt=W.isBox3?W.min.z:0;else{const pn=Math.pow(2,-O);Tt=Math.floor(ge.width*pn),It=Math.floor(ge.height*pn),T.isDataArrayTexture?Rt=ge.depth:T.isData3DTexture?Rt=Math.floor(ge.depth*pn):Rt=1,Gt=0,Vt=0,kt=0}X!==null?(te=X.x,oe=X.y,Te=X.z):(te=0,oe=0,Te=0);const fe=Et.convert(F.format),Bt=Et.convert(F.type);let xe;F.isData3DTexture?(gt.setTexture3D(F,0),xe=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(gt.setTexture2DArray(F,0),xe=P.TEXTURE_2D_ARRAY):(gt.setTexture2D(F,0),xe=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const se=P.getParameter(P.UNPACK_ROW_LENGTH),nn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Hi=P.getParameter(P.UNPACK_SKIP_PIXELS),sn=P.getParameter(P.UNPACK_SKIP_ROWS),Ts=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ge.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ge.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Gt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Vt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,kt);const Me=T.isDataArrayTexture||T.isData3DTexture,fn=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const pn=at.get(T),He=at.get(F),$e=at.get(pn.__renderTarget),da=at.get(He.__renderTarget);Q.bindFramebuffer(P.READ_FRAMEBUFFER,$e.__webglFramebuffer),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,da.__webglFramebuffer);for(let vi=0;vi<Rt;vi++)Me&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,at.get(T).__webglTexture,O,kt+vi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,at.get(F).__webglTexture,ht,Te+vi)),P.blitFramebuffer(Gt,Vt,Tt,It,te,oe,Tt,It,P.DEPTH_BUFFER_BIT,P.NEAREST);Q.bindFramebuffer(P.READ_FRAMEBUFFER,null),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||T.isRenderTargetTexture||at.has(T)){const pn=at.get(T),He=at.get(F);Q.bindFramebuffer(P.READ_FRAMEBUFFER,tu),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,eu);for(let $e=0;$e<Rt;$e++)Me?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,pn.__webglTexture,O,kt+$e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pn.__webglTexture,O),fn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,He.__webglTexture,ht,Te+$e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,He.__webglTexture,ht),O!==0?P.blitFramebuffer(Gt,Vt,Tt,It,te,oe,Tt,It,P.COLOR_BUFFER_BIT,P.NEAREST):fn?P.copyTexSubImage3D(xe,ht,te,oe,Te+$e,Gt,Vt,Tt,It):P.copyTexSubImage2D(xe,ht,te,oe,Gt,Vt,Tt,It);Q.bindFramebuffer(P.READ_FRAMEBUFFER,null),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else fn?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(xe,ht,te,oe,Te,Tt,It,Rt,fe,Bt,ge.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(xe,ht,te,oe,Te,Tt,It,Rt,fe,ge.data):P.texSubImage3D(xe,ht,te,oe,Te,Tt,It,Rt,fe,Bt,ge):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ht,te,oe,Tt,It,fe,Bt,ge.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ht,te,oe,ge.width,ge.height,fe,ge.data):P.texSubImage2D(P.TEXTURE_2D,ht,te,oe,Tt,It,fe,Bt,ge);P.pixelStorei(P.UNPACK_ROW_LENGTH,se),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,nn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Hi),P.pixelStorei(P.UNPACK_SKIP_ROWS,sn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ts),ht===0&&F.generateMipmaps&&P.generateMipmap(xe),Q.unbindTexture()},this.initRenderTarget=function(T){at.get(T).__webglFramebuffer===void 0&&gt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?gt.setTextureCube(T,0):T.isData3DTexture?gt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?gt.setTexture2DArray(T,0):gt.setTexture2D(T,0),Q.unbindTexture()},this.resetState=function(){A=0,R=0,C=null,Q.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}const Ft={HZ:120,DT:1/120,MAX_SUBSTEPS:8,MAX_FRAME_DT:.1,YAW_SLIP_FACTOR:1.35,MAX_SPEED_MS:90,MAX_YAW_RATE:6,GRAVITY:9.81,TIRE_PEAK_MU:1.05,TIRE_WET_MU:.78,TIRE_GUTTER_MU:1.35,TIRE_B:9,TIRE_C:1.4,HANDBRAKE_REAR_GRIP_CUT:.6,HANDBRAKE_YAW_INJECT:4,HANDBRAKE_YAW_TIME:.25,HANDBRAKE_RECOVER:.55,COUNTERSTEER_SLIP_TRIGGER:25*Math.PI/180,COUNTERSTEER_DAMPING:2,COUNTERSTEER_SCALE:.0012,IDLE_RPM:900,REDLINE_RPM:7800,LIMITER_RPM:8200,LIMITER_CUT_HZ:8,SHIFT_UP_TIME:.12,SHIFT_DOWN_TIME:.1,AUTO_SHIFT_UP_RPM:7500,AUTO_SHIFT_DOWN_RPM:3200,GUTTER_MAX_ANGLE:15*Math.PI/180,GUTTER_MIN_SPEED:45/3.6,GUTTER_EXIT_BOOST:.04,GUTTER_TICK_HZ:6,COLLISION_DAMPING:.85,COLLISION_MIN_LOSS:.12,COLLISION_MAX_LOSS:.2,COLLISION_PUSH:.55,MAX_WEIGHT_TRANSFER:.75},Hh={id:"hachi86",name:"HACHI 86",subtitle:"1.6L NA · RWD · 940 kg",color:15922423,accent:1711394,mass:940,wheelbase:2.4,track:1.35,cgHeight:.52,inertiaYaw:1250,powerHp:130,powerRpm:6600,torqueNm:149,torqueRpm:5200,gears:[3.58,2.02,1.38,1,.79],finalDrive:4.3,lsdLock:.6,steerLockDeg:34,steerRatio:13,drive:"rwd",wheelRadius:.3,gripScale:1,driftBias:1},Z0={id:"fd7",name:"FD-7 SAVANNA",subtitle:"1.3L TWIN-TURBO · RWD · 1270 kg",color:16765952,accent:1711394,mass:1270,wheelbase:2.43,track:1.46,cgHeight:.5,inertiaYaw:1680,powerHp:255,powerRpm:6500,torqueNm:294,torqueRpm:5e3,gears:[3.48,2.02,1.39,1,.72],finalDrive:4.1,lsdLock:.72,steerLockDeg:33,steerRatio:13.5,drive:"rwd",wheelRadius:.32,gripScale:1.06,driftBias:1.08},J0={id:"ek9",name:"EK-9 TYPE-R",subtitle:"1.6L VTEC · FWD · 1070 kg",color:16777215,accent:14162732,mass:1070,wheelbase:2.62,track:1.48,cgHeight:.48,inertiaYaw:1420,powerHp:182,powerRpm:7800,torqueNm:160,torqueRpm:6200,gears:[3.23,2.1,1.46,1.13,.89],finalDrive:4.4,lsdLock:.5,steerLockDeg:35,steerRatio:12.8,drive:"fwd",wheelRadius:.3,gripScale:1.03,driftBias:.86},j0={id:"s13",name:"NISSAN-KAI S13",subtitle:"2.0L TURBO · RWD · 1180 kg",color:3107839,accent:857124,mass:1180,wheelbase:2.47,track:1.46,cgHeight:.51,inertiaYaw:1520,powerHp:205,powerRpm:6400,torqueNm:265,torqueRpm:4800,gears:[3.32,1.9,1.31,1,.76],finalDrive:4.36,lsdLock:.68,steerLockDeg:34,steerRatio:13.2,drive:"rwd",wheelRadius:.31,gripScale:1.02,driftBias:1.05},Al=[Hh,Z0,J0,j0];function nl(s){return Al.find(t=>t.id===s)??Hh}const oi={AI_SKILL_BASE:.94,RUBBERBAND_BEHIND_S:6,RUBBERBAND_SKILL_DOWN:.04,RUBBERBAND_SKILL_UP:.03,LOOKAHEAD_MIN:8,LOOKAHEAD_PER_SPEED:.55,LINE_OFFSET:3.2,WIN_GAP_M:60},fi=[{id:"ryo",name:"RYO",carId:"fd7",skill:.97,aggression:.95,blunder:.14,gutterLove:.25,tone:"#ffd400",lines:{intro:["FD-7 ini bukan mainan, bro. Sori kalau kamu ketinggalan.","Downhill ini milikku. Kamu cuma numpang lewat."],overtaken:["Hah? Kamu lewat? Nggak mungkin!","Yosha... tapi ini belum selesai."],overtaking:["Mada mada! Masih jauh, kawan.","See ya di bawah, sori ya."],winning:["Kamu masih di belakang? Kasihan.","Tekanan ban aja belum panas, bro."],losing:["Sial... FD-7 ini kok ngadat?!","Jangan senang dulu, masih jauh."],finishWin:["Gampang. Balik lagi kalau sudah bisa drift beneran.","Sori, kamu telat dua tikungan."],finishLose:["...Apa? Aku kalah sama AE86? Tidak mungkin!","Yosha... kamu hebat. Lain kali aku balas."]}},{id:"kenji",name:"KENJI",carId:"s13",skill:.9,aggression:.8,blunder:.07,gutterLove:.9,tone:"#2f6bff",lines:{intro:["Line-nya sudah aku hafal. Kamu nggak bisa lewat.","S13-ku paling jago di gutter. Lihat sendiri nanti."],overtaken:["Heh, line itu punyaku.","Nggak boleh lewat situ, bre!"],overtaking:["Blok kanan-kiri, silakan coba.","Defensif itu seni, kawan."],winning:["Aman. Santai dulu.","Kamu terlalu jauh, bro."],losing:["Kok bisa... line-ku kunci!","Jangan di dalam gutter terus, dang!"],finishWin:["Told you. Line itu milikku.","Latihan gutter dulu, baru tantang aku."],finishLose:["Ah... kalah. Tapi teknik gutter-ku tetap terbaik.","Kamu licik. Aku suka itu."]}},{id:"ayu",name:"AYU",carId:"ek9",skill:.94,aggression:.55,blunder:.03,gutterLove:.5,tone:"#21e6c1",lines:{intro:["Aku nggak suka ngebut... tapi di sini aku paling cepat.","EK-9 ini halus. Kamu bakal kaget di bagian cepat."],overtaken:["Eh? Cepat juga kamu.","Aku harus lebih halus lagi."],overtaking:["Sori, aku lewat ya.","VTEC sudah buka. Dadah!"],winning:["Masih nyaman di sini.","Smooth is fast, kawan."],losing:["Hmm... aku harus naikkan ritme.","Jangan salahkan aku kalau aku balap sekarang."],finishWin:["Smooth selalu menang.","Terima kasih sudah balapan. Kamu kuat di hairpin."],finishLose:["Kamu lebih halus dari dugaanku. Respect.","Aku kalah. Tapi besok aku balas, ya."]}}],ke={CAM_SPRING_K:14,CAM_DAMPING:.86,CHASE_OFFSET:{x:0,y:1.35,z:4.6},HOOD_OFFSET:{x:0,y:1.16,z:.35},BUMPER_OFFSET:{x:0,y:.62,z:-2.1},FOV_MIN:62,FOV_MAX:76,FOV_LERP:.08,DRIFT_ROLL_PER_SLIP:.06,DRIFT_ROLL_MAX:5*Math.PI/180,SHAKE_PER_IMPACT:.06},ie={SKY_TOP:725030,SKY_MID:1780298,SKY_BOTTOM:2899555,FOG_COLOR:1450031,FOG_DENSITY:.0035,AMBIENT_INTENSITY:.25,AMBIENT_COLOR:7573961,MOON_INTENSITY:.55,MOON_COLOR:13229311,CELL_THRESHOLD_A:.33,CELL_THRESHOLD_B:.66,CELL_SOFT:.02,RIM_COLOR:5999871,RIM_STRENGTH:.55,OUTLINE_PX:1.6,BLOOM_STRENGTH:.6,BLOOM_THRESHOLD:.85,CA_MAX:.0018,CA_REF_KMH:200,VIGNETTE:.35,SMOKE_POOL:80,SKID_FADE_TIME:12},Vh={COUNTDOWN_SEC:3,GHOST_SAMPLE_HZ:10},Ze={MASTER_GAIN:.85,COMP_THRESHOLD_DB:-14,COMP_RATIO:6,COMP_ATTACK:.003,COMP_RELEASE:.25,MUSIC_BUS:.62,SFX_BUS:.9,DUCK_DB:-3.5,BPM_MIN:150,BPM_MAX:160,BPM_BASE:156};class Q0{ctx=null;master;compressor;musicBus;sfxBus;reverb;reverbSend;noiseBuffer;duckCount=0;duckUntil=0;started=!1;get ready(){return this.ctx!==null&&this.ctx.state==="running"}get currentTime(){return this.ctx?.currentTime??0}get sampleRate(){return this.ctx?.sampleRate??48e3}async unlock(){if(this.started){await this.resume();return}const t=window.AudioContext??window.webkitAudioContext;if(!t)throw new Error("Web Audio API tidak tersedia di browser ini.");const e=new t({latencyHint:"interactive"});this.ctx=e,this.compressor=e.createDynamicsCompressor(),this.compressor.threshold.value=Ze.COMP_THRESHOLD_DB,this.compressor.ratio.value=Ze.COMP_RATIO,this.compressor.attack.value=Ze.COMP_ATTACK,this.compressor.release.value=Ze.COMP_RELEASE,this.compressor.knee.value=6,this.master=e.createGain(),this.master.gain.value=Ze.MASTER_GAIN,this.musicBus=e.createGain(),this.musicBus.gain.value=Ze.MUSIC_BUS,this.sfxBus=e.createGain(),this.sfxBus.gain.value=Ze.SFX_BUS,this.musicBus.connect(this.master),this.sfxBus.connect(this.master),this.master.connect(this.compressor),this.compressor.connect(e.destination),this.reverb=e.createConvolver(),this.reverb.buffer=this.makeImpulse(2.1,2.4),this.reverbSend=e.createGain(),this.reverbSend.gain.value=.28,this.reverbSend.connect(this.reverb),this.reverb.connect(this.master),this.noiseBuffer=this.makeNoise(2),await this.resume(),this.started=!0}async resume(){if(this.ctx&&this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}setMasterVolume(t){this.master&&this.master.gain.setTargetAtTime(Nr(t)*Ze.MASTER_GAIN,this.ctx?.currentTime??0,.02)}setMusicVolume(t){this.musicBus&&this.musicBus.gain.setTargetAtTime(Nr(t),this.ctx?.currentTime??0,.02)}setSfxVolume(t){this.sfxBus&&this.sfxBus.gain.setTargetAtTime(Nr(t),this.ctx?.currentTime??0,.02)}duck(t=250){if(!this.ctx||!this.musicBus)return;const e=this.ctx.currentTime,n=Math.pow(10,Ze.DUCK_DB/20),i=Nr(.62);this.musicBus.gain.cancelScheduledValues(e),this.musicBus.gain.setValueAtTime(this.musicBus.gain.value,e),this.musicBus.gain.linearRampToValueAtTime(i*n,e+.03),this.musicBus.gain.linearRampToValueAtTime(i,e+t/1e3),this.duckUntil=e+t/1e3,this.duckCount+=1}makeImpulse(t,e){const n=this.ctx,i=n.sampleRate,r=Math.max(1,Math.floor(t*i)),a=n.createBuffer(2,r,i);for(let o=0;o<2;o++){const l=a.getChannelData(o);for(let h=0;h<r;h++){const u=h/r,d=Math.pow(1-u,e+(o===0?0:.25));l[h]=(Math.random()*2-1)*d}const c=[.017,.031,.047,.071,.103];for(const h of c){const u=Math.floor(h*i);u<r&&(l[u]+=(o===0?.6:-.45)*Math.pow(1-h/t,2))}}return a}makeNoise(t){const e=this.ctx,n=e.sampleRate,i=Math.max(1,Math.floor(t*n)),r=e.createBuffer(1,i,n),a=r.getChannelData(0);let o=0;for(let l=0;l<i;l++){const c=Math.random()*2-1;o=o*.35+c*.65,a[l]=o}return r}createNoiseSource(){if(!this.ctx)return null;const t=this.ctx.createBufferSource();return t.buffer=this.noiseBuffer,t.loop=!0,t}}function Nr(s){const t=Number(s);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}const Ja={min:[0,3,7,10],maj:[0,4,7,11]},Wh=57,er=s=>({root:Wh+s,quality:"min"}),wn=s=>({root:Wh+s,quality:"maj"}),qr=[er(0),wn(-4),wn(3),wn(-2)],ja=[wn(-4),wn(-2),er(0),wn(3)],Qa=[er(0),wn(-4),er(-3),wn(1)],to=[er(5),wn(-2),wn(3),wn(-4)],Gc=[[0,2,0,2],[2,1,0,2],[4,0,0,2],[6,2,0,2],[8,3,0,2],[10,2,0,2],[12,1,0,4],[16,2,0,2],[18,2,0,2],[20,0,0,2],[22,1,0,2],[24,2,0,2],[26,3,0,2],[28,2,0,4],[32,1,0,2],[34,2,0,2],[36,3,0,2],[38,2,0,2],[40,0,0,2],[42,1,0,2],[44,2,0,4],[48,2,1,2],[50,3,1,2],[52,2,1,2],[54,1,0,2],[56,0,0,2],[58,1,0,2],[60,2,0,4],[64,2,0,2],[66,1,0,2],[68,0,0,2],[70,2,0,2],[72,3,0,2],[74,2,0,2],[76,1,0,4],[80,3,0,2],[82,2,0,2],[84,3,0,2],[86,2,0,2],[88,1,0,2],[90,2,0,2],[92,3,0,4],[96,0,0,2],[98,1,0,2],[100,2,0,2],[102,3,0,2],[104,2,0,2],[106,1,0,2],[108,0,0,4],[112,1,0,2],[114,2,1,2],[116,3,1,2],[118,2,1,2],[120,1,0,2],[122,0,0,2],[124,2,0,4]],zc=[[0,0,0,2],[2,2,0,2],[4,3,0,2],[6,2,0,2],[8,1,0,2],[10,2,0,6],[16,2,0,2],[18,3,0,2],[20,2,0,2],[22,0,0,2],[24,1,0,2],[26,2,0,6],[32,3,0,2],[34,2,0,2],[36,1,0,2],[38,2,0,2],[40,0,0,2],[42,2,0,2],[44,3,0,4],[48,2,1,2],[50,3,1,2],[52,2,1,2],[54,1,0,2],[56,2,0,8],[64,0,0,2],[66,1,0,2],[68,3,0,2],[70,2,0,2],[72,1,0,2],[74,0,0,6],[80,2,0,2],[82,3,0,2],[84,2,0,2],[86,1,0,2],[88,0,0,2],[90,1,0,2],[92,2,0,4],[96,1,0,2],[98,2,0,2],[100,3,0,2],[102,2,0,2],[104,1,0,2],[106,0,0,6],[112,3,1,2],[114,2,1,2],[116,1,0,2],[118,2,0,2],[120,3,0,2],[122,2,0,2],[124,1,0,4]],Hc=[[0,1,0,2],[2,2,0,2],[4,3,0,2],[6,2,0,2],[8,1,0,4],[12,0,0,2],[14,1,0,2],[16,2,0,2],[18,3,0,2],[20,2,0,2],[22,1,0,2],[24,2,0,4],[28,3,0,2],[30,2,0,2],[32,3,0,2],[34,2,0,2],[36,1,0,2],[38,0,0,2],[40,1,0,4],[44,2,0,2],[46,3,0,2],[48,2,1,2],[50,1,1,2],[52,2,1,2],[54,1,1,2],[56,2,0,6],[64,0,0,2],[66,2,0,2],[68,1,0,2],[70,3,0,2],[72,2,0,4],[76,1,0,2],[78,0,0,2],[80,3,0,2],[82,2,0,2],[84,3,0,2],[86,1,0,2],[88,2,0,6],[96,1,0,2],[98,0,0,2],[100,1,0,2],[102,2,0,2],[104,3,0,4],[108,2,0,2],[110,1,0,2],[112,2,1,2],[114,3,1,2],[116,2,1,2],[118,1,1,2],[120,0,0,6]],gn=[{title:"NIGHT OF FIRE ROAD",progA:qr,progB:Qa,melody:Gc,arpSeed:3},{title:"GAS GAS GAS PASS",progA:ja,progB:to,melody:zc,arpSeed:7},{title:"DEJA VU SKYLINE",progA:Qa,progB:ja,melody:Hc,arpSeed:11},{title:"RUNNING IN THE 90s PASS",progA:qr,progB:to,melody:zc,arpSeed:13},{title:"SPEEDY SPEED BOY",progA:to,progB:qr,melody:Hc,arpSeed:17},{title:"BACK ON THE ROAD",progA:ja,progB:Qa,melody:Gc,arpSeed:19}];function Or(s){return 440*Math.pow(2,(s-69)/12)}function on(s,t,e){const n=Math.max(.005,e.attack),i=Math.max(.005,e.decay),r=Math.max(.005,e.release),a=Math.max(.02,e.holdFor),o=Math.max(1e-4,e.peak),l=Math.max(1e-4,o*e.sustain);s.cancelScheduledValues(t),s.setValueAtTime(1e-4,t),s.linearRampToValueAtTime(o,t+n),s.linearRampToValueAtTime(l,t+n+i),s.setValueAtTime(l,t+Math.max(n+i,a)),s.linearRampToValueAtTime(1e-4,t+Math.max(n+i,a)+r)}class tv{engine;ctx=null;built=!1;pump;dryBus;leadBus;chorusBus;kickOsc;kickGain;kickClickGain;kickClickFilter;snareGain;snareFilter;snareBody;snareBodyGain;clapGain;clapFilter;hatGain;hatFilter;openHatGain;openHatFilter;hat32Gain;hat32Filter;bassOscA;bassOscB;bassGain;bassFilter;leadOsc=[];leadGain;leadFilter;leadOctaveGain;leadOctaveOsc=[];stabOsc=[];stabGain;stabFilter;arpOsc;arpGain;arpPan;riserGain;riserFilter;impactOsc;impactGain;noiseRef;delayNode;delayFeedback;delayWet;nextStepTime=0;currentStep=0;timer=0;playing=!1;startTime=0;bpm=Ze.BPM_BASE;targetBpm=Ze.BPM_BASE;trackIndex=0;prevTrackIndex=0;crossfadeEnd=0;driftIntensity=0;section="intro";barsPlayed=0;masterPeak=0;constructor(t){this.engine=t}get isPlaying(){return this.playing}get bpmLive(){return Math.round(this.bpm)}get trackTitle(){return gn[this.trackIndex]?.title??"—"}get peakEstimate(){return this.masterPeak}build(){if(this.built)return;const t=this.engine.ctx;if(!t)throw new Error("AudioEngine belum di-unlock.");this.ctx=t,this.pump=t.createGain(),this.pump.gain.value=1,this.dryBus=t.createGain(),this.dryBus.gain.value=.9,this.leadBus=t.createGain(),this.leadBus.gain.value=1,this.chorusBus=t.createGain(),this.chorusBus.gain.value=.55,this.pump.connect(this.dryBus),this.dryBus.connect(this.engine.musicBus),this.leadBus.connect(this.pump),this.chorusBus.connect(this.pump);const e=t.createGain();e.gain.value=.18,this.leadBus.connect(e),e.connect(this.engine.reverbSend);const n=this.engine.createNoiseSource();if(!n)throw new Error("Noise buffer gagal dibuat.");this.noiseRef=n,n.start(0),this.delayNode=t.createDelay(1),this.delayNode.delayTime.value=60/this.bpm*.75,this.delayFeedback=t.createGain(),this.delayFeedback.gain.value=.32,this.delayWet=t.createGain(),this.delayWet.gain.value=.28;const i=t.createStereoPanner();i.pan.value=-.5;const r=t.createStereoPanner();r.pan.value=.5,this.leadGain=t.createGain(),this.leadGain.gain.value=1e-4,this.leadBus.connect(this.leadGain),this.delayNode.connect(this.delayFeedback),this.delayFeedback.connect(this.delayNode),this.delayNode.connect(this.delayWet),this.delayWet.connect(i),this.delayWet.connect(r),i.connect(this.pump),r.connect(this.pump),this.kickOsc=t.createOscillator(),this.kickOsc.type="sine",this.kickOsc.frequency.value=55,this.kickGain=t.createGain(),this.kickGain.gain.value=1e-4,this.kickOsc.connect(this.kickGain),this.kickGain.connect(this.pump),this.kickOsc.start();const a=t.createBufferSource();a.buffer=this.engine.noiseBuffer,a.loop=!0,a.start(0),this.kickClickFilter=t.createBiquadFilter(),this.kickClickFilter.type="highpass",this.kickClickFilter.frequency.value=2600,this.kickClickGain=t.createGain(),this.kickClickGain.gain.value=1e-4,a.connect(this.kickClickFilter),this.kickClickFilter.connect(this.kickClickGain),this.kickClickGain.connect(this.pump),this.snareFilter=t.createBiquadFilter(),this.snareFilter.type="bandpass",this.snareFilter.frequency.value=1800,this.snareFilter.Q.value=.9,this.snareGain=t.createGain(),this.snareGain.gain.value=1e-4,n.connect(this.snareFilter),this.snareFilter.connect(this.snareGain),this.snareGain.connect(this.pump),this.snareBody=t.createOscillator(),this.snareBody.type="sine",this.snareBody.frequency.value=190,this.snareBodyGain=t.createGain(),this.snareBodyGain.gain.value=1e-4,this.snareBody.connect(this.snareBodyGain),this.snareBodyGain.connect(this.pump),this.snareBody.start(),this.clapFilter=t.createBiquadFilter(),this.clapFilter.type="bandpass",this.clapFilter.frequency.value=1300,this.clapFilter.Q.value=1.2,this.clapGain=t.createGain(),this.clapGain.gain.value=1e-4,n.connect(this.clapFilter),this.clapFilter.connect(this.clapGain),this.clapGain.connect(this.chorusBus),this.hatFilter=t.createBiquadFilter(),this.hatFilter.type="highpass",this.hatFilter.frequency.value=7e3,this.hatGain=t.createGain(),this.hatGain.gain.value=1e-4,n.connect(this.hatFilter),this.hatFilter.connect(this.hatGain),this.hatGain.connect(this.chorusBus),this.openHatFilter=t.createBiquadFilter(),this.openHatFilter.type="highpass",this.openHatFilter.frequency.value=6200,this.openHatGain=t.createGain(),this.openHatGain.gain.value=1e-4,n.connect(this.openHatFilter),this.openHatFilter.connect(this.openHatGain),this.openHatGain.connect(this.chorusBus),this.hat32Filter=t.createBiquadFilter(),this.hat32Filter.type="highpass",this.hat32Filter.frequency.value=9e3,this.hat32Gain=t.createGain(),this.hat32Gain.gain.value=1e-4,n.connect(this.hat32Filter),this.hat32Filter.connect(this.hat32Gain),this.hat32Gain.connect(this.chorusBus),this.bassOscA=t.createOscillator(),this.bassOscA.type="sawtooth",this.bassOscB=t.createOscillator(),this.bassOscB.type="square",this.bassOscA.detune.value=-8,this.bassOscB.detune.value=8,this.bassFilter=t.createBiquadFilter(),this.bassFilter.type="lowpass",this.bassFilter.frequency.value=600,this.bassFilter.Q.value=1.2,this.bassGain=t.createGain(),this.bassGain.gain.value=1e-4,this.bassOscA.connect(this.bassFilter),this.bassOscB.connect(this.bassFilter),this.bassFilter.connect(this.bassGain),this.bassGain.connect(this.pump),this.bassOscA.start(),this.bassOscB.start();const o=[-22,-14,-7,0,7,14,22];this.leadFilter=t.createBiquadFilter(),this.leadFilter.type="lowpass",this.leadFilter.frequency.value=3200,this.leadFilter.Q.value=4,this.leadFilter.connect(this.leadGain),this.leadGain.connect(this.leadBus),this.leadGain.connect(this.delayNode);for(const c of o){const h=t.createOscillator();h.type="sawtooth",h.detune.value=c,h.frequency.value=440;const u=t.createGain();u.gain.value=.085,h.connect(u),u.connect(this.leadFilter),h.start(),this.leadOsc.push(h)}this.leadOctaveGain=t.createGain(),this.leadOctaveGain.gain.value=1e-4,this.leadOctaveGain.connect(this.pump);for(const c of[-12,0,12]){const h=t.createOscillator();h.type="sawtooth",h.detune.value=c,h.frequency.value=880;const u=t.createGain();u.gain.value=.05,h.connect(u),u.connect(this.leadOctaveGain),h.start(),this.leadOctaveOsc.push(h)}this.stabFilter=t.createBiquadFilter(),this.stabFilter.type="lowpass",this.stabFilter.frequency.value=2600,this.stabFilter.Q.value=1.5,this.stabGain=t.createGain(),this.stabGain.gain.value=1e-4,this.stabFilter.connect(this.stabGain),this.stabGain.connect(this.chorusBus);for(let c=0;c<6;c++){const h=t.createOscillator();h.type="sawtooth",h.detune.value=c%2===0?-9:9,h.frequency.value=330;const u=t.createGain();u.gain.value=.06,h.connect(u),u.connect(this.stabFilter),h.start(),this.stabOsc.push(h)}this.arpOsc=t.createOscillator(),this.arpOsc.type="triangle",this.arpGain=t.createGain(),this.arpGain.gain.value=1e-4,this.arpPan=t.createStereoPanner(),this.arpOsc.connect(this.arpGain),this.arpGain.connect(this.arpPan),this.arpPan.connect(this.chorusBus),this.arpOsc.start();const l=t.createBufferSource();l.buffer=this.engine.noiseBuffer,l.loop=!0,l.start(0),this.riserFilter=t.createBiquadFilter(),this.riserFilter.type="bandpass",this.riserFilter.frequency.value=700,this.riserFilter.Q.value=3,this.riserGain=t.createGain(),this.riserGain.gain.value=1e-4,l.connect(this.riserFilter),this.riserFilter.connect(this.riserGain),this.riserGain.connect(this.chorusBus),this.impactOsc=t.createOscillator(),this.impactOsc.type="sine",this.impactOsc.frequency.value=70,this.impactGain=t.createGain(),this.impactGain.gain.value=1e-4,this.impactOsc.connect(this.impactGain),this.impactGain.connect(this.pump),this.impactOsc.start(),this.built=!0}start(t){this.built||this.build();const e=this.ctx;this.playing=!0,this.currentStep=0,this.barsPlayed=0,this.section="intro",this.startTime=t??e.currentTime+.06,this.nextStepTime=this.startTime,this.leadBus.gain.cancelScheduledValues(e.currentTime),this.leadBus.gain.setValueAtTime(1,e.currentTime),this.clearTimer(),this.timer=window.setInterval(()=>this.scheduler(),25),this.scheduler()}stop(){if(this.playing=!1,this.clearTimer(),!this.built)return;const e=this.ctx.currentTime;for(const n of[this.kickGain.gain,this.kickClickGain.gain,this.snareGain.gain,this.snareBodyGain.gain,this.clapGain.gain,this.hatGain.gain,this.openHatGain.gain,this.hat32Gain.gain,this.bassGain.gain,this.leadGain.gain,this.stabGain.gain,this.arpGain.gain,this.riserGain.gain,this.impactGain.gain,this.leadOctaveGain.gain])n.cancelScheduledValues(e),n.setTargetAtTime(1e-4,e,.03)}clearTimer(){this.timer&&(clearInterval(this.timer),this.timer=0)}setBpm(t){const e=Math.max(Ze.BPM_MIN,Math.min(Ze.BPM_MAX,t));Math.abs(e-this.targetBpm)<.01||(this.targetBpm=e,this.built&&this.ctx&&this.delayNode.delayTime.setTargetAtTime(60/e*.75,this.ctx.currentTime,.4))}setDriftIntensity(t){this.driftIntensity=Math.max(0,Math.min(1,t))}get fadingFromIndex(){return!this.built||!this.ctx?null:this.ctx.currentTime<this.crossfadeEnd?this.prevTrackIndex:null}clearCrossfade(){this.crossfadeEnd=0,this.prevTrackIndex=this.trackIndex}crossfadeTo(t){!this.built||t===this.trackIndex||(this.prevTrackIndex=this.trackIndex,this.trackIndex=(t%gn.length+gn.length)%gn.length,this.crossfadeEnd=this.ctx.currentTime+60/this.bpm*8)}nextTrack(){this.crossfadeTo(this.trackIndex+1)}stinger(){if(!this.built||!this.ctx)return;const e=this.ctx.currentTime;this.riserGain.gain.cancelScheduledValues(e),this.riserGain.gain.setValueAtTime(1e-4,e),this.riserGain.gain.linearRampToValueAtTime(.09,e+.9),this.riserGain.gain.linearRampToValueAtTime(1e-4,e+1.05),this.riserFilter.frequency.cancelScheduledValues(e),this.riserFilter.frequency.setValueAtTime(600,e),this.riserFilter.frequency.exponentialRampToValueAtTime(5200,e+.95)}impact(){if(!this.built||!this.ctx)return;const e=this.ctx.currentTime;this.impactGain.gain.cancelScheduledValues(e),this.impactGain.gain.setValueAtTime(1e-4,e),this.impactGain.gain.linearRampToValueAtTime(.22,e+.012),this.impactGain.gain.exponentialRampToValueAtTime(1e-4,e+.5),this.impactOsc.frequency.cancelScheduledValues(e),this.impactOsc.frequency.setValueAtTime(110,e),this.impactOsc.frequency.exponentialRampToValueAtTime(42,e+.42)}get stepDur(){return 60/this.bpm/4}scheduler(){if(!this.playing||!this.ctx)return;const t=this.ctx.currentTime+.2;this.bpm+=(this.targetBpm-this.bpm)*.02;let e=0;for(;this.nextStepTime<t&&e++<64;)this.scheduleStep(this.currentStep,this.nextStepTime),this.nextStepTime+=this.stepDur,this.currentStep++,this.currentStep%16===0&&(this.barsPlayed++,this.updateSection()),this.currentStep>=2048&&(this.currentStep=0);this.ctx.currentTime>this.startTime+1&&this.updatePump()}updateSection(){const t=this.barsPlayed%32,e=this.section;t<8?this.section="intro":t<16?this.section="verse":this.section="chorus",e!==this.section&&this.ctx&&this.leadBus.gain.setTargetAtTime(this.section==="intro"?.25:1,this.ctx.currentTime,.25)}updatePump(){if(!this.ctx)return;const t=this.ctx.currentTime,e=60/this.bpm,n=(t-this.startTime)%e/e,i=.22+.2*this.driftIntensity,r=n<.35?1-i*(1-n/.35):1-.02;this.pump.gain.setTargetAtTime(r,t,.008)}chordAt(t){const e=gn[this.trackIndex]??gn[0],n=Math.floor(t/16)%16;return(n<8?e.progA:e.progB)[Math.floor(n%4)]??qr[0]}scheduleStep(t,e){const n=t%16,i=Math.floor(t/16),r=this.chordAt(t),a=gn[this.trackIndex]??gn[0],o=t%512<128?"intro":t%512<256?"verse":"chorus",l=o==="chorus",c=this.driftIntensity,h=this.stepDur;if(n%4===0&&(this.kickOsc.frequency.cancelScheduledValues(e),this.kickOsc.frequency.setValueAtTime(120,e),this.kickOsc.frequency.exponentialRampToValueAtTime(45,e+.06),on(this.kickGain.gain,e,{peak:.62,attack:.005,decay:.09,sustain:.35,release:.06,holdFor:.1}),on(this.kickClickGain.gain,e,{peak:.12,attack:.005,decay:.006,sustain:.01,release:.02,holdFor:.006})),(n===4||n===12)&&(on(this.snareGain.gain,e,{peak:.24,attack:.005,decay:.07,sustain:.2,release:.08,holdFor:.05}),on(this.snareBodyGain.gain,e,{peak:.14,attack:.005,decay:.05,sustain:.2,release:.07,holdFor:.04}),l&&on(this.clapGain.gain,e,{peak:.13,attack:.005,decay:.04,sustain:.25,release:.12,holdFor:.03})),o!=="intro"){const f=n%4===2?1:.55;on(this.hatGain.gain,e,{peak:.055*f,attack:.005,decay:.018,sustain:.02,release:.03,holdFor:.012}),n%8===6&&on(this.openHatGain.gain,e,{peak:.05,attack:.005,decay:.05,sustain:.2,release:.14,holdFor:.05}),c>.5&&on(this.hat32Gain.gain,e+h/2,{peak:.028,attack:.005,decay:.012,sustain:.02,release:.02,holdFor:.008})}const u=new Set([0,3,6,8,11,14]);if((o!=="intro"||n%4===0)&&(u.has(n)||o==="intro")){const f=r.root-24,m=Or(f);this.bassOscA.frequency.setValueAtTime(m,e),this.bassOscB.frequency.setValueAtTime(m,e),this.bassFilter.frequency.cancelScheduledValues(e),this.bassFilter.frequency.setValueAtTime(950,e),this.bassFilter.frequency.exponentialRampToValueAtTime(320,e+.14),on(this.bassGain.gain,e,{peak:.3,attack:.007,decay:.06,sustain:.6,release:.05,holdFor:.075})}if(o!=="intro"&&(n===2||n===6||n===10||n===14)){const f=Ja[r.quality];for(let m=0;m<3;m++){const v=r.root+(f[m]??0)+12,g=Or(v);for(let p=0;p<2;p++){const b=this.stabOsc[m*2+p];b&&b.frequency.setValueAtTime(g,e)}}on(this.stabGain.gain,e,{peak:.11,attack:.005,decay:.09,sustain:.05,release:.07,holdFor:.05})}if(l){const f=Ja[r.quality],m=(t+a.arpSeed)%4,v=r.root+(f[m]??0)+24;this.arpOsc.frequency.setValueAtTime(Or(v),e),this.arpPan.pan.setValueAtTime(n%2===0?-.4:.4,e),on(this.arpGain.gain,e,{peak:.035,attack:.005,decay:.05,sustain:.02,release:.04,holdFor:.04})}this.scheduleLead(t,e);const d=Math.floor(t%512/16);n===0&&d===15&&this.riserAt(e,h*16),n===0&&(d===8||d===16||d===0)&&i>0&&this.impactAt(e)}scheduleLead(t,e){const n=gn[this.trackIndex]??gn[0],i=Math.floor(t/16)%8,r=t%128,a=n.melody;for(const o of a){if(o[0]!==r)continue;const l=this.chordAt(t),h=Ja[l.quality][o[1]]??0,u=l.root+h+12+o[2]*12,d=Or(u);for(const v of this.leadOsc)v.frequency.setValueAtTime(d,e);for(const v of this.leadOctaveOsc)v.frequency.setValueAtTime(d*2,e);const f=Math.max(.06,o[3]*this.stepDur);on(this.leadGain.gain,e,{peak:.2,attack:.008,decay:.12,sustain:.55,release:.18,holdFor:f}),this.driftIntensity>.45&&on(this.leadOctaveGain.gain,e,{peak:.05*this.driftIntensity,attack:.01,decay:.14,sustain:.5,release:.16,holdFor:f});const m=2200+i%4*420+this.driftIntensity*1400;this.leadFilter.frequency.cancelScheduledValues(e),this.leadFilter.frequency.setTargetAtTime(m,e,.05)}}riserAt(t,e){this.riserGain.gain.cancelScheduledValues(t),this.riserGain.gain.setValueAtTime(1e-4,t),this.riserGain.gain.linearRampToValueAtTime(.075,t+e*.85),this.riserGain.gain.linearRampToValueAtTime(1e-4,t+e),this.riserFilter.frequency.cancelScheduledValues(t),this.riserFilter.frequency.setValueAtTime(500,t),this.riserFilter.frequency.exponentialRampToValueAtTime(6e3,t+e)}impactAt(t){this.impactGain.gain.cancelScheduledValues(t),this.impactGain.gain.setValueAtTime(1e-4,t),this.impactGain.gain.linearRampToValueAtTime(.18,t+.01),this.impactGain.gain.exponentialRampToValueAtTime(1e-4,t+.42),this.impactOsc.frequency.cancelScheduledValues(t),this.impactOsc.frequency.setValueAtTime(100,t),this.impactOsc.frequency.exponentialRampToValueAtTime(40,t+.36)}suspend(){this.clearTimer()}resume(){!this.playing||!this.ctx||(this.clearTimer(),this.nextStepTime=Math.max(this.nextStepTime,this.ctx.currentTime+.05),this.timer=window.setInterval(()=>this.scheduler(),25))}dispose(){if(this.stop(),this.clearTimer(),!!this.ctx){try{for(const e of[...this.leadOsc,...this.leadOctaveOsc,...this.stabOsc])e.stop();this.kickOsc.stop(),this.snareBody.stop(),this.arpOsc.stop(),this.impactOsc.stop(),this.noiseRef.stop()}catch{}this.leadOsc=[],this.leadOctaveOsc=[],this.stabOsc=[],this.built=!1,this.playing=!1}}}const Fs=.035;class ev{engine;ctx=null;built=!1;engOscs=[];engGains=[];engFilter;engGain;engBreathSrc;engBreathFilter;engBreathGain;engWobble;engWobbleGain;limiterGate;tireSrc;tireBp;tireGain;tireRes1;tireRes1Gain;tireRes2;tireRes2Gain;tireGrowl;tireGrowlGain;windSrc;windFilter;windGain;ambSrc;ambFilter;ambGain;cricketTimer=0;bovSrc;bovFilter;bovGain;gutterClickSrc;gutterFilter;gutterGain;gutterNextTick=0;lastRpm=0;lastThrottle=0;limiterPhase=0;boostLfo=null;constructor(t){this.engine=t}get isBuilt(){return this.built}build(){if(this.built)return;const t=this.engine.ctx;if(!t)throw new Error("AudioEngine belum di-unlock.");this.ctx=t;const e=this.engine.createNoiseSource();if(!e)throw new Error("Noise buffer gagal dibuat.");const n=this.engine.createNoiseSource(),i=this.engine.createNoiseSource(),r=this.engine.createNoiseSource(),a=this.engine.createNoiseSource(),o=this.engine.createNoiseSource();e.start(0),n.start(0),i.start(0),r.start(0),a.start(0),o.start(0),this.engFilter=t.createBiquadFilter(),this.engFilter.type="lowpass",this.engFilter.frequency.value=900,this.engFilter.Q.value=1.6,this.engGain=t.createGain(),this.engGain.gain.value=1e-4,this.limiterGate=t.createGain(),this.limiterGate.gain.value=1,this.engFilter.connect(this.engGain),this.engGain.connect(this.limiterGate),this.limiterGate.connect(this.engine.sfxBus);const l=[.3,.14,.07];for(let h=0;h<3;h++){const u=t.createOscillator();u.type=h===0?"sawtooth":"square",u.frequency.value=60;const d=t.createGain();d.gain.value=l[h]??.1,u.connect(d),d.connect(this.engFilter),u.start(),this.engOscs.push(u),this.engGains.push(d)}this.engWobble=t.createOscillator(),this.engWobble.type="sine",this.engWobble.frequency.value=6,this.engWobbleGain=t.createGain(),this.engWobbleGain.gain.value=.6,this.engWobble.connect(this.engWobbleGain);for(const h of this.engOscs)this.engWobbleGain.connect(h.detune);this.engWobble.start(),this.engBreathSrc=e,this.engBreathFilter=t.createBiquadFilter(),this.engBreathFilter.type="bandpass",this.engBreathFilter.frequency.value=420,this.engBreathFilter.Q.value=.8,this.engBreathGain=t.createGain(),this.engBreathGain.gain.value=1e-4,this.engBreathSrc.connect(this.engBreathFilter),this.engBreathFilter.connect(this.engBreathGain),this.engBreathGain.connect(this.engine.sfxBus),this.tireSrc=n,this.tireBp=t.createBiquadFilter(),this.tireBp.type="bandpass",this.tireBp.frequency.value=1600,this.tireBp.Q.value=6,this.tireGain=t.createGain(),this.tireGain.gain.value=1e-4,this.tireSrc.connect(this.tireBp),this.tireBp.connect(this.tireGain),this.tireGain.connect(this.engine.sfxBus),this.tireRes1=t.createOscillator(),this.tireRes1.type="sine",this.tireRes1.frequency.value=2100,this.tireRes1Gain=t.createGain(),this.tireRes1Gain.gain.value=1e-4,this.tireRes1.connect(this.tireRes1Gain),this.tireRes1Gain.connect(this.engine.sfxBus),this.tireRes1.start(),this.tireRes2=t.createOscillator(),this.tireRes2.type="sine",this.tireRes2.frequency.value=3400,this.tireRes2Gain=t.createGain(),this.tireRes2Gain.gain.value=1e-4,this.tireRes2.connect(this.tireRes2Gain),this.tireRes2Gain.connect(this.engine.sfxBus),this.tireRes2.start(),this.tireGrowl=t.createOscillator(),this.tireGrowl.type="sawtooth",this.tireGrowl.frequency.value=320,this.tireGrowlGain=t.createGain(),this.tireGrowlGain.gain.value=1e-4;const c=t.createBiquadFilter();c.type="lowpass",c.frequency.value=700,this.tireGrowl.connect(c),c.connect(this.tireGrowlGain),this.tireGrowlGain.connect(this.engine.sfxBus),this.tireGrowl.start(),this.windSrc=i,this.windFilter=t.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=500,this.windGain=t.createGain(),this.windGain.gain.value=1e-4,this.windSrc.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.engine.sfxBus),this.ambSrc=r,this.ambFilter=t.createBiquadFilter(),this.ambFilter.type="bandpass",this.ambFilter.frequency.value=4e3,this.ambFilter.Q.value=3,this.ambGain=t.createGain(),this.ambGain.gain.value=1e-4,this.ambSrc.connect(this.ambFilter),this.ambFilter.connect(this.ambGain),this.ambGain.connect(this.engine.sfxBus),this.bovSrc=a,this.bovFilter=t.createBiquadFilter(),this.bovFilter.type="highpass",this.bovFilter.frequency.value=2500,this.bovGain=t.createGain(),this.bovGain.gain.value=1e-4,this.bovSrc.connect(this.bovFilter),this.bovFilter.connect(this.bovGain),this.bovGain.connect(this.engine.sfxBus),this.gutterClickSrc=o,this.gutterFilter=t.createBiquadFilter(),this.gutterFilter.type="bandpass",this.gutterFilter.frequency.value=1200,this.gutterFilter.Q.value=5,this.gutterGain=t.createGain(),this.gutterGain.gain.value=1e-4,this.gutterClickSrc.connect(this.gutterFilter),this.gutterFilter.connect(this.gutterGain),this.gutterGain.connect(this.engine.sfxBus),this.built=!0}update(t,e){if(!this.built||!this.ctx)return;const i=this.ctx.currentTime,r=Math.max(Ft.IDLE_RPM,Math.min(Ft.LIMITER_RPM,e.rpm)),a=r/60*2;for(let m=0;m<this.engOscs.length;m++){const v=m+1;this.engOscs[m].frequency.setTargetAtTime(a*v,i,Fs)}const o=900+r/Ft.REDLINE_RPM*5600+e.throttle*900;this.engFilter.frequency.setTargetAtTime(Math.min(6800,o),i,Fs);const l=e.active?.16+e.throttle*.16:1e-4;if(this.engGain.gain.setTargetAtTime(l,i,Fs),this.engBreathGain.gain.setTargetAtTime(e.active?.02+e.throttle*.07:1e-4,i,Fs),this.engBreathFilter.frequency.setTargetAtTime(300+r/Ft.REDLINE_RPM*800,i,Fs),e.limiter){this.limiterPhase+=t*30;const m=Math.sin(this.limiterPhase*Math.PI*2)>0?.12:1;this.limiterGate.gain.setTargetAtTime(m,i,.004)}else this.limiterGate.gain.setTargetAtTime(1,i,.01);const c=Math.min(1,Math.abs(e.slipRear)/.7),h=e.active&&c>.08&&e.speedKmh>12,u=h?.03+c*.16:1e-4;this.tireGain.gain.setTargetAtTime(u,i,.02),this.tireBp.frequency.setTargetAtTime(1200+c*900,i,.03),this.tireRes1Gain.gain.setTargetAtTime(h?c*.035:1e-4,i,.03),this.tireRes2Gain.gain.setTargetAtTime(h?c*.022:1e-4,i,.03),this.tireRes1.frequency.setTargetAtTime(1900+c*700,i,.04),this.tireRes2.frequency.setTargetAtTime(3100+c*900,i,.04),this.tireGrowlGain.gain.setTargetAtTime(h&&c>.55?.05*((c-.55)/.45):1e-4,i,.04);const d=Math.max(0,Math.min(1,(e.speedKmh-90)/110));this.windGain.gain.setTargetAtTime(e.active?d*.085:1e-4,i,.06),this.windFilter.frequency.setTargetAtTime(380+d*1500,i,.06);const f=e.active?e.inTunnel?.004:.014:1e-4;this.ambGain.gain.setTargetAtTime(f,i,.2),this.ambFilter.frequency.setTargetAtTime(e.inTunnel?900:3600,i,.3),!e.inTunnel&&e.active&&(this.cricketTimer-=t,this.cricketTimer<=0&&(this.cricketTimer=1.6+Math.random()*3.4,this.clickAt(i+.02,4200,.05,.03))),e.inGutter&&e.speedKmh>5?i>=this.gutterNextTick&&(this.gutterNextTick=i+1/Ft.GUTTER_TICK_HZ,this.gutterGain.gain.cancelScheduledValues(i),this.gutterGain.gain.setValueAtTime(.09,i),this.gutterGain.gain.exponentialRampToValueAtTime(1e-4,i+.055)):(this.gutterGain.gain.setTargetAtTime(1e-4,i,.02),this.gutterNextTick=0),e.turbo&&this.lastThrottle>.6&&e.throttle<.15&&this.bov(i),this.lastThrottle=e.throttle,this.lastRpm=r}bov(t){this.built&&(this.bovGain.gain.cancelScheduledValues(t),this.bovGain.gain.setValueAtTime(1e-4,t),this.bovGain.gain.linearRampToValueAtTime(.075,t+.005),this.bovGain.gain.exponentialRampToValueAtTime(1e-4,t+.14),this.bovFilter.frequency.cancelScheduledValues(t),this.bovFilter.frequency.setValueAtTime(3200,t),this.bovFilter.frequency.exponentialRampToValueAtTime(1500,t+.14))}clickAt(t,e,n,i){const r=this.ctx;if(!r)return;const a=r.createBufferSource();a.buffer=this.engine.noiseBuffer;const o=r.createBiquadFilter();o.type="bandpass",o.frequency.value=e,o.Q.value=8;const l=r.createGain();l.gain.value=0,l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(n,t+.004),l.gain.exponentialRampToValueAtTime(1e-4,t+i),a.connect(o),o.connect(l),l.connect(this.engine.sfxBus),a.start(t),a.stop(t+i+.02),a.onended=()=>{a.disconnect(),o.disconnect(),l.disconnect()}}shift(t){if(!this.built||!this.ctx)return;const e=this.ctx.currentTime,n=t?1400:900;this.clickAt(e,n,.1,.02),this.clickAt(e+.035,n*.75,.075,.03)}impact(t=1){if(!this.built||!this.ctx)return;const e=this.ctx,n=e.currentTime,i=Math.max(.15,Math.min(1.6,t)),r=e.createBufferSource();r.buffer=this.engine.noiseBuffer;const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=900,a.Q.value=.7;const o=e.createGain();o.gain.setValueAtTime(1e-4,n),o.gain.linearRampToValueAtTime(.22*i,n+.006),o.gain.exponentialRampToValueAtTime(1e-4,n+.25),r.connect(a),a.connect(o),o.connect(this.engine.sfxBus);const l=e.createGain();l.gain.value=.2,o.connect(l),l.connect(this.engine.reverbSend),r.start(n,Math.random()*1.4),r.stop(n+.3),r.onended=()=>{r.disconnect(),a.disconnect(),o.disconnect(),l.disconnect()},window.setTimeout(()=>{try{r.disconnect(),a.disconnect(),o.disconnect(),l.disconnect()}catch{}},900);const c=[480,1150,2300];for(const h of c){const u=e.createOscillator();u.type="sine",u.frequency.value=h*(.98+Math.random()*.04);const d=e.createGain();d.gain.setValueAtTime(1e-4,n),d.gain.linearRampToValueAtTime(.05*i/(h/480),n+.008),d.gain.exponentialRampToValueAtTime(1e-4,n+.4),u.connect(d),d.connect(this.engine.sfxBus),u.start(n),u.stop(n+.45),u.onended=()=>{u.disconnect(),d.disconnect()}}this.engine.duck(240)}hover(){this.blip(880,.03,.06)}confirm(){this.blip(1320,.06,.1)}back(){this.blip(560,.06,.07)}blip(t,e,n){if(!this.ctx)return;const i=this.ctx,r=i.currentTime,a=i.createOscillator();a.type="square",a.frequency.value=t;const o=i.createGain();o.gain.setValueAtTime(1e-4,r),o.gain.linearRampToValueAtTime(n,r+.006),o.gain.exponentialRampToValueAtTime(1e-4,r+e),a.connect(o),o.connect(this.engine.sfxBus),a.start(r),a.stop(r+e+.02),a.onended=()=>{a.disconnect(),o.disconnect()}}countdownVoice(t){if(!this.built||!this.ctx)return;const e=this.ctx,n=e.currentTime,i=t==="go"?210:t==="3"?150:t==="2"?160:172,r=t==="go"?.5:.3,a=t==="go"?[420,900,2400]:[700,1200,2600],o=e.createOscillator();o.type="sawtooth",o.frequency.setValueAtTime(i,n),o.frequency.linearRampToValueAtTime(i*(t==="go"?1.35:1.02),n+r);const l=e.createGain();l.gain.setValueAtTime(1e-4,n),l.gain.linearRampToValueAtTime(.12,n+.02),l.gain.exponentialRampToValueAtTime(1e-4,n+r),o.connect(l);for(const u of a){const d=e.createBiquadFilter();d.type="bandpass",d.frequency.value=u,d.Q.value=7;const f=e.createGain();f.gain.value=.5,l.connect(d),d.connect(f),f.connect(this.engine.sfxBus)}const c=e.createOscillator();c.type="sine",c.frequency.value=t==="go"?660:396;const h=e.createGain();h.gain.setValueAtTime(1e-4,n),h.gain.linearRampToValueAtTime(.09,n+.01),h.gain.exponentialRampToValueAtTime(1e-4,n+r+.25),c.connect(h),h.connect(this.engine.sfxBus),c.start(n),c.stop(n+r+.3),o.start(n),o.stop(n+r+.05),o.onended=()=>{o.disconnect(),l.disconnect(),c.disconnect(),h.disconnect()},t==="go"&&this.engine.duck(300)}finishFanfare(){if(!this.ctx)return;const t=this.ctx,e=t.currentTime;[0,.09,.18].forEach((n,i)=>{const r=t.createOscillator();r.type="triangle",r.frequency.value=660*Math.pow(2,i/3);const a=t.createGain(),o=e+n;a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.09,o+.01),a.gain.exponentialRampToValueAtTime(1e-4,o+.35),r.connect(a),a.connect(this.engine.sfxBus),r.start(o),r.stop(o+.4),r.onended=()=>{r.disconnect(),a.disconnect()}})}configure(t){}setBoostActive(t){if(this.ctx){if(t&&!this.boostLfo)this.boostLfo=this.ctx.createOscillator(),this.boostLfo.type="sine",this.boostLfo.frequency.value=.7,this.boostLfo.start();else if(!t&&this.boostLfo){try{this.boostLfo.stop()}catch{}this.boostLfo.disconnect(),this.boostLfo=null}}}silenceContinuous(){if(!this.built||!this.ctx)return;const t=this.ctx.currentTime;for(const e of[this.engGain.gain,this.engBreathGain.gain,this.tireGain.gain,this.tireRes1Gain.gain,this.tireRes2Gain.gain,this.tireGrowlGain.gain,this.windGain.gain,this.ambGain.gain,this.bovGain.gain,this.gutterGain.gain])e.cancelScheduledValues(t),e.setTargetAtTime(1e-4,t,.02)}dispose(){if(this.ctx){try{for(const t of[...this.engOscs,this.engWobble,this.tireRes1,this.tireRes2,this.tireGrowl])t.stop();for(const t of[this.engBreathSrc,this.tireSrc,this.windSrc,this.ambSrc,this.bovSrc,this.gutterClickSrc])t.stop();this.boostLfo?.stop()}catch{}this.boostLfo=null,this.built=!1}}}class nv{accumulator=0;lastTime=0;running=!1;rafId=0;fixedDt;maxSubSteps;maxFrameDt;cb;stats={avgFrameMs:16.6,fps:60,slowMs:0,totalFrames:0};paused=!1;constructor(t,e,n,i){this.cb=t,this.fixedDt=e,this.maxSubSteps=n,this.maxFrameDt=i}start(){if(this.running)return;this.running=!0,this.lastTime=performance.now(),this.accumulator=0;const t=e=>{this.running&&(this.rafId=requestAnimationFrame(t),this.frame(e))};this.rafId=requestAnimationFrame(t)}stop(){this.running=!1,this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=0}resetClock(){this.lastTime=performance.now(),this.accumulator=0}frame(t){let e=(t-this.lastTime)/1e3;this.lastTime=t,(!Number.isFinite(e)||e<0)&&(e=0),e>this.maxFrameDt&&(e=this.maxFrameDt);const n=e*1e3;if(this.stats.avgFrameMs+=(n-this.stats.avgFrameMs)*.05,this.stats.fps=this.stats.avgFrameMs>.001?1e3/this.stats.avgFrameMs:60,this.stats.totalFrames++,n>20?this.stats.slowMs+=n:this.stats.slowMs=Math.max(0,this.stats.slowMs-n*.5),!this.paused){this.accumulator+=e;let r=0;for(;this.accumulator>=this.fixedDt&&r<this.maxSubSteps;)this.cb.fixedStep(this.fixedDt),this.accumulator-=this.fixedDt,r++;r>=this.maxSubSteps&&(this.accumulator=0)}const i=this.accumulator/this.fixedDt;this.cb.render(i,e)}}const iv={KeyW:"throttle",ArrowUp:"throttle",KeyS:"brake",ArrowDown:"brake",Space:"handbrake",KeyA:"steerLeft",ArrowLeft:"steerLeft",KeyD:"steerRight",ArrowRight:"steerRight",ShiftLeft:"shiftUp",KeyE:"shiftUp",ShiftRight:"shiftDown",KeyQ:"shiftDown",Escape:"pause",KeyP:"pause",KeyC:"camera",Enter:"confirm",NumpadEnter:"confirm",KeyR:"back"},sv=new Set(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"]);class rv{down=new Set;pressedThisFrame=new Set;releasedThisFrame=new Set;bindings={...iv};touchState=new Set;padPrevButtons=[];padIndex=-1;target=null;onBlur=()=>this.releaseAll();onVis=()=>{document.hidden&&this.releaseAll()};PAD_DEADZONE=.12;attach(t=document){this.target=t;const e=t;e.addEventListener?.("keydown",this.handleKeyDown),e.addEventListener?.("keyup",this.handleKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVis)}detach(){const t=this.target;t?.removeEventListener?.("keydown",this.handleKeyDown),t?.removeEventListener?.("keyup",this.handleKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVis)}handleKeyDown=t=>{if(sv.has(t.code)&&t.preventDefault(),t.repeat)return;this.down.add(t.code);const e=this.bindings[t.code];e&&this.pressedThisFrame.add(e)};handleKeyUp=t=>{this.down.delete(t.code);const e=this.bindings[t.code];e&&this.releasedThisFrame.add(e)};releaseAll(){this.down.clear(),this.touchState.clear();for(const t of Object.values(this.bindings))this.releasedThisFrame.add(t);for(const t of["throttle","brake","handbrake","steerLeft","steerRight"])this.releasedThisFrame.add(t)}setBinding(t,e){for(const n of Object.keys(this.bindings))this.bindings[n]===e&&delete this.bindings[n];this.bindings[t]=e}getBindings(){return{...this.bindings}}setTouch(t,e){e?(this.touchState.has(t)||this.pressedThisFrame.add(t),this.touchState.add(t)):(this.touchState.has(t)&&this.releasedThisFrame.add(t),this.touchState.delete(t))}pollGamepad(){const t=navigator.getGamepads?.()??[];let e=null;for(const i of t)if(i&&i.connected){e=i;break}if(!e){this.padIndex=-1,this.padPrevButtons=[];return}this.padIndex=e.index;const n=e.buttons;for(let i=0;i<n.length;i++){const r=n[i]?.pressed??!1,a=this.padPrevButtons[i]??!1;if(r&&!a){const o=Vc[i];o&&this.pressedThisFrame.add(o)}else if(!r&&a){const o=Vc[i];o&&this.releasedThisFrame.add(o)}this.padPrevButtons[i]=r}}getConnectedPadName(){return this.padIndex<0?null:navigator.getGamepads?.()[this.padIndex]?.id??null}rumble(t=60,e=.4,n=.2){if(this.padIndex<0)return;const i=navigator.getGamepads?.()[this.padIndex];try{i?.vibrationActuator?.playEffect("dual-rumble",{duration:t,strongMagnitude:e,weakMagnitude:n}).catch(()=>{})}catch{}}isDown(t){if(this.anyKeyFor(t)||this.touchState.has(t))return!0;if(this.padAnalogAxis){const e=this.padAnalogAxis.pad;if(t==="throttle"&&(e.buttons[7]?.value??0)>.08||t==="brake"&&(e.buttons[6]?.value??0)>.08)return!0}return!1}justPressed(t){return this.pressedThisFrame.has(t)}justReleased(t){return this.releasedThisFrame.has(t)}endFrame(){this.pressedThisFrame.clear(),this.releasedThisFrame.clear()}steerAxis(){let t=0;this.anyKeyFor("steerLeft")&&(t-=1),this.anyKeyFor("steerRight")&&(t+=1),this.touchState.has("steerLeft")&&(t-=1),this.touchState.has("steerRight")&&(t+=1);const e=this.padAnalogAxis?.pad;if(e){const n=e.axes[0]??0;Math.abs(n)>this.PAD_DEADZONE&&(t+=this.signScale(n))}return Math.max(-1,Math.min(1,t))}throttleAxis(){let t=0;this.anyKeyFor("throttle")&&(t=1),this.touchState.has("throttle")&&(t=1);const e=this.padAnalogAxis?.pad;return e?.buttons[7]&&(t=Math.max(t,e.buttons[7].value)),Math.max(0,Math.min(1,t))}brakeAxis(){let t=0;this.anyKeyFor("brake")&&(t=1),this.touchState.has("brake")&&(t=1);const e=this.padAnalogAxis?.pad;return e?.buttons[6]&&(t=Math.max(t,e.buttons[6].value)),Math.max(0,Math.min(1,t))}get padAnalogAxis(){const t=navigator.getGamepads?.()??[];for(const e of t)if(e&&e.connected)return{pad:e,index:e.index};return null}anyKeyFor(t){for(const e of Object.keys(this.bindings))if(this.bindings[e]===t&&this.down.has(e))return!0;return!1}signScale(t){const e=Math.sign(t),n=(Math.abs(t)-this.PAD_DEADZONE)/(1-this.PAD_DEADZONE);return e*Math.min(1,Math.max(0,n))}}const Vc={0:"confirm",1:"back",2:"handbrake",3:"camera",4:"shiftDown",5:"shiftUp",6:"brake",7:"throttle",9:"pause",12:"up",13:"down",14:"left",15:"right"};class av{state="Boot";prev="Boot";enteredAt=0;listeners=new Map;anyListeners=[];get current(){return this.state}get previous(){return this.prev}get timeInState(){return(performance.now()-this.enteredAt)/1e3}on(t,e){const n=this.listeners.get(t)??[];return n.push(e),this.listeners.set(t,n),()=>{const i=this.listeners.get(t);i&&this.listeners.set(t,i.filter(r=>r!==e))}}onAny(t){return this.anyListeners.push(t),()=>{this.anyListeners=this.anyListeners.filter(e=>e!==t)}}canTransition(t){const e=this.state;if(e===t)return!1;switch(t){case"Race":return e==="Menu"||e==="Garage"||e==="Results"||e==="Pause";case"Pause":return e==="Race";case"Results":return e==="Race";case"Boot":return!1;default:return!0}}go(t){if(!this.canTransition(t))return;const e=this.state;this.prev=e,this.state=t,this.enteredAt=performance.now();for(const n of this.listeners.get(t)??[])n(e,t);for(const n of this.anyListeners)n(e,t)}force(t){const e=this.state;this.prev=e,this.state=t,this.enteredAt=performance.now();for(const n of this.listeners.get(t)??[])n(e,t);for(const n of this.anyListeners)n(e,t)}}const Wc="eurobeat-drift-legend.save.v1",eo=1,no={masterVolume:.85,musicVolume:.62,sfxVolume:.9,quality:"high",cameraMode:"chase",invertSteer:!1,cameraSensitivity:1,subtitles:!0,reduceMotion:!1,hudScale:1,colorblindSafe:!1},ls={cash:0,bestTimes:{},unlockedCars:["hachi86"],upgrades:{hachi86:{tire:0,susp:0,lsd:0,engine:0},fd7:{tire:0,susp:0,lsd:0,engine:0},ek9:{tire:0,susp:0,lsd:0,engine:0},s13:{tire:0,susp:0,lsd:0,engine:0}},weeksCleared:[],rivalsBeaten:[],selectedCar:"hachi86",stats:{races:0,wins:0,drifts:0,bestDrift:0,totalKm:0}};function Wn(s){return JSON.parse(JSON.stringify(s))}class ov{data;available=!0;constructor(){this.data={version:eo,settings:Wn(no),progress:Wn(ls)},this.load()}get isAvailable(){return this.available}load(){try{const t=localStorage.getItem(Wc);if(!t)return;const e=JSON.parse(t);if(!e||typeof e!="object")return;const n={version:eo,settings:{...Wn(no),...e.settings??{}},progress:{...Wn(ls),...e.progress??{},stats:{...Wn(ls.stats),...e.progress?.stats??{}},upgrades:{...Wn(ls.upgrades),...e.progress?.upgrades??{}}}};this.data=n,this.sanitize()}catch{this.available=!1}}sanitize(){const t=this.data.settings;t.masterVolume=io(t.masterVolume,.85),t.musicVolume=io(t.musicVolume,.62),t.sfxVolume=io(t.sfxVolume,.9),["low","medium","high"].includes(t.quality)||(t.quality="high"),["chase","bumper","hood"].includes(t.cameraMode)||(t.cameraMode="chase"),t.cameraSensitivity=Math.max(.3,Math.min(2,Number(t.cameraSensitivity)||1)),t.hudScale=Math.max(.7,Math.min(1.6,Number(t.hudScale)||1));const e=this.data.progress;e.cash=Math.max(0,Math.floor(Number(e.cash)||0)),(!Array.isArray(e.unlockedCars)||e.unlockedCars.length===0)&&(e.unlockedCars=["hachi86"]),e.unlockedCars.includes("hachi86")||e.unlockedCars.push("hachi86"),Array.isArray(e.weeksCleared)||(e.weeksCleared=[]),Array.isArray(e.rivalsBeaten)||(e.rivalsBeaten=[]),(typeof e.bestTimes!="object"||e.bestTimes===null)&&(e.bestTimes={}),(!e.upgrades||typeof e.upgrades!="object")&&(e.upgrades=Wn(ls.upgrades));for(const n of["hachi86","fd7","ek9","s13"]){const i=e.upgrades[n]??{tire:0,susp:0,lsd:0,engine:0};i.tire=kr(i.tire),i.susp=kr(i.susp),i.lsd=kr(i.lsd),i.engine=kr(i.engine),e.upgrades[n]=i}}save(){try{localStorage.setItem(Wc,JSON.stringify(this.data)),this.available=!0}catch{this.available=!1}}updateSettings(t){this.data.settings={...this.data.settings,...t},this.sanitize(),this.save()}updateProgress(t){this.data.progress={...this.data.progress,...t},this.sanitize(),this.save()}addCash(t){this.data.progress.cash=Math.max(0,this.data.progress.cash+Math.floor(t)),this.save()}spendCash(t){return this.data.progress.cash<t?!1:(this.data.progress.cash-=t,this.save(),!0)}recordDrift(t){const e=this.data.progress.stats;e.drifts+=1,e.bestDrift=Math.max(e.bestDrift,Math.floor(t)),this.save()}recordRace(t){const e=this.data.progress;if(e.stats.races+=1,t.won&&(e.stats.wins+=1),e.stats.totalKm+=t.km,t.bestTimeKey&&typeof t.timeMs=="number"){const n=e.bestTimes[t.bestTimeKey]??Number.POSITIVE_INFINITY;t.timeMs<n&&(e.bestTimes[t.bestTimeKey]=Math.round(t.timeMs))}this.save()}unlockCar(t){const e=this.data.progress;return e.unlockedCars.includes(t)?!1:(e.unlockedCars.push(t),this.save(),!0)}buyUpgrade(t,e){const n=this.data.progress,i=n.upgrades[t]??{tire:0,susp:0,lsd:0,engine:0};n.upgrades[t]=i;const r=i[e];if(r>=4)return!1;const a=Xh(r);return this.spendCash(a)?(i[e]=r+1,this.save(),!0):!1}resetAll(){this.data={version:eo,settings:Wn(no),progress:Wn(ls)},this.save()}}function Xh(s){return[1200,2600,5e3,9e3][Math.min(3,Math.max(0,s))]??9e3}function io(s,t){const e=Number(s);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):t}function kr(s){const t=Math.floor(Number(s));return Number.isFinite(t)?Math.max(0,Math.min(4,t)):0}class lv{s;constructor(t=2654435769){this.s=t>>>0||1}next(){let t=this.s;return t^=t<<13,t^=t>>>17,t^=t<<5,this.s=t>>>0,this.s/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(this.range(t,e+1))}pick(t){if(t.length===0)throw new Error("pick() dari array kosong");return t[Math.floor(this.next()*t.length)]}reseed(t){this.s=t>>>0||1}}const cv=1.5;class hv{points=[];closed;grid=new Map;cell=24;constructor(t,e=!1){this.closed=e;const n=dv(t),i=fv(n,e),r=pv(i,cv,e);this.points=mv(r,e),this.buildGrid()}get length(){return this.points.length>0?this.points[this.points.length-1].s:0}get startSample(){return this.points[0]}sampleAt(t){const e=this.points.length;if(e===0)throw new Error("Track kosong");let n=t;this.closed?n=(n%this.length+this.length)%this.length:n=Math.max(0,Math.min(this.length-.001,n));const i=Math.max(0,Math.min(e-1,Math.round(n/this.length*(e-1))));return this.points[i]}frameAt(t,e=2){const n=this.sampleAt(t),i=this.sampleAt(t+e),r=Math.atan2(i.z-n.z,i.x-n.x),a=n.gutter;return{x:n.x,y:n.y,z:n.z,heading:Number.isFinite(r)?r:0,halfWidth:n.halfWidth,curvature:n.curvature,tunnel:n.tunnel,bridge:n.bridge,gutter:a,gutterSide:n.gutterSide}}pointAtOffset(t,e){const n=this.frameAt(t),i=Math.cos(n.heading+Math.PI/2),r=Math.sin(n.heading+Math.PI/2);return{x:n.x+i*e,z:n.z+r*e,y:n.y,heading:n.heading}}project(t,e,n=-1){let i=-1,r=1/0;if(n>=0){const u=this.points.length,d=60;for(let f=-d;f<=d;f++){let m=n+f;if(this.closed)m=(m%u+u)%u;else if(m<0||m>=u)continue;const v=this.points[m],g=t-v.x,p=e-v.z,b=g*g+p*p;b<r&&(r=b,i=m)}}if(i<0){const u=this.gridCandidates(t,e);if(u.length>0)for(const d of u){const f=this.points[d],m=t-f.x,v=e-f.z,g=m*m+v*v;g<r&&(r=g,i=d)}else for(let d=0;d<this.points.length;d++){const f=this.points[d],m=t-f.x,v=e-f.z,g=m*m+v*v;g<r&&(r=g,i=d)}}i<0&&(i=0);const a=this.points[i],o=this.frameAt(a.s),l=Math.cos(o.heading+Math.PI/2),c=Math.sin(o.heading+Math.PI/2),h=(t-a.x)*l+(e-a.z)*c;return{s:a.s,lateral:h,index:i,distanceToCenter:Math.abs(h)}}buildRacingLine(t=3.2){const e=this.points.length,n=new Float32Array(e);for(let r=0;r<e;r++){const a=this.points[r],o=a.curvature,l=Math.abs(o)<1e-4?0:Math.sign(o);n[r]=-l*Math.min(t,a.halfWidth*.72)}let i=n;for(let r=0;r<3;r++){const a=new Float32Array(e),o=8;for(let l=0;l<e;l++){let c=0,h=0;for(let u=-o;u<=o;u++){let d=l+u;if(this.closed)d=(d%e+e)%e;else if(d<0||d>=e)continue;c+=i[d],h++}a[l]=h>0?c/h:0}i=a}return i}buildGrid(){this.grid.clear();for(let t=0;t<this.points.length;t++){const e=this.points[t],n=uv(e.x,e.z,this.cell),i=this.grid.get(n);i?i.push(t):this.grid.set(n,[t])}}gridCandidates(t,e){const n=[],i=Math.floor(t/this.cell),r=Math.floor(e/this.cell);for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){const l=this.grid.get(`${i+a},${r+o}`);l&&n.push(...l)}return n}}function uv(s,t,e){return`${Math.floor(s/e)},${Math.floor(t/e)}`}function dv(s,t){const e=[];let n=0,i=0,r=Math.PI/2,a=0;for(const o of s){const l=o.grade,c=o.gutter?.45:0,h=o.width??9;if(o.kind==="straight"){const u=Math.max(1,Math.ceil(o.length/3)),d=o.length/u;for(let f=0;f<u;f++)e.push({x:n,z:i,s:a,grade:l,gutter:c,gutterSide:o.gutter?1:0,tunnel:o.tunnel??!1,bridge:o.bridge??!1,width:h}),n+=Math.cos(r)*d,i+=Math.sin(r)*d,a+=d}else{const u=o.radius??40,d=(o.angle??90)*Math.PI/180,f=Math.sign(d)||1,m=Math.abs(d)*u,v=Math.max(6,Math.ceil(m/3)),g=d/v,p=m/v,b=f;for(let S=0;S<v;S++)e.push({x:n,z:i,s:a,grade:l,gutter:c,gutterSide:o.gutter?b:0,tunnel:o.tunnel??!1,bridge:o.bridge??!1,width:h}),n+=Math.cos(r)*p*.5,i+=Math.sin(r)*p*.5,r+=g,n+=Math.cos(r)*p*.5,i+=Math.sin(r)*p*.5,a+=p}}return e.push({x:n,z:i,s:a,grade:s[s.length-1]?.grade??0,gutter:0,gutterSide:0,tunnel:!1,bridge:!1,width:s[s.length-1]?.width??9}),e}function fv(s,t){if(s.length<3)return s;const e=[],n=s.length,i=.5,r=a=>t?s[(a%n+n)%n]:s[Math.max(0,Math.min(n-1,a))];for(let a=0;a<(t?n:n-1);a++){const o=r(a-1),l=r(a),c=r(a+1),h=r(a+2),u=6;for(let d=0;d<u;d++){const f=d/u;e.push({x:Xc(o.x,l.x,c.x,h.x,f,i),z:Xc(o.z,l.z,c.z,h.z,f,i),s:l.s+(c.s-l.s)*f,grade:l.grade,gutter:l.gutter,gutterSide:l.gutterSide,tunnel:l.tunnel,bridge:l.bridge,width:l.width})}}return t||e.push(s[s.length-1]),e}function Xc(s,t,e,n,i,r){const o=0+Math.pow(Math.hypot(t-s,0)+1e-4,r),l=o+Math.pow(Math.hypot(e-t,0)+1e-4,r),c=l+Math.pow(Math.hypot(n-e,0)+1e-4,r),h=o+(l-o)*i,u=Cn(s,t,(h-0)/(o-0)),d=Cn(t,e,(h-o)/(l-o)),f=Cn(e,n,(h-l)/(c-l)),m=Cn(u,d,(h-0)/(l-0)),v=Cn(d,f,(h-o)/(c-o));return Cn(m,v,(h-o)/(l-o))}function Cn(s,t,e){return s+(t-s)*e}function pv(s,t,e){if(s.length<2)return s;const n=[0];for(let l=1;l<s.length;l++){const c=s[l-1],h=s[l];n.push(n[l-1]+Math.hypot(h.x-c.x,h.z-c.z))}const i=n[n.length-1],r=Math.max(2,Math.ceil(i/t)),a=[];let o=0;for(let l=0;l<=r;l++){const c=e?l/r*i:Math.min(i,l/r*i);for(;o<n.length-2&&n[o+1]<c;)o++;const h=s[o],u=s[Math.min(s.length-1,o+1)],d=Math.max(1e-6,n[o+1]-n[o]),f=Math.max(0,Math.min(1,(c-n[o])/d));a.push({x:Cn(h.x,u.x,f),z:Cn(h.z,u.z,f),s:c,grade:Cn(h.grade,u.grade,f),gutter:h.gutter,gutterSide:h.gutterSide,tunnel:h.tunnel,bridge:h.bridge,width:Cn(h.width,u.width,f)})}for(let l=0;l<a.length;l++)a[l].s=l/r*i;return a}function mv(s,t){const e=s.length,n=[];let i=980;const r=new Array(e).fill(0);r[0]=i;for(let c=1;c<e;c++){const h=s[c-1],u=s[c],d=Math.hypot(u.x-h.x,u.z-h.z)||.001;i-=Math.tan(u.grade)*d,r[c]=i}for(let c=0;c<e;c++){const h=Math.max(0,c-1),u=Math.min(e-1,c+1),d=s[h],f=s[c],m=s[u],v=f.x-d.x,g=f.z-d.z,p=m.x-f.x,b=m.z-f.z,S=v*b-g*p,x=Math.abs(S)*.5,w=Math.hypot(v,g),A=Math.hypot(p,b),R=Math.hypot(m.x-d.x,m.z-d.z);let C=0;w>1e-4&&A>1e-4&&R>1e-4&&x>1e-6&&(C=4*x/(w*A*R),S<0&&(C=-C)),n.push({x:f.x,y:r[c]??i,z:f.z,s:f.s,curvature:C,halfWidth:f.width*.5,gutter:f.gutter,gutterSide:f.gutterSide,tunnel:f.tunnel,bridge:f.bridge,grade:f.grade})}const a=n.map(c=>c.curvature);let o=a;const l=6;for(let c=0;c<5;c++){const h=new Array(a.length);for(let u=0;u<a.length;u++){let d=0,f=0;for(let m=-l;m<=l;m++){let v=u+m;if(t)v=(v%a.length+a.length)%a.length;else if(v<0||v>=a.length)continue;d+=o[v],f++}h[u]=f>0?d/f:0}o=h}for(let c=0;c<n.length;c++)n[c].curvature=o[c];return n}function gv(){const t=[{kind:"straight",length:600,grade:.123,width:9},{kind:"arc",length:0,radius:220,angle:-18,grade:.123},{kind:"straight",length:180,grade:.123},{kind:"straight",length:40,grade:.123},{kind:"arc",length:0,radius:90,angle:62,grade:.123},{kind:"straight",length:55,grade:.123},{kind:"arc",length:0,radius:72,angle:-54,grade:.123},{kind:"straight",length:48,grade:.123},{kind:"arc",length:0,radius:68,angle:70,grade:.123},{kind:"straight",length:70,grade:.123},{kind:"arc",length:0,radius:18,angle:178,grade:.123,gutter:!0},{kind:"straight",length:60,grade:.123},{kind:"arc",length:0,radius:130,angle:-38,grade:.123},{kind:"straight",length:360,grade:.123},{kind:"straight",length:80,grade:.123,tunnel:!0},{kind:"straight",length:380,grade:.123},{kind:"arc",length:0,radius:120,angle:44,grade:.123},{kind:"straight",length:380,grade:.123},{kind:"arc",length:0,radius:95,angle:-30,grade:.123},{kind:"straight",length:260,grade:.123},{kind:"straight",length:240,grade:.123},{kind:"arc",length:0,radius:150,angle:-46,grade:.123},{kind:"straight",length:120,grade:.123},{kind:"arc",length:0,radius:17,angle:178,grade:.123,gutter:!0},{kind:"straight",length:22,grade:.123},{kind:"arc",length:0,radius:20,angle:-178,grade:.123,gutter:!0},{kind:"straight",length:18,grade:.123},{kind:"arc",length:0,radius:16,angle:178,grade:.123,gutter:!0},{kind:"straight",length:22,grade:.123},{kind:"arc",length:0,radius:19,angle:-178,grade:.123,gutter:!0},{kind:"straight",length:18,grade:.123},{kind:"arc",length:0,radius:18,angle:178,grade:.123,gutter:!0},{kind:"straight",length:70,grade:.123},{kind:"arc",length:0,radius:110,angle:-34,grade:.123},{kind:"straight",length:160,grade:.123,bridge:!0},{kind:"straight",length:400,grade:.123,bridge:!0},{kind:"arc",length:0,radius:55,angle:-46,grade:.123},{kind:"straight",length:45,grade:.123},{kind:"arc",length:0,radius:50,angle:54,grade:.123},{kind:"straight",length:70,grade:.123},{kind:"arc",length:0,radius:85,angle:-40,grade:0},{kind:"straight",length:150,grade:0}];return new hv(t,!1)}const li=Ft.IDLE_RPM,Xn={frontWeightBias:.53,drivetrain:.575,rolling:14,cda:.66,yawAeroDamp:.55,scrubLat:.012};class qh{spec;state;gripMod=1;powerMod=1;speedCapMs=46.7;slope=0;dampen=1;input={throttle:0,brake:0,steer:0,handbrake:!1};telemetry={zeroTo100:NaN,topSpeedKmh:0,spinCount:0};accelTimer=0;wasUnder100=!0;time=0;lastALong=0;lastALat=0;driveForce=0;brakeForce=0;gutterGripActive=!1;pendingShift=0;safeX=0;safeZ=0;safeHeading=0;constructor(t,e,n,i){this.spec=t,this.state=Yc(e,n,i),this.setSafePose(e,n,i)}reset(t,e,n,i=0){this.state=Yc(t,e,n),this.state.vLong=i,this.state.vx=Math.cos(n)*i,this.state.vz=Math.sin(n)*i,this.state.speed=i,this.accelTimer=0,this.wasUnder100=!0,this.time=0,this.setSafePose(t,e,n)}setSafePose(t,e,n){this.safeX=t,this.safeZ=e,this.safeHeading=n}step(t,e){const n=this.state,i=this.spec;this.input=e,this.time+=t,n.hitWall=!1,n.hitStrength=0;const r=i.mass,a=Ft.GRAVITY,o=i.wheelbase*.47,l=i.wheelbase*.53,c=i.steerLockDeg*Math.PI/180,h=Math.hypot(n.vx,n.vz),u=1-we(h/220,0,.62),d=we(e.steer,-1,1)*c*u,f=7;n.steerAngle+=we(d-n.steerAngle,-f*t,f*t),this.updateDrivetrain(t,e,Math.abs(n.vLong));const m=r*a*Xn.frontWeightBias,v=r*a*(1-Xn.frontWeightBias),g=r*this.lastALong*i.cgHeight/i.wheelbase,p=r*this.lastALat*i.cgHeight/i.track,b=r*a*Ft.MAX_WEIGHT_TRANSFER,S=we(m-g,r*a*.1,b),x=we(v+g,r*a*.1,b),w=we(p/(r*a),0,.5),A=Math.max(2.5,Math.abs(n.vLong)),R=Math.atan2(n.vLat+n.yawRate*o,A)-n.steerAngle,C=Math.atan2(n.vLat-n.yawRate*l,A);let y=Ft.TIRE_PEAK_MU*this.gripMod;this.gutterGripActive&&(y=Ft.TIRE_GUTTER_MU);let M=1;if(n.handbrakeTimer>0){const qt=Math.min(1,n.handbrakeTimer/Ft.HANDBRAKE_YAW_TIME);M=1-Ft.HANDBRAKE_REAR_GRIP_CUT*qt}e.handbrake&&(M*=.92);const L=Math.min(1,Math.abs(C)/.45),N=we(e.throttle,0,1)*L;M*=1-.62*N;const V=qc(R,y*(1-w*.25),S),H=1-.34*we(Math.abs(C)/.5,0,1)*M,Y=qc(C,y*M*H*(1-w*.25),x),G=Math.cos(n.steerAngle),D=(V*G+Y)/r;let et=(V*G*o-Y*l)/i.inertiaYaw;if(n.handbrakeTimer>0){const qt=n.handbrakeTimer/(Ft.HANDBRAKE_YAW_TIME+Ft.HANDBRAKE_RECOVER);Math.sign(e.steer)||Math.sign(n.yawRate);const ne=Ft.HANDBRAKE_YAW_INJECT*i.driftBias*Math.sign(e.steer||0);et+=ne*qt*6,n.handbrakeTimer=Math.max(0,n.handbrakeTimer-t)}const ct=Math.abs(C);if(ct>Ft.COUNTERSTEER_SLIP_TRIGGER&&e.steer!==0&&Math.sign(e.steer)!==Math.sign(n.yawRate)){const ne=ct-Ft.COUNTERSTEER_SLIP_TRIGGER;et-=n.yawRate*Ft.COUNTERSTEER_DAMPING*ne*.22}et-=n.yawRate*Xn.yawAeroDamp*(.55+h/42);const yt=we(h/Math.max(1,i.wheelbase)*Ft.YAW_SLIP_FACTOR,1.2,4.6);Math.abs(n.yawRate)>yt&&(et-=Math.sign(n.yawRate)*(Math.abs(n.yawRate)-yt)*14),n.yawRate+=et*t,n.yawRate=we(n.yawRate,-6,Ft.MAX_YAW_RATE);const bt=.5*1.225*Xn.cda*n.vLong*Math.abs(n.vLong),Jt=Xn.rolling*Math.sign(n.vLong),Ht=this.governorForce(n.vLong),Z=-9.81*Math.sin(this.slope),tt=(this.driveForce-this.brakeForce-bt-Jt-Ht)/r+Z;this.lastALong=tt,this.lastALat=D,n.vLong+=(tt+n.yawRate*n.vLat)*t,n.vLat+=(D-n.yawRate*n.vLong)*t,n.vLat-=n.vLat*Xn.scrubLat*t*Math.abs(n.vLat),Math.abs(n.vLong)>Ft.MAX_SPEED_MS&&(n.vLong=Math.sign(n.vLong)*Ft.MAX_SPEED_MS);const pt=Math.cos(n.heading),Dt=Math.sin(n.heading);n.vx=n.vLong*pt-n.vLat*Dt,n.vz=n.vLong*Dt+n.vLat*pt,n.heading+=n.yawRate*t,Number.isFinite(n.heading)||(n.heading=0),n.x+=n.vx*t,n.z+=n.vz*t,n.slipFront=R,n.slipRear=C,n.speed=Math.hypot(n.vx,n.vz),n.odometer+=n.speed*t,n.drifting=Math.abs(C)>.16&&n.speed>6&&Math.abs(n.lateral)<40;const xt=n.speed*3.6;xt>this.telemetry.topSpeedKmh&&(this.telemetry.topSpeedKmh=xt),this.wasUnder100&&xt>=100&&Number.isNaN(this.telemetry.zeroTo100)&&(this.telemetry.zeroTo100=this.accelTimer,this.wasUnder100=!1),this.accelTimer+=t,Math.abs(n.yawRate)>3.4&&Math.abs(C)>1&&this.telemetry.spinCount++,n.gutterBoostTimer>0&&(n.gutterBoostTimer=Math.max(0,n.gutterBoostTimer-t)),_v(n)||this.recoverSafe()}governorForce(t){const e=this.effectiveCap();if(Math.abs(t)<=e)return 0;const n=Math.abs(t)-e;return Math.sign(t)*n*n*420}effectiveCap(){const t=Math.max(0,-Math.sin(this.slope));return Math.min(51.7,this.speedCapMs+t*70)}updateDrivetrain(t,e,n){const i=this.state,r=this.spec;if(i.shiftTimer>0&&(i.shiftTimer=Math.max(0,i.shiftTimer-t)),i.shiftTimer<=0){const v=we(i.gear,1,r.gears.length)-1,g=r.gears[v+1],p=Math.abs(i.vLong)/(2*Math.PI*r.wheelRadius);if(g!==void 0){const b=p*g*r.finalDrive*60;i.rpm>Ft.AUTO_SHIFT_UP_RPM&&b>li*1.6&&(i.gear=v+2,i.shiftTimer=Ft.SHIFT_UP_TIME,this.pendingShift=1)}if(v>0){const b=r.gears[v-1]??1,S=p*b*r.finalDrive*60;i.rpm<Ft.AUTO_SHIFT_DOWN_RPM&&S<Ft.REDLINE_RPM*.92&&(i.gear=v,i.shiftTimer=Ft.SHIFT_DOWN_TIME,this.pendingShift=-1)}}const a=we(i.gear,1,r.gears.length)-1,o=r.gears[a]??1,c=n/(2*Math.PI*r.wheelRadius)*o*r.finalDrive*60,h=Math.max(c,li+e.throttle*500);i.rpm+=(h-i.rpm)*Math.min(1,t*10),i.rpm<li&&(i.rpm=li),i.limiter=i.rpm>=Ft.LIMITER_RPM-60,i.rpm>Ft.LIMITER_RPM&&(i.rpm=Ft.LIMITER_RPM);let d=vv(r,i.rpm)*o*r.finalDrive*Xn.drivetrain/r.wheelRadius;d*=this.powerMod*e.throttle;const f=r.drive==="fwd"?r.mass*Ft.GRAVITY*Xn.frontWeightBias:r.mass*Ft.GRAVITY*(1-Xn.frontWeightBias),m=Ft.TIRE_PEAK_MU*f*(r.drive==="awd"?1.6:1.02);this.driveForce=Math.min(d,m),i.limiter&&Math.sin(this.time*Math.PI*2*Ft.LIMITER_CUT_HZ)>0&&(this.driveForce*=.15),i.shiftTimer>0&&(this.driveForce*=.1),e.throttle<.05&&n>1&&(this.driveForce-=Math.sign(i.vLong)*260*(i.rpm/Ft.REDLINE_RPM)),this.brakeForce=e.brake*r.mass*9.4,e.handbrake&&i.handbrakeTimer<=0&&(i.handbrakeTimer=Ft.HANDBRAKE_YAW_TIME+Ft.HANDBRAKE_RECOVER,this.brakeForce+=900),e.handbrake&&(this.brakeForce+=400)}applyTrackInfo(t,e,n,i,r,a){const o=this.state;if(o.lateral=t,o.trackS=r,o.trackIndex=a,n>0&&i!==0&&Math.abs(t)>e-.05&&Math.abs(t)<e+n+.25&&Math.sign(t)===i){const c=Math.abs(Math.atan2(o.vLat,Math.max(1,Math.abs(o.vLong)))),h=o.speed>Ft.GUTTER_MIN_SPEED,u=c<Ft.GUTTER_MAX_ANGLE;o.inGutter=!0,o.gutterSide=i;const d=this.gutterGripActive;if(this.gutterGripActive=h&&u,this.gutterGripActive&&!d){const f=1+Ft.GUTTER_EXIT_BOOST;o.vLong*=f,o.vx*=f,o.vz*=f,o.speed=Math.hypot(o.vx,o.vz),o.gutterBoostTimer=.6}}else o.inGutter=!1,o.gutterSide=0,this.gutterGripActive=!1}resolveBarrier(t,e,n){const i=this.state,r=e+n+.12;if(Math.abs(i.lateral)-r<=0)return;const o=Math.sign(i.lateral)||1,l=t.pointAtOffset(i.trackS,o*(r-.4));i.x=l.x,i.z=l.z;const c=Math.cos(i.heading),h=Math.sin(i.heading);let u=i.vx*c+i.vz*h,d=-i.vx*h+i.vz*c;const f=Math.hypot(i.vx,i.vz);d*=-.25,u*=Ft.COLLISION_DAMPING;const m=we(f/22,0,1.6),v=we(m*.15,Ft.COLLISION_MIN_LOSS,Ft.COLLISION_MAX_LOSS);u*=1-v,i.vLong=u,i.vLat=d,i.vx=u*c-d*h,i.vz=u*h+d*c,i.yawRate*=.5,i.hitWall=f>2,i.hitStrength=m,i.speed=Math.hypot(i.vx,i.vz)}recoverSafe(){const t=this.state;t.x=this.safeX,t.z=this.safeZ,t.heading=this.safeHeading,t.vx=0,t.vz=0,t.vLong=0,t.vLat=0,t.yawRate=0,t.rpm=li,t.gear=1,t.slipFront=0,t.slipRear=0,t.steerAngle=0,this.lastALong=0,this.lastALat=0}get speedKmh(){return this.state.speed*3.6}}function vv(s,t){const e=s.torqueNm;if(t<=s.torqueRpm){const i=we((t-li)/Math.max(1,s.torqueRpm-li),0,1);return e*(.55+.45*i)}const n=we((t-s.torqueRpm)/Math.max(1,Ft.LIMITER_RPM-s.torqueRpm),0,1);return e*(1-.18*n*n)}function qc(s,t,e){return-(t*e)*Math.sin(Ft.TIRE_C*Math.atan(Ft.TIRE_B*s))}function Yc(s,t,e){return{x:s,z:t,heading:e,vx:0,vz:0,yawRate:0,vLong:0,vLat:0,steerAngle:0,slipFront:0,slipRear:0,rpm:li,gear:1,shiftTimer:0,handbrakeTimer:0,gutterBoostTimer:0,inGutter:!1,gutterSide:0,limiter:!1,lateral:0,trackS:0,trackIndex:0,speed:0,odometer:0,hitWall:!1,hitStrength:0,drifting:!1}}function _v(s){return Number.isFinite(s.x)&&Number.isFinite(s.z)&&Number.isFinite(s.heading)&&Number.isFinite(s.vx)&&Number.isFinite(s.vz)&&Number.isFinite(s.yawRate)&&Number.isFinite(s.vLong)&&Number.isFinite(s.vLat)&&Number.isFinite(s.rpm)&&Number.isFinite(s.speed)}function we(s,t,e){return s<t?t:s>e?e:s}class xv{state;track;line;rng;skillBase;messageQueue=[];totalProgress=0;constructor(t,e,n,i,r,a,o){this.track=n,this.line=i,this.rng=new lv(o),this.skillBase=t.skill;const l=n.pointAtOffset(r,a);this.state={name:t.name,carId:t.carId,car:new qh(e,l.x,l.z,l.heading),profile:t,skill:t.skill,progress:r,finished:!1,finishTime:0,lineOffset:t.gutterLove>.6?.5:0,lastLineIdx:0,dialogueCooldown:0,gutterTimer:0},this.state.car.setSafePose(l.x,l.z,l.heading),this.totalProgress=r}reset(t,e){const n=this.track.pointAtOffset(t,e);this.state.car.reset(n.x,n.z,n.heading,0),this.state.car.setSafePose(n.x,n.z,n.heading),this.state.finished=!1,this.state.finishTime=0,this.state.progress=t,this.state.dialogueCooldown=0,this.totalProgress=t}applyRubberBand(t,e,n){const r=(t-this.state.progress)/30;let a=this.skillBase;r>oi.RUBBERBAND_BEHIND_S?a-=oi.RUBBERBAND_SKILL_DOWN:r<-8&&(a+=oi.RUBBERBAND_SKILL_UP),this.state.skill=we(a,.7,1.02)}step(t){const e=this.state,n=e.car,i=this.track,r=i.project(n.state.x,n.state.z,n.state.trackIndex);n.state.trackS=r.s;const a=i.sampleAt(r.s);n.applyTrackInfo(r.lateral,a.halfWidth,a.gutter,a.gutterSide,r.s,r.index),n.resolveBarrier(i,a.halfWidth,a.gutter);const o=Math.max(oi.LOOKAHEAD_MIN,n.state.speed*oi.LOOKAHEAD_PER_SPEED),l=r.s+o,c=this.lineIndex(l);e.lastLineIdx=c;const h=(this.line[c]??0)+this.personalOffset(l),u=i.pointAtOffset(l,h);let f=Math.atan2(u.z-n.state.z,u.x-n.state.x)-n.state.heading;for(;f>Math.PI;)f-=Math.PI*2;for(;f<-Math.PI;)f+=Math.PI*2;const m=we(f*2.3,-1,1),v=i.sampleAt(r.s+Math.max(8,n.state.speed*.5)).curvature,g=Ft.TIRE_PEAK_MU*n.spec.gripScale,p=Math.sqrt(g*Ft.GRAVITY/Math.max(.0016,Math.abs(v)))*e.skill,b=n.state.speed,S=b<p*.97?.95:b<p*1.04?.35:0,x=b>p*1.06?we((b-p)/6,.1,.8):0,A=Math.abs(v)>.035&&e.skill>.88&&this.rng.next()>.94&&Math.abs(m)>.5&&n.state.speed>10&&e.gutterTimer<=0,R={throttle:S,brake:x,steer:m,handbrake:A,isAI:!0};return n.step(t,R),e.progress=r.s,this.totalProgress=r.s,e.dialogueCooldown>0&&(e.dialogueCooldown-=t),e.gutterTimer>0&&(e.gutterTimer-=t),n.state.inGutter&&(e.gutterTimer=.8),R}lineIndex(t){const e=this.line.length,n=Math.max(0,Math.min(this.track.length,t));return Math.max(0,Math.min(e-1,Math.round(n/this.track.length*(e-1))))}personalOffset(t){const e=this.lineIndex(t),n=this.line[e]??0,i=this.state.profile.gutterLove;if(i<=0)return 0;const r=this.track.sampleAt(t);return r.gutter<=0?0:Math.sign(n||1)*i*(r.halfWidth*.32)}say(t){const e=this.state;if(e.dialogueCooldown>0)return null;const n=e.profile.lines[t];return!n||n.length===0?null:(e.dialogueCooldown=9,this.rng.pick(n))}drainMessages(){const t=this.messageQueue.map(e=>e.text);return this.messageQueue.length=0,t}}const Mv=3;class Sv{track;config;racers=[];player;time=0;started=!1;finished=!1;result=null;driftIntensity=0;racingLine;finishS;countdown=Vh.COUNTDOWN_SEC;tofuSpill=0;tofuCupsRemaining=Mv;lastLateralSign=0;lateralAccum=0;constructor(t,e){this.track=t,this.config=e,this.racingLine=t.buildRacingLine(oi.LINE_OFFSET),this.finishS=t.length-8;const n=e.mode==="uphill"?16:12,i=t.pointAtOffset(n,0);this.player=new qh(e.playerSpec,i.x,i.z,i.heading),this.player.setSafePose(i.x,i.z,i.heading),this.player.state.trackS=n,this.racers.push({name:e.playerName,carId:e.playerSpec.id,isPlayer:!0,progress:n,finishTime:null,finished:!1,color:e.playerSpec.color,car:this.player,ai:null,gapToPlayer:0});const r=e.mode==="timeattack"||e.mode==="tofu"?0:1;for(let a=0;a<Math.min(r,e.rivals.length);a++){const o=e.rivals[a],l=yv(o),c=Math.min(t.length-60,n+14+a*6),h=a%2===0?-2.2:2.2,u=new xv(o,l,t,this.racingLine,c,h,e.seed+a*977);u.state.skill=o.skill*e.difficulty,this.racers.push({name:o.name,carId:l.id,isPlayer:!1,progress:c,finishTime:null,finished:!1,color:l.color,car:u.state.car,ai:u,gapToPlayer:0})}}get countdownValue(){return Math.max(0,Math.ceil(this.countdown))}get countdownDone(){return this.countdown<=0}get raceTimeSec(){return this.time}get finishedCount(){return this.racers.filter(t=>t.finished).length}get playerEntry(){return this.racers.find(t=>t.isPlayer)}get rivalEntry(){return this.racers.find(t=>!t.isPlayer)??null}get playerPosition(){const e=this.sortedRacers().findIndex(n=>n.isPlayer);return e<0?1:e+1}sortedRacers(){return[...this.racers].sort((t,e)=>t.finished&&e.finished?(t.finishTime??0)-(e.finishTime??0):t.finished?-1:e.finished?1:e.progress-t.progress)}step(t,e){if(this.finished)return;if(this.countdown>0){this.countdown-=t,this.player.step(t,{throttle:0,brake:1,steer:0,handbrake:!0}),this.applyTrack(this.player);return}this.started=!0,this.time+=t,this.player.slope=this.slopeAt(this.player.state.trackS),this.player.step(t,e),this.applyTrack(this.player),this.player.state.hitWall&&(this.player.state.hitStrength=this.player.state.hitStrength);const n=this.playerEntry;n.progress=this.player.state.trackS;for(const i of this.racers)i.isPlayer||!i.ai||(i.ai.applyRubberBand(n.progress,this.time,this.time),i.ai.step(t),i.progress=i.ai.state.car.state.trackS,i.gapToPlayer=i.progress-this.player.state.trackS,i.ai.state.car.state.hitWall&&Math.random()<.05);this.config.mode==="tofu"&&this.updateTofu(t);for(const i of this.racers)i.finished||i.progress>=this.finishS&&(i.finished=!0,i.finishTime=this.time);this.playerEntry.finished&&(this.finished=!0,this.result=this.buildResult())}updateTofu(t){const e=this.player.state.lateral;Math.sign(e)!==this.lastLateralSign&&Math.abs(e)>.4&&(this.lateralAccum+=Math.abs(e),this.lastLateralSign=Math.sign(e)),Math.abs(this.player.state.vLat)*.5+Math.abs(this.player.state.yawRate)*4>4.2||this.player.state.hitStrength>.6?(this.tofuSpill=Math.min(1,this.tofuSpill+t*.9),this.tofuSpill>=1&&(this.tofuCupsRemaining=Math.max(0,this.tofuCupsRemaining-1))):this.tofuSpill=Math.max(0,this.tofuSpill-t*.5)}applyTrack(t){const e=this.track.project(t.state.x,t.state.z,t.state.trackIndex),n=this.track.sampleAt(e.s);t.applyTrackInfo(e.lateral,n.halfWidth,n.gutter,n.gutterSide,e.s,e.index),t.resolveBarrier(this.track,n.halfWidth,n.gutter)}slopeAt(t){const e=this.track.sampleAt(t);return-Math.atan(e.grade)}gapSeconds(){const t=this.rivalEntry;if(!t)return 0;const e=this.player.state.trackS-t.progress,n=Math.max(20,(this.player.state.speed+t.car.state.speed)*.5);return e/n}gapMeters(){const t=this.rivalEntry;return t?this.player.state.trackS-t.progress:0}isGapWin(){return this.gapMeters()>oi.WIN_GAP_M}buildResult(){const t=this.sortedRacers(),e=t.findIndex(a=>a.isPlayer)+1,n=e===1,i=Math.floor(this.time/60),r=(this.time%60).toFixed(3).padStart(6,"0");return{mode:this.config.mode,timeMs:Math.round(this.time*1e3),position:e,totalRacers:this.racers.length,driftPoints:0,bestDrift:0,topSpeedKmh:Math.round(this.player.telemetry.topSpeedKmh),gapText:`${i}:${r}`,won:n,entries:t}}}function yv(s,t){for(const e of il)if(e.id===s.carId)return e;return il[0]}let il=[];function Tv(s){il=s}class bv{state={points:0,current:0,combo:1,multiplier:1,label:"",intensity:0,best:0,driftTime:0,banked:0};reset(){Object.assign(this.state,{points:0,current:0,combo:1,multiplier:1,label:"",intensity:0,best:0,driftTime:0,banked:0})}update(t,e,n,i,r){const a=this.state,o=Math.abs(e),l=o>.16&&n>25;if(i){a.current=0,a.combo=1,a.driftTime=0,a.label="",a.intensity=0;return}if(l){a.driftTime+=t,a.intensity+=(Math.min(1,o/.8)-a.intensity)*Math.min(1,t*6);const c=(o*2.6+.5)*(n/60)*90;a.current+=c*t,a.multiplier=1+Math.min(3,Math.floor(a.driftTime/1.2))*.5,r&&(a.multiplier+=.25),a.combo=Math.min(9,1+Math.floor(a.driftTime/1.5)),a.label=a.driftTime>3.2?"PERFECT!":a.driftTime>1.9?"GREAT!":"DRIFT!"}else a.current>1&&(a.points+=Math.round(a.current*a.multiplier),a.banked+=Math.round(a.current*a.multiplier),a.best=Math.max(a.best,Math.round(a.current*a.multiplier))),a.current=Math.max(0,a.current-t*400),a.driftTime=Math.max(0,a.driftTime-t*3),a.intensity=Math.max(0,a.intensity-t*2.4),a.label="",a.multiplier=1,a.combo=1}get displayPoints(){return Math.round(this.state.points+this.state.current*this.state.multiplier)}get intensity(){return this.state.intensity}}function Ev(){const s=new la(2e3,24,16),t=new Ye({uniforms:{uTop:{value:new Xt(ie.SKY_TOP)},uMid:{value:new Xt(ie.SKY_MID)},uBottom:{value:new Xt(ie.SKY_BOTTOM)}},vertexShader:`
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uBottom;
      varying vec3 vPos;
      void main() {
        float h = normalize(vPos).y;
        vec3 col;
        if (h > 0.18) {
          col = mix(uMid, uTop, clamp((h - 0.18) / 0.82, 0.0, 1.0));
        } else {
          col = mix(uBottom, uMid, clamp((h + 0.2) / 0.38, 0.0, 1.0));
        }
        // bintang halus di atas
        float star = step(0.9985, fract(sin(dot(floor(vPos.xz * 3.0), vec2(12.9898, 78.233))) * 43758.5453));
        col += vec3(star) * clamp(h, 0.0, 1.0) * 0.8;
        gl_FragColor = vec4(col, 1.0);
      }
    `,side:Ge,depthWrite:!1}),e=new ee(s,t);return e.frustumCulled=!1,e.renderOrder=-100,e}function Av(s,t="high"){const e=new $0({canvas:s,antialias:t!=="low",powerPreference:"high-performance",alpha:!1});e.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.outputColorSpace=Re,e.toneMapping=nh,e.toneMappingExposure=1.06,e.shadowMap.enabled=t!=="low",e.shadowMap.type=th;const n=new Th;n.fog=new ml(ie.FOG_COLOR,ie.FOG_DENSITY),n.background=new Xt(ie.FOG_COLOR);const i=new je(ke.FOV_MIN,1,.2,2600),r=Ev();n.add(r);const a=new uf(ie.AMBIENT_COLOR,ie.AMBIENT_INTENSITY);n.add(a);const o=new hf(ie.MOON_COLOR,ie.MOON_INTENSITY);o.position.set(-140,220,120),o.castShadow=t!=="low",o.shadow.mapSize.set(1024,1024),o.shadow.camera.near=1,o.shadow.camera.far=120,o.shadow.camera.left=-14,o.shadow.camera.right=14,o.shadow.camera.top=14,o.shadow.camera.bottom=-14,o.shadow.bias=-6e-4,n.add(o);const l=new ve;n.add(l),o.target=l;let c=0;const h=new I;let u=0,d=0;const f={slowFrames:0,degraded:0};return{renderer:e,scene:n,camera:i,sky:r,sunLight:o,ambient:a,shadowMap:null,shakeOffset:h,get shakeRoll(){return u},setQuality(v){e.setPixelRatio(Math.min(window.devicePixelRatio||1,v==="low"?1:2)),e.shadowMap.enabled=v!=="low",o.castShadow=v!=="low",v==="low"&&(e.toneMappingExposure=1.12)},setSize(v,g){e.setSize(v,g,!1),i.aspect=v/Math.max(1,g),i.updateProjectionMatrix()},shake(v){c=Math.min(1.4,c+v)},update(v,g,p){d+=v,c=Math.max(0,c-v*1.9);const b=c*c;h.set(Math.sin(d*47.3)*.06*b+Math.sin(d*23.1)*.03*b,Math.cos(d*41.7)*.05*b,Math.sin(d*37.9)*.04*b),u=Math.sin(d*31.1)*.02*b,v>.021?f.slowFrames++:f.slowFrames=Math.max(0,f.slowFrames-1),f.slowFrames>90&&f.degraded<3&&(f.degraded++,f.slowFrames=0,f.degraded===1?(e.shadowMap.enabled=!1,o.castShadow=!1):f.degraded===2?e.setPixelRatio(1):e.toneMappingExposure=1.15)},dispose(){e.dispose(),n.clear()}}}function wv(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d");e.fillStyle="#1a1f2a",e.fillRect(0,0,512,512);const n=e.getImageData(0,0,512,512);for(let r=0;r<n.data.length;r+=4){const a=(Math.random()-.5)*26;n.data[r]=Math.max(0,Math.min(255,n.data[r]+a)),n.data[r+1]=Math.max(0,Math.min(255,n.data[r+1]+a)),n.data[r+2]=Math.max(0,Math.min(255,n.data[r+2]+a))}e.putImageData(n,0,0),e.strokeStyle="rgba(10,12,18,0.55)",e.lineWidth=1.5;for(let r=0;r<26;r++){e.beginPath();let a=Math.random()*512,o=Math.random()*512;e.moveTo(a,o);for(let l=0;l<5;l++)a+=(Math.random()-.5)*60,o+=(Math.random()-.5)*60,e.lineTo(a,o);e.stroke()}e.fillStyle="rgba(14,17,24,0.65)";for(let r=0;r<8;r++){const a=40+Math.random()*90,o=30+Math.random()*70;e.fillRect(Math.random()*512,Math.random()*512,a,o)}const i=new Qn(t);return i.wrapS=i.wrapT=qs,i.anisotropy=4,i.colorSpace=Re,i}function Rv(){const e=document.createElement("canvas");e.width=64,e.height=1024;const n=e.getContext("2d");n.clearRect(0,0,64,1024),n.fillStyle="rgba(235,240,255,0.92)";for(let r=0;r<1024;r+=120)n.fillRect(4,r,8,70),n.fillRect(52,r,8,70);n.fillStyle="rgba(255,196,64,0.9)";for(let r=0;r<1024;r+=140)n.fillRect(64/2-3,r,6,80);const i=new Qn(e);return i.wrapS=hi,i.wrapT=qs,i.colorSpace=Re,i}function Cv(s){const t=new Dn;t.name="track";const e=s.points.length,n=new Float32Array(e*2*3),i=new Float32Array(e*2*3),r=new Float32Array(e*2*2),a=new Float32Array(e*2*3),o=new Float32Array(e*2*2),l=new Float32Array(e*2*3),c=new Float32Array(e*2*2*3),h=new Float32Array(e),u=new Float32Array(e);for(let G=0;G<e;G++){const D=s.points[G],rt=s.points[Math.min(e-1,G+1)];u[G]=Math.atan2(rt.z-D.z,rt.x-D.x),h[G]=D.halfWidth}let d=0;for(let G=0;G<e;G++){const D=s.points[G],rt=u[G],et=Math.cos(rt+Math.PI/2),ct=Math.sin(rt+Math.PI/2),yt=h[G],bt=G*2;G>0&&(d+=Math.hypot(D.x-s.points[G-1].x,D.z-s.points[G-1].z)),n[bt*3+0]=D.x-et*yt,n[bt*3+1]=D.y,n[bt*3+2]=D.z-ct*yt,n[(bt+1)*3+0]=D.x+et*yt,n[(bt+1)*3+1]=D.y,n[(bt+1)*3+2]=D.z+ct*yt,i[bt*3+1]=1,i[(bt+1)*3+1]=1,r[bt*2+0]=0,r[bt*2+1]=d/8,r[(bt+1)*2+0]=1,r[(bt+1)*2+1]=d/8;const Jt=yt-.35;a[bt*3+0]=D.x-et*Jt,a[bt*3+1]=D.y+.02,a[bt*3+2]=D.z-ct*Jt,a[(bt+1)*3+0]=D.x+et*(yt-.05),a[(bt+1)*3+1]=D.y+.02,a[(bt+1)*3+2]=D.z+ct*(yt-.05),o[bt*2+0]=0,o[bt*2+1]=d/10,o[(bt+1)*2+0]=1,o[(bt+1)*2+1]=d/10;const Ht=D.gutterSide||1,Z=D.x+et*Ht*(yt+.22),tt=D.z+ct*Ht*(yt+.22);l[bt*3+0]=Z-et*Ht*.24,l[bt*3+1]=D.y-(D.gutter>0?.18:0),l[bt*3+2]=tt-ct*Ht*.24,l[(bt+1)*3+0]=Z+et*Ht*.24,l[(bt+1)*3+1]=D.y-(D.gutter>0?.18:0),l[(bt+1)*3+2]=tt+ct*Ht*.24;const pt=G*4;c[pt*3+0]=D.x-et*yt,c[pt*3+1]=D.y,c[pt*3+2]=D.z-ct*yt,c[(pt+1)*3+0]=D.x-et*(yt+2.4),c[(pt+1)*3+1]=D.y-1.7,c[(pt+1)*3+2]=D.z-ct*(yt+2.4),c[(pt+2)*3+0]=D.x+et*yt,c[(pt+2)*3+1]=D.y,c[(pt+2)*3+2]=D.z+ct*yt,c[(pt+3)*3+0]=D.x+et*(yt+2.4),c[(pt+3)*3+1]=D.y-1.7,c[(pt+3)*3+2]=D.z+ct*(yt+2.4)}const f=new Ae;f.setAttribute("position",new be(n,3)),f.setAttribute("normal",new be(i,3)),f.setAttribute("uv",new be(r,2)),f.setIndex(so(e)),f.computeVertexNormals();const m=wv(),v=new De({map:m,color:12569051,roughness:.72,metalness:.06}),g=new ee(f,v);g.receiveShadow=!0,g.name="road",t.add(g);const p=new Ae;p.setAttribute("position",new be(a,3)),p.setAttribute("uv",new be(o,2)),p.setIndex(so(e)),p.computeVertexNormals();const b=Rv(),S=new cn({map:b,transparent:!0,depthWrite:!1,blending:Xs,opacity:.85}),x=new ee(p,S);x.renderOrder=1,x.name="lines",t.add(x);const w=new Ae;w.setAttribute("position",new be(l,3)),w.setIndex(so(e)),w.computeVertexNormals();const A=new De({color:3817810,roughness:.85,metalness:.25,side:Qe}),R=new ee(w,A);R.name="gutter",t.add(R);const C=new Ae;C.setAttribute("position",new be(c,3)),C.setIndex(Pv(e)),C.computeVertexNormals();const y=new De({color:1780258,roughness:1,metalness:0,side:Qe}),M=new ee(C,y);M.name="embankment",t.add(M);const L=Math.max(1,Math.floor(e/3)),N=new Ue(.12,.85,.12),V=new De({color:11056328,roughness:.5,metalness:.65}),q=new ln(N,V,L*2),H=new ve;let Y=0;for(let G=0;G<e&&Y<L*2;G+=3){const D=s.points[G],rt=u[G],et=Math.cos(rt+Math.PI/2),ct=Math.sin(rt+Math.PI/2),yt=h[G]+(D.gutter>0?.65:.15);for(const bt of[-1,1])H.position.set(D.x+et*bt*yt,D.y+.42,D.z+ct*bt*yt),H.rotation.set(0,-rt,0),H.updateMatrix(),q.setMatrixAt(Y++,H.matrix)}return q.count=Y,q.instanceMatrix.needsUpdate=!0,q.name="guardrails",t.add(q),{group:t,road:g,lines:x,gutter:R,embankment:M,guardrails:q,dispose(){f.dispose(),p.dispose(),w.dispose(),C.dispose(),N.dispose(),v.dispose(),S.dispose(),A.dispose(),y.dispose(),V.dispose(),m.dispose(),b.dispose(),t.clear()}}}function so(s){const t=[];for(let e=0;e<s-1;e++){const n=e*2,i=n+1,r=n+2,a=n+3;t.push(n,r,i,i,r,a)}return t}function Pv(s){const t=[];for(let e=0;e<s-1;e++){const n=e*4,i=n+4;t.push(n,i,n+1,n+1,i,i+1),t.push(n+2,n+3,i+2,n+3,i+3,i+2)}return t}function Lv(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");e.fillStyle="#111722",e.fillRect(0,0,128,128),e.fillStyle="#ffd400",e.beginPath(),e.moveTo(20,20),e.lineTo(108,64),e.lineTo(20,108),e.lineTo(20,84),e.lineTo(66,64),e.lineTo(20,44),e.closePath(),e.fill();const n=new Qn(t);return n.colorSpace=Re,n}new Xt(ie.FOG_COLOR);const Ns=260,Br=90,Os=22;function Iv(s,t){const e=new Dn;e.name="scenery";const n=[],i=Dv(1592594996),r=new Kn(.16,.24,2.4,5),a=new De({color:3813159,roughness:1}),o=new sa(1.5,4.6,6),l=new De({color:1455391,roughness:.95,flatShading:!0}),c=new yl(1.9,0),h=new De({color:1785894,roughness:.95,flatShading:!0}),u=new ln(r,a,Ns),d=new ln(o,l,Ns),f=new ln(c,h,Ns);d.count=0,f.count=0;const m=new ve,v=s.points.length;let g=0,p=0;for(let B=0;B<Ns;B++){const z=B/Ns*s.length+i()*30,nt=s.sampleAt(z),ft=s.frameAt(nt.s),Ut=i()>.5?1:-1,Ot=nt.halfWidth+4+i()*16,Zt=ft.x+Math.cos(ft.heading+Math.PI/2)*Ut*Ot,ae=ft.z+Math.sin(ft.heading+Math.PI/2)*Ut*Ot,me=.75+i()*.95;m.position.set(Zt,nt.y-.4,ae),m.rotation.set(0,i()*Math.PI*2,0),m.scale.setScalar(me),m.updateMatrix(),u.setMatrixAt(B,m.matrix),i()>.46?(m.position.y=nt.y+1.9*me,m.scale.setScalar(me*(.85+i()*.5)),m.updateMatrix(),d.setMatrixAt(g++,m.matrix)):(m.position.y=nt.y+2.5*me,m.scale.setScalar(me*(.85+i()*.4)),m.updateMatrix(),f.setMatrixAt(p++,m.matrix))}d.count=g,f.count=p,u.instanceMatrix.needsUpdate=!0,d.instanceMatrix.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,u.castShadow=!1,e.add(u,d,f),n.push(r,a,o,l,c,h);const b=new Kn(.1,.13,7.2,5),S=new De({color:4868682,roughness:.9}),x=new ln(b,S,Br),w=new Ue(1.5,.08,.08),A=new ln(w,S,Br),R=[];for(let B=0;B<Br;B++){const z=B/Br*s.length+12,nt=s.sampleAt(z),ft=s.frameAt(nt.s),Ut=B%2===0?1:-1,Ot=nt.halfWidth+2.1,Zt=ft.x+Math.cos(ft.heading+Math.PI/2)*Ut*Ot,ae=ft.z+Math.sin(ft.heading+Math.PI/2)*Ut*Ot;m.position.set(Zt,nt.y+3.6,ae),m.rotation.set(0,0,0),m.scale.setScalar(1),m.updateMatrix(),x.setMatrixAt(B,m.matrix),m.position.set(Zt,nt.y+6.6,ae),m.rotation.set(0,-ft.heading,0),m.updateMatrix(),A.setMatrixAt(B,m.matrix),R.push(new I(Zt,nt.y+6.9,ae))}x.instanceMatrix.needsUpdate=!0,A.instanceMatrix.needsUpdate=!0,e.add(x,A),n.push(b,S,w);const C=[];for(let B=0;B<R.length-1;B++){const z=R[B],nt=R[B+1],ft=6;for(let Ut=0;Ut<ft;Ut++){const Ot=Ut/ft,Zt=(Ut+1)/ft,ae=me=>Math.sin(me*Math.PI)*.9;C.push(z.x+(nt.x-z.x)*Ot,z.y+(nt.y-z.y)*Ot-ae(Ot),z.z+(nt.z-z.z)*Ot,z.x+(nt.x-z.x)*Zt,z.y+(nt.y-z.y)*Zt-ae(Zt),z.z+(nt.z-z.z)*Zt)}}const y=new Ae;y.setAttribute("position",new _e(C,3));const M=new Eh({color:1711914,transparent:!0,opacity:.85}),L=new yd(y,M);e.add(L),n.push(y,M);const N=new Ue(5.2,3.4,6.4),V=new De({color:2764605,roughness:.95}),q=new ln(N,V,Os),H=new sa(4.4,2.1,4),Y=new De({color:1711140,roughness:1}),G=new ln(H,Y,Os),D=new Un(.9,.7),rt=new cn({color:16761962}),et=new ln(D,rt,Os*2);let ct=0;for(let B=0;B<Os;B++){const z=B/Os*s.length+45,nt=s.sampleAt(z),ft=s.frameAt(nt.s),Ut=B%2===0?1:-1,Ot=nt.halfWidth+9+i()*5,Zt=ft.x+Math.cos(ft.heading+Math.PI/2)*Ut*Ot,ae=ft.z+Math.sin(ft.heading+Math.PI/2)*Ut*Ot,me=ft.heading+(Ut>0?-Math.PI/2:Math.PI/2);m.position.set(Zt,nt.y+1.2,ae),m.rotation.set(0,-me,0),m.scale.setScalar(1),m.updateMatrix(),q.setMatrixAt(B,m.matrix),m.position.y=nt.y+3.9,m.rotation.set(0,-me+Math.PI/4,0),m.updateMatrix(),G.setMatrixAt(B,m.matrix);for(const Ke of[-1.2,1.2])m.position.set(Zt+Math.cos(me+Math.PI/2)*Ke+Math.cos(me)*3.3*1,nt.y+1.8,ae+Math.sin(me+Math.PI/2)*Ke+Math.sin(me)*3.3*1),m.rotation.set(0,-me,0),m.scale.setScalar(.8+i()*.5),m.updateMatrix(),et.setMatrixAt(ct++,m.matrix)}q.instanceMatrix.needsUpdate=!0,G.instanceMatrix.needsUpdate=!0,et.count=ct,et.instanceMatrix.needsUpdate=!0,e.add(q,G,et),n.push(N,V,H,Y,D,rt);const yt=Lv(),bt=new cn({map:yt,transparent:!0}),Jt=new Un(1.1,1),Ht=new ln(Jt,bt,12);let Z=0;for(let B=2;B<v-2&&Z<12;B+=1){const z=s.points[B];if(Math.abs(z.curvature)<1/30||B%22!==0)continue;const nt=s.frameAt(z.s),ft=z.curvature>0?1:-1,Ut=z.halfWidth+1.5;m.position.set(nt.x+Math.cos(nt.heading+Math.PI/2)*ft*Ut,z.y+1.5,nt.z+Math.sin(nt.heading+Math.PI/2)*ft*Ut),m.rotation.set(0,-nt.heading+Math.PI,0),m.scale.setScalar(1),m.updateMatrix(),Ht.setMatrixAt(Z++,m.matrix)}Ht.count=Z,Ht.instanceMatrix.needsUpdate=!0,e.add(Ht),n.push(yt,bt,Jt);const tt=[];for(const B of s.points)B.tunnel&&tt.push(new I(B.x,B.y,B.z));if(tt.length>2){const B=tt[0],z=tt[tt.length-1],nt=s.project(B.x,B.z).s,ft=B.distanceTo(z),Ut=new Kn(7.4,7.4,ft+6,14,1,!0,0,Math.PI),Ot=new De({color:3356746,roughness:.9,side:Qe,metalness:.2}),Zt=new ee(Ut,Ot);Zt.position.copy(B).add(z).multiplyScalar(.5),Zt.position.y+=5.6;const ae=z.clone().sub(B).normalize();Zt.rotation.y=-Math.atan2(ae.z,ae.x),Zt.rotation.z=Math.PI/2,Zt.rotation.x=Math.PI/2,Zt.rotation.z=Math.PI/2,e.add(Zt),n.push(Ut,Ot);const me=new Ue(1.5,.16,.4),Ke=new cn({color:16761930}),mi=Math.max(4,Math.floor(ft/12)),Bi=new ln(me,Ke,mi);for(let gi=0;gi<mi;gi++){const Gi=nt+gi/mi*ft,zi=s.sampleAt(Gi);m.position.set(zi.x,zi.y+5,zi.z),m.rotation.set(0,0,0),m.scale.setScalar(1),m.updateMatrix(),Bi.setMatrixAt(gi,m.matrix)}Bi.instanceMatrix.needsUpdate=!0,e.add(Bi),n.push(me,Ke)}const pt=s.points.filter(B=>B.bridge);if(pt.length>4){const B=pt[Math.floor(pt.length/2)],z=new vl(260,24),nt=new De({color:991795,roughness:.08,metalness:.9,transparent:!0,opacity:.96}),ft=new ee(z,nt),Ut=s.frameAt(B.s);ft.position.set(B.x+Math.cos(Ut.heading-Math.PI/2)*240,B.y-72,B.z+Math.sin(Ut.heading-Math.PI/2)*240),ft.rotation.x=-Math.PI/2,e.add(ft),n.push(z,nt)}const Dt=s.length-40,xt=s.frameAt(Dt),qt=new De({color:2765378,roughness:.6,metalness:.4}),ne=new Ue(.4,6,.4);for(const B of[-1,1]){const z=new ee(ne,qt);z.position.set(xt.x+Math.cos(xt.heading+Math.PI/2)*B*(xt.halfWidth+.8),xt.y+3,xt.z+Math.sin(xt.heading+Math.PI/2)*B*(xt.halfWidth+.8)),e.add(z)}const P=new Un(xt.halfWidth*2+1.6,1.8),it=document.createElement("canvas");it.width=512,it.height=128;const J=it.getContext("2d"),j=J.createLinearGradient(0,0,512,0);j.addColorStop(0,"#ff2e63"),j.addColorStop(1,"#21e6c1"),J.fillStyle=j,J.fillRect(0,0,512,128),J.fillStyle="#08101c",J.font="bold 62px 'Trebuchet MS', sans-serif",J.textAlign="center",J.textBaseline="middle",J.fillText("FINISH",256,64);const Q=new Qn(it),mt=new ee(P,new cn({map:Q,side:Qe}));mt.position.set(xt.x,xt.y+5.4,xt.z),mt.rotation.y=-xt.heading+Math.PI/2,e.add(mt),n.push(ne,qt,P,Q);const at=new Kn(.08,.1,5.4,5),gt=new De({color:5594480,roughness:.7,metalness:.4}),Wt=new la(.26,8,6),zt=new cn({color:16765066}),E=55,_=Math.floor(s.length/E),k=new ln(at,gt,_),K=new ln(Wt,zt,_),st=[];for(let B=0;B<_;B++){const z=B*E+20,nt=s.sampleAt(z),ft=s.frameAt(nt.s),Ut=B%2===0?1:-1,Ot=nt.halfWidth+.9,Zt=ft.x+Math.cos(ft.heading+Math.PI/2)*Ut*Ot,ae=ft.z+Math.sin(ft.heading+Math.PI/2)*Ut*Ot;if(m.position.set(Zt,nt.y+2.7,ae),m.rotation.set(0,0,0),m.scale.setScalar(1),m.updateMatrix(),k.setMatrixAt(B,m.matrix),m.position.set(Zt,nt.y+5.4,ae),m.updateMatrix(),K.setMatrixAt(B,m.matrix),st.length<4&&B%Math.max(1,Math.floor(_/5))===0){const me=new lf(16758628,22,26,2);me.position.set(Zt,nt.y+5.2,ae),e.add(me),st.push(me)}}k.instanceMatrix.needsUpdate=!0,K.instanceMatrix.needsUpdate=!0,e.add(k,K),n.push(at,gt,Wt,zt);const $=document.createElement("canvas");$.width=64,$.height=64;const Ct=$.getContext("2d"),dt=Ct.createRadialGradient(32,32,0,32,32,32);dt.addColorStop(0,"rgba(255,220,160,0.95)"),dt.addColorStop(.4,"rgba(255,180,100,0.35)"),dt.addColorStop(1,"rgba(255,150,60,0)"),Ct.fillStyle=dt,Ct.fillRect(0,0,64,64);const Pt=new Qn($),Lt=new ea({map:Pt,blending:Xs,transparent:!0,depthWrite:!1}),ot=new Dn;for(let B=0;B<_;B++){const z=B*E+20,nt=s.sampleAt(z),ft=s.frameAt(nt.s),Ut=B%2===0?1:-1,Ot=nt.halfWidth+.9,Zt=new Jo(Lt);Zt.position.set(ft.x+Math.cos(ft.heading+Math.PI/2)*Ut*Ot,nt.y+5.4,ft.z+Math.sin(ft.heading+Math.PI/2)*Ut*Ot),Zt.scale.setScalar(3.4),ot.add(Zt)}e.add(ot),n.push(Pt,Lt);const _t=s.frameAt(6),Nt=document.createElement("canvas");Nt.width=256,Nt.height=128;const Et=Nt.getContext("2d");Et.fillStyle="#f6f1e4",Et.fillRect(0,0,256,128),Et.strokeStyle="#1a1a1a",Et.lineWidth=6,Et.strokeRect(3,3,250,122),Et.fillStyle="#1a1a1a",Et.font="bold 40px 'Trebuchet MS', sans-serif",Et.textAlign="center",Et.fillText("藤原とうふ店",128,58),Et.font="bold 22px 'Trebuchet MS', sans-serif",Et.fillText("FUJIWARA TOFU SHOP",128,92);const Mt=new Qn(Nt),Yt=new Un(3.2,1.6),U=new cn({map:Mt,side:Qe}),lt=new ee(Yt,U);lt.position.set(_t.x+Math.cos(_t.heading+Math.PI/2)*(_t.halfWidth+2.4),_t.y+2.4,_t.z+Math.sin(_t.heading+Math.PI/2)*(_t.halfWidth+2.4)),lt.rotation.y=-_t.heading+Math.PI/2,e.add(lt);const vt=new Kn(.07,.07,2.4,5),At=new ee(vt,gt);return At.position.copy(lt.position).setY(lt.position.y-1.2),e.add(At),n.push(Mt,Yt,U,vt),{group:e,update(B,z){},dispose(){for(const B of n)B.dispose();for(const B of st)B.dispose();e.traverse(B=>{const z=B;z.geometry&&z.geometry.dispose()}),e.clear()}}}function Dv(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Uv(s){const t=new Xt(s.color),e=new Xt(s.rimColor??ie.RIM_COLOR);return new Ye({uniforms:{uBase:{value:t},uRim:{value:e},uRimStrength:{value:s.rimStrength??ie.RIM_STRENGTH},uEmissive:{value:new Xt(s.emissive??0)},uEmissiveIntensity:{value:s.emissiveIntensity??0},uThresholdA:{value:ie.CELL_THRESHOLD_A},uThresholdB:{value:ie.CELL_THRESHOLD_B},uSoft:{value:ie.CELL_SOFT},uUnlit:{value:s.unlit?1:0},uAmbient:{value:ie.AMBIENT_INTENSITY},uMoonDir:{value:new I(.35,.82,.45).normalize()},uMoonColor:{value:new Xt(ie.MOON_COLOR)},uMoonIntensity:{value:ie.MOON_INTENSITY},uFogColor:{value:new Xt(ie.FOG_COLOR)},uFogDensity:{value:ie.FOG_DENSITY*1e3}},vertexShader:`
      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDirW = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      uniform vec3 uBase;
      uniform vec3 uRim;
      uniform float uRimStrength;
      uniform vec3 uEmissive;
      uniform float uEmissiveIntensity;
      uniform float uThresholdA;
      uniform float uThresholdB;
      uniform float uSoft;
      uniform float uUnlit;
      uniform float uAmbient;
      uniform vec3 uMoonDir;
      uniform vec3 uMoonColor;
      uniform float uMoonIntensity;
      uniform vec3 uFogColor;
      uniform float uFogDensity;

      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      varying vec3 vWorldPos;

      // ambang dengan soft edge sempit → band tegas tapi tidak jaggies
      float band(float x, float threshold) {
        return smoothstep(threshold - uSoft, threshold + uSoft, x);
      }

      void main() {
        if (uUnlit > 0.5) {
          gl_FragColor = vec4(uBase + uEmissive * uEmissiveIntensity, 1.0);
          return;
        }
        vec3 n = normalize(vNormalW);
        float ndl = max(0.0, dot(n, normalize(uMoonDir)));

        // 3 band diskret
        float b1 = band(ndl, uThresholdA);
        float b2 = band(ndl, uThresholdB);
        float shade = 0.34 + 0.30 * b1 + 0.36 * b2;

        vec3 lit = uBase * (uMoonColor * uMoonIntensity * shade + uAmbient);

        // rim light dingin dari belakang
        float rim = pow(1.0 - max(0.0, dot(n, normalize(vViewDirW))), 2.6);
        lit += uRim * rim * uRimStrength * 0.9;

        lit += uEmissive * uEmissiveIntensity;

        // fog eksponensial berbasis jarak kamera
        float dist = length(cameraPosition - vWorldPos);
        float fogFactor = 1.0 - exp(-pow(dist * uFogDensity / 1000.0 * 1.0, 2.0) * 2.0);
        lit = mix(lit, uFogColor, clamp(fogFactor, 0.0, 1.0));

        gl_FragColor = vec4(lit, 1.0);
      }
    `,depthWrite:!0})}function Fv(s=ie.OUTLINE_PX){return new Ye({uniforms:{uThickness:{value:s},uColor:{value:new Xt(329485)},uResolution:{value:new ut(1920,1080)}},vertexShader:`
      uniform float uThickness;
      uniform vec2 uResolution;
      void main() {
        vec3 n = normalize(normalMatrix * normal);
        vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        // geser 1.6px di screen space
        vec2 offset = n.xy * (uThickness * 2.0 / uResolution);
        clip.xy += offset * clip.w;
        gl_Position = clip;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
      }
    `,side:Ge})}function Nv(s){const t=new Ih,e=s.wheelbase+.85,n=e*.5,i=-e*.5,r=.62,a=.62+s.cgHeight*.72;return t.moveTo(n,.18),t.lineTo(n-.06,r*.72),t.lineTo(n-.42,.78),t.lineTo(n-.78,.86),t.lineTo(n-1.12,a),t.lineTo(-.16,a+.035),t.lineTo(-.72,r+.2),t.lineTo(i+.5,.82),t.lineTo(i+.04,.72),t.lineTo(i,.34),t.lineTo(i+.04,.2),t.lineTo(n,.18),new Sl(t,{depth:s.track+.14,bevelEnabled:!0,bevelThickness:.045,bevelSize:.05,bevelSegments:2,curveSegments:6})}function Ov(s,t){const e=s.wheelRadius,n=new Kn(e,e,.24,14,1);return n.rotateZ(Math.PI/2),new ee(n,t)}function Kc(s,t={}){const e=new Dn,n=new Dn;e.add(n);const i=t.toon===!1?new De({color:s.color,roughness:.38,metalness:.35}):Uv({color:s.color,rimStrength:.6}),r=Nv(s),a=s.track+.14;r.translate(0,0,-a/2);const o=new ee(r,i);if(o.rotation.y=Math.PI/2,o.castShadow=!0,n.add(o),t.outline!==!1){const G=new ee(r,Fv());G.rotation.y=Math.PI/2,G.scale.set(1.012,1.012,1.012),G.renderOrder=-1,n.add(G)}const l=new De({color:792102,roughness:.14,metalness:.85,transparent:!0,opacity:.86}),c=.62+s.cgHeight*.72,h=new ee(new Ue(.05,.46,a*.8),l);h.position.set(s.wheelbase*.19,c-.12,0),h.rotation.z=-.42,n.add(h);const u=new ee(new Ue(.05,.36,a*.76),l);u.position.set(-s.wheelbase*.32,c-.16,0),u.rotation.z=.5,n.add(u);const d=new De({color:s.accent,roughness:.5,metalness:.2}),f=new ee(new Ue(.1,.05,a*.85),d);f.position.set(-(s.wheelbase+.85)*.5+.12,.95,0),n.add(f);const m=new ee(new Ue(.07,.16,.06),d);m.position.set(-(s.wheelbase+.85)*.5+.12,.86,a*.3),n.add(m);const v=m.clone();v.position.z=-a*.3,n.add(v);const g=new cn({color:16774096}),p=new cn({color:16722749}),b=new cn({color:5902104}),S=[],x=[],w=[],A=(s.wheelbase+.85)*.5;for(const G of[-1,1]){const D=new ee(new Ue(.26,.1,.26),i);D.position.set(A-.45,.82,G*a*.28),n.add(D);const rt=new ee(new Ue(.02,.075,.2),g);rt.position.set(A-.33,.82,G*a*.28),n.add(rt),S.push(rt);const et=new ee(new Ue(.03,.16,.4),p);et.position.set(-A+.05,.62,G*a*.28),n.add(et),x.push(et);const ct=new ee(new Ue(.035,.1,.3),b);if(ct.position.set(-A+.04,.62,G*a*.28),n.add(ct),w.push(ct),t.outline!==!1){const yt=new af(16773324,55,60,.34,.42,1.2);yt.position.set(A-.3,.82,G*a*.26),yt.target.position.set(A+24,.1,G*a*.5),e.add(yt),e.add(yt.target)}}const R=document.createElement("canvas");R.width=256,R.height=128;const C=R.getContext("2d");C.fillStyle=s.accent===16777215?"#1a1d22":"#f4f7ff",C.fillRect(0,0,256,128),C.fillStyle=s.color===16777215?"#1a1d22":"#ff2e63",C.fillRect(0,0,256,26),C.fillStyle="#101423",C.font="bold 34px 'Trebuchet MS', sans-serif",C.textAlign="center",C.fillText("藤原とうふ店",128,66),C.font="bold 18px 'Trebuchet MS', sans-serif",C.fillText("(自家用)",128,96);const y=new Qn(R);y.colorSpace=Re;const M=new cn({map:y});for(const G of[-1,1]){const D=new ee(new Un(.7,.34),M);D.position.set(-.1,.6,G*(a*.5+.012)),D.rotation.y=G>0?0:Math.PI,n.add(D)}const L=new De({color:1382431,roughness:.85,metalness:.1}),N=[],V=[],q=s.track/2,H=s.wheelbase/2;for(const[G,D,rt]of[[H,q,!0],[H,-q,!0],[-H,q,!1],[-H,-q,!1]]){const et=new ve;et.position.set(G,s.wheelRadius,D);const ct=Ov(s,L);et.add(ct),e.add(et),N.push(ct),rt&&V.push(et)}const Y=[];for(const G of[-1,1]){const D=new ve;D.position.set(-H,.06,G*q),e.add(D),Y.push(D)}return{root:e,body:n,wheels:N,steerWheels:V,brakeLights:w,headlights:S,taillights:x,smokeAnchors:Y,dispose(){e.traverse(G=>{const D=G;D.geometry&&D.geometry.dispose();const rt=D.material;Array.isArray(rt)?rt.forEach(et=>et.dispose()):rt?.dispose()}),y.dispose(),e.clear()}}}function kv(){const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255,255,255,0.85)"),n.addColorStop(.45,"rgba(228,232,240,0.42)"),n.addColorStop(1,"rgba(200,208,224,0)"),e.fillStyle=n,e.fillRect(0,0,64,64);const i=new Qn(t);return i.colorSpace=Re,i}function Bv(){const t=document.createElement("canvas");t.width=t.height=32;const e=t.getContext("2d"),n=e.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255,240,190,1)"),n.addColorStop(.4,"rgba(255,170,60,0.7)"),n.addColorStop(1,"rgba(255,90,0,0)"),e.fillStyle=n,e.fillRect(0,0,32,32);const i=new Qn(t);return i.colorSpace=Re,i}class Gv{group=new Dn;smoke=[];sparks=[];smokeMat;sparkMat;smokeTex;sparkTex;skidMesh;skidGeo;skidPositions;skidAlpha;skidIndex=0;skidMax=2400;skidTimer=0;skidLifetime=ie.SKID_FADE_TIME;skidAges;skidDirty=!1;constructor(){this.smokeTex=kv(),this.sparkTex=Bv(),this.smokeMat=new ea({map:this.smokeTex,transparent:!0,depthWrite:!1,opacity:.45,color:14673650,blending:Pi}),this.smokeMat.opacity=.45,this.sparkMat=new ea({map:this.sparkTex,transparent:!0,depthWrite:!1,blending:Xs});for(let i=0;i<ie.SMOKE_POOL;i++){const r=new Jo(this.smokeMat.clone());r.visible=!1,r.scale.setScalar(.6),this.group.add(r),this.smoke.push({mesh:r,life:0,maxLife:1,size:.6,grow:1,vel:new I,active:!1})}for(let i=0;i<40;i++){const r=new Jo(this.sparkMat.clone());r.visible=!1,this.group.add(r),this.sparks.push({mesh:r,life:0,maxLife:1,size:.2,grow:0,vel:new I,active:!1})}this.skidGeo=new Ae,this.skidPositions=new Float32Array(this.skidMax*2*3),this.skidAlpha=new Float32Array(this.skidMax*2),this.skidAges=new Float32Array(this.skidMax),this.skidAges.fill(999),this.skidGeo.setAttribute("position",new be(this.skidPositions,3)),this.skidGeo.setAttribute("alpha",new be(this.skidAlpha,1)),this.skidGeo.getAttribute("alpha").setUsage(zu),this.skidGeo.setDrawRange(0,0);const e=new Ye({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:new Xt(658450)},uFade:{value:this.skidLifetime}},vertexShader:`
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          if (vAlpha <= 0.001) discard;
          gl_FragColor = vec4(uColor, vAlpha * 0.55);
        }
      `});this.skidMesh=new ee(this.skidGeo,e),this.skidMesh.frustumCulled=!1,this.skidMesh.renderOrder=2,this.group.add(this.skidMesh);const n=[];for(let i=0;i<this.skidMax-1;i++){const r=i*2;n.push(r,r+2,r+1,r+1,r+2,r+3)}this.skidGeo.setIndex(n)}spawnSmoke(t,e,n,i){const r=this.smoke.find(o=>!o.active);if(!r)return;r.active=!0,r.life=0,r.maxLife=.75+i*.55,r.size=.5+i*.9,r.grow=1.8+i*1.4,r.mesh.position.set(t+(Math.random()-.5)*.3,e,n+(Math.random()-.5)*.3),r.mesh.scale.setScalar(r.size),r.mesh.visible=!0,r.vel.set((Math.random()-.5)*.8,.55+Math.random()*.5,(Math.random()-.5)*.8);const a=r.mesh.material;a.opacity=.45}spawnSpark(t,e,n,i,r=1){const a=Math.min(8,2+Math.floor(i*6));for(let o=0;o<a;o++){const l=this.sparks.find(c=>!c.active);if(!l)return;l.active=!0,l.life=0,l.maxLife=.22+Math.random()*.3,l.size=.16+Math.random()*.14,l.mesh.position.set(t,e,n),l.mesh.scale.setScalar(l.size),l.mesh.visible=!0,l.vel.set((Math.random()-.5)*5*r,1.2+Math.random()*3.4,(Math.random()-.5)*5),l.mesh.material.opacity=1}}addSkid(t,e,n,i,r,a,o=.22){if(this.skidTimer>0)return;this.skidTimer=.03;const l=Math.cos(a+Math.PI/2)*o,c=Math.sin(a+Math.PI/2)*o,h=this.skidIndex%this.skidMax,u=h*6;this.skidPositions[u+0]=t-l,this.skidPositions[u+1]=r,this.skidPositions[u+2]=e-c,this.skidPositions[u+3]=n+l,this.skidPositions[u+4]=r,this.skidPositions[u+5]=i+c,this.skidAges[h]=0;const d=h*2;this.skidAlpha[d]=1,this.skidAlpha[d+1]=1,this.skidIndex++,this.skidDirty=!0,this.skidGeo.setDrawRange(0,Math.min(this.skidMax,this.skidIndex)*2),this.skidGeo.getAttribute("position").needsUpdate=!0,this.skidGeo.getAttribute("alpha").needsUpdate=!0}update(t){this.skidTimer=Math.max(0,this.skidTimer-t);for(const e of this.smoke){if(!e.active)continue;e.life+=t;const n=e.life/e.maxLife;if(n>=1){e.active=!1,e.mesh.visible=!1;continue}e.mesh.position.x+=e.vel.x*t,e.mesh.position.y+=e.vel.y*t*.7,e.mesh.position.z+=e.vel.z*t,e.vel.multiplyScalar(1-t*1.4),e.mesh.scale.setScalar(e.size+e.grow*n);const i=e.mesh.material;i.opacity=.45*(1-n)*(1-n)}for(const e of this.sparks){if(!e.active)continue;e.life+=t;const n=e.life/e.maxLife;if(n>=1){e.active=!1,e.mesh.visible=!1;continue}e.vel.y-=9.8*t,e.mesh.position.x+=e.vel.x*t,e.mesh.position.y+=e.vel.y*t,e.mesh.position.z+=e.vel.z*t,e.mesh.material.opacity=1-n,e.mesh.scale.setScalar(e.size*(1-n*.5))}if(this.skidIndex>0){let e=this.skidDirty;for(let n=0;n<this.skidMax;n++){if(this.skidAges[n]>this.skidLifetime)continue;this.skidAges[n]+=t;const r=1-Math.min(1,this.skidAges[n]/this.skidLifetime),a=n*2;this.skidAlpha[a]!==r&&(this.skidAlpha[a]=r,this.skidAlpha[a+1]=r,e=!0)}e&&(this.skidGeo.getAttribute("alpha").needsUpdate=!0,this.skidDirty=!1)}}clearSkids(){this.skidIndex=0,this.skidAges.fill(999),this.skidAlpha.fill(0),this.skidGeo.setDrawRange(0,0),this.skidGeo.getAttribute("alpha").needsUpdate=!0}dispose(){for(const t of this.smoke)t.mesh.material.dispose();for(const t of this.sparks)t.mesh.material.dispose();this.smokeMat.dispose(),this.sparkMat.dispose(),this.smokeTex.dispose(),this.sparkTex.dispose(),this.skidMesh.material.dispose(),this.skidGeo.dispose(),this.group.clear()}}const Gr=4;class zv{renderer;sceneRT;brightRT;blurRT;quadScene;quad;brightMat;blurMat;compositeMat;quadCam;width=1;height=1;stats={bloomEnabled:!0,passes:3};constructor(t,e,n){this.renderer=t,this.width=Math.max(1,e),this.height=Math.max(1,n);const i=xs;this.sceneRT=new Fn(this.width,this.height,{type:i,minFilter:Be,magFilter:Be,depthBuffer:!0,stencilBuffer:!1});const r=Math.max(1,Math.floor(this.width/Gr)),a=Math.max(1,Math.floor(this.height/Gr));this.brightRT=new Fn(r,a,{type:i,minFilter:Be,magFilter:Be,depthBuffer:!1}),this.blurRT=new Fn(r,a,{type:i,minFilter:Be,magFilter:Be,depthBuffer:!1}),this.quadCam=new bl(-1,1,1,-1,0,1),this.quadScene=new Th,this.brightMat=new Ye({uniforms:{uTex:{value:this.sceneRT.texture},uThreshold:{value:ie.BLOOM_THRESHOLD},uTexel:{value:new ut(1/this.width,1/this.height)}},vertexShader:ro,fragmentShader:`
        precision highp float;
        uniform sampler2D uTex;
        uniform float uThreshold;
        uniform vec2 uTexel;
        varying vec2 vUv;
        void main() {
          // 4-tap downsample, hanya bagian terang
          vec3 sum = vec3(0.0);
          sum += texture2D(uTex, vUv + vec2(-1.0, -1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2( 1.0, -1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2(-1.0,  1.0) * uTexel).rgb;
          sum += texture2D(uTex, vUv + vec2( 1.0,  1.0) * uTexel).rgb;
          vec3 c = sum * 0.25;
          float l = max(max(c.r, c.g), c.b);
          float k = max(0.0, l - uThreshold) / max(1e-4, l);
          gl_FragColor = vec4(c * k, 1.0);
        }
      `,depthTest:!1,depthWrite:!1}),this.blurMat=new Ye({uniforms:{uTex:{value:this.brightRT.texture},uDir:{value:new ut(1,0)},uTexel:{value:new ut(1/r,1/a)}},vertexShader:ro,fragmentShader:`
        precision highp float;
        uniform sampler2D uTex;
        uniform vec2 uDir;
        uniform vec2 uTexel;
        varying vec2 vUv;
        void main() {
          vec2 step = uDir * uTexel * 1.35;
          vec3 c = texture2D(uTex, vUv).rgb * 0.227027;
          c += texture2D(uTex, vUv + step * 1.3846).rgb * 0.316216;
          c += texture2D(uTex, vUv - step * 1.3846).rgb * 0.316216;
          c += texture2D(uTex, vUv + step * 3.2308).rgb * 0.070270;
          c += texture2D(uTex, vUv - step * 3.2308).rgb * 0.070270;
          gl_FragColor = vec4(c, 1.0);
        }
      `,depthTest:!1,depthWrite:!1}),this.compositeMat=new Ye({uniforms:{uScene:{value:this.sceneRT.texture},uBloom:{value:this.blurRT.texture},uBloomStrength:{value:ie.BLOOM_STRENGTH},uThreshold:{value:ie.BLOOM_THRESHOLD},uTime:{value:0},uSpeed:{value:0},uDrift:{value:0},uCA:{value:0},uVignette:{value:ie.VIGNETTE},uExposure:{value:1.06},uReduceMotion:{value:0},uResolution:{value:new ut(this.width,this.height)}},vertexShader:ro,fragmentShader:`
        precision highp float;
        uniform sampler2D uScene;
        uniform sampler2D uBloom;
        uniform float uBloomStrength;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uDrift;
        uniform float uCA;
        uniform float uVignette;
        uniform float uExposure;
        uniform float uReduceMotion;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // ACES filmic (versi ringkas, sama seperti three)
        vec3 aces(vec3 x) {
          const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
          return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
        }
        vec3 toSrgb(vec3 c) {
          return mix(c * 12.92, 1.055 * pow(max(c, vec3(1e-5)), vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
        }
        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          vec2 uv = vUv;
          vec2 c = uv - 0.5;
          float r = length(c);

          // ---------- chromatic aberration (radial, naik dgn kecepatan) ----------
          vec2 dir = c / max(r, 1e-5);
          float caPx = uCA * (0.25 + r * 1.9);
          vec3 col;
          if (caPx > 0.00002) {
            col.r = texture2D(uScene, uv + dir * caPx).r;
            col.g = texture2D(uScene, uv).g;
            col.b = texture2D(uScene, uv - dir * caPx).b;
          } else {
            col = texture2D(uScene, uv).rgb;
          }

          // ---------- bloom ----------
          vec3 bloom = texture2D(uBloom, uv).rgb;
          col += bloom * uBloomStrength;

          // ---------- radial speed blur di tepi frame ----------
          if (uSpeed > 0.15 && uReduceMotion < 0.5) {
            vec3 blur = vec3(0.0);
            float amt = uSpeed * 0.022;
            for (int i = 0; i < 4; i++) {
              float k = float(i) / 4.0;
              blur += texture2D(uScene, uv - dir * (amt * k * r)).rgb;
            }
            blur *= 0.25;
            float edge = smoothstep(0.34, 0.82, r);
            col = mix(col, blur + bloom * uBloomStrength, edge * min(1.0, uSpeed * 1.4));
          }

          // ---------- tonemap + exposure ----------
          col = aces(col * uExposure);

          // ---------- speed lines anime ----------
          if (uReduceMotion < 0.5) {
            float lines = 0.0;
            if (uSpeed > 0.1) {
              float ang = atan(c.y, c.x);
              float spokes = 40.0;
              float a = ang / 6.28318 * spokes;
              float id = floor(a);
              float seed = hash(id * 1.37 + floor(uTime * 20.0));
              float mask = step(0.74, seed);
              float thin = smoothstep(0.44, 0.0, abs(fract(a) - 0.5));
              float radial = smoothstep(0.14, 0.66, r);
              lines = mask * thin * radial * smoothstep(0.1, 0.45, uSpeed) * 0.9;
            }
            float diag = 0.0;
            if (uDrift > 0.06) {
              float d = fract((uv.x + uv.y * 1.6) * 30.0 + uTime * 3.1);
              diag = smoothstep(0.88, 1.0, d) * smoothstep(0.06, 0.42, uDrift) * 0.45;
              diag *= smoothstep(0.12, 0.42, r);
            }
            col += vec3(0.92, 0.96, 1.0) * (lines + diag);
          }

          // ---------- vignette ----------
          float vig = smoothstep(0.36, 0.95, r) * uVignette;
          col *= 1.0 - vig;

          // ---------- grain halus (film) ----------
          float g = hash(floor(uv.x * uResolution.x) + floor(uv.y * uResolution.y) * 3.17 + floor(uTime * 24.0));
          col += (g - 0.5) * 0.012;

          gl_FragColor = vec4(toSrgb(clamp(col, 0.0, 1.0)), 1.0);
        }
      `,depthTest:!1,depthWrite:!1}),this.quad=new ee(new Un(2,2),this.compositeMat),this.quad.frustumCulled=!1,this.quadScene.add(this.quad)}setSize(t,e){const n=Math.max(1,Math.floor(t)),i=Math.max(1,Math.floor(e));if(n===this.width&&i===this.height)return;this.width=n,this.height=i,this.sceneRT.setSize(n,i);const r=Math.max(1,Math.floor(n/Gr)),a=Math.max(1,Math.floor(i/Gr));this.brightRT.setSize(r,a),this.blurRT.setSize(r,a),this.brightMat.uniforms.uTexel.value.set(1/n,1/i),this.blurMat.uniforms.uTexel.value.set(1/r,1/a),this.compositeMat.uniforms.uResolution.value.set(n,i)}setQuality(t){this.stats.bloomEnabled=t!=="low",this.compositeMat.uniforms.uBloomStrength.value=t==="low"?0:t==="medium"?ie.BLOOM_STRENGTH*.7:ie.BLOOM_STRENGTH}update(t,e,n,i){const r=this.compositeMat.uniforms;r.uTime.value+=t,r.uReduceMotion.value=i?1:0;const a=Math.min(1,e/200);r.uSpeed.value+=(a-r.uSpeed.value)*Math.min(1,t*6),r.uDrift.value+=(n-r.uDrift.value)*Math.min(1,t*7),r.uCA.value=e/ie.CA_REF_KMH*ie.CA_MAX}render(t,e){const n=this.renderer,i=n.getRenderTarget(),r=n.autoClear;n.autoClear=!0,n.setRenderTarget(this.sceneRT),n.clear(),n.render(t,e),this.stats.bloomEnabled?(this.quad.material=this.brightMat,n.setRenderTarget(this.brightRT),n.clear(),n.render(this.quadScene,this.quadCam),this.quad.material=this.blurMat,this.blurMat.uniforms.uTex.value=this.brightRT.texture,this.blurMat.uniforms.uDir.value.set(1,0),n.setRenderTarget(this.blurRT),n.clear(),n.render(this.quadScene,this.quadCam),this.blurMat.uniforms.uTex.value=this.blurRT.texture,this.blurMat.uniforms.uDir.value.set(0,1),n.setRenderTarget(this.brightRT),n.clear(),n.render(this.quadScene,this.quadCam),this.compositeMat.uniforms.uBloom.value=this.brightRT.texture):this.compositeMat.uniforms.uBloomStrength.value=0,this.quad.material=this.compositeMat,n.setRenderTarget(i),n.render(this.quadScene,this.quadCam),n.autoClear=r}dispose(){this.sceneRT.dispose(),this.brightRT.dispose(),this.blurRT.dispose(),this.brightMat.dispose(),this.blurMat.dispose(),this.compositeMat.dispose(),this.quad.geometry.dispose(),this.quadScene.clear()}}const ro=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;class Hv{camera;mode="chase";pos=new I;vel=new I;lookAt=new I;targetFov=ke.FOV_MIN;roll=0;shake=new I;shakeAmp=0;time=0;reduceMotion=!1;constructor(t){this.camera=t}reset(){this.pos.set(0,3,8),this.vel.set(0,0,0),this.lookAt.set(0,0,0),this.roll=0,this.shakeAmp=0}addShake(t){this.reduceMotion||(this.shakeAmp=Math.min(1.6,this.shakeAmp+t*ke.SHAKE_PER_IMPACT*12))}update(t,e,n,i,r,a,o,l,c){this.time+=t;const h=Math.hypot(a,o),u=this.mode==="bumper"?ke.BUMPER_OFFSET:this.mode==="hood"?ke.HOOD_OFFSET:ke.CHASE_OFFSET,d=Math.cos(r),f=Math.sin(r),m=-f,v=d,g=d,p=f,b=e+m*u.x+g*-u.z,S=i+v*u.x+p*-u.z,x=n+u.y,w=ke.CAM_SPRING_K,A=ke.CAM_DAMPING*2*Math.sqrt(w),R=(b-this.pos.x)*w-this.vel.x*A,C=(x-this.pos.y)*w-this.vel.y*A,y=(S-this.pos.z)*w-this.vel.z*A;this.vel.x+=R*t,this.vel.y+=C*t,this.vel.z+=y*t,this.pos.x+=this.vel.x*t,this.pos.y+=this.vel.y*t,this.pos.z+=this.vel.z*t,(!Number.isFinite(this.pos.x)||!Number.isFinite(this.pos.y)||!Number.isFinite(this.pos.z))&&(this.pos.set(b,x,S),this.vel.set(0,0,0));const M=h>1.2?1/h:0,L=6+Math.min(10,h*.28),N=e+(a*M||g)*L,V=i+(o*M||p)*L;this.lookAt.x+=(N-this.lookAt.x)*Math.min(1,t*9),this.lookAt.z+=(V-this.lookAt.z)*Math.min(1,t*9),this.lookAt.y+=(n+.75-this.lookAt.y)*Math.min(1,t*6);const q=this.reduceMotion?0:Math.max(-ke.DRIFT_ROLL_MAX,Math.min(ke.DRIFT_ROLL_MAX,l*ke.DRIFT_ROLL_PER_SLIP));this.roll+=(q-this.roll)*Math.min(1,t*5),this.shakeAmp=Math.max(0,this.shakeAmp-t*2.6);const H=this.shakeAmp*this.shakeAmp;this.shake.set(Math.sin(this.time*41.7)*.09*H,Math.cos(this.time*33.3)*.07*H,Math.sin(this.time*28.9)*.06*H),this.camera.position.set(this.pos.x+this.shake.x,this.pos.y+this.shake.y,this.pos.z+this.shake.z),this.camera.up.set(Math.sin(this.roll),Math.cos(this.roll),0),this.camera.lookAt(this.lookAt);const Y=ke.FOV_MIN+(ke.FOV_MAX-ke.FOV_MIN)*Math.min(1,c/190);this.targetFov+=(Y-this.targetFov)*ke.FOV_LERP,this.camera.fov+=(this.targetFov-this.camera.fov)*.12,this.camera.updateProjectionMatrix()}snapTo(t,e,n,i,r,a){this.pos.set(t,e,n),this.vel.set(0,0,0),this.lookAt.set(i,r,a),this.camera.position.set(t,e,n),this.camera.up.set(0,1,0),this.camera.lookAt(i,r,a)}}const $c=6.2;class Vv{active=!1;t=0;overlay;ctx;onDone=null;camPos=new I;camLook=new I;carPos=new I;carYaw=0;constructor(t){this.overlay=document.createElement("canvas"),this.overlay.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:19;opacity:0;transition:opacity .4s ease",t.appendChild(this.overlay),this.ctx=this.overlay.getContext("2d")}get isActive(){return this.active}start(t,e,n){this.active=!0,this.t=0,this.carPos.copy(t),this.carYaw=e,this.onDone=n,this.overlay.style.opacity="1",this.resize()}resize(){const t=Math.min(window.devicePixelRatio||1,2);this.overlay.width=Math.max(1,Math.floor(window.innerWidth*t)),this.overlay.height=Math.max(1,Math.floor(window.innerHeight*t))}skip(){this.active&&this.finish()}finish(){this.active=!1,this.overlay.style.opacity="0",this.ctx.clearRect(0,0,this.overlay.width,this.overlay.height);const t=this.onDone;this.onDone=null,t?.()}update(t,e){if(!this.active)return!1;this.t+=t;const n=Math.min(1,this.t/$c),i=-.85+n*2.6,r=5.6-Math.sin(n*Math.PI)*1.6,a=this.carYaw+i,o=this.carPos.x+Math.cos(a)*r,l=this.carPos.z+Math.sin(a)*r,c=this.carPos.y+.55+Math.sin(n*Math.PI*.9)*1.5;this.camPos.set(o,c,l),this.camLook.set(this.carPos.x,this.carPos.y+.72,this.carPos.z),e.position.copy(this.camPos),e.up.set(0,1,0),e.lookAt(this.camLook);const h=46+Math.sin(n*Math.PI)*12;return e.fov=h,e.updateProjectionMatrix(),this.drawOverlay(n),this.t>=$c?(this.finish(),!1):!0}drawOverlay(t){const e=this.ctx,n=this.overlay.width,i=this.overlay.height;e.clearRect(0,0,n,i);const r=Math.min(1,t*3)*(1-Math.max(0,(t-.82)*5.5));e.strokeStyle=`rgba(220,235,255,${.13*r})`,e.lineWidth=Math.max(1,n*.0016);for(let u=0;u<26;u++){const f=u*97.31%1*n;e.beginPath(),e.moveTo(f,0),e.lineTo(f-i*.55,i),e.stroke()}e.save(),e.globalAlpha=r;const a=Math.round(Math.min(n,i)*.052);e.font=`600 ${a}px "Hiragino Mincho ProN", "Yu Mincho", serif`,e.fillStyle="rgba(235,245,255,0.92)",e.textAlign="center";const o=["群","馬","峠","夜","走"],l=n*.88,c=i*.2;for(let u=0;u<o.length;u++)e.fillText(o[u],l,c+u*a*1.12);e.restore();const h=Math.max(0,Math.min(1,(t-.35)*4))*Math.max(0,1-(t-.9)*8);h>.01&&(e.save(),e.globalAlpha=h,e.textAlign="center",e.fillStyle="#ffffff",e.font=`900 ${Math.round(Math.min(n*.06,i*.085))}px "Trebuchet MS", sans-serif`,e.shadowColor="rgba(255,46,99,0.75)",e.shadowBlur=32,e.fillText("GUNMA DOWNHILL",n/2,i*.52),e.shadowBlur=0,e.fillStyle="#ff2e63",e.font=`700 ${Math.round(Math.min(n*.024,i*.032))}px "Trebuchet MS", sans-serif`,e.fillText("EUROBEAT DRIFT LEGEND",n/2,i*.52+i*.075),e.restore()),e.save(),e.globalAlpha=.5*r,e.textAlign="right",e.fillStyle="#cfe0ff",e.font=`600 ${Math.round(Math.min(n*.013,16))}px "Trebuchet MS", sans-serif`,e.fillText("Tekan tombol apa pun untuk skip",n-24,i-24),e.restore()}dispose(){this.overlay.remove()}}class Wv{root;speedEl;rpmCanvas;rpmCtx;gearEl;driftFill;driftLabel;driftPoints;driftMult;gapEl;timeEl;mapCanvas;mapCtx;nowTitle;nowBpm;toastEl;roleEl;countdownEl;mapPath=null;mapBounds={minX:0,maxX:1,minZ:0,maxZ:1};toastTimer=0;lastCountdown=-1;constructor(t){this.root=document.createElement("div"),this.root.className="hud hidden",this.root.innerHTML=`
      <canvas class="hud-map" width="300" height="300"></canvas>
      <div class="hud-now"><b>—</b><span>— BPM</span></div>
      <div class="hud-gap"><span class="arrow">▲</span><span class="val">+0.000</span></div>
      <div class="hud-time"><div class="lbl">WAKTU</div><div class="val">0:00.000</div></div>
      <div class="hud-drift">
        <div class="drift-label"></div>
        <div class="drift-bar"><div class="drift-fill"></div></div>
        <div class="row between" style="margin-top:6px">
          <span class="drift-points">0</span>
          <span class="drift-mult">x1.0</span>
        </div>
      </div>
      <div class="hud-speed">
        <canvas class="rpm-arc" width="420" height="68"></canvas>
        <div class="digit">0</div>
        <div class="gear-row"><span class="unit">KM/H</span><span class="gear">1</span></div>
      </div>
      <div class="hud-toast"></div>
      <div class="hud-role"></div>
      <div class="countdown hidden"></div>`,t.appendChild(this.root),this.speedEl=this.root.querySelector(".digit"),this.rpmCanvas=this.root.querySelector(".rpm-arc"),this.rpmCtx=this.rpmCanvas.getContext("2d"),this.gearEl=this.root.querySelector(".gear"),this.driftFill=this.root.querySelector(".drift-fill"),this.driftLabel=this.root.querySelector(".drift-label"),this.driftPoints=this.root.querySelector(".drift-points"),this.driftMult=this.root.querySelector(".drift-mult"),this.gapEl=this.root.querySelector(".hud-gap"),this.timeEl=this.root.querySelector(".hud-time .val"),this.mapCanvas=this.root.querySelector(".hud-map"),this.mapCtx=this.mapCanvas.getContext("2d"),this.nowTitle=this.root.querySelector(".hud-now b"),this.nowBpm=this.root.querySelector(".hud-now span"),this.toastEl=this.root.querySelector(".hud-toast"),this.roleEl=this.root.querySelector(".hud-role"),this.countdownEl=this.root.querySelector(".countdown"),this.driftLabel.textContent=""}setTrack(t){const e=t.points.length;let n=1/0,i=-1/0,r=1/0,a=-1/0;for(const l of t.points)n=Math.min(n,l.x),i=Math.max(i,l.x),r=Math.min(r,l.z),a=Math.max(a,l.z);this.mapBounds={minX:n,maxX:i,minZ:r,maxZ:a};const o=new Path2D;for(let l=0;l<e;l+=4){const c=t.points[l],[h,u]=this.mapProject(c.x,c.z);l===0?o.moveTo(h,u):o.lineTo(h,u)}this.mapPath=o}mapProject(t,e){const n=this.mapBounds,i=22,r=300,a=Math.max(1,n.maxX-n.minX),o=Math.max(1,n.maxZ-n.minZ),l=Math.min((r-i*2)/a,(r-i*2)/o);return[i+(t-n.minX)*l,r-i-(e-n.minZ)*l]}show(){this.root.classList.remove("hidden")}hide(){this.root.classList.add("hidden"),this.countdownEl.classList.add("hidden")}toast(t,e=2600){this.toastEl.textContent=t,this.toastEl.classList.add("show"),this.toastTimer=e/1e3}setRole(t){this.roleEl.textContent=t}update(t,e,n){this.speedEl.textContent=String(Math.round(e.speedKmh)),this.gearEl.textContent=e.speedKmh<1?"N":String(e.gear);const i=this.rpmCtx,r=this.rpmCanvas.width,a=this.rpmCanvas.height;i.clearRect(0,0,r,a);const o=Math.max(0,Math.min(1,(e.rpm-900)/7300));i.lineWidth=10,i.lineCap="round",i.strokeStyle="rgba(30,44,70,0.85)",i.beginPath(),i.arc(r/2,a+8,r/2-14,Math.PI*1.06,Math.PI*1.94),i.stroke();const l=i.createLinearGradient(0,0,r,0);l.addColorStop(0,"#21e6c1"),l.addColorStop(.68,"#7f9fff"),l.addColorStop(.86,"#ffb703"),l.addColorStop(1,"#ff2e63"),i.strokeStyle=l,i.beginPath(),i.arc(r/2,a+8,r/2-14,Math.PI*1.06,Math.PI*(1.06+.88*o)),i.stroke(),i.strokeStyle="rgba(255,46,99,0.85)",i.lineWidth=3;const c=Math.PI*(1.06+.88*.86);i.beginPath(),i.arc(r/2,a+8,r/2-14,c,Math.PI*1.94),i.stroke();const h=Math.min(100,e.driftPoints%5e3/50);if(this.driftFill.style.width=`${h}%`,this.driftFill.style.opacity=e.driftIntensity>.05?"1":"0.7",this.driftLabel.textContent=e.driftLabel,this.driftLabel.style.color=e.driftLabel==="PERFECT!"?"#ff2e63":e.driftLabel==="GREAT!"?"#ffb703":"#21e6c1",this.driftPoints.textContent=String(e.driftPoints),this.driftMult.textContent=`x${e.multiplier.toFixed(1)}`,e.hasRival){this.gapEl.style.display="";const u=e.gapSeconds,d=u>=0;this.gapEl.classList.toggle("ahead",d),this.gapEl.classList.toggle("behind",!d);const f=this.gapEl.querySelector(".arrow");f.textContent=(e.colorblindSafe,d?"▲":"▼");const m=this.gapEl.querySelector(".val");m.textContent=`${d?"+":"−"}${Math.abs(u).toFixed(3)}`}else this.gapEl.style.display="none";this.timeEl.textContent=e.timeText,this.nowTitle.textContent=e.trackTitle,this.nowBpm.textContent=`${e.bpm} BPM · POS ${e.position}/${e.totalRacers}`,this.drawMap(n),Math.ceil(this.countdown),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&this.toastEl.classList.remove("show"))}countdown=0;setCountdown(t){if(this.countdown=t,t<=0){if(this.lastCountdown!==0){this.countdownEl.textContent="GO!",this.countdownEl.className="countdown";const n=document.createElement("span");n.className="go",n.textContent="GO!",this.countdownEl.innerHTML="",this.countdownEl.appendChild(n),this.lastCountdown=0,window.setTimeout(()=>{this.lastCountdown===0&&this.countdownEl.classList.add("hidden")},900)}return}if(this.lastCountdown===t)return;this.lastCountdown=t,this.countdownEl.className="countdown";const e=document.createElement("span");e.textContent=String(t),this.countdownEl.innerHTML="",this.countdownEl.appendChild(e)}showCountdown(){this.countdownEl.classList.remove("hidden")}drawMap(t){const e=this.mapCtx,n=this.mapCanvas.width;if(e.clearRect(0,0,n,n),!!this.mapPath){e.lineWidth=4,e.strokeStyle="rgba(110,150,210,0.28)",e.stroke(this.mapPath),e.lineWidth=2,e.strokeStyle="rgba(140,190,255,0.6)",e.stroke(this.mapPath);for(const i of t){const[r,a]=this.mapProject(i.x,i.z);e.beginPath(),e.arc(r,a,i.isPlayer?6:4.5,0,Math.PI*2),e.fillStyle=`#${i.color.toString(16).padStart(6,"0")}`,e.fill(),i.isPlayer&&(e.lineWidth=2,e.strokeStyle="#ffffff",e.stroke())}}}}class Xv{root;save;cb;screens=new Map;constructor(t,e,n){this.root=document.createElement("div"),this.root.className="screen hidden",this.root.id="menu-root",t.appendChild(this.root),this.save=e,this.cb=n,this.buildMenu(),this.buildGarage(),this.buildSettings(),this.buildControls(),this.buildCredits()}show(t){if(!t){this.root.classList.add("hidden");return}this.root.classList.remove("hidden");for(const[e,n]of this.screens)n.classList.toggle("hidden",e!==t);t==="garage"&&this.refreshGarage(),t==="settings"&&this.refreshSettings(),this.cb.onOpen(t)}screenEl(t){const e=document.createElement("div");return e.className="panel pad scroll",e.style.maxWidth="980px",e.style.margin="0 auto",e.style.width="100%",e.style.maxHeight="calc(100% - 40px)",this.root.appendChild(e),this.screens.set(t,e),e}hook(t){t?.addEventListener("pointerenter",()=>this.cb.onHover())}buildMenu(){const t=this.screenEl("menu");t.innerHTML=`
      <h2 class="screen-title">EUROBEAT DRIFT LEGEND</h2>
      <p class="screen-sub">Gunma Downhill · malam · 5.06 km</p>
      <div class="menu-grid"></div>
      <div class="row between" style="margin-top:18px;font-size:11px;letter-spacing:.1em;color:var(--dim)">
        <span id="menu-cash">¥0</span>
        <span id="menu-progress">0/6 week</span>
      </div>`;const e=t.querySelector(".menu-grid"),n=[{label:"Downhill Battle",tag:"1 rival · menang di finish",action:()=>this.startRace("downhill")},{label:"Uphill Battle",tag:"jalur terbalik · rival lebih kuat",action:()=>this.startRace("uphill")},{label:"Time Attack",tag:"sendirian · lawan waktu",action:()=>this.startRace("timeattack")},{label:"Tofu Delivery",tag:"santai · jangan tumpah",action:()=>this.startRace("tofu")},{label:"Garage",tag:"mobil & upgrade",action:()=>this.show("garage")},{label:"Settings",tag:"volume · kualitas · aksesibilitas",action:()=>this.show("settings")},{label:"Kontrol",tag:"keyboard · gamepad · touch",action:()=>this.show("controls")},{label:"Credits",tag:"tentang game ini",action:()=>this.show("credits")}];for(const i of n){const r=document.createElement("button");r.className="btn menu-item",r.innerHTML=`<span>${i.label}</span><span class="tag">${i.tag}</span>`,r.addEventListener("click",()=>{this.cb.onConfirm(),i.action()}),this.hook(r),e.appendChild(r)}}startRace(t){const e=this.save.data.progress.rivalsBeaten,n=fi.find(i=>!e.includes(i.id))??fi[0];this.cb.onStartRace(t,n.id)}refreshMenu(){const t=this.screens.get("menu");if(!t)return;const e=t.querySelector("#menu-cash"),n=t.querySelector("#menu-progress");e&&(e.textContent=`¥${this.save.data.progress.cash.toLocaleString("id-ID")}`),n&&(n.textContent=`${this.save.data.progress.weeksCleared.length}/6 week`)}selectedCar="hachi86";buildGarage(){const t=this.screenEl("garage");t.innerHTML=`
      <h2 class="screen-title">Garage</h2>
      <p class="screen-sub">Pilih mobil · upgrade dengan cuan</p>
      <div class="garage-wrap">
        <div>
          <div class="car-list"></div>
          <div class="row between" style="margin-top:10px">
            <span style="font-size:12px;color:var(--dim)">Cuan: <b id="g-cash">¥0</b></span>
            <button class="btn btn-sm" data-act="back">Kembali</button>
          </div>
        </div>
        <div class="panel pad" style="background:rgba(8,13,28,.5)">
          <div id="g-detail"></div>
        </div>
      </div>`,t.querySelector('[data-act="back"]').addEventListener("click",()=>{this.cb.onBack(),this.show("menu")})}refreshGarage(){const t=this.screens.get("garage");if(!t)return;this.selectedCar=this.save.data.progress.selectedCar;const e=t.querySelector(".car-list");e.innerHTML="";for(const i of Al){const r=this.save.data.progress.unlockedCars.includes(i.id),a=document.createElement("div");a.className=`car-card${i.id===this.selectedCar?" sel":""}${r?"":" locked"}`,a.innerHTML=`
        <span class="car-swatch" style="background:#${i.color.toString(16).padStart(6,"0")}"></span>
        <div class="car-meta">
          <b>${i.name}</b>
          <span>${i.subtitle}${r?"":" · TERKUNCI"}</span>
        </div>`,r&&(a.addEventListener("click",()=>{this.cb.onConfirm(),this.selectedCar=i.id,this.save.updateProgress({selectedCar:i.id}),this.cb.onSelectCar(i.id),this.refreshGarage()}),this.hook(a)),e.appendChild(a)}const n=t.querySelector("#g-cash");n&&(n.textContent=`¥${this.save.data.progress.cash.toLocaleString("id-ID")}`),this.renderDetail(t.querySelector("#g-detail"))}renderDetail(t){const e=nl(this.selectedCar),n=this.save.data.progress.upgrades[e.id]??{tire:0,susp:0,lsd:0,engine:0},i=this.save.data.progress.cash,r=this.save.data.progress.unlockedCars.includes(e.id),a=(l,c,h=100)=>`
      <div class="stat-row">
        <span>${l}</span>
        <span class="stat-bar"><i style="width:${Math.min(100,c/h*100)}%"></i></span>
        <span style="text-align:right">${Math.round(c)}</span>
      </div>`,o=(l,c)=>{const h=n[l],u=Xh(h),d=Array.from({length:4},(f,m)=>`<i class="${m<h?"on":""}"></i>`).join("");return`<div class="upg-row">
        <span>${c}</span>
        <span class="upg-dots">${d}</span>
        <button class="btn btn-sm" data-upg="${l}" ${h>=4||i<u||!r?"disabled":""}>
          ${h>=4?"MAX":`¥${u.toLocaleString("id-ID")}`}
        </button>
      </div>`};t.innerHTML=`
      <h3 style="margin:0 0 2px;font-size:18px;letter-spacing:.06em">${e.name}</h3>
      <p style="margin:0 0 12px;font-size:11px;color:var(--dim);letter-spacing:.08em">${e.subtitle}</p>
      ${a("POWER",e.powerHp/260*100+n.engine*6)}
      ${a("GRIP",(e.gripScale-.9)*400+n.tire*8)}
      ${a("DRIFT",e.driftBias*60+n.lsd*7)}
      ${a("BERAT",100-(e.mass-900)/5)}
      <div style="margin:14px 0 6px;font-size:11px;letter-spacing:.18em;color:var(--dim)">UPGRADE</div>
      ${o("tire","Ban")}
      ${o("susp","Suspensi")}
      ${o("lsd","LSD")}
      ${o("engine","Mesin")}
      <p style="margin-top:12px;font-size:10px;color:var(--dim);line-height:1.5">
        Ban → grip belok. Suspensi → transfer berat. LSD → sudut drift. Mesin → tenaga.
      </p>`;for(const l of["tire","susp","lsd","engine"])t.querySelector(`[data-upg="${l}"]`)?.addEventListener("click",()=>{this.cb.onConfirm(),this.cb.onBuyUpgrade(e.id,l),this.refreshGarage()})}buildSettings(){const t=this.screenEl("settings");t.innerHTML=`<h2 class="screen-title">Settings</h2><p class="screen-sub">Semua tersimpan otomatis</p><div id="s-body"></div>
      <div class="row" style="margin-top:14px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`,t.querySelector('[data-act="back"]').addEventListener("click",()=>{this.cb.onBack(),this.show("menu")})}refreshSettings(){const t=this.screens.get("settings");if(!t)return;const e=this.save.data.settings,n=t.querySelector("#s-body"),i=(o,l)=>`
      <div class="setting"><label>${l}</label>
        <input type="range" min="0" max="100" value="${Math.round(e[o]*100)}" data-slider="${o}" />
        <span style="width:38px;text-align:right">${Math.round(e[o]*100)}%</span>
      </div>`,r=(o,l,c)=>`
      <div class="setting"><label>${l}</label>
        <div class="pill-row">${c.map(h=>`<button class="pill${e[o]===h.v?" sel":""}" data-pill="${o}" data-v="${h.v}">${h.l}</button>`).join("")}</div>
      </div>`,a=(o,l)=>`
      <div class="setting"><label>${l}</label>
        <button class="pill${e[o]?" sel":""}" data-toggle="${o}">${e[o]?"ON":"OFF"}</button>
      </div>`;n.innerHTML=`
      ${i("masterVolume","Volume master")}
      ${i("musicVolume","Volume musik")}
      ${i("sfxVolume","Volume efek")}
      ${r("quality","Kualitas grafis",[{v:"low",l:"LOW"},{v:"medium",l:"MED"},{v:"high",l:"HIGH"}])}
      ${r("cameraMode","Kamera",[{v:"chase",l:"CHASE"},{v:"bumper",l:"BUMPER"},{v:"hood",l:"HOOD"}])}
      ${i("cameraSensitivity","Sensitivitas kamera")}
      ${i("hudScale","Skala HUD")}
      ${a("invertSteer","Invert setir")}
      ${a("subtitles","Subtitle dialog")}
      ${a("reduceMotion","Kurangi gerakan")}
      ${a("colorblindSafe","Mode buta warna")}
      <div style="margin-top:16px;display:flex;gap:8px">
        <button class="btn btn-sm" data-act="reset-save">Reset save</button>
        <span style="font-size:10px;color:var(--dim);align-self:center">
          ${this.save.isAvailable?"localStorage aktif":"localStorage tidak tersedia — progres tidak tersimpan"}
        </span>
      </div>`;for(const o of Array.from(n.querySelectorAll("[data-slider]")))o.addEventListener("input",()=>{const l=o.dataset.slider,c=Number(o.value)/100,h=o.nextElementSibling;h&&(h.textContent=`${Math.round(c*100)}%`),this.cb.onSettingsChange({[l]:c})});for(const o of Array.from(n.querySelectorAll("[data-pill]")))o.addEventListener("click",()=>{const l=o.dataset.pill,c=o.dataset.v;this.cb.onConfirm(),this.cb.onSettingsChange({[l]:c}),this.refreshSettings()});for(const o of Array.from(n.querySelectorAll("[data-toggle]")))o.addEventListener("click",()=>{const l=o.dataset.toggle;this.cb.onConfirm(),this.cb.onSettingsChange({[l]:!this.save.data.settings[l]}),this.refreshSettings()});n.querySelector('[data-act="reset-save"]')?.addEventListener("click",()=>{this.save.resetAll(),this.refreshSettings(),this.refreshMenu()})}buildControls(){const t=this.screenEl("controls");t.innerHTML=`
      <h2 class="screen-title">Kontrol</h2>
      <p class="screen-sub">Keyboard (layout-independent) · gamepad · touch</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:12px;line-height:2">
        <div>
          <div><span class="kbd">W</span><span class="kbd">↑</span> Gas</div>
          <div><span class="kbd">S</span><span class="kbd">↓</span> Rem</div>
          <div><span class="kbd">A</span><span class="kbd">D</span> / <span class="kbd">←</span><span class="kbd">→</span> Setir</div>
          <div><span class="kbd">SPACE</span> Handbrake / drift</div>
          <div><span class="kbd">C</span> Ganti kamera</div>
          <div><span class="kbd">R</span> Restart race</div>
          <div><span class="kbd">ESC</span> Pause</div>
        </div>
        <div>
          <div><b>Gamepad</b> (deadzone ${Math.round(.12*100)}%)</div>
          <div>RT gas · LT rem · A konfirmasi</div>
          <div>X handbrake · Y kamera · START pause</div>
          <div style="margin-top:10px"><b>Touch</b></div>
          <div>Kiri: setir · Kanan: gas/rem · Drift besar di tengah</div>
          <div style="margin-top:14px;font-size:10px;color:var(--dim)">
            Input memakai <code>event.code</code>, jadi aman untuk QWERTY, AZERTY, dan layout lain.
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:16px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`,t.querySelector('[data-act="back"]').addEventListener("click",()=>{this.cb.onBack(),this.show("menu")})}buildCredits(){const t=this.screenEl("credits");t.innerHTML=`
      <h2 class="screen-title">Credits</h2>
      <p class="screen-sub">100% prosedural · tanpa aset eksternal</p>
      <div style="font-size:12px;line-height:1.9;max-width:620px">
        <p><b>EUROBEAT DRIFT LEGEND — Gunma Downhill</b><br/>
        Arcade drift racer sebagai penghormatan pada budaya touge Jepang dan anime
        balap 90-an. Semua mobil, sirkuit, karakter, musik, dan suara dibuat
        secara prosedural di dalam game.</p>
        <p>Mesin: Three.js (WebGL2) · Web Audio API · Vite + TypeScript.<br/>
        Tanpa file .glb/.mp3/.png eksternal. Semua mesh dari geometri,
        semua tekstur dari canvas/shader, semua audio dari oscillator,
        noise buffer, dan impulse response sintetis.</p>
        <p style="color:var(--dim);font-size:11px">
        Semua nama mobil fiktif (HACHI 86, FD-7 SAVANNA, EK-9 TYPE-R, NISSAN-KAI S13).
        Musik orisinal, bukan lagu Eurobeat berlisensi. Untuk tujuan demonstrasi
        teknis dan nostalgia.</p>
        <p style="font-size:11px;color:var(--dim)">
        Nilai tuning aktif: μ=${Ft.TIRE_PEAK_MU} · yaw inject=${Ft.HANDBRAKE_YAW_INJECT}
        · countersteer=${Ft.COUNTERSTEER_DAMPING} · AI skill=${oi.AI_SKILL_BASE}
        · kamera k=${ke.CAM_SPRING_K} · BPM=${Ze.BPM_BASE}</p>
      </div>
      <div class="row" style="margin-top:16px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`,t.querySelector('[data-act="back"]').addEventListener("click",()=>{this.cb.onBack(),this.show("menu")})}}const ao={RYO:{skin:"#e8b98f",hair:"#151a24",hairStyle:"spike",eye:"#ffd400",jacket:"#2a1c14",accessory:"headband"},KENJI:{skin:"#dcae83",hair:"#241a12",hairStyle:"short",eye:"#5b9bff",jacket:"#132a52",accessory:"bandana"},AYU:{skin:"#f0c8a4",hair:"#3a2430",hairStyle:"long",eye:"#21e6c1",jacket:"#3a1030",accessory:"none"},PLAYER:{skin:"#e6b78d",hair:"#181c26",hairStyle:"short",eye:"#eaf2ff",jacket:"#1b2130",accessory:"none"}},qv=40;class Yv{root;portrait;nameEl;textEl;hintEl;queue=[];active=!1;fullText="";shown=0;timer=0;onBlip;subtitles=!0;constructor(t,e={}){this.onBlip=e.onBlip,this.root=document.createElement("div"),this.root.className="dialog-wrap panel hidden",this.root.innerHTML=`
      <canvas class="dialog-portrait" width="216" height="216"></canvas>
      <div class="dialog-body">
        <div class="dialog-name"></div>
        <div class="dialog-text"></div>
        <div class="dialog-hint">SPACE / TAP untuk lanjut</div>
      </div>`,t.appendChild(this.root),this.portrait=this.root.querySelector("canvas"),this.nameEl=this.root.querySelector(".dialog-name"),this.textEl=this.root.querySelector(".dialog-text"),this.hintEl=this.root.querySelector(".dialog-hint")}setSubtitles(t){this.subtitles=t,!t&&this.active&&(this.textEl.textContent="")}get isActive(){return this.active}get hasQueue(){return this.queue.length>0}say(t,e){this.queue.push({speaker:t,text:e}),this.active||this.advance()}sayMany(t,e){for(const n of e)this.queue.push({speaker:t,text:n});this.active||this.advance()}advance(){const t=this.queue.shift();if(!t){this.hide();return}this.active=!0,this.root.classList.remove("hidden"),this.fullText=t.text,this.shown=0,this.timer=0,this.nameEl.textContent=t.speaker,this.nameEl.style.color=ao[t.speaker]?.eye??"#21e6c1",this.drawPortrait(t.speaker)}hide(){this.active=!1,this.root.classList.add("hidden")}skip(){if(this.active){if(this.shown<this.fullText.length){this.shown=this.fullText.length,this.textEl.textContent=this.fullText;return}this.advance()}}update(t){if(!this.active||!this.subtitles)return;if(this.shown>=this.fullText.length){this.hintEl.style.opacity="1";return}this.hintEl.style.opacity="0.45",this.timer+=t;const e=Math.min(this.fullText.length,Math.floor(this.timer*qv));if(e>this.shown){const n=this.shown;this.shown=e,this.textEl.textContent=this.fullText.slice(0,this.shown),this.shown-n>0&&Math.floor(this.shown/3)>Math.floor(n/3)&&this.onBlip?.()}}drawPortrait(t){const e=ao[t]??ao.PLAYER,n=this.portrait,i=n.getContext("2d"),r=n.width,a=n.height;i.clearRect(0,0,r,a);const o=i.createLinearGradient(0,0,0,a);if(o.addColorStop(0,"#111a2c"),o.addColorStop(1,"#070b14"),i.fillStyle=o,i.fillRect(0,0,r,a),i.fillStyle=e.jacket,i.beginPath(),i.moveTo(r*.1,a),i.quadraticCurveTo(r*.2,a*.72,r*.38,a*.68),i.lineTo(r*.62,a*.68),i.quadraticCurveTo(r*.8,a*.72,r*.9,a),i.closePath(),i.fill(),i.fillStyle="rgba(255,255,255,0.1)",i.beginPath(),i.moveTo(r*.42,a*.68),i.lineTo(r*.5,a*.82),i.lineTo(r*.58,a*.68),i.closePath(),i.fill(),i.fillStyle=e.skin,i.beginPath(),i.ellipse(r*.5,a*.45,r*.17,a*.21,0,0,Math.PI*2),i.fill(),i.fillRect(r*.44,a*.62,r*.12,a*.1),i.fillStyle=e.hair,e.hairStyle==="spike"){i.beginPath(),i.moveTo(r*.32,a*.43);for(let l=0;l<7;l++){const c=r*(.33+l*.055),h=a*(.2+(l%2===0?0:.045));i.lineTo(c,h),i.lineTo(c+r*.03,a*.35)}i.lineTo(r*.68,a*.43),i.quadraticCurveTo(r*.5,a*.28,r*.32,a*.43),i.fill()}else e.hairStyle==="long"?(i.beginPath(),i.moveTo(r*.31,a*.72),i.quadraticCurveTo(r*.26,a*.36,r*.5,a*.24),i.quadraticCurveTo(r*.74,a*.36,r*.69,a*.72),i.lineTo(r*.64,a*.66),i.quadraticCurveTo(r*.5,a*.5,r*.36,a*.66),i.closePath(),i.fill()):(i.beginPath(),i.moveTo(r*.31,a*.48),i.quadraticCurveTo(r*.3,a*.25,r*.5,a*.24),i.quadraticCurveTo(r*.7,a*.25,r*.69,a*.48),i.quadraticCurveTo(r*.62,a*.34,r*.5,a*.35),i.quadraticCurveTo(r*.38,a*.36,r*.31,a*.48),i.fill());e.accessory==="headband"?(i.fillStyle="#ff2e63",i.fillRect(r*.3,a*.34,r*.4,a*.045)):e.accessory==="bandana"&&(i.fillStyle="#21a1c1",i.beginPath(),i.moveTo(r*.3,a*.33),i.lineTo(r*.7,a*.33),i.lineTo(r*.66,a*.39),i.lineTo(r*.34,a*.39),i.closePath(),i.fill()),i.fillStyle="#f7fbff";for(const l of[-.062,.062])i.beginPath(),i.ellipse(r*(.5+l),a*.44,r*.036,a*.026,0,0,Math.PI*2),i.fill();i.fillStyle=e.eye;for(const l of[-.062,.062])i.beginPath(),i.ellipse(r*(.5+l),a*.442,r*.019,a*.022,0,0,Math.PI*2),i.fill();i.fillStyle="#05070d";for(const l of[-.062,.062])i.beginPath(),i.ellipse(r*(.5+l),a*.443,r*.008,a*.014,0,0,Math.PI*2),i.fill();i.strokeStyle=e.hair,i.lineWidth=r*.014,i.lineCap="round";for(const[l,c,h,u]of[[.4,.395,.47,.4],[.53,.4,.6,.395]])i.beginPath(),i.moveTo(r*l,a*c),i.lineTo(r*h,a*u),i.stroke();i.strokeStyle="rgba(40,20,10,0.5)",i.lineWidth=r*.01,i.beginPath(),i.moveTo(r*.5,a*.47),i.lineTo(r*.492,a*.51),i.stroke(),i.beginPath(),i.moveTo(r*.455,a*.56),i.lineTo(r*.545,a*.56),i.stroke(),i.strokeStyle="rgba(120,170,255,0.07)",i.lineWidth=2;for(let l=-a;l<r;l+=14)i.beginPath(),i.moveTo(l,0),i.lineTo(l+a,a),i.stroke()}}class Kv{constructor(t,e){this.cb=e,this.root=document.createElement("div"),this.root.className="screen hidden",this.root.style.zIndex="30",this.root.style.alignItems="center",this.root.style.justifyContent="center",t.appendChild(this.root)}cb;root;timer=0;timeoutS=60;visible=!1;get isVisible(){return this.visible}show(t,e){this.visible=!0,this.timer=0;const n=t.totalRacers>1?t.position:1,i=t.totalRacers===1?"TIME ATTACK SELESAI":t.won?"KAMU MENANG!":"KALAH — COBA LAGI",r=t.entries.map((o,l)=>`<tr class="${o.isPlayer?"me":""}">
          <td>${l+1}. ${o.name}</td>
          <td>${o.finished?Yr((o.finishTime??0)*1e3):`${Math.round(o.progress)} m`}</td>
        </tr>`).join(""),a=e===null?"—":Yr(e)+(t.timeMs<=e?" · NEW!":"");this.root.innerHTML=`
      <div class="panel results-card">
        <div class="results-rank">${t.totalRacers>1?`P${n}`:`${(t.timeMs/1e3).toFixed(2)}s`}</div>
        <div class="results-headline">${i}</div>
        <table class="results-table">
          <tr><td>Waktu</td><td>${Yr(t.timeMs)}</td></tr>
          <tr><td>Best time</td><td>${a}</td></tr>
          <tr><td>Drift score</td><td>${t.driftPoints.toLocaleString("id-ID")}</td></tr>
          <tr><td>Drift terbaik</td><td>${t.bestDrift.toLocaleString("id-ID")}</td></tr>
          <tr><td>Top speed</td><td>${t.topSpeedKmh} km/h</td></tr>
        </table>
        <table class="results-table">
          ${r}
        </table>
        <div class="row" style="justify-content:center;gap:10px">
          <button class="btn btn-primary" data-act="restart">Race lagi</button>
          <button class="btn" data-act="garage">Garage</button>
          <button class="btn" data-act="menu">Menu</button>
        </div>
        <p style="font-size:10px;color:var(--dim);margin-top:14px">ENTER untuk race lagi · ESC untuk menu</p>
      </div>`,this.root.classList.remove("hidden"),this.root.querySelector('[data-act="restart"]').addEventListener("click",()=>{this.cb.onConfirm(),this.cb.onRestart()}),this.root.querySelector('[data-act="garage"]').addEventListener("click",()=>{this.cb.onConfirm(),this.cb.onGarage()}),this.root.querySelector('[data-act="menu"]').addEventListener("click",()=>{this.cb.onConfirm(),this.cb.onMenu()})}hide(){this.visible=!1,this.root.classList.add("hidden")}update(t){return this.visible?(this.timer+=t,this.timer>this.timeoutS):!1}toastCash(t){const e=this.root.querySelector(".results-card");if(!e)return;const n=document.createElement("p");n.style.cssText="margin-top:10px;font-size:13px;letter-spacing:.1em;color:#ffb703",n.textContent=`+ ¥${t.toLocaleString("id-ID")} cuan`,e.appendChild(n)}get remaining(){return Math.max(0,this.timeoutS-this.timer)}}function Yr(s){const t=Math.max(0,Math.round(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=Math.floor(t%1e3/10);return`${e}:${String(n).padStart(2,"0")}.${String(i).padStart(2,"0")}`}class Yh{constructor(t){this.targets=t}targets;apply(t){const{audio:e,camera:n,root:i}=this.targets;e?.setMasterVolume(t.masterVolume),e?.setMusicVolume(t.musicVolume),e?.setSfxVolume(t.sfxVolume),n&&(n.mode=t.cameraMode==="bumper"?"bumper":t.cameraMode==="hood"?"hood":"chase",n.reduceMotion=t.reduceMotion),i.style.setProperty("--hud-scale",String(t.hudScale)),i.classList.toggle("reduce-motion",t.reduceMotion),i.style.setProperty("--accent",t.colorblindSafe?"#ffb703":"#ff2e63"),this.targets.onQuality(t.quality),i.dataset.reduceMotion=t.reduceMotion?"1":"0",i.dataset.speedLines=t.reduceMotion?"off":"on",i.dataset.vignette=String(ie.VIGNETTE)}}const qn=document.getElementById("app"),cs=document.getElementById("ui"),$v=document.getElementById("gl"),Kh=document.getElementById("boot"),oo=document.getElementById("boot-start"),Zv=document.getElementById("fatal"),Jv=document.getElementById("fatal-msg");function wl(s){const t=s instanceof Error?`${s.name}: ${s.message}
${s.stack??""}`:String(s);Jv.textContent=t,Zv.hidden=!1,Kh.classList.add("hide")}Tv(Al);const jt=new ov,pe=new rv,he=new av;let Se=null,Je=null,Fe=null,tn=null,xn=null,ui=null,un=null,$n=null,en=null,Mn=null,nr=null,qe=null,wt=null,Vs=null,Ws=null,An=null,Ie=null,hn=null,bn=null,Fi="downhill",vn=fi[0],lo=194225,_s=null,ci=null,Ni=null,Li=!1,Kr=0,sl=0,Ci=0,Zc=!1,$r=!1;const ra=["chase","bumper","hood"];class jv{frames=[];timer=0;sample=1/Vh.GHOST_SAMPLE_HZ;reset(){this.frames=[],this.timer=0}update(t,e,n,i){this.timer+=t,!(this.timer<this.sample)&&(this.timer=0,this.frames.push({s:e,lateral:n,t:i}))}get best(){return this.frames.length>4?this.frames:null}}async function Qv(){try{pe.attach(document),Se=Av($v,jt.data.settings.quality),Se.renderer.toneMapping=Zn,Se.renderer.outputColorSpace=Di,ui=new zv(Se.renderer,qn.clientWidth||1280,qn.clientHeight||720),xn=new Hv(Se.camera),xn.reset(),Ni=new Vv(cs),un=new Wv(cs),en=new Yv(cs,{onBlip:()=>tn?.hover()}),Mn=new Kv(cs,{onRestart:()=>{ir(Fi,vn.id)},onGarage:()=>{Mn?.hide(),he.go("Garage"),$n?.show("garage")},onMenu:()=>{Mn?.hide(),ua()},onConfirm:()=>tn?.confirm()}),$n=new Xv(cs,jt,{onStartRace:(t,e)=>{const n=fi.find(i=>i.id===e)??fi[0];ir(n_(t),n.id)},onSelectCar:()=>{},onBuyUpgrade:(t,e)=>{const n=jt.buyUpgrade(t,e);un?.toast(n?"Upgrade terpasang":"Cuan tidak cukup",1600)},onSettingsChange:t=>{jt.updateSettings(t),nr?.apply(jt.data.settings)},onOpen:t=>{he.force(t==="garage"?"Garage":t==="settings"?"Settings":t==="controls"?"Controls":t==="credits"?"Credits":"Menu"),t==="menu"&&$n?.refreshMenu()},onHover:()=>{tn?.hover()},onConfirm:()=>{tn?.confirm()},onBack:()=>{tn?.back()}}),$n.refreshMenu(),nr=new Yh({audio:Je,camera:xn,root:document.documentElement,onQuality:t=>{Se?.setQuality(t),ui?.setQuality(t)}}),new ResizeObserver(()=>{const t=qn.clientWidth,e=qn.clientHeight;Se?.setSize(t,e),ui?.setSize(t,e),Ni?.resize()}).observe(qn),Se.setSize(qn.clientWidth,qn.clientHeight),ui.setSize(qn.clientWidth,qn.clientHeight),ks=new AbortController,document.addEventListener("visibilitychange",()=>{document.hidden&&he.current==="Race"&&aa(!0)},{signal:ks.signal}),window.addEventListener("focus",()=>{he.current==="Race"&&qe&&!qe.paused&&Je?.resume()},{signal:ks.signal}),window.addEventListener("pagehide",()=>{Je?.suspend(),qe?.stop()},{signal:ks.signal}),qe=new nv({fixedStep:t=>r_(t),render:(t,e)=>l_(t,e)},Ft.DT,Ft.MAX_SUBSTEPS,Ft.MAX_FRAME_DT),qe.start(),oo.disabled=!1,oo.textContent="TAP TO START",oo.addEventListener("click",()=>{e_()},{once:!0,signal:ks.signal}),t_?.()}catch(s){wl(s)}}let t_=null,ks=null;async function e_(){if(!$r){$r=!0;try{Je=new Q0,await Je.unlock(),Je.setMasterVolume(jt.data.settings.masterVolume),Je.setMusicVolume(jt.data.settings.musicVolume),Je.setSfxVolume(jt.data.settings.sfxVolume),Fe=new tv(Je),Fe.build(),tn=new ev(Je),tn.build(),nr=new Yh({audio:Je,camera:xn,root:document.documentElement,onQuality:s=>{Se?.setQuality(s),ui?.setQuality(s)}}),nr.apply(jt.data.settings),Kh.classList.add("hide"),he.go("Menu"),$n?.show("menu"),en?.say("PLAYER","Malam ini Gunma Pass. Kabut tipis, aspal kering. Waktunya turun."),en?.say("RYO","Heh, AE86? Kamu bercanda ya. Sori, tapi aku nggak punya waktu.")}catch(s){$r=!1,wl(s)}}}function n_(s){switch(s){case"downhill":return"downhill";case"uphill":return"uphill";case"timeattack":return"timeattack";case"tofu":return"tofu"}}function $h(){if(Li=!1,Vs?.dispose(),Ws?.dispose(),An?.dispose(),Ie?.dispose(),hn?.dispose(),ci?.dispose(),Se)for(const s of[...Se.scene.children])s.userData.raceScoped&&Se.scene.remove(s);Vs=null,Ws=null,An=null,Ie=null,hn=null,ci=null,wt=null,bn=null,_s=null,ci=null,un?.hide()}function ir(s,t){if(!Se)return;$h(),Mn?.hide(),$n?.show(null),Kr=0,sl=0,Ci=ra.indexOf(jt.data.settings.cameraMode),Ci<0&&(Ci=0),Fi=s,vn=fi.find(c=>c.id===t)??fi[0],lo=lo*1664525+1013904223>>>0;const e=gv();Vs=Cv(e),Vs.group.userData.raceScoped=!0,Se.scene.add(Vs.group),Ws=Iv(e),Ws.group.userData.raceScoped=!0,Se.scene.add(Ws.group),An=new Gv,An.group.userData.raceScoped=!0,Se.scene.add(An.group);const n=nl(jt.data.progress.selectedCar),i=jt.data.progress.upgrades[n.id],r=fi.find(c=>c.id===vn.id);wt=new Sv(e,{mode:s,playerSpec:s_(n,i),playerName:"KAMU",rivals:[r],seed:lo,difficulty:1}),i&&(wt.player.gripMod=1+i.tire*.035,wt.player.powerMod=1+i.engine*.05),Ie=Kc(n,{outline:!0}),Ie.root.userData.raceScoped=!0,Se.scene.add(Ie.root);const a=wt.rivalEntry;a?(hn=Kc(nl(a.carId),{outline:!0}),hn.root.userData.raceScoped=!0,Se.scene.add(hn.root),hn.root.traverse(c=>{c.isSpotLight&&(c.visible=!1)})):hn=null,bn=new bv,_s=new jv,un?.setTrack(e),un?.show(),un?.setRole(s==="timeattack"?"TIME ATTACK":s==="tofu"?"TOFU DELIVERY":s==="uphill"?"UPHILL BATTLE":"DOWNHILL BATTLE");const o=wt.rivalEntry?r.lines.intro:[];o.length>0&&jt.data.settings.subtitles?en?.sayMany(r.name,o):s==="timeattack"&&en?.say("PLAYER","Sendirian. Waktu bicara, bukan lawan."),xn?.reset(),xn.mode=ra[Ci]??"chase",Li=!0;const l=new I(wt.player.state.x,e.sampleAt(wt.player.state.trackS).y,wt.player.state.z);Ni?.start(l,wt.player.state.heading,()=>{Li=!1}),Fe&&(Fe.setDriftIntensity(0),Fe.clearCrossfade(),Fe.crossfadeTo(Math.floor(Math.random()*gn.length)),Fe.setBpm(150)),he.force("Race"),qe.paused=!1,qe.resetClock(),un?.showCountdown(),Je?.resume()}function ua(){$h(),Mn?.hide(),he.force("Menu"),$n?.show("menu"),$n?.refreshMenu(),en?.hide(),Fe?.setDriftIntensity(0),xn?.reset()}function aa(s){he.current!=="Race"&&he.current!=="Pause"||(s?(he.go("Pause"),qe.paused=!0,tn?.silenceContinuous(),Je?.suspend(),Fe?.suspend(),i_()):(he.go("Race"),qe.paused=!1,qe.resetClock(),Je?.resume(),Fe?.resume(),rl()))}let Xe=null;function i_(){if(Xe)return;Xe=document.createElement("div"),Xe.className="screen",Xe.style.zIndex="28",Xe.style.background="rgba(4,7,14,.72)",Xe.style.alignItems="center",Xe.style.justifyContent="center",Xe.innerHTML=`
    <div class="panel pad" style="text-align:center;min-width:300px">
      <h2 class="screen-title" style="margin-bottom:14px">PAUSE</h2>
      <div style="display:grid;gap:9px">
        <button class="btn" data-p="resume">Lanjut (ESC)</button>
        <button class="btn" data-p="restart">Restart (R)</button>
        <button class="btn" data-p="menu">Menu</button>
        <button class="btn btn-sm" data-p="mute">Musik: ON</button>
      </div>
      <p style="font-size:10px;color:var(--dim);margin-top:12px">Pause on blur aktif · audio di-suspend</p>
    </div>`,cs.appendChild(Xe),Xe.querySelector('[data-p="resume"]').addEventListener("click",()=>aa(!1)),Xe.querySelector('[data-p="restart"]').addEventListener("click",()=>{rl(),ir(Fi,vn.id)}),Xe.querySelector('[data-p="menu"]').addEventListener("click",()=>{rl(),qe.paused=!1,ua()});const s=Xe.querySelector('[data-p="mute"]');s.addEventListener("click",()=>{const e=jt.data.settings.musicVolume>0?0:.62;jt.updateSettings({musicVolume:e}),nr?.apply(jt.data.settings),s.textContent=`Musik: ${e>0?"ON":"OFF"}`})}function rl(){Xe?.remove(),Xe=null}function s_(s,t){return t?{...s,gripScale:s.gripScale+t.tire*.03,powerHp:s.powerHp*(1+t.engine*.05),driftBias:s.driftBias+t.lsd*.06,inertiaYaw:s.inertiaYaw*(1-t.susp*.02)}:s}function r_(s){if(he.current!=="Race"||!wt)return;const t=pe.steerAxis()*(jt.data.settings.invertSteer?-1:1),e={throttle:pe.throttleAxis(),brake:pe.brakeAxis(),steer:t,handbrake:pe.isDown("handbrake")},n=!wt.countdownDone;if(wt.step(s,e),Kr=wt.time,n&&wt.countdownDone&&(Fe?.start(),Fe?.impact(),tn?.countdownVoice("go")),wt.started&&!wt.finished){if(_s?.update(s,wt.player.state.trackS,wt.player.state.lateral,wt.time),bn?.update(s,wt.player.state.slipRear,wt.player.speedKmh,wt.player.state.hitWall,wt.player.state.inGutter),wt.player.state.hitWall&&wt.player.state.hitStrength>.25&&Kr-sl>.25){sl=Kr;const a=wt.player.state.hitStrength;if(tn?.impact(a),xn?.addShake(a),pe.rumble(90,Math.min(1,a),.5),An){const o=wt.player.state;An.spawnSpark(o.x,.5,o.z,a,Math.sign(o.lateral)||1)}}const i=wt.gapSeconds();Fe?.setBpm(150+Math.max(-4,Math.min(10,i*2.2))),Fe?.setDriftIntensity(bn?.intensity??0);const r=wt.rivalEntry;if(r?.ai){if(wt.isGapWin()){const a=r.ai.say("finishLose");a&&jt.data.settings.subtitles&&en?.say(r.name,a)}else if(i<-.6&&r.ai.state.dialogueCooldown<=0){const a=r.ai.say("losing");a&&jt.data.settings.subtitles&&en?.say(r.name,a)}else if(i>.6&&r.ai.state.dialogueCooldown<=0){const a=r.ai.say("overtaking");a&&jt.data.settings.subtitles&&en?.say(r.name,a)}}}wt.finished&&wt.result&&a_()}let Jc=!1;function a_(){if(Jc||!wt?.result)return;Jc=!0;const s=wt.result;s.driftPoints=bn?.displayPoints??0,s.bestDrift=bn?.state.best??0;const t=o_(Fi,vn.id),e=jt.data.progress.bestTimes[t]??null,n=e===null||s.timeMs<e,i=900+Math.round(s.driftPoints/12)+(s.won&&s.totalRacers>1?1400:0)+(n?800:0);if(jt.addCash(i),jt.recordRace({won:s.won,km:wt.track.length/1e3,bestTimeKey:t,timeMs:s.timeMs}),s.bestDrift>0&&jt.recordDrift(s.bestDrift),s.won&&s.totalRacers>1&&!jt.data.progress.rivalsBeaten.includes(vn.id)){const a=jt.data.progress;a.rivalsBeaten.push(vn.id);const o=Math.min(6,a.weeksCleared.length+1);a.weeksCleared.includes(o)||a.weeksCleared.push(o);const c=["fd7","s13","ek9"].find(h=>!a.unlockedCars.includes(h));c&&a.weeksCleared.length>=2&&jt.unlockCar(c),jt.updateProgress({rivalsBeaten:a.rivalsBeaten,weeksCleared:a.weeksCleared})}Fi==="timeattack"&&_s?.best&&n&&(jt.data.progress.bestTimes[t]=s.timeMs,jt.save());const r=s.totalRacers>1?s.won?vn.lines.finishLose[0]:vn.lines.finishWin[0]:"Yosha! Catat waktunya.";r&&jt.data.settings.subtitles&&en?.say(vn.name,r),tn?.finishFanfare(),Fe?.setDriftIntensity(0),un?.hide(),en?.hide(),window.setTimeout(()=>{he.current==="Race"&&(he.go("Results"),qe.paused=!0,Mn?.show(s,e),Mn?.toastCash(i),tn?.confirm())},900)}function o_(s,t){return`${s}:${t}`}function l_(s,t){if(!Se)return;const{renderer:e,scene:n,camera:i}=Se;if(he.current==="Results"&&Mn?.isVisible&&Mn.update(t)&&(Mn.hide(),qe.paused=!1,ua()),pe.pollGamepad(),h_(),en?.update(t),Li&&Ni&&wt&&Se&&(Ni.update(t,Se.camera)||(Li=!1)),he.current==="Race"||he.current==="Pause"){if(wt&&Ie&&xn){const r=wt.player.state,a=wt.player.spec,o=1-Math.pow(.001,t),l=Ie.root.position.x+(r.x-Ie.root.position.x)*Math.min(1,o*2.2),c=Ie.root.position.z+(r.z-Ie.root.position.z)*Math.min(1,o*2.2);Ie.root.position.set(l,jc(r,wt),c),Ie.root.rotation.y=-r.heading;const h=Math.max(-.1,Math.min(.1,r.slipRear*.09)),u=Math.max(-.06,Math.min(.06,-(r.vLong*0)-(pe.brakeAxis()-pe.throttleAxis())*.03));Ie.body.rotation.z=h,Ie.body.rotation.x=u;const d=r.odometer/a.wheelRadius%(Math.PI*2);for(const v of Ie.wheels)v.rotation.x=d;const f=r.steerAngle*2.2;for(const v of Ie.steerWheels)v.rotation.y=-f;for(const v of Ie.brakeLights)v.material.color.setHex(pe.brakeAxis()>.1?16722749:5902104);if(hn&&wt.rivalEntry){const v=wt.rivalEntry.car.state;hn.root.position.set(v.x,wt.track.sampleAt(v.trackS).y,v.z),hn.root.rotation.y=-v.heading;const g=v.odometer/.31%(Math.PI*2);for(const b of hn.wheels)b.rotation.x=g;const p=Math.max(-.1,Math.min(.1,v.slipRear*.09));hn.body.rotation.z=p;for(const b of hn.steerWheels)b.rotation.y=-v.steerAngle*2.2}if(ci&&_s?.best&&wt.started){const v=_s.best,g=wt.time,p=c_(v,g);if(p){const b=wt.track.pointAtOffset(p.s,p.lateral);ci.root.position.set(b.x,wt.track.sampleAt(p.s).y,b.z),ci.root.rotation.y=-b.heading,ci.root.visible=!0}else ci.root.visible=!1}if(An){const v=wt.player.state;if(v.drifting&&v.speed>6){const g=Math.min(1,Math.abs(v.slipRear)/.7);if(Math.random()<.6)for(const b of Ie.smokeAnchors){const S=new I;b.getWorldPosition(S),An.spawnSmoke(S.x,S.y,S.z,g)}const p=new I(-1.1,0,0).applyAxisAngle(new I(0,1,0),v.heading);An.addSkid(v.x+p.x-.55,v.z+p.z-.55,v.x+p.x+.55,v.z+p.z+.55,wt.track.sampleAt(v.trackS).y+.02,v.heading)}An.update(t)}xn.mode=jt.data.settings.cameraMode==="bumper"?"bumper":jt.data.settings.cameraMode==="hood"?"hood":"chase",xn.reduceMotion=jt.data.settings.reduceMotion,Li||xn.update(t,r.x,jc(r,wt),r.z,r.heading,r.vx,r.vz,r.slipRear,wt.player.speedKmh),tn?.update(t,{rpm:r.rpm,throttle:pe.throttleAxis(),slipRear:r.slipRear,speedKmh:wt.player.speedKmh,inGutter:r.inGutter,inTunnel:wt.track.sampleAt(r.trackS).tunnel,limiter:r.limiter,turbo:wt.player.spec.id==="fd7"||wt.player.spec.id==="s13",active:he.current==="Race"});const m=wt.racers.map(v=>({x:v.car.state.x,z:v.car.state.z,color:v.color,isPlayer:v.isPlayer}));un?.update(t,{speedKmh:wt.player.speedKmh,rpm:r.rpm,gear:r.gear,driftPoints:bn?.displayPoints??0,driftLabel:bn?.state.label??"",driftIntensity:bn?.intensity??0,multiplier:bn?.state.multiplier??1,gapSeconds:wt.gapSeconds(),hasRival:wt.racers.length>1,timeText:Yr(wt.time*1e3),position:wt.playerPosition,totalRacers:wt.racers.length,trackTitle:Fe?.trackTitle??gn[0].title,bpm:Fe?.bpmLive??156,colorblindSafe:jt.data.settings.colorblindSafe},m),wt.countdownDone?un?.setCountdown(0):un?.setCountdown(wt.countdownValue)}ui?.update(t,wt?.player.speedKmh??0,bn?.intensity??0,jt.data.settings.reduceMotion)}Se.update(t,0,0),ui?ui.render(n,i):e.render(n,i),!Zc&&e.info.render.calls>900&&(Zc=!0,un?.toast("Kualitas diturunkan otomatis untuk menjaga FPS",3e3)),pe.endFrame()}function jc(s,t){return t.track.sampleAt(s.trackS).y}function c_(s,t){if(s.length<2||t<s[0].t||t>s[s.length-1].t)return null;let e=0,n=s.length-1;for(;e<n-1;){const l=e+n>>1;s[l].t<=t?e=l:n=l}const i=s[e],r=s[n],a=Math.max(1e-6,r.t-i.t),o=(t-i.t)/a;return{s:i.s+(r.s-i.s)*o,lateral:i.lateral+(r.lateral-i.lateral)*o,t}}function h_(){if(en?.isActive&&(pe.justPressed("confirm")||pe.justPressed("handbrake")||pe.justPressed("pause"))){en.skip();return}if(Li&&Ni?.isActive&&(pe.justPressed("confirm")||pe.justPressed("pause")||pe.justPressed("throttle")||pe.justPressed("brake")||pe.justPressed("handbrake")||pe.justPressed("camera"))&&Ni.skip(),pe.justPressed("pause")){he.current==="Race"?aa(!0):he.current==="Pause"?aa(!1):he.current==="Menu"||he.current==="Results"&&(Mn?.hide(),qe.paused=!1,ua());return}if(he.current==="Results"){pe.justPressed("confirm")&&(Mn?.hide(),qe.paused=!1,ir(Fi,vn.id));return}if(he.current==="Race"){if(pe.justPressed("camera")){Ci=(Ci+1)%ra.length;const s=ra[Ci];jt.updateSettings({cameraMode:s}),un?.toast(`Kamera: ${s.toUpperCase()}`,1200),tn?.hover()}pe.justPressed("back")&&ir(Fi,vn.id);return}(he.current==="Garage"||he.current==="Settings"||he.current==="Controls"||he.current==="Credits")&&(pe.justPressed("pause")||pe.justPressed("back"))&&$n?.show("menu")}window.addEventListener("error",s=>{$r||wl(s.error??s.message)});Qv();
