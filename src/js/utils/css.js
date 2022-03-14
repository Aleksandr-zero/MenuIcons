import {
	REPLACE_SUBSTRINGS_ACTIVE_CLASS,
} from "../constants.js";

import { is_ActiveClass_AtCss } from "../utils/index.js";


export const convertCssToView = (cssSelectors) => {
	const _cssSelectors = [];

	cssSelectors.forEach((cssSelector) => {
		for ( let key = 0; key < Object.keys(REPLACE_SUBSTRINGS_ACTIVE_CLASS).length; key++ ) {
			cssSelector = cssSelector.replace(
				REPLACE_SUBSTRINGS_ACTIVE_CLASS[key][0], REPLACE_SUBSTRINGS_ACTIVE_CLASS[key][1]
			);
		};

		_cssSelectors.push(cssSelector);
	});

	return _cssSelectors;
};

export function findCss(nameBtn, setActiveClass) {
	const cssSelectors = [];

	const styleSheets = Array.from(document.styleSheets).filter(
		(styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
	);

	for ( let style of styleSheets ) {
		if ( style instanceof CSSStyleSheet && style.cssRules ) {
			if ( style.href && style.href.split("/")[style.href.split("/").length - 1] === "style.css" ) {
				for ( let index = 0; index < style.cssRules.length; index++ ) {
					if ( style.cssRules[index].cssText.includes(nameBtn) ) {
						let readyCss = style.cssRules[index].cssText;

						const isActiveClass = is_ActiveClass_AtCss(readyCss, nameBtn);
						if ( isActiveClass && !setActiveClass ) continue;

						cssSelectors.push(readyCss);
					};
				};
			};
		};
	};

	return cssSelectors;
};