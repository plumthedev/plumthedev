!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}i.r(e);var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.aboutElement=e,this.progress=0,this.windowScrollY=window.scrollY,this.aboutElementOffset=this.aboutElement.offsetTop,this.aboutElementHeight=this.aboutElement.offsetHeight,this.lastWindowScroll=this.aboutElementOffset-this.aboutElementHeight/3,this.backgroundPositionPercent=50,window.addEventListener("scroll",this.moveBackground.bind(this)),document.getElementById("scroll-to-about").addEventListener("click",this.scrollToSection.bind(this))}var e,i,s;return e=t,(i=[{key:"moveBackground",value:function(){this.isInRange()&&(this.calcProgress(),this.getBackgroundPositionPercent(),this.aboutElement.style.backgroundPositionY="".concat(this.backgroundPositionPercent,"%"))}},{key:"isInRange",value:function(){return this.windowScrollY=window.scrollY,this.windowScrollY>this.aboutElementOffset-this.aboutElementHeight/3&&this.windowScrollY<this.aboutElementOffset+this.aboutElementHeight}},{key:"calcProgress",value:function(){var t=this.aboutElementOffset-this.aboutElementHeight/3,e=this.windowScrollY-t,i=this.aboutElementOffset+this.aboutElementHeight/3;this.progress=Math.round(e/i*100),this.progress<0&&(this.progress=0),this.progress>100&&(this.progress=100)}},{key:"scrollToSection",value:function(){this.windowScrollY=window.scrollY,history.pushState(null,null,"#about"),window.scroll({top:this.aboutElementOffset,left:0,behavior:"smooth"})}},{key:"getBackgroundPositionPercent",value:function(){var t=5*this.progress-150;t<-200&&(t=-200),t>100&&(t=100),this.backgroundPositionPercent=t}}])&&n(e.prototype,i),s&&n(e,s),t}();function l(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.skillElement=e,this.windowScrollY=window.scrollY,this.win,this.skillElementOffset=this.skillElement.offsetTop,this.skillElementHeight=this.skillElement.offsetHeight,this.progress=0,this.translateYPercent=0,window.addEventListener("scroll",this.move.bind(this)),this.move.call(this)}var e,i,n;return e=t,(i=[{key:"canMove",value:function(){return this.windowScrollY=window.scrollY,this.windowScrollY>this.skillElementOffset-(window.innerHeight-this.skillElementHeight)}},{key:"move",value:function(){this.canMove()&&window.innerWidth>768&&(this.calcProgress(),this.getTranslateYPercent(),this.skillElement.style.transform="translateX("+this.translateYPercent+"px)"),this.isVisible()&&this.addAnimationClasses("skill-anim-hide","skill-anim-show")}},{key:"addAnimationClasses",value:function(t,e){this.skillElement.classList.contains(t)&&this.skillElement.classList.remove(t),this.skillElement.classList.contains(e)||this.skillElement.classList.add(e)}},{key:"isVisible",value:function(){var t=this.windowScrollY+(window.innerHeight-.15*window.innerHeight);return t>this.skillElementOffset&&t<this.skillElementOffset+window.innerHeight+this.skillElementHeight}},{key:"calcProgress",value:function(){var t=this.skillElementOffset-(window.innerHeight-this.skillElementHeight),e=this.windowScrollY-t,i=this.skillElementOffset-window.innerHeight/2;this.progress=Math.round(e/i*100),this.progress<0&&(this.progress=0),this.progress>100&&(this.progress=100)}},{key:"getTranslateYPercent",value:function(){var t=4*this.progress;t<=-40&&(t=-40),t>40&&(t=40),this.skillElement.classList.contains("skills__list-item--right")&&(t*=-1),this.translateYPercent=t}}])&&l(e.prototype,i),n&&l(e,n),t}();function r(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.skillsElement=e,this.allSkillsElements=[],this.allSkills=[],this.collectAllSkills.call(this)}var e,i,n;return e=t,(i=[{key:"collectAllSkills",value:function(){var t=this;this.allSkillsElements=this.skillsElement.querySelectorAll(".skills__list-item"),this.allSkillsElements.forEach(function(e){t.allSkills.push(new o(e))})}}])&&r(e.prototype,i),n&&r(e,n),t}(),c=document.getElementById("about"),h=document.getElementById("skills");c&&new s(c).moveBackground(),h&&new a(h)}]);