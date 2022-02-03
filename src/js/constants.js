import {
	TEMP_HTML,
	TEMP_CSS,
	TEMP_JS,
	TEMP_DEMO
} from "./templates/temp.js";


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
	"demo": `${TEMP_DEMO}`,
};

export const ACTIVE_CLASSES_BUTTON = {
	"btn-menu-hamburger": 2,
	"btn-menu-veggie_burger": 2,
	"btn-menu-hotdog": 2,
	"btn-menu-fries": 1,
	"btn-menu-strawberry": 1,
	"btn-menu-stairs": 1,
	"btn-menu-cheeseburger": 0,
	"btn-menu-candy_box": 0,
	"btn-menu-kebab": 1,
	"btn-menu-meatballs": 1,
	"btn-menu-chocolate": 0,
	"btn-menu-cake": 0,
};

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-class }}--active");
});
`.trim();
