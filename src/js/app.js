import {
	ANIMATE,
	TABLE
} from "./constants.js";


const blockExample = document.querySelector(".example");
const blockExampleItems = blockExample.querySelector(".example__items");
const templateOpenMenu = document.querySelector(".open-menu-temp");


const showsCodeForDemo = () => {
	blockExampleItems.classList.add("example-items-active");

	const typeCode = event.currentTarget.dataset.typeCode;
	const currentItem = event.currentTarget.closest(".example-item-active");

	currentItem.insertAdjacentHTML("beforeend", `
		${TABLE[typeCode]}
	`);
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
