(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8516],{8516:(S,i,c)=>{"use strict";c.r(i),c.d(i,{DocenteqrPageModule:()=>L});var s=c(177),n=c(4341),t=c(4742),o=c(4964),r=c(467),u=c(5933),e=c(4438),l=c(6340);const a=()=>["/home"];function B(d,E){if(1&d&&(e.j41(0,"ion-select-option",9),e.EFF(1),e.k0s()),2&d){const m=E.$implicit;e.Y8G("value",m),e.R7$(),e.SpI(" ",m," ")}}function N(d,E){if(1&d&&(e.j41(0,"ion-select-option",9),e.EFF(1),e.k0s()),2&d){const m=E.$implicit;e.Y8G("value",m),e.R7$(),e.SpI(" ",m," ")}}function h(d,E){if(1&d&&(e.j41(0,"ion-card"),e.nrm(1,"ion-img",10),e.j41(2,"ion-item")(3,"ion-card-subtitle"),e.EFF(4),e.k0s()()()),2&d){const m=e.XpG();e.R7$(),e.Y8G("src",m.qrCodeData),e.R7$(3),e.SpI("ID: ",m.qrCodeId,"")}}const I=[{path:"",component:(()=>{var d;class E{constructor(f){this.firestore=f,this.asignaturas=["Programacion","Base de Datos","Calidad"],this.secciones=[],this.qrCodeData=null,this.qrCodeId=null}updateSections(){switch(this.selectedAsignatura){case"Programacion":this.secciones=["PGY_1","PGY_2","PGY_3"];break;case"Base de Datos":this.secciones=["BD_1","BD_2","BD_3"];break;case"Calidad":this.secciones=["CAL_1","CAL_2","CAL_3"]}}generateQR(){var f=this;return(0,r.A)(function*(){f.selectedAsignatura&&f.selectedSeccion?(f.qrCodeId=f.firestore.createId(),f.qrCodeData=yield u.toDataURL(f.qrCodeId),yield f.saveQRToFirestore(f.qrCodeId,f.selectedAsignatura,f.selectedSeccion)):alert("Por favor selecciona una asignatura y una secci\xf3n.")})()}saveQRToFirestore(f,D,F){var g=this;return(0,r.A)(function*(){try{yield g.firestore.collection("codigoQR").doc(f).set({asignatura:D,identificacion:f,seccion:F,timestamp:(new Date).toISOString()}),console.log("Datos del QR guardados en Firestore")}catch(P){console.error("Error al guardar los datos del QR en Firestore",P),alert("Error al guardar el c\xf3digo QR en Firestore.")}})()}}return(d=E).\u0275fac=function(f){return new(f||d)(e.rXU(l.Qe))},d.\u0275cmp=e.VBU({type:d,selectors:[["app-docenteqr"]],decls:20,vars:9,consts:[[3,"translucent"],[3,"fullscreen"],[3,"ngModelChange","ionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],[3,"ngModelChange","ngModel"],["expand","full",3,"click"],[4,"ngIf"],["id","centrar"],["fill","clear",1,"volver",3,"routerLink"],[3,"value"],["alt","QR Code",3,"src"]],template:function(f,D){1&f&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"docenteqr"),e.k0s()()(),e.j41(4,"ion-content",1)(5,"ion-card")(6,"ion-label"),e.EFF(7,"Seleccione Asignatura:"),e.k0s(),e.j41(8,"ion-select",2),e.mxI("ngModelChange",function(g){return e.DH7(D.selectedAsignatura,g)||(D.selectedAsignatura=g),g}),e.bIt("ionChange",function(){return D.updateSections()}),e.DNE(9,B,2,2,"ion-select-option",3),e.k0s(),e.j41(10,"ion-label"),e.EFF(11,"Seleccione Secci\xf3n:"),e.k0s(),e.j41(12,"ion-select",4),e.mxI("ngModelChange",function(g){return e.DH7(D.selectedSeccion,g)||(D.selectedSeccion=g),g}),e.DNE(13,N,2,2,"ion-select-option",3),e.k0s(),e.j41(14,"ion-button",5),e.bIt("click",function(){return D.generateQR()}),e.EFF(15,"Generar QR"),e.k0s(),e.DNE(16,h,5,2,"ion-card",6),e.k0s(),e.j41(17,"div",7)(18,"ion-button",8),e.EFF(19,"Volver Al Home"),e.k0s()()()),2&f&&(e.Y8G("translucent",!0),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(4),e.R50("ngModel",D.selectedAsignatura),e.R7$(),e.Y8G("ngForOf",D.asignaturas),e.R7$(3),e.R50("ngModel",D.selectedSeccion),e.R7$(),e.Y8G("ngForOf",D.secciones),e.R7$(3),e.Y8G("ngIf",D.qrCodeData),e.R7$(2),e.Y8G("routerLink",e.lJ4(8,a)))},dependencies:[s.Sq,s.bT,n.BC,n.vS,t.Jm,t.b_,t.HW,t.W9,t.eU,t.KW,t.uz,t.he,t.Nm,t.Ip,t.BC,t.ai,t.Je,t.N7,o.Wk],styles:["ion-button.volver[_ngcontent-%COMP%]{--background: #041d52;--background-focused: #f7fffb;--color: #ffc400;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--padding-top: 10px;--padding-bottom: 10px;--text-transform: none;--ms-text-align-last: center}#centrar[_ngcontent-%COMP%]{text-align:center}"]}),E})()}];let b=(()=>{var d;class E{}return(d=E).\u0275fac=function(f){return new(f||d)},d.\u0275mod=e.$C({type:d}),d.\u0275inj=e.G2t({imports:[o.iI.forChild(I),o.iI]}),E})(),L=(()=>{var d;class E{}return(d=E).\u0275fac=function(f){return new(f||d)},d.\u0275mod=e.$C({type:d}),d.\u0275inj=e.G2t({imports:[s.MD,n.YN,t.bv,b]}),E})()},2624:S=>{"use strict";var i={single_source_shortest_paths:function(c,s,n){var t={},o={};o[s]=0;var u,e,l,a,B,h,r=i.PriorityQueue.make();for(r.push(s,0);!r.empty();)for(l in a=(u=r.pop()).cost,B=c[e=u.value]||{})B.hasOwnProperty(l)&&(h=a+B[l],(typeof o[l]>"u"||o[l]>h)&&(o[l]=h,r.push(l,h),t[l]=e));if(typeof n<"u"&&typeof o[n]>"u"){var b=["Could not find a path from ",s," to ",n,"."].join("");throw new Error(b)}return t},extract_shortest_path_from_predecessor_list:function(c,s){for(var n=[],t=s;t;)n.push(t),t=c[t];return n.reverse(),n},find_path:function(c,s,n){var t=i.single_source_shortest_paths(c,s,n);return i.extract_shortest_path_from_predecessor_list(t,n)},PriorityQueue:{make:function(c){var t,s=i.PriorityQueue,n={};for(t in c=c||{},s)s.hasOwnProperty(t)&&(n[t]=s[t]);return n.queue=[],n.sorter=c.sorter||s.default_sorter,n},default_sorter:function(c,s){return c.cost-s.cost},push:function(c,s){this.queue.push({value:c,cost:s}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};S.exports=i},5933:(S,i,c)=>{const s=c(2836),n=c(9460),t=c(4649),o=c(6511);function r(u,e,l,a,B){const N=[].slice.call(arguments,1),h=N.length,y="function"==typeof N[h-1];if(!y&&!s())throw new Error("Callback required as last argument");if(!y){if(h<1)throw new Error("Too few arguments provided");return 1===h?(l=e,e=a=void 0):2===h&&!e.getContext&&(a=l,l=e,e=void 0),new Promise(function(I,b){try{const L=n.create(l,a);I(u(L,e,a))}catch(L){b(L)}})}if(h<2)throw new Error("Too few arguments provided");2===h?(B=l,l=e,e=a=void 0):3===h&&(e.getContext&&typeof B>"u"?(B=a,a=void 0):(B=a,a=l,l=e,e=void 0));try{const I=n.create(l,a);B(null,u(I,e,a))}catch(I){B(I)}}i.create=n.create,i.toCanvas=r.bind(null,t.render),i.toDataURL=r.bind(null,t.renderToDataURL),i.toString=r.bind(null,function(u,e,l){return o.render(u,l)})},2836:S=>{S.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},6214:(S,i,c)=>{const s=c(9089).getSymbolSize;i.getRowColCoords=function(t){if(1===t)return[];const o=Math.floor(t/7)+2,r=s(t),u=145===r?26:2*Math.ceil((r-13)/(2*o-2)),e=[r-7];for(let l=1;l<o-1;l++)e[l]=e[l-1]-u;return e.push(6),e.reverse()},i.getPositions=function(t){const o=[],r=i.getRowColCoords(t),u=r.length;for(let e=0;e<u;e++)for(let l=0;l<u;l++)0===e&&0===l||0===e&&l===u-1||e===u-1&&0===l||o.push([r[e],r[l]]);return o}},1018:(S,i,c)=>{const s=c(1677),n=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function t(o){this.mode=s.ALPHANUMERIC,this.data=o}t.getBitsLength=function(r){return 11*Math.floor(r/2)+r%2*6},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){let u;for(u=0;u+2<=this.data.length;u+=2){let e=45*n.indexOf(this.data[u]);e+=n.indexOf(this.data[u+1]),r.put(e,11)}this.data.length%2&&r.put(n.indexOf(this.data[u]),6)},S.exports=t},4662:S=>{function i(){this.buffer=[],this.length=0}i.prototype={get:function(c){const s=Math.floor(c/8);return 1==(this.buffer[s]>>>7-c%8&1)},put:function(c,s){for(let n=0;n<s;n++)this.putBit(1==(c>>>s-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(c){const s=Math.floor(this.length/8);this.buffer.length<=s&&this.buffer.push(0),c&&(this.buffer[s]|=128>>>this.length%8),this.length++}},S.exports=i},5941:S=>{function i(c){if(!c||c<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=c,this.data=new Uint8Array(c*c),this.reservedBit=new Uint8Array(c*c)}i.prototype.set=function(c,s,n,t){const o=c*this.size+s;this.data[o]=n,t&&(this.reservedBit[o]=!0)},i.prototype.get=function(c,s){return this.data[c*this.size+s]},i.prototype.xor=function(c,s,n){this.data[c*this.size+s]^=n},i.prototype.isReserved=function(c,s){return this.reservedBit[c*this.size+s]},S.exports=i},4969:(S,i,c)=>{const s=c(1677);function n(t){this.mode=s.BYTE,this.data="string"==typeof t?(new TextEncoder).encode(t):new Uint8Array(t)}n.getBitsLength=function(o){return 8*o},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){for(let o=0,r=this.data.length;o<r;o++)t.put(this.data[o],8)},S.exports=n},3677:(S,i,c)=>{const s=c(7424),n=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],t=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];i.getBlocksCount=function(r,u){switch(u){case s.L:return n[4*(r-1)+0];case s.M:return n[4*(r-1)+1];case s.Q:return n[4*(r-1)+2];case s.H:return n[4*(r-1)+3];default:return}},i.getTotalCodewordsCount=function(r,u){switch(u){case s.L:return t[4*(r-1)+0];case s.M:return t[4*(r-1)+1];case s.Q:return t[4*(r-1)+2];case s.H:return t[4*(r-1)+3];default:return}}},7424:(S,i)=>{i.L={bit:1},i.M={bit:0},i.Q={bit:3},i.H={bit:2},i.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},i.from=function(n,t){if(i.isValid(n))return n;try{return function c(s){if("string"!=typeof s)throw new Error("Param is not a string");switch(s.toLowerCase()){case"l":case"low":return i.L;case"m":case"medium":return i.M;case"q":case"quartile":return i.Q;case"h":case"high":return i.H;default:throw new Error("Unknown EC Level: "+s)}}(n)}catch{return t}}},6269:(S,i,c)=>{const s=c(9089).getSymbolSize;i.getPositions=function(o){const r=s(o);return[[0,0],[r-7,0],[0,r-7]]}},6254:(S,i,c)=>{const s=c(9089),o=s.getBCHDigit(1335);i.getEncodedBits=function(u,e){const l=u.bit<<3|e;let a=l<<10;for(;s.getBCHDigit(a)-o>=0;)a^=1335<<s.getBCHDigit(a)-o;return 21522^(l<<10|a)}},6686:(S,i)=>{const c=new Uint8Array(512),s=new Uint8Array(256);(function(){let t=1;for(let o=0;o<255;o++)c[o]=t,s[t]=o,t<<=1,256&t&&(t^=285);for(let o=255;o<512;o++)c[o]=c[o-255]})(),i.log=function(t){if(t<1)throw new Error("log("+t+")");return s[t]},i.exp=function(t){return c[t]},i.mul=function(t,o){return 0===t||0===o?0:c[s[t]+s[o]]}},3264:(S,i,c)=>{const s=c(1677),n=c(9089);function t(o){this.mode=s.KANJI,this.data=o}t.getBitsLength=function(r){return 13*r},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(o){let r;for(r=0;r<this.data.length;r++){let u=n.toSJIS(this.data[r]);if(u>=33088&&u<=40956)u-=33088;else{if(!(u>=57408&&u<=60351))throw new Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");u-=49472}u=192*(u>>>8&255)+(255&u),o.put(u,13)}},S.exports=t},3361:(S,i)=>{i.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};function s(n,t,o){switch(n){case i.Patterns.PATTERN000:return(t+o)%2==0;case i.Patterns.PATTERN001:return t%2==0;case i.Patterns.PATTERN010:return o%3==0;case i.Patterns.PATTERN011:return(t+o)%3==0;case i.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(o/3))%2==0;case i.Patterns.PATTERN101:return t*o%2+t*o%3==0;case i.Patterns.PATTERN110:return(t*o%2+t*o%3)%2==0;case i.Patterns.PATTERN111:return(t*o%3+(t+o)%2)%2==0;default:throw new Error("bad maskPattern:"+n)}}i.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},i.from=function(t){return i.isValid(t)?parseInt(t,10):void 0},i.getPenaltyN1=function(t){const o=t.size;let r=0,u=0,e=0,l=null,a=null;for(let B=0;B<o;B++){u=e=0,l=a=null;for(let N=0;N<o;N++){let h=t.get(B,N);h===l?u++:(u>=5&&(r+=u-5+3),l=h,u=1),h=t.get(N,B),h===a?e++:(e>=5&&(r+=e-5+3),a=h,e=1)}u>=5&&(r+=u-5+3),e>=5&&(r+=e-5+3)}return r},i.getPenaltyN2=function(t){const o=t.size;let r=0;for(let u=0;u<o-1;u++)for(let e=0;e<o-1;e++){const l=t.get(u,e)+t.get(u,e+1)+t.get(u+1,e)+t.get(u+1,e+1);(4===l||0===l)&&r++}return 3*r},i.getPenaltyN3=function(t){const o=t.size;let r=0,u=0,e=0;for(let l=0;l<o;l++){u=e=0;for(let a=0;a<o;a++)u=u<<1&2047|t.get(l,a),a>=10&&(1488===u||93===u)&&r++,e=e<<1&2047|t.get(a,l),a>=10&&(1488===e||93===e)&&r++}return 40*r},i.getPenaltyN4=function(t){let o=0;const r=t.data.length;for(let e=0;e<r;e++)o+=t.data[e];return 10*Math.abs(Math.ceil(100*o/r/5)-10)},i.applyMask=function(t,o){const r=o.size;for(let u=0;u<r;u++)for(let e=0;e<r;e++)o.isReserved(e,u)||o.xor(e,u,s(t,e,u))},i.getBestMask=function(t,o){const r=Object.keys(i.Patterns).length;let u=0,e=1/0;for(let l=0;l<r;l++){o(l),i.applyMask(l,t);const a=i.getPenaltyN1(t)+i.getPenaltyN2(t)+i.getPenaltyN3(t)+i.getPenaltyN4(t);i.applyMask(l,t),a<e&&(e=a,u=l)}return u}},1677:(S,i,c)=>{const s=c(377),n=c(9359);i.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},i.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},i.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},i.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},i.MIXED={bit:-1},i.getCharCountIndicator=function(r,u){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!s.isValid(u))throw new Error("Invalid version: "+u);return u>=1&&u<10?r.ccBits[0]:u<27?r.ccBits[1]:r.ccBits[2]},i.getBestModeForData=function(r){return n.testNumeric(r)?i.NUMERIC:n.testAlphanumeric(r)?i.ALPHANUMERIC:n.testKanji(r)?i.KANJI:i.BYTE},i.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},i.isValid=function(r){return r&&r.bit&&r.ccBits},i.from=function(r,u){if(i.isValid(r))return r;try{return function t(o){if("string"!=typeof o)throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return i.NUMERIC;case"alphanumeric":return i.ALPHANUMERIC;case"kanji":return i.KANJI;case"byte":return i.BYTE;default:throw new Error("Unknown mode: "+o)}}(r)}catch{return u}}},6628:(S,i,c)=>{const s=c(1677);function n(t){this.mode=s.NUMERIC,this.data=t.toString()}n.getBitsLength=function(o){return 10*Math.floor(o/3)+(o%3?o%3*3+1:0)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(o){let r,u,e;for(r=0;r+3<=this.data.length;r+=3)u=this.data.substr(r,3),e=parseInt(u,10),o.put(e,10);const l=this.data.length-r;l>0&&(u=this.data.substr(r),e=parseInt(u,10),o.put(e,3*l+1))},S.exports=n},1744:(S,i,c)=>{const s=c(6686);i.mul=function(t,o){const r=new Uint8Array(t.length+o.length-1);for(let u=0;u<t.length;u++)for(let e=0;e<o.length;e++)r[u+e]^=s.mul(t[u],o[e]);return r},i.mod=function(t,o){let r=new Uint8Array(t);for(;r.length-o.length>=0;){const u=r[0];for(let l=0;l<o.length;l++)r[l]^=s.mul(o[l],u);let e=0;for(;e<r.length&&0===r[e];)e++;r=r.slice(e)}return r},i.generateECPolynomial=function(t){let o=new Uint8Array([1]);for(let r=0;r<t;r++)o=i.mul(o,new Uint8Array([1,s.exp(r)]));return o}},9460:(S,i,c)=>{const s=c(9089),n=c(7424),t=c(4662),o=c(5941),r=c(6214),u=c(6269),e=c(3361),l=c(3677),a=c(6289),B=c(1252),N=c(6254),h=c(1677),y=c(2868);function E(g,P,p){const w=g.size,T=N.getEncodedBits(P,p);let A,C;for(A=0;A<15;A++)C=1==(T>>A&1),g.set(A<6?A:A<8?A+1:w-15+A,8,C,!0),g.set(8,A<8?w-A-1:A<9?15-A-1+1:15-A-1,C,!0);g.set(w-8,8,1,!0)}function F(g,P,p,w){let T;if(Array.isArray(g))T=y.fromArray(g);else{if("string"!=typeof g)throw new Error("Invalid data");{let _=P;if(!_){const Y=y.rawSplit(g);_=B.getBestVersionForData(Y,p)}T=y.fromString(g,_||40)}}const A=B.getBestVersionForData(T,p);if(!A)throw new Error("The amount of data is too big to be stored in a QR Code");if(P){if(P<A)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+A+".\n")}else P=A;const C=function f(g,P,p){const w=new t;p.forEach(function(M){w.put(M.mode.bit,4),w.put(M.getLength(),h.getCharCountIndicator(M.mode,g)),M.write(w)});const C=8*(s.getSymbolTotalCodewords(g)-l.getTotalCodewordsCount(g,P));for(w.getLengthInBits()+4<=C&&w.put(0,4);w.getLengthInBits()%8!=0;)w.putBit(0);const R=(C-w.getLengthInBits())/8;for(let M=0;M<R;M++)w.put(M%2?17:236,8);return function D(g,P,p){const w=s.getSymbolTotalCodewords(P),A=w-l.getTotalCodewordsCount(P,p),C=l.getBlocksCount(P,p),M=C-w%C,_=Math.floor(w/C),Y=Math.floor(A/C),v=Y+1,j=_-Y,$=new a(j);let V=0;const H=new Array(C),O=new Array(C);let G=0;const W=new Uint8Array(g.buffer);for(let z=0;z<C;z++){const K=z<M?Y:v;H[z]=W.slice(V,V+K),O[z]=$.encode(H[z]),V+=K,G=Math.max(G,K)}const J=new Uint8Array(w);let U,k,Q=0;for(U=0;U<G;U++)for(k=0;k<C;k++)U<H[k].length&&(J[Q++]=H[k][U]);for(U=0;U<j;U++)for(k=0;k<C;k++)J[Q++]=O[k][U];return J}(w,g,P)}(P,p,T),R=s.getSymbolSize(P),M=new o(R);return function I(g,P){const p=g.size,w=u.getPositions(P);for(let T=0;T<w.length;T++){const A=w[T][0],C=w[T][1];for(let R=-1;R<=7;R++)if(!(A+R<=-1||p<=A+R))for(let M=-1;M<=7;M++)C+M<=-1||p<=C+M||g.set(A+R,C+M,R>=0&&R<=6&&(0===M||6===M)||M>=0&&M<=6&&(0===R||6===R)||R>=2&&R<=4&&M>=2&&M<=4,!0)}}(M,P),function b(g){const P=g.size;for(let p=8;p<P-8;p++){const w=p%2==0;g.set(p,6,w,!0),g.set(6,p,w,!0)}}(M),function L(g,P){const p=r.getPositions(P);for(let w=0;w<p.length;w++){const T=p[w][0],A=p[w][1];for(let C=-2;C<=2;C++)for(let R=-2;R<=2;R++)g.set(T+C,A+R,-2===C||2===C||-2===R||2===R||0===C&&0===R,!0)}}(M,P),E(M,p,0),P>=7&&function d(g,P){const p=g.size,w=B.getEncodedBits(P);let T,A,C;for(let R=0;R<18;R++)T=Math.floor(R/3),A=R%3+p-8-3,C=1==(w>>R&1),g.set(T,A,C,!0),g.set(A,T,C,!0)}(M,P),function m(g,P){const p=g.size;let w=-1,T=p-1,A=7,C=0;for(let R=p-1;R>0;R-=2)for(6===R&&R--;;){for(let M=0;M<2;M++)if(!g.isReserved(T,R-M)){let _=!1;C<P.length&&(_=1==(P[C]>>>A&1)),g.set(T,R-M,_),A--,-1===A&&(C++,A=7)}if(T+=w,T<0||p<=T){T-=w,w=-w;break}}}(M,C),isNaN(w)&&(w=e.getBestMask(M,E.bind(null,M,p))),e.applyMask(w,M),E(M,p,w),{modules:M,version:P,errorCorrectionLevel:p,maskPattern:w,segments:T}}i.create=function(P,p){if(typeof P>"u"||""===P)throw new Error("No input text");let T,A,w=n.M;return typeof p<"u"&&(w=n.from(p.errorCorrectionLevel,n.M),T=B.from(p.version),A=e.from(p.maskPattern),p.toSJISFunc&&s.setToSJISFunction(p.toSJISFunc)),F(P,T,w,A)}},6289:(S,i,c)=>{const s=c(1744);function n(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}n.prototype.initialize=function(o){this.degree=o,this.genPoly=s.generateECPolynomial(this.degree)},n.prototype.encode=function(o){if(!this.genPoly)throw new Error("Encoder not initialized");const r=new Uint8Array(o.length+this.degree);r.set(o);const u=s.mod(r,this.genPoly),e=this.degree-u.length;if(e>0){const l=new Uint8Array(this.degree);return l.set(u,e),l}return u},S.exports=n},9359:(S,i)=>{const c="[0-9]+";let n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");const t="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+")(?:.|[\r\n]))+";i.KANJI=new RegExp(n,"g"),i.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),i.BYTE=new RegExp(t,"g"),i.NUMERIC=new RegExp(c,"g"),i.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const o=new RegExp("^"+n+"$"),r=new RegExp("^"+c+"$"),u=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");i.testKanji=function(l){return o.test(l)},i.testNumeric=function(l){return r.test(l)},i.testAlphanumeric=function(l){return u.test(l)}},2868:(S,i,c)=>{const s=c(1677),n=c(6628),t=c(1018),o=c(4969),r=c(3264),u=c(9359),e=c(9089),l=c(2624);function a(d){return unescape(encodeURIComponent(d)).length}function B(d,E,m){const f=[];let D;for(;null!==(D=d.exec(m));)f.push({data:D[0],index:D.index,mode:E,length:D[0].length});return f}function N(d){const E=B(u.NUMERIC,s.NUMERIC,d),m=B(u.ALPHANUMERIC,s.ALPHANUMERIC,d);let f,D;return e.isKanjiModeEnabled()?(f=B(u.BYTE,s.BYTE,d),D=B(u.KANJI,s.KANJI,d)):(f=B(u.BYTE_KANJI,s.BYTE,d),D=[]),E.concat(m,f,D).sort(function(g,P){return g.index-P.index}).map(function(g){return{data:g.data,mode:g.mode,length:g.length}})}function h(d,E){switch(E){case s.NUMERIC:return n.getBitsLength(d);case s.ALPHANUMERIC:return t.getBitsLength(d);case s.KANJI:return r.getBitsLength(d);case s.BYTE:return o.getBitsLength(d)}}function L(d,E){let m;const f=s.getBestModeForData(d);if(m=s.from(E,f),m!==s.BYTE&&m.bit<f.bit)throw new Error('"'+d+'" cannot be encoded with mode '+s.toString(m)+".\n Suggested mode is: "+s.toString(f));switch(m===s.KANJI&&!e.isKanjiModeEnabled()&&(m=s.BYTE),m){case s.NUMERIC:return new n(d);case s.ALPHANUMERIC:return new t(d);case s.KANJI:return new r(d);case s.BYTE:return new o(d)}}i.fromArray=function(E){return E.reduce(function(m,f){return"string"==typeof f?m.push(L(f,null)):f.data&&m.push(L(f.data,f.mode)),m},[])},i.fromString=function(E,m){const D=function I(d){const E=[];for(let m=0;m<d.length;m++){const f=d[m];switch(f.mode){case s.NUMERIC:E.push([f,{data:f.data,mode:s.ALPHANUMERIC,length:f.length},{data:f.data,mode:s.BYTE,length:f.length}]);break;case s.ALPHANUMERIC:E.push([f,{data:f.data,mode:s.BYTE,length:f.length}]);break;case s.KANJI:E.push([f,{data:f.data,mode:s.BYTE,length:a(f.data)}]);break;case s.BYTE:E.push([{data:f.data,mode:s.BYTE,length:a(f.data)}])}}return E}(N(E,e.isKanjiModeEnabled())),F=function b(d,E){const m={},f={start:{}};let D=["start"];for(let F=0;F<d.length;F++){const g=d[F],P=[];for(let p=0;p<g.length;p++){const w=g[p],T=""+F+p;P.push(T),m[T]={node:w,lastCount:0},f[T]={};for(let A=0;A<D.length;A++){const C=D[A];m[C]&&m[C].node.mode===w.mode?(f[C][T]=h(m[C].lastCount+w.length,w.mode)-h(m[C].lastCount,w.mode),m[C].lastCount+=w.length):(m[C]&&(m[C].lastCount=w.length),f[C][T]=h(w.length,w.mode)+4+s.getCharCountIndicator(w.mode,E))}}D=P}for(let F=0;F<D.length;F++)f[D[F]].end=0;return{map:f,table:m}}(D,m),g=l.find_path(F.map,"start","end"),P=[];for(let p=1;p<g.length-1;p++)P.push(F.table[g[p]].node);return i.fromArray(function y(d){return d.reduce(function(E,m){const f=E.length-1>=0?E[E.length-1]:null;return f&&f.mode===m.mode?(E[E.length-1].data+=m.data,E):(E.push(m),E)},[])}(P))},i.rawSplit=function(E){return i.fromArray(N(E,e.isKanjiModeEnabled()))}},9089:(S,i)=>{let c;const s=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];i.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},i.getSymbolTotalCodewords=function(t){return s[t]},i.getBCHDigit=function(n){let t=0;for(;0!==n;)t++,n>>>=1;return t},i.setToSJISFunction=function(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');c=t},i.isKanjiModeEnabled=function(){return typeof c<"u"},i.toSJIS=function(t){return c(t)}},377:(S,i)=>{i.isValid=function(s){return!isNaN(s)&&s>=1&&s<=40}},1252:(S,i,c)=>{const s=c(9089),n=c(3677),t=c(7424),o=c(1677),r=c(377),e=s.getBCHDigit(7973);function a(h,y){return o.getCharCountIndicator(h,y)+4}function B(h,y){let I=0;return h.forEach(function(b){const L=a(b.mode,y);I+=L+b.getBitsLength()}),I}i.from=function(y,I){return r.isValid(y)?parseInt(y,10):I},i.getCapacity=function(y,I,b){if(!r.isValid(y))throw new Error("Invalid QR Code version");typeof b>"u"&&(b=o.BYTE);const E=8*(s.getSymbolTotalCodewords(y)-n.getTotalCodewordsCount(y,I));if(b===o.MIXED)return E;const m=E-a(b,y);switch(b){case o.NUMERIC:return Math.floor(m/10*3);case o.ALPHANUMERIC:return Math.floor(m/11*2);case o.KANJI:return Math.floor(m/13);default:return Math.floor(m/8)}},i.getBestVersionForData=function(y,I){let b;const L=t.from(I,t.M);if(Array.isArray(y)){if(y.length>1)return function N(h,y){for(let I=1;I<=40;I++)if(B(h,I)<=i.getCapacity(I,y,o.MIXED))return I}(y,L);if(0===y.length)return 1;b=y[0]}else b=y;return function l(h,y,I){for(let b=1;b<=40;b++)if(y<=i.getCapacity(b,I,h))return b}(b.mode,b.getLength(),L)},i.getEncodedBits=function(y){if(!r.isValid(y)||y<7)throw new Error("Invalid QR Code version");let I=y<<12;for(;s.getBCHDigit(I)-e>=0;)I^=7973<<s.getBCHDigit(I)-e;return y<<12|I}},4649:(S,i,c)=>{const s=c(7077);i.render=function(r,u,e){let l=e,a=u;typeof l>"u"&&(!u||!u.getContext)&&(l=u,u=void 0),u||(a=function t(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}()),l=s.getOptions(l);const B=s.getImageWidth(r.modules.size,l),N=a.getContext("2d"),h=N.createImageData(B,B);return s.qrToImageData(h.data,r,l),function n(o,r,u){o.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=u,r.width=u,r.style.height=u+"px",r.style.width=u+"px"}(N,a,B),N.putImageData(h,0,0),a},i.renderToDataURL=function(r,u,e){let l=e;return typeof l>"u"&&(!u||!u.getContext)&&(l=u,u=void 0),l||(l={}),i.render(r,u,l).toDataURL(l.type||"image/png",(l.rendererOpts||{}).quality)}},6511:(S,i,c)=>{const s=c(7077);function n(r,u){const e=r.a/255,l=u+'="'+r.hex+'"';return e<1?l+" "+u+'-opacity="'+e.toFixed(2).slice(1)+'"':l}function t(r,u,e){let l=r+u;return typeof e<"u"&&(l+=" "+e),l}i.render=function(u,e,l){const a=s.getOptions(e),B=u.modules.size,N=u.modules.data,h=B+2*a.margin,y=a.color.light.a?"<path "+n(a.color.light,"fill")+' d="M0 0h'+h+"v"+h+'H0z"/>':"",I="<path "+n(a.color.dark,"stroke")+' d="'+function o(r,u,e){let l="",a=0,B=!1,N=0;for(let h=0;h<r.length;h++){const y=Math.floor(h%u),I=Math.floor(h/u);!y&&!B&&(B=!0),r[h]?(N++,h>0&&y>0&&r[h-1]||(l+=B?t("M",y+e,.5+I+e):t("m",a,0),a=0,B=!1),y+1<u&&r[h+1]||(l+=t("h",N),N=0)):a++}return l}(N,B,a.margin)+'"/>',d='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+'viewBox="0 0 '+h+" "+h+'" shape-rendering="crispEdges">'+y+I+"</svg>\n";return"function"==typeof l&&l(null,d),d}},7077:(S,i)=>{function c(s){if("number"==typeof s&&(s=s.toString()),"string"!=typeof s)throw new Error("Color should be defined as hex string");let n=s.slice().replace("#","").split("");if(n.length<3||5===n.length||n.length>8)throw new Error("Invalid hex color: "+s);(3===n.length||4===n.length)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),6===n.length&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:255&t,hex:"#"+n.slice(0,6).join("")}}i.getOptions=function(n){n||(n={}),n.color||(n.color={});const o=n.width&&n.width>=21?n.width:void 0;return{width:o,scale:o?4:n.scale||4,margin:typeof n.margin>"u"||null===n.margin||n.margin<0?4:n.margin,color:{dark:c(n.color.dark||"#000000ff"),light:c(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},i.getScale=function(n,t){return t.width&&t.width>=n+2*t.margin?t.width/(n+2*t.margin):t.scale},i.getImageWidth=function(n,t){const o=i.getScale(n,t);return Math.floor((n+2*t.margin)*o)},i.qrToImageData=function(n,t,o){const r=t.modules.size,u=t.modules.data,e=i.getScale(r,o),l=Math.floor((r+2*o.margin)*e),a=o.margin*e,B=[o.color.light,o.color.dark];for(let N=0;N<l;N++)for(let h=0;h<l;h++){let y=4*(N*l+h),I=o.color.light;N>=a&&h>=a&&N<l-a&&h<l-a&&(I=B[u[Math.floor((N-a)/e)*r+Math.floor((h-a)/e)]?1:0]),n[y++]=I.r,n[y++]=I.g,n[y++]=I.b,n[y]=I.a}}}}]);