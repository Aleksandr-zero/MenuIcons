import {
	TABLE,
	ACTIVE_CLASS_AT_BTN,
	PSEUDO_CLASSES,
	PSEUDO_ELEMENTS,
	ACTIVE_CLASSES_BUTTON,
	PREFIX_ACTIVE_CLASS
} from "../constants.js";

import { setColor } from "../handler/color.js";
import { setAnimation } from "../handler/animation.js";
import { setBtn } from "../handler/btn.js";

import { buildReadyTemp_Hljs } from "../utils/index.js";
import { findCss } from "../utils/css.js";


export function createTempScss_ForDemo(tempBtn, typeTempCode) {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];
	let rawCssArr = findCss(nameBtn, true);
	let foundCssSelectors = findCssSelectors(nameBtn);
	const rawTableScss = createTableScss(foundCssSelectors, nameBtn);
	const cleanData = cleanTableScssRawCssArrCssSelectors(rawTableScss, rawCssArr, foundCssSelectors, nameBtn);
	const tableScss = cleanData.table;
	rawCssArr = cleanData.rawCssArr;
	foundCssSelectors = cleanData.foundCssSelectors;

	let tempScss = buildTempScss(rawCssArr, foundCssSelectors, tableScss);
	tempScss = setColor(tempScss);
	tempScss = setAnimation(tempScss);
	tempScss = setBtn(nameBtn, tempScss);
	tempScss = buildReadyTemp_Hljs(tempScss, [/{{ name-btn }}/g, /\t/g], [nameBtn, "  "], "scss");

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempScss);

	return newTempCodeForDemo;
};

const findCssSelectors = (nameBtn) => {
	let cssSelectors = findCss(nameBtn, ACTIVE_CLASS_AT_BTN);

	for ( let cssSel = 0; cssSel < cssSelectors.length; cssSel++ ) {
		const cssSelector = cssSelectors[cssSel];
		let str = '';

		for ( let i = 0; i < cssSelector.length; i++ ) {
			const char = cssSelector[i];
			if ( char !== "{" ) str += char
			else {
				cssSelectors[cssSel] = str.trim();
				str = '';
				break;
			};
		};
	};

	return cssSelectors;
};

const createTableScss = (cssSelectors, nameBtn) => {
	const tableScss = [];
	const objUnpacking = {};

	for ( let indexSel = 0; indexSel < cssSelectors.length; indexSel++ ) {
		const cssSelector = cssSelectors[indexSel];
		const splitCssSelector = cssSelector.split(/\s/g);

		tableScss[indexSel] = splitCssSelector;
		objUnpacking[indexSel] = {};

		for ( let i = 0; i < tableScss[indexSel].length; i++ ) {
			const el = tableScss[indexSel][i];
			objUnpacking[indexSel][i] = el.split(":");
		};

		tableScss[indexSel] = [];

		const values = Object.values(objUnpacking[indexSel]);
		values.forEach((value) => {
			tableScss[indexSel].push(...value.filter(Boolean));
		});
		tableScss[indexSel] = [...new Set(tableScss[indexSel])];

		if ( ACTIVE_CLASS_AT_BTN ) {
			const reg = new RegExp(nameBtn, "g");
			tableScss[indexSel] = tableScss[indexSel].join(" ").split(".").join(" ").replace(reg, `.${nameBtn}`).trim().split(" ")
		};

		for ( let i = 0; i < tableScss[indexSel].length; i++ ) {
			const element = tableScss[indexSel][i];
			if ( element.search(/,+/) !== -1 ) {
				const repeatElement = tableScss[indexSel][i + 1];
				tableScss[indexSel][i] += ` ${repeatElement}`;

				tableScss[indexSel].splice(i + 1, 1);
			};
		};
	};

	return tableScss;
};

const buildTempScss = (rawCssArr, foundCssSelectors, tableScss) => {
	const objCountIndex = {};
	const arrTabSize = [];
	const tableIndices = [];
	const foundCss = findsCss(rawCssArr, foundCssSelectors);

	let rawScss = '';
	let lastIndexSelectorArr; // number

	for ( let i = 0; i < tableScss.length; i++ ) {
		const table = tableScss[i];

		for ( let j = 0; j < table.length; j++ ) {
			let selector = table[j];

			if ( tableScss[i - 1] && ( tableScss[i - 1][j] && tableScss[i - 1][j] === table[j] ) ) {
				continue;
			} else {
				const tabMultiplier = "\t".repeat(j);
				arrTabSize.push(j);

				rawScss += `\n\n${tabMultiplier}${selector} {\n{{ ${i} }}`;

				if ( typeof lastIndexSelectorArr === "number" ) {
					const lastOneStepsIndexSelectorArr = tableIndices[tableIndices.length - 2];

					if ( j === lastIndexSelectorArr || ( j > lastIndexSelectorArr && j > lastOneStepsIndexSelectorArr ) ) {
						rawScss += `\n${tabMultiplier}}`;
					};
					if ( j < lastIndexSelectorArr ) {
						const reg = new RegExp(`${selector}`, "g");
						if ( Boolean(ACTIVE_CLASS_AT_BTN) && selector[0] === "." ) {
							rawScss = rawScss.replace(reg, `}\n${tabMultiplier}&${selector}`);
							rawScss = rawScss.replace(/-\d+/g, PREFIX_ACTIVE_CLASS);
						} else {
							rawScss = rawScss.replace(reg, `}\n${tabMultiplier}${selector}`);
						};

						// rawScss = rawScss.replace(reg, `}\n${tabMultiplier}${selector}`);
					};
				};

				if ( !objCountIndex[i] ) {
					objCountIndex[i] = [];
					objCountIndex[i].push(i);
				} else {
					objCountIndex[i].push(i);
				};
				tableIndices.push(j);
				lastIndexSelectorArr = j;
			};
		};
	};

	rawScss = setPseudoClassesElements(rawScss);
	let readyScss = insertFoundCss(rawScss, objCountIndex, foundCss, arrTabSize);
	readyScss = readyScss.replace(/\n\n\n/g, "\n\n");
	readyScss = closeTempHooks(readyScss, tableIndices[tableIndices.length - 1]);

	return readyScss.trim();
};

const findsCss = (rawCssArr, foundCssSelectors) => {
	const foundCss = [];

	foundCssSelectors.forEach((cssSelector, index) => {
		let rawCssSelector = rawCssArr[index];
		if ( rawCssSelector ) {
			rawCssSelector = rawCssSelector.replace(cssSelector, "");
			rawCssSelector = rawCssSelector.replace(/\s+[{]+\s/g, "");
			rawCssSelector = rawCssSelector.replace(/\s[}]+/g, "");

			foundCss.push(rawCssSelector);
		};
	});

	return foundCss;
};

const insertFoundCss = (scss, objCountIndex, foundCss, arrTabSize) => {
	const values = Object.values(objCountIndex);
	values.forEach((value, valIndex) => {
		const reg = new RegExp(`{{ ${value[0]} }}`);
		const arrLength = value.length;
		let cssText = foundCss[value[0]];

		if ( arrLength === 1 ) {
			cssText = createCssText(cssText, arrTabSize, valIndex);

			scss = scss.replace(reg, cssText);
		} else {
			let deletedTabSizes = 0;
			value.forEach((element, index) => {
				if ( index !== arrLength - 1 ) {
					scss = scss.replace(reg, "");
					deletedTabSizes++;
				} else {
					arrTabSize.splice(valIndex, deletedTabSizes);
					cssText = createCssText(cssText, arrTabSize, valIndex);

					scss = scss.replace(reg, cssText);
				};
			});
		};
	});

	return scss;
};

const createCssText = (cssText, arrTabSize, valIndex) => {
	const tabMultiplier = "\t".repeat(arrTabSize[valIndex] + 1);
	cssText = cssText.replace(/;\s+/g, `;\n${tabMultiplier}`);
	cssText = `${tabMultiplier}${cssText}`;

	return cssText;
};

const closeTempHooks = (scss, countHook) => {
	const arrTabSize = []
	for( countHook; countHook >= 0; countHook-- ) arrTabSize.push(countHook);
	arrTabSize.splice(arrTabSize.length - 1, 1);

	arrTabSize.forEach((tabSize) => {
		const tabMultiplier = "\t".repeat(tabSize - 1);
		scss += `\n${tabMultiplier}}`;
	});

	return scss;
};


const setPseudoClassesElements = (css) => {
	PSEUDO_CLASSES.forEach((_class) => {
		const regClass = new RegExp(`${_class}`, "g");
		css = css.replace(regClass, `&:${_class}`);
	});
	PSEUDO_ELEMENTS.forEach((element) => {
		const regElement = new RegExp(`${element}`, "g");
		css = css.replace(regElement, `&::${element}`);
	});

	return css;
};


const cleanTableScssRawCssArrCssSelectors = (tableScss, rawCssArr, foundCssSelectors, nameBtn) => {
	if ( !ACTIVE_CLASS_AT_BTN ) return {
		"table": tableScss,
		"rawCssArr": rawCssArr,
		"foundCssSelectors": foundCssSelectors,
	};

	let lengthTableScss = tableScss.length;

	for ( let i = 0; i < lengthTableScss; i++ ) {
		for ( let j = 1; j < ACTIVE_CLASSES_BUTTON[nameBtn] + 1; j++ ) {
			const currentActiveClass = `.${nameBtn}-${j}`;
			if ( tableScss[i].includes(currentActiveClass) && !tableScss[i].includes(`.${ACTIVE_CLASS_AT_BTN}`) ) {
				tableScss.splice(i, 1);
				rawCssArr.splice(i, 1);
				foundCssSelectors.splice(i, 1);
				lengthTableScss--;
				i--;
			};
		};
	};

	return {
		"table": tableScss,
		"rawCssArr": rawCssArr,
		"foundCssSelectors": foundCssSelectors,
	};
};
