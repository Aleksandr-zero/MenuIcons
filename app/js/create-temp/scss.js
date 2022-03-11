import {
	TABLE,
	ACTIVE_CLASS_AT_BTN
} from "../constants.js";

import { setColor } from "../handler/color.js";
import { setAnimation } from "../handler/animation.js";

import { buildReadyTemp_Hljs } from "../utils/index.js";
import { findCss } from "../utils/css.js";


export function createTempScss_ForDemo(tempBtn, typeTempCode) {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];
	const rawCssArr = findCss(nameBtn);
	const foundCssSelectors = findCssSelectors(nameBtn);
	const tableScss = createTableScss(foundCssSelectors)
	
	let tempScss = buildTempScss(rawCssArr, foundCssSelectors, tableScss);
	tempScss = setColor(tempScss);
	tempScss = setAnimation(tempScss);
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

const createTableScss = (cssSelectors) => {
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
	let readyCss = '';
	const foundCss = [];

	foundCssSelectors.forEach((cssSelector, index) => {
		let rawCssSelector = rawCssArr[index];
		rawCssSelector = rawCssSelector.replace(cssSelector, "");
		rawCssSelector = rawCssSelector.replace(/\s+[{]+\s/g, "");
		rawCssSelector = rawCssSelector.replace(/\s[}]+/g, "");
		
		foundCss.push(rawCssSelector);
	});

	tableScss.forEach((selectors, index) => {
		const currentLengthArr = selectors.length;
		const tabMultiplier = "\t".repeat(currentLengthArr);
		const countTab = `\n${tabMultiplier}`;

		if ( index === 0 ) {
			readyCss += `${selectors[currentLengthArr - 1]} {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n`;
		}
		else {
			let readyStr = `\n${"\t".repeat(currentLengthArr - 1)}${selectors[currentLengthArr - 1]}`;

			if ( tableScss[index + 1] && currentLengthArr !== tableScss[index + 1].length ) {
				readyStr += ` {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n`;
			} else {
				readyStr += ` {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n${'\t'.repeat(currentLengthArr - 1)}}\n`;
			};
			if ( tableScss.length === index + 1 ) readyStr += `${'\t'.repeat(currentLengthArr - 2)}}\n}`;

			readyCss += readyStr;
		};
	});

	readyCss = readyCss.replace(/after/g, "&::after");
	readyCss = readyCss.replace(/before/g, "&::before");

	return readyCss.trim();
};
