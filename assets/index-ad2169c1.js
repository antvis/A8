(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.16.0
 * @author George Michael Brower
 * @license MIT
 */class se{constructor(t,i,r,a,n="div"){this.parent=t,this.object=i,this.property=r,this._disabled=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(a),this.$name=document.createElement("div"),this.$name.classList.add("name"),se.nextNameID=se.nextNameID||0,this.$name.id=`lil-gui-name-${++se.nextNameID}`,this.$widget=document.createElement(n),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback),this.updateDisplay()}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class pi extends se{constructor(t,i,r){super(t,i,r,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Rt(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const Ai={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:Rt,toHexString:Rt},be={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},hi={isPrimitive:!1,match:Array.isArray,fromHexString(e,t,i=1){const r=be.fromHexString(e);t[0]=(r>>16&255)/255*i,t[1]=(r>>8&255)/255*i,t[2]=(r&255)/255*i},toHexString([e,t,i],r=1){r=255/r;const a=e*r<<16^t*r<<8^i*r<<0;return be.toHexString(a)}},Ti={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const r=be.fromHexString(e);t.r=(r>>16&255)/255*i,t.g=(r>>8&255)/255*i,t.b=(r&255)/255*i},toHexString({r:e,g:t,b:i},r=1){r=255/r;const a=e*r<<16^t*r<<8^i*r<<0;return be.toHexString(a)}},gi=[Ai,be,hi,Ti];function mi(e){return gi.find(t=>t.match(e))}class Si extends se{constructor(t,i,r,a){super(t,i,r,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=mi(this.initialValue),this._rgbScale=a,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const n=Rt(this.$text.value);n&&this._setValueFromHexString(n)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class lt extends se{constructor(t,i,r){super(t,i,r,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",a=>{a.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{}),this.$disable=this.$button}}class Ni extends se{constructor(t,i,r,a,n,o){super(t,i,r,"number"),this._initInput(),this.min(a),this.max(n);const s=o!==void 0;this.step(s?o:this._getImplicitStep(),s),this.updateDisplay()}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=t),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{const A=parseFloat(this.$input.value);isNaN(A)||this.setValue(this._clamp(A))},i=A=>{const p=parseFloat(this.$input.value);isNaN(p)||(this._snapClampSetValue(p+A),this.$input.value=this.getValue())},r=A=>{A.code==="Enter"&&this.$input.blur(),A.code==="ArrowUp"&&(A.preventDefault(),i(this._step*this._arrowKeyMultiplier(A))),A.code==="ArrowDown"&&(A.preventDefault(),i(this._step*this._arrowKeyMultiplier(A)*-1))},a=A=>{this._inputFocused&&(A.preventDefault(),i(this._step*this._normalizeMouseWheel(A)))};let n=!1,o,s,u,l,c;const _=5,E=A=>{o=A.clientX,s=u=A.clientY,n=!0,l=this.getValue(),c=0,window.addEventListener("mousemove",d),window.addEventListener("mouseup",h)},d=A=>{if(n){const p=A.clientX-o,S=A.clientY-s;Math.abs(S)>_?(A.preventDefault(),this.$input.blur(),n=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(p)>_&&h()}if(!n){const p=A.clientY-u;c-=p*this._step*this._arrowKeyMultiplier(A),l+c>this._max?c=this._max-l:l+c<this._min&&(c=this._min-l),this._snapClampSetValue(l+c)}u=A.clientY},h=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",h)},m=()=>{this._inputFocused=!0},R=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",a),this.$input.addEventListener("mousedown",E),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",R)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(A,p,S,I,y)=>(A-p)/(S-p)*(y-I)+I,i=A=>{const p=this.$slider.getBoundingClientRect();let S=t(A,p.left,p.right,this._min,this._max);this._snapClampSetValue(S)},r=A=>{this._setDraggingStyle(!0),i(A.clientX),window.addEventListener("mousemove",a),window.addEventListener("mouseup",n)},a=A=>{i(A.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",n)};let o=!1,s,u;const l=A=>{A.preventDefault(),this._setDraggingStyle(!0),i(A.touches[0].clientX),o=!1},c=A=>{A.touches.length>1||(this._hasScrollBar?(s=A.touches[0].clientX,u=A.touches[0].clientY,o=!0):l(A),window.addEventListener("touchmove",_),window.addEventListener("touchend",E))},_=A=>{if(o){const p=A.touches[0].clientX-s,S=A.touches[0].clientY-u;Math.abs(p)>Math.abs(S)?l(A):(window.removeEventListener("touchmove",_),window.removeEventListener("touchend",E))}else A.preventDefault(),i(A.touches[0].clientX)},E=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",_),window.removeEventListener("touchend",E)},d=this._callOnFinishChange.bind(this),h=400;let m;const R=A=>{if(Math.abs(A.deltaX)<Math.abs(A.deltaY)&&this._hasScrollBar)return;A.preventDefault();const S=this._normalizeMouseWheel(A)*this._step;this._snapClampSetValue(this.getValue()+S),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(d,h)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",c),this.$slider.addEventListener("wheel",R)}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:r}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,r=-t.wheelDelta/120,r*=this._stepExplicit?1:10),i+-r}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){const i=Math.round(t/this._step)*this._step;return parseFloat(i.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class vi extends se{constructor(t,i,r,a){super(t,i,r,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(a)?a:Object.values(a),this._names=Array.isArray(a)?a:Object.keys(a),this._names.forEach(n=>{const o=document.createElement("option");o.innerHTML=n,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.innerHTML=i===-1?t:this._names[i],this}}class Ci extends se{constructor(t,i,r){super(t,i,r,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",a=>{a.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Ii=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Bi(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Mt=!1;class mt{constructor({parent:t,autoPlace:i=t===void 0,container:r,width:a,title:n="Controls",injectStyles:o=!0,touchStyles:s=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",u=>{(u.code==="Enter"||u.code==="Space")&&(u.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(n),s&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Mt&&o&&(Bi(Ii),Mt=!0),r?r.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),a&&this.domElement.style.setProperty("--width",a+"px"),this.domElement.addEventListener("keydown",u=>u.stopPropagation()),this.domElement.addEventListener("keyup",u=>u.stopPropagation())}add(t,i,r,a,n){if(Object(r)===r)return new vi(this,t,i,r);const o=t[i];switch(typeof o){case"number":return new Ni(this,t,i,r,a,n);case"boolean":return new pi(this,t,i);case"string":return new Ci(this,t,i);case"function":return new lt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,o)}addColor(t,i,r=1){return new Si(this,t,i,r)}addFolder(t){return new mt({parent:this,title:t})}load(t,i=!0){return t.controllers&&this.controllers.forEach(r=>{r instanceof lt||r._name in t.controllers&&r.load(t.controllers[r._name])}),i&&t.folders&&this.folders.forEach(r=>{r._title in t.folders&&r.load(t.folders[r._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof lt)){if(r._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);i.controllers[r._name]=r.save()}}),t&&this.folders.forEach(r=>{if(r._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);i.folders[r._title]=r.save()}),i}open(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const r=n=>{n.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const a=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=a+"px"})}),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}var Oi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof{}<"u"?{}:typeof self<"u"?self:{};function jt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Zt={exports:{}};(function(e,t){(function(i,r){e.exports=r()})(Oi,function(){var i=function(){function r(d){return o.appendChild(d.dom),d}function a(d){for(var h=0;h<o.children.length;h++)o.children[h].style.display=h===d?"block":"none";n=d}var n=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(d){d.preventDefault(),a(++n%o.children.length)},!1);var s=(performance||Date).now(),u=s,l=0,c=r(new i.Panel("FPS","#0ff","#002")),_=r(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var E=r(new i.Panel("MB","#f08","#201"));return a(0),{REVISION:16,dom:o,addPanel:r,showPanel:a,begin:function(){s=(performance||Date).now()},end:function(){l++;var d=(performance||Date).now();if(_.update(d-s,200),d>u+1e3&&(c.update(1e3*l/(d-u),100),u=d,l=0,E)){var h=performance.memory;E.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return d},update:function(){s=this.end()},domElement:o,setMode:a}};return i.Panel=function(r,a,n){var o=1/0,s=0,u=Math.round,l=u(window.devicePixelRatio||1),c=80*l,_=48*l,E=3*l,d=2*l,h=3*l,m=15*l,R=74*l,A=30*l,p=document.createElement("canvas");p.width=c,p.height=_,p.style.cssText="width:80px;height:48px";var S=p.getContext("2d");return S.font="bold "+9*l+"px Helvetica,Arial,sans-serif",S.textBaseline="top",S.fillStyle=n,S.fillRect(0,0,c,_),S.fillStyle=a,S.fillText(r,E,d),S.fillRect(h,m,R,A),S.fillStyle=n,S.globalAlpha=.9,S.fillRect(h,m,R,A),{dom:p,update:function(I,y){o=Math.min(o,I),s=Math.max(s,I),S.fillStyle=n,S.globalAlpha=1,S.fillRect(0,0,c,m),S.fillStyle=a,S.fillText(u(I)+" "+r+" ("+u(o)+"-"+u(s)+")",E,d),S.drawImage(p,h+l,m,R-l,A,h,m,R-l,A),S.fillRect(h+R-l,m,l,A),S.fillStyle=n,S.globalAlpha=.9,S.fillRect(h+R-l,m,l,u((1-I/y)*A))}}},i})})(Zt);var Pi=Zt.exports;const Mi=jt(Pi);class Ui{constructor(t){this.options=t,this.dataArray=new Uint8Array(512).fill(0),this.mouse={pos:{x:0,y:0},click:0},this.oninit=()=>{},this.onframe=()=>{},t.data&&this.initAnalyser(),t.effect&&this.initEffect(),this.initMouseListener()}initAnalyser(){const{data:t}=this.options,i=new AudioContext,r=i.createMediaElementSource(t),a=i.createAnalyser();this.analyser=a,r.connect(a),a.connect(i.destination),a.fftSize=512;const n=a.frequencyBinCount,o=new Uint8Array(n);this.dataArray=o}initEffect(){const{canvas:t,effect:i}=this.options;this.ready=i.init(t),this.oninit&&this.ready.then(this.oninit)}initMouseListener(){const{canvas:t}=this.options,i=this.mouse;t.addEventListener("mousemove",r=>{i.click&&(i.pos.x=r.offsetX,i.pos.y=r.offsetY)}),t.addEventListener("mousedown",r=>{i.click=1}),t.addEventListener("mouseup",r=>{i.click=0})}data(t){return this.options.data=t,this.initAnalyser(),this}effect(t){return this.options.effect&&t!==this.options.effect&&this.options.effect.destroy(),this.options.effect=t,this.initEffect(),this}style(t){var i;return(i=this.options.effect)==null||i.update(t),this}async play(){await this.ready;let t=0;const i=r=>{var a;(a=this.analyser)==null||a.getByteFrequencyData(this.dataArray),this.options.effect.frame(t,r/1e3,this.mouse,this.dataArray),this.onframe(),t++,this.timer=requestAnimationFrame(i)};this.timer=requestAnimationFrame(i)}resize(t,i){const{canvas:r}=this.options,a=r;a.width=t*window.devicePixelRatio,a.height=i*window.devicePixelRatio,a.style.width=`${a.width/window.devicePixelRatio}px`,a.style.height=`${a.height/window.devicePixelRatio}px`,this.options.effect.resize(a.width,a.height)}destroy(){this.timer&&cancelAnimationFrame(this.timer),this.options.effect.destroy(),this.analyser&&this.analyser.disconnect()}}var ft=function(e,t){return ft=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,r){i.__proto__=r}||function(i,r){for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[a]=r[a])},ft(e,t)};function X(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");ft(e,t);function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)}var V=function(){return V=Object.assign||function(t){for(var i,r=1,a=arguments.length;r<a;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},V.apply(this,arguments)};function yi(e,t){var i={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(i[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(i[r[a]]=e[r[a]]);return i}function Ue(e,t,i,r){function a(n){return n instanceof i?n:new i(function(o){o(n)})}return new(i||(i=Promise))(function(n,o){function s(c){try{l(r.next(c))}catch(_){o(_)}}function u(c){try{l(r.throw(c))}catch(_){o(_)}}function l(c){c.done?n(c.value):a(c.value).then(s,u)}l((r=r.apply(e,t||[])).next())})}function ye(e,t){var i={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},r,a,n,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(l){return function(c){return u([l,c])}}function u(l){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(i=0)),i;)try{if(r=1,a&&(n=l[0]&2?a.return:l[0]?a.throw||((n=a.return)&&n.call(a),0):a.next)&&!(n=n.call(a,l[1])).done)return n;switch(a=0,n&&(l=[l[0]&2,n.value]),l[0]){case 0:case 1:n=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,a=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(n=i.trys,!(n=n.length>0&&n[n.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!n||l[1]>n[0]&&l[1]<n[3])){i.label=l[1];break}if(l[0]===6&&i.label<n[1]){i.label=n[1],n=l;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(l);break}n[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(e,i)}catch(c){l=[6,c],a=0}finally{r=n=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Fe(e){var t=typeof Symbol=="function"&&Symbol.iterator,i=t&&e[t],r=0;if(i)return i.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function pt(e,t){var i=typeof Symbol=="function"&&e[Symbol.iterator];if(!i)return e;var r=i.call(e),a,n=[],o;try{for(;(t===void 0||t-- >0)&&!(a=r.next()).done;)n.push(a.value)}catch(s){o={error:s}}finally{try{a&&!a.done&&(i=r.return)&&i.call(r)}finally{if(o)throw o.error}}return n}var xi=function(e){return e==null};const rt=xi;var Di={}.toString,bi=function(e,t){return Di.call(e)==="[object "+t+"]"};const Fi=bi;var wi=function(e,t,i){return e<t?t:e>i?i:e};const Xi=wi;var Vi=function(e){return Fi(e,"Number")};const ve=Vi;var Lt={exports:{}};(function(e){var t=Object.prototype.hasOwnProperty,i="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(i=!1));function a(u,l,c){this.fn=u,this.context=l,this.once=c||!1}function n(u,l,c,_,E){if(typeof c!="function")throw new TypeError("The listener must be a function");var d=new a(c,_||u,E),h=i?i+l:l;return u._events[h]?u._events[h].fn?u._events[h]=[u._events[h],d]:u._events[h].push(d):(u._events[h]=d,u._eventsCount++),u}function o(u,l){--u._eventsCount===0?u._events=new r:delete u._events[l]}function s(){this._events=new r,this._eventsCount=0}s.prototype.eventNames=function(){var l=[],c,_;if(this._eventsCount===0)return l;for(_ in c=this._events)t.call(c,_)&&l.push(i?_.slice(1):_);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(c)):l},s.prototype.listeners=function(l){var c=i?i+l:l,_=this._events[c];if(!_)return[];if(_.fn)return[_.fn];for(var E=0,d=_.length,h=new Array(d);E<d;E++)h[E]=_[E].fn;return h},s.prototype.listenerCount=function(l){var c=i?i+l:l,_=this._events[c];return _?_.fn?1:_.length:0},s.prototype.emit=function(l,c,_,E,d,h){var m=i?i+l:l;if(!this._events[m])return!1;var R=this._events[m],A=arguments.length,p,S;if(R.fn){switch(R.once&&this.removeListener(l,R.fn,void 0,!0),A){case 1:return R.fn.call(R.context),!0;case 2:return R.fn.call(R.context,c),!0;case 3:return R.fn.call(R.context,c,_),!0;case 4:return R.fn.call(R.context,c,_,E),!0;case 5:return R.fn.call(R.context,c,_,E,d),!0;case 6:return R.fn.call(R.context,c,_,E,d,h),!0}for(S=1,p=new Array(A-1);S<A;S++)p[S-1]=arguments[S];R.fn.apply(R.context,p)}else{var I=R.length,y;for(S=0;S<I;S++)switch(R[S].once&&this.removeListener(l,R[S].fn,void 0,!0),A){case 1:R[S].fn.call(R[S].context);break;case 2:R[S].fn.call(R[S].context,c);break;case 3:R[S].fn.call(R[S].context,c,_);break;case 4:R[S].fn.call(R[S].context,c,_,E);break;default:if(!p)for(y=1,p=new Array(A-1);y<A;y++)p[y-1]=arguments[y];R[S].fn.apply(R[S].context,p)}}return!0},s.prototype.on=function(l,c,_){return n(this,l,c,_,!1)},s.prototype.once=function(l,c,_){return n(this,l,c,_,!0)},s.prototype.removeListener=function(l,c,_,E){var d=i?i+l:l;if(!this._events[d])return this;if(!c)return o(this,d),this;var h=this._events[d];if(h.fn)h.fn===c&&(!E||h.once)&&(!_||h.context===_)&&o(this,d);else{for(var m=0,R=[],A=h.length;m<A;m++)(h[m].fn!==c||E&&!h[m].once||_&&h[m].context!==_)&&R.push(h[m]);R.length?this._events[d]=R.length===1?R[0]:R:o(this,d)}return this},s.prototype.removeAllListeners=function(l){var c;return l?(c=i?i+l:l,this._events[c]&&o(this,c)):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=i,s.EventEmitter=s,e.exports=s})(Lt);var Hi=Lt.exports;const Qt=jt(Hi);var f;(function(e){e[e.DEPTH_BUFFER_BIT=256]="DEPTH_BUFFER_BIT",e[e.STENCIL_BUFFER_BIT=1024]="STENCIL_BUFFER_BIT",e[e.COLOR_BUFFER_BIT=16384]="COLOR_BUFFER_BIT",e[e.POINTS=0]="POINTS",e[e.LINES=1]="LINES",e[e.LINE_LOOP=2]="LINE_LOOP",e[e.LINE_STRIP=3]="LINE_STRIP",e[e.TRIANGLES=4]="TRIANGLES",e[e.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",e[e.TRIANGLE_FAN=6]="TRIANGLE_FAN",e[e.ZERO=0]="ZERO",e[e.ONE=1]="ONE",e[e.SRC_COLOR=768]="SRC_COLOR",e[e.ONE_MINUS_SRC_COLOR=769]="ONE_MINUS_SRC_COLOR",e[e.SRC_ALPHA=770]="SRC_ALPHA",e[e.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",e[e.DST_ALPHA=772]="DST_ALPHA",e[e.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",e[e.DST_COLOR=774]="DST_COLOR",e[e.ONE_MINUS_DST_COLOR=775]="ONE_MINUS_DST_COLOR",e[e.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE",e[e.CONSTANT_COLOR=32769]="CONSTANT_COLOR",e[e.ONE_MINUS_CONSTANT_COLOR=32770]="ONE_MINUS_CONSTANT_COLOR",e[e.CONSTANT_ALPHA=32771]="CONSTANT_ALPHA",e[e.ONE_MINUS_CONSTANT_ALPHA=32772]="ONE_MINUS_CONSTANT_ALPHA",e[e.FUNC_ADD=32774]="FUNC_ADD",e[e.FUNC_SUBTRACT=32778]="FUNC_SUBTRACT",e[e.FUNC_REVERSE_SUBTRACT=32779]="FUNC_REVERSE_SUBTRACT",e[e.BLEND_EQUATION=32777]="BLEND_EQUATION",e[e.BLEND_EQUATION_RGB=32777]="BLEND_EQUATION_RGB",e[e.BLEND_EQUATION_ALPHA=34877]="BLEND_EQUATION_ALPHA",e[e.BLEND_DST_RGB=32968]="BLEND_DST_RGB",e[e.BLEND_SRC_RGB=32969]="BLEND_SRC_RGB",e[e.BLEND_DST_ALPHA=32970]="BLEND_DST_ALPHA",e[e.BLEND_SRC_ALPHA=32971]="BLEND_SRC_ALPHA",e[e.BLEND_COLOR=32773]="BLEND_COLOR",e[e.ARRAY_BUFFER_BINDING=34964]="ARRAY_BUFFER_BINDING",e[e.ELEMENT_ARRAY_BUFFER_BINDING=34965]="ELEMENT_ARRAY_BUFFER_BINDING",e[e.LINE_WIDTH=2849]="LINE_WIDTH",e[e.ALIASED_POINT_SIZE_RANGE=33901]="ALIASED_POINT_SIZE_RANGE",e[e.ALIASED_LINE_WIDTH_RANGE=33902]="ALIASED_LINE_WIDTH_RANGE",e[e.CULL_FACE_MODE=2885]="CULL_FACE_MODE",e[e.FRONT_FACE=2886]="FRONT_FACE",e[e.DEPTH_RANGE=2928]="DEPTH_RANGE",e[e.DEPTH_WRITEMASK=2930]="DEPTH_WRITEMASK",e[e.DEPTH_CLEAR_VALUE=2931]="DEPTH_CLEAR_VALUE",e[e.DEPTH_FUNC=2932]="DEPTH_FUNC",e[e.STENCIL_CLEAR_VALUE=2961]="STENCIL_CLEAR_VALUE",e[e.STENCIL_FUNC=2962]="STENCIL_FUNC",e[e.STENCIL_FAIL=2964]="STENCIL_FAIL",e[e.STENCIL_PASS_DEPTH_FAIL=2965]="STENCIL_PASS_DEPTH_FAIL",e[e.STENCIL_PASS_DEPTH_PASS=2966]="STENCIL_PASS_DEPTH_PASS",e[e.STENCIL_REF=2967]="STENCIL_REF",e[e.STENCIL_VALUE_MASK=2963]="STENCIL_VALUE_MASK",e[e.STENCIL_WRITEMASK=2968]="STENCIL_WRITEMASK",e[e.STENCIL_BACK_FUNC=34816]="STENCIL_BACK_FUNC",e[e.STENCIL_BACK_FAIL=34817]="STENCIL_BACK_FAIL",e[e.STENCIL_BACK_PASS_DEPTH_FAIL=34818]="STENCIL_BACK_PASS_DEPTH_FAIL",e[e.STENCIL_BACK_PASS_DEPTH_PASS=34819]="STENCIL_BACK_PASS_DEPTH_PASS",e[e.STENCIL_BACK_REF=36003]="STENCIL_BACK_REF",e[e.STENCIL_BACK_VALUE_MASK=36004]="STENCIL_BACK_VALUE_MASK",e[e.STENCIL_BACK_WRITEMASK=36005]="STENCIL_BACK_WRITEMASK",e[e.VIEWPORT=2978]="VIEWPORT",e[e.SCISSOR_BOX=3088]="SCISSOR_BOX",e[e.COLOR_CLEAR_VALUE=3106]="COLOR_CLEAR_VALUE",e[e.COLOR_WRITEMASK=3107]="COLOR_WRITEMASK",e[e.UNPACK_ALIGNMENT=3317]="UNPACK_ALIGNMENT",e[e.PACK_ALIGNMENT=3333]="PACK_ALIGNMENT",e[e.MAX_TEXTURE_SIZE=3379]="MAX_TEXTURE_SIZE",e[e.MAX_VIEWPORT_DIMS=3386]="MAX_VIEWPORT_DIMS",e[e.SUBPIXEL_BITS=3408]="SUBPIXEL_BITS",e[e.RED_BITS=3410]="RED_BITS",e[e.GREEN_BITS=3411]="GREEN_BITS",e[e.BLUE_BITS=3412]="BLUE_BITS",e[e.ALPHA_BITS=3413]="ALPHA_BITS",e[e.DEPTH_BITS=3414]="DEPTH_BITS",e[e.STENCIL_BITS=3415]="STENCIL_BITS",e[e.POLYGON_OFFSET_UNITS=10752]="POLYGON_OFFSET_UNITS",e[e.POLYGON_OFFSET_FACTOR=32824]="POLYGON_OFFSET_FACTOR",e[e.TEXTURE_BINDING_2D=32873]="TEXTURE_BINDING_2D",e[e.SAMPLE_BUFFERS=32936]="SAMPLE_BUFFERS",e[e.SAMPLES=32937]="SAMPLES",e[e.SAMPLE_COVERAGE_VALUE=32938]="SAMPLE_COVERAGE_VALUE",e[e.SAMPLE_COVERAGE_INVERT=32939]="SAMPLE_COVERAGE_INVERT",e[e.COMPRESSED_TEXTURE_FORMATS=34467]="COMPRESSED_TEXTURE_FORMATS",e[e.VENDOR=7936]="VENDOR",e[e.RENDERER=7937]="RENDERER",e[e.VERSION=7938]="VERSION",e[e.IMPLEMENTATION_COLOR_READ_TYPE=35738]="IMPLEMENTATION_COLOR_READ_TYPE",e[e.IMPLEMENTATION_COLOR_READ_FORMAT=35739]="IMPLEMENTATION_COLOR_READ_FORMAT",e[e.BROWSER_DEFAULT_WEBGL=37444]="BROWSER_DEFAULT_WEBGL",e[e.STATIC_DRAW=35044]="STATIC_DRAW",e[e.STREAM_DRAW=35040]="STREAM_DRAW",e[e.DYNAMIC_DRAW=35048]="DYNAMIC_DRAW",e[e.ARRAY_BUFFER=34962]="ARRAY_BUFFER",e[e.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",e[e.BUFFER_SIZE=34660]="BUFFER_SIZE",e[e.BUFFER_USAGE=34661]="BUFFER_USAGE",e[e.CURRENT_VERTEX_ATTRIB=34342]="CURRENT_VERTEX_ATTRIB",e[e.VERTEX_ATTRIB_ARRAY_ENABLED=34338]="VERTEX_ATTRIB_ARRAY_ENABLED",e[e.VERTEX_ATTRIB_ARRAY_SIZE=34339]="VERTEX_ATTRIB_ARRAY_SIZE",e[e.VERTEX_ATTRIB_ARRAY_STRIDE=34340]="VERTEX_ATTRIB_ARRAY_STRIDE",e[e.VERTEX_ATTRIB_ARRAY_TYPE=34341]="VERTEX_ATTRIB_ARRAY_TYPE",e[e.VERTEX_ATTRIB_ARRAY_NORMALIZED=34922]="VERTEX_ATTRIB_ARRAY_NORMALIZED",e[e.VERTEX_ATTRIB_ARRAY_POINTER=34373]="VERTEX_ATTRIB_ARRAY_POINTER",e[e.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=34975]="VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",e[e.CULL_FACE=2884]="CULL_FACE",e[e.FRONT=1028]="FRONT",e[e.BACK=1029]="BACK",e[e.FRONT_AND_BACK=1032]="FRONT_AND_BACK",e[e.BLEND=3042]="BLEND",e[e.DEPTH_TEST=2929]="DEPTH_TEST",e[e.DITHER=3024]="DITHER",e[e.POLYGON_OFFSET_FILL=32823]="POLYGON_OFFSET_FILL",e[e.SAMPLE_ALPHA_TO_COVERAGE=32926]="SAMPLE_ALPHA_TO_COVERAGE",e[e.SAMPLE_COVERAGE=32928]="SAMPLE_COVERAGE",e[e.SCISSOR_TEST=3089]="SCISSOR_TEST",e[e.STENCIL_TEST=2960]="STENCIL_TEST",e[e.NO_ERROR=0]="NO_ERROR",e[e.INVALID_ENUM=1280]="INVALID_ENUM",e[e.INVALID_VALUE=1281]="INVALID_VALUE",e[e.INVALID_OPERATION=1282]="INVALID_OPERATION",e[e.OUT_OF_MEMORY=1285]="OUT_OF_MEMORY",e[e.CONTEXT_LOST_WEBGL=37442]="CONTEXT_LOST_WEBGL",e[e.CW=2304]="CW",e[e.CCW=2305]="CCW",e[e.DONT_CARE=4352]="DONT_CARE",e[e.FASTEST=4353]="FASTEST",e[e.NICEST=4354]="NICEST",e[e.GENERATE_MIPMAP_HINT=33170]="GENERATE_MIPMAP_HINT",e[e.BYTE=5120]="BYTE",e[e.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",e[e.SHORT=5122]="SHORT",e[e.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",e[e.INT=5124]="INT",e[e.UNSIGNED_INT=5125]="UNSIGNED_INT",e[e.FLOAT=5126]="FLOAT",e[e.DOUBLE=5130]="DOUBLE",e[e.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",e[e.ALPHA=6406]="ALPHA",e[e.RGB=6407]="RGB",e[e.RGBA=6408]="RGBA",e[e.LUMINANCE=6409]="LUMINANCE",e[e.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",e[e.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",e[e.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",e[e.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",e[e.FRAGMENT_SHADER=35632]="FRAGMENT_SHADER",e[e.VERTEX_SHADER=35633]="VERTEX_SHADER",e[e.COMPILE_STATUS=35713]="COMPILE_STATUS",e[e.DELETE_STATUS=35712]="DELETE_STATUS",e[e.LINK_STATUS=35714]="LINK_STATUS",e[e.VALIDATE_STATUS=35715]="VALIDATE_STATUS",e[e.ATTACHED_SHADERS=35717]="ATTACHED_SHADERS",e[e.ACTIVE_ATTRIBUTES=35721]="ACTIVE_ATTRIBUTES",e[e.ACTIVE_UNIFORMS=35718]="ACTIVE_UNIFORMS",e[e.MAX_VERTEX_ATTRIBS=34921]="MAX_VERTEX_ATTRIBS",e[e.MAX_VERTEX_UNIFORM_VECTORS=36347]="MAX_VERTEX_UNIFORM_VECTORS",e[e.MAX_VARYING_VECTORS=36348]="MAX_VARYING_VECTORS",e[e.MAX_COMBINED_TEXTURE_IMAGE_UNITS=35661]="MAX_COMBINED_TEXTURE_IMAGE_UNITS",e[e.MAX_VERTEX_TEXTURE_IMAGE_UNITS=35660]="MAX_VERTEX_TEXTURE_IMAGE_UNITS",e[e.MAX_TEXTURE_IMAGE_UNITS=34930]="MAX_TEXTURE_IMAGE_UNITS",e[e.MAX_FRAGMENT_UNIFORM_VECTORS=36349]="MAX_FRAGMENT_UNIFORM_VECTORS",e[e.SHADER_TYPE=35663]="SHADER_TYPE",e[e.SHADING_LANGUAGE_VERSION=35724]="SHADING_LANGUAGE_VERSION",e[e.CURRENT_PROGRAM=35725]="CURRENT_PROGRAM",e[e.NEVER=512]="NEVER",e[e.ALWAYS=519]="ALWAYS",e[e.LESS=513]="LESS",e[e.EQUAL=514]="EQUAL",e[e.LEQUAL=515]="LEQUAL",e[e.GREATER=516]="GREATER",e[e.GEQUAL=518]="GEQUAL",e[e.NOTEQUAL=517]="NOTEQUAL",e[e.KEEP=7680]="KEEP",e[e.REPLACE=7681]="REPLACE",e[e.INCR=7682]="INCR",e[e.DECR=7683]="DECR",e[e.INVERT=5386]="INVERT",e[e.INCR_WRAP=34055]="INCR_WRAP",e[e.DECR_WRAP=34056]="DECR_WRAP",e[e.NEAREST=9728]="NEAREST",e[e.LINEAR=9729]="LINEAR",e[e.NEAREST_MIPMAP_NEAREST=9984]="NEAREST_MIPMAP_NEAREST",e[e.LINEAR_MIPMAP_NEAREST=9985]="LINEAR_MIPMAP_NEAREST",e[e.NEAREST_MIPMAP_LINEAR=9986]="NEAREST_MIPMAP_LINEAR",e[e.LINEAR_MIPMAP_LINEAR=9987]="LINEAR_MIPMAP_LINEAR",e[e.TEXTURE_MAG_FILTER=10240]="TEXTURE_MAG_FILTER",e[e.TEXTURE_MIN_FILTER=10241]="TEXTURE_MIN_FILTER",e[e.TEXTURE_WRAP_S=10242]="TEXTURE_WRAP_S",e[e.TEXTURE_WRAP_T=10243]="TEXTURE_WRAP_T",e[e.TEXTURE_2D=3553]="TEXTURE_2D",e[e.TEXTURE=5890]="TEXTURE",e[e.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",e[e.TEXTURE_BINDING_CUBE_MAP=34068]="TEXTURE_BINDING_CUBE_MAP",e[e.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",e[e.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",e[e.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",e[e.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",e[e.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",e[e.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",e[e.MAX_CUBE_MAP_TEXTURE_SIZE=34076]="MAX_CUBE_MAP_TEXTURE_SIZE",e[e.TEXTURE0=33984]="TEXTURE0",e[e.ACTIVE_TEXTURE=34016]="ACTIVE_TEXTURE",e[e.REPEAT=10497]="REPEAT",e[e.CLAMP_TO_EDGE=33071]="CLAMP_TO_EDGE",e[e.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",e[e.TEXTURE_WIDTH=4096]="TEXTURE_WIDTH",e[e.TEXTURE_HEIGHT=4097]="TEXTURE_HEIGHT",e[e.FLOAT_VEC2=35664]="FLOAT_VEC2",e[e.FLOAT_VEC3=35665]="FLOAT_VEC3",e[e.FLOAT_VEC4=35666]="FLOAT_VEC4",e[e.INT_VEC2=35667]="INT_VEC2",e[e.INT_VEC3=35668]="INT_VEC3",e[e.INT_VEC4=35669]="INT_VEC4",e[e.BOOL=35670]="BOOL",e[e.BOOL_VEC2=35671]="BOOL_VEC2",e[e.BOOL_VEC3=35672]="BOOL_VEC3",e[e.BOOL_VEC4=35673]="BOOL_VEC4",e[e.FLOAT_MAT2=35674]="FLOAT_MAT2",e[e.FLOAT_MAT3=35675]="FLOAT_MAT3",e[e.FLOAT_MAT4=35676]="FLOAT_MAT4",e[e.SAMPLER_2D=35678]="SAMPLER_2D",e[e.SAMPLER_CUBE=35680]="SAMPLER_CUBE",e[e.LOW_FLOAT=36336]="LOW_FLOAT",e[e.MEDIUM_FLOAT=36337]="MEDIUM_FLOAT",e[e.HIGH_FLOAT=36338]="HIGH_FLOAT",e[e.LOW_INT=36339]="LOW_INT",e[e.MEDIUM_INT=36340]="MEDIUM_INT",e[e.HIGH_INT=36341]="HIGH_INT",e[e.FRAMEBUFFER=36160]="FRAMEBUFFER",e[e.RENDERBUFFER=36161]="RENDERBUFFER",e[e.RGBA4=32854]="RGBA4",e[e.RGB5_A1=32855]="RGB5_A1",e[e.RGB565=36194]="RGB565",e[e.DEPTH_COMPONENT16=33189]="DEPTH_COMPONENT16",e[e.STENCIL_INDEX=6401]="STENCIL_INDEX",e[e.STENCIL_INDEX8=36168]="STENCIL_INDEX8",e[e.DEPTH_STENCIL=34041]="DEPTH_STENCIL",e[e.RENDERBUFFER_WIDTH=36162]="RENDERBUFFER_WIDTH",e[e.RENDERBUFFER_HEIGHT=36163]="RENDERBUFFER_HEIGHT",e[e.RENDERBUFFER_INTERNAL_FORMAT=36164]="RENDERBUFFER_INTERNAL_FORMAT",e[e.RENDERBUFFER_RED_SIZE=36176]="RENDERBUFFER_RED_SIZE",e[e.RENDERBUFFER_GREEN_SIZE=36177]="RENDERBUFFER_GREEN_SIZE",e[e.RENDERBUFFER_BLUE_SIZE=36178]="RENDERBUFFER_BLUE_SIZE",e[e.RENDERBUFFER_ALPHA_SIZE=36179]="RENDERBUFFER_ALPHA_SIZE",e[e.RENDERBUFFER_DEPTH_SIZE=36180]="RENDERBUFFER_DEPTH_SIZE",e[e.RENDERBUFFER_STENCIL_SIZE=36181]="RENDERBUFFER_STENCIL_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE=36048]="FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",e[e.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME=36049]="FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL=36050]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=36051]="FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",e[e.COLOR_ATTACHMENT0=36064]="COLOR_ATTACHMENT0",e[e.DEPTH_ATTACHMENT=36096]="DEPTH_ATTACHMENT",e[e.STENCIL_ATTACHMENT=36128]="STENCIL_ATTACHMENT",e[e.DEPTH_STENCIL_ATTACHMENT=33306]="DEPTH_STENCIL_ATTACHMENT",e[e.NONE=0]="NONE",e[e.FRAMEBUFFER_COMPLETE=36053]="FRAMEBUFFER_COMPLETE",e[e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT=36054]="FRAMEBUFFER_INCOMPLETE_ATTACHMENT",e[e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=36055]="FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",e[e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS=36057]="FRAMEBUFFER_INCOMPLETE_DIMENSIONS",e[e.FRAMEBUFFER_UNSUPPORTED=36061]="FRAMEBUFFER_UNSUPPORTED",e[e.FRAMEBUFFER_BINDING=36006]="FRAMEBUFFER_BINDING",e[e.RENDERBUFFER_BINDING=36007]="RENDERBUFFER_BINDING",e[e.READ_FRAMEBUFFER=36008]="READ_FRAMEBUFFER",e[e.DRAW_FRAMEBUFFER=36009]="DRAW_FRAMEBUFFER",e[e.MAX_RENDERBUFFER_SIZE=34024]="MAX_RENDERBUFFER_SIZE",e[e.INVALID_FRAMEBUFFER_OPERATION=1286]="INVALID_FRAMEBUFFER_OPERATION",e[e.UNPACK_FLIP_Y_WEBGL=37440]="UNPACK_FLIP_Y_WEBGL",e[e.UNPACK_PREMULTIPLY_ALPHA_WEBGL=37441]="UNPACK_PREMULTIPLY_ALPHA_WEBGL",e[e.UNPACK_COLORSPACE_CONVERSION_WEBGL=37443]="UNPACK_COLORSPACE_CONVERSION_WEBGL",e[e.READ_BUFFER=3074]="READ_BUFFER",e[e.UNPACK_ROW_LENGTH=3314]="UNPACK_ROW_LENGTH",e[e.UNPACK_SKIP_ROWS=3315]="UNPACK_SKIP_ROWS",e[e.UNPACK_SKIP_PIXELS=3316]="UNPACK_SKIP_PIXELS",e[e.PACK_ROW_LENGTH=3330]="PACK_ROW_LENGTH",e[e.PACK_SKIP_ROWS=3331]="PACK_SKIP_ROWS",e[e.PACK_SKIP_PIXELS=3332]="PACK_SKIP_PIXELS",e[e.TEXTURE_BINDING_3D=32874]="TEXTURE_BINDING_3D",e[e.UNPACK_SKIP_IMAGES=32877]="UNPACK_SKIP_IMAGES",e[e.UNPACK_IMAGE_HEIGHT=32878]="UNPACK_IMAGE_HEIGHT",e[e.MAX_3D_TEXTURE_SIZE=32883]="MAX_3D_TEXTURE_SIZE",e[e.MAX_ELEMENTS_VERTICES=33e3]="MAX_ELEMENTS_VERTICES",e[e.MAX_ELEMENTS_INDICES=33001]="MAX_ELEMENTS_INDICES",e[e.MAX_TEXTURE_LOD_BIAS=34045]="MAX_TEXTURE_LOD_BIAS",e[e.MAX_FRAGMENT_UNIFORM_COMPONENTS=35657]="MAX_FRAGMENT_UNIFORM_COMPONENTS",e[e.MAX_VERTEX_UNIFORM_COMPONENTS=35658]="MAX_VERTEX_UNIFORM_COMPONENTS",e[e.MAX_ARRAY_TEXTURE_LAYERS=35071]="MAX_ARRAY_TEXTURE_LAYERS",e[e.MIN_PROGRAM_TEXEL_OFFSET=35076]="MIN_PROGRAM_TEXEL_OFFSET",e[e.MAX_PROGRAM_TEXEL_OFFSET=35077]="MAX_PROGRAM_TEXEL_OFFSET",e[e.MAX_VARYING_COMPONENTS=35659]="MAX_VARYING_COMPONENTS",e[e.FRAGMENT_SHADER_DERIVATIVE_HINT=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT",e[e.RASTERIZER_DISCARD=35977]="RASTERIZER_DISCARD",e[e.VERTEX_ARRAY_BINDING=34229]="VERTEX_ARRAY_BINDING",e[e.MAX_VERTEX_OUTPUT_COMPONENTS=37154]="MAX_VERTEX_OUTPUT_COMPONENTS",e[e.MAX_FRAGMENT_INPUT_COMPONENTS=37157]="MAX_FRAGMENT_INPUT_COMPONENTS",e[e.MAX_SERVER_WAIT_TIMEOUT=37137]="MAX_SERVER_WAIT_TIMEOUT",e[e.MAX_ELEMENT_INDEX=36203]="MAX_ELEMENT_INDEX",e[e.RED=6403]="RED",e[e.RGB8=32849]="RGB8",e[e.RGBA8=32856]="RGBA8",e[e.RGB10_A2=32857]="RGB10_A2",e[e.TEXTURE_3D=32879]="TEXTURE_3D",e[e.TEXTURE_WRAP_R=32882]="TEXTURE_WRAP_R",e[e.TEXTURE_MIN_LOD=33082]="TEXTURE_MIN_LOD",e[e.TEXTURE_MAX_LOD=33083]="TEXTURE_MAX_LOD",e[e.TEXTURE_BASE_LEVEL=33084]="TEXTURE_BASE_LEVEL",e[e.TEXTURE_MAX_LEVEL=33085]="TEXTURE_MAX_LEVEL",e[e.TEXTURE_COMPARE_MODE=34892]="TEXTURE_COMPARE_MODE",e[e.TEXTURE_COMPARE_FUNC=34893]="TEXTURE_COMPARE_FUNC",e[e.SRGB=35904]="SRGB",e[e.SRGB8=35905]="SRGB8",e[e.SRGB8_ALPHA8=35907]="SRGB8_ALPHA8",e[e.COMPARE_REF_TO_TEXTURE=34894]="COMPARE_REF_TO_TEXTURE",e[e.RGBA32F=34836]="RGBA32F",e[e.RGB32F=34837]="RGB32F",e[e.RGBA16F=34842]="RGBA16F",e[e.RGB16F=34843]="RGB16F",e[e.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",e[e.TEXTURE_BINDING_2D_ARRAY=35869]="TEXTURE_BINDING_2D_ARRAY",e[e.R11F_G11F_B10F=35898]="R11F_G11F_B10F",e[e.RGB9_E5=35901]="RGB9_E5",e[e.RGBA32UI=36208]="RGBA32UI",e[e.RGB32UI=36209]="RGB32UI",e[e.RGBA16UI=36214]="RGBA16UI",e[e.RGB16UI=36215]="RGB16UI",e[e.RGBA8UI=36220]="RGBA8UI",e[e.RGB8UI=36221]="RGB8UI",e[e.RGBA32I=36226]="RGBA32I",e[e.RGB32I=36227]="RGB32I",e[e.RGBA16I=36232]="RGBA16I",e[e.RGB16I=36233]="RGB16I",e[e.RGBA8I=36238]="RGBA8I",e[e.RGB8I=36239]="RGB8I",e[e.RED_INTEGER=36244]="RED_INTEGER",e[e.RGB_INTEGER=36248]="RGB_INTEGER",e[e.RGBA_INTEGER=36249]="RGBA_INTEGER",e[e.R8=33321]="R8",e[e.RG8=33323]="RG8",e[e.R16F=33325]="R16F",e[e.R32F=33326]="R32F",e[e.RG16F=33327]="RG16F",e[e.RG32F=33328]="RG32F",e[e.R8I=33329]="R8I",e[e.R8UI=33330]="R8UI",e[e.R16I=33331]="R16I",e[e.R16UI=33332]="R16UI",e[e.R32I=33333]="R32I",e[e.R32UI=33334]="R32UI",e[e.RG8I=33335]="RG8I",e[e.RG8UI=33336]="RG8UI",e[e.RG16I=33337]="RG16I",e[e.RG16UI=33338]="RG16UI",e[e.RG32I=33339]="RG32I",e[e.RG32UI=33340]="RG32UI",e[e.R8_SNORM=36756]="R8_SNORM",e[e.RG8_SNORM=36757]="RG8_SNORM",e[e.RGB8_SNORM=36758]="RGB8_SNORM",e[e.RGBA8_SNORM=36759]="RGBA8_SNORM",e[e.RGB10_A2UI=36975]="RGB10_A2UI",e[e.TEXTURE_IMMUTABLE_FORMAT=37167]="TEXTURE_IMMUTABLE_FORMAT",e[e.TEXTURE_IMMUTABLE_LEVELS=33503]="TEXTURE_IMMUTABLE_LEVELS",e[e.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",e[e.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",e[e.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",e[e.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",e[e.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",e[e.HALF_FLOAT=5131]="HALF_FLOAT",e[e.RG=33319]="RG",e[e.RG_INTEGER=33320]="RG_INTEGER",e[e.INT_2_10_10_10_REV=36255]="INT_2_10_10_10_REV",e[e.CURRENT_QUERY=34917]="CURRENT_QUERY",e[e.QUERY_RESULT=34918]="QUERY_RESULT",e[e.QUERY_RESULT_AVAILABLE=34919]="QUERY_RESULT_AVAILABLE",e[e.ANY_SAMPLES_PASSED=35887]="ANY_SAMPLES_PASSED",e[e.ANY_SAMPLES_PASSED_CONSERVATIVE=36202]="ANY_SAMPLES_PASSED_CONSERVATIVE",e[e.MAX_DRAW_BUFFERS=34852]="MAX_DRAW_BUFFERS",e[e.DRAW_BUFFER0=34853]="DRAW_BUFFER0",e[e.DRAW_BUFFER1=34854]="DRAW_BUFFER1",e[e.DRAW_BUFFER2=34855]="DRAW_BUFFER2",e[e.DRAW_BUFFER3=34856]="DRAW_BUFFER3",e[e.DRAW_BUFFER4=34857]="DRAW_BUFFER4",e[e.DRAW_BUFFER5=34858]="DRAW_BUFFER5",e[e.DRAW_BUFFER6=34859]="DRAW_BUFFER6",e[e.DRAW_BUFFER7=34860]="DRAW_BUFFER7",e[e.DRAW_BUFFER8=34861]="DRAW_BUFFER8",e[e.DRAW_BUFFER9=34862]="DRAW_BUFFER9",e[e.DRAW_BUFFER10=34863]="DRAW_BUFFER10",e[e.DRAW_BUFFER11=34864]="DRAW_BUFFER11",e[e.DRAW_BUFFER12=34865]="DRAW_BUFFER12",e[e.DRAW_BUFFER13=34866]="DRAW_BUFFER13",e[e.DRAW_BUFFER14=34867]="DRAW_BUFFER14",e[e.DRAW_BUFFER15=34868]="DRAW_BUFFER15",e[e.MAX_COLOR_ATTACHMENTS=36063]="MAX_COLOR_ATTACHMENTS",e[e.COLOR_ATTACHMENT1=36065]="COLOR_ATTACHMENT1",e[e.COLOR_ATTACHMENT2=36066]="COLOR_ATTACHMENT2",e[e.COLOR_ATTACHMENT3=36067]="COLOR_ATTACHMENT3",e[e.COLOR_ATTACHMENT4=36068]="COLOR_ATTACHMENT4",e[e.COLOR_ATTACHMENT5=36069]="COLOR_ATTACHMENT5",e[e.COLOR_ATTACHMENT6=36070]="COLOR_ATTACHMENT6",e[e.COLOR_ATTACHMENT7=36071]="COLOR_ATTACHMENT7",e[e.COLOR_ATTACHMENT8=36072]="COLOR_ATTACHMENT8",e[e.COLOR_ATTACHMENT9=36073]="COLOR_ATTACHMENT9",e[e.COLOR_ATTACHMENT10=36074]="COLOR_ATTACHMENT10",e[e.COLOR_ATTACHMENT11=36075]="COLOR_ATTACHMENT11",e[e.COLOR_ATTACHMENT12=36076]="COLOR_ATTACHMENT12",e[e.COLOR_ATTACHMENT13=36077]="COLOR_ATTACHMENT13",e[e.COLOR_ATTACHMENT14=36078]="COLOR_ATTACHMENT14",e[e.COLOR_ATTACHMENT15=36079]="COLOR_ATTACHMENT15",e[e.SAMPLER_3D=35679]="SAMPLER_3D",e[e.SAMPLER_2D_SHADOW=35682]="SAMPLER_2D_SHADOW",e[e.SAMPLER_2D_ARRAY=36289]="SAMPLER_2D_ARRAY",e[e.SAMPLER_2D_ARRAY_SHADOW=36292]="SAMPLER_2D_ARRAY_SHADOW",e[e.SAMPLER_CUBE_SHADOW=36293]="SAMPLER_CUBE_SHADOW",e[e.INT_SAMPLER_2D=36298]="INT_SAMPLER_2D",e[e.INT_SAMPLER_3D=36299]="INT_SAMPLER_3D",e[e.INT_SAMPLER_CUBE=36300]="INT_SAMPLER_CUBE",e[e.INT_SAMPLER_2D_ARRAY=36303]="INT_SAMPLER_2D_ARRAY",e[e.UNSIGNED_INT_SAMPLER_2D=36306]="UNSIGNED_INT_SAMPLER_2D",e[e.UNSIGNED_INT_SAMPLER_3D=36307]="UNSIGNED_INT_SAMPLER_3D",e[e.UNSIGNED_INT_SAMPLER_CUBE=36308]="UNSIGNED_INT_SAMPLER_CUBE",e[e.UNSIGNED_INT_SAMPLER_2D_ARRAY=36311]="UNSIGNED_INT_SAMPLER_2D_ARRAY",e[e.MAX_SAMPLES=36183]="MAX_SAMPLES",e[e.SAMPLER_BINDING=35097]="SAMPLER_BINDING",e[e.PIXEL_PACK_BUFFER=35051]="PIXEL_PACK_BUFFER",e[e.PIXEL_UNPACK_BUFFER=35052]="PIXEL_UNPACK_BUFFER",e[e.PIXEL_PACK_BUFFER_BINDING=35053]="PIXEL_PACK_BUFFER_BINDING",e[e.PIXEL_UNPACK_BUFFER_BINDING=35055]="PIXEL_UNPACK_BUFFER_BINDING",e[e.COPY_READ_BUFFER=36662]="COPY_READ_BUFFER",e[e.COPY_WRITE_BUFFER=36663]="COPY_WRITE_BUFFER",e[e.COPY_READ_BUFFER_BINDING=36662]="COPY_READ_BUFFER_BINDING",e[e.COPY_WRITE_BUFFER_BINDING=36663]="COPY_WRITE_BUFFER_BINDING",e[e.FLOAT_MAT2x3=35685]="FLOAT_MAT2x3",e[e.FLOAT_MAT2x4=35686]="FLOAT_MAT2x4",e[e.FLOAT_MAT3x2=35687]="FLOAT_MAT3x2",e[e.FLOAT_MAT3x4=35688]="FLOAT_MAT3x4",e[e.FLOAT_MAT4x2=35689]="FLOAT_MAT4x2",e[e.FLOAT_MAT4x3=35690]="FLOAT_MAT4x3",e[e.UNSIGNED_INT_VEC2=36294]="UNSIGNED_INT_VEC2",e[e.UNSIGNED_INT_VEC3=36295]="UNSIGNED_INT_VEC3",e[e.UNSIGNED_INT_VEC4=36296]="UNSIGNED_INT_VEC4",e[e.UNSIGNED_NORMALIZED=35863]="UNSIGNED_NORMALIZED",e[e.SIGNED_NORMALIZED=36764]="SIGNED_NORMALIZED",e[e.VERTEX_ATTRIB_ARRAY_INTEGER=35069]="VERTEX_ATTRIB_ARRAY_INTEGER",e[e.VERTEX_ATTRIB_ARRAY_DIVISOR=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR",e[e.TRANSFORM_FEEDBACK_BUFFER_MODE=35967]="TRANSFORM_FEEDBACK_BUFFER_MODE",e[e.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS=35968]="MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",e[e.TRANSFORM_FEEDBACK_VARYINGS=35971]="TRANSFORM_FEEDBACK_VARYINGS",e[e.TRANSFORM_FEEDBACK_BUFFER_START=35972]="TRANSFORM_FEEDBACK_BUFFER_START",e[e.TRANSFORM_FEEDBACK_BUFFER_SIZE=35973]="TRANSFORM_FEEDBACK_BUFFER_SIZE",e[e.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN=35976]="TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN",e[e.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS=35978]="MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",e[e.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS=35979]="MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",e[e.INTERLEAVED_ATTRIBS=35980]="INTERLEAVED_ATTRIBS",e[e.SEPARATE_ATTRIBS=35981]="SEPARATE_ATTRIBS",e[e.TRANSFORM_FEEDBACK_BUFFER=35982]="TRANSFORM_FEEDBACK_BUFFER",e[e.TRANSFORM_FEEDBACK_BUFFER_BINDING=35983]="TRANSFORM_FEEDBACK_BUFFER_BINDING",e[e.TRANSFORM_FEEDBACK=36386]="TRANSFORM_FEEDBACK",e[e.TRANSFORM_FEEDBACK_PAUSED=36387]="TRANSFORM_FEEDBACK_PAUSED",e[e.TRANSFORM_FEEDBACK_ACTIVE=36388]="TRANSFORM_FEEDBACK_ACTIVE",e[e.TRANSFORM_FEEDBACK_BINDING=36389]="TRANSFORM_FEEDBACK_BINDING",e[e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING",e[e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE",e[e.FRAMEBUFFER_ATTACHMENT_RED_SIZE=33298]="FRAMEBUFFER_ATTACHMENT_RED_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE=33299]="FRAMEBUFFER_ATTACHMENT_GREEN_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE=33300]="FRAMEBUFFER_ATTACHMENT_BLUE_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE=33301]="FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE=33302]="FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE",e[e.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE=33303]="FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE",e[e.FRAMEBUFFER_DEFAULT=33304]="FRAMEBUFFER_DEFAULT",e[e.DEPTH24_STENCIL8=35056]="DEPTH24_STENCIL8",e[e.DRAW_FRAMEBUFFER_BINDING=36006]="DRAW_FRAMEBUFFER_BINDING",e[e.READ_FRAMEBUFFER_BINDING=36010]="READ_FRAMEBUFFER_BINDING",e[e.RENDERBUFFER_SAMPLES=36011]="RENDERBUFFER_SAMPLES",e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER=36052]="FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER",e[e.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE=36182]="FRAMEBUFFER_INCOMPLETE_MULTISAMPLE",e[e.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",e[e.UNIFORM_BUFFER_BINDING=35368]="UNIFORM_BUFFER_BINDING",e[e.UNIFORM_BUFFER_START=35369]="UNIFORM_BUFFER_START",e[e.UNIFORM_BUFFER_SIZE=35370]="UNIFORM_BUFFER_SIZE",e[e.MAX_VERTEX_UNIFORM_BLOCKS=35371]="MAX_VERTEX_UNIFORM_BLOCKS",e[e.MAX_FRAGMENT_UNIFORM_BLOCKS=35373]="MAX_FRAGMENT_UNIFORM_BLOCKS",e[e.MAX_COMBINED_UNIFORM_BLOCKS=35374]="MAX_COMBINED_UNIFORM_BLOCKS",e[e.MAX_UNIFORM_BUFFER_BINDINGS=35375]="MAX_UNIFORM_BUFFER_BINDINGS",e[e.MAX_UNIFORM_BLOCK_SIZE=35376]="MAX_UNIFORM_BLOCK_SIZE",e[e.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS=35377]="MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",e[e.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS=35379]="MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",e[e.UNIFORM_BUFFER_OFFSET_ALIGNMENT=35380]="UNIFORM_BUFFER_OFFSET_ALIGNMENT",e[e.ACTIVE_UNIFORM_BLOCKS=35382]="ACTIVE_UNIFORM_BLOCKS",e[e.UNIFORM_TYPE=35383]="UNIFORM_TYPE",e[e.UNIFORM_SIZE=35384]="UNIFORM_SIZE",e[e.UNIFORM_BLOCK_INDEX=35386]="UNIFORM_BLOCK_INDEX",e[e.UNIFORM_OFFSET=35387]="UNIFORM_OFFSET",e[e.UNIFORM_ARRAY_STRIDE=35388]="UNIFORM_ARRAY_STRIDE",e[e.UNIFORM_MATRIX_STRIDE=35389]="UNIFORM_MATRIX_STRIDE",e[e.UNIFORM_IS_ROW_MAJOR=35390]="UNIFORM_IS_ROW_MAJOR",e[e.UNIFORM_BLOCK_BINDING=35391]="UNIFORM_BLOCK_BINDING",e[e.UNIFORM_BLOCK_DATA_SIZE=35392]="UNIFORM_BLOCK_DATA_SIZE",e[e.UNIFORM_BLOCK_ACTIVE_UNIFORMS=35394]="UNIFORM_BLOCK_ACTIVE_UNIFORMS",e[e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES=35395]="UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",e[e.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER=35396]="UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER",e[e.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER=35398]="UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER",e[e.OBJECT_TYPE=37138]="OBJECT_TYPE",e[e.SYNC_CONDITION=37139]="SYNC_CONDITION",e[e.SYNC_STATUS=37140]="SYNC_STATUS",e[e.SYNC_FLAGS=37141]="SYNC_FLAGS",e[e.SYNC_FENCE=37142]="SYNC_FENCE",e[e.SYNC_GPU_COMMANDS_COMPLETE=37143]="SYNC_GPU_COMMANDS_COMPLETE",e[e.UNSIGNALED=37144]="UNSIGNALED",e[e.SIGNALED=37145]="SIGNALED",e[e.ALREADY_SIGNALED=37146]="ALREADY_SIGNALED",e[e.TIMEOUT_EXPIRED=37147]="TIMEOUT_EXPIRED",e[e.CONDITION_SATISFIED=37148]="CONDITION_SATISFIED",e[e.WAIT_FAILED=37149]="WAIT_FAILED",e[e.SYNC_FLUSH_COMMANDS_BIT=1]="SYNC_FLUSH_COMMANDS_BIT",e[e.COLOR=6144]="COLOR",e[e.DEPTH=6145]="DEPTH",e[e.STENCIL=6146]="STENCIL",e[e.MIN=32775]="MIN",e[e.MAX=32776]="MAX",e[e.DEPTH_COMPONENT24=33190]="DEPTH_COMPONENT24",e[e.STREAM_READ=35041]="STREAM_READ",e[e.STREAM_COPY=35042]="STREAM_COPY",e[e.STATIC_READ=35045]="STATIC_READ",e[e.STATIC_COPY=35046]="STATIC_COPY",e[e.DYNAMIC_READ=35049]="DYNAMIC_READ",e[e.DYNAMIC_COPY=35050]="DYNAMIC_COPY",e[e.DEPTH_COMPONENT32F=36012]="DEPTH_COMPONENT32F",e[e.DEPTH32F_STENCIL8=36013]="DEPTH32F_STENCIL8",e[e.INVALID_INDEX=4294967295]="INVALID_INDEX",e[e.TIMEOUT_IGNORED=-1]="TIMEOUT_IGNORED",e[e.MAX_CLIENT_WAIT_TIMEOUT_WEBGL=37447]="MAX_CLIENT_WAIT_TIMEOUT_WEBGL",e[e.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE=35070]="VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE",e[e.UNMASKED_VENDOR_WEBGL=37445]="UNMASKED_VENDOR_WEBGL",e[e.UNMASKED_RENDERER_WEBGL=37446]="UNMASKED_RENDERER_WEBGL",e[e.MAX_TEXTURE_MAX_ANISOTROPY_EXT=34047]="MAX_TEXTURE_MAX_ANISOTROPY_EXT",e[e.TEXTURE_MAX_ANISOTROPY_EXT=34046]="TEXTURE_MAX_ANISOTROPY_EXT",e[e.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",e[e.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",e[e.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",e[e.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",e[e.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",e[e.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",e[e.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",e[e.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",e[e.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",e[e.COMPRESSED_RGBA8_ETC2_EAC=37493]="COMPRESSED_RGBA8_ETC2_EAC",e[e.COMPRESSED_SRGB8_ETC2=37494]="COMPRESSED_SRGB8_ETC2",e[e.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37495]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",e[e.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37496]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",e[e.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37497]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",e[e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",e[e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",e[e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]="COMPRESSED_RGB_PVRTC_2BPPV1_IMG",e[e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]="COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",e[e.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",e[e.COMPRESSED_RGB_ATC_WEBGL=35986]="COMPRESSED_RGB_ATC_WEBGL",e[e.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]="COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",e[e.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]="COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",e[e.UNSIGNED_INT_24_8_WEBGL=34042]="UNSIGNED_INT_24_8_WEBGL",e[e.HALF_FLOAT_OES=36193]="HALF_FLOAT_OES",e[e.RGBA32F_EXT=34836]="RGBA32F_EXT",e[e.RGB32F_EXT=34837]="RGB32F_EXT",e[e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT=33297]="FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT",e[e.UNSIGNED_NORMALIZED_EXT=35863]="UNSIGNED_NORMALIZED_EXT",e[e.MIN_EXT=32775]="MIN_EXT",e[e.MAX_EXT=32776]="MAX_EXT",e[e.SRGB_EXT=35904]="SRGB_EXT",e[e.SRGB_ALPHA_EXT=35906]="SRGB_ALPHA_EXT",e[e.SRGB8_ALPHA8_EXT=35907]="SRGB8_ALPHA8_EXT",e[e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT=33296]="FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT",e[e.FRAGMENT_SHADER_DERIVATIVE_HINT_OES=35723]="FRAGMENT_SHADER_DERIVATIVE_HINT_OES",e[e.COLOR_ATTACHMENT0_WEBGL=36064]="COLOR_ATTACHMENT0_WEBGL",e[e.COLOR_ATTACHMENT1_WEBGL=36065]="COLOR_ATTACHMENT1_WEBGL",e[e.COLOR_ATTACHMENT2_WEBGL=36066]="COLOR_ATTACHMENT2_WEBGL",e[e.COLOR_ATTACHMENT3_WEBGL=36067]="COLOR_ATTACHMENT3_WEBGL",e[e.COLOR_ATTACHMENT4_WEBGL=36068]="COLOR_ATTACHMENT4_WEBGL",e[e.COLOR_ATTACHMENT5_WEBGL=36069]="COLOR_ATTACHMENT5_WEBGL",e[e.COLOR_ATTACHMENT6_WEBGL=36070]="COLOR_ATTACHMENT6_WEBGL",e[e.COLOR_ATTACHMENT7_WEBGL=36071]="COLOR_ATTACHMENT7_WEBGL",e[e.COLOR_ATTACHMENT8_WEBGL=36072]="COLOR_ATTACHMENT8_WEBGL",e[e.COLOR_ATTACHMENT9_WEBGL=36073]="COLOR_ATTACHMENT9_WEBGL",e[e.COLOR_ATTACHMENT10_WEBGL=36074]="COLOR_ATTACHMENT10_WEBGL",e[e.COLOR_ATTACHMENT11_WEBGL=36075]="COLOR_ATTACHMENT11_WEBGL",e[e.COLOR_ATTACHMENT12_WEBGL=36076]="COLOR_ATTACHMENT12_WEBGL",e[e.COLOR_ATTACHMENT13_WEBGL=36077]="COLOR_ATTACHMENT13_WEBGL",e[e.COLOR_ATTACHMENT14_WEBGL=36078]="COLOR_ATTACHMENT14_WEBGL",e[e.COLOR_ATTACHMENT15_WEBGL=36079]="COLOR_ATTACHMENT15_WEBGL",e[e.DRAW_BUFFER0_WEBGL=34853]="DRAW_BUFFER0_WEBGL",e[e.DRAW_BUFFER1_WEBGL=34854]="DRAW_BUFFER1_WEBGL",e[e.DRAW_BUFFER2_WEBGL=34855]="DRAW_BUFFER2_WEBGL",e[e.DRAW_BUFFER3_WEBGL=34856]="DRAW_BUFFER3_WEBGL",e[e.DRAW_BUFFER4_WEBGL=34857]="DRAW_BUFFER4_WEBGL",e[e.DRAW_BUFFER5_WEBGL=34858]="DRAW_BUFFER5_WEBGL",e[e.DRAW_BUFFER6_WEBGL=34859]="DRAW_BUFFER6_WEBGL",e[e.DRAW_BUFFER7_WEBGL=34860]="DRAW_BUFFER7_WEBGL",e[e.DRAW_BUFFER8_WEBGL=34861]="DRAW_BUFFER8_WEBGL",e[e.DRAW_BUFFER9_WEBGL=34862]="DRAW_BUFFER9_WEBGL",e[e.DRAW_BUFFER10_WEBGL=34863]="DRAW_BUFFER10_WEBGL",e[e.DRAW_BUFFER11_WEBGL=34864]="DRAW_BUFFER11_WEBGL",e[e.DRAW_BUFFER12_WEBGL=34865]="DRAW_BUFFER12_WEBGL",e[e.DRAW_BUFFER13_WEBGL=34866]="DRAW_BUFFER13_WEBGL",e[e.DRAW_BUFFER14_WEBGL=34867]="DRAW_BUFFER14_WEBGL",e[e.DRAW_BUFFER15_WEBGL=34868]="DRAW_BUFFER15_WEBGL",e[e.MAX_COLOR_ATTACHMENTS_WEBGL=36063]="MAX_COLOR_ATTACHMENTS_WEBGL",e[e.MAX_DRAW_BUFFERS_WEBGL=34852]="MAX_DRAW_BUFFERS_WEBGL",e[e.VERTEX_ARRAY_BINDING_OES=34229]="VERTEX_ARRAY_BINDING_OES",e[e.QUERY_COUNTER_BITS_EXT=34916]="QUERY_COUNTER_BITS_EXT",e[e.CURRENT_QUERY_EXT=34917]="CURRENT_QUERY_EXT",e[e.QUERY_RESULT_EXT=34918]="QUERY_RESULT_EXT",e[e.QUERY_RESULT_AVAILABLE_EXT=34919]="QUERY_RESULT_AVAILABLE_EXT",e[e.TIME_ELAPSED_EXT=35007]="TIME_ELAPSED_EXT",e[e.TIMESTAMP_EXT=36392]="TIMESTAMP_EXT",e[e.GPU_DISJOINT_EXT=36795]="GPU_DISJOINT_EXT"})(f||(f={}));var b;(function(e){e[e.Buffer=0]="Buffer",e[e.Texture=1]="Texture",e[e.RenderTarget=2]="RenderTarget",e[e.Sampler=3]="Sampler",e[e.Program=4]="Program",e[e.Bindings=5]="Bindings",e[e.InputLayout=6]="InputLayout",e[e.RenderPipeline=7]="RenderPipeline",e[e.ComputePipeline=8]="ComputePipeline",e[e.Readback=9]="Readback",e[e.QueryPool=10]="QueryPool"})(b||(b={}));var Q;(function(e){e[e.NEVER=512]="NEVER",e[e.LESS=513]="LESS",e[e.EQUAL=514]="EQUAL",e[e.LEQUAL=515]="LEQUAL",e[e.GREATER=516]="GREATER",e[e.NOTEQUAL=517]="NOTEQUAL",e[e.GEQUAL=518]="GEQUAL",e[e.ALWAYS=519]="ALWAYS"})(Q||(Q={}));var we;(function(e){e[e.CCW=2305]="CCW",e[e.CW=2304]="CW"})(we||(we={}));var Ie;(function(e){e[e.NONE=0]="NONE",e[e.FRONT=1]="FRONT",e[e.BACK=2]="BACK",e[e.FRONT_AND_BACK=3]="FRONT_AND_BACK"})(Ie||(Ie={}));var K;(function(e){e[e.ZERO=0]="ZERO",e[e.ONE=1]="ONE",e[e.SRC=768]="SRC",e[e.ONE_MINUS_SRC=769]="ONE_MINUS_SRC",e[e.DST=774]="DST",e[e.ONE_MINUS_DST=775]="ONE_MINUS_DST",e[e.SRC_ALPHA=770]="SRC_ALPHA",e[e.ONE_MINUS_SRC_ALPHA=771]="ONE_MINUS_SRC_ALPHA",e[e.DST_ALPHA=772]="DST_ALPHA",e[e.ONE_MINUS_DST_ALPHA=773]="ONE_MINUS_DST_ALPHA",e[e.CONST=32769]="CONST",e[e.ONE_MINUS_CONSTANT=32770]="ONE_MINUS_CONSTANT",e[e.SRC_ALPHA_SATURATE=776]="SRC_ALPHA_SATURATE"})(K||(K={}));var _e;(function(e){e[e.ADD=32774]="ADD",e[e.SUBSTRACT=32778]="SUBSTRACT",e[e.REVERSE_SUBSTRACT=32779]="REVERSE_SUBSTRACT",e[e.MIN=32775]="MIN",e[e.MAX=32776]="MAX"})(_e||(_e={}));var $;(function(e){e[e.CLAMP_TO_EDGE=0]="CLAMP_TO_EDGE",e[e.REPEAT=1]="REPEAT",e[e.MIRRORED_REPEAT=2]="MIRRORED_REPEAT"})($||($={}));var F;(function(e){e[e.POINT=0]="POINT",e[e.BILINEAR=1]="BILINEAR"})(F||(F={}));var W;(function(e){e[e.NO_MIP=0]="NO_MIP",e[e.NEAREST=1]="NEAREST",e[e.LINEAR=2]="LINEAR"})(W||(W={}));var J;(function(e){e[e.POINTS=0]="POINTS",e[e.TRIANGLES=1]="TRIANGLES",e[e.TRIANGLE_STRIP=2]="TRIANGLE_STRIP",e[e.LINES=3]="LINES",e[e.LINE_STRIP=4]="LINE_STRIP"})(J||(J={}));var D;(function(e){e[e.MAP_READ=1]="MAP_READ",e[e.MAP_WRITE=2]="MAP_WRITE",e[e.COPY_SRC=4]="COPY_SRC",e[e.COPY_DST=8]="COPY_DST",e[e.INDEX=16]="INDEX",e[e.VERTEX=32]="VERTEX",e[e.UNIFORM=64]="UNIFORM",e[e.STORAGE=128]="STORAGE",e[e.INDIRECT=256]="INDIRECT",e[e.QUERY_RESOLVE=512]="QUERY_RESOLVE"})(D||(D={}));var ge;(function(e){e[e.STATIC=1]="STATIC",e[e.DYNAMIC=2]="DYNAMIC"})(ge||(ge={}));var Xe;(function(e){e[e.VERTEX=1]="VERTEX",e[e.INSTANCE=2]="INSTANCE"})(Xe||(Xe={}));var Ut;(function(e){e.LOADED="loaded"})(Ut||(Ut={}));var U;(function(e){e[e.TEXTURE_2D=0]="TEXTURE_2D",e[e.TEXTURE_2D_ARRAY=1]="TEXTURE_2D_ARRAY",e[e.TEXTURE_3D=2]="TEXTURE_3D",e[e.TEXTURE_CUBE_MAP=3]="TEXTURE_CUBE_MAP"})(U||(U={}));var ie;(function(e){e[e.SAMPLED=1]="SAMPLED",e[e.RENDER_TARGET=2]="RENDER_TARGET",e[e.STORAGE=4]="STORAGE"})(ie||(ie={}));var At;(function(e){e[e.NONE=0]="NONE",e[e.RED=1]="RED",e[e.GREEN=2]="GREEN",e[e.BLUE=4]="BLUE",e[e.ALPHA=8]="ALPHA",e[e.RGB=7]="RGB",e[e.ALL=15]="ALL"})(At||(At={}));var j;(function(e){e[e.KEEP=7680]="KEEP",e[e.ZERO=0]="ZERO",e[e.REPLACE=7681]="REPLACE",e[e.INVERT=5386]="INVERT",e[e.INCREMENT_CLAMP=7682]="INCREMENT_CLAMP",e[e.DECREMENT_CLAMP=7683]="DECREMENT_CLAMP",e[e.INCREMENT_WRAP=34055]="INCREMENT_WRAP",e[e.DECREMENT_WRAP=34056]="DECREMENT_WRAP"})(j||(j={}));var Z;(function(e){e[e.Float=0]="Float",e[e.Uint=1]="Uint",e[e.Sint=2]="Sint",e[e.Depth=3]="Depth"})(Z||(Z={}));var Ze;(function(e){e[e.LOWER_LEFT=0]="LOWER_LEFT",e[e.UPPER_LEFT=1]="UPPER_LEFT"})(Ze||(Ze={}));var Le;(function(e){e[e.NEGATIVE_ONE=0]="NEGATIVE_ONE",e[e.ZERO=1]="ZERO"})(Le||(Le={}));var Qe;(function(e){e[e.OcclusionConservative=0]="OcclusionConservative"})(Qe||(Qe={}));var T;(function(e){e[e.U8=1]="U8",e[e.U16=2]="U16",e[e.U32=3]="U32",e[e.S8=4]="S8",e[e.S16=5]="S16",e[e.S32=6]="S32",e[e.F16=7]="F16",e[e.F32=8]="F32",e[e.BC1=65]="BC1",e[e.BC2=66]="BC2",e[e.BC3=67]="BC3",e[e.BC4_UNORM=68]="BC4_UNORM",e[e.BC4_SNORM=69]="BC4_SNORM",e[e.BC5_UNORM=70]="BC5_UNORM",e[e.BC5_SNORM=71]="BC5_SNORM",e[e.U16_PACKED_5551=97]="U16_PACKED_5551",e[e.U16_PACKED_565=98]="U16_PACKED_565",e[e.D24=129]="D24",e[e.D32F=130]="D32F",e[e.D24S8=131]="D24S8",e[e.D32FS8=132]="D32FS8"})(T||(T={}));var v;(function(e){e[e.R=1]="R",e[e.RG=2]="RG",e[e.RGB=3]="RGB",e[e.RGBA=4]="RGBA",e[e.A=5]="A"})(v||(v={}));var N;(function(e){e[e.None=0]="None",e[e.Normalized=1]="Normalized",e[e.sRGB=2]="sRGB",e[e.Depth=4]="Depth",e[e.Stencil=8]="Stencil",e[e.RenderTarget=16]="RenderTarget",e[e.Luminance=32]="Luminance"})(N||(N={}));function C(e,t,i){return e<<16|t<<8|i}var g;(function(e){e[e.ALPHA=C(T.U8,v.A,N.None)]="ALPHA",e[e.U8_LUMINANCE=C(T.U8,v.A,N.Luminance)]="U8_LUMINANCE",e[e.F16_LUMINANCE=C(T.F16,v.A,N.Luminance)]="F16_LUMINANCE",e[e.F32_LUMINANCE=C(T.F32,v.A,N.Luminance)]="F32_LUMINANCE",e[e.F16_R=C(T.F16,v.R,N.None)]="F16_R",e[e.F16_RG=C(T.F16,v.RG,N.None)]="F16_RG",e[e.F16_RGB=C(T.F16,v.RGB,N.None)]="F16_RGB",e[e.F16_RGBA=C(T.F16,v.RGBA,N.None)]="F16_RGBA",e[e.F32_R=C(T.F32,v.R,N.None)]="F32_R",e[e.F32_RG=C(T.F32,v.RG,N.None)]="F32_RG",e[e.F32_RGB=C(T.F32,v.RGB,N.None)]="F32_RGB",e[e.F32_RGBA=C(T.F32,v.RGBA,N.None)]="F32_RGBA",e[e.U8_R=C(T.U8,v.R,N.None)]="U8_R",e[e.U8_R_NORM=C(T.U8,v.R,N.Normalized)]="U8_R_NORM",e[e.U8_RG=C(T.U8,v.RG,N.None)]="U8_RG",e[e.U8_RG_NORM=C(T.U8,v.RG,N.Normalized)]="U8_RG_NORM",e[e.U8_RGB=C(T.U8,v.RGB,N.None)]="U8_RGB",e[e.U8_RGB_NORM=C(T.U8,v.RGB,N.Normalized)]="U8_RGB_NORM",e[e.U8_RGB_SRGB=C(T.U8,v.RGB,N.sRGB|N.Normalized)]="U8_RGB_SRGB",e[e.U8_RGBA=C(T.U8,v.RGBA,N.None)]="U8_RGBA",e[e.U8_RGBA_NORM=C(T.U8,v.RGBA,N.Normalized)]="U8_RGBA_NORM",e[e.U8_RGBA_SRGB=C(T.U8,v.RGBA,N.sRGB|N.Normalized)]="U8_RGBA_SRGB",e[e.U16_R=C(T.U16,v.R,N.None)]="U16_R",e[e.U16_R_NORM=C(T.U16,v.R,N.Normalized)]="U16_R_NORM",e[e.U16_RG_NORM=C(T.U16,v.RG,N.Normalized)]="U16_RG_NORM",e[e.U16_RGBA_NORM=C(T.U16,v.RGBA,N.Normalized)]="U16_RGBA_NORM",e[e.U16_RGB=C(T.U16,v.RGB,N.None)]="U16_RGB",e[e.U32_R=C(T.U32,v.R,N.None)]="U32_R",e[e.U32_RG=C(T.U32,v.RG,N.None)]="U32_RG",e[e.S8_R=C(T.S8,v.R,N.None)]="S8_R",e[e.S8_R_NORM=C(T.S8,v.R,N.Normalized)]="S8_R_NORM",e[e.S8_RG_NORM=C(T.S8,v.RG,N.Normalized)]="S8_RG_NORM",e[e.S8_RGB_NORM=C(T.S8,v.RGB,N.Normalized)]="S8_RGB_NORM",e[e.S8_RGBA_NORM=C(T.S8,v.RGBA,N.Normalized)]="S8_RGBA_NORM",e[e.S16_R=C(T.S16,v.R,N.None)]="S16_R",e[e.S16_RG=C(T.S16,v.RG,N.None)]="S16_RG",e[e.S16_RG_NORM=C(T.S16,v.RG,N.Normalized)]="S16_RG_NORM",e[e.S16_RGB_NORM=C(T.S16,v.RGB,N.Normalized)]="S16_RGB_NORM",e[e.S16_RGBA=C(T.S16,v.RGBA,N.None)]="S16_RGBA",e[e.S16_RGBA_NORM=C(T.S16,v.RGBA,N.Normalized)]="S16_RGBA_NORM",e[e.S32_R=C(T.S32,v.R,N.None)]="S32_R",e[e.U16_RGBA_5551=C(T.U16_PACKED_5551,v.RGBA,N.Normalized)]="U16_RGBA_5551",e[e.U16_RGB_565=C(T.U16_PACKED_565,v.RGB,N.Normalized)]="U16_RGB_565",e[e.BC1=C(T.BC1,v.RGBA,N.Normalized)]="BC1",e[e.BC1_SRGB=C(T.BC1,v.RGBA,N.Normalized|N.sRGB)]="BC1_SRGB",e[e.BC2=C(T.BC2,v.RGBA,N.Normalized)]="BC2",e[e.BC2_SRGB=C(T.BC2,v.RGBA,N.Normalized|N.sRGB)]="BC2_SRGB",e[e.BC3=C(T.BC3,v.RGBA,N.Normalized)]="BC3",e[e.BC3_SRGB=C(T.BC3,v.RGBA,N.Normalized|N.sRGB)]="BC3_SRGB",e[e.BC4_UNORM=C(T.BC4_UNORM,v.R,N.Normalized)]="BC4_UNORM",e[e.BC4_SNORM=C(T.BC4_SNORM,v.R,N.Normalized)]="BC4_SNORM",e[e.BC5_UNORM=C(T.BC5_UNORM,v.RG,N.Normalized)]="BC5_UNORM",e[e.BC5_SNORM=C(T.BC5_SNORM,v.RG,N.Normalized)]="BC5_SNORM",e[e.D24=C(T.D24,v.R,N.Depth)]="D24",e[e.D24_S8=C(T.D24S8,v.RG,N.Depth|N.Stencil)]="D24_S8",e[e.D32F=C(T.D32F,v.R,N.Depth)]="D32F",e[e.D32F_S8=C(T.D32FS8,v.RG,N.Depth|N.Stencil)]="D32F_S8",e[e.U8_RGB_RT=C(T.U8,v.RGB,N.RenderTarget|N.Normalized)]="U8_RGB_RT",e[e.U8_RGBA_RT=C(T.U8,v.RGBA,N.RenderTarget|N.Normalized)]="U8_RGBA_RT",e[e.U8_RGBA_RT_SRGB=C(T.U8,v.RGBA,N.RenderTarget|N.Normalized|N.sRGB)]="U8_RGBA_RT_SRGB"})(g||(g={}));function Jt(e){return e>>>8&255}function Re(e){return e>>>16&255}function Ve(e){return e&255}function Gt(e){switch(e){case T.F32:case T.U32:case T.S32:return 4;case T.U16:case T.S16:case T.F16:return 2;case T.U8:case T.S8:return 1;default:throw new Error("whoops")}}function ei(e){return Gt(Re(e))}function Wi(e){var t=Gt(Re(e)),i=Jt(e);return t*i}function ti(e){var t=Ve(e);if(t&N.Depth)return Z.Depth;if(t&N.Normalized)return Z.Float;var i=Re(e);if(i===T.F16||i===T.F32)return Z.Float;if(i===T.U8||i===T.U16||i===T.U32)return Z.Uint;if(i===T.S8||i===T.S16||i===T.S32)return Z.Sint;throw new Error("whoops")}function z(e,t){if(t===void 0&&(t=""),!e)throw new Error("Assert fail: ".concat(t))}function ht(e){if(e!=null)return e;throw new Error("Missing object")}function ki(e,t){e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}function ii(e){var t=e.r,i=e.g,r=e.b,a=e.a;return{r:t,g:i,b:r,a}}function nt(e,t,i,r){return r===void 0&&(r=1),{r:e,g:t,b:i,a:r}}var zi=nt(0,0,0,0);nt(0,0,0,1);var Yi=nt(1,1,1,0);nt(1,1,1,1);function Je(e){return!!(e&&!(e&e-1))}function Se(e,t){return e??t}function Ge(e,t){var i=t-1;return e+i&~i}function Ki(e,t){for(var i=new Array(e),r=0;r<e;r++)i[r]=t();return i}function yt(e,t){e.blendDstFactor=t.blendDstFactor,e.blendSrcFactor=t.blendSrcFactor,e.blendMode=t.blendMode}function et(e,t){return e===void 0&&(e={}),e.compare=t.compare,e.depthFailOp=t.depthFailOp,e.passOp=t.passOp,e.failOp=t.failOp,e}function ri(e,t){return e===void 0&&(e={rgbBlendState:{},alphaBlendState:{},channelWriteMask:0}),yt(e.rgbBlendState,t.rgbBlendState),yt(e.alphaBlendState,t.alphaBlendState),e.channelWriteMask=t.channelWriteMask,e}function ni(e,t){e.length!==t.length&&(e.length=t.length);for(var i=0;i<t.length;i++)e[i]=ri(e[i],t[i])}function $i(e,t){t.attachmentsState!==void 0&&ni(e.attachmentsState,t.attachmentsState),e.blendConstant&&t.blendConstant&&ki(e.blendConstant,t.blendConstant),e.depthCompare=Se(t.depthCompare,e.depthCompare),e.depthWrite=Se(t.depthWrite,e.depthWrite),e.stencilWrite=Se(t.stencilWrite,e.stencilWrite),e.stencilFront&&t.stencilFront&&et(e.stencilFront,t.stencilFront),e.stencilBack&&t.stencilBack&&et(e.stencilBack,t.stencilBack),e.cullMode=Se(t.cullMode,e.cullMode),e.frontFace=Se(t.frontFace,e.frontFace),e.polygonOffset=Se(t.polygonOffset,e.polygonOffset)}function St(e){var t=Object.assign({},e);return t.attachmentsState=[],ni(t.attachmentsState,e.attachmentsState),t.blendConstant=t.blendConstant&&ii(t.blendConstant),t.stencilFront=et(void 0,e.stencilFront),t.stencilBack=et(void 0,e.stencilBack),t}var xt={blendMode:_e.ADD,blendSrcFactor:K.ONE,blendDstFactor:K.ZERO},at={attachmentsState:[{channelWriteMask:At.ALL,rgbBlendState:xt,alphaBlendState:xt}],blendConstant:ii(zi),depthWrite:!0,depthCompare:Q.LEQUAL,stencilWrite:!1,stencilFront:{compare:Q.ALWAYS,passOp:j.KEEP,depthFailOp:j.KEEP,failOp:j.KEEP},stencilBack:{compare:Q.ALWAYS,passOp:j.KEEP,depthFailOp:j.KEEP,failOp:j.KEEP},cullMode:Ie.NONE,frontFace:we.CCW,polygonOffset:!1};function qi(e,t){e===void 0&&(e=null),t===void 0&&(t=at);var i=St(t);return e!==null&&$i(i,e),i}qi({depthCompare:Q.ALWAYS,depthWrite:!1},at);var ji={texture:null,sampler:null,formatKind:Z.Float,dimension:U.TEXTURE_2D},M,Zi=/([^[]*)(\[[0-9]+\])?/;function Li(e){if(e[e.length-1]!=="]")return{name:e,length:1,isArray:!1};var t=e.match(Zi);if(!t||t.length<2)throw new Error("Failed to parse GLSL uniform name ".concat(e));return{name:t[1],length:Number(t[2])||1,isArray:!!t[2]}}function L(){var e=null;return function(t,i,r){var a=e!==r;return a&&(t.uniform1i(i,r),e=r),a}}function w(e,t,i,r){var a=null,n=null;return function(o,s,u){var l=t(u,i),c=l.length,_=!1;if(a===null)a=new Float32Array(c),n=c,_=!0;else{z(n===c,"Uniform length cannot change.");for(var E=0;E<c;++E)if(l[E]!==a[E]){_=!0;break}}return _&&(r(o,e,s,l),a.set(l)),_}}function q(e,t,i,r){e[t](i,r)}function ce(e,t,i,r){e[t](i,!1,r)}var Qi={},Ji={},Gi={},Dt=[0];function Nt(e,t,i,r){t===1&&typeof e=="boolean"&&(e=e?1:0),Number.isFinite(e)&&(Dt[0]=e,e=Dt);var a=e.length;if(e instanceof i)return e;var n=r[a];n||(n=new i(a),r[a]=n);for(var o=0;o<a;o++)n[o]=e[o];return n}function te(e,t){return Nt(e,t,Float32Array,Qi)}function fe(e,t){return Nt(e,t,Int32Array,Ji)}function ke(e,t){return Nt(e,t,Uint32Array,Gi)}var er=(M={},M[f.FLOAT]=w.bind(null,"uniform1fv",te,1,q),M[f.FLOAT_VEC2]=w.bind(null,"uniform2fv",te,2,q),M[f.FLOAT_VEC3]=w.bind(null,"uniform3fv",te,3,q),M[f.FLOAT_VEC4]=w.bind(null,"uniform4fv",te,4,q),M[f.INT]=w.bind(null,"uniform1iv",fe,1,q),M[f.INT_VEC2]=w.bind(null,"uniform2iv",fe,2,q),M[f.INT_VEC3]=w.bind(null,"uniform3iv",fe,3,q),M[f.INT_VEC4]=w.bind(null,"uniform4iv",fe,4,q),M[f.BOOL]=w.bind(null,"uniform1iv",fe,1,q),M[f.BOOL_VEC2]=w.bind(null,"uniform2iv",fe,2,q),M[f.BOOL_VEC3]=w.bind(null,"uniform3iv",fe,3,q),M[f.BOOL_VEC4]=w.bind(null,"uniform4iv",fe,4,q),M[f.FLOAT_MAT2]=w.bind(null,"uniformMatrix2fv",te,4,ce),M[f.FLOAT_MAT3]=w.bind(null,"uniformMatrix3fv",te,9,ce),M[f.FLOAT_MAT4]=w.bind(null,"uniformMatrix4fv",te,16,ce),M[f.UNSIGNED_INT]=w.bind(null,"uniform1uiv",ke,1,q),M[f.UNSIGNED_INT_VEC2]=w.bind(null,"uniform2uiv",ke,2,q),M[f.UNSIGNED_INT_VEC3]=w.bind(null,"uniform3uiv",ke,3,q),M[f.UNSIGNED_INT_VEC4]=w.bind(null,"uniform4uiv",ke,4,q),M[f.FLOAT_MAT2x3]=w.bind(null,"uniformMatrix2x3fv",te,6,ce),M[f.FLOAT_MAT2x4]=w.bind(null,"uniformMatrix2x4fv",te,8,ce),M[f.FLOAT_MAT3x2]=w.bind(null,"uniformMatrix3x2fv",te,6,ce),M[f.FLOAT_MAT3x4]=w.bind(null,"uniformMatrix3x4fv",te,12,ce),M[f.FLOAT_MAT4x2]=w.bind(null,"uniformMatrix4x2fv",te,8,ce),M[f.FLOAT_MAT4x3]=w.bind(null,"uniformMatrix4x3fv",te,12,ce),M[f.SAMPLER_2D]=L,M[f.SAMPLER_CUBE]=L,M[f.SAMPLER_3D]=L,M[f.SAMPLER_2D_SHADOW]=L,M[f.SAMPLER_2D_ARRAY]=L,M[f.SAMPLER_2D_ARRAY_SHADOW]=L,M[f.SAMPLER_CUBE_SHADOW]=L,M[f.INT_SAMPLER_2D]=L,M[f.INT_SAMPLER_3D]=L,M[f.INT_SAMPLER_CUBE]=L,M[f.INT_SAMPLER_2D_ARRAY]=L,M[f.UNSIGNED_INT_SAMPLER_2D]=L,M[f.UNSIGNED_INT_SAMPLER_3D]=L,M[f.UNSIGNED_INT_SAMPLER_CUBE]=L,M[f.UNSIGNED_INT_SAMPLER_2D_ARRAY]=L,M);function bt(e,t,i){var r=er[i.type];if(!r)throw new Error("Unknown GLSL uniform type ".concat(i.type));return r().bind(null,e,t)}var tr={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121};function ir(e){return Object.prototype.toString.call(e)in tr}function Be(e,t){return"#define ".concat(e," ").concat(t)}function rr(e){var t={};return e.replace(/^\s*#define\s*(\S*)\s*(\S*)\s*$/gm,function(i,r,a){var n=Number(a);return t[r]=isNaN(n)?a:n,""}),t}function nr(e,t){var i=[];return e.replace(/^\s*layout\(location\s*=\s*(\S*)\)\s*in\s+\S+\s*(.*);$/gm,function(r,a,n){var o=Number(a);return i.push({location:isNaN(o)?t[a]:o,name:n}),""}),i}function Ft(e){if(e===void 0)return null;var t=/binding\s*=\s*(\d+)/.exec(e);if(t!==null){var i=parseInt(t[1],10);if(!Number.isNaN(i))return i}return null}function ar(e){var t="",i=e;return[i,t]}function wt(e,t,i,r,a){var n;r===void 0&&(r=null),a===void 0&&(a=!0);var o=e.glslVersion==="#version 100",s=t==="frag"&&((n=i.match(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm))===null||n===void 0?void 0:n.length)>1,u=i.replace(`\r
`,`
`).split(`
`).map(function(P){return P.replace(/[/][/].*$/,"")}).filter(function(P){var O=!P||/^\s+$/.test(P);return!O}),l="";r!==null&&(l=Object.keys(r).map(function(P){return Be(P,r[P])}).join(`
`));var c=u.find(function(P){return P.startsWith("precision")})||"precision mediump float;",_=a?u.filter(function(P){return!P.startsWith("precision")}).join(`
`):u.join(`
`),E="";if(e.viewportOrigin===Ze.UPPER_LEFT&&(E+="".concat(Be("VIEWPORT_ORIGIN_TL","1"),`
`)),e.clipSpaceNearZ===Le.ZERO&&(E+="".concat(Be("CLIPSPACE_NEAR_ZERO","1"),`
`)),e.explicitBindingLocations){var d=0,h=0,m=0;_=_.replace(/^(layout\((.*)\))?\s*uniform(.+{)$/gm,function(P,O,B,k){var G=B?"".concat(B,", "):"";return"layout(".concat(G,"set = ").concat(d,", binding = ").concat(h++,") uniform ").concat(k)}),d++,h=0,z(e.separateSamplerTextures),_=_.replace(/^(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(P,O,B,k,G){var ee=Ft(B);ee===null&&(ee=h++);var oe=pt(ar(k),2),Ae=oe[0],me=oe[1];return t==="frag"?`
layout(set = `.concat(d,", binding = ").concat(ee*2+0,") uniform texture").concat(Ae," T_").concat(G,`;
layout(set = `).concat(d,", binding = ").concat(ee*2+1,") uniform sampler").concat(me," S_").concat(G,";").trim():""}),_=_.replace(t==="frag"?/^\s*\b(varying|in)\b/gm:/^\s*\b(varying|out)\b/gm,function(P,O){return"layout(location = ".concat(m++,") ").concat(O)}),E+="".concat(Be("gl_VertexID","gl_VertexIndex"),`
`),E+="".concat(Be("gl_InstanceID","gl_InstanceIndex"),`
`),c=c.replace(/^precision (.*) sampler(.*);$/gm,"")}else{var R=0;_=_.replace(/^(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(P,O,B,k,G){var ee=Ft(B);return ee===null&&(ee=R++),"uniform sampler".concat(k," ").concat(G,"; // BINDING=").concat(ee)})}if(e.separateSamplerTextures)_=_.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(P,O,B){return"sampler".concat(O,"(T_").concat(B,", S_").concat(B,")")}),_=_.replace(/\bTEXTURE\((.*?)\)/g,function(P,O){return"T_".concat(O)});else{var A=[];_=_.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(P,O,B){return A.push([B,O]),B}),o&&A.forEach(function(P){var O=pt(P,2),B=O[0],k=O[1];_=_.replace(new RegExp("texture\\(".concat(B),"g"),function(){return"texture".concat(k,"(").concat(B)})}),_=_.replace(/\bTEXTURE\((.*?)\)/g,function(P,O){return O})}var p="".concat(o?"":e.glslVersion,`
`).concat(o&&s?`#extension GL_EXT_draw_buffers : require
`:"",`
`).concat(o&&t==="frag"?`#extension GL_OES_standard_derivatives : enable
`:"").concat(a?c:"",`
`).concat(E||"").concat(l?l+`
`:"",`
`).concat(_,`
`).trim();if(e.explicitBindingLocations&&t==="frag"&&(p=p.replace(/^\b(out)\b/g,function(P,O){return"layout(location = 0) ".concat(O)})),o){if(t==="frag"&&(p=p.replace(/^\s*in\s+(\S+)\s*(.*);$/gm,function(P,O,B){return"varying ".concat(O," ").concat(B,`;
`)})),t==="vert"&&(p=p.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(P,O,B){return"varying ".concat(O," ").concat(B,`;
`)}),p=p.replace(/^\s*layout\(location\s*=\s*\S*\)\s*in\s+(\S+)\s*(.*);$/gm,function(P,O,B){return"attribute ".concat(O," ").concat(B,`;
`)})),p=p.replace(/\s*uniform\s*.*\s*{((?:\s*.*\s*)*?)};/g,function(P,O){return O.trim().replace(/^.*$/gm,function(B){var k=B.trim();return k.startsWith("#")?k:B?"uniform ".concat(k):""})}),t==="frag")if(s){var S=[];p=p.replace(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm,function(P,O){return S.push(O),"vec4 ".concat(O,`;
`)});var I=p.lastIndexOf("}");p=p.substring(0,I)+`
    `.concat(S.map(function(P,O){return"gl_FragData[".concat(O,"] = ").concat(P,`;
    `)}).join(`
`))+p.substring(I)}else{var y;if(p=p.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(P,O,B){return y=B,"".concat(O," ").concat(B,`;
`)}),y){var I=p.lastIndexOf("}");p=p.substring(0,I)+`
  gl_FragColor = vec4(`.concat(y,`);
`)+p.substring(I)}}p=p.replace(/^\s*layout\((.*)\)/gm,"")}return p}var ae=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=e.call(this)||this;return n.id=r,n.device=a,n.device.resourceCreationTracker!==null&&n.device.resourceCreationTracker.trackResourceCreated(n),n}return t.prototype.destroy=function(){this.device.resourceCreationTracker!==null&&this.device.resourceCreationTracker.trackResourceDestroyed(this)},t}(Qt);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.Bindings;var s=n.uniformBufferBindings,u=n.samplerBindings;return o.uniformBufferBindings=s||[],o.samplerBindings=u||[],o.bindingLayouts=o.createBindingLayouts(),o}return t.prototype.createBindingLayouts=function(){var i=0,r=0,a=[],n=this.uniformBufferBindings.length,o=this.samplerBindings.length;return a.push({firstUniformBuffer:i,numUniformBuffers:n,firstSampler:r,numSamplers:o}),i+=n,r+=o,{numUniformBuffers:i,numSamplers:r,bindingLayoutTables:a}},t})(ae);function x(e){return typeof WebGL2RenderingContext<"u"&&e instanceof WebGL2RenderingContext?!0:!!(e&&e._version===2)}function or(e){var t=Re(e);switch(t){case T.BC1:case T.BC2:case T.BC3:case T.BC4_UNORM:case T.BC4_SNORM:case T.BC5_UNORM:case T.BC5_SNORM:return!0;default:return!1}}function sr(e){var t=Ve(e);if(t&N.Normalized)return!1;var i=Re(e);return i===T.S8||i===T.S16||i===T.S32||i===T.U8||i===T.U16||i===T.U32}function lr(e){switch(e){case ge.STATIC:return f.STATIC_DRAW;case ge.DYNAMIC:return f.DYNAMIC_DRAW}}function Xt(e){if(e&D.INDEX)return f.ELEMENT_ARRAY_BUFFER;if(e&D.VERTEX)return f.ARRAY_BUFFER;if(e&D.UNIFORM)return f.UNIFORM_BUFFER}function ur(e){switch(e){case J.TRIANGLES:return f.TRIANGLES;case J.POINTS:return f.POINTS;case J.TRIANGLE_STRIP:return f.TRIANGLE_STRIP;case J.LINES:return f.LINES;case J.LINE_STRIP:return f.LINE_STRIP;default:throw new Error("Unknown primitive topology mode")}}function cr(e){switch(e){case T.U8:return f.UNSIGNED_BYTE;case T.U16:return f.UNSIGNED_SHORT;case T.U32:return f.UNSIGNED_INT;case T.S8:return f.BYTE;case T.S16:return f.SHORT;case T.S32:return f.INT;case T.F16:return f.HALF_FLOAT;case T.F32:return f.FLOAT;default:throw new Error("whoops")}}function _r(e){switch(e){case v.R:return 1;case v.RG:return 2;case v.RGB:return 3;case v.RGBA:return 4;default:return 1}}function Er(e){var t=Re(e),i=Jt(e),r=Ve(e),a=cr(t),n=_r(i),o=!!(r&N.Normalized);return{size:n,type:a,normalized:o}}function dr(e){switch(e){case g.U8_R:return f.UNSIGNED_BYTE;case g.U16_R:return f.UNSIGNED_SHORT;case g.U32_R:return f.UNSIGNED_INT;default:throw new Error("whoops")}}function Oe(e){switch(e){case $.CLAMP_TO_EDGE:return f.CLAMP_TO_EDGE;case $.REPEAT:return f.REPEAT;case $.MIRRORED_REPEAT:return f.MIRRORED_REPEAT;default:throw new Error("whoops")}}function ze(e,t){if(t===W.LINEAR&&e===F.BILINEAR)return f.LINEAR_MIPMAP_LINEAR;if(t===W.LINEAR&&e===F.POINT)return f.NEAREST_MIPMAP_LINEAR;if(t===W.NEAREST&&e===F.BILINEAR)return f.LINEAR_MIPMAP_NEAREST;if(t===W.NEAREST&&e===F.POINT)return f.NEAREST_MIPMAP_NEAREST;if(t===W.NO_MIP&&e===F.BILINEAR)return f.LINEAR;if(t===W.NO_MIP&&e===F.POINT)return f.NEAREST;throw new Error("Unknown texture filter mode")}function vt(e,t){t===void 0&&(t=0);var i=e;return i.gl_buffer_pages[t/i.pageByteSize|0]}function Rr(e){var t=e;return t.gl_texture}function fr(e){var t=e;return t.gl_sampler}function pr(e){switch(e){case Qe.OcclusionConservative:return f.ANY_SAMPLES_PASSED_CONSERVATIVE;default:throw new Error("whoops")}}(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.Buffer;var s=n.viewOrSize,u=n.usage,l=n.hint,c=l===void 0?ge.STATIC:l,_=a.uniformBufferMaxPageByteSize,E=a.gl,d=u&D.UNIFORM;d||(x(E)?E.bindVertexArray(null):a.OES_vertex_array_object.bindVertexArrayOES(null));var h=ve(s)?Ge(s,4):Ge(s.byteLength,4);o.gl_buffer_pages=[];var m;if(d){for(var R=h;R>0;)o.gl_buffer_pages.push(o.createBufferPage(Math.min(R,_),u,c)),R-=_;m=_}else o.gl_buffer_pages.push(o.createBufferPage(h,u,c)),m=h;return o.pageByteSize=m,o.byteSize=h,o.usage=u,o.gl_target=Xt(u),ve(s)||o.setSubData(0,new Uint8Array(s.buffer)),d||(x(E)?E.bindVertexArray(o.device.currentBoundVAO):a.OES_vertex_array_object.bindVertexArrayOES(o.device.currentBoundVAO)),o}return t.prototype.setSubData=function(i,r,a,n){a===void 0&&(a=0),n===void 0&&(n=r.byteLength-a);for(var o=this.device.gl,s=this.pageByteSize,u=i+n,l=i,c=i%s;l<u;){var _=x(o)?o.COPY_WRITE_BUFFER:this.gl_target,E=vt(this,l);if(E.ubo)return;o.bindBuffer(_,E),x(o)?o.bufferSubData(_,c,r,a,Math.min(u-l,s)):o.bufferSubData(_,c,r),l+=s,c=0,a+=s,this.device.debugGroupStatisticsBufferUpload()}},t.prototype.destroy=function(){e.prototype.destroy.call(this);for(var i=0;i<this.gl_buffer_pages.length;i++)this.gl_buffer_pages[i].ubo||this.device.gl.deleteBuffer(this.gl_buffer_pages[i]);this.gl_buffer_pages=[]},t.prototype.createBufferPage=function(i,r,a){var n=this.device.gl,o=r&D.UNIFORM;if(!x(n)&&o)return{ubo:!0};var s=this.device.ensureResourceExists(n.createBuffer()),u=Xt(r),l=lr(a);return n.bindBuffer(u,s),n.bufferData(u,i,l),s},t})(ae);(function(e){X(t,e);function t(i){var r,a,n,o,s=i.id,u=i.device,l=i.descriptor,c,_=e.call(this,{id:s,device:u})||this;_.type=b.InputLayout;var E=l.vertexBufferDescriptors,d=l.indexBufferFormat,h=l.program;z(d===g.U16_R||d===g.U32_R||d===null);var m=d!==null?dr(d):null,R=d!==null?ei(d):null,A=_.device.gl,p=_.device.ensureResourceExists(x(A)?A.createVertexArray():u.OES_vertex_array_object.createVertexArrayOES());x(A)?A.bindVertexArray(p):u.OES_vertex_array_object.bindVertexArrayOES(p),A.bindBuffer(A.ARRAY_BUFFER,vt(_.device.fallbackVertexBuffer));try{for(var S=Fe(l.vertexBufferDescriptors),I=S.next();!I.done;I=S.next()){var y=I.value,P=y.stepMode,O=y.attributes;try{for(var B=(n=void 0,Fe(O)),k=B.next();!k.done;k=B.next()){var G=k.value,ee=G.shaderLocation,oe=G.format,Ae=G.divisor,me=Ae===void 0?1:Ae,ue=x(A)?ee:(c=h.attributes[ee])===null||c===void 0?void 0:c.location,he=Er(oe);if(G.vertexFormat=he,!rt(ue)){sr(oe);var di=he.size,Ri=he.type,fi=he.normalized;A.vertexAttribPointer(ue,di,Ri,fi,0,0),P===Xe.INSTANCE&&(x(A)?A.vertexAttribDivisor(ue,me):u.ANGLE_instanced_arrays.vertexAttribDivisorANGLE(ue,me)),A.enableVertexAttribArray(ue)}}}catch(st){n={error:st}}finally{try{k&&!k.done&&(o=B.return)&&o.call(B)}finally{if(n)throw n.error}}}}catch(st){r={error:st}}finally{try{I&&!I.done&&(a=S.return)&&a.call(S)}finally{if(r)throw r.error}}return x(A)?A.bindVertexArray(null):u.OES_vertex_array_object.bindVertexArrayOES(null),_.vertexBufferDescriptors=E,_.vao=p,_.indexBufferFormat=d,_.indexBufferType=m,_.indexBufferCompByteSize=R,_.program=h,_}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.currentBoundVAO===this.vao&&(x(this.device.gl)?(this.device.gl.bindVertexArray(null),this.device.gl.deleteVertexArray(this.vao)):(this.device.OES_vertex_array_object.bindVertexArrayOES(null),this.device.OES_vertex_array_object.deleteVertexArrayOES(this.vao)),this.device.currentBoundVAO=null)},t})(ae);var Ar=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=i.fake,s=e.call(this,{id:r,device:a})||this;s.type=b.Texture,n=V({dimension:U.TEXTURE_2D,depthOrArrayLayers:1,mipLevelCount:1},n);var u=s.device.gl,l,c,_=s.clampmipLevelCount(n);if(s.immutable=n.usage===ie.RENDER_TARGET,s.pixelStore=n.pixelStore,s.format=n.format,s.dimension=n.dimension,s.formatKind=ti(n.format),s.width=n.width,s.height=n.height,s.depthOrArrayLayers=n.depthOrArrayLayers,s.mipmaps=_>=1,!o){c=s.device.ensureResourceExists(u.createTexture());var E=s.device.translateTextureType(n.format),d=s.device.translateTextureInternalFormat(n.format);if(s.device.setActiveTexture(u.TEXTURE0),s.device.currentTextures[0]=null,s.preprocessImage(),n.dimension===U.TEXTURE_2D){if(l=f.TEXTURE_2D,u.bindTexture(l,c),s.immutable)if(x(u))u.texStorage2D(l,_,d,n.width,n.height);else{var h=(d===f.DEPTH_COMPONENT||s.isNPOT(),0);(s.format===g.D32F||s.format===g.D24_S8)&&!x(u)&&!a.WEBGL_depth_texture||(u.texImage2D(l,h,d,n.width,n.height,0,d,E,null),s.mipmaps&&(s.mipmaps=!1,u.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR),u.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,f.CLAMP_TO_EDGE),u.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,f.CLAMP_TO_EDGE)))}z(n.depthOrArrayLayers===1)}else if(n.dimension===U.TEXTURE_2D_ARRAY)l=f.TEXTURE_2D_ARRAY,u.bindTexture(l,c),s.immutable&&x(u)&&u.texStorage3D(l,_,d,n.width,n.height,n.depthOrArrayLayers);else if(n.dimension===U.TEXTURE_3D)l=f.TEXTURE_3D,u.bindTexture(l,c),s.immutable&&x(u)&&u.texStorage3D(l,_,d,n.width,n.height,n.depthOrArrayLayers);else if(n.dimension===U.TEXTURE_CUBE_MAP)l=f.TEXTURE_CUBE_MAP,u.bindTexture(l,c),s.immutable&&x(u)&&u.texStorage2D(l,_,d,n.width,n.height),z(n.depthOrArrayLayers===6);else throw new Error("whoops")}return s.gl_texture=c,s.gl_target=l,s.mipLevelCount=_,s}return t.prototype.setImageData=function(i,r){r===void 0&&(r=0);var a=this.device.gl;or(this.format);var n=this.gl_target===f.TEXTURE_3D||this.gl_target===f.TEXTURE_2D_ARRAY,o=this.gl_target===f.TEXTURE_CUBE_MAP,s=ir(i[0]);this.device.setActiveTexture(a.TEXTURE0),this.device.currentTextures[0]=null;var u=i[0],l,c;s?(l=this.width,c=this.height):(l=u.width,c=u.height,this.width=l,this.height=c),a.bindTexture(this.gl_target,this.gl_texture);var _=this.device.translateTextureFormat(this.format),E=x(a)?this.device.translateInternalTextureFormat(this.format):_,d=this.device.translateTextureType(this.format);this.preprocessImage();for(var h=0;h<this.depthOrArrayLayers;h++){var m=i[h],R=this.gl_target;o&&(R=f.TEXTURE_CUBE_MAP_POSITIVE_X+h%6),this.immutable?a.texSubImage2D(R,r,0,0,l,c,_,d,m):x(a)?n?a.texImage3D(R,r,E,l,c,this.depthOrArrayLayers,0,_,d,m):a.texImage2D(R,r,E,l,c,0,_,d,m):s?a.texImage2D(R,r,_,l,c,0,_,d,m):a.texImage2D(R,r,_,_,d,m)}this.mipmaps&&this.generateMipmap(n)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.gl.deleteTexture(Rr(this))},t.prototype.clampmipLevelCount=function(i){if(i.dimension===U.TEXTURE_2D_ARRAY&&i.depthOrArrayLayers>1){var r=Re(i.format);if(r===T.BC1)for(var a=i.width,n=i.height,o=0;o<i.mipLevelCount;o++){if(a<=2||n<=2)return o-1;a=Math.max(a/2|0,1),n=Math.max(n/2|0,1)}}return i.mipLevelCount},t.prototype.preprocessImage=function(){var i=this.device.gl;this.pixelStore&&(this.pixelStore.unpackFlipY&&i.pixelStorei(f.UNPACK_FLIP_Y_WEBGL,!0),this.pixelStore.packAlignment&&i.pixelStorei(f.PACK_ALIGNMENT,this.pixelStore.packAlignment),this.pixelStore.unpackAlignment&&i.pixelStorei(f.UNPACK_ALIGNMENT,this.pixelStore.unpackAlignment))},t.prototype.generateMipmap=function(i){i===void 0&&(i=!1);var r=this.device.gl;return!x(r)&&this.isNPOT()?this:(this.gl_texture&&this.gl_target&&(r.bindTexture(this.gl_target,this.gl_texture),i?(r.texParameteri(this.gl_target,f.TEXTURE_BASE_LEVEL,0),r.texParameteri(this.gl_target,f.TEXTURE_MAX_LEVEL,Math.log2(this.width)),r.texParameteri(this.gl_target,f.TEXTURE_MIN_FILTER,f.LINEAR_MIPMAP_LINEAR),r.texParameteri(this.gl_target,f.TEXTURE_MAG_FILTER,f.LINEAR)):r.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.NEAREST_MIPMAP_LINEAR),r.generateMipmap(this.gl_target),r.bindTexture(this.gl_target,null)),this)},t.prototype.isNPOT=function(){var i=this.device.gl;return x(i)?!1:!Je(this.width)||!Je(this.height)},t}(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.RenderTarget,o.gl_renderbuffer=null,o.texture=null;var s=o.device.gl,u=n.format,l=n.width,c=n.height,_=n.sampleCount,E=_===void 0?1:_,d=n.texture,h=!1;if((u===g.D32F||u===g.D24_S8)&&d&&!x(s)&&!a.WEBGL_depth_texture&&(d.destroy(),o.texture=null,h=!0),!h&&d)o.texture=d;else{o.gl_renderbuffer=o.device.ensureResourceExists(s.createRenderbuffer()),s.bindRenderbuffer(s.RENDERBUFFER,o.gl_renderbuffer);var m=o.device.translateTextureInternalFormat(u,!0);x(s)&&E>1?s.renderbufferStorageMultisample(f.RENDERBUFFER,E,m,l,c):s.renderbufferStorage(f.RENDERBUFFER,m,l,c)}return o.format=u,o.width=l,o.height=c,o.sampleCount=E,o}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gl_renderbuffer!==null&&this.device.gl.deleteRenderbuffer(this.gl_renderbuffer),this.texture&&this.texture.destroy()},t})(ae);var xe;(function(e){e[e.NeedsCompile=0]="NeedsCompile",e[e.Compiling=1]="Compiling",e[e.NeedsBind=2]="NeedsBind",e[e.ReadyToUse=3]="ReadyToUse"})(xe||(xe={}));(function(e){X(t,e);function t(i,r){var a=i.id,n=i.device,o=i.descriptor,s=e.call(this,{id:a,device:n})||this;s.rawVertexGLSL=r,s.type=b.Program,s.uniformSetters={},s.attributes=[];var u=s.device.gl;return s.descriptor=o,s.gl_program=s.device.ensureResourceExists(u.createProgram()),s.gl_shader_vert=null,s.gl_shader_frag=null,s.compileState=xe.NeedsCompile,s.tryCompileProgram(),s}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.gl.deleteProgram(this.gl_program),this.device.gl.deleteShader(this.gl_shader_vert),this.device.gl.deleteShader(this.gl_shader_frag)},t.prototype.tryCompileProgram=function(){var i,r;z(this.compileState===xe.NeedsCompile);var a=this.descriptor,n=this.device.gl;!((i=a.vertex)===null||i===void 0)&&i.glsl&&(!((r=a.fragment)===null||r===void 0)&&r.glsl)&&(this.gl_shader_vert=this.compileShader(a.vertex.glsl,n.VERTEX_SHADER),this.gl_shader_frag=this.compileShader(a.fragment.glsl,n.FRAGMENT_SHADER),n.attachShader(this.gl_program,this.gl_shader_vert),n.attachShader(this.gl_program,this.gl_shader_frag),n.linkProgram(this.gl_program),this.compileState=xe.Compiling,x(n)||(this.readUniformLocationsFromLinkedProgram(),this.readAttributesFromLinkedProgram()))},t.prototype.readAttributesFromLinkedProgram=function(){for(var i,r=this.device.gl,a=r.getProgramParameter(this.gl_program,r.ACTIVE_ATTRIBUTES),n=rr(this.descriptor.vertex.glsl),o=nr(this.rawVertexGLSL,n),s=function(c){var _=r.getActiveAttrib(u.gl_program,c),E=_.name,d=_.type,h=_.size,m=r.getAttribLocation(u.gl_program,E),R=(i=o.find(function(A){return A.name===E}))===null||i===void 0?void 0:i.location;m>=0&&!rt(R)&&(u.attributes[R]={name:E,location:m,type:d,size:h})},u=this,l=0;l<a;l++)s(l)},t.prototype.readUniformLocationsFromLinkedProgram=function(){for(var i=this.device.gl,r=i.getProgramParameter(this.gl_program,i.ACTIVE_UNIFORMS),a=0;a<r;a++){var n=i.getActiveUniform(this.gl_program,a),o=Li(n.name).name,s=i.getUniformLocation(this.gl_program,o);if(this.uniformSetters[o]=bt(i,s,n),n&&n.size>1)for(var u=0;u<n.size;u++)s=i.getUniformLocation(this.gl_program,"".concat(o,"[").concat(u,"]")),this.uniformSetters["".concat(o,"[").concat(u,"]")]=bt(i,s,n)}},t.prototype.compileShader=function(i,r){var a=this.device.gl,n=this.device.ensureResourceExists(a.createShader(r));return a.shaderSource(n,i),a.compileShader(n),n},t.prototype.setUniformsLegacy=function(i){i===void 0&&(i={});var r=this.device.gl;if(!x(r)){var a=!1;for(var n in i){a||(r.useProgram(this.gl_program),a=!0);var o=i[n],s=this.uniformSetters[n];if(s){var u=o;u instanceof Ar&&(u=u.textureIndex),s(u)}}}return this},t})(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.QueryPool;var s=o.device.gl;if(x(s)){var u=n.elemCount,l=n.type;o.gl_query=Ki(u,function(){return o.device.ensureResourceExists(s.createQuery())}),o.gl_query_type=pr(l)}return o}return t.prototype.queryResultOcclusion=function(i){var r=this.device.gl;if(x(r)){var a=this.gl_query[i];return r.getQueryParameter(a,r.QUERY_RESULT_AVAILABLE)?!!r.getQueryParameter(a,r.QUERY_RESULT):null}return null},t.prototype.destroy=function(){e.prototype.destroy.call(this);var i=this.device.gl;if(x(i))for(var r=0;r<this.gl_query.length;r++)i.deleteQuery(this.gl_query[r])},t})(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=e.call(this,{id:r,device:a})||this;return n.type=b.Readback,n.gl_pbo=null,n.gl_sync=null,n}return t.prototype.clientWaitAsync=function(i,r,a){r===void 0&&(r=0),a===void 0&&(a=10);var n=this.device.gl;return new Promise(function(o,s){function u(){var l=n.clientWaitSync(i,r,0);if(l==n.WAIT_FAILED){s();return}if(l==n.TIMEOUT_EXPIRED){setTimeout(u,Xi(a,0,n.MAX_CLIENT_WAIT_TIMEOUT_WEBGL));return}o()}u()})},t.prototype.getBufferSubDataAsync=function(i,r,a,n,o,s){return Ue(this,void 0,void 0,function(){var u;return ye(this,function(l){switch(l.label){case 0:return u=this.device.gl,x(u)?(this.gl_sync=u.fenceSync(u.SYNC_GPU_COMMANDS_COMPLETE,0),u.flush(),[4,this.clientWaitAsync(this.gl_sync,0,10)]):[3,2];case 1:return l.sent(),u.bindBuffer(i,r),u.getBufferSubData(i,a,n,o,s),u.bindBuffer(i,null),[2,n];case 2:return[2]}})})},t.prototype.readTexture=function(i,r,a,n,o,s,u,l){return u===void 0&&(u=0),l===void 0&&(l=s.byteLength||0),Ue(this,void 0,void 0,function(){var c,_,E,d,h;return ye(this,function(m){return c=this.device.gl,_=i,E=this.device.translateTextureFormat(_.format),d=this.device.translateTextureType(_.format),h=Wi(_.format),x(c)?(this.gl_pbo=this.device.ensureResourceExists(c.createBuffer()),c.bindBuffer(c.PIXEL_PACK_BUFFER,this.gl_pbo),c.bufferData(c.PIXEL_PACK_BUFFER,l,c.STREAM_READ),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),c.bindFramebuffer(f.READ_FRAMEBUFFER,this.device.readbackFramebuffer),c.framebufferTexture2D(f.READ_FRAMEBUFFER,f.COLOR_ATTACHMENT0,f.TEXTURE_2D,_.gl_texture,0),c.bindBuffer(c.PIXEL_PACK_BUFFER,this.gl_pbo),c.readPixels(r,a,n,o,E,d,u*h),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),[2,this.getBufferSubDataAsync(c.PIXEL_PACK_BUFFER,this.gl_pbo,0,s,u,0)]):[2,this.readTextureSync(i,r,a,n,o,s,u,l)]})})},t.prototype.readTextureSync=function(i,r,a,n,o,s,u,l){l===void 0&&(l=s.byteLength||0);var c=this.device.gl,_=i,E=this.device.translateTextureType(_.format);return c.bindFramebuffer(f.FRAMEBUFFER,this.device.readbackFramebuffer),c.framebufferTexture2D(f.FRAMEBUFFER,f.COLOR_ATTACHMENT0,f.TEXTURE_2D,_.gl_texture,0),c.pixelStorei(c.PACK_ALIGNMENT,4),c.readPixels(r,a,n,o,c.RGBA,E,s),s},t.prototype.readBuffer=function(i,r,a,n,o){return Ue(this,void 0,void 0,function(){var s;return ye(this,function(u){return s=this.device.gl,x(s)?[2,this.getBufferSubDataAsync(s.ARRAY_BUFFER,vt(i,r),r,a,n,o)]:[2,Promise.reject()]})})},t.prototype.destroy=function(){e.prototype.destroy.call(this),x(this.device.gl)&&(this.gl_sync!==null&&this.device.gl.deleteSync(this.gl_sync),this.gl_pbo!==null&&this.device.gl.deleteBuffer(this.gl_pbo))},t})(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o,s,u=e.call(this,{id:r,device:a})||this;return u.type=b.RenderPipeline,u.drawMode=ur((o=n.topology)!==null&&o!==void 0?o:J.TRIANGLES),u.program=n.program,u.inputLayout=n.inputLayout,u.megaState=V(V({},St(at)),n.megaStateDescriptor),u.colorAttachmentFormats=n.colorAttachmentFormats.slice(),u.depthStencilAttachmentFormat=n.depthStencilAttachmentFormat,u.sampleCount=(s=n.sampleCount)!==null&&s!==void 0?s:1,u}return t})(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;return o.type=b.ComputePipeline,o.descriptor=n,o}return t})(ae);(function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o,s,u=e.call(this,{id:r,device:a})||this;u.type=b.Sampler;var l=u.device.gl;if(x(l)){var c=u.device.ensureResourceExists(l.createSampler());l.samplerParameteri(c,f.TEXTURE_WRAP_S,Oe(n.addressModeU)),l.samplerParameteri(c,f.TEXTURE_WRAP_T,Oe(n.addressModeV)),l.samplerParameteri(c,f.TEXTURE_WRAP_R,Oe((o=n.addressModeW)!==null&&o!==void 0?o:n.addressModeU)),l.samplerParameteri(c,f.TEXTURE_MIN_FILTER,ze(n.minFilter,n.mipmapFilter)),l.samplerParameteri(c,f.TEXTURE_MAG_FILTER,ze(n.magFilter,W.NO_MIP)),n.lodMinClamp!==void 0&&l.samplerParameterf(c,f.TEXTURE_MIN_LOD,n.lodMinClamp),n.lodMaxClamp!==void 0&&l.samplerParameterf(c,f.TEXTURE_MAX_LOD,n.lodMaxClamp),n.compareFunction!==void 0&&(l.samplerParameteri(c,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.samplerParameteri(c,l.TEXTURE_COMPARE_FUNC,n.compareFunction));var _=(s=n.maxAnisotropy)!==null&&s!==void 0?s:1;_>1&&u.device.EXT_texture_filter_anisotropic!==null&&(z(n.minFilter===F.BILINEAR&&n.magFilter===F.BILINEAR&&n.mipmapFilter===W.LINEAR),l.samplerParameterf(c,u.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,_)),u.gl_sampler=c}else u.descriptor=n;return u}return t.prototype.setTextureParameters=function(i,r,a){var n,o=this.device.gl,s=this.descriptor;this.isNPOT(r,a)?o.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR):o.texParameteri(i,f.TEXTURE_MIN_FILTER,ze(s.minFilter,s.mipmapFilter)),o.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,Oe(s.addressModeU)),o.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,Oe(s.addressModeV)),o.texParameteri(i,f.TEXTURE_MAG_FILTER,ze(s.magFilter,W.NO_MIP));var u=(n=s.maxAnisotropy)!==null&&n!==void 0?n:1;u>1&&this.device.EXT_texture_filter_anisotropic!==null&&(z(s.minFilter===F.BILINEAR&&s.magFilter===F.BILINEAR&&s.mipmapFilter===W.LINEAR),o.texParameteri(i,this.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,u))},t.prototype.destroy=function(){e.prototype.destroy.call(this),x(this.device.gl)&&this.device.gl.deleteSampler(fr(this))},t.prototype.isNPOT=function(i,r){return!Je(i)||!Je(r)},t})(ae);let H;const ai=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&ai.decode();let Pe=null;function Ke(){return(Pe===null||Pe.byteLength===0)&&(Pe=new Uint8Array(H.memory.buffer)),Pe}function tt(e,t){return e=e>>>0,ai.decode(Ke().subarray(e,e+t))}const Ee=new Array(128).fill(void 0);Ee.push(void 0,null,!0,!1);let De=Ee.length;function hr(e){De===Ee.length&&Ee.push(Ee.length+1);const t=De;return De=Ee[t],Ee[t]=e,t}function $e(e){return Ee[e]}function Tr(e){e<132||(Ee[e]=De,De=e)}function gr(e){const t=$e(e);return Tr(e),t}let He=0;const qe=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},mr=typeof qe.encodeInto=="function"?function(e,t){return qe.encodeInto(e,t)}:function(e,t){const i=qe.encode(e);return t.set(i),{read:e.length,written:i.length}};function Tt(e,t,i){if(i===void 0){const s=qe.encode(e),u=t(s.length,1)>>>0;return Ke().subarray(u,u+s.length).set(s),He=s.length,u}let r=e.length,a=t(r,1)>>>0;const n=Ke();let o=0;for(;o<r;o++){const s=e.charCodeAt(o);if(s>127)break;n[a+o]=s}if(o!==r){o!==0&&(e=e.slice(o)),a=i(a,r,r=o+e.length*3,1)>>>0;const s=Ke().subarray(a+o,a+r),u=mr(e,s);o+=u.written}return He=o,a}let Me=null;function it(){return(Me===null||Me.byteLength===0)&&(Me=new Int32Array(H.memory.buffer)),Me}function Sr(e,t,i){let r,a;try{const s=H.__wbindgen_add_to_stack_pointer(-16),u=Tt(e,H.__wbindgen_malloc,H.__wbindgen_realloc),l=He,c=Tt(t,H.__wbindgen_malloc,H.__wbindgen_realloc),_=He;H.glsl_compile(s,u,l,c,_,i);var n=it()[s/4+0],o=it()[s/4+1];return r=n,a=o,tt(n,o)}finally{H.__wbindgen_add_to_stack_pointer(16),H.__wbindgen_free(r,a,1)}}class We{static __wrap(t){t=t>>>0;const i=Object.create(We.prototype);return i.__wbg_ptr=t,i}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();H.__wbg_wgslcomposer_free(t)}constructor(){const t=H.wgslcomposer_new();return We.__wrap(t)}wgsl_compile(t){let i,r;try{const o=H.__wbindgen_add_to_stack_pointer(-16),s=Tt(t,H.__wbindgen_malloc,H.__wbindgen_realloc),u=He;H.wgslcomposer_wgsl_compile(o,this.__wbg_ptr,s,u);var a=it()[o/4+0],n=it()[o/4+1];return i=a,r=n,tt(a,n)}finally{H.__wbindgen_add_to_stack_pointer(16),H.__wbindgen_free(i,r,1)}}}async function Nr(e,t){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,t)}catch(r){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const i=await e.arrayBuffer();return await WebAssembly.instantiate(i,t)}else{const i=await WebAssembly.instantiate(e,t);return i instanceof WebAssembly.Instance?{instance:i,module:e}:i}}function vr(){const e={};return e.wbg={},e.wbg.__wbindgen_string_new=function(t,i){const r=tt(t,i);return hr(r)},e.wbg.__wbindgen_object_drop_ref=function(t){gr(t)},e.wbg.__wbg_log_1d3ae0273d8f4f8a=function(t){console.log($e(t))},e.wbg.__wbg_log_576ca876af0d4a77=function(t,i){console.log($e(t),$e(i))},e.wbg.__wbindgen_throw=function(t,i){throw new Error(tt(t,i))},e}function Cr(e,t){return H=e.exports,oi.__wbindgen_wasm_module=t,Me=null,Pe=null,H}async function oi(e){if(H!==void 0)return H;const t=vr();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:i,module:r}=await Nr(await e,t);return Cr(i,r)}var Y;(function(e){e[e.COPY_SRC=1]="COPY_SRC",e[e.COPY_DST=2]="COPY_DST",e[e.TEXTURE_BINDING=4]="TEXTURE_BINDING",e[e.STORAGE_BINDING=8]="STORAGE_BINDING",e[e.STORAGE=8]="STORAGE",e[e.RENDER_ATTACHMENT=16]="RENDER_ATTACHMENT"})(Y||(Y={}));var gt;(function(e){e[e.READ=1]="READ",e[e.WRITE=2]="WRITE"})(gt||(gt={}));function Ir(e){var t=0;return e&ie.SAMPLED&&(t|=Y.TEXTURE_BINDING|Y.COPY_DST|Y.COPY_SRC),e&ie.STORAGE&&(t|=Y.TEXTURE_BINDING|Y.STORAGE_BINDING|Y.COPY_SRC|Y.COPY_DST),e&ie.RENDER_TARGET&&(t|=Y.RENDER_ATTACHMENT|Y.TEXTURE_BINDING|Y.COPY_SRC|Y.COPY_DST),t}function Ct(e){if(e===g.U8_R_NORM)return"r8unorm";if(e===g.U8_RG_NORM)return"rg8unorm";if(e===g.U8_RGBA_RT)return"bgra8unorm";if(e===g.U8_RGBA_RT_SRGB)return"bgra8unorm-srgb";if(e===g.U8_RGBA_NORM)return"rgba8unorm";if(e===g.U8_RGBA_SRGB)return"rgba8unorm-srgb";if(e===g.S8_R_NORM)return"r8snorm";if(e===g.S8_RG_NORM)return"rg8snorm";if(e===g.S8_RGBA_NORM)return"rgba8snorm";if(e===g.U32_R)return"r32uint";if(e===g.F16_RGBA)return"rgba16float";if(e===g.F32_RGBA)return"rgba32float";if(e===g.D24)return"depth24plus";if(e===g.D24_S8)return"depth24plus-stencil8";if(e===g.D32F)return"depth32float";if(e===g.D32F_S8)return"depth32float-stencil8";if(e===g.BC1)return"bc1-rgba-unorm";if(e===g.BC1_SRGB)return"bc1-rgba-unorm-srgb";if(e===g.BC2)return"bc2-rgba-unorm";if(e===g.BC2_SRGB)return"bc2-rgba-unorm-srgb";if(e===g.BC3)return"bc3-rgba-unorm";if(e===g.BC3_SRGB)return"bc3-rgba-unorm-srgb";if(e===g.BC4_SNORM)return"bc4-r-snorm";if(e===g.BC4_UNORM)return"bc4-r-unorm";if(e===g.BC5_SNORM)return"bc5-rg-snorm";if(e===g.BC5_UNORM)return"bc5-rg-unorm";throw"whoops"}function Br(e){if(e===U.TEXTURE_2D)return"2d";if(e===U.TEXTURE_CUBE_MAP)return"2d";if(e===U.TEXTURE_2D_ARRAY)return"2d";if(e===U.TEXTURE_3D)return"3d";throw new Error("whoops")}function Or(e){if(e===U.TEXTURE_2D)return"2d";if(e===U.TEXTURE_CUBE_MAP)return"cube";if(e===U.TEXTURE_2D_ARRAY)return"2d-array";if(e===U.TEXTURE_3D)return"3d";throw new Error("whoops")}function Pr(e){var t=0;return e&D.INDEX&&(t|=GPUBufferUsage.INDEX),e&D.VERTEX&&(t|=GPUBufferUsage.VERTEX),e&D.UNIFORM&&(t|=GPUBufferUsage.UNIFORM),e&D.STORAGE&&(t|=GPUBufferUsage.STORAGE),e&D.COPY_SRC&&(t|=GPUBufferUsage.COPY_SRC),t|=GPUBufferUsage.COPY_DST,t}function ut(e){if(e===$.CLAMP_TO_EDGE)return"clamp-to-edge";if(e===$.REPEAT)return"repeat";if(e===$.MIRRORED_REPEAT)return"mirror-repeat";throw new Error("whoops")}function Vt(e){if(e===F.BILINEAR)return"linear";if(e===F.POINT)return"nearest";throw new Error("whoops")}function Mr(e){if(e===W.LINEAR)return"linear";if(e===W.NEAREST)return"nearest";if(e===W.NO_MIP)return"nearest";throw new Error("whoops")}function Ce(e){var t=e;return t.gpuBuffer}function Ur(e){var t=e;return t.gpuSampler}function yr(e){var t=e;return t.querySet}function xr(e){if(e===Qe.OcclusionConservative)return"occlusion";throw new Error("whoops")}function Dr(e){switch(e){case J.TRIANGLES:return"triangle-list";case J.POINTS:return"point-list";case J.TRIANGLE_STRIP:return"triangle-strip";case J.LINES:return"line-list";case J.LINE_STRIP:return"line-strip";default:throw new Error("Unknown primitive topology mode")}}function br(e){if(e===Ie.NONE)return"none";if(e===Ie.FRONT)return"front";if(e===Ie.BACK)return"back";throw new Error("whoops")}function Fr(e){if(e===we.CCW)return"ccw";if(e===we.CW)return"cw";throw new Error("whoops")}function wr(e,t){return{topology:Dr(e),cullMode:br(t.cullMode),frontFace:Fr(t.frontFace)}}function Ht(e){if(e===K.ZERO)return"zero";if(e===K.ONE)return"one";if(e===K.SRC)return"src";if(e===K.ONE_MINUS_SRC)return"one-minus-src";if(e===K.DST)return"dst";if(e===K.ONE_MINUS_DST)return"one-minus-dst";if(e===K.SRC_ALPHA)return"src-alpha";if(e===K.ONE_MINUS_SRC_ALPHA)return"one-minus-src-alpha";if(e===K.DST_ALPHA)return"dst-alpha";if(e===K.ONE_MINUS_DST_ALPHA)return"one-minus-dst-alpha";if(e===K.CONST)return"constant";if(e===K.ONE_MINUS_CONSTANT)return"one-minus-constant";if(e===K.SRC_ALPHA_SATURATE)return"src-alpha-saturated";throw new Error("whoops")}function Xr(e){if(e===_e.ADD)return"add";if(e===_e.SUBSTRACT)return"subtract";if(e===_e.REVERSE_SUBSTRACT)return"reverse-subtract";if(e===_e.MIN)return"min";if(e===_e.MAX)return"max";throw new Error("whoops")}function Wt(e){return{operation:Xr(e.blendMode),srcFactor:Ht(e.blendSrcFactor),dstFactor:Ht(e.blendDstFactor)}}function kt(e){return e.blendMode===_e.ADD&&e.blendSrcFactor===K.ONE&&e.blendDstFactor===K.ZERO}function Vr(e){if(!(kt(e.rgbBlendState)&&kt(e.alphaBlendState)))return{color:Wt(e.rgbBlendState),alpha:Wt(e.alphaBlendState)}}function Hr(e,t){return{format:Ct(t),blend:Vr(e),writeMask:e.channelWriteMask}}function Wr(e,t){return t.attachmentsState.map(function(i,r){return Hr(i,e[r])})}function je(e){if(e===Q.NEVER)return"never";if(e===Q.LESS)return"less";if(e===Q.EQUAL)return"equal";if(e===Q.LEQUAL)return"less-equal";if(e===Q.GREATER)return"greater";if(e===Q.NOTEQUAL)return"not-equal";if(e===Q.GEQUAL)return"greater-equal";if(e===Q.ALWAYS)return"always";throw new Error("whoops")}function Ne(e){if(e===j.KEEP)return"keep";if(e===j.REPLACE)return"replace";if(e===j.ZERO)return"zero";if(e===j.DECREMENT_CLAMP)return"decrement-clamp";if(e===j.DECREMENT_WRAP)return"decrement-wrap";if(e===j.INCREMENT_CLAMP)return"increment-clamp";if(e===j.INCREMENT_WRAP)return"increment-wrap";if(e===j.INVERT)return"invert";throw new Error("whoops")}function kr(e,t){if(!rt(e))return{format:Ct(e),depthWriteEnabled:!!t.depthWrite,depthCompare:je(t.depthCompare),depthBias:t.polygonOffset?1:0,depthBiasSlopeScale:t.polygonOffset?1:0,stencilFront:{compare:je(t.stencilFront.compare),passOp:Ne(t.stencilFront.passOp),failOp:Ne(t.stencilFront.failOp),depthFailOp:Ne(t.stencilFront.depthFailOp)},stencilBack:{compare:je(t.stencilBack.compare),passOp:Ne(t.stencilBack.passOp),failOp:Ne(t.stencilBack.failOp),depthFailOp:Ne(t.stencilBack.depthFailOp)},stencilReadMask:1,stencilWriteMask:1}}function zr(e){if(e!==null){if(e===g.U16_R)return"uint16";if(e===g.U32_R)return"uint32";throw new Error("whoops")}}function Yr(e){if(e===Xe.VERTEX)return"vertex";if(e===Xe.INSTANCE)return"instance";throw new Error("whoops")}function Kr(e){if(e===g.U8_R)return"uint8x2";if(e===g.U8_RG)return"uint8x2";if(e===g.U8_RGB)return"uint8x4";if(e===g.U8_RGBA)return"uint8x4";if(e===g.U8_RG_NORM)return"unorm8x2";if(e===g.U8_RGBA_NORM)return"unorm8x4";if(e===g.S8_RGB_NORM)return"snorm8x4";if(e===g.S8_RGBA_NORM)return"snorm8x4";if(e===g.U16_RG_NORM)return"unorm16x2";if(e===g.U16_RGBA_NORM)return"unorm16x4";if(e===g.S16_RG_NORM)return"snorm16x2";if(e===g.S16_RGBA_NORM)return"snorm16x4";if(e===g.S16_RG)return"uint16x2";if(e===g.F16_RG)return"float16x2";if(e===g.F16_RGBA)return"float16x4";if(e===g.F32_R)return"float32";if(e===g.F32_RG)return"float32x2";if(e===g.F32_RGB)return"float32x3";if(e===g.F32_RGBA)return"float32x4";throw"whoops"}function $r(e){var t=Re(e);switch(t){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return!0;default:return!1}}function qr(e){var t=Re(e);switch(t){case T.BC1:case T.BC2:case T.BC3:case T.BC4_SNORM:case T.BC4_UNORM:case T.BC5_SNORM:case T.BC5_UNORM:return 4;default:return 1}}function zt(e,t,i,r){switch(i===void 0&&(i=!1),e){case g.S8_R:case g.S8_R_NORM:case g.S8_RG_NORM:case g.S8_RGB_NORM:case g.S8_RGBA_NORM:{var a=t instanceof ArrayBuffer?new Int8Array(t):new Int8Array(t);return r&&a.set(new Int8Array(r)),a}case g.U8_R:case g.U8_R_NORM:case g.U8_RG:case g.U8_RG_NORM:case g.U8_RGB:case g.U8_RGB_NORM:case g.U8_RGB_SRGB:case g.U8_RGBA:case g.U8_RGBA_NORM:case g.U8_RGBA_SRGB:{var n=t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t);return r&&n.set(new Uint8Array(r)),n}case g.S16_R:case g.S16_RG:case g.S16_RG_NORM:case g.S16_RGB_NORM:case g.S16_RGBA:case g.S16_RGBA_NORM:{var o=t instanceof ArrayBuffer?new Int16Array(t):new Int16Array(i?t/2:t);return r&&o.set(new Int16Array(r)),o}case g.U16_R:case g.U16_RGB:case g.U16_RGBA_5551:case g.U16_RGBA_NORM:case g.U16_RG_NORM:case g.U16_R_NORM:{var s=t instanceof ArrayBuffer?new Uint16Array(t):new Uint16Array(i?t/2:t);return r&&s.set(new Uint16Array(r)),s}case g.S32_R:{var u=t instanceof ArrayBuffer?new Int32Array(t):new Int32Array(i?t/4:t);return r&&u.set(new Int32Array(r)),u}case g.U32_R:case g.U32_RG:{var l=t instanceof ArrayBuffer?new Uint32Array(t):new Uint32Array(i?t/4:t);return r&&l.set(new Uint32Array(r)),l}case g.F32_R:case g.F32_RG:case g.F32_RGB:case g.F32_RGBA:{var c=t instanceof ArrayBuffer?new Float32Array(t):new Float32Array(i?t/4:t);return r&&c.set(new Float32Array(r)),c}}var _=t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t);return r&&_.set(new Uint8Array(r)),_}function jr(e){var t=(e&32768)>>15,i=(e&31744)>>10,r=e&1023;return i===0?(t?-1:1)*Math.pow(2,-14)*(r/Math.pow(2,10)):i==31?r?NaN:(t?-1:1)*(1/0):(t?-1:1)*Math.pow(2,i-15)*(1+r/Math.pow(2,10))}var le=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=e.call(this)||this;return n.id=r,n.device=a,n}return t.prototype.destroy=function(){},t}(Qt),Zr=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o,s,u=e.call(this,{id:r,device:a})||this;u.type=b.Bindings;var l=n.pipeline;z(!!l);var c=n.uniformBufferBindings,_=n.storageBufferBindings,E=n.samplerBindings,d=n.storageTextureBindings;u.numUniformBuffers=(c==null?void 0:c.length)||0;var h=[[],[],[],[]],m=0;if(c&&c.length)for(var R=0;R<c.length;R++){var A=n.uniformBufferBindings[R],p=A.binding,S=A.size,I=A.offset,y=A.buffer,P={buffer:Ce(y),offset:I??0,size:S};h[0].push({binding:p??m++,resource:P})}if(E&&E.length){m=0;for(var R=0;R<E.length;R++){var O=V(V({},E[R]),ji),p=n.samplerBindings[R],B=p.texture!==null?p.texture:u.device.getFallbackTexture(O);O.dimension=B.dimension,O.formatKind=ti(B.format);var k=B.gpuTextureView;if(h[1].push({binding:(o=p.textureBinding)!==null&&o!==void 0?o:m++,resource:k}),p.samplerBinding!==-1){var G=p.sampler!==null?p.sampler:u.device.getFallbackSampler(O),ee=Ur(G);h[1].push({binding:(s=p.samplerBinding)!==null&&s!==void 0?s:m++,resource:ee})}}}if(_&&_.length){m=0;for(var R=0;R<_.length;R++){var oe=n.storageBufferBindings[R],p=oe.binding,S=oe.size,I=oe.offset,y=oe.buffer,P={buffer:Ce(y),offset:I??0,size:S};h[2].push({binding:p??m++,resource:P})}}if(d&&d.length){m=0;for(var R=0;R<d.length;R++){var Ae=n.storageTextureBindings[R],p=Ae.binding,B=Ae.texture,k=B.gpuTextureView;h[3].push({binding:p??m++,resource:k})}}var me=h.findLastIndex(function(ue){return!!ue.length});return u.gpuBindGroup=h.map(function(ue,he){return he<=me&&u.device.device.createBindGroup({layout:l.getBindGroupLayout(he),entries:ue})}),u}return t}(le),Lr=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.Buffer;var s=n.usage,u=n.viewOrSize,l=!!(s&D.MAP_READ);o.usage=Pr(s),l&&(o.usage=D.MAP_READ|D.COPY_DST);var c=!ve(u);if(o.view=ve(u)?null:u,o.size=ve(u)?Ge(u,4):Ge(u.byteLength,4),ve(u))o.gpuBuffer=o.device.device.createBuffer({usage:o.usage,size:o.size,mappedAtCreation:l?c:!1});else{o.gpuBuffer=o.device.device.createBuffer({usage:o.usage,size:o.size,mappedAtCreation:!0});var _=u&&u.constructor||Float32Array;new _(o.gpuBuffer.getMappedRange()).set(u),o.gpuBuffer.unmap()}return o}return t.prototype.setSubData=function(i,r,a,n){a===void 0&&(a=0),n===void 0&&(n=0);var o=this.gpuBuffer;n=n||r.byteLength,n=Math.min(n,this.size-i);var s=r.byteOffset+a,u=s+n,l=n+3&-4;if(l!==n){var c=new Uint8Array(r.buffer.slice(s,u));r=new Uint8Array(l),r.set(c),a=0,s=0,u=l,n=l}for(var _=1024*1024*15,E=0;u-(s+E)>_;)this.device.device.queue.writeBuffer(o,i+E,r.buffer,s+E,_),E+=_;this.device.device.queue.writeBuffer(o,i+E,r.buffer,s+E,n-E)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gpuBuffer.destroy()},t}(le),Qr=function(){function e(){this.commandEncoder=null,this.gpuComputePassEncoder=null}return e.prototype.dispatchWorkgroups=function(t,i,r){this.gpuComputePassEncoder.dispatchWorkgroups(t,i,r)},e.prototype.dispatchWorkgroupsIndirect=function(t,i){this.gpuComputePassEncoder.dispatchWorkgroupsIndirect(t.gpuBuffer,i)},e.prototype.finish=function(){return this.gpuComputePassEncoder.end(),this.gpuComputePassEncoder=null,this.commandEncoder.finish()},e.prototype.beginComputePass=function(){z(this.gpuComputePassEncoder===null),this.gpuComputePassEncoder=this.commandEncoder.beginComputePass(this.gpuComputePassDescriptor)},e.prototype.setPipeline=function(t){var i=t,r=ht(i.gpuComputePipeline);this.gpuComputePassEncoder.setPipeline(r)},e.prototype.setBindings=function(t){var i=this,r=t;r.gpuBindGroup.forEach(function(a,n){a&&i.gpuComputePassEncoder.setBindGroup(n,r.gpuBindGroup[n])})},e.prototype.pushDebugGroup=function(t){this.gpuComputePassEncoder.pushDebugGroup(t)},e.prototype.popDebugGroup=function(){this.gpuComputePassEncoder.popDebugGroup()},e.prototype.insertDebugMarker=function(t){this.gpuComputePassEncoder.insertDebugMarker(t)},e}(),Jr=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.ComputePipeline,o.gpuComputePipeline=null,o.descriptor=n;var s=n.program,u=s.computeStage;if(u===null)return o;var l={layout:"auto",compute:V({},u)};return o.gpuComputePipeline=o.device.device.createComputePipeline(l),o.name!==void 0&&(o.gpuComputePipeline.label=o.name),o}return t.prototype.getBindGroupLayout=function(i){return this.gpuComputePipeline.getBindGroupLayout(i)},t}(le),Gr=function(e){X(t,e);function t(i){var r,a,n,o,s=i.id,u=i.device,l=i.descriptor,c=e.call(this,{id:s,device:u})||this;c.type=b.InputLayout;var _=[];try{for(var E=Fe(l.vertexBufferDescriptors),d=E.next();!d.done;d=E.next()){var h=d.value,m=h.arrayStride,R=h.stepMode,A=h.attributes;_.push({arrayStride:m,stepMode:Yr(R),attributes:[]});try{for(var p=(n=void 0,Fe(A)),S=p.next();!S.done;S=p.next()){var I=S.value,y=I.shaderLocation,P=I.format,O=I.offset;_[_.length-1].attributes.push({shaderLocation:y,format:Kr(P),offset:O})}}catch(B){n={error:B}}finally{try{S&&!S.done&&(o=p.return)&&o.call(p)}finally{if(n)throw n.error}}}}catch(B){r={error:B}}finally{try{d&&!d.done&&(a=E.return)&&a.call(E)}finally{if(r)throw r.error}}return c.indexFormat=zr(l.indexBufferFormat),c.buffers=_,c}return t}(le),Yt=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;return o.type=b.Program,o.vertexStage=null,o.fragmentStage=null,o.computeStage=null,o.descriptor=n,n.vertex&&(o.vertexStage=o.createShaderStage(n.vertex,"vertex")),n.fragment&&(o.fragmentStage=o.createShaderStage(n.fragment,"fragment")),n.compute&&(o.computeStage=o.createShaderStage(n.compute,"compute")),o}return t.prototype.setUniformsLegacy=function(i){},t.prototype.createShaderStage=function(i,r){var a,n,o=i.glsl,s=i.wgsl,u=i.entryPoint,l=!1,c=s;if(!c)try{c=this.device.glsl_compile(o,r,l)}catch(R){throw console.error(R,o),new Error("whoops")}var _=function(R){if(!c.includes(R))return"continue";c=c.replace("var T_".concat(R,": texture_2d<f32>;"),"var T_".concat(R,": texture_depth_2d;")),c=c.replace(new RegExp("textureSample\\(T_".concat(R,"(.*)\\);$"),"gm"),function(A,p){return"vec4<f32>(textureSample(T_".concat(R).concat(p,"), 0.0, 0.0, 0.0);")})};try{for(var E=Fe(["u_TextureFramebufferDepth"]),d=E.next();!d.done;d=E.next()){var h=d.value;_(h)}}catch(R){a={error:R}}finally{try{d&&!d.done&&(n=E.return)&&n.call(E)}finally{if(a)throw a.error}}var m=this.device.device.createShaderModule({code:c});return{module:m,entryPoint:u||"main"}},t}(le),en=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;o.type=b.QueryPool;var s=n.elemCount,u=n.type;return o.querySet=o.device.device.createQuerySet({type:xr(u),count:s}),o.resolveBuffer=o.device.device.createBuffer({size:s*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),o.cpuBuffer=o.device.device.createBuffer({size:s*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o.results=null,o}return t.prototype.queryResultOcclusion=function(i){return this.results===null?null:this.results[i]!==BigInt(0)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.querySet.destroy(),this.resolveBuffer.destroy(),this.cpuBuffer.destroy()},t}(le),tn=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=e.call(this,{id:r,device:a})||this;return n.type=b.Readback,n}return t.prototype.readTexture=function(i,r,a,n,o,s,u,l){return u===void 0&&(u=0),Ue(this,void 0,void 0,function(){var c,_,E,d,h,m,R,A;return ye(this,function(p){return c=i,_=0,E=this.getBlockInformationFromFormat(c.gpuTextureformat),d=Math.ceil(n/E.width)*E.length,h=Math.ceil(d/256)*256,m=h*o,R=this.device.createBuffer({usage:D.STORAGE|D.MAP_READ|D.COPY_DST,hint:ge.STATIC,viewOrSize:m}),A=this.device.device.createCommandEncoder(),A.copyTextureToBuffer({texture:c.gpuTexture,mipLevel:0,origin:{x:r,y:a,z:Math.max(_,0)}},{buffer:R.gpuBuffer,offset:0,bytesPerRow:h},{width:n,height:o,depthOrArrayLayers:1}),this.device.device.queue.submit([A.finish()]),[2,this.readBuffer(R,0,s.byteLength===m?s:null,u,m,c.format)]})})},t.prototype.readTextureSync=function(i,r,a,n,o,s,u,l){throw new Error("ERROR_MSG_METHOD_NOT_IMPLEMENTED")},t.prototype.readBuffer=function(i,r,a,n,o,s,u,l){var c=this;r===void 0&&(r=0),a===void 0&&(a=null),o===void 0&&(o=0),s===void 0&&(s=g.U8_RGB),u===void 0&&(u=!1);var _=i,E=o||_.size,d=a||_.view,h=d&&d.constructor&&d.constructor.BYTES_PER_ELEMENT||ei(s),m=_;if(!(_.usage&D.MAP_READ&&_.usage&D.COPY_DST)){var R=this.device.device.createCommandEncoder();m=this.device.createBuffer({usage:D.STORAGE|D.MAP_READ|D.COPY_DST,hint:ge.STATIC,viewOrSize:E}),R.copyBufferToBuffer(_.gpuBuffer,r,m.gpuBuffer,0,E),this.device.device.queue.submit([R.finish()])}return new Promise(function(A,p){m.gpuBuffer.mapAsync(gt.READ,r,E).then(function(){var S=m.gpuBuffer.getMappedRange(r,E),I=d;if(u)I===null?I=zt(s,E,!0,S):I=zt(s,I.buffer,void 0,S);else if(I===null)switch(h){case 1:I=new Uint8Array(E),I.set(new Uint8Array(S));break;case 2:I=c.getHalfFloatAsFloatRGBAArrayBuffer(E/2,S);break;case 4:I=new Float32Array(E/4),I.set(new Float32Array(S));break}else switch(h){case 1:I=new Uint8Array(I.buffer),I.set(new Uint8Array(S));break;case 2:I=c.getHalfFloatAsFloatRGBAArrayBuffer(E/2,S,d);break;case 4:var y=d&&d.constructor||Float32Array;I=new y(I.buffer),I.set(new y(S));break}m.gpuBuffer.unmap(),A(I)},function(S){return p(S)})})},t.prototype.getHalfFloatAsFloatRGBAArrayBuffer=function(i,r,a){a||(a=new Float32Array(i));for(var n=new Uint16Array(r);i--;)a[i]=jr(n[i]);return a},t.prototype.getBlockInformationFromFormat=function(i){switch(i){case"r8unorm":case"r8snorm":case"r8uint":case"r8sint":return{width:1,height:1,length:1};case"r16uint":case"r16sint":case"r16float":case"rg8unorm":case"rg8snorm":case"rg8uint":case"rg8sint":return{width:1,height:1,length:2};case"r32uint":case"r32sint":case"r32float":case"rg16uint":case"rg16sint":case"rg16float":case"rgba8unorm":case"rgba8unorm-srgb":case"rgba8snorm":case"rgba8uint":case"rgba8sint":case"bgra8unorm":case"bgra8unorm-srgb":case"rgb9e5ufloat":case"rgb10a2unorm":case"rg11b10ufloat":return{width:1,height:1,length:4};case"rg32uint":case"rg32sint":case"rg32float":case"rgba16uint":case"rgba16sint":case"rgba16float":return{width:1,height:1,length:8};case"rgba32uint":case"rgba32sint":case"rgba32float":return{width:1,height:1,length:16};case"stencil8":throw new Error("No fixed size for Stencil8 format!");case"depth16unorm":return{width:1,height:1,length:2};case"depth24plus":throw new Error("No fixed size for Depth24Plus format!");case"depth24plus-stencil8":throw new Error("No fixed size for Depth24PlusStencil8 format!");case"depth32float":return{width:1,height:1,length:4};case"depth32float-stencil8":return{width:1,height:1,length:5};case"bc7-rgba-unorm":case"bc7-rgba-unorm-srgb":case"bc6h-rgb-ufloat":case"bc6h-rgb-float":case"bc2-rgba-unorm":case"bc2-rgba-unorm-srgb":case"bc3-rgba-unorm":case"bc3-rgba-unorm-srgb":case"bc5-rg-unorm":case"bc5-rg-snorm":return{width:4,height:4,length:16};case"bc4-r-unorm":case"bc4-r-snorm":case"bc1-rgba-unorm":case"bc1-rgba-unorm-srgb":return{width:4,height:4,length:8};default:return{width:1,height:1,length:4}}},t}(le),rn=function(){function e(t){this.device=t,this.commandEncoder=null,this.gpuRenderPassEncoder=null,this.gfxColorAttachment=[],this.gfxColorAttachmentLevel=[],this.gfxColorResolveTo=[],this.gfxColorResolveToLevel=[],this.gfxDepthStencilAttachment=null,this.gfxDepthStencilResolveTo=null,this.gpuColorAttachments=[],this.gpuDepthStencilAttachment={view:null,depthLoadOp:"load",depthStoreOp:"store",stencilLoadOp:"load",stencilStoreOp:"store"},this.gpuRenderPassDescriptor={colorAttachments:this.gpuColorAttachments,depthStencilAttachment:this.gpuDepthStencilAttachment}}return e.prototype.getTextureView=function(t,i){return z(i<t.mipLevelCount),t.mipLevelCount===1?t.gpuTextureView:t.gpuTexture.createView({baseMipLevel:i,mipLevelCount:1})},e.prototype.setRenderPassDescriptor=function(t){var i,r,a,n,o,s;this.descriptor=t,this.gpuRenderPassDescriptor.colorAttachments=this.gpuColorAttachments;var u=t.colorAttachment.length;this.gfxColorAttachment.length=u,this.gfxColorResolveTo.length=u;for(var l=0;l<t.colorAttachment.length;l++){var c=t.colorAttachment[l],_=t.colorResolveTo[l];if(c===null&&_!==null&&(c=_,_=null),this.gfxColorAttachment[l]=c,this.gfxColorResolveTo[l]=_,this.gfxColorAttachmentLevel[l]=((i=t.colorAttachmentLevel)===null||i===void 0?void 0:i[l])||0,this.gfxColorResolveToLevel[l]=((r=t.colorResolveToLevel)===null||r===void 0?void 0:r[l])||0,c!==null){this.gpuColorAttachments[l]===void 0&&(this.gpuColorAttachments[l]={});var E=this.gpuColorAttachments[l];E.view=this.getTextureView(c,((a=this.gfxColorAttachmentLevel)===null||a===void 0?void 0:a[l])||0);var d=(o=(n=t.colorClearColor)===null||n===void 0?void 0:n[l])!==null&&o!==void 0?o:"load";d==="load"?E.loadOp="load":(E.loadOp="clear",E.clearValue=d),E.storeOp=!((s=t.colorStore)===null||s===void 0)&&s[l]?"store":"discard",E.resolveTarget=void 0,_!==null&&(c.sampleCount>1?E.resolveTarget=this.getTextureView(_,this.gfxColorResolveToLevel[l]):E.storeOp="store")}else{this.gpuColorAttachments.length=l,this.gfxColorAttachment.length=l,this.gfxColorResolveTo.length=l;break}}if(this.gfxDepthStencilAttachment=t.depthStencilAttachment,this.gfxDepthStencilResolveTo=t.depthStencilResolveTo,t.depthStencilAttachment){var h=t.depthStencilAttachment,E=this.gpuDepthStencilAttachment;E.view=h.gpuTextureView;var m=!!(Ve(h.format)&N.Depth);m?(t.depthClearValue==="load"?E.depthLoadOp="load":(E.depthLoadOp="clear",E.depthClearValue=t.depthClearValue),t.depthStencilStore||this.gfxDepthStencilResolveTo!==null?E.depthStoreOp="store":E.depthStoreOp="discard"):(E.depthLoadOp=void 0,E.depthStoreOp=void 0);var R=!!(Ve(h.format)&N.Stencil);R?(t.stencilClearValue==="load"?E.stencilLoadOp="load":(E.stencilLoadOp="clear",E.stencilClearValue=t.stencilClearValue),t.depthStencilStore||this.gfxDepthStencilResolveTo!==null?E.stencilStoreOp="store":E.stencilStoreOp="discard"):(E.stencilLoadOp=void 0,E.stencilStoreOp=void 0),this.gpuRenderPassDescriptor.depthStencilAttachment=this.gpuDepthStencilAttachment}else this.gpuRenderPassDescriptor.depthStencilAttachment=void 0;this.gpuRenderPassDescriptor.occlusionQuerySet=rt(t.occlusionQueryPool)?void 0:yr(t.occlusionQueryPool)},e.prototype.beginRenderPass=function(t){z(this.gpuRenderPassEncoder===null),this.setRenderPassDescriptor(t),this.gpuRenderPassEncoder=this.commandEncoder.beginRenderPass(this.gpuRenderPassDescriptor)},e.prototype.flipY=function(t,i){var r=this.device.swapChainHeight;return r-t-i},e.prototype.setViewport=function(t,i,r,a,n,o){n===void 0&&(n=0),o===void 0&&(o=1),this.gpuRenderPassEncoder.setViewport(t,this.flipY(i,a),r,a,n,o)},e.prototype.setScissorRect=function(t,i,r,a){this.gpuRenderPassEncoder.setScissorRect(t,this.flipY(i,a),r,a)},e.prototype.setPipeline=function(t){var i=t,r=ht(i.gpuRenderPipeline);this.gpuRenderPassEncoder.setPipeline(r)},e.prototype.setVertexInput=function(t,i,r){if(t!==null){var a=t;r!==null&&this.gpuRenderPassEncoder.setIndexBuffer(Ce(r.buffer),ht(a.indexFormat),r.offset);for(var n=0;n<i.length;n++){var o=i[n];o!==null&&this.gpuRenderPassEncoder.setVertexBuffer(n,Ce(o.buffer),o.offset)}}},e.prototype.setBindings=function(t){var i=this,r=t;r.gpuBindGroup.forEach(function(a,n){a&&i.gpuRenderPassEncoder.setBindGroup(n,r.gpuBindGroup[n])})},e.prototype.setStencilReference=function(t){this.gpuRenderPassEncoder.setStencilReference(t)},e.prototype.draw=function(t,i,r,a){this.gpuRenderPassEncoder.draw(t,i,r,a)},e.prototype.drawIndexed=function(t,i,r,a,n){this.gpuRenderPassEncoder.drawIndexed(t,i,r,a,n)},e.prototype.drawIndirect=function(t,i){this.gpuRenderPassEncoder.drawIndirect(Ce(t),i)},e.prototype.drawIndexedIndirect=function(t,i){this.gpuRenderPassEncoder.drawIndexedIndirect(Ce(t),i)},e.prototype.beginOcclusionQuery=function(t){this.gpuRenderPassEncoder.beginOcclusionQuery(t)},e.prototype.endOcclusionQuery=function(){this.gpuRenderPassEncoder.endOcclusionQuery()},e.prototype.pushDebugGroup=function(t){this.gpuRenderPassEncoder.pushDebugGroup(t)},e.prototype.popDebugGroup=function(){this.gpuRenderPassEncoder.popDebugGroup()},e.prototype.insertDebugMarker=function(t){this.gpuRenderPassEncoder.insertDebugMarker(t)},e.prototype.finish=function(){this.gpuRenderPassEncoder.end(),this.gpuRenderPassEncoder=null;for(var t=0;t<this.gfxColorAttachment.length;t++){var i=this.gfxColorAttachment[t],r=this.gfxColorResolveTo[t];i!==null&&r!==null&&i.sampleCount===1&&this.copyAttachment(r,this.gfxColorAttachmentLevel[t],i,this.gfxColorResolveToLevel[t])}return this.gfxDepthStencilAttachment&&this.gfxDepthStencilResolveTo&&(this.gfxDepthStencilAttachment.sampleCount>1||this.copyAttachment(this.gfxDepthStencilResolveTo,0,this.gfxDepthStencilAttachment,0)),this.commandEncoder.finish()},e.prototype.copyAttachment=function(t,i,r,a){z(r.sampleCount===1);var n={texture:r.gpuTexture,mipLevel:a},o={texture:t.gpuTexture,mipLevel:i};z(r.width>>>a===t.width>>>i),z(r.height>>>a===t.height>>>i),z(!!(r.usage&Y.COPY_SRC)),z(!!(t.usage&Y.COPY_DST)),this.commandEncoder.copyTextureToTexture(n,o,[t.width,t.height,1])},e}(),nn=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=e.call(this,{id:r,device:a})||this;return o.type=b.RenderPipeline,o.isCreatingAsync=!1,o.gpuRenderPipeline=null,o.descriptor=n,o.device.createRenderPipelineInternal(o,!1),o}return t.prototype.getBindGroupLayout=function(i){return this.gpuRenderPipeline.getBindGroupLayout(i)},t}(le),an=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o,s,u=e.call(this,{id:r,device:a})||this;u.type=b.Sampler;var l=n.lodMinClamp,c=n.mipmapFilter===W.NO_MIP?n.lodMinClamp:n.lodMaxClamp,_=(o=n.maxAnisotropy)!==null&&o!==void 0?o:1;return _>1&&z(n.minFilter===F.BILINEAR&&n.magFilter===F.BILINEAR&&n.mipmapFilter===W.LINEAR),u.gpuSampler=u.device.device.createSampler({addressModeU:ut(n.addressModeU),addressModeV:ut(n.addressModeV),addressModeW:ut((s=n.addressModeW)!==null&&s!==void 0?s:n.addressModeU),lodMinClamp:l,lodMaxClamp:c,minFilter:Vt(n.minFilter),magFilter:Vt(n.magFilter),mipmapFilter:Mr(n.mipmapFilter),compare:n.compareFunction!==void 0?je(n.compareFunction):void 0,maxAnisotropy:_}),u}return t}(le),Ye=function(e){X(t,e);function t(i){var r=i.id,a=i.device,n=i.descriptor,o=i.skipCreate,s=i.sampleCount,u=e.call(this,{id:r,device:a})||this;u.type=b.Texture,u.flipY=!1;var l=n.format,c=n.dimension,_=n.width,E=n.height,d=n.depthOrArrayLayers,h=n.mipLevelCount,m=n.usage,R=n.pixelStore;return u.flipY=!!(R!=null&&R.unpackFlipY),u.device.createTextureShared({format:l,dimension:c??U.TEXTURE_2D,width:_,height:E,depthOrArrayLayers:d??1,mipLevelCount:h??1,usage:m,sampleCount:s??1},u,o),u}return t.prototype.textureFromImageBitmapOrCanvas=function(i,r,a){for(var n=r[0].width,o=r[0].height,s={size:{width:n,height:o,depthOrArrayLayers:a},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},u=i.createTexture(s),l=0;l<r.length;l++)i.queue.copyExternalImageToTexture({source:r[l],flipY:this.flipY},{texture:u,origin:[0,0,l]},[n,o]);return[u,n,o]},t.prototype.isImageBitmapOrCanvases=function(i){var r=i[0];return r instanceof ImageBitmap||r instanceof HTMLCanvasElement||r instanceof OffscreenCanvas},t.prototype.isVideo=function(i){var r=i[0];return r instanceof HTMLVideoElement},t.prototype.setImageData=function(i,r){var a,n=this,o=this.device.device,s,u,l;this.isImageBitmapOrCanvases(i)?(a=pt(this.textureFromImageBitmapOrCanvas(o,i,this.depthOrArrayLayers),3),s=a[0],u=a[1],l=a[2]):this.isVideo(i)?s=o.importExternalTexture({source:i[0]}):i.forEach(function(c){o.queue.writeTexture({texture:n.gpuTexture},c,{},{width:n.width,height:n.height})}),this.width=u,this.height=l,this.gpuTexture=s,this.gpuTextureView=s.createView({dimension:Or(this.dimension)})},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gpuTexture.destroy()},t}(le),on=function(){function e(t,i,r,a,n,o){this.swapChainWidth=0,this.swapChainHeight=0,this.swapChainTextureUsage=Y.RENDER_ATTACHMENT|Y.COPY_DST,this._resourceUniqueId=0,this.renderPassPool=[],this.computePassPool=[],this.featureTextureCompressionBC=!1,this.platformString="WebGPU",this.glslVersion="#version 440",this.explicitBindingLocations=!0,this.separateSamplerTextures=!0,this.viewportOrigin=Ze.UPPER_LEFT,this.clipSpaceNearZ=Le.ZERO,this.supportsSyncPipelineCompilation=!1,this.supportMRT=!0,this.device=i,this.canvas=r,this.canvasContext=a,this.glsl_compile=n,this.WGSLComposer=o,this.fallbackTexture2D=this.createFallbackTexture(U.TEXTURE_2D,Z.Float),this.setResourceName(this.fallbackTexture2D,"Fallback Texture2D"),this.fallbackTexture2DDepth=this.createFallbackTexture(U.TEXTURE_2D,Z.Depth),this.setResourceName(this.fallbackTexture2DDepth,"Fallback Depth Texture2D"),this.fallbackTexture2DArray=this.createFallbackTexture(U.TEXTURE_2D_ARRAY,Z.Float),this.setResourceName(this.fallbackTexture2DArray,"Fallback Texture2DArray"),this.fallbackTexture3D=this.createFallbackTexture(U.TEXTURE_3D,Z.Float),this.setResourceName(this.fallbackTexture3D,"Fallback Texture3D"),this.fallbackTextureCube=this.createFallbackTexture(U.TEXTURE_CUBE_MAP,Z.Float),this.setResourceName(this.fallbackTextureCube,"Fallback TextureCube"),this.fallbackSamplerFiltering=this.createSampler({addressModeU:$.REPEAT,addressModeV:$.REPEAT,minFilter:F.POINT,magFilter:F.POINT,mipmapFilter:W.NEAREST}),this.setResourceName(this.fallbackSamplerFiltering,"Fallback Sampler Filtering"),this.fallbackSamplerComparison=this.createSampler({addressModeU:$.REPEAT,addressModeV:$.REPEAT,minFilter:F.POINT,magFilter:F.POINT,mipmapFilter:W.NEAREST,compareFunction:Q.ALWAYS}),this.setResourceName(this.fallbackSamplerComparison,"Fallback Sampler Comparison Filtering"),this.device.features&&(this.featureTextureCompressionBC=this.device.features.has("texture-compression-bc")),this.device.onuncapturederror=function(s){console.error(s.error)},this.swapChainFormat=navigator.gpu.getPreferredCanvasFormat(),this.canvasContext.configure({device:this.device,format:this.swapChainFormat,usage:this.swapChainTextureUsage,alphaMode:"premultiplied"})}return e.prototype.destroy=function(){},e.prototype.configureSwapChain=function(t,i){this.swapChainWidth===t&&this.swapChainHeight===i||(this.swapChainWidth=t,this.swapChainHeight=i)},e.prototype.getOnscreenTexture=function(){var t=this.canvasContext.getCurrentTexture(),i=t.createView(),r=new Ye({id:0,device:this,descriptor:{format:g.U8_RGBA_RT,width:this.swapChainWidth,height:this.swapChainHeight,depthOrArrayLayers:0,dimension:U.TEXTURE_2D,mipLevelCount:1,usage:this.swapChainTextureUsage},skipCreate:!0});return r.depthOrArrayLayers=1,r.sampleCount=1,r.gpuTexture=t,r.gpuTextureView=i,r.name="Onscreen",this.setResourceName(r,"Onscreen Texture"),r},e.prototype.getDevice=function(){return this},e.prototype.getCanvas=function(){return this.canvas},e.prototype.beginFrame=function(){},e.prototype.endFrame=function(){},e.prototype.getNextUniqueId=function(){return++this._resourceUniqueId},e.prototype.createBuffer=function(t){return new Lr({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createTexture=function(t){return new Ye({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createSampler=function(t){return new an({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createRenderTarget=function(t){var i=new Ye({id:this.getNextUniqueId(),device:this,descriptor:V(V({},t),{dimension:U.TEXTURE_2D,mipLevelCount:1,depthOrArrayLayers:1,usage:ie.RENDER_TARGET}),sampleCount:t.sampleCount});return i.depthOrArrayLayers=1,i.type=b.RenderTarget,i},e.prototype.createRenderTargetFromTexture=function(t){var i=t,r=i.format,a=i.width,n=i.height,o=i.depthOrArrayLayers,s=i.sampleCount,u=i.mipLevelCount,l=i.gpuTexture,c=i.gpuTextureView,_=i.usage;z(!!(_&Y.RENDER_ATTACHMENT));var E=new Ye({id:this.getNextUniqueId(),device:this,descriptor:{format:r,width:a,height:n,depthOrArrayLayers:o,dimension:U.TEXTURE_2D,mipLevelCount:u,usage:_},skipCreate:!0});return E.depthOrArrayLayers=o,E.sampleCount=s,E.gpuTexture=l,E.gpuTextureView=c,E},e.prototype.createProgram=function(t){var i,r;return!((i=t.vertex)===null||i===void 0)&&i.glsl&&(t.vertex.glsl=wt(this.queryVendorInfo(),"vert",t.vertex.glsl)),!((r=t.fragment)===null||r===void 0)&&r.glsl&&(t.fragment.glsl=wt(this.queryVendorInfo(),"frag",t.fragment.glsl)),new Yt({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createProgramSimple=function(t){return new Yt({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createTextureShared=function(t,i,r){var a={width:t.width,height:t.height,depthOrArrayLayers:t.depthOrArrayLayers},n=t.mipLevelCount,o=Ct(t.format),s=Br(t.dimension),u=Ir(t.usage);if(i.gpuTextureformat=o,i.dimension=t.dimension,i.format=t.format,i.width=t.width,i.height=t.height,i.depthOrArrayLayers=t.depthOrArrayLayers,i.mipLevelCount=n,i.usage=u,i.sampleCount=t.sampleCount,!r){var l=this.device.createTexture({size:a,mipLevelCount:n,format:o,dimension:s,sampleCount:t.sampleCount,usage:u}),c=l.createView();i.gpuTexture=l,i.gpuTextureView=c}},e.prototype.getFallbackSampler=function(t){var i=t.formatKind;return i===Z.Depth&&t.comparison?this.fallbackSamplerComparison:this.fallbackSamplerFiltering},e.prototype.getFallbackTexture=function(t){var i=t.dimension,r=t.formatKind;if(i===U.TEXTURE_2D)return r===Z.Depth?this.fallbackTexture2DDepth:this.fallbackTexture2D;if(i===U.TEXTURE_2D_ARRAY)return this.fallbackTexture2DArray;if(i===U.TEXTURE_3D)return this.fallbackTexture3D;if(i===U.TEXTURE_CUBE_MAP)return this.fallbackTextureCube;throw new Error("whoops")},e.prototype.createFallbackTexture=function(t,i){var r=t===U.TEXTURE_CUBE_MAP?6:1,a=i===Z.Float?g.U8_RGBA_NORM:g.D24;return this.createTexture({dimension:t,format:a,usage:ie.SAMPLED,width:1,height:1,depthOrArrayLayers:r,mipLevelCount:1})},e.prototype.createBindings=function(t){return new Zr({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createInputLayout=function(t){return new Gr({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createComputePipeline=function(t){return new Jr({id:this.getNextUniqueId(),device:this,descriptor:t})},e.prototype.createRenderPipeline=function(t){return new nn({id:this.getNextUniqueId(),device:this,descriptor:V({},t)})},e.prototype.createQueryPool=function(t,i){return new en({id:this.getNextUniqueId(),device:this,descriptor:{type:t,elemCount:i}})},e.prototype.createRenderPipelineInternal=function(t,i){var r;if(t.gpuRenderPipeline===null){var a=t.descriptor,n=a.program,o=n.vertexStage,s=n.fragmentStage;if(!(o===null||s===null)){var u=a.megaStateDescriptor||{},l=u.stencilBack,c=u.stencilFront,_=yi(u,["stencilBack","stencilFront"]),E=St(at);a.megaStateDescriptor=V(V(V({},E),{stencilBack:V(V({},E.stencilBack),l),stencilFront:V(V({},E.stencilFront),c)}),_);var d=a.megaStateDescriptor.attachmentsState[0];a.colorAttachmentFormats.forEach(function(I,y){a.megaStateDescriptor.attachmentsState[y]||(a.megaStateDescriptor.attachmentsState[y]=ri(void 0,d))});var h=wr((r=a.topology)!==null&&r!==void 0?r:J.TRIANGLES,a.megaStateDescriptor),m=Wr(a.colorAttachmentFormats,a.megaStateDescriptor),R=kr(a.depthStencilAttachmentFormat,a.megaStateDescriptor),A=void 0;a.inputLayout!==null&&(A=a.inputLayout.buffers);var p=a.sampleCount,S={layout:"auto",vertex:V(V({},o),{buffers:A}),primitive:h,depthStencil:R,multisample:{count:p},fragment:V(V({},s),{targets:m})};t.gpuRenderPipeline=this.device.createRenderPipeline(S)}}},e.prototype.createReadback=function(){return new tn({id:this.getNextUniqueId(),device:this})},e.prototype.createRenderPass=function(t){var i=this.renderPassPool.pop();return i===void 0&&(i=new rn(this)),i.commandEncoder=this.device.createCommandEncoder(),i.beginRenderPass(t),i},e.prototype.createComputePass=function(){var t=this.computePassPool.pop();return t===void 0&&(t=new Qr),t.commandEncoder=this.device.createCommandEncoder(),t.beginComputePass(),t},e.prototype.submitPass=function(t){var i=this.device.queue,r=t,a=r.finish();i.submit([a]),r.commandEncoder=null},e.prototype.copySubTexture2D=function(t,i,r,a,n,o,s){var u=this.device.createCommandEncoder(),l=t,c=a,_={texture:c.gpuTexture,origin:[n,o,0],mipLevel:0,aspect:"all"},E={texture:l.gpuTexture,origin:[i,r,0],mipLevel:0,aspect:"all"};z(!!(c.usage&Y.COPY_SRC)),z(!!(l.usage&Y.COPY_DST)),u.copyTextureToTexture(_,E,[c.width,c.height,s||1]),this.device.queue.submit([u.finish()])},e.prototype.queryLimits=function(){return{uniformBufferMaxPageWordSize:this.device.limits.maxUniformBufferBindingSize>>>2,uniformBufferWordAlignment:this.device.limits.minUniformBufferOffsetAlignment>>>2,supportedSampleCounts:[1],occlusionQueriesRecommended:!0,computeShadersSupported:!0}},e.prototype.queryTextureFormatSupported=function(t,i,r){if($r(t)){if(!this.featureTextureCompressionBC)return!1;var a=qr(t);return i%a!==0||r%a!==0?!1:this.featureTextureCompressionBC}switch(t){case g.U16_RGBA_NORM:return!1;case g.F32_RGBA:return!1}return!0},e.prototype.queryPlatformAvailable=function(){return!0},e.prototype.queryVendorInfo=function(){return this},e.prototype.queryRenderPass=function(t){var i=t;return i.descriptor},e.prototype.queryRenderTarget=function(t){var i=t;return i},e.prototype.setResourceName=function(t,i){if(t.name=i,t.type===b.Buffer){var r=t;r.gpuBuffer.label=i}else if(t.type===b.Texture){var r=t;r.gpuTexture.label=i,r.gpuTextureView.label=i}else if(t.type===b.RenderTarget){var r=t;r.gpuTexture.label=i,r.gpuTextureView.label=i}else if(t.type===b.Sampler){var r=t;r.gpuSampler.label=i}else if(t.type===b.RenderPipeline){var r=t;r.gpuRenderPipeline!==null&&(r.gpuRenderPipeline.label=i)}},e.prototype.setResourceLeakCheck=function(t,i){},e.prototype.checkForLeaks=function(){},e.prototype.programPatched=function(t){},e.prototype.pipelineQueryReady=function(t){var i=t;return i.gpuRenderPipeline!==null},e.prototype.pipelineForceReady=function(t){var i=t;this.createRenderPipelineInternal(i,!1)},e}(),sn=function(){function e(t){this.pluginOptions=t}return e.prototype.createSwapChain=function(t){return Ue(this,void 0,void 0,function(){var i,r,a,n,o,s,u,l;return ye(this,function(c){switch(c.label){case 0:if(globalThis.navigator.gpu===void 0)return[2,null];i=null,c.label=1;case 1:return c.trys.push([1,3,,4]),r=this.pluginOptions.xrCompatible,[4,globalThis.navigator.gpu.requestAdapter({xrCompatible:r})];case 2:return i=c.sent(),[3,4];case 3:return a=c.sent(),console.log(a),[3,4];case 4:return i===null?[2,null]:(n=["depth32float-stencil8","texture-compression-bc"],o=n.filter(function(_){return i.features.has(_)}),[4,i.requestDevice({requiredFeatures:o})]);case 5:if(s=c.sent(),s&&(u=this.pluginOptions.onContextLost,s.lost.then(function(){u&&u()})),s===null)return[2,null];if(l=t.getContext("webgpu"),!l)return[2,null];c.label=6;case 6:return c.trys.push([6,8,,9]),[4,oi(this.pluginOptions.shaderCompilerPath)];case 7:return c.sent(),[3,9];case 8:return c.sent(),[3,9];case 9:return[2,new on(i,s,t,l,Sr,We&&new We)]}})})},e}();function pe(e,t){return e.WGSLComposer.wgsl_compile(si+t)}function ln(e,t){return`#define ${e} ${t}`}function re(e,t,i){const r=e.WGSLComposer,a=Object.keys(i||{}).map(n=>ln(n,"")).join(`
`)+`
`;return Object.keys(t).forEach(n=>{t[n].wgsl=si+t[n].wgsl,t[n].defines&&(t[n].wgsl=a+t[n].wgsl),t[n].wgsl=r.wgsl_compile(t[n].wgsl)}),e.createProgram(t)}const si=`
  alias int = i32;
  alias uint = u32;
  alias float = f32;
  alias int2 = vec2<i32>;
  alias int3 = vec3<i32>;
  alias int4 = vec4<i32>;
  alias uint2 = vec2<u32>;
  alias uint3 = vec3<u32>;
  alias uint4 = vec4<u32>;
  alias float2 = vec2<f32>;
  alias float3 = vec3<f32>;
  alias float4 = vec4<f32>;
  alias bool2 = vec2<bool>;
  alias bool3 = vec3<bool>;
  alias bool4 = vec4<bool>;
  alias float2x2 = mat2x2<f32>;
  alias float2x3 = mat2x3<f32>;
  alias float2x4 = mat2x4<f32>;
  alias float3x2 = mat3x2<f32>;
  alias float3x3 = mat3x3<f32>;
  alias float3x4 = mat3x4<f32>;
  alias float4x2 = mat4x2<f32>;
  alias float4x3 = mat4x3<f32>;
  alias float4x4 = mat4x4<f32>;
  `,un=`
  #define_import_path prelude
  
  struct Time {
    frame: u32,
    elapsed : f32
  }

  struct Mouse { 
    pos: uint2, 
    click: int
  }
  
  @group(0) @binding(0) var<uniform> time : Time;
  @group(0) @binding(1) var<uniform> mouse: Mouse;
  @group(1) @binding(0) var pass_in: texture_2d_array<f32>;
  @group(1) @binding(1) var bilinear: sampler;
  @group(3) @binding(0) var screen : texture_storage_2d<rgba16float, write>;
  @group(3) @binding(1) var pass_out: texture_storage_2d_array<rgba16float,write>;
  
  fn passStore(pass_index: int, coord: int2, value: float4) {
    textureStore(pass_out, coord, pass_index, value);
  }
  
  fn passLoad(pass_index: int, coord: int2, lod: int) -> float4 {
    return textureLoad(pass_in, coord, pass_index, lod);
  }
  
  fn passSampleLevelBilinearRepeat(pass_index: int, uv: float2, lod: float) -> float4 {
    return textureSampleLevel(pass_in, bilinear, fract(uv), pass_index, lod);
  }
  `;function cn(e,t){const i=e.createSampler({addressModeU:$.CLAMP_TO_EDGE,addressModeV:$.CLAMP_TO_EDGE,minFilter:F.BILINEAR,magFilter:F.BILINEAR,mipmapFilter:W.LINEAR}),r=e.createProgram({vertex:{entryPoint:"fullscreen_vertex_shader",wgsl:`
  struct FullscreenVertexOutput {
    @builtin(position)
    position: vec4<f32>,
    @location(0)
    uv: vec2<f32>,
  };
  
  // This vertex shader produces the following, when drawn using indices 0..3:
  //
  //  1 |  0-----x.....2
  //  0 |  |  s  |  . ´
  // -1 |  x_____x´
  // -2 |  :  .´
  // -3 |  1´
  //    +---------------
  //      -1  0  1  2  3
  //
  // The axes are clip-space x and y. The region marked s is the visible region.
  // The digits in the corners of the right-angled triangle are the vertex
  // indices.
  //
  // The top-left has UV 0,0, the bottom-left has 0,2, and the top-right has 2,0.
  // This means that the UV gets interpolated to 1,1 at the bottom-right corner
  // of the clip-space rectangle that is at 1,-1 in clip space.
  @vertex
  fn fullscreen_vertex_shader(@builtin(vertex_index) vertex_index: u32) -> FullscreenVertexOutput {
    // See the explanation above for how this works
    let uv = vec2<f32>(f32(vertex_index >> 1u), f32(vertex_index & 1u)) * 2.0;
    let clip_position = vec4<f32>(uv * vec2<f32>(2.0, -2.0) + vec2<f32>(-1.0, 1.0), 0.0, 1.0);
  
    return FullscreenVertexOutput(clip_position, uv);
  }
  `},fragment:{entryPoint:"fs_main_linear_to_srgb",wgsl:`
  struct FullscreenVertexOutput {
    @builtin(position)
    position: vec4<f32>,
    @location(0)
    uv: vec2<f32>,
  };
  
  @group(1) @binding(0) var in_texture : texture_2d<f32>;
  @group(1) @binding(1) var in_sampler : sampler;
  
  fn srgb_to_linear(rgb: vec3<f32>) -> vec3<f32> {
    return select(
        pow((rgb + 0.055) * (1.0 / 1.055), vec3<f32>(2.4)),
        rgb * (1.0/12.92),
        rgb <= vec3<f32>(0.04045));
  }
  
  fn linear_to_srgb(rgb: vec3<f32>) -> vec3<f32> {
    return select(
        1.055 * pow(rgb, vec3(1.0 / 2.4)) - 0.055,
        rgb * 12.92,
        rgb <= vec3<f32>(0.0031308));
  }
      
  @fragment
  fn fs_main(in: FullscreenVertexOutput) -> @location(0) vec4<f32> {
      return textureSample(in_texture, in_sampler, in.uv);
  }
  
  @fragment
  fn fs_main_linear_to_srgb(in: FullscreenVertexOutput) -> @location(0) vec4<f32> {
      let rgba = textureSample(in_texture, in_sampler, in.uv);
      return vec4<f32>(linear_to_srgb(rgba.rgb), rgba.a);
  }
  
  @fragment
  fn fs_main_rgbe_to_linear(in: FullscreenVertexOutput) -> @location(0) vec4<f32> {
      let rgbe = textureSample(in_texture, in_sampler, in.uv);
      return vec4<f32>(rgbe.rgb * exp2(rgbe.a * 255. - 128.), 1.);
  }
  `}}),a=e.createRenderPipeline({inputLayout:null,program:r,colorAttachmentFormats:[g.U8_RGBA_RT]}),n=e.createBindings({pipeline:a,samplerBindings:[{texture:t,sampler:i}]});return{pipeline:a,bindings:n}}const _n=`
#define_import_path math

const PI = 3.14159265;
const TWO_PI = 6.28318530718;

var<private> state : uint4;

fn pcg4d(a: uint4) -> uint4 {
  var v = a * 1664525u + 1013904223u;
  v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
  v = v ^  ( v >> uint4(16u) );
  v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
  return v;
}

fn rand4() -> float4 {
  state = pcg4d(state);
  return float4(state)/float(0xffffffffu); 
}

fn nrand4(sigma: float, mean: float4) -> float4 {
  let Z = rand4();
  return mean + sigma * sqrt(-2.0 * log(Z.xxyy)) * 
          float4(cos(TWO_PI * Z.z),sin(TWO_PI * Z.z),cos(TWO_PI * Z.w),sin(TWO_PI * Z.w));
}

fn disk(r: float2) -> float2 {
  return vec2(sin(TWO_PI*r.x), cos(TWO_PI*r.x))*(r.y);
}

fn sqr(x: float) -> float {
  return x*x;
}

fn diag(a: float4) -> float4x4 {
  return float4x4(
      a.x,0.0,0.0,0.0,
      0.0,a.y,0.0,0.0,
      0.0,0.0,a.z,0.0,
      0.0,0.0,0.0,a.w
  );
}

fn rand4s(seed: uint4) -> float4 { 
  return float4(pcg4d(seed))/float(0xffffffffu); 
}
  `,En=`
#define_import_path camera

struct Camera {
  pos: float3,
  cam: float3x3,
  fov: float,
  size: float2
}

var<private> camera : Camera;

fn GetCameraMatrix(ang: float2) -> float3x3 {
  let x_dir = float3(cos(ang.x)*sin(ang.y), cos(ang.y), sin(ang.x)*sin(ang.y));
  let y_dir = normalize(cross(x_dir, float3(0.0,1.0,0.0)));
  let z_dir = normalize(cross(y_dir, x_dir));
  return float3x3(-x_dir, y_dir, z_dir);
}

//project to clip space
fn Project(cam: Camera, p: float3) -> float3 {
  let td = distance(cam.pos, p);
  let dir = (p - cam.pos)/td;
  let screen = dir*cam.cam;
  return float3(screen.yz*cam.size.y/(cam.fov*screen.x) + 0.5*cam.size,screen.x*td);
}
`,li=`
#define_import_path particle

#import prelude::{pass_in, pass_out};
#import camera::{Project, camera};

struct Particle {
  position: float4,
  velocity: float4,
}

@group(2) @binding(0) var<storage, read_write> atomic_storage : array<atomic<i32>>;

fn AdditiveBlend(color: float3, depth: float, index: int) {
  let scaledColor = 256.0 * color/depth;

  atomicAdd(&atomic_storage[index*4+0], int(scaledColor.x));
  atomicAdd(&atomic_storage[index*4+1], int(scaledColor.y));
  atomicAdd(&atomic_storage[index*4+2], int(scaledColor.z));
}

fn RasterizePoint(pos: float3, color: float3) {
  let screen_size = int2(camera.size);
  let projectedPos = Project(camera, pos);
  let screenCoord = int2(projectedPos.xy);
  
  //outside of our view
  if (screenCoord.x < 0 || screenCoord.x >= screen_size.x || 
      screenCoord.y < 0 || screenCoord.y >= screen_size.y || projectedPos.z < 0.0)
  {
      return;
  }

  let idx = screenCoord.x + screen_size.x * screenCoord.y;
  
  AdditiveBlend(color, projectedPos.z, idx);
}
  
fn LoadParticle(pix: int2) -> Particle {
  var p: Particle;
  p.position = textureLoad(pass_in, pix, 0, 0); 
  p.velocity = textureLoad(pass_in, pix, 1, 0);
  return p;
}

fn SaveParticle(pix: int2, p: Particle) {
  textureStore(pass_out, pix, 0, p.position); 
  textureStore(pass_out, pix, 1, p.velocity); 
}
  `;function dn(e,t,i){return(e-t)/(i-t)}function de(e,t,i,r,a){const n=dn(e,t,i),o=a-r;return r+n*o}function ct(e){return e.reduce(function(i,r){return i+r})/e.length}function Kt(e){return e.reduce(function(t,i){return Math.max(t,i)})}class It{constructor(t){this.shaderCompilerPath=t,this.resized=!1,this.inited=!1}registerShaderModule(){}async init(t){this.$canvas=t;const r=await new sn({shaderCompilerPath:this.shaderCompilerPath}).createSwapChain(t);r.configureSwapChain(t.width,t.height);const a=r.getDevice();this.device=a,this.swapChain=r;const n=a.createTexture({format:g.F16_RGBA,width:t.width,height:t.height,dimension:U.TEXTURE_2D,usage:ie.STORAGE});this.screen=n;const{pipeline:o,bindings:s}=cn(a,n);pe(a,un),pe(a,_n),pe(a,En);const u=a.createRenderTarget({format:g.U8_RGBA_RT,width:t.width,height:t.height}),l=a.createBuffer({viewOrSize:2*Float32Array.BYTES_PER_ELEMENT,usage:D.UNIFORM});l.setSubData(0,new Uint8Array(new Float32Array([0,0]).buffer));const c=a.createBuffer({viewOrSize:4*Float32Array.BYTES_PER_ELEMENT,usage:D.UNIFORM});c.setSubData(0,new Uint8Array(new Float32Array([0,0,0]).buffer)),this.timeBuffer=l,this.mouseBuffer=c,this.blitPipeline=o,this.blitBindings=s,this.renderTarget=u,this.registerShaderModule(),this.inited=!0}resize(t,i){this.resized=!0}update(t){}compute(t){}frame(t,i,r,a){if(!this.inited)return;const{device:n,swapChain:o,timeBuffer:s,mouseBuffer:u,$canvas:l,blitPipeline:c,blitBindings:_}=this;this.resized&&(o.configureSwapChain(l.width,l.height),this.renderTarget&&(this.renderTarget.destroy(),this.renderTarget=n.createRenderTarget({format:g.U8_RGBA_RT,width:l.width,height:l.height}),this.resized=!1));const E=a.slice(0,a.length/2-1),d=a.slice(a.length/2-1,a.length-1),h=ct(a),m=Kt(E),R=ct(E),A=Kt(d),p=ct(d),S=m/E.length,I=R/E.length,y=A/d.length,P=p/d.length;s.setSubData(0,new Uint8Array(new Float32Array([t,i]).buffer)),u.setSubData(0,new Uint8Array(new Uint32Array([r.pos.x,r.pos.y,r.click]).buffer)),this.compute({lowerMaxFr:S,lowerAvgFr:I,upperMaxFr:y,upperAvgFr:P,overallAvg:h});const O=o.getOnscreenTexture(),B=n.createRenderPass({colorAttachment:[this.renderTarget],colorResolveTo:[O],colorClearColor:[Yi]});B.setPipeline(c),B.setBindings(_),B.setViewport(0,0,l.width,l.height),B.draw(3),n.submitPass(B)}destroy(){this.screen.destroy(),this.renderTarget.destroy(),this.timeBuffer.destroy(),this.mouseBuffer.destroy(),this.blitPipeline.destroy(),this.device.destroy()}}class Rn extends It{constructor(t,i={}){super(t),this.options={radius:6,sinea:1,sineb:1,speed:.885,blur:0,samples:.001,mode:0,...i}}registerShaderModule(){const{device:t,screen:i,$canvas:r}=this;pe(t,`
#define_import_path custom

struct Custom {
  Radius: f32,
  Sinea: f32,
  Sineb: f32,
  Speed: f32,
  Blur: f32,
  Samples: f32,
  Mode: f32
}
@group(0) @binding(2) var<uniform> custom: Custom;
  `);const n=`
#import prelude::{screen, time, mouse};
#import math::{PI, TWO_PI, nrand4, state};
#import camera::{Camera, camera, GetCameraMatrix, Project};
#import custom::{custom};

  @group(2) @binding(0) var<storage, read_write> atomic_storage : array<atomic<i32>>;

  //Check Uniforms
  //Mode 0 - additive blending (atomicAdd)
  //Mode 1 - closest sample (atomicMax)

  const MaxSamples = 64.0;
  const FOV = 1.2;

  const DEPTH_MIN = 0.2;
  const DEPTH_MAX = 5.0;
  const DEPTH_BITS = 16u;

  fn SetCamera(ang: float2, fov: float)
  {
      camera.fov = fov;
      camera.cam = GetCameraMatrix(ang);
      camera.pos = - (camera.cam*float3(3.0*custom.Radius+0.5,0.0,0.0));
      camera.size = float2(textureDimensions(screen));
  }

  @compute @workgroup_size(16, 16)
  fn Clear(@builtin(global_invocation_id) id: uint3) {
      let screen_size = int2(textureDimensions(screen));
      let idx0 = int(id.x) + int(screen_size.x * int(id.y));

      atomicStore(&atomic_storage[idx0*4+0], 0);
      atomicStore(&atomic_storage[idx0*4+1], 0);
      atomicStore(&atomic_storage[idx0*4+2], 0);
      atomicStore(&atomic_storage[idx0*4+3], 0);
  }

  fn Pack(a: uint, b: uint) -> int
  {
      return int(a + (b << (31u - DEPTH_BITS)));
  }

  fn Unpack(a: int) -> float
  {
      let mask = (1 << (DEPTH_BITS - 1u)) - 1;
      return float(a & mask)/256.0;
  }

  fn ClosestPoint(color: float3, depth: float, index: int)
  {
      let inverseDepth = 1.0/depth;
      let scaledDepth = (inverseDepth - 1.0/DEPTH_MAX)/(1.0/DEPTH_MIN - 1.0/DEPTH_MAX);

      if(scaledDepth > 1.0 || scaledDepth < 0.0)
      {
          return;
      }

      let uintDepth = uint(scaledDepth*float((1u << DEPTH_BITS) - 1u));
      let uintColor = uint3(color * 256.0);

      atomicMax(&atomic_storage[index*4+0], Pack(uintColor.x, uintDepth));
      atomicMax(&atomic_storage[index*4+1], Pack(uintColor.y, uintDepth));
      atomicMax(&atomic_storage[index*4+2], Pack(uintColor.z, uintDepth));
  }

  fn AdditiveBlend(color: float3, depth: float, index: int)
  {
      let scaledColor = 256.0 * color/depth;

      atomicAdd(&atomic_storage[index*4+0], int(scaledColor.x));
      atomicAdd(&atomic_storage[index*4+1], int(scaledColor.y));
      atomicAdd(&atomic_storage[index*4+2], int(scaledColor.z));
  }

  fn RasterizePoint(pos: float3, color: float3)
  {
      let screen_size = int2(camera.size);
      let projectedPos = Project(camera, pos);
      let screenCoord = int2(projectedPos.xy);

      //outside of our view
      if(screenCoord.x < 0 || screenCoord.x >= screen_size.x ||
          screenCoord.y < 0 || screenCoord.y >= screen_size.y || projectedPos.z < 0.0)
      {
          return;
      }

      let idx = screenCoord.x + screen_size.x * screenCoord.y;

      if(custom.Mode < 0.5)
      {
          AdditiveBlend(color, projectedPos.z, idx);
      }
      else
      {
          ClosestPoint(color, projectedPos.z, idx);
      }
  }

  @compute @workgroup_size(16, 16)
  fn Rasterize(@builtin(global_invocation_id) id: uint3) {
      // Viewport resolution (in pixels)
      let screen_size = int2(textureDimensions(screen));
      let screen_size_f = float2(screen_size);

      let ang = float2(mouse.pos.xy)*float2(-TWO_PI, PI)/screen_size_f + float2(0.4, 0.4);

      SetCamera(ang, FOV);

      //RNG state
      state = uint4(id.x, id.y, id.z, 0u*time.frame);

      for(var i: i32 = 0; i < int(custom.Samples*MaxSamples + 1.0); i++)
      {
          let rand = nrand4(1.0, float4(0.0));
          var pos = 0.2*rand.xyz;
          let col = float3(0.5 + 0.5*sin(10.0*pos));

          let sec = 5.0+custom.Speed*time.elapsed;
          //move points along sines
          pos += sin(float3(2.0,1.0,1.5)*sec)*0.1*sin(30.0*custom.Sinea*pos);
          pos += sin(float3(2.0,1.0,1.5)*sec)*0.02*sin(30.0*custom.Sineb*pos.zxy);

          RasterizePoint(pos, col);
      }
  }

fn Sample(pos: int2) -> float3 {
  let screen_size = int2(textureDimensions(screen));
  let idx = pos.x + screen_size.x * pos.y;

  var color: float3;
  if (custom.Mode < 0.5) {
    let x = float(atomicLoad(&atomic_storage[idx*4+0]))/(256.0);
    let y = float(atomicLoad(&atomic_storage[idx*4+1]))/(256.0);
    let z = float(atomicLoad(&atomic_storage[idx*4+2]))/(256.0);

    color = tanh(0.1*float3(x,y,z)/(custom.Samples*MaxSamples + 1.0));
  } else {
    let x = Unpack(atomicLoad(&atomic_storage[idx*4+0]));
    let y = Unpack(atomicLoad(&atomic_storage[idx*4+1]));
    let z = Unpack(atomicLoad(&atomic_storage[idx*4+2]));

    color = float3(x,y,z);
  }

  return abs(color);
}

@compute @workgroup_size(16, 16)
fn main_image(@builtin(global_invocation_id) id: uint3) {
  let screen_size = uint2(textureDimensions(screen));

  // Prevent overdraw for workgroups on the edge of the viewport
  if (id.x >= screen_size.x || id.y >= screen_size.y) { return; }

  let color = float4(Sample(int2(id.xy)),1.0);

  // Output to screen (linear colour space)
  textureStore(screen, int2(id.xy), color);
}
`,o=re(t,{compute:{entryPoint:"Clear",wgsl:n}}),s=re(t,{compute:{entryPoint:"Rasterize",wgsl:n}}),u=re(t,{compute:{entryPoint:"main_image",wgsl:n}}),l=t.createBuffer({viewOrSize:7*Float32Array.BYTES_PER_ELEMENT,usage:D.UNIFORM}),c=t.createBuffer({viewOrSize:r.width*r.height*4*Float32Array.BYTES_PER_ELEMENT,usage:D.STORAGE}),_=t.createComputePipeline({inputLayout:null,program:o}),E=t.createComputePipeline({inputLayout:null,program:s}),d=t.createComputePipeline({inputLayout:null,program:u}),h=t.createBindings({pipeline:_,storageBufferBindings:[{buffer:c}],storageTextureBindings:[{texture:i}]}),m=t.createBindings({pipeline:E,uniformBufferBindings:[{buffer:this.timeBuffer},{buffer:this.mouseBuffer},{buffer:l}],storageBufferBindings:[{buffer:c}],storageTextureBindings:[{texture:i}]}),R=t.createBindings({pipeline:d,uniformBufferBindings:[{binding:2,buffer:l}],storageBufferBindings:[{buffer:c}],storageTextureBindings:[{texture:i}]});this.customUniformBuffer=l,this.clearPipeline=_,this.clearBindings=h,this.rasterizePipeline=E,this.rasterizeBindings=m,this.mainImagePipeline=d,this.mainImageBindings=R}compute({overallAvg:t,upperAvgFr:i,lowerAvgFr:r}){const{options:a,customUniformBuffer:n,device:o,$canvas:s,clearPipeline:u,clearBindings:l,rasterizePipeline:c,rasterizeBindings:_,mainImagePipeline:E,mainImageBindings:d}=this;n.setSubData(0,new Uint8Array(new Float32Array([de(t,0,1,.5,4)/4e3*a.radius,de(i,0,1,.5,4)/3*a.sinea,de(r,0,1,.5,4)/3*a.sineb,a.speed,a.blur,a.samples,a.mode]).buffer));const h=Math.ceil(s.width/16),m=Math.ceil(s.height/16),R=o.createComputePass();R.setPipeline(u),R.setBindings(l),R.dispatchWorkgroups(h,m),R.setPipeline(c),R.setBindings(_),R.dispatchWorkgroups(h,m),R.setPipeline(E),R.setBindings(d),R.dispatchWorkgroups(h,m),o.submitPass(R)}update(t){this.options={...this.options,...t}}destroy(){this.customUniformBuffer.destroy(),this.clearPipeline.destroy(),this.rasterizePipeline.destroy(),this.mainImagePipeline.destroy(),super.destroy()}}class fn extends It{constructor(t,i={}){super(t),this.options={radius:2.27,blurRadius:.053,samples:.115,speed:.885,animatedNoise:1,accumulation:.962,exposure:.779,blurExponentA:1,blurExponentB:1,velocityDecay:.017,timeStep:.373,...i}}registerShaderModule(){const{device:t,screen:i,$canvas:r}=this;pe(t,`
#define_import_path custom

struct Custom {
  Radius: f32,
  TimeStep: f32,
  Samples: f32,
  BlurRadius: f32,
  VelocityDecay: f32,
  Speed: f32,
  BlurExponentA: f32,
  BlurExponentB: f32,
  AnimatedNoise: f32,
  Accumulation: f32,
  Exposure: f32,
}

@group(0) @binding(2) var<uniform> custom: Custom;
  `),pe(t,li);const n=`
#import prelude::{screen, time, mouse, pass_in, pass_out};
#import math::{PI, TWO_PI, state, rand4, nrand4, disk};
#import camera::{Camera, GetCameraMatrix, Project, camera};
#import particle::{Particle, LoadParticle, SaveParticle, RasterizePoint, atomic_storage};
#import custom::{Custom, custom};

const MaxSamples = 256.0;
const FOV = 0.8;

//sqrt of particle count
const PARTICLE_COUNT = 160;

const DEPTH_MIN = 0.2;
const DEPTH_MAX = 5.0;
const DEPTH_BITS = 16u;

var<private> bokehRad : float;

fn SetCamera(ang: float2, fov: float) {
  camera.fov = fov;
  camera.cam = GetCameraMatrix(ang); 
  camera.pos = - (camera.cam * float3(15.0 * custom.Radius + 0.5, 0.0, 0.0));
  camera.size = float2(textureDimensions(screen));
}

fn ForceField(pos: float3, t: float) -> float4 {
  let a0 = float3(sin(t), cos(0.4 * t), cos(t));
  let d = distance(pos, a0);
  let F = (a0 - pos) * (1.0 / (d*d*d + 1e-3) - 0.4 / (d*d*d*d + 1e-3)) + 1e-3;
  return 0.2*float4(F, 0.0);
}

@compute @workgroup_size(16, 16)
fn SimulateParticles(@builtin(global_invocation_id) id: uint3) {
  var pix = int2(id.xy);
  var p = LoadParticle(pix);

  if (pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) {   
    return;
  }
  
  state = uint4(id.x, id.y, id.z, time.frame);
  
  if(time.frame == 0u) {
    let rng = rand4();
    p.position = float4(2.0*rng.xyz - 1.0, 0.0);
    p.velocity = float4(0.0,0.0,0.0,0.0);
  }
  let t = fract(custom.Speed*float(time.frame)/800.0)*30.0;

  if (mouse.click == 1) {
    return;
  }

  if (t < 0.05) {
    p.velocity -= 0.5 * p.velocity * length(p.velocity);
  }
    
  let dt = custom.Speed * custom.TimeStep;
  p.velocity += (ForceField(p.position.xyz, t) - custom.VelocityDecay * p.velocity) * dt;
  p.position += p.velocity * dt;

  SaveParticle(pix, p);
}

@compute @workgroup_size(16, 16)
fn Clear(@builtin(global_invocation_id) id: uint3) {
  let screen_size = int2(textureDimensions(screen));
  let idx0 = int(id.x) + int(screen_size.x * int(id.y));

  atomicStore(&atomic_storage[idx0*4+0], 0);
  atomicStore(&atomic_storage[idx0*4+1], 0);
  atomicStore(&atomic_storage[idx0*4+2], 0);
  atomicStore(&atomic_storage[idx0*4+3], 0);
}

@compute @workgroup_size(16, 16)
fn Rasterize(@builtin(global_invocation_id) id: uint3) {
  // Viewport resolution (in pixels)
  let screen_size = int2(textureDimensions(screen));
  let screen_size_f = float2(screen_size);
  
  let ang = float2(mouse.pos.xy)*float2(-TWO_PI, PI)/screen_size_f + 1e-4;
  
  SetCamera(ang, FOV);

  //RNG state
  state = uint4(id.x, id.y, id.z, 0u);
  
  let rng = rand4();
  bokehRad = pow(rng.x, custom.BlurExponentA);

  if (mouse.click == 1 && custom.AnimatedNoise > 0.5) {
    state.w = time.frame;
  }

  var pix = int2(id.xy);

  if (pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) {   
    return;
  }

  var p = LoadParticle(pix);

  var pos = p.position.xyz;
  var col = 5.5*abs(p.velocity.xyz)*dot(p.velocity,p.velocity)+0.1;
  col /= (0.1+bokehRad);
  let impSample = (col.x + col.y + col.z)*bokehRad;
  let sampleCount = clamp(int(impSample*custom.Samples*MaxSamples + 1.0), 1, 1024);
  let normalCount = int(custom.Samples*MaxSamples + 1.0);

  col *= float(normalCount)/float(sampleCount);

  for(var i = 0; i < sampleCount; i++) {
    let R = 2.0*custom.BlurRadius*bokehRad;
    let rng = rand4();
    let dpos = R*normalize(nrand4(1.0, float4(0.0)).xyz)*pow(rng.x, custom.BlurExponentB);
    RasterizePoint(pos + dpos, col);
  }
}

fn Sample(pos: int2) -> float3 {
  let screen_size = int2(textureDimensions(screen));
  let idx = pos.x + screen_size.x * pos.y;

  var color: float3;
  let x = float(atomicLoad(&atomic_storage[idx*4+0]))/(256.0);
  let y = float(atomicLoad(&atomic_storage[idx*4+1]))/(256.0);
  let z = float(atomicLoad(&atomic_storage[idx*4+2]))/(256.0);
  
  color = tanh(custom.Exposure * 0.03 * float(screen_size.x) * float3(x,y,z) 
    / (custom.Samples * MaxSamples + 1.0));

  return abs(color);
}

@compute @workgroup_size(16, 16)
fn main_image(@builtin(global_invocation_id) id: uint3) {
  let screen_size = uint2(textureDimensions(screen));

  // Prevent overdraw for workgroups on the edge of the viewport
  if (id.x >= screen_size.x || id.y >= screen_size.y) { return; }

  // Pixel coordinates (centre of pixel, origin at bottom left)
  // let fragCoord = float2(float(id.x) + .5, float(id.y) + .5);

  var color = float4(Sample(int2(id.xy)),1.0);

  let oldColor = textureLoad(pass_in, int2(id.xy), 2, 0);

  if (mouse.click == 1 && custom.AnimatedNoise > 0.5) {
    color += oldColor * custom.Accumulation;
  }
  
  // Output to buffer
  textureStore(pass_out, int2(id.xy), 2, color);

  textureStore(screen, int2(id.xy), float4(color.xyz / color.w, 1.));
}
          `,o=t.createTexture({format:g.F16_RGBA,width:r.width,height:r.height,dimension:U.TEXTURE_2D_ARRAY,depthOrArrayLayers:4,usage:ie.SAMPLED}),s=t.createTexture({format:g.F16_RGBA,width:r.width,height:r.height,dimension:U.TEXTURE_2D_ARRAY,depthOrArrayLayers:4,usage:ie.STORAGE}),u=t.createSampler({addressModeU:$.CLAMP_TO_EDGE,addressModeV:$.CLAMP_TO_EDGE,minFilter:F.BILINEAR,magFilter:F.BILINEAR,mipmapFilter:W.NO_MIP}),l=re(t,{compute:{entryPoint:"SimulateParticles",wgsl:n}}),c=re(t,{compute:{entryPoint:"Clear",wgsl:n}}),_=re(t,{compute:{entryPoint:"Rasterize",wgsl:n}}),E=re(t,{compute:{entryPoint:"main_image",wgsl:n}}),d=t.createBuffer({viewOrSize:11*Float32Array.BYTES_PER_ELEMENT,usage:D.UNIFORM}),h=t.createBuffer({viewOrSize:r.width*r.height*4*Float32Array.BYTES_PER_ELEMENT,usage:D.STORAGE}),m=t.createComputePipeline({inputLayout:null,program:l}),R=t.createComputePipeline({inputLayout:null,program:c}),A=t.createComputePipeline({inputLayout:null,program:_}),p=t.createComputePipeline({inputLayout:null,program:E}),S=t.createBindings({pipeline:m,uniformBufferBindings:[{buffer:this.timeBuffer},{buffer:this.mouseBuffer},{buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageTextureBindings:[{binding:1,texture:s}]}),I=t.createBindings({pipeline:R,storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i}]}),y=t.createBindings({pipeline:A,uniformBufferBindings:[{buffer:this.timeBuffer},{buffer:this.mouseBuffer},{buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i}]}),P=t.createBindings({pipeline:p,uniformBufferBindings:[{binding:1,buffer:this.mouseBuffer},{binding:2,buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i},{texture:s}]});this.customUniformBuffer=d,this.simulateParticlesPipeline=m,this.simulateParticlesBindings=S,this.clearPipeline=R,this.clearBindings=I,this.rasterizePipeline=A,this.rasterizeBindings=y,this.mainImagePipeline=p,this.mainImageBindings=P,this.pass_in=o,this.pass_out=s}compute({overallAvg:t,upperAvgFr:i,lowerAvgFr:r}){const{options:a,customUniformBuffer:n,device:o,$canvas:s,simulateParticlesPipeline:u,simulateParticlesBindings:l,clearPipeline:c,clearBindings:_,rasterizePipeline:E,rasterizeBindings:d,mainImagePipeline:h,mainImageBindings:m}=this;n.setSubData(0,new Uint8Array(new Float32Array([de(t,0,1,.5,4)/400*a.radius,a.timeStep,a.samples,a.blurRadius,a.velocityDecay,a.speed,de(i,0,1,.5,4)/3,de(r,0,1,.5,4)/3,a.animatedNoise,a.accumulation,a.exposure]).buffer));const R=Math.ceil(s.width/16),A=Math.ceil(s.height/16),p=o.createComputePass();p.setPipeline(u),p.setBindings(l),p.dispatchWorkgroups(R,A),p.setPipeline(c),p.setBindings(_),p.dispatchWorkgroups(R,A),p.setPipeline(E),p.setBindings(d),p.dispatchWorkgroups(R,A),p.setPipeline(h),p.setBindings(m),p.dispatchWorkgroups(R,A),o.submitPass(p),o.copySubTexture2D(this.pass_in,0,0,this.pass_out,0,0,4)}update(t){this.options={...this.options,...t}}destroy(){this.customUniformBuffer.destroy(),this.pass_in.destroy(),this.pass_out.destroy(),this.simulateParticlesPipeline.destroy(),this.clearPipeline.destroy(),this.rasterizePipeline.destroy(),this.mainImagePipeline.destroy(),super.destroy()}}class pn extends It{constructor(t,i={}){super(t),this.options={radius:3,timeStep:.039,samples:.03,animatedNoise:0,accumulation:1,exposure:.369,blurExponentA:.393,blurExponentB:.81,blurRadius:.743,kerrA:.876,kerrQ:0,initSpeed:.719,initThick:.22,steps:.387,focalPlane:.53,motionBlur:.829,gamma:.827,...i}}registerShaderModule(){const{device:t,screen:i,$canvas:r}=this;pe(t,`
  #define_import_path custom
  
  struct Custom {
    Radius: f32,
    TimeStep: f32,
    Samples: f32,
    AnimatedNoise: f32,
    Accumulation: f32,
    Exposure: f32,
    BlurExponentA: f32,
    BlurExponentB: f32,
    BlurRadius: f32,
    KerrA: f32,
    KerrQ: f32,
    InitSpeed: f32,
    InitThick: f32,
    Steps: f32,
    FocalPlane: f32,
    MotionBlur: f32,
    Gamma: f32
  }
  
  @group(0) @binding(2) var<uniform> custom: Custom;
    `),pe(t,li);const n=`
#import prelude::{screen, time, mouse, pass_in, pass_out};
#import math::{PI, TWO_PI, state, rand4, nrand4, sqr, diag, disk};
#import camera::{Camera, GetCameraMatrix, Project, camera};
#import particle::{Particle, LoadParticle, SaveParticle, RasterizePoint, atomic_storage};
#import custom::{Custom, custom};

const MaxSamples = 8.0;
const FOV = 0.8;

//sqrt of particle count
const PARTICLE_COUNT = 600;

const DEPTH_MIN = 0.2;
const DEPTH_MAX = 5.0;
const DEPTH_BITS = 16u;
const dq = float2(0.0, 1.0);
const eps = 0.01;

const KerrM = 1.0;

struct GeodesicRay
{    
    q:  float4,
    qt: float4,
    p:  float4,
}; 

var<private> bokehRad : float;

fn SetCamera(ang: float2, fov: float) {
  camera.fov = fov;
  camera.cam = GetCameraMatrix(ang); 
  camera.pos = - (camera.cam*float3(15.0*custom.Radius+0.5,0.0,0.0));
  camera.size = float2(textureDimensions(screen));
}

fn KerrGetR2(p: float3) -> float {
  let rho = dot(p,p) - sqr(custom.KerrA);
  let r2 = 0.5*(rho + sqrt(sqr(rho) + sqr(2.0*custom.KerrA*p.z)));
  return r2;
}

fn KerrGetK(p: float3) -> float4 {
  let r2 = KerrGetR2(p);
  let r = sqrt(r2);
  let invr2 = 1.0 / (r2 + sqr(custom.KerrA) + 1e-3); 
  let  k = float3((r*p.x - custom.KerrA*p.y) * invr2, (r*p.y + custom.KerrA*p.x) * invr2, p.z/(r + 1e-4));
  let f = r2 * (2.0 * KerrM * r - sqr(custom.KerrQ)) / (r2 * r2 + sqr(custom.KerrA * p.z) + 1e-3);
  return float4(k, f);
}

fn G(q: float4) -> float4x4 {
  //Kerr metric in Kerr-Schild coordinates 
  let k = KerrGetK(q.yzw);
  let kf = k.w*float4(1.0, k.xyz);
  return diag(float4(-1.0,1.0,1.0,1.0)) + float4x4(kf, k.x*kf, k.y*kf, k.z*kf);    
}

fn Ginv(q: float4) -> float4x4 {
  //inverse of Kerr metric in Kerr-Schild coordinates 
  let k = KerrGetK(q.yzw);
  let kf = k.w*vec4(1.0, -k.xyz)/dot(k.xyz, k.xyz);
  return diag(float4(-1.0,1.0,1.0,1.0)) + float4x4(-kf, k.x*kf, k.y*kf, k.z*kf); 
}

//lagrangian
fn Lmat(qt: float4, g: float4x4) -> float {
  return   g[0][0]*qt.x*qt.x + g[1][1]*qt.y*qt.y + g[2][2]*qt.z*qt.z + g[3][3]*qt.w*qt.w +
      2.0*(g[0][1]*qt.x*qt.y + g[0][2]*qt.x*qt.z + g[0][3]*qt.x*qt.w +
              g[1][2]*qt.y*qt.z + g[1][3]*qt.y*qt.w +
              g[2][3]*qt.z*qt.w);
}

fn L(qt: float4, q: float4) -> float {
  return Lmat(qt, G(q));
}

fn H(p: float4, ginv: float4x4) -> float {
  return Lmat(p, ginv);
}

fn ToMomentum(ray: GeodesicRay) -> float4 {
  return G(ray.q)*ray.qt; 
}

fn FromMomentum(ray: GeodesicRay) -> float4 {
  return Ginv(ray.q)*ray.p; 
}

fn ParticleToGeodesic(particle: Particle) -> GeodesicRay {
  var ray: GeodesicRay;
  ray.q = particle.position;
  ray.p = particle.velocity;
  return ray;
}

fn GeodesicToParticle(ray: GeodesicRay) -> Particle {
  var particle: Particle;
  particle.position = ray.q;
  particle.velocity = ray.p/length(ray.qt);
  return particle;
}

fn HamiltonianGradient(ray: GeodesicRay) -> float4 {
  let ginv = Ginv(ray.q);
  let H0 = H(ray.p, ginv);
  let delta = 0.1; 
  return (float4(
      L(ray.qt,ray.q+delta*dq.yxxx),
      L(ray.qt,ray.q+delta*dq.xyxx),
      L(ray.qt,ray.q+delta*dq.xxyx),
      L(ray.qt,ray.q+delta*dq.xxxy)) - H0)/delta;
}

fn VelClamp(vel: float4) -> float4 {
  // return vel;
  return float4(vel.x, vel.yzw / max(1.0, length(vel.yzw)));
}

@compute @workgroup_size(16, 16)
fn SimulateParticles(@builtin(global_invocation_id) id: uint3) {
  var pix = int2(id.xy);
  var p = LoadParticle(pix);

  if (pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) {   
    return;
  }
  
  state = uint4(id.x, id.y, id.z, time.frame);
  
  let r = sqrt(KerrGetR2(p.position.yzw));

  if (time.frame == 0u || r < 0.9 || r > 30.0) {
    let rng = rand4();
    let rng1 = rand4();
    p.position = 30.0*float4(1.0, 1.0, 1.0, custom.InitThick) * float4(0.0,2.0*rng.xyz - 1.0);

    let r01 = sqrt(KerrGetR2(p.position.yzw)); 
    if (r01 < 0.9) {
        return;
    }

    var vel = normalize(cross(p.position.yzw, float3(0.0,0.0,1.0)));

    vel += 0.3*(rng1.xyz * 0.5 - 0.25);
    let vscale = clamp(1.0 / (0.2 + 0.08*r01), 0., 1.0);
    p.velocity = float4(-1.0,2.0*(custom.InitSpeed - 0.5)*vel*vscale);
  }

  var ray = ParticleToGeodesic(p);

  if (mouse.click == 1) {
    return;
  }
  
  for (var i = 0; i < int(custom.Steps*16.0 + 1.0); i++) {
    ray.qt = FromMomentum(ray);
    let qt0 = ray.qt;
    let dt = 0.5 * custom.TimeStep / (abs(ray.qt.x) + 0.01);
    ray.p += HamiltonianGradient(ray)*dt;
    ray.qt = FromMomentum(ray);
    ray.q += (ray.qt+qt0)*dt;
  }

  SaveParticle(pix, GeodesicToParticle(ray));
}

@compute @workgroup_size(16, 16)
fn Clear(@builtin(global_invocation_id) id: uint3) {
  let screen_size = int2(textureDimensions(screen));
  let idx0 = int(id.x) + int(screen_size.x * int(id.y));

  atomicStore(&atomic_storage[idx0*4+0], 0);
  atomicStore(&atomic_storage[idx0*4+1], 0);
  atomicStore(&atomic_storage[idx0*4+2], 0);
  atomicStore(&atomic_storage[idx0*4+3], 0);
}

@compute @workgroup_size(16, 16)
fn Rasterize(@builtin(global_invocation_id) id: uint3) {
  // Viewport resolution (in pixels)
  let screen_size = int2(textureDimensions(screen));
  let screen_size_f = float2(screen_size);
  
  let ang = float2(mouse.pos.xy)*float2(-TWO_PI, PI)/screen_size_f + 1e-4;
  
  SetCamera(ang, FOV);

  //RNG state
  state = uint4(id.x, id.y, id.z, 0u);
  
  let rng = rand4();
  bokehRad = pow(rng.x, custom.BlurExponentA);

  if (mouse.click == 1 && custom.AnimatedNoise > 0.5) {
    state.w = time.frame;
  }

  var pix = int2(id.xy);

  if (pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) {   
    return;
  }

  var p = LoadParticle(pix);

  var pos = p.position.ywz;
  let vel = abs(p.velocity.ywz);
  var col = clamp(8.5*abs(vel)*dot(vel,vel)+0.1, float3(0.0), float3(5.0));
  col /= (0.1+bokehRad);
  let impSample = (col.x + col.y + col.z)*bokehRad;
  let sampleCount = clamp(int(impSample*custom.Samples*MaxSamples + 1.0), 1, 1024);
  let normalCount = int(custom.Samples*MaxSamples + 1.0);

  col *= float(normalCount)/float(sampleCount);

  for (var i = 0; i < sampleCount; i++) {
    let R = 2.0*custom.BlurRadius*bokehRad;
    let rng = rand4();
    let dpos = R*normalize(nrand4(1.0, float4(0.0)).xyz)*pow(rng.x, custom.BlurExponentB);
    RasterizePoint(pos + dpos, col);
  }
}

fn Sample(pos: int2) -> float3 {
  let screen_size = int2(textureDimensions(screen));
  let idx = pos.x + screen_size.x * pos.y;

  var color: float3;
      let x = float(atomicLoad(&atomic_storage[idx*4+0]))/(256.0);
      let y = float(atomicLoad(&atomic_storage[idx*4+1]))/(256.0);
      let z = float(atomicLoad(&atomic_storage[idx*4+2]))/(256.0);
      
      color = tanh(custom.Exposure*0.03*float(screen_size.x)*float3(x,y,z)/(custom.Samples*MaxSamples + 1.0));

  return abs(color);
}

@compute @workgroup_size(16, 16)
fn main_image(@builtin(global_invocation_id) id: uint3) {
  let screen_size = uint2(textureDimensions(screen));

  // Prevent overdraw for workgroups on the edge of the viewport
  if (id.x >= screen_size.x || id.y >= screen_size.y) { return; }

  // Pixel coordinates (centre of pixel, origin at bottom left)
  // let fragCoord = float2(float(id.x) + .5, float(id.y) + .5);

  var color = float4(Sample(int2(id.xy)),1.0);

  let oldColor = textureLoad(pass_in, int2(id.xy), 2, 0);

  if (mouse.click == 1 && custom.AnimatedNoise > 0.5) {
    color += oldColor * custom.Accumulation;
  }

  // Output to buffer
  textureStore(pass_out, int2(id.xy), 2, color);

  textureStore(screen, int2(id.xy), float4(color.xyz/color.w, 1.));
}
`,o=t.createTexture({format:g.F16_RGBA,width:r.width,height:r.height,dimension:U.TEXTURE_2D_ARRAY,depthOrArrayLayers:4,usage:ie.SAMPLED}),s=t.createTexture({format:g.F16_RGBA,width:r.width,height:r.height,dimension:U.TEXTURE_2D_ARRAY,depthOrArrayLayers:4,usage:ie.STORAGE}),u=t.createSampler({addressModeU:$.CLAMP_TO_EDGE,addressModeV:$.CLAMP_TO_EDGE,minFilter:F.BILINEAR,magFilter:F.BILINEAR,mipmapFilter:W.NO_MIP}),l=re(t,{compute:{entryPoint:"SimulateParticles",wgsl:n}}),c=re(t,{compute:{entryPoint:"Clear",wgsl:n}}),_=re(t,{compute:{entryPoint:"Rasterize",wgsl:n}}),E=re(t,{compute:{entryPoint:"main_image",wgsl:n}}),d=t.createBuffer({viewOrSize:17*Float32Array.BYTES_PER_ELEMENT,usage:D.UNIFORM}),h=t.createBuffer({viewOrSize:r.width*r.height*4*Float32Array.BYTES_PER_ELEMENT,usage:D.STORAGE}),m=t.createComputePipeline({inputLayout:null,program:l}),R=t.createComputePipeline({inputLayout:null,program:c}),A=t.createComputePipeline({inputLayout:null,program:_}),p=t.createComputePipeline({inputLayout:null,program:E}),S=t.createBindings({pipeline:m,uniformBufferBindings:[{buffer:this.timeBuffer},{buffer:this.mouseBuffer},{buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageTextureBindings:[{binding:1,texture:s}]}),I=t.createBindings({pipeline:R,storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i}]}),y=t.createBindings({pipeline:A,uniformBufferBindings:[{buffer:this.timeBuffer},{buffer:this.mouseBuffer},{buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i}]}),P=t.createBindings({pipeline:p,uniformBufferBindings:[{binding:1,buffer:this.mouseBuffer},{binding:2,buffer:d}],samplerBindings:[{texture:o,sampler:u,samplerBinding:-1}],storageBufferBindings:[{buffer:h}],storageTextureBindings:[{texture:i},{texture:s}]});this.customUniformBuffer=d,this.simulateParticlesPipeline=m,this.simulateParticlesBindings=S,this.clearPipeline=R,this.clearBindings=I,this.rasterizePipeline=A,this.rasterizeBindings=y,this.mainImagePipeline=p,this.mainImageBindings=P,this.pass_in=o,this.pass_out=s}compute({overallAvg:t,upperAvgFr:i,lowerAvgFr:r}){const{options:a,customUniformBuffer:n,device:o,$canvas:s,simulateParticlesPipeline:u,simulateParticlesBindings:l,clearPipeline:c,clearBindings:_,rasterizePipeline:E,rasterizeBindings:d,mainImagePipeline:h,mainImageBindings:m}=this;n.setSubData(0,new Uint8Array(new Float32Array([a.radius,a.timeStep*(de(t,0,1,.5,4)/400),a.samples,a.animatedNoise,a.accumulation,a.exposure,a.blurExponentA,a.blurExponentB,a.blurRadius,a.kerrA*de(i,0,1,.5,4),a.kerrQ*de(r,0,1,.5,4),a.initSpeed,a.initThick,a.steps,a.focalPlane,a.motionBlur,a.gamma]).buffer));const R=Math.ceil(s.width/16),A=Math.ceil(s.height/16),p=o.createComputePass();p.setPipeline(u),p.setBindings(l),p.dispatchWorkgroups(R,A),p.setPipeline(c),p.setBindings(_),p.dispatchWorkgroups(R,A),p.setPipeline(E),p.setBindings(d),p.dispatchWorkgroups(R,A),p.setPipeline(h),p.setBindings(m),p.dispatchWorkgroups(R,A),o.submitPass(p),o.copySubTexture2D(this.pass_in,0,0,this.pass_out,0,0,4)}update(t){this.options={...this.options,...t}}destroy(){this.customUniformBuffer.destroy(),this.pass_in.destroy(),this.pass_out.destroy(),this.simulateParticlesPipeline.destroy(),this.clearPipeline.destroy(),this.rasterizePipeline.destroy(),this.mainImagePipeline.destroy(),super.destroy()}}function An(e,t){const i=new URL("/glsl_wgsl_compiler_bg.wasm",self.location).href,r=new Rn(i),a=t.addFolder("effect"),n={radius:6,sinea:1,sineb:1,speed:.885,blur:0,samples:.001,mode:0};return a.add(n,"radius",0,10).onChange(o=>{e.style({radius:o})}),a.add(n,"sinea",0,1).onChange(o=>{e.style({sinea:o})}),a.add(n,"sineb",0,1).onChange(o=>{e.style({sineb:o})}),a.add(n,"speed",0,1).onChange(o=>{e.style({speed:o})}),a.add(n,"blur",0,1).onChange(o=>{e.style({blur:o})}),[r,a]}function hn(e,t){const i=new URL("/glsl_wgsl_compiler_bg.wasm",self.location).href,r=new fn(i),a=t.addFolder("effect"),n={radius:2.27,blurRadius:.053,samples:.115,speed:.885,animatedNoise:1,accumulation:.962,exposure:.779,blurExponentA:1,blurExponentB:1,velocityDecay:.017,timeStep:.373};return a.add(n,"radius",0,10).onChange(o=>{e.style({radius:o})}),a.add(n,"blurRadius",0,1).onChange(o=>{e.style({blurRadius:o})}),a.add(n,"samples",0,1).onChange(o=>{e.style({samples:o})}),a.add(n,"speed",0,1).onChange(o=>{e.style({speed:o})}),a.add(n,"animatedNoise",0,1).onChange(o=>{e.style({animatedNoise:o})}),a.add(n,"accumulation",0,1).onChange(o=>{e.style({accumulation:o})}),a.add(n,"exposure",0,1).onChange(o=>{e.style({exposure:o})}),a.add(n,"blurExponentA",0,1).onChange(o=>{e.style({blurExponentA:o})}),a.add(n,"blurExponentB",0,1).onChange(o=>{e.style({blurExponentB:o})}),a.add(n,"velocityDecay",0,1).onChange(o=>{e.style({velocityDecay:o})}),a.add(n,"timeStep",0,1).onChange(o=>{e.style({timeStep:o})}),[r,a]}function Tn(e,t){const i=new URL("/glsl_wgsl_compiler_bg.wasm",self.location).href,r=new pn(i),a=t.addFolder("effect"),n={radius:1,timeStep:.039,samples:.03,animatedNoise:0,accumulation:1,exposure:.369,blurExponentA:.393,blurExponentB:.81,blurRadius:.743,kerrA:.876,kerrQ:0,initSpeed:.719,initThick:.22,steps:.387,focalPlane:.53,motionBlur:.829,gamma:.827};return a.add(n,"radius",0,10).onChange(o=>{e.style({radius:o})}),a.add(n,"timeStep",0,1).onChange(o=>{e.style({timeStep:o})}),a.add(n,"samples",0,1).onChange(o=>{e.style({samples:o})}),a.add(n,"animatedNoise",0,1).onChange(o=>{e.style({animatedNoise:o})}),a.add(n,"accumulation",0,1).onChange(o=>{e.style({accumulation:o})}),a.add(n,"exposure",0,1).onChange(o=>{e.style({exposure:o})}),a.add(n,"blurExponentA",0,1).onChange(o=>{e.style({blurExponentA:o})}),a.add(n,"blurExponentB",0,1).onChange(o=>{e.style({blurExponentB:o})}),a.add(n,"blurRadius",0,1).onChange(o=>{e.style({blurRadius:o})}),a.add(n,"kerrA",0,1).onChange(o=>{e.style({kerrA:o})}),a.add(n,"kerrQ",0,1).onChange(o=>{e.style({kerrQ:o})}),a.add(n,"initSpeed",0,1).onChange(o=>{e.style({initSpeed:o})}),a.add(n,"initThick",0,1).onChange(o=>{e.style({initThick:o})}),a.add(n,"steps",0,1).onChange(o=>{e.style({steps:o})}),[r,a]}const ui=Object.freeze(Object.defineProperty({__proto__:null,GPUBlackHole:Tn,GPUSine:An,GPUStardust:hn},Symbol.toStringTag,{value:"Module"}));function gn(e){function t(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}document.addEventListener("keydown",i=>{i.key==="Enter"&&t()},!1),window.addEventListener("resize",()=>{})}let Te,$t,_t;const ci=document.getElementById("container"),_i=new URL(location).searchParams.get("name")||"GPUSine",Ei=e=>{history.pushState({value:e},"",`?name=${e}`),_t&&_t.destroy(),[$t,_t]=ui[e](Te,Bt),Te.effect($t)};let Bt=new mt({autoPlace:!1});const mn=Bt.addFolder("effect"),Sn={name:_i};mn.add(Sn,"name",Object.keys(ui)).onChange(Ei);ci.appendChild(Bt.domElement);const qt=document.getElementById("spinner"),Et=document.getElementById("file"),Ot=document.createElement("div");Ot.id="canvas";ci.appendChild(Ot);const ne=document.createElement("canvas");ne.width=window.innerWidth*window.devicePixelRatio;ne.height=window.innerHeight*window.devicePixelRatio;ne.style.width=`${ne.width/window.devicePixelRatio}px`;ne.style.height=`${ne.height/window.devicePixelRatio}px`;ne.style.outline="none";ne.style.padding="0px";ne.style.margin="0px";Ot.appendChild(ne);const Pt=new Mi;Pt.showPanel(0);const ot=Pt.dom;ot.style.position="absolute";ot.style.left="0px";ot.style.bottom="0px";document.body.appendChild(ot);const dt=document.getElementById("audio-block");(async()=>{qt.style.display="block",Et.setAttribute("disabled",""),Te=new Ui({canvas:ne}),Te.oninit=()=>{qt.style.display="none",Et.removeAttribute("disabled")},Te.onframe=()=>{Pt.update()},Ei(_i),Te.play(),gn();let e;Et.onchange=t=>{e&&(e==null||e.remove()),e=document.createElement("audio"),dt==null||dt.appendChild(e),e.id="audio",e.controls=!0;const i=t.target.files;e.src=URL.createObjectURL(i[0]),e.load(),e.play(),Te.data(e)}})();
