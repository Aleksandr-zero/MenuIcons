import {
	ANIMATE,
	NUMBER_FOR_DELAY_ANIMATE,
	NUMBER_MOVE_BORDER_OF_SCREEN,
	NUMBER_CHECK_BORDER_OF_SCREEN,
	REPLACE_SUBSTRINGS_ACTIVE_CLASS,

	TABLE,
	COMMON_CSS,
	GET_REQUESTED_CSS,
	SAME_VALUES_PROPERTIES,
	REMOVED_PROPERTY,
	ACTIVE_CLASSES_BUTTON,
	REPLACEMENTS_CSS,
	COMMON_JS,
} from "./constants.js";

import { matrixTransformation } from "./matrixTransformation.js";

import { changeTitleBtnCopy } from "./handlerCopy.js";


let activeClassAtBtn = false;

const stylesToBeRemoved = {};


export const createTempHtml_ForDemo = (tempBtn, typeTempCode) => {
	// Создание шаблона для демонстрации кода.

	tempBtn = hljs.highlight(tempBtn, { language: 'xml' }).value;

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempBtn);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	return newTempCodeForDemo;
};

export const retrievesTempPressedBtnOpenDemo = (pressedBtn) => {
	// Извлекает html (иконка для меню) при нажатии кнопки для показа кода.

	let currentMenuIconTemp = pressedBtn.closest('.example-item-active').querySelector(".example__item-content-wrapper-btn").cloneNode(true);

	const currentMenuIconBtn = currentMenuIconTemp.querySelector(".example__item-content-btn");

	removeLastActiveClassBtn(currentMenuIconBtn, `btn-menu-${currentMenuIconBtn.dataset.type}`, 0);

	currentMenuIconBtn.classList.remove("example__item-content-btn");
	currentMenuIconBtn.removeAttribute("data-type");

	currentMenuIconTemp = currentMenuIconTemp.innerHTML.trim();

	currentMenuIconTemp = currentMenuIconTemp.replace(/<span>/g, "\n  <span>");
	currentMenuIconTemp = currentMenuIconTemp.replace(`</span>`, "</span>\n");

	return currentMenuIconTemp;
};


const buildCss_FromTemp = ( temp, foundCss ) => {
	const keysReplacementsCSS = Object.keys(REPLACEMENTS_CSS);
	keysReplacementsCSS.forEach((keyReplaceCSS) => {
		let property = foundCss;

		const pathToProperty = REPLACEMENTS_CSS[keyReplaceCSS];
		const partsPathToProperty = pathToProperty.split(".");

		partsPathToProperty.forEach((partPath, index) => {
			property = property[partPath];
		});

		temp = temp.replace(keyReplaceCSS.trim(), property);
	});

	return temp;
};

export const createTempCss_ForDemo = (tempBtn, typeTempCode) => {
	let templActiveClass = false;

	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	const foundCss = pullsStylesBtn(
		tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn")
	);

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let blankCss = buildCss_FromTemp(COMMON_CSS, foundCss);
	blankCss = cleaningCss(blankCss);
	if ( activeClassAtBtn ) {
		templActiveClass = findCssAtActiveClassBtn(activeClassAtBtn);
		blankCss += `\n${templActiveClass}`;
	};

	let readyCss = buildReadyTemp_Hljs(blankCss, [/{{ name-btn }}/g, /\t/g], [nameBtn, "  "], "css");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyCss);

	return newTempCodeForDemo;
};

const findCssAtActiveClassBtn = (activeClassAtBtn) => {
	let templActiveClass = "";

	const styleSheets = Array.from(document.styleSheets).filter(
		(styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
	);

	for ( let style of styleSheets ) {
		if ( style instanceof CSSStyleSheet && style.cssRules ) {
			if ( style.href && style.href.split("/")[style.href.split("/").length - 1] === "style.css" ) {
				for ( let index = 0; index < style.cssRules.length; index++ ) {
					if ( style.cssRules[index].cssText.includes(activeClassAtBtn) ) {
						let readyCSS = style.cssRules[index].cssText;

						for ( let indexKey = 0; indexKey < Object.keys(REPLACE_SUBSTRINGS_ACTIVE_CLASS).length; indexKey++ ) {
							readyCSS = readyCSS.replace(
								REPLACE_SUBSTRINGS_ACTIVE_CLASS[indexKey][0], REPLACE_SUBSTRINGS_ACTIVE_CLASS[indexKey][1]
							);
						};

						templActiveClass += `${readyCSS}\n`;
					};
				};
			};
		};
	};

	return templActiveClass;
};


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyJs = buildReadyTemp_Hljs(COMMON_JS, [/{{ menu-btn-class }}/g, /\t/g], [nameBtn, "  "], "javascript");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};


export const createTempDemo_ForDemo = (temp, nameBtn) => {
	const blockItems = document.createElement("ul");
	blockItems.className = "demo-code__content-items";

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameBtn] > numberClass; numberClass++ ) {
		blockItems.insertAdjacentHTML("beforeend", `
			<li class="demo-code__content-item">
				<button type="button" data-class-btn="${nameBtn + "-"}${numberClass + 1}" class="demo-code__content-item-btn">
					Active - ${numberClass + 1}
				</button>
				<div class="demo-code__content-item-add">
					<button type="button" data-class-btn="${nameBtn + "-"}${numberClass + 1}" class="demo-code__content-item-add-btn">
						<svg height="24" fill="#FFFFFF" viewBox="0 0 16 16" width="24">
							<path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
						</svg>
					</button>
					<div class="demo-code__content-item-add-back-title">
						<h4 class="demo-code__content-item-add-title">Add class to<br>css properties</h4>
					</div>
				</div>
			</li>
		`);
	};

	const DOM_El_Temp = new DOMParser().parseFromString(temp, "text/xml");;
	DOM_El_Temp.querySelector(".demo-code__content").append(blockItems);

	return DOM_El_Temp.firstChild.innerHTML;
};

export const addEventBtns_ForDemoTemp = (btns, currentBtn) => {
	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const activeClass = event.currentTarget.dataset.classBtn;
			const nameClassBtn = `btn-menu-${currentBtn.dataset.type}`;

			const activeBtn = event.currentTarget.closest(".demo-code__content-items").querySelector(".demo-code__content-item-btn--active");
			if ( activeBtn ) {
				activeBtn.classList.remove("demo-code__content-item-btn--active");
			};

			event.currentTarget.classList.toggle("demo-code__content-item-btn--active");

			if ( currentBtn.classList.contains(activeClass) ) {
				event.currentTarget.classList.remove("demo-code__content-item-btn--active");
				currentBtn.classList.remove(activeClass);
				return;
			};

			const isActiveClasses = removeLastActiveClassBtn(currentBtn, nameClassBtn, activeClass.slice(-1));

			if ( isActiveClasses ) {
				setTimeout(() => {
					currentBtn.classList.add(activeClass);
				}, ANIMATE + NUMBER_FOR_DELAY_ANIMATE);
			} else {
				currentBtn.classList.add(activeClass);
			};
		});
	});
};

export const addEventBtns_ForDemoTemp_AddActiveCLass = (btns) => {
	/* Добавляет события на кнопки - добавление активного класса в css-свойства */

	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const activeClass = event.currentTarget.dataset.classBtn;
			activeClassAtBtn = activeClass;

			const titleHelp = event.currentTarget.closest(".demo-code__content-item-add").querySelector(".demo-code__content-item-add-title");
			changeTitleBtnCopy(titleHelp, "Active class added", titleHelp.innerHTML);
		});
	});
};

export const removeLastActiveClassBtn = (btn, nameClassBtn, currentScoreActiveClass) => {
	let isActiveClasses = 0;

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameClassBtn] > numberClass; numberClass++ ) {
		if ( currentScoreActiveClass === numberClass + 1 ) {
			continue;
		};

		if ( btn.classList.contains(`${nameClassBtn}-${numberClass + 1}`) ) {
			btn.classList.remove(`${nameClassBtn}-${numberClass + 1}`);
			isActiveClasses++;
		};
	};

	if ( isActiveClasses ) {
		return true;
	};
};

export const checkActiveClass_AtBtn = (currentBtn) => {
	/* Проверяет активный класс у наличи кнопки, в случае true добавляет в шаблон */

	let activeClassAtBtn = false;
	const classesAtCurrentBtn = currentBtn.classList;
	const nameClassBtn = `btn-menu-${currentBtn.dataset.type}`;

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameClassBtn] > numberClass; numberClass++ ) {
		if ( classesAtCurrentBtn.contains(`${nameClassBtn}-${numberClass + 1}`) ) {
			activeClassAtBtn = `${nameClassBtn}-${numberClass + 1}`;
			break;
		};
	};

	if ( activeClassAtBtn ) {
		addActiveClassBtn_AfterReCreation(currentBtn, activeClassAtBtn);
	};
};

const addActiveClassBtn_AfterReCreation = (currentBtn, activeClassAtBtn) => {
	const activeBtnAddedClass = currentBtn.closest(".example__item").querySelector(`.demo-code__content-item-btn[data-class-btn="${activeClassAtBtn}"]`);
	activeBtnAddedClass.classList.add("demo-code__content-item-btn--active");
};

export const addEventBtn_DeleteCssProperties = (btnDelete) => {
	btnDelete.addEventListener("click", () => {
		activeClassAtBtn = false;

		const titleHelp = btnDelete.closest(".demo-code__container-back-delete-wrapper").querySelector(".demo-code__content-item-add-title");
		changeTitleBtnCopy(titleHelp, "CSS properties cleared", titleHelp.innerHTML);
	});
};


function buildReadyTemp_Hljs(baseTemp, regArr, regReplaceArr, languageHljs) {
	let readyTemp = baseTemp.replace(regArr[0], regReplaceArr[0]);
	readyTemp = readyTemp.replace(regArr[1], regReplaceArr[1]);
	readyTemp = hljs.highlight(readyTemp, { language: languageHljs }).value;

	return readyTemp;
};

export function checksIfBlockIsOutOfWindow(block) {
	const widthWindow = window.innerWidth;
	const widtnBody = document.querySelector("body").clientWidth
	const widthWindow_WithScroll = document.documentElement.scrollWidth;
	const widthWindow_Browser = widthWindow_WithScroll - (widthWindow_WithScroll - widtnBody);

	const styleBlock = block.getBoundingClientRect();

	if ( styleBlock.x + styleBlock.width + NUMBER_CHECK_BORDER_OF_SCREEN >= widthWindow_Browser ) {
		const positionLeft_ToExitWindow = (widthWindow_WithScroll - widthWindow) + widthWindow - widtnBody;
		block.closest(".demo-code").style.left = `-${positionLeft_ToExitWindow + NUMBER_MOVE_BORDER_OF_SCREEN}px`;

	} else if ( styleBlock.x <= NUMBER_CHECK_BORDER_OF_SCREEN ) {
		block.closest(".demo-code").style.right = `-${Math.abs(styleBlock.x) + NUMBER_MOVE_BORDER_OF_SCREEN}px`;
	}
};


const pullsStylesBtn_Span_PseudoElements = (el) => {
	/* Находит стили псевдо-элементов у элемента span  */

	const foundCss = {
		"before_after": {},
		"before": {},
		"after": {}
	};

	for ( let property in GET_REQUESTED_CSS.span_before ) {
		foundCss["before"][property] = getComputedStyle(el, ":before").getPropertyValue(GET_REQUESTED_CSS.span_before[property]);

		if ( property === "transform" && foundCss["before"]["transform"] !== "none" ) {
			foundCss["before"]["transform"] = matrixTransformation(foundCss["before"]["transform"]);
		};
	};

	for ( let property in GET_REQUESTED_CSS.span_after ) {
		foundCss["after"][property] = getComputedStyle(el, ":after").getPropertyValue(GET_REQUESTED_CSS.span_after[property]);

		if ( property === "transform" && foundCss["after"]["transform"] !== "none" ) {
			foundCss["after"]["transform"] = matrixTransformation(foundCss["after"]["transform"]);
		};
	};

	for ( let property in GET_REQUESTED_CSS.span_bef_af ) {
		foundCss["before_after"][property] = getComputedStyle(el, ":before").getPropertyValue(GET_REQUESTED_CSS.span_bef_af[property]);
	};

	return foundCss;
};

const pullsStylesBtn_Span = (el) => {
	/* Находит стили у элемента span  */

	const foundCss = {};

	foundCss[GET_REQUESTED_CSS.span.width] = getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.width);
	foundCss[GET_REQUESTED_CSS.span.height] = getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.height);

	if ( parseInt(getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.height)) <= 0 ) {
		stylesToBeRemoved["height"] = true;
	};

	return foundCss;
};

function pullsStylesBtn(btn) {
	/* Находит все стили кнопки (по обьекту "GET_REQUESTED_CSS") и возвращает обьект.  */

	let foundCss = {
		"span": {},
		"before_after": {},
		"span_before": {},
		"span_after": {}
	};

	const span = btn.querySelector("span");
	const cssSpanPseudoElements = pullsStylesBtn_Span_PseudoElements(span);

	foundCss[GET_REQUESTED_CSS.padding] = getComputedStyle(btn).getPropertyValue(GET_REQUESTED_CSS.padding);
	foundCss["span"] = pullsStylesBtn_Span(span);
	foundCss["span_before"] = cssSpanPseudoElements.before;
	foundCss["span_after"] = cssSpanPseudoElements.after;
	foundCss["before_after"] = cssSpanPseudoElements.before_after;

	foundCss = checkSameValuesForProperties(foundCss);
	foundCss = removesEmptyProperties(foundCss);

	return foundCss;
};


function checkSameValuesForProperties(foundCss) {
	const propertiesSpan = Object.keys(foundCss.span);

	for ( const property in foundCss.before_after ) {
		if ( SAME_VALUES_PROPERTIES.includes(property) ) {
			const propertyValue_span = parseFloat(foundCss.span[property]);
			const propertyValue_pseudo = parseFloat(foundCss.before_after[property]);

			if ( propertyValue_span === propertyValue_pseudo ) {
				foundCss.before_after[property] = "100%";
			} else {
				const percent = Math.round(propertyValue_pseudo / (propertyValue_span / 100));

				if ( !isFinite(percent) ) {
					continue;
				};

				foundCss.before_after[property] = `${percent}%`;
			};
		};
	};

	return foundCss;
};

function removesEmptyProperties(foundCss) {

	const checkProperty = (obj) => {
		for ( const property in obj ) {
			if ( REMOVED_PROPERTY.includes(property) && obj[property] === "none" ) {
				delete obj[property];
				stylesToBeRemoved["transform"] = true;
			};
		};
	};

	checkProperty(foundCss.span_after);
	checkProperty(foundCss.span_before);

	return foundCss;
};

function cleaningCss(blankCss) {
	const propertyCss = Object.keys(stylesToBeRemoved);

	propertyCss.forEach((property) => {
		if ( stylesToBeRemoved[property] ) {
			blankCss = blankCss.replaceAll(`\t${property}: 0px;\n`, "");
			blankCss = blankCss.replaceAll(`\t${property}: undefined;\n`, "");
		};

		delete stylesToBeRemoved[property];
	});

	return blankCss;
};
