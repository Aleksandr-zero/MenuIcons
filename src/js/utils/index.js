import {
	NUMBER_MOVE_BORDER_OF_SCREEN,
	NUMBER_CHECK_BORDER_OF_SCREEN,
	REPLACE_SUBSTRINGS_ACTIVE_CLASS,
	ACTIVE_CLASSES_BUTTON
} from "../constants.js";


export function checksIfBlockIsOutOfWindow(block) {
	const widtnBody = document.querySelector("body").clientWidth
	const widthWindow_WithScroll = document.documentElement.scrollWidth;
	const widthWindow_Browser = widthWindow_WithScroll - (widthWindow_WithScroll - widtnBody);

	const styleBlock = block.getBoundingClientRect();

	if ( styleBlock.x + styleBlock.width + NUMBER_CHECK_BORDER_OF_SCREEN >= widthWindow_Browser ) {
		const positionLeft_ToExitWindow = (styleBlock.x + styleBlock.width + NUMBER_CHECK_BORDER_OF_SCREEN) - widthWindow_Browser;
		block.closest(".demo-code").style.left = `-${positionLeft_ToExitWindow + NUMBER_MOVE_BORDER_OF_SCREEN}px`;

	} else if ( styleBlock.x <= NUMBER_CHECK_BORDER_OF_SCREEN ) {
		block.closest(".demo-code").style.right = `-${Math.abs(styleBlock.x) + NUMBER_MOVE_BORDER_OF_SCREEN}px`;
	};
};


const is_ActiveClass_AtCss = (textCss, nameBtn) => {
	for ( let index = 1; index < ACTIVE_CLASSES_BUTTON[nameBtn] + 1; index++ ) {
		if ( textCss.includes(`${nameBtn}-${index}`) ) {
			return true;
		};
	};
};

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

						const is_activeClass = is_ActiveClass_AtCss(readyCss, nameBtn);
						if ( is_activeClass && !setActiveClass ) continue;

						cssSelectors.push(readyCss);
					};
				};
			};
		};
	};

	return cssSelectors;
};
