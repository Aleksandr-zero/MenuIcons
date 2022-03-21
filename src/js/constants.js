import {
	TEMP_HTML,
	TEMP_CSS,
	TEMP_JS,
	TEMP_SCSS,
	TEMP_DEMO
} from "./templates/temp.js";

import { getSettingsUser } from "./settings/settings.js";


export const SETTINGS = getSettingsUser();

export let ACTIVE_CLASS_AT_BTN = false; // string
export let CSS_FOR_ACTIVE_CLASS = "";
export const PREFIX_ACTIVE_CLASS = "--active";

export const NUMBER_MOVE_BORDER_OF_SCREEN = 50; // px
export const NUMBER_CHECK_BORDER_OF_SCREEN = 10; // px

export const ANIMATE = 200; // ms
export const NUMBER_FOR_DELAY_ANIMATE = 150; // ms

export const REPLACE_SUBSTRINGS_ACTIVE_CLASS = {
	0: [/;\s/g, ";\n\t"],
	1: [/{\s/g, "{\n\t"],
	2: [/\t}/g, "}\n"],
	3: [/after,\s/g, "after,\n"],
};

export const TABLE = {
	"html": `${TEMP_HTML}`,
	"css": `${TEMP_CSS}`,
	"js": `${TEMP_JS}`,
	"scss": `${TEMP_SCSS}`,
	"demo": `${TEMP_DEMO}`,
};

export const PSEUDO_CLASSES = [
	"last-child",
	"hover",
	"first-child",
	"nth-child",
];

export const PSEUDO_ELEMENTS = [
	"after",
	"before",
];

export const ACTIVE_CLASSES_BUTTON = {
	"btn-menu-hamburger": 2,
	"btn-menu-veggie_burger": 2,
	"btn-menu-hotdog": 2,
	"btn-menu-fries": 2,
	"btn-menu-strawberry": 2,
	"btn-menu-stairs": 2,
	"btn-menu-cheeseburger": 2,
	"btn-menu-candy_box": 3,
	"btn-menu-kebab": 1,
	"btn-menu-meatballs": 1,
	"btn-menu-chocolate": 3,
	"btn-menu-cake": 2,
};

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-active-class }}");
});
`.trim();


export function cleanValuesAtClosing() {
	ACTIVE_CLASS_AT_BTN = false;
	CSS_FOR_ACTIVE_CLASS = "";
};

export function changeConstantActiveClass(activeBtn = false, activeCss = "") {
	ACTIVE_CLASS_AT_BTN = activeBtn;
	CSS_FOR_ACTIVE_CLASS = activeCss;
};
