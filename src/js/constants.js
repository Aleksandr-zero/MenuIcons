import {
	TEMP_HTML,
	TEMP_CSS,
	TEMP_JS,
	TEMP_DEMO
} from "./templates/temp.js";


export const ANIMATE = 0.2;

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
}

.{{ name-btn }} span::before,
.{{ name-btn }} span::after {
	position: absolute;
	content: "";
	width: {{ span-bef-af-width }};
	height: {{ span-bef-af-height }};
	background-color: {{ span-bef-af-back-color }};
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
		"background-color": "background-color"
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

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-class }}--active");
});
`;
