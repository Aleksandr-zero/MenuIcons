import {
	ANIMATE,
	TABLE
} from "./constants.js";

import {
	createTempHtml_ForDemo,
	retrievesTempPressedBtnOpenDemo,
	createTempCss_ForDemo,
	createTempJs_ForDemo,
	createTempDemo_ForDemo,
	addEventBtns_ForDemoTemp,
	checksIfBlockIsOutOfWindow
} from "./createTemp.js";

import { addEvent_CopyText } from "./handlerCopy.js";


hljs.highlightAll();


const blockExample = document.querySelector(".example");
const blockExampleItems = blockExample.querySelector(".example__items");
const templateOpenMenu = document.querySelector(".open-menu-temp");


function createBaseTemp(createFun, tempBtn, typeCode, currentItem) {
	const tempMenuIconBtn = createFun(
		tempBtn,
		typeCode
	);

	currentItem.insertAdjacentHTML("beforeend", `
		${tempMenuIconBtn}
		`.trim()
	);
};


const showsCodeForDemo = (event) => {
	const typeCode = event.currentTarget.dataset.typeCode;
	const currentItem = event.currentTarget.closest(".example-item-active");

	if ( currentItem.querySelector(`.code-${typeCode}`) ) {
		currentItem.querySelector(`.code-${typeCode}`).remove();
		blockExampleItems.classList.remove("example-items-active");

		return;
	};

	if ( currentItem.querySelector(".demo-code") ) {
		currentItem.querySelector(`.demo-code`).remove();
	};

	if ( typeCode === "html" ) {
		createBaseTemp(
			createTempHtml_ForDemo,
			retrievesTempPressedBtnOpenDemo(event.currentTarget),
			typeCode,
			currentItem
		);
		checksIfBlockIsOutOfWindow(currentItem.querySelector(".language-html"));

	} else if ( typeCode === "css" ) {
		createBaseTemp(createTempCss_ForDemo, event.currentTarget, typeCode, currentItem);
		checksIfBlockIsOutOfWindow(currentItem.querySelector(".language-css"));

	} else if ( typeCode === "js" ) {
		createBaseTemp(createTempJs_ForDemo, event.currentTarget, typeCode, currentItem);
		checksIfBlockIsOutOfWindow(currentItem.querySelector(".language-javascript"));

	} else if ( typeCode === "demo" ) {
		const currentBtn = event.currentTarget.closest(".example__item").querySelector(".example__item-content-btn");
		const tempDemoHtml = createTempDemo_ForDemo(TABLE[typeCode], currentBtn.classList[1]);

		currentItem.insertAdjacentHTML("beforeend", `
			${tempDemoHtml}
			`.trim()
		);

		checksIfBlockIsOutOfWindow(currentItem.querySelector(".demo-code--classes"));
		addEventBtns_ForDemoTemp(
			currentItem.querySelectorAll(".demo-code__content-item-btn"),
			currentBtn
		);
	};

	if ( typeCode !== "demo" ) {
		addEvent_CopyText(currentItem.querySelector(".demo-code__container-btn-copy"));
	};

	blockExampleItems.classList.add("example-items-active");
};

const closeCodeForDemo = (activeBlock) => {
	blockExampleItems.classList.remove("example-items-active");

	const openCodeDemo = activeBlock.querySelector(".demo-code");

	if ( openCodeDemo ) {
		openCodeDemo.remove();
	};
};

const addEventClickShowCode = (block) => {
	const btns = block.querySelectorAll(".open-menu__content-item-btn");

	btns.forEach((btn) => {
		btn.addEventListener("click", showsCodeForDemo);
	});
};


const changeTempOpenMenu = (block) => {
	block.classList.add("open-menu-disable");

	setTimeout(() => {
		block.classList.remove("open-menu-disable");
		block.classList.add("open-menu-active");
	});
};


const closeMenuDemo = () => {
	const activeBlock = blockExample.querySelector(".example-item-active");

	if ( activeBlock ) {
		closeCodeForDemo(activeBlock);

		activeBlock.classList.remove("example-item-active");
		activeBlock.querySelector(".open-menu").remove();
	};
};

const openMenuDemo = (currentItem) => {
	closeMenuDemo();

	currentItem.append(templateOpenMenu.content.cloneNode(true));
	currentItem.classList.add("example-item-active");

	const blockTempContent = currentItem.querySelector(".open-menu");
	changeTempOpenMenu(blockTempContent);
	addEventClickShowCode(blockTempContent);
};

const changeMenuDemo = () => {
	// Открывает и закрывает меню демонстрации.

	const typeBtn = event.currentTarget.dataset.type;
	const currentItem = event.currentTarget.closest(".example__item");

	currentItem.classList.contains("example-item-active") ? closeMenuDemo() : openMenuDemo(currentItem);
};


const exampleItems = document.querySelectorAll(".example__item");

exampleItems.forEach((item) => {
	const btn = item.querySelector(".example__item-content-btn");

	btn.addEventListener("click", changeMenuDemo);
});
