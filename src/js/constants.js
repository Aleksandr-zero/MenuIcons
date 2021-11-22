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
	3: [/-[0-9]/, "--active"],
};

export const TABLE = {
	"html": `${TEMP_HTML}`,
	"css": `${TEMP_CSS}`,
	"js": `${TEMP_JS}`,
	"demo": `${TEMP_DEMO}`,
};


export const COMMON_CSS = `
.{{ name-btn }} {
	padding: {{ padding-value-main }};
	border: none;
	outline: none;
	background-color: transparent;
	cursor: pointer;
}

.{{ name-btn }} span {
	position: relative;
	display: block;
	width: {{ width-value-span }};
	height: {{ height-value-span }};
	border-radius: 4px;
	background-color: rgb(254, 254, 254);
	font-size: 0;
	color: transparent;
	-webkit-transition: all 0.2s ease;
	-o-transition: all 0.2s ease;
	transition: all 0.2s ease;
}

.{{ name-btn }} span::before,
.{{ name-btn }} span::after {
	position: absolute;
	content: "";
	width: {{ span-bef-af-width }};
	height: {{ span-bef-af-height }};
	background-color: {{ span-bef-af-back-color }};
	border-radius: 4px;
	-webkit-transition: all 0.2s ease;
	-o-transition: all 0.2s ease;
	transition: all 0.2s ease;
}

.{{ name-btn }} span::before {
	top: {{ span-before-top }};
	left: {{ span-before-left }};
	transform: {{ span-before-transform }};
}

.{{ name-btn }} span::after {
	bottom: {{ span-after-bottom }};
	left: {{ span-after-left }};
	transform: {{ span-after-transform }};
}
`;

export const SAME_VALUES_PROPERTIES = [
	"width",
	"height",
];

export const REMOVED_PROPERTY = [
	"transform",
];

export const GET_REQUESTED_CSS = {
	padding: "padding",
	span: {
		"width": "width",
		"height": "height"
	},
	span_bef_af: {
		"width": "width",
		"height": "height",
		"left": "left",
		"backgroundColor": "background-color"
	},
	span_before: {
		"top": "top",
		"left": "left",
		"transform": "transform"
	},
	span_after: {
		"bottom": "bottom",
		"left": "left",
		"transform": "transform"
	},
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

export const REPLACEMENTS_CSS = {
	"{{ padding-value-main }}": "padding",
	"{{ width-value-span }}": "span.width",
	"{{ height-value-span }}": "span.height",

	"{{ span-before-top }}": "span_before.top",
	"{{ span-before-left }}": "span_before.left",
	"{{ span-before-transform }}": "span_before.transform",

	"{{ span-after-bottom }}": "span_after.bottom",
	"{{ span-after-left }}": "span_after.left",
	"{{ span-after-transform }}": "span_after.transform",

	"{{ span-bef-af-width }}": "before_after.width",
	"{{ span-bef-af-height }}": "before_after.height",
	"{{ span-bef-af-back-color }}": "before_after.backgroundColor",
};

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-class }}--active");
});
`;
