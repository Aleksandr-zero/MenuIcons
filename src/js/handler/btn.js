import {
	SETTINGS,
	PREFIX_ACTIVE_CLASS,
	ACTIVE_CLASS_AT_BTN
} from "../constants.js";


export const createActiveClassBtn = () => {
	return `${SETTINGS["name_btn"]}--active`;
};


export function setBtn(nameBtn, css) {
	if ( "name_btn" in SETTINGS && SETTINGS["name_btn"] ) {
		let activeClassBtn = ("active_class_btn" in SETTINGS && SETTINGS["active_class_btn"]) ? SETTINGS["active_class_btn"] : false;
		const regName = new RegExp(`${nameBtn}`, "g");

		if ( !activeClassBtn ) {
			activeClassBtn = createActiveClassBtn();
		};

	 if ( Boolean(ACTIVE_CLASS_AT_BTN) ) {
			const regActiveClass = new RegExp(ACTIVE_CLASS_AT_BTN, "g");
			css = css.replace(regActiveClass, activeClassBtn);
	 };

		css = css.replace(regName, SETTINGS["name_btn"]);
	}
	else if ( !("name_btn" in SETTINGS && SETTINGS["name_btn"]) ) {
		css = changeSelectorActiveClass(css, nameBtn);
	};

	return css;
};


const changeSelectorActiveClass = (css, nameBtn) => {
	if ( Boolean(ACTIVE_CLASS_AT_BTN) ) {
		const activeClassBtn = `${nameBtn}${PREFIX_ACTIVE_CLASS}`;
		const reg = new RegExp(`${ACTIVE_CLASS_AT_BTN}`, "g");
		css = css.replace(reg, activeClassBtn);
	}

	return css;
};
