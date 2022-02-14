var factory;factory=function(){"use strict";var e='\n<div class="demo-code {{ code-type }}">\n\t<div class="demo-code__container">\n\t\t<div class="demo-code__content">\n\t\t\t{{ demo-code-type }}\n\t\t</div>\n\t\t<div class="demo-code__container-back-btn copy">\n\t\t\t<div class="demo-code__container-back-btn-wrapper">\n\t\t\t\t<h4 class="demo-code__container-back-btn-title">Copy</h4>\n\t\t\t\t<button type="button" class="demo-code__container-btn-copy">\n\t\t\t\t\t<svg fill="#ffffff" height="20" viewBox="0 0 16 16" width="20">\n\t\t\t\t\t\t<path d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>\n\t\t\t\t\t</svg>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n',t="\n\t".concat(e.replace(/{{ demo-code-type }}/,'\n<pre>\n\t<code class="language-html language">\n{{ demo-code }}\n\t</code>\n</pre>\n'),"\n"),n="\n\t".concat(e.replace(/{{ demo-code-type }}/,'\n<pre>\n\t<code class="language-css language">\n{{ demo-code }}\n\t</code>\n</pre>\n'),"\n"),c="\n\t".concat(e.replace(/{{ demo-code-type }}/,'\n<pre>\n\t<code class="language-javascript language">\n{{ demo-code }}\n\t</code>\n</pre>\n'),"\n"),o="\n\t".concat('\n<div class="wrapper-demo-code">\n\t<div class="demo-code code-demo demo-code--classes">\n\t\t<div class="demo-code__container">\n\t\t\t<div class="demo-code__container-back-delete">\n\t\t\t\t<div class="demo-code__container-back-delete-wrapper">\n\t\t\t\t\t<button type="button" class="demo-code__container-delete">\n\t\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="18" height="18" viewBox="0 0 24 24">\n\t\t\t\t\t\t\t<path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class="demo-code__content-item-add-back-title">\n\t\t\t\t\t\t<h4 class="demo-code__content-item-add-title">Clear CSS properties</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="demo-code__content">\n\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n',"\n");function setSettings(e){var t=e.dataset.setSettings,n=e.value.trim();localStorage.setItem(t,n),function updateSettings(e,t){r[e]=t}(t,n)}var r=function getSettingsUser(){var e={};return e.color=localStorage.getItem("color"),e.color_sets=localStorage.getItem("color_sets"),e}(),a={0:[/;\s/g,";\n\t"],1:[/{\s/g,"{\n\t"],2:[/\t}/g,"}\n"],3:[/after,\s/g,"after,\n"]},s={html:"".concat(t),css:"".concat(n),js:"".concat(c),demo:"".concat(o)},i={"btn-menu-hamburger":2,"btn-menu-veggie_burger":2,"btn-menu-hotdog":2,"btn-menu-fries":2,"btn-menu-strawberry":2,"btn-menu-stairs":2,"btn-menu-cheeseburger":2,"btn-menu-candy_box":3,"btn-menu-kebab":1,"btn-menu-meatballs":1,"btn-menu-chocolate":3,"btn-menu-cake":2},l='\nconst menuBtn = document.querySelector(".{{ menu-btn-class }}");\n\nmenuBtn.addEventListener("click", () => {\n\tmenuBtn.classList.toggle("{{ menu-btn-class }}--active");\n});\n'.trim();function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,c=new Array(t);n<t;n++)c[n]=e[n];return c}function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var c=0,F=function(){};return{s:F,n:function(){return c>=e.length?{done:1}:{done:0,value:e[c++]}},e:function(e){throw e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=1,a=0;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){a=1,o=e},f:function(){try{r||null==n.return||n.return()}finally{if(a)throw o}}}}var d=function changeTitleBtnCopy(e,t,n){e.innerHTML=t,setTimeout((function(){e.innerHTML=n}),1500)},u=function copyToClipboard(e){var t=e.currentTarget.closest(".demo-code__container").querySelector(".language"),n=e.currentTarget.closest(".demo-code__container-back-btn-wrapper").querySelector("h4");d(n,"Copied",n.innerHTML);var c=document.createElement("textarea");c.textContent=t.textContent.trim(),document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c)},m=new RegExp(/rgb[(]\d{1,3},\s\d{1,3},\s\d{1,3}[)]/,"g");function setColor(e){var t=r.color,n=e.match(/rgb[(](\d{1,3},\s\d{1,3},\s\d{1,3})[)]/)[1];if("color_sets"in r)"hex"===t?e=e.replace(m,function setCharToHex(e){return"#"!==e[0]&&(e="#".concat(e)),e}(r.color_sets)):"hsl"===t?e=e.replace(m,"hsl(".concat(r.color_sets,")")):"rgb"===t&&(e=e.replace(m,"rgb(".concat(r.color_sets,")")));else if("hex"===t){var c=function rgbToHex(e){return"#"+e.match(/[0-9|.]+/g).map((function(e,t){return 3===t?parseInt(255*parseFloat(e)).toString(16):parseInt(e).toString(16)})).join("")}(n);e=e.replace(m,c)}else if("hsl"===t){var o=n.split(","),a=function rgbToHsl(e,t,n){var c=Math.max(e,t,n),o=c-Math.min(e,t,n),r=1-Math.abs(c+c-o-1),a=o&&(c==e?(t-n)/o:c==t?2+(n-e)/o:4+(e-t)/o);return"hsl(".concat(60*(a<0?a+6:a),", ").concat(r?o/r:0,", ").concat((c+c-o)/2,")")}(o[0],o[1],o[2]);e=e.replace(m,a)}return e}var v="",f=function createTempHtml_ForDemo(e,t){e=hljs.highlight(e,{language:"xml"}).value;var n=s[t];return n=(n=n.replace(/{{ demo-code }}/,e)).replace(/{{ code-type }}/,"code-".concat(t))},p=function createTempCss_ForDemo(e,t){var n=e.closest(".example-item-active").querySelector(".example__item-content-btn").classList[1],c=g(n);c=setColor(c);var o=s[t];o=o.replace(/{{ code-type }}/,"code-".concat(t));var r=buildReadyTemp_Hljs(c,[/{{ name-btn }}/g,/\t/g],[n,"  "],"css");return o=o.replace(/{{ demo-code }}/,r)},g=function cssBuild(e){var t,n="",c=_createForOfIteratorHelper(Array.from(document.styleSheets).filter((function(e){return!e.href||e.href.startsWith(window.location.origin)})));try{for(c.s();!(t=c.n()).done;){var o=t.value;if(o instanceof CSSStyleSheet&&o.cssRules&&o.href&&"style.css"===o.href.split("/")[o.href.split("/").length-1])for(var r=0;r<o.cssRules.length;r++)if(o.cssRules[r].cssText.includes(e)){var s=o.cssRules[r].cssText;if(_(s,e))continue;for(var i=0;i<Object.keys(a).length;i++)s=s.replace(a[i][0],a[i][1]);n+="".concat(s,"\n")}}}catch(e){c.e(e)}finally{c.f()}return v&&(n+=v),n.trim()},_=function is_ActiveClass_AtCss(e,t){for(var n=1;n<i[t]+1;n++)if(e.includes("".concat(t,"-").concat(n)))return 1},h=function chengeSelectorActiveClass(e){return e=e.replace(/[a-z](-[1-9])/g,"--active")},y=function createTempJs_ForDemo(e,t){var n=e.closest(".example-item-active").querySelector(".example__item-content-btn").classList[1],c=s[t];c=c.replace(/{{ code-type }}/,"code-".concat(t));var o=buildReadyTemp_Hljs(l,[/{{ menu-btn-class }}/g,/\t/g],[n,"  "],"javascript");return c=c.replace(/{{ demo-code }}/,o)},b=function addEventBtns_ForDemoTemp_AddActiveCLass(e){e.forEach((function(e){e.addEventListener("click",(function(e){var t=e.currentTarget.dataset.classBtn;v=function findCssAtActiveClassBtn(e){var t,n="",c=_createForOfIteratorHelper(Array.from(document.styleSheets).filter((function(e){return!e.href||e.href.startsWith(window.location.origin)})));try{for(c.s();!(t=c.n()).done;){var o=t.value;if(o instanceof CSSStyleSheet&&o.cssRules&&o.href&&"style.css"===o.href.split("/")[o.href.split("/").length-1])for(var r=0;r<o.cssRules.length;r++)if(o.cssRules[r].cssText.includes(e)){for(var s=o.cssRules[r].cssText,i=0;i<Object.keys(a).length;i++)s=s.replace(a[i][0],a[i][1]);n+="".concat(s,"\n")}}}catch(e){c.e(e)}finally{c.f()}return(n=h(n)).trim()}(t);var n=e.currentTarget.closest(".demo-code__content-item-add").querySelector(".demo-code__content-item-add-title");d(n,"Active class added",n.innerHTML)}))}))},S=function removeLastActiveClassBtn(e,t,n){for(var c=0,o=0;i[t]>o;o++)n!==o+1&&e.classList.contains("".concat(t,"-").concat(o+1))&&(e.classList.remove("".concat(t,"-").concat(o+1)),c++);if(c)return 1},T=function addActiveClassBtn_AfterReCreation(e,t){e.closest(".example__item").querySelector('.demo-code__content-item-btn[data-class-btn="'.concat(t,'"]')).classList.add("demo-code__content-item-btn--active")};function buildReadyTemp_Hljs(e,t,n,c){var o=e.replace(t[0],n[0]);return o=o.replace(t[1],n[1]),o=hljs.highlight(o,{language:c}).value}function checksIfBlockIsOutOfWindow(e){var t=document.querySelector("body").clientWidth,n=document.documentElement.scrollWidth,c=n-(n-t),o=e.getBoundingClientRect();if(o.x+o.width+10>=c){var r=o.x+o.width+10-c;e.closest(".demo-code").style.left="-".concat(r+50,"px")}else o.x<=10&&(e.closest(".demo-code").style.right="-".concat(Math.abs(o.x)+50,"px"))}function cleanValuesAtClosing(){v=""}hljs.highlightAll(),function setCheckedInputRadioSettings(){document.querySelectorAll(".input_radio-settings").forEach((function(e){e.value===r.color&&(e.checked=1)}))}(),function setValurInputTextSettings(){document.querySelectorAll(".input_text-settings").forEach((function(e){e.dataset.setSettings in r&&(e.value=r.color_sets)}))}();var x=document.querySelector(".example"),L=x.querySelector(".example__items"),A=document.querySelector(".open-menu-temp");function createBaseTemp(e,t,n,c){var o=e(t,n);c.insertAdjacentHTML("beforeend","\n\t\t".concat(o,"\n\t\t").trim())}var q=function showsCodeForDemo(e){var t=e.currentTarget.dataset.typeCode,n=e.currentTarget.closest(".example-item-active");if(n.querySelector(".code-".concat(t)))return n.querySelector(".code-".concat(t)).remove(),void L.classList.remove("example-items-active");if(n.querySelector(".demo-code")&&n.querySelector(".demo-code").remove(),"html"===t)createBaseTemp(f,function retrievesTempPressedBtnOpenDemo(e){var t=e.closest(".example-item-active").querySelector(".example__item-content-wrapper-btn").cloneNode(1),n=t.querySelector(".example__item-content-btn");S(n,"btn-menu-".concat(n.dataset.type),0),n.classList.remove("example__item-content-btn"),n.removeAttribute("data-type"),t=t.innerHTML.trim();var c=new RegExp("</span>","g");return(t=t.replace(/<span>/g,"\n  <span>")).replace(c,"</span>\n")}(e.currentTarget),t,n),checksIfBlockIsOutOfWindow(n.querySelector(".language-html"));else if("css"===t)createBaseTemp(p,e.currentTarget,t,n),checksIfBlockIsOutOfWindow(n.querySelector(".language-css"));else if("js"===t)createBaseTemp(y,e.currentTarget,t,n),checksIfBlockIsOutOfWindow(n.querySelector(".language-javascript"));else if("demo"===t){var c=e.currentTarget.closest(".example__item").querySelector(".example__item-content-btn"),o=function createTempDemo_ForDemo(e,t){var n=document.createElement("ul");n.className="demo-code__content-items";for(var c=0;i[t]>c;c++)n.insertAdjacentHTML("beforeend",'\n\t\t\t<li class="demo-code__content-item">\n\t\t\t\t<button type="button" data-class-btn="'.concat(t+"-").concat(c+1,'" class="demo-code__content-item-btn">\n\t\t\t\t\tActive - ').concat(c+1,'\n\t\t\t\t</button>\n\t\t\t\t<div class="demo-code__content-item-add">\n\t\t\t\t\t<button type="button" data-class-btn="').concat(t+"-").concat(c+1,'" class="demo-code__content-item-add-btn">\n\t\t\t\t\t\t<svg height="24" fill="#FFFFFF" viewBox="0 0 16 16" width="24">\n\t\t\t\t\t\t<path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class="demo-code__content-item-add-back-title">\n\t\t\t\t\t\t<h4 class="demo-code__content-item-add-title">Add class to<br>css properties</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t'));var o=(new DOMParser).parseFromString(e,"text/xml");return o.querySelector(".demo-code__content").append(n),o.firstChild.innerHTML}(s[t],c.classList[1]);n.insertAdjacentHTML("beforeend","\n\t\t\t".concat(o,"\n\t\t\t").trim()),checksIfBlockIsOutOfWindow(n.querySelector(".demo-code--classes")),function addEventBtns_ForDemoTemp(e,t){e.forEach((function(e){e.addEventListener("click",(function(e){var n=e.currentTarget.dataset.classBtn,c="btn-menu-".concat(t.dataset.type),o=e.currentTarget.closest(".demo-code__content-items").querySelector(".demo-code__content-item-btn--active");if(o&&o.classList.remove("demo-code__content-item-btn--active"),e.currentTarget.classList.toggle("demo-code__content-item-btn--active"),t.classList.contains(n))return e.currentTarget.classList.remove("demo-code__content-item-btn--active"),void t.classList.remove(n);S(t,c,n.slice(-1))?setTimeout((function(){t.classList.add(n)}),350):t.classList.add(n)}))}))}(n.querySelectorAll(".demo-code__content-item-btn"),c),b(n.querySelectorAll(".demo-code__content-item-add-btn")),function addEventBtn_DeleteCssProperties(e){e.addEventListener("click",(function(){cleanValuesAtClosing();var t=e.closest(".demo-code__container-back-delete-wrapper").querySelector(".demo-code__content-item-add-title");d(t,"CSS properties cleared",t.innerHTML)}))}(n.querySelector(".demo-code__container-delete")),function checkActiveClass_AtBtn(e){for(var t=0,n=e.classList,c="btn-menu-".concat(e.dataset.type),o=0;i[c]>o;o++)if(n.contains("".concat(c,"-").concat(o+1))){t="".concat(c,"-").concat(o+1);break}t&&T(e,t)}(c)}"demo"!==t&&function addEvent_CopyText(e){e.addEventListener("click",u)}(n.querySelector(".demo-code__container-btn-copy")),L.classList.add("example-items-active")},C=function closeMenuDemo(){var e=x.querySelector(".example-item-active");if(e){!function closeCodeForDemo(e){L.classList.remove("example-items-active");var t=e.querySelector(".demo-code");t&&t.remove(),cleanValuesAtClosing()}(e),e.classList.remove("example-item-active"),e.querySelector(".open-menu").remove();var t=e.querySelector(".example__item-content-btn");S(t,"btn-menu-".concat(t.dataset.type),0)}},k=function openMenuDemo(e){C(),e.append(A.content.cloneNode(1)),e.classList.add("example-item-active");var t=e.querySelector(".open-menu");!function changeTempOpenMenu(e){e.classList.add("open-menu-disable"),setTimeout((function(){e.classList.remove("open-menu-disable"),e.classList.add("open-menu-active")}))}(t),function addEventClickShowCode(e){e.querySelectorAll(".open-menu__content-item-btn").forEach((function(e){e.addEventListener("click",q)}))}(t)},w=function changeMenuDemo(e){var t=e.currentTarget.closest(".example__item");t.classList.contains("example-item-active")?C():k(t)};document.querySelectorAll(".example__item").forEach((function(e){e.querySelector(".example__item-content-btn").addEventListener("click",w)}));var E=document.querySelector(".btn-settings"),B=document.querySelector(".settings");E.addEventListener("click",(function(){B.classList.toggle("settings--active")}));var I=document.querySelectorAll(".input_radio-settings"),H=document.querySelectorAll(".input_text-settings");!function addEventInputRadio(e){e.forEach((function(e){e.addEventListener("input",(function(e){setSettings(e.currentTarget)}))}))}(I),function addEventInputText(e){e.forEach((function(e){e.addEventListener("focusout",(function(e){setSettings(e.currentTarget)}))}))}(H)},"function"==typeof define&&define.amd?define(factory):factory();
