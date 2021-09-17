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
}

.{{ name-btn }} span {
	position: relative;
	display: block;
	width: {{ width-value-span }};
	height: {{ height-value-span }};
	border-radius: 4px;
	background-color: #fefefe;
}

.{{ name-btn }} span::before,
.{{ name-btn }} span::after {
	position: absolute;
	content: "";
}

.{{ name-btn }} span::before {
	top: {{ span-before-top }};
}

.{{ name-btn }} span::after {
	bottom: {{ span-after-bottom }};
}
`;

export const GET_REQUESTED_CSS = {
	padding: "padding",
	span: {
		"width": "width",
		"height": "height"
	},
	span_before: {
		"top": "top"
	},
	span_after: {
		"bottom": "bottom"
	},
};

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-class }}--active");
});
`;
